class UserApi {
    constructor($http) {
        this.$http = $http;
    }

    async login(payload) {
        return await this.$http({
            url: '/users/login',
            method: 'POST',
            data: JSON.stringify(payload)
        })
    }
    async signup(payload) {
        return await this.$http({
            url: '/users/signup',
            method: 'POST',
            data: JSON.stringify(payload)
        })
    }
}
export {UserApi}