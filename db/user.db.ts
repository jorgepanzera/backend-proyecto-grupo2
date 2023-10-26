import {queryDatabase} from './db';
import {User, InsertUserDto, UpdateUserDto} from '../models/user.model';
import { generateUUID } from '../utils/generate_uuid';


async function verifyUser(email:string, password:string): Promise<UpdateUserDto[]> {
  const query = `SELECT username, password, email FROM user WHERE email = '${email}' AND password = '${password}'`

  const result = await queryDatabase<UpdateUserDto>(query);

  return result.results;
}

async function createUser(user:InsertUserDto): Promise<User> {

  const user_id = generateUUID();
  user.user_type = user.user_type || 1
  user.mobile_number = user.mobile_number || ""

  const query = `insert into user (user_id, username, password, email, mobile_number, type) 
                  values ( "${user_id}", "${user.username}","${user.password}","${user.email}","${user.mobile_number}", ${user.user_type})`

  await queryDatabase<void>(query);

  // Fetch the newly created user
   const fetchQuery = `SELECT * FROM user WHERE username = "${user.username}"`;
   const { results } = await queryDatabase<User>(fetchQuery);
  
      if (results.length === 0) {
        throw new Error('User not found'); // Throw an error if the user was not found
      }

  return results[0];
}


async function getUser(username:string): Promise<User> {

  // Fetch the newly created user
   const fetchQuery = `SELECT * FROM user WHERE username = "${username}"`;
   const { results } = await queryDatabase<User>(fetchQuery);
  
      if (results.length === 0) {
        throw new Error('User not found'); // Throw an error if the user was not found
      }

  return results[0];
}

async function updateUser(user: UpdateUserDto): Promise<User> {

  let moreThanOneData:boolean = false

  // Actualizar datos del usuario

    let queryUpdate = `UPDATE user SET `
    if (user.password) {
     queryUpdate += ` password = "${user.password}"`
     moreThanOneData = true
    }
    if (user.mobile_number) {
      if (moreThanOneData) {
        queryUpdate += `,  `
      }
     queryUpdate += ` mobile_number = "${user.mobile_number}"`
     moreThanOneData = true
    }
    if (user.email) {
      if (moreThanOneData) {
        queryUpdate += `,  `
      }      
     queryUpdate += ` email = "${user.email}"`
     moreThanOneData = true
  }
  if (user.user_type) {
    if (moreThanOneData) {
      queryUpdate += `,  `
    }      
   queryUpdate += ` type = ${user.user_type}`
   moreThanOneData = true
  }
    queryUpdate += ` WHERE username = "${user.username}"`

    await queryDatabase<void>(queryUpdate);

    // Devolver la mascota actualizada
    const fetchQuery = `SELECT     username, password,  type as user_type,  email,  mobile_number, created_time
                      FROM user 
                      WHERE username = "${user.username}"`;


  const { results } = await queryDatabase<User>(fetchQuery);

  if (results.length === 0) {
    throw new Error('Failed to fetch the updated user');
  }

  return results[0];  
  
  }

export default {verifyUser, createUser, updateUser, getUser}