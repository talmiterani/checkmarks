<template>
  <v-app>
    <Navbar/>
    <v-divider class="mt-1 divider mb-12"/>
    <v-main>
      <router-view/>
    </v-main>
    <Toast/>
  </v-app>
</template>

<script>


import Navbar from "./components/Global/Navbar.vue";

const Toast = () => import('./components/Global/Toast') //fixing webpack warning -> https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/

export default {
  name: 'App',
  components: {Navbar, Toast}
};
</script>
<style>
.divider {
  border-top-width: 2px !important; /* Adjust the thickness as needed */
  background-color: black; /* Change the color if needed */
}
</style>