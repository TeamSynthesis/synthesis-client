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
  //https://leetcode.com/problems/the-skyline-problem/description/
</script>

<Modal bind:open={$dashboardState.isJoinTeamModalOpen}>
  <svelte:fragment slot="title">
    <span> Join a team </span>
  </svelte:fragment>
  <svelte:fragment slot="description">
    <span> Enter your team slug and invite ID to continue </span>
  </svelte:fragment>

  <form
    action="/join-team"
    method="POST"
    use:enhance={onSubmit}
    class="grid gap-2"
  >
    <div class="grid gap-1">
      <Label class={"ml-2 text-xs text-secondary-foreground"} for="name"
        >Team slug</Label
      >
      <Input
        id="team-slug"
        name="team-slug"
        minlength={2}
        maxlength={64}
        placeholder="team-synthesis"
        type="text"
        autocapitalize="none"
        autocomplete="off"
        autocorrect="off"
        required
      />
    </div>
    
    <div class="grid gap-1">
      <Label class={"ml-2 text-xs text-secondary-foreground"} for="name"
        >Invite ID</Label
      >
      <Input
        id="invite-id"
        name="invite-id"
        minlength={2}
        maxlength={64}
        type="text"
        placeholder="123456"
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
