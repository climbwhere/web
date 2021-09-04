<script context="module" lang="ts">
  import { getGyms, getSessions } from "$lib/api";

  export async function load({ page, fetch, session, context }) {
    const { gym: gymSlug } = page.params;
    const gyms = await getGyms();
    const sessions = await getSessions();
    let gym = null;
    const filteredGyms = gyms.filter((g) => g.slug === gymSlug);
    if (filteredGyms.length > 0) {
      gym = filteredGyms[0];
    }
    return {
      props: { gym, sessions },
    };
  }
</script>

<script lang="ts">
  import SessionsTable from "$lib/components/SessionsTable.svelte";
  import { createSessionsStore } from "$lib/stores";
  import { writable } from "svelte/store";

  export let gym: Gym, sessions: Session[];

  const sessions_ = createSessionsStore(sessions);
</script>

{#if gym != null}
  <div class="container">
    <div class="image-container">
      <img src={gym.image_url} alt="gym" />
    </div>
    <div class="content-container">
      <h1>{gym.name}</h1>
      <p>
        <span class="material-icons">home</span>

        <a href={gym.map_url}>The Aperia Mall, 12 Kallang Ave, #03-17, 339511</a
        >
      </p>
      <p>
        <span class="material-icons">phone</span>
        <span>+65 62827530</span>
      </p>
      <p>contact@boulderplusclimbing.com</p>
      <button on:click={() => window.open(gym.instagram_url, "_blank")}
        >Instagram</button
      >
      <button on:click={() => window.open(gym.website_url, "_blank")}
        >Website</button
      >
      <button
        on:click={() => window.open(gym.booking_url, "_blank")}
        class={gym.slug}>Booking Site -></button
      >
    </div>
    <div class="slots">
      <h2>Slots</h2>
      <SessionsTable
        sessionsStore={sessions_}
        gymFilter={writable([gym.slug])}
      />
    </div>
  </div>
{:else}
  NOT FOUND
{/if}

<style>
  .container {
    padding: 10px;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    overflow-y: scroll;
  }

  .image-container {
    max-width: 500px;
    padding: 10px;
  }

  .content-container {
    padding: 10px;
  }

  h1 {
    margin: 15px 0 0 0;
  }

  p {
    display: flex;
    align-items: center;
  }

  .slots {
    width: 100%;
  }
  img {
    width: 100%;
    object-fit: cover;
  }

  .copy {
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
  }
  .copy:hover {
    background: #f5f5f5;
  }
  .copy:active {
    opacity: 0.5;
  }
</style>
