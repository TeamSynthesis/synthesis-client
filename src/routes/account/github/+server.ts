import { gitHub } from "$lib/config/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { dev } from "$app/environment";

export const GET = async (e: RequestEvent) => {
  const state = generateState();
  const action = e.url.searchParams.get("action") ?? "sign-in";

  const url = await gitHub.createAuthorizationURL(state, {
    scopes: ["profile", "email"],
  });

  [
    { name: "gh_oauth_state", value: state },
    { name: "gh_oauth_action", value: action },
  ].forEach(({ name, value }) => {
    e.cookies.set(name, value, {
      path: "/",
      secure: !dev,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    });
  });

  redirect(302, url.toString());
};
