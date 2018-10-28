import { Component, OnInit } from '@angular/core';
//importar librey de Swiper js
import * as Swiper from "src/assets/js/idangerous.swiper.min.js";
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private swipers:any;
  private winW:any;
  private xsPoint:Number; 
  private smPoint:Number;
  private mdPoint:Number;
  private lgPoint:Number; 
  private addPoint:Number;

  constructor() {
  	this.winW = $(window).width();
  	this.addPoint = 1600;
  	this.xsPoint = 451;
  	this.smPoint = 768;
  	this.mdPoint = 992;
  	this.lgPoint = 1200;
  }

  ngOnInit() {
  	// this.initSwiper();
  }
  //Función de inicio de Slide con Swiper 
  	initSwiper(){		
  		var slidesPerViewVar = this.updateSlidesPerView($('.swiper-container'));
		this.swipers = new Swiper ('.swiper-container', {
	      direction: 'vertical',
	      speed: 5000,
	      autoplay: true,
	      slidesPerView:slidesPerViewVar,
	      loop: 1
	    })
	}
	updateSlidesPerView(swiperContainer){
		if(this.winW>=this.addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(this.winW>=this.lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(this.winW>=this.mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(this.winW>=this.smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else if(this.winW>=this.xsPoint) return parseInt(swiperContainer.attr('data-xs-slides'),10);
		else return parseInt(swiperContainer.attr('data-mob-slides'),10);
	}
}
