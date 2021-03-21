<script>
  import { onMount } from "svelte";
  import fetch from "unfetch";
  import groupBy from "lodash/groupBy";
  import sortBy from "lodash/sortBy";

  import { getDateString, getTimeString } from "../utils/date";

  let data = null;
  const fetchSlots = () => {
    fetch("https://triomic.github.io/climbing-gym-scraper/sessions.json")
      .then((r) => r.json())
      .then((slots) =>
        slots.data.map((slot) => ({
          ...slot,
          timing: `${getTimeString(new Date(slot.start))} to ${getTimeString(
            new Date(slot.end)
          )}`,
          date: getDateString(new Date(slot.start)),
        }))
      )
      .then((slots) => groupBy(sortBy(slots, "start"), "gym"))
      .then((gyms) => {
        data = {};
        Object.keys(gyms).forEach((gym) => {
          data[gym] = groupBy(gyms[gym], "date");
        });
        console.info(data);
      });
  };

  onMount(fetchSlots);
</script>

<div>
  <h1>Slots</h1>
  {#if data === null}
    <p>Loading...</p>
  {:else}
    {#each Object.keys(data) as gym}
      <b>{gym.toUpperCase()}</b>
      {#each Object.keys(data[gym]) as date}
        {date}
        {#each data[gym][date] as slot}
          <p>
            {slot.timing}, available spaces: {slot.spaces}
          </p>
        {/each}
      {/each}
    {/each}
  {/if}
</div>
