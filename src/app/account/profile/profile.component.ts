import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario';
import { Router  }  from "@angular/router";
import {FlorfrescaService} from '../../services/florfresca.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	usuario : Usuario;
  constructor(
  	private service: FlorfrescaService,
    private router:Router
  	) {
  	this.usuario = new Usuario();
  }

  ngOnInit() {
  	this.service.user(localStorage.getItem('id')).subscribe(u=>{
  		this.usuario = u;
  	},e=>{
  		console.log(e);
  	});
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setTimeout(() => {
        console.log('Success!!')
        this.router.navigateByUrl("/login"); 
      }, 1000);  
  }

}
