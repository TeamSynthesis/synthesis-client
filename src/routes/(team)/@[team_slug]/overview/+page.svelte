<script lang="ts">
  import { Button } from "$lib/ui/button";
  import * as Avatar from "$lib/ui/avatar";
  import {
    Plus,
    ListTodo,
    Users,
    Workflow,
    AlertTriangle,
    Kanban,
    KanbanSquare,
  } from "lucide-svelte";
  import { twMerge } from "tailwind-merge";
  import userStore from "$lib/stores/user";
  import dashboardState from "$lib/stores/dashboard-state";
  import teamStore from "$lib/stores/team";

  const quickInsights: {
    title: string;
    used: number;
    limit: number | null;
    link: string;
    icon: any;
  }[] = [
    {
      title: "Projects created",
      used: $teamStore?.projects?.length || 0,
      limit: null,
      link: `/${$teamStore?.slug}/projects`,
      icon: KanbanSquare,
    },
    {
      title: "Tasks completed",
      used: 0,
      limit: 0,
      link: `/${$teamStore?.slug}/projects`,
      icon: ListTodo,
    },
    {
      title: "Detected issues",
      used: 0,
      limit: null,
      link: `/${$teamStore?.slug}/reports`,
      icon: AlertTriangle,
    },
    {
      title: "Team members",
      used: $teamStore?.projects?.length || 0,
      limit: null,
      link: "/teams",
      icon: Users,
    },
  ];
</script>

<main class="h-full w-full max-w-screen-lg p-2 sm:p-6">
  <div class="flex justify-between items-center">
    <div class="items-center flex gap-4">
      <Avatar.Root class="h-11 text-sm w-11">
        <Avatar.Image src={$userStore.avatarUrl} alt={$userStore?.userName} />
        <Avatar.Fallback class="capitalize">
          {$userStore?.userName?.slice(0, 2)}
        </Avatar.Fallback>
      </Avatar.Root>
      <div class="flex flex-col">
        <h1 class="sm:text-lg text-md mb-0 font-medium">
          Hey, <span class="capitalize">{$userStore.userName}!</span>
        </h1>
        <p class="text-sm text-gray-600">
          Here's what's happening in <b>{$teamStore?.name}</b> today.
        </p>
      </div>
    </div>
    <Button
      on:click={() => ($dashboardState.isNewProjectModalOpen = true)}
      class="shadow-md "
    >
      <Plus class="w-5 h-5 mr-2" />
      New project
    </Button>
  </div>
  <div
    class="mt-6 grid grid-cols-2 md:grid-cols-4 justify-center w-full items-center gap-4"
  >
    {#each quickInsights as i}
      {@const color = !i.limit
        ? "bg-green-600 text-green-600"
        : i.used / i?.limit > 0.8
          ? "bg-red-600 text-red-600"
          : i.used / i?.limit > 0.5
            ? "bg-amber-600 text-amber-600"
            : "bg-green-600 text-green-600"}
      <a
        href={i.link}
        class="p-2 hover:shadow-md bg-background relative flex overflow-hidden shadow-sm h-20 w-full flex-col rounded-md border transition-all ease-in-out"
      >
        <div class="flex justify-between items-center">
          <div class="text-xs text-muted-foreground flex font-medium uppercase">
            <svelte:component this={i.icon} class="h-4 w-4 mr-2" />
            {i.title}
          </div>
        </div>
        <div class="flex flex-row">
          <span class={twMerge("font-bold", color, "bg-transparent")}>
            {i.used}{i.limit == null ? "" : `/${i.limit}`}
          </span>
        </div></a
      >
    {/each}
  </div>

  <div class="w-full h-64 border mt-8 shadow-sm rounded-md">
    <div
      class="text-sm bg-background flex p-2 justify-between items-center h-8 border-border border-b"
    >
      <div>Project issues</div>
    </div>
    <p class="p-2 text-xs">
      Yaay, there are no pending issues in <b>{$teamStore?.name}</b>. 🎉
    </p>
  </div>
</main>
