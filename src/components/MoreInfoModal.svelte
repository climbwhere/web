<script>
  import Button from "./Button.svelte";

  export let showMoreInfoModal;

  const onCloseButtonClick = () => {
    showMoreInfoModal.update((i) => !i);
  };
  const onTelegramButtonClick = () => {
    window.open("https://t.me/climbwhere_sg_bot");
  };
</script>

<div
  class:hidden={!$showMoreInfoModal}
  id="more-info-modal"
  class="drop-shadow"
>
  <h3>Timely climbing gym vacancy information for Singapore.</h3>
  <div class="feedback">
    Created by nerd climbers <a href="https://twitter.com/seanlkx">@seanlkx</a>
    and
    <a href="https://twitter.com/ravernkoh">@ravernkoh</a>. Code open-sourced on
    <a href="https://github.com/seanlim/climbwhere-sg">Github</a>.
  </div>
  <Button
    iconSrc="/telegram.png"
    title="@climbwhere_sg Telegram bot"
    on:click={onTelegramButtonClick}
  />
  <Button title="Close" on:click={onCloseButtonClick} />
</div>

<style>
  #more-info-modal {
    width: 100%;
    max-width: 400px;
    padding: 15px;
    margin-bottom: 0px;
    background: white;
    border-radius: 10px;
    border: solid 2px #f5f5f5;
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
  }

  .feedback {
    width: 100%;
    font-size: 11px;
    margin: 10px 0;
  }
</style>
