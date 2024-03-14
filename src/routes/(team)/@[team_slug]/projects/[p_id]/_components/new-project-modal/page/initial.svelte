<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { twMerge } from "tailwind-merge";
  import { BoxSelect, LibraryBig, Sparkles } from "lucide-svelte";
  import type { pages } from "..";

  export let changePage: (page: keyof typeof pages) => void;

  const options: {
    name: keyof typeof pages;
    title: string;
    subTitle: string;
    icon: any;
  }[] = [
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

<div class="flex flex-col gap-4 w-full px-3 sm:px-0 mt-2 -mb-3">
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

<style lang="postcss">
  :global(.fancy-border) {
    /* --angle: 0deg;
    border: 2px solid;
    border-image: conic-gradient(
        from var(--angle),
        red,
        yellow,
        lime,
        aqua,
        blue,
        magenta,
        red
      )
      1;

    animation: 10s rotate linear infinite; */
    position: relative;
  }
  :global(.fancy-border)::before {
    content: "";
    position: absolute;
    inset: 0;
    @apply rounded-md;
    padding: 2.5px;
    background: conic-gradient(
      from var(--angle),
      theme("accentColor.red.600"),
      theme("accentColor.red.600"),
      theme("accentColor.yellow.400"),
      theme("accentColor.lime.400"),
      theme("accentColor.sky.500"),
      theme("accentColor.indigo.600"),
      theme("accentColor.indigo.500"),
      red
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  @keyframes rotate-bg {
    from {
      background-: 100%;
    }
    to {
      background-size: 1000%;
    }
  }

  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }
</style>
