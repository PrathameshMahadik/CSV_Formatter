import express from "express";
import cors from "cors";
import config from "./config/config";
import { connection } from "./db/connection";
import csvRouter from "./controllers/CSV/route";
import csvDetailsRouter from "./controllers/CSV Details/route";
import csvErrorsRouter from "./controllers/CSV Errors/route";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerSetup from "./config/swagger";

const app = express();
app.use(cors());
app.use(express.json());

swaggerSetup(app);

app.use("/", csvRouter);
app.use("/", csvDetailsRouter);
app.use("/", csvErrorsRouter);

app.use(errorHandler);

connection().then(() => {
  console.log("MongoDB connected");
  const port = config.port;

  app.listen(port, () => {
    console.log(`Connected to server on port ${port}`);
  });
});
