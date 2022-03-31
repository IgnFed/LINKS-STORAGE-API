import { Router } from "express";
import { clearDB, getUser, createUser } from "../controllers/user";
import { authUser } from "../middlewares/jwt-auth";
const userRouter = Router();

userRouter.get("/", authUser, getUser);
// userRouter.get('/all', getUsers)
userRouter.post('/', createUser)
userRouter.delete('/all', clearDB)

export default userRouter