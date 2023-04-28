export interface IResponse {
  message: string
}

export interface ILoginResponse {
  token: string
  expiresIn?: string
}

export interface IToken {
  role: string
}

export interface IDashboardDetails {
  bill_count: number
  category_count: number
  product_count: number
}

export interface IMenu {
  state: string
  name: string
  icon: string
  role: string
}

export interface ICategory {
  id: number
  name: string
}

export interface IProduct {
  id: number
  name: string
  categoryId: number
  categoryName: string
  description: string
  price: number
  status: string
}


export interface IBill {
  id: number
  uuid: string
  name: string
  email: string
  contactNumber: string
  paymentMethod: string
  total: number
  productDetails: string
  createdBy: string
}


export interface IUser {
  id: number
  name: string
  contactNumber: string
  email: string
  status: string
  role: string
}