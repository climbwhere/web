<script>
  import { Router, Route } from "svelte-routing";

  import Slots from "~/screens/Slots/index.svelte";
  import NavBar from "~/components/NavBar.svelte";

  export let url = window.location.pathname;
</script>

<div class="container">
  <NavBar />
  <Router {url}>
    <Route path="/" component={Slots} />
  </Router>
</div>

<style>
  .container {
    overflow: hidden;
    margin: auto;
    width: 100%;
    max-height: 100vh;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
  }
</style>
