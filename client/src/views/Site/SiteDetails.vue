<template>
  <v-card min-height="245">
    <v-card-title>
      {{ $tc('site.details.detail', 2) }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <!--        <v-col cols="8">-->
        <!--          <v-text-field-->
        <!--              :value="currentItem.site_name"-->
        <!--              @input="onInput($event,'site_name')"-->
        <!--              :label="'Name*'"-->
        <!--              required-->
        <!--              :rules="[value => !!(value || '').trim() || 'Required.']"-->
        <!--              counter-->
        <!--              :maxlength="fieldLengths.site_name"-->
        <!--          />-->
        <!--        </v-col>-->
        <!--      </v-row>-->
        <!--      <v-row>-->
        <!--        <v-col cols="4">-->
        <!--          <v-text-field-->
        <!--              :value="currentItem.country_code"-->
        <!--              @input="onInput($event,'country_code')"-->
        <!--              :label="'Country*'"-->
        <!--              required-->
        <!--              :rules="[value => !!(value || '').trim() || 'Required.']"-->
        <!--          />-->
        <!--        </v-col>-->
        <!--        <v-col cols="4">-->
        <!--          <v-text-field-->
        <!--              :value="currentItem.administrative_area_level_1"-->
        <!--              @input="onInput($event,'administrative_area_level_1')"-->
        <!--              :label="'State'"-->
        <!--          />-->
        <!--        </v-col>-->
        <!--        <v-col cols="4">-->
        <!--          <v-text-field-->
        <!--              :value="currentItem.city"-->
        <!--              @input="onInput($event,'city')"-->
        <!--              :label="'City*'"-->
        <!--              required-->
        <!--              :rules="[value => !!(value || '').trim() || 'Required.']"-->
        <!--              counter-->
        <!--              :maxlength="fieldLengths.city"-->
        <!--          />-->
        <!--        </v-col>-->
        <v-col cols="12" xs="12" lg="6" xl="4">
          <v-text-field
              v-model="currentItem.address_line_1"
              @input="$emit('update:dirty', dirty)"
              :label="$t('site.details.address', {number: '1'})"
              counter
              :maxlength="fieldLengths.address"
              :readonly="readOnly"
          />
        </v-col>
        <v-col cols="12" xs="12" lg="6" xl="4">
          <v-text-field
              v-model="currentItem.address_line_2"
              @input="$emit('update:dirty', dirty)"
              :label="$t('site.details.address', {number: '2'})"
              counter
              :maxlength="fieldLengths.address"
              :readonly="readOnly"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" lg="6" xl="4">
          <v-text-field
              v-model="currentItem.address_line_3"
              @input="$emit('update:dirty', dirty)"
              :label="$t('site.details.address', {number: '3'})"
              counter
              :maxlength="fieldLengths.address"
              :readonly="readOnly"
          />
        </v-col>
        <v-col cols="12" xs="12" lg="6" xl="4">
          <v-text-field
              v-model="currentItem.zipcode"
              @input="$emit('update:dirty', dirty)"
              :label="$t('site.details.zipcode')"
              counter
              :maxlength="fieldLengths.zipcode"
              :readonly="readOnly"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {globalService} from "../../services/globalService";

export default {
  name: "SiteDetails",
  props: {
    editItem: Object,
    fields: Array,
    readOnly: Boolean
  },
  async created() {
    // const [countriesRes, statesRes] = Promise.all([
    //   this.$api.global.getCountriesBw(),
    //   this.$api.global.getCountriesStates()
    // ])
    // console.log(countriesRes, statesRes)
  },
  data() {
    return {
      currentItem: {}
    }
  },
  computed: {
    fieldLengths() {
      return globalService.fieldLengths.site
    },
    dirty() {
      return this.fields.some(key => ((this.editItem || {})[key] || "").trim() !== (this.currentItem[key] || "").trim())
    },
  },
  methods: {
    reset() {
      this.currentItem = {...this.editItem}
    }
  }
}
</script>