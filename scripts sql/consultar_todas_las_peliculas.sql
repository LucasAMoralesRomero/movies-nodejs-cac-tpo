USE movies_new;
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
    (SELECT GROUP_CONCAT(g.genre SEPARATOR ', ') 
     FROM genres g 
     INNER JOIN movie_genres mg ON g.id = mg.genre_id 
     WHERE mg.movie_id = m.id) AS genres,
    (SELECT GROUP_CONCAT(d.director_name SEPARATOR ', ') 
     FROM directors d 
     INNER JOIN movie_directors md ON d.id = md.director_id 
     WHERE md.movie_id = m.id) AS directors,
    (SELECT GROUP_CONCAT(s.scriptwriter_name SEPARATOR ', ') 
     FROM scriptwriters s 
     INNER JOIN movie_scriptwriters ms ON s.id = ms.scriptwriter_id 
     WHERE ms.movie_id = m.id) AS scriptwriters,
    (SELECT GROUP_CONCAT(c.casting_name SEPARATOR ', ') 
     FROM casting c 
     INNER JOIN movie_casting mc ON c.id = mc.casting_id 
     WHERE mc.movie_id = m.id) AS casting,
    (SELECT v.video_url 
     FROM videos v 
     INNER JOIN movie_videos mv ON v.id = mv.video_id 
     WHERE mv.movie_id = m.id LIMIT 1) AS video_url,
    (SELECT l.facebook_url 
     FROM links l 
     INNER JOIN movie_links ml ON l.id = ml.link_id 
     WHERE ml.movie_id = m.id LIMIT 1) AS facebook_url,
    (SELECT l.twitter_url 
     FROM links l 
     INNER JOIN movie_links ml ON l.id = ml.link_id 
     WHERE ml.movie_id = m.id LIMIT 1) AS twitter_url,
    (SELECT l.instagram_url 
     FROM links l 
     INNER JOIN movie_links ml ON l.id = ml.link_id 
     WHERE ml.movie_id = m.id LIMIT 1) AS instagram_url,
    (SELECT l.web_url 
     FROM links l 
     INNER JOIN movie_links ml ON l.id = ml.link_id 
     WHERE ml.movie_id = m.id LIMIT 1) AS web_url
FROM 
    movies m;