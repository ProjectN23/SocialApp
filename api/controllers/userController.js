const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require("../routes/auth");

module.exports = {

    addUser: async (req,res) => {
      const user = await User.findOne({ email: req.body.email })
      if(user) {
        res.status(409).json("Utente già registrato");
      }
      else {
        try {
          //generate new password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          //create new user
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          });
      
          //save user and respond
          const user = await newUser.save();
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json(err)
        }
      }
    },
        

    checkUser: async (req, res) => {
        try {
          const { email, password } = req.body;
          if (!(email && password)) {
              res.status(400).send("Tutti i campi sono obbligatori");
          }
          const user = await User.findOne({ email });
          if (user && (await bcrypt.compare(password, user.password))) {
              const token = jwt.sign(
                  { user_id: user._id, email },
                  "projectn23",
                  {
                      expiresIn: "2h",
                  }
              );
              user.token = token;
              res.status(200).json({ token });
          } else {
            res.status(400).send("Credenziali non valide");
          }
          
      } catch (err) {
          console.log(err);
      }
    },


    getUser: async (req, res) => {
      try {
          const user = await User.findOne({
              _id: { $in:[req.params.user]}
          })
          res.status(200).json(user)
      } catch (err) {
          res.status(500).json(err)
      }
  }

}
    