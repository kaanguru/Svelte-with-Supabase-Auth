<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
		goto('/');
	};
</script>

<button on:click={logout}>Logout</button>
<main>
	<slot />
</main>
