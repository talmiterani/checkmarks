<template>
  <v-card min-height="150">
    <v-card-title>
      {{ $tc('site.status', 1) }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" xs="12" lg="6" xl="4">
          <v-select
              v-model="currentStatus"
              :items="items"
              item-text="status_name"
              item-value="status_id"
              :label="'Status'"
              :loading="loading"
              :readonly="readOnly"
              @change="$emit('update:dirty', dirty)"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SiteStatus",
  props: {
    editStatus: String,
    token: String,
    readOnly: Boolean
  },
  async created() {
    try {
      const {data} = await this.$api.trial.getStatuses(this.token)
      this.items = data
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
      currentStatus: null,
      loading: true,
      items: []
    }
  },
  computed: {
    dirty() {
      return this.editStatus !== this.currentStatus
    }
  },
  methods: {
    reset() {
      this.currentStatus = this.editStatus
    }
  }
}
</script>