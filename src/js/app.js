(function($) {


	'use strict';
	

	// #########################################################
	// Cache.
	// #########################################################

	var cache = {
		
		$htmlBody: $('html, body'),
		$body: $('body'),
		$nav: $('#nav'),
		$navButton: $('#nav-button'),
		$onward: $('#onward'),
		$sections: $('#sections'),
		$section: $('.section'),
		$stat: $('.stat'),
		$timelineEvent: $('.timeline-event'),
		$lazy: $('img.lazy')
		
	};
	
	
	// ####################################################
	// App.
	// ####################################################	
	
	var app = {
		
		init: function() {
			
			app.backstretch();
			app.jump();
			app.stats();
			app.navScroll();
			app.navToggle();
			app.timeline();
			app.lazyImages();
			
		},
		
		backstretch: function() {
			
			$('#section-cover').backstretch('/images/cover-landscape.jpg');
			$('#section-quotes').backstretch('/images/michaelpumo.jpg');
			
		},
		
		jump: function() {

			var $anchor = cache.$onward;
			
			$anchor.off('click');
			
			$anchor.on('click', function() {

				var travel = ( cache.$section.eq(1).offset().top );

				if( Modernizr.mq('only screen and (min-width: 768px)') ) {

					travel = ( cache.$section.eq(1).offset().top ) - cache.$nav.height();

				}
	
				cache.$htmlBody.animate({
					
					scrollTop: travel
				
				}, 1000, 'easeInOutExpo');
				
				return false;
			
			});
			
		},
		
		stats: function() {
			
			var canvas = document.createElement('canvas');
		
			if (canvas.getContext) {
			
				cache.$stat.circliful();
			
			}
			
		},
		
		navScroll: function() {
			
			var $anchors = cache.$nav.find('a');
			
			$anchors.off('click');
			
			$anchors.on('click', function() {

				var travel = ( $( $.attr(this, 'href') ).offset().top );

				if( Modernizr.mq('only screen and (min-width: 768px)') ) {

					travel = ( $( $.attr(this, 'href') ).offset().top ) - ( cache.$nav.height() - 1);

				}
	
				cache.$htmlBody.animate({
					
					scrollTop: travel
									
				}, 1000, 'easeInOutExpo', function() {
					
					cache.$nav.removeClass('nav-open');
					
				});
				
				return false;
			
			});
	
		},
		
		navToggle: function() {
			
			cache.$navButton.on('click', function() {
	
				cache.$nav.toggleClass('nav-open');

				return false;
			
			});
	
		},
		
		navHighlight: function() {
			
			cache.$section.each(function() {

				var position = $(this).position();
				
				$(this).scrollspy({
				
					min: position.top - cache.$nav.height(),
					max: position.top + ( $(this).height() - cache.$nav.height() ),
					onEnter: function(element) {
						
						cache.$nav.find('a[href="#' + element.id + '"]').parent().addClass('current');
						
					},
					onLeave: function(element) {
					
						cache.$nav.find('a[href="#' + element.id + '"]').parent().removeClass('current');
		
					}
					
				});
		
			});
			
		},
		
		timeline: function() {
			
			if( !Modernizr.touch ) {
		
				var controller = $.superscrollorama();
				
				cache.$timelineEvent.each(function(i) {
		
					var $this = $(this);
		
					if (i % 2 === 0) {
		
						controller.addTween( $this, TweenMax.from( $this, 0.4, { css: { opacity: 0, left:'1500px' }, ease:Quad.easeOut }), 0, -200);
					
					} else {
		
						controller.addTween( $this, TweenMax.from( $this, 0.4, { css: { opacity: 0, right:'1500px' }, ease:Quad.easeOut }), 0, -200);
		
					}
				
				});
			
			}
	
		},
		
		lazyImages: function() {
			
			cache.$lazy.lazyload({
				threshold : 200,
				effect : 'fadeIn'
			});
			
		}
		
	};
	

	app.init();
	

	$(window).on('resize load', function() {
		
		app.navHighlight();
		app.navScroll();
		app.jump();
		
	});
	

})(jQuery);