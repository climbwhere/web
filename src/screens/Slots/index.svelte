<script>
  import uniq from "lodash/uniq";
  import moment from "moment";
  import { Link } from "svelte-routing";

  import { getSessions, getLastUpdated } from "~/api";
  import SlotsTable from "./components/SlotsTable.svelte";
  import DatePicker from "./components/DatePicker.svelte";
  import GymPicker from "./components/GymPicker.svelte";

  const sessionsRequest = getSessions().then((sessions) => {
    dateFilter = uniq(sessions.map((s) => s._date))[0]; // sets earliest retrieved dates
    return sessions;
  });
  const lastUpdatedRequest = getLastUpdated();

  let dateFilter = moment().format("DD/MM/YY"); // current date as a "guess"
  let gymFilter = [];
</script>

<div class="container">
  <DatePicker bind:selectedDate={dateFilter} {sessionsRequest} />
  <div class="row">
    <SlotsTable {sessionsRequest} {dateFilter} {gymFilter} />
    <GymPicker bind:selectedGyms={gymFilter} />
  </div>
  <footer>
    {#await lastUpdatedRequest}
      Loading...
    {:then lastUpdated}
      <b>Last updated {moment(lastUpdated).fromNow()}.</b> Data from respective
      gyms' websites are retrieved every two minutes or so and is not guaranteed
      to be up to date. Spotted incorrect data?
      <Link to="report">report here</Link>.
    {/await}
  </footer>
</div>

<style>
  .container {
    height: 100%;
    width: 100%;
    margin: auto;
    overflow: visible;
    display: flex;
    flex-direction: column;
  }

  .row {
    border: green 2px solid;
    flex: 1;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap-reverse;
    overflow-y: scroll;
  }

  footer {
    flex: 1;
    max-height: 50px;
    background: white;
    border-top: 2px solid #f5f5f5;
    color: gray;
    width: 100%;
    padding: 5px 10px;
    font-size: 12px;
  }
</style>
