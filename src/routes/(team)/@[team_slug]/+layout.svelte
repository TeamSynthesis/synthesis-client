<script lang="ts">
  import { Header } from "./_components/header";
  import { Sidebar } from "./_components/sidebar";
</script>

<div class="h-screen w-full flex flex-col">
  <Header />
  <main class="w-full flex h-full">
    <Sidebar />

    <slot />
  </main>
</div>
