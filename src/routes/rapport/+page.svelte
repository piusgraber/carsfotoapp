<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { formatDate } from '$lib/myfuncs';

    export let data;

    let working = false

    let datum: Date
    let stunden: string

    function waitAWhile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 1000);
  });
}

    async function subscribe(event: Event) {
      const form = event.target as HTMLFormElement
      const data = new FormData(form)
        console.log("subscribe")
      await fetch('/rapport', {
        method: 'POST',
        body: data
      })
      working = true
      await waitAWhile()
      invalidateAll()
      working = false
    }










</script>
<b>Rapport</b>
<div class="grid">

{#each data.res as d}
<div>
    {formatDate(d.datum, 'd')}</div>
    <div>
        {d.stunden}</div>
        {/each}
    </div>


<form on:submit|preventDefault={subscribe}>

<div>Datum: <input name="datum" type="date" bind:value={datum} /></div>
<div>Stunden: <input name="stunden" type="text" class="hours" bind:value={stunden} /></div>
<button>erfassen</button> {#if working}...wird gespeichert{/if}

</form>


  


<style>
    .hours {
        width: 80px;
    }


    .grid {
        display: grid;
        grid-template-columns: 80px 20px;
    }
</style>
