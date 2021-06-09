<script>
  export let gym;
</script>

<span
  class:fitbloc={gym.slug === "fitbloc"}
  class:boulder-plus={gym.slug === "boulder-plus"}
  class:bff={gym.slug === "bff"}
  class:oyeyo={gym.slug === "oyeyo"}
  class:z-vertigo={gym.slug === "z-vertigo"}
  class:boulder-world={gym.slug === "boulder-world"}
  class:lighthouse={gym.slug === "lighthouse"}
  class:the-rock-school={gym.slug === "the-rock-school"}
  class="badge">{gym.name}</span
>

<style>
  .badge {
    background: #f5f5f5;
    padding: 4px 10px;
    border-radius: 15px;
    font-weight: bold;
  }

  .fitbloc {
    background-color: #7b112a;
    color: white;
  }

  .boulder-plus {
    background-color: #652580;
    color: white;
  }

  .bff {
    background-color: #ea078d;
    color: black;
  }

  .boulder-world {
    background-color: #0c606b;
    color: white;
  }

  .lighthouse {
    background-color: #9e0102;
    color: white;
  }

  .z-vertigo {
    background-color: yellow;
    color: black;
  }

  .oyeyo {
    background-color: #ef1e29;
    color: white;
  }

  .the-rock-school {
    background-color: black;
    color: white;
  }
</style>
