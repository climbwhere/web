<script>
  export let gym, spaces, timing;
  export let gymFilter, numberOfClimbers, showAvailableOnly;
</script>

<tr
  class:hidden={(gymFilter !== "all" && gymFilter !== gym) ||
    (showAvailableOnly && spaces < numberOfClimbers)}
  class:warn={spaces < 10}
  class:invalid={spaces < numberOfClimbers}
>
  <td
    ><span
      class:fitbloc={gym === "Fit Bloc"}
      class:boulderplus={gym === "boulder+"}
      class:bffclimb={gym === "BFF Climb"}
      class:oyeyo={gym === "Oyeyo"}
      class:zvertigo={gym === "Z-Vertigo"}
      class:boulderworld={gym === "Boulder World"}
      class:lighthouse={gym === "Lighthouse"}
      class="badge">{gym}</span
    ></td
  >
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
  }

  td {
    font-size: 0.9em;
    padding: 10px 5px;
    border-top: solid 0.5px #f5f5f5;
  }

  td.spaces {
    text-align: right;
    padding-right: 10px;
    min-width: 120px;
  }

  .badge {
    background: #f5f5f5;
    padding: 4px 10px;
    border-radius: 15px;
    font-weight: bold;
  }

  @media screen and (max-width: 500px) {
  }

  .fitbloc {
    background-color: #7b112a;
    color: white;
  }

  .boulderplus {
    background-color: #652580;
    color: white;
  }

  .bffclimb {
    background-color: #ea078d;
    color: black;
  }

  .boulderworld {
    background-color: #0c606b;
    color: white;
  }

  .lighthouse {
    background-color: #9e0102;
    color: white;
  }

  .zvertigo {
    background-color: yellow;
    color: black;
  }

  .oyeyo {
    background-color: #ef1e29;
    color: white;
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
