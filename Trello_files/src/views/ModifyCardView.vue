<template>
    <div class="form">
      <h3>Add Your card</h3>
      <label class="label">New Title</label><br>
      <input type="text" v-model="title"/><br>
      <label class="label">New  Content</label><br>
      <textarea v-model="content" rows="8" cols="30"/><br><br>
      <button v-on:click="modifyCard(); redirect();">Modify</button>
      <p v-bind:title="title" v-bind:array="array" :content="content"></p>
      <p>Current content: {{array.content}}</p>
      <p>Current title: {{array.title}}</p>
      <p>Current ID: {{array.id}}</p>
      <p>New title: {{ title }}</p>
      <p>New content: {{ content }}</p>
    </div>
</template>

<script lang="ts">

import WPAPI from "wpapi";

export default {
props:["this_card", "card"],
data() {
    return {
        content: "",
        title: "",
        array: [],
    };
},

methods: {
    async computeData(id: string | string[])
    {
        let wp = new WPAPI({
        endpoint: 'http://localhost/wordpress/index.php/wp-json/', 
        });
        const posts = await wp.posts().id(id);
        this.array = posts;
        
    },
    async modifyCard()
    {
        let wp = new WPAPI({
            endpoint: "http://localhost/wordpress/index.php/wp-json/",
            username: "nathan",
            password: "epitechwordpres"
        });
        wp.posts().id(this.array.id).update({
            title: this.title,
            content: this.content, 
            status:"publish"
        }).then(function(response){
            console.log(response);
        })
    },
    displayData() {
      console.log(this.content);
      console.log(this.title);
    },
    redirect() {
      this.$router.push("/");
    },
},
    
  async mounted() {
    console.log(this.$router.currentRoute.value.params["id"]);
    await this.computeData(this.$router.currentRoute.value.params["id"]);
    console.log(this.array);
  },
};
</script>