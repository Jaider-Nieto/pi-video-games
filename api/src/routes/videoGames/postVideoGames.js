const postVideoGames = require('express').Router();
const { postVG } = require('../../controllers/controllers');



postVideoGames

.post('/', async ( req, res ) => {
    try {
        const { name, description, platform, image, date, rating, genre } = req.body
        await postVG(name, description, platform, image, date, rating, genre)

        return res.status(200).send('The game was created successfully')
    } catch ({ message }) {
        return res.status(400).send(message)
    }
})

module.exports = postVideoGames;