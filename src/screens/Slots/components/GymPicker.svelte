<script>
  import isEmpty from "lodash/isEmpty";

  import GymBadge from "./GymBadge.svelte";
  import Skeleton from "~/components/Skeleton/GymPickerSkeleton.svelte";

  export let isLoading, gyms, selectedGyms, shouldHideGyms;

  const handleClearAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectedGyms = [];
  };

  const handleGymClick = (gymId) => {
    if (!selectedGyms.includes(gymId)) {
      selectedGyms = [...selectedGyms, gymId];
    } else {
      selectedGyms = selectedGyms.filter((g) => g !== gymId);
    }
  };

  const handleToggle = (e) => {
    e.preventDefault();
    shouldHideGyms = !shouldHideGyms;
  };
</script>

<div class="container" on:click={handleToggle} class:collapsed={shouldHideGyms}>
  {#if isLoading}
    <Skeleton />
  {:else}
    <span class="header">
      <h3 class="title">
        Gyms {#if !isEmpty(selectedGyms)}({selectedGyms.length}){/if}
      </h3>
      <span class:collapsed={shouldHideGyms} class="expand-icon material-icons">
        expand_more
      </span>
    </span>
    <span class="gyms" class:collapsed={shouldHideGyms}>
      {#each $gyms as gym}
        <GymBadge
          {gym}
          onClick={handleGymClick}
          gymSelected={selectedGyms.includes(gym.id)}
          gymUnselected={!isEmpty(selectedGyms) &&
            !selectedGyms.includes(gym.id)}
        />
      {/each}
      <span class="badge outline" on:click={handleClearAll}>Clear All</span>
    </span>
  {/if}
</div>

<style>
  .container {
    width: 100%;
    max-height: 30vh;
    padding: 0 5px 10px 5px;
    overflow: scroll;
    border: 3px solid #f5f5f5;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    margin: 10px 0;
    cursor: pointer;
  }

  .header {
    padding: 10px 0;
    display: flex;
    flex-flow: row;
    position: sticky;
    top: 0;
    background: white;
    z-index: 19;
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
    font-size: 16px;
    font-weight: bold;
    padding-left: 5px;
    margin: 5px 0;
  }

  .outline {
    background: white;
    border-color: #f5f5f5;
  }
</style>
