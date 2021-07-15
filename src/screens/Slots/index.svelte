<script>
  import uniq from "lodash/uniq";
  import moment from "moment";
  import { Link } from "svelte-routing";
  import isNil from "lodash/isNil";
  import isEmpty from "lodash/isEmpty";

  import {
    getSessions,
    getLastUpdated,
    getScraperStatus,
    getGyms,
  } from "~/api";
  import SlotsTable from "./components/SlotsTable.svelte";
  import DatePicker from "./components/DatePicker.svelte";
  import GymPicker from "./components/GymPicker.svelte";
  import RefreshButton from "./components/RefreshButton.svelte";

  let dateFilter = moment().format("DD/MM/YY"); // current date as a "guess"
  let gymFilter = [];
  let shouldHideGyms;
  let refreshing = false;

  const handleSessionsResponse = (sessions) => {
    dateFilter = uniq(sessions.map((s) => s._date))[0]; // sets earliest retrieved dates
    return sessions;
  };
  const handleScraperStatus = (data) =>
    !isEmpty(Object.values(data).filter((gym) => !isNil(gym.error)));

  let sessionsRequest, lastUpdatedRequest, hasErrorsRequest, gymsRequest;

  const loadData = async () => {
    refreshing = true;
    sessionsRequest = getSessions().then(handleSessionsResponse);
    lastUpdatedRequest = getLastUpdated();
    hasErrorsRequest = getScraperStatus().then(handleScraperStatus);
    gymsRequest = getGyms();

    Promise.all([
      sessionsRequest,
      lastUpdatedRequest,
      hasErrorsRequest,
      gymsRequest,
    ]).then(() => (refreshing = false));
  };

  loadData();
</script>

<div class="container">
  <DatePicker bind:selectedDate={dateFilter} {sessionsRequest} />
  <div class="content">
    <GymPicker bind:selectedGyms={gymFilter} {shouldHideGyms} {gymsRequest} />
    <SlotsTable
      {sessionsRequest}
      {dateFilter}
      {gymFilter}
      bind:extended={shouldHideGyms}
    />
  </div>
  <RefreshButton hidden={shouldHideGyms} {refreshing} on:click={loadData} />
  <footer>
    {#await Promise.all([lastUpdatedRequest, hasErrorsRequest])}
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
      <Link to="report">Report it here</Link>.
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
    padding: 10px;
    font-size: 0.8em;
  }

  .status-icon {
    font-size: 14px;
  }
  .status-icon.error {
    color: red;
  }
</style>
