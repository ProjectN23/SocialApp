//Libreria express per l'instradamento
const express = require("express");
const app = express();

//richiamo il db
const mongoose = require("mongoose");

//routes per l'instradamento
const userRoute = require("./routes/users");
const convRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const authRoute = require("./routes/auth");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser')
//Collegamento al db
mongoose.connect('mongodb+srv://admin:admin@databaseprova.hahfdym.mongodb.net/SocialApp')
const db = mongoose.connection

db.once('open', () => {
  console.log('Connesso al DB')
})


//Allow del cors
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

//middlewares
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", convRoute);
app.use("/api/messages", messageRoute);

//Be in ascolto sulla porta
app.listen(8800, () => {
  console.log("Backend server is running!");
});
