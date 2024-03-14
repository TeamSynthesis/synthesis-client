<script lang="ts">
  import { Modal } from "$lib/ui/modal";
  import dashboardState from "$lib/stores/dashboard-state";
  import { pages } from ".";
  import Initial from "./page/initial.svelte";
  import Ai from "./page/ai.svelte";

  let loading: boolean = false;

  $: page = "initial" as keyof typeof pages;
  const changePage = (to: keyof typeof pages): void => {
    page = to;
  };

  $: if (!$dashboardState.isNewProjectModalOpen) page = "initial";
</script>

<Modal bind:open={$dashboardState.isNewProjectModalOpen}>
  <svelte:fragment slot="title">
    <span>
      {pages[page].header.title}
    </span>
  </svelte:fragment>
  <svelte:fragment slot="description">
    <span>
      {pages[page].header.description}
    </span>
  </svelte:fragment>

  {#if page == "initial"}
    <Initial {changePage} />
  {:else if page == "ai"}
    <Ai {changePage} />
  {/if}
</Modal>
