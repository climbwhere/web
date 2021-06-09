<script>
  import uniq from "lodash/uniq";
  import { getSessions, getGyms, getLastUpdated } from "~/api";
  import GymBadge from "./components/GymBadge.svelte";
  import SlotsTable from "./components/SlotsTable.svelte";

  const sessionsRequest = getSessions();
  const gymsRequest = getGyms();
  const lastUpdatedRequest = getLastUpdated();
</script>

<div class="container">
  {#await sessionsRequest then sessions}
    <div class="date-picker">
      {#each uniq(sessions.map((s) => s._date)) as date}
        <p>{date}</p>
      {/each}
    </div>
  {/await}
  <div class="gym-picker">
    {#await gymsRequest}
      Loading...
    {:then gyms}
      {#each gyms as gym}
        <GymBadge {gym} />
      {/each}
    {/await}
  </div>
  <SlotsTable {sessionsRequest} />
</div>

<style>
  .container {
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
  }

  .skeleton {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 10px;
    padding: 15px 5px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .skeleton-inner {
    flex: 1;
    min-height: 30px;
    background: #f5f5f5;
    border-radius: 5px;
    animation: loading 1s infinite ease-in;
    margin: 3px 0;
  }

  @keyframes loading {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>
