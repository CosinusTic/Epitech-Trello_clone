<template>
    <h3>Modify your comment</h3>
    <div class="form">
      <div class="card">
        <div class="card-body">
          <div class="card-text">
            <textarea v-model="content" cols="80" rows="3" placeholder="comment content"></textarea>
          </div>
          <button v-on:click="modifyComment(); redirect();">Update</button>
          <p v-bind:title="title" v-bind:array="array" :content="content"></p>
          <p>Content: {{ array.content }}</p>
          <p>Post ID: {{this.$router.currentRoute.value.params["postId"]}}</p>
          <p>Comment ID: {{this.$router.currentRoute.value.params["commentId"]}}</p>
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
        array: [],
      };
    },
    methods: {
    async computeComment(id)
    {
        let wp = new WPAPI({
          endpoint: "http://localhost/wordpress/index.php/wp-json/",
        });
        const comments = await wp.comments().id(id);
        this.array = comments;
    },
      modifyComment() {
        let wp = new WPAPI({
          endpoint: "http://localhost/wordpress/index.php/wp-json/",
          username: "nathan",
          password: "epitechwordpres",
        });
        wp.comments().id(this.array.id)
          .update({
            content: this.content,
            status: "publish",
          })
          .then(function (response) { 
            console.log(response);
          });
      },

      redirect() {
        this.$router.push("/Card/" + this.$router.currentRoute.value.params["postId"]);
      },
    },
  
    async mounted()
    {
        await this.computeComment(this.$router.currentRoute.value.params["commentId"]);
        console.log(this.$router.currentRoute.value.params["postId"]);
      console.log(this.$router.currentRoute.value.params["commentId"]);
      console.log(this.array);
      
    
    }
  
  };
  </script>
  
  