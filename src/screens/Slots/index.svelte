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
  let shouldHideGyms;
</script>

<div class="container">
  <DatePicker bind:selectedDate={dateFilter} {sessionsRequest} />
  <div class="content">
    <SlotsTable
      {sessionsRequest}
      {dateFilter}
      {gymFilter}
      bind:extended={shouldHideGyms}
    />
    <GymPicker bind:selectedGyms={gymFilter} {shouldHideGyms} />
  </div>
  <footer>
    {#await lastUpdatedRequest}
      Loading...
    {:then lastUpdated}
      <b>Last updated {moment(lastUpdated).fromNow()}.</b> Spot incorrect data?
      <Link to="report">report here</Link>.
    {/await}
  </footer>
</div>

<style>
  .container {
    height: 100%;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap-reverse;
    overflow-y: scroll;
    align-items: flex-end;
  }

  @media only screen and (max-width: 800px) {
    .content {
      flex-flow: column-reverse;
      padding: 0 5px 0 5px;
    }
  }
  footer {
    background: white;
    border-top: 2px solid #f5f5f5;
    color: gray;
    width: 100%;
    padding: 5px 10px;
    font-size: 0.6em;
  }
</style>
