import tsr, { type Result } from "ts-results";
import { BASE_API_URL } from "$env/static/private";

const { Ok, Err } = tsr;

const signInGithub = async (token: string): Promise<Result<{ token: string; userId: string; }, string>> => {
  try {
    const result = await fetch(BASE_API_URL + "/Auth/github?accessToken=" + token, {
      method: "POST",
      body: JSON.stringify({ accessToken: token })
    });
    if (result.status >= 500) return Err("internal_error");
    const body = await result.json()
    if (!body.isSuccess) return Err(body.errors[0]);

    return Ok(body.data);
  } catch (e) {
    console.log(e)
    return Err("internal_error");
  }
}

export {
  signInGithub as signInGitHub
}