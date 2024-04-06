<script lang="ts">
    import type { Preplan } from "$lib/stores/preplan";

    export let features:Preplan["features"]
</script>

<div class="h-full">
    <div class="p-3">
        <h1 class="font-semibold text-lg ">Features</h1>
        <p class="text-secondary-foreground mb-4">
            Here are some features we think may be useful for your project
        </p>
        <div class="gap-3 grid grid-cols-2 pr-2">
            {#each features as f, i}
                <div class="p-3 rounded-md border relative">
                    <span
                        class="absolute -top-2 w-6 flex-center h-6 text-primary-foreground -right-2 bg-primary rounded-full"
                    >
                        {i + 1}
                    </span>
                    <div class="font-semibold">
                        {f.name}
                    </div>
                    <div class="text-secondary-foreground mb-3">
                        {f.description}
                    </div>
                    <p class="text-secondary-foreground">
                        {#each f.tasks as t}
                            <span class="text-muted-foreground">Activity: {t.activity}</span>
                            <span class="text-muted-foreground">Priority: {t.priority}</span>
                        {/each}
                    </p>
                </div>
            {/each}
        </div>
    </div>
</div>