<script>
  import moment from "moment";
  import { Link, navigate } from "svelte-routing";

  import { getLatestSnapshot } from "~/api";
  import SlotsTable from "./components/SlotsTable.svelte";
  import DatePicker from "./components/DatePicker.svelte";
  import GymPicker from "./components/GymPicker.svelte";
  import RefreshButton from "./components/RefreshButton.svelte";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  let dateFilter = moment().format("DD/MM/YY"); // current date as a "guess"
  let gymFilter = [];
  let shouldHideGyms;
  let isLoading = true;
  let gyms = writable([]);
  let sessions = writable([]);
  let hasErrors = false;
  let lastUpdated;

  const handleSnapshotResponse = (snapshot) => {
    sessions.set(snapshot.sessions);
    gyms.set(snapshot.gyms);
    hasErrors = snapshot.hasErrors;
    lastUpdated = snapshot.lastUpdated;
  };

  const handleBannerClick = () => {
    navigate("/updates");
  };

  let latestSnapshotRequest;
  const loadData = async () => {
    isLoading = true;
    try {
      latestSnapshotRequest = handleSnapshotResponse(await getLatestSnapshot());
      isLoading = false;
    } catch (errors) {
      console.error(errors);
      isLoading = false;
      navigate("/error");
    }
  };

  onMount(loadData);
</script>

<div class="container">
  <DatePicker bind:selectedDate={dateFilter} {sessions} {isLoading} />
  <div class="content">
    <GymPicker
      bind:selectedGyms={gymFilter}
      {isLoading}
      {gyms}
      {shouldHideGyms}
    />
    <div class="banner red" on:click={handleBannerClick}>
      <span class="material-icons" aria-label="Status icon">priority_high</span>
      Climbwhere is shutting down: slot updates will no longer be available from
      25th May 2022.
    </div>
    <SlotsTable
      {sessions}
      {gyms}
      {isLoading}
      {dateFilter}
      {gymFilter}
      bind:extended={shouldHideGyms}
    />
  </div>
  <RefreshButton
    hidden={shouldHideGyms}
    refreshing={isLoading}
    on:click={loadData}
  />
  <footer>
    {#if isLoading}
      Loading...
    {:else}
      <span
        class="status-icon material-icons"
        class:error={hasErrors}
        aria-label="Status icon"
        >{hasErrors ? "report_problem" : "check_circle"}</span
      >
      <b
        >Last updated {moment(lastUpdated).fromNow()}{hasErrors
          ? " with errors"
          : ""}.</b
      >
      Something not quite right?
      <Link to="report">Report it here</Link>.
      <Link to="about">About</Link>.
    {/if}
  </footer>
</div>

<style>
  .container {
    height: 100%;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
    flex-flow: column;
    overflow-y: scroll;
    align-items: flex-end;
  }

  @media only screen and (max-width: 800px) {
    .content {
      padding: 0 5px;
    }
  }
  footer {
    background: white;
    border-top: 1px solid #f5f5f5;
    color: gray;
    width: 100%;
    padding: 10px;
    font-size: 0.8em;
  }

  .status-icon {
    font-size: 14px;
  }
  .status-icon.error {
    color: red;
  }

  .banner {
    color: white;
    padding: 0.5rem 0.8rem;
    margin-bottom: 0.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
  }

  .red {
    background: red;
  }

  .banner:active {
    opacity: 0.8;
  }

  .banner .material-icons {
    margin-right: 5px;
  }
</style>
