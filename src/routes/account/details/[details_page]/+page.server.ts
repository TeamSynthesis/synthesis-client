import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { string, z } from "zod";
import setUserBasicDetails from "$lib/services/user/set-user-basic-details";
import setUserSkills from "$lib/services/user/set-user-skills";

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
  if (!["basic", "skills", "team"].includes(e.params.details_page))
    redirect(302, "/account/details/basic");

  const form = await superValidate(e, accountBasicDetailsSchema);
  const userProfile = await (await e.parent()).props.userProfile;

  if (!userProfile || typeof userProfile === "string") throw redirect(302, "/account/sign-in");
  //@ts-ignore
  form.data.avatarUrl = userProfile?.avatarUrl;

  // form.data.avatarUrl = userProfile.

  //todo check if user is signed in to start with

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
    switch (e.params.details_page) {
      case "basic":
        const form = await superValidate(e, accountBasicDetailsSchema);

        if (!form.valid) {
          form.errors._errors = ["Invalid form data"];
          return fail(400, {
            form,
          });
        }
        const response = await setUserBasicDetails(
          e.cookies.get("u_id") ?? "",
          e.cookies.get("auth_token") ?? "",
          {
            AvatarUrl: form.data.avatarUrl ?? "",
            FullName: form.data.fullname,
            Profession: form.data.profession,
            UserName: form.data.username,
          }
        );

        if (response.ok) throw redirect(302, "/account/details/skills");
        else {
          form.errors._errors = [response.val];
          return fail(400, {
            form,
          });
        }
      case "skills":
        const r = await setUserSkills(
          e.cookies.get("u_id") ?? "",
          e.cookies.get("auth_token") ?? "",
          (await e.request.formData()).get("skills")?.toString() ?? ""
        );

        if (r.ok) {
          console.log("redirecting to team");
          throw redirect(302, "/account/details/team");
        }
    }
  },
};
