const database = require('../config/database');
const {ObjectId} = require('mongodb');

async function getAllCities() {
    const db = await database.connect();
    return db.collection('cinemaCatalog').find({}, { cidade: 1, uf: 1, pais: 1 }).toArray();
}



module.exports = { getAllCities }