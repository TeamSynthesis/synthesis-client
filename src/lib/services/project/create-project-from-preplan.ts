import { BASE_API_URL } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";
import type {Preplan} from "$lib/stores/preplan";

import tsr, { type Result } from "ts-results";
const { Ok, Err } = tsr;

const createProjectFromPreplan = async (args: { planID:string;name:string}, e: RequestEvent): Promise<Result<any, string>> => {


  try {
    const result: APIResponse = await fetch(BASE_API_URL + `/Projects/ai-project?planId=${args.planID}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + e.cookies.get("auth_token"),
      }
    })
      .then((res) => {
        return res.json()
      });
      
      console.log(result)
    if (result.errors) return Err(result.errors[0]);
    return Ok(result.data);

  } catch (e) {
    console.error(e);
    return Err("An unknown error occured.  Please try again later");
  }
}

export default createProjectFromPreplan