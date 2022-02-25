<script>
  import moment from "moment";
  import GymBadge from "./GymBadge.svelte";

  export let gym, spaces, startsAt, hide;

  const onRowClicked = () => {
    window.open(gym.booking_url, "_blank");
  };
</script>

<tr
  on:click={onRowClicked}
  class:hidden={hide}
  class:warn={spaces < 10}
  class:invalid={spaces < 1}
  class="umami--click--table-row-click"
>
  <td class="gym"><GymBadge {gym} /> </td>
  <td class="timings">{moment(startsAt).format("h:mmA")}</td>
  <td class="spaces"> <span class="badge">{spaces}</span></td>
</tr>

<style>
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
    text-decoration: line-through;
    filter: grayscale(1);
    background: #f5f5f5;
  }
</style>
