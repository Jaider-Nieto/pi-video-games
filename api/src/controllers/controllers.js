const { API, API_KEY } = require('dotenv').config().parsed;
const { Videogames, Genre } = require('../db');
const { cleanApi, cleanGame } = require('../helpers/helpers')
const { Op } = require('sequelize')

let gamesData = []
let genreData = []

//GET
const getVG = async () => {

    for (let i = 1; i <= 5; i++) {
        const res = await fetch(`${API}games?key=${API_KEY}&page=${i}`)
        const { results } = await res.json()
        const dataApi = cleanApi(results)
        gamesData = [...gamesData, ...dataApi]
    }
    if(!gamesData) throw Error('There was an error with the request');

    return gamesData
}

const getByName = async (name) => {
    const dataDB = await Videogames.findAll({
        where: {
            name:{
                [Op.iLike]: `%${name}%`
            } 
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    dataDB.length >= 1 ? dataDB.slice(15) : [] 

    if( dataDB.length === 15)return dataDB;

    const res = await fetch(`${API}games?key=${API_KEY}&search=${name}`)
    const { results } = await res.json()
    const dataApi = cleanApi(results)
    
    const data = [...dataDB, ...dataApi].slice(0,15)

    if(!data) throw Error('The game was not found');

    return data


}

const getById = async (id, source) => {

    if(source === 'api'){
        const res = await fetch(`${API}games/${id}?key=${API_KEY}`)
        const data = await res.json()
        const cleanGameId = cleanGame(data)

        if(cleanGameId.detail) throw Error('Id searched was not found');
        return cleanGameId
    }
    else{
        const dataDB = await Videogames.findOne({
            where: { id },
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return dataDB
    }

    
}
//POST
const postVG = async (name, description, platform, image, date, rating, genre) => {
    try {
        if(name.length < 1 || description.length < 1 || platform.length < 1 || date.length < 1 || rating.length < 1) throw Error('There are mandatory fields not completed');

    const newVideoGame = await Videogames.create({
        name: name,
        description: description,
        platform: platform,
        image: image,
        date: date,
        rating: rating,
    })

    const genreFind = await Genre.findAll({
        where: {
            name: genre
        }
    })

    await newVideoGame.addGenre(genreFind)

    const result = await Videogames.findOne({
        where: { name },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    
    return result
    } catch (error) {
        console.log(error)
    }    
}

//GET GENRES
const getGenres = async () => {
    if(genreData.length > 1) return

    const response = await fetch(`${API}genres?key=${API_KEY}`)
    const { results } = await response.json()

    genreData = results.map( gen => 
        Genre.create({name: gen.name.toLowerCase()})
    )

    return Promise.all(genreData)
}

module.exports = {
    getVG,
    getByName,
    getById,
    postVG,
    getGenres,
};