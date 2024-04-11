import tsr, { type Result } from "ts-results";
import { BASE_API_URL } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";

const { Ok, Err } = tsr;

const getUserProfile = async (e: RequestEvent): Promise<Result<User, string>> => {
  try {
    const userId = e.cookies.get("u_id");
    const token = e.cookies.get("auth_token");

    if (!userId || !token) return Err("user_not_logged_in");

    const result = await fetch(BASE_API_URL + "/Users/" + userId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (result.status >= 500) return Err("internal_error");
    const body = await result.json()
    if (!body.isSuccess) return Err(body.errors[0]);

    return Ok(body.data);
  } catch (e) {
    console.log(e)
    return Err("internal_error");
  }
};

type User = {
  id: string;
  emailConfirmed: boolean;
  userName?:string;
  avatarUrl?:string;
  email: string;
  skills: string[];
  onBoarding: "CreateAccount" | "Details" | "Skills";
  memberProfiles: {
    "id": string;
    "team": {
      "id": string;
      "slug": string;
      "name": string;
      "avatarUrl": string;
    },
    "roles": ("owner"|"manager")[];
  }[];
};

export {
  getUserProfile,
  type User
}