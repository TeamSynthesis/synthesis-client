import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { z } from "zod";
import createPreplan from "$lib/services/project/create-preplan";


export const actions = {
  default: async (e: RequestEvent) => {

    const formData = await e.request.formData();
    const prompt = formData.get("prompt")?.toString() ?? "";
    const resp = await createPreplan({ prompt}, e);
    console.log(`/@${e.params.team_slug}/preplans/${resp.val}`)
    if (resp.ok) throw redirect(302, `/@${e.params.team_slug}/preplans/${resp.val}`)

    return fail(400,{message:resp.val})
  }}