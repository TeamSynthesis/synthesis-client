import { User } from "$lib/models/user/user";
import { eq } from "drizzle-orm";
import type { LayoutServerLoad } from "./$types";
import logger from "$lib/utils/logger";
import { error } from "@sveltejs/kit";
import type { Provider, UserProfile } from "$lib/types";
import db from "$lib/config/db";

import tsr from "ts-results";
const { Ok, Err } = tsr;

export const load: LayoutServerLoad = async (e) => {
  return {
    userProfile: !e.locals.user
      ? null
      : (await getUserProfile({ userId: e.locals.user.id }))
          .mapErr((e) => {
            if (e === "internal_error") throw error(500, e);
          })
          .unwrapOr(null),
  };
};

const getUserProfile: Provider<
  { userId: string },
  UserProfile,
  "internal_error" | "user_not_found"
> = async ({ userId }) => {
  try {
    const user: UserProfile | null =
      (
        await db
          .select({
            id: User.id,
            email: User.email,
            createdAt: User.createdAt,
            fullname: User.fullname,
            username: User.username,
            avatarUrl: User.avatarUrl,
            onboardingProgress: User.onboardingProgress,
          })
          .from(User)
          .where(eq(User.id, userId))
      )[0] ?? null;

    if (!user) return Err("user_not_found");

    console.log(user);
    return Ok(user);
  } catch (e: any) {
    logger("ERROR", "Failed to fetch userProfile", e);
    return Err("internal_error");
  }
};
