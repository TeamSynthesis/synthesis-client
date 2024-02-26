import { writable } from "svelte/store";

let dashboardState = writable({
  isSidebarCollapsed: false,
  isNewProjectModalOpen: false,
});

export default dashboardState;
