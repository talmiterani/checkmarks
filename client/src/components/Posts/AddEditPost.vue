<template>
  <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          rounded
          color="primary"
          v-bind="attrs"
          v-on="on"
      >
        {{ $t('user.add', {field: $tc('post.post', 1)}) }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ $t('user.add', {field: $tc('post.post', 1)})}}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">


      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
        >
          {{ $t('user.close') }}
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="save"
        >
          {{ $t('user.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddEditPost",
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    async save() {
      try {
        this.dialog = false
      } catch (error) {
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('something_went_wrong'),
          type: 'error'
        });
      }
    }
  }
}
</script>
