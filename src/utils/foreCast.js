const request = require('request')

const foreCast = (lat,long,callback)=>{
    const url = `https://api.darksky.net/forecast/d437655e6996fccf55978871e78cbcb6/${lat},${long}?units=si`
    request({url, json:true},(error,{ body })=>{
        if(error){
            callback('Network Problem', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, 
                // currentTemperature : response.body.currently.temperature,
                // rainProbability : response.body.currently.precipProbability
                `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`
            )
        }
    })
}

module.exports = foreCast