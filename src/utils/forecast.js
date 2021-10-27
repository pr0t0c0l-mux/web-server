const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=782d7fa9d27dec60baea9647b37f04d5&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)

      } else if (body.error) {
            callback('Unable to find location.', undefined)

      } else {
            callback(undefined, body.current.weather_descriptions[0] +  ' '  +  body.current.temperature + ' °C. But it feels like ' + body.current.feelslike + ' °C.')
      }

    })
}

module.exports = forecast