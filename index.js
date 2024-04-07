const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;
const ForecastService = require("./services/forecast-service");
const forecastService = new ForecastService();

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//  API to get the locations of a state with state id
app.get('/api/getLocations/state/:id', async (req, res) => {
  // data = fs.
  data = req?.params
  const getLocations = await forecastService.getLocations(data?.id);
  res.json({ message: `Hello, World!`, data: getLocations });
});

// API to get the forecast data
app.get('/api/getLocationDetails/:id', async (req, res) => {
  locationId = req?.params?.id
  console.log(locationId)
  const forecastData = await forecastService.getForecast(locationId)
  res.send({ message: "Forecast Data", data: forecastData }).status(200)
})

