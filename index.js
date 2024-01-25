// index.js
import express from "express";
import route from "./src/routes";
import { sequelize } from "./src/models"; // Import both db and sequelize
import logger from "./loggerConfigs";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

// use cors and body parse
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(`${process.env.PRE_URL}`, route);

// not found routes
app.all("*", (req, res) => {
  res.status(200).json({
    message: "This route is not found",
  });
});

// db connection instance
const dbCon = async () => {
  try {
    await sequelize.authenticate();
    logger.info("DB connected successfully");
  } catch (error) {
    logger.error(new Error(`db: ${error.message}`));
  }
};

// port and host
const port = process.env.PORT;

// server and db
app.listen(port, () => {
  logger.info(`Server listening on port : ${port}`);
  dbCon();
});
