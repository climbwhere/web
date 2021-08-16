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
  import { createGymsStore, createSessionsStore } from "$lib/stores";
  export let initialData;

  const sessions = createSessionsStore(initialData.sessions);
  const gyms = createGymsStore(initialData.gyms);
</script>

<SessionsTable {sessions} />
