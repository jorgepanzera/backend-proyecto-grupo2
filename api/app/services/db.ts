import mysql from 'mysql2'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'pets',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


interface QueryResult<T> {
  results: T[];
}

async function queryDatabase<T>(query: string): Promise<QueryResult<T>> {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_mysql_database_name'
  });

  try {
    const results = await new Promise<T[]>((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results as T[]);
        }
      });
    });

    return {
      results
    };
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
}

interface User {
    username: string;
    password: string;
    user_type: number;
  }
  
  async function getUsers(): Promise<User[]> {
    const query = 'SELECT * FROM users';
  
    const result = await queryDatabase<User>(query);
  
    return result.results;
  }

  // ejemplo de get
  const users = await getUsers();
console.log(users);

// ejemplo de insert
interface User {
    username: string;
    password: string;
    user_type: number;
  }
  
  async function createUser(user: User): Promise<void> {
    const query = `INSERT INTO users (username, password, user_type) VALUES (?, ?, ?)`;
    const values = [user.username, user.password, user.user_type];
  
    await queryDatabase<void>(query, values);
  }

  const newUser: User = {
    username: 'johndoe',
    password: 'password123',
    user_type: 1,
  };
  
  await createUser(newUser);

  
  // ejemplo de update
  interface User {
    id: number;
    username: string;
    password: string;
    user_type: number;
  }
  
  async function updateUser(user: User): Promise<void> {
    const query = `UPDATE users SET username=?, password=?, user_type=? WHERE id=?`;
    const values = [user.username, user.password, user.user_type, user.id];
  
    await queryDatabase<void>(query, values);
  }

  const existingUser: User = {
    id: 1,
    username: 'janedoe',
    password: 'newpassword',
    user_type: 2,
  };
  
  await updateUser(existingUser);

  
  // ejemplo de delete
  async function deleteUser(id: number): Promise<void> {
    const query = `DELETE FROM users WHERE id=?`;
    const values = [id];
  
    await queryDatabase<void>(query, values);
  }

  const userIdToDelete = 1;

await deleteUser(userIdToDelete);


export default pool;
