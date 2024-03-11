<template>
  <v-container>
  <v-row  justify="center">
    <v-col  md="auto">
      <v-btn outlined rounded x-large color="warning">
        {{$t('no_data')}}
      </v-btn>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NoData"
}
</script>