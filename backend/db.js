//definimos el objeto de conexion a la base de datos
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'mysql-housebank.alwaysdata.net',
    user: 'housebank_user',
    password: 'vainillas',
    database: 'housebank_movies_new'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connection to the database has been established');
});

module.exports = connection;