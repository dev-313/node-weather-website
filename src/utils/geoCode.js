const request = require('request')


const geoCode = (address,callback) => {

    const accessToken = 'pk.eyJ1IjoiZGV2LTMxMyIsImEiOiJjano3bHc5bXAwNDMwM21wa3QxanhqZGVuIn0.3MeNg6uEmdnanizYvvtndQ'

    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}&limit=1`

    request({url:mapboxUrl, json:true}, (error,{ body }={})=>{
        if(error){
            callback('Check your internet connection', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        } 
        else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                placeName : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode