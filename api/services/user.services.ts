import db from '../db/user.db'
import { User, InsertUserDto, UpdateUserDto } from '../models/user.model'

const verifyUser =  async (username:string, password:string) : Promise<boolean> => {

    const user = await db.verifyUser(username,password)
    if (user.length>0) {
        return(true)
    }
    return(false)

}

const createUser = async (user: InsertUserDto) : Promise<User> => {

  // Create a new instance of User
  const result = await db.createUser(user)
  return result

}

export default {verifyUser, createUser}