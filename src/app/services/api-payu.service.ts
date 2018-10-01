import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Transaction } from './../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class ApiPayuService {
  base64:string;
  private Url = 'https://sandbox.api.payulatam.com/payments-api/'; 
  private  headers:HttpHeaders;

  constructor(private http: HttpClient) { 
  	this.base64 = btoa("8ueeDs2mkY69uda:RWP6RItc4J0lr4e2rUr2R783WQ");
    // this.base64 = btoa("0123ABCDEF:A1B2C3D4E5");
    console.log(this.base64 );
  }

  putPlan (query: any): Observable<any>{
    this.headers =  new HttpHeaders({ 'Content-Type': 'application/json', "Authorization":this.base64 })
    return this.http.post<any>(this.Url+"/auth/tokens", query, {headers: this.headers});
  }
  getPlan(query: any): Observable<any>{
    this.headers =  new HttpHeaders({ 'Content-Type': 'application/json',"Authorization":this.base64 })
    return this.http.post<any>(this.Url+"/auth/tokens", query, {headers: this.headers});
  }
  susbcriptions(T: Transaction): Observable<any>{
    this.headers =  new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      "Accept": "application/json",
      "Accept-language": "es",
      "Content-Length": "length",
      "Authorization":"Basic MDEyM0FCQ0RFRjpBMUIyQzNENEU1"
    })
    console.log(this.headers);
    return this.http.post<any>(this.Url+"rest/v4.9/subscriptions/", T, {headers: this.headers});
  }
}
