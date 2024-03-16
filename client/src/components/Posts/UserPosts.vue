<template>
  <PostsList
    :user-id="userId"
  />
</template>

<script>
import PostsList from "./PostsList.vue";
import {useUserStore} from "../../stores/userStore";

export default {
  name: "UserPosts",
  components: {PostsList},
  computed: {
    userId() {
      return useUserStore.getters.getUserId
    },
  }
}
</script>