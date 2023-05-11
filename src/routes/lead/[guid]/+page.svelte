<script lang="ts">
	import { navigating, page } from '$app/stores';
	import {
		verifyEmail,
		addLogEntry,
		fetchALead,
		fetchSQL_CW,
		getLeadLog,
		getLogEntry
	} from '$lib/fetch';
	import type { PageData } from './$types';

	export let data: PageData;

	import { onDestroy, onMount } from 'svelte';

	onMount(() => console.log('Mounted home page'));
	onDestroy(() => console.log('Unmounted guid page'));

	$: user = $page.data.user;

	import { dateTimeFormatter, dateTimeFormatterMEZ, formatDate } from '$lib/myfuncs';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { extractPhoneNumberIntl } from '$lib/dbFunc';
	import { json } from '@sveltejs/kit';
	//	import { addLogEntry } from '$lib/dbFunc';
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
	$: mobile = extractPhoneNumberIntl(lead.telefonm)
	$: privat = extractPhoneNumberIntl(lead.telefonp)
	$: business = extractPhoneNumberIntl(lead.telefong)
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
	let reminderOk = false;
	$: {
		reminderOk = remindertime ? true : false;
		/*		
		if (reminderOk) {
			const now = new Date().getTime();
			const when = new Date(reminder).getTime();
			console.log(when);
			console.log(now);
			console.log(when - now);
			if (when - now < 1000 * 60 * 60 * 2) {
				reminderOk = false;
			}
		}
*/
	}

	const addLog = async (reason) => {
		let text: string = '';
		let stamp: Date = new Date();
		let rs;
		//		console.log('======================================');
		text = $page.data.user.login + ': ';
		switch (reason) {
			case 1:
				// nicht erreicht
				text += 'nicht erreicht';
				rs = await addLogEntry(lead.id, $page.data.user.id, text, null);
				//				console.log(rs);
				break;
			case 2:
				// kein Interesse
				text += 'kein Interesse';
				rs = await addLogEntry(lead.id, $page.data.user.id, text, null);
				//				console.log(rs);
				break;
				case 3:
				// schon vers.
				text += 'schon versichert';
				rs = await addLogEntry(lead.id, $page.data.user.id, text, null);
				//				console.log(rs);
				break;
				case 5:
				// weg
				text += 'weggeklickt';
				rs = await addLogEntry(lead.id, $page.data.user.id, text, null);
				//				console.log(rs);
				break;
			case 4:
				// nicht erreicht
				let rm = new Date(reminder);
				//				console.log(rm);
				//				console.log('======================================');
				text += 'später anrufen: ' + dateTimeFormatterMEZ.format(rm);
				//				console.log(text);
				rs = await addLogEntry(lead.id, $page.data.user.id, text, reminder);
				//				console.log(rs);
				break;
			default:
			// anderer Grund
		}
		goto('/liste/open', {
			invalidateAll: true
		});
	};

	$: autocall = data.user.id == 4533;
	const notThere = () => {
		addLog(1);
	};
	const noInterest = () => {
		addLog(2);
	};
	const alreadyInsured = () => {
		addLog(3);
	};
	const whenLater = () => {
		addLog(4);
	};
	const cleanAway = () => {
		addLog(5);
	};
	let showJSON: boolean = false;

	let reminderdate = new Date().toISOString().substring(0, 10);
	let remindertime = formatDate(new Date(), 't');
	$: reminder = reminderdate + ' ' + remindertime;

	$: reserved = user.id != lead.recallmaid ? lead.recallmaid : 0;
	$: reservedForMe = user.id == lead.recallmaid;

	const verify = async () => {
		console.log('xxx');
		await verifyEmail(lead.id, lead.email);
		invalidateAll();
	};
</script>

{#if $navigating}
	Seite wird geladen...
{:else}
	<!--
{lead.available}
-->

	<div class="main" class:forelsa={reserved} class:forme={user.id == 4533 && reservedForMe}>
		<div class="grid">
			<div class="xgrid">
				<div>
					Lead
					<span title={lead.tip}>ID</span>
				</div>
				<div>{lead.id}</div>

				<div>Garage</div>
				<div>{lead.garage}</div>
				<div>Verkäufer</div>
				<div>{lead.verkaeufer}</div>

				<div>Datum Vertrag</div>
				<div>{formatDate(new Date(lead.datumerf), 'm')}</div>
				<div>Datum Abgabe</div>
				<div>
					{#if lead.abgabedatum}
						{formatDate(new Date(lead.abgabedatum), 'm')}
					{/if}
				</div>
				<div>Vertragnr</div>
				<div>{lead.vertragnr}</div>
				<div>Fahrzeug</div>
				<div>{lead.marke} {lead.typ} {lead.modell}</div>
				<div>Stammnummer</div>
				<div>{lead.stammnr}</div>
				<div>Versicherungen</div>
				<div>{lead.versicherungenmail}</div>
				<div>Sprache</div>
				<div>{lead.sprache}</div>
				<div>Kunde</div>
				<div>
					{lead.anrede ? lead.anrede : ''}
					{lead.vorname}
					{lead.nachname}
				</div>
				<div />
				<div>
					{lead.strasse}
					{lead.hausnummer}
				</div>
				<div />
				<div>
					{lead.plz}
					{lead.ort}
				</div>
				<div>Geburtstag
				</div>
				<div>
					{formatDate(lead.geburtstag, 'd')}
				</div>
				<div>&#160;</div>
				<div>
				</div>
				<div>Telefon</div>
				<div class="phonegrid">
					{#if true || mobile}
					<div>
					M</div>
					<div>
						{#if autocall}
							<a href="tel:{mobile}"> {mobile}</a>
						{:else}
							{mobile}
						{/if}
					</div>
					<div>{lead.telefonm}</div>
					{/if}
					{#if true || privat && privat != mobile}
					<div>
					P</div><div>
						{#if autocall}
							<a href="tel:{privat}"> {privat}</a>
						{:else}
							{privat}
						{/if}</div>
						<div>{lead.telefonp}</div>
					{/if}
					{#if true ||  business && business != mobile && business != privat}
					<div>G</div>
					<div>
						{#if autocall}
							<a href="tel:{business}"> {business}</a>
						{:else}
							{business}
						{/if}
					</div><div>{lead.telefong}</div>
					{/if}
				</div>
				<div>&#160;</div>
				<div>
				</div>
				<div>
					Verkäufer Email
				</div>
				<div>
					{lead.verkaeuferemail}
				</div>


				<div>Email</div>
				<div>
					{#if !lead.emailverified}
						<input type="email" bind:value={lead.email} />
						<button on:click={verify}>Email verifizieren</button>
					{:else}
						{lead.email}
					{/if}
				</div>
			</div>
			<!--
			{JSON.stringify(lead)}
		<div class="kunde">
			{#if !lead.service}
				<span class="alert">KEIN SERVICE !!!!</span>
				<br />
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
			{#if !lead.emailverified}
			<input type="email" bind:value={lead.email} />
			<button>Email verifizieren</button>
			{:else}
			{lead.email}
			{/if}
		</div>
-->
			<!--
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
-->
			<div>
				<button on:click={cleanAway}>wegputzen</button>
				<br />
				<br />
				<button on:click={notThere}>nicht erreicht</button>
				<br />
				<br />
				<button on:click={noInterest}>kein Interesse</button>
				<br />
				<br />
				<input type="date" bind:value={reminderdate} />
				<input type="time" bind:value={remindertime} />
				<br />
				<button disabled={!reminderOk} on:click={whenLater}>später anrufen</button>
				<br />
				<br />
				<button disabled={!lead.emailverified} on:click={showLanding}
					>Landing-Page {lpsrc ? '' : ''}</button
				>
				<br />
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
		<div>{dateTimeFormatter.format(new Date(log.datum))} : {log.bemerkung}</div>
	{/each}
	{#if showJSON}
		<br />
		Datum formatieren generell Funktion wo? Formatierung wo?<br />
		<br />
		{JSON.stringify(data)}
	{/if}
{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: 700px 400px 200px auto;
		height: 500px;
	}

	.main {
		padding: 7px;
	}
	.lpframe {
		width: 400px;
		height: 1100px;
	}
	button {
		background-color: #eeeeee;
		color: #1329f0;
		height: 40px;
		width: 218px;
		font-size: 1.2rem;
	}

	button:disabled {
		background-color: #eeeeee;
		color: #bdc0d8;
		font-size: 1.2rem;
	}

	input[type='date'],
	input[type='time'] {
		font-size: 1rem;
/*
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
*/
	}
	.xgrid {
		height: 100px;
		display: grid;
		grid-template-columns: 200px auto;
		grid-template-rows: repeat(1rem);
	}
	.kunde {
		font-size: 1.2rem;
	}
	input[type='email'] {
		font-size: 1rem;
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
	.phonegrid {
		display: grid;
		grid-template-columns: 30px 150px auto;
	}
</style>
