<template>
  <v-footer
      padless
      color="white"
      height="100"
  >
    <v-row>
      <v-col cols="12" class="text-center">
        {{ $t('footer') }}
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
}
</script>