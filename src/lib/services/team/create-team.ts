import { BASE_API_URL } from "$env/static/private";
import type { Team } from "$lib/stores/team";
import type { RequestEvent } from "@sveltejs/kit";
import tsr, { type Result } from "ts-results";

const { Ok, Err } = tsr;

const createTeam = async (
  args: {
    slug: string;
    name: string;
    description: string;
  },
  e: RequestEvent
): Promise<Result<Team, string>> => {
  const formData = new FormData();
  formData.append("Name", args.name);
  formData.append("Slug", args.slug);
  formData.append("Description", args.description);

  try {
    const result: APIResponse = await fetch(
      BASE_API_URL + "/Teams/?userId=" + e.cookies.get("u_id"),
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + e.cookies.get("auth_token"),
        },
      }
    ).then((res) => res.json());
    console.log(result);
    if (result.errors) return Err(result.errors[0]);
    return Ok(result.data);
  } catch (e) {
    console.error(e);
    return Err("internal_error");
  }
};

export default createTeam;
