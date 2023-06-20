<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { isLoggedIn } from "../store/index";
import { auth } from "../firebase/index.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { storeToRefs } from "pinia";
import { useStore } from "../store"

const store = useStore()
const data = ref(true);
const submitted = ref(false);
const email = ref("");
const password = ref("");
const router = useRouter();


const isSuccessful = () => {
  submitted.value = true;
  const { user } = signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      store.user = user;
      data.value = true;
      router.push("/Purchase");
      isLoggedIn.value = true;
    })
    .catch(function (error) {
      data.value = false;
      alert(error.message);
    });
};
const registerUserByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  store.user = user;
  router.push("/Purchase");
  isLoggedIn.value = true;
};
</script>

<template>
  <div class="bg">
    <div class="sign-up-container">
      <div class="wrapper">
        <div class="form-box-signup">
          <h2>Login</h2>
          <form action="#">
            <div class="input-box">
              <input type="email" required v-model="email" />
              <label>Email</label>
            </div>

            <div class="input-box">
              <input type="password" required v-model="password" />
              <label>Password</label>
            </div>
          </form>

          <button id="btn_sub" @click="isSuccessful()">Login</button>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327"
          @click="registerUserByGoogle"
        />
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
  height: 60rem;
  background-image: url(https://e0.pxfuel.com/wallpapers/319/243/desktop-wallpaper-red-clouds-aesthetic-red-and-black-red-aesthetic-dark-red.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  
}

.input-box label {
  position: absolute;
  padding-left: 20px;
}

button {
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

.title {
  text-align: center;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-weight: 800;
}

.Deny {
  border: 3px solid darkred;
  background-color: pink;
  font-size: 2vw;
  font-family: "Times New Roman", Times, serif;
  font-weight: 900;
  margin-left: auto;
  margin-right: 15%;
  text-align: center;
  padding: 1vw;
  width: 50%;
  color: darkred;
}

.Welcome {
  border: 3px solid darkgreen;
  background-color: lightgreen;
  font-size: 2vw;
  font-family: "Times New Roman", Times, serif;
  font-weight: 900;
  margin-left: auto;
  margin-right: 15%;
  text-align: center;
  padding: 1vw;
  width: 50%;
  color: darkgreen;
}

.login {
  margin-top: 5%;
  padding: 30px;
}

.form-1 {
  width: 50%;
  margin: 15px;
  margin-left: auto;
  margin-right: 15%;
}

.td_left {
  width: 100px;
  text-align: right;
  height: 45px;
  font-family: Georgia, "Times New Roman", Times, serif;
}

.td_right {
  padding-left: 50px;
}

#username,
#password,
#email,
#name,
#tel {
  width: 251px;
  height: 32px;
  border: 1px solid #a6a6a6;
  border-radius: 5px;
  padding-left: 10px;
  font-family: Georgia, "Times New Roman", Times, serif;
}

#img_check {
  height: 32px;
  vertical-align: middle;
}

#btn_sub:hover {
  color: white;
}
</style>
