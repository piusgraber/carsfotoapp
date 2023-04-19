<script>
	import Menuitem from "../../lib/Menuitem.svelte";
	import Titel from "../../lib/Titel.svelte";

</script>
<Titel caption="Weissweine"/>
<div>
<Menuitem caption="Sauvignon blanc" path="wines/sab" />
<Menuitem caption="Arneis" path="wines/arn" />
<Menuitem caption="Chasselas" path="wines/cha" />
</div>
<slot></slot>