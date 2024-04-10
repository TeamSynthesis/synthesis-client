<script lang=ts>
    import { page } from "$app/stores";
    import team from "$lib/stores/team";
    import userStore from "$lib/stores/user";
    import * as Avatar from "$lib/ui/avatar";
    import Button from "$lib/ui/button/button.svelte";

    import Input from "$lib/ui/input/input.svelte";
    import Label from "$lib/ui/label/label.svelte";
    import {MessageCirclePlus, Send} from "lucide-svelte"
    import { twMerge } from "tailwind-merge";

    
 </script>
<div class="flex h-full w-full overflow-hidden">
    <div class="w-64 min-w-64 bg-white border-r border-gray-300">
      <header class="p-2 w-full border-b flex gap-2 justify-between items-center">
        <Input
                placeholder="Search"
                class="w-full"
        />
        <Button
            size="icon"
            class="aspect-square">
            <MessageCirclePlus class="w-5 h-5"/>
        </Button>
      </header>
    

      <div class="overflow-y-auto h-screen p-3 mb-9 pb-20">

        <a             href={`chat/@${$team?.slug}`}
        class={twMerge("flex items-center  gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md", $page.params.u === $team?.slug && "bg-secondary shadow-sm border")}>
            <Avatar.Root class="flex-shrink-0 h-9 w-9 rounded-sm">
                <Avatar.Image src={$team?.avatarUrl}/>
                <Avatar.Fallback>{$team?.name?.slice(0, 2)}
                </Avatar.Fallback>
              </Avatar.Root>
        
            <div class="flex-1">
              <h2 class="text-sm font-medium">{$team?.name}</h2>
              <p class="text-secondary-foreground line-clamp-1 text-xs">Okay, may we please just finish the compiler now</p>
            </div>
        </a>
        
<hr class="mt-3 mb-3">
        {#if $team?.members?.length > 1}
        {#each $team.members.filter(({user})=>$userStore.id !== user.id) as t}
        <a
        href={`chat/${$team?.slug}`}
        class="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <Avatar.Root class="flex-shrink-0 h-9 w-9">
                <Avatar.Image src={$team?.avatarUrl}/>
                <Avatar.Fallback>{$team?.name?.slice(0, 2)}
                </Avatar.Fallback>
            </Avatar.Root>

            <div class="flex-1">
            <h2 class="text-sm font-semibold">Alice</h2>
            <p class="text-secondary-foreground line-clamp-1 text-xs">Hoorayy!!</p>
            </div>
        </a>
        {/each}
        {:else}
            <p class="text-center mt-6 text-sm text-secondary-foreground">No team members yet</p>
        {/if}
      </div>
    </div>
    
    <slot/>
</div>
