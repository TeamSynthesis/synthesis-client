<script lang="ts">
  import * as Select from "$lib/ui/select";
  import * as Avatar from "$lib/ui/avatar";
  import { cn } from "$lib/helpers/shadcn";
  import type { Team } from ".";

  export let teams: Team[];
  export let isCollapsed: boolean;

  export let selectedTeam: Team;
</script>

<Select.Root
  selected={{ value: selectedTeam.slug }}
  on:change={({ detail }) => (selectedTeam = detail)}
>
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
        src={selectedTeam.avatarUrl}
        alt={selectedTeam.name}
      />
      <Avatar.Fallback class="rounded-md" />
    </Avatar.Root>
    {#if !isCollapsed}
      <span class="ml-1">
        {selectedTeam.name}
      </span>
    {/if}
  </Select.Trigger>
  <Select.Content>
    <Select.Label>Select team</Select.Label>
    <Select.Separator />
    {#each teams as team (team.slug)}
      <Select.Item value={team.slug}>
        <div
          class="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground"
        >
          <Avatar.Root class="rounded-sm flex-shrink-0 h-6 w-6">
            <Avatar.Image
              class="rounded-sm"
              src={team.avatarUrl}
              alt={team.name}
            />
            <Avatar.Fallback class="rounded-sm" />
          </Avatar.Root>

          {team.name}
        </div>
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
