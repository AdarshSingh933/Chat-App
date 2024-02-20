const express = require('express');
const {getChatMessageController,sendMessageController} = require('../controllers/chatRoomController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//GET || getChatMessage
router.post('/getChatMessage',getChatMessageController);

//POST || sendMessage
router.post('/sendMessage',sendMessageController);

module.exports = router;