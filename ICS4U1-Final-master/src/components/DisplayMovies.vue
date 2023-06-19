<script setup>
import axios from "axios";
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useStore } from "../store/index.js";

const store = useStore();
const genre = ref(28);
const criteria = ref("");
let searchResults = ref([]);
const page = ref(1);
const totalPages = ref(0);
const showModal = ref(false);
const selectedId = ref(0);

const openModal = (value) => {
  showModal.value = true;
  selectedId.value = value;
};

const closeModal = () => {
  showModal.value = false;
};

const getGenres = async () => {
  store.movies = [];
  searchResults.value = [];
  console.log(store.movies);
  await store.getMovies(genre.value);
};

const search = async (direction) => {
  searchResults.value = [];
  page.value += direction;
  let data = (
    await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: "ad891932e4907c23fc8a99002a4b5d3f",
        query: criteria.value,
        include_adult: false,
        page: page.value,
      },
    })
  ).data;

  totalPages.value = data.total_pages;

  searchResults.value = data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      release_date: movie.release_date,
      overview: movie.overview,
      poster: movie.poster_path,
    };
  });
};
</script>

<template>
  <input
    type="search"
    v-model="criteria"
    @keydown.enter="search(0)"
    class="search"
    placeholder="Search"
  />
  <button class="search-btn" @click="search(0)">Search</button>
  <select v-model="genre" @change="getGenres()">
    <option value="Action">Action</option>
    <option value="Family">Family</option>
    <option value="History">History</option>
    <option value="Animation">Animation</option>
    <option value="Mystery">Mystery</option>
  </select>
  <template v-if="searchResults.length">
    <div class="navigation">
      <button v-show="page > 1" @click="search(-1)" class="prev">Prev</button>
      <h1>{{ `Page ${page} of ${totalPages}` }}</h1>
      <button v-show="page < totalPages" @click="search(1)" class="next">
        Next
      </button>
    </div>
  </template>
  <div class="movies">
    <div class="purchase-container">
      <template v-if="searchResults.length > 0">
        <div v-for="movie in searchResults">
          <img
            :id="movie.id"
            @click="openModal(movie)"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster}`"
          />
        </div>
      </template>
      <template v-else>
        <div v-for="movie in store.movies">
          <img
            :id="movie.id"
            @click="openModal(movie)"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster}`"
          />
        </div>
      </template>
      <Modal v-if="showModal" @toggleModal="closeModal()" :value="selectedId" />
    </div>
  </div>
</template>

<style scoped>
select {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  width: 10%;
  height: 25px;
  color: black;
  background-color: white;
  margin-left: 10px;
  font-weight: 400;
  text-align: center;
  border: 1px solid gray;
  border-radius: 10px;
}

.search {
  height: 25px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-left: 20px;
  font-size: 18px;
  margin-top: 20px;
  border: 1px solid gray;
  border-radius: 10px;
}

.movies {
  border-radius: 20px;
  padding: 10px;
  height: 100%;
  margin-bottom: 50px;
  color: white;
  font-family: "Courier New", Courier, monospace;
}

.purchase-container {
  box-sizing: border-box;
  width: 100%;
  display: grid;
  margin-top: 1vw;
  gap: 2vw;
  grid-template-columns: auto auto auto;
  background: linear-gradient(to right, black);
  border: 3px solid red;
  border-radius: 20px;
  padding: 10px;
}

img {
  border-radius: 20px;
  width: 30vw;
  height: auto;
  margin: auto;
  border-radius: 10px;
  border: 5px solid black;
}
.search-btn {
  height: 100%;
  background: linear-gradient(to right, black);
  border: 1px solid gray;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: 500;
  font-size: 18px;
  border-radius: 10px;
}

.prev,
.next {
  width: 100px;
  height: 30px;
  background: linear-gradient(to right, black);
  border: 1px solid gray;
  border-radius: 5px;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 20px;
}

.navigation {
  background-color: black;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: white;
  text-align: center;
}

.prev {
  float: left;
  transform: translateY(20%);
  border: 1px solid gray;
  border-radius: 10px;
}

.next {
  float: right;
  transform: translateY(-180%);
  border: 1px solid gray;
  border-radius: 10px;
}

.prev:hover,
.next:hover {
  color: white;
}
</style>
