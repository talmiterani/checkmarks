class GlobalApi {
    constructor($http) {
        this.$http = $http;
    }

    async getCountriesBw() {
        return await this.$http({
            url: '/v1/countries/bw',
            method: 'GET'
        })
    }

    async getCountriesStates() {
        return await this.$http({
            url: 'v1/countriesStates',
            method: 'GET'
        })
    }

}

export {GlobalApi}