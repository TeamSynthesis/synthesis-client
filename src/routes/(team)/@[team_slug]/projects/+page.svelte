<script lang="ts">
  import type { PageData } from "./$types";
  import * as Avatar from "$lib/ui/avatar";
  import { Input } from "$lib/ui/input";
  import { Separator } from "$lib/ui/select";
  import { cn } from "$lib/helpers/shadcn";
  import { ChevronDown, Search } from "lucide-svelte";

  import dashboardState from "$lib/stores/dashboard-state";
  import { twMerge } from "tailwind-merge";
</script>

<div class="flex items-center"></div>
<li
  class={twMerge(
    "p-2 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap max-h-0",
    $dashboardState.isSidebarCollapsed &&
      "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
  )}
>
  {#each Array(4) as project}
    <ul
      class="rounded-md flex flex-col border h-36 md:max-w-80 w-full hover:bg-secondary"
    >
      <div class="p-2 flex-1">
        <div class="text-sm text-secondary-foreground font-medium">Sideups</div>
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
    </ul>
  {/each}
</li>
