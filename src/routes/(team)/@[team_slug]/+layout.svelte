<script lang="ts">
  import { AlertTriangle, Loader2 } from "lucide-svelte";
  import type { LayoutData } from "./$types";
  import { Header } from "./_components/header";
  import { Sidebar } from "./_components/sidebar";
  import team from "$lib/stores/team";
  import { NewProjectModal } from "./projects/[p_id]/_components/new-project-modal/";
  import { navigating } from "$app/stores";

  export let data: LayoutData;

  const getTeam = async () => {
    const _team = await data.props.team;
    if (typeof _team === "string") throw new Error(_team);
    $team = _team;
    console.log("team", _team);
  };
</script>

{#if $navigating}
  <div class="h-screen w-full flex-center">
    <Loader2 class="text-primary h-5 w-5 animate-spin duration-150" />
  </div>
{:else}
  {#await getTeam()}
    <div class="h-screen w-full flex-center">
      <div class="relative flex-col flex-center">
        <Loader2 class="text-primary h-5 w-5 animate-spin duration-150" />
        <p class="text-sm text-secondary-foreground mb-4">
          Loading team
        </p>
      </div>
    </div>
  {:then _}
    <div class="h-screen w-full flex flex-col">
      <Header />
      <main class="w-full bg-gray-50 flex h-[calc(100%-52px)]">
        <Sidebar />
        <div class="w-full h-full flex-center">
          <slot />
        </div>
      </main>
    </div>
    {:catch error}
  <div class="flex flex-col items-center justify-center w-full h-screen gap-2 p-4">
    <div class="relative inline-flex">
        <AlertTriangle class="w-10 h-10 text-red-500" />
    </div>
    <div class="mt-4 text-center">
        <h1 class="text-xl font-semibold">Failed to load team</h1>
        <p class="text-sm text-secondary-foreground">
            {error.message}
        </p>
    </div>
  </div>  
  {/await}
{/if}
<NewProjectModal />
