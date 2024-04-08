import { BASE_API_URL } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";
import type {Preplan} from "$lib/stores/preplan";

import tsr, { type Result } from "ts-results";
const { Ok, Err } = tsr;

const createProject = async (args: { name: string;description:string;features:Preplan["features"], teamId:string}, e: RequestEvent): Promise<Result<string, string>> => {

    
  const form = new FormData()
  form.set("Name", args.name)
  form.set("Description", args.description)
  form.set("Features", JSON.stringify(args.features))
  
  try {
    const result: APIResponse = await fetch(BASE_API_URL + `/Projects?teamId=${args.teamId}`, {
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

export default createProject