<script lang="ts">
	import { page } from '$app/stores';
	import { fetchALead } from '$lib/fetch';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	import { onDestroy, onMount } from 'svelte';

	onMount(() => console.log('Mounted home page'));
	onDestroy(() => console.log('Unmounted guid page'));

	const mitarbeiter = $page.data.user;

	const locale = 'de-CH';
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	};

	const formatter = new Intl.DateTimeFormat(locale, options);

	let lead: Lead;

	type Lead = {
		guid: string;
		telefonm?: string;
		telefonp?: string;
		telefong?: string;
		abgabedatum: Date;
		recallmaid: number;
	};

	$: lead = data.lead;

let lpsrc = null
	const showLanding = () =>{
		if (!lpsrc) {
			lpsrc = 'https://lead.car-ware.ch/landing/#/' + lead.guid
		} else {
			lpsrc = null
		}
	}
</script>

<div>
</div>
<div class="grid">
	<div class="kunde">
		<h1>Lead</h1>
		{#if mitarbeiter.id == lead.recallmaid}
			-> für mich reserviert
		{:else if lead.recallmaid != 0}
			-> für jemand reserviert
		{/if}
	
		{lead.id}
		<br />
		{lead.anrede}
		<br />
		{lead.vorname} {lead.nachname}
		<br />
		{lead.strasse} {lead.hausnummer}
		<br />
		{lead.plz} {lead.ort}
		<br />
		{#if lead.telefonm}
		{lead.telefonm} M<br/>
		{/if}
		{#if lead.telefonp}
		{lead.telefonp} P<br/>
		{/if}
		{#if lead.telefong}
		{lead.telefong} G<br/>
		{/if}
	</div>
	<div>
		<h1>&#160;</h1>
		Garage
		<br/>
		{lead.garage}
	</div>
<div>
	<button on:click={showLanding}>Landing-Page {lpsrc ? 'ausblenden' : 'ausfüllen'}</button>
	<br/>
	<br/>
	<button>nicht erreicht</button>
	<br/>
	<br/>
	<button>bereits versichert</button>
	<br/>
	<br/>
	<br/>
	<br/>
	<button>....</button>
	<br/>
</div>	
<div>
	{#if lpsrc}
	<iframe class="lpframe" title="land" src={lpsrc}></iframe>
	{/if}
</div>
</div>

<br />
{JSON.stringify(lead)}

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
	}

	.kunde {
		font-size: 1.2rem;
	}
</style>
