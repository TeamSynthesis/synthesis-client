<script lang="ts">
  import { Modal } from "$lib/ui/modal";
  import { Button } from "$lib/ui/button";
  import dashboardState from "$lib/stores/dashboard-state";
  import { createProjectFromOptions } from ".";
  import { twMerge } from "tailwind-merge";
  import { pages } from ".";
  import { Input } from "$lib/ui/input";
  import { Label } from "$lib/ui/label";
  import { Textarea } from "$lib/ui/textarea";
  import { Loader2 } from "lucide-svelte";
  import { page as pageStore } from "$app/stores";

  let loading: boolean = false;

  let createProjectFrom: "scratch" | "template" | "ai";
  $: page = "initial" as keyof typeof pages;

  const submit = (): void => {};
</script>

<form action="/{$pageStore.params.p_id}/projects/new" method="post">
  <input
    type="text"
    class="hidden"
    value={createProjectFrom}
    name="create-project-from"
  />
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
    <div class="flex flex-col gap-4 w-full px-3 sm:px-0 mt-2">
      {#if page === "initial"}
        {#each createProjectFromOptions as o}
          <Button
            variant="outline"
            type="button"
            on:click={() => {
              page = o.name;
            }}
            class={twMerge(
              "fancy-pansy-border relative p-2 px-4 shadow-sm transition-all bg-background hover:border-primary [&_svg]:text-primary hover:shadow-md gap-4 h-max line-clamp-1 flex justify-start w-full text-left whitespace-normal break-words text-wrap flex-row",
              createProjectFrom === o.name && "bg-secondary border-primary"
            )}
          >
            <svelte:component
              this={o.icon}
              class=" h-6 w-6 text-muted-foreground "
            />
            <div>
              <div class="font-semibold flex items-center gap-2 text-base">
                {o.title}
              </div>
              <p class="text-muted-foreground font-normal text-sm">
                {o.subTitle}
              </p>
            </div>
          </Button>
        {/each}
      {:else if page === "ai"}
        <input-group class="space-y-3">
          <div class="grid gap-1">
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Pied piper"
              type="name"
              minlength={2}
              maxlength={64}
              autocapitalize="none"
              autocomplete="off"
              autocorrect="off"
              required
            />
          </div>
          <div class="grid gap-1">
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="A mobile messaging app that ..."
              minlength={32}
              maxlength={2056}
              required
            />
            <Label
              class="italic text-muted-foreground leading-4"
              for="description"
            >
              PS: Writing a more detailed description will lead to a better
              result, so go all out. Need some inspo? Check out <a
                href="/prompt-examples">our examples</a
              >
            </Label>
          </div>
        </input-group>
      {/if}
    </div>
    <div class="flex gap-2 justify-end mt-3" slot="footer">
      {#if page === "ai"}
        <Button
          variant="outline"
          type="submit"
          on:click={() => {
            page = createProjectFrom;
          }}>Back</Button
        >

        <Button type="submit" disabled={loading}>
          {#if loading}
            <Loader2 class="mr-2 animate-spin h-5 w-5" />
          {/if}
          Create project
        </Button>
      {/if}
    </div>
  </Modal>
</form>
