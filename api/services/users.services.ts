import db from '../db/user.db'

const verifyUser =  async (username:string, password:string) : Promise<boolean> => {

    const user = await db.verifyUser(username,password)
    if (user.length>0) {
        return(true)
    }
    return(false)

}

export default {verifyUser}