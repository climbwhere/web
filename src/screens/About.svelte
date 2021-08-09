<script>
  import { Link } from "svelte-routing";
  import moment from "moment";
</script>

<div class="container">
  <p>
    This website shows aggregated climbing gym slot information from multiple
    climbing and bouldering gyms in Singapore.
  </p>

  <h3>Why did we make this?</h3>
  <p>
    Due to COVID-19, many local climbing gyms are forced to lower their max
    capacities. The high demand for climbing gym slots nowadays makes it very
    tedious to look for gyms and open timeslots.
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
    This website was designed and built by <a href="https://sean.place">Sean</a
    >, and its scrapers were built by
    <a href="https://www.instagram.com/lowkeyravern/">Ravern</a>. Technicalities
    of the site explained
    <a href="https://sean.place/blog/climbwhere-sg/">here</a> for fellow web people.
  </p>

  <p>
    Like our work? <a href="https://www.buymeacoffee.com/seanlim"
      >buy us a coffee!</a
    >
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
