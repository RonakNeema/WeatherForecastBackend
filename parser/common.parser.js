class CommonParser {
    // function to get hte average coordinates
    async getCoordinates(coordinates) {
        let log = 0
        let lat = 0
        coordinates.forEach(element => {
            log += element[0]
            lat += element[1]
        });
        log = log / coordinates.length
        lat = lat / coordinates.length
        return (`${lat},${log}`)
    }

    // to parse the forecast data
    async parseForecastData(forecastData) {
        const periodData = forecastData?.properties.periods
        const dateWiseData = await this.getDateWiseData(periodData)
        return dateWiseData
    }

    // split and map the data date wise
    async getDateWiseData(periodData) {
        const dateWiseData = []
        let currentDateData = []
        let currentDate = ''
        periodData?.forEach(period => {
            const periodDate = new Date(period.startTime).toLocaleDateString()
            if (currentDate === '' || currentDate != periodDate) {
                if (currentDate) dateWiseData.push({ date: currentDate, currentDateData })
                currentDateData = []
                currentDate = new Date(period.startTime).toLocaleDateString()
                currentDateData.push(period)
            }
            else {
                currentDateData.push(period)
            }
        })
        console.log(dateWiseData)
        return dateWiseData
    }
}
module.exports = CommonParser