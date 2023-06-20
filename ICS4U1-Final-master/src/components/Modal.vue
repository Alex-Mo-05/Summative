<script setup>
import { firestore } from "../firebase";
import { useStore } from "../store";

const props = defineProps(["value"]);
const emits = defineEmits(["toggleModal"]);
const store = useStore();

let data = (
  await axios.get(`https://api.themoviedb.org/3/movie/${props.value.id}`, {
    params: {
      api_key: "5353c690f7c8b76f4af766952589f1b2",
    },
  })
).data;

</script>

<template>
  <Teleport to="body">
    <div class="modal-outer-container" @click.self="emits('toggleModal')" custom>
      <div class="modal-inner-container">
        <button class="close-button" @click="emits('toggleModal')">X</button>
        <img v-if="data.poster" :src="'https://image.tmdb.org/t/p/w500' + props.value.poster" class="img" />
        <p>
        <h1>{{ data.title }}</h1>
        Original Title - {{ data.original_title }} <br />
        Release Date: {{ data.release_date }} <br />
        Overview: {{ data.overview }}
        </p>
        <button class="cart" id="btn_sub" @click="emits('toggleModal'); store.addToCart(data.id, data.poster_path,);">Add To Cart</button>
      </div>
    </div>
  </Teleport>
</template>


<style scoped>
.modal-outer-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 3;
}

.img {
  float: left;
  border-radius: 20px;
  width: 20%;
  height: 90%;
  margin: 10px;
}

.modal-outer-container .modal-inner-container {
  background-color: transparent;
  width: clamp(980px, 100%, 800px);
  height: 400px;
  position: relative;
  color: whitesmoke;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px black;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.modal-inner-container {
  border-radius: 20px;
}

.close-button {
  border-top-right-radius: 20px;
}

button {
  border: 1px solid gray;
  border-radius: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.modal-outer-container .modal-inner-container .close-button {
  position: absolute;
  right: 0px;
  padding: 0.5rem;
  border: none;
  background: linear-gradient(to right, black);
  font-weight: bold;
  font-size: 1.25rem;
  border: 1px solid gray;
  border-radius: 5px;
}

.close-button:hover {
  color: black;
  background: white;
}

p {
  margin-left: 10px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
}

#btn_sub {
  width: 150px;
  height: 40px;
  margin-top: 5%;
  background: linear-gradient(to right, black);
  border: 1px solid gray;
  border-radius: 5px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: 600;
  font-size: 20px;
  margin-left: 2%;
}

#btn_sub:hover {
  color: white;
}
</style>
