const { API, API_KEY } = require('dotenv').config().parsed;

const gamesData = []

const getVG = async () => {

    for (let i = 1; i <= 5; i++) {
        const res = await fetch(`${API}?key=${API_KEY}&page=${i}`)
        const { results } = await res.json()
        gamesData.push(results)
    }
    if(!gamesData){
        throw Error('Hubo un error en la peticion')
    }
    return gamesData
}

const getByName = async (name) => {
    const res = await fetch(`${API}?key=${API_KEY}&search=${name}`)
    const { results } = await res.json()
    return results
}

const getById = async (id) => {
    const res = await fetch(`${API}/${id}?key=${API_KEY}`)
    const data = await res.json()
    return data
}

const postVG = () => {
    
}

module.exports = {
    getVG,
    getByName,
    getById,
};