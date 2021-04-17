<script>
  import { createEventDispatcher } from "svelte";
  export let title, iconSrc;

  const dispatch = createEventDispatcher();

  const onClick = () => dispatch("click");
</script>

<div on:click={onClick} class="button">
  {#if iconSrc !== undefined}
    <img class="button-icon" alt="button icon" src={iconSrc} />
  {/if}
  {title}
</div>

<style>
  .button {
    width: 100%;
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 10px;
    background: #f5f5f5;
    text-align: center;
    -webkit-user-select: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  .button:active {
    opacity: 0.3;
  }

  .button-icon {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
</style>
