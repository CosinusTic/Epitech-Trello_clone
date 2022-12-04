<template>
    <div class="card" style="width: 18rem">
      <div class="card-body" v-bind:this_card="card">
        <h5 class="card-title">{{ arrayTitle }}</h5>
        <p>(Card No: {{ card.id }})</p>
        <p class="card-text">
          {{ arrayContent }}
        </p>
      </div>
      <div>
        <a href="#" class="button" v-on:click="redirectHome()">
          <img class="home" src="https://www.transparentpng.com/thumb/house/house-transparent-picture-19.png" />
        </a>
        <a href="#" class="button" v-on:click="redirectModifyCard()">
          <img class="modify" src="https://publicdomainvectors.org/tn_img/loop-arrow.webp">
        </a>
        <a href="#" class="btn btn-primary delete-button" v-on:click="deleteCard(card.id);" :cardId="card.id"><img class="arrow" src="https://www.freeiconspng.com/uploads/trash-can-icon-24.png"/></a>
    </div>
    </div>
    <div class="card comment-section" v-for="(comment) in arrayComments">
        <p>{{ comment.name }}</p>
        <p>{{ comment.content.rendered }}</p>
        <p>{{ comment.id }}</p>
        <a href="#" class="modify-button" v-on:click="redirect(comment.id);" :cardId="card.id">Modify comment</a>
    </div> 
    <div>
      <input type="text" v-model="name" placeholder="comment title"><br>
      <textarea v-model="content" cols="80" rows="3" placeholder="comment content"></textarea>
    </div>
    <div>
      <a href="#" class="btn add-button" v-on:click="addComment();" :cardId="card.id">Add comment</a>
    </div>
        
</template>
  
  <script lang="ts">
  import { propsToAttrMap } from "@vue/shared";
  import Card from "../components/Card.vue";
  import WPAPI from "wpapi";

  interface PostIt {
    title: String;
    content: String;
    _id: Number;
  }

  export default {
    props: ["card"],

    components: {
      Card,
    },
    data() {
      return {
        card: {} as PostIt,
        array: [], 
        arrayComments: [],
        name: "", 
        content: "",
        arrayContent: [],
        arrayTitle: []
      };
    },
    methods: {
      redirectHome() {
        this.$router.push("/");
      },
      redirectModifyCard()
      {
        this.$router.push("/ModifyCard/" + this.card.id);
        // this.$toaster.show("Successfully modified card");
      },
      async computeData(id: string | string[])
      {
        let wp = new WPAPI({
        endpoint: 'http://localhost/wordpress/index.php/wp-json/'
        });
        const posts = await wp.posts().id(id);
        this.card = posts;
        this.arrayContent = await posts.content.rendered;
        this.arrayTitle = await posts.title.rendered;
      },
      deleteCard(id: string | string[])
      {
        let wp = new WPAPI({
            endpoint: "http://localhost/wordpress/index.php/wp-json/",
            username: "nathan",
            password: "epitechwordpres"
        });
        wp.posts().id(id).delete()
          .then(function(response){
            console.log(response)
        });
      }, 
      async computeComments(id: string | string[])
      {
        let wp = new WPAPI({
          endpoint: "http://localhost/wordpress/index.php/wp-json/",
        });
        const comments = await wp.comments();
        console.log(comments); 
        this.arrayComments = comments.filter(function cool(data) {
          return (data.post == id ? data : null)
        });
      }, 
      addComment()
      {
        let wp = new WPAPI({
        endpoint: "http://localhost/wordpress/index.php/wp-json/",
        username: "nathan",
        password: "epitechwordpres",
        });
        wp.comments().create({
            name: this.name,
            content: this.content,
            post:this.card.id,
            status: "publish"
          }).then(function (response) { 
            console.log(response);
        });
      },
      async logComment(id)
      {
        // console.log(this.arrayComments); 
        let wp = new WPAPI({
          endpoint: "http://localhost/wordpress/index.php/wp-json/",
        });
        const comments = await wp.comments();
        console.log(comments); 
        this.arrayComments = comments.filter(function cool(data) {
          return (data.id == id ? data : null)
        });
        console.log(this.arrayComments[id]);
      }, 
      modifyComment(id)
      {
        let wp = new WPAPI({
            endpoint: "http://localhost/wordpress/index.php/wp-json/",
            username: "nathan",
            password: "epitechwordpres"
        });
        wp.comments().id(id).update({
            name: this.name,
            content: this.content,
            post:this.card.id,
        }).then(function(response){
            console.log(response);
        })
      }, 
      redirect(id)
      {
        this.$router.push("/ModifyComment/" + this.card.id + "/" + id);
      }
    },
    
    async mounted() {
      await this.computeData(this.$router.currentRoute.value.params["id"]);
      await this.computeComments(this.$router.currentRoute.value.params["id"]);
    },

  };
  </script>
  
  <style>
  .home {
    height: 40px;
    width: 40px;
  }
  .modify{
    height:30px;
    width:30px;
  }
  .button {
    margin:20px;
    border: solid 2px black;
    border-radius: 20%;
    padding: 10px;
  }
  .btn{
    background-color:cornflowerblue;
  }

  .comment-section{
    background-color: rgb(206, 198, 255);
  }
  .modify-button{
    position:flex;
  }
  </style>