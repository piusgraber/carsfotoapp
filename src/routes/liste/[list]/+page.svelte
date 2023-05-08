<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { prevent_default } from 'svelte/internal';

	import type { PageData } from './$types';
	import type { Zeile } from '$lib/myTypes';

	import { timeSecFormatter } from '$lib/myfuncs';
	import { dateFormatter } from '$lib/myfuncs';
	export let data: PageData;
	let filteredList: Zeile[];
	let sprachen = [];
	if (data.user) {
		sprachen = data.user.sprachen;
	}

	$: {
		if (data.user) {
			filteredList = data.leads;
			/*
			filteredList = data.leads.sort((a, b) => {
				console.log('id: ', a.id, b.id)
				console.log('recall: ', new Date(a.recall).getTime() - new Date(b.recall).getTime())
				console.log('erf: ', new Date(a.datumerf).getTime() - new Date(b.datumerf).getTime())

				if (a.recall && !b.recall) {
					return -12;
				}
				if (b.recall && a.recall) {
					if (a.datumerf < b.datumerf) return -9;
					if (a.datumerf > b.datumerf) return -11;
					return -10;
				}
				if (a.datumerf < b.datumerf) return 1;
				if (a.datumerf > b.datumerf) return -1;
				return 0;
			});
*/
			filteredList = filteredList.filter((l) => {
				if (sprachen.de && l.spracheid == 1) return true;
				if (sprachen.fr && l.spracheid == 2) return true;
				if (sprachen.it && l.spracheid == 3) return true;
				return false;
			});
			filteredList = filteredList.filter((l) => {
				if (filter) {
					const srchString =
						l.telefon +
						'#' +
						l.garage +
						'#' +
						l.kunde +
						'#' +
						l.marke +
						'#' +
						l.modell +
						'#' +
						l.typ;
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
					/*
					if (z.recallmaid == data.user.id) {
						z.zclass = 'resme';
					} else {
*/
					if (z.recallmaid != 0) {
						z.zclass = 'res';
					}
					/*
					}
				*/
				} catch (err) {}
			});
		}
	}
	//	console.log(data)
	const showLead = (z) => {
		if (z.recallmaid && z.recallmaid != data.user.id) {
		} else {
			goto('/lead/' + z.guid);
		}
	};

	let srch = false;
	let filter = '';
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

	let loading = false;
</script>

<svelte:window on:keydown={on_key_down} />

<!--
<div>{JSON.stringify(data.user)}</div>

-->

{#if $navigating}
	Seite wird geladen...
{:else}
	<div class="liste">
		<div>
			<!--		
		*{data}*
		{loading}{data.liste} {data}
	-->
			<span class="header">
				{#if data.liste == 'all'}
					<b>History </b>
				{/if}
				{#if data.liste == 'waiting'}
					<b>wartende</b>
				{/if}
				{#if data.liste == 'leads'}
					<b>gemachte</b>
				{/if}
				{#if data.liste == 'open'}
					<b>offene Datensätze</b>
				{/if}
				&#160;&#160;&#160;&#160;&#160;&#160;
				{#if srch}
				Suche: <input class="header" bind:value={filter} type="text" use:init />
				{#if filter}
					Filter: "{filter}" --
				{/if}
				abbrechen mit ESC
			{:else}
				Suche mit CTRL-F
			{/if}
			</span>
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
				<div class="titel" />
			</div>
			<div class="scrollable">
				{#each filteredList as zeile, index}
					<div
						class="panel-row"
						class:recall={zeile.recall}
						class:res={zeile.recallmaid != 0 && zeile.recallmaid != data.user.id}
						class:resme={zeile.recallmaid == data.user.id}
						on:click={() => showLead(zeile)}
						on:keydown={() => showLead(zeile)}
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
						<div class="cell-fahrzeug"><span> {zeile.marke} {zeile.modell} {zeile.typ}</span></div>
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
								&#160;
							{/if}
						</div>
						<div />
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	div.scrollable {
		height: calc(100vh - 133px);
		overflow: auto;
	}

	.liste {
		font-size: 0.9rem;
	}
	.panel-row {
		cursor: pointer;
		display: grid;
		grid-template-columns: 90px 145px 30px 250px 200px 310px 350px 400px 20px auto;
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
		width: 190px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.cell-fahrzeug {
		width: 300px;
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
		width: 390px;
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
		/*
		background-color: rgb(255, 176, 176);
*/
		font-style: italic;
		color: #999999;
		cursor: no-drop;
	}
	.recall {
		color: red;
	}
	.resme {
		cursor: pointer;
		/*
		font-style: italic;
		background-color: rgb(194, 236, 183); */
	}
	.zc {
		font-weight: bold;
	}
	.header {
		font-size: 1.3rem;
	}
</style>
