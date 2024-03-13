import { BASE_API_URL } from "$env/static/private";
import type { RequestEvent } from "./$types";

export const POST = async (e: RequestEvent) => {
  const file = (await e.request.formData()).get("file") as File;

  const form = new FormData()
  form.append("file", file)

  try {
    const result: APIResponse = await fetch(BASE_API_URL + "/BlobStorage?fileName=" + e.url.searchParams.get("filename"), {
      method: "POST",
      body: form,
      headers: {
        Authorization: "Bearer " + e.cookies.get("auth_token"),
      },
    }).then((r) => r.json()
    )

    if (result.isSuccess) return new Response(JSON.stringify({ data: { url: result.data.url } }), {
      status: 200,
    })
    else {
      return new Response(JSON.stringify({ status: "error", errors: ["Internal error has occured"] }), {
        status: 500
      })
    }
  }
  catch (e) {

  }



  return new Response(JSON.stringify({ url: "fire" }), {
    status: 200,
  })
}