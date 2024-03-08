class TrialApi {
    constructor($http) {
        this.$http = $http;
    }
    async getStatuses(token) {
        return await this.$http({
            url: `/token/${token}/trials/statusList`,
            method: 'GET'
        })
    }

    async getSite(token) {
        return await this.$http({
            url: `/token/${token}/trials/trial/site`,
            method: 'GET',
        })
    }
    async submitSite(token, payload) {
        return await this.$http({
            url: `/token/${token}/trials/trial/site`,
            method: 'POST',
            data: JSON.stringify(payload)
        })
    }
}

export {TrialApi}