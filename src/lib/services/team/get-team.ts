import { BASE_API_URL } from "$env/static/private";
import type { Team } from "$lib/stores/team";
import type { RequestEvent } from "@sveltejs/kit";
import tsr, { type Result } from "ts-results";

const { Ok, Err } = tsr;

const getTeam = async (
  args: {
    teamId: string
  },
  e: RequestEvent,
): Promise<Result<Team, string>> => {

  try {
    const result: APIResponse = await fetch(BASE_API_URL + "/Teams/" + args.teamId + "/all", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + e.cookies.get("auth_token"),
      },
    }).then((res) =>
      res.json()
    );

    if (!result.isSuccess) return Err((result as any).errors[0]);
    return Ok(result.data);

  } catch (e) {
    console.error(e);
    return Err("internal_error");
  }
};

export default getTeam;
