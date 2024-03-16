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
                  @input="invalidData = false"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="password"
                  :label="$t('user.password')+'*'"
                  type="password"
                  autocomplete="on"
                  required
                  :rules="[value => !!(value || '').trim() || $t('rules.required')]"
                  @input="invalidData = false"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-xs-center">
              <v-btn color="primary" type="submit" :disabled="!canLogin || loading" @click="login">
                {{ $t('user.login') }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="error--text">
              {{ invalidDataMessage }}
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {globalRoutes} from "../../services/routes/consts";
import {useUserStore} from "../../stores/userStore";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      invalidData: false
    }
  },
  computed: {
    canLogin() {
      return !!this.username.trim() && !!this.password.trim() && !this.invalidData;
    },
    invalidDataMessage() {
      return this.invalidData ? this.$t('user.incorrect_user_data') : ""
    }
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        const payload = {
          username: this.username.trim(),
          password: this.password.trim()
        }
        const {data} = await this.$api.user.login(payload)

        const token = (data || {}).token;
        const userId = (data || {}).userId;

        useUserStore.dispatch('setToken', token)
        useUserStore.dispatch('setUserId', userId)
        useUserStore.dispatch('setUsername', payload.username)

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', payload.username);


        this.$router.push({
          name: globalRoutes.posts,
        });

      } catch (error) {
        if (error.response.status === 401) {
          this.invalidData = true
        } else {
          this.$eventBus.$emit('toastMessageHandler', {
            message: this.$t('something_went_wrong'),
            type: 'error'
          });
        }
      } finally {
        this.loading = false
      }
    }
  }
};
</script>
