<script>
  import { Link } from "svelte-routing";
  import moment from "moment";
</script>

<div class="container">
  <p>
    This website shows aggregated climbing gym slot information from multiple
    climbing and bouldering gyms in Singapore.
  </p>
  <p>Looking for</p>

  <h3>Where is this data from?</h3>
  <p>
    We retrieve gym slot information directly from the respective gyms' websites
    every 2 minutes or so. Data is not guaranteed to be accurate or up to date. <Link
      to="status">Check data health here</Link
    >.
  </p>

  <small>
    <p>© {moment().year()} Climbwhere · All rights reserved.</p>
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
