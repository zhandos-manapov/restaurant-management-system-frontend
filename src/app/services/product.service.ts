import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct, IResponse } from '../shared/global-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.apiUrl + '/product'
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { }

  add(data: any) {
    return this.http.post<IResponse>(this.url + '/add', data, this.options)
  }

  update(data: any) {
    return this.http.patch<IResponse>(this.url + '/update', data, this.options)
  }

  get() {
    return this.http.get<IProduct[]>(this.url + '/get')
  }

  updateStatus(data: any) {
    return this.http.patch<IResponse>(this.url + '/updateStatus', data, this.options)
  }

  delete(id: number) {
    return this.http.delete<IResponse>(this.url + '/delete/' + id, this.options)
  }

  getByCategoryId(id: number) {
    return this.http.get(this.url + '/getByCategory/' + id)
  }

  getById(id: number) {
    return this.http.get(this.url + '/getById/' + id)
  }



}
