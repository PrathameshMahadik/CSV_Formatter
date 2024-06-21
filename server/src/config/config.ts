import dotenv from "dotenv";
import { IConfig } from "./Iconfig";

dotenv.config();

const config: IConfig = Object.freeze({
  port: Number(process.env.PORT),
  secret_key: process.env.SECRET_KEY,
  db_url: process.env.DB_URL
})as IConfig;

export default config;
