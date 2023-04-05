// Todas las operaciones relacionadas a Issues van aqui

const { getNextSequence, getDb } = require('./db')

// con esta se obtienen todos los issues, GET ALL
export async function issueListfromServer(): Promise<any[]> {
    const db = getDb()
    const issues = await db.collection('issues').find({}).toArray()
    return issues
}

// Crear un issue
export async function createIssue(newIssue: any): Promise<any> {
    let new_id = await getNextSequence('issues')
    newIssue.id = new_id
    newIssue.created = new Date()
    const db = getDb()
    const result = await db.collection('issues').insertOne(newIssue)
    const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId }) // lo busco y lo devuelvo para asegurar que anduvo
    return savedIssue
}
