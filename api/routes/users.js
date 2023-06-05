//Richiamo lo schema del db dell'utente
const User = require('../models/User')

//Richiamo la libreria router di express per l'instradamento degli url
const express = require ('express')
const router = express.Router()
const usersController = require('../controllers/usersController')


router.get('/addUser', usersController.addUser)

module.exports = router;