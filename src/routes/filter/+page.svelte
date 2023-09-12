<script lang="ts">

    import {page} from '$app/stores'

    let newDomain : String = ""
    let selDomain : String = ""
    const select = d => {
        selDomain = d
    }
    const save = () => {
domains.push(newDomain)
domains = [...domains]
        newDomain = ""

    }
    const cancel = () => {
        console.log('xxxxxxxxxxxxxxxxxxxx')
        selDomain = ""
        console.log('d', selDomain, 'x')

    }

    $: domains = $page.data.domains;
</script>
<div>Domain Filter {selDomain}</div>
<div class="grid">

{#each domains as d}
<div class="selectable" on:click={() => select(d)}>
{#if selDomain && selDomain==d}
<input placeholder="@xxx.ch" bind:value={selDomain} type="text"/>
{:else}    
    {d}
    {/if}

</div>
<div>
    {#if selDomain && selDomain==d}
    <span class="selectable" title="speichern">[ok]</span>
<span class="selectable" title="löschen">[del]</span>
<span class="selectable" title="abbrechen" on:click= {cancel}>[x]</span>
{/if}
</div>
{/each}
{#if !selDomain}
<div><input placeholder="@xxx.ch" bind:value={newDomain} type="text"/></div>
<div><button on:click={save}>speichern</button></div>
{/if}
</div>


<style>
.grid {
    display: grid;
    grid-template-columns: 320px 1fr;
}
    .selectable {
        cursor: pointer
    }

    .selectable:hover {
        background-color: #eeeeee;
    }

    input {
        width: 200px;
    }
</style>