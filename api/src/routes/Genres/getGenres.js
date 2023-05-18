const getGenresRouter = require('express').Router();
const { Genre } = require('../../db')
const { getGenres } = require('../../controllers/controllers');

getGenresRouter.get('/', async ( req, res ) => {
    try {
        await getGenres()
        const dataDB = await Genre.findAll()
        return res.status(200).json(dataDB)
    } 
    catch ({ message }) {
        return res.status(400).json({error: message})
    }
})

module.exports = getGenresRouter;