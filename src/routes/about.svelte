<script>
  import dayjs from "dayjs";
</script>

<div class="container">
  <h3>About</h3>
  <p>
    This website shows aggregated climbing gym slot information from multiple
    bouldering gyms in Singapore.
  </p>
  <p>
    With many new gyms opening up, and the surging demand for climbing gym slots
    makes looking for open/less-crowded timeslots a very arduous process. We
    made this tool to help with that.
  </p>
  <h3>Where our data is from</h3>
  <p>
    We retrieve gym slot information directly from the respective gyms' websites
    every 2 minutes or so. Data is not guaranteed to be accurate or up to date.
    Check data health here.
  </p>
  <small>© {dayjs().year()} Climbwhere · All rights reserved.</small>
</div>

<style>
  .container {
    overflow-y: scroll;
    max-width: 600px;
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
