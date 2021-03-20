<script>
  import { onMount } from "svelte";
  import fetch from "unfetch";

  const parseDate = (date) => new Date(date);

  let slots = null;
  const fetchSlots = () => {
    fetch("https://triomic.github.io/climbing-gym-scraper/sessions.json")
      .then((r) => r.json())
      .then((s) => slots = s.data);
  };

  onMount(fetchSlots);
</script>

<div>
  <h1>Slots</h1>
    {#if slots === null}
      <p>Loading...</p>
    {:else}
      {#each slots as slot}
        <p>{slot.gym} {parseDate(slot.start)} to {parseDate(slot.end)}, available slots: {slot.slots}</p>
      {/each}
    {/if}
</div>
