import { dev } from "$app/environment";
import type { RequestEvent } from "@sveltejs/kit";

const setSessionCookies = async (
  e: RequestEvent,
  token: string,
  userId: string
) => {
  e.cookies.set("u_id", userId, {
    path: "/",
    secure: !dev,
  });
  e.cookies.set("auth_token", token, {
    path: "/",
    secure: !dev,
  });
};

export default setSessionCookies