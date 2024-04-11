<script lang="ts">
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { Button } from "$lib/ui/button";
  import { Menu, Clock, CheckSquare, MoreHorizontal, Plus } from "lucide-svelte";
  import { Badge } from "$lib/ui/badge";
  import * as Avatar from "$lib/ui/avatar";
  import { twMerge } from "tailwind-merge";
    import Modal from "$lib/ui/modal/modal.svelte";
    import type { Team } from "$lib/stores/team";
    import team from "$lib/stores/team";
    import Checkbox from "$lib/ui/checkbox/checkbox.svelte";
  export let columnItems;
  const flipDurationMs = 200;

  let isOpen:boolean = false

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

  let selectedFeature:Team["projects"][0]["features"][0];
  let assignedTo = $team?.members[0]!;
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
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class={twMerge(
              "p-2 w-full my-2 gap-1 rounded-md flex-col bg-background shadow-sm border"
            )}
            animate:flip={{ duration: flipDurationMs }}
            on:click={()=>{
              selectedFeature = item;
              isOpen = true
            }}
          >
          <p class="text-xs text-secondary-foreground">
            {item.description}
          </p>
          <div class="text-sm mt-2 font-medium">
            <Badge variant="outline">
              {item.type}
            </Badge> 
          </div>
          
            <div class="mt-6 flex gap-2 text-muted-foreground">
              <span class="flex gap-1 text-xs">
                <Clock class="h-4 w-4 text-muted-foreground" />
                  {new Date(item.tasks?.at(-1)?.dueDate).toLocaleString()}
                  
              </span>
              <span class="flex gap-1 text-xs">
                <CheckSquare class="h-4 w-3 text-muted-foreground" />
                0/{item.tasks.length}
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

<Modal bind:open={isOpen}>
  <svelte:fragment slot="title">
    <span> {
      selectedFeature?.description
      } </span>
  </svelte:fragment>
  <svelte:fragment slot="description">
    <Badge variant="outline"> 
      {selectedFeature?.type}
    </Badge>
    <span class="flex gap-1 mt-3"> 
      Assigned to <b>
        {assignedTo.user.userName}</b> on <b>{" "} 
          {new Date(selectedFeature?.tasks?.at(-1)?.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",  
          })}
          </b>
    </span>
  </svelte:fragment>

<div class="grid gap-4">
  {#if selectedFeature?.tasks?.length}
  {#each selectedFeature?.tasks as t}
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
    <div class="p-6 justify-between flex items-center">
      <div class="flex gap-2">
        <Checkbox/>
        <div class="text-sm font-medium">{t.activity}</div>
      </div>
      <div class="text-sm text-gray-500">
        {new Date(t.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",  
        })}
      </div>
    </div>
  </div>
{/each}

  <Button>
    <Plus class="h-4 w-4 mr-2">
    </Plus>
    Add task
  </Button>
{/if}
</div>
</Modal>