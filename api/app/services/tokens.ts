import pool from './db'

async function getUser(user: string, password:string) {
    const [rows] = await pool.query('SELECT * FROM pets WHERE user = ? and password = ?', [user,password]);
    return rows[0];
  }
  