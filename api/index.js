//Richiamo la libreria express e la assegno ad app
const express = require('express')
const app = express()
const port = '5000'

//Richiamo la route dell'user in modo da utilizzare il middleware. Sappiamo che alla chiamata /api/users/.... rispondera lo users.js nella cartella routes
const userRoute = require('./routes/users')
//middleware
app.use("/api/users", userRoute)



//impostiamo l'ascolto sulla porta 5000
app.listen(port, () => {
    console.log("Il Backend è in funzione")
})