const request = require('request')

const geocode = (address, callback) => {
    
    // ES6 Shorend property syntax
    // destructing => response -> { body}  (coz we only using body)
    const url = 'http://api.openweathermap.org/geo/1.0/direct?q='+address+'&appid=b65ded0d5682ae5cb990f6d2201591e0'
    
    request({ url, json: true }, (error, {body} ) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: 'Location : ' +body[0].name +','+body[0].state+','+body[0].country 
            })
        }
    })
}

module.exports = geocode