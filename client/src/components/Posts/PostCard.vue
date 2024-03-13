<template>
  <v-hover v-slot="{ hover }">
  <v-card @click="goToPost"
          :elevation="hover ? 10 : 5"
          :class="{ 'on-hover': hover }"
          class="pa-4"
          :max-height="250"
  >
    <UpdatedBy
        user="CJ"
        :author="post.author"
        :updated="post.updated"
    />
    <v-row>
      <v-col class="text-truncate font-weight-black">
        {{ post.title }}
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-truncate">
        {{ post.content }}
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="auto">
        <v-icon  color="grey darken-1"> {{ commentIcon }}</v-icon>
      </v-col>
      <div class="grey--text text--darken-1">
      {{ `${post.comments_cnt} ${$tc('comment.comment', 2)}`}}
      </div>
    </v-row>

  </v-card>
  </v-hover>
</template>

<script>
import {mdiCommentOutline} from "@mdi/js";
import {globalRoutes} from "../../services/routes/consts";
import UpdatedBy from "../Global/UpdatedBy.vue";

export default {
  name: "PostCard",
  components: {UpdatedBy},
  props: {
    post: Object,
  },
  computed: {
    commentIcon() {
      return mdiCommentOutline
    },
  },
  methods: {
    goToPost() {
      this.$router.push({
        name: globalRoutes.post,
        params: {
          post_id: this.post.id
        }
      });
    }
  }
}
</script>