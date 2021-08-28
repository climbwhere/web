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
        <img class="gym-image" src={gym["image_url"]} />
        <div class="gym-details">
          <h3>{gym.name}</h3>
          {gym.website_url}
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
    margin: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 15px 10px;
    border-radius: 10px;
    border: solid #f5f5f5 2px;
    width: 100%;
  }

  .gym-image {
    flex: 1;
    max-width: 300px;
    height: 200px;
    object-fit: cover;
    overflow: hidden;
  }

  h3 {
    margin: 0;
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
