<script lang="ts">
  import { MoreHorizontal, Plus } from "lucide-svelte";
  import team from "$lib/stores/team";
  import dashboardState from "$lib/stores/dashboard-state";
  import { Badge } from "$lib/ui/badge";
  import { Button } from "$lib/ui/button";
  import { Card } from "$lib/ui/card";
  import * as DropdownMenu from "$lib/ui/dropdown-menu";
  import * as Table from "$lib/ui/table";
  import * as Avatar from "$lib/ui/avatar";
</script>

<!--   
  "members": {
    "id": string;
    "user": {
      "id": string;
      "avatarUrl": string;
      "email": string;
      "skills": string[];
    },
    "roles": string[];
  }[]; -->

<div class="p-4 w-full h-full">
  <div class="flex justify-between mb-6">
    <div>
      <h2 class="text-lg font-semibold">Members</h2>
      <p class="text-sm text-gray-500">Manage your team members here</p>
    </div>
    <Button
      on:click={() => {
        $dashboardState.isNewMemberModalOpen = true;
      }}
    >
      <Plus class="h-4 w-4 mr-2" />
      Add member
    </Button>
  </div>

  {#if $team}
    <Card class="flex flex-col p-4 h-full w-full">
      <Table.Root class="w-full h-full">
        <Table.Header>
          <Table.Row>
            <Table.Head class="hidden w-[100px] sm:table-cell">
              <span class="sr-only">Image</span>
            </Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Uername</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Role</Table.Head>
            <Table.Head>
              <span class="sr-only">Actions</span>
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body class="w-full overflow-hidden h-full">
          {#each $team.members as m, i}
            <Table.Row class="border-b border-border">
              <Table.Cell>
                <Avatar.Root class="flex-shrink-0 h-9 w-9">
                  <Avatar.Image src={m.user.avatarUrl} />
                  <Avatar.Fallback
                    >{m.user?.userName?.slice(0, 2)}
                  </Avatar.Fallback>
                </Avatar.Root>
              </Table.Cell>
              <Table.Cell class="font-medium">
                {m.user.fullName}
              </Table.Cell>
              <Table.Cell>
                {m.user.userName}
              </Table.Cell>
              <Table.Cell>
                {m.user.email}
              </Table.Cell>
              <Table.Cell class="hidden md:table-cell">
                <Badge>{m.roles[0]}</Badge>
              </Table.Cell>
              <Table.Cell>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild let:builder>
                    <Button
                      aria-haspopup="true"
                      size="icon"
                      variant="ghost"
                      builders={[builder]}
                    >
                      <MoreHorizontal class="h-4 w-4" />
                      <span class="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>Actions</DropdownMenu.Label>
                    <DropdownMenu.Item>Edit</DropdownMenu.Item>
                    <DropdownMenu.Item>Delete</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </Card>
  {/if}
</div>
