class UserApi {
    constructor($http) {
        this.$http = $http;
    }

    async signup(payload) {
        return await this.$http({
            url: 'v1/users/signup',
            method: 'POST',
            data: JSON.stringify(payload)
        })
    }
    async login(payload) {
        return await this.$http({
            url: 'v1/users/login',
            method: 'POST',
            data: JSON.stringify(payload)
        })
    }
}
export {UserApi}