<script lang="ts">
    import Menuitem from "../lib/Menuitem.svelte";
	import Titel from "../lib/Titel.svelte";
	import type { LayoutData } from "./$types";

    export let data : LayoutData;
</script>
<Titel caption="Mein Weinkeller" />
<div>
<menubar>
    <Menuitem caption="Uebersicht" path="/"/>
    <Menuitem caption="Rotwein" path="/red"/>
    <Menuitem caption="Weisswein" path="/white"/>
</menubar>
</div>
<slot></slot>

<style>

</style>