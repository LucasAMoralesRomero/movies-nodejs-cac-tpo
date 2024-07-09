//se genera una constante de base de datos 
const db = require('../db/db');


//todas las peliculas sin genero (el genero no es unico!)
const getAllMovies = (req, res) => {
    const sql = 'SELECT movies.id, movies.title, movies.year_release, movies.overview, movies.original_language,casting.casting_name, directors.director_name FROM movies JOIN casting ON movies.id = casting.id JOIN directors ON movies.id = directors.id';

    //const sql = 'SELECT id, director_name FROM housebank_movies_new.directors';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};







const getPruebaParam = (req, res) => {
    const { PP } = req.params;
    const sql = 'SELECT movies.title, movies.year_release, movies.overview FROM movies WHERE movies.id = ?';
    //db.query(sql, (err, results) => {
    db.query(sql,[PP], (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};

const getPruebaParam2 = (req, res) => {
    const { Ye } = req.params;
    const sql = 'SELECT movies.title, movies.id, movies.overview FROM movies WHERE movies.year_release = ?';
    //db.query(sql, (err, results) => {
    db.query(sql,[Ye], (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};

const getPruebaParam3 = (req, res) => {
    const { Yes } = req.params;
    const sql = 'SELECT movies.year_release, movies.id, movies.overview FROM movies WHERE movies.title = ?';
    //db.query(sql, (err, results) => {
    db.query(sql,[Yes], (err, results) => {
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


//Trae el listado de generos de la base para la lista de generos
const getGenero = (req, res) => {
    const CGenero = 'Select housebank_movies_new.genres.genre from housebank_movies_new.genres';
    db.query(CGenero, (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};

//trae peliculas por genero (junto con el retorno de arriba)
const getLisXGenero = (req, res) => {
    const { Gid } = req.params;//req.query;
    //const { Gen } = req.params;
    const SQL = 'SELECT housebank_movies_new.movies.title, movies.year_release, movies.original_language, movies.overview FROM housebank_movies_new.movies JOIN housebank_movies_new.movie_genres ON housebank_movies_new.movies.id = housebank_movies_new.movie_genres.movie_id JOIN housebank_movies_new.genres ON housebank_movies_new.movie_genres.genre_id = housebank_movies_new.genres.id WHERE housebank_movies_new.genres.genre=?';
    db.query(SQL,[Gid], (err, results) => {    
        if (err) throw err;
        res.json(results);
    });
        
};



//todas laos titulos de las pelicular
const getAllTitulos = (req, res) => {
    const sql = 'SELECT movies.title FROM movies';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};


const getAllMoviesxTitulo = (req, res) => {
    const { Ti } = req.params;
    const sql = 'SELECT movies.id, movies.title, movies.year_release, movies.overview, movies.original_language, casting.casting_name, directors.director_name    FROM movies JOIN casting ON movies.id = casting.id JOIN directors ON movies.id = directors.id WHERE movies.title LIKE ?';
    db.query(sql,[`%${Ti}%`], (err, results) => {  
        if (err) throw err;
        res.json(results);
    }); 
};

// Editar película traida desde título
const editMovieDetails = (req, res) => {
    const { id, title, year_release, overview, original_language, casting_name, director_name } = req.body;
    const sqlMovies = `UPDATE movies SET title = ?, year_release = ?, overview = ?, original_language = ? WHERE id = ?`;
    const sqlCasting = `UPDATE casting SET casting_name = ? WHERE id = ?`;
    const sqlDirectors = `UPDATE directors SET director_name = ? WHERE id = ?`;

    db.query(sqlMovies, [title, year_release, overview, original_language, id], (err, result) => {
        if (err) throw err;
        db.query(sqlCasting, [casting_name, id], (err, result) => {
            if (err) throw err;
            db.query(sqlDirectors, [director_name, id], (err, result) => {
                if (err) throw err;
                res.send('película actualizada correctamente');
            });
        });
    });
};


// Eliminar una película por id
const deleteMovieById = (req, res) => {
    const { id } = req.params;
    const sqlMovies = `DELETE FROM movies WHERE id = ?`;
    const sqlCasting = `DELETE FROM casting WHERE id = ?`;
    const sqlDirectors = `DELETE FROM directors WHERE id = ?`;

    db.query(sqlCasting, [id], (err, result) => {
        if (err) throw err;
        db.query(sqlDirectors, [id], (err, result) => {
            if (err) throw err;
            db.query(sqlMovies, [id], (err, result) => {
                if (err) throw err;                
                res.send('Movie deleted successfully');
            });
        });
    });
};



const createMovie = (req, res) => {
    const { title, year_release, overview, original_language, genre, casting_name, director_name } = req.body;
  
    const movieQuery = 'INSERT INTO movies (title, year_release, overview, original_language) VALUES (?, ?, ?, ?)';
    const genreQuery = 'INSERT INTO genres (genre) VALUES (?)';
    const castingQuery = 'INSERT INTO casting (casting_name) VALUES (?)';
    const directorQuery = 'INSERT INTO directors (director_name) VALUES (?)';
  
    db.query(movieQuery, [title, year_release, overview, original_language], (err, result) => {
      if (err) throw err;
      const movieId = result.insertId;
  
      db.query(genreQuery, [genre], (err, result) => {
        if (err) throw err;
        const genreId = result.insertId;
  
        db.query(castingQuery, [casting_name], (err, result) => {
          if (err) throw err;
          const castingId = result.insertId;
  
          db.query(directorQuery, [director_name], (err, result) => {
            if (err) throw err;
            const directorId = result.insertId;
  
            res.status(201).send({
              message: 'Movie created successfully',
              movieId,
              genreId,
              castingId,
              directorId
            });
          });
        });
      });
    });
  };

  const deleteMovie2 = (req, res) => {
    const { id } = req.body;
  
    const deleteQuery = 'DELETE FROM movies WHERE id = ?';
  
    db.query(deleteQuery, [id], (err, result) => {
      if (err) throw err;
      res.send({ message: 'Registro eliminado' });
    });
  };

  const deleteMovie3 = (req, res) => {
    const { id } = req.body;
  
    const deleteMovieCastingQuery = 'DELETE FROM movie_casting WHERE movie_id = ?';
    const deleteMovieQuery = 'DELETE FROM movies WHERE id = ?';
  
    db.query(deleteMovieCastingQuery, [id], (err, result) => {
      if (err) throw err;
  
      db.query(deleteMovieQuery, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Registro eliminado' });
      });
    });
  };
const NOcreateMovie = async (req, res) => {
    const { title, year_release, overview, original_language, genre, casting_name, director_name } = req.body;
    let movieId;
  
    try {
      const sql = 'INSERT INTO movies (title, year_release, overview, original_language) VALUES (?, ?, ?, ?)';
      const result = await connection.query(sql, [title, year_release, overview, original_language]);
      movieId = result.insertId;
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al crear la película');
      return;
    }
  
    try {
      const sqlInsertCasting = 'INSERT INTO casting (casting_name, movie_id) VALUES (?, ?)';
      await connection.query(sqlInsertCasting, [casting_name, movieId]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al agregar al actor/actriz');
      return;
    }
  
    try {
      const sqlInsertDirector = 'INSERT INTO directors (director_name, movie_id) VALUES (?, ?)';
      await connection.query(sqlInsertDirector, [director_name, movieId]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al agregar al director/a');
      return;
    }
  
    try {
      const sqlInsertGenre = 'INSERT INTO genres (genre, movie_id) VALUES (?, ?)';
      await connection.query(sqlInsertGenre, [genre, movieId]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al agregar el género');
      return;
    }
  
    res.status(201).send('Película creada con éxito');

    connection.end();
  };
  

  // Controlador para eliminar una película
  const deleteMovie5 = (req, res) => {
    const { id } = req.body;
  
    // Iniciar la transacción para asegurar la integridad de los datos
    connection.beginTransaction((err) => {
      if (err) throw err;
  
      // Eliminar relaciones en movie_genres
      connection.query('DELETE FROM movie_genres WHERE movie_id = ?', [id], (err) => {
        if (err) {
          return connection.rollback(() => res.status(500).json({ error: err.message }));
        }
  
        // Eliminar relaciones en movie_casting (si existe esta tabla)
        connection.query('DELETE FROM movie_casting WHERE movie_id = ?', [id], (err) => {
          if (err) {
            return connection.rollback(() => res.status(500).json({ error: err.message }));
          }
  
          // Eliminar la película en sí
          connection.query('DELETE FROM movies WHERE id = ?', [id], (err) => {
            if (err) {
              return connection.rollback(() => res.status(500).json({ error: err.message }));
            }
  
            // Commit de la transacción si todas las eliminaciones son exitosas
            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => res.status(500).json({ error: err.message }));
              }
              res.json({ message: 'Registro eliminado' });
            });
          });
        });
      });
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
    getAllTitulos,
    getAllMoviesxTitulo,
    editMovieDetails,
    deleteMovieById,
    createMovie,

    deleteMovie5,

    getAllMovies1,
    getGenero,
    getLisXGenero,
    getPruebaParam,
    getPruebaParam2,
    getPruebaParam3
};
    //getMovieById,
    //createMovie,
    //updateMovie