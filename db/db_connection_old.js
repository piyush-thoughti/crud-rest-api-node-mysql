import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config('../.env');


const createConnection = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
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