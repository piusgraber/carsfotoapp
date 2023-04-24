<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { prevent_default } from 'svelte/internal';

	import type { PageData } from './$types';
	import type { Zeile } from '$lib/myTypes';

	export let data: PageData;

	let sprachen = data.user.sprachen;

	const locale = 'de-CH';
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		//		timeZone: 'Europe/Zurich'
		timeZone: 'UTC'
	};

	const formatter = new Intl.DateTimeFormat(locale, options);

	let filteredList: Zeile[];
	$: {
		filteredList = data.leads.sort((a, b) => {
			if (a.datumerf < b.datumerf) return 11;
			if (a.datumerf > b.datumerf) return -1;
			return 0;
		});
		filteredList = filteredList.filter((l) => {
			if (sprachen.de && l.spracheid == 1) return true;
			if (sprachen.fr && l.spracheid == 2) return true;
			if (sprachen.it && l.spracheid == 3) return true;
			return false;
		});
		filteredList = filteredList.filter((l) => {
			if (filter) {
				const srchString = l.garage + '#' + l.kunde + '#' + l.marke;
				if (srchString.toLowerCase().indexOf(filter.toLowerCase()) >= 0) return true;
				//				if (l.kunde && l.kunde.toLowerCase().indexOf(filter.toLowerCase()) >= 0) return true;
				return false;
			}
			return true;
		});
		filteredList.map((z) => {
			try {
				z.abgabeDatum = z.abgabe ? formatter.format(new Date(z.abgabe)) : '';
				z.leadDatum = z.datumlead ? formatter.format(new Date(z.datumlead)) : '';
				z.erfasst = z.datumerf ? formatter.format(new Date(z.datumerf)) : '';
			} catch (err) {}
		});
	}
	//	console.log(data)
	const showLead = (z) => {
		if (z.recallmaid && z.recallmaid != data.user.id) {

		} else {
			goto('/lead/' + z.guid);

		}
	};

	let srch = false;
	const filterList = () => {
		filteredList;
		console.log(filter);
	};
	const on_key_down = (e) => {
		if (e.ctrlKey) {
			if (e.key == 'f') {
				e.preventDefault();
				console.log('search');
				srch = true;
			}
		} else {
			if (srch) {
				if (e.key == 'Escape') {
					srch = false;
					filter = '';
				}
				if (e.key === 'Enter') {
					e.preventDefault();
					filterList();
					srch = true;
				}
			}
		}
	};
	const on_key_up = (e) => {
		console.log(e);
	};

	function init(el) {
		el.focus();
	}
	let filter = '';
</script>

<svelte:window on:keydown={on_key_down} />

<!--
<div>{JSON.stringify(data.user)}</div>

-->
<div>
	Liste [{data.liste}] {#if srch}Suche: <input bind:value={filter} type="text" use:init />
		{#if filter}Filter: "{filter}" -- {/if} abbrechen mit ESC{:else}
		Suche mit CTRL-F{/if}
</div>
<div class="panel">
	<div class="titel">
		{#if data.liste == 'leads'}
			Datum Lead
		{:else}
			Verkauf
		{/if}
	</div>
	<div class="titel">S</div>
	<div class="titel">dfi</div>
	<div class="titel">Kunde</div>
	<div class="titel">Garage</div>
	<div class="titel">Vertrag</div>
	<div class="titel">Fahrzeug</div>
	<div class="titel">Log</div>
	<div class="titel" />

	{#each filteredList as zeile}
		<div
			class="link"
			class:res={zeile.recallmaid != 0}
			class:resme={zeile.recallmaid == data.user.id}
			on:click={() => showLead(zeile)}
			on:keydown={() => showLead(zeile)}
		>
			{#if data.liste == 'leads'}
				{zeile.leadDatum}
			{:else}
				{zeile.erfasst}
			{/if}
		</div>
		<!--	
	<div on:click={() => showLead(zeile)} on:keydown={() => showLead(zeile)}>
			{zeile.id}
		</div>
	-->
		<div
			class:res={zeile.recallmaid != 0}
			class:resme={zeile.recallmaid == data.user.id}
			class="link"
			on:click={() => showLead(zeile)}
			on:keydown={() => showLead(zeile)}
		>
			{#if zeile.service}
				S
			{/if}
		</div>
		<div
			class:res={zeile.recallmaid != 0}
			class:resme={zeile.recallmaid == data.user.id}
			title={JSON.stringify(zeile)}
		>
			{zeile.spracheid == 3 ? 'IT' : zeile.spracheid == 2 ? 'FR' : 'DE'}
		</div>
		<div
			class="cell-kunde"
			class:res={zeile.recallmaid != 0}
			class:resme={zeile.recallmaid == data.user.id}
		>
			<span> {zeile.kunde}</span>
		</div>
		<div class="cell-kunde"><span> {zeile.garage}</span></div>
		<div><span> {zeile.vertragnr}</span></div>
		<div class="cell-fahrzeug"><span> {zeile.marke} {zeile.typ}</span></div>
		<div class="cell-fahrzeug"><span> {zeile.histtext ? zeile.histtext : ''}</span></div>
		<div />
	{/each}
</div>

<style>
	.panel {
		display: grid;
		grid-template-columns: 150px 20px 30px 340px 500px 90px 360px 200px auto;
		user-select: none;
	}

	.cell-kunde {
		width: 322px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cell-fahrzeug {
		width: 322px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.link {
		cursor: pointer;
	}
	.titel {
		font-weight: bold;
	}

	.res {
		font-style: italic;
		background-color: rgb(255, 176, 176);
		cursor:no-drop
	}
	.resme {
		cursor: pointer;
		font-style: italic;
		background-color: rgb(194, 236, 183);
	}
</style>
