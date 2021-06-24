<script>
  import isEmpty from "lodash/isEmpty";

  let message = "";
</script>

<div class="container">
  <h3>Report an issue</h3>
  <p>Feedback and feature requests are welcome too!</p>

  <textarea
    maxlength="800"
    bind:value={message}
    placeholder="Type your message here..."
  />
  <span class="word-count">
    {message.length}/800
  </span>

  <button disabled={isEmpty(message)}>Submit</button>
</div>

<style>
  .container {
    flex: 1;
    overflow: hidden;
    margin: auto;
    width: 100%;
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
</style>
