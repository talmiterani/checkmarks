import axios from 'axios';
import {TrialApi} from "../TrialApi";
import {GlobalApi} from "../globalApi";


export function apiFactory() {

    const env = require('../../../../config/local.env')

    const $http = axios.create({
        baseURL: env.API_URL
    });

    return {
        trial: new TrialApi($http),
        global: new GlobalApi($http)

    }

}

// register $api as vue plugin
export function RegisterApi($api) {
    return {
        install(vue) {
            vue.prototype.$api = $api;
        }
    };
}