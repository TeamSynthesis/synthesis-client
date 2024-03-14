import { getUserProfile } from "$lib/services/user/get-user-profile";
import type { LayoutServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: LayoutServerLoad = async (e) => {
  return {
    userProfile: (await getUserProfile(e))
      .mapErr((e) => {

        if (e === "internal_error") throw error(500, e);
      })
      .unwrapOr(null),
  };
};
