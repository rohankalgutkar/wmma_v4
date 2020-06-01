const MongoClient = require('mongodb').MongoClient;

// Connection URL
const connectionURL = process.env.MongoDB_URI || 'mongodb://127.0.0.1:27017/wmma_v4';

// Database Name
const dbName = 'wmma_v4';

const connect = async () => {
    const client = await MongoClient.connect(connectionURL, {
            useUnifiedTopology: true
        })
        .catch(err => {
            console.log(err);
        });

    if (!client) {
        return {
            error: true,
            msg: "There's an issue with the service, please try again later!"
        };
    }

    const db = client.db(dbName)

    return db
}

module.exports = {connect};