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
	private Url:string;
  
  private  headers:HttpHeaders;
  	constructor(
  		private http: HttpClient
  	) {
      this.Url = window.location.origin+'/api';
      // this.Url = "http://localhost:5000/api";
    }

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
    return this.http.post<any>(this.Url+"/auth/recovery", query, {headers: this.headers});
  }
  reboot(query):Observable<any>{
    this.headers =  new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(this.Url+"/auth/reboot", query, {headers: this.headers});
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
  userSubs(oid:string):Observable<Subscripcion[]>{
    let token=(localStorage.getItem('token'));
    this.headers = new HttpHeaders({'Content-Type': 'application/json','access-token':token});
    return this.http.get<Subscripcion[]>(this.Url+"/user/"+oid+"/subscriptions",{headers:this.headers});
  }
  userCards(oid:string):Observable<any[]>{
    let token=(localStorage.getItem('token'));
    this.headers = new HttpHeaders({'Content-Type': 'application/json','access-token':token});
    return this.http.get<any[]>(this.Url+"/user/"+oid+"/creditCards",{headers:this.headers});
  }
  userEdit(u:Usuario):Observable<any>{
    let token=(localStorage.getItem('token'));
    this.headers = new HttpHeaders({'Content-Type': 'application/json','access-token':token});
    return this.http.put<any>(this.Url+"/user/"+u._id,u,{headers:this.headers});
  }
  susbcriptions(s:Subscripcion):Observable<any>{
    let token=(localStorage.getItem('token'));
    this.headers = new HttpHeaders({'Content-Type': 'application/json','access-token':token});
    return  this.http.post<any>(this.Url+"/subscriptions",s,{headers:this.headers});
  }
  subs(id:string):Observable<Subscripcion>{
    let token=(localStorage.getItem('token'));
    this.headers = new HttpHeaders({'Content-Type': 'application/json','access-token':token});
    return  this.http.get<Subscripcion>(this.Url+"/subscription/"+id,{headers:this.headers});
  }
  subsEdit(id:string):Observable<any>{
    let token=(localStorage.getItem('token'));
    this.headers = new HttpHeaders({'Content-Type': 'application/json','access-token':token});
    return  this.http.put<any>(this.Url+"/subscription/"+id,{estado:"eliminado"},{headers:this.headers});
  }
}
