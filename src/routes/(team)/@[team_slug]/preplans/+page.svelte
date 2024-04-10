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
    {#each Array(4) as project}
        <li
          class="rounded-md bg-background flex flex-col border h-36 md:max-w-80 w-full hover:bg-secondary"
        >
          <div class="p-2 flex-1">
            <div class="text-sm text-secondary-foreground font-medium">
              Sideups
            </div>
            <div class="text-xs text-muted-foreground flex items-center">
              Side ups is a platform for startups to find their first customers.
            </div>
          </div>
  
          <div class="border-t gap-2 flex-center h-8 px-2 justify-start">
            <Avatar.Root class="flex-shrink-0 h-5 w-5">
              <Avatar.Image
                src="https://avatars.githubusercontent.com/u/4726921?v=4"
              />
              <Avatar.Fallback class="rounded-sm" />
            </Avatar.Root>
            <span class="text-xs text-muted-foreground">mike</span>
          </div>
        </li>
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
  