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
  <h3>Timely climbing gym booking information for Singapore.</h3>
  <div class="feedback">
    Created with ❤️ by nerd climbers. Code open-sourced on
    <a href="https://github.com/triomic/climbwhere-sg">Github</a>. Site Hosted
    on <a href="https://www.netlify.com/">Netlify</a>.
  </div>
  <div class="feedback">
    Got feedback/suggestions? Drop us an email at <a
      href="mailto:hello@triomic.studio">hello@triomic.studio</a
    >
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
    max-width: 350px;
    padding: 25px 15px 30px 15px;
    margin-bottom: 0px;
    background: white;
    border-radius: 10px;
    border: solid 2px #f5f5f5;
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
  }
  @media screen and (max-width: 450px) {
    #more-info-modal {
      max-width: 100%;
    }
  }

  h3 {
    margin: 10px 0;
  }

  .feedback {
    width: 100%;
    font-size: 16px;
    margin: 15px 0;
  }
</style>
