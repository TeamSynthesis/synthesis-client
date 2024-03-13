import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import signUp from "$lib/services/account/sign-up";
import setSessionCookies from "../_helpers/set-session-cookies";

const emailAuthSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(1024, { message: "Password must be less than 1024 characters long" })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message:
        "Password must contain at least one number, one uppercase letter and one one lowercase letter.",
    }),
});

export const load: PageServerLoad = async (e) => {
  //TODO: Redirect authenticated users to "/@~"
  if (!["sign-in", "sign-up"].includes(e.params.auth)) throw error(404);
  const form = await superValidate(e, emailAuthSchema);
  return {
    form,
  };
};

export const actions = {
  default: async (e: RequestEvent) => {
    const form = await superValidate(e, emailAuthSchema);

    if (!form.valid) {
      form.errors._errors = ["Invalid username or password"];
      return fail(400, {
        form,
      });
    }

    switch (e.params.auth) {
      case "sign-up":
        const result = await signUp(form.data.email, form.data.password);

        if (result.err) {
          form.errors._errors = [result.val];
          return fail(400, {
            form,
          });
        }
        setSessionCookies(e, result.val.token, result.val.userId);
        throw redirect(301, "/account/details/basic");
      case "sign-in":
    }
  },
};

