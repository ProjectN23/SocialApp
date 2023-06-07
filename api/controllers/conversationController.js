const Conversation = require("../models/Conversation");


module.exports = {
    newConversation: async (req,res) => {
        const newConv = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
          });

          try {
            const savedConv = await newConv.save();
            res.status(200).json(savedConv)
          } catch (err) {
            res.status(500).json(err)
          }
    },

    getConversation: async(req, res) => {
        try {
            const conversation = await Conversation.find({
                members: { $in:[req.params.userId]}
            })
            res.status(200).json(conversation)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    

}