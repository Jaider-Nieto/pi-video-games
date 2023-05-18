const { Router } = require('express');
// Importar todos los routers;
const getVideoGames = require('./videoGames/getsVideoGame');
const postVideoGames = require('../routes/videoGames/postVideoGames');
const getGenresRouter = require('../routes/Genres/getGenres')


const genres = require('../routes/genres')
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers

//VideoGames CRUD

//GET
router.use('/videoGames', getVideoGames);

//POST
router.use('/videoGames', postVideoGames);


// o----------o-----------o----------o-----------o-----------o // 

//GET GENRES
router.use('/genres', getGenresRouter);


module.exports = router;
