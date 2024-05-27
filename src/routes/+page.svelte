<script lang="ts">
	export let data;
	$: ({ countries } = data);
</script>

<div>
	{#if countries.length > 0}
		<table>
			<caption>country list</caption>
			<thead>
				<tr>
					<th>Name</th>
					<th>Continent</th>
				</tr>
			</thead>
			<tbody>
				{#each countries as country}
					<tr>
						<td>{country.name}</td>
						<td>{country.continent ?? '🏝️'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
