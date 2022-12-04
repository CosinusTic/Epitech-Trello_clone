<template>
  <div>
    <div class="card-body">
      <h5 class="card-title">{{ card.title.rendered }}</h5>
      <p>(Card No: {{ card.id }})</p>
      <a href="#" class="btn btn-primary" v-on:click="redirect()"><img class="arrow" src="https://static.vecteezy.com/system/resources/previews/008/844/878/original/arrow-icon-design-free-png.png"/></a>
    </div>
  </div>
</template>

<script>
import router from "@/router";
// http://localhost/wordpress/index.php/wp-json/
export default {
  name: "Card",
  props: ["card"],

  methods: {
    redirect() {
      this.$router.push("/Card/" + this.card.id);
    },
  },
};
</script>

<style>
.arrow {
  height: 15px;
  width: 20px;
}
.delete-button {
  background-color: red;
}
.btn {
  border: 1px solid black;
  margin: 10px;
}
.btn:hover {
  opacity: 0.7;
}
.delete-button:hover {
  background-color: red;
}

.btn {
  display: block;
}
</style>
