<script lang=ts>
    import dashboardState from "$lib/stores/dashboard-state";
    import type { Preplan } from "$lib/stores/preplan";
    import { twMerge } from "tailwind-merge";

    export let technologies:Preplan["technology"]
</script>


<div  class={twMerge(

    "p-2 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-wrap max-h-0",
    $dashboardState.isSidebarCollapsed &&
      "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
  )}>
    {#each technologies.techStacks as tech}
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div class="p-3 flex flex-col items-center gap-4">
        <img
          src={tech.logoUrl}
          alt="Logo"
          class="rounded-full w-16 h-15 aspect-square object-cover overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800"
        />
        <div class="text-center">
          <h3 class="text-lg font-bold">{tech.name}</h3>
          <p class="text-sm text-muted-foreground">{tech.description}</p>
          <p class="text-sm text-muted-foreground">{tech.reason}</p>    
        </div>
      </div>
    </div>

    {/each}   
  </div>