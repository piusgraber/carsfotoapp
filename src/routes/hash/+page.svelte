<script lang="ts">
import  crypto from 'crypto'

let json = {
    hello: 1
}

const myString = JSON.stringify(json);
const hash = crypto.createHash('sha256').update(myString).digest('hex');
console.log(hash);

</script>
<div>----------------------------------------------------</div>
{hash}
<div>----------------------------------------------------</div>
