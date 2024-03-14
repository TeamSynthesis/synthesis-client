import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const load: PageServerLoad = (e) => {
  throw redirect(302, `/@${e.params.team_slug}/overview`)
}

export { load };