<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <Toast/>
  </v-app>
</template>

<script>

const Toast = () => import('./components/Global/Toast') //fixing webpack warning -> https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/

export default {
  name: 'App',
  components: {Toast}
};
</script>
