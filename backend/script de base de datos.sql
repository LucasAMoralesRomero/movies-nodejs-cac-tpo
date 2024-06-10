-- creamos la base de datos peliculas
create database movies;
-- usamos la base de datos
use movies;
-- creamos la tabla genero (contiene el id y el campo)
	create table generos
    (
		id int not null primary key auto_increment,
        nombre_genero varchar(10)
    );

-- usamos la base de datos
use movies;
-- creamos la tabla director (contiene el id  y el nombre del director)
 create table director 
   (
        id int not null primary key auto_increment,
        nombre_director varchar (30) not null
        
   );

-- usamos la base de datos
use movies;
-- creamos la tabla pelicula
	create table pelicula
		(
        id int not null primary key auto_increment,
        titulo varchar (30) not null,
        id_genero int,
        foreign key (id_genero) references generos (id),
        anio year,
        id_director int,
        foreign key (id_director) references director (id),
        -- 42 para imagen 80 para link
        imagen1 varchar (42),
        imagen2 varchar (42),
        imagen3 varchar (42),
        link varchar (80),
        -- bool si es estreno
        estreno bool
        );

-- usamos la base de datos
use movies;
-- creamos la tabla descripcion para guardar la descripcion de la pelicula
  create table descripcion 
    (
        id int not null primary key auto_increment,
        id_movie int,
        descripcion tinytext,
        foreign key (id_movie) references pelicula(id)
        );
