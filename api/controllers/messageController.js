const Message = require ('../models/Message')

module.exports = {
    newMessage: async (req,res) => {
        const newMessage = new Message(req.body)
        try {

            const newMessage = new Message({
                conversationId: req.body.conversationId,
                sender: req.body.sender,
                text: req.body.text,
              });


            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    getMessages: async (req, res) => {
        try {
            const messages = await Message.find({
                conversationId:req.params.conversationId
            })
            res.status(200).json(messages)
        } catch (err) {
            res.status(500).json(err)
        }
    }

}