<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Input } from "$lib/ui/input";
  import { Label } from "$lib/ui/label";
  import { Loader2 } from "lucide-svelte";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";

  export let data: PageData;

  const {
    form: superFormStore,
    errors,
    constraints,
    delayed,
    enhance,
  } = superForm(data.form, {
    delayMs: 200,
    taintedMessage: null,
  });
</script>

<div
  class="h-screen overflow-hidden flex flex-col sm:flex-center pt-[20%] sm:pt-0 sm:-mt-10"
>
  <div class="sm:max-w-[28rem] w-full px-4 flex flex-col gap-6">
    <div class="flex flex-col space-y-2 sm:text-center sm:items-center">
      <h1 class="text-2xl font-semibold tracking-tight">Account details</h1>
      <p class="text-sm text-muted-foreground">
        Let's get some basic details to get started.
      </p>
    </div>

    <form use:enhance method="post">
      <div class="grid gap-2">
        <input-group class="space-y-3">
          <div class="grid gap-1">
            <Label for="username">Username</Label>
            <Input
              bind:value={$superFormStore.username}
              {...$constraints.username}
              id="username"
              name="username"
              placeholder="What should we call you?"
              type="text"
              autocomplete="off"
              required
              autocapitalize="none"
            />
            <Label
              class="italic text-muted-foreground leading-4"
              for="username"
            >
              Usernames must be at least 3 characters long and can only contain
              letters, numbers & hyphens.
            </Label>
          </div>
          <div class="grid gap-1">
            <Label for="fullname">Full name</Label>
            <Input
              bind:value={$superFormStore.fullname}
              {...$constraints.fullname}
              id="fullname"
              name="fullname"
              placeholder="Your full name"
              type="text"
              autocapitalize="none"
              autocomplete="off"
              required
              autocorrect="off"
            />
          </div>
        </input-group>

        <Button type="submit" class="mt-6" disabled={$delayed}>
          {#if $delayed}
            <Loader2 class="mr-2 animate-spin h-5 w-5" />
          {/if}
          Continue
        </Button>
      </div>
    </form>
    <p class="text-sm h-5 text-left text-destructive">
      {$errors._errors?.at(0) ?? ""}
    </p>
  </div>
</div>

NEXT -> /account/skills/
