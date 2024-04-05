import { getUserProfile } from "$lib/services/user/get-user-profile";
import type { PageServerLoad } from "./$types"

import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (e) => {
  const userProfile = await (await e.parent()).props.userProfile;

  if (!userProfile || typeof userProfile === "string") throw redirect(302, "/account/sign-in");

  if (userProfile.onBoarding === "CreateAccount") throw redirect(302, "/account/details/basic")

};
