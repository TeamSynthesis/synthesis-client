<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Input } from "$lib/ui/input";
  import { Label } from "$lib/ui/label";
  import { Textarea } from "$lib/ui/textarea";
  import { Loader2 } from "lucide-svelte";
  import {page} from "$app/stores"
  import { pages } from "..";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
    import { goto } from "$app/navigation";

  export let changePage: (page: keyof typeof pages) => void;

  let loading: boolean = false;
  let error: string = "";

  const submit: SubmitFunction = (e) => {
    loading = true;
    return (p) => {
      
      console.log(p.result)
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

<form
  use:enhance={submit}
  method="POST"
  action={`/@${$page.params.team_slug}/projects/new`.toString()}
  class="flex flex-col gap-4 w-full px-3 sm:px-0 mt-2 -mb-6"
>
    <div class="grid gap-1">
      <Label for="description">Project description(prompt)</Label>
      <Textarea
        id="prompt"
        name="prompt"
        placeholder="A mobile messaging app that ..."
        minlength={32}
        rows={5}
        maxlength={2056}
        required
      />
      <Label class="italic text-muted-foreground leading-4" for="description">
        PS: Writing a more detailed description will lead to a better result, so
        go all out. Need some inspo? Check out <a href="/prompt-examples"
          >our examples</a
        >
      </Label>
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
