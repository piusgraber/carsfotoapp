<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: products = data.wines.filter((w) => w.site == sorte);
  $: test = data.gaga;
  $: user = data.user;
	$: sorte = $page.params.site;
	$: loginData = products && products.length ? products[0] : {title: 'hi', login: 'x', password: 'y'};
	$: route = $page.route;
	$: params = $page.params;
	$: urly = $page.url;

	import { goto, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { AfterNavigate } from '@sveltejs/kit';
	import Layout from '../../+layout.svelte';

	let nav: AfterNavigate;

	afterNavigate((from) => {
		console.log(from);
		nav = from;
		console.log(route);
		console.log($page.url);
	});
</script>

<div>
	User <b>{JSON.stringify(user)} </b>
</div>
<div>
	Sites <b>{sorte} </b>
</div>
<div>
	{loginData.title}
</div>
<div>
	{loginData.login} / {loginData.password}
</div>
<div>
	{JSON.stringify(route)}
</div>
<div>
	{JSON.stringify(params)}
</div>
<div>
	{JSON.stringify(Layout)}
</div>

<style>
</style>
