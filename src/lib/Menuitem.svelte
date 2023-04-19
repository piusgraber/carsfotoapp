<script type="ts">
	export let caption = '';
	export let path = '';
</script>

<item>
	<a href={path}>{caption}</a>
</item>

<style>
	item {
        font-size: 24px;
		margin: 20px;
		cursor: pointer;
	}
</style>
