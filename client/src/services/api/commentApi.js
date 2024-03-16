import {methods} from "./axios/axios";
import {getHeaders} from "./axios/service";

class CommentApi {
    constructor($http) {
        this.$http = $http;
    }
    async add(payload) {
        const headers =  getHeaders()
        return await this.$http({
            url: '/v1/comments',
            method: methods.post,
            headers: headers,
            data: JSON.stringify(payload)
        })
    }
    async update(payload) {
        const headers =  getHeaders()
        return await this.$http({
            url: '/v1/comments',
            method: methods.put,
            data: JSON.stringify(payload),
            headers: headers,
        })
    }
    async remove(postId) {
        const headers =  getHeaders()
        return await this.$http({
            url: `/v1/comments/comment/${postId}`,
            method: methods.delete,
            headers: headers,
        })
    }
}
export {CommentApi}