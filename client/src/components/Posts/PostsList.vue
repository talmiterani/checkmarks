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
              @input="search"
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
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
      />
    </v-container>
    <PageNotFound v-if="!posts.length && !loading" :message="$t('post.not_found')"/>
    <AddEditPost
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

export default {
  name: "PostsList",
  components: {AddEditPost, PageNotFound, PostCard},
  created() {
    this.search()
  },


  data() {
    return {
      magnifyIcon: mdiMagnify,
      page: 1,
      query: "",
      posts: [],
      loading: true
    }
  },
  computed: {
    pageSize() {
      return globalService.PAGE_SIZE_LIST
    },
    pages() {
      return Math.ceil(this.posts.length / this.pageSize);
    }
  },
  methods: {
    async search() {
      try {
        this.loading = true
        const payload = {
          page: this.page,
          page_size: this.pageSize,
          query: this.query
        }
        const{data} = await this.$api.post.search(payload)
        this.posts = data || []
      } catch (error) {

      } finally {
        this.loading = false
      }
    }
  }
}
</script>