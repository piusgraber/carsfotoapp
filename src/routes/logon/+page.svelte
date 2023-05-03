<script lang="ts">
	import { goto } from '$app/navigation';
	import { prevent_default } from 'svelte/internal';

	let username = '';
	let password = '';

	const login = async () => {
		const response = await fetch('api/login', {
			method: 'POST',
			body: JSON.stringify({ username: username, password: password })
		});
		const resJson = await response.json();
		console.log('response: ', resJson);
        if (response.ok) {
            goto('/topf1');
        }
	};
</script>

<form on:submit|preventDefault={login}>
	<label for="username">Benutzer</label>
	<input id="userneme" bind:value={username} /><br />
	<label for="username">Passwort: </label>
	<input id="password" type="password" bind:value={password} /><br />
	<button type="submit">anmelden</button>
</form>
