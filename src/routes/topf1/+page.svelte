<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/myfuncs';

	$: liste = $page.data.records.filter(r => r.vertragnr)
</script>

{#each liste as rec}
	<div class="row">
		<div class="cell" title={JSON.stringify(rec)}>
			{rec.id}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{formatDate(rec.stamp, 'm')}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{rec.garage_firma}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{rec.service}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{rec.vertragnr}
		</div>
		<div class="cell" title={JSON.stringify(rec)}>
			{formatDate(rec.evnsent, 'm')} {rec.versicherung}
		</div>
	</div>
{/each}

<style>
	.row {
		display: grid;
		grid-template-columns: 55px 140px 255px 50px 240px 300px auto auto;
	}

	.cell {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
