<script>
  import moment from "moment";
  import { writable } from "svelte/store";
  import fetch from "unfetch";
  import groupBy from "lodash/groupBy";
  import sortBy from "lodash/sortBy";
  import flatten from "lodash/flatten";
  import values from "lodash/values";
  import keys from "lodash/keys";

  import { getDateString, getTimeString } from "../utils/date";
  import NavBar from "./NavBar.svelte";
  import TableRow from "./TableRow.svelte";

  export let location;
  let showAvailableOnly = writable(false);
  let dateFilter = writable("all");
  let numberOfClimbers = writable(1);
  let gymFilter = writable("all");
  let gymList = [];
  let dateList = [];
  let store = writable([]);
  let lastUpdated = "Loading...";

  const slotsPromise = fetch(
    "https://triomic.github.io/climbing-gym-scraper/sessions.json"
  )
    .then((r) => r.json())
    .then((slots) => {
      lastUpdated = moment(slots.last_updated).fromNow();
      return slots.data.map((slot) => ({
        // add some extra props to help us render things more efficiently
        ...slot,
        timing: `${getTimeString(new Date(slot.start))} - ${getTimeString(
          new Date(slot.end)
        )}`,
        date: getDateString(new Date(slot.start)),
        hide: false,
      }));
    })
    .then((slots) => groupBy(sortBy(slots, "start"), "date"))
    .then((slots) => {
      store.update((_) => slots);
      return slots;
    });

  const resetDateFilter = (e) => {
    e.preventDefault();
    $dateFilter = null;
  };

  store.subscribe((newData) => {
    gymList = keys(groupBy(flatten(values(newData)), "gym"));
    dateList = keys(newData);
  });
</script>

<div class="container">
  <NavBar />
  {#await slotsPromise}
    <p>🧗 Loading...</p>
  {:then slots}
    <div class="filter-widget">
      <input
        type="number"
        min="1"
        placeholder="..."
        bind:value={$numberOfClimbers}
      />
      climbers climbing at
      <select bind:value={$gymFilter}>
        <option value="all">All gyms</option>
        {#each gymList as gym}
          <option value={gym}>
            {gym}
          </option>
        {/each}
      </select>
      on
      <select bind:value={$dateFilter}>
        <option value="all">All dates</option>
        {#each dateList as date}
          <option value={date}>{date}</option>
        {/each}
      </select>
      <p>
        <input type="checkbox" bind:value={$showAvailableOnly} /> Show available
        slots only
      </p>
      <p>
        <small>Last updated {lastUpdated}.</small>
      </p>
    </div>
    <div class="content">
      {#each Object.keys(slots) as date}
        <div
          class:hidden={$dateFilter !== "all" && $dateFilter !== date}
          class="day"
        >
          <h3 class="date-header">{date}</h3>
          <table>
            <tr>
              <th>Gym</th>
              <th>Time</th>
              <th class="spaces">Availble Spaces</th>
            </tr>
            {#each slots[date] as slot}
              <TableRow
                {...slot}
                gymFilter={$gymFilter}
                dateFilter={$dateFilter}
                numberOfClimbers={$numberOfClimbers}
                showAvailableOnly={$showAvailableOnly}
              />
            {/each}
          </table>
        </div>
      {/each}
    </div>
  {:catch error}
    <p>{error}</p>
    <p>Please try again.</p>
  {/await}
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
  }

  .date-header {
    font-size: 18px;
    border-bottom: 2px solid #f5f5f5;
    padding: 5px;
    margin-bottom: 5px;
  }

  .day {
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

  .filter-widget {
    width: 100%;
    padding: 10px;
    margin-bottom: 0px;
    background: white;
  }
  p {
    margin-top: 5px;
    margin-bottom: 0;
  }

  .hidden {
    display: none;
  }

  .badge {
    background: #f5f5f5;
    padding: 4px 10px;
    border-radius: 15px;
    font-weight: bold;
  }

  input[type="number"] {
    width: 50px;
    text-align: center;
  }

  input {
    outline: none;
    padding: 3px;
  }

  select {
    padding: 3px;
  }
</style>
