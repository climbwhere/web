<script context="module" lang="ts">
  import { getGyms } from "$lib/api";

  export async function load({ page, fetch, session, context }) {
    const gyms = await getGyms();
    return { props: { initialData: gyms } };
  }
</script>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { createGymsStore } from "$lib/stores";
  export let initialData;

  const gyms = createGymsStore(initialData);

  const handleAllGymsClick = (e) => {
    e.preventDefault();
    goto("/all");
  };
</script>

<h2>Select gym:</h2>
<div class="gyms">
  {#each $gyms as gym}
    <span class={`badge ${gym.slug}`}>
      {gym.name}
    </span>
  {/each}
</div>
<b> or </b>
<button on:click={handleAllGymsClick}>See all gyms</button>

<style>
  .gyms {
    display: flex;
    flex-wrap: wrap;
    background: #f5f5f54f;
    border: solid #f5f5f5 2px;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 10px;
  }

  h2 {
    margin: 10px 0;
  }
  button {
    margin-left: 5px;
  }
</style>
