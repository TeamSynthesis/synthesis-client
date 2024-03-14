import { BASE_API_URL } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";
import tsr, { type Result } from "ts-results";

const { Ok, Err } = tsr;

type Projects = {
  id: string;
}[]


const getProjects = async (args: { teamId: string }, e: RequestEvent): Promise<Result<Projects, string>> => {
  const result = await fetch(BASE_API_URL + "/"args.teamId, {
    method: "GET"
  })
}