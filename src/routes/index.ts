import { Router } from "express";
import userRoutes from "./userRoutes";

const routers = Router()

routers.use(userRoutes)

export default routers