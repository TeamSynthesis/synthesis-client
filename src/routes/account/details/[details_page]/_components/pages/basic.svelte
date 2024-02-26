<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Input } from "$lib/ui/input";
  import { Label } from "$lib/ui/label";
  import { Loader2 } from "lucide-svelte";
  import { superForm, type SuperForm } from "sveltekit-superforms/client";
  import * as Avatar from "$lib/ui/avatar";

  export let superformConfig: SuperForm<PageData>;

  const {
    form: superFormStore,
    errors,
    constraints,
    delayed,
    enhance,
  } = superformConfig;
</script>

<h1 class="text-2xl font-semibold tracking-tight">Basic information</h1>
<p class="text-sm text-muted-foreground">
  Let's get some basic details to get started.
</p>

<form use:enhance method="post">
  <div class="grid gap-2">
    <input-group class="flex flex-col text-left space-y-3">
      <div class="flex-center flex-col mb-4">
        <Avatar.Root class="h-20  w-20">
          <Avatar.Image
            src={$superFormStore.avatarUrl}
            alt="@user:{$superFormStore.username}"
          />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>
        <Button variant="ghost" size="sm">Change avatar</Button>
      </div>
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
        <Label class="italic text-muted-foreground leading-4" for="username">
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
      <div class="grid gap-1">
        <Label for="profession">What do you do?</Label>
        <Input
          bind:value={$superFormStore.profession}
          {...$constraints.profession}
          id="profession"
          name="profession"
          placeholder="e.g Backend Engineer"
          type="text"
          autocapitalize="none"
          autocomplete="off"
          required
          autocorrect="off"
        />

        <Label class="italic text-muted-foreground leading-4" for="profession">
          You can always change this later
        </Label>
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
