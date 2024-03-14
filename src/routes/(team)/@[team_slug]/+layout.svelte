<script lang="ts">
  import { Loader2 } from "lucide-svelte";
  import type { LayoutData } from "./$types";
  import { Header } from "./_components/header";
  import { Sidebar } from "./_components/sidebar";
  import team from "$lib/stores/team";
  import { NewProjectModal } from "./projects/[p_id]/_components/new-project-modal/";
  import { error } from "@sveltejs/kit";
  import { navigating } from "$app/stores";

  export let data: LayoutData;

  const getTeam = async () => {
    const _team = await data.props.team;
    if (!_team) throw error(404, "team_not_found");
    $team = _team;
    console.log(_team);
  };
</script>

{#if $navigating}
  <div class="h-screen w-full flex-center">
    <Loader2 class="text-primary h-5 w-5 animate-spin duration-150" />
  </div>
{:else}
  {#await getTeam()}
    <div class="h-screen w-full flex-center">
      <Loader2 class="text-primary h-5 w-5 animate-spin duration-150" />
    </div>
  {:then _}
    <div class="h-screen w-full flex flex-col">
      <Header />
      <main class="w-full bg-gray-50 flex h-full">
        <Sidebar />

        <slot />
      </main>
    </div>
  {/await}
{/if}
<NewProjectModal />
