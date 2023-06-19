<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { isLoggedIn } from "./store/index";
</script>

<template>
  <nav>
    <p>FilmFlix Direct</p>
    <ul>
      <div id="block" />
      <router-link to="/" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">Home</button>
      </router-link>
      <router-link to="/Login" custom v-slot="{ navigate }" v-if="!isLoggedIn">
        <button @click="navigate" role="link">Login</button>
      </router-link>
      <router-link
        to="/Register"
        custom
        v-slot="{ navigate }"
        v-if="!isLoggedIn"
      >
        <button @click="navigate" role="link">Sign Up</button>
      </router-link>
      <router-link to="/" @click="isLoggedIn = false" v-if="isLoggedIn">
        <button @click="navigate" role="link">Log Out</button>
      </router-link>
      <router-link
        to="/Purchase"
        custom
        v-slot="{ navigate }"
        v-if="isLoggedIn"
      >
        <button @click="navigate" role="link">Items</button>
      </router-link>
      <router-link
        to="/ShoppingCart"
        custom
        v-slot="{ navigate }"
        v-if="isLoggedIn"
      >
        <button @click="navigate" role="link">Cart</button>
      </router-link>
    </ul>
  </nav>
  <router-view />
</template>

<style scoped>
nav {
  width: 100%;
  height: 120px;
  background-color: black;
  line-height: 80px;
  opacity: 1;
}

nav > p {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-weight: 1vw;
  font-size: 4vw;
  display: inline-block;
  margin-left: 27%;
  text-align: center;
  transform: translateY(-50%);
  color: red;
}

nav > ul {
  float: right;
  padding: auto;
  width: 30%;
  margin: 0;
  margin-right: 1.9%;
  transform: translateY(30%);
}

button {
  display: inline-block;
  color: red;
  border: 0;
  background: 0;
  font-size: 2vw;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;


  margin-left: 15px;
}

#block {
  width: 50%;
}

button:hover {
  color: red;
}

#cart {
  display: inline-block;
  width: 15%;
  height: 100%;
  transform: translateY(60%);
}
</style>
