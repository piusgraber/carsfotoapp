<script lang="ts">
	import { page } from '$app/stores';
	import Search from '$lib/Search.svelte';
	import { formatDate } from '$lib/myfuncs';

	$: liste = $page.data.records.filter(r => r.vertragnr)


	const filtereVn = () => {
		liste = $page.data.records.filter(r => r.evnsent)
	}
	const filterall = () => {
		liste = $page.data.records.filter(r => true || r.vertragnr)
	}
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:click="{filtereVn}">evn</span>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:click="{filterall}">alle</span>
</div>


<Search bind:filteredList="{liste}" />


<div class="scrollable">

{#each liste as rec}
	<div class="row">
		<div class="cell" title={JSON.stringify(rec)}>
			{rec.id}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{formatDate(rec.stamp, 'm')}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{rec.garage_firma}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{rec.service}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{rec.vertragnr}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{formatDate(rec.evnsent, 'm')} {rec.versicherung}
		</div>
	</div>
{/each}

</div>

<style>
	.row {
		display: grid;
		grid-template-columns: 55px 140px 255px 50px 240px 300px auto auto;
	}

	.cell {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	div.scrollable {
  height: calc(100vh - 130px);
  overflow: auto;
}
</style>
