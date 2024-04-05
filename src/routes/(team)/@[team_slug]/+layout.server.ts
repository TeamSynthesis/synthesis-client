import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import getTeam from "$lib/services/team/get-team";

const load: LayoutServerLoad = async (e) => {

  const getTeamStream = async(team_slug:string)=>{
    let error:string = ""
    const userProfile = await (await e.parent()).props.userProfile
    if (typeof userProfile === "string" || !userProfile) {
      return "could_not_load_profile"
    }
    const memberProfiles = userProfile.memberProfiles
    if (!memberProfiles) {
      return "user_not_a_member"
    }

    const mp = memberProfiles.find((mp) => mp.team.slug === team_slug)
    if (!mp) {
      return "user_not_a_member"
    }


    const team = (await getTeam({ teamId: mp.team.id }, e)).mapErr(e=>error=e).unwrapOr(null)
    return team ?? error
  }




  return {
    props: {
      team:getTeamStream(e.params.team_slug)
    }
  }
}

export { load }