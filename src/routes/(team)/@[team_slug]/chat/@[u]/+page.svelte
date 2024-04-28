<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Input } from "$lib/ui/input";
  import { Loader2, Send } from "lucide-svelte";
  import * as Avatar from "$lib/ui/avatar";
  import { page } from "$app/stores";

  import team from "$lib/stores/team";
  import userStore from "$lib/stores/user";
  import { channel } from "$lib/stores/ably";
  import getRandomString from "$lib/helpers/get-random-id";
  import type { Message } from "$lib/stores/inbox";
  import inboxStore from "$lib/stores/inbox";

  let sendingStatus: "idle" | "pending" | "success" | "error" = "idle";
  $: draft = "";

  const sendMessage = async () => {
    sendingStatus = "pending";

    const message: Message = {
      content: draft,
      id: getRandomString(36),
      sender: $userStore.id.toString(),
      timestamp: new Date().toISOString(),
    };
    await $channel.publish(`chat:${$page.params.u}`, message).catch((e) => {
      console.error(e);
      sendingStatus = "error";
    });
    draft = "";
    sendingStatus = "success";
    sendingStatus = "idle";
  };

  $: messages = (
    $inboxStore.chats.find((c) => c.chatId === $page.params.u)?.messages ?? []
  ).map((m) => {
    const sender = $team?.members.find((tm) => tm.user.id === m.sender);
    console.log(sender);
    return {
      ...m,
      sender: {
        id: m.sender,
        name: sender?.user?.userName,
        avatarUrl: sender?.user?.avatarUrl,
      },
    };
  });
</script>

<div class=" w-full h-full bg-secondary relative">
  <header
    class="bg-white p-3 h-[53px] border-b gap-3 flex items-center text-gray-700"
  >
    <Avatar.Root class="flex-shrink-0 h-9 w-9 rounded-sm">
      <Avatar.Image src={$team?.avatarUrl} />
      <Avatar.Fallback>{$team?.name?.slice(0, 2)}</Avatar.Fallback>
    </Avatar.Root>
    <h1 class="text-sm font-semibold">
      {$team?.name}
    </h1>
  </header>

  <div class="h-full overflow-y-scroll p-4 pb-36">
    {#each messages as m}
      {#if m.sender.id === $userStore.id}
        <div class="flex justify-end mb-4 cursor-pointer">
          <div class="flex max-w-96 bg-primary text-white rounded-lg p-3 gap-3">
            <p class="text-xs">{m.content}</p>
          </div>
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center ml-2"
          >
            <Avatar.Root class="flex-shrink-0 h-8 w-8 rounded-full">
              <Avatar.Image src={m?.sender?.avatarUrl} />
              <Avatar.Fallback>{m.sender.name?.slice(0, 2)}</Avatar.Fallback>
            </Avatar.Root>
          </div>
        </div>
      {:else}
        <!-- Incoming Message -->
        <div class="flex mb-4 cursor-pointer">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center mr-2"
          >
            <Avatar.Root class="flex-shrink-0 h-8 w-8 rounded-full">
              <Avatar.Image src={m?.sender?.avatarUrl} />
              <Avatar.Fallback>{m.sender.name?.slice(0, 2)}</Avatar.Fallback>
            </Avatar.Root>
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
        bind:value={draft}
        class="w-full"
      />

      <Button
        on:click={sendMessage}
        disabled={sendingStatus === "pending" || draft.length < 1}
        size="icon"
        class="aspect-square"
      >
        {#if sendingStatus === "pending"}
          <Loader2 class="mr-2 animate-spin h-5 w-5" />
        {:else}
          <Send class="w-5 h-5" />
        {/if}
      </Button>
    </div>
  </footer>
</div>
