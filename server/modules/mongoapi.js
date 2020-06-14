const Client = require('mongodb').MongoClient;

class MongoAPI {
    constructor(username, password, host, port){
        this.url = `mongodb://${username}:${password}@${host}:${port}`;
        this.client = new Client(this.url,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        this.client.connect((err,client) => {
            if (err) throw err;
            else console.log('Connected to database');
        });
    }

    async getConnection(){
        return new Promise ((resolve,reject) => {
            if (this.client.isConnected())
                resolve(this.client);
            else this.client.connect((err,client) => {
                if (err) throw err;
                else resolve(client);
            });
        });
    }

    async addStation(station){
        completeStationProperties(station);
        let client = await this.getConnection();
        let result = await client.db('postoCerto')
            .collection('gasStations')
            .insertOne(station);

        return result.insertedId;
    }

    async searchManyStations (query){
        let client = await this.getConnection();
        let stations = await client.db('postoCerto')
            .collection('gasStations')
            .find(query);

        return stations;
    }

    async searchOneStation (query){
        let client = await this.getConnection();
        let station = await client.db('postoCerto')
            .collection('gasStations')
            .findOne(query);

        return station;
    }
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
        stations[label] = {
            rating : null,
            count : 0
        }
    }
}

module.exports = MongoAPI;
