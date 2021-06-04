<script>
  export let showMoreInfoModal;

  const onLogoClick = () => {
    window.location.reload();
  };

  const onMoreInfoClick = () => {
    showMoreInfoModal.update((i) => !i);
  };
</script>

<nav>
  <div class="left">
    <div on:click={onLogoClick} class="logo nav-item">
      <img class="logo-image" alt="climb emoji" src="/climb.png" />Climbwhere.sg
    </div>
    <div on:click={onMoreInfoClick} class="more-info nav-item">&#9432;</div>
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 5px;
    border-bottom: #f5f5f5 solid 2px;
    background: white;
    position: sticky;
    top: 0px;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .nav-item {
    user-select: none;
  }
  .more-info {
    font-weight: bold;
    font-size: 13px;
    color: rgb(122, 122, 122);
    padding: 5px;
    border-radius: 10px;
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
    cursor: pointer;
    transition-duration: 0.3s;
  }

  .nav-item:active,
  .nav-item:hover {
    background: #f5f5f5;
  }

  .logo-image {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .filter-button {
    width: 35px;
    height: 35px;
    background: white;
    border-radius: 5px;
    border: 2px solid #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: pointer;
  }

  .filter-button-icon {
    width: 20px;
    height: 20px;
    flex: 1;
  }
</style>
