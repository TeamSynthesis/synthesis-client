<script lang="ts">
  import { Button } from "$lib/ui/button";
  import { Label } from "$lib/ui/label";
  import { Loader2 } from "lucide-svelte";
  import { TECH_CATEGORIES, TECHNOLOGIES } from "$lib/consts/technologies";
  import { twMerge } from "tailwind-merge";
  import { enhance } from "$app/forms";

  let loading: boolean = false;

  $: selected = [] as string[];

  const onSubmit = () => {
    loading = true;
    return () => {
      loading = false;
    };
  };
</script>

<h1 class="text-2xl font-semibold tracking-tight">What are your skills ?</h1>
<p class="text-sm text-muted-foreground">
  Pick up to 10 technologies. You've selected <span
    class="text-primary font-semibold">{selected.length}</span
  > so far.
</p>

<form use:enhance={onSubmit} method="POST" class="w-full">
  <input
    type="text"
    id="skills"
    name="skills"
    bind:value={selected}
    class="hidden"
  />
  <div class="grid gap-2">
    <input-group class="flex flex-col text-left space-y-3">
      <div
        class="grid gap-3 overflow-y-scroll rounded-md p-2 overflow-x-hidden h-[26rem] w-full"
      >
        {#each TECH_CATEGORIES as tc}
          <div class="w-full">
            <Label
              for="fullname"
              class="w-full text-left uppercase font-medium text-sm">{tc}</Label
            >
            <div class="flex flex-wrap gap-2 mt-2">
              {#each TECHNOLOGIES as t}
                {#if t?.category === tc}
                  <button
                    type="button"
                    on:click={() => {
                      if (selected.includes(t.title))
                        return (selected = [
                          ...selected.filter((tc) => tc != t.title),
                        ]);

                      if (selected.length >= 10) return;
                      selected = [...selected, t.title];
                    }}
                    class={twMerge(
                      "rounded-sm flex gap-1 relative border transition-all text-xs bg-secondary px-2 py-1",
                      "hover:border-primary ",
                      selected.includes(t.title) && "border-primary shadow-md"
                    )}
                  >
                    <span
                      class={twMerge(
                        "w-2 h-2 absolute rounded-full bg-primary opacity-1 transition-all -top-1 -right-1",
                        !selected.includes(t.title) && "opacity-0 "
                      )}
                    ></span>
                    <img
                      src={t.icon}
                      alt={t.title}
                      class="object-cover-w-4 h-4"
                    />
                    {t.title}
                  </button>
                {/if}
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </input-group>

    <Button type="submit" class="mt-6" disabled={loading}>
      {#if loading}
        <Loader2 class="mr-2 animate-spin h-5 w-5" />
      {/if}
      Continue
    </Button>
  </div>
</form>
<p class="text-sm h-5 text-left text-destructive">
  <!-- {$errors._errors?.at(0) ?? ""} -->
</p>
