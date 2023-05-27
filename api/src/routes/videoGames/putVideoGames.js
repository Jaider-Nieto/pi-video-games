const putVideoGames = require('express').Router();
const { putVG } = require('../../controllers/controllers')

putVideoGames
.put('/', async (req, res) => {
    try {
        const { id, name, description, platform, image, date, rating, genre } = req.body
        if(!id) throw Error('The ID is required')
    
        await putVG(id, name, description, platform, image, date, rating, genre)
    
        return res.status(200).json('The game has been updated')
        
    } catch ({ message }) {
        return res.status(400).send(message)
    }
} )

module.exports = putVideoGames