<script lang="ts">
  import { Button } from "$lib/ui/button";
  import dashboardState from "$lib/stores/dashboard-state";
  import NewTeamModal from "../../../../../(team)/@[team_slug]/_components/new-team-modal/new-team-modal.svelte";
    import JoinTeamModal from "../../../../../(team)/@[team_slug]/_components/join-team-modal/join-team-modal.svelte";
</script>

<h1 class="text-2xl font-semibold tracking-tight">Join or create team</h1>
<p class="text-sm text-muted-foreground">
  Great! Now that we've gotten your details, lets either join or create a team
</p>

<div class="grid gap-2 w-full">
  <Button
    on:click={() => ($dashboardState.isNewTeamModalOpen = true)}
    
    class="mt-6 w-full">Create team</Button
  >

  <Button 
  on:click={() => ($dashboardState.isJoinTeamModalOpen = true)}

   variant="outline" class="w-full">Join a team</Button>
</div>

<NewTeamModal />
<JoinTeamModal />
