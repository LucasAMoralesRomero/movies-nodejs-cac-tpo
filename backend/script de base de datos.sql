-- creamos la base de datos peliculas
create database movies;
-- usamos la base de datos
use movies;
-- creamos la tabla genero (contiene el id y el campo)
	create table generos
    (
		id int not null primary key auto_increment,
        nombre_genero varchar(20)
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
-- usamos la base de datos
use movies;
-- creamos la tabla de actores
	create table actors(
		id int not null primary key auto_increment,
        nombre_actor varchar(50),
        descricion text
    );
-- usamos la base de datos
use movies;
-- creamos la tabla de personajes (vincula al actor con el personaje y la pelicula)
		create table personajes(
        id int not null primary key auto_increment,
        id_movie int,
        id_actor int,
        personaje varchar (30),
        -- creamos las fk para movies y actor
        foreign key (id_movie) references pelicula(id),
        foreign key (id_actor) references actors(id)
	);

    
-- usamos la base de datos
use movies;
-- creamos la tabla paises 
	create table paises(
    id int not null primary key auto_increment,
    nombre varchar (80)
    );    
    
    
-- usamos la base de datos
use movies;
-- creamos la tabla usuarios (de registro)
	create table usuarios(
    id int not null primary key auto_increment,
    nombre varchar (30),
    apellido varchar (30),
    sexo char,
    telefono varchar (16),
    mail varchar (40),
    id_paises int,
    id_generos int,
    usuario varchar (40),
    contrasenia varchar (40),
    -- notificaciones funciona como una bandera o booleano 1= recibe notificaciones 0= no recibe
    notificaciones int,
    -- creamos las fk para paises y generos
        foreign key (id_paises) references paises(id),
        foreign key (id_generos) references generos(id)
    );