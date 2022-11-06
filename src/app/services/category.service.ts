import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IResponse } from '../shared/global-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.apiUrl
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(
    private http: HttpClient
  ) { }

  add(data: any){
    return this.http.post<IResponse>(this.url + '/category/add', data, this.options)
  }

  update(data: any){
    return this.http.patch<IResponse>(this.url + '/category/update', data, this.options)
  }

  get(){
    return this.http.get(this.url + '/category/get')
  }




}
