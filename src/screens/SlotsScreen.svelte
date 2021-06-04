<script>
  import moment from "moment";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import groupBy from "lodash/groupBy";
  import sortBy from "lodash/sortBy";
  import isEmpty from "lodash/isEmpty";
  import keys from "lodash/keys";

  import NavBar from "~/components/NavBar.svelte";
  import TableRow from "~/components/TableRow.svelte";
  import MoreInfoModal from "~/components/MoreInfoModal.svelte";

  import { getSessions, getLastUpdated, getGyms } from "../api";

  export let location;

  let showFilterMenu = writable(false);
  let showMoreInfoModal = writable(false);
  let showAvailableOnly = writable(false);
  let dateFilter = writable("all");
  let gymFilter = writable("all");
  let sessionData = writable(null);
  let gymData = writable([]);

  let lastUpdated = getLastUpdated();

  async function loadSessions() {
    const newSessionData = await getSessions()
      .then((sessions) =>
        sessions.filter((session) => session.gym.slug !== "lighthouse")
      )
      .then((sessions) =>
        sessions.map((session) => ({
          ...session,
          timing: moment(session.starts_at).format("hh:mmA"),
          date: moment(session.starts_at).format("ddd DD/MM/YY"),
        }))
      )
      .then((sessions) => groupBy(sortBy(sessions, "starts_at"), "date"));
    sessionData.update((_) => newSessionData);
    console.info($sessionData);
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
</script>

<div class="container">
  <NavBar {showMoreInfoModal} />
  <div class="description">
    <small>
      {$gymFilter !== "all" && !isEmpty($gymData)
        ? `Showing information for ${
            $gymData.filter((g) => g.slug === $gymFilter)[0].name
          }`
        : `Showing information for all gyms`},
      {$dateFilter !== "all" ? `on ${$dateFilter}` : "on all dates"}
      <br />
      Last updated {#await lastUpdated}
        loading...
      {:then lastUpdated}
        {`${moment(lastUpdated).fromNow()}.`}
      {/await}
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
              <th class="spaces">Available Spaces</th>
            </tr>
            {#each $sessionData[date] as session}
              <TableRow
                gym={session.gym}
                spaces={session.spaces}
                timing={session.timing}
                gymFilter={$gymFilter}
                showAvailableOnly={$showAvailableOnly}
              />
            {/each}
          </table>
        </div>
      {/each}
    {:else}
      <div class="skeleton drop-shadow">
        <div class="skeleton-inner" />
        <div class="skeleton-inner" />
        <div class="skeleton-inner" />
      </div>
      <div class="skeleton drop-shadow">
        <div class="skeleton-inner" />
        <div class="skeleton-inner" />
      </div>
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

  .hidden {
    display: none;
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

  .skeleton {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 10px;
    padding: 15px 5px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .skeleton-inner {
    flex: 1;
    min-height: 30px;
    background: #f5f5f5;
    border-radius: 5px;
    animation: loading 1s infinite ease-in;
    margin: 3px 0;
  }

  @keyframes loading {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>
