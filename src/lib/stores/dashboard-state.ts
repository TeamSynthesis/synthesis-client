import { writable } from "svelte/store";

let dashboardState = writable({
  isSidebarCollapsed: false,
  isNewProjectModalOpen: false,
  isNewTeamModalOpen: false,
  isJoinTeamModalOpen: false,
  isNewMemberModalOpen: false,
  projectView: "kanban" as "kanban" | "calender",
  createProjectFromPreplanModalOpen: false,
});

export default dashboardState;
