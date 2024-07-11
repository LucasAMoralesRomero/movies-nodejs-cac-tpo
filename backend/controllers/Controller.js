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
    const sql = 'SELECT id, title, year_release, image_poster FROM housebank_movies_new.movies';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    }); 
};
//obtenemos una pelicula por id
const getMovieById = (req, res) => {
  const { id } = req.params;
  const sql =  `
SELECT 
    m.id AS movie_id,
    m.title,
    m.year_release,
    m.image_bg,
    m.image_poster,
    m.overview,
    m.budget,
    m.revenue,
    m.movie_status,
    m.original_language,
    (SELECT 
            GROUP_CONCAT(g.genre SEPARATOR ', ')
     FROM
            genres g
                INNER JOIN
            movie_genres mg ON g.id = mg.genre_id
     WHERE
            mg.movie_id = m.id) AS genres,
    (SELECT 
            GROUP_CONCAT(d.director_name SEPARATOR ', ')
     FROM
            directors d
                INNER JOIN
            movie_directors md ON d.id = md.director_id
     WHERE
            md.movie_id = m.id) AS directors,
    (SELECT 
            GROUP_CONCAT(s.scriptwriter_name SEPARATOR ', ')
     FROM
            scriptwriters s
                INNER JOIN
            movie_scriptwriters ms ON s.id = ms.scriptwriter_id
     WHERE
            ms.movie_id = m.id) AS scriptwriters,
    (SELECT 
            GROUP_CONCAT(c.casting_name SEPARATOR ', ')
     FROM
            casting c
                INNER JOIN
            movie_casting mc ON c.id = mc.casting_id
     WHERE
            mc.movie_id = m.id) AS casting,
    (SELECT 
            v.video_url
     FROM
            videos v
                INNER JOIN
            movie_videos mv ON v.id = mv.video_id
     WHERE
            mv.movie_id = m.id
     LIMIT 1) AS video_url,
    (SELECT 
            l.facebook_url
     FROM
            links l
                INNER JOIN
            movie_links ml ON l.id = ml.link_id
     WHERE
            ml.movie_id = m.id
     LIMIT 1) AS facebook_url,
    (SELECT 
            l.twitter_url
     FROM
            links l
                INNER JOIN
            movie_links ml ON l.id = ml.link_id
     WHERE
            ml.movie_id = m.id
     LIMIT 1) AS twitter_url,
    (SELECT 
            l.instagram_url
     FROM
            links l
                INNER JOIN
            movie_links ml ON l.id = ml.link_id
     WHERE
            ml.movie_id = m.id
     LIMIT 1) AS instagram_url,
    (SELECT 
            l.web_url
     FROM
            links l
                INNER JOIN
            movie_links ml ON l.id = ml.link_id
     WHERE
            ml.movie_id = m.id
     LIMIT 1) AS web_url
FROM
    movies m
  WHERE m.id = ?;
`;
  db.query(sql,[id], (err, results) => {
      if (err) throw err;
      res.json(results);
  });
}
/*CONTROLADORES DEFINITIVOS PARA EL ABM*/
const createMovie = (req, res) => {
  const {
      title,
      year_release,
      image_bg,
      image_poster,
      overview,
      budget,
      revenue,
      movie_status,
      original_language,
      genres,
      director_name,
      scriptwriter_name,
      casting_name,
      video_url,
      facebook_url,
      twitter_url,
      instagram_url,
      web_url
  } = req.body;
console.log(req.body);
  // Validación de arrays
  if (!genres || !Array.isArray(genres)) {
      return res.status(400).json({ message: "Géneros no proporcionados o en formato incorrecto" });
  }
  if (!casting_name || !Array.isArray(casting_name)) {
      return res.status(400).json({ message: "Nombres del elenco no proporcionados o en formato incorrecto" });
  }

  db.beginTransaction(err => {
      if (err) {
          console.error("Error al iniciar la transacción:", err);
          return res.status(500).json({ message: "Error al iniciar la transacción", error: err });
      }

      // Insertar película
      const sqlMovie = 'INSERT INTO housebank_movies_new.movies (title, year_release, image_bg, image_poster, overview, budget, revenue, movie_status, original_language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(sqlMovie, [title, year_release, image_bg, image_poster, overview, budget, revenue, movie_status, original_language], (err, result) => {
          if (err) {
              console.error("Error al insertar película:", err);
              return db.rollback(() => {
                  res.status(500).json({ message: "Error al insertar película", error: err });
              });
          }

          const movieId = result.insertId;

          // Insertar géneros si no existen
          const insertGenres = genres.map(genre => {
              const sqlGenre = 'INSERT INTO housebank_movies_new.genres (genre) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = ?)';
              return new Promise((resolve, reject) => {
                  db.query(sqlGenre, [genre.trim(), genre.trim()], (err) => {
                      if (err) return reject(err);
                      resolve();
                  });
              });
          });

          // Insertar director si no existe
          const insertDirectors = director_name.map(name => {
              const sqlDirector = 'INSERT INTO housebank_movies_new.directors (director_name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM directors WHERE director_name = ?)';
              return new Promise((resolve, reject) => {
                  db.query(sqlDirector, [name.trim(), name.trim()], (err) => {
                      if (err) return reject(err);
                      resolve();
                  });
              });
          });

          // Insertar guionista si no existe
          const insertScriptwriters = scriptwriter_name.map(name => {
              const sqlScriptwriter = 'INSERT INTO housebank_movies_new.scriptwriters (scriptwriter_name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = ?)';
              return new Promise((resolve, reject) => {
                  db.query(sqlScriptwriter, [name.trim(), name.trim()], (err) => {
                      if (err) return reject(err);
                      resolve();
                  });
              });
          });

          // Insertar actores si no existen
          const insertCasting = casting_name.map(name => {
              const sqlCasting = 'INSERT INTO housebank_movies_new.casting (casting_name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = ?)';
              return new Promise((resolve, reject) => {
                  db.query(sqlCasting, [name.trim(), name.trim()], (err) => {
                      if (err) return reject(err);
                      resolve();
                  });
              });
          });

          // Insertar video si no existe y obtener su ID
          const sqlVideo = 'INSERT INTO housebank_movies_new.videos (video_url) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM videos WHERE video_url = ?)';
          const videoPromise = new Promise((resolve, reject) => {
              db.query(sqlVideo, [video_url, video_url], (err) => {
                  if (err) return reject(err);
                  db.query('SELECT id FROM housebank_movies_new.videos WHERE video_url = ?', [video_url], (err, results) => {
                      if (err) return reject(err);
                      if (results.length > 0) {
                          const videoId = results[0].id;
                          resolve(videoId);
                      } else {
                          reject(new Error('Video ID not found'));
                      }
                  });
              });
          });

          // Insertar enlaces si no existen y obtener su ID
          const sqlLink = 'INSERT INTO housebank_movies_new.links (facebook_url, twitter_url, instagram_url, web_url) SELECT ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM links WHERE facebook_url = ? AND twitter_url = ? AND instagram_url = ? AND web_url = ?)';
          const linkPromise = new Promise((resolve, reject) => {
              db.query(sqlLink, [facebook_url, twitter_url, instagram_url, web_url, facebook_url, twitter_url, instagram_url, web_url], (err) => {
                  if (err) return reject(err);
                  db.query('SELECT id FROM housebank_movies_new.links WHERE facebook_url = ? AND twitter_url = ? AND instagram_url = ? AND web_url = ?', [facebook_url, twitter_url, instagram_url, web_url], (err, results) => {
                      if (err) return reject(err);
                      if (results.length > 0) {
                          const linkId = results[0].id;
                          resolve(linkId);
                      } else {
                          reject(new Error('Link ID not found'));
                      }
                  });
              });
          });

          // Ejecutar todas las inserciones y enlaces
          Promise.all([...insertGenres, ...insertDirectors, ...insertScriptwriters, ...insertCasting, videoPromise, linkPromise])
              .then(results => {
                  const [videoId, linkId] = results.slice(-2);

                  const insertMovieGenres = genres.map(genre => {
                      const sqlInsertMovieGenre = 'INSERT INTO housebank_movies_new.movie_genres (movie_id, genre_id) SELECT ?, id FROM genres WHERE genre = ?';
                      return new Promise((resolve, reject) => {
                          db.query(sqlInsertMovieGenre, [movieId, genre.trim()], (err) => {
                              if (err) return reject(err);
                              resolve();
                          });
                      });
                  });

                  const insertMovieDirectors = director_name.map(name => {
                      const sqlInsertMovieDirector = 'INSERT INTO housebank_movies_new.movie_directors (movie_id, director_id) SELECT ?, id FROM directors WHERE director_name = ?';
                      return new Promise((resolve, reject) => {
                          db.query(sqlInsertMovieDirector, [movieId, name.trim()], (err) => {
                              if (err) return reject(err);
                              resolve();
                          });
                      });
                  });

                  const insertMovieScriptwriters = scriptwriter_name.map(name => {
                      const sqlInsertMovieScriptwriter = 'INSERT INTO housebank_movies_new.movie_scriptwriters (movie_id, scriptwriter_id) SELECT ?, id FROM scriptwriters WHERE scriptwriter_name = ?';
                      return new Promise((resolve, reject) => {
                          db.query(sqlInsertMovieScriptwriter, [movieId, name.trim()], (err) => {
                              if (err) return reject(err);
                              resolve();
                          });
                      });
                  });

                  const insertMovieCasting = casting_name.map(name => {
                      const sqlInsertMovieCasting = 'INSERT INTO housebank_movies_new.movie_casting (movie_id, casting_id) SELECT ?, id FROM casting WHERE casting_name = ?';
                      return new Promise((resolve, reject) => {
                          db.query(sqlInsertMovieCasting, [movieId, name.trim()], (err) => {
                              if (err) return reject(err);
                              resolve();
                          });
                      });
                  });

                  const insertMovieVideo = new Promise((resolve, reject) => {
                      const sqlInsertMovieVideo = 'INSERT INTO housebank_movies_new.movie_videos (movie_id, video_id) VALUES (?, ?)';
                      db.query(sqlInsertMovieVideo, [movieId, videoId], (err) => {
                          if (err) return reject(err);
                          resolve();
                      });
                  });

                  const insertMovieLink = new Promise((resolve, reject) => {
                      const sqlInsertMovieLink = 'INSERT INTO housebank_movies_new.movie_links (movie_id, link_id) VALUES (?, ?)';
                      db.query(sqlInsertMovieLink, [movieId, linkId], (err) => {
                          if (err) return reject(err);
                          resolve();
                      });
                  });

                  return Promise.all([
                      ...insertMovieGenres,
                      ...insertMovieDirectors,
                      ...insertMovieScriptwriters,
                      ...insertMovieCasting,
                      insertMovieVideo,
                      insertMovieLink
                  ]);
              })
              .then(() => {
                  db.commit(err => {
                      if (err) {
                          console.error("Error al realizar commit:", err);
                          return db.rollback(() => {
                              res.status(500).json({ message: "Error al realizar commit", error: err });
                          });
                      }
                      res.json({ message: 'Película creada con éxito', movieID: movieId });
                  });
              })
              .catch(err => {
                  console.error("Error:", err);
                  db.rollback(() => {
                      res.status(500).json({ message: "Error durante el proceso de creación", error: err });
                  });
              });
      });
  });
};

//controlador para modificar la pelicula

const editMovie = (req, res) => {
  const { id } = req.params;
  const {
      title,
      year_release,
      image_bg,
      image_poster,
      overview,
      budget,
      revenue,
      movie_status,
      original_language,
      genres,
      director_name,
      scriptwriter_name,
      casting_name,
      video_url,
      facebook_url,
      twitter_url,
      instagram_url,
      web_url
  } = req.body;

  db.beginTransaction(err => {
      if (err) {
          console.error("Error al iniciar la transacción:", err);
          return res.status(500).json({ message: "Error al iniciar la transacción", error: err });
      }

      const sqlUpdateMovie = 'UPDATE housebank_movies_new.movies SET title = ?, year_release = ?, image_bg = ?, image_poster = ?, overview = ?, budget = ?, revenue = ?, movie_status = ?, original_language = ? WHERE id = ?';
      db.query(sqlUpdateMovie, [title, year_release, image_bg, image_poster, overview, budget, revenue, movie_status, original_language, id], (err, result) => {
          if (err) {
              console.error("Error al actualizar película:", err);
              return db.rollback(() => {
                  res.status(500).json({ message: "Error al actualizar película", error: err });
              });
          }

          const sqlDeleteGenres = 'DELETE FROM housebank_movies_new.movie_genres WHERE movie_id = ?';
          db.query(sqlDeleteGenres, [id], (err, result) => {
              if (err) {
                  console.error("Error al eliminar géneros antiguos:", err);
                  return db.rollback(() => {
                      res.status(500).json({ message: "Error al eliminar géneros antiguos", error: err });
                  });
              }

              const sqlDeleteDirectors = 'DELETE FROM housebank_movies_new.movie_directors WHERE movie_id = ?';
              db.query(sqlDeleteDirectors, [id], (err, result) => {
                  if (err) {
                      console.error("Error al eliminar directores antiguos:", err);
                      return db.rollback(() => {
                          res.status(500).json({ message: "Error al eliminar directores antiguos", error: err });
                      });
                  }

                  const sqlDeleteScriptwriters = 'DELETE FROM housebank_movies_new.movie_scriptwriters WHERE movie_id = ?';
                  db.query(sqlDeleteScriptwriters, [id], (err, result) => {
                      if (err) {
                          console.error("Error al eliminar guionistas antiguos:", err);
                          return db.rollback(() => {
                              res.status(500).json({ message: "Error al eliminar guionistas antiguos", error: err });
                          });
                      }

                      const sqlDeleteCasting = 'DELETE FROM housebank_movies_new.movie_casting WHERE movie_id = ?';
                      db.query(sqlDeleteCasting, [id], (err, result) => {
                          if (err) {
                              console.error("Error al eliminar casting antiguo:", err);
                              return db.rollback(() => {
                                  res.status(500).json({ message: "Error al eliminar casting antiguo", error: err });
                              });
                          }

                          const sqlDeleteVideos = 'DELETE FROM housebank_movies_new.movie_videos WHERE movie_id = ?';
                          db.query(sqlDeleteVideos, [id], (err, result) => {
                              if (err) {
                                  console.error("Error al eliminar videos antiguos:", err);
                                  return db.rollback(() => {
                                      res.status(500).json({ message: "Error al eliminar videos antiguos", error: err });
                                  });
                              }

                              const sqlDeleteLinks = 'DELETE FROM housebank_movies_new.movie_links WHERE movie_id = ?';
                              db.query(sqlDeleteLinks, [id], (err, result) => {
                                  if (err) {
                                      console.error("Error al eliminar enlaces antiguos:", err);
                                      return db.rollback(() => {
                                          res.status(500).json({ message: "Error al eliminar enlaces antiguos", error: err });
                                      });
                                  }

                                  const sqlInsertGenres = 'INSERT INTO housebank_movies_new.movie_genres (movie_id, genre_id) SELECT ?, id FROM housebank_movies_new.genres WHERE genre IN (?)';
                                  db.query(sqlInsertGenres, [id, genres], (err, result) => {
                                      if (err) {
                                          console.error("Error al insertar géneros:", err);
                                          return db.rollback(() => {
                                              res.status(500).json({ message: "Error al insertar géneros", error: err });
                                          });
                                      }

                                      const sqlInsertDirectors = 'INSERT INTO housebank_movies_new.movie_directors (movie_id, director_id) SELECT ?, id FROM housebank_movies_new.directors WHERE director_name IN (?)';
                                      db.query(sqlInsertDirectors, [id, director_name], (err, result) => {
                                          if (err) {
                                              console.error("Error al insertar directores:", err);
                                              return db.rollback(() => {
                                                  res.status(500).json({ message: "Error al insertar directores", error: err });
                                              });
                                          }

                                          const sqlInsertScriptwriters = 'INSERT INTO housebank_movies_new.movie_scriptwriters (movie_id, scriptwriter_id) SELECT ?, id FROM housebank_movies_new.scriptwriters WHERE scriptwriter_name IN (?)';
                                          db.query(sqlInsertScriptwriters, [id, scriptwriter_name], (err, result) => {
                                              if (err) {
                                                  console.error("Error al insertar guionistas:", err);
                                                  return db.rollback(() => {
                                                      res.status(500).json({ message: "Error al insertar guionistas", error: err });
                                                  });
                                              }

                                              const sqlInsertCasting = 'INSERT INTO housebank_movies_new.movie_casting (movie_id, casting_id) SELECT ?, id FROM housebank_movies_new.casting WHERE casting_name IN (?)';
                                              db.query(sqlInsertCasting, [id, casting_name], (err, result) => {
                                                  if (err) {
                                                      console.error("Error al insertar actores:", err);
                                                      return db.rollback(() => {
                                                          res.status(500).json({ message: "Error al insertar actores", error: err });
                                                      });
                                                  }

                                                  const sqlInsertVideo = 'INSERT INTO housebank_movies_new.videos (video_url) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM housebank_movies_new.videos WHERE video_url = ?)';
                                                  db.query(sqlInsertVideo, [video_url, video_url], (err, result) => {
                                                      if (err) {
                                                          console.error("Error al insertar video:", err);
                                                          return db.rollback(() => {
                                                              res.status(500).json({ message: "Error al insertar video", error: err });
                                                          });
                                                      }

                                                      const sqlInsertVideoLink = 'INSERT INTO housebank_movies_new.movie_videos (movie_id, video_id) SELECT ?, id FROM housebank_movies_new.videos WHERE video_url = ?';
                                                      db.query(sqlInsertVideoLink, [id, video_url], (err, result) => {
                                                          if (err) {
                                                              console.error("Error al insertar video:", err);
                                                              return db.rollback(() => {
                                                                  res.status(500).json({ message: "Error al insertar video", error: err });
                                                              });
                                                          }

                                                          const sqlInsertLinks = 'INSERT INTO housebank_movies_new.links (facebook_url, twitter_url, instagram_url, web_url) SELECT ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM housebank_movies_new.links WHERE facebook_url = ? AND twitter_url = ? AND instagram_url = ? AND web_url = ?)';
                                                          db.query(sqlInsertLinks, [facebook_url, twitter_url, instagram_url, web_url, facebook_url, twitter_url, instagram_url, web_url], (err, result) => {
                                                              if (err) {
                                                                  console.error("Error al insertar enlaces:", err);
                                                                  return db.rollback(() => {
                                                                      res.status(500).json({ message: "Error al insertar enlaces", error: err });
                                                                  });
                                                              }

                                                              const sqlInsertLink = 'INSERT INTO housebank_movies_new.movie_links (movie_id, link_id) SELECT ?, id FROM housebank_movies_new.links WHERE facebook_url = ? AND twitter_url = ? AND instagram_url = ? AND web_url = ?';
                                                              db.query(sqlInsertLink, [id, facebook_url, twitter_url, instagram_url, web_url], (err, result) => {
                                                                  if (err) {
                                                                      console.error("Error al insertar enlaces:", err);
                                                                      return db.rollback(() => {
                                                                          res.status(500).json({ message: "Error al insertar enlaces", error: err });
                                                                      });
                                                                  }

                                                                  db.commit(err => {
                                                                      if (err) {
                                                                          console.error("Error al realizar commit:", err);
                                                                          return db.rollback(() => {
                                                                              res.status(500).json({ message: "Error al realizar commit", error: err });
                                                                          });
                                                                      }
                                                                      res.json({ message: 'Película actualizada con éxito' });
                                                                  });
                                                              });
                                                          });
                                                      });
                                                  });
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  });
};

//controlador para borrar pelicula
const deleteMovieById = (req, res) => {
    const { id } = req.params;

    db.beginTransaction(err => {
        if (err) {
            console.error("Error al iniciar la transacción:", err);
            return res.status(500).json({ message: "Error al iniciar la transacción", error: err });
        }

        const deleteRelations = (sql, id, callback) => {
            db.query(sql, [id], (err, result) => {
                if (err) {
                    console.error("Error al eliminar relaciones:", err);
                    return db.rollback(() => {
                        res.status(500).json({ message: "Error al eliminar relaciones", error: err });
                    });
                }
                callback();
            });
        };

        deleteRelations('DELETE FROM housebank_movies_new.movie_genres WHERE movie_id = ?', id, () => {
            deleteRelations('DELETE FROM housebank_movies_new.movie_directors WHERE movie_id = ?', id, () => {
                deleteRelations('DELETE FROM housebank_movies_new.movie_scriptwriters WHERE movie_id = ?', id, () => {
                    deleteRelations('DELETE FROM housebank_movies_new.movie_casting WHERE movie_id = ?', id, () => {
                        deleteRelations('DELETE FROM housebank_movies_new.movie_videos WHERE movie_id = ?', id, () => {
                            deleteRelations('DELETE FROM housebank_movies_new.movie_links WHERE movie_id = ?', id, () => {
                                db.query('DELETE FROM housebank_movies_new.movies WHERE id = ?', [id], (err, result) => {
                                    if (err) {
                                        console.error("Error al eliminar película:", err);
                                        return db.rollback(() => {
                                            res.status(500).json({ message: "Error al eliminar película", error: err });
                                        });
                                    }

                                    db.commit(err => {
                                        if (err) {
                                            console.error("Error al realizar commit:", err);
                                            return db.rollback(() => {
                                                res.status(500).json({ message: "Error al realizar commit", error: err });
                                            });
                                        }
                                        res.json({ message: 'Película eliminada con éxito' });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
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

/*
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


/*
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
*/
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
    //Controladores de ABM
    createMovie,
    editMovie,

    deleteMovie5,

    getAllMovies1,
    getGenero,
    getLisXGenero,
    getPruebaParam,
    getPruebaParam2,
    getPruebaParam3,
    getMovieById
};
    //getMovieById,
    //createMovie,
    //updateMovie