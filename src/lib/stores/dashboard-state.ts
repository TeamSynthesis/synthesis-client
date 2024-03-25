import { writable } from "svelte/store";

let dashboardState = writable({
  isSidebarCollapsed: false,
  isNewProjectModalOpen: false,
  isNewTeamModalOpen: false,
  isJoinTeamModalOpen: false,
});

export default dashboardState;
