import {queryDatabase} from './db'
import {User, InsertUserDto, UpdateUserDto} from '../models/user.model'


async function verifyUser(username:string, password:string): Promise<User[]> {
  const query = `SELECT username, password FROM user WHERE username = '${username}' AND password = '${password}'`

  const result = await queryDatabase<User>(query);

  return result.results;
}

async function createUser(user:InsertUserDto): Promise<User> {

  user.user_type = user.user_type || 1

  const query = `insert into user (username, password, email, mobile_number, type) 
                  values ("${user.username}","${user.password}","${user.email}","${user.mobile_number}", ${user.user_type})`

  await queryDatabase<void>(query);

  // Fetch the newly created user
   const fetchQuery = `SELECT * FROM user WHERE username = "${user.username}"`;
   const { results } = await queryDatabase<User>(fetchQuery);
  
      if (results.length === 0) {
        throw new Error('User not found'); // Throw an error if the user was not found
      }

  return results[0];
}

export default {verifyUser, createUser}