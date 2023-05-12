import db from '../db/user.db'
import { User } from '../models/interfaces'

const verifyUser =  async (username:string, password:string) : Promise<boolean> => {

    const user = await db.verifyUser(username,password)
    if (user.length>0) {
        return(true)
    }
    return(false)

}

const createUser = async (user: User) : Promise<User> => {

  // Create a new instance of User
  const result = await db.createUser(user)
  return result

}

export default {verifyUser, createUser}