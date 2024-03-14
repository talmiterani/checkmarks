<template>
  <v-hover v-slot="{ hover }">
  <v-card @click="goToPost"
          :elevation="hover ? 10 : 5"
          :class="{ 'on-hover': hover }"
          class="pa-4"
          :max-height="250"
  >
    <v-row>
      <v-col>
        <UpdatedBy
            user="CJ"
            :author="post.author"
            :updated="post.updated"
        />
      </v-col>
      <v-spacer/>

      <v-col cols="auto">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.stop="$refs.edit.show()">
              <v-icon>{{ icons.edit }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('user.edit', {field: $tc('post.post', 1)}) }}</span>
        </v-tooltip>
      </v-col>
      <v-col cols="auto">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.stop="$refs.confirm.show()">
              <v-icon>{{ icons.remove }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('user.remove', {field: $tc('post.post', 1)}) }}</span>
        </v-tooltip>
      </v-col>
    </v-row>

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
        <v-icon  color="grey darken-1"> {{ icons.comment }}</v-icon>
      </v-col>
      <div class="grey--text text--darken-1">
      {{ `${post.comments_cnt} ${$tc('comment.comment', 2)}`}}
      </div>
    </v-row>

    <AddEditPost
        edit-mode
        :edit-item="post"
        ref="edit"
        @saved="$emit('search')"
    >
    </AddEditPost>
    <ConfirmDialog
        :on-confirm="remove"
        ref="confirm"
        :message="$t('user.confirm_remove', {field: $tc('post.post', 1)})"
    />
  </v-card>
  </v-hover>
</template>

<script>
import {mdiCommentOutline, mdiDelete, mdiPencil} from "@mdi/js";
import {globalRoutes} from "../../services/routes/consts";
import UpdatedBy from "../Global/UpdatedBy.vue";
import AddEditPost from "./AddEditPost.vue";
import ConfirmDialog from "../Global/ConfirmDialog.vue";

export default {
  name: "PostCard",
  components: {ConfirmDialog, AddEditPost, UpdatedBy},
  props: {
    post: Object,
  },
  computed: {
    icons() {
      return ({
        comment: mdiCommentOutline,
        edit: mdiPencil,
        remove: mdiDelete
      })
    }
  },
  methods: {
    goToPost() {
      this.$router.push({
        name: globalRoutes.post,
        params: {
          post_id: this.post.id
        }
      });
    },
    remove(){

    }
  }
}
</script>