import Router from 'vue-router'
import SiteForm from "../views/Site/SiteForm";
import {globalRoutes} from "../services/routes/consts";
import PageNotFound from "../views/Global/PageNotFound";
import Vue from 'vue'
import i18n from "../locallization/i18n";

Vue.use(Router)

const routes = [
    {
        path: '/:languageCode',
        name: globalRoutes.siteForm,
        component: SiteForm
    },
    {
        path: '*',
        name: globalRoutes.notFound,
        component: PageNotFound
    }
]

export function setLocalLang(router) {

    router.beforeEach((to, from, next) => {

        // use the language from the routing param or default language
        let language = to.params.languageCode;
        if (!language) {
            language = 'en'
        }

        // set the current language for i18n.
        i18n.locale = language
        next()
    })
}

export default new Router({
    mode: 'history',
    routes
})