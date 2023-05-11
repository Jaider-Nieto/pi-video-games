const postVideoGames = require('express').Router();

postVideoGames

.post('/', ( req, res ) => {
    try {
        const { name, id } = req.body
        return res.status(200).json({"name": name})
    } catch (error) {
        return res.send(error.message)
    }
} )


module.exports = postVideoGames;