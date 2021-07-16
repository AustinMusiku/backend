const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

module.exports = new MongoClient(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
