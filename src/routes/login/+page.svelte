<script lang="ts">
const subscribeMe = () => {
    const form = event?.target as HTMLFormElement;
    const data = new FormData(form)
    fetch ('api/form', {
        method: 'post',
        body: data
    })
}

</script>


<form on:submit={subscribeMe} >
<input type="text" name="email" />
<button>send</button>
</form>