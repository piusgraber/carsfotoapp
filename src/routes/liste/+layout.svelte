<script lang="ts">
	import type { LayoutData } from './$types';
    import {goto} from '$app/navigation';
	export let data: LayoutData;
    import {page } from '$app/stores';

let listName = '';
    $: if (!listName) {listName = $page.params.list};

    const showList = () => {
        goto('/liste/' + listName)
    }
</script>

<div>
    Liste auswählen: <select bind:value={listName} on:change= {showList}>
        <option>offene</option>
        <option>History</option>
        <option>Leads</option>
        <option>kein Service</option>
        <option>reserviert</option>
        <option>alle</option>
    </select>
</div>
<slot />

<style>
</style>
