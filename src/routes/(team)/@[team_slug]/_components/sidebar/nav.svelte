<script lang="ts">
	import { cn } from "$lib/helpers/shadcn";
	import { buttonVariants } from '$lib/ui/button';
	import * as Tooltip from '$lib/ui/tooltip';
	import type { NavLink } from '.';
	import { ExternalLink } from 'lucide-svelte';

	let className: (typeof $$props)['class'] = undefined;
	export let isCollapsed: boolean;
	export { className as class };
	export let links: NavLink[];
</script>

<div class={cn('flex flex-col gap-4 py-2 w-full', className)} class:data-collapsed={isCollapsed}>
	<nav
		class={cn(
			'w-full grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2',
			isCollapsed && 'place-content-center'
		)}
	>
		{#each links as link, index}
			{#if isCollapsed}
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							target={link.external ? '_blank' : undefined}
							href={link.href}
							class={cn(
								buttonVariants({ variant: link.active ? 'secondary' : 'ghost', size: 'icon' }),
								'h-8 w-8',
								link.active &&
									'shadow-none dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
								'h-8'
							)}
						>
							<svelte:component this={link.icon} class="h-4 w-4" />
							<span class="sr-only">{link.title}</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<span class="ml-auto text-muted-foreground">{link.label}</span>
					</Tooltip.Content>
				</Tooltip.Root>
			{:else}
				<a
					href={link.href}
					target={link.external ? '_blank' : undefined}
					class={cn(
						buttonVariants({ variant: link.active ? 'secondary' : 'ghost', size: 'sm' }),
						link.active && 'shadow-none ',
						'justify-start',
						'text-sm w-full'
					)}
				>
					<svelte:component this={link.icon} class="mr-2 h-4 w-4" />
					{link.title}
					{#if link.external}
						<ExternalLink style="width:0.7rem;height:0.7rem; " class="text-primary ml-1 mb-2" />
					{/if}
					{#if link.label}
						<span class={cn('ml-auto text-xs')}>{link.label}</span>
					{/if}
				</a>
			{/if}
		{/each}
	</nav>
</div>
