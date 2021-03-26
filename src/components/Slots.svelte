<script>
  import { writable } from "svelte/store";
  import fetch from "unfetch";
  import groupBy from "lodash/groupBy";
  import sortBy from "lodash/sortBy";

  import { getDateString, getTimeString } from "../utils/date";

  export let location;
  let numberOfClimbers = 1;
  let gymFilter = "all";
  let gymList = [];
  let store = writable([]);

  const slotsPromise = fetch(
    "https://triomic.github.io/climbing-gym-scraper/sessions.json"
  )
    .then((r) => r.json())
    .then((slots) =>
      slots.data
        // .filter((slot) => `${slot.spaces}` !== "0") // only show slots that have spaces
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
    .then((slots) => {
      store.update((_) => slots);
      return slots;
    });

  store.subscribe((newData) => {
    gymList = Object.keys(groupBy(newData, "gym"));
  });
</script>

<div class="container">
  {#await slotsPromise}
    <p>Loading...</p>
  {:then slots}
    <div class="title">
      <h1>🧗 Climb Where?</h1>
      <p>SG climbing gym slots checker.</p>
    </div>
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
          <th>Gym</th>
          <th>Date</th>
          <th>Time</th>
          <th class="spaces">Available Spaces</th>
        </tr>
        {#each slots as slot}
          <tr
            class:hidden={gymFilter !== "all" && gymFilter !== slot.gym}
            class:invalid={slot.spaces < numberOfClimbers}
          >
            <td>{slot.gym}</td>
            <td>{slot.date}</td>
            <td>{slot.timing}</td>
            <td class="spaces">
              <span class="data-spaces">{slot.spaces}</span></td
            >
          </tr>
        {/each}
      </table>
    </div>
  {/await}
</div>

<style>
  .container {
    margin: auto;
    height: 100vh;
    width: 100%;  
    max-width: 800px;
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

  td {
    font-size: 0.9em;
  }

  td,
  th {
    padding: 10px 0;
  }

  td.spaces, th.spaces {
    text-align: right;
  }

  .data-spaces {
    border-radius: 5px;
    background: #f5f5f5;
    padding: 5px;
  }

  .content {
    background: white;
    font-size: 21px;
    width: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    margin-bottom: 20px;
  }

  .filter-widget {
    max-height: 200px;
    flex: 1;
    width: 100%;
    margin-bottom: 20px;
  }

  .content::-webkit-scrollbar {
    display: none;
  }

  .title {
    width: 100%;
    padding-top: 20px;
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
</style>
