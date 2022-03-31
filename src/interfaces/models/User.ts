export interface IUserBase<Links= Array<string>> {
  name: string,
  username: string,
  password: string,
  links: Links  
}

export interface IUserResponse extends IUserBase{
  id: string,
}