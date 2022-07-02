<script>
  import updatesMD from "~/resource/smm-updates.md";
  import mayUpdatesMD from "~/resource/may-updates.md";
  import "~/table.css";
</script>

<div id="updates" class="container">
  <div class="banner">
    <img class="telegram-logo" src="/telegram.webp" alt="telegram-logo" />
    <a href="https://t.me/climbjios" aria-label="Telegram bot">
      Join the ClimbJios Telegram channel!
    </a>
  </div>
  <p>
    Meet fellow climbers and discuss all things climbing related in ClimbJios.
  </p>
  <hr />
  {@html mayUpdatesMD.body}
  <hr />
  {@html updatesMD.body}
</div>

<style>
  .container {
    overflow-y: scroll;
    height: 100%;
    padding: 0.5rem 1rem;
    padding-bottom: 1rem;
  }

  .banner {
    color: white;
    background: rgb(79, 173, 255);
    padding: 0.5rem 0.8rem;
    margin-bottom: 0.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
  }

  a {
    color: white;
  }
  .banner:active {
    opacity: 0.8;
  }

  .telegram-logo {
    width: 18px;
    height: 18px;
    margin: 3px;
  }
</style>
