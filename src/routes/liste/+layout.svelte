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

<div class="header">
    Liste auswählen: <select bind:value={listName} on:change= {showList}>
        <option value="open">offene Verkäufe</option>
        <option value="history">History (abgelaufene)</option>
        <option value="leads">gemachte Leads</option>
        <option value="noservice">kein Service</option>
        <option value="res">reservierte Verkäufe</option>
        <option value="all">alle Datensätze</option>
    </select>
</div>
<slot />

<style>
    .header {
        padding: 5px;
    }
</style>
