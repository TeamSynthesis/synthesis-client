<script lang="ts">
  import { Modal } from "$lib/ui/modal";
  import dashboardState from "$lib/stores/dashboard-state";
</script>

<Modal bind:open={$dashboardState.isNewProjectModalOpen}>BIG TODO</Modal>
