import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddCardView from "../views/AddCardView.vue";
import ModifyCardView from "../views/ModifyCardView.vue";
import CardView from "../views/CardView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import AddCategoryView from "../views/AddCategoryView.vue";
import ModifyCommentView from "../views/ModifyCommentView.vue";
import ModifyCategoryView from "../views/ModifyCategoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "categories",
      component: CategoriesView
    },
    {
      path: "/AddCard/:id",
      name: "AddCard",
      component: AddCardView
    },
    {
      path: "/ModifyCard/:id",
      name: "ModifyCard",
      component: ModifyCardView
    },
    {
      path: "/Card/:id",
      name: "Card",
      component: CardView
    },
    {
      path: "/home",
      name: "home",
      component:  HomeView
    },
    {
      path: "/AddCategory",
      name: "AddCategory",
      component: AddCategoryView
    },
    {
      path: "/ModifyComment/:postId/:commentId", 
      name:"ModifyComment",
      component: ModifyCommentView
    }, 
    {
      path: "/ModifyCategory/:id",
      name: "ModifyCategory",
      component: ModifyCategoryView
    }
  ],
});

export default router;
