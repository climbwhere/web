<script>
  export let showMoreInfoModal;

  const onCloseButtonClick = () => {
    showMoreInfoModal.update((i) => !i);
  };
</script>

<div class:hidden={!$showMoreInfoModal} id="more-info-modal">
  <h3>Timely climbing gym vacancy information for Singapore.</h3>
  <div class="feedback">
    Created by nerd climbers <a href="https://twitter.com/seanlkx">@seanlkx</a>
    and
    <a href="https://twitter.com/ravernkoh">@ravernkoh</a>. Code open-sourced on
    <a href="https://github.com/seanlim/climbwhere-sg">Github</a>.
  </div>
  <div class="button" on:click={onCloseButtonClick}>Close</div>
</div>

<style>
  #more-info-modal {
    width: 100%;
    max-width: 300px;
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
  }

  .button {
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

  .button:active {
    opacity: 0.4;
  }
</style>
