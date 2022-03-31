import { Request, Response, NextFunction } from 'express'
import User from '../../models/User'
import { IResponseError, IResponseSuccess } from '../../interfaces/Response';
import { ILinkBase, ILinkResponse } from '../../interfaces/models/Link';
import { IUserResponse } from '../../interfaces/models/User';
import Link from '../../models/Link';

export const createLink = async (req: Request, res: Response, next: NextFunction) => {
  const { name, url } = req.body as ILinkBase;
  const { userId } = req as Request & { userId: string }
  const newLink = new Link(
    {
      name,
      url,
      colors: {
        backgroundColor: '#FFFFFF',
        fontColor: '#000000'
      },
      user: userId
    }
  ) as ILinkResponse
  try {
    const user = await User.findOne({ id: userId }) as IUserResponse
    user.links.push(newLink.id);
    await (user as any).save()
      .then(async () => {
        await (newLink as any).save();
        return res.status(200).json({
          type: 'SUCCESS',
          message: 'Successfully created link',
          data: newLink
        } as IResponseSuccess<ILinkResponse>)
      })
  }
  catch (e) {
    return next(e)
  }
}

export const getLink = async (req: Request, res: Response, next: NextFunction)=>{
  const { linkId } = req.params
  try{
    const link = await Link.findOne({ id: linkId }) as ILinkResponse
    if(!link){
      return res.status(404).json({
        type: 'ERROR',
        message: 'Link not found',
      } as IResponseError)
    }
    return res.status(200).json({
      type: 'SUCCESS',
      message: 'Successfully fetched link',
      data: link
    } as IResponseSuccess<ILinkResponse>)
  }
  catch(e){
    return next(e)
  }
}

export const getLinks = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req as Request & { userId: string };
  try {
    const user = await User.findOne({ id: userId })
    if (!user) {
      return res.status(404).json({
        type: 'ERROR',
        message: 'Invalid Credentials'
      } as IResponseError)
    }
    return res.status(200).json({
      type: 'SUCCESS',
      message: 'Successfully fetched links',
      data: user.links
    } as IResponseSuccess)
  }
  catch (e) {
    return next(e)
  }
}

export const updateLink = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req as Request & { userId: string }
  const { linkId } = req.params
  const { name, url, colors } = req.body as ILinkBase

  try {
    const user = await User.findOne({ id: userId })
    const updatedLink = await Link.findOneAndUpdate(
      {
        id: linkId
      },
      {
        name,
        url,
        colors: {
          backgroundColor: colors?.backgroundColor || '#FFFFFF',
          fontColor: colors?.fontColor || '#000000',
        }
      } as ILinkBase
    )

    if(!user || !updatedLink){
      return res.status(404).json({
        type: 'ERROR',
        message: 'Invalid Credentials'
      } as IResponseError)
    }
    user.links.push(updatedLink.id);
    await (user as any).save()
    return res.status(200).json({
      type: 'SUCCESS',
      message: 'Successfully updated link',
      data: updatedLink
    } as IResponseSuccess<ILinkResponse>)
  }
  catch(e){
    return next(e)
  }
}

export const deleteLink = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req as Request & { userId: string }
  const { linkId } = req.params
  try{
    const user = await User.findOne({ id: userId })
    const link = await User.findOne({ id: linkId })
    if(!user || !link){
      return res.status(404).json({
        type: 'ERROR',
        message: 'Invalid Credentials'
      } as IResponseError)
    }
    const filteredLinkPos = user.links.findIndex(link => link === linkId)
    user.links.splice(filteredLinkPos, 1)
    await (user as any).save()
    return res.status(200).json({
      type: 'INFO',
      message: 'Successfully deleted link',
    } as IResponseSuccess)
  }
  catch(e){
    return next(e)
  }
  
}

export const deleteAllLinks =  async (req: Request, res: Response, next: NextFunction)=>
{
  const { userId } = req as Request & { userId: string }
  try{
    const user = await User.findOne({id: userId})
    if(!user){
      return res.status(404).json({
        type: 'ERROR',
        message: 'Invalid Credentials'
      } as IResponseError)
    }
    await Link.deleteMany({user: userId})
    user.links.splice(0, user.links.length)
    await (user as any).save()
    return res.json({
      type: 'INFO',
      message: 'Successfully deleted all links',
    } as IResponseSuccess)
  }
  catch(e){
    return next(e)
  }
}

export const getAllLinks = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const links = await Link.find({});
    return res.status(200).json({
      type: 'SUCCESS',
      message: 'Successfully fetched links',
      data: links
    })
  }
  catch (e) {
    return next(e)
  }
}