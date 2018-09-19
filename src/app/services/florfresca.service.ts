import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Plan } from '../models/plan';


@Injectable({
  providedIn: 'root'
})
export class FlorfrescaService {
	private Url = 'http://localhost:5000/api'; 
  private  headers:HttpHeaders;
  	constructor(
  		private http: HttpClient
  	) { }

  Auth0 (query: any): Observable<any>{
    this.headers =  new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(this.Url+"/auth/tokens", query, {headers: this.headers});
  }
  create_user(query: any):Observable<any>{
    this.headers =  new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(this.Url+"/auth/register", query, {headers: this.headers});
  }
  recovery(query):Observable<any>{
    this.headers =  new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(this.Url+"/", query, {headers: this.headers});
  }
  reset(query):Observable<any>{
    this.headers =  new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(this.Url+"/", query, {headers: this.headers});
  }
  // Gets (): Observable<Hero[]> {
  // this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  // return this.http.post<any>(this.apiUrl+"autho/user", query, {headers:this.headers});
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(heroes => this.log('fetched heroes')),
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }

  // Gets (): Observable<Hero[]> {
  // this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  // return this.http.post<any>(this.apiUrl+"autho/user", query, {headers:this.headers});
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(heroes => this.log('fetched heroes')),
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }
}
