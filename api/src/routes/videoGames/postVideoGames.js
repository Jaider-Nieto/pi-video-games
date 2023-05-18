const postVideoGames = require('express').Router();
const { postVG } = require('../../controllers/controllers');
const { Genre, Videogames } = require('../../db');
const { Op } = require('sequelize');



postVideoGames

.post('/', async ( req, res ) => {
    try {
        const { name, description, platform, image, date, rating, genre } = req.body
        const newVideoGame = await postVG(name, description, platform, image, date, rating, genre)

        return res.status(200).json(newVideoGame)
    } catch ({ message }) {
        return res.status(400).send(message)
    }
})

module.exports = postVideoGames;