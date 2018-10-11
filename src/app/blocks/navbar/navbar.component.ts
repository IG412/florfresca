import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isLogin(){
  	return (localStorage.getItem('token') && localStorage.getItem('id') ) ? false : true;
  }

  logout(){
  	localStorage.removeItem('token');
  	localStorage.removeItem('id');
  }

}
