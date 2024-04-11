import { fail, redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import createProjectFromPreplan from "$lib/services/project/create-project-from-preplan";


export const actions = {
  default: async (e: RequestEvent) => {

    const formData = await e.request.formData();
    const name = formData.get("name")?.toString() ?? "";
    const preplanId = formData.get("preplan_id")?.toString() ?? "";
    const resp = await createProjectFromPreplan({
        planID:preplanId,name:name
    }, e);
    // console.log(`/@${e.params.team_slug}/preplans/${resp.val}`)
    if (resp.ok) throw redirect(302, `/@${e.params.team_slug}/projects/${resp.val?.id}`)

    return fail(400,{message:"resp.val"})
  }}