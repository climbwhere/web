<script>
  const onLogoClick = () => {
    window.location.reload();
  };
</script>

<nav>
  <div class="left">
    <div on:click={onLogoClick} class="logo nav-item">
      <img class="logo-image" alt="climb emoji" src="/climb.png" />Climbwhere.sg
    </div>
  </div>
  <a href="https://t.me/climbwhere_sg_bot">
    <img class="telegram-logo" src="/telegram.png" alt="telegram-logo" />
    <span class="r">t.me/climbwhere_sg_bot</span>
  </a>
  <a href="https://github.com/climbwhere/web">
    <img
      src="https://img.shields.io/github/stars/climbwhere/web?style=social"
      alt="GitHub badge"
    />
  </a>
</nav>

<style>
  nav {
    flex: 1;
    max-height: 55px;
    min-height: 55px;

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

  .telegram-logo {
    width: 18px;
    height: 18px;
    margin: 3px;
  }

  a {
    font-size: 11px;
    text-decoration: none;
    color: gray;
    display: flex;
    align-items: center;
    margin-left: 10px;
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

  @media only screen and (max-width: 460px) {
    .r {
      display: none;
    }
  }
</style>
