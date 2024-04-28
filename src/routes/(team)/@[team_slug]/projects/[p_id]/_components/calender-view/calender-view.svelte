<script>
  import { Card, CardContent } from "$lib/ui/card";
  import { Button } from "$lib/ui/button";
  import { Progress } from "$lib/ui/progress";
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CalendarIcon,
  } from "lucide-svelte";
</script>

<div class="flex h-full w-full">
  <div class="flex-1 overflow-auto p-6">
    <div class="grid grid-cols-7 gap-4">
      <div class="col-span-7 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Button size="icon" variant="ghost">
            <ChevronLeftIcon class="h-5 w-5" />
          </Button>
          <h2 class="text-2xl font-bold">April 2023</h2>
          <Button size="icon" variant="ghost">
            <ChevronRightIcon class="h-5 w-5" />
          </Button>
        </div>
        <div class="flex items-center gap-4">
          <Button variant="ghost">Month</Button>
          <Button variant="ghost">Week</Button>
          <Button variant="ghost">Day</Button>
        </div>
      </div>
      <div class="col-span-1 text-center text-gray-500 dark:text-gray-400">
        Sun
      </div>
      <div class="col-span-1 text-center text-gray-500 dark:text-gray-400">
        Mon
      </div>
      <div class="col-span-1 text-center text-gray-500 dark:text-gray-400">
        Tue
      </div>
      <div class="col-span-1 text-center text-gray-500 dark:text-gray-400">
        Wed
      </div>
      <div class="col-span-1 text-center text-gray-500 dark:text-gray-400">
        Thu
      </div>
      <div class="col-span-1 text-center text-gray-500 dark:text-gray-400">
        Fri
      </div>
      <div class="col-span-1 text-center text-gray-500 dark:text-gray-400">
        Sat
      </div>
      <div class="col-span-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div class="mb-2 text-center text-gray-500 dark:text-gray-400">1</div>
        <Card>
          <CardContent class="space-y-2">
            <div class="text-sm font-medium">Finalize product design</div>
            <div
              class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <CalendarIcon class="h-4 w-4" />
              <span>Apr 5</span>
            </div>
            <Progress value={75} />
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div class="mb-2 text-center text-gray-500 dark:text-gray-400">2</div>
        <Card>
          <CardContent class="space-y-2">
            <div class="text-sm font-medium">Prepare for client meeting</div>
            <div
              class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <CalendarIcon class="h-4 w-4" />
              <span>Apr 6</span>
            </div>
            <Progress value={50} />
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div class="mb-2 text-center text-gray-500 dark:text-gray-400">3</div>
        <Card>
          <CardContent class="space-y-2">
            <div class="text-sm font-medium">Review marketing campaign</div>
            <div
              class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <CalendarIcon class="h-4 w-4" />
              <span>Apr 7</span>
            </div>
            <Progress value={90} />
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div class="mb-2 text-center text-gray-500 dark:text-gray-400">4</div>
      </div>
      <div class="col-span-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div class="mb-2 text-center text-gray-500 dark:text-gray-400">5</div>
        <Card>
          <CardContent class="space-y-2">
            <div class="text-sm font-medium">Finalize product design</div>
            <div
              class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <CalendarIcon class="h-4 w-4" />
              <span>Apr 5</span>
            </div>
            <Progress value={75} />
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div class="mb-2 text-center text-gray-500 dark:text-gray-400">6</div>
        <Card>
          <CardContent class="space-y-2">
            <div class="text-sm font-medium">Prepare for client meeting</div>
            <div
              class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <CalendarIcon class="h-4 w-4" />
              <span>Apr 6</span>
            </div>
            <Progress value={50} />
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div class="mb-2 text-center text-gray-500 dark:text-gray-400">7</div>
        <Card>
          <CardContent class="space-y-2">
            <div class="text-sm font-medium">Review marketing campaign</div>
            <div
              class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
            >
              <CalendarIcon class="h-4 w-4" />
              <span>Apr 7</span>
            </div>
            <Progress value={90} />
          </CardContent>
        </Card>
      </div>
      <div class="col-span-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <div class="mb-2 text-center text-gray-500 dark:text-gray-400">8</div>
      </div>
    </div>
  </div>
</div>
