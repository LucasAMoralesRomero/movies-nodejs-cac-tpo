//archivo de rutas de la entidad Movie
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller');

//se definene las rutas para comenzar a trabajar con la entidad Movie
//se obtinen todas las peliculas
router.get('/', Controller.getAllMovies);
router.get('/all', Controller.getAllMovies1);

//se obtiene una pelicula por id
/*
router.get('/:id', movieController.getMovieById);

router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);
*/

module.exports = router;