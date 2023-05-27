const deleteVideoGames = require('express').Router();
const { deleteVG } = require('../../controllers/controllers')

deleteVideoGames
.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteVG(id)
        return res.status(200).send('The game has been deleted successfully')
    } catch ({message}) {
        return res.status(400).send(message)
    }
})

module.exports = deleteVideoGames;