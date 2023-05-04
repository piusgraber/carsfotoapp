<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Search from '$lib/Search.svelte';
	import { formatDate } from '$lib/myfuncs';


	invalidateAll();

	$: liste = allRecs.filter((r) => r.vertragnr);
	$: allRecs = $page.data.records;
	let fl = [];
	const filtereVn = () => {
		liste = allRecs.filter((r) => r.evnsent);
	};
	const filterLKead = () => {
		liste = allRecs.filter((r) => r.kundenfilterpass);
	};
	const filterall = () => {
		liste = allRecs.filter((r) => true || r.vertragnr);
	};

	let filter = '';

	$: {
		liste = allRecs.filter((l) => {
			if (filter) {
				const srchString = JSON.stringify(l);
				if (srchString.toLowerCase().indexOf(filter.toLowerCase()) >= 0) return true;
				//				if (l.kunde && l.kunde.toLowerCase().indexOf(filter.toLowerCase()) >= 0) return true;
				return false;
			}
			return true;
		});
	}
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:click={filterLKead}>Lead</span>&#160;&#160;&#160;
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:click={filtereVn}>evn</span>&#160;&#160;&#160;
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:click={filterall}>alle</span>
</div>

<Search bind:filter />

<div class="scrollable">
	{#each liste as rec, index}
		<div class="row" class:pass={rec.kundenfilterpass} class:noservice={!rec.service}>
			<div class="cell" title={JSON.stringify(rec)}>
				{index}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{rec.id}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{formatDate(rec.stamp, 'm')}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{rec.garage_firma}, {rec.garage_ort}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{rec.whitelabel ? 'WL' : ''}
				{#if rec.firma}
					F
				{:else}
					{rec.gemail ? 'GM' : ''}
					{rec.konfliktV ? 'KV' : ''}
					{rec.konfliktG ? 'KG' : ''}
				{/if}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{#if !rec.firma}
					{#if rec.gemail}
						{rec.garage_email}
					{:else}
						{#if rec.konfliktV}
							{rec.user_email}
							{rec.email}
						{/if}
						{#if rec.konfliktG}
							{rec.garage_email}
							{rec.email}
						{/if}
					{/if}
				{/if}
				<!--
			{rec.agent}-{rec.garage_idkey}	
-->
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{rec.vertragnr}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{#if rec.evnsent}
					eVn:
					{formatDate(rec.evnsent, 'm')}
					{rec.versicherung}
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: 55px 55px 140px 355px 50px 390px 120px auto auto;
	}
	.pass {
		color: rgb(0, 68, 255);
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

	.noservice {
		text-decoration: dotted;
		text-decoration: line-through;
	}

	.row:nth-child(odd) {
		background-color: #f9f9f9;
		grid-row: auto / span 1;
	}

	.row:nth-child(even) {
		background-color: #e5e5e5;
		grid-row: auto / span 1;
	}

	.row:nth-child(odd) .pass {
		background-color: #90ee5a;
		grid-row: auto / span 1;
	}

	.row:nth-child(even) .pass {
		background-color: #5fbb2e;
		grid-row: auto / span 1;
	}
</style>
