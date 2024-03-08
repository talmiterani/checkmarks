<template>
  <v-card min-height="170">
    <v-card-title>
      {{ $tc('site.contact.contact', 2) }}
    </v-card-title>

    <v-card-text>
      <v-row v-for="(contact, index) in contacts" :key="contact.contact_id">

        <v-col cols="12" v-if="index">
          <v-divider/>
        </v-col>

        <v-col cols="12">
          <SiteContact
              :edit-item="contact"
              :fields="fields"
              @updateDirty="updateDirty($event, index)"
              :readOnly="readOnly"
              ref="contact"
          />
        </v-col>
      </v-row>
      <NoData v-if="!(contacts || []).length"/>
    </v-card-text>

  </v-card>
</template>

<script>
import SiteContact from "./SiteContact";
import NoData from "../../components/Global/NoData";

export default {
  name: "SiteContacts",
  components: {NoData, SiteContact},
  props: {
    contacts: Array,
    fields: Array,
    readOnly: Boolean
  },
  data() {
    return {
      dirty: []
    }
  },
  methods: {
    reset() {
      (this.$refs.contact || []).forEach((contact, index) => {
        this.dirty[index] = false
        contact.reset()
      })
    },
    updateDirty(value, index) {
      this.dirty[index] = value
      this.$emit('update:dirty', this.dirty.some(value => !!value))
    }
  }
}
</script>