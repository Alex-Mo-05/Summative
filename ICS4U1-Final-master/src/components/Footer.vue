<script setup></script>

<template>
  <div class="footerContainer">
    <h1 class="info">FilmFlix Direct</h1>
    <div class="text">
      <table>
        <td>
          <p>Owner: Alexander Mo</p>
          <p>Email: Alex.Mo@student.tdsb.on.ca</p>
          <p>Phone Number: 416-416-4166</p>
        </td>
        <td>
          <p>Location: 2621 Midland Ave, Scarborough, ON M1S 1R8</p>
          <p>FilmFlix Direct is a premier online destination for movie enthusiasts seeking convenient access to a vast
            collection of films. With our extensive library of movies spanning across genres and eras, customers can enjoy
            the best of cinema right from the comfort of their own homes. Our user-friendly platform offers seamless
            browsing and streaming, allowing film lovers to discover and indulge in their favorite movies at any time.
            Whether it's classic masterpieces, the latest blockbusters, or hidden gems, FilmFlix Direct brings the magic
            of the big screen directly to your device, providing an unparalleled cinematic experience for every film
            aficionado.
          </p>
        </td>
      </table>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: black;
}
.footerContainer {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  width: 99.5%;
}

.info {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: rgb(202, 26, 26);
  border-width: 4px;
  padding: 3px;
  text-align: center;
}

table {
  border-collapse: separate;
  border-spacing: 30px;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
  width: 700px;
}

p {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 18px;
  margin-left: 5px;
  color: rgb(202, 26, 26);
  padding-top: 10px;
  padding-bottom: 10px;
}

</style>