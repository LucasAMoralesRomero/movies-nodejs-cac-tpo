# Backend
La base de datos que utilizaremos esta desarrollada en MySQL, siguiendo el siguiente esquema:
```mermaid
erDiagram
    MOVIES {
        int id
        varchar(30) titulo
        int id_genero
        year anio
        int id_director
        varchar(42) imagen1
        varchar(42) imagen2
        varchar(42) imagen3
        varchar(80) link
        bool estreno
    }

    GENEROS {
        int id
        varchar(10) nombre_genero
    }

    DIRECTOR {
        int id
        varchar(30) nombre_director
    }

    DESCRIPCION {
        int id
        int id_movie
        tinytext descripcion
    }

    ACTORS {
        int id
        varchar(50) nombre_actor
        text descripcion
    }

    PERSONAJES {
        int id
        int id_movie
        int id_actor
        varchar(30) personaje
    }

    MOVIES ||--o{ GENEROS : "id_genero"
    MOVIES ||--o{ DIRECTOR : "id_director"
    DESCRIPCION ||--o{ MOVIES : "id_movie"
    PERSONAJES ||--o{ MOVIES : "id_movie"
    PERSONAJES ||--o{ ACTORS : "id_actor"
```
