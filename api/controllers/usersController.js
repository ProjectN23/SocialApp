const User = require("../models/User");
const bcrypt = require("bcrypt");


module.exports = {

    addUser: async (req, res) => {
        console.log('richiesta accettata')
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
        });

        res.status(200).json(user);
      }, catch (err) {
        res.status(500).json(err)
      }
}