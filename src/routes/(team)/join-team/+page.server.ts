import joinTeam from '$lib/services/team/join-team';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
  default: async (e: RequestEvent) => {
    const formData = await e.request.formData()

    const resp = await joinTeam({
      inviteID: formData.get("invite-id")?.toString() ?? "",
      slug: formData.get("slug")?.toString() ?? ""
    }, e)

    if (resp.ok) return fail(400, {
      message: resp.val,
      location: `/@${formData.get("slug")}`
    })

    return fail(400, {
      message: resp.val
    })

    console.log(Object(formData))
  }
}