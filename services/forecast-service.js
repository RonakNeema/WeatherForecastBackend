const stateList = require("../enum/states.enum");
const CommonParser = require("../parser/common.parser");
const ExternalAPIService = require("./external-api-service")
const externalAPIService = new ExternalAPIService();
const commonParser = new CommonParser
class ForecastService {


   async getLocations(state) {
      if (Object.values(stateList).includes(state)) {
         var stateData = await externalAPIService.getStations(state)
         return stateData
      }
      else {
         return { state: "404", message: "State is wrong" }
      }
   }


   async getForecast(id) {
      // get the zone data with all coordinates
      const zoneData = await externalAPIService.getZoneDaa(id)
      // parse the coordinates
      const coordinates = await commonParser.getCoordinates(zoneData?.geometry?.coordinates[0])
      // get the designated grid points of the coordinates
      const pointData = await externalAPIService.getPointData(coordinates)
      // get the daily forecast data with the grid points
      const dailyForecastData = await externalAPIService.getForecastData(pointData?.properties?.forecast)
      // parse the forecast data to send to UI
      const forecastData = await commonParser.parseForecastData(dailyForecastData)
      return forecastData
   }
}



module.exports = ForecastService;