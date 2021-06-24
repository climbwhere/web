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
    <span class="header">
      <h3 class="title">Gyms</h3>
      <span class:collapsed={shouldHideGyms} class="expand-icon material-icons">
        expand_more
      </span>
    </span>
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
    width: 100%;
    max-height: 30vh;
    padding: 10px 5px;
    overflow: hidden;
    border: 2px solid #f5f5f5;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    margin-bottom: 10px;
  }

  .header {
    display: flex;
    flex-flow: row;
  }

  .expand-icon {
    transition: all 0.3s ease-in-out;
    transform: rotateZ(180deg);
    line-height: 30px;
    font-size: 36px;
  }

  .expand-icon.collapsed {
    transform: rotateZ(0deg);
  }

  .gyms {
    display: flex;
    flex-wrap: wrap;
    transition: all 0.3s ease-in-out;
  }
  .gyms.collapsed {
    opacity: 0;
  }
  .container.collapsed {
    max-height: 55px;
  }

  .title {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    padding-left: 5px;
    margin: 5px 0;
  }

  .outline {
    background: white;
    border-color: #f5f5f5;
  }
</style>
