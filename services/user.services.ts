import db from '../db/user.db';
import { User, InsertUserDto, UpdateUserDto } from '../models/user.model';
import { generateUUID } from '../utils/generate_uuid';

const verifyUser =  async (email:string, password:string) : Promise<UpdateUserDto> => {

  const user = await db.verifyUser(email, password)
  return user[0]

}

const createUser = async (user: InsertUserDto) : Promise<User> => {

  // const user_id = generateUUID();

  // user.id = user_id;

  // Create a new instance of User
  const result = await db.createUser(user)
  return result

}

const getUser = async (username: string) : Promise<User> => {

  // Create a new instance of User
  const result = await db.getUser(username)
  return result

}

const updateUser = async (user: UpdateUserDto) : Promise<User> => {

  // update an user
  const result = await db.updateUser(user)
  return result

}

export default {verifyUser, createUser, updateUser, getUser}