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

<div class="container">
  <div class="gyms">
    <h2>Select gym:</h2>
    {#each $gyms as gym}
      <div class="gym">
        <img
          src="https://walltopia.com/images/projects/boulderplus/42580221_300701643858582_2333244153237864448_o.jpg"
        />
        <bold>{gym.name}</bold>
        {gym.address}
      </div>
    {/each}
  </div>
  <button on:click={handleAllGymsClick}>See all gyms</button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
  .gyms {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    margin-bottom: 10px;
  }

  .gym {
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .gym img {
    width: 200px;
  }

  h2 {
    margin: 10px 0;
  }
  button {
    position: sticky;
    bottom: 10px;
  }
</style>
