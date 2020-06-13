const axios = require('axios');
const querystring = require('querystring');

class HereAPI {
    constructor(apiKey){
        this.key = apiKey;
        this.geoCodeStr = 'https://geocode.search.hereapi.com/v1/geocode?';
        this.discoverStr = 'https://discover.search.hereapi.com/v1/discover?'
    }

    async geoCode (address){
        let params = {
            apiKey : this.key,
            q : address
        };
        let response = await axios.get(query(this.geoCodeStr,params));

        return response;
    }

    async searchGasStationsInRadius(lat,lng,radius){
        let params = {
            apiKey : this.key,
            q : 'gas station'
        };

        let response = await axios.get(query(this.discoverStr,params) + `&in=circle:${lat},${lng};r=${radius}`);

        let positions = [];
        for (let item of response.data.items){
            let gasStation = filterGasStationInfo(item);
            positions.push(gasStation);
        }
        return positions;
    }
}

function query (method, params){
    return method + querystring.stringify(params);
}

function filterGasStationInfo(item){
    return {
        hereID : item.id,
        title : item.title,
        position : item.position,
        rating : Math.round(50*Math.random())/10 // placeholder
    }
}

module.exports = HereAPI;
