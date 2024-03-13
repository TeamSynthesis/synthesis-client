import { gitHub } from "$lib/config/auth";
import { OAuth2RequestError, type GitHubTokens } from "arctic";
import type { RequestEvent } from "@sveltejs/kit";
import { signInGitHub } from "$lib/services/account/sign-in-github";
import setSessionCookies from "../../_helpers/set-session-cookies";

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

  try {
    const tokens: GitHubTokens = await gitHub.validateAuthorizationCode
      (code);

    const token = (await signInGitHub(tokens.accessToken)).unwrapOr(null)
    if (token === null) return fancyFail("Something unexpected happened.  Please try again.")


    setSessionCookies(e, token.token, token.userId)

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/~",
      },
    });
  } catch (e: any) {
    console.log(e);
    if (e instanceof OAuth2RequestError)
      return fancyFail("Something unexpected happened.  Please try again.");

    return fancyFail("An internal error occurred.  Please try again later.");
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


