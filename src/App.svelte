<script>
  import { Router, Route } from "svelte-routing";

  import Slots from "~/screens/Slots/index.svelte";
  import Report from "~/screens/Report.svelte";
  import NavBar from "~/components/NavBar.svelte";

  export let url = window.location.pathname,
    env;
</script>

<svelte:head>
  {#if env === "production"}
    <script
      async
      defer
      data-website-id="0cf66065-68c8-4368-87b5-b3bee9d160be"
      src="https://umami.triomic.dev/umami.js"></script>
  {/if}
</svelte:head>

<div class="container">
  <NavBar />
  <div class="content">
    <Router {url}>
      <Route path="/" component={Slots} />
      <Route path="/report" component={Report} />
    </Router>
  </div>
</div>

<style>
  .container {
    margin: auto;
    height: 100%;
    width: 100%;
    max-width: 800px;
    background: white;
    border: red solid 2px;
    display: grid;
    grid-template-rows: 55px auto;
  }

  .content {
    overflow-y: scroll;
  }
</style>
