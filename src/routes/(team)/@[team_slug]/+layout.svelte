<script lang="ts">
  import { Header } from "./_components/header";
  import { Sidebar } from "./_components/sidebar";
  import { NewProjectModal } from "./projects/[p_id]/_components/new-project-modal/";
</script>

<div class="h-screen w-full flex flex-col">
  <Header />
  <main class="w-full flex h-full">
    <Sidebar />

    <slot />
  </main>
</div>
<NewProjectModal />
