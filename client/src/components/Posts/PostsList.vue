<template>
  <div>
    <v-container class="mt-12">
      <div v-for="(post, index) in filteredPosts" :key="post.id">
        <v-divider v-if="index" class="my-5"/>
        <PostCard
            :post="post"
        />
      </div>

    </v-container>
    <v-container class="text-center">
      <v-pagination
          v-model="page"
          :length="pages"
          circle
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import PostCard from "./PostCard.vue";
import {globalService} from "../../services/globalService";

export default {
  name: "PostsList",
  components: {PostCard},

  data() {
    return {
      page: 1,
      posts: [
        {
          id: "1",
          avatar: "TM",
          author: "Tal Miterani",
          updated: "2024-03-09T20:06:12.066+00:00",
          content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          title: "Hi Guys!",
          comments_count: "42"
        },
        {
          id: "2",
          avatar: "LM",
          author: "Lee Miterani",
          updated: "2024-04-09T20:06:12.066+00:00",
          content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          title: "Hi Guys!",
          comments_count: "11"
        },
        {
          id: "3",
          avatar: "MM",
          author: "Maayan Miterani",
          updated: "2024-02-09T20:06:12.066+00:00",
          content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          title: "Hi Guys!",
          comments_count: "1"
        },
        {
          id: "4",
          avatar: "TM",
          author: "Tal Miterani",
          updated: "2024-03-09T20:06:12.066+00:00",
          content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          title: "Hi Guys!",
          comments_count: "42"
        },
        {
          id: "5",
          avatar: "LM",
          author: "Lee Miterani",
          updated: "2024-04-09T20:06:12.066+00:00",
          content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          title: "Hi Guys!",
          comments_count: "11"
        },
        {
          id: "6",
          avatar: "MM",
          author: "Maayan Miterani",
          updated: "2024-02-09T20:06:12.066+00:00",
          content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          title: "Hi Guys!",
          comments_count: "1"
        },
        {
          id: "7",
          avatar: "TM",
          author: "Tal Miterani",
          updated: "2024-03-09T20:06:12.066+00:00",
          content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          title: "Hi Guys!",
          comments_count: "42"
        },
        {
          id: "8",
          avatar: "LM",
          author: "Lee Miterani",
          updated: "2024-04-09T20:06:12.066+00:00",
          content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          title: "Hi Guys!",
          comments_count: "11"
        },
        {
          id: "9",
          avatar: "MM",
          author: "Maayan Miterani",
          updated: "2024-02-09T20:06:12.066+00:00",
          content: "I really appreciate the insights and perspective shared in this article. It's definitely given me something to think about and has helped me see things from a different angle. Thank you for writing and sharing!",
          title: "Hi Guys!",
          comments_count: "1"
        }
      ],
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.posts.length / globalService.PAGE_SIZE_LIST);
    },
    filteredPosts() {
      return this.posts.slice(((this.page - 1) * globalService.PAGE_SIZE_LIST), this.page *globalService.PAGE_SIZE_LIST)
    },
  },
  methods: {
    search() {
      this.filteredPosts[0] = this.posts[this.page]
    }
  }
}
</script>