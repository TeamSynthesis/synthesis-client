<script lang="ts">
  import twColors from "tailwindcss/colors";

  export let colorPalette: {
    primary: string;
    neutral: string;
    reason: string;
  };

  export let icons: { imageUrl: string; description: string }[];
  export let mockups: { imageUrl: string; description: string }[];
</script>

<div class="overflow-y-scroll h-full">
  <div class="p-3">
    <h1 class="font-semibold text-lg mb-2">
      Here are some colors we think may look good
    </h1>
    <p class="text-secondary-foreground">
      {colorPalette.reason}
    </p>
    <div class="mt-3 space-y-2">
      {#each [colorPalette.primary, colorPalette.neutral] as c, i}
        <h2 class="text-secondary-foreground text-sm font-medium">
          {["Primary", "Neutral"][i]}
        </h2>
        <div class="flex gap-2 flex-wrap">
          {#each Object.values(twColors[c]) as cv}
            <div class="flex-center gap-1 flex-col">
              <div class={"h-14 w-14 rounded-md"} style="background:{cv}" />
              <span class="text-xs text-secondary-foreground">
                {cv}
              </span>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
  <div class="p-3">
    <h1 class="font-semibold text-lg mb-2">
      We also made some app icons for you
    </h1>
    <div class="mt-3 grid gap-3 grid-cols-3">
      {#each icons as i}
        <img
          alt={i.description}
          src={i.imageUrl}
          class="rounded-md aspect-square bg-secondary object-cover"
        />
      {/each}
    </div>
  </div>
  <div class="p-3">
    <h1 class="font-semibold text-lg mb-2">
      These mockups should help you visualize your project
    </h1>
    <div class="mt-3 grid gap-3 grid-cols-2">
      {#each mockups as i}
        <img
          alt={i.description}
          src={i.imageUrl}
          class="rounded-md aspect-video bg-secondary object-cover"
        />
      {/each}
    </div>
  </div>
</div>
