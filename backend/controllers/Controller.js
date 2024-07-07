//se genera una constante de base de datos 
//src/controllers/movieController.js
const db = require('../db/db');

/*Controladores para obtener peliculas*/

const getAllMovies = (req, res) => {
    //const sql = 'SELECT * FROM movies.pelicula';
    const sql = 'SELECT id, director_name FROM housebank_movies_new.directors';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};

const getAllMovies1 = (req, res) => {
    //const sql = 'SELECT * FROM movies.pelicula';
    const sql = 'SELECT title, year_release, overview FROM housebank_movies_new.movies';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};

//Trae el listado de generos de la base
const getGenero = (req, res) => {
    const CGenero = 'Select housebank_movies_new.genres.genre from housebank_movies_new.genres';
    db.query(CGenero, (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};

//trae peliculas por genero
const getLisXGenero = (req, res) => {
    const { genreId } = req.query;
    //const { Gen } = req.params;
    const SQL = 'SELECT housebank_movies_new.movies.title, movies.year_release FROM housebank_movies_new.movies JOIN housebank_movies_new.movie_genres ON housebank_movies_new.movies.id = housebank_movies_new.movie_genres.movie_id JOIN housebank_movies_new.genres ON housebank_movies_new.movie_genres.genre_id = housebank_movies_new.genres.id WHERE housebank_movies_new.genres.id= ?';
    db.query(SQL,[genreId], (err, results) => {    
        if (err) throw err;
        res.json(results);
    });
        
};


/*
const getMovieById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM movies.pelicula HERE id = ?';
    db.query(sql,[id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}

/* Controladores de ABM*/
/*
const createMovie = (req, res) => {
    const {titulo , id_genero, anio, id_director, imagen1, imagen2, imagen3, link, estreno} = req.body;
    const sql = 'INSERT INTO movies.pelicula (titulo, id_genero, anio, id_director, imagen1, imagen2, imagen3, link, estreno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [titulo, id_genero, anio, id_director, imagen1, imagen2, imagen3, link, estreno], (err, results) => {
        if (err) throw err;
        res.json({message: 'Pelicula creada exitosamente', movieID: results.insertId});
    });
}

const updateMovie = (req, res) => {
    const { id } = req.params;
    const {titulo, id_genero, anio, id_director, imagen1, imagen2, imagen3, link, estreno} = req.body;
    const sql = 'UPDATE movies.pelicula SET titulo = ?, id_genero = ?, anio = ?, id_director = ?, imagen1 = ?, imagen2 = ?, imagen3 = ?, link = ?, estreno = ? WHERE id = ?';
    db.query(sql, [titulo, id_genero, anio, id_director, imagen1, imagen2, imagen3, link, estreno, id], (err, results) => {
        if (err) throw err;
        res.json({message: 'Pelicula actualizada exitosamente'});
    });
}
*/
module.exports = {
    getAllMovies,
    getAllMovies1,
    getGenero,
    getLisXGenero
};
    //getMovieById,
    //createMovie,
    //updateMovie