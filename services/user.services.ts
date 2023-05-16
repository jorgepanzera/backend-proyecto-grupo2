import db from '../db/user.db'
import { User, InsertUserDto, UpdateUserDto } from '../models/user.model'

const verifyUser =  async (email:string, password:string) : Promise<UpdateUserDto> => {

  const user = await db.verifyUser(email, password)
  return user[0]

}

const createUser = async (user: InsertUserDto) : Promise<User> => {

  // Create a new instance of User
  const result = await db.createUser(user)
  return result

}

export default {verifyUser, createUser}