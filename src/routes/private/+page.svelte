<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';

	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ notes, supabase, user } = data);

	let handleSubmit: EventHandler<SubmitEvent, HTMLFormElement>;
	$: handleSubmit = async (evt) => {
		evt.preventDefault();
		if (!evt.target) return;

		const form = evt.target as HTMLFormElement;

		const note = (new FormData(form).get('note') ?? '') as string;
		if (!note) return;

		const { error } = await supabase.from('notes').insert({ note });
		if (error) console.error(error);

		invalidate('supabase:db:notes');
		form.reset();
	};
</script>

<h1>Private page for user</h1>
<strong>{user?.email}</strong>
<h2>Notes</h2>
<ul>
	{#each notes as note}
		<li>{note.note}</li>
	{/each}
</ul>
<form on:submit={handleSubmit}>
	<label>
		Write a note
		<input name="note" type="text" />
	</label>
	<button type="submit">Add</button>
</form>

<style>
	li {
		list-style-type: none;
		margin: 2rem 0rem;
		border-bottom-style: dotted;
		padding: 1rem 0rem;
	}
</style>
