import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private url = environment.apiUrl + '/bill'
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { }

  generateReport(data: any){
    return this.http.post(this.url + '/generateReport', data)
  }

  getPdf(data: any){
    return this.http.post(this.url + '/getPdf', data, { responseType: 'blob'})
  }
}
