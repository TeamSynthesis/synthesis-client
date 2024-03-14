import type { User } from "$lib/services/user/get-user-profile";
import { writable } from "svelte/store";

let user = writable<User>();
export default user;
