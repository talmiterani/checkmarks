<template>
  <v-card class="pa-4" flat>
    <v-row>
      <v-col cols="auto">
        <UpdatedBy
            :user="comment.username"
            :author="comment.author"
            :updated="comment.updated"
        />
      </v-col>
      <v-spacer/>

      <v-col cols="auto" v-if="comment.user_id === userId">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.stop="$refs.edit.show()">
              <v-icon>{{ icons.edit }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('user.edit', {field: $tc('comment.comment', 1)}) }}</span>
        </v-tooltip>
      </v-col>
      <v-col cols="auto" v-if="comment.user_id === userId">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click.stop="$refs.confirm.show()">
              <v-icon>{{ icons.remove }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('user.remove', {field: $tc('comment.comment', 1)}) }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-truncate">
        {{ comment.content }}
      </v-col>
    </v-row>

    <editComment
        v-if="comment.user_id === userId"
        edit-mode
        :edit-item="comment.content"
        :comment-id="comment._id || comment.id"
        ref="edit"
        @saved="$emit('updated', {...$event,  user_id: comment.user_id})"
    >
    </editComment>
    <ConfirmDialog
        v-if="comment.user_id === userId"
        :on-confirm="remove"
        ref="confirm"
        :message="$t('user.confirm_remove', {field: $tc('comment.comment', 1).toLowerCase()})"
    />
  </v-card>
</template>

<script>
import UpdatedBy from "../Global/UpdatedBy.vue";
import ConfirmDialog from "../Global/ConfirmDialog.vue";
import EditComment from "./EditComment.vue";
import {mdiDelete, mdiPencil} from "@mdi/js";
import {useUserStore} from "../../stores/userStore";

export default {
  name: "CommentCard",
  components: {EditComment, ConfirmDialog, UpdatedBy},
  props: {
    comment: Object
  },
  computed: {
    icons() {
      return ({
        edit: mdiPencil,
        remove: mdiDelete
      })
    },
    userId() {
      return useUserStore.getters.getUserId
    },
  },
  methods: {
    async remove() {
      let success = false;
      try {
        await this.$api.comment.remove(this.comment._id || this.comment.id)
        this.$emit('removed')
        success = true;
        this.$eventBus.$emit("toastMessageHandler", {
          message: this.$t('user.removed', {field: this.$tc('comment.comment', 1)}),
          type: "info"
        });
      } catch (e) {
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('something_went_wrong'),
          type: 'error'
        });
      }

      return success;
    }
  }
}

</script>