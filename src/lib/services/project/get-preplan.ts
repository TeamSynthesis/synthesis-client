import { BASE_API_URL } from "$env/static/private";
import type { Preplan } from "$lib/stores/preplan";
import type { RequestEvent } from "@sveltejs/kit";

import tsr, { type Result } from "ts-results";
const { Ok, Err } = tsr;

const getPreplan = async (args: { processId: string; }, e: RequestEvent): Promise<Result<{data?:Preplan,isSuccess:boolean, message:"pending"|"project generated successfully" }, string>> => {

  try {
    const result: APIResponse = await fetch(BASE_API_URL + `/Projects/generated-project?planId=${args.processId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + e.cookies.get("auth_token"),
      }
    })
      .then((res) => {
        return res.json()
      });
      
    if (result.errors) return Err(result.errors[0]);
    return Ok(result as any);

  } catch (e) {
//    console.error(e);
    return Err("An unknown error occured.  Please try again later");
  }
}

export default getPreplan