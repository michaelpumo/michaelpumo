require('browsernizr/lib/mq');
require('browsernizr');

var Modernizr   = require('browsernizr'),
    ScrollMagic = require('scrollmagic'),
    backstretch = require('./plugins/jquery.backstretch'),
    lazyload    = require('./plugins/jquery.lazyload');

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

            // var controller = new ScrollMagic.Controller();
            // var scene = new ScrollMagic.Scene({triggerElement: '#section-process', duration: $('#section-process').height() })
            //     .on('enter', function () {
            //         console.log('enter');
            //     })
            //     .on('leave', function () {
            //         console.log('leave');
            //     })
            //     .addTo(controller);

            
            
        },
        
        timeline: function() {

            var controller = new ScrollMagic.Controller();

            cache.$timelineEvent.each(function() {

                var timelineItem = new ScrollMagic.Scene({triggerElement: $(this)[0], offset: 0 }) //duration: $(this).height()
                    .setClassToggle($(this)[0],'show')
                    .addTo(controller);

            });
    
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
