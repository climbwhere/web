<script>
  import isEmpty from "lodash/isEmpty";
  import find from "lodash/find";
  import moment from "moment";

  import TableRow from "./TableRow.svelte";
  import Skeleton from "~/components/Skeleton/SlotsTableSkeleton.svelte";
  import scrollWheel from "~/actions/scrollWheel";
  import pannable from "~/actions/pannable";

  export let sessions,
    isLoading,
    gyms,
    dateFilter,
    gymFilter,
    extended = false;

  function handleScrollWheel(e) {
    const { deltaY } = e.detail;
    extended = deltaY > 0;
  }

  function handlePanMove(e) {
    const { dy, offsetY } = e.detail;
    if (dy < 0) {
      extended = true;
    }
    if (dy > 0 && offsetY <= 100) {
      extended = false;
    }
  }
</script>

<div
  class="container"
  use:pannable
  on:panmove={handlePanMove}
  use:scrollWheel
  on:scrollWheel={handleScrollWheel}
>
  {#if isLoading}
    <Skeleton />
  {:else}
    <table>
      <thead>
        <th>Gym</th>
        <th>Time</th>
        <th class="spaces">Available Spaces</th>
      </thead>
      {#each $sessions as session}
        <TableRow
          hide={moment(session.starts_at).format("DD/MM/YY") !== dateFilter ||
            (!isEmpty(gymFilter) && !gymFilter.includes(session.gym_id))}
          gym={find($gyms, (gym) => gym.id === session.gym_id)}
          spaces={session.spaces}
          startsAt={session.starts_at}
        />
      {/each}
    </table>
    {#if isEmpty($sessions.filter((s) => !(moment(s.starts_at).format("DD/MM/YY") !== dateFilter || (!isEmpty(gymFilter) && !gymFilter.includes(s.gym_id)))))}
      <div class="empty"><p>🦥 No slots found 🦥</p></div>
    {/if}
  {/if}
</div>

<style>
  .container {
    overflow-y: scroll;
    flex: 1;
    height: 100%;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: solid #f5f5f5 3px;
    border-bottom: none;
  }

  .empty {
    display: flex;
    text-align: center;
    flex: 1;
    height: 100px;
    font-weight: 600;
    font-size: 19px;
  }

  .empty > p {
    margin: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 0.8em;
    position: sticky;
    top: 0px;
    z-index: 1;
    backdrop-filter: blur(20px);
    border-bottom: #f5f5f5 solid 2px;
  }

  th {
    padding: 10px 5px;
  }

  th.spaces {
    text-align: right;
    padding-right: 10px;
    min-width: 50px;
  }
</style>
