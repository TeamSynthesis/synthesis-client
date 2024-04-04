<script>
import userStore from "$lib/stores/user";
  import * as Avatar from "$lib/ui/avatar";
  import { Button } from "$lib/ui/button";
  import { page } from "$app/stores";
  import { Bell, Calendar, KanbanIcon, ListTodo, Search } from "lucide-svelte";
    import { Logo } from "$lib/ui/logo";
</script>

<header class="border-b w-full h-[52px] flex justify-between p-2">
  <span class="flex gap-2 justify-start items-center flex-1">
    <Logo class="h-12 w-12 mb-1" />
    <span class="font-medium text-secondary-foreground hidden sm:flex"
      >Synthesis</span
    >
  </span>
  <div id="header-center" class="flex-1">
    {#if $page.params.p_id}
      <div class="flex-center space-x-2">
        <Button variant="ghost" size="icon">
          <ListTodo class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <KanbanIcon class="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Calendar class="h-4 w-4" />
        </Button>
      </div>
    {/if}
  </div>
  <span class="flex gap-2 justify-end flex-1">
    <div class="flex">
      <Button variant="ghost" class="rounded-full min-w-9 " size="icon">
        <Search class="h-4 w-4" />
      </Button>
      <Button variant="ghost" class="rounded-full min-w-9 " size="icon">
        <Bell class="h-4 w-4" />
      </Button>
    </div>

    <Avatar.Root class="flex-shrink-0 h-9 w-9">
      <Avatar.Image src={$userStore.avatarUrl}/>
      <Avatar.Fallback>{$userStore?.userName?.slice(0, 2)}
      </Avatar.Fallback>
    </Avatar.Root>
  </span>
</header>
