import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginResponse, IResponse, IUser } from '../shared/global-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + '/user'
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { }

  signUp(data: any) {
    return this.http.post<IResponse>(this.url + '/signup', data, this.options)
  }

  forgotPassword(data: any) {
    return this.http.post<IResponse>(this.url + '/forgotPassword', data, this.options)
  }

  login(data: any) {
    return this.http.post<ILoginResponse>(this.url + '/login', data, this.options)
  }

  checkToken() {
    return this.http.get(this.url + '/checkToken')
  }

  changePassword(data: any) {
    return this.http.post<IResponse>(this.url + '/changePassword', data, this.options)
  }

  getUsers() {
    return this.http.get<IUser[]>(this.url + '/get')
  }

  update(user: any) {
    return this.http.patch<IResponse>(this.url + '/update', user, this.options)
  }

}
