const axios = require('axios');
const querystring = require('querystring');

const mongo = require('./mongoapi');

const geoCodeStr = 'https://geocode.search.hereapi.com/v1/geocode?';
const discoverStr = 'https://discover.search.hereapi.com/v1/discover?';
const routeMatrixStr = 'https://matrix.route.ls.hereapi.com/routing/7.2/calculatematrix.json?mode=fastest;truck&';

class HereAPI {
    constructor(apiKey){
        this.key = apiKey;
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

        return await this.getStationsFromDB(response.data);
    }

    async searchManyGasStationsFrom(lat,lng,number=20){
        let params = {
            apiKey : this.key,
            at : `${lat},${lng}`,
            limit : number,
            q : 'gas station'
        };

        let response = await axios.get(query(discoverStr,params));

        return await this.getStationsFromDB(response.data);
    }

    async getStationsFromDB(data){
        let stations0 = data.items.map(stationFromDataItem);

        let ids = stations0.map(st => st.hereID);

        let stations = await mongo.searchManyStations({
            hereID : {$in : ids}
        });

        stations = await stations.toArray();

        ids = stations.map(st => st.hereID)

        if(stations.length != stations0.length){
            for (let i = stations0.length - 1; i >= 0; --i){
                if (ids.includes(stations0[i].hereID)){
                    stations0.splice(i,1);
                }
            }
            mongo.addManyStations(stations0);
            stations.push(...stations0);
        }

        return stations;
    }
}

function query (method, params){
    return method + querystring.stringify(params);
}

function stationFromDataItem(item){
    station = {
        hereID : item.id,
        position : item.position,
        access : item.access,
        title : item.title,
        address : item.address.label,
        contacts : item.contacts
    }

    station.ratings = {};
    station.comments = [];
    let labels = [
        'courtyard',
        'fuelprice',
        'attendance',
        'foodquality',
        'foodprice',
        'security',
        'bath'
    ]
    for (label of labels){
        station.ratings[label] = {
            mean : null,
            count : 0
        }
    }

    return station
}

module.exports = HereAPI;
