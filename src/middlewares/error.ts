import { NextFunction, Request, Response } from "express";
import { IResponseError } from "../interfaces/Response";

export default (err: any, _: Request, res: Response, next: NextFunction) => {
  if(!err) return next();
  res.status(err.status || 500).send({
    type: 'ERROR',
    message: err._message || err.message
  } as IResponseError)

}