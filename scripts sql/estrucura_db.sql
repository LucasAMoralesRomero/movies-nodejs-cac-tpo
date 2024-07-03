
-- Creamos la base de datos de películas
CREATE DATABASE IF NOT EXISTS movies_new;
USE movies_new;

-- Creamos la tabla de géneros (genres)
CREATE TABLE genres (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genre VARCHAR(50)
);

-- Creamos la tabla de directores (directors)
CREATE TABLE directors (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    director_name VARCHAR(100) NOT NULL
);

-- Creamos la tabla de escritores (scriptwriters)
CREATE TABLE scriptwriters (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    scriptwriter_name VARCHAR(100) NOT NULL
);

-- Creamos la tabla de actores (casting)
CREATE TABLE casting (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    casting_name VARCHAR(100) NOT NULL
);

-- Creamos la tabla de videos de YouTube (video)
CREATE TABLE videos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    video_url VARCHAR(80)
);

-- Creamos la tabla de enlaces a redes sociales (links)
CREATE TABLE links (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    facebook_url VARCHAR(150),
    twitter_url VARCHAR(150),
    instagram_url VARCHAR(150),
    web_url VARCHAR(150)
);

-- Creamos la tabla para las películas (movies)
CREATE TABLE movies (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    year_release YEAR,
    image_bg VARCHAR(255),
    image_poster VARCHAR(255),
    overview TEXT,
    movie_status VARCHAR(20),
    original_language VARCHAR(20),
    budget DECIMAL(15,2),
    revenue DECIMAL(15,2)
);

-- Creamos las tablas de relaciones muchos a muchos
CREATE TABLE movie_directors (
    movie_id INT NOT NULL,
    director_id INT NOT NULL,
    PRIMARY KEY (movie_id, director_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (director_id) REFERENCES directors(id)
);

CREATE TABLE movie_scriptwriters (
    movie_id INT NOT NULL,
    scriptwriter_id INT NOT NULL,
    PRIMARY KEY (movie_id, scriptwriter_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (scriptwriter_id) REFERENCES scriptwriters(id)
);

CREATE TABLE movie_genres (
    movie_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE movie_casting (
    movie_id INT NOT NULL,
    casting_id INT NOT NULL,
    PRIMARY KEY (movie_id, casting_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (casting_id) REFERENCES casting(id)
);

CREATE TABLE movie_videos (
    movie_id INT NOT NULL,
    video_id INT NOT NULL,
    PRIMARY KEY (movie_id, video_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (video_id) REFERENCES videos(id)
);

CREATE TABLE movie_links (
    movie_id INT NOT NULL,
    link_id INT NOT NULL,
    PRIMARY KEY (movie_id, link_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (link_id) REFERENCES links(id)
);