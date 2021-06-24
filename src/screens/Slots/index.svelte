<script>
  import uniq from "lodash/uniq";
  import moment from "moment";
  import { Link } from "svelte-routing";
  import isNil from "lodash/isNil";
  import isEmpty from "lodash/isEmpty";

  import { getSessions, getLastUpdated, getScraperStatus } from "~/api";
  import SlotsTable from "./components/SlotsTable.svelte";
  import DatePicker from "./components/DatePicker.svelte";
  import GymPicker from "./components/GymPicker.svelte";

  const hasErrorsPromise = getScraperStatus().then(
    (data) => !isEmpty(Object.values(data).filter((gym) => !isNil(gym.error)))
  );

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
    <GymPicker bind:selectedGyms={gymFilter} {shouldHideGyms} />
    <SlotsTable
      {sessionsRequest}
      {dateFilter}
      {gymFilter}
      bind:extended={shouldHideGyms}
    />
  </div>
  <footer>
    {#await Promise.all([lastUpdatedRequest, hasErrorsPromise])}
      Loading...
    {:then [lastUpdated, hasErrors]}
      <Link to="status">
        <span class="status-icon material-icons" class:error={hasErrors}
          >{hasErrors ? "report_problem" : "check_circle"}</span
        >
        <b
          >Last updated {moment(lastUpdated).fromNow()}{hasErrors
            ? " with errors"
            : ""}.</b
        >
      </Link>
      Something not quite right?
      <Link to="report">report here</Link>.
      <Link to="about">About</Link>.
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
    flex-flow: column;
    overflow-y: scroll;
    align-items: flex-end;
  }

  @media only screen and (max-width: 800px) {
    .content {
      padding: 0 5px;
    }
  }
  footer {
    background: white;
    border-top: 1px solid #f5f5f5;
    color: gray;
    width: 100%;
    padding: 5px 10px;
    font-size: 0.6em;
  }

  .status-icon {
    font-size: 14px;
  }
  .status-icon.error {
    color: red;
  }
</style>
