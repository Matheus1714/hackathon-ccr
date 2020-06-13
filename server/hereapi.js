const axios = require('axios');
const querystring = require('querystring');

function query (method, params){
    return method + querystring.stringify(params);
}

class HereAPI {
    constructor(apiKey){
        this.key = apiKey;
        this.geoCode = 'https://geocode.search.hereapi.com/v1/geocode?';
        this.discover = 'https://discover.search.hereapi.com/v1/discover?'
    }

    async searchGasStationsInRadius(lat,lng,radius){
        let params = {
            apiKey : this.key,
            in : `circle:${lat},${lng};r=${radius}`,
            q : 'gas station'
        };

        let response = await axios.get(query(this.discover,params));
        let positions = [];
        for (let item of response.data.items){
            positions.push(item.position);
        }
        return positions;
    }

    async searchGasStationsByAddress(address){
        let params = {
            apiKey : this.key,
            q : address
        };
        let response = await axios.get(query(this.geoCode,params));

        if(!response.data.items.length)
            return [];

        let pos = response.data.items[0].position;

        params = {
            at : `${pos.lat},${pos.lng}`,
            q : 'gas station',
            apiKey : this.key
        }

        response = await axios.get(query(this.discover,params));
        let positions = [];
        for (let item of response.data.items){
            positions.push(item.position);
        }
        return positions;
    }
}

module.exports = HereAPI;
