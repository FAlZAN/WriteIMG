import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./db/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dallERoutes from "./routes/dallERoutes.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: "*" }));
app.use((request, response, next) => {
  console.log("Request Path", request.path);
  console.log("Request Method", request.method);
  next();
});

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dallERoutes);

app.get("/", (request, response) => {
  response.status(200).json({ message: "Hello from DALL-E!" });
});

connectToDB((error) => {
  if (error) {
    response.status(500).json(error);
  }
  app.listen(4646, () => console.log("Server up on http://localhost:4646"));
});
