// Definición de la variable API_SERVER
const API_SERVER = 'http://localhost:3000/movies';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id'); // Asegúrate de que 'id' es el parámetro correcto pasado en la URL.

    fetch(`http://localhost:3000/movies/${movieId}`)
    .then(response => response.json())
    .then(data => {
        const movie = data[0]; // Asumiendo que la respuesta es un array con un solo objeto.
        const imgElement = document.querySelector('.imgDetalle img');
         // Cambiar la imagen de fondo del contenedor mainDetalle
         const mainDetalle = document.getElementById('mainDetalle');
         mainDetalle.style.backgroundImage = `linear-gradient(to right top, #6d6969a7, #6d6969a7), url(${movie.image_bg})`;
        imgElement.src = movie.image_poster; // Asegúrate de que la ruta sea correcta
        imgElement.alt = `${movie.title} película ${movie.year_release}`;

        // Resto de las actualizaciones aquí...

        document.getElementById('movieTitle').textContent = movie.title;
        document.getElementById('movieDetails').textContent = `${movie.year_release} • ${movie.genres} • ${movie.movie_status}`;
        document.getElementById('movieOverview').textContent = movie.overview;

        const redesList = document.getElementById('redesList');
        redesList.innerHTML = `
            <li><a href="${movie.facebook_url}" target="_blank"><i class="fab fa-facebook"></i></a></li>
            <li><a href="${movie.twitter_url}" target="_blank"><i class="fab fa-twitter"></i></a></li>
            <li><a href="${movie.instagram_url}" target="_blank"><i class="fab fa-instagram"></i></a></li>
            <li><a href="${movie.web_url}" target="_blank"><i class="fas fa-link"></i></a></li>
        `;

        const infoTable = document.getElementById('infoTable');
        infoTable.innerHTML = `
            <tr><td><strong>Status</strong></td><td>${movie.movie_status}</td></tr>
            <tr><td><strong>Original Language</strong></td><td>${movie.original_language}</td></tr>
            <tr><td><strong>Budget</strong></td><td>$${parseFloat(movie.budget).toLocaleString()}</td></tr>
            <tr><td><strong>Revenue</strong></td><td>$${parseFloat(movie.revenue).toLocaleString()}</td></tr>
        `;

        const trailerIframe = document.querySelector('.contenedorTrailer iframe');
        trailerIframe.src = movie.video_url;
    })
    .catch(error => {
        console.error('Error fetching movie details:', error);
    });
});