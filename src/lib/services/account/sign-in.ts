import { BASE_API_URL } from "$env/static/private";

import tsr from "ts-results";
const { Ok, Err } = tsr;

const signIn = async (
    email: string,
    password: string
): Promise<
    import("ts-results").Result<{ token: string; userId: string }, string>
> => {
    const formData = new FormData();
    formData.append("UsernameEmail", email);
    formData.append("password", password);

    try {
        const result: APIResponse = await fetch(BASE_API_URL + "/Auth/login", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        console.log(result)

        //@ts-ignore
        if (!result.isSuccess) return Err(result.errors[0]);
        return Ok({ token: result.data.token, userId: result.data.userId });
    } catch (e) {
        console.error(e);
        return Err("An unknown error occured.  Please try again later");
    }
};


export default signIn;
