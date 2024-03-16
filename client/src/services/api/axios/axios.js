import axios from 'axios';
import {UserApi} from "../userApi";
import {CommentApi} from "../commentApi";
import {PostApi} from "../postApi";
import {getHeaders} from "./service";


export function apiFactory() {

    const env = require('../../../../config/local.env')
    const headers = getHeaders()

    const $http = axios.create({
        baseURL: env.API_URL
    });

    return {
        user: new UserApi($http),
        post: new PostApi($http, headers),
        comment: new CommentApi($http, headers)
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