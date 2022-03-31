export interface ILinkBase{
  name: string,
  url: string,
  colors?: {
    backgroundColor?: string,
    fontColor?: string,
  },
  user: string,
}

export interface ILinkResponse extends ILinkBase{
  id: string,
}