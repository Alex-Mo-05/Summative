import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/Home.vue";
import Login from "../view/Login.vue";
import Purchase from "../view/Purchase.vue";
import ShoppingCart from "../view/ShoppingCart.vue";
import Register from "../view/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Purchase",
    name: "Purchase",
    component: Purchase,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/ShoppingCart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
