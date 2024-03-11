<template>
  <v-container>
    <v-row class="mt-15">
      <v-col class="d-flex justify-center align-center">
        <div class="display-3">{{ message || $t('pageNotFound') }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Logo from "./Logo";
export default {
  name: "PageNotFound",
  components: {Logo},
  props: {
    message: String
  }
}
</script>