//archivo de rutas de la entidad Movie
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
//se definene las rutas para comenzar a trabajar con la entidad Movie
//se obtinen todas las peliculas
router.get('/', movieController.getAllMovies);

//se obtienen los generos
router.get('/genres', movieController.getAllGenres);

//se obtienen los directores   
router.get('/directors', movieController.getAllDirectors);

//se obtiene una pelicula por id
router.get('/:id', movieController.getMovieById);

router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);


module.exports = router;