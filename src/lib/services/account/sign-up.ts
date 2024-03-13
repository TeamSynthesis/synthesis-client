import { BASE_API_URL } from "$env/static/private";

import tsr from "ts-results";
const { Ok, Err } = tsr;

const signUp = async (
  email: string,
  password: string
): Promise<
  import("ts-results").Result<{ token: string; userId: string }, string>
> => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const result: APIResponse = await fetch(BASE_API_URL + "/Auth/register", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    console.log(result)

    if (!result.isSuccess) return Err(result.errors[0]);
    return Ok({ token: result.data.token, userId: result.data.user.id });
  } catch (e) {
    console.error(e);
    return Err("An unknown error occured.  Please try again later");
  }
};


export default signUp;
