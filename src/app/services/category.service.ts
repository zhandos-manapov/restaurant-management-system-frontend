import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory, IResponse } from '../shared/global-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.apiUrl + '/category'
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { }

  add(data: any) {
    return this.http.post<IResponse>(this.url, data, this.options)
  }

  update(data: any) {
    return this.http.patch<IResponse>(this.url + `/${data.id}`, data, this.options)
  }

  get() {
    return this.http.get<ICategory[]>(this.url)
  }
}
