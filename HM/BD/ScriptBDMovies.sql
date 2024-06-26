-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS movies;

-- Crear la base de datos
CREATE DATABASE movies;
USE movies;

-- Crear la tabla director
CREATE TABLE director (
    director_id INT AUTO_INCREMENT PRIMARY KEY,
    director_nombre VARCHAR(255) NOT NULL
);

-- Crear la tabla pelicula
CREATE TABLE pelicula (
    pelicula_id INT AUTO_INCREMENT PRIMARY KEY,
    pelicula_titulo VARCHAR(255) NOT NULL,
    pelicula_anio INT,
    pelicula_sinopsis TEXT,
    pelicula_imagen1_url VARCHAR(255),
    pelicula_imagen2_url VARCHAR(255),
    pelicula_imagen3_url VARCHAR(255),
    pelicula_trailer_url VARCHAR(255),
    pelicula_duracion VARCHAR(24),
    director_id INT,
    FOREIGN KEY (director_id) REFERENCES director(director_id)
);

-- Crear la tabla actor
CREATE TABLE actor (
    actor_id INT AUTO_INCREMENT PRIMARY KEY,
    actor_nombre VARCHAR(255) NOT NULL
);

-- Crear la tabla genero
CREATE TABLE genero (
    genero_id INT AUTO_INCREMENT PRIMARY KEY,
    genero_nombre VARCHAR(100) NOT NULL
);

-- Crear la tabla intermedia pelicula_actor
CREATE TABLE pelicula_actor (
    pelicula_id INT,
    actor_id INT,
    PRIMARY KEY (pelicula_id, actor_id),
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(pelicula_id),
    FOREIGN KEY (actor_id) REFERENCES actor(actor_id)
);

-- Crear la tabla intermedia pelicula_genero
CREATE TABLE pelicula_genero (
    pelicula_id INT,
    genero_id INT,
    PRIMARY KEY (pelicula_id, genero_id),
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(pelicula_id),
    FOREIGN KEY (genero_id) REFERENCES genero(genero_id)
);

-- Crear la tabla personaje
CREATE TABLE personaje (
    personaje_id INT AUTO_INCREMENT PRIMARY KEY,
    personaje_nombre VARCHAR(255) NOT NULL,
    pelicula_id INT,
    actor_id INT,
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(pelicula_id),
    FOREIGN KEY (actor_id) REFERENCES actor(actor_id)
);

-- Insertar Directores
INSERT INTO director (director_nombre) VALUES
('James Cameron'),
('Jon Favreau'),
('Lee Unkrich'),
('Christopher Nolan'),
('Morten Tyldum'),
('Luis Llosa'),
('Francis Ford Coppola'),
('Roman Polanski'),
('Roger Allers'),
('Jonathan Demme'),
('Edward Zwick'),
('Robert Zemeckis'),
('Ridley Scott'),
('Pete Docter'),
('Michael Showalter'),
('Damien Chazelle'),
('Denis Villeneuve'),
('David Fincher'),
('The Wachowski'),
('Brad Silberling'),
('Quentin Tarantino'),
('Ron Howard'),
('Woody Allen'),
('Colin Levy'),
('Frank Darabont'),
('Kathryn Bigelow');

-- Insertar actores
INSERT INTO actor (actor_nombre) VALUES
('Sam Worthington'),
('Zoe Saldana'),
('Sigourney Weaver'),
('Stephen Lang'),
('Jonah Bobo'),
('Josh Hutcherson'),
('Kristen Stewart'),
('Dax Shepard'),
('Anthony Gonzalez'),
('Gael García Bernal'),
('Benjamin Bratt'),
('Alanna Ubach'),
('Christian Bale'),
('Heath Ledger'),
('Aaron Eckhart'),
('Michael Caine'),
('Benedict Cumberbatch'),
('Keira Knightley'),
('Matthew Goode'),
('Mark Strong'),
('Sylvester Stallone'),
('Sharon Stone'),
('James Woods'),
('Eric Roberts'),
('Marlon Brando'),
('Al Pacino'),
('James Caan'),
('Robert Duvall'),
('Adrien Brody'),
('Thomas Kretschmann'),
('Emilia Fox'),
('Frank Finlay'),
('Matthew Broderick'),
('Jeremy Irons'),
('James Earl Jones'),
('Moira Kelly'),
('Jodie Foster'),
('Anthony Hopkins'),
('Scott Glenn'),
('Ted Levine'),
('Tom Cruise'),
('Ken Watanabe'),
('Billy Connolly'),
('Tony Goldwyn'),
('Tom Hanks'),
('Robin Wright'),
('Gary Sinise'),
('Sally Field'),
('Russell Crowe'),
('Joaquin Phoenix'),
('Connie Nielsen'),
('Oliver Reed'),
('Leonardo DiCaprio'),
('Joseph Gordon-Levitt'),
('Ellen Page'),
('Tom Hardy'),
('Amy Poehler'),
('Phyllis Smith'),
('Richard Kind'),
('Lewis Black'),
('Matthew McConaughey'),
('Anne Hathaway'),
('Jessica Chastain'),
('Nicholas Galitzine'),
('Ella Rubin'),
('Reid Scott'),
('Ryan Gosling'),
('Emma Stone'),
('John Legend'),
('Rosemarie DeWitt'),
('Amy Adams'),
('Jeremy Renner'),
('Forest Whitaker'),
('Michael Stuhlbarg'),
('Jesse Eisenberg'),
('Andrew Garfield'),
('Justin Timberlake'),
('Armie Hammer'),
('Keanu Reeves'),
('Laurence Fishburne'),
('Carrie-Anne Moss'),
('Hugo Weaving'),
('Bill Pullman'),
('Christina Ricci'),
('Cathy Moriarty'),
('Eric Idle'),
('John Travolta'),
('Samuel L. Jackson'),
('Uma Thurman'),
('Bruce Willis'),
('Renée Zellweger'),
('Paul Giamatti'),
('Craig Bierko'),
('Owen Wilson'),
('Rachel McAdams'),
('Marion Cotillard'),
('Kathy Bates'),
('Halina Reijn'),
('Thom Hoffman'),
('Tim Robbins'),
('Morgan Freeman'),
('Bob Gunton'),
('William Sadler'),
('Anthony Mackie'),
('Brian Geraghty'),
('Guy Pearce');

-- Insertar Generos
INSERT INTO genero (genero_nombre) VALUES
('Acción'),
('Animación'),
('Aventura'),
('Biografía'),
('Ciencia ficción'),
('Comedia'),
('Comedia musical'),
('Corto'),
('Crimen'),
('Deportes'),
('Drama'),
('Familiar'),
('Fantasía'),
('Guerra'),
('Historia'),
('Misterio'),
('Musical'),
('Romance'),
('Suspenso'),
('Thriller');

-- Insertar las películas
INSERT INTO pelicula (pelicula_titulo, pelicula_anio, pelicula_sinopsis, pelicula_imagen1_url, pelicula_imagen2_url, pelicula_imagen3_url, pelicula_trailer_url, pelicula_duracion, director_id)
VALUES 
('Avatar', 2009, 'Un marine parapléjico es enviado a la luna Pandora en una misión única, pero se debate entre seguir órdenes y proteger el mundo que siente como su hogar.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli1.html', '2h 42m', 1),
('Aventura Espacial', 2023, 'Un grupo de astronautas emprende un viaje a través del universo para encontrar un nuevo hogar para la humanidad.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli2.html', '2h 30m', 2),
('Coco', 2017, 'Un niño mexicano viaja al mundo de los muertos para descubrir la verdad sobre su familia y su pasión por la música.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli3.html', '1h 45m', 3),
('El caballero oscuro', 2008, 'Batman enfrenta su mayor desafío cuando el Joker desata el caos en Gotham City.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli4.html', '2h 32m', 4),
('El código enigma', 2014, 'La historia de Alan Turing y su trabajo en descifrar el código Enigma durante la Segunda Guerra Mundial.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli1.html', '1h 53m', 5),
('El especialista', 2024, 'Un doble de Hollywood trabaja como cazarrecompensas para sobrevivir.', './img/movies/elEspecialista1.jpg', './img/movies/elEspecialista2.jpg', './img/movies/elEspecialista3.jpg', 'Peli2.html', '2h 6m', 6),
('El padrino', 1972, 'La historia épica de una familia de la mafia italiana en Estados Unidos.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli3.html', '2h 55m', 7),
('El pianista', 2002, 'La historia real de un pianista judío polaco que lucha por sobrevivir durante la Segunda Guerra Mundial.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli4.html', '2h 30m', 8),
('El rey león', 1994, 'Un joven león debe asumir su destino como rey de la sabana africana tras la muerte de su padre.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli1.html', '1h 28m', 9),
('El silencio de los inocentes', 1991, 'Una joven agente del FBI busca la ayuda de un brillante pero peligroso asesino en serie para capturar a otro asesino en serie.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli2.html', '1h 58m', 10),
('El último samurái', 2003, 'Un soldado estadounidense se une a un grupo de samuráis en su lucha contra un nuevo régimen.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli3.html', '2h 28m', 11),
('Forrest Gump', 1994, 'La extraordinaria vida de Forrest Gump, un hombre con un coeficiente intelectual bajo, pero con una bondad y determinación insuperables.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli4.html', '2h 22m', 12),
('Gladiador', 2000, 'Un general romano traicionado que se convierte en gladiador busca vengar a su familia asesinada.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli1.html', '2h 35m', 13),
('Inception', 2010, 'Un ladrón especializado en el espionaje corporativo mediante el uso de tecnología de sueño compartido.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli2.html', '2h 28m', 4),
('Intensamente', 2015, 'Las emociones de una niña deben guiarla a través de un cambio de vida cuando su familia se muda a una nueva ciudad.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli3.html', '1h 35m', 14),
('Interestelar', 2014, 'Un grupo de exploradores viaja a través de un agujero de gusano en un intento de asegurar el futuro de la humanidad.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli4.html', '2h 49m', 4),
('La idea de tenerte', 2024, 'Solène, madre soltera de 40 años, inicia un romance inesperado con Hayes Campbell, el joven líder de la famosa banda August Moon.', './img/movies/laIdeaDeTenerte1.jpg', './img/movies/laIdeaDeTenerte2.jpg', './img/movies/laIdeaDeTenerte3.jpg', 'Peli1.html', '1h 99m', 15),
('La la land', 2016, 'Un músico de jazz y una aspirante a actriz se enamoran mientras persiguen sus sueños en Los Ángeles.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli2.html', '2h 8m', 16),
('La llegada', 2016, 'Una lingüista es reclutada para comunicarse con extraterrestres que han llegado a la Tierra.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli3.html', '1h 56m', 17),
('La red social', 2010, 'La historia de cómo Mark Zuckerberg creó Facebook y enfrentó problemas legales y personales.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli4.html', '2h', 18),
('Matrix', 1999, 'Un hacker descubre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli1.html', '2h 16m', 19),
('Misterio en la mansión', 2020, 'Un detective investiga una serie de asesinatos en una antigua mansión llena de secretos.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli2.html', '1h 55m', 20),
('Pulp Fiction', 1994, 'Las vidas de dos sicarios, un boxeador, la esposa de un gánster y un par de bandidos se entrelazan en una serie de incidentes violentos.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli3.html', '2h 34m', 21),
('Rivales', 2024, 'Tres tenistas reviven viejas rivalidades dentro y fuera de la pista mientras compiten por el prestigioso título del Grand Slam.', './img/movies/rivales1.jpg', './img/movies/rivales2.jpg', './img/movies/rivales3.jpg', 'Peli4.html', '2h 11m', 22),
('Romance en París', 2022, 'Dos desconocidos se enamoran en las calles de París y deben enfrentar diversos obstáculos para estar juntos.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli1.html', '1h 45m', 23),
('Sintel', 2010, 'Sintel cuenta la historia de una chica y su amistad con un bebé dragón, y los desesperados extremos a los que llegará cuando esa amistad le sea arrebatada.', './img/movies/sintel1.jpg', './img/movies/sintel2.jpg', './img/movies/sintel3.jpg', 'Peli2.html', '14m 48s', 24),
('Sueños de libertad', 1994, 'La inspiradora historia de un grupo de prisioneros que planifican su escape de una prisión de máxima seguridad.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli3.html', '2h 22m', 25),
('Viviendo al límite', 2021, 'Un ex agente de la CIA debe usar todas sus habilidades para salvar a su familia de un peligroso cartel de la droga.', './img/movies/default.jpg', './img/movies/default.jpg', './img/movies/default.jpg', 'Peli3.html', '1h 40m', 26);

-- Insertar Personajes
INSERT INTO personaje (personaje_nombre, pelicula_id, actor_id) VALUES
('Jake Sully', 1, 1), -- Avatar
('Neytiri', 1, 2), -- Avatar
('Dr. Grace Augustine', 1, 3), -- Avatar
('Colonel Miles Quaritch', 1, 4), -- Avatar

('Danny', 2, 5), -- Aventura Espacial 
('Walter', 2, 6), -- Aventura Espacial 
('Lisa', 2, 7), -- Aventura Espacial 
('Astronauta', 2, 8), -- Aventura Espacial 

('Miguel', 3, 9), -- Coco
('Héctor', 3, 10), -- Coco
('Ernesto de la Cruz', 3, 11), -- Coco
('Mamá Imelda', 3, 12), -- Coco

('Bruce Wayne / Batman', 4, 13), -- El caballero oscuro
('Joker', 4, 14), -- El caballero oscuro
('Harvey Dent / Two-Face', 4, 15), -- El caballero oscuro
('Alfred Pennyworth', 4, 16), -- El caballero oscuro

('Alan Turing', 5, 17), -- El código enigma
('Joan Clarke', 5, 18), -- El código enigma
('Hugh Alexander', 5, 19), -- El código enigma
('Stewart Menzies', 5, 20), -- El código enigma

('Ray Quick', 6, 21), -- El especialista
('May Munro', 6, 22), -- El especialista
('Ned Trent', 6, 23), -- El especialista
('Tomas Leon', 6, 24), -- El especialista

('Don Vito Corleone', 7, 25), -- El padrino
('Michael Corleone', 7, 26), -- El padrino
('Sonny Corleone', 7, 27), -- El padrino
('Tom Hagen', 7, 28), -- El padrino

('Władysław Szpilman', 8, 29), -- El pianista
('Wilm Hosenfeld', 8, 30), -- El pianista
('Dorota', 8, 31), -- El pianista
('Father', 8, 32), -- El pianista

('Simba', 9, 33), -- El rey león
('Scar', 9, 34), -- El rey león
('Mufasa', 9, 35), -- El rey león
('Nala', 9, 36), -- El rey león

('Clarice Starling', 10, 37), -- El silencio de los inocentes
('Dr. Hannibal Lecter', 10, 38), -- El silencio de los inocentes
('Jack Crawford', 10, 39), -- El silencio de los inocentes
('Jame Gumb', 10, 40), -- El silencio de los inocentes

('Nathan Algren', 11, 41), -- El último samurái
('Katsumoto', 11, 42), -- El último samurái
('Zebulon Gant', 11, 43), -- El último samurái
('Colonel Bagley', 11, 44), -- El último samurái

('Forrest Gump', 12, 45), -- Forrest Gump
('Jenny Curran', 12, 46), -- Forrest Gump
('Lt. Dan Taylor', 12, 47), -- Forrest Gump
('Mrs. Gump', 12, 48), -- Forrest Gump

('Maximus', 13, 49), -- Gladiador
('Commodus', 13, 50), -- Gladiador
('Lucilla', 13, 51), -- Gladiador
('Proximo', 13, 52), -- Gladiador

('Cobb', 14, 53), -- Inception
('Arthur', 14, 54), -- Inception
('Ariadne', 14, 55), -- Inception
('Eames', 14, 56), -- Inception

('Joy', 15, 57), -- Intensamente
('Sadness', 15, 58), -- Intensamente
('Bing Bong', 15, 59), -- Intensamente
('Anger', 15, 60), -- Intensamente

('Cooper', 16, 61), -- Interestelar
('Brand', 16, 62), -- Interestelar
('Murph', 16, 63), -- Interestelar
('Professor Brand', 16, 16), -- Interestelar

('Solene', 17, 62), -- La idea de tenerte 
('Hayes Campbell', 17, 64), -- La idea de tenerte 
('Izzy', 17, 65), -- La idea de tenerte 
('Daniel', 17, 66), -- La idea de tenerte 

('Sebastian', 18, 67), -- La la land
('Mia', 18, 68), -- La la land
('Keith', 18, 69), -- La la land
('Laura', 18, 70), -- La la land

('Louise Banks', 19, 71), -- La llegada
('Ian Donnelly', 19, 72), -- La llegada
('Colonel Weber', 19, 73), -- La llegada
('Agent Halpern', 19, 74), -- La llegada

('Mark Zuckerberg', 20, 75), -- La red social
('Eduardo Saverin', 20, 76), -- La red social
('Sean Parker', 20, 77), -- La red social
('Cameron Winklevoss', 20, 78), -- La red social

('Neo', 21, 79), -- Matrix
('Morpheus', 21, 80), -- Matrix
('Trinity', 21, 81), -- Matrix
('Agent Smith', 21, 82), -- Matrix

('James Harvey', 22, 83), -- Misterio en la mansión
('Kat Harvey', 22, 84), -- Misterio en la mansión
('Carrigan Crittenden', 22, 85), -- Misterio en la mansión
('Dibs', 22, 86), -- Misterio en la mansión

('Vincent Vega', 23, 87), -- Pulp Fiction
('Jules Winnfield', 23, 88), -- Pulp Fiction
('Mia Wallace', 23, 89), -- Pulp Fiction
('Butch Coolidge', 23, 90), -- Pulp Fiction

('Jim Braddock', 24, 49), -- Rivales
('Mae Braddock', 24, 91), -- Rivales
('Joe Gould', 24, 92), -- Rivales
('Max Baer', 24, 93), -- Rivales

('Gil', 25, 94), -- Romance en París
('Inez', 25, 95), -- Romance en París
('Adriana', 25, 96), -- Romance en París
('Carol', 25, 97), -- Romance en París

('Sintel', 26, 98), -- Sintel 
('Shaman', 26, 99), -- Sintel 

('Andy Dufresne', 27, 100), -- Sueños de libertad
('Ellis Boyd "Red" Redding', 27, 101), -- Sueños de libertad
('Warden Norton', 27, 102), -- Sueños de libertad
('Heywood', 27, 103), -- Sueños de libertad

('Sergeant William James', 28, 72), -- Viviendo al límite
('Sergeant JT Sanborn', 28, 104), -- Viviendo al límite
('Specialist Owen Eldridge', 28, 105), -- Viviendo al límite
('Staff Sergeant Matthew Thompson', 28, 106); -- Viviendo al límite

-- Insertar relaciones película-actor
INSERT INTO pelicula_actor (pelicula_id, actor_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (2, 5), (2, 6), (2, 7), (2, 8),
(3, 9), (3, 10), (3, 11), (3, 12), (4, 13), (4, 14), (4, 15),
(4, 16), (5, 17), (5, 18), (5, 19), (5, 20), (6, 21), (6, 22),
(6, 23), (6, 24), (7, 25), (7, 26), (7, 27), (7, 28), (8, 29), 
(8, 30), (8, 31), (8, 32), (9, 33), (9, 34), (9, 35), (9, 36),
(10, 37), (10, 38), (10, 39), (10, 40), (11, 41), (11, 42),
(11, 43), (11, 44), (12, 45), (12, 46), (12, 47), (12, 48),
(13, 49), (13, 50), (13, 51), (13, 52), (14, 53), (14, 54), (14, 55),
(14, 56), (15, 57), (15, 58), (15, 59), (15, 60), (16, 61), (16, 62),
(16, 63), (16, 16), (17, 62), (17, 64), (17, 65), (17, 66), (18, 67),
(18, 68), (18, 69), (18, 70), (19, 71), (19, 72), (19, 73), (19, 74),
(20, 75), (20, 76), (20, 77), (20, 78), (21, 79), (21, 80), (21, 81),
(21, 82), (22, 83), (22, 84), (22, 85), (22, 86), (23, 87), (23, 88),
(23, 89), (23, 90), (24, 49), (24, 91), (24, 92), (24, 93), (25, 94),
(25, 95), (25, 96), (25, 97), (26, 98), (26, 99), (27, 100), (27, 101),
(27, 102), (27, 103), (28, 72), (28, 104), (28, 105), (28, 106);

-- Insertar relaciones película-género
INSERT INTO pelicula_genero (pelicula_id, genero_id) VALUES
(1, 1), (1, 3), (1, 5), (2, 1), (2, 3), (2, 5), (3, 2), (3, 6), 
(3, 12), (4, 1), (4, 9), (4, 11), (5, 4), (5, 11), (5, 20), 
(6, 1), (6, 9), (6, 11), (6, 20), (7, 1), (7, 9), (7, 11), (8, 4), 
(8, 11), (8, 14), (9, 2), (9, 3), (9, 12), (9, 17), (10, 9), (10, 11), 
(10, 16), (10, 19), (10, 20), (11, 1), (11, 11), (11, 14), (12, 11), 
(12, 18), (13, 1), (13, 3), (13, 11), (14, 1), (14, 3), 
(14, 5), (15, 2), (15, 6), (15, 12), (15, 13), (16, 3), (16, 11), 
(16, 5), (17, 11), (17, 18), (18, 7), (18, 11), (18, 18), (19, 5), 
(19, 11), (19, 16), (20, 4), (20, 11), (21, 1), (21, 5), (22, 6), 
(22, 12), (22, 16), (23, 1), (23, 9), (23, 11), (24, 10), 
(24, 11), (25, 6), (25, 18), (26, 2), (26, 8), (26, 13), (27, 11),
(28, 11), (28, 15), (28, 20);

select * from director;
select * from pelicula;
select * from actor;
select * from genero;
select * from pelicula_actor;
select * from pelicula_genero;
select * from personaje;

SELECT p.pelicula_titulo, d.director_nombre
FROM pelicula p
JOIN director d ON p.director_id = d.director_id;

SELECT p.pelicula_titulo, d.director_nombre, a.actor_nombre
FROM pelicula p
JOIN director d JOIN actor a ON p.director_id = d.director_id AND p.pelicula_id = a.actor_id;

SELECT *
FROM pelicula p
JOIN director d JOIN actor a ON p.director_id = d.director_id AND p.pelicula_id = a.actor_id;

-- Seleccionar todos los actores de la película "Avatar"
SELECT actor.actor_id, actor.actor_nombre, pelicula_titulo
FROM pelicula
JOIN pelicula_actor ON pelicula.pelicula_id = pelicula_actor.pelicula_id
JOIN actor ON pelicula_actor.actor_id = actor.actor_id
WHERE pelicula.pelicula_titulo = 'Avatar';