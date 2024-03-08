<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-radio-group
            v-model="currentItem.opt_status"
            class="mt-0 pa-0"
            row
            hide-details
            :readonly="readOnly"
            @change="$emit('updateDirty', dirty)"
        >
          <span class="pr-2">{{ $t('site.contact.opt_status') }}</span>
          <v-radio :label="$t('optIn')" :value="true" color="primary" class="pointer-event-icon"/>
          <v-radio :label="$t('optOut')" :value="false" color="primary" class="pointer-event-icon"/>
        </v-radio-group>
      </v-col>
      <v-col cols="12" xs="12" lg="6" xl="4">
        <v-text-field
            v-model="currentItem.name"
            @input="$emit('updateDirty', dirty)"
            :label="$t('site.contact.name')"
            counter
            :maxlength="fieldLengths.name"
            :readonly="readOnly"
        />
      </v-col>
      <v-col cols="12" xs="12" lg="6" xl="4">
        <v-text-field
            v-model="currentItem.email"
            @input="$emit('updateDirty', dirty)"
            :label="$t('site.contact.email')"
            :rules="rules.email"
            counter
            :maxlength="fieldLengths.email"
            :readonly="readOnly"
            validate-on-blur
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12" lg="6" xl="4">
        <v-text-field
            v-model="currentItem.phone"
            @input="$emit('updateDirty', dirty)"
            :label="$t('site.contact.phone')"
            counter
            :readonly="readOnly"
            :maxlength="fieldLengths.phone"
        />
      </v-col>
      <v-col cols="12" xs="12" lg="6" xl="4">
        <v-text-field
            v-model="currentItem.fax"
            @input="$emit('updateDirty', dirty)"
            :label="$t('site.contact.fax')"
            :rules="rules.fax"
            counter
            :maxlength="fieldLengths.fax"
            :readonly="readOnly"
            validate-on-blur
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {globalService} from "../../services/globalService";
import {fileService} from "../../services/fileService";

export default {
  name: "SiteContact",
  props: {
    editItem: Object,
    fields: Array,
    readOnly: Boolean
  },
  data() {
    return {
      currentItem: {}
    }
  },
  computed: {
    fieldLengths() {
      return globalService.fieldLengths.site.contact
    },
    rules() {
      return {
        email: [value => !!(value || '').trim().match(fileService.regexes.email) || 'email is not valid'],
        fax: [value => !(value || '').trim().match(fileService.regexes.containOnlyLetters) || 'fax is not valid']
      }
    },
    dirty() {
      return this.fields.some(property => {
        if (typeof (this.currentItem || {})[property] === 'boolean')
          return (this.editItem || {})[property] !== this.currentItem[property]
        else
          return ((this.editItem || {})[property] || "").trim() !== (this.currentItem[property] || "").trim()
      })
    },
  },
  methods: {
    reset() {
      this.currentItem = {...this.editItem}
    }

  }
}
</script>