const API_SERVER = 'http://localhost:3000/movies/all';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

const cargarPeliculasTendencia = async () => {
    try {
        const response = await fetch(API_SERVER, options);
        const data = await response.json();
        const movies = data;
        console.log(movies);

        const tendenciasContainer = document.querySelector('.peliculasTendencia .peliculas');
        tendenciasContainer.innerHTML = '';

        movies.forEach(movie => {
            const ancla = document.createElement('a');
            //en la ancla paso el id de la pelicula
            ancla.href = `./pages/detalle.html?id=${movie.id}`;

            const pelicula = document.createElement('div');
            pelicula.classList.add('pelicula');

            const img = document.createElement('img');
            img.classList.add('imgTendencia');
            img.src = `${movie.image_poster}`; 
            img.alt = movie.title;
            img.loading = 'lazy';

            const tituloPelicula = document.createElement('div');
            tituloPelicula.classList.add('tituloPelicula');

            const titulo = document.createElement('h4');
            titulo.textContent = movie.title;

            // Estructura de los elementos
            ancla.appendChild(pelicula);
            pelicula.appendChild(img);
            pelicula.appendChild(tituloPelicula);
            tituloPelicula.appendChild(titulo);
            tendenciasContainer.appendChild(ancla);
        });

        // Actualizamos el atributo data-page con el número de página actual
        tendenciasContainer.parentElement.setAttribute('data-page', 1); // Si no tienes paginación, puedes fijarlo en 1
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
};

// Llamada a la función para cargar las películas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarPeliculasTendencia();
});

// Función para cargar películas en el carrusel de películas aclamadas
const cargarPeliculasAclamadas = async () => {
    // Realizamos una petición fetch a la API para obtener las películas más aclamadas
    const response = await fetch(`${API_SERVER}/movie/top_rated`, options);
    const data = await response.json();// Convertimos la respuesta a JSON
    const movies = data.results; // Extraemos las películas de la respuesta
    const aclamadasContainer = document.querySelector('.aclamadas'); // Seleccionamos el contenedor de películas aclamadas en el DOM
    
    // Iteramos sobre cada película obtenida para lograr la estructura de html que pongo a continuación:
    /*<div class="peliculaItem">
         <img class="imgAclamada" src="./assets/img/aclamada_1.jpg" alt="aclamada_1" loading="lazy">
      </div>*/
    movies.forEach(movie => {
        // creo el div peliculaItem
        const peliculaItem = document.createElement('div');
        peliculaItem.classList.add('peliculaItem');
        // creo la imagen
        const img = document.createElement('img');
        img.classList.add('imgAclamada');
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        img.alt = movie.title;
        img.loading = 'lazy';
        // relaciono los elementos
        peliculaItem.appendChild(img);
        aclamadasContainer.appendChild(peliculaItem);
    });
};

const botonAnterior = document.getElementById('botonAnterior');
const botonSiguiente = document.getElementById('botonSiguiente');
const seccionTendencias = document.getElementById('tendencias');

// Event listener para el botón "Anterior"
botonAnterior.addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    // Si es la primera página, no hacemos nada
    if (currentPage <= 1) return;
    // Cargar las películas de la página anterior
    cargarPeliculasTendencia(currentPage - 1);
});

// Event listener para el botón "Siguiente"
botonSiguiente.addEventListener('click', () => {
    // Obtener el número de página actual
    let currentPage = Number(seccionTendencias.getAttribute('data-page'));
    // Cargar las películas de la página siguiente
    cargarPeliculasTendencia(currentPage + 1);
});

// Ejecutamos las funciones de carga de películas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Cargamos las películas en la cuadrícula de tendencias
    cargarPeliculasTendencia();
    // Cargamos las películas en el carrusel de películas aclamadas
    cargarPeliculasAclamadas();
});