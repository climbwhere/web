<script>
  import moment from "moment";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import groupBy from "lodash/groupBy";
  import sortBy from "lodash/sortBy";
  import isEmpty from "lodash/isEmpty";
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
          date: moment(session.starts_at).format("dddd, DD/MM/YY"),
        }))
      )
      .then((sessions) => groupBy(sortBy(sessions, "starts_at"), "date"));
    sessionData.update((_) => newSessionData);
  }

  async function loadGyms() {
    const newGymData = await getGyms();
    gymData.update((_) => newGymData);
  }

  async function loadAll() {
    await Promise.all([loadSessions(), loadGyms()]);
  }

  onMount(() => {
    loadAll();
  });

  const onRefreshClicked = async (e) => {
    e.preventDefault();
    window.location.reload();
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
      {$gymFilter !== "all" && !isEmpty($gymData)
        ? `Showing information for ${
            $gymData.filter((g) => g.slug === $gymFilter)[0].name
          }`
        : `Showing information for all gyms`},
      {$dateFilter !== "all" ? `on ${$dateFilter}` : "on all dates"}
      for {$numberOfClimbers} climbers.
      <br />
      {#if refreshing}
        Refreshing...
      {:else}
        Last updated {#await lastUpdated}
          loading...
        {:then lastUpdated}
          {moment(lastUpdated).fromNow()}
        {/await}.
      {/if}
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
      <p class="load-indicator">Loading...</p>
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
    text-align: center;
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
