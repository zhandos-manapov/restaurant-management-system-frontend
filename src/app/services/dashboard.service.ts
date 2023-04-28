import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDashboardDetails } from '../shared/global-interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = environment.apiUrl + '/dashboard'

  constructor(private http: HttpClient) { }

  getDetails() {
    return this.http.get<IDashboardDetails>(this.url)
  }



}
