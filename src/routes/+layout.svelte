<script lang="ts">
	import type { LayoutData } from './$types';
    import {goto} from '$app/navigation';
	export let data: LayoutData;


    let listName = '';

    const showList = () => {
        goto('/liste/' + listName)
    }
</script>
<body>
<div>
    Benutzer: {data.user.name}
</div>
<slot />
</body>
<style>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
    }
</style>
