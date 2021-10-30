const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=21a1de0c9a35faed48a0ad152e7eb0f6&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)

      } else if (body.error) {
            callback('Unable to find location.', undefined)

      } else {
            callback(undefined, body.current.weather_descriptions[0]  +  ' '  +  body.current.temperature + '°C.')
      }
    })
}

module.exports = forecast