import { writable } from "svelte/store";

let dashboardState = writable({
  isSidebarCollapsed: false,
});

export default dashboardState;
