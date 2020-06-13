const express = require('express');
const HereAPI = require('./hereapi');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

let key = process.env.HERE_API_KEY;

const here = new HereAPI(key);

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/searchbyaddress/', async (req,res) => {
    let address = req.body.address;
    let radius = req.body.radius;

    if (!radius) radius = 1000;

    let response = await here.geoCode(address);

    if (!response.data.items.length) return res.json([]);

    let pos = response.data.items[0].position

    let lat = pos.lat;
    let lng = pos.lng;

    let positions = await here.searchGasStationsInRadius(lat,lng,radius);

    return res.json(positions);
});

app.listen(9090, () => {
    console.log('Server Started');
});
