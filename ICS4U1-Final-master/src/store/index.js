import { doc, setDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { firestore } from "../firebase";
import email from "../components/Login.vue"

export const useStore = defineStore("store", {
  state: () => {
    return {
      movies: [],
      cart: new Map(),
    };
  },
  actions: {
    async populateFirestore() {
      const genres = new Map([
        [28, "Action"],
        [10751, "Family"],
        [36, "History"],
        [16, "Animation"],
        [9648, "Mystery"],
      ]);

      genres.forEach(async (value, key) => {
        let data = (
          await axios.get("https://api.themoviedb.org/3/discover/movie", {
            params: {
              api_key: "5353c690f7c8b76f4af766952589f1b2",
              with_genres: key,
              include_adult: false,
            },
          })
        ).data.results;
        data = data.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            release_date: movie.release_date,
            overview: movie.overview,
            poster: movie.poster_path,
          };
        });
        await setDoc(doc(firestore, "Genre", value), { data });
        console.log(data);
      });
    },

    async getMovies(id) {
      const genres = {
        Action: 28,
        Family: 10751,
        History: 36,
        Animation: 16,
        Mystery: 9648,
      };
      let data = (
        await axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "5353c690f7c8b76f4af766952589f1b2",
            with_genres: genres[id],
          },
        })
      ).data.results;

      this.movies = data.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          original_title: movie.original_title,
          release_date: movie.release_date,
          overview: movie.overview,
          poster: movie.poster_path,
        };
      });
    },

    
    async addToCart(id, poster) {
      this.cart.push(id, poster);
      console.log(this.user.email);
      await setDoc(doc(firestore, "carts", this.user.email), { cartInfo: this.cart });
      console.log(this.cart);
    },

    async removeFromCart(id) {
      this.cart.delete(id)
      await doc(firestore, "carts", store.user).update({
        cartInfo: firebase.firestore.FieldValue.arrayRemove(id)
      }) ;
    },

    clear() {
      this.cart = new Map();
    },
  
    
  },
});

export const isLoggedIn = ref(false);
