import { Component, OnInit } from '@angular/core';
import { Router  }  from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router
    ) { }

  ngOnInit() {
  }

  isLogin(){
  	return (localStorage.getItem('token') && localStorage.getItem('id') ) ? false : true;
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
