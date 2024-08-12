import cors from "cors";
import express from "express";
import mysqlPool from "../config/db.js";
import { productRouter } from "./routes/products.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/products", productRouter);

mysqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("MySQL Connected");
    app.listen(8000, () => {
      console.log("Server connected successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
