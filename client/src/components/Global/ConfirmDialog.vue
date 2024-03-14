<template>
  <v-dialog v-model="dialog" width="600" :persistent="loading">
    <v-card>
<!--      <v-toolbar flat color="primary">-->
<!--        <v-toolbar-title class="white&#45;&#45;text">-->
          <v-card-title class="primary white--text">
          {{ $t("user.confirm_title") }}
          </v-card-title>
<!--        </v-toolbar-title>-->
<!--      </v-toolbar>-->
      <v-divider/>
      <v-card-text class="title py-4 px-2 text-sm-center">
        {{ message }}
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn
            color="primary"
            text
            @click="close"
            :disabled="loading"
        >
          {{ $t('user.no') }}
        </v-btn>
        <v-btn
            color="primary white--text"
            @click="confirm"
            :disabled="loading"
        >
          {{  $t('user.yes') }}
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "ConfirmDialog",
  props: {
    title: String,
    message: String,
    confirmMessage: String,
    showLoader: Boolean,
    // function should return true for dialog to close after
    onConfirm: Function,
    //alfa change, need more thoughts
    // proceed: Boolean,
    // onConfirmAndProceed: Function,
    // proceedMessage: String,
  },
  data() {
    return {
      dialog: false,
      loading: false,
      confirmed: false
    }
  },
  methods: {
    show() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async confirm() {
      this.loading = true;
      let close = false;

      try {
        close = await this.onConfirm();
      } finally {
        this.loading = false;
      }

      if (close) {
        this.confirmed = true; // close after confirm
        this.close();
      }
    }
  }
}
</script>
