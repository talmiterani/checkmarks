<template>
  <v-container>
    <v-row justify="center" class="mt-5 text-h4">
      {{ $t('user.sign_up') }}
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
                  :error-messages="uniqueMessage"
                  @input="isUnique = true"
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
                  :rules="[value => !!(value || '').trim() || $t('rules.required'),
                         value => !confirmPassword || value === confirmPassword || $t('rules.confirm_password')]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="confirmPassword"
                  :label="$t('user.confirm_password')+'*'"
                  type="password"
                  autocomplete="on"
                  required
                  :rules="[value => !!(value || '').trim() || $t('rules.required'),
                         value => !password || value === password || $t('rules.confirm_password')]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-xs-center">
              <v-btn color="primary" type="submit" :disabled="!canSign || loading" @click="signUp">
                {{ $t('user.sign_up') }}
              </v-btn>
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
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      loading: false,
      isUnique: true
    }
  },
  computed: {
    canSign() {
      return !!this.username && !!this.password && this.confirmPassword === this.password && this.isUnique;
    },
    uniqueMessage() {
      return !this.isUnique ? this.$t('user.username_exists') : ""
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
        const {data} = await this.$api.user.signup(payload)

        const token = (data || {}).token;
        const userId = (data || {}).userId;

        useUserStore.dispatch('setToken', token)
        useUserStore.dispatch('setUserId', userId)
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        this.isUnique = true
        this.$router.push({
          name: globalRoutes.posts,
        });
      } catch (error) {
        if (error.response.status === 409) {
          this.isUnique = false;
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
