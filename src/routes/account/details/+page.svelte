<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Input } from "$lib/ui/input";
  import { Label } from "$lib/ui/label";
  import { Loader2 } from "lucide-svelte";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import { Progress } from "$lib/ui/progress";
  import * as Avatar from "$lib/ui/avatar";
  import * as Select from "$lib/ui/select";
  import { PROFESSIONS } from "$lib/consts";

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

  let page: number = 1;
</script>

<div
  class="h-screen overflow-hidden flex flex-col sm:flex-center pt-[20%] sm:pt-0 sm:-mt-10"
>
  <div class="sm:max-w-[28rem] w-full px-4 flex flex-col gap-6">
    <div class="flex flex-col space-y-2 sm:text-center sm:items-center">
      <div class="w-full flex flex-col mb-2">
        <Label for="progress" class="text-right w-full mb-2 -translate-x-2"
          >{page}/3</Label
        >
        <Progress id="progress" value={(page / 3) * 100} />
      </div>

      <h1 class="text-2xl font-semibold tracking-tight">Basic information</h1>
      <p class="text-sm text-muted-foreground">
        Let's get some basic details to get started.
      </p>
    </div>

    <form use:enhance method="post">
      <div class="grid gap-2">
        <input-group class="space-y-3">
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
          <div class="grid gap-1">
            <Label for="profession">What do you do?</Label>
            <Select.Root selected={$superFormStore.profession}>
              <Select.Trigger class="w-full">
                <Select.Value placeholder="Please choose ..." />
              </Select.Trigger>
              <Select.Content>
                {#each PROFESSIONS as p}
                  <Select.Item value={p}>p</Select.Item>
                {/each}
                <Select.Item value="Other">Other</Select.Item>
              </Select.Content>
              <Select.Value />
            </Select.Root>

            <Input
              bind:value={$superFormStore.fullname}
              {...$constraints.fullname}
              id="profession"
              name="profession"
              placeholder="Please choose ..."
              type="text"
              autocapitalize="none"
              autocomplete="off"
              required
              autocorrect="off"
            />
            <Label
              class="italic text-muted-foreground leading-4"
              for="profession"
            >
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
  </div>
</div>

NEXT -> /account/skills/
