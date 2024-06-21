//se genera una constante de base de datos 
//src/controllers/movieController.js
const db = require('../db/db');

const getAllMovies = (req, res) => {
    const sql = 'SELECT * FROM movies.pelicula';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};

module.exports = {
    getAllMovies
}