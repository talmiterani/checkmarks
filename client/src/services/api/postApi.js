import {methods} from "./axios/axios";

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
        return await this.$http({
            url: '/v1/posts',
            method: methods.post,
            data: JSON.stringify(payload)
        })
    }
    async update(payload) {
        return await this.$http({
            url: '/v1/posts',
            method: methods.put,
            data: JSON.stringify(payload)
        })
    }
    async remove(postId) {
        return await this.$http({
            url: `/v1/posts/post/${postId}`,
            method: methods.delete,
        })
    }

}
export {PostApi}