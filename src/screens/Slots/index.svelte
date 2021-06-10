<script>
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
