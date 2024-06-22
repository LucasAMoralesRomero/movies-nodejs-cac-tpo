//se genera una constante de base de datos 
//src/controllers/movieController.js
const db = require('../db/db');

/*Controladores para obtener peliculas*/

const getAllMovies = (req, res) => {
    const sql = 'SELECT * FROM movies.pelicula';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};

const getMovieById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM movies.pelicula HERE id = ?';
    db.query(sql,[id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}

/* Controladores de ABM*/

const createMovie = (req, res) => {
    const {titulo , id_genero, anio, id_director, imagen1, imagen2, imagen3, link, estreno} = req.body;
    const sql = 'INSERT INTO movies.pelicula (titulo, id_genero, anio, id_director, imagen1, imagen2, imagen3, link, estreno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [titulo, id_genero, anio, id_director, imagen1, imagen2, imagen3, link, estreno], (err, results) => {
        if (err) throw err;
        res.json({message: 'Pelicula creada exitosamente', movieID: results.insertId});
    });
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie
};