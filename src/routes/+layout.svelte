<script lang="ts">
	import type { LayoutData } from './$types';
    import {goto} from '$app/navigation';
	export let data: LayoutData;

//	import { storeData } from '$lib/mystore';

    let listName = '';

    const showList = () => {
        goto('/liste/' + listName)
    }
</script>
<main>
    <div class="titlegrid">
        <div>
            Kundendienstportal
        </div>
        <div><b>
            {data.user.name}<br/>
            {data.user.cwTelefon}<br/>
        </b>
        </div>
        <div>
                        
            Sprachfilter: 
            {#if data.user.sprachen.de}DE {/if}
            {#if data.user.sprachen.fr}FR {/if}
            {#if data.user.sprachen.it}IT {/if}

        </div>
        <div>
            [abmelden]
        </div>
    
    </div>
<!--
<div>
    Benutzer: 
    {data.user.initialen} <i>{data.user.name}</i>  ( {data.user.initialen} {data.user.cwTelefon} )
    {#if data.user.sprachen.de}DE {/if}
    {#if data.user.sprachen.fr}FR {/if}
    {#if data.user.sprachen.it}IT {/if}

    {JSON.stringify(data.user)}
</div>
-->    
<slot />
</main>
<style>
    .titlegrid {
        padding: 5px;
        font-size: 1.3rem;
        background-color: rgb(192, 192, 192);
        display: grid;
        grid-template-columns: 222px 299px 250px auto;
    }
    main {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
    }
</style>
