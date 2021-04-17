<script>
  export let showFilterMenu,
    numberOfClimbers,
    gymFilter,
    dateFilter,
    showAvailableOnly,
    gymList,
    dateList;

  const onCloseButtonClick = () => {
    showFilterMenu.update((i) => !i);
  };

  const onClearAllButtonClick = (e) => {
    e.preventDefault();
    gymFilter.update((_) => "all");
    dateFilter.update((_) => "all");
    numberOfClimbers.update((_) => 1);
  };
</script>

<div class:hidden={!$showFilterMenu} class="filter-widget drop-shadow">
  <div class="filter-row">
    <h3 class="label">Filters</h3>
    <a class="clear-all-button" on:click={onClearAllButtonClick} href=""
      >reset</a
    >
  </div>
  <div class="filter-row">
    <span class="label"> Climbers: </span>
    <input
      type="number"
      min="1"
      placeholder="..."
      bind:value={$numberOfClimbers}
    />
  </div>

  <div class="filter-row">
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
  <div class="filter-row">
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
  <div class="close-button" on:click={onCloseButtonClick}>Close</div>
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
    top: 50px;
    right: 0;
  }

  h3 {
    margin: 0;
    font-size: 17px;
  }

  .filter-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
  }

  .filter-row .label {
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

  .close-button {
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 10px;
    background: #f5f5f5;
    text-align: center;
    -webkit-user-select: none;
  }

  .close-button:active {
    opacity: 0.4;
  }

  .clear-all-button {
    float: right;
    font-size: 15px;
  }
</style>
