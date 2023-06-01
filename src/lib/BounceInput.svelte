<script>
  import { Subject, timer } from "rxjs";
  import { debounce } from "rxjs/operators";

  export let value = "";
  export let id = "";
  export let placeholder = "dd";
  export let disabled = false;

  const sub = new Subject();
  function changed(e) {
    sub.next(e.currentTarget.value);
  }

  const inpsub = sub.pipe(debounce(() => timer(700))).subscribe(val => {
    value = val;
  });
</script>

<style>
  input {
    width: 140px;
  }
</style>

<input disabled="{disabled}" {placeholder} type="text" {id} {value} on:input={changed} />
