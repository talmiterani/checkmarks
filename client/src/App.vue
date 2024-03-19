<template>
  <v-app>
    <Navbar/>
    <v-main>
      <v-divider class="mt-1 divider mb-12"/>
      <router-view/>
    </v-main>
    <v-divider class="divider mt-5"/>
    <Footer/>
    <Toast/>
  </v-app>
</template>

<script>


import Navbar from "./components/Global/Navbar.vue";
import {useUserStore} from "./stores/userStore";
import Footer from "./components/Global/Footer.vue";

const Toast = () => import('./components/Global/Toast') //fixing webpack warning -> https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/

export default {
  created() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    useUserStore.dispatch('setToken', token)
    useUserStore.dispatch('setUserId', userId)
    useUserStore.dispatch('setUsername', username)

  },
  name: 'App',
  components: {Footer, Navbar, Toast}
};
</script>
<style>
.divider {
  border-top-width: 2px !important; /* Adjust the thickness as needed */
  background-color: black; /* Change the color if needed */
}
</style>