import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

export const useUserStore = new Vuex.Store({
    state: {
        token: "",
        userId: ""
    },
    mutations: {
        setToken (state, token) {
            state.token = token
        },
        setUserId (state, userId) {
            state.userId = userId
        }
    },
    actions: {
        setToken ({commit}, token) {
            commit('setToken', token)
        },
        setUserId ({commit}, userId) {
            commit('setUserId', userId)
        }
    },
    getters: {
        getToken: state => {
            return state.token
        },
        getUserId: state => {
            return state.userId
        }
    }
})