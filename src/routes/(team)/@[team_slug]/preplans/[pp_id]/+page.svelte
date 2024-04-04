<script lang="ts">
    import preplan from "$lib/stores/preplan"
    import { onMount } from "svelte";

    let preplanStatus: "pending" | "success" | "error" = "pending";
    
    const pollPreplanFetchUntilDone=async ()=> {
        while (true) {
            try {
                const response = await fetch("")
                if(response.status===200){
                    const data = await response.json()
                    if (data.message === "pending") {
                        console.log("pending");
                    }
                    if (data.message === "project generated successfully") {
                        preplanStatus = "success"
                        $preplan = data.data;
                        break;
                    }
                }
            await new Promise(resolve => setTimeout(resolve, 10_000));
            } catch (error) {
            console.error("Error during polling:", error);
            // You can handle retries or other error handling logic here
            }
        }
    }

    onMount(async () => {
        await pollPreplanFetchUntilDone();
    });

</script>

{#if preplanStatus == "pending"}
<div class="flex flex-col items-center justify-center w-full min-h-[50vh] gap-2 p-4">
    <div class="relative inline-flex">
        <div class="w-8 h-8 bg-primary rounded-full"></div>
        <div class="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-ping"></div>
        <div class="w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-pulse"></div>
    </div>
    <div class="mt-4 text-center">
        <h1 class="text-xl font-semibold">Loading your preplan</h1>
        <p class="text-sm text-secondary-foreground">
            Please wait while we generate your preplan.
        </p>
    </div>
</div>


{:else if preplanStatus == "success"}

<pre>{JSON.stringify($preplan ?? {}, null, 2)}</pre>

{/if}