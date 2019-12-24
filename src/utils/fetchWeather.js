const request = require('request');
const chalk = require('chalk');

const fetchWeather = (latitude, longitude, callback) =>
{
    const url = 'https://api.darksky.net/forecast/f49743d60a71982ecac1ad2277b3ca2f/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body})=>
    {
        if (error)
            callback('unable to connect to weather service');
        else if (body.error)
            callback('Unable to find location.');
        else 
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees outside. Today InchaAllah the high will be ' + body.daily.data[0].temperatureHigh + ' degrees, with a low of ' + body.daily.data[0].temperatureLow + ' degrees. There is a ' + body.currently.precipProbability + '% chance of rain.')
    })
}

module.exports = fetchWeather;
