const mongoose = require('mongoose');
const { DB_URL } = require('./Keys')

const connectDb = async () => {
    try {
        mongoose.connect(DB_URL);
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;