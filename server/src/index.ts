import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { connectDB } from "../db/connect";
import dotenv from 'dotenv';
dotenv.config();
import { createProxyMiddleware } from 'http-proxy-middleware';


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
  target: 'https://api.yelp.com',
  changeOrigin: true,
  pathRewrite: { '^/yelp-api': '' }, // Rewrite paths to match the target API
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
  },
});

app.use('/yelp-api', yelpProxy);

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
