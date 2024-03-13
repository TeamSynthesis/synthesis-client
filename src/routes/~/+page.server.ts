import { getUserProfile } from "$lib/services/user/get-user-profile";
import type { PageServerLoad } from "./$types"

import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (e) => {
  const userData = (await e.parent())?.userProfile
  if (!userData) throw redirect(302, "/account/sign-in")

  if (userData.onBoarding === "CreateAccount") throw redirect(302, "/account/details/basic")

};
