<script lang="ts">
	type Zeile = {
		abgabe: Date;
	};

	let liste: Zeile[] = [
		{
			abgabe: new Date()
		},
		{
			abgabe: new Date()
		},
		{
			abgabe: new Date()
		},
		{
			abgabe: new Date()
		}
	];
</script>

<div>Liste</div>
{#each liste as zeile}
<div>
	{zeile.abgabe}
</div>
{/each}
