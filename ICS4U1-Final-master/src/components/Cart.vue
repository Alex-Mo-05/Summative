<script setup>
import { useStore } from "../store/index.js";
const store = useStore();
</script>

<template>
  <button class="purchase_btn" @click="store.clear()">Clear Cart</button>

  <div id="container">
    <div class="cartlist" v-for="movie in Array.from(store.cart.values())">
      <div class="display">
        <div class="name">{{ movie.id }}: {{ movie.title }}</div>

        <img
          v-if="movie.poster"
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster"
          class="image"
        />
        <br />
        <div class="count">
          <button @click="store.removeFromCart(movie.id)" class="func_btn">
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cartlist {
  height: 100%;
}

.display {
  color: black;
  width: 250px;
  margin: 10px;
  background: linear-gradient(to right, black);
  border: 3px solid gray;
  border-radius: 20px;
  padding: 10px;
  text-align: center;
  display: grid;
}

img {
  border-radius: 20px;
  width: 16vw;
  height: auto;
  margin-top: 20px;
}

.name {
  float: left;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}

.count {
  float: right;
  font-family: "Courier New", Courier, monospace;
  font-weight: 1000;
}

.purchase_btn {
  margin-top: 10px;
  width: 150px;
  height: 40px;
  background: linear-gradient(to right, black);
  border: 1px solid gray;
  border-radius: 5px;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: 600;
  font-size: 20px;
  margin-right: 5%;
  float: right;
  z-index: 99;
}

.func_btn {
  width: 100px;
  height: 30px;
  background: linear-gradient(to right, black);
  border: 1px solid gray;
  border-radius: 5px;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: 600;

  font-size: 15px;
  transform: translateY(-20%);
}

.purchase_btn:hover,
.func_btn:hover {
  color: white;
}

#container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: 525px 525px 525px 525px;
  margin-top: 50px;
}
</style>
