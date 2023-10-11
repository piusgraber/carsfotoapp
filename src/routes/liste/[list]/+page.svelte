<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { prevent_default } from 'svelte/internal';

	import type { PageData } from './$types';
	import type { Zeile } from '$lib/myTypes';

	import { timeSecFormatter } from '$lib/myfuncs';
	import { dateFormatter } from '$lib/myfuncs';
	import { extractPhoneNumberCH, extractPhoneNumberIntl } from '$lib/dbFunc';
	export let data: PageData;
	let filteredList: Zeile[];
	let sprachen = [];
	if (data.user) {
		sprachen = data.user.sprachen;
	}

	$: {
		if (data.user) {
			filteredList = data.leads;
			if (data.liste=='leads' && data.user.id > 1000 && data.user.id != 4533) {
				filteredList = filteredList.filter((l) => {
					return l.recallmaid==data.user.id;
				})
			}
			filteredList = filteredList.filter((l) => {
				if (sprachen.de && l.spracheid == 1) return true;
				if (sprachen.fr && l.spracheid == 2) return true;
				if (sprachen.it && l.spracheid == 3) return true;
				return false;
			});
			filteredList = filteredList.filter((l) => {
				if ((data.liste == 'open' || data.liste == 'waiting') && !(l.freiegaragenwahl || l.verkaeuferok || l.recall || l.whitelabel)) return false;
				return true;
			});
			filteredList = filteredList.filter((l) => {
				if (filter) {
					if (l.srch) {
						const srchString = l.srch;
						if (srchString.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
							return true;
						}
						return false;
					}
				}
				return true;
			});
			filteredList.map((z) => {
				//Postleitzahl
				z.hide = false
				z.flag = '';
				if (z.whitelabel) {
					z.flag = 'WL';
					if (z.isfirma) {
						z.flag = 'WLF';
					}
				}
				if (+z.plz >= 9485 && +z.plz <= 9499) {
					z.flag = 'FL';
					z.hide = true
				}
				if (z.age && z.age > 75) {
					z.flag = '75+';
				}
				if (z.isfirma) {
					z.flag = 'FI';
					z.hide = true
				}
				if (z.dublette == 1) {
					z.flag = 'EM';
					z.hide = true
				}
				if (z.dublette == 2) {
					z.flag = 'SN';
					z.hide = true
				}
				if (z.dublette == 3) {
					z.flag = 'SE';
					z.hide = true
				}
				if (z.dublette > 3) {
					z.flag = 'XXX';
					z.hide = true
				}

				if (z.telefonm) {
					z.mainPhone = z.telefonm;
				} else {
					if (z.telefonp) {
						z.mainPhone = z.telefonp;
					} else {
						if (z.telefong) {
							z.mainPhone = z.telefong;
						} else {
							z.mainPhone = 'xx';
						}
					}
				}
				let phoneIntl = extractPhoneNumberIntl(z.mainPhone);
				z.mainPhone = phoneIntl ? phoneIntl : '--';
				let phoneCH = extractPhoneNumberCH(z.mainPhone);
				z.mainPhoneCH = phoneCH ? phoneCH : '--';

				try {
					z.abgabeDatum = z.abgabe ? dateFormatter.format(new Date(z.abgabe)) : '';
					z.leadDatum = z.datumlead ? timeSecFormatter.format(new Date(z.datumlead)) : '';
					z.erfasst = z.datumerf ? timeSecFormatter.format(new Date(z.datumerf)) : '';
					if (z.recallmaid != 0) {
						z.zclass = 'res';
					}
					//z.freiegaragenwahl = true;
					z.srch =
						//						z.telefonm +
						'#' +
						z.garage +
						'#' +
						z.mainPhone + // Intl Telefonnummer
						'#' +
						//						z.mainPhoneCH +   // CH Telefonnummer
						'#' +
						z.kunde +
						'#' +
						z.marke +
						'#' +
						z.modell +
						'#' +
						z.typ;

					/*
					}
				*/
				} catch (err) {}
			});
			filteredList = filteredList.filter((l) => {
				if (!l.hide) return true;
				return false;
			});

		}
	}
	//	console.log(data)
	const showLead = (z) => {
		if (data.liste == 'log') {
			goto('/lead/' + z.guid);
		} else {
			if ( data.user.id < 1000) {
				goto('/lead/' + z.guid);
			} else {
					if (z.recallmaid && z.recallmaid != data.user.id) {
				} else {
					goto('/lead/' + z.guid);
				}
			}
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
				{#if data.liste == 'log'}
					<b>History </b>
				{/if}
				{#if data.liste == 'not'}
					<b>nicht erreicht </b>
				{/if}
				{#if data.liste == 'waiting'}
					<b>Warteliste</b>
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
				<div
					class="titel"
					title="FL Liechtenstein, EM Email, SN Stammnr, SE Stammnr+Email, 70+ über 70, WL whitelabel"
				>
					FL
				</div>
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
						class:recall={zeile.recall && !zeile.datumlead}
						class:res={
							data.liste != 'log' &&
							zeile.recallmaid != 0 &&
							zeile.recallmaid != data.user.id}
						class:resme={zeile.recallmaid == data.user.id}
						class:fgw = {zeile.freiegaragenwahl && !zeile.verkaeuferok}
						class:vok = {zeile.verkaeuferok}
						on:click={() => showLead(zeile)}
						on:keydown={() => showLead(zeile)}
					>
						<div>
							{zeile.flag}
						</div>
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
						<div class="cell-telefon" title={$page.data.user.id == 4533 ? zeile.srch : ''}>
							<span
								>{zeile.mainPhone}
								<!--{zeile.telefon}--></span
							>
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
							<!--
							{zeile.adminLead}
-->
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
		/*		width: 2000px;  */
		overflow: auto;
	}

	.liste {
		font-size: 0.9rem;
	}
	.panel-row {
		cursor: pointer;
		display: grid;
		grid-template-columns: 35px 90px 145px 30px 250px 140px 310px 350px 400px 20px auto;
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

	.vok:nth-child(odd) {
		background-color: #d8a5fa;
		grid-row: auto / span 1;
	}

	.vok:nth-child(even) {
		background-color: #c78bf0;
		grid-row: auto / span 1;
	}

	.fgw:nth-child(odd) {
		background-color: #a5edfa;
		grid-row: auto / span 1;
	}

	.fgw:nth-child(even)  {
/*		background-color: #7edfd7; */
		background-color: #7fe7dc;
		grid-row: auto / span 1;
	}

</style>
