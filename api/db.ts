import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_mysql_database_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
