<script lang="ts">
  import { Button } from "$lib/ui/button";
  import dashboardState from "$lib/stores/dashboard-state";
  import { NewTeamModal } from "../../../../../(team)/@[team_slug]/_components/new-team-modal";
</script>

<h1 class="text-2xl font-semibold tracking-tight">Team</h1>
<p class="text-sm text-muted-foreground">
  Do you want to create or join an existing team?
</p>
<br /><br /><br />
<div class="mt-48 w-full flex flex-col gap-2">
  <Button
    on:click={() => ($dashboardState.isNewTeamModalOpen = true)}
    class="w-full"
  >
    Create team
  </Button>
  <Button
    variant="outline"
    on:click={() => ($dashboardState.isJoinTeamModalOpen = true)}
    class="w-full"
  >
    Join team
  </Button>
</div>

<NewTeamModal />
