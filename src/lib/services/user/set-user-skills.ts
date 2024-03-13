import { BASE_API_URL } from "$env/static/private";

import tsr, { type Result } from "ts-results";
const { Ok, Err } = tsr;

const setUserSkills = async (userId: string, token: string, skills: string): Promise<Result<string, string>> => {

  const form = new FormData()
  form.set("skills", skills)


  try {
    const result: APIResponse = await fetch(BASE_API_URL + `/Users/${userId}/skills`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: "Bearer " + token,
      }
    })
      .then((res) => {
        return res.json()
      });

    if (!result.isSuccess) return Err(result.errors[0]);
    return Ok("");

  } catch (e) {
    console.error(e);
    return Err("An unknown error occured.  Please try again later");
  }
}

export default setUserSkills