const axios = require('axios');
const querystring = require('querystring');

const mongo = require('./mongoapi');

const geoCodeStr = 'https://geocode.search.hereapi.com/v1/geocode?';
const discoverStr = 'https://discover.search.hereapi.com/v1/discover?';
const routeMatrixStr = 'https://matrix.route.ls.hereapi.com/routing/7.2/calculatematrix.json?mode=fastest;truck&';
const autoCompleteStr = 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?'

class HereAPI {
    constructor(apiKey){
        this.key = apiKey;
    }

    async geoCode (address){
        let params = {
            apiKey : this.key,
            q : address
        };

        return await getRequest(geoCodeStr,params);;
    }

    async autoComplete (string){
        let params = {
            apiKey : this.key,
            query : string,
            maxresults : 5
        }

        let response = await getRequest(autoCompleteStr, params);

        return response ? response.data.suggestions : null;
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

        let response = await getRequest(routeMatrixStr,params);

        return response ? response.data.response.matrixEntry : null;
    }

    async searchGasStationsInRadius(lat,lng,radius){
        let params = {
            apiKey : this.key,
            in : `circle:${lat},${lng};r=${radius}`,
            q : 'gas station'
        };

        let response = await getRequest(discoverStr,params);

        return reponse ? await this.getStationsFromDB(response.data) : null;
    }

    async searchManyGasStationsFrom(lat,lng,number=20){
        let params = {
            apiKey : this.key,
            at : `${lat},${lng}`,
            limit : number,
            q : 'gas station'
        };

        let response = await getRequest(discoverStr,params);

        if(!response) return null;

        return await this.getStationsFromDB(response.data);
    }

    async getStationsFromDB(data){
        let stations0 = data.items.map(stationFromDataItem);

        let ids = stations0.map(st => st.hereID);

        let stations = await mongo.searchManyStations({
            hereID : {$in : ids}
        });

        if (!stations) return null;

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

// Auxiliary functions
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

async function getRequest(method, params){
    try{
        return await axios.get(method + querystring.stringify(params));
    }
    catch (err) {
        return null;
    }
}

module.exports = HereAPI;
