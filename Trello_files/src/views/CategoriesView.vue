<template>
    <div class="wrapper">
      <div class="card" v-for="(category) in array" key="card.name">
        <Category
            :category="category"
            :array="array"
        />
        <div class="redirect">
            <a href="#" class="btn btn-primary" v-on:click="redirectModify(category.id)">Modify Category</a>
        </div>
        <div class="delete">
            <a href="#" class="btn btn-primary" v-on:click="deleteCategory(category.id)">Delete Category</a>
        </div>
      </div>
      
    </div>
    <a href="#" class="btn btn-primary" v-on:click="redirect()">Add A category</a>
</template>

<script>
import Card from "../components/Card.vue";
import WPAPI from "wpapi";
import Category from "../components/Category.vue";

export default{
components: 
{
    Category,
}, 

data()
{
    return{
        array: []
    }
}, 

methods:
{
    async ComputeData() {
      let wp = new WPAPI({
        endpoint: "http://localhost/wordpress/index.php/wp-json/",
      });
      const posts = await wp.categories().get();
      this.array = posts;
      
    }, 
    redirect()
    {
        this.$router.push("/AddCategory")
    }, 
    redirectModify(id)
    {
        this.$router.push("ModifyCategory/" + id);
    }, 
    deleteCategory(id)
    {
        let wp = new WPAPI({
            endpoint: "http://localhost/wordpress/index.php/wp-json/",
            username: "nathan",
            password: "epitechwordpres"
        });
        wp.categories().id(id).delete()
          .then(function(response){
            console.log(response)
        });
        // get all posts that have a category like current category
    }
}, 

async mounted()
{
    await this.ComputeData();
    console.log(this.array);
    for(let i = 0; i < this.array.length; i++) 
    {
        console.log(this.array[i].name);
    }
}

}
</script>