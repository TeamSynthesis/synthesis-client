import getAiProject from '$lib/services/project/get-ai-project';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (e) => {
    const preplan = await getAiProject({processId: e.params.pp_id}, e);
    if(preplan.ok === true)
    return new Response(JSON.stringify(preplan.val), {
        status: 200,
      })
    return new Response(JSON.stringify({status: "error", errors: [preplan.val]}), {
        status: 500
      })
};