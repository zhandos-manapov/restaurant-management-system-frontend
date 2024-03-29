import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImportProvidersSource, Injectable } from '@angular/core';
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
        return this.http.post<IResponse>(this.url, data, this.options)
    }

    update(data: any) {
        return this.http.patch<IResponse>(`${this.url}/${data.id}`, data, this.options)
    }

    get() {
        return this.http.get<IProduct[]>(this.url)
    }

    delete(id: number) {
        return this.http.delete<IResponse>(`${this.url}/${id}`, this.options)
    }

    getByCategoryId(id: number) {
        return this.http.get<IProduct[]>(this.url, { params: { category_id: id } })
    }

    getById(id: number) {
        return this.http.get<IProduct>(`${this.url}/${id}`)
    }
}
