<template>
  <v-card class="pa-4" flat>
    <UpdatedBy
        user="CJ"
        :author="comment.author"
        :updated="comment.updated"
    />

    <v-row>
      <v-col class="text-truncate">
        {{ comment.content }}
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
import UpdatedBy from "../Global/UpdatedBy.vue";

export default {
  name: "CommentCard",
  components: {UpdatedBy},
  props: {
    comment: Object
  }
}

</script>