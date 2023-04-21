<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	export let data: PageData;

	let sprachen = {
		de: 1,
		fr: 1,
		it: 1
	};

	type Zeile = {
		service: boolean;
		spracheid?: number;
		id: string;
		guid: string;
		state?: number;
		status?: string;
		abgabe?: Date;
		abgabeDatum?: string;
		kunde?: string;
		garage?: string;
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
		filteredList.map((z) => {
			try {
				z.abgabeDatum = z.abgabe ? formatter.format(new Date(z.abgabe)) : '';
			} catch (err) {}
		});
	}
	//	console.log(data)
	const showLead = (z) => {
		goto('/lead/' + z);
	};
</script>

<div>Liste</div>
<div class="panel">
	{#each filteredList as zeile}
		<div>
			{zeile.abgabeDatum}
		</div>
		<!--	
	<div on:click={() => showLead(zeile.guid)} on:keydown={() => showLead(zeile.guid)}>
			{zeile.id}
		</div>
	-->
		<div class="link" on:click={() => showLead(zeile.guid)} on:keydown={() => showLead(zeile.guid)}>
			{zeile.spracheid}
			{#if zeile.service}
				.
			{/if}
		</div>
		<div class="cell-kunde"><span> {zeile.kunde}</span></div>
		<div class="cell-kunde"><span> {zeile.garage}</span></div>
		<div />
	{/each}
</div>

<style>
	.panel {
		display: grid;
		grid-template-columns: 100px 20px 340px 500px auto;
	}

	.cell-kunde {
		width: 322px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.link {
		cursor: pointer;
	}
</style>
