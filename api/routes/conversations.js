const router = require("express").Router();
const conversationController = require('../controllers/conversationController')

router.post('/', conversationController.newConversation)
router.get('/:userId', conversationController.getConversation)
router.delete('/deleteConv', conversationController.deleteConversation)

module.exports = router;