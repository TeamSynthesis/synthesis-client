<script lang="ts">
    import preplan from "$lib/stores/preplan"
    import { onMount } from "svelte";
    import { Button } from "$lib/ui/button";
    import { Target, Palette, BarChart4, AlertTriangle,Lightbulb, Plus, Settings } from "lucide-svelte";
    import Overview from "./sections/overview.svelte";
    import Design from "./sections/design.svelte";
    import CompetitiveAnalysis from "./sections/competitive-analysis.svelte";
    import { twMerge } from "tailwind-merge";
    import Features from "./sections/features.svelte";
    import CreateProjectFromPreplanModal from "../../projects/[p_id]/_components/create-project-from-preplan-modal/create-project-from-preplan-modal.svelte";
    import dashboardState from "$lib/stores/dashboard-state";
    import Technologies from "./sections/technologies.svelte";

    const navigation = [
    {
      title: "YOUR PLAN",
      links: [
        {
          title: "Overview",
          icon: Target,
          slug: "overview",
        },
        {
          title: "Competitive analysis",
          icon: BarChart4,
          slug: "competitive-analysis",
        },
        {
          title: "Branding",
          icon: Palette,
          slug: "design",
        },
        {
          title:"Features",
          icon:Lightbulb,
          slug:"features"
        },
        {
          title:"Technologies",
          slug:"technologies",
          icon:Settings
        }
      ],
    },
  ];

    let preplanStatus: "pending" | "success" | "error" = "pending";
    
    let error:string = ""

    const pollPreplanFetchUntilDone=async ()=> {
        while (true) {
            try {
                const response = await fetch("",{
                  method:"POST"
                })
                if(response.status===200){
                    const data = await response.json()
                    console.log(data)
                    if (data.message === "pending") {
                        console.log("pending");
                    }
                    if (data.message === "get preplan success") {
                        preplanStatus = "success"
                        $preplan = data.data.plan;
                        break;
                    }
                }
                else{
                  const data = await response.json()
                  error = response.status + ": " + data.errors[0]
                  preplanStatus = "error"
                  break;

                }
            await new Promise(resolve => setTimeout(resolve, 5_000));
            } catch (error) {
            console.error("Error during polling:", error);
            // You can handle retries or other error handling logic here
            }
        }
    }
    let section: string = "overview";


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
            Please wait while we load your preplan.
        </p>
    </div>
</div>
{:else if (preplanStatus == "error")}
<div class="flex flex-col items-center justify-center w-full min-h-[50vh] gap-2 p-4">
    <div class="relative inline-flex">
        <AlertTriangle class="w-10 h-10 text-red-500" />
    </div>
    <div class="mt-4 text-center">
        <h1 class="text-xl font-semibold">Failed to load your preplan</h1>
        <p class="text-sm text-secondary-foreground">
            {error}
        </p>
    </div>
</div>
{:else if (preplanStatus == "success" && $preplan!==null)}
<div class="w-full h-full flex">
    <aside class="h-full border-r bg-background w-64 min-w-64 px-3">
      <div class="mt-4">
        {#each navigation as n}
          <span class="font-semibold text-sm">{n.title}</span>
          <div class="flex flex-col">
            {#each n.links as l}
              <Button
                on:click={() => (section = l.slug)}
                variant="ghost"
                class={twMerge("justify-start items-center p-1 rounded-none", section === l.slug && "bg-secondary text-primary")}
              >
                <svelte:component this={l.icon} class="h-4 w-4 mr-2" />

                {l.title}</Button
              >
            {/each}
          </div>
        {/each}
      </div>
      <div class="flex flex-col"></div>
    </aside>
    
    <div class="w-full flex h-full overflow-y-scroll">
      {#if section === "overview"}
        <Overview
          description={$preplan.overview.description}
          suggestedNames={$preplan.overview.suggestedDomains.map((x,i) => ({
            name: $preplan?.overview.suggestedNames[i].name ?? "",
            reason: x.reason,
            domainName:  x.name,
          }))}
        />
        {:else if section === "design"}
        <Design
        colorPalette={$preplan.branding.palette}
        icon={$preplan.branding.icon}
        wireframe={$preplan.branding.wireframe}
        moodBoard={$preplan.branding.moodBoard}
      />
      
      {:else if section === "competitive-analysis"}
        <CompetitiveAnalysis 
        competitors={$preplan.competitiveAnalysis.competitors}
        swot={$preplan.competitiveAnalysis.swot} 
        targetAudience={$preplan.competitiveAnalysis.targetAudience}
        />
      {:else if section === "features"}
      <Features
          features={$preplan.features}
        />
        {:else if section === "technologies"}
      <Technologies
          technologies={$preplan.technology}
        />
      {/if}

    </div>
    <Button
      on:click={() => $dashboardState.createProjectFromPreplanModalOpen = true}
    class="bottom-10 right-10 absolute">
      <Plus class="h-4 w-4 mr-2" />
      Accept & create project</Button>
</div>
{/if}

<CreateProjectFromPreplanModal/>