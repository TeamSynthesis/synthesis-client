import { BASE_API_URL } from "$env/static/private";
import type { Team } from "$lib/stores/team";
import type { RequestEvent } from "@sveltejs/kit";
import tsr, { type Result } from "ts-results";

const { Ok, Err } = tsr;

const inviteUser = async (
  args: {
    teamID:string,
    email: string,
    role: string,

  },
  e: RequestEvent,
): Promise<Result<any, string>> => {

  try {
    const result: APIResponse = await fetch(BASE_API_URL + "/Teams/"+args.teamID+"/invite-members", {
      method: "POST",
      body: JSON.stringify([{
        "email": args.email,
        "role": args.role
      }]),

      headers: {
        Authorization: "Bearer " + e.cookies.get("auth_token"),
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json()
    );
    console.log(result)

    if (result?.errors) return Err(result.errors[0]);
    return Ok(result.data);

  } catch (e) {
    console.error(e);
    return Err("internal_error");
  }
};

export default inviteUser;
