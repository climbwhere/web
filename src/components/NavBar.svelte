<script>
  import { navigate } from "svelte-routing";
  const onLogoClick = () => {
    navigate("/");
  };
</script>

<nav>
  <div class="left">
    <div on:click={onLogoClick} class="logo nav-item">
      <img class="logo-image" alt="logo" src="/logo.png" /><span
        >Climbwhere.sg</span
      >
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 5px;
    border-bottom: #f5f5f5 solid 3px;
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
    font-size: 20px;
    display: flex;
    user-select: none;
    padding: 5px 8px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    transition-duration: 0.3s;
    line-height: 28px;
  }

  .nav-item:active,
  .nav-item:hover {
    background: #f5f5f5;
  }

  .logo-image {
    width: 28px;
    height: 28px;
    margin-right: 5px;
  }

  @media only screen and (max-width: 460px) {
    .r {
      display: none;
    }
  }
</style>
