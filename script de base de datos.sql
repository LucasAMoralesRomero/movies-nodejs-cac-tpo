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
-- creamos la tabla pelicula
	create table pelicula
		(
        id int not null primary key auto_increment,
        titulo varchar (30) not null,
        id_genero int,
        foreign key (id_genero) references generos (id),
        anio year,
        -- 42 para imagen 80 para link
        imagen1 varchar (42),
        imagen2 varchar (42),
        imagen3 varchar (42),
        link varchar (80),
        -- bool si es estreno
        estreno bool
        );

