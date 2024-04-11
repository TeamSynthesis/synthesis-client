<script lang="ts">
  import { Button } from "$lib/ui/button";
  import {
    Calendar,
    KanbanIcon,
    ListTodo,
    MoreHorizontal,
    X,
    MoreVertical,
    Settings,
    Settings2,
  } from "lucide-svelte";
  import { Kanban } from "./_components/kanban";
  import { PreplanDialog } from "./_components/preplan-dialog";
  import team from "$lib/stores/team";
    import { page } from "$app/stores";

  let project = $team?.projects.find((p) => p.id === $page.params.p_id)!;

  let columnItems = [
    {
      id: 1,
      name: "TODO",
      items: project.features
    },
    {
      id: 2,
      name: "DOING",
      items: [],
    },
    {
      id: 3,
      name: "DONE",
      items: [],
    },
  ];
</script>

<div class="flex w-full h-full">
  <div class="w-full h-full flex flex-col justify-between">
    <div class="px-2 min-h-[52px] flex items-center justify-between gap-2">
      <div class=" flex items-center gap-2">
        <div class="bg-secondary h-9 w-9 rounded-md"></div>
        <div>
          <h1 class="font-medium">Webapp</h1>
          <h2 class="text-xs text-secondary-foreground">Tasks</h2>
        </div>
      </div>

      <div>
    
        <Button variant="ghost" size="icon">
          <MoreHorizontal class="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div class="h-full relative w-full flex border-t">
      <div
        class="h-full absolute top-0 left-0 w-full flex min-w-0 overflow-x-scroll"
      >
        <Kanban {columnItems} />
      </div>
    </div>
  </div>
</div>

