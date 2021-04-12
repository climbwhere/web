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
  import { query } from "../query";

  export let location;

  let showFilterMenu = writable(false);
  let showAvailableOnly = writable($query.showAvailableOnly);
  let dateFilter = writable($query.dateFilter);
  let numberOfClimbers = writable($query.numberOfClimbers || 1);
  let gymFilter = writable($query.gymFilter);
  let slotData = writable([]);
  let gymList = [];
  let dateList = [];

  let lastUpdated = "Loading...";

  const slotsPromise = fetch(
    "https://triomic.github.io/climbing-gym-scraper/sessions.json?rnd=" +
      Math.random()
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
      slotData.update((_) => slots);
      return slots;
    });

  slotData.subscribe((newData) => {
    gymList = keys(groupBy(flatten(values(newData)), "gym"));
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
    filterProps={{
      showFilterMenu,
      numberOfClimbers,
      gymFilter,
      dateFilter,
      showAvailableOnly,
      gymList,
      dateList,
    }}
  />
  {#await slotsPromise}
    <p class="load-indicator">🧗 Loading...</p>
  {:then slots}
    <div class="description">
      Timely Singapore climbing gym slot information.
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
    background: white;
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

  .description {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
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
</style>
