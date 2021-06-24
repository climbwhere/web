<script>
  import isEmpty from "lodash/isEmpty";

  import { getGyms } from "~/api";
  import GymBadge from "./GymBadge.svelte";
  import Skeleton from "~/components/Skeleton/GymPickerSkeleton.svelte";

  export let selectedGyms, shouldHideGyms;

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

<div class="container" class:collapsed={shouldHideGyms}>
  {#await gymsRequest}
    <Skeleton />
  {:then gyms}
    <h3 class="title">Gyms</h3>
    <span class="gyms" class:collapsed={shouldHideGyms}>
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
    </span>
  {/await}
</div>

<style>
  .container {
    width: 400px;
    max-height: 30vh;
    margin-left: 10px;
    padding: 10px 5px;
    overflow: hidden;
    border: 2px solid #f5f5f5;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
  }

  .gyms {
    display: flex;
    flex-wrap: wrap;
    transition: all 0.3s ease-in-out;
  }

  .title {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    padding-left: 5px;
    margin: 5px 0;
  }

  @media only screen and (max-width: 800px) {
    .container {
      width: 100%;
      margin-bottom: 10px;
    }
    .gyms.collapsed {
      opacity: 0;
    }
    .container.collapsed {
      max-height: 60px;
    }
  }
  .outline {
    background: white;
    border-color: #f5f5f5;
  }
</style>
