import axios from 'axios';
import {UserApi} from "../userApi";
import {CommentApi} from "../commentApi";
import {PostApi} from "../postApi";


export function apiFactory() {

    const env = require('../../../../config/local.env')

    const $http = axios.create({
        baseURL: env.API_URL
    });

    return {
        user: new UserApi($http),
        post: new PostApi($http),
        comment: new CommentApi($http)
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

export const methods = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE"
 }