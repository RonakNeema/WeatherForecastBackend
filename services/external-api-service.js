var axios = require('axios');

class ExternalAPIService {
    // function to call api to get the list of all stations/counties in a zone with area code
    async getStations(areaCode) {
        return await axios.get('https://api.weather.gov/zones?area=' + areaCode + '&type=county')
            .then(function (response) {
                return response.data.features;
            }).catch((response) => {
                console.log("err", response)
            });
    }

    // function to call api to get the Zone Data
    async getZoneDaa(id) {
        return await axios.get(`https://api.weather.gov/zones/county/${id}`)
            .then(function (response) {
                return response.data;
            }).catch((response) => {
                console.log("err", response)
            });
    }

    // function to call api to get the points of a given coordinates
    async getPointData(coordinates) {
        return await axios.get(`https://api.weather.gov/points/${coordinates}`)
            .then(function (response) {
                return response.data;
            }).catch((response) => {
                console.log("err", response)
            }
            );
    }

    // function to get the forecast data
    async getForecastData(url) {
        return await axios.get(url)
            .then(function (response) {
                return response.data;
            }).catch((response) => {
                console.log("err", response)
            }
            );
    }

}
module.exports = ExternalAPIService