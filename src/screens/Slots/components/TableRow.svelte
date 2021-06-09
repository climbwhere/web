<script>
  export let gym, spaces, timing;

  import { gymBookingLinks } from "~/constants";
  import GymBadge from "./GymBadge.svelte";

  const onRowClicked = () => {
    window.open(gymBookingLinks[gym.slug], "_blank");
  };
</script>

<tr on:click={onRowClicked} class:warn={spaces < 10} class:invalid={spaces < 1}>
  <td class="gym"><GymBadge {gym} /> </td>
  <td class="timings">{timing}</td>
  <td class="spaces"> <span class="badge">{spaces}</span></td>
</tr>

<style>
  tr:hover,
  tr:active {
    background: aliceblue;
  }

  tr {
    content-visibility: auto;
    transition-duration: 0.3s;
    cursor: pointer;
  }

  td {
    font-size: 0.9em;
    padding: 10px 5px;
    border-top: solid 0.5px #f5f5f5;
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
    background-color: #e67d2243;
  }

  .invalid {
    background: rgba(255, 175, 166, 0.284);
    color: #e63946;
    text-decoration: line-through;
  }
</style>
