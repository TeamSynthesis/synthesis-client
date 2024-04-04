<script lang="ts">
  import { Label } from "$lib/ui/label";
  import { Button } from "$lib/ui/button";
  import slugify from "$lib/helpers/slugify";
  import dashboardState from "$lib/stores/dashboard-state";
  import Input from "$lib/ui/input/input.svelte";
  import { Loader2 } from "lucide-svelte";
  import Textarea from "$lib/ui/textarea/textarea.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
    import { Modal } from "$lib/ui/modal";

  let loading: boolean;
  let error: string = "";

  const onSubmit: SubmitFunction = async () => {
    loading = true;
    error = "";
    return ({ result }) => {
      //@ts-ignore

      if (result?.data?.location) {
        //@ts-ignore
        location.href = result?.data?.location;
        return;
      }
      //@ts-ignore
      error = result?.data?.message;
      loading = false;
    };
  };
</script>

<Modal bind:open={$dashboardState.isNewTeamModalOpen}>
  <svelte:fragment slot="title">
    <span> Create new team </span>
  </svelte:fragment>
  <svelte:fragment slot="description">
    <span> Add a team name, slug and description to continue </span>
  </svelte:fragment>

  <form
    action="/new-team"
    method="POST"
    use:enhance={onSubmit}
    class="grid gap-2"
  >
    <div class="grid gap-1">
      <Label class={"ml-2 text-xs text-secondary-foreground"} for="name"
        >Team name</Label
      >
      <Input
        id="name"
        name="name"
        minlength={2}
        maxlength={64}
        placeholder="Team synthesis"
        type="text"
        autocapitalize="none"
        autocomplete="off"
        autocorrect="off"
        required
      />
    </div>
    <div class="grid gap-1">
      <Label class={"ml-2 text-xs text-secondary-foreground"} for="name"
        >Team slug</Label
      >
      <Input
        id="slug"
        name="slug"
        minlength={2}
        maxlength={64}
        placeholder="team-synthesis"
        type="text"
        autocapitalize="none"
        autocomplete="off"
        autocorrect="off"
        required
      />
      <Label class={"ml-2 text-xs italic text-secondary-foreground"} for="name">
        Slugs are short and unique names given to your team that are used to
        access it. They can only contain alphanumeric characters and dashes(-)
      </Label>
    </div>
    <div class="grid gap-1">
      <Label class={"ml-2 text-xs text-secondary-foreground"} for="name"
        >Team description</Label
      >
      <Textarea
        id="description"
        name="description"
        minlength={2}
        placeholder="We are a team dedicated to ..."
        autocapitalize="none"
        autocomplete="off"
        autocorrect="off"
        required
      />
    </div>
    <p class="text-sm h-5 text-left w-full text-destructive">
      {error}
    </p>

    <div class="mt-6 -mb-4 w-full flex justify-end">
      <Button type="submit" disabled={loading}>
        {#if loading}
          <Loader2 class="mr-2 animate-spin h-5 w-5" />
        {/if}
        Continue
      </Button>
    </div>
  </form>
</Modal>
