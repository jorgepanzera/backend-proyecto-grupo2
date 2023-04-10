import {pool, queryDatabase} from './db'
import {User} from '../models/inter'


async function verifyUser(username:string, password:string): Promise<User[]> {
  const query = `SELECT username, password FROM user WHERE username = '${username}' AND password = '${password}'`

  const result = await queryDatabase<User>(query);

  return result.results;
}

export default {verifyUser}