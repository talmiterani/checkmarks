<template>
  <div>
    <v-container>

      <v-row align="center">
        <v-col>
          <v-text-field
              v-model="query"
              dense
              hide-details
              filled
              rounded
              :label="$t('search')"
              :prepend-inner-icon="magnifyIcon"
              @input="onQuery"
          ></v-text-field>
        </v-col>
        <v-col cols="auto" v-if="loggedIn && userId">
          <v-btn
              rounded
              color="primary"
              @click="$refs.add.show()"
          >
            {{ $t('user.add', {field: $tc('post.post', 1).toLowerCase()}) }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" v-for="post in posts" :key="post.id">
          <PostCard
              :post="post"
              :user-id="userId"
              @search="search"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="text-center" v-if="posts.length">
      <v-pagination
          v-model="page"
          :length="pages"
          circle
          @input="search"
      />
    </v-container>
    <PageNotFound v-if="!posts.length && !loading" :message="$t('post.not_found')"/>
    <AddEditPost
        v-if="loggedIn && userId"
        ref="add"
        @saved="search"
    />
  </div>
</template>

<script>
import PostCard from "./PostCard.vue";
import {globalService} from "../../services/globalService";
import {mdiMagnify} from "@mdi/js";
import PageNotFound from "../../views/Global/PageNotFound.vue";
import AddEditPost from "./AddEditPost.vue";
import {useUserStore} from "../../stores/userStore";

export default {
  name: "PostsList",
  components: {AddEditPost, PageNotFound, PostCard},
  props: {
    userId: String
  },
  created() {
    this.search()
  },
  data() {
    return {
      magnifyIcon: mdiMagnify,
      page: 1,
      query: "",
      posts: [],
      total: 0,
      loading: true
    }
  },
  computed: {
    pageSize() {
      return globalService.PAGE_SIZE_LIST
    },
    pages() {
      return Math.ceil(this.total / this.pageSize);
    },
    loggedIn() {
      return !!useUserStore.getters.getToken
    },
  },
  methods: {
    onQuery() {
      this.page = 1
      this.search()
    },
    async search() {
      try {
        this.loading = true
        const payload = {
          page: this.page,
          page_size: this.pageSize,
          query: this.query,
          user_id: this.userId
        }
        const {data} = await this.$api.post.search(payload)
        this.posts = (data || {}).posts || []
        this.total = (data || {}).total || 0
      } catch (error) {

      } finally {
        this.loading = false
      }
    }
  }
}
</script>