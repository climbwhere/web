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
    With many new gyms opening up and the surging demand for climbing, looking
    for open/less-crowded timeslots has become a very arduous process. We made
    this site to help with that.
  </p>
  <h3>Where the data is from</h3>
  <p>
    We retrieve gym slot information directly from the respective gyms' websites
    every 2 minutes or so.
  </p>
  <p>
    From time to time, changes are made to the booking systems of climbing gyms.
    This can affect the accuracy of our scrapers. Data is not guaranteed to be
    accurate or up to date.
  </p>
  <p>
    <small>© {dayjs().year()} Climbwhere · All rights reserved.</small>
  </p>
</div>

<style>
  .container {
    overflow-y: scroll;
    max-width: 600px;
    width: 100%;
    heirht: 100%;
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

  small {
    color: rgb(201, 201, 201);
  }
</style>
