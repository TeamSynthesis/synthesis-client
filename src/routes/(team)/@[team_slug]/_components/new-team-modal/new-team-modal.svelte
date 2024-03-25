<script lang="ts">
  import { Input } from "$lib/ui/input";
  import { Label } from "$lib/ui/label";
  import { Button } from "$lib/ui/button";
  import slugify from "$lib/helpers/slugify";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { enhance } from "$app/forms";
  import { Loader2 } from "lucide-svelte";
  import dashboardState from "$lib/stores/dashboard-state";
  import { Modal } from "$lib/ui/modal";
  import Textarea from "$lib/ui/textarea/textarea.svelte";

  export let open: boolean = false;
  export let newUser: boolean = false;

  let isLoading: boolean = false;
  let error: string = "";

  const onSubmit: SubmitFunction = (e) => {
    isLoading = true;
    return async (e) => {
      const { update, result, formData } = e;
      if (result.type === "failure") {
        isLoading = false;
        error = result.data?.message;
      }
      location.href = "/@" + formData.get("slug");
      // open = isLoading = false;

      await update();
    };
  };

  let name: string = "";
</script>

<Modal bind:open={$dashboardState.isNewTeamModalOpen}>
  <svelte:fragment slot="title">
    <span> New team </span>
  </svelte:fragment>
  <svelte:fragment slot="description">
    <span> Create a team to help organise your projects and teamates. </span>
  </svelte:fragment>
  <form
    use:enhance={onSubmit}
    method="post"
    action="/team/new"
    class="flex flex-col gap-4 w-full -mb-4 min-w-96"
  >
    <input class="hidden" name="slug" value={slugify(name)} />

    <div class="grid gap-0">
      <Label class={"ml-2 text-xs text-secondary-foreground"} for="name"
        >Team name</Label
      >
      <Input
        id="name"
        bind:value={name}
        name="name"
        minlength={2}
        maxlength={64}
        placeholder="Pied Piper"
        type="text"
        autocapitalize="none"
        autocomplete="off"
        autocorrect="off"
        disabled={isLoading}
        required
      />
    </div>
    <div class="grid gap-1 -mt-2">
      <Label class={"ml-2 text-xs text-secondary-foreground"} for="name"
        >Team description</Label
      >
      <Textarea
        id="description"
        name="description"
        minlength={2}
        maxlength={256}
        placeholder="The best team in the world"
        autocapitalize="none"
        autocomplete="off"
        autocorrect="off"
        disabled={isLoading}
        required
      />
      <Label
        class={"ml-2 h-3 text-xs text-secondary-foreground italic"}
        for="name"
      >
        {#if name.length > 1}
          Your workspace slug will be: {slugify(name)}
        {/if}
      </Label>
    </div>

    <p class="text-sm h-3.5 text-left text-destructive">{error}</p>

    <div class="flex justify-end w-full">
      <Button type="submit" disabled={isLoading}>
        {#if isLoading}
          <Loader2 class="mr-2 animate-spin h-5 w-5" />
        {/if}
        Create team
      </Button>
    </div>
  </form>
</Modal>
