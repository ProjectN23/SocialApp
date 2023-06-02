const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            require: true,
            max: 15,
            unique: true
        },

        email: {
            type: String,
            require: true,
            max: 40,
            unique: true
        }
    }
);

module.exports = mongoose.model('User', UserSchema)