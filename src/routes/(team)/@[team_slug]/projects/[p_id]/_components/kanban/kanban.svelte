<script lang="ts">
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { Button } from "$lib/ui/button";
  import {
    Clock,
    CheckSquare,
    MoreHorizontal,
    Plus,
    Send,
  } from "lucide-svelte";
  import { Label } from "$lib/ui/label";
  import { Badge } from "$lib/ui/badge";
  import * as Avatar from "$lib/ui/avatar";
  import { twMerge } from "tailwind-merge";
  import Modal from "$lib/ui/modal/modal.svelte";
  import type { Team } from "$lib/stores/team";
  import team from "$lib/stores/team";
  import Checkbox from "$lib/ui/checkbox/checkbox.svelte";

  import * as Dialog from "$lib/ui/dialog";

  import { Textarea } from "$lib/ui/textarea";
  import { Input } from "$lib/ui/input";

  export let columnItems;
  const flipDurationMs = 200;

  let isOpen: boolean = false;
  let isResultsOpen: boolean = false;

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

  let selectedFeature: Team["projects"][0]["features"][0];
  let assignedTo = $team?.members[0]!;

  $: comments = [
    {
      sender: "shamiso",
      content: "Can we break down the 3rd task into 2?",
      sentAt: "44 mins ago",
    },
  ];

  let commentBox: any;
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
      <div
        class="flex items-center pl-2 justify-between border-b shadow-sm bg-secondary font-medium"
      >
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
              "p-2 w-full my-2 gap-1 rounded-md flex-col bg-background shadow-sm border",
            )}
            animate:flip={{ duration: flipDurationMs }}
            on:click={() => {
              selectedFeature = item;
              isOpen = true;
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

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content class="max-w-screen-lg">
    <Dialog.Title>{selectedFeature?.description}</Dialog.Title>

    <div class="">
      <div>
        <div class="flex flex-row gap-8">
          <div class="mt-4 min-w-[50%]">
            <div class="flex items-center mb-4 justify-between">
              <h2 class="text-xl font-semibold">Task Details</h2>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">Status</span>
                <Badge class="rounded-full px-2 py-1" variant="outline">
                  In Progress
                </Badge>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">Due Date</span>
                <span class="text-sm text-gray-500 dark:text-gray-400"
                  >April 30, 2023</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">Assigned To</span>
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500 dark:text-gray-400"
                    >John Doe</span
                  >
                </div>
              </div>
            </div>

            <div class="mt-6 grid gap-4">
              <div class="grid gap-4 mt-6">
                {#if selectedFeature?.tasks?.length}
                  {#each selectedFeature?.tasks as t}
                    <div
                      class="rounded-lg border bg-card text-card-foreground shadow-sm"
                      data-v0-t="card"
                    >
                      <div class="p-6 justify-between flex items-center">
                        <div class="flex gap-2">
                          <Checkbox />
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
                  <div class="h-full flex items-end">
                    <Button class="w-full">
                      <Plus class="h-4 w-4 mr-2"></Plus>
                      Add task
                    </Button>
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <div class="grid gap-4 w-full">
            <div>
              <div class="mt-4 h-full space-y-4">
                <div class="flex items-center mb-4 justify-between">
                  <h2 class="text-xl font-semibold">Comments</h2>
                </div>
                <div class="overflow-y-scroll h-full">
                  {#each comments as c}
                    <div class="grid gap-2">
                      <div class="flex items-center gap-2">
                        <div
                          class="rounded-full bg-secondary aspect-square object-cover h-8 w-8"
                        ></div>
                        <div>
                          <div class="font-medium">{c.sender}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            {c.sentAt}
                          </div>
                        </div>
                      </div>
                      <p>
                        {c.content}
                      </p>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
            <div class="flex flex-row gap-2 justify-end items-end">
              <Input
                id="comment"
                bind:value={commentBox}
                placeholder="Type your comment here..."
              />
              <Button
                on:click={() => {
                  comments = [
                    ...comments,
                    {
                      sender: "you",
                      content: commentBox,
                      sentAt: "now",
                    },
                  ];
                  commentBox = "";
                }}
              >
                <Send class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>

<style>
  :global(#dnd-action-dragged-el) {
    transform: rotateX(15deg);
    background: hsl(var(--secondary)) !important;
  }
</style>
