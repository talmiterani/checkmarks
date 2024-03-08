<template>
  <div>
    <PageNotFound
        v-if="saved"
        :message="$t('thankYou')"
    />
    <v-container v-if="!saved && !loading && site">
      <Logo/>
      <v-form ref="form" @submit.prevent :disabled="loading">
        <v-row justify="center">
          <v-col cols="12">
            <SiteDetails
                :edit-item="site.details"
                :dirty.sync="dirty.details"
                :fields="detailsFields"
                :readOnly="readOnly"
                ref="details"
            />
          </v-col>
          <v-col cols="12">
            <SiteStatus
                :edit-status="site.details.status"
                :dirty.sync="dirty.status"
                :token="token"
                :readOnly="readOnly"
                ref="status"
            />
          </v-col>
          <v-col cols="12">
            <SiteContacts
                :contacts="site.contacts"
                :dirty.sync="dirty.contacts"
                :fields="contactFields"
                :readOnly="readOnly"
                ref="contacts"
            />
          </v-col>
        </v-row>
      </v-form>
      <v-row class="pt-4">
        <v-col>
          <v-btn
              color="primary"
              depressed
              @click="save"
              :disabled="!canSave || readOnly"
          >
            {{ $t('submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <PageNotFound
        v-if="!loading && !site"
        :message="$t('invalidToken')"
    />
  </div>
</template>

<script>
import SiteDetails from "./SiteDetails";
import SiteStatus from "./SiteStatus";
import SiteContacts from "./SiteContacts";
import PageNotFound from "../Global/PageNotFound";
import {siteService} from "../../services/siteService";
import Logo from "../Global/Logo";

export default {
  name: "SiteForm",
  components: {Logo, PageNotFound, SiteContacts, SiteStatus, SiteDetails},
  async created() {
    try {
      const {data} = await this.$api.trial.getSite(this.token)

      this.site.details = data.response.site || {}
      this.site.contacts = data.response.contacts || []
      this.sharedContact = data.shared_contact || {}

      this.readOnly = data.response.read_only

      this.reset = true

    } catch (error) {
      this.site = null
      this.$eventBus.$emit('toastMessageHandler', {
        message: this.$t('something_went_wrong'),
        type: 'error'
      });
    } finally {
      this.loading = false
      if (this.reset) {
        this.$nextTick(() => {
          this.$refs.details.reset()
          this.$refs.status.reset()
          this.$refs.contacts.reset()
        })
      }
    }
  },
  data() {
    return {
      dirty: {
        details: false,
        status: false,
        contacts: false
      },
      site: {},
      sharedContact: {},
      loading: true,
      reset: false,
      saved: false,

      readOnly: false
    }
  },
  computed: {
    canSave() {
      return Object.values(this.dirty).some(bool => bool) && this.$refs.form.validate()
    },
    token() {
      return this.$route.params.token;
    },
    detailsFields() {
      return ['zipcode', 'address_line_1', 'address_line_2', 'address_line_3']
    },
    contactFields() {
      return ['opt_status', 'name', 'email', 'phone', 'fax']
    }
  },
  methods: {
    async save() {

      if (!this.$refs.form.validate()) return // this is for best practice (user should not be able to click submit button if form is not valid)

      try {
        this.loading = true

        const payload = {}

        //set into payload all site details changed values
        if (this.dirty.details) {
          payload.site = {}
          this.detailsFields.forEach(field => {
            const trimmedValue = (this.$refs.details.$data.currentItem[field] || "").trim()
            if ((this.site.details[field] || "").trim() !== trimmedValue)
              payload.site[field] = trimmedValue
          })
        }

        //set into payload site status changed value
        if (this.dirty.status) {
          if (!payload.site) payload.site = {}
          payload.site.status = this.$refs.status.$data.currentStatus
        }

        //set into payload all site contacts changed values
        if (this.dirty.contacts) {
          payload.contacts = [];

          (this.$refs.contacts.$refs.contact || []).forEach((contact, index) => { //loop over all contacts

            if (this.$refs.contacts.$data.dirty[index]) { //only if contact is dirty, need to set into payload the new contact with changed values

              const saveContact = {}
              this.contactFields.forEach(field => { //check on every field which field was changed.

                if (typeof contact.$data.currentItem[field] == 'boolean') {
                  if (this.site.contacts[index][field] !== contact.$data.currentItem[field])
                    saveContact[field] = siteService.opt_statuses[contact.$data.currentItem[field]]
                } else if (typeof contact.$data.currentItem[field] == 'string') {
                  const trimmedValue = (contact.$data.currentItem[field] || "").trim()
                  if ((this.site.contacts[index][field] || "").trim() !== trimmedValue)
                    saveContact[field] = trimmedValue
                }
              })

              if (Object.keys(saveContact).length) //only if saveContact object has at least one dirty field
                payload.contacts.push({...saveContact, contact_id: contact.$data.currentItem.contact_id})
            }
          })
        }

        await this.$api.trial.submitSite(this.token, payload)
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('saved'),
          type: 'info'
        });
        this.saved = true
      } catch (error) {
        this.$eventBus.$emit('toastMessageHandler', {
          message: this.$t('something_went_wrong'),
          type: 'error'
        });
      } finally {
        this.loading = false
      }

    }
  }
}
</script>