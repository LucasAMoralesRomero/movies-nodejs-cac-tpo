window.onload = function() {
    fetchMovies();
};

function fetchMovies() {
    fetch('http://localhost:3000/movies/all')
        .then(response => response.json())
        .then(data => {
            const moviesList = document.getElementById('moviesList');
            moviesList.innerHTML = '';
            data.forEach(movie => {
                moviesList.innerHTML += `
                    <tr>
                        <td>${movie.title}</td>
                        <td>${movie.year_release}</td>
                        <td>
                            <button onclick="editMovie(${movie.id})">Editar</button>
                            <button onclick="deleteMovie(${movie.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

function editMovie(id) {
    window.location.href = `edit.html?id=${id}`;
}

function deleteMovie(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
        fetch(`http://localhost:3000/movies/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Película eliminada con éxito');
                    fetchMovies();
                }
            })
            .catch(error => console.error('Error:', error));
    }
}