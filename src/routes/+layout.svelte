<script lang="ts">
	import type { LayoutData } from './$types';
	import { goto, invalidateAll } from '$app/navigation';
	import {  navigating, page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import '../app.css'

	export let data: LayoutData;

	//	import { storeData } from '$lib/mystore';

	let listName = '';

	const showList = () => {
		goto('/liste/' + listName);
	};

	const showLogin = () => {
		goto('/login');
	};

	const showWaiting = () => {
		goto('/liste/waiting');
	};

	const showOpenLeads = () => {
		goto('/liste/open');
	};

	const showTopf = () => {
		goto('/topf1');
	};

	const showHistoryLeads = () => {
		goto('/liste/all');
	};

	const showLeads = () => {
		goto('/liste/leads');
	};

	const refresh = () => {
		invalidateAll();
	};

  </script>

<main>
	<div class="titlegrid">
		<div>
			Kundendienstportal
			<!--
			<br/>Version 1.0
-->
		</div>
		{#if data.user && data.user.name}
			<div>
				<b>
					{data.user.name} ({data.user.login}) <br />
					{data.user.cwTelefon}&#160;&#160;
					<button
						on:click={async () => {
							const response = await fetch('/api/logout');
							if (response.ok) {
								goto('/login', { invalidateAll: true });
								//                invalidateAll();
							}
						}}>abmelden</button
					>
					<br />
				</b>
			</div>
			<div>
				Sprachfilter:
				{#if data.user.sprachen.de}DE {/if}
				{#if data.user.sprachen.fr}FR {/if}
				{#if data.user.sprachen.it}IT {/if}<br />
				{#if data.user.id==4533 && !$navigating}
				<button on:click={showTopf}>Topf anzeigen</button>
				<button on:click={showWaiting}>wartende anzeigen</button>
				{/if}
				{#if !$navigating && $page.params.list != 'open'}
					<button on:click={showOpenLeads}>offene Datensätze anzeigen</button>
				{/if}
				{#if !$navigating && $page.params.list != 'all'}
					<button on:click={showHistoryLeads}>History anzeigen </button>
				{/if}
				{#if !$navigating && $page.params.list != 'leads'}
					<button on:click={showLeads}>Leads anzeigen </button>
				{/if}
			</div>
			<div />
		{:else}
		<div>
		<button
						on:click={async () => {
							const response = await fetch('/api/logout');
							if (response.ok) {
								goto('/login', { invalidateAll: true });
								//                invalidateAll();
							}
						}}>abmelden</button
					>
			</div>
		{/if}
	</div>
	<!--
<div>
    Benutzer: 
    {data.user.initialen} <i>{data.user.name}</i>  ( {data.user.initialen} {data.user.cwTelefon} )
    {#if data.user.sprachen.de}DE {/if}
    {#if data.user.sprachen.fr}FR {/if}
    {#if data.user.sprachen.it}IT {/if}

    {JSON.stringify(data.user)}
</div>


{JSON.stringify($navigating)}<br/>
{#if $navigating}
......
{:else}
<slot />
{/if}

-->
	<slot />
</main>
<style>
	button {
		font-size: 1.2rem;
	}
	.titlegrid {
		padding: 5px;
		font-size: 1.3rem;
		background-color: rgb(192, 192, 192);
		display: grid;
		grid-template-columns: 300px 400px 920px auto;
	}
/*
	main {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
*/	
</style>
