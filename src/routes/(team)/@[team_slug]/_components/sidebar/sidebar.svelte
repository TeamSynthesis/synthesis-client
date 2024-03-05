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
    SidebarOpen,
  } from "lucide-svelte";
  import TeamSwitcher from "./team-switcher.svelte";
  import Nav from "./nav.svelte";
  import { type Team } from ".";
  import { cn } from "$lib/helpers/shadcn";
  import { Separator } from "$lib/ui/separator";
  import { Button } from "$lib/ui/button/";
  import { page as pageStore } from "$app/stores";
  import dashboardState from "$lib/stores/dashboard-state";

  $: page = $pageStore.url.pathname.split("/")[2] ?? "";

  const teams: Team[] = [
    {
      id: "string",
      name: "string",
      slug: "string",
      avatarUrl: "string",
    },
  ];
  let selectedTeam: Team = teams[0];
</script>

<aside
  class={cn(
    "flex flex-col h-full border-r",
    $dashboardState.isSidebarCollapsed ? "w-[52px]" : "w-64 min-w-64"
  )}
>
  <div
    class={cn(
      "flex items-center justify-center min-h-[52px]",
      $dashboardState.isSidebarCollapsed ? "h-[52px]" : "px-2"
    )}
  >
    <TeamSwitcher
      bind:selectedTeam
      isCollapsed={$dashboardState.isSidebarCollapsed}
      {teams}
    />
  </div>
  <Separator />
  <div
    class={cn(
      "flex items-center justify-center py-2 h-[52px]",
      $dashboardState.isSidebarCollapsed ? "h-[52px]" : "px-2"
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
        href: `/@${selectedTeam.slug}/overview`,
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
        label: "2",
        icon: FolderKanban,
        active: page === "projects",
        href: `/@${selectedTeam.slug}/projects`,
      },

      {
        title: "Members",
        label: "4",
        icon: Users2,
        active: page === "member",
        href: `/@${selectedTeam.slug}/member/all`,
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
    class="rounded-none border-x-0"
    on:click={() =>
      ($dashboardState.isSidebarCollapsed =
        !$dashboardState.isSidebarCollapsed)}
    variant="outline"
  >
    {#if $dashboardState.isSidebarCollapsed}
      <SidebarOpen class="h-4 w-4" />
    {:else}
      <SidebarClose class="h-4 w-4" />
    {/if}
  </Button>
</aside>
