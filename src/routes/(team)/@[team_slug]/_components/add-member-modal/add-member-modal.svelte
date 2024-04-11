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
    import * as Select  from "$lib/ui/select";
    import team from "$lib/stores/team"

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
      if(result?.data?.isSuccess){
        //@ts-ignore
        $dashboardState.isNewMemberModalOpen = false;
        //@ts-ignore
        alert(`Invite code for user ${result?.data?.message.email} is ${result?.data?.message.code} `)
        return     
      }
      //@ts-ignore
      error = result?.data?.message;
      loading = false;
    };
  };
  //https://leetcode.com/problems/the-skyline-problem/description/
</script>

<Modal bind:open={$dashboardState.isNewMemberModalOpen}>
  <svelte:fragment slot="title">
    <span> Add a member </span>
  </svelte:fragment>
  <svelte:fragment slot="description">
    <span> 
      Enter the users email and a role to continue  
    </span>
  </svelte:fragment>

  <form
    action="/invite-user"
    method="POST"
    use:enhance={onSubmit}
    class="grid gap-2"
  >
    
    <input type="hidden" name="team-id" value={$team?.id} />
    <div class="grid gap-1">
      <Label class={"ml-2 text-xs text-secondary-foreground"} for="name"
        >Email</Label
      >
      <Input
        id="email"
        name="email"
        minlength={2}
        maxlength={64}
        type="email"
        placeholder="john@doe.com"
        autocapitalize="none"
        autocomplete="off"
        autocorrect="off"
        required
      />
    </div>
    <div class="grid gap-1">
      <Label class={"ml-2 text-xs text-secondary-foreground"} for="name"
        >Role</Label
      >
      <Select.Root required>
        <Select.Trigger class="w-full">
          <Select.Value placeholder="Role" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="owner">Owner</Select.Item>
          <Select.Item value="member">Member</Select.Item>
        </Select.Content>
      </Select.Root>
      
    
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
