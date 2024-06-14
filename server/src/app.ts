import express from "express";
import cors from "cors";
import config from "./config/config";
import { connection } from "./db/connection";

const app = express();
app.use(cors());
app.use(express.json());

connection().then(() => {
    console.log("MongoDB connected");
    const port = config.port;
  
    app.listen(port, () => {
      console.log(`Connected to server on port ${port}`);
    });
  });