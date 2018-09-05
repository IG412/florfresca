import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Plan } from '../models/plan';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FlorfrescaService {
	private heroesUrl = 'api-v1'; 
  	constructor(
  		private http: HttpClient
  	) { }

  // getHeroes (): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       tap(heroes => this.log('fetched heroes')),
  //       catchError(this.handleError('getHeroes', []))
  //     );
  // }
}
