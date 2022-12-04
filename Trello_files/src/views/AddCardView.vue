<template>
  <h3>Add Your card</h3>
  <div class="form">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" placeholder="Your card title">
          <input type="text" v-model="title" /><br />
        </h5>
        <div class="card-text">
          <label class="label">Content</label><br />
          <textarea v-model="content" rows="8" cols="30" /><br /><br />
        </div>
        <button v-on:click="addCard(); redirect();">Add</button>
        <p v-bind:title="title" v-bind:array="array" :content="content"></p>
        <p>Title: {{ title }}</p>
        <p>Content: {{ content }}</p>
        <p>Category: {{this.$router.currentRoute.value.params["id"]}}</p>
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
      content: "",
      title: "",
    };
  },
  methods: {
    addCard() {
      let wp = new WPAPI({
        endpoint: "http://localhost/wordpress/index.php/wp-json/",
        username: "nathan",
        password: "epitechwordpres",
      });
      wp.posts()
        .create({
          title: this.title,
          content: this.content, 
          status: "publish",
          categories: [this.$router.currentRoute.value.params["id"]]
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

