<script lang="ts">
	import type { LayoutData } from './$types';
    import {goto, invalidateAll} from '$app/navigation';
	export let data: LayoutData;
    import {page } from '$app/stores';

let listName = '';
    $: listName = $page.params.list;

</script>

<slot />

<style>
    .header {
        padding: 5px;
    }
</style>
