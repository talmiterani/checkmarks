<template>
<v-container v-if="!loading">
  <PageNotFound
      v-if="!post"
      :message="$t('post.not_found')"
  />
  <div v-else>
    <v-row>
      <v-col>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="backToPosts">
              <v-icon>{{ backToPostsIcon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('back_to', {field: $tc('post.post', 2)}) }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <UpdatedBy
        :user="post.postUsername[0]"
        :author="post.author"
        :updated="post.updated"
    />
    <v-row>
      <v-col class="font-weight-black">
        {{ post.title }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        {{ post.content }}
      </v-col>
    </v-row>

    <v-divider class="mt-10 mb-5 divider"/>
    <v-container>
      <v-row class="grey--text text--darken-1">
        <v-col>
          {{ $tc('comment.comment', 2) }}
        </v-col>
      </v-row>

      <v-row  v-if="loggedIn" align="center" class="pb-12">
        <v-col>
          <v-text-field
              v-model="content"
              dense
              hide-details
              filled
              rounded
              :label="$t('comment.write_comment')"
          >
            <template v-slot:prepend-inner>
              <v-avatar color="red" class="mr-2">
                <span v-if="!loading" class="white--text text-h5">{{ useDisplay }}</span>
              </v-avatar>
            </template>
          </v-text-field>

        </v-col>
        <v-col cols="auto">
          <v-btn
              rounded
              color="primary"
              @click="addComment"
              :disabled="!(content || '').trim() || addingComment"
          >
            {{ $t('user.add', {field: $tc('comment.comment', 1)}) }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-row  v-for="(comment, index) in (post || {}).comments" :key="comment._id">
      <v-col>
        <v-divider v-if="index" class="mt-5 mb-8"/>
        <CommentCard
            :comment="comment"
            @updated="update($event, index)"
            @removed="remove(index)"
        />
      </v-col>
    </v-row>
  </div>
</v-container>
</template>

<script>
import UpdatedBy from "../Global/UpdatedBy.vue";
import CommentCard from "../Comments/CommentCard.vue";
import {globalRoutes} from "../../services/routes/consts";
import {mdiArrowLeft} from "@mdi/js";
import PageNotFound from "../../views/Global/PageNotFound.vue";
import {useUserStore} from "../../stores/userStore";
import {useDisplay} from "../../services/globalService";

export default {
  name: "PostView",
  components: {PageNotFound, CommentCard, UpdatedBy},
  async created() {
    try {
      const {data} = await this.$api.post.get(this.postId)
      this.post = data || {}
      this.post.comments = (this.post.comments || []).filter(value => Object.keys(value).length !== 0);

    } catch (error) {
      this.$eventBus.$emit('toastMessageHandler', {
        message: this.$t('something_went_wrong'),
        type: 'error'
      });
    } finally {
      this.loading = false
    }
  },
  data() {
    return {
      loading: true,
      post: {},
      content: "",
      addingComment: false
    }
  },
  computed: {
    loggedIn() {
      return !!useUserStore.getters.getToken
    },
    postId() {
      return this.$route.params.post_id
    },
    backToPostsIcon() {
      return mdiArrowLeft
    },
    useDisplay() {
      return useDisplay(useUserStore.getters.getUsername)
    },
  },
  methods: {
    backToPosts() {
      this.$router.push({
        name: globalRoutes.posts,
      });
    },
    remove(index) {
      this.post.comments.splice(index, 1)
    },
    update(comment, index) {
      this.$set(this.post.comments, index, {...comment,username: useUserStore.getters.getUsername})
    },
    async addComment() {
      try {
        this.addingComment = true
        const {data} = await this.$api.comment.add({
          content: this.content.trim(),
          post_id: this.postId
        })
        if (!(this.post.comments || []).length) this.post.comments = []
        this.post.comments.unshift({...data, username: useUserStore.getters.getUsername})
        this.content = ""
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('user.saved', {field: this.$tc('comment.comment', 1)}),
          type: 'info'
        });
      } catch (error) {
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('something_went_wrong'),
          type: 'error'
        });
      } finally {
        this.addingComment = false
      }
    }
  }
}
</script>
<style scoped>
>>> .v-input__prepend-inner {
  margin-top: 8px !important;
  margin-bottom: 8px !important;

}

>>> .v-input__slot {
  padding-left: 8px !important;
}
</style>