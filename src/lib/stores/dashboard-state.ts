import { writable } from "svelte/store";

let dashboardState = writable({
  isSidebarCollapsed: false,
  isNewProjectModalOpen: false,
  isNewTeamModalOpen: false,
  isJoinTeamModalOpen: false,
  createProjectFromPreplanModalOpen: false,
});

export default dashboardState;
