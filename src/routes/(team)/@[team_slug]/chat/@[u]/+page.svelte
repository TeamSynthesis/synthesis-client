<script lang="ts">

    import { Button } from "$lib/ui/button";
    import { Input } from "$lib/ui/input";
    import { Send } from "lucide-svelte";
    import * as Avatar from "$lib/ui/avatar";

    import team from "$lib/stores/team";
    import userStore from "$lib/stores/user";

    type Message = {
        id: string;
        content: string;
        sender: {
            id: string;
            name: string;
            avatarUrl: string;
        };
        timestamp: string;
    };

    const messages:Message[] = [
        {
            id: "1",
            content: "Team synth!",
            sender: {
                id: $userStore.id,
                name: "Alice",
                avatarUrl: $userStore.avatarUrl
            },
            timestamp: "2021-10-10T12:00:00Z"
        },
        {
            id: "2",
            content: "yesssh",
            sender: {
                id: $userStore.id,
                name: "Alice",
                avatarUrl: $userStore.avatarUrl ?? ""
            },
            timestamp: "2021-10-10T12:01:00Z"
        },
    ]

</script>
<div class="flex-1 w-full h-full bg-secondary relative">
    <header class="bg-white p-3 h-[53px] border-b gap-3 flex items-center text-gray-700">
        <Avatar.Root class="flex-shrink-0 h-9 w-9 rounded-sm">
            <Avatar.Image src={$team?.avatarUrl}/>
            <Avatar.Fallback>{$team?.name?.slice(0, 2)}
            </Avatar.Fallback>
          </Avatar.Root>
        <h1 class="text-sm font-semibold">Team uno</h1>
    </header>

    <div class="h-full overflow-y-auto p-4 pb-36">
       {#each messages as m}
        {#if m.sender.id === $userStore.id}
        <div class="flex justify-end mb-4 cursor-pointer">
          <div class="flex max-w-96 bg-primary text-white rounded-lg p-3 gap-3">
            <p class="text-xs">{m.content}</p>
          </div>
          <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img src={m.sender.avatarUrl} alt="My Avatar" class="w-8 h-8 rounded-full">
          </div>
        </div>
        {:else}
        <!-- Incoming Message -->
        <div class="flex mb-4 cursor-pointer">
          <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img src={m.sender.avatarUrl} alt="User Avatar" class="w-8 h-8 rounded-full">
          </div>
          <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p class="text-xs text-secondary-foreground">{m.content}</p>
          </div>
        </div>
        {/if}
        {/each}
    </div>
    
    <!-- Chat Input -->
    <footer class="bg-white border-t p-3 absolute bottom-0 w-full">
        <div class="flex items-center gap-3">
            <Input
                placeholder="Type a message ..."
                class="w-full"
            />

            <Button
                size="icon"
                class="aspect-square">
                <Send class="w-5 h-5"/>
            </Button>
        </div>
    </footer>
</div>