<script lang="ts">
  import type { PageData } from "./$types";
  import * as Avatar from "$lib/ui/avatar";
  import { Input } from "$lib/ui/input";
  import { Separator } from "$lib/ui/select";
  import { cn } from "$lib/helpers/shadcn";
  import { ChevronDown, Plus, Search } from "lucide-svelte";

  import BoxWithFly from "$lib/assets/images/box-with-fly.png";
  import dashboardState from "$lib/stores/dashboard-state";
  import { twMerge } from "tailwind-merge";
  import team from "$lib/stores/team";
  import { page } from "$app/stores";
  import Button from "$lib/ui/button/button.svelte";
</script>

<div class="h-full w-full bg-secondary">

{#if $team?.projects.length}
<ul
  class={twMerge(

    "p-2 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap max-h-0",
    $dashboardState.isSidebarCollapsed &&
      "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
  )}
>
  {#each $team.projects as p}
    {@const creator = $team.members[0]}
    <a href={`/@${$page.params.team_slug}/projects/${p.id}`}>
      <li
        class="rounded-md bg-background flex flex-col border h-36 md:max-w-80 w-full hover:bg-secondary"
      >
        <div class="p-2 flex-1 flex gap-2 flex-col">
          <div class="text-sm text-secondary-foreground flex gap-2 font-medium">
            <Avatar.Root class="flex-shrink-0 rounded-sm h-10 w-10">
              <Avatar.Image
                src={p.prePlan.branding.icon.imgUrl} 
              />
              <Avatar.Fallback class="rounded-sm" />
            </Avatar.Root>
            <div class="flex flex-col">
              <span>
                {p.prePlan.overview.suggestedNames[0].name}
              </span>
              <span class="text-xs text-secondary-foreground">
                {new Date(p.createdOn).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",  
                })}
              </span>

            </div>
          </div>
          <div class="text-xs text-muted-foreground line-clamp-3 items-center">
            {p.description}
          </div>
        </div>

        <div class="border-t gap-2 flex-center h-8 px-2 justify-start">
          <Avatar.Root class="flex-shrink-0 h-5 w-5">
            <Avatar.Image
              src={creator.user.avatarUrl} 
            />
            <Avatar.Fallback class="rounded-sm" />
          </Avatar.Root>
          <span class="text-xs text-muted-foreground">
            {creator.user.userName}
          </span>
        </div>
      </li>
    </a>
      {/each}
    </ul>
{:else}
  <div class="-mt-16 flex-center flex-col h-full w-full gap-2">
    <img
      src={BoxWithFly}
      alt="No surveys created yet"
      class="h-48 w-48 text-muted-foreground stroke-1"
    />
    <h1 class="font-semibold text-xl text-secondary-foreground">
      No projects created yet ...
    </h1>
    <p class="max-w-96 text-sm text-muted-foreground text-center">
      There are no projects under your team yet. Create your first project now
      and start working on your next unicorn!
    </p>
    <Button
      size="lg"
      on:click={() => ($dashboardState.isNewProjectModalOpen = true)}
      class="mt-4 shadow-md "
    >
      <Plus class="w-5 h-5 mr-2" />
      New project
    </Button>
  </div>
{/if}
</div>
