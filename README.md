# Trabajo Practicó Obligatorio de Codo a Codo NodeJS comisión N°24136 - Grupo 8


# Rama main
[![Netlify Status](https://api.netlify.com/api/v1/badges/f946157f-5c70-4802-9641-7f88de3b9801/deploy-status)](https://app.netlify.com/sites/movies-cac-nodejs/deploys)
Deploy: https://movies-cac-nodejs.netlify.app/

# Rama de pruebas
[![Netlify Status](https://api.netlify.com/api/v1/badges/3e040267-c217-4733-8e64-1f69b5b011b1/deploy-status)](https://app.netlify.com/sites/movies-test-deploy/deploys)
Deploy: https://movies-test-deploy.netlify.app/

## Instrucciones para Completar un JSON de Información de Películas

Para completar un JSON con la información de una película, sigue la estructura proporcionada a continuación y reemplaza los valores de cada campo con la información correspondiente de la película que deseas agregar:

```json
{
  "pelicula": "Avatar",
  "genero1": "ciencia ficcion",
  "genero2": "aventura",
  "genero3": "accion",
  "descripcion": "Un marine parapléjico es enviado a la luna Pandora en una misión única, pero se debate entre seguir órdenes y proteger el mundo que siente como su hogar.",
  "tiempo": "2h 42m",
  "anio": "2009",
  "imagen1": "./img/peli01.jpg",
  "imagen2": "./img/movies/default.jpg",
  "imagen3": "./img/movies/default.jpg",
  "link": "VerPeli1.html?link=https://www.youtube.com/embed/g5deg0HgCmY?si=GsHiNaNEhZdII5l5"
}
```

## Campos del JSON"pelicula":

### Título de la película

### "genero1", "genero2", "genero3": 
Géneros de la película (por ejemplo, "ciencia ficcion", "aventura", "accion").

### "descripcion": 
Breve descripción de la trama de la película, tiene que tener un largo maximo de 174 caracteres (por ejemplo, "Un marine parapléjico es enviado a la luna Pandora en una misión única, pero se debate entre seguir órdenes y proteger el mundo que siente como su hogar.").

### "tiempo": 
Duración de la película (por ejemplo, "2h 42m").

### "anio": 
Año de lanzamiento de la película (por ejemplo, "2009").

### "imagen1", "imagen2", "imagen3": 
URLs relativas a las imágenes de la película (por ejemplo, "./img/peli01.jpg", "./img/movies/default.jpg").
Tamaño de las imagenes:396 * 264 pixeles.

### "link": 
Enlace a un video o página relacionada con la película en el mismo hay que reemplazar el enlace can el enlace que proporciona youtube cuando se crea el ieframe (por ejemplo: "VerPeli1.html?link=https://www.youtube.com/embed/g5deg0HgCmY?si=GsHiNaNEhZdII5l5")
