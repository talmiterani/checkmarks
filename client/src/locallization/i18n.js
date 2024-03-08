import en from './public/en-us/messages';
import es from './public/es-es/messages';
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const messages = {
    en: en,
    es: es
};

Vue.use(VueI18n)

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: messages
})
