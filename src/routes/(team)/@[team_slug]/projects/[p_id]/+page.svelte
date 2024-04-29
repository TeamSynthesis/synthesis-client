<script lang="ts">
  import { Button } from "$lib/ui/button";
  import {
    AlertCircleIcon,
    BarChartIcon,
    BellIcon,
    CalendarIcon,
    CheckCircleIcon,
    CheckIcon,
    ClipboardIcon,
    HomeIcon,
    MoreHorizontal,
    Package2Icon,
    PackageIcon,
    PauseIcon,
    PieChart,
    SettingsIcon,
    UsersIcon,
    XIcon,
  } from "lucide-svelte";
  import { Kanban } from "./_components/kanban";
  import { Line } from "svelte-chartjs";

  import team from "$lib/stores/team";
  import { page } from "$app/stores";
  import * as Dialog from "$lib/ui/dialog";
  import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
  } from "$lib/ui/card";
  import {
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
  } from "$lib/ui/dropdown-menu";
  import dashboardState from "$lib/stores/dashboard-state";
  import { DropdownMenu } from "$lib/ui/dropdown-menu";

  let project = $team?.projects.find((p) => p.id === $page.params.p_id)!;

  let isResultsOpen: boolean = false;

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    type ChartData,
  } from "chart.js";
  import CalenderView from "./_components/calender-view/calender-view.svelte";
  import type { PageData } from "./$types";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  );

  export const data: ChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "",
        fill: true,
        lineTension: 0.3,

        backgroundColor: "rgba(184, 185, 210, .3)",
        borderColor: "#4f46e5",
        borderCapStyle: "round",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#4f46e5",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };

  let columnItems = [
    {
      id: 1,
      name: "TODO",
      items: project.features,
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
        <div class="bg-secondary h-9 w-9 rounded-md">
          <img
            src={project.prePlan.branding.icon.imgUrl}
            alt=""
            class="h-9 w-9 rounded-md"
          />
        </div>
        <div>
          <h1 class="font-medium">
            {project.prePlan.overview.suggestedNames[0].name}
          </h1>
          <h2 class="text-xs text-secondary-foreground">
            {new Date(project.createdOn).toLocaleDateString()}
          </h2>
        </div>
      </div>

      <div>
        <Button
          on:click={() => (isResultsOpen = true)}
          variant="outline"
          size="icon"
        >
          <PieChart class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <MoreHorizontal class="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div class="h-full relative w-full flex border-t">
      <div
        class="h-full absolute top-0 left-0 w-full flex min-w-0 overflow-x-scroll"
      >
        {#if $dashboardState.projectView === "calender"}
          <CalenderView />
        {:else if $dashboardState.projectView === "kanban"}
          <Kanban {columnItems} />
        {/if}
      </div>
    </div>
  </div>
</div>

<Dialog.Root bind:open={isResultsOpen}>
  <Dialog.Content class="max-w-screen-md">
    <Dialog.Title>Reports</Dialog.Title>
    <Dialog.Description
      >Showing report for {project.prePlan.overview.suggestedNames[0].name}
    </Dialog.Description>

    <main class="flex flex-1 flex-col gap-4 p-4 md:gap- md:p-6">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total<br /> Tasks</CardDescription>
            <CardTitle>
              {data.report?.data?.totalTasks ?? 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PackageIcon class="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Completed<br />Tasks</CardDescription>
            <CardTitle>
              {data.report?.data?.completedTasksCount ?? 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CheckCircleIcon class="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Overdue<br />Projects</CardDescription>
            <CardTitle>
              {data.report?.data?.overdueTasks ?? 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AlertCircleIcon class="h-8 w-8 text-red-500" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Team<br />Productivity</CardDescription>
            <CardTitle>
              {(data.report?.data?.teamProductivity ?? 0) * 100} %
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartIcon class="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </CardContent>
        </Card>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card class="col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Tasks completed</CardTitle>
          </CardHeader>
          <CardContent>
            <Line
              class="h-full w-full"
              {data}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  </Dialog.Content>
</Dialog.Root>
