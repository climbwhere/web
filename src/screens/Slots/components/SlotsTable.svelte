<script>
  import isEmpty from "lodash/isEmpty";

  import TableRow from "./TableRow.svelte";
  import Skeleton from "~/components/Skeleton/SlotsTableSkeleton.svelte";

  export let sessionsRequest, dateFilter, gymFilter;
</script>

<div class="container">
  {#await sessionsRequest}
    <Skeleton />
  {:then sessions}
    <table>
      <thead>
        <th>Gym</th>
        <th>Time</th>
        <th class="spaces">Available Spaces</th>
      </thead>
      {#each sessions as session}
        <TableRow
          hide={session._date !== dateFilter ||
            (!isEmpty(gymFilter) && !gymFilter.includes(session.gym.slug))}
          gym={session.gym}
          spaces={session.spaces}
          timing={session._time}
        />
      {/each}
    </table>
    {#if isEmpty(sessions.filter((s) => !(s._date !== dateFilter || (!isEmpty(gymFilter) && !gymFilter.includes(s.gym.slug)))))}
      <div class="empty"><p>🦥 No slots found 🦥</p></div>
    {/if}
  {/await}
</div>

<style>
  .container {
    overflow-y: scroll;
    flex: 1;
    height: 100%;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: solid #f5f5f5 2px;
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
    font-size: 0.6em;
    position: sticky;
    top: 0px;
    background: white;
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
