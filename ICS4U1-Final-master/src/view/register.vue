<script setup>
import { ref } from "vue";
import { auth, firestore } from "../firebase/index";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { isLoggedIn } from "../store/index";
import router from "../router";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { useStore } from "../store"

const user = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");
const store = useStore();
const cart = ref("");

const registerUserByEmail = async () => {
  if (password1.value !== password2.value) {
    alert("Passwords does not match!");
    return;
  }
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email.value, password1.value);
    store.user = user;
    const { cart } = (await getDoc(doc(firestore, "carts", user.email))).data();
    store.cart = cart;
    router.push("/Purchase");
    isLoggedIn.value = true;
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

const registerUserByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  const { cart } = (await getDoc(doc(firestore, "carts", user.email))).data();
  store.cart = cart;
  store.user = user;
  router.push("/Purchase");
  isLoggedIn.value = true;
};
</script>

<template>
  <div class="bg">
    <div class="sign-up-container">
      <div class="wrapper">
        <form @submit.prevent="registerUserByEmail()">
          <div class="form-box-signup">
            <h2>Sign Up</h2>
            <form action="#">
              <div class="input-box">
                <input type="email" required v-model="email" />
                <label>Email</label>
              </div>

              <div class="input-box">
                <input type="password" required v-model="password1" />
                <label>Password</label>
              </div>

              <div class="input-box">
                <input type="password" required v-model="password2" />
                <label>Confirm Password</label>
              </div>
            </form>

            <button type="submit" class="btn_sub">Sign Up</button>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327"
            @click="registerUserByGoogle"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sign-up-container {
  border: 2px solid black;
  border-radius: 20px;
  width: 35%;
  height: 70%;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px black;
  background: transparent;
  transform: translateY(15%);
  margin-left: 33%;
  text-align: center;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: 400px;
  font-size: 20px;
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 35px;
  margin-left: 10px;
  transform: translateY(30%);
  background: linear-gradient(to right, black);
  border: 1px solid gray;
  border-radius: 5px;
}
.input-box {
  width: 100%;
  height: 25px;
  padding: 4px;
  position: relative;
  border-bottom: 2px solid;
  margin: 30px 0;
}

.input-box h2 {
  font-size: 2em;
  color: #162938;
  text-align: center;
}

div.bg {
  transform: translateY(-2%);
  width: 100%;
  height: 710px;
  background-image: url(https://wallpaperaccess.com/full/1156809.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 60rem;
}

.input-box label {
  position: absolute;
  padding-left: 20px;
}

.btn_sub {
  width: 150px;
  height: 40px;
  margin-top: 20px;
  background: linear-gradient(to right, black);
  border: 1px solid gray;
  border-radius: 5px;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: 600;
  font-size: 20px;
}

.text {
  width: 251px;
  height: 32px;
  border: 1px solid #a6a6a6;
  border-radius: 5px;
  padding-left: 10px;
  font-family: Georgia, "Times New Roman", Times, serif;
  margin-top: 20px;
}

.btn_sub:hover {
  color: red;
}
</style>
