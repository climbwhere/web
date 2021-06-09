<script>
  import uniq from "lodash/uniq";
  import { getSessions, getGyms, getLastUpdated } from "~/api";
  import GymBadge from "./components/GymBadge.svelte";
  import SlotsTable from "./components/SlotsTable.svelte";
  import DatePicker from "./components/DatePicker.svelte";

  const sessionsRequest = getSessions();
  const gymsRequest = getGyms();
  const lastUpdatedRequest = getLastUpdated();

  let dateFilter = "11/06/21";
</script>

<div class="container">
  {#await sessionsRequest then sessions}
    <DatePicker
      bind:selectedDate={dateFilter}
      dates={uniq(sessions.map((s) => s._date))}
    />
  {/await}
  <div class="gym-picker">
    {#await gymsRequest}
      Loading...
    {:then gyms}
      {#each gyms as gym}
        <GymBadge {gym} />
      {/each}
    {/await}
  </div>
  <SlotsTable {sessionsRequest} {dateFilter} />
</div>

<style>
  .container {
    flex: 1;
    overflow: hidden;
    margin: auto;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    border: red solid 1px;
  }
</style>
