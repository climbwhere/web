<script>
  import { createEventDispatcher } from "svelte";

  export let hidden = false,
    refreshing = false;

  const dispatch = createEventDispatcher();

  const handleClicked = () => {
    dispatch("click", {});
  };
</script>

<div class:hidden class="refresh drop-shadow" on:click={handleClicked}>
  <span class:rotating={refreshing} class="refresh-icon material-icons">
    refresh
  </span>
</div>

<style>
  .refresh {
    text-align: center;
    position: absolute;
    z-index: 10;
    bottom: 50px;
    right: 5vw;
    font-size: 21px;
    line-height: 53px;
    height: 50px;
    width: 50px;
    background: white;
    border: solid 3px #f5f5f5;
    border-radius: 50%;
    cursor: pointer;
  }

  .refresh:active {
    opacity: 0.5;
  }

  .rotating {
    -webkit-animation: rotating 1.4s ease-out infinite;
    -moz-animation: rotating 1.4s ease-out infinite;
    -ms-animation: rotating 1.4s ease-out infinite;
    -o-animation: rotating 1.4s ease-out infinite;
    animation: rotating 1.4s ease-out infinite;
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
