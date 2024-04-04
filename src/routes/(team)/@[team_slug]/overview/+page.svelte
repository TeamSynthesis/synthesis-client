<script lang="ts">

    import { Button } from "$lib/ui/button";
    import * as Avatar from "$lib/ui/avatar";
    import { Plus, ChevronRight, ListTodo, Fingerprint, Users, Workflow,AlertTriangle } from "lucide-svelte";
    import { twMerge } from "tailwind-merge";
    import userStore from "$lib/stores/user"
    import dashboardState from "$lib/stores/dashboard-state";
    import teamStore from "$lib/stores/team"


    const quickInsights:{title:string, used:number, limit:number, link:string, icon:any}[]=[
		{
			title:"Projects",
			used:$teamStore?.projects?.length || 0,
			limit:500,
			link:`/${$teamStore?.slug}/projects`,
			icon: Workflow
		},
		{
			title:"Tasks completed",
			used:0,
			limit:0,
			link:`/${$teamStore?.slug}/projects`,
			icon:ListTodo

		},
		{
			title:"Issues",
			used:0,
			limit:0,
			link:`/${$teamStore?.slug}/issues`,
			icon:AlertTriangle
		},
		{
			title:"Team members",
			used:$teamStore?.projects?.length || 0,
			limit:5,
			link:"/teams",
			icon:Users
		}
	]
</script>
<main class="h-full w-full max-w-screen-lg p-2 sm:p-6">
	<div class="flex justify-between items-center">
		<div  class="items-center flex gap-4">
		<Avatar.Root  class="h-11 text-sm w-11">
					<Avatar.Image src={$userStore.avatarUrl} alt={$userStore?.userName} />
					{#if !$userStore.avatarUrl}
						<Avatar.Fallback class="capitalize">
							{$userStore?.userName?.slice(0, 2)}
						</Avatar.Fallback>
					{/if}
				</Avatar.Root>
				<div class="flex flex-col">
				<h1 class="sm:text-2xl text-lg font-serif text-green-950 mb-0 font-medium">
					Welcome back, <span class="italic">{$userStore.userName}!</span>
				</h1>
				<p class="text-sm  text-gray-600 ">
					Here's what's happening in <b>{$teamStore?.name}</b> today.
				</p>
				</div>
		</div>
		  <Button  on:click={() => ($dashboardState.isNewProjectModalOpen = true)} class="shadow-md ">
			<Plus class="w-5 h-5 mr-2" />
			New project
		</Button>
	</div>
	<div class="mt-6  grid grid-cols-2 md:grid-cols-4 justify-center w-full items-center gap-4">
		{#each quickInsights as i}
		    {@const color = i.used/i.limit > 0.8 ? "bg-red-600 text-red-600" : i.used/i.limit > 0.5 ? "bg-amber-600 text-amber-600" : "bg-green-600 text-green-600"}
		<a
			href={i.link}
			class="p-2 hover:shadow-md relative flex overflow-hidden shadow-sm h-20 w-full flex-col  rounded-md border transition-all ease-in-out">
			
			<div class="flex justify-between items-center">
				<div class="text-xs text-muted-foreground flex font-medium uppercase">
					<svelte:component this={i.icon} class="h-4 w-4 mr-2" />
					{i.title}
				</div>
			</div>
			<div class="flex flex-row">
				<span class={twMerge("font-bold", color, "bg-transparent")}> 
					{i.used}/{i.limit}
					 </span>
				<div class="flex flex-col absolute bottom-0 w-full">
					<div class="w-full h-1 bg-gray-200 absolute bottom-0 -left-2"></div>
					<div 
					style={`width:${i.used/i.limit*100}%`}
					class={twMerge("h-1 bg-primary absolute bottom-0 rounded-r-md z-10 -left-2", color)}>
					</div>
				</div>
			</div>

		</a>
		{/each}
	
	</div>

	<div class="w-full h-64 border mt-8 shadow-sm rounded-md ">
		<div class="flex p-2 justify-between items-center h-8 border-border border-b">
			<div>
				Project statistics
			</div>
		</div>
        <p class="p-2">
            You have <b>{$teamStore?.projects?.length}</b> projects in <b>{$teamStore?.name}</b>  You also have <b>0</b> tasks completed and <b>0</b> issues.
            We will report back to you with insights when you have more data.
        </p>
	</div>

</main>
