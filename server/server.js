const express = require('express');
const HereAPI = require('./hereapi')

const app = express();

KEY = process.env.HERE_API_KEY;

const here = HereAPI(KEY);

app.get('/searchbyaddress', async (req,res) => {
    let address = req.query.address;
    let positions = await here.searchGasStationsByAddress(address);

    return req.send(JSON.stringify(positions));
});

app.listen(9090, () => {
    console.log('Server Started');
});
