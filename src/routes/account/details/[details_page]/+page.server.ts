import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const accountBasicDetailsSchema = z.object({
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
  if (!["basic", "skills", "finalize"].includes(e.params.details_page))
    redirect(302, "/account/details/basic");

  const form = await superValidate(e, accountBasicDetailsSchema);

  //TODO: Check user onboarding_stage and redirect to appropriate if stage
  //is not
  //a) basic-info
  //b) skills
  //c) ...

  return {
    form,
  };
};

export const actions = {
  default: async (e: RequestEvent) => {
    const form = await superValidate(e, accountBasicDetailsSchema);

    if (!form.valid) {
      form.errors._errors = ["Invalid form data"];
      return fail(400, {
        form,
      });
    }

    await new Promise((resolve, _) => {
      setTimeout(resolve, 1000);
    });

    redirect(302, "/account/details/skills");
  },
};
