//requerimos express y las rutas a utilizar
const express = require('express');
const movieRoutes = require('../routes/movieRoutes');

const app = express();

app.use(express.json());
app.use('/movies', movieRoutes);
const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	});