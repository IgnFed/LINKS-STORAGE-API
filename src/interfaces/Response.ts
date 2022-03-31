interface IResponse {
  type: string,
  message: string,
}

export interface IResponseSuccess<Data = unknown> extends IResponse {
  data: Data
}

export interface IResponseError extends IResponse {}