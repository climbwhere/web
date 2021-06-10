<script>
  import { Router, Route } from "svelte-routing";

  import Slots from "~/screens/Slots/index.svelte";
  import NavBar from "~/components/NavBar.svelte";

  export let url = window.location.pathname,
    env;
</script>

<div class="container">
  {#if env === "production"}
    <script
      async
      defer
      data-website-id="0cf66065-68c8-4368-87b5-b3bee9d160be"
      src="https://umami.triomic.dev/umami.js"></script>
  {/if}
  <NavBar />
  <Router {url}>
    <Route path="/" component={Slots} />
  </Router>
</div>

<style>
  .container {
    flex: 1;
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
