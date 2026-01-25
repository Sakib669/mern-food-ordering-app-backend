import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute.js";
import { v2 as cloudinary } from "cloudinary";
import MyRestaurantRoute from "./routes/MyRestaurantRoute.js";
import restaurantRoute from "./routes/RestaurantRoute.js";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("Database connection error: মুরগি চোর", err));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", MyRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "sogir uddin 220" });
});

app.listen(5000, () => {
  console.log("server is workin on port 5000");
});
