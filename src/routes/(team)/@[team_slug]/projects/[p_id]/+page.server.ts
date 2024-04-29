import getReport from '$lib/services/project/get-report';
import type { PageServerLoad } from './$types';

export const load = (async (e) => {
    // const report = await getReport({ projectId: e.params.p_id }, e);
    // console.log(report)
    // if (report.ok) return { report: report.val }
    // return {}

}) satisfies PageServerLoad;