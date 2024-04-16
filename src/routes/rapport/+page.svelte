<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { formatDate } from '$lib/myfuncs';

    export let data;

    let working = false

    let datum: Date
    let stunden: string
    let minuten: string

    datum = formatDate(new Date(), 'x').substring(0, 10)

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
      await fetch('/rapport', {
        method: 'POST',
        body: data
      })
      working = true
      stunden=''
      datum = formatDate(new Date(), 'x').substring(0, 10)
      await waitAWhile()
      goto('/rapport?' + new Date().getTime())
//      invalidateAll()//('/rapport')
      working = false
    }




$: invalidData = !datum || !stunden || !stunden.includes(':') || stunden.length < 4;





</script>
<b>Rapport</b>  (F5 zum aktualisieren)

<form on:submit|preventDefault={subscribe}>
    <div class="gridH">

    <div>Datum:</div><div> <input name="datum" type="date" bind:value={datum} /> TT.MM.JJJJ </div>
    <div>Stunden:Minuten:</div><div> <input name="stunden" type="text" class="hours" bind:value={stunden} placeholder="0:00"/>  zB. 3:30</div>
    <div></div>
    <div>
    <button disabled={invalidData}>erfassen</button> {#if working}...wird gespeichert{/if}
</div>
    
</div>
</form>

    
<div class="grid">

{#each data.res as d}
<div>
    {formatDate(d.datum, 'd')}</div>
    <div>
        {d.stunden}</div>
        {/each}
    </div>



  


<style>
    .hours {
        width: 50px;
    }


    .grid {
        display: grid;
        grid-template-columns: 80px 20px;
    }
    .gridH {
        display: grid;
        grid-template-columns: 130px 260px;
    }
</style>
