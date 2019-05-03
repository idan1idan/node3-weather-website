const request = require('request') 

const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4e04b2f6aa892803f169e0257c05a465/'+ latitude +',' + longitude +'?units=auto';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather services!", undefined);
        }else if (body.error) {
            callback("Unable to find location", undefined);
        }else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipPropability: body.currently.precipProbability

            })
        }
    })
}

module.exports = forcast