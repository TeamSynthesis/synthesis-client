import { writable } from "svelte/store";
import type { Preplan } from "./preplan";

type Team = {
  "id": string;
  "slug": string;
  "name": string
  "avatarUrl": string,
  "members": {
    "id": string;
    "user": {
      "id": string;
      "fullName": string;
      "userName": string;
      "profession": string;
      "avatarUrl": string;
      "email": string;
      "skills": string[];
    },
    "roles": string[];
  }[];
  "projects": {
    "avatarUrl": string;
    "id": string;
    "createdOn": string;
    "description": string;
    "prePlan": Preplan;
    "features": {
      "id": string;
      "name": string;
      "description": string;
      "type": string,
      "tasks":
      {
        "id": string,
        "activity": string,
        "state": string,
        "priority": string,
        "isComplete": boolean,
        "createdOn": string,
        "assignedOn": string,
        "dueDate": string
      }[]
    }[]

  }[],
  "prePlans": [
    {
      "id": string,
      "teamId": string
      "plan": Preplan,
      "status": number,
      "isSuccess": boolean
    }
  ]
}
let team = writable<Team | null>();

export default team;
export type { Team }

