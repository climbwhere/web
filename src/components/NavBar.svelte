<script>
  import { navigate } from "svelte-routing";
  const onLogoClick = () => {
    navigate("/");
  };
</script>

<nav>
  <div class="left">
    <div on:click={onLogoClick} class="logo nav-item" aria-label="Check Slots">
      <img
        class="logo-image"
        alt="logo"
        src="/logo.webp"
        aria-label="logo"
      /><span>Climbwhere.sg</span>
    </div>
  </div>
  <!-- <a href="https://t.me/climbwhere_sg_bot" aria-label="Telegram bot">
    <img class="telegram-logo" src="/telegram.webp" alt="telegram-logo" />
    <span class="r">t.me/climbwhere_sg_bot</span>
  </a> -->
  <a href="https://github.com/climbwhere/web">
    <img
      class="gh-badge"
      src="https://img.shields.io/github/stars/climbwhere/web?style=social"
      alt="GitHub badge"
    />
  </a>
</nav>

<style>
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 5px;
    border-bottom: #f5f5f5 solid 3px;
    background: white;
    position: sticky;
    top: env(safe-area-inset-top);
    z-index: 1;
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
    padding: 5px 8px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    transition-duration: 0.3s;
    line-height: 25px;
  }

  .nav-item:active,
  .nav-item:hover {
    background: #f5f5f5;
  }

  .logo-image {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  .gh-badge {
    width: 90px;
  }

  @media only screen and (max-width: 460px) {
    .r {
      display: none;
    }
  }
</style>
