import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { IResponseError } from "../../interfaces/Response"
import { IUserBase } from "../../interfaces/models/User"
import User from "../../models/User"

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body as IUserBase
  try {
    const user = await User.findOne({ username })
    const isPasswordCorrect = user === null ? false : await compare(password, user.password)

    if (!isPasswordCorrect || !user)
      return res.status(401).json({
        type: 'ERROR',
        message: 'Username or password incorrect',
      } as IResponseError)
    const payload = {
      id: user.id,
      username: user.username,
      password: user.password
    }
    const token = jwt.sign(
      payload,
      process.env.TOKEN!, {
      expiresIn: "30min",
    })
    return res.send({
      name: user.name,
      username: user.username,
      token
    })
  }
  catch (e) {
    return next(e)
  }
}