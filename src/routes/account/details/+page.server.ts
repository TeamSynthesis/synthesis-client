import { error, fail, redirect, isRedirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import logger from "$lib/utils/logger";
import { _initializeFancyFail } from "../[auth]/+page.server";

const accountDetailsSchema = z.object({
  avatarUrl: z.string().optional(),
  fullname: z.string().min(2).max(64),
  username: z
    .string()
    .trim()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(32, { message: "Username must be less than 32 characters long" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Username can only contain letters, numbers & hyphens.",
    }),
  profession: z
    .string()
    .min(2, { message: "Profession must be at least 2 characters long" })
    .max(64, { message: "Profession must be less than 64 characters long" }),
});

export const load: PageServerLoad = async (e) => {
  const form = await superValidate(e, accountDetailsSchema);
  const { userProfile } = await e.parent();
  if (!userProfile) throw redirect(302, "/account/sign-in");

  form.data.fullname = userProfile.fullname ?? "";
  form.data.username = userProfile.username.includes("unset:")
    ? ""
    : userProfile.username;
  form.avatarUrl = userProfile.avatarUrl ?? "";

  return {
    form,
  };
};

export const actions = {
  default: async (e) => {
    const form = await superValidate(e, accountDetailsSchema);
    const fancyFail = _initializeFancyFail(form);

    if (!form.valid) return fancyFail("Invalid form data");

    return fancyFail("Not yet implemented :(");

    try {
    } catch (e: any) {
      if (isRedirect(e)) throw e;
      if (
        e?.message?.includes(
          'violates unique constraint "user_username_unique"'
        )
      )
        return fancyFail("That username is already in use", 400);
      logger("ERROR", "Error creating user", e);
      return fancyFail("An internal error has occured.  Please try again", 500);
    }
  },
};
