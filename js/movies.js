let data = []; // Definimos data en un ámbito global para poder acceder a ella desde cualquier función

//capturar la informacion del json
function getDataMovies(){
  //hacemos el fetch de las peliculas
  fetch('./js/movies.json')
      .then(response => response.json())
      .then(json => {
          data = json;
          displayMovies();
  })
  //capturamos el posible error y lo mostramos en consola
  .catch(error=> console.error('Error al cargar el archivo JSON: ', error));
}
//funcion para mosrtar las peliculas
function displayMovies(){
  var templateMovieCard = ''
  console.log(data)
  data.forEach(event => {
      //le asignaoms a la tmeplatecard cada vez q iterer una carta
      templateMovieCard +=
    `
    <div class="Imagen-Pelicula">
    <img class="contenedor-img hover-1" src="${event.imagen1}" alt=""
    onmouseover="this.src='${event.imagen2}'"
    onmouseout="this.src='${event.imagen1}'">
    <div class="mascara">
    <h4 class="movieTitle">${event.pelicula}</h4>
    <h5 class="genero">${event.genero1} ${event.genero2} ${event.genero3}</h5>
    <h5 class="anio">${event.anio}</h5>
    <p class="movieDescription">${event.descripcion}</p>
    </div>
    </div>
    `
  })
  document.getElementById('movieCard').innerHTML = templateMovieCard;
}

getDataMovies();