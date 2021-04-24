<script>
  import moment from "moment";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import groupBy from "lodash/groupBy";
  import sortBy from "lodash/sortBy";
  import flatten from "lodash/flatten";
  import values from "lodash/values";
  import keys from "lodash/keys";

  import NavBar from "./NavBar.svelte";
  import TableRow from "./TableRow.svelte";
  import { query } from "../query";
  import MoreInfoModal from "./MoreInfoModal.svelte";

  import { getSessions, getLastUpdated, getGyms } from "../api";

  export let location;

  let showFilterMenu = writable(false);
  let showMoreInfoModal = writable(false);
  let showAvailableOnly = writable($query.showAvailableOnly === "true");
  let dateFilter = writable($query.dateFilter);
  let numberOfClimbers = writable($query.numberOfClimbers || 1);
  let gymFilter = writable($query.gymFilter);
  let sessionData = writable(null);
  let gymData = writable([]);
  let dateList = ["Loading..."];

  let lastUpdated = getLastUpdated();

  // TODO: add some sort of load indicator
  async function loadSessions() {
    const newSessionData = await getSessions()
      .then((sessions) =>
        sessions.map((session) => ({
          ...session,
          timing: moment(session.starts_at).format("hh:mmA"),
          date: moment(session.starts_at).format("dddd, D/MM"),
        }))
      )
      .then((sessions) => groupBy(sortBy(sessions, "starts_at"), "date"));
    sessionData.update((_) => newSessionData);
    loadGyms();
  }

  async function loadGyms() {
    const newGymData = await getGyms();
    console.info(newGymData);
    gymData.update((_) => newGymData);
  }

  onMount(() => {
    loadSessions();
  });

  const onRefreshClicked = async (e) => {
    e.preventDefault();
    await loadSessions();
  };

  sessionData.subscribe((newData) => {
    dateList = keys(newData);
  });

  gymFilter.subscribe((newValue) => {
    query.update((q) => ({
      ...q,
      gymFilter: newValue,
    }));
  });
  numberOfClimbers.subscribe((newValue) => {
    query.update((q) => ({
      ...q,
      numberOfClimbers: newValue,
    }));
  });
  dateFilter.subscribe((newValue) => {
    query.update((q) => ({
      ...q,
      dateFilter: newValue,
    }));
  });
  showAvailableOnly.subscribe((newValue) => {
    query.update((q) => ({
      ...q,
      showAvailableOnly: newValue,
    }));
  });
</script>

<div class="container">
  <NavBar
    {showMoreInfoModal}
    filterProps={{
      showFilterMenu,
      numberOfClimbers,
      gymFilter,
      dateFilter,
      showAvailableOnly,
      gyms: $gymData,
      dateList,
    }}
  />
  <div class="description">
    <small>
      {$gymFilter !== "all"
        ? `Showing information for ${$gymFilter}`
        : `Showing information for all gyms`},
      {$dateFilter !== "all" ? `on ${$dateFilter}` : "on all dates"}
      for {$numberOfClimbers} climbers.
      <br />
      Last updated {#await lastUpdated}
        loading...
      {:then lastUpdated}
        {moment(lastUpdated).fromNow()}
      {/await}.
      <a href="" on:click={onRefreshClicked}>Refresh</a></small
    >
    <div class="telegram-link">
      <img class="telegram-icon" alt="icon" src="/telegram.png" />
      <a href="https://t.me/climbwhere_sg_bot"> @climbwhere_sg_bot </a>
    </div>
  </div>
  <div class="content">
    {#if $sessionData !== null}
      {#each Object.keys($sessionData) as date}
        <div
          class:hidden={$dateFilter !== "all" && $dateFilter !== date}
          class="day drop-shadow"
        >
          <h3 class="date-header">{date}</h3>
          <table>
            <tr>
              <th>Gym</th>
              <th>Time</th>
              <th class="spaces">Availble Spaces</th>
            </tr>
            {#each $sessionData[date] as session}
              <TableRow
                gym={session.gym}
                spaces={session.spaces}
                timing={session.timing}
                gymFilter={$gymFilter}
                numberOfClimbers={$numberOfClimbers}
                showAvailableOnly={$showAvailableOnly}
              />
            {/each}
          </table>
        </div>
      {/each}
    {:else}
      <p>Loading...</p>
    {/if}
    <MoreInfoModal {showMoreInfoModal} />
  </div>
</div>

<style>
  .container {
    margin: auto;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
  }

  .date-header {
    font-size: 18px;
    border-bottom: 2px solid #f5f5f5;
    padding: 5px;
    margin: 0;
  }

  .day {
    border-radius: 10px;
    border: solid 1px #f5f5f5;
    padding: 15px 5px;
    margin-bottom: 20px;
    border-radius: 10px;
    transition-duration: 1s;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    text-align: left;
    font-size: 0.7em;
  }

  th {
    padding: 10px 5px;
  }

  th.spaces {
    text-align: right;
    padding-right: 10px;
    min-width: 120px;
  }

  .content {
    flex: 1;
    width: 100%;
    margin-bottom: 20px;
    padding: 0 5px;
  }

  .description {
    width: 100%;
    padding: 0 10px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    margin-bottom: 0;
  }

  .hidden {
    display: none;
  }

  .load-indicator {
    margin-top: 30px;
    flex: 1;
  }

  .telegram-link {
    padding: 5px 10px;
    font-size: 0.8em;
    border-radius: 15px;
    background: #0088cc1a;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }

  .telegram-icon {
    width: 20px;
    height: 20px;
    margin-right: 3px;
  }
</style>
