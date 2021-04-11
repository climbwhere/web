<script>
  import FilterModal from "./FilterModal.svelte";
  export let filterProps;

  const onLogoClick = () => location.reload();
  const onFilterButtonClick = () =>
    filterProps.showFilterMenu.update((i) => !i);
</script>

<nav>
  <div class="left">
    <div on:click={onLogoClick} class="logo">
      <img class="logo-image" alt="climb emoji" src="/climb.png" />Climbwhere.sg
    </div>
  </div>
  <button on:click={onFilterButtonClick} class="filter-button"> &#9776;</button>
  <FilterModal {...filterProps} />
</nav>

<style>
  nav {
    display: flex;
    width: 100%;
    padding: 10px 5px;
    border-bottom: #f5f5f5 solid 2px;
    background: white;
    position: sticky;
    top: 0px;
  }

  .left {
    flex: 1;
  }

  .logo {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    user-select: none;
    padding: 5px;
    width: 170px;
    text-align: center;
    border-radius: 10px;
  }

  .logo:active {
    background: #f5f5f5;
  }

  .logo-image {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .filter-button {
    background: white;
    border-radius: 5px;
    border: 2px solid #f5f5f5;
  }
</style>
