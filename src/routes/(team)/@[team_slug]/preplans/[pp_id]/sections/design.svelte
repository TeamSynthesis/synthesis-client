<script lang="ts">
    import type { Preplan } from "$lib/stores/preplan";
  import twColors from "tailwindcss/colors";

  export let colorPalette: Preplan["branding"]["palette"];
  export let icon:Preplan["branding"]["icon"]
  export let wireframe:Preplan["branding"]["wireframe"]
  export let moodBoard:Preplan["branding"]["moodBoard"]

  // export let icons: { imageUrl: string; description: string }[];
  // export let mockups: { imageUrl: string; description: string }[];
</script>

<div class="overflow-y-scroll space-y-6 h-full">
  <div class="p-3">
    <h1 class="font-semibold text-lg mb-2">
      Here are some colors we think may look good
    </h1>
    <p class="text-secondary-foreground">
      {colorPalette.reason}
    </p>
    <div class="mt-6 space-y-2">
      {#each [colorPalette.primary.Name, colorPalette.secondary.Name,  colorPalette.accent.Name] as c, i}
        <h2 class="text-secondary-foreground text-sm font-medium">
          {["Primary", "Secondary", "Accent"][i]}
        </h2>
        <div class="flex gap-2 flex-wrap">
          {#each Object.values(twColors[c.split("-")[0]]) as cv}
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
      We also made an app icon for you
    </h1>
    <div class="mt-3 flex w-full gap-4">
      <img
      alt={"Generated icon"}
      src={icon.imgUrl}
      class="rounded-md aspect-square bg-secondary object-cover w-1/4"
    />
    <p>
      {icon.description}
    </p>
    </div>
  </div>
  <div class="p-3">
    <h1 class="font-semibold text-lg mb-2">
      This mockup and wireframe should help you visualize your project and draw inspiration
    </h1>
    <div class="mt-3 grid gap-3 place-content-center grid-cols-2">
      <img
      alt={"Generated icon"}
      src={wireframe.image.imgUrl}
      class="rounded-md aspect-square bg-secondary border object-cover w-full"
    />
    <img
    alt={"Generated icon"}
    src={moodBoard.imgUrl}
    class="rounded-md aspect-square bg-secondary border object-cover w-full"
  />
    </div>
  </div>
</div>
