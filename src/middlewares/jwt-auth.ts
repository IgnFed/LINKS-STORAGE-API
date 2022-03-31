import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IResponseError } from '../interfaces/Response';

export const  authUser = (req: Request, res: Response, next: NextFunction)=>{
  const authHeader = req.header('Authorization');
  let token = ''
  if(authHeader && authHeader?.toLowerCase().startsWith('bearer')){
    token = authHeader.substring(7)
  }
  const decodedToken = jwt.verify(token, process.env.TOKEN!) as any
  if(!token || !decodedToken.id){
    res.status(401).json({
      type: 'ERROR',
      message: 'Missing or Invalid Token',
    } as IResponseError)
  }
  const { id: userId } = decodedToken
  // @ts-ignore
  req.userId = userId
  next()
}