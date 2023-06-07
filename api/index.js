const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(cookieParser());

mongoose.connect('mongodb+srv://admin:admin@databaseprova.hahfdym.mongodb.net/SocialApp')

const db = mongoose.connection

db.once('open', () => {
  console.log('Connesso al DB')
})

//middleware
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
