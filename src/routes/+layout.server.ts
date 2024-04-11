import { getUserProfile } from "$lib/services/user/get-user-profile";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (e) => {
  return {
    props:{
      userProfile: (async ()=>{
        const r = await getUserProfile(e);
        if(r.ok === true) return r.val
        if(r.val === "user_not_logged_in") return null
        if(r.val.includes("not found")) return null

        return r.val
      })()
    }
  };
};
