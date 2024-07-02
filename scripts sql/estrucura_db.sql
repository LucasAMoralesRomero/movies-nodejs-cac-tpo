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
    director VARCHAR(50)
);

-- Creamos la tabla de escritores (scriptwriters)
CREATE TABLE scriptwriters (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    scriptwriter VARCHAR(50)
);

-- Creamos la tabla de actores (casting)
CREATE TABLE casting (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    actor VARCHAR(50)
);

-- Creamos la tabla de videos de YouTube (video)
CREATE TABLE videos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    video_url VARCHAR(80)
);

-- Creamos la tabla de enlaces a redes sociales (links)
CREATE TABLE links (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    facebook_url VARCHAR(50),
    twitter_url VARCHAR(50),
    instagram_url VARCHAR(50),
    web_url VARCHAR(50)
);

-- Creamos la tabla para las películas (movies)
CREATE TABLE movies (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    genre_id INT,
    year_release YEAR,
    director_id INT,
    scriptwriter_id INT,
    casting_id INT,
    image_bg VARCHAR(255),
    image_poster VARCHAR(255),
    overview TEXT,
    video_id INT,
    link_id INT,
    movie_status VARCHAR(20),
    original_language VARCHAR(20),
    budget DECIMAL(15,2),
    revenue DECIMAL(15,2),
    FOREIGN KEY (genre_id) REFERENCES genres(id),
    FOREIGN KEY (director_id) REFERENCES directors(id),
    FOREIGN KEY (scriptwriter_id) REFERENCES scriptwriters(id),
    FOREIGN KEY (casting_id) REFERENCES casting(id),
    FOREIGN KEY (video_id) REFERENCES videos(id),
    FOREIGN KEY (link_id) REFERENCES links(id)
);