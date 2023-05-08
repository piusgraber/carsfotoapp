<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Search from '$lib/Search.svelte';
	import { formatDate } from '$lib/myfuncs';

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

	let flag = false;

	$: {
		if (flag) {
			invalidateAll();
		}
	}

	/*	
	const loop = async () => {
		while (true) {
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(0);
				}, 30000);
			});
			flag = !flag;
		}
	};

	loop();
*/
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:click={filterLKead}>Lead</span>&#160;&#160;&#160;
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:click={filtereVn}>evn</span>&#160;&#160;&#160;
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span on:click={filterall}>alle.</span>
</div>

<Search bind:filter />

<div class="scrollable">
	{#each liste as rec, index}
		<div
			class="row"
			class:noservice={!rec.service}
			class:pass={rec.kundenfilterpass}
			class:free={rec.freiegaragenwahl}
		>
			<div class="cell" title={JSON.stringify(rec)}>
				{index}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{rec.id}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{formatDate(rec.abgabedatum, 'd')}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{formatDate(rec.stamp, 'm')}
			</div>
			<div class="cell" title={JSON.stringify(rec)}>
				{rec.garage_firma}, {rec.garage_ort}
			</div>
			<div class="cell" title={rec.reason}>
				{rec.freiegaragenwahl ? 'FG' : ''}
				{rec.whitelabel ? 'WL' : ''}
				{#if rec.firma}
					F
				{:else}
					{rec.gemail ? 'GM' : ''}
					{rec.konfliktKV ? 'KV' : ''}
					{rec.konfliktKG ? 'KG' : ''}
				{/if}
			</div>
<!--
			<div class="cell" title={JSON.stringify(rec)}>
				{#if !rec.firma}
					{#if rec.gemail}
						{rec.garage_email}
					{:else}
						{#if rec.konfliktKV}
							{rec.user_email}
							{rec.email}
						{/if}
						{#if rec.konfliktKG}
							{rec.garage_email}
							{rec.email}
						{/if}
					{/if}
				{/if}
			{rec.agent}-{rec.garage_idkey}	
			</div>
-->
			<div class="cell" title={JSON.stringify(rec.freiegaragenwahl)}>
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
		grid-template-columns: 35px 55px 95px 140px 300px 54px 90px auto auto;
	}
	.free {
		font-style: oblique;
		text-decoration: dashed;
		font-weight: bold;
		background-color: #faf9b8;
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
	.pass:nth-child(odd) {
		background-color: #a5edfa;
		grid-row: auto / span 1;
	}

	.pass:nth-child(even)  {
		background-color: #7edfd7;
		grid-row: auto / span 1;
	}
	.free:nth-child(odd) {
		background-color: #a6f86f;
		grid-row: auto / span 1;
	}

	.free:nth-child(even)  {
		background-color: #96e76a;
		grid-row: auto / span 1;
	}
</style>
