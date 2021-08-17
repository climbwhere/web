<script lang="ts">
  import dayjs from "dayjs";
  export let sessions: SvelteStore<Session[]>;
</script>

<div class="container">
  <table>
    <thead>
      <th>Gym</th>
      <th>Time</th>
      <th class="spaces">Available Spaces</th>
    </thead>
    {#each $sessions as session}
      <tr class:warn={session.spaces < 10} class:invalid={session.spaces < 1}>
        <td class="gym">
          <span class={`badge ${session.gym.slug}`}>
            {session.gym.name}
          </span>
        </td>
        <td>{dayjs(session.starts_at).format("DD/MM/YY hh:mmA")}</td>
        <td class="spaces">
          <span class="badge">
            {session.spaces}
          </span>
        </td>
      </tr>
    {/each}
  </table>
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
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    text-align: left;
    font-size: 0.8em;
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
  tr:hover,
  tr:active {
    background: #a2d2ff9c;
  }
  tr {
    content-visibility: auto;
    transition-duration: 0.4s;
    cursor: pointer;
    margin-top: 1px;
  }
  td {
    padding: 11px 5px;
  }

  td.spaces {
    text-align: right;
    padding-right: 10px;
    min-width: 80px;
    font-size: 1.1em;
  }

  td.gym {
    min-width: 120px;
  }

  .warn {
    color: #ffad49;
  }

  .invalid {
    color: #f44545;
    text-decoration: line-through;
    opacity: 0.6;
    background: #f4454565;
  }
</style>
