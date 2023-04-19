<script lang="ts">
export let data;

//console.log(data);

$: products = data.wines.filter(w => w.grape==sorte);
$: sorte = $page.params.sorte;

import  {goto, afterNavigate } from "$app/navigation";
import {page} from "$app/stores";
	import type { AfterNavigate } from "@sveltejs/kit";
	import Layout from "../../+layout.svelte";
let nav: AfterNavigate;
    afterNavigate ( from => {
        console.log(from)
        nav = from;
    })

</script>
<div>
  Sorte {JSON.stringify(sorte)} 
</div>
<div>
  Weine {JSON.stringify(products)}-
</div>

<div class="container">
{#each products as prod}
<div>{prod.id}</div>
<div>{prod.bezeichnung}</div>
{/each}
----{$page}----
</div>


<style>
.container {
  display: grid;
  grid-template-columns: 30px minmax(15rem, 1fr);
  grid-gap: 3px;
}
</style>