USE movies_new;
-- avatar 2009 

-- Insertando géneros si no existen
INSERT INTO genres (genre)
SELECT 'Acción' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Acción');
INSERT INTO genres (genre)
SELECT 'Aventura' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Aventura');
INSERT INTO genres (genre)
SELECT 'Fantasía' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Fantasía');

-- Insertando directores si no existen
INSERT INTO directors (director_name)
SELECT 'James Cameron' WHERE NOT EXISTS (SELECT 1 FROM directors WHERE director_name = 'James Cameron');

-- Insertando guionistas si no existen
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'James Cameron' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'James Cameron');

-- Insertando actores si no existen
INSERT INTO casting (casting_name)
SELECT 'Sam Worthington' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Sam Worthington');
INSERT INTO casting (casting_name)
SELECT 'Zoe Saldana' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Zoe Saldana');
INSERT INTO casting (casting_name)
SELECT 'Sigourney Weaver' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Sigourney Weaver');

-- Insertando videos si no existen y obteniendo su ID
INSERT INTO videos (video_url)
SELECT 'https://www.youtube.com/watch?v=cRdxXPV9GNQ' WHERE NOT EXISTS (SELECT 1 FROM videos WHERE video_url = 'https://www.youtube.com/watch?v=cRdxXPV9GNQ');
SET @video_id = (SELECT id FROM videos WHERE video_url = 'https://www.youtube.com/watch?v=cRdxXPV9GNQ');

-- Insertando enlaces a redes sociales si no existen y obteniendo su ID
INSERT INTO links (facebook_url, twitter_url, instagram_url, web_url)
SELECT 'https://www.facebook.com/Avatar/', 'https://twitter.com/officialavatar', 'https://www.instagram.com/avatar/', 'https://www.avatar.com/movies/avatar'
WHERE NOT EXISTS (
    SELECT 1 FROM links
    WHERE facebook_url = 'https://www.facebook.com/Avatar/'
    AND twitter_url = 'https://twitter.com/officialavatar'
    AND instagram_url = 'https://www.instagram.com/avatar/https://www.instagram.com/headspacemovie'
    AND web_url = 'https://www.avatar.com/movies/avatar'
);
SET @link_id = (SELECT id FROM links WHERE facebook_url = 'https://www.facebook.com/Avatar/' AND twitter_url = 'https://twitter.com/officialavatar' AND instagram_url = 'https://www.instagram.com/avatar/' AND web_url = 'https://www.avatar.com/movies/avatar');


-- Insertando detalles de la película y obteniendo su ID
INSERT INTO movies (title, year_release, image_bg, image_poster,overview, budget, revenue, movie_status, original_language)
VALUES ('Avatar', 2009, '/images/avatar_bg.jpg', '/images/avatar_poster.jpg', 'Un marine parapléjico enviado a la luna Pandora en una misión única se debate entre seguir sus órdenes y proteger el mundo que siente como su hogar.',
        237000000, 2790000000, 'Released', 'English');
SET @movie_id = LAST_INSERT_ID();

-- Enlazando la película con géneros, directores, guionistas, actores, videos y enlaces
INSERT INTO movie_genres (movie_id, genre_id)
SELECT @movie_id, id FROM genres WHERE genre IN ('Acción', 'Aventura', 'Fantasía');

INSERT INTO movie_directors (movie_id, director_id)
SELECT @movie_id, id FROM directors WHERE director_name = 'James Cameron';

INSERT INTO movie_scriptwriters (movie_id, scriptwriter_id)
SELECT @movie_id, id FROM scriptwriters WHERE scriptwriter_name = 'James Cameron';

INSERT INTO movie_casting (movie_id, casting_id)
SELECT @movie_id, id FROM casting WHERE casting_name IN ('Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver');

-- Enlazando la película con el video
INSERT INTO movie_videos (movie_id, video_id)
VALUES (@movie_id, @video_id);

-- Enlazando la película con los enlaces
INSERT INTO movie_links (movie_id, link_id)
VALUES (@movie_id, @link_id);

-- ---------------------------------------------------------------------spacehead 2023-------------------------------------------------------------------------------------------

USE movies_new;

-- Insertando géneros si no existen
INSERT INTO genres (genre)
SELECT 'Animación' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Animación');
INSERT INTO genres (genre)
SELECT 'Aventura' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Aventura');
INSERT INTO genres (genre)
SELECT 'Acción' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Acción');

INSERT INTO directors (director_name)
SELECT 'Paul Meyer' WHERE NOT EXISTS (SELECT 1 FROM directors WHERE director_name = 'Paul Meyer');
INSERT INTO directors (director_name)
SELECT 'Pintor Gerhard' WHERE NOT EXISTS (SELECT 1 FROM directors WHERE director_name = 'Pintor Gerhard');

-- Inserting scriptwriters if they do not already exist
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'Daniel BuckLand' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'Daniel BuckLand');
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'Ronald Henry' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'Ronald Henry');
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'Paul Meyer' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'Paul Meyer');

-- Inserting casting if they do not already exist
INSERT INTO casting (casting_name)
SELECT 'Bonko Khoza' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Bonko Khoza');
INSERT INTO casting (casting_name)
SELECT 'Roberto Pombo' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Roberto Pombo');
INSERT INTO casting (casting_name)
SELECT 'Chris van Rensburg' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Chris van Rensburg');

-- Inserting video if it does not already exist and retrieving its ID
INSERT INTO videos (video_url)
SELECT 'https://www.youtube.com/watch?v=RQ2M-JoxSQk' WHERE NOT EXISTS (SELECT 1 FROM videos WHERE video_url = 'https://www.youtube.com/watch?v=RQ2M-JoxSQk');
SET @video_id = (SELECT id FROM videos WHERE video_url = 'https://www.youtube.com/watch?v=RQ2M-JoxSQk');

-- Inserting links to social media if they do not already exist and retrieving its ID
INSERT INTO links (facebook_url, twitter_url, instagram_url, web_url)
SELECT 'https://www.facebook.com/headspacemovie/', NULL, 'https://www.instagram.com/headspacemovie', 'https://scfilmsinternational.com/current-films-animation-titles/headspace/'
WHERE NOT EXISTS (
    SELECT 1 FROM links
    WHERE facebook_url = 'https://www.facebook.com/headspacemovie/'
    AND twitter_url IS NULL
    AND instagram_url = 'https://www.instagram.com/headspacemovie'
    AND web_url = 'https://scfilmsinternational.com/current-films-animation-titles/headspace/'
);
SET @link_id = (SELECT id FROM links WHERE facebook_url = 'https://www.facebook.com/headspacemovie/' AND instagram_url = 'https://www.instagram.com/headspacemovie' AND web_url = 'https://scfilmsinternational.com/current-films-animation-titles/headspace/');

-- Inserting movie details and retrieving its ID
INSERT INTO movies (title, year_release, image_bg, image_poster, overview, budget, revenue, movie_status, original_language)
VALUES ('Headspace', 2023, '/images/headspace_bg.jpg', '/images/headspace_poster.jpg', 'Después de perseguir al malvado Zolthard a través de un agujero de gusano, tres extraterrestres quedan varados en el cerebro de Norman, de 16 años.', 1000000, 1457277, 'Released', 'English');
SET @movie_id = LAST_INSERT_ID();

-- Linking the movie with genres, directors, scriptwriters, casting, videos, and links
INSERT INTO movie_genres (movie_id, genre_id)
SELECT @movie_id, id FROM genres WHERE genre IN ('Animación', 'Aventura', 'Acción');

INSERT INTO movie_directors (movie_id, director_id)
SELECT @movie_id, id FROM directors WHERE director_name IN ('Paul Meyer', 'Pintor Gerhard');

INSERT INTO movie_scriptwriters (movie_id, scriptwriter_id)
SELECT @movie_id, id FROM scriptwriters WHERE scriptwriter_name IN ('Daniel BuckLand', 'Ronald Henry', 'Paul Meyer');

INSERT INTO movie_casting (movie_id, casting_id)
SELECT @movie_id, id FROM casting WHERE casting_name IN ('Bonko Khoza', 'Roberto Pombo', 'Chris van Rensburg');

-- Linking the movie with video
INSERT INTO movie_videos (movie_id, video_id)
VALUES (@movie_id, @video_id);

-- Linking the movie with links
INSERT INTO movie_links (movie_id, link_id)
VALUES (@movie_id, @link_id);

-- coco -------------------------------------------------------------------
USE movies_new;

-- Inserting directors if they do not already exist
INSERT INTO directors (director_name)
SELECT 'Lee Unkrich' WHERE NOT EXISTS (SELECT 1 FROM directors WHERE director_name = 'Lee Unkrich');
INSERT INTO directors (director_name)
SELECT 'Adrian Molina' WHERE NOT EXISTS (SELECT 1 FROM directors WHERE director_name = 'Adrian Molina');

-- Insertando géneros si no existen
INSERT INTO genres (genre)
SELECT 'Animación' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Animación');
INSERT INTO genres (genre)
SELECT 'Aventura' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Aventura');
INSERT INTO genres (genre)
SELECT 'Drama' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Drama');

-- Inserting scriptwriters if they do not already exist
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'Lee Unkrich' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'Lee Unkrich');
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'Jason Katz' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'Jason Katz');
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'Matthew Aldrich' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'Matthew Aldrich');

-- Inserting casting if they do not already exist
INSERT INTO casting (casting_name)
SELECT 'Anthony Gonzalez' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Anthony Gonzalez');
INSERT INTO casting (casting_name)
SELECT 'Gael García Bernal' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Gael García Bernal');
INSERT INTO casting (casting_name)
SELECT 'Benjamin Bratt' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Benjamin Bratt');

-- Inserting video if it does not already exist and retrieving its ID
INSERT INTO videos (video_url)
SELECT 'https://www.youtube.com/watch?v=awzWdtCezDo' WHERE NOT EXISTS (SELECT 1 FROM videos WHERE video_url = 'https://www.youtube.com/watch?v=awzWdtCezDo');
SET @video_id = (SELECT id FROM videos WHERE video_url = 'https://www.youtube.com/watch?v=awzWdtCezDo');

-- Inserting links to social media if they do not already exist and retrieving its ID
INSERT INTO links (facebook_url, twitter_url, instagram_url, web_url)
SELECT 'https://www.facebook.com/PixarCoco/', 'https://x.com/pixarcoco', 'https://www.instagram.com/pixarcoco/', 'https://www.disneylatino.com/peliculas/disney-pixar-coco'
WHERE NOT EXISTS (
    SELECT 1 FROM links
    WHERE facebook_url = 'https://www.facebook.com/PixarCoco/'
    AND twitter_url = 'https://x.com/pixarcoco'
    AND instagram_url = 'https://www.instagram.com/pixarcoco/'
    AND web_url = 'https://www.disneylatino.com/peliculas/disney-pixar-coco'
);
SET @link_id = (SELECT id FROM links WHERE facebook_url = 'https://www.facebook.com/PixarCoco/' AND twitter_url = 'https://x.com/pixarcoco' AND instagram_url = 'https://www.instagram.com/pixarcoco/' AND web_url = 'https://www.disneylatino.com/peliculas/disney-pixar-coco');

-- Inserting movie details and retrieving its ID
INSERT INTO movies (title, year_release, image_bg, image_poster, overview, budget, revenue, movie_status, original_language)
VALUES ('Coco', 2017, '/images/coco_bg.jpg', '/images/coco_poster.jpg', 'El aspirante a músico Miguel, entra a la Tierra de los Muertos para encontrar a su tatarabuelo, un legendario cantante.', 175000000, 807082196, 'Released', 'English');
SET @movie_id = LAST_INSERT_ID();

-- Linking the movie with genres, directors, scriptwriters, casting, videos, and links
INSERT INTO movie_genres (movie_id, genre_id)
SELECT @movie_id, id FROM genres WHERE genre IN ('Animación', 'Aventura', 'Drama');

INSERT INTO movie_directors (movie_id, director_id)
SELECT @movie_id, id FROM directors WHERE director_name IN ('Lee Unkrich', 'Adrian Molina');

INSERT INTO movie_scriptwriters (movie_id, scriptwriter_id)
SELECT @movie_id, id FROM scriptwriters WHERE scriptwriter_name IN ('Lee Unkrich', 'Jason Katz', 'Matthew Aldrich');

INSERT INTO movie_casting (movie_id, casting_id)
SELECT @movie_id, id FROM casting WHERE casting_name IN ('Anthony Gonzalez', 'Gael García Bernal', 'Benjamin Bratt');

-- Linking the movie with video
INSERT INTO movie_videos (movie_id, video_id)
VALUES (@movie_id, @video_id);

-- Linking the movie with links
INSERT INTO movie_links (movie_id, link_id)
VALUES (@movie_id, @link_id);

-- the dark knight 2008
USE movies_new;

-- Inserting directors if they do not already exist
INSERT INTO directors (director_name)
SELECT 'Christopher Nolan' WHERE NOT EXISTS (SELECT 1 FROM directors WHERE director_name = 'Christopher Nolan');

-- Insertando géneros si no existen
INSERT INTO genres (genre)
SELECT 'Acción' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Acción');
INSERT INTO genres (genre)
SELECT 'Crimen' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Crimen');
INSERT INTO genres (genre)
SELECT 'Drama' WHERE NOT EXISTS (SELECT 1 FROM genres WHERE genre = 'Drama');

-- Inserting scriptwriters if they do not already exist
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'Jonathan Nolan' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'Jonathan Nolan');
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'Christopher Nolan' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'Christopher Nolan');
INSERT INTO scriptwriters (scriptwriter_name)
SELECT 'David S. Goyer' WHERE NOT EXISTS (SELECT 1 FROM scriptwriters WHERE scriptwriter_name = 'David S. Goyer');

-- Inserting casting if they do not already exist
INSERT INTO casting (casting_name)
SELECT 'Christian Bale' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Christian Bale');
INSERT INTO casting (casting_name)
SELECT 'Heath Ledger' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Heath Ledger');
INSERT INTO casting (casting_name)
SELECT 'Aaron Eckhart' WHERE NOT EXISTS (SELECT 1 FROM casting WHERE casting_name = 'Aaron Eckhart');

-- Inserting video if it does not already exist and retrieving its ID
INSERT INTO videos (video_url)
SELECT 'https://www.youtube.com/watch?v=Y6NcC2FHecg' WHERE NOT EXISTS (SELECT 1 FROM videos WHERE video_url = 'https://www.youtube.com/watch?v=Y6NcC2FHecg');
SET @video_id = (SELECT id FROM videos WHERE video_url = 'https://www.youtube.com/watch?v=Y6NcC2FHecg');

-- Inserting links to social media if they do not already exist and retrieving its ID
INSERT INTO links (facebook_url, twitter_url, instagram_url, web_url)
SELECT 'https://www.facebook.com/warnerbrosent/', 'https://twitter.com/Warnerbros/', 'https://www.instagram.com/warnerbrosentertainment/', 'https://www.warnerbros.com/movies/dark-knight'
WHERE NOT EXISTS (
    SELECT 1 FROM links
    WHERE facebook_url = 'https://www.facebook.com/warnerbrosent/'
    AND twitter_url = 'https://twitter.com/Warnerbros/'
    AND instagram_url = 'https://www.instagram.com/warnerbrosentertainment/'
    AND web_url = 'https://www.warnerbros.com/movies/dark-knight'
);
SET @link_id = (SELECT id FROM links WHERE facebook_url = 'https://www.facebook.com/warnerbrosent/' AND twitter_url = 'https://twitter.com/Warnerbros/' AND instagram_url = 'https://www.instagram.com/warnerbrosentertainment/' AND web_url = 'https://www.warnerbros.com/movies/dark-knight');

-- Inserting movie details and retrieving its ID
INSERT INTO movies (title, year_release, image_bg, image_poster, overview, budget, revenue, movie_status, original_language)
VALUES ('Batman: El caballero de la noche', 2008, '/images/batman_2008_bg.jpg', '/images/batman_2008_poster.jpg', 'Cuando el Joker emerge causando caos y violencia en Gotham, el caballero de la noches deberá aceptar una de las pruebas psicológicas y físicas más difíciles para poder luchar con las injusticias del enemigo.', 185000000, 1006000000, 'Released', 'English');
SET @movie_id = LAST_INSERT_ID();

-- Linking the movie with genres, directors, scriptwriters, casting, videos, and links
INSERT INTO movie_genres (movie_id, genre_id)
SELECT @movie_id, id FROM genres WHERE genre IN ('Acción', 'Crimen', 'Drama');

INSERT INTO movie_directors (movie_id, director_id)
SELECT @movie_id, id FROM directors WHERE director_name = 'Christopher Nolan';

INSERT INTO movie_scriptwriters (movie_id, scriptwriter_id)
SELECT @movie_id, id FROM scriptwriters WHERE scriptwriter_name IN ('Jonathan Nolan', 'Christopher Nolan', 'David S. Goyer');

INSERT INTO movie_casting (movie_id, casting_id)
SELECT @movie_id, id FROM casting WHERE casting_name IN ('Christian Bale', 'Heath Ledger', 'Aaron Eckhart');

-- Linking the movie with video
INSERT INTO movie_videos (movie_id, video_id)
VALUES (@movie_id, @video_id);

-- Linking the movie with links
INSERT INTO movie_links (movie_id, link_id)
VALUES (@movie_id, @link_id);