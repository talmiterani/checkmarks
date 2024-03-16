import {methods} from "./axios/axios";
import {getHeaders} from "./axios/service";

class CommentApi {
    constructor($http, headers) {
        this.$http = $http;
        this.headers = headers
    }
    async add(payload) {
        return await this.$http({
            url: '/v1/comments',
            method: methods.post,
            headers: this.headers,
            data: JSON.stringify(payload)
        })
    }
    async update(payload) {
        return await this.$http({
            url: '/v1/comments',
            method: methods.put,
            headers: this.headers,
            data: JSON.stringify(payload)
        })
    }
    async remove(postId) {
        return await this.$http({
            url: `/v1/comments/comment/${postId}`,
            method: methods.delete,
            headers: this.headers,
        })
    }
}
export {CommentApi}