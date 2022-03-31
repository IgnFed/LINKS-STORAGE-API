import { NextFunction, Request, Response } from "express";
import { encryptPassword } from "../../utils/encryptPassword";
import { IResponseError, IResponseSuccess } from "../../interfaces/Response";
import { IUserBase, IUserResponse } from "../../interfaces/models/User";
import Link from "../../models/Link";
import User from "../../models/User";

export const createUser = async (req: Request, res: Response, next: NextFunction)=>{
  const { name, password, username  } = req.body as IUserBase;
  try{
    const encriptedPassword = encryptPassword(password)
      const newUser = new User({
      name,
      password: encriptedPassword,
      username
    })
    await (newUser as any).save();
    return res.status(200).json({
      type: 'SUCCESS',
      message: 'Successfully created user',
      data: newUser
    })
  }
  catch(e){
    return next(e)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction)=>{
  const { userId } = req as Request & { userId: string };
  try{
    const user = await User.findOne({id: userId}, {links: 0}) as IUserResponse;
    if(!user){
      return res.status(404).json({
        type: 'ERROR',
        message: 'Invalid Credentials'
      } as IResponseError)
    }
    return res.status(200).json({
        type: 'SUCCESS',
        message: 'Successfully fetched user',
        data: user
      } as IResponseSuccess<IUserResponse>)
  }
  catch(e){
    return next(e)
  }
}

export const clearDB = async (_: Request, res: Response, next: NextFunction)=>{
  try{
    await User.deleteMany({})
    await Link.deleteMany({})
    res.status(200).json({
      type: 'SUCCESS',
      message: 'Successfully cleared DB'
    })
  }
  catch(e){
    next(e)
  }
}