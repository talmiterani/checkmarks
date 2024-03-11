<template>
  <v-container>
    <v-row justify="center" class="mt-5 text-h4">
      {{ $t('user.login') }}
    </v-row>
    <v-row justify="center">
      <v-col xs="12" sm="6" class="mt-3">
        <form>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="username"
                  :label="$t('user.username')+'*'"
                  required
                  :rules="[value => !!(value || '').trim() || $t('rules.required')]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="password"
                  :label="$t('user.password')+'*'"
                  type="password"
                  required
                  :rules="[value => !!(value || '').trim() || $t('rules.required')]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-xs-center mt-5">
              <v-btn color="primary" type="submit" :disabled="!canLogin || loading" @click="signUp">
                {{ $t('user.login') }}
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loading: false
    }
  },
  computed: {
    canLogin() {
      return !!this.username && !!this.password;
    }
  },
  methods: {
    async signUp() {
      try {
        this.loading = true;
        const payload = {
          username: this.username.trim(),
          password: this.password.trim()
        }
        await this.$api.user.login(payload)
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('saved'),
          type: 'info'
        });
      } catch (error) {
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('something_went_wrong'),
          type: 'error'
        });
      }
    }
  }
};
</script>
