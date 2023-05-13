/*
// post method que recive una imagen
import express from "express";
import { Request, Response } from "express";
import { uploadImage } from "./imgur";

const app = express();

app.post("/my-endpoint", async (req: Request, res: Response) => {
  const image = req.files?.image as File;
  const imageUrl = await uploadImage(image);
  // Do whatever you need to do with the image URL, e.g. save it to a database
  res.send({ imageUrl });
});

// subir imagen a imgur y devolver la url
import axios from "axios";

async function uploadImage(image: File): Promise<string> {
  // Set up Imgur API endpoint and headers
  const url = "https://api.imgur.com/3/image";
  const headers = {
    Authorization: "Client-ID YOUR_CLIENT_ID",
    "Content-Type": "multipart/form-data",
  };

  // Create form data object to send to Imgur API
  const formData = new FormData();
  formData.append("image", image);

  // Make POST request to Imgur API with form data
  const response = await axios.post(url, formData, { headers });

  // Return the image URL from the response data
  return response.data.data.link;
}
*/
