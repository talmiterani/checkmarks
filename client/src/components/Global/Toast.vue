<template>
  <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Toast",
  created(){
    this.$eventBus.$on('toastMessageHandler',(data)=>{
      this.color = data.type;
      this.text = data.message;
      this.timeout = this.getTimeout(data.timeout, data.type);

      this.snackbar = true;
    });
  },
  data () {
    return {
      snackbar: false,
      color: 'success',
      timeout: -1,
      text: ''
    }
  },
  methods: {
    getTimeout(time, type) {
      if (time) {
        return time;
      }
      else if (type === 'info' ||  type === 'success') {
        return 2500;
      } else if (type === 'error') {
        return 5000;
      }

      return 3500;
    }
  }
}
</script>