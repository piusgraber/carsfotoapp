<script lang="ts">
	import { page } from '$app/stores';

	let filteredList: any[] = [];

	filteredList = $page.data.res;

	filteredList.map((z) => {
		z.evntelefon = extractPhoneNumberIntl(z.evntelefon);
		var dateOffset = 24 * 60 * 60 * 1000 * 1; //5 days
		var myDate = new Date();
		myDate.setTime(myDate.getTime() - dateOffset);
        console.log('Date:', new Date(z.evnsent), myDate, new Date(z.evnsent) < myDate)
		z.overdue = !z.evnok && (new Date(z.evnsent) < myDate);
		z.evndone = z.evnok;
		z.sent = formatDate(new Date(z.evnsent), 'x')
		z.delay = ((new Date(z.evnok).getTime() - new Date(z.sent).getTime()) / 1000 / 60 - 240) / 60  ;
	});

	import type { PageData } from './$types';
	export let data: PageData;
	import { formatDate, dateTimeFormatterMEZ, dateTimeFormatterMEZT, dateTimeFormatter, dateFormatter } from '$lib/myfuncs';
	import { extractPhoneNumberIntl } from '$lib/dbFunc';
</script>

<!--
{JSON.stringify($page)}
-->

<div class="panel">
	<div class="panel-row">
		<div class="titel">Bestellung</div>
		<div class="titel">Versicherung</div>
		<div class="titel">Mail</div>
		<div class="titel">Telefonnummer</div>
		<div class="titel">gültig ab</div>
		<div class="titel">Kennzeichen</div>
		<div class="titel">Halter</div>
		<div class="titel">Marke</div>
		<div class="titel">Stammnr</div>
		<div class="titel">ausgeführt</div>
		<div class="titel">Dauer</div>
	</div>
	<div class="scrollable">
		{#each filteredList as zeile, index}
			<div
				class="panel-row"
				on:click={() => showLead(zeile)}
				on:keydown={() => showLead(zeile)}
				class:overdue={zeile.overdue}
				class:evnok={zeile.evndone}
			>
				<div>
					{dateTimeFormatterMEZ.format(new Date(zeile.evnsent))}
				</div>
				<div>
					{zeile.versicherung}
				</div>
				<div>
					{zeile.evnemail}
				</div>
				<div>
					{zeile.evntelefon}
				</div>
				<div>
					{dateFormatter.format(new Date(zeile.vnab))}
				</div>
				<div class="cell-kunde">
					<span> {zeile.kennzeichen}</span>
				</div>
				<div class="cell-halter" title={$page.data.user.id == 4533 ? zeile.srch : ''}>
					<span
						>{zeile.halteranrede}
						{zeile.haltername}
						<!--{zeile.telefon}--></span
					>
				</div>
				<div class="cell-fahrzeug"><span> {zeile.marke} </span></div>
				<div class="cell-garage"><span> {zeile.stammnr}</span></div>
				<div class="cell-log">
					<span> {zeile.evnok ? dateTimeFormatter.format(new Date(zeile.evnok)) : ''}</span>
				</div>
				<div class="cell-logr">
					{zeile.evnok ? zeile.delay.toFixed(2) + ' Std.' : ''} 
				</div>
				<div class="link" on:click={() => showLead(zeile)} on:keydown={() => showLead(zeile)} />
				<div />
			</div>
		{/each}
	</div>
</div>

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
		grid-template-columns: 145px 110px 255px 150px 120px 140px 310px 150px 140px 170px 130px auto;
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
	.cell-halter {
		width: 250px;
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
	.cell-logr {
		width: 100px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: right;
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
	.overdue {
        font-weight:500;
		color: red;
	}
	.evnok {
        font-weight:500;
		color: rgb(6, 133, 6);
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

	.vok {
		background-color: #a5facb;
		grid-row: auto / span 1;
	}

	.fgw:nth-child(odd) {
		background-color: #a5edfa;
		grid-row: auto / span 1;
	}

	.fgw:nth-child(even) {
		background-color: #7edfd7;
		grid-row: auto / span 1;
	}
</style>
