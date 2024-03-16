<template>
  <div class="py-2 px-8"a>
    <v-app-bar flat app color="white">
      <v-row align="center">
        <v-col cols="auto">
          <Logo/>
        </v-col>
        <v-spacer/>
        <v-col v-if="!loggedIn && !isSmallScreen" cols="auto" class="d-none d-md-flex">
          <v-btn
              rounded
              color="primary"
              text
              @click="$router.push({name: globalRoutes.login}).catch(() => {})"
          >
            {{ $t('user.login') }}
          </v-btn>
        </v-col>
        <v-col v-if="!loggedIn && !isSmallScreen" cols="auto" class="d-none d-md-flex">
          <v-btn
              rounded
              color="primary"
              @click="$router.push({name: globalRoutes.signUp}).catch(() => {})"
          >
            {{ $t('user.sign_up') }}
          </v-btn>
        </v-col>
        <v-col v-if="loggedIn && !isSmallScreen" cols="auto" class="d-none d-md-flex">
          <v-btn
              rounded
              text
              color="primary"
              @click="$router.push({name: globalRoutes.userPosts}).catch(() => {})"
          >
            {{ $t('user.user_posts') }}
          </v-btn>
        </v-col>
        <v-col v-if="loggedIn && !isSmallScreen" cols="auto" class="d-none d-md-flex">
          <v-btn
              rounded
              color="primary"
              @click="logout"
          >
            {{ $t('user.logout') }}
          </v-btn>
        </v-col>
        <v-col r v-if="isSmallScreen" cols="auto">
<!--          class="d-md-none">-->
          <v-app-bar-nav-icon  @click.stop="drawer = !drawer" />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-if="isSmallScreen" v-model="drawer"  fixed right>
      <v-list>
        <v-list-item
            v-for="item in filteredMenuItems"
            :key="item.title"
            @click="onMenuItem(item)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import Logo from "../../views/Global/Logo.vue";
import {mdiAccount, mdiLogin, mdiLogout, mdiPost} from '@mdi/js'
import {globalRoutes} from "../../services/routes/consts";
import {useUserStore} from "../../stores/userStore";

export default {
  name: "Navbar",
  components: {Logo},
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    globalRoutes() {
      return globalRoutes
    },
    loggedIn() {
      return !!useUserStore.getters.getToken
    },
    filteredMenuItems() {
      const menuItems =  [
        {title: this.$t('user.login'), name: globalRoutes.login, icon: mdiLogin, show: !this.loggedIn},
        {title: this.$t('user.sign_up'), name: globalRoutes.signUp, icon: mdiAccount, show: !this.loggedIn},
        {title: this.$t('user.user_posts'), name: globalRoutes.userPosts, icon: mdiPost, show: this.loggedIn},
        {title: this.$t('user.logout'), icon: mdiLogout, show: this.loggedIn},
      ]
      return menuItems.filter(item => item.show)
    },
    isSmallScreen() {
      return this.$vuetify.breakpoint.mobile;
    },
    temp() {
      return this.$vuetify.breakpoint
    }
  },
  methods: {
    logout() {
      useUserStore.dispatch('setToken', "")
      useUserStore.dispatch('setUserId', "")
      localStorage.clear();
      this.drawer = false
      this.$router.push({name: globalRoutes.posts}).catch(() => {})
    },
    onMenuItem(item) {
      this.loggedIn && !item.name ? this.logout(): this.$router.push({name: item.name}).catch(() => {})
    }
  }
}

</script>


<style scoped>
.d-lg-none {
  display: none !important;
}

.d-none {
  display: none !important;
}

.d-md-flex {
  display: flex !important;
}
</style>