import { Component, OnInit } from '@angular/core';
//importar librey de Swiper js
import * as Swiper from "src/assets/js/idangerous.swiper.min.js";
declare var $: any;

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
	//declaracion de variables para Swiper
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
  	this.initSwiper();
  	//swiper arrows
	$('.swiper-arrow-left').on('click',function(){
		this.swipers['swiper-'+$(this).closest('.arrows').find('.swiper-container').attr('id')].swipePrev();
	});
	$('.swiper-arrow-right').on('click',function(){
		this.swipers['swiper-'+$(this).closest('.arrows').find('.swiper-container').attr('id')].swipeNext();
	});
  }

  //Función de inicio de Slide con Swiper 
  	initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);
			var centerVar = parseInt($t.attr('data-center'),10);
			var simVar = ($t.closest('.circle-description-slide-box').length)?false:true;

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = this.updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar,10);

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);

			var slidesPerGroup = parseInt($t.attr('data-slides-per-group'),10);
			if(!slidesPerGroup){slidesPerGroup=1;}			

			this.swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				slidesPerGroup: slidesPerGroup,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: simVar,
				centeredSlides: centerVar,
				roundLengths: true,
				onInit: function(swiper){
					var browserWidthResize = $(window).width();
					if (browserWidthResize < 750) {
							swiper.params.slidesPerGroup=1;
					} else { 
                      swiper.params.slidesPerGroup=slidesPerGroup;
					}
				},
				onResize: function(swiper){
					var browserWidthResize2 = $(window).width();
					if (browserWidthResize2 < 750) {
							swiper.params.slidesPerGroup=1;
					} else { 
                      swiper.params.slidesPerGroup=slidesPerGroup;
					  swiper.resizeFix(true);
					}					
				},									
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
					var qVal = $t.find('.swiper-slide-active').attr('data-val');
					$t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
				},
				onSlideChangeStart: function(swiper){
					$t.find('.swiper-slide.active').removeClass('active');
					if($t.hasClass('thumbnails-preview')){
						var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
						this.swipers['swiper-'+$t.next().attr('id')].swipeTo(activeIndex);
						$t.next().find('.current').removeClass('current');
						$t.next().find('.swiper-slide[data-val="'+activeIndex+'"]').addClass('current');
					}
				},
				onSlideClick: function(swiper){
					if($t.hasClass('thumbnails')) {
						this.swipers['swiper-'+$t.prev().attr('id')].swipeTo(swiper.clickedSlideIndex);
					}
				}
			});
			this.swipers['swiper-'+index].reInit();
			if($t.attr('data-slides-per-view')=='responsive'){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
			initIterator++;
		});

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
