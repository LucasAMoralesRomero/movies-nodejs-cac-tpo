let data = []; // Definimos data en un ámbito global
//capturar la informacion del json
function getDataMovies(){
    //hacemos el fetch de las peliculas
    fetch('./movies.json')
        .then(response => response.json())
        .then(json => {
            data = json;
    })
    //capturamos el posible error y lo mostramos en consola
    .catch(error=> console.error('Error al cargar el archivo JSON: ', error));
}

//funcion para mosrtar las peliculas
function displayMovies(){
    var templateMovieCard = '';
    data.forEach(event => {
        //le asignaoms a la tmeplatecard cada vez q iterer una carta
        templateMovieCard +=
      `
      <img src="${data.imagen1}" alt="">
      <h4 class="movieTitle"></h4>
      <h5 class="genero"></h5>
      <h5 class="anio"></h5>
      <p class="movieDescription"></p>
      `
    })
    document.getElementById('movieCard').innerHTML = templateMovieCard;
}

getDataMovies();