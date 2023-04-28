<script lang="ts">
	import { page } from '$app/stores';
	import { dateFormatter, dateTimeFormatter, formatDate, timeSecFormatter } from '$lib/myfuncs';
	let data: [];
	$: {
		data = $page.data.records;
		if ($page.params.list == 'lead') {
			data.sort((a, b) => {
				if (a.datumlead < b.datumlead) return 1;
				return -1;
			});
		}
	}
</script>

Liste

<div>
	{JSON.stringify($page.params)}
</div>

{#if $page.params.list == 'lead'}
	<div class="leadrow title">
		<div>Lead Datum</div>
		<div>Abgabe</div>
		<div>Verkauf</div>
		<div>Kunde</div>
		<div>Fahrzeug</div>
		<div>Garage</div>
		<div>History</div>
	</div>
{:else}
	<div class="recrow title">
		<div>Abgabe</div>
		<div>Verkauf</div>
		<div>Kunde</div>
		<div>Fahrzeug</div>
		<div>Garage</div>
		<div>History</div>
	</div>
{/if}

{#each data as rec}
	{#if $page.params.list == 'lead'}
		<div class="leadrow">
			<div>
				{formatDate(rec.datumlead, 's')}
			</div>
			<div>
				{formatDate(rec.abgabe)}
			</div>
			<div>
				{formatDate(rec.datumerf, 's')}
			</div>
			<div>
				{rec.service}
			</div>
		</div>
	{:else}
		<div class="recrow">
			<div>
				{formatDate(rec.abgabe, 'd')}
			</div>
			<div>
				{formatDate(rec.datumerf, 's')}
			</div>
			<div class="cell">
				{rec.kunde}
			</div>
			<div class="cell">
				{rec.marke}
				{rec.modell}
				{rec.typ}
			</div>
			<div class="cell">
				{rec.garage}
			</div>
			<div class="cell">
				{formatDate(rec.histdatum, 'd')}
				{rec.histtext ? rec.histtext : ''}
			</div>
		</div>
	{/if}
{/each}
<p>{JSON.stringify($page)}</p>

<style>
	.title {
		font-weight: bold;
	}
	.leadrow {
		display: grid;
		grid-template-columns: 155px 85px 155px 220px 240px 300px auto auto;
	}
	.recrow {
		display: grid;
		row-gap: 10px;
		grid-template-columns:       85px 155px 220px 240px 300px auto auto;
		grid-column-gap: 15px;
	}

	.cell {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
