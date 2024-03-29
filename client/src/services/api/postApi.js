import {methods} from "./axios/axios";
import {getHeaders} from "./axios/service";

class PostApi {
    constructor($http) {
        this.$http = $http;
    }

    async search(payload) {
        return await this.$http({
            url: '/v1/posts/search',
            method: methods.post,
            data: JSON.stringify(payload)
        })
    }
    async get(postId) {
        return await this.$http({
            url: `/v1/posts/post/${postId}`,
            method: methods.get,
        })
    }
    async add(payload) {
        const headers =  getHeaders()
        return await this.$http({
            url: '/v1/posts',
            method: methods.post,
            headers: headers,
            data: JSON.stringify(payload)
        })
    }
    async update(payload) {
        const headers =  getHeaders()

        return await this.$http({
            url: '/v1/posts',
            method: methods.put,
            headers: headers,
            data: JSON.stringify(payload)
        })
    }
    async remove(postId) {
        const headers =  getHeaders()
        return await this.$http({
            url: `/v1/posts/post/${postId}`,
            method: methods.delete,
            headers: headers,
        })
    }

}
export {PostApi}