const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&units=metric&appid=b65ded0d5682ae5cb990f6d2201591e0'

    // destructing => response -> { body}  (coz we only using body)
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.list[0].weather[0].description+'..!!! It is currently ' + body.list[0].main.temp + ' degress out. There is a ' + JSON.stringify(body.list[0].pop) + '% chance of rain.')
        }
    })
}

module.exports = forecast;

    
