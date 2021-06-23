<script>
  import isEmpty from "lodash/isEmpty";

  import { getGyms } from "~/api";
  import GymBadge from "./GymBadge.svelte";
  import Skeleton from "~/components/Skeleton/GymPickerSkeleton.svelte";

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
      selectedGyms = selectedGyms.filter((g) => g !== gymSlug);
    }
  };
</script>

<div class="container">
  <div class="gyms">
    {#await gymsRequest}
      <Skeleton />
    {:then gyms}
      {#each gyms as gym}
        <GymBadge
          {gym}
          onClick={handleGymClick}
          gymSelected={selectedGyms.includes(gym.slug)}
          gymUnselected={!isEmpty(selectedGyms) &&
            !selectedGyms.includes(gym.slug)}
        />
      {/each}
      <span class="badge outline" on:click={handleClearAll}>Clear All</span>
    {/await}
  </div>
</div>

<style>
  .container {
    flex: 1;
    margin-left: 20px;
    max-width: 300px;
  }

  .gyms {
    padding: 10px;
    border: 2px solid #f5f5f5;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
  }

  .container.selected {
    border: 2px solid rgb(0, 119, 255);
  }

  .outline {
    background: white;
    border-color: #f5f5f5;
  }
</style>
