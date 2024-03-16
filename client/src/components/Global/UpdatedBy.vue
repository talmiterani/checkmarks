<template>
  <v-row align="center">
    <v-col cols="auto">
      <v-avatar color="red">
        <span class="white--text text-h5">{{ useDisplay }}</span>
      </v-avatar>
    </v-col>
    <v-col cols="auto" class="font-weight-black pr-2">
      {{ author }}
    </v-col>
    <v-col class="grey--text text--darken-1 pl-0" v-html="`&bull;&nbsp;&nbsp;${parsedUpdated}`"/>
  </v-row>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useDisplay} from "../../services/globalService";
dayjs.extend(relativeTime);
export default {
  name: "UpdatedBy",
  props: {
    user: String,
    author: String,
    updated: String
  },
  computed: {
    parsedUpdated() {
      const currentDate = dayjs();
      return dayjs(this.updated).from(currentDate);
    },
    useDisplay() {
      return useDisplay(this.user)
    }
  },
}
</script>