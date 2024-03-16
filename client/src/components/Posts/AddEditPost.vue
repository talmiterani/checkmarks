<template>
  <v-dialog
      v-model="dialog"
      scrollable
      max-width="600px"
      persistent
  >
    <v-card>
      <v-card-title class="primary white--text">
        {{ $t(`user.${editMode ? 'edit' : 'add'}`, {field: $tc('post.post', 1)}) }}
      </v-card-title>
      <v-divider/>
      <v-card-text class="pa-4">
        <v-form ref="form">
          <v-row>
            <v-col class="pb-0">
              <v-text-field
                  v-model="currentItem.author"
                  :label="$t('post.author')+ '*'"
                  required
                  :rules="[value => !!(value || '').trim() || $t('rules.required')]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pt-0">
              <v-text-field
                  v-model="currentItem.title"
                  :label="$t('post.title')+ '*'"
                  required
                  :rules="[value => !!(value || '').trim() || $t('rules.required')]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                  v-model="currentItem.content"
                  :label="$t('post.content')+ '*'"
                  required
                  :rules="[value => !!(value || '').trim() || $t('rules.required')]"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
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
  name: "AddEditPost",
  props: {
    editMode: Boolean,
    editItem: Object
  },
  data() {
    return {
      dialog: false,
      currentItem: {},
      saving: false
    }
  },
  computed: {
    canSave() {
      return this.dirty && !!(this.currentItem.author || "").trim() && !!(this.currentItem.title || "").trim() && !!(this.currentItem.content || "").trim() && !this.saving
    },
    dirty() {
      return (this.currentItem.author || "").trim() !== (this.editItem || {}).author ||
          (this.currentItem.title || "").trim() !== (this.editItem || {}).title ||
          (this.currentItem.content || "").trim() !== (this.editItem || {}).content
    },
  },
  methods: {
    show() {
      this.dialog = true
      this.$nextTick(() => {
        this.$refs.form.reset()
        if (this.editMode) {
          this.currentItem = {...this.editItem}
        }
      })
    },
    async save() {

      try {
        this.saving = true
        const payload = {
          author: this.currentItem.author.trim(),
          title: this.currentItem.title.trim(),
          content: this.currentItem.content.trim()
        }
        this.editMode ? await this.$api.post.update({
          ...payload,
          id: this.editItem.id
        }) : await this.$api.post.add(payload)
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('user.saved', {field: this.$tc('post.post', 1)}),
          type: 'info'
        });
        this.$emit('saved')
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
