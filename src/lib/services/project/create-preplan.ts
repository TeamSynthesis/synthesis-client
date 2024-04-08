import { BASE_API_URL } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";

import tsr, { type Result } from "ts-results";
const { Ok, Err } = tsr;

const createPreplan = async (args: { prompt: string; }, e: RequestEvent): Promise<Result<string, string>> => {

  const form = new FormData()
  form.set("prompt", args.prompt)
  
  try {
    const result: APIResponse = await fetch(BASE_API_URL + `/Projects/generate`, {
      method: "POST",
      body: form,
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

export default createPreplan