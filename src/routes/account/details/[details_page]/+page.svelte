<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import Basic from "./_components/pages/basic.svelte";
  import Skills from "./_components/pages/skills.svelte";
  import Team from "./_components/pages/team.svelte";

  export let data: PageData;

  const superformConfig = superForm(data.form, {
    delayMs: 200,
    taintedMessage: null,
  });
</script>

{#if $page.params.details_page === "basic"}
  <Basic {superformConfig} />
{:else if $page.params.details_page === "skills"}
  <Skills />
{:else if $page.params.details_page === "team"}
  <Team />
{/if}
