<script lang="ts">
	import '../app.css';
	import '@fontsource/inter';
	import '@fontsource/inter/100.css';
	import '@fontsource/inter/200.css';
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/inter/800.css';
	import '@fontsource/inter/900.css';
	import '@fontsource/dm-serif-display';

	import type { LayoutData } from './$types';
	import userProfile from '$lib/stores/user-profile';
	import { Loader2 } from 'lucide-svelte';

	export let data: LayoutData;
	$: $userProfile = data.userProfile ?? null;
</script>

<slot />
