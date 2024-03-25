import { fail, redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import createTeam from "$lib/services/team/create-team";

export const actions = {
  default: async (e: RequestEvent) => {
    const formdata = await e.request.formData();
    const name = formdata.get("name")?.toString() ?? "";
    const slug = formdata.get("slug")?.toString() ?? "";
    const description = formdata.get("description")?.toString() ?? "";

    const r = await createTeam(
      {
        name,
        slug,
        description,
      },
      e
    );

    if (r.ok === true) throw redirect(302, "@" + slug);

    return fail(400, {
      message: r.val,
    });
  },
};
