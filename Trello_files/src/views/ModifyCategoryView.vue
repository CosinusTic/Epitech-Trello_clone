<template>
    <h3>Modify your category</h3>
    <div class="form">
      <div class="card">
        <div class="card-body">
          <div class="card-text">
            <input type="text" v-model="name" placeholder="category title">  
          </div>
          <button v-on:click="modifyCategory(); redirect();">Update</button>
          <p>Category title: {{ array.name }}</p>
          <p>Category ID: {{ this.$router.currentRoute.value.params["id"] }}</p>
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
    async computeCategory(id)
    {
        let wp = new WPAPI({
        endpoint: "http://localhost/wordpress/index.php/wp-json/",
      });
      const category = await wp.categories().id(id).get();
      this.array = category;
    },
    modifyCategory() {
        let wp = new WPAPI({
          endpoint: "http://localhost/wordpress/index.php/wp-json/",
          username: "nathan",
          password: "epitechwordpres",
        });
        wp.categories().id(this.array.id)
          .update({
            name: this.name,
            status: "publish",
          })
          .then(function (response) { 
            console.log(response);
          });
      },

      redirect() {
        this.$router.push("/");
      },
    },
  
    async mounted()
    {
        await this.computeCategory(this.$router.currentRoute.value.params["id"]);
        console.log(this.array);
      
    
    }
  
  };
  </script>
  
  