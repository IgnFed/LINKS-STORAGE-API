import { Router } from "express";
import { login } from "../controllers/login";

const loginRouter = Router();

loginRouter.post('/user', login)

export { loginRouter }