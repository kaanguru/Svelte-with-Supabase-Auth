<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto('/');
		}
	};
</script>

<main>
	<button on:click={logout}>Logout</button>
	<slot />
</main>

<style>
	main {
		margin: 1rem 0rem;
		display: flex;
		flex-direction: column;
	}
	button {
		margin-top: 2rem;
		align-self: flex-end;
	}
</style>
