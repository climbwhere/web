<script context="module" lang="ts">
  import { getSnapshot } from "$lib/api";

  export async function load({ page, fetch, session, context }) {
    const res = await getSnapshot();
    return {
      props: {
        initialData: {
          snapshot: res,
        },
      },
    };
  }
</script>

<script lang="ts">
  import SessionsTable from "$lib/components/SessionsTable.svelte";
  import {
    createSnapshotStore,
    getDatesFromSessions,
    getSessions,
  } from "$lib/stores";
  import isEmpty from "lodash/isEmpty.js";
  import dayjs from "dayjs";
  import relativeTimePlugin from "dayjs/plugin/relativeTime.js";
  import { writable } from "svelte/store";

  dayjs.extend(relativeTimePlugin);

  export let initialData;
  let gymFilter = writable<string[]>([]);
  let dateFilter = writable<Date>(new Date());
  let hideGyms;

  const snapshot = createSnapshotStore(initialData.snapshot);
  const sessions = getSessions(snapshot);
  const dates = getDatesFromSessions(sessions);

  const handleGymFilterClick = (id) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if ($gymFilter.includes(id)) {
      gymFilter.set($gymFilter.filter((g) => g !== id));
    } else {
      gymFilter.set([...$gymFilter, id]);
    }
  };

  const handleGymFilterSeeAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    gymFilter.set([]);
  };

  const handleGymPickerToggle = (e) => {
    e.preventDefault();
    hideGyms = !hideGyms;
  };

  const handleDateClick = (date: string) => (e) => {
    e.preventDefault();
    dateFilter.set(dayjs(date, "DD/MMM/YYYY").toDate());
  };
</script>

<div class="container">
  <div class="dates">
    {#each $dates as date}
      <div
        class="date-box"
        class:selected={dayjs($dateFilter).format("DD/MMM/YYYY") === date}
        on:click={handleDateClick(date)}
      >
        <strong>
          {date.split("/")[0]}
        </strong>
        <span class="date-title">
          {dayjs(date, "DD/MMM/YYYY").format("ddd")}
        </span>
      </div>
    {/each}
  </div>
  <div
    class="filter-container"
    class:collapsed={hideGyms}
    on:click={handleGymPickerToggle}
  >
    <div class="gym-header">
      <h3>
        Gym Filters {#if !isEmpty($gymFilter)}({$gymFilter.length}){/if}
      </h3>
      <span class:collapsed={hideGyms} class="expand-icon material-icons">
        expand_more
      </span>
    </div>
    <span class="gyms" class:collapsed={hideGyms}>
      {#each $snapshot.data.gyms as gym}
        <span
          class={`badge ${gym.slug}`}
          class:selected={$gymFilter.includes(gym.id)}
          class:unselected={!isEmpty($gymFilter) &&
            !$gymFilter.includes(gym.id)}
          on:click={handleGymFilterClick(gym.id)}
        >
          {gym.name}
        </span>
      {/each}
      <span
        class="badge"
        class:unselected={isEmpty($gymFilter)}
        on:click={handleGymFilterSeeAll}
      >
        See All
      </span>
    </span>
  </div>

  <span class="status-label" class:hidden={hideGyms}>
    <span
      class="status-icon material-icons"
      aria-label="Status icon"
      class:error={$snapshot.has_errors}
      >{$snapshot.has_errors ? "report_problem" : "check_circle"}</span
    >
    {`Last updated ${dayjs($snapshot.created_at).fromNow()} ${
      $snapshot.has_errors ? "with" : "without"
    } errors.`}
    See something wrong?
    <a sveltekit:prefetch href="/feedback">Submit Feedback.</a>
    <a href="/about">About.</a>
  </span>
  <SessionsTable
    bind:extended={hideGyms}
    snapshotStore={snapshot}
    {gymFilter}
    {dateFilter}
  />
</div>

<style>
  .container {
    height: calc(100vh - 55px);
    padding: 5px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .filter-container {
    background: #f5f5f54f;
    border: solid #f5f5f5 2px;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 5px;
    max-height: 50vh;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  .dates {
    display: flex;
    overflow-x: scroll;
  }
  .gyms {
    display: flex;
    flex-wrap: wrap;
    transition: all 0.3s ease-in-out;
    margin-top: 5px;
  }
  .gym-header {
    display: flex;
    flex-flow: row;
    width: 100%;
    align-items: center;
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
  .gyms.collapsed {
    opacity: 0;
  }
  .filter-container.collapsed {
    max-height: 55px;
    transition: all 0.3s ease-in-out;
  }
  h3 {
    margin: 0;
    font-size: 1.1em;
    flex: 1;
  }
  .dates {
    flex: 1;
    min-height: 80px;
    max-height: 80px;
    overflow-x: scroll;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0;
  }
  .date-box {
    flex: 1;
    min-width: 60px;
    max-width: 60px;
    min-height: 60px;
    max-height: 60px;
    padding: 5px;
    border: solid 2px #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 5px;
    background: white;
    border-radius: 50%;
    transition-duration: 0.2s;
    cursor: pointer;
    -webkit-user-select: none;
  }
  .date-box.selected {
    border: solid 3px #4361ee;
  }
  .date-title {
    font-weight: bold;
    font-size: 14px;
    color: salmon;
  }
  .status-label {
    font-size: 13px;
    padding-left: 5px;
  }
  .status-icon {
    color: mediumseagreen;
    font-size: 13px;
  }
  .status-icon.error {
    color: orange;
  }
  .hidden {
    display: none;
  }
</style>
