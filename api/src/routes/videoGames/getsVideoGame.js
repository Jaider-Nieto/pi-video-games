const getVideoGames = require('express').Router();
const {
    getVG,
    getByName,
    getById,
} = require('../../controllers/controllers.js')

getVideoGames

.get('/', async ( req, res ) => {
    try {
        const { name } = req.query
        
        if(name){
            const data = await getByName(name)
            return res.status(200).json(data)
        }

        else{
            const data = await getVG()
            return res.status(200).json(data)
        } 
    }
    catch (error) {
        return res.status(404).json(error.message)

    }
})

.get('/:id', async ( req, res ) => {
    try {
        const { id } = req.params

        const data = await getById(id)

        return res.status(200).json(data)
    } 
    catch (error) {
        return res.status(404).json(error.message)
    }
})

module.exports = getVideoGames;




