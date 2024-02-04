import { gitHub } from "$lib/config/auth";
import { OAuth2RequestError, type GitHubTokens } from "arctic";
import { User } from "$lib/models/user/user";
import type { RequestEvent } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import logger from "$lib/utils/logger";
import { type TX, getPooledConnection } from "$lib/config/db";
import { _createSession } from "../../[auth]/+page.server";

export const GET = async (e: RequestEvent) => {
  const code = e.url.searchParams.get("code");
  const state = e.url.searchParams.get("state");
  const storedState = e.cookies.get("gh_oauth_state");
  const action = e.cookies.get("gh_oauth_action");

  const fancyFail = _initializeFancyFail(action ?? "sign-in");

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !["sign-in", "sign-up"].includes(action ?? "")
  )
    return fancyFail("Something unexpected happened.  Please try again.");

  const { pool, db } = getPooledConnection();

  try {
    pool.connect();
    const tokens: GitHubTokens = await gitHub.validateAuthorizationCode(code);
    const githubUser = await Promise.all([
      fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }).then((res) => res.json()) as Promise<GitHubUser>,
      fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }).then((res) => res.json()) as Promise<GitHubEmail[]>,
    ]).catch((e: any) => {
      throw e;
    });

    const existingUser = (
      await db
        .select({ id: User.id })
        .from(User)
        .where(eq(User.githubId, githubUser[0].id.toString()))
    )[0];

    if (existingUser) {
      await _createSession(e, existingUser.id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/@",
        },
      });
    }

    const email =
      githubUser[1].find((e) => e.primary && e.verified)?.email ??
      githubUser[1][0].email;

    const existingUserWithDifferentProvider = (
      await db
        .select({ email: User.email, authProvider: User.authProvider })
        .from(User)
        .where(eq(User.email, email))
    )[0];

    if (existingUserWithDifferentProvider)
      return fancyFail(
        "The email linked to that GitHub account is already in use"
      );

    const userId: string = uuid();

    await db.transaction(async (tx) => {
      await Promise.all([
        tx.insert(User).values({
          id: userId,
          email,
          githubId: githubUser[0].id.toString(),
          avatarUrl: githubUser[0].avatar_url,
          username: "unset:" + userId,
          fullname: githubUser[0].name,
          createdAt: new Date(),
          emailVerifiedAt: githubUser[1].find((e) => e.primary && e.verified)
            ? new Date()
            : null,
          authProvider: "github",
        }),
        _createSession(e, userId, tx),
      ]).catch((e: any) => {
        throw e;
      });
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/account/details",
      },
    });
  } catch (e: any) {
    console.log(e);
    if (e instanceof OAuth2RequestError)
      return fancyFail("Something unexpected happened.  Please try again.");
    logger(
      "ERROR",
      "An error occurred while creating a new user from GitHub",
      e
    );
    return fancyFail("An internal error occurred.  Please try again later.");
  } finally {
    pool.end();
    ["gh_oauth_state", "gh_oauth_action"].forEach((c) =>
      e.cookies.delete(c, {
        path: "/",
      })
    );
  }
};

const _initializeFancyFail = (action: string) => (message: string) =>
  new Response(null, {
    status: 302,
    headers: {
      Location: `/account/${action}?error=${encodeURIComponent(
        message
      )}`.toString(),
    },
  });

type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
};

type GitHubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
};
