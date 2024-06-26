<script lang="ts">
  import {
    FolderKanban,
    ChevronsLeft,
    ChevronsRight,
    Users2,
    Plus,
    Settings,
    BookText,
    Megaphone,
    LayoutDashboard,
    SidebarClose,
    Puzzle,
    SidebarOpen,
    Workflow,
    Inbox,
    InboxIcon,
    KanbanSquare,
  } from "lucide-svelte";
  import TeamSwitcher from "./team-switcher.svelte";
  import Nav from "./nav.svelte";
  import { type Team } from ".";
  import { cn } from "$lib/helpers/shadcn";
  import { Separator } from "$lib/ui/separator";
  import { Button } from "$lib/ui/button/";
  import { page as pageStore } from "$app/stores";
  import dashboardState from "$lib/stores/dashboard-state";
  import teamStore from "$lib/stores/team";

  $: page = $pageStore.url.pathname.split("/")[2] ?? "";

  const teams: Team[] = [
    {
      id: "string",
      name: "string",
      slug: "string",
      avatarUrl: "string",
    },
  ];
</script>

<aside
  class={cn(
    "flex bg-background flex-col h-full border-r",
    $dashboardState.isSidebarCollapsed ? "w-[52px]" : "w-64 min-w-64",
  )}
>
  <div
    class={cn(
      "flex items-center justify-center min-h-[52px]",
      $dashboardState.isSidebarCollapsed ? "h-[52px]" : "px-2",
    )}
  >
    <TeamSwitcher isCollapsed={$dashboardState.isSidebarCollapsed} />
  </div>
  <Separator />
  <div
    class={cn(
      "flex items-center justify-center py-2 h-[52px]",
      $dashboardState.isSidebarCollapsed ? "h-[52px]" : "px-2",
    )}
  >
    <Button
      size="icon"
      on:click={() => ($dashboardState.isNewProjectModalOpen = true)}
      class={cn(!$dashboardState.isSidebarCollapsed && "w-full")}
    >
      <Plus class={!$dashboardState.isSidebarCollapsed ? "w-4 h-4 mr-1" : ""} />
      {!$dashboardState.isSidebarCollapsed ? "New project" : ""}
    </Button>
  </div>

  <Nav
    class="place-self-end"
    isCollapsed={$dashboardState.isSidebarCollapsed}
    links={[
      {
        title: "Overview",
        icon: LayoutDashboard,
        active: page === "overview",
        href: `/@${$pageStore.params.team_slug}/overview`,
      },
    ]}
  />
  <Separator />
  <Nav
    class="place-self-end"
    isCollapsed={$dashboardState.isSidebarCollapsed}
    links={[
      {
        title: "Chat",
        icon: InboxIcon,
        active: page === "chat",
        href: `/@${$pageStore.params.team_slug}/chat`,
      },
    ]}
  />
  <Separator />
  <Nav
    class="place-self-end"
    isCollapsed={$dashboardState.isSidebarCollapsed}
    links={[
      {
        title: "Projects",
        label: `${$teamStore?.projects?.length || 0}`,
        icon: KanbanSquare,
        active: page === "projects",
        href: `/@${$pageStore.params.team_slug}/projects`,
      },
      {
        title: "Preplans",
        label: `${$teamStore?.prePlans?.length || 0}`,
        icon: Puzzle,
        active: page === "preplans",
        href: `/@${$pageStore.params.team_slug}/preplans`,
      },
      {
        title: "Members",
        label: `${$teamStore?.members?.length || 0}`,
        icon: Users2,
        active: page === "members",
        href: `/@${$pageStore.params.team_slug}/members`,
      },
    ]}
  />
  <Separator />
  <Nav
    class="place-self-end"
    isCollapsed={$dashboardState.isSidebarCollapsed}
    links={[
      {
        title: "Team settings",
        icon: Settings,
        active: page === "settings",
        href: "settings",
      },
    ]}
  />

  <div aria-hidden="true" class="flex h-full"></div>

  <Nav
    isCollapsed={$dashboardState.isSidebarCollapsed}
    links={[
      {
        title: "Help",
        icon: BookText,
        active: false,
        external: true,
        href: "https://docs.synthess.tech",
      },
      {
        title: "Feedback",
        icon: Megaphone,
        active: false,
        external: true,
        href: "https://feedback.synthess.tech",
      },
    ]}
  />
  <Button
    class="rounded-none justify-start border-x-0"
    on:click={() =>
      ($dashboardState.isSidebarCollapsed =
        !$dashboardState.isSidebarCollapsed)}
    variant="outline"
  >
    {#if $dashboardState.isSidebarCollapsed}
      <SidebarOpen class="h-4 w-4" />
    {:else}
      <SidebarClose class="h-4 w-4 mr-2" />
      Collapse sidebar
    {/if}
  </Button>
</aside>
