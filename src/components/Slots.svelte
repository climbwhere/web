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
  let store = writable({});
  let data = null;

  const fetchSlots = () => {
    fetch("https://triomic.github.io/climbing-gym-scraper/sessions.json")
      .then((r) => r.json())
      .then((slots) =>
        slots.data
          .filter((slot) => `${slot.spaces}` !== "0") // only show slots that have spaces
          .map((slot) => ({ // add some extra props to help us render things more efficiently
            ...slot,
            timing: `${getTimeString(new Date(slot.start))} to ${getTimeString(
              new Date(slot.end)
            )}`,
            date: getDateString(new Date(slot.start)),
            hide: false,
          }))
      )
      .then((slots) => groupBy(sortBy(slots, "start"), "gym"))
      .then((gyms) => {
        let d = {};
        Object.keys(gyms).forEach((gym) => {
          d[gym] = groupBy(gyms[gym], "date");
        });
        gymList = Object.keys(gyms);
        store.set(d);
      });
  };

  store.subscribe((newData) => {
    console.info("update");
    console.info(newData);
    data = newData;
  });
  onMount(fetchSlots);
</script>

<div class="container">
  {#if data === null}
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
      {#each Object.keys(data) as gym}
        <div
          class:hidden={gymFilter !== "all" && gym !== gymFilter}
          class="gym"
        >
          <h2>{gym}</h2>
          {#each Object.keys(data[gym]) as date}
            <p class="underline">{date}</p>
            {#each data[gym][date] as slot}
              <p class:hidden={slot.spaces < numberOfClimbers}>
                {slot.timing}, available spaces: {slot.spaces}
              </p>
            {/each}
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
  }

  .content {
    background: white;
    border: 4px solid black;
    padding: 15px;
    border-radius: 5px;
    font-size: 21px;
    flex: 1;
    width: 500px;
    max-height: 80vh;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .filter-widget {
    background: #3a86ff;
    color: white;
    border: 4px solid black;
    padding: 15px;
    border-radius: 5px;
    font-size: 21px;
    flex: 1;
    width: 500px;
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
