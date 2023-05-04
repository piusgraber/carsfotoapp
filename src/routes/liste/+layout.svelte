<script lang="ts">
	import type { LayoutData } from './$types';
    import {goto, invalidateAll} from '$app/navigation';
	export let data: LayoutData;
    import {page } from '$app/stores';

let listName = '';
    $: listName = $page.params.list;

    const refresh = () => {
        invalidateAll()
    }
</script>
{#if listName=='open'}
<button on:click={() => {goto ('/liste/all')}}> Alle Leads</button>
{/if}
<button on:click={refresh}> neu laden </button>
<slot />

<style>
    .header {
        padding: 5px;
    }
</style>
