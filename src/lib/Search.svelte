<script>
	export let filter = '';

	function init(el) {
		el.focus();
	}

	let srch = false;
	const on_key_down = (e) => {
		if (e.ctrlKey) {
			if (e.key == 'f') {
				e.preventDefault();
				console.log('search');
				srch = true;
			}
		} else {
			if (srch) {
				if (e.key == 'Escape') {
					srch = false;
					filter = '';
				}
				if (e.key === 'Enter') {
					e.preventDefault();
					srch = true;
				}
			}
		}
	};
</script>

<svelte:window on:keydown={on_key_down} />

<div>
	Liste {#if srch}Suche: <input bind:value={filter} type="text" use:init />
		{#if filter}Filter: "{filter}" -- {/if} abbrechen mit ESC{:else}
		Suche mit CTRL-F{/if}
</div>
<!--
{JSON.stringify(filteredList)}
-->
