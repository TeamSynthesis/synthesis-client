<script lang="ts">
  import * as Select from "$lib/ui/select";
  import * as Avatar from "$lib/ui/avatar";
  import { cn } from "$lib/helpers/shadcn";
  import user from "$lib/stores/user";
  import { page } from "$app/stores";
  import { Plus } from "lucide-svelte";
  import { Button } from "$lib/ui/button";
  import { goto } from "$app/navigation";

  export let isCollapsed: boolean;
  $: selectedTeam = $user.memberProfiles.find(
    (mp) => mp.team.slug === $page.params.team_slug
  );
</script>

<Select.Root selected={{ value: $page.params.team_slug }}>
  <Select.Trigger
    class={cn(
      "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
      isCollapsed &&
        "flex h-9 w-9 gap-0 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&_svg]:hidden"
    )}
    aria-label="Select account"
  >
    <Avatar.Root class="flex-shrink-0 h-6 w-6 rounded-sm">
      <Avatar.Image
        class="rounded-md"
        src={selectedTeam?.team.avatarUrl}
        alt={selectedTeam?.team.name}
      />
      <Avatar.Fallback class="rounded-md" />
    </Avatar.Root>
    {#if !isCollapsed}
      <span class="ml-1">
        {selectedTeam?.team.name}
      </span>
    {/if}
  </Select.Trigger>
  <Select.Content>
    <Select.Label>Select team</Select.Label>
    <Select.Separator />
    {#each $user.memberProfiles as mp (mp.team.id)}
      <Select.Item
        on:click={() => goto(`/@${mp.team.slug}`)}
        value={mp.team.slug}
      >
        <div
          class="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground"
        >
          <Avatar.Root class="rounded-sm flex-shrink-0 h-6 w-6">
            <Avatar.Image
              class="rounded-sm"
              src={mp.team.avatarUrl}
              alt={mp.team.name}
            />
            <Avatar.Fallback class="rounded-sm" />
          </Avatar.Root>

          {mp.team.name}
        </div>
      </Select.Item>
    {/each}
    <Select.Separator />
    <Button class="w-full" variant="ghost">
      <Plus class="h-4 w-4 mr-2" /> Add team
    </Button>
  </Select.Content>
</Select.Root>
