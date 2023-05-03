<script lang="ts">
	import { page } from '$app/stores';
	import { fetchALead } from '$lib/fetch';
	import type { PageData } from './$types';

	export let data: PageData;

	import { onDestroy, onMount } from 'svelte';

	onMount(() => console.log('Mounted home page'));
	onDestroy(() => console.log('Unmounted guid page'));

	const mitarbeiter = $page.data.user;

	import { dateTimeFormatter } from '$lib/myfuncs';
	let lead: Lead;

	type Lead = {
		guid: string;
		telefonm?: string;
		telefonp?: string;
		telefong?: string;
		abgabedatum: Date;
		recallmaid: number;
		abgabe: string;
	};

	let leadLogRecs: [];
	$: lead = data.lead;
$: leadLogRecs = data.leadlog;

	let lpsrc = null;
	const showLanding = () => {
		if (!lpsrc) {
			lpsrc = 'https://lead.car-ware.ch/landing/#/' + lead.guid;
		} else {
			lpsrc = null;
		}
	};


	let showJSON: boolean=false;
</script>

<div
class:forelsa={mitarbeiter.id != lead.recallmaid && lead.recallmaid != 0}
class:forme={mitarbeiter.id == lead.recallmaid}
>
<div>
	<a href="/liste/open">Liste</a>
</div>
<div
	class="grid"
>
	<div class="kunde">
		<h1>Lead</h1>
		{#if !lead.service}
			<span class="alert">KEIN SERVICE !!!!</span>
			<br />
		{/if}
		{#if mitarbeiter.id == lead.recallmaid}
			-> für mich reserviert
		{:else if lead.recallmaid != 0}
			-> für jemand reserviert
		{/if}

		Lead ID: {lead.id}
		<br />
		{lead.anrede}
		<br />
		{lead.vorname}
		{lead.nachname}
		<br />
		{lead.strasse}
		{lead.hausnummer}
		<br />
		{lead.plz}
		{lead.ort}
		<br />
		{#if lead.telefonm}
			{lead.telefonm} M<br />
		{/if}
		{#if lead.telefonp}
			{lead.telefonp} P<br />
		{/if}
		{#if lead.telefong}
			{lead.telefong} G<br />
		{/if}
		<input type="email" bind:value={lead.email}/>
		<button>Email verifizieren</button>
	</div>
	<div>
		<h1>&#160;</h1>
		Garage
		<br />
		<b>{lead.garage}</b>
		<br />
		Verkäufer
		<br />
		<b>{lead.verkaeufer}</b>
		<br />
		Fahrzeug
		<br />
		<b>{lead.marke} {lead.modell} {lead.typ}</b>
		<br />
		<b>Abgabe: {dateTimeFormatter.format(new Date(lead.abgabedatum))}</b>
	</div>
	<div>
		<button on:click={showLanding}>Landing-Page {lpsrc ? '' : ''}</button>
		<br />
		<br />
		<button>nicht erreicht</button>
		<br />
		<br />
		<button>bereits versichert</button>
		<br />
		<br />
		<br />
		<br />
		<button on:click={() => showJSON=!showJSON}>....</button>
		<br />
	</div>
	<div>
		{#if lpsrc}
			<iframe class="lpframe" title="land" src={lpsrc} />
		{/if}
	</div>
</div>
</div>
<br />
{#each leadLogRecs as log}
	<div>{dateTimeFormatter.format(new  Date(log.datum))} : {log.bemerkung}</div>
{/each}
{#if showJSON}
<br/>
Datum formatieren generell Funktion wo? Formatierung wo?<br/>
<br/>
{JSON.stringify(data)}
{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: 400px 400px 200px auto;
	}
	.lpframe {
		width: 400px;
		height: 1100px;
	}
	button {
		background-color: #eeeeee;
		color: #1329f0;
		height: 40px;
		width: 180px;
		font-size: 1.2rem;
	}

	.kunde {
		font-size: 1.2rem;
	}
	input[type='email'] {
		font-size: 1.2rem;
		width: 400px;
	}
	.alert {
		background-color: rgb(230, 86, 86);
		color: rgb(255, 255, 255);
	}

	.forme {
		background-color: rgb(194, 236, 183);
	}
	.forelsa {
		background-color: rgb(255, 176, 176);
	}
</style>
