import express from "express";
import authController from "../controllers/authController";

const authRoutes = express.Router();

const controller = authController();

authRoutes.post("/login", controller.login);
authRoutes.post("/register", controller.register);

export default authRoutes;
