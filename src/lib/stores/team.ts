import { writable } from "svelte/store";

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
  "projects": []
}
let team = writable<Team | null>();

export default team;
export type { Team }
