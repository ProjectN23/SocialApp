//Richiamo la libreria express e la assegno ad app
const express = require('express')
const app = express()
const port = '3000'
const cors = require('cors')

//Richiamo la route dell'user in modo da utilizzare il middleware. Sappiamo che alla chiamata /api/users/.... rispondera lo users.js nella cartella routes
const userRoute = require('./routes/users')
//middleware


app.use("/api/users/", userRoute)

app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


//impostiamo la connesione al db mongoose sul cloud
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://admin:admin@databaseprova.hahfdym.mongodb.net/?retryWrites=true&w=majority/SocialApp");

const db = mongoose.connection

db.once('open', () => {
  console.log('Connesso al DB')
})

app.use(express.json())



//impostiamo l'ascolto sulla porta 5000
app.listen(port, () => {
    console.log("Il Backend è in funzione")
})