<script>
  import { Link } from "svelte-routing";
  import moment from "moment";
</script>

<div class="container">
  <p>
    When COVID-19 hit, many climbing gyms in Singapore adopted slot-booking
    systems in order to limit capacity and reduce risks.
  </p>
  <p>
    With the high demand, it can be very tedious to search for open time slots
    across all gyms.
  </p>
  <p>
    <b>We built Climbwhere.sg to help with that.</b> The website shows aggregated
    climbing gym slot information from multiple climbing and bouldering gyms in Singapore.
  </p>

  <h3>Where is this data from?</h3>
  <p>
    We retrieve gym slot information directly from the respective gyms' websites
    every 2 minutes or so. Data is not guaranteed to be accurate or up to date. <Link
      to="status">Check data health here</Link
    >.
  </p>

  <h3>Who are we?</h3>
  <p>
    We are <a href="https://instagram.com/bouldermonster69">Sean</a> and
    <a href="https://www.instagram.com/lowkeyravern/">Ravern</a>. If you see us
    around, 👀 do say hi!
  </p>

  <h3>Like our work?</h3>
  <p>
    <a href="https://www.buymeacoffee.com/seanlim">buy us a coffee!</a>
  </p>

  <p>© {moment().year()} Climbwhere · All rights reserved.</p>
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
