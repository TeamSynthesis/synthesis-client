<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { twMerge } from "tailwind-merge";
  import { BoxSelect, LibraryBig, Sparkles } from "lucide-svelte";
  import type { pages } from "..";

  export let changePage: (page: keyof typeof pages) => void;

  const options = [
    {
      title: "AI-Assisted",
      subTitle: "Describe your goal and let AI do the heavy lifting for you.",
      icon: Sparkles,
      name: "ai",
    },
    {
      title: "Choose a template",
      subTitle: "Start with a template from our curated list.",
      icon: LibraryBig,
      name: "template",
    },
    {
      title: "Start from scratch",
      subTitle: "Craft and design your own unique project from scratch.",
      icon: BoxSelect,
      name: "scratch",
    },
  ];
</script>

<div class="flex flex-col gap-4 w-full px-3 sm:px-0 mt-2 -mb-6">
  {#each options as o}
    <Button
      variant="outline"
      type="button"
      on:click={() => changePage(o.name)}
      class={twMerge(
        "relative p-2 px-4 shadow-sm transition-all bg-background hover:border-primary [&_svg]:text-primary hover:shadow-md gap-4 h-max line-clamp-1 flex justify-start w-full text-left whitespace-normal break-words text-wrap flex-row"
      )}
    >
      <svelte:component this={o.icon} class=" h-6 w-6 text-muted-foreground " />
      <div>
        <div class="font-semibold flex items-center gap-2 text-base">
          {o.title}
        </div>
        <p class="text-muted-foreground font-normal text-sm">
          {o.subTitle}
        </p>
      </div>
    </Button>
  {/each}
</div>
