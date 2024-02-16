<script>
  import { Button } from "$lib/ui/button";
  import { Calendar, KanbanIcon } from "lucide-svelte";
  import { Kanban } from "./_components/kanban";

  let columnItems = [
    {
      id: 1,
      name: "TODO",
      items: [
        {
          id: 41,
          title: "Create Kanbana board",
          description:
            "Create a fully interactive kanban board that'll allow team members to add tasks.",
        },
        {
          id: 4,
          title: "Create Kanbana board",
          description:
            "Create a fully interactive kanban board that'll allow team members to add tasks.",
        },
        {
          id: 1,
          title: "Create Kanbana board",
          description:
            "Create a fully interactive kanban board that'll allow team members to add tasks.",
        },
        {
          id: 141,
          title: "Create Kanbana board",
          description:
            "Create a fully interactive kanban board that'll allow team members to add tasks.",
        },
        {
          id: 421,
          title: "Create Kanbana board",
          description:
            "Create a fully interactive kanban board that'll allow team members to add tasks.",
        },
        {
          id: 416,
          title: "Create Kanbana board",
          description:
            "Create a fully interactive kanban board that'll allow team members to add tasks.",
        },
      ],
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

<div class="w-full h-full flex flex-col">
  <div class="border-b p-2 h-min w-full flex-center">
    <Button variant="outline" size="icon">
      <KanbanIcon class="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon">
      <Calendar class="h-4 w-4" />
    </Button>
  </div>
  <div class="h-full relative w-full flex">
    <div
      class="h-full absolute top-0 left-0 w-full flex min-w-0 overflow-x-scroll"
    >
      <Kanban {columnItems} />
    </div>
  </div>
</div>
