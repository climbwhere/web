<script>
  import { Router, Link, Route } from "svelte-routing";
  import Slots from "./Slots.svelte";

  export let url = window.location.pathname;
</script>

<Router {url}>
  <Route path="/" component={Slots} />
</Router>

<style>
</style>
