import { writable } from "svelte/store";

type User = {
  id: string;
  emailConfirmed: boolean;
  email: string;
  skills: string[];
  memberProfiles: string[];
};

let user = writable<User | null>();
export default user;
