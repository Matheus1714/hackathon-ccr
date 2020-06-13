const express = require('express');
const HereAPI = require('./hereapi')
const cors = require('cors')

let KEY = process.env.HERE_API_KEY;

const app = express();
const here = new HereAPI(KEY);

app.use(cors())

app.get('/searchbyaddress', async (req,res) => {
    let address = req.query.address;
    let positions = await here.searchGasStationsByAddress(address);

    return res.send(JSON.stringify(positions));
});

app.listen(9090, () => {
    console.log('Server Started');
});
