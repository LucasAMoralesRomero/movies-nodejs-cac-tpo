document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    fetch(`http://localhost:3000/movies/${movieId}`)
        .then(response => response.json())
        .then(data => {
            const movie = data[0];
            document.getElementById('movieId').value = movie.movie_id || '';
            document.getElementById('title').value = movie.title || '';
            document.getElementById('year_release').value = movie.year_release || '';
            document.getElementById('image_bg').value = movie.image_bg || '';
            document.getElementById('image_poster').value = movie.image_poster || '';
            document.getElementById('overview').value = movie.overview || '';
            document.getElementById('budget').value = movie.budget || '';
            document.getElementById('revenue').value = movie.revenue || '';
            document.getElementById('movie_status').value = movie.movie_status || '';
            document.getElementById('original_language').value = movie.original_language || '';
            document.getElementById('genres').value = movie.genres ? movie.genres.split(', ').join(', ') : '';
            document.getElementById('director_name').value = movie.directors ? movie.directors.split(', ').join(', ') : '';
            document.getElementById('scriptwriter_name').value = movie.scriptwriters ? movie.scriptwriters.split(', ').join(', ') : '';
            document.getElementById('casting_name').value = movie.casting ? movie.casting.split(', ').join(', ') : '';
            document.getElementById('video_url').value = movie.video_url || '';
            document.getElementById('facebook_url').value = movie.facebook_url || '';
            document.getElementById('twitter_url').value = movie.twitter_url || '';
            document.getElementById('instagram_url').value = movie.instagram_url || '';
            document.getElementById('web_url').value = movie.web_url || '';
        })
        .catch(error => console.error('Error:', error));

    document.getElementById('editMovieForm').onsubmit = function (event) {
        event.preventDefault();

        const data = {
            id: document.getElementById('movieId').value,
            title: document.getElementById('title').value,
            year_release: document.getElementById('year_release').value,
            image_bg: document.getElementById('image_bg').value,
            image_poster: document.getElementById('image_poster').value,
            overview: document.getElementById('overview').value,
            budget: document.getElementById('budget').value,
            revenue: document.getElementById('revenue').value,
            movie_status: document.getElementById('movie_status').value,
            original_language: document.getElementById('original_language').value,
            genres: document.getElementById('genres').value.split(','),
            director_name: document.getElementById('director_name').value.split(','),
            scriptwriter_name: document.getElementById('scriptwriter_name').value.split(','),
            casting_name: document.getElementById('casting_name').value.split(', '),
            video_url: document.getElementById('video_url').value,
            facebook_url: document.getElementById('facebook_url').value,
            twitter_url: document.getElementById('twitter_url').value,
            instagram_url: document.getElementById('instagram_url').value,
            web_url: document.getElementById('web_url').value
        };

        fetch(`http://localhost:3000/movies/${data.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                alert('Película actualizada con éxito');
                window.location.href = '../pages/admin_movies.html';
            })
            .catch(error => console.error('Error:', error));
    };
});