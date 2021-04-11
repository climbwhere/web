<script>
  const onLogoClick = () => location.reload();
</script>

<nav>
  <div on:click={onLogoClick} class="logo">
    <img class="logo-image" alt="climb emoji" src="/climb.png" />Climbwhere.sg
  </div>
</nav>

<style>
  nav {
    width: 100%;
    padding: 10px 5px;
    font-weight: 600;
    border-bottom: #f5f5f5 solid 2px;
    background: white;
    position: sticky;
    top: 0px;
  }

  .logo {
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
</style>
