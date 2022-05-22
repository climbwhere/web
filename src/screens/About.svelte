<script>
  import { Link } from "svelte-routing";
  import moment from "moment";
</script>

<div class="container">
  <p>
    Climbwhere was created as a side project in 2021. It was visited 13.6k
    times, with around 500 monthly users at its peak. The source code is
    available on Github here.
  </p>

  <p>
    Add it as a bookmark, save it on your homescreen, or use our <a
      href="https://t.me/climbwhere_sg_bot">Telegram bot</a
    >.
  </p>

  <h3>Where is this data from?</h3>
  <p>
    We retrieve gym slot information directly from the respective gyms'
    websites. Data is not guaranteed to be accurate or up to date.
  </p>

  <small>
    <p>© {moment().year()} Climbwhere · All rights reserved.</p>
    <p>
      Created by <a href="https://sean.place">Sean</a> and
      <a href="https://ravern.site">Ravern</a>
    </p>
  </small>
</div>

<style>
  .container {
    overflow-y: scroll;
    margin: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    padding: 0 10px 50px 10px;
  }

  p {
    margin: 10px 0;
    line-height: 23px;
  }

  h3 {
    margin: 15px 0 0 0;
  }
</style>
