import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get("/", (request, response) => {
  response.status(200).json({ message: "DALL-E route hit." });
});

router.post("/", async (request, response) => {
  const { prompt } = request.body;

  try {
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    response.status(200).json({ photo: image, aiResponse });
  } catch (error) {
    response.status(500).json({ error: error.response.data.error.message });
  }
});

export default router;
