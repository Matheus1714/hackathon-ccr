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

    async searchGasStationsByAddress(address){
        let params = {
            apiKey : this.key,
            q : address
        };
        let response = await axios.get(query(this.geoCode,params));

        let pos = response.data.items[0].position;
        // console.log(response.data);

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
