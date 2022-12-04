<template>
    <h3>Add Your category</h3>
    <div class="form">
      <div class="card">
        <div class="Category-body">
          <h5 class="Category-title" placeholder="Your Category title">
            <input type="text" v-model="name" /><br />
          </h5>
          <button v-on:click="addCategory(); redirect();">Add</button>
          <p v-bind:name="name" v-bind:array="array"></p>
          <p>Title: {{ name }}</p>
        </div>
      </div>
    </div>
    <div>
      <button v-on:click="redirect()">Home</button>
    </div>
  </template>

<script>
import WPAPI from "wpapi";

export default {

  data() {
    return {
      name: ""
    };
  },
  methods: {
    addCategory() {
      let wp = new WPAPI({
        endpoint: "http://localhost/wordpress/index.php/wp-json/",
        username: "nathan",
        password: "epitechwordpres",
      });
      wp.categories()
        .create({
          name: this.name,
          status: "publish",
        })
        .then(function (response) { 
          console.log(response.id);
        });
    },
    redirect() {
      this.$router.push("/");
    },
  },

  mounted()
  {
    console.log(this.$router.currentRoute.value.params["id"]);
  }

};
</script>

