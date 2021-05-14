const request = require("postman-request");

const apikeymb =
    "pk.eyJ1IjoiY2x5ZGVlIiwiYSI6ImNrb2EyaXR5YjJmMzUydmpubndlOHp0Z2sifQ.1VlHQpukYXCkoOwn2b52tw";

const apikeyws = "e69e00a531aad78f10e2f294565a52fa";


const geoCode = (location, callback) => {

    //setTimeout(() => {
    const urlmb =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(location) +
        ".json?access_token=" +
        apikeymb;
    request(
        { method: "GET", json: true, url: urlmb },
        function (error, _response, { features }) {

            if (error) {
                callback(undefined, { 'error': 'Unable to connect to Geo service' });
            } else {
                //console.log(features[0].center[1])
                if (features != undefined && features.length > 1) {
                    callback({
                        lattitude: features[0].center[1],
                        longitude: features[0].center[0],
                        address: features[0].place_name
                    }, undefined)
                } else {
                    callback(undefined, { 'error': 'Geo location is invalid' });
                }
            }
        }
    );
    //}, 0)
}

const weather = (latlong, callback) => {
    //setTimeout(() => {
    const urlws =
        "http://api.weatherstack.com/current?access_key=" +
        apikeyws +
        "&query=" +
        latlong +
        "&units=m";

    //console.log(urlws)
    request(
        { method: "GET", json: true, url: urlws },
        function (error, response, { current, location }) {
            if (error) {
                callback(undefined, { 'error': 'Unable to connect to weather service' });
            } else {
                if (current != undefined) {
                    callback(
                        {
                            'description': current.weather_descriptions[0],
                            'temprature': current.temperature,
                            'feels': current.feelslike,
                            'location': location.name

                        }, undefined);
                } else {
                    callback(undefined, { 'error': 'Weather location is invalid' });
                }
            }
        }
    );
    //}, 2000)
}


module.exports = {
    geoCode: geoCode,
    weather: weather
}