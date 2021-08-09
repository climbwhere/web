<script>
  import { Link } from "svelte-routing";
  import { gymBookingLinks } from "~/constants";
</script>

<div class="container">
  <h2>Looks like we're down...</h2>
  <p>
    Something went wrong and we were unable to retrieve data from our servers.
  </p>
  <Link to="/">Try again</Link>
  <p>or check the gyms' websites here:</p>
  {#each Object.keys(gymBookingLinks) as gym}
    <a href={gymBookingLinks[gym]}>{gym}</a>
  {/each}
</div>

<style>
  .container {
    margin: auto;
    height: 100%;
    text-align: center;
    padding: 20px;
  }
  a {
    margin: 5px;
  }
</style>
