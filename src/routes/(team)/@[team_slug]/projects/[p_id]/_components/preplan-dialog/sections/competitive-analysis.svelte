<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
</script>

<div class="w-full pr-2">
  <div class="p-3 w-full">
    <h1 class="font-semibold text-lg mb-2">Swot analysis</h1>
    <div class="gap-2 relative w-full grid grid-cols-2">
      <div
        class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-12 z-10 h-12 rounded-full border bg-secondary"
      ></div>
      {#each Object.values(swot) as n, i}
        <div
          class={twMerge(
            "p-3 flex-1 rounded-md w-full min-h-36 border relative",
            "via-background to-background shadow-sm",
            [
              "bg-gradient-to-tl bg-green-50 ",
              "bg-gradient-to-tr bg-yellow-50 ",
              "bg-gradient-to-bl bg-blue-50 ",
              "bg-gradient-to-br bg-red-50 ",
            ][i],
            "bg-background"
          )}
        >
          {Object.keys(swot)[i]}
          <!-- <div class="font-semibold">
          {n.name}
        </div>
        <div class="text-primary mb-3">
          {n.domainName}
        </div>
        <p class="text-secondary-foreground">
          {n.reason}
        </p> -->
        </div>
      {/each}
    </div>
  </div>
</div>
