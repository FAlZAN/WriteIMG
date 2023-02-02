import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import { getDB } from "../db/connect.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

router.get("/", async (request, response) => {
  try {
    const db = await getDB();
    const posts = await db.collection("Posts").find({}).toArray();
    response.status(200).json({ success: true, data: posts });
  } catch (error) {
    response.status(500).json({ success: false, message: error });
  }
});

router.post("/", async (request, response) => {
  try {
    const db = getDB();
    const { name, prompt, photo } = request.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await db
      .collection("Posts")
      .insertOne({ name, prompt, photo: photoUrl.secure_url });

    response.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error });
  }
});

export default router;
