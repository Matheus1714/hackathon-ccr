const express = require('express');
const HereAPI = require('./modules/hereapi');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongo = require('./modules/mongoapi');

require('./modules/check_environ')(['HERE_API_KEY']);

let key = process.env.HERE_API_KEY;

const here = new HereAPI(key);

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan('dev'));

/*
    body: address, [radius]
    return : list of gas stations near address
*/
app.post('/searchbyaddress/', async (req,res) => {
    let address = req.body.address;
    let radius = req.body.radius;

    if (!address) return res.json(null);

    let response = await here.geoCode(address);

    if(!response)
        return res.json(null);

    if (!response.data.items.length)
        return res.json([]);

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
    body : lat, lng
    return : list of 5 nearest gas stations
*/
app.post('/nearby/', async(req,res) => {
    let pos = {
        lat : req.body.lat,
        lng : req.body.lng
    }

    if (!(pos.lat && pos.lng)) return res.json(null);

    let gasStations = await here.searchManyGasStationsFrom(pos.lat,pos.lng,10);

    if(!gasStations)
        return res.json(null);

    let destinations = gasStations.map(station => station.position);

    let matrix = await here.routeMatrix([pos],destinations);

    if (!matrix)
        return res.json(null);

    matrix.sort((a,b) => a.summary.costFactor - b.summary.costFactor);

    let nearby = matrix.map(el => gasStations[el.destinationIndex]).slice(0,5);

    return res.json(nearby);
});

/*
    body: hereID, ratings [,comment]
    return : true if the submition worked
*/
app.post('/submitavaliation/', async(req,res) => {
    let avaliation = req.body;

    let station = await mongo.searchOneStation({
        hereID : avaliation.hereID
    });
    for (let r in avaliation.ratings){
        if (!(r in station.ratings)) continue;


        let mean = station.ratings[r].mean;
        let count = station.ratings[r].count;
        station.ratings[r].count ++;
        let new_mean = (mean*count + avaliation.ratings[r])/(count+1);

        station.ratings[r].mean = new_mean;
    }

    let updateQuery = {
        $set : {ratings : station.ratings}
    };

    mongo.addAvaliation(avaliation);

    if(avaliation.comment){
        updateQuery.$push = {
            comments : {
                $each : [avaliation.comment],
                $position : 0,
                $slice : 10
            }
        }
    }

    let updated = await mongo.updateStation(station.hereID, updateQuery);

    return res.json(updated);
});

/*
    body : string
    return : list of 5 or less suggestions
*/
app.post('/autocomplete', async (req,res) => {
    if (!req.body.string) return null;
    let suggestions = await here.autoComplete(req.body.string);
    return res.json(suggestions);
});

app.listen(9090, () => {
    console.log('Server Started');
});
