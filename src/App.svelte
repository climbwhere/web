<script>
  import { Router, Route } from "svelte-routing";

  import SlotsScreen from "~/screens/Slots/index.svelte";
  import ReportScreen from "~/screens/Report.svelte";
  import AboutScreen from "~/screens/About.svelte";
  import ErrorScreen from "~/screens/Error.svelte";
  import UpdatesScreen from "~/screens/Updates.svelte";
  import NotFound from "~/screens/NotFound.svelte";
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
      <Route path="/" component={SlotsScreen} />
      <Route path="/report" component={ReportScreen} />
      <Route path="/about" component={AboutScreen} />
      <Route path="/error" component={ErrorScreen} />
      <Route path="/updates" component={UpdatesScreen} />
      <Route path="" component={NotFound} />
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
    display: grid;
    grid-template-rows: 55px auto;
  }

  .content {
    overflow-y: hidden;
  }
</style>
