<script>
  import isNil from "lodash/isNil";

  let type, description;
</script>

<div class="container">
  <h2>Report an issue</h2>
  <span class="radios">
    <input type="radio" bind:group={type} value="Wrong Data" />
    <label for="report_type">Wrong Data</label>
    <input type="radio" bind:group={type} value="Bug" />
    <label for="report_type">Bug</label>
    <input type="radio" bind:group={type} value="Feedback" />
    <label for="report_type">Feedback</label>
  </span>

  <textarea
    bind:value={description}
    placeholder="Type your message here..."
    disabled={isNil(type)}
  />

  <button disabled={isNil(type)}>Submit</button>
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

  .radios {
    margin-bottom: 10px;
  }

  textarea {
    height: 150px;
    resize: none;
    padding: 5px;
    margin-bottom: 10px;
  }
</style>
