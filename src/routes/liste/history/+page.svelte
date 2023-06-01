<script lang="ts">
	import { page } from '$app/stores';
//	import BounceInput from '$lib/BounceInput.svelte';
	import { fetchLeadsHistory } from '$lib/fetch';
	import type { Zeile } from '$lib/myTypes';
	import { missing_component } from 'svelte/internal';
	import Liste from './Liste.svelte';

	const minZch = 3;

	let srch = false;
	let filter: string = '';
	const status = 2;
	let userid = $page.data.user.id;

	let theFilter = '';


	let validSrch = false;
	let lead: Zeile[] = [];
	let showAll = false;
	let filterSet = false;

	let myTimeout = setTimeout(() => {
			getData('#ieruzeruzewr');
	}, 1000);


	$: {
	}
	$: {
		clearTimeout(myTimeout);
		theFilter = filter;
		if (theFilter) {
			showAll = false;
		}
		lead = [];
		console.log(validSrch);
		if (validSrch || showAll) {
			myTimeout = setTimeout(() => {
				getData(theFilter);
			}, 600);
		}
	}
	$: {
		console.log(filter);
		validSrch = filter.length >= minZch;
	}

	const getData = async (fltr) => {
		lead = await fetchLeadsHistory(fltr);
		console.log(fltr);
	};
	const on_key_down = (e) => {
		if (e.key == 'Escape') {
			filter = '';
			lead = [];
		}
		if (e.ctrlKey) {
			if (e.key == 'f') {
				document.getElementById('filter')?.focus()
				e.preventDefault();
//				// console.log('search');
				srch = true;
			}
		}
	};
</script>

<b>History</b>
&#160;&#160;&#160;&#160;&#160;&#160;

<svelte:window on:keydown={on_key_down} />
Suche:
<input placeholder="suchen..." id="filter" bind:value={filter} />
{#if !validSrch}
	Bitte mindestens {minZch} Zeichen eingeben
<!--
	oder <span on:click={() => showAll=true}>[alle anzeigen]</span>
-->		
{:else}
	Suche mit {theFilter}. Neue Suche mit ESC
{/if}

<Liste filteredList={lead} />
