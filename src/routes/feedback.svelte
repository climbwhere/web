<script lang="ts">
  import { goto } from "$app/navigation";
  import isEmpty from "lodash/isEmpty.js";
  import { postReport } from "$lib/api";
  let message = "",
    error = "",
    loading = false,
    submitted = false;
  const handleSubmit = async (e) => {
    e.preventDefault();
    loading = true;
    try {
      submitted = await postReport(message);
    } catch (err) {
      error = err;
    }
    loading = false;
    if (!submitted) {
      return;
    }
    setTimeout(() => goto("/"), 1500);
  };
</script>

<div class="container">
  <h3>Submit feedback</h3>
  <p>
    We try our best to maintain and improve this service for everyone in our
    free time. Feature requests and feedback are welcome!
  </p>
  <textarea
    maxlength="800"
    bind:value={message}
    placeholder="Type your message here..."
  />
  <span class="word-count">
    {message.length}/800
  </span>

  <button
    on:click={handleSubmit}
    class:success={submitted}
    disabled={isEmpty(message) || submitted}
    >{submitted
      ? "Thank you for your feedback!"
      : loading
      ? "Submitting..."
      : "Submit"}</button
  >
  <span class="error">{error}</span>
</div>

<style>
  .container {
    flex: 1;
    overflow: hidden;
    max-width: 800px;
    display: flex;
    flex-flow: column;
    padding: 0 10px;
  }
  textarea {
    height: 150px;
    resize: none;
    padding: 10px 5px;
    margin-bottom: 5px;
    background: #f5f5f5;
    border: none;
    border-radius: 10px;
  }
  .word-count {
    color: gray;
    font-size: 11px;
    margin-bottom: 10px;
  }
  p {
    margin: 10px 0;
    line-height: 23px;
  }
  h3 {
    margin: 15px 0 0 0;
  }
  button {
    color: black;
    font-weight: bold;
    background: #f5f5f5;
    padding: 10px 15px;
    border-radius: 10px;
    border: none;
  }
  button:active {
    opacity: 0.5;
  }
  button.success {
    color: green;
  }
  .error {
    margin: 10px 0;
    color: red;
  }
  button:disabled {
    opacity: 0.5;
  }
</style>
