<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { prevent_default } from 'svelte/internal';

	import type { PageData } from './$types';
	import type { Zeile } from '$lib/myTypes';

	import { timeSecFormatter } from '$lib/myfuncs';
	import { dateFormatter } from '$lib/myfuncs';
	export let data: PageData;

	let sprachen = data.user.sprachen;

	let filteredList: Zeile[];
	$: {
		
		console.log('sort')
		filteredList = data.leads.sort((a, b) => {
			if (a.datumerf < b.datumerf) return -1;
			if (a.datumerf > b.datumerf) return 1;
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
				const srchString = l.telefon + '#' + l.garage + '#' + l.kunde + '#' + l.marke;
				if (srchString.toLowerCase().indexOf(filter.toLowerCase()) >= 0) return true;
				//				if (l.kunde && l.kunde.toLowerCase().indexOf(filter.toLowerCase()) >= 0) return true;
				return false;
			}
			return true;
		});
		filteredList.map((z) => {
			try {
				z.abgabeDatum = z.abgabe ? dateFormatter.format(new Date(z.abgabe)) : '';
				z.leadDatum = z.datumlead ? timeSecFormatter.format(new Date(z.datumlead)) : '';
				z.erfasst = z.datumerf ? timeSecFormatter.format(new Date(z.datumerf)) : '';

				if (z.recallmaid == data.user.id) {
					z.zclass = 'resme';
				} else {
					if (z.recallmaid != 0) {
						z.zclass = 'res';
					}
				}
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

	let loading = false;
	
</script>

<svelte:window on:keydown={on_key_down} />

<!--
<div>{JSON.stringify(data.user)}</div>

-->

<a href="/liste/testapi/1">1</a>
<a href="/liste/testapi/2">2</a>
<a href="/liste/testapi/3">3</a>
<a href="/liste/testapi/4">4</a>
{#if !$navigating}
<div class="liste">
	<div>
		
		{Boolean($navigating)}
		{data.loading}{data.leads.length}
		{loading}{data.loading}
		{#if data.liste=='log'}
		<b>Alle Datensätze </b>
		{#if srch}
		Suche: <input bind:value={filter} type="text" use:init />
		{#if filter}
			Filter: "{filter}" --
		{/if}
		abbrechen mit ESC
	{:else}
		Suche mit CTRL-F{/if}

		{/if}
		{#if data.liste=='waiting'}
		<b>wartende</b>
		{/if}
		{#if data.liste=='open'}
		<b>offene Datensätze</b>
		{/if}
	</div>

	<div class="panel">
		<div class="panel-row">
			<div class="titel">Abgabe</div>
			<div class="titel">
				{#if data.liste == 'leads'}
					Datum Lead
				{:else}
					Verkauf
				{/if}
			</div>
			<div class="titel">dfi</div>
			<div class="titel">Kunde</div>
			<div class="titel">Telefon</div>
			<div class="titel">Fahrzeug</div>
			<div class="titel">Verkäufer</div>
			<div class="titel">Log</div>
			<div class="titel">S</div>
			<div class="titel" />
		</div>
		{#each filteredList as zeile}
			<div
				class="panel-row"
				class:res={zeile.recallmaid != 0}
				class:resme={zeile.recallmaid == data.user.id}
				on:click={() => showLead(zeile)}
				on:keydown={() => showLead(zeile)}
				title={JSON.stringify(zeile)}
			>
				<div>
					{zeile.abgabeDatum}
				</div>
				<div>
					{#if data.liste == 'leads' || data.liste == 'noservice'}
						{zeile.leadDatum}L
					{:else}
						{zeile.erfasst}
					{/if}
				</div>
				<div>
					{zeile.spracheid == 3 ? 'IT' : zeile.spracheid == 2 ? 'FR' : 'DE'}
				</div>
				<div class="cell-kunde">
					<span> {zeile.kunde}</span>
				</div>
				<div class="cell-telefon">
					<span> {zeile.telefon}</span>
				</div>
				<div class="cell-fahrzeug"><span> {zeile.marke} {zeile.typ}</span></div>
				<div class="cell-garage"><span> {zeile.garage}</span></div>
				<div class="cell-log">
					<span>
						{zeile.histtext
							? timeSecFormatter.format(new Date(zeile.histdatum)) + ' ' + zeile.histtext
							: ''}</span
					>
				</div>
				<div class="link" on:click={() => showLead(zeile)} on:keydown={() => showLead(zeile)}>
					{#if zeile.service}
						S
					{/if}
				</div>
				<div />
			</div>
		{/each}
	</div>
</div>
{/if}

<style>
	.liste {
		font-size: 0.9rem;
	}
	.panel-row {
		cursor: pointer;
		display: grid;
		grid-template-columns: 90px 145px 30px 240px 145px 250px 350px 300px 20px auto;
		user-select: none;
	}
	.panel-row:nth-child(odd) {
		background-color: #f9f9f9;
		grid-row: auto / span 1;
	}

	.panel-row:nth-child(even) {
		background-color: #e5e5e5;
		grid-row: auto / span 1;
	}

	.cell-kunde {
		width: 240px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cell-telefon {
		width: 140px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cell-fahrzeug {
		width: 240px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cell-garage {
		width: 340px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cell-log {
		width: 290px;
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
		cursor: no-drop;
	}
	.resme {
		cursor: pointer;
		font-style: italic;
		background-color: rgb(194, 236, 183);
	}
	.zc {
		font-weight: bold;
	}
</style>
