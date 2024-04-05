<script lang="ts">
  export let description: string;
  export let suggestedNames: {
    name: string;
    reason: string;
    domainName: string;
  }[];
</script>

<div class="h-full">
  <div class="p-3">
    <h1 class="font-semibold text-lg mb-2">Description</h1>
    <p class="text-secondary-foreground">
      {description}
    </p>
  </div>

  <div class="p-3">
    <h1 class="font-semibold text-lg mb-2">Suggested names</h1>
    <div class="gap-2 grid grid-cols-2 pr-2">
      {#each suggestedNames as n, i}
        <div class="p-3 rounded-md border relative">
          <span
            class="absolute -top-2 w-6 flex-center h-6 text-primary-foreground -right-2 bg-primary rounded-full"
          >
            {i + 1}
          </span>
          <div class="font-semibold">
            {n.name}
          </div>
          <div class="text-primary mb-3">
            {n.domainName}
          </div>
          <p class="text-secondary-foreground">
            {n.reason}
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>
