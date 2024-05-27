<script>
	import { goto, invalidate } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					goto('/', { invalidateAll: true });
				});
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
		<a href="/"> <button>Public</button> </a> |
		<a href="/auth"> <button>Private</button> </a>
	</p>
</header>
<slot />
