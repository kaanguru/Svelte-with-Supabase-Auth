<script>
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				setTimeout(() => {
					goto('/', {
						invalidateAll: true
					});
				}, 1500);
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<header>
	<p>
		<a href="/"> Public </a>
		<a href="/auth"> Private </a>
	</p>
</header>
<slot />

<style>
	p a {
		font-size: large;
		padding: 2rem;
	}
	p {
		border-bottom: thick double burlywood;
	}
</style>
