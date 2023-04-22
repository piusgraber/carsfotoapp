<script lang="ts">
	import type { LayoutData } from './$types';
    import {goto} from '$app/navigation';
	export let data: LayoutData;


    let listName = '';

    const showList = () => {
        goto('/liste/' + listName)
    }
</script>
<main>
<div>
    Benutzer: {data.user.name}  ( {data.user.initialen} {data.user.cwTelefon} )
    {#if data.user.sprachen.de}DE {/if}
    {#if data.user.sprachen.fr}FR {/if}
    {#if data.user.sprachen.it}IT {/if}
</div>
<slot />
</main>
<style>
    main {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
    }
</style>
