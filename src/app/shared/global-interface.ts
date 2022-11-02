export interface IResponse {
  message: string
}

export interface ILoginResponse{
  token: string
  message?: string
}

export interface IToken{
  role: string
}