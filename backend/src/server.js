//requerimos express y las rutas a utilizar
const express = require('express');
const movieRoutes = require('../routes/Routes');
const cors = require('cors');
const app = express();

//agregado para multer
//const express = require('express');
//const router = express.Router();
//const upload = require('./upload'); // Import Multer configuration

//agregado para cors
const corsOptions = {
  origin: '*',//'http://127.0.0.1:5500',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));


app.use(express.json());
app.use('/movies', movieRoutes);


const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	});