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
import {useUserStore} from "./stores/userStore";

const Toast = () => import('./components/Global/Toast') //fixing webpack warning -> https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/

export default {
  created() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    useUserStore.dispatch('setToken', token)
    useUserStore.dispatch('setUserId', userId)
  },
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