export interface IResponse {
  message: string
}

export interface ILoginResponse {
  token: string
  message?: string
}

export interface IToken {
  role: string
}

export interface IDashboardDetails {
  billCount: number
  categoryCount: number
  productCount: number
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