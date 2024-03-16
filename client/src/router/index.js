import Router from 'vue-router'
import {globalRoutes} from "../services/routes/consts";
import PageNotFound from "../views/Global/PageNotFound";
import Vue from 'vue'
import i18n from "../locallization/i18n";
import SignUp from "../components/Users/SignUp.vue";
import Login from "../components/Users/Login.vue";
import PostsList from "../components/Posts/PostsList.vue";
import PostView from "../components/Posts/PostView.vue";
import UserPosts from "../components/Posts/UserPosts.vue";
import {useUserStore} from "../stores/userStore";

Vue.use(Router)

const routes = [
    {
        path: '/login',
        name: globalRoutes.login,
        component: Login
    },
    {
        path: '/signup',
        name: globalRoutes.signUp,
        component: SignUp
    },
    {
        path: '/',
        redirect: '/posts', // Redirect root path to '/posts'
    },
    {
        path: '/posts',
        name: globalRoutes.posts,
        component: PostsList,
    },
    {
        path: '/posts/:post_id',
        name: globalRoutes.post,
        component: PostView,
    },
    {
        path: '/userPosts',
        name: globalRoutes.userPosts,
        component: UserPosts,
        beforeEnter: (to, from, next) => {
            if (useUserStore.getters.getToken) {
                next();
            } else {
                next({ name: globalRoutes.login });
            }
        }
    },
    // {
    //     path: '/:languageCode',
    //     name: globalRoutes.siteForm,
    //     component: SiteForm,
    //     children: [
    //         ]
    // },

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