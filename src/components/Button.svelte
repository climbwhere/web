<script>
  import { createEventDispatcher } from "svelte";
  export let title;

  const dispatch = createEventDispatcher();

  const onClick = () => dispatch("click");
</script>

<div on:click={onClick} class="button">
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
  }

  .button:active {
    opacity: 0.3;
  }
</style>
