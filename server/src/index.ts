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
import { Server } from "socket.io";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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
