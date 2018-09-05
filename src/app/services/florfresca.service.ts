import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FlorfrescaService {

	private heroesUrl = 'api-v1'; 
  	constructor() { }
}
