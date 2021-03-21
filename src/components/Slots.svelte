<script>
  import { onMount } from "svelte";
  import { get, writable } from "svelte/store";
  import fetch from "unfetch";
  import groupBy from "lodash/groupBy";
  import sortBy from "lodash/sortBy";

  import { getDateString, getTimeString } from "../utils/date";

  let numberOfClimbers = 1;
  let gymFilter = "all";
  let gymList = [];
  let store = writable([]);
  let displayData = null;

  const fetchSlots = () => {
    fetch("https://triomic.github.io/climbing-gym-scraper/sessions.json")
      .then((r) => r.json())
      .then((slots) =>
        slots.data
          .filter((slot) => `${slot.spaces}` !== "0") // only show slots that have spaces
          .map((slot) => ({
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
      .then((slots) => store.update((_) => slots));
  };

  store.subscribe((newData) => {
    displayData = newData;
    gymList = Object.keys(groupBy(newData, "gym"));
  });
  onMount(fetchSlots);
</script>

<div class="container">
  {#if displayData === null}
    <p>Loading...</p>
  {:else}
    <div class="title">Climb where?</div>
    <div class="filter-widget">
      <select bind:value={gymFilter}>
        <option value="all">All gyms</option>
        {#each gymList as gym}
          <option value={gym}>
            {gym}
          </option>
        {/each}
      </select>
      <input type="number" placeholder="..." bind:value={numberOfClimbers} /> Climbers
    </div>
    <div class="content">
      <table>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Gym</th>
          <th class="spaces">Available Spaces</th>
        </tr>
        {#each displayData as slot}
          <tr
            class:hidden={slot.spaces < numberOfClimbers ||
              (gymFilter !== "all" && gymFilter !== slot.gym)}
          >
            <td>{slot.date}</td>
            <td>{slot.timing}</td>
            <td>{slot.gym}</td>
            <td class="spaces">
              <span class="data-spaces">{slot.spaces}</span></td>
          </tr>
        {/each}
      </table>
    </div>
  {/if}
</div>

<style>
  .container {
    margin: auto;
    height: 100vh;
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  table {
    width: 100%;
  }
  th {
    text-align: left;
    font-size: 0.8em;
  }

  td, th {
    padding: 10px 5px;
  }

  td.spaces {
    font-size: 30px;
    text-align: right;
  }

  .data-spaces {
    border-radius: 5px;
    background: #f5f5f5;
    padding: 5px;

  }

  .content {
    background: white;
    border: 4px solid black;
    padding: 15px;
    border-radius: 5px;
    font-size: 21px;
    flex: 5;
    width: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    margin-bottom: 20px;
  }

  .filter-widget {
    background: #3a86ff;
    color: white;
    border: 4px solid black;
    padding: 15px;
    border-radius: 5px;
    font-size: 21px;
    flex: 1;
    width: 100%;
    margin-bottom: 20px;
  }

  .content::-webkit-scrollbar {
    display: none;
  }

  .underline {
    text-decoration: underline;
  }

  .hidden {
    display: none;
  }
</style>
