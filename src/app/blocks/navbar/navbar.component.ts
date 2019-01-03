import { Component, OnInit } from '@angular/core';
import { Router  }  from "@angular/router";
import {trigger,state,style,animate,transition} from '@angular/animations';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
               trigger('slideInOut', [
                 state('in', style({
                   transform: 'translate3d(0, 0, 0)'
                 })),
                 state('out', style({
                   transform: 'translate3d(100%, 0, 0)'
                 })),
                 transition('in => out', animate('400ms ease-in-out')),
                 transition('out => in', animate('400ms ease-in-out'))
               ]),
             ]
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router
    ) { }
  
  toggleMenu() {
      this.toggleMenu();
  }

  ngOnInit() {
    this.menuResponsive();
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

  menuResponsive(){
    $('nav.menu .fa-angle-down, nav.menu .fa-chevron-right').on( "click", function() {
      $(this).parent('a').parent('li').toggleClass('active');
      $(this).parent('a').next('.dropmenu').slideToggle();
      return false;
    });

    $('.nav-menu-icon a').on('click', function() {
      if ($('nav').hasClass('slide-menu')){
        $('nav').removeClass('slide-menu'); 
        $(this).removeClass('active');
        $('body').toggleClass('menu_opened');
      }else {
          $('nav').addClass('slide-menu');
          $(this).addClass('active');
          $('body').toggleClass('menu_opened');
      }
      return false;
     });
  }

}
