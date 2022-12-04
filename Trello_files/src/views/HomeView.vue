<template>
  <div class="wrapper">
    <div class="card" v-for="(card, index) in array" key="card.name">
      <Card
        :card="card"
        :array="array"
        :deleteId="deleteId"
      />
    </div>
  </div>
  <a href="#" class="btn btn-primary" v-on:click="Redirect()">Add A card</a>
</template>

<script>
import Card from "../components/Card.vue";
import WPAPI from "wpapi";
export default {
  components: {
    Card,
  },
  data() {
    return {
      array: [],
    };
  },
  methods: {
    Redirect() {
      this.$router.push("/AddCard");
    },
    async ComputeData() {
      let wp = new WPAPI({
        endpoint: "http://localhost/wordpress/index.php/wp-json/",
      });
      const posts = await wp.posts().get();
      this.array = posts;
    },
  },

  async mounted() {
    await this.ComputeData();
    console.log(this.array);
  },
};
</script>

<style>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-template-rows: 2fr 2fr;
  grid-column-gap: 0.5rem;
  grid-row-gap: 2rem;
  grid-row: 2rem;
  font-size: 12px;
  border-radius: 2px;
  width: 100%;
  height: 100%;
}
@media (max-width: 600px) {
  .wrapper {
    display: grid;
    grid-template-columns: repeat(1, 95%);
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 0.5rem;
    grid-row-gap: 2rem;
    grid-row: 2rem;
    font-size: 12px;
    border-radius: 2px;
    width: 100%;
    height: 100%;
  }
}
@media (max-width: 700px) {
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: 2fr 2fr;
    grid-column-gap: 0.5rem;
    grid-row-gap: 2rem;
    grid-row: 2rem;
    font-size: 12px;
    border-radius: 2px;
    width: 100%;
    height: 100%;
  }
}
body {
  background-color: #875a31;
}
.card-body {
  border-radius: 2px;
  overflow: auto;
}
.plus-sign {
  width: 20px;
  height: 20px;
}
.add-card {
  border-radius: 10px;
  margin: 5px;
}
.log-data {
  border-radius: 10px;
  margin: 5px;
}
.grid-item {
  margin: 20px;
}

.btn {
  position: absolute;
}
</style>
