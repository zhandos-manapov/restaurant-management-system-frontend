import { IMenu } from "./global-interface"
export abstract class GlobalConstants {
  //Message
  public static genericError = 'Something went wrong. Please try again.'

  public static unauthorized = 'You are not authorized to access this page.'

  //Regex
  public static nameRegex = '[a-zA-Z0-9 ]*'

  public static emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'

  public static contactNumberRegex = '^[e0-9]{10,10}$'

  //Variable
  public static error = 'error'

  //Constants
  public static readonly MENUITEMS: IMenu[] = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'category', name: 'Manage Category', icon: 'category', role: 'admin' }
  ]

}