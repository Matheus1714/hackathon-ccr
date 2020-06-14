const express = require('express');
const HereAPI = require('./hereapi');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

let key = process.env.HERE_API_KEY;

const here = new HereAPI(key);

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/*
    body: address, [radius]
    return : list of gas stations near address
*/
app.post('/searchbyaddress/', async (req,res) => {
    let address = req.body.address;
    let radius = req.body.radius;

    let response = await here.geoCode(address);

    if (!response.data.items.length) return res.json([]);

    let pos = response.data.items[0].position

    let lat = pos.lat;
    let lng = pos.lng;

    let positions;

    if (radius)
        positions = await here.searchGasStationsInRadius(lat,lng,radius);
    else
        positions = await here.searchManyGasStationsFrom(lat,lng);

    return res.json(positions);
});

/*
    body: lat, lng
    return : list of 5 nearest gas stations
*/
app.post('/nearby/', async(req,res) => {
    let pos = {
        lat : req.body.lat,
        lng : req.body.lng
    }

    let gasStations = await here.searchManyGasStationsFrom(pos.lat,pos.lng,10);

    let destinations = gasStations.map(station => station.position);

    let matrix = await here.routeMatrix([pos],destinations);

    matrix.sort((a,b) => a.summary.costFactor - b.summary.costFactor);

    let nearby = matrix.map(el => gasStations[el.destinationIndex]).slice(0,5);

    return res.json(nearby);
});

app.listen(9090, () => {
    console.log('Server Started');
});
