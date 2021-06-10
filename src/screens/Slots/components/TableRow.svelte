<script>
  export let gym, spaces, timing, hide;

  import { gymBookingLinks } from "~/constants";
  import GymBadge from "./GymBadge.svelte";

  const onRowClicked = () => {
    window.open(gymBookingLinks[gym.slug], "_blank");
  };
</script>

<tr
  on:click={onRowClicked}
  class:hidden={hide}
  class:warn={spaces < 10}
  class:invalid={spaces < 1}
>
  <td class="gym"><GymBadge {gym} /> </td>
  <td class="timings">{timing}</td>
  <td class="spaces"> <span class="badge">{spaces}</span></td>
</tr>

<style>
  tr:hover,
  tr:active {
    background: rgba(186, 223, 255, 0.733);
  }

  tr {
    content-visibility: auto;
    transition-duration: 0.4s;
    cursor: pointer;
    margin-top: 1px;
  }

  td {
    font-size: 0.9em;
    padding: 11px 5px;
  }

  td.spaces {
    text-align: right;
    padding-right: 10px;
    min-width: 80px;
  }

  td.gym {
    min-width: 120px;
  }

  .warn {
    color: rgb(252, 180, 46);
  }

  .invalid {
    color: #ff4151;
    text-decoration: line-through;
  }
</style>
