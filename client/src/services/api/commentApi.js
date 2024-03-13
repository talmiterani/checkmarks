import {methods} from "./axios/axios";

class CommentApi {
    constructor($http) {
        this.$http = $http;
    }

    async getByPostId(postId) {
        return await this.$http({
            url: `/v1/comments/${postId}`,
            method: methods.get,
        })
    }
    async add(payload) {
        return await this.$http({
            url: '/v1/comments',
            method: methods.post,
            data: JSON.stringify(payload)
        })
    }
    async update(payload) {
        return await this.$http({
            url: '/v1/comments',
            method: methods.put,
            data: JSON.stringify(payload)
        })
    }
    async remove(postId) {
        return await this.$http({
            url: `/v1/comments/comment/${postId}`,
            method: methods.delete,
        })
    }
}
export {CommentApi}