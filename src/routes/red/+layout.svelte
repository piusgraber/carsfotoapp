<script>
	import Menuitem from '../../lib/Menuitem.svelte';
	import Titel from '../../lib/Titel.svelte';
</script>

<Titel caption="meine Rotweine" />

<Menuitem caption="Cabernet" path="wines/cab" />
<Menuitem caption="Barbera" path="wines/barbera" />
<Menuitem caption="Nebbiolo" path="wines/nebb" />
<slot />
