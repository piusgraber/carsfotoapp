<script>
	import { page } from '$app/stores';
</script>

<main>
	<h1>Fehler aufgetreten</h1>
	<p>
		{JSON.stringify($page)}
	</p>
</main>

<style>
	main {
		padding: 10px;
	}
</style>
