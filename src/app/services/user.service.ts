import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginResponse, IResponse, IUser } from '../shared/global-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { }

  signUp(data: any) {
    return this.http.post<IResponse>(this.url + '/auth/signup', data, this.options)
  }

  forgotPassword(data: any) {
    return this.http.post<IResponse>(this.url + '/forgotPassword', data, this.options)
  }

  login(data: any) {
    return this.http.post<ILoginResponse>(this.url + '/auth/signin', data, this.options)
  }

  checkToken() {
    return this.http.get(this.url + '/auth/check')
  }

  changePassword(data: any) {
    return this.http.post<IResponse>(this.url + '/user/password', data, this.options)
  }

  getUsers() {
    return this.http.get<IUser[]>(this.url + '/user', this.options)
  }

  update(user: any) {
    return this.http.patch<IResponse>(this.url + `/user/${user.id}`, user, this.options)
  }

}
