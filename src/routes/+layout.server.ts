import { eq } from "drizzle-orm";
import type { LayoutServerLoad } from "./$types";
import logger from "$lib/utils/logger";
import { error } from "@sveltejs/kit";
import type { Provider, UserProfile } from "$lib/types";
import db from "$lib/config/db";

import tsr, { type Result } from "ts-results";
import { BASE_API_URL } from "$env/static/private";
const { Ok, Err } = tsr;

export const load: LayoutServerLoad = async (e) => {
  return {
    userProfile: (await getUserProfile(e))
      .mapErr((e) => {
        if (e === "internal_error") throw error(500, e);
        throw error(500, e);
      })
      .unwrapOr(null),
  };
};

type User = {
  id: string;
  emailConfirmed: boolean;
  email: string;
  skills: string[];
  memberProfiles: string[];
};

const getUserProfile = async (e: any): Promise<Result<User, string>> => {
  try {
    const userId = e.cookies.get("u_id");
    const token = e.cookies.get("auth_token");

    if (!userId || !token) return Err("User not logged in");
    const result = await fetch(BASE_API_URL + "/Users/" + userId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json());

    if (!result.isSuccess) return Err(result.errors[0]);

    return Ok(result.data);
  } catch {
    return Err("An unexpected error occured.  Try again later");
  }
};
