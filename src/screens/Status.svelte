<script>
  import isNil from "lodash/isNil";

  import { getScraperStatus } from "~/api";
  import { gymBookingLinks } from "~/constants";
  const statuses = getScraperStatus();
</script>

<div class="container">
  <h3>Data Health</h3>
  <p>
    From time to time, changes are made to the booking systems of climbing gyms.
    This can affect the accuracy of our scrapers.
  </p>
  <p>
    We will try our best resolve issues as quickly as possible, in the meantime,
    you can check the respective gyms' websites for up-to-date information:
  </p>
  {#await statuses}
    Loading...
  {:then gyms}
    {#each Object.keys(gyms) as gym}
      <li class:down={!isNil(gyms[gym].error)}>
        <span class="material-icons icon" class:down={!isNil(gyms[gym].error)}>
          {isNil(gyms[gym].error) ? "check_circle" : "️report_problem"}
        </span>
        <span class="gym">
          {gym}
        </span>
        (<a href={gymBookingLinks[gym]}>Visit website</a>)
      </li>
    {/each}
  {/await}
</div>

<style>
  .container {
    overflow: scroll;
    margin: auto;
    width: 100%;
    display: flex;
    flex-flow: column;
    padding: 0 10px;
  }

  li {
    width: 100%;
    display: flex;
    flex-flow: row;
    background: rgba(0, 128, 0, 0.205);
  }

  li.down {
    background: rgba(250, 128, 114, 0.479);
  }

  .gym {
    flex: 1;
  }

  .icon {
    font-size: 20px;
    color: green;
  }

  .icon.down {
    color: red;
  }

  p {
    margin: 10px 0;
  }

  h3 {
    margin: 15px 0;
  }
</style>
