<script lang="ts">
	import { navigating, page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	import { onDestroy, onMount } from 'svelte';

	onMount(() => console.log('Mounted home page'));
	onDestroy(() => console.log('Unmounted guid page'));

	$: user = $page.data.user;

	import { dateFormatter, dateTimeFormatterMEZ, formatDate } from '$lib/myfuncs';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { extractPhoneNumberIntl } from '$lib/dbFunc';
	import { json } from '@sveltejs/kit';

	import { setEvnCode	} from '$lib/fetch';
	import { calcDiff } from '$lib/datediff';

	//	import { addLogEntry } from '$lib/dbFunc';
	let lead;

	let min = '';
	let delay = 0;
	let diff = 0
	let now
	let diffs = ''
	$: {
		
		now = new Date(formatDate(new Date(), 'xu')).getTime()		

	delay = new Date(formatDate(new Date(lead.evnsent), 'x')).getTime()	
	diff = now - delay
	let diffh = Math.floor(diff / 1000 / 60 / 60)
	min = 	'0' + Math.floor((diff / 1000 / 60 / 60 - Math.floor(diff / 1000 / 60 / 60)) * 60)
	if (min.length == 3) {
		min = min.substring(1)
	}
	diffs = diffh + ':' + min
	}

	$: mobile = extractPhoneNumberIntl(lead.evntelefon)
	$: vktel = extractPhoneNumberIntl(lead.user_telefon)
	$: lead = data.lead;
	$: {
		lead.sent = formatDate(new Date(lead.evnsent), 'xu') + 'Z'
		lead.done = formatDate(new Date(lead.evnok), 'x')+'Z'
		if (lead.evnok) {
			lead.diff = calcDiff(lead.sent, lead.done)
		} else {
			let now = formatDate(new Date(), 'xu')+'Z'
			lead.diff = calcDiff(lead.sent, now)
		}
	}

	let lpsrc;
	const showEvnPDF = () => {
//		lpsrc = `https://lead.car-ware.ch/fop/ngDok?irenehassuchasmile&type=nachweis&id=${lead.id}`
		lpsrc = `https://lead.car-ware.ch/pavServer/ngDok?type=nachweis&irenehassuchasmile&id=${lead.id}`
			
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

	const setCode = async (guid, code) => {
		await setEvnCode(guid, code)
	};

	$: autocall = true; //data.user.id == 4533;
	const notThere = () => {
		addLog(1);
	};
	$: pius = data.user?.id == 4533 || data.user?.id == 1;
	const back = async (guid) => {
		goto('/liste/evn')
	};
	const verbalOk = async (guid) => {
		await setCode(guid, 1);
		goto('/liste/evn')
	};
	const commitOk = async (guid) => {
		await setCode(guid, 2);
		goto('/liste/evn')
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
		await verifyEmail(lead.id, user.id, lead.email);
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
					GUID
				</div>
				<div>
					#{lead.guid} 
				</div>
				<div>&#160;</div>
				<div>&#160;</div>

				<div>Garage</div>
				<div>{lead.garage_firma}</div>
				<div>Verkäufer</div>
				<div>{lead.user_vorname} {lead.user_nachname}</div>
				<div>email</div>
				<div>{lead.dispo_email}</div>
				<div>Telefon</div>
				<div>
					
					<div class="phonegrid">
						<div>
						</div><div>
							{#if autocall}
								<a href="tel:{vktel}">{vktel}</a>
							{:else}
								{mobile}
							{/if}</div>
							<div>{lead.user_telefon}</div>
					</div>
						</div>

						<div>&#160;</div>
						<div>&#160;</div>
						<div>Datum eVn gesandt</div>
				<div>
				{formatDate(new Date(lead.evnsent), 'm')}
				<i>vor {diffs} </i>
				</div>
<!--
				<div>delay</div>
				<div>
				{formatDate(new Date(), 'xu')}
				</div>
-->
				<div>eVn ab</div>
				<div>
						{dateFormatter.format(new Date(lead.vnab))}
				</div>
				<div>&#160;</div>
				<div>&#160;</div>
				<div>Fahrzeug</div>
				<div>{lead.marke} {lead.modell} {lead.typ} </div>
				<div>Stammnummer</div>
				<div>{lead.stammnr}</div>
				<div>Kennzeichen</div>
				<div>{lead.kanton} {lead.kennzeichen}</div>
				<div>&#160;</div>
				<div>&#160;</div>
				<div>Kunde</div>

				<div>
					{lead.halteranrede}<br/>
					{lead.haltername}<br/>
					{lead.halteradresse}<br/>
					{lead.halterplz} {lead.halterort}
				</div>
				<div>&#160;</div>
				<div>&#160;</div>
				<div>Versicherung</div>
				<div>{lead.versicherung}</div>
				<div>Telefon</div>
				<div class="phonegrid">
					<div>
					</div>		<div>
						{#if autocall}
							<a href="tel:{mobile}">{mobile}</a>
						{:else}
							{mobile}
						{/if}</div>
						<div>{lead.evntelefon}</div>
				</div>
				<div>&#160;</div>
				<div>
				</div>
<!--
				<div>{JSON.stringify(lead)}</div>
-->
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
				<button disabled="{lead.evnok}" on:click={() => commitOk(lead.guid)}>OK</button>
				<br />
				<br />
				<button disabled="{lead.evnok}" on:click={() => verbalOk(lead.guid)}>mündliches OK</button>
				<br />
				<br />
				<button on:click={showEvnPDF}
					>eVn Formular</button
				>
				<br />
				<br />
				<button class="exit" on:click={() => back()}>zurück zur Liste</button>
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

	{#if pius}
	{#each lead.diff.arr as e}
<div>{e.b} - {e.e} {e.time} {e.break}		</div>
	{/each}
	{JSON.stringify(lead.diff)}
	{/if}
	<hr/>

<a href="mailto:{lead.dispo_email}?subject=Ihre Nachweisbestellung für {lead.haltername} bei {lead.versicherung}, {lead.kanton} {lead.kennzeichen}">{lead.dispo_email}</a><br/>
<br/>
<b>Ihre Nachweisbestellung für {lead.haltername} bei {lead.versicherung}, {lead.kanton} {lead.kennzeichen}</b> <br/>
<br/>
<br/>
Guten Tag<br/>
Im Zusammenhang mit der Bestellung des Versicherungsnachweis für:<br/>
Fahrzeug:    {lead.marke} {lead.typ}, Stammnummer: {lead.stammnr}<br/>
Halter:         {lead.halteranrede} {lead.haltername}, {lead.halteradresse}, {lead.halterplz} {lead.halterort}<br/>
<br/>
Die {lead.versicherung} hat uns mündlich bestätigt, dass der Nachweis für Ihren oben aufgeführten Kunden erstellt wurde.<br/>
<br/>
Beste Grüsse<br/>
Ihre CARWARE<br/>

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
		width: 800px;
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

	button.exit {
		background-color: rgb(187, 187, 255);
	}
	.phonegrid {
		display: grid;
		grid-template-columns: 30px 150px auto;
	}
</style>
