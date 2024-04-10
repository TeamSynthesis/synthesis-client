<script lang="ts">
      import user from "$lib/stores/user";
</script>

{#if $user}
    <h1>
        {$user}
    </h1>
{/if}
<h1>Welcome to SvelteKit</h1>
