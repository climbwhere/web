<script context="module" lang="ts">
  export function load({ error, status }) {
    return {
      props: {
        errorDescription: `${status}: ${error.message}`,
      },
    };
  }
</script>

<script>
  export let errorDescription;
</script>

<div class="container">
  <h2>🙇 Something went wrong</h2>
  <div class="error-box">
    <code>{errorDescription}</code>
  </div>
</div>

<style>
  .container {
    padding: 10px;
    text-align: center;
  }
  .error-box {
    background: rgba(250, 128, 114, 0.144);
    max-width: 600px;
    padding: 15px;
    border: solid salmon 1px;
    color: salmon;
    font-size: 0.8em;
    border-radius: 20px;
    margin: auto;
  }
</style>
