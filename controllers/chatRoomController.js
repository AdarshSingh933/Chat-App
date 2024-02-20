const chatModel = require('../models/chatModel');

const getChatMessageController =async(req,res)=>{
     try{
        const chatMessages = await chatModel.findOne({}).populate('messages.sender');
        console.log("chatMessage",chatMessages);
        return res.status(200).send({
               success:true,
               message:"chat messages loaded successfully",
               data:chatMessages
        })
     }catch(error){
        console.log("Error in register user",error);
        return res.status(500).send({
            success:false,
            error,
            message:"Server error"
        })
     }
}

const sendMessageController = async (req, res) => {
   try {
       let chatRoom = await chatModel.findOne({}); // Assuming there's only one chat room for now

       if (!chatRoom) {
           // If there's no chat room, create a new one
           chatRoom = new chatModel({});
       }

       const message = { text: req.body.value, sender: req.body.userId };
       chatRoom.messages.push(message);
       await chatRoom.save();

       // Populate sender information in the messages array
       const chatMessageWithUser = await chatModel.findOne({}).populate('messages.sender');

       res.status(200).send({
           success: true,
           message: "Message sent successfully",
           data: chatMessageWithUser
       });
   } catch (error) {
       console.log("Error in sending message:", error);
       return res.status(500).send({
           success: false,
           error,
           message: "Server error"
       });
   }
};

module.exports = {getChatMessageController,sendMessageController};