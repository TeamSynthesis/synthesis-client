import { BASE_API_URL } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";

import tsr, { type Result } from "ts-results";
const { Ok, Err } = tsr;

const createAiProject = async (args: { name: string; description: string }, e: RequestEvent): Promise<Result<string, string>> => {

  const form = new FormData()
  form.set("UserName", u.UserName)
  form.set("FullName", u.FullName)
  form.set("Profession", u.Profession)

  try {
    const result: APIResponse = await fetch(BASE_API_URL + `/Users/${userId}/details`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: "Bearer " + token,
      }
    })
      .then((res) => {
        console.log(res)
        return res.json()
      });

    if (!result.isSuccess) return Err(result.errors[0]);
    return Ok("");

  } catch (e) {
    console.error(e);
    return Err("An unknown error occured.  Please try again later");
  }
}

export default createAiProject