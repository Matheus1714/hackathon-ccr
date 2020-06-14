/*
    Script for creating a demo starting database
    Warning : Only run this once
*/

const axios = require('axios');
const querystring = require('querystring');
const Client = require('mongodb').MongoClient;

const discoverStr = 'https://discover.search.hereapi.com/v1/discover?';

const api_key = process.env.HERE_API_KEY;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

buildDb();

async function buildDb (){
    let coords = [
        [-23.570143, -46.609720],
        [-23.601181, -46.558339],
        [-23.592298, -46.652396]
    ];

    let url = `mongodb://${username}:${password}@${host}:${port}`;

    let client = new Client(url,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    });

    await client.connect();

    for (let coord of coords){
        let params = {
            apiKey : api_key,
            in : `circle:${coord[0]},${coord[1]};r=2000`,
            q : 'gas station',
            limit : 100
        };

        let response = await axios.get(query(discoverStr,params));

        let stations = response.data.items.map(item => ({
            hereID : item.id,
            position : item.position,
            access : item.access,
            title : item.title,
            address : item.address.label,
            contacts : item.contacts
        }));

        stations = stations.map(item => completeStationProperties(item));

        await client
            .db('postoCerto')
            .collection('gasStations')
            .insertMany(stations);
    }

    client.close();
}

function completeStationProperties(station){
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

    return station;
}

function query (method, params){
    return method + querystring.stringify(params);
}
