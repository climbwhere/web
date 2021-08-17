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
  import RelativeTime from "dayjs/plugin/relativeTime";

  export let initialData;
  dayjs.extend(RelativeTime);

  const sessions = createSessionsStore(initialData.sessions);
  const gyms = createGymsStore(initialData.gyms);
  const dates = sessionDates(sessions);
</script>

<div class="gyms">
  {#each $dates as date}
    <span class="badge">
      {DAYS_OF_WEEK[dayjs(date).day()]}
    </span>
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
</style>
