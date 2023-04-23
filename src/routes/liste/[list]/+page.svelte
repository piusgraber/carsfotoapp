<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { prevent_default } from 'svelte/internal';

	import type { PageData } from './$types';

	export let data: PageData;

	let sprachen = data.user.sprachen;

	type Zeile = {
		service: boolean;
		spracheid?: number;
		id: string;
		guid: string;
		state?: number;
		status?: string;
		abgabe?: Date;
		datumerf?: Date;
		leadDatum?: Date;
		abgabeDatum?: string;
		erfasst?: string;
		kunde?: string;
		garage?: string;
		marke?: string;
		typ: string;
		vertragnr: string;
	};

	const locale = 'de-CH';
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	};

	const formatter = new Intl.DateTimeFormat(locale, options);

	let filteredList: Zeile[];
	$: {
		filteredList = data.leads;
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
		goto('/lead/' + z);
	};

	let srch = false;
const filterList = () => {
	filteredList
	console.log(filter)
}
	const on_key_down = e => {
		if (e.ctrlKey) {
			if (e.key=='f') {
				e.preventDefault()
				console.log('search')
				srch = true;
			}
		} else {
			if (srch) {
				if (e.key==='Enter') {
					e.preventDefault()
				    filterList()
					srch = true;
				}
			}
		}
	}
	const on_key_up = e => {
		console.log(e)
	}

	function init(el){
    el.focus()
  }
  let filter = ''
</script>


<svelte:window
    on:keydown={on_key_down}
/>
<div>Liste [{data.liste}] {#if srch}Suche: <input bind:value={filter} type="text" use:init/>{/if}</div>
<div class="panel">
	<div class="titel">
		{#if data.liste=='leads'}Datum L{:else}
		Abgabe
		{/if}
	</div>
	<div class="titel">S</div>
	<div class="titel">dfi</div>
	<div class="titel">Kunde</div>
	<div class="titel">Garage</div>
	<div class="titel">Vertrag</div>
	<div class="titel">Fahrzeug</div>
	<div class="titel"></div>
	
	
	{#each filteredList as zeile}
		<div>
			{#if data.liste=='leads'}
			{zeile.leadDatum}

			{:else}
			{zeile.abgabeDatum}

			{/if}
		</div>
		<!--	
	<div on:click={() => showLead(zeile.guid)} on:keydown={() => showLead(zeile.guid)}>
			{zeile.id}
		</div>
	-->
		<div class="link" on:click={() => showLead(zeile.guid)} on:keydown={() => showLead(zeile.guid)} title="{zeile.erfasst}">
			{#if zeile.service}
				S
			{/if}
		</div>
		<div>{zeile.spracheid==3?'IT': zeile.spracheid==2?'FR' : 'DE'} </div>
		<div class="cell-kunde"><span> {zeile.kunde}</span></div>
		<div class="cell-kunde"><span> {zeile.garage}</span></div>
		<div><span> {zeile.vertragnr}</span></div>
		<div class="cell-fahrzeug"><span> {zeile.marke} {zeile.typ}</span></div>
		<div />
	{/each}
</div>

<style>
	.panel {
		display: grid;
		grid-template-columns: 100px 20px 30px 340px 500px 90px 360px auto;
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
</style>
