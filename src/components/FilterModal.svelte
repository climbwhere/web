<script>
  export let showFilterMenu,
    numberOfClimbers,
    gymFilter,
    dateFilter,
    showAvailableOnly,
    gymList,
    dateList;
</script>

<div class:hidden={!$showFilterMenu} class="filter-widget">
  <h3>Filters</h3>
  <div class="filter">
    <span class="label"> Climbers: </span>
    <input
      type="number"
      min="1"
      placeholder="..."
      bind:value={$numberOfClimbers}
    />
  </div>

  <div class="filter">
    <span class="label">Gym:</span>
    <select bind:value={$gymFilter}>
      <option value="all">All gyms</option>
      {#each gymList as gym}
        <option value={gym}>
          {gym}
        </option>
      {/each}
    </select>
  </div>
  <div class="filter">
    <span class="label">Date:</span>
    <select bind:value={$dateFilter}>
      <option value="all">All dates</option>
      {#each dateList as date}
        <option value={date}>{date}</option>
      {/each}
    </select>
  </div>
  <p>
    <input type="checkbox" bind:checked={$showAvailableOnly} /> Show available slots
    only
  </p>
</div>

<style>
  .filter-widget {
    width: 100%;
    max-width: 300px;
    padding: 15px;
    margin-bottom: 0px;
    background: white;
    border-radius: 10px;
    border: solid 2px #f5f5f5;
    position: absolute;
    top: 40px;
    right: 0;
  }

  h3 {
    margin: 0;
    margin-bottom: 10px;
  }

  .filter {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
  }

  .filter .label {
    flex: 1;
  }

  input[type="number"] {
    width: 50px;
    text-align: center;
  }

  input {
    outline: none;
    padding: 3px;
  }

  select {
    padding: 3px;
  }
</style>
