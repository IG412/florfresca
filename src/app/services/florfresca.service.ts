import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Plan } from '../models/plan';
import { Flower } from '../models/flower';
import { Size } from '../models/size';
import { Usuario } from '../models/usuario';
import { Subscripcion } from '../models/suscripcion';


@Injectable({
  providedIn: 'root'
})
export class FlorfrescaService {
	// private Url = 'http://localhost:5000/api';
  private Url = '/api' 
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
  plans(query:any): Observable<Plan[]> {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<any>(this.Url+"/plans", {headers:this.headers,params:query});
  }
  plan(query:any): Observable<any> {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<any>(this.Url+"/plans"+query._id,query, {headers:this.headers,params:query});
  }
  flowers():Observable<Flower[]>{
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Flower[]>(this.Url+"/flowers", {headers:this.headers});
  }
  sizes():Observable<Size[]>{
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Size[]>(this.Url+"/sizes", {headers:this.headers});
  }
  user(id:string): Observable<Usuario>{
    let token=(localStorage.getItem('token'));
    this.headers = new HttpHeaders({'Content-Type': 'application/json','access-token':token});
    return this.http.get<Usuario>(this.Url+"/user/"+id,{headers:this.headers});
  }
  // putUser(u:Usuario):Observable<any>{
  //   let token=(localStorage.getItem('token'));
  //   this.headers = new HttpHeaders({'Content-Type': 'application/json','access-token':token});
  //   return this.http.put<Usuario>(this.Url+"/user/"+u._id,u,{headers:this.headers});
  // }
  susbcriptions(s:Subscripcion):Observable<any>{
    let token=(localStorage.getItem('token'));
    this.headers = new HttpHeaders({'Content-Type': 'application/json','access-token':token});
    return  this.http.post<any>(this.Url+"/subscriptions",s,{headers:this.headers});
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
}
