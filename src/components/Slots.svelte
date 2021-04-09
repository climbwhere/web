<script>
  import moment from "moment";
  import { writable } from "svelte/store";
  import fetch from "unfetch";
  import groupBy from "lodash/groupBy";
  import sortBy from "lodash/sortBy";
  import flatten from "lodash/flatten";
  import values from "lodash/values";
  import keys from "lodash/keys";

  import { getDateString, getTimeString, formatDate } from "../utils/date";
  import TableRow from "./TableRow.svelte";

  export let location;
  let dateFilter = writable(null);
  let numberOfClimbers = writable(1);
  let gymFilter = writable("all");
  let gymList = [];
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
  });
</script>

<div class="container">
  {#await slotsPromise}
    <p>🧗 Loading...</p>
  {:then slots}
    <div class="title">
      <h1>🧗 Climbwhere.sg</h1>
      <p>Timely SG climbing gyms slot information.</p>
      <small>Last updated {lastUpdated}.</small>
    </div>
    <div class="filter-widget">
      Climbing at
      <select bind:value={$gymFilter}>
        <option value="all">All gyms</option>
        {#each gymList as gym}
          <option value={gym}>
            {gym}
          </option>
        {/each}
      </select>
      , with
      <input type="number" placeholder="..." bind:value={$numberOfClimbers} />
      Climbers, on
      <!-- date inputs are not supported on Safari, 
        should look into creating a custom date picker component -->
      <input type="date" bind:value={$dateFilter} />
      <a class:hidden={$dateFilter === null} href="" on:click={resetDateFilter}
        >show all dates</a
      >
    </div>
    <div class="content">
      {#each Object.keys(slots) as date}
        <div class="day">
          <h3 class="date-header">{date}</h3>
          <table>
            <tr>
              <th><span class="badge">Gym</span></th>
              <th><span class="badge">Time</span></th>
              <th class="spaces"><span class="badge">Availble Spaces</span></th>
            </tr>
            {#each slots[date] as slot}
              <TableRow
                {...slot}
                gymFilter={$gymFilter}
                dateFilter={$dateFilter}
                numberOfClimbers={$numberOfClimbers}
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

  .title {
    width: 100%;
    padding: 20px 5px;
  }

  .filter-widget {
    width: 100%;
    padding: 10px;
    margin-bottom: 0px;
    background: white;
  }
  h1 {
    font-size: 1.3em;
  }

  h1,
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
  }
</style>
