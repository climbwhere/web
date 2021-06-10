<script>
  import { Link } from "svelte-routing";
  import uniq from "lodash/uniq";
  import moment from "moment";

  import { getSessions, getLastUpdated } from "~/api";
  import SlotsTable from "./components/SlotsTable.svelte";
  import DatePicker from "./components/DatePicker.svelte";
  import GymPicker from "./components/GymPicker.svelte";

  const sessionsRequest = getSessions();
  const lastUpdatedRequest = getLastUpdated();

  let dateFilter = moment().format("DD/MM/YY");
  let gymFilter = [];
</script>

<div class="container">
  {#await sessionsRequest then sessions}
    <DatePicker
      bind:selectedDate={dateFilter}
      dates={uniq(sessions.map((s) => s._date))}
    />
  {/await}
  <GymPicker bind:selectedGyms={gymFilter} />
  <SlotsTable {sessionsRequest} {dateFilter} {gymFilter} />
  <footer>
    {#await lastUpdatedRequest}
      Loading...
    {:then lastUpdated}
      <b>Last updated {moment(lastUpdated).fromNow()}.</b> Data from respective gyms'
      websites are retrieved every two minutes or so and is not guaranteed to be
      up to date.
    {/await}
  </footer>
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
  }

  footer {
    color: gray;
    background: #f5f5f5;
    width: 100%;
    position: sticky;
    bottom: 0;
    padding: 5px 10px;
    font-size: 12px;
  }
</style>
