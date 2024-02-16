<script>
  import { Input } from "$lib/ui/input";
  import * as Avatar from "$lib/ui/avatar";
  import { Button } from "$lib/ui/button";
  import { Bell } from "lucide-svelte";
</script>

<header class="border-b w-full h-[52px] flex justify-between p-2">
  <span class="flex gap-2 justify-center items-center">
    <div class="h-9 w-9 bg-primary rounded-sm text-white p-0.5">_sy</div>
    <span class="font-medium text-secondary-foreground">Synthesis</span>
  </span>
  <span class="flex gap-2">
    <Input placeholder="Search" />
    <Button variant="ghost" class="rounded-full min-w-9 " size="icon">
      <Bell class="h-4 w-4" />
    </Button>

    <Avatar.Root class="flex-shrink-0 h-9 w-9">
      <Avatar.Image />
      <Avatar.Fallback>De</Avatar.Fallback>
    </Avatar.Root>
  </span>
</header>
