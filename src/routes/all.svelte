<script context="module" lang="ts">
  import {
    getGyms,
    getLastUpdated,
    getScraperStatus,
    getSessions,
  } from "$lib/api";

  export async function load({ page, fetch, session, context }) {
    const res = await Promise.all([
      getGyms(),
      getSessions(),
      getLastUpdated(),
      getScraperStatus(),
    ]);
    return {
      props: {
        initialData: {
          gyms: res[0],
          sessions: res[1],
          lastUpdated: res[2],
          scraperStatus: res[3],
        },
      },
    };
  }
</script>

<script lang="ts">
  import SessionsTable from "$lib/components/SessionsTable.svelte";
  import { DAYS_OF_WEEK } from "$lib/constants";
  import {
    createGymsStore,
    createLastUpdatedStore,
    createSessionsStore,
    sessionDates,
  } from "$lib/stores";
  import dayjs from "dayjs";

  export let initialData;

  const sessions = createSessionsStore(initialData.sessions);
  const gyms = createGymsStore(initialData.gyms);
  const dates = sessionDates(sessions);
</script>

<div class="dates">
  {#each $dates as date}
    <div class="date-box">
      <span class="date-title">
        {DAYS_OF_WEEK[dayjs(date).day()]}
      </span>
      <h3>{dayjs(date).get("date")}</h3>
    </div>
  {/each}
</div>
<div class="gyms">
  {#each $gyms as gym}
    <span class={`badge ${gym.slug}`}>
      {gym.name}
    </span>
  {/each}
</div>
<SessionsTable {sessions} />

<style>
  .gyms {
    display: flex;
    flex-wrap: wrap;
    background: #f5f5f54f;
    border: solid #f5f5f5 2px;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 10px;
  }

  h3 {
    margin: 3px 0 0 0;
  }
  .dates {
    flex: 1;
    min-height: 90px;
    max-height: 90px;
    overflow-x: scroll;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    border: solid red 1px;
  }
  .date-box {
    flex: 1;
    min-width: 70px;
    max-width: 70px;
    border: solid 3px #f5f5f5;
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 5px;
    background: white;
    border-radius: 15px;
    transition-duration: 0.2s;
    cursor: pointer;
    -webkit-user-select: none;
  }
  .date-box.selected {
    border: solid 3px #4361ee;
  }
  .date-title {
    color: #f44545;
    font-weight: bold;
    font-size: 12px;
  }
</style>
