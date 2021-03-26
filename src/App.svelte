<script>
  import { Router, Link, Route } from "svelte-routing";
  import Slots from "./components/Slots.svelte";

  export let url = window.location.pathname;
</script>

<Router {url}>
  <Route path="/" component={Slots} />
</Router>

<style>
</style>
