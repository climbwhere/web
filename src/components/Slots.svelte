<script>
  import { writable } from "svelte/store";
  import fetch from "unfetch";
  import groupBy from "lodash/groupBy";
  import sortBy from "lodash/sortBy";

  import { getDateString, getTimeString, formatDate } from "../utils/date";

  export let location;
  let dateFilter = writable(null);
  let numberOfClimbers = writable(1);
  let gymFilter = "all";
  let gymList = [];
  let store = writable([]);

  const slotsPromise = fetch(
    "https://triomic.github.io/climbing-gym-scraper/sessions.json"
  )
    .then((r) => r.json())
    .then((slots) =>
      slots.data.map((slot) => ({
        // add some extra props to help us render things more efficiently
        ...slot,
        timing: `${getTimeString(new Date(slot.start))} to ${getTimeString(
          new Date(slot.end)
        )}`,
        date: getDateString(new Date(slot.start)),
        hide: false,
      }))
    )
    .then((slots) => sortBy(slots, "start"))
    .then((slots) => {
      store.update((_) => slots);
      return slots;
    });

  const resetDateFilter = (e) => {
    e.preventDefault();
    $dateFilter = null;
  };

  store.subscribe((newData) => {
    gymList = Object.keys(groupBy(newData, "gym"));
  });
</script>

<div class="container">
  {#await slotsPromise}
    <p>🧗 Loading...</p>
  {:then slots}
    <div class="title">
      <h1>🧗 climbwhere.sg</h1>
      <p>SG climbing gym slots checker.</p>
    </div>
    <div class="filter-widget">
      Climbing at
      <select bind:value={gymFilter}>
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
      <input type="date" bind:value={$dateFilter} />
      <a class:hidden={$dateFilter === null} href="" on:click={resetDateFilter}
        >show all dates</a
      >
    </div>
    <div class="content">
      <table>
        <tr>
          <th><span class="badge">Gym</span></th>
          <th><span class="badge">Date</span></th>
          <th><span class="badge">Time</span></th>
          <th class="spaces"><span class="badge">Availble Spaces</span></th>
        </tr>
        {#each slots as slot}
          <tr
            class:hidden={(gymFilter !== "all" && gymFilter !== slot.gym) ||
              ($dateFilter !== null &&
                formatDate(new Date(slot.start)) !== $dateFilter)}
            class:invalid={slot.spaces < $numberOfClimbers}
          >
            <td><span class="badge">{slot.gym}</span></td>
            <td>{slot.date}</td>
            <td class="timings">{slot.timing}</td>
            <td class="spaces">
              <span class="data-spaces">{slot.spaces}</span></td
            >
          </tr>
        {/each}
      </table>
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
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    text-align: left;
    font-size: 0.7em;
  }

  td {
    font-size: 0.9em;
  }

  tr:hover, tr:active {
    background: aliceblue;
  }

  td,
  th {
    padding: 10px 0;
  }

  td.spaces,
  th.spaces {
    text-align: right;
    padding-right: 10px;
    min-width: 120px;
  }
  td {
    border-bottom: solid 0.5px #f5f5f5;
  }

  .data-spaces {
    border-radius: 5px;
    background: #f5f5f5;
    padding: 5px;
  }

  .content {
    background: white;
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
    padding: 0 5px 20px 5px;
  }
  h1 {
    font-size: 1.3em;
  }

  h1,
  p {
    margin-top: 5px;
    margin-bottom: 0;
  }
  .invalid {
    color: red;
    text-decoration: line-through;
  }

  .hidden {
    display: none;
  }

  .badge {
    background: #f5f5f5;
    padding: 4px 10px;
    border-radius: 15px;
  }

  input[type="number"] {
    width: 50px;
    text-align: center;
  }

  input {
    outline: none;
  }

  @media screen and (max-width: 500px) {
    td {
      font-size: 0.7em;
    }
  }
</style>
