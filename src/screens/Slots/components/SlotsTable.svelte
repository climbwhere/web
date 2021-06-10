<script>
  import isEmpty from "lodash/isEmpty";
  export let sessionsRequest, dateFilter, gymFilter;
  import TableRow from "./TableRow.svelte";
</script>

<div class="container">
  {#await sessionsRequest}
    loading...
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
  {/await}
</div>

<style>
  .container {
    width: 100%;
    overflow-y: scroll;
    flex: 1;
    height: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 0.7em;
    position: sticky;
    top: 0px;
    background: white;
  }

  th {
    padding: 10px 5px;
  }

  th.spaces {
    text-align: right;
    padding-right: 10px;
    min-width: 120px;
  }
</style>
