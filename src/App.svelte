<script>
  import { Router, Route } from "svelte-routing";

  import SlotsScreen from "~/screens/SlotsScreen.svelte";

  export let url = window.location.pathname;
</script>

<Router {url}>
  <Route path="/" component={SlotsScreen} />
</Router>

<style>
</style>
