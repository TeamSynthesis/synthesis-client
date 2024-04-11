import { BASE_API_URL } from "$env/static/private";

import tsr, { type Result } from "ts-results";
const { Ok, Err } = tsr;

const setUserBasicDetails = async (userId: string, token: string, u: { UserName: string, FullName: string, Profession: string, AvatarUrl:string }): Promise<Result<string, string>> => {

  const form = new FormData()
  form.set("UserName", u.UserName)
  form.set("FullName", u.FullName)
  form.set("Profession", u.Profession)
  form.set("AvatarUrl", u.AvatarUrl)

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

    if (!result.isSuccess) return Err(result?.errors?.[0] ?? "");
    return Ok("");

  } catch (e) {
    console.error(e);
    return Err("An unknown error occured.  Please try again later");
  }
}

export default setUserBasicDetails