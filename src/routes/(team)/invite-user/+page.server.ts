import joinTeam from '$lib/services/team/join-team';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent } from './$types';
import inviteUser from '$lib/services/team/invite-user';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
  default: async (e: RequestEvent) => {
    const formData = await e.request.formData()

    const email = formData.get("email")?.toString() ?? ""
    const role = formData.get("role")?.toString() ?? ""
    const teamID = formData.get("team-id")?.toString() ?? ""

    console.log(email, role)
    const resp = await inviteUser({
        email,
        role,
        teamID
    }, e)

    // const resp = await joinTeam({
    //   inviteID: formData.get("invite-id")?.toString() ?? "",
    //   slug: formData.get("slug")?.toString() ?? ""
    // }, e)

    if (resp.ok) return fail(400, {
        isSuccess:true,
        message:resp?.val[0]
    })

    return fail(400, {
      message: resp.val
    })
  }
}