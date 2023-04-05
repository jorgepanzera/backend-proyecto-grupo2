// En este modulo quedara solamente lo relacionado a la BD

require('dotenv').config()

// Desde archivo .env con default local
const url = process.env.DB_URL || `mongodb://0.0.0.0:27017/`
//const url = `mongodb://172.17.0.2:27017/`;
//const url = `mongodb://localhost:27017/`;
// Mongodb Atlas connection string - tiene pocas consultas
//const url = `mongodb+srv://admin:Ji9vfIASQ7NnFwN8@cluster0.30imzhm.mongodb.net`;

const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(url, { useNewUrlParser: true })

// conexion a la db
let db: any

// conectar a la BD
export async function connectToDb(database_name: string) {
    await client.connect()
    console.log('Connected to MongoDB at', url)
    db = client.db(database_name)
}

export async function getNextSequence(collection_name: string): Promise<number> {
    const result = await db
        .collection('counters')
        .findOneAndUpdate(
            { _id: collection_name },
            { $inc: { current: 1 } },
            { returnOriginal: false }
        )
    return result.value.current
}

export async function countCollectionDocuments(collection_name: string): Promise<number> {
    return await db.collection(collection_name).count()
}

// exponer el objeto db para que otros modulos trabajen con el
export function getDb() {
    return db
}

module.exports = { connectToDb, getNextSequence, getDb, countCollectionDocuments }
