<script>
  import { Router, Route } from "svelte-routing";

  import Slots from "~/screens/SlotsScreen.svelte";

  export let url = window.location.pathname;
</script>

<Router {url}>
  <Route path="/" component={Slots} />
</Router>

<style>
</style>
