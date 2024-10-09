import cookieParser from "cookie-parser";
import cors from "cors";
import { Application, json, urlencoded } from "express";
import { corsConfig } from "@/config/cors";

export function setBaseMiddlewares(app: Application) {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors(corsConfig));
}
