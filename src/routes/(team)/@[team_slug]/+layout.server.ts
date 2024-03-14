import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import getTeam from "$lib/services/team/get-team";

const load: LayoutServerLoad = async (e) => {
  const memberProfiles = (await e.parent()).userProfile?.memberProfiles
  if (!memberProfiles) throw error(404, "team_not_found")

  const mp = memberProfiles.find((mp) => mp.team.slug === e.params.team_slug)

  if (!mp) throw error(404, "team_not_found");

  const team = (async () => (await getTeam({ teamId: mp.team.id }, e)).unwrapOr(null))()

  return {
    props: {
      team
    }
  }
}

export { load }