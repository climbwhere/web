<script>
  import { Router, Link, Route } from "svelte-routing";
  import Landing from "./Landing.svelte";
  import Slots from "./Slots.svelte";

  export let url = window.location.pathname;
</script>

<Router {url}>
  <Link to="/slots">slots</Link>
  <Route path="/" component={Landing} />
  <Route path="/slots" component={Slots} />
</Router>

<style>
</style>
