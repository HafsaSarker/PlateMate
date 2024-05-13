import express from "express";
import { messageController } from "../controllers/message";

export default (router: express.Router) => {
  router.get("/messages/:roomId", messageController.getMessages);
  router.get("/messages/partners/:userId", messageController.getChatPartners);
  router.put("/messages/markRead/:roomId/:senderId", messageController.markMessagesAsRead)
  router.get("/messages/countUnread/:roomId/:receiverId", messageController.countUnreadMessages)
  router.delete("/messages/:messageId", messageController.deleteMessage)
};
