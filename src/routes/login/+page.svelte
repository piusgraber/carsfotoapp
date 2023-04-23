<script lang="ts">

import { storeData } from "$lib/mystore";

const subscribeMe = () => {
    const form = event?.target as HTMLFormElement;
    const data = new FormData(form)
    fetch ('api/form', {
        method: 'post',
        body: data
    })
}

const setUser = () => {
    storeData.update (s => s = {user: {initialen: initial}})
}

let initial = 'ooo';
</script>

<h1>Anmeldung</h1>
<form on:submit={subscribeMe} >
    <div class="grid">
    <div>Initialen </div>
    <div><input type="text" name="initialen" bind:value={initial}/></div>
   
    
    <div>Passwort</div>
    <div><input type="password" name="passwort" /></div>
    <div></div>
    <div><button>send{$storeData.user.initialen}</button>
    </div>
</div>

</form>
<button on:click={setUser}>U</button>


<style>

    .grid {
        display: grid;
        grid-template-columns: 100px auto;
    }
</style>