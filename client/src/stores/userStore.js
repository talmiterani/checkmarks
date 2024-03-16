import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

export const useUserStore = new Vuex.Store({
    state: {
        token: "",
        userId: "",
        username: ""
    },
    mutations: {
        setToken (state, token) {
            state.token = token
        },
        setUserId (state, userId) {
            state.userId = userId
        },
        setUsername (state, username) {
            state.username= username
        }
    },
    actions: {
        setToken ({commit}, token) {
            commit('setToken', token)
        },
        setUserId ({commit}, userId) {
            commit('setUserId', userId)
        },
        setUsername ({commit}, username) {
            commit('setUsername', username)
        }
    },
    getters: {
        getToken: state => {
            return state.token
        },
        getUserId: state => {
            return state.userId
        },
        getUsername: state => {
            return state.username
        }
    }
})