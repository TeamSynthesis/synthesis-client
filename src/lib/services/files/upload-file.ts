import { BASE_API_URL } from "$env/static/private";
import tsr, { type Result } from "ts-results";
const { Ok, Err } = tsr;

const uploadFile = async (file: File, filename: string): Promise<Result<{ url: string }, string>> => {
  const form = new FormData()
  form.append("file", file)

  try {
    const result: APIResponse = await fetch(BASE_API_URL + "/BlobStorage?fileName=" + filename, {
      method: "POST",
      body: form
    }).then((r) => {
      console.log(r)
      return r.json()
    })

    if (!result.isSuccess) return Err(result.errors[0]);

    return Ok({ url: result.data.url });
  } catch (e) {
    console.error(e);
    return Err("An unknown error occured.  Please try again later");
  }
}

export default uploadFile;