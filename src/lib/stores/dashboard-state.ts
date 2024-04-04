import { writable } from "svelte/store";

let dashboardState = writable({
  isSidebarCollapsed: false,
  isNewProjectModalOpen: false,
  isNewTeamModalOpen: false
});

export default dashboardState;
