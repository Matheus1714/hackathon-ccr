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
    return : {
        pivot : searched address,
        [nearby] : if pivot is not a gas station, a list of the closest gas stations
    }
}
*/
app.post('/searchbyaddress/', async (req,res) => {
    let address = req.body.address;
    let radius = req.body.radius;

    if (!address) return res.json(null);

    let response = await here.geoCode(address);

    if(!response)
        return res.json(null);

    if (!response.data.items.length)
        return res.json({});

    let first = response.data.items[0];

    let lat = first.position.lat;
    let lng = first.position.lng;

    let stations;

    if (radius)
        stations = await here.searchGasStationsInRadius(lat,lng,radius);
    else
        stations = await here.searchManyGasStationsFrom(lat,lng);

    let res_json;

    if (first.id === stations[0].hereID){
        res_json = {
            pivot : stations[0]
        };
    }
    else {
        res_json = {
            pivot : {
                address : first.address.label,
                position : first.position
            },
            nearby : stations
        };
    }

    return res.json(res_json);
});

/*
    body : lat, lng
    return : list of 10 nearest gas stations from (lat,lng) considering truck traveling
*/
app.post('/nearby/', async(req,res) => {
    let pos = {
        lat : req.body.lat,
        lng : req.body.lng
    }

    if (!(pos.lat && pos.lng)) return res.json(null);

    let gasStations = await here.searchManyGasStationsFrom(pos.lat,pos.lng);

    if(!gasStations)
        return res.json(null);

    let destinations = gasStations.map(station => station.position);

    let matrix = await here.routeMatrix([pos],destinations);

    if (!matrix)
        return res.json(null);

    matrix.sort((a,b) => a.summary.costFactor - b.summary.costFactor);

    let nearby = matrix.map(el => gasStations[el.destinationIndex]);

    let unique = [];

    for (let i = nearby.length - 1; i >= 0; --i){
        if (unique.includes(nearby[i].address)){
            nearby.splice(i,1);
        }
        else unique.push(nearby[i].address);
    }

    nearby = nearby.slice(0,10);

    console.log(nearby.map(el => el.address));

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

    mongo.addAvaliation(avaliation, req.cookies.c_user);

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
