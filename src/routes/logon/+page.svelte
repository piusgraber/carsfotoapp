<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';

	let username = '';
	let password = '';
	let error = '';

	const login = async () => {
		error = '';
		const response = await fetch('api/login', {
			method: 'POST',
			body: JSON.stringify({ username: username, password: password })
		});
		const resJson = await response.json();
		if (response.status != 200) {
			error = JSON.stringify(resJson);
		}
		console.log('theUser is : ', resJson);
		if (response.ok) {
			goto('/liste/open', {
				invalidateAll: true
			});
			// await invalidateAll()
		}
	};
</script>
<div class="page">
<!--	--{JSON.stringify($navigating)} -- -->
	{#if $navigating}
	Seite wird geladen...
{:else}
<form on:submit|preventDefault={login}>
	<div class="grid">
		<div>
			<label for="username">Benutzer</label>
		</div>
		<div>
			<input id="userneme" bind:value={username} />
		</div>
		<div>
			<label for="username">Passwort: </label>
		</div>
		<div>
			<input id="password" type="password" bind:value={password} />
		</div>
		<div>
		</div>
		<div>
			<button type="submit">anmelden</button>
		</div>
	</div>
	{error}
</form>
{/if}
</div>
<style>
	.page {
		margin: 30px;
	}
	.grid {
		display: grid;
		grid-template-columns: 200px auto;
		row-gap: 7px;
	}
</style>
