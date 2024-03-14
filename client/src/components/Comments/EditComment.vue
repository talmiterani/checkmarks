<template>
  <v-dialog
      v-model="dialog"
      scrollable
      max-width="600px"
      persistent
  >
    <v-card>
      <v-card-title class="primary white--text">
        {{ $t('user.edit', {field: $tc('comment.comment', 1)}) }}
      </v-card-title>
      <v-divider/>
      <v-card-text class="pa-4">
        <v-row>
          <v-col>
            <v-text-field
                v-model="currentItem"
                :label="$t('comment.content')+ '*'"
                required
                :rules="[value => !!(value || '').trim() || $t('rules.required')]"
            />
          </v-col>
        </v-row>

      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            color="primary"
            text
            @click="dialog = false"
        >
          {{ $t('user.close') }}
        </v-btn>
        <v-btn
            color="primary white--text"
            @click="save"
            :disabled="!canSave"
        >
          {{ $t('user.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditComment",
  props: {
    editItem: String,
    commentId: String
  },
  data() {
    return {
      dialog: false,
      currentItem: "",
      saving: false
    }
  },
  computed: {
    canSave() {
      return this.dirty && !!this.currentItem.trim() && !this.saving
    },
    dirty() {
      return this.currentItem.trim() !== this.editItem
    },
  },
  methods: {
    show() {
      this.currentItem = this.editItem
      this.dialog = true
    },
    async save() {

      try {
        this.saving = true
        const trimmedVal = this.currentItem.trim()
        const {data} = await this.$api.comment.update({
          content: trimmedVal,
          id: this.commentId
        })
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('user.saved', {field: this.$tc('comment.comment', 1)}),
          type: 'info'
        });
        this.$emit('saved', {content: trimmedVal, id: this.commentId, updated: data.updated})
        this.dialog = false
      } catch (error) {
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('something_went_wrong'),
          type: 'error'
        });
      } finally {
        this.saving = false
      }
    }
  }
}
</script>
