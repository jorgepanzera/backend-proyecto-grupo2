import db from '../db/users.db'

const verifyUser =  async (username:string, password:string) : Promise<boolean> => {

    const user = await db.verifyUser(username,password)
    if (user) {
        return(true)
    }
    return(false)

}

export default {verifyUser}