<script>
  import { getGyms } from "~/api";
  import GymBadge from "./GymBadge.svelte";
  export let selectedGyms;

  const gymsRequest = getGyms();

  const handleClearAll = (e) => {
    e.preventDefault();
    selectedGyms = [];
  };

  const handleGymClick = (gymSlug) => {
    if (!selectedGyms.includes(gymSlug)) {
      selectedGyms = [...selectedGyms, gymSlug];
    } else {
      selectedGyms = selectedGyms.filter((g) => g.slug === gymSlug);
    }
  };
</script>

<div class="container">
  {#await gymsRequest}
    loading gyms...
  {:then gyms}
    {#each gyms as gym}
      <GymBadge
        {gym}
        onClick={handleGymClick}
        gymSelected={selectedGyms.includes(gym.slug)}
      />
    {/each}
    <span class="badge outline" on:click={handleClearAll}>Clear All</span>
  {/await}
</div>

<style>
  .container {
    flex: 1;
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    border: red solid 1px;
  }

  .outline {
    background: white;
    border-color: #f5f5f5;
  }
</style>
