const getVideoGames = require('express').Router();
const { Videogames, Genre } = require('../../db')
const {
    getVG,
    getByName,
    getById,
} = require('../../controllers/controllers.js');

getVideoGames

.get('/', async ( req, res ) => {
    try {
        const { name } = req.query
        
        if(name){
            const dataName = await getByName(name)
            return res.status(200).json(dataName)
        }
        
        let dataDB = await Videogames.findAll({
            include: {
                model: Genre,
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                }
            }
        })
        const dataApi = await getVG()

        return res.status(200).json([...dataDB, ...dataApi])
    }
    catch ({message}) {
        return res.status(404).json(message)

    }
})

.get('/:id', async ( req, res ) => {
    try {
        const { id } = req.params

        const source = isNaN(id) ? 'db' : 'api';

        const data = await getById(id, source)

        return res.status(200).json(data)
    } 
    catch ({message}) {
        return res.status(404).json(message)
    }
})

module.exports = getVideoGames;




