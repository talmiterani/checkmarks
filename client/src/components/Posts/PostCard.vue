<template>
  <v-card flat>
    <v-row align="center">
      <v-col cols="auto">
        <v-avatar color="red">
          <span class="white--text text-h5">CJ</span>
        </v-avatar>
      </v-col>
      <v-col cols="auto" class="font-weight-black">
        {{ post.author }}
      </v-col>
      <div class="grey--text text--darken-1"  v-html="`'&bull;&nbsp;&nbsp;${parsedUpdated}`"/>
    </v-row>

    <v-row>
      <v-col>
        {{ post.title }}
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        {{ post.content }}
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="auto">
        <v-icon  color="grey darken-1"> {{ commentIcon }}</v-icon>
      </v-col>
      <div class="grey--text text--darken-1">
      {{ `${post.comments_count} ${$tc('user.comment', 2)}`}}
      </div>
    </v-row>

  </v-card>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {mdiCommentOutline} from "@mdi/js";

dayjs.extend(relativeTime);

export default {
  name: "PostCard",
  props: {
    post: Object,
  },
  computed: {
    commentIcon() {
      return mdiCommentOutline
    },
    parsedUpdated() {
      const currentDate = dayjs();
      return dayjs(this.post.updated).from(currentDate);
    }
  }
}
</script>