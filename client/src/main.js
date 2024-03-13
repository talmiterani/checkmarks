import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {apiFactory, RegisterApi} from './services/api/axios/axios';
import {EventBusPlugin} from "./plugins/eventBus";
import router, {setLocalLang} from './router/index'
import i18n from "./locallization/i18n";


Vue.use(Vuetify)

const $api = apiFactory();
Vue.use(RegisterApi($api));
Vue.use(EventBusPlugin);

setLocalLang(router)

new Vue({
    vuetify: new Vuetify({
        icons: {
            iconfont: 'mdiSvg'
        },
    }),
    $api,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');


