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

  let dateFilter = moment().format("DD/MM/YY"); // current date as a "guess"
  let gymFilter = [];
  let shouldHideGyms;
  let refreshing = false;

  const handleSessionsResponse = (sessions) => {
    dateFilter = uniq(sessions.map((s) => s._date))[0]; // sets earliest retrieved dates
    return sessions;
  };
  const handleScraperStatus = (data) => (data) =>
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

  const handleReload = (e) => {
    // create new requests
    loadData();
  };
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
  <div
    class:hidden={shouldHideGyms}
    class="refresh drop-shadow"
    on:click={handleReload}
  >
    <span class:rotating={refreshing} class="refresh-icon material-icons">
      refresh
    </span>
  </div>
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

  .refresh {
    text-align: center;
    position: absolute;
    z-index: 10;
    bottom: 50px;
    right: 5vw;
    font-size: 21px;
    line-height: 53px;
    height: 50px;
    width: 50px;
    background: white;
    border: solid 3px #f5f5f5;
    border-radius: 50%;
    cursor: pointer;
  }

  .rotating {
    -webkit-animation: rotating 1.4s ease-out infinite;
    -moz-animation: rotating 1.4s ease-out infinite;
    -ms-animation: rotating 1.4s ease-out infinite;
    -o-animation: rotating 1.4s ease-out infinite;
    animation: rotating 1.4s ease-out infinite;
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
