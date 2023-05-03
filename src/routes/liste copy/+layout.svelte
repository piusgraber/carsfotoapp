<script lang="ts">
	import type { LayoutData } from './$types';
    import {goto, invalidateAll} from '$app/navigation';
	export let data: LayoutData;
    import {page } from '$app/stores';

let listName = '';
    $: if (!listName) {listName = $page.params.list};

    const showList = () => {
        goto('/liste/' + listName)
    }

    const refresh = () => {
        invalidateAll()
    }
</script>

<div class="header">
    Liste auswählen: <select bind:value={listName} on:change= {showList}>
        <option value="waiting">wartende (7)</option>
        <option value="open">offene Verkäufe (0)</option>
        <option value="history">History (3)</option>
        <option value="leads">gemachte Leads (5)</option>
        <option value="noservice">kein Service (-1)</option>
        <option value="company">Firma (8)</option>
        <option value="res">meine reservierten Verkäufe (4) (userid)</option>
        <option value="resall">alle reservierte Verkäufe (4) </option>
        <option value="all">alle Datensätze</option>
    </select>
    <button on:click={refresh}>refresh</button>
</div>
<slot />

<style>
    .header {
        padding: 5px;
    }
</style>
