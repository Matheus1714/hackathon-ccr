const axios = require('axios');
const querystring = require('querystring');

const MongoAPI = require('./mongoapi');

const geoCodeStr = 'https://geocode.search.hereapi.com/v1/geocode?';
const discoverStr = 'https://discover.search.hereapi.com/v1/discover?';
const routeMatrixStr = 'https://matrix.route.ls.hereapi.com/routing/7.2/calculatematrix.json?mode=fastest;truck&';

const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

class HereAPI {
    constructor(apiKey){
        this.key = apiKey;
        this.mongo = new MongoAPI(user,pass,host,port);
    }

    async geoCode (address){
        let params = {
            apiKey : this.key,
            q : address
        };
        let response = await axios.get(query(geoCodeStr,params));

        return response;
    }

    async routeMatrix(starts,destinations){
        let params = {
            apiKey : this.key
        }

        for (let i in starts){
            let pos = starts[i];
            params['start' + i] = `geo!${pos.lat},${pos.lng}`;
        }

        for (let i in destinations){
            let pos = destinations[i];
            params['destination' + i] = `geo!${pos.lat},${pos.lng}`;
        }

        let response = await axios.get(query(routeMatrixStr,params));

        return response.data.response.matrixEntry;
    }

    async searchGasStationsInRadius(lat,lng,radius){
        let params = {
            apiKey : this.key,
            in : `circle:${lat},${lng};r=${radius}`,
            q : 'gas station'
        };

        let response = await axios.get(query(discoverStr,params));

        let ids = response.data.items.map(item => item.id);

        let stations = await this.mongo.searchManyStations({
            hereID : {$in : ids}
        });

        return stations.toArray();
    }

    async searchManyGasStationsFrom(lat,lng,number=20){
        let params = {
            apiKey : this.key,
            at : `${lat},${lng}`,
            limit : number,
            q : 'gas station'
        };

        let response = await axios.get(query(discoverStr,params));

        let ids = response.data.items.map(item => item.id);

        let stations = await this.mongo.searchManyStations({
            hereID : {$in : ids}
        });

        return stations.toArray();
    }
}

function query (method, params){
    return method + querystring.stringify(params);
}

module.exports = HereAPI;