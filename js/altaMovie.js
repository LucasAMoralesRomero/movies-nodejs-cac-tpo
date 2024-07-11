document.getElementById('addMovieForm').onsubmit = function(event) {
    event.preventDefault();

    const data = {
        title: document.getElementById('title').value,
        year_release: document.getElementById('year_release').value,
        image_bg: document.getElementById('image_bg').value,
        image_poster: document.getElementById('image_poster').value,
        overview: document.getElementById('overview').value,
        budget: document.getElementById('budget').value,
        revenue: document.getElementById('revenue').value,
        movie_status: document.getElementById('movie_status').value,
        original_language: document.getElementById('original_language').value,
        genres: document.getElementById('genres').value.split(',').map(genre => genre.trim()),
        director_name: document.getElementById('director_name').value.split(',').map(name => name.trim()),
        scriptwriter_name: document.getElementById('scriptwriter_name').value.split(',').map(name => name.trim()),
        casting_name: document.getElementById('casting_name').value.split(',').map(name => name.trim()),
        video_url: document.getElementById('video_url').value,
        facebook_url: document.getElementById('facebook_url').value,
        twitter_url: document.getElementById('twitter_url').value,
        instagram_url: document.getElementById('instagram_url').value,
        web_url: document.getElementById('web_url').value
    };

    console.log("Datos enviados:", JSON.stringify(data));  // Agregar para depuración

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Para ver la respuesta del servidor
        alert('Película agregada con éxito');
        window.location.href = '../pages/admin_movies.html';
    })
    .catch(error => console.error('Error:', error));
};