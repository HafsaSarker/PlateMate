import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./routes";
import { connectDB } from "./db/connect";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Server, Socket } from 'socket.io';
import { Message } from './models/Message';

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const yelpProxy = createProxyMiddleware({
  target: "https://api.yelp.com",
  changeOrigin: true,
  pathRewrite: { "^/yelp-api": "" }, // Rewrite paths to match the target API
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
  },
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('send_message', async (data) => {
    socket.to(data.room).emit('receive_message', data);
    console.log(data);
    const newMessage = new Message({
      fromUserId: data.username,
      toUserId: data.room,
      message: data.message,
      sentAt: data.time,
    });
    // add to mongoDB database
    try {
      await newMessage.save();
      console.log('Message saved to database');
    } catch (error) {
      console.error('Error saving message to database:', error);
    }
  });
});

const boot = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(8080, () => {
      console.log("Server running on http://localhost:8080/");
    });
  } catch (error) {
    console.log(error);
  }
};

boot();
app.use("/api", router());
app.use("/yelp-api", yelpProxy);
