import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, RequestEvent } from "./$types";
import { z } from "zod";
import createPreplan from "$lib/services/project/create-preplan";


export const actions = {
  default: async (e: RequestEvent) => {

    const formData = await e.request.formData();
    const name = formData.get("name")?.toString() ?? "";
    const preplanId = formData.get("preplan_id")?.toString() ?? "";
    const resp = "talk_To_service";
    console.log(name, preplanId, resp)
    // console.log(`/@${e.params.team_slug}/preplans/${resp.val}`)
    // if (resp.ok) throw redirect(302, `/@${e.params.team_slug}/preplans/${resp.val}`)

    return fail(400,{message:"resp.val"})
  }}