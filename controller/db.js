// db.js
import mysql from 'mysql';

const createConnection = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'basic-crud-db'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL as id ' + connection.threadId);
    });

    return connection;
};

export default createConnection;
