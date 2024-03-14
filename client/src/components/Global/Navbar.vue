<template>
  <div class="py-2 px-8">

    <v-app-bar flat color="white">
      <v-row align="center" no-gutters>
        <v-col cols="auto">
          <Logo/>
        </v-col>
        <v-spacer/>
        <v-col cols="auto" class="d-none d-md-flex">
          <v-btn
              rounded
              color="primary"
              text
              @click="$router.push({name: globalRoutes.login})"
          >
            {{ $t('user.login') }}
          </v-btn>
        </v-col>
        <v-col cols="auto" class="d-none d-md-flex">
          <v-btn
              rounded
              color="primary"
              @click="$router.push({name: globalRoutes.signUp})"
          >
            {{ $t('user.sign_up') }}
          </v-btn>
        </v-col>
        <v-col cols="auto" class="d-md-none">
          <v-app-bar-nav-icon  @click.stop="drawer = !drawer" />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list>
        <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.path"
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
import {mdiAccount, mdiLogin} from '@mdi/js'
import {globalRoutes} from "../../services/routes/consts";

export default {
  name: "Navbar",
  computed: {
    globalRoutes() {
      return globalRoutes
    }
  },
  components: {Logo},
  data() {
    return {
      drawer: false,
      menuItems: [
        {title: this.$t('user.login'), path: "/login", icon: mdiLogin},
        {title: this.$t('user.sign_up'), path: "/signup", icon: mdiAccount},
      ],
    };
  },
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