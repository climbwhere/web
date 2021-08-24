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
    {#each $gyms as gym}
      <div class="gym">
        <img
          class="gym-image"
          src="https://walltopia.com/images/projects/boulderplus/42580221_300701643858582_2333244153237864448_o.jpg"
        />
        <div class="gym-details">
          <span class={`badge ${gym.slug}`}>{gym.name}</span>
          {gym.address}
        </div>
      </div>
    {/each}
  </div>
</div>
<div class="bottom-bar drop-shadow">
  <button on:click={handleAllGymsClick}>See all gyms</button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 5px;
  }
  .gyms {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .gym {
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    width: 50%;
  }

  .gym-image {
    flex: 1;
    max-width: 200px;
  }

  .gym-details {
    flex: 1;
    height: 100%;
    padding: 10px;
  }

  button {
    min-width: 500px;
    max-width: 600px;
  }

  .bottom-bar {
    position: sticky;
    bottom: 0px;
    margin: auto;
    background: white;
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: 900px) {
    .gym {
      width: 100%;
    }
  }
  @media only screen and (max-width: 600px) {
    button {
      min-width: 100%;
    }
  }
</style>
