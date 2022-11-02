import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginResponse, IResponse } from '../shared/global-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { }

  signUp(data: any) {
    return this.http.post<IResponse>(this.url + '/user/signup', data, this.options)
  }

  forgotPassword(data: any) {
    return this.http.post<IResponse>(this.url + '/user/forgotPassword', data, this.options)
  }

  login(data: any) {
    return this.http.post<ILoginResponse>(this.url + '/user/login', data, this.options)
  }

  checkToken(){
    return this.http.get(this.url + '/user/checkToken')
  }


}
