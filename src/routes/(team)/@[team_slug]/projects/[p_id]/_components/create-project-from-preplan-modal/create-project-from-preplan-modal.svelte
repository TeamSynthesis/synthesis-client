<script lang="ts">
    import { Button } from "$lib/ui/button";
    import { Input } from "$lib/ui/input";
    import { Label } from "$lib/ui/label";
    import { Textarea } from "$lib/ui/textarea";
    import { Loader2 } from "lucide-svelte";
    import {page} from "$app/stores"
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { goto } from "$app/navigation";
    import dashboardState from "$lib/stores/dashboard-state";
    import { Modal } from "$lib/ui/modal";
    import { pages } from "../new-project-modal";
  
  
    let loading: boolean = false;
    let error: string = "";
  
    const submit: SubmitFunction = (e) => {
      loading = true;
      return (p) => {
        
        //@ts-ignore
        if(p.result?.location){
  
          //@ts-ignore
          location.href = p.result?.location;
          return
        }
        //@ts-ignore
        error = p.result?.data?.message
        loading = false;
      };
    };
  </script>
  
  
<Modal bind:open={$dashboardState.createProjectFromPreplanModalOpen}>
    <svelte:fragment slot="title">
      <span>
        Create a project
      </span>
    </svelte:fragment>
    <svelte:fragment slot="description">
      <span>
        Generate a project from the prepan
    </span>
    </svelte:fragment>
  <form
    use:enhance={submit}
    method="POST"
    action={`/@${$page.params.team_slug}/projects/generate-from-preplan`.toString()}
    class="flex flex-col gap-4 w-full px-3 sm:px-0 mt-2 -mb-6"
  >
      <div class="grid gap-1">
        <input type="hidden" class="hidden" name="preplan_id" value={$page.params?.pp_id} />
        <Label for="description">Project name</Label>
        <Input
          id="prompt"
          name="prompt"
          placeholder="Pied piper"
          minlength={2}
          maxlength={64}
          required
        />
      </div>
  
  <div class="flex gap-2 flex-col justify-end mt-3">
    <p class="text-destructive w-full text-left">
      {error}
    </p>
    
    <Button
      type="submit"
      disabled={loading}
    >
      {#if loading}
        <Loader2 class="mr-2 animate-spin h-5 w-5" />
      {/if}
      Create project
    </Button>
    
  </div>
  </form>
  </Modal>