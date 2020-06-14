const Client = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const {createHash} = require('crypto');

require('./check_environ')(['DB_USERNAME','DB_PASSWORD','DB_HOST','DB_PORT','HASH_SECRET']);

const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const secret = process.env.HASH_SECRET;

class MongoAPI {
    constructor(username, password, host, port){
        this.url = `mongodb://${username}:${password}@${host}:${port}`;
        this.client = new Client(this.url,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        this.client.connect((err) => {
            if (err) throw err;
            else console.log('Connected to database');
        });
    }

    async getConnection(){
        return new Promise ((resolve,reject) => {
            if (this.client.isConnected())
                resolve(this.client);
            else this.client.connect((err) => {
                if (err) resolve(null);
                else resolve(this.client);
            });
        });
    }

    async addStation(station){
        let client = await this.getConnection();
        if(!client) return null;

        let result = await client.db('postoCerto')
            .collection('gasStations')
            .insertOne(station);

        return result.insertedId;
    }

    async addManyStations(stations){
        let client = await this.getConnection();
        if(!client) return null;

        let result = await client.db('postoCerto')
            .collection('gasStations')
            .insertMany(stations);

        return result.insertedIds;
    }

    async searchManyStations (query){
        let client = await this.getConnection();
        if(!client) return null;

        let stations = await client.db('postoCerto')
            .collection('gasStations')
            .find(query);

        return stations;
    }

    async searchOneStation (query){
        let client = await this.getConnection();
        if(!client) return null;

        let station = await client.db('postoCerto')
            .collection('gasStations')
            .findOne(query);

        return station;
    }

    async updateStation (id,updateQuery){
        let client = await this.getConnection();
        if(!client) return false;

        let result = await client.db('postoCerto')
            .collection('gasStations')
            .updateOne({
                hereID : id
            }, updateQuery);

        return Boolean(result);
    }

    async addAvaliation (avaliation,userToken){
        let client = await this.getConnection();
        if(!client) return false;

        let result = await client.db('postoCerto')
            .collection('avaliations')
            .insertOne(avaliation);

        return Boolean(result);
    }

    async findUser (token) {
        let client = await this.getConnection();
        if(!client) return null;

        let user = await client.db('postoCerto')
            .collection('users')
            .findOne({
                _id : ObjectID(token)
            });

        return user;
    }

    async login (username, password){
        let client = await this.getConnection();
        if(!client) return null;

        let user = await client.db('postoCerto')
            .collection('users')
            .findOne({
                user : username,
                pass : hash(password)
            });

        return user;
    }

    async register (username, password){
        let client = await this.getConnection();
        if(!client) return null;

        let result = await client.db('postoCerto')
            .collection('users')
            .insertOne({
                user : username,
                pass : hash(password),
                avaliations : []
            });

        return result.insertedId;
    }
}

function hash (str){
    let hash = createHash('sha256');
    return hash.update(secret + str).digest('hex');
}

module.exports = new MongoAPI(user,pass,host,port);
