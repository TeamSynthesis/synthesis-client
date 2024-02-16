<script lang="ts">
  // This is done in a single file for clarity. A more factored version here: https://svelte.dev/repl/288f827275db4054b23c437a572234f6?version=3.38.2
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { Button } from "$lib/ui/button";
  import { Menu, Clock, CheckSquare, MoreHorizontal } from "lucide-svelte";
  import { Badge } from "$lib/ui/badge";
  import { twMerge } from "tailwind-merge";
  export let columnItems;
  const flipDurationMs = 200;

  function handleDndConsiderColumns(e) {
    columnItems = e.detail.items;
  }
  function handleDndFinalizeColumns(e) {
    columnItems = e.detail.items;
    consideredId = null;
  }
  function handleDndConsiderCards(cid, e) {
    const colIdx = columnItems.findIndex((c) => c.id === cid);
    columnItems[colIdx].items = e.detail.items;
    columnItems = [...columnItems];
  }
  function handleDndFinalizeCards(cid, e) {
    const colIdx = columnItems.findIndex((c) => c.id === cid);
    columnItems[colIdx].items = e.detail.items;
    columnItems = [...columnItems];
  }
  function handleClick(e) {
    alert("dragabble elements are still clickable :)");
  }
</script>

<section
  class="h-full w-max flex gap-2 p-2"
  use:dndzone={{ items: columnItems, flipDurationMs, type: "columns" }}
  on:consider={handleDndConsiderColumns}
  on:finalize={handleDndFinalizeColumns}
>
  {#each columnItems as column (column.id)}
    <div
      class="h-full w-80 border rounded-md bg-muted overflow-hidden"
      animate:flip={{ duration: flipDurationMs }}
    >
      <div class="flex items-center pl-2 justify-between font-medium">
        {column.name}
        <Button size="icon" variant="ghost">
          <MoreHorizontal class="h-4 w-4" />
        </Button>
      </div>
      <div
        class={twMerge("h-full overflow-y-auto p-2")}
        use:dndzone={{ items: column.items, flipDurationMs }}
        on:consider={(e) => handleDndConsiderCards(column.id, e)}
        on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
      >
        {#each column.items as item (item.id)}
          <div
            class={twMerge(
              "p-2 w-full my-2 gap-1 rounded-md flex-col bg-background shadow-sm border"
            )}
            animate:flip={{ duration: flipDurationMs }}
            on:click={handleClick}
          >
            <div class="text-sm font-medium">
              {item.title}
            </div>
            <p class="text-xs text-secondary-foreground">
              {item.description}
            </p>

            <div class="mt-6 flex gap-2 text-muted-foreground">
              <span class="flex gap-1 text-xs">
                <Clock class="h-4 w-4 text-muted-foreground" />
                15 Feb
              </span>
              <span class="flex gap-1 text-xs">
                <CheckSquare class="h-4 w-3 text-muted-foreground" />
                2/3
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>

<style>
  :global(#dnd-action-dragged-el) {
    transform: rotateX(15deg);
    background: hsl(var(--secondary)) !important;
  }
</style>
