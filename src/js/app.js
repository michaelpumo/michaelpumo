require('browsernizr/lib/mq');
require('browsernizr');

var Modernizr   = require('browsernizr'),
    backstretch = require('./plugins/jquery.backstretch'),
    circliful   = require('./plugins/jquery.circliful'),
    lazyload    = require('./plugins/jquery.lazyload'),
    scrollspy   = require('./plugins/jquery.scrollspy');

(function($) {

    'use strict';

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
            
            $('#section-cover').backstretch('/dist/images/cover-landscape.jpg');
            $('#section-quotes').backstretch('/dist/images/michaelpumo.jpg');
            
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
                }, 500);
                
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
                }, 1000, 'linear', function() {
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
