(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Modernizr = require('./lib/Modernizr'),
    ModernizrProto = require('./lib/ModernizrProto'),
    classes = require('./lib/classes'),
    testRunner = require('./lib/testRunner'),
    setClasses = require('./lib/setClasses');

// Run each test
testRunner();

// Remove the "no-js" class if it exists
setClasses(classes);

delete ModernizrProto.addTest;
delete ModernizrProto.addAsyncTest;

// Run the things that are supposed to run after the tests
for (var i = 0; i < Modernizr._q.length; i++) {
  Modernizr._q[i]();
}

module.exports = Modernizr;

},{"./lib/Modernizr":2,"./lib/ModernizrProto":3,"./lib/classes":4,"./lib/setClasses":11,"./lib/testRunner":13}],2:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');


  // Fake some of Object.create
  // so we can force non test results
  // to be non "own" properties.
  var Modernizr = function(){};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it
  // rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  

module.exports = Modernizr;
},{"./ModernizrProto":3}],3:[function(require,module,exports){
var tests = require('./tests');


  var ModernizrProto = {
    // The current version, dummy
    _version: 'v3.0.0pre',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      classPrefix : '',
      enableClasses : true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function( test, cb ) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for
      // actual async tests. This is in case people listen to
      // synchronous tests. I would leave it out, but the code
      // to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      setTimeout(function() {
        cb(this[test]);
      }, 0);
    },

    addTest: function( name, fn, options ) {
      tests.push({name : name, fn : fn, options : options });
    },

    addAsyncTest: function (fn) {
      tests.push({name : null, fn : fn});
    }
  };

  

module.exports = ModernizrProto;
},{"./tests":14}],4:[function(require,module,exports){

  var classes = [];
  
module.exports = classes;
},{}],5:[function(require,module,exports){

  var createElement = function() {
    return document.createElement.apply(document, arguments);
  };
  
module.exports = createElement;
},{}],6:[function(require,module,exports){

  var docElement = document.documentElement;
  
module.exports = docElement;
},{}],7:[function(require,module,exports){
var createElement = require('./createElement');


  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if(!body) {
      // Can't use the real body create a fake one.
      body = createElement('body');
      body.fake = true;
    }

    return body;
  }

  

module.exports = getBody;
},{"./createElement":5}],8:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var docElement = require('./docElement');
var createElement = require('./createElement');
var getBody = require('./getBody');


  // Inject element with style element and some CSS rules
  function injectElementWithStyles( rule, callback, nodes, testnames ) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if ( parseInt(nodes, 10) ) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while ( nodes-- ) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
    // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
    // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
    // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
    // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
    style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
    div.id = mod;
    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).innerHTML += style;
    body.appendChild(div);
    if ( body.fake ) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if ( body.fake ) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  

module.exports = injectElementWithStyles;
},{"./ModernizrProto":3,"./createElement":5,"./docElement":6,"./getBody":7}],9:[function(require,module,exports){

  /**
   * is returns a boolean for if typeof obj is exactly type.
   */
  function is( obj, type ) {
    return typeof obj === type;
  }
  
module.exports = is;
},{}],10:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var testMediaQuery = require('./testMediaQuery');


  // Modernizr.mq tests a given media query, live against the current state of the window
  // A few important notes:
  //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
  //   * A max-width or orientation query will be evaluated against the current state, which may change later.
  //   * You must specify values. Eg. If you are testing support for the min-width media query use:
  //       Modernizr.mq('(min-width:0)')
  // usage:
  // Modernizr.mq('only screen and (max-width:768)')
  var mq = ModernizrProto.mq = testMediaQuery;
  

module.exports = mq;
},{"./ModernizrProto":3,"./testMediaQuery":12}],11:[function(require,module,exports){
var Modernizr = require('./Modernizr');
var docElement = require('./docElement');


  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses( classes ) {
    var className = docElement.className;
    var regex;
    var classPrefix = Modernizr._config.classPrefix || '';

    // Change `no-js` to `js` (we do this regardles of the `enableClasses`
    // option)
    // Handle classPrefix on this too
    var reJS = new RegExp('(^|\\s)'+classPrefix+'no-js(\\s|$)');
    className = className.replace(reJS, '$1'+classPrefix+'js$2');

    if(Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      docElement.className = className;
    }

  }

  

module.exports = setClasses;
},{"./Modernizr":2,"./docElement":6}],12:[function(require,module,exports){
var injectElementWithStyles = require('./injectElementWithStyles');


  // adapted from matchMedia polyfill
  // by Scott Jehl and Paul Irish
  // gist.github.com/786768
  var testMediaQuery = (function () {
    var matchMedia = window.matchMedia || window.msMatchMedia;
    if ( matchMedia ) {
      return function ( mq ) {
        var mql = matchMedia(mq);
        return mql && mql.matches || false;
      };
    }

    return function ( mq ) {
      var bool = false;

      injectElementWithStyles('@media ' + mq + ' { #modernizr { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                window.getComputedStyle(node, null) :
                node.currentStyle)['position'] == 'absolute';
      });

      return bool;
    };
  })();

  

module.exports = testMediaQuery;
},{"./injectElementWithStyles":8}],13:[function(require,module,exports){
var tests = require('./tests');
var Modernizr = require('./Modernizr');
var classes = require('./classes');
var is = require('./is');


  // Run through all tests and detect their support in the current UA.
  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;
    var modernizrProp;
    var mPropCount;

    for ( var featureIdx in tests ) {
      featureNames = [];
      feature = tests[featureIdx];
      // run the test, throw the return value into the Modernizr,
      //   then based on that boolean, define an appropriate className
      //   and push it into an array of classes we'll join later.
      //
      //   If there is no name, it's an 'async' test that is run,
      //   but not directly added to the object. That should
      //   be done with a post-run addTest call.
      if ( feature.name ) {
        featureNames.push(feature.name.toLowerCase());

        if (feature.options && feature.options.aliases && feature.options.aliases.length) {
          // Add all the aliases into the names list
          for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
            featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
          }
        }
      }

      // Run the test, or use the raw value if it's not a function
      result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


      // Set each of the names on the Modernizr object
      for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
        featureName = featureNames[nameIdx];
        // Support dot properties as sub tests. We don't do checking to make sure
        // that the implied parent tests have been added. You must call them in
        // order (either in the test, or make the parent test a dependency).
        //
        // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
        // hashtag famous last words
        featureNameSplit = featureName.split('.');

        if (featureNameSplit.length === 1) {
          Modernizr[featureNameSplit[0]] = result;
        }
        else if (featureNameSplit.length === 2) {
          Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
        }

        classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
      }
    }
  }

  

module.exports = testRunner;
},{"./Modernizr":2,"./classes":4,"./is":9,"./tests":14}],14:[function(require,module,exports){

  var tests = [];
  
module.exports = tests;
},{}],15:[function(require,module,exports){
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
                
                }, 500, 'swing');
                
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

},{"./plugins/jquery.backstretch":16,"./plugins/jquery.circliful":17,"./plugins/jquery.lazyload":18,"./plugins/jquery.scrollspy":19,"browsernizr":1,"browsernizr/lib/mq":10}],16:[function(require,module,exports){
/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function(a,d,p){a.fn.backstretch=function(c,b){(c===p||0===c.length)&&a.error("No images were supplied for Backstretch");0===a(d).scrollTop()&&d.scrollTo(0,0);return this.each(function(){var d=a(this),g=d.data("backstretch");if(g){if("string"==typeof c&&"function"==typeof g[c]){g[c](b);return}b=a.extend(g.options,b);g.destroy(!0)}g=new q(this,c,b);d.data("backstretch",g)})};a.backstretch=function(c,b){return a("body").backstretch(c,b).data("backstretch")};a.expr[":"].backstretch=function(c){return a(c).data("backstretch")!==p};a.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5E3,fade:0};var r={left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},s={position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxHeight:"none",maxWidth:"none",zIndex:-999999},q=function(c,b,e){this.options=a.extend({},a.fn.backstretch.defaults,e||{});this.images=a.isArray(b)?b:[b];a.each(this.images,function(){a("<img />")[0].src=this});this.isBody=c===document.body;this.$container=a(c);this.$root=this.isBody?l?a(d):a(document):this.$container;c=this.$container.children(".backstretch").first();this.$wrap=c.length?c:a('<div class="backstretch"></div>').css(r).appendTo(this.$container);this.isBody||(c=this.$container.css("position"),b=this.$container.css("zIndex"),this.$container.css({position:"static"===c?"relative":c,zIndex:"auto"===b?0:b,background:"none"}),this.$wrap.css({zIndex:-999998}));this.$wrap.css({position:this.isBody&&l?"fixed":"absolute"});this.index=0;this.show(this.index);a(d).on("resize.backstretch",a.proxy(this.resize,this)).on("orientationchange.backstretch",a.proxy(function(){this.isBody&&0===d.pageYOffset&&(d.scrollTo(0,1),this.resize())},this))};q.prototype={resize:function(){try{var a={left:0,top:0},b=this.isBody?this.$root.width():this.$root.innerWidth(),e=b,g=this.isBody?d.innerHeight?d.innerHeight:this.$root.height():this.$root.innerHeight(),j=e/this.$img.data("ratio"),f;j>=g?(f=(j-g)/2,this.options.centeredY&&(a.top="-"+f+"px")):(j=g,e=j*this.$img.data("ratio"),f=(e-b)/2,this.options.centeredX&&(a.left="-"+f+"px"));this.$wrap.css({width:b,height:g}).find("img:not(.deleteable)").css({width:e,height:j}).css(a)}catch(h){}return this},show:function(c){if(!(Math.abs(c)>this.images.length-1)){var b=this,e=b.$wrap.find("img").addClass("deleteable"),d={relatedTarget:b.$container[0]};b.$container.trigger(a.Event("backstretch.before",d),[b,c]);this.index=c;clearInterval(b.interval);b.$img=a("<img />").css(s).bind("load",function(f){var h=this.width||a(f.target).width();f=this.height||a(f.target).height();a(this).data("ratio",h/f);a(this).fadeIn(b.options.speed||b.options.fade,function(){e.remove();b.paused||b.cycle();a(["after","show"]).each(function(){b.$container.trigger(a.Event("backstretch."+this,d),[b,c])})});b.resize()}).appendTo(b.$wrap);b.$img.attr("src",b.images[c]);return b}},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(0===this.index?this.images.length-1:this.index-1)},pause:function(){this.paused=!0;return this},resume:function(){this.paused=!1;this.next();return this},cycle:function(){1<this.images.length&&(clearInterval(this.interval),this.interval=setInterval(a.proxy(function(){this.paused||this.next()},this),this.options.duration));return this},destroy:function(c){a(d).off("resize.backstretch orientationchange.backstretch");clearInterval(this.interval);c||this.$wrap.remove();this.$container.removeData("backstretch")}};var l,f=navigator.userAgent,m=navigator.platform,e=f.match(/AppleWebKit\/([0-9]+)/),e=!!e&&e[1],h=f.match(/Fennec\/([0-9]+)/),h=!!h&&h[1],n=f.match(/Opera Mobi\/([0-9]+)/),t=!!n&&n[1],k=f.match(/MSIE ([0-9]+)/),k=!!k&&k[1];l=!((-1<m.indexOf("iPhone")||-1<m.indexOf("iPad")||-1<m.indexOf("iPod"))&&e&&534>e||d.operamini&&"[object OperaMini]"==={}.toString.call(d.operamini)||n&&7458>t||-1<f.indexOf("Android")&&e&&533>e||h&&6>h||"palmGetResource"in d&&e&&534>e||-1<f.indexOf("MeeGo")&&-1<f.indexOf("NokiaBrowser/8.5.0")||k&&6>=k)})(jQuery,window);
},{}],17:[function(require,module,exports){
"use strict";

(function ($) {

    $.fn.circliful = function (options, callback) {

        var settings = $.extend({
            // These are the defaults.
            startdegree: 0,
            fgcolor: "#556b2f",
            bgcolor: "#eee",
            fill: false,
            width: 15,
            dimension: 200,
            fontsize: 15,
            percent: 50,
            animationstep: 1.0,
            iconsize: '20px',
            iconcolor: '#999',
            border: 'default',
            complete: null,
            bordersize: 10
        }, options);

        return this.each(function () {

            var customSettings = ["fgcolor", "bgcolor", "fill", "width", "dimension", "fontsize", "animationstep", "endPercent", "icon", "iconcolor", "iconsize", "border", "startdegree", "bordersize"];

            var customSettingsObj = {};
            var icon = '';
            var percent;
            var endPercent = 0;
            var obj = $(this);
            var fill = false;
            var text, info;

            obj.addClass('circliful');

            checkDataAttributes(obj);

            if (obj.data('text') != undefined) {
                text = obj.data('text');

                if (obj.data('icon') != undefined) {
                    icon = $('<i></i>')
                        .addClass('fa ' + $(this).data('icon'))
                        .css({
                            'color': customSettingsObj.iconcolor,
                            'font-size': customSettingsObj.iconsize
                        });
                }

                if (obj.data('type') != undefined) {
                    type = $(this).data('type');

                    if (type == 'half') {
                        addCircleText(obj, 'circle-text-half', (customSettingsObj.dimension / 1.45));
                    } else {
                        addCircleText(obj, 'circle-text', customSettingsObj.dimension);
                    }
                } else {
                    addCircleText(obj, 'circle-text', customSettingsObj.dimension);
                }
            }

            if ($(this).data("total") != undefined && $(this).data("part") != undefined) {
                var total = $(this).data("total") / 100;

                percent = (($(this).data("part") / total) / 100).toFixed(3);
                endPercent = ($(this).data("part") / total).toFixed(3);
            } else {
                if ($(this).data("percent") != undefined) {
                    percent = $(this).data("percent") / 100;
                    endPercent = $(this).data("percent");
                } else {
                    percent = settings.percent / 100;
                }
            }

            if ($(this).data('info') != undefined) {
                info = $(this).data('info');

                if ($(this).data('type') != undefined) {
                    type = $(this).data('type');

                    if (type == 'half') {
                        addInfoText(obj, 0.9);
                    } else {
                        addInfoText(obj, 1.25);
                    }
                } else {
                    addInfoText(obj, 1.25);
                }
            }

            $(this).width(customSettingsObj.dimension + 'px');

            var size = customSettingsObj.dimension,
                canvas = $('<canvas></canvas>').attr({
                    width: size,
                    height: size
                }).appendTo($(this)).get(0);

            var context = canvas.getContext('2d');

            var dpr = window.devicePixelRatio;
            if ( dpr ) {
                var $canvas = $(canvas);
                $canvas.css('width', size);
                $canvas.css('height', size);
                $canvas.attr('width', size * dpr);
                $canvas.attr('height', size * dpr);

                context.scale(dpr, dpr);
            }

            var container = $(canvas).parent();
            var x = size / 2;
            var y = size / 2;
            var degrees = customSettingsObj.percent * 360.0;
            var radians = degrees * (Math.PI / 180);
            var radius = size / 2.5;
            var startAngle = 2.3 * Math.PI;
            var endAngle = 0;
            var counterClockwise = false;
            var curPerc = customSettingsObj.animationstep === 0.0 ? endPercent : 0.0;
            var curStep = Math.max(customSettingsObj.animationstep, 0.0);
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var type = '';
            var fireCallback = true;
            var additionalAngelPI = (customSettingsObj.startdegree / 180) * Math.PI;

            if ($(this).data('type') != undefined) {
                type = $(this).data('type');

                if (type == 'half') {
                    startAngle = 2.0 * Math.PI;
                    endAngle = 3.13;
                    circ = Math.PI;
                    quart = Math.PI / 0.996;
                }
            }
            
            if ($(this).data('type') != undefined) {
                type = $(this).data('type');

                if (type == 'angle') {
                    startAngle = 2.25 * Math.PI;
                    endAngle = 2.4;
                    circ = 1.53 + Math.PI;
                    quart = 0.73 + Math.PI / 0.996;
                }
            }

            /**
             * adds text to circle
             *
             * @param obj
             * @param cssClass
             * @param lineHeight
             */
            function addCircleText(obj, cssClass, lineHeight) {
                $("<span></span>")
                    .appendTo(obj)
                    .addClass(cssClass)
                    .html(text)
                    .prepend(icon)
                    .css({
                        'line-height': lineHeight + 'px',
                        'font-size': customSettingsObj.fontsize + 'px'
                    });
            }

            /**
             * adds info text to circle
             *
             * @param obj
             * @param factor
             */
            function addInfoText(obj, factor) {
                $('<span></span>')
                    .appendTo(obj)
                    .addClass('circle-info-half')
                    .css(
                        'line-height', (customSettingsObj.dimension * factor) + 'px'
                    )
                    .text(info);
            }

            /**
             * checks which data attributes are defined
             * @param obj
             */
            function checkDataAttributes(obj) {
                $.each(customSettings, function (index, attribute) {
                    if (obj.data(attribute) != undefined) {
                        customSettingsObj[attribute] = obj.data(attribute);
                    } else {
                        customSettingsObj[attribute] = $(settings).attr(attribute);
                    }

                    if (attribute == 'fill' && obj.data('fill') != undefined) {
                        fill = true;
                    }
                });
            }

            /**
             * animate foreground circle
             * @param current
             */
            function animate(current) {

                context.clearRect(0, 0, canvas.width, canvas.height);

                context.beginPath();
                context.arc(x, y, radius, endAngle, startAngle, false);

                context.lineWidth = customSettingsObj.width + 1;

                context.strokeStyle = customSettingsObj.bgcolor;
                context.stroke();

                if (fill) {
                    context.fillStyle = customSettingsObj.fill;
                    context.fill();
                }

                context.beginPath();
                context.arc(x, y, radius, -(quart) + additionalAngelPI, ((circ) * current) - quart + additionalAngelPI, false);

                if (customSettingsObj.border == 'outline') {
                    context.lineWidth = customSettingsObj.width + customSettingsObj.bordersize;
                } else if (customSettingsObj.border == 'inline') {
                    context.lineWidth = customSettingsObj.width - customSettingsObj.bordersize;
                }

                context.strokeStyle = customSettingsObj.fgcolor;
                context.stroke();

                if (curPerc < endPercent) {
                    curPerc += curStep;
                    requestAnimationFrame(function () {
                        animate(Math.min(curPerc, endPercent) / 100);
                    }, obj);
                }

                if (curPerc == endPercent && fireCallback && typeof(options) != "undefined") {
                    if ($.isFunction(options.complete)) {
                        options.complete();

                        fireCallback = false;
                    }
                }
            }

            animate(curPerc / 100);

        });
    };
}(jQuery));
},{}],18:[function(require,module,exports){
/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.5
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
},{}],19:[function(require,module,exports){
/*!
 * jQuery Scrollspy Plugin
 * Author: @sxalexander
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    $.fn.extend({
      scrollspy: function ( options ) {
        
          var defaults = {
            min: 0,
            max: 0,
            mode: 'vertical',
            namespace: 'scrollspy',
            buffer: 0,
            container: window,
            onEnter: options.onEnter ? options.onEnter : [],
            onLeave: options.onLeave ? options.onLeave : [],
            onTick: options.onTick ? options.onTick : []
          }
          
          var options = $.extend( {}, defaults, options );

          return this.each(function (i) {

              var element = this;
              var o = options;
              var $container = $(o.container);
              var mode = o.mode;
              var buffer = o.buffer;
              var enters = leaves = 0;
              var inside = false;
                            
              /* add listener to container */
              $container.bind('scroll.' + o.namespace, function(e){
                  var position = {top: $(this).scrollTop(), left: $(this).scrollLeft()};
                  var xy = (mode == 'vertical') ? position.top + buffer : position.left + buffer;
                  var max = o.max;
                  var min = o.min;
                  
                  /* fix max */
                  if($.isFunction(o.max)){
                    max = o.max();
                  }

                  /* fix max */
                  if($.isFunction(o.min)){
                    min = o.min();
                  }

                  if(max == 0){
                      max = (mode == 'vertical') ? $container.height() : $container.outerWidth() + $(element).outerWidth();
                  }
                  
                  /* if we have reached the minimum bound but are below the max ... */
                  if(xy >= min && xy <= max){
                    /* trigger enter event */
                    if(!inside){
                       inside = true;
                       enters++;
                       
                       /* fire enter event */
                       $(element).trigger('scrollEnter', {position: position})
                       if($.isFunction(o.onEnter)){
                         o.onEnter(element, position);
                       }
                      
                     }
                     
                     /* trigger tick event */
                     $(element).trigger('scrollTick', {position: position, inside: inside, enters: enters, leaves: leaves})
                     if($.isFunction(o.onTick)){
                       o.onTick(element, position, inside, enters, leaves);
                     }
                  }else{
                    
                    if(inside){
                      inside = false;
                      leaves++;
                      /* trigger leave event */
                      $(element).trigger('scrollLeave', {position: position, leaves:leaves})

                      if($.isFunction(o.onLeave)){
                        o.onLeave(element, position);
                      }
                    }
                  }
              }); 

          });
      }

    })

    
})( jQuery, window, document, undefined );
},{}]},{},[15])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL01vZGVybml6ci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2Vybml6ci9saWIvTW9kZXJuaXpyUHJvdG8uanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2NsYXNzZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2NyZWF0ZUVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2RvY0VsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2dldEJvZHkuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2luamVjdEVsZW1lbnRXaXRoU3R5bGVzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL2xpYi9pcy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2Vybml6ci9saWIvbXEuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3NldENsYXNzZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3Rlc3RNZWRpYVF1ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL2xpYi90ZXN0UnVubmVyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL2xpYi90ZXN0cy5qcyIsInNyYy9qcy9hcHAuanMiLCJzcmMvanMvcGx1Z2lucy9qcXVlcnkuYmFja3N0cmV0Y2guanMiLCJzcmMvanMvcGx1Z2lucy9qcXVlcnkuY2lyY2xpZnVsLmpzIiwic3JjL2pzL3BsdWdpbnMvanF1ZXJ5Lmxhenlsb2FkLmpzIiwic3JjL2pzL3BsdWdpbnMvanF1ZXJ5LnNjcm9sbHNweS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdMQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIE1vZGVybml6ciA9IHJlcXVpcmUoJy4vbGliL01vZGVybml6cicpLFxuICAgIE1vZGVybml6clByb3RvID0gcmVxdWlyZSgnLi9saWIvTW9kZXJuaXpyUHJvdG8nKSxcbiAgICBjbGFzc2VzID0gcmVxdWlyZSgnLi9saWIvY2xhc3NlcycpLFxuICAgIHRlc3RSdW5uZXIgPSByZXF1aXJlKCcuL2xpYi90ZXN0UnVubmVyJyksXG4gICAgc2V0Q2xhc3NlcyA9IHJlcXVpcmUoJy4vbGliL3NldENsYXNzZXMnKTtcblxuLy8gUnVuIGVhY2ggdGVzdFxudGVzdFJ1bm5lcigpO1xuXG4vLyBSZW1vdmUgdGhlIFwibm8tanNcIiBjbGFzcyBpZiBpdCBleGlzdHNcbnNldENsYXNzZXMoY2xhc3Nlcyk7XG5cbmRlbGV0ZSBNb2Rlcm5penJQcm90by5hZGRUZXN0O1xuZGVsZXRlIE1vZGVybml6clByb3RvLmFkZEFzeW5jVGVzdDtcblxuLy8gUnVuIHRoZSB0aGluZ3MgdGhhdCBhcmUgc3VwcG9zZWQgdG8gcnVuIGFmdGVyIHRoZSB0ZXN0c1xuZm9yICh2YXIgaSA9IDA7IGkgPCBNb2Rlcm5penIuX3EubGVuZ3RoOyBpKyspIHtcbiAgTW9kZXJuaXpyLl9xW2ldKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZXJuaXpyO1xuIiwidmFyIE1vZGVybml6clByb3RvID0gcmVxdWlyZSgnLi9Nb2Rlcm5penJQcm90bycpO1xuXG5cbiAgLy8gRmFrZSBzb21lIG9mIE9iamVjdC5jcmVhdGVcbiAgLy8gc28gd2UgY2FuIGZvcmNlIG5vbiB0ZXN0IHJlc3VsdHNcbiAgLy8gdG8gYmUgbm9uIFwib3duXCIgcHJvcGVydGllcy5cbiAgdmFyIE1vZGVybml6ciA9IGZ1bmN0aW9uKCl7fTtcbiAgTW9kZXJuaXpyLnByb3RvdHlwZSA9IE1vZGVybml6clByb3RvO1xuXG4gIC8vIExlYWsgbW9kZXJuaXpyIGdsb2JhbGx5IHdoZW4geW91IGByZXF1aXJlYCBpdFxuICAvLyByYXRoZXIgdGhhbiBmb3JjZSBpdCBoZXJlLlxuICAvLyBPdmVyd3JpdGUgbmFtZSBzbyBjb25zdHJ1Y3RvciBuYW1lIGlzIG5pY2VyIDpEXG4gIE1vZGVybml6ciA9IG5ldyBNb2Rlcm5penIoKTtcblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBNb2Rlcm5penI7IiwidmFyIHRlc3RzID0gcmVxdWlyZSgnLi90ZXN0cycpO1xuXG5cbiAgdmFyIE1vZGVybml6clByb3RvID0ge1xuICAgIC8vIFRoZSBjdXJyZW50IHZlcnNpb24sIGR1bW15XG4gICAgX3ZlcnNpb246ICd2My4wLjBwcmUnLFxuXG4gICAgLy8gQW55IHNldHRpbmdzIHRoYXQgZG9uJ3Qgd29yayBhcyBzZXBhcmF0ZSBtb2R1bGVzXG4gICAgLy8gY2FuIGdvIGluIGhlcmUgYXMgY29uZmlndXJhdGlvbi5cbiAgICBfY29uZmlnOiB7XG4gICAgICBjbGFzc1ByZWZpeCA6ICcnLFxuICAgICAgZW5hYmxlQ2xhc3NlcyA6IHRydWVcbiAgICB9LFxuXG4gICAgLy8gUXVldWUgb2YgdGVzdHNcbiAgICBfcTogW10sXG5cbiAgICAvLyBTdHViIHRoZXNlIGZvciBwZW9wbGUgd2hvIGFyZSBsaXN0ZW5pbmdcbiAgICBvbjogZnVuY3Rpb24oIHRlc3QsIGNiICkge1xuICAgICAgLy8gSSBkb24ndCByZWFsbHkgdGhpbmsgcGVvcGxlIHNob3VsZCBkbyB0aGlzLCBidXQgd2UgY2FuXG4gICAgICAvLyBzYWZlIGd1YXJkIGl0IGEgYml0LlxuICAgICAgLy8gLS0gTk9URTo6IHRoaXMgZ2V0cyBXQVkgb3ZlcnJpZGRlbiBpbiBzcmMvYWRkVGVzdCBmb3JcbiAgICAgIC8vIGFjdHVhbCBhc3luYyB0ZXN0cy4gVGhpcyBpcyBpbiBjYXNlIHBlb3BsZSBsaXN0ZW4gdG9cbiAgICAgIC8vIHN5bmNocm9ub3VzIHRlc3RzLiBJIHdvdWxkIGxlYXZlIGl0IG91dCwgYnV0IHRoZSBjb2RlXG4gICAgICAvLyB0byAqZGlzYWxsb3cqIHN5bmMgdGVzdHMgaW4gdGhlIHJlYWwgdmVyc2lvbiBvZiB0aGlzXG4gICAgICAvLyBmdW5jdGlvbiBpcyBhY3R1YWxseSBsYXJnZXIgdGhhbiB0aGlzLlxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgY2IodGhpc1t0ZXN0XSk7XG4gICAgICB9LCAwKTtcbiAgICB9LFxuXG4gICAgYWRkVGVzdDogZnVuY3Rpb24oIG5hbWUsIGZuLCBvcHRpb25zICkge1xuICAgICAgdGVzdHMucHVzaCh7bmFtZSA6IG5hbWUsIGZuIDogZm4sIG9wdGlvbnMgOiBvcHRpb25zIH0pO1xuICAgIH0sXG5cbiAgICBhZGRBc3luY1Rlc3Q6IGZ1bmN0aW9uIChmbikge1xuICAgICAgdGVzdHMucHVzaCh7bmFtZSA6IG51bGwsIGZuIDogZm59KTtcbiAgICB9XG4gIH07XG5cbiAgXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZXJuaXpyUHJvdG87IiwiXG4gIHZhciBjbGFzc2VzID0gW107XG4gIFxubW9kdWxlLmV4cG9ydHMgPSBjbGFzc2VzOyIsIlxuICB2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmFwcGx5KGRvY3VtZW50LCBhcmd1bWVudHMpO1xuICB9O1xuICBcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRWxlbWVudDsiLCJcbiAgdmFyIGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIFxubW9kdWxlLmV4cG9ydHMgPSBkb2NFbGVtZW50OyIsInZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi9jcmVhdGVFbGVtZW50Jyk7XG5cblxuICBmdW5jdGlvbiBnZXRCb2R5KCkge1xuICAgIC8vIEFmdGVyIHBhZ2UgbG9hZCBpbmplY3RpbmcgYSBmYWtlIGJvZHkgZG9lc24ndCB3b3JrIHNvIGNoZWNrIGlmIGJvZHkgZXhpc3RzXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG4gICAgaWYoIWJvZHkpIHtcbiAgICAgIC8vIENhbid0IHVzZSB0aGUgcmVhbCBib2R5IGNyZWF0ZSBhIGZha2Ugb25lLlxuICAgICAgYm9keSA9IGNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcbiAgICAgIGJvZHkuZmFrZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCb2R5OyIsInZhciBNb2Rlcm5penJQcm90byA9IHJlcXVpcmUoJy4vTW9kZXJuaXpyUHJvdG8nKTtcbnZhciBkb2NFbGVtZW50ID0gcmVxdWlyZSgnLi9kb2NFbGVtZW50Jyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4vY3JlYXRlRWxlbWVudCcpO1xudmFyIGdldEJvZHkgPSByZXF1aXJlKCcuL2dldEJvZHknKTtcblxuXG4gIC8vIEluamVjdCBlbGVtZW50IHdpdGggc3R5bGUgZWxlbWVudCBhbmQgc29tZSBDU1MgcnVsZXNcbiAgZnVuY3Rpb24gaW5qZWN0RWxlbWVudFdpdGhTdHlsZXMoIHJ1bGUsIGNhbGxiYWNrLCBub2RlcywgdGVzdG5hbWVzICkge1xuICAgIHZhciBtb2QgPSAnbW9kZXJuaXpyJztcbiAgICB2YXIgc3R5bGU7XG4gICAgdmFyIHJldDtcbiAgICB2YXIgbm9kZTtcbiAgICB2YXIgZG9jT3ZlcmZsb3c7XG4gICAgdmFyIGRpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBib2R5ID0gZ2V0Qm9keSgpO1xuXG4gICAgaWYgKCBwYXJzZUludChub2RlcywgMTApICkge1xuICAgICAgLy8gSW4gb3JkZXIgbm90IHRvIGdpdmUgZmFsc2UgcG9zaXRpdmVzIHdlIGNyZWF0ZSBhIG5vZGUgZm9yIGVhY2ggdGVzdFxuICAgICAgLy8gVGhpcyBhbHNvIGFsbG93cyB0aGUgbWV0aG9kIHRvIHNjYWxlIGZvciB1bnNwZWNpZmllZCB1c2VzXG4gICAgICB3aGlsZSAoIG5vZGVzLS0gKSB7XG4gICAgICAgIG5vZGUgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm9kZS5pZCA9IHRlc3RuYW1lcyA/IHRlc3RuYW1lc1tub2Rlc10gOiBtb2QgKyAobm9kZXMgKyAxKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIDxzdHlsZT4gZWxlbWVudHMgaW4gSUU2LTkgYXJlIGNvbnNpZGVyZWQgJ05vU2NvcGUnIGVsZW1lbnRzIGFuZCB0aGVyZWZvcmUgd2lsbCBiZSByZW1vdmVkXG4gICAgLy8gd2hlbiBpbmplY3RlZCB3aXRoIGlubmVySFRNTC4gVG8gZ2V0IGFyb3VuZCB0aGlzIHlvdSBuZWVkIHRvIHByZXBlbmQgdGhlICdOb1Njb3BlJyBlbGVtZW50XG4gICAgLy8gd2l0aCBhICdzY29wZWQnIGVsZW1lbnQsIGluIG91ciBjYXNlIHRoZSBzb2Z0LWh5cGhlbiBlbnRpdHkgYXMgaXQgd29uJ3QgbWVzcyB3aXRoIG91ciBtZWFzdXJlbWVudHMuXG4gICAgLy8gbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzM4OTclMjhWUy44NSUyOS5hc3B4XG4gICAgLy8gRG9jdW1lbnRzIHNlcnZlZCBhcyB4bWwgd2lsbCB0aHJvdyBpZiB1c2luZyAmc2h5OyBzbyB1c2UgeG1sIGZyaWVuZGx5IGVuY29kZWQgdmVyc2lvbi4gU2VlIGlzc3VlICMyNzdcbiAgICBzdHlsZSA9IFsnJiMxNzM7JywnPHN0eWxlIGlkPVwicycsIG1vZCwgJ1wiPicsIHJ1bGUsICc8L3N0eWxlPiddLmpvaW4oJycpO1xuICAgIGRpdi5pZCA9IG1vZDtcbiAgICAvLyBJRTYgd2lsbCBmYWxzZSBwb3NpdGl2ZSBvbiBzb21lIHRlc3RzIGR1ZSB0byB0aGUgc3R5bGUgZWxlbWVudCBpbnNpZGUgdGhlIHRlc3QgZGl2IHNvbWVob3cgaW50ZXJmZXJpbmcgb2Zmc2V0SGVpZ2h0LCBzbyBpbnNlcnQgaXQgaW50byBib2R5IG9yIGZha2Vib2R5LlxuICAgIC8vIE9wZXJhIHdpbGwgYWN0IGFsbCBxdWlya3kgd2hlbiBpbmplY3RpbmcgZWxlbWVudHMgaW4gZG9jdW1lbnRFbGVtZW50IHdoZW4gcGFnZSBpcyBzZXJ2ZWQgYXMgeG1sLCBuZWVkcyBmYWtlYm9keSB0b28uICMyNzBcbiAgICAoIWJvZHkuZmFrZSA/IGRpdiA6IGJvZHkpLmlubmVySFRNTCArPSBzdHlsZTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgaWYgKCBib2R5LmZha2UgKSB7XG4gICAgICAvL2F2b2lkIGNyYXNoaW5nIElFOCwgaWYgYmFja2dyb3VuZCBpbWFnZSBpcyB1c2VkXG4gICAgICBib2R5LnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIC8vU2FmYXJpIDUuMTMvNS4xLjQgT1NYIHN0b3BzIGxvYWRpbmcgaWYgOjotd2Via2l0LXNjcm9sbGJhciBpcyB1c2VkIGFuZCBzY3JvbGxiYXJzIGFyZSB2aXNpYmxlXG4gICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICBkb2NPdmVyZmxvdyA9IGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3c7XG4gICAgICBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICBkb2NFbGVtZW50LmFwcGVuZENoaWxkKGJvZHkpO1xuICAgIH1cblxuICAgIHJldCA9IGNhbGxiYWNrKGRpdiwgcnVsZSk7XG4gICAgLy8gSWYgdGhpcyBpcyBkb25lIGFmdGVyIHBhZ2UgbG9hZCB3ZSBkb24ndCB3YW50IHRvIHJlbW92ZSB0aGUgYm9keSBzbyBjaGVjayBpZiBib2R5IGV4aXN0c1xuICAgIGlmICggYm9keS5mYWtlICkge1xuICAgICAgYm9keS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJvZHkpO1xuICAgICAgZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IGRvY092ZXJmbG93O1xuICAgICAgLy8gVHJpZ2dlciBsYXlvdXQgc28ga2luZXRpYyBzY3JvbGxpbmcgaXNuJ3QgZGlzYWJsZWQgaW4gaU9TNitcbiAgICAgIGRvY0VsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkaXYpO1xuICAgIH1cblxuICAgIHJldHVybiAhIXJldDtcblxuICB9XG5cbiAgXG5cbm1vZHVsZS5leHBvcnRzID0gaW5qZWN0RWxlbWVudFdpdGhTdHlsZXM7IiwiXG4gIC8qKlxuICAgKiBpcyByZXR1cm5zIGEgYm9vbGVhbiBmb3IgaWYgdHlwZW9mIG9iaiBpcyBleGFjdGx5IHR5cGUuXG4gICAqL1xuICBmdW5jdGlvbiBpcyggb2JqLCB0eXBlICkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSB0eXBlO1xuICB9XG4gIFxubW9kdWxlLmV4cG9ydHMgPSBpczsiLCJ2YXIgTW9kZXJuaXpyUHJvdG8gPSByZXF1aXJlKCcuL01vZGVybml6clByb3RvJyk7XG52YXIgdGVzdE1lZGlhUXVlcnkgPSByZXF1aXJlKCcuL3Rlc3RNZWRpYVF1ZXJ5Jyk7XG5cblxuICAvLyBNb2Rlcm5penIubXEgdGVzdHMgYSBnaXZlbiBtZWRpYSBxdWVyeSwgbGl2ZSBhZ2FpbnN0IHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB3aW5kb3dcbiAgLy8gQSBmZXcgaW1wb3J0YW50IG5vdGVzOlxuICAvLyAgICogSWYgYSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgbWVkaWEgcXVlcmllcyBhdCBhbGwgKGVnLiBvbGRJRSkgdGhlIG1xKCkgd2lsbCBhbHdheXMgcmV0dXJuIGZhbHNlXG4gIC8vICAgKiBBIG1heC13aWR0aCBvciBvcmllbnRhdGlvbiBxdWVyeSB3aWxsIGJlIGV2YWx1YXRlZCBhZ2FpbnN0IHRoZSBjdXJyZW50IHN0YXRlLCB3aGljaCBtYXkgY2hhbmdlIGxhdGVyLlxuICAvLyAgICogWW91IG11c3Qgc3BlY2lmeSB2YWx1ZXMuIEVnLiBJZiB5b3UgYXJlIHRlc3Rpbmcgc3VwcG9ydCBmb3IgdGhlIG1pbi13aWR0aCBtZWRpYSBxdWVyeSB1c2U6XG4gIC8vICAgICAgIE1vZGVybml6ci5tcSgnKG1pbi13aWR0aDowKScpXG4gIC8vIHVzYWdlOlxuICAvLyBNb2Rlcm5penIubXEoJ29ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjc2OCknKVxuICB2YXIgbXEgPSBNb2Rlcm5penJQcm90by5tcSA9IHRlc3RNZWRpYVF1ZXJ5O1xuICBcblxubW9kdWxlLmV4cG9ydHMgPSBtcTsiLCJ2YXIgTW9kZXJuaXpyID0gcmVxdWlyZSgnLi9Nb2Rlcm5penInKTtcbnZhciBkb2NFbGVtZW50ID0gcmVxdWlyZSgnLi9kb2NFbGVtZW50Jyk7XG5cblxuICAvLyBQYXNzIGluIGFuIGFuZCBhcnJheSBvZiBjbGFzcyBuYW1lcywgZS5nLjpcbiAgLy8gIFsnbm8td2VicCcsICdib3JkZXJyYWRpdXMnLCAuLi5dXG4gIGZ1bmN0aW9uIHNldENsYXNzZXMoIGNsYXNzZXMgKSB7XG4gICAgdmFyIGNsYXNzTmFtZSA9IGRvY0VsZW1lbnQuY2xhc3NOYW1lO1xuICAgIHZhciByZWdleDtcbiAgICB2YXIgY2xhc3NQcmVmaXggPSBNb2Rlcm5penIuX2NvbmZpZy5jbGFzc1ByZWZpeCB8fCAnJztcblxuICAgIC8vIENoYW5nZSBgbm8tanNgIHRvIGBqc2AgKHdlIGRvIHRoaXMgcmVnYXJkbGVzIG9mIHRoZSBgZW5hYmxlQ2xhc3Nlc2BcbiAgICAvLyBvcHRpb24pXG4gICAgLy8gSGFuZGxlIGNsYXNzUHJlZml4IG9uIHRoaXMgdG9vXG4gICAgdmFyIHJlSlMgPSBuZXcgUmVnRXhwKCcoXnxcXFxccyknK2NsYXNzUHJlZml4Kyduby1qcyhcXFxcc3wkKScpO1xuICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5yZXBsYWNlKHJlSlMsICckMScrY2xhc3NQcmVmaXgrJ2pzJDInKTtcblxuICAgIGlmKE1vZGVybml6ci5fY29uZmlnLmVuYWJsZUNsYXNzZXMpIHtcbiAgICAgIC8vIEFkZCB0aGUgbmV3IGNsYXNzZXNcbiAgICAgIGNsYXNzTmFtZSArPSAnICcgKyBjbGFzc1ByZWZpeCArIGNsYXNzZXMuam9pbignICcgKyBjbGFzc1ByZWZpeCk7XG4gICAgICBkb2NFbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICB9XG5cbiAgfVxuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENsYXNzZXM7IiwidmFyIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzID0gcmVxdWlyZSgnLi9pbmplY3RFbGVtZW50V2l0aFN0eWxlcycpO1xuXG5cbiAgLy8gYWRhcHRlZCBmcm9tIG1hdGNoTWVkaWEgcG9seWZpbGxcbiAgLy8gYnkgU2NvdHQgSmVobCBhbmQgUGF1bCBJcmlzaFxuICAvLyBnaXN0LmdpdGh1Yi5jb20vNzg2NzY4XG4gIHZhciB0ZXN0TWVkaWFRdWVyeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1hdGNoTWVkaWEgPSB3aW5kb3cubWF0Y2hNZWRpYSB8fCB3aW5kb3cubXNNYXRjaE1lZGlhO1xuICAgIGlmICggbWF0Y2hNZWRpYSApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoIG1xICkge1xuICAgICAgICB2YXIgbXFsID0gbWF0Y2hNZWRpYShtcSk7XG4gICAgICAgIHJldHVybiBtcWwgJiYgbXFsLm1hdGNoZXMgfHwgZmFsc2U7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoIG1xICkge1xuICAgICAgdmFyIGJvb2wgPSBmYWxzZTtcblxuICAgICAgaW5qZWN0RWxlbWVudFdpdGhTdHlsZXMoJ0BtZWRpYSAnICsgbXEgKyAnIHsgI21vZGVybml6ciB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgfSB9JywgZnVuY3Rpb24oIG5vZGUgKSB7XG4gICAgICAgIGJvb2wgPSAod2luZG93LmdldENvbXB1dGVkU3R5bGUgP1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUsIG51bGwpIDpcbiAgICAgICAgICAgICAgICBub2RlLmN1cnJlbnRTdHlsZSlbJ3Bvc2l0aW9uJ10gPT0gJ2Fic29sdXRlJztcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gYm9vbDtcbiAgICB9O1xuICB9KSgpO1xuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RNZWRpYVF1ZXJ5OyIsInZhciB0ZXN0cyA9IHJlcXVpcmUoJy4vdGVzdHMnKTtcbnZhciBNb2Rlcm5penIgPSByZXF1aXJlKCcuL01vZGVybml6cicpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcblxuXG4gIC8vIFJ1biB0aHJvdWdoIGFsbCB0ZXN0cyBhbmQgZGV0ZWN0IHRoZWlyIHN1cHBvcnQgaW4gdGhlIGN1cnJlbnQgVUEuXG4gIGZ1bmN0aW9uIHRlc3RSdW5uZXIoKSB7XG4gICAgdmFyIGZlYXR1cmVOYW1lcztcbiAgICB2YXIgZmVhdHVyZTtcbiAgICB2YXIgYWxpYXNJZHg7XG4gICAgdmFyIHJlc3VsdDtcbiAgICB2YXIgbmFtZUlkeDtcbiAgICB2YXIgZmVhdHVyZU5hbWU7XG4gICAgdmFyIGZlYXR1cmVOYW1lU3BsaXQ7XG4gICAgdmFyIG1vZGVybml6clByb3A7XG4gICAgdmFyIG1Qcm9wQ291bnQ7XG5cbiAgICBmb3IgKCB2YXIgZmVhdHVyZUlkeCBpbiB0ZXN0cyApIHtcbiAgICAgIGZlYXR1cmVOYW1lcyA9IFtdO1xuICAgICAgZmVhdHVyZSA9IHRlc3RzW2ZlYXR1cmVJZHhdO1xuICAgICAgLy8gcnVuIHRoZSB0ZXN0LCB0aHJvdyB0aGUgcmV0dXJuIHZhbHVlIGludG8gdGhlIE1vZGVybml6cixcbiAgICAgIC8vICAgdGhlbiBiYXNlZCBvbiB0aGF0IGJvb2xlYW4sIGRlZmluZSBhbiBhcHByb3ByaWF0ZSBjbGFzc05hbWVcbiAgICAgIC8vICAgYW5kIHB1c2ggaXQgaW50byBhbiBhcnJheSBvZiBjbGFzc2VzIHdlJ2xsIGpvaW4gbGF0ZXIuXG4gICAgICAvL1xuICAgICAgLy8gICBJZiB0aGVyZSBpcyBubyBuYW1lLCBpdCdzIGFuICdhc3luYycgdGVzdCB0aGF0IGlzIHJ1bixcbiAgICAgIC8vICAgYnV0IG5vdCBkaXJlY3RseSBhZGRlZCB0byB0aGUgb2JqZWN0LiBUaGF0IHNob3VsZFxuICAgICAgLy8gICBiZSBkb25lIHdpdGggYSBwb3N0LXJ1biBhZGRUZXN0IGNhbGwuXG4gICAgICBpZiAoIGZlYXR1cmUubmFtZSApIHtcbiAgICAgICAgZmVhdHVyZU5hbWVzLnB1c2goZmVhdHVyZS5uYW1lLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgICAgIGlmIChmZWF0dXJlLm9wdGlvbnMgJiYgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMgJiYgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gQWRkIGFsbCB0aGUgYWxpYXNlcyBpbnRvIHRoZSBuYW1lcyBsaXN0XG4gICAgICAgICAgZm9yIChhbGlhc0lkeCA9IDA7IGFsaWFzSWR4IDwgZmVhdHVyZS5vcHRpb25zLmFsaWFzZXMubGVuZ3RoOyBhbGlhc0lkeCsrKSB7XG4gICAgICAgICAgICBmZWF0dXJlTmFtZXMucHVzaChmZWF0dXJlLm9wdGlvbnMuYWxpYXNlc1thbGlhc0lkeF0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biB0aGUgdGVzdCwgb3IgdXNlIHRoZSByYXcgdmFsdWUgaWYgaXQncyBub3QgYSBmdW5jdGlvblxuICAgICAgcmVzdWx0ID0gaXMoZmVhdHVyZS5mbiwgJ2Z1bmN0aW9uJykgPyBmZWF0dXJlLmZuKCkgOiBmZWF0dXJlLmZuO1xuXG5cbiAgICAgIC8vIFNldCBlYWNoIG9mIHRoZSBuYW1lcyBvbiB0aGUgTW9kZXJuaXpyIG9iamVjdFxuICAgICAgZm9yIChuYW1lSWR4ID0gMDsgbmFtZUlkeCA8IGZlYXR1cmVOYW1lcy5sZW5ndGg7IG5hbWVJZHgrKykge1xuICAgICAgICBmZWF0dXJlTmFtZSA9IGZlYXR1cmVOYW1lc1tuYW1lSWR4XTtcbiAgICAgICAgLy8gU3VwcG9ydCBkb3QgcHJvcGVydGllcyBhcyBzdWIgdGVzdHMuIFdlIGRvbid0IGRvIGNoZWNraW5nIHRvIG1ha2Ugc3VyZVxuICAgICAgICAvLyB0aGF0IHRoZSBpbXBsaWVkIHBhcmVudCB0ZXN0cyBoYXZlIGJlZW4gYWRkZWQuIFlvdSBtdXN0IGNhbGwgdGhlbSBpblxuICAgICAgICAvLyBvcmRlciAoZWl0aGVyIGluIHRoZSB0ZXN0LCBvciBtYWtlIHRoZSBwYXJlbnQgdGVzdCBhIGRlcGVuZGVuY3kpLlxuICAgICAgICAvL1xuICAgICAgICAvLyBDYXAgaXQgdG8gVFdPIHRvIG1ha2UgdGhlIGxvZ2ljIHNpbXBsZSBhbmQgYmVjYXVzZSB3aG8gbmVlZHMgdGhhdCBraW5kIG9mIHN1YnRlc3RpbmdcbiAgICAgICAgLy8gaGFzaHRhZyBmYW1vdXMgbGFzdCB3b3Jkc1xuICAgICAgICBmZWF0dXJlTmFtZVNwbGl0ID0gZmVhdHVyZU5hbWUuc3BsaXQoJy4nKTtcblxuICAgICAgICBpZiAoZmVhdHVyZU5hbWVTcGxpdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV0gPSByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmVhdHVyZU5hbWVTcGxpdC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBNb2Rlcm5penJbZmVhdHVyZU5hbWVTcGxpdFswXV1bZmVhdHVyZU5hbWVTcGxpdFsxXV0gPSByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjbGFzc2VzLnB1c2goKHJlc3VsdCA/ICcnIDogJ25vLScpICsgZmVhdHVyZU5hbWVTcGxpdC5qb2luKCctJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RSdW5uZXI7IiwiXG4gIHZhciB0ZXN0cyA9IFtdO1xuICBcbm1vZHVsZS5leHBvcnRzID0gdGVzdHM7IiwicmVxdWlyZSgnYnJvd3Nlcm5penIvbGliL21xJyk7XG5yZXF1aXJlKCdicm93c2Vybml6cicpO1xuXG52YXIgTW9kZXJuaXpyICAgPSByZXF1aXJlKCdicm93c2Vybml6cicpLFxuICAgIGJhY2tzdHJldGNoID0gcmVxdWlyZSgnLi9wbHVnaW5zL2pxdWVyeS5iYWNrc3RyZXRjaCcpLFxuICAgIGNpcmNsaWZ1bCAgID0gcmVxdWlyZSgnLi9wbHVnaW5zL2pxdWVyeS5jaXJjbGlmdWwnKSxcbiAgICBsYXp5bG9hZCAgICA9IHJlcXVpcmUoJy4vcGx1Z2lucy9qcXVlcnkubGF6eWxvYWQnKSxcbiAgICBzY3JvbGxzcHkgICA9IHJlcXVpcmUoJy4vcGx1Z2lucy9qcXVlcnkuc2Nyb2xsc3B5Jyk7XG5cbihmdW5jdGlvbigkKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgY2FjaGUgPSB7XG4gICAgICAgIFxuICAgICAgICAkaHRtbEJvZHk6ICQoJ2h0bWwsIGJvZHknKSxcbiAgICAgICAgJGJvZHk6ICQoJ2JvZHknKSxcbiAgICAgICAgJG5hdjogJCgnI25hdicpLFxuICAgICAgICAkbmF2QnV0dG9uOiAkKCcjbmF2LWJ1dHRvbicpLFxuICAgICAgICAkb253YXJkOiAkKCcjb253YXJkJyksXG4gICAgICAgICRzZWN0aW9uczogJCgnI3NlY3Rpb25zJyksXG4gICAgICAgICRzZWN0aW9uOiAkKCcuc2VjdGlvbicpLFxuICAgICAgICAkc3RhdDogJCgnLnN0YXQnKSxcbiAgICAgICAgJHRpbWVsaW5lRXZlbnQ6ICQoJy50aW1lbGluZS1ldmVudCcpLFxuICAgICAgICAkbGF6eTogJCgnaW1nLmxhenknKVxuICAgICAgICBcbiAgICB9O1xuICAgIFxuICAgIHZhciBhcHAgPSB7XG4gICAgICAgIFxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXBwLmJhY2tzdHJldGNoKCk7XG4gICAgICAgICAgICBhcHAuanVtcCgpO1xuICAgICAgICAgICAgYXBwLnN0YXRzKCk7XG4gICAgICAgICAgICBhcHAubmF2U2Nyb2xsKCk7XG4gICAgICAgICAgICBhcHAubmF2VG9nZ2xlKCk7XG4gICAgICAgICAgICBhcHAudGltZWxpbmUoKTtcbiAgICAgICAgICAgIGFwcC5sYXp5SW1hZ2VzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIGJhY2tzdHJldGNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCgnI3NlY3Rpb24tY292ZXInKS5iYWNrc3RyZXRjaCgnL2Rpc3QvaW1hZ2VzL2NvdmVyLWxhbmRzY2FwZS5qcGcnKTtcbiAgICAgICAgICAgICQoJyNzZWN0aW9uLXF1b3RlcycpLmJhY2tzdHJldGNoKCcvZGlzdC9pbWFnZXMvbWljaGFlbHB1bW8uanBnJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIGp1bXA6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICB2YXIgJGFuY2hvciA9IGNhY2hlLiRvbndhcmQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRhbmNob3Iub2ZmKCdjbGljaycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkYW5jaG9yLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRyYXZlbCA9ICggY2FjaGUuJHNlY3Rpb24uZXEoMSkub2Zmc2V0KCkudG9wICk7XG5cbiAgICAgICAgICAgICAgICBpZiggTW9kZXJuaXpyLm1xKCdvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpJykgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhdmVsID0gKCBjYWNoZS4kc2VjdGlvbi5lcSgxKS5vZmZzZXQoKS50b3AgKSAtIGNhY2hlLiRuYXYuaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgY2FjaGUuJGh0bWxCb2R5LmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0cmF2ZWxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9LCA1MDAsICdzd2luZycpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIHN0YXRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmIChjYW52YXMuZ2V0Q29udGV4dCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FjaGUuJHN0YXQuY2lyY2xpZnVsKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgbmF2U2Nyb2xsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyICRhbmNob3JzID0gY2FjaGUuJG5hdi5maW5kKCdhJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRhbmNob3JzLm9mZignY2xpY2snKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJGFuY2hvcnMub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdHJhdmVsID0gKCAkKCAkLmF0dHIodGhpcywgJ2hyZWYnKSApLm9mZnNldCgpLnRvcCApO1xuXG4gICAgICAgICAgICAgICAgaWYoIE1vZGVybml6ci5tcSgnb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KScpICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyYXZlbCA9ICggJCggJC5hdHRyKHRoaXMsICdocmVmJykgKS5vZmZzZXQoKS50b3AgKSAtICggY2FjaGUuJG5hdi5oZWlnaHQoKSAtIDEpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGNhY2hlLiRodG1sQm9keS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdHJhdmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9LCAxMDAwLCAnZWFzZUluT3V0RXhwbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUuJG5hdi5yZW1vdmVDbGFzcygnbmF2LW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIG5hdlRvZ2dsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhY2hlLiRuYXZCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgY2FjaGUuJG5hdi50b2dnbGVDbGFzcygnbmF2LW9wZW4nKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBuYXZIaWdobGlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYWNoZS4kc2VjdGlvbi5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gJCh0aGlzKS5wb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQodGhpcykuc2Nyb2xsc3B5KHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbWluOiBwb3NpdGlvbi50b3AgLSBjYWNoZS4kbmF2LmhlaWdodCgpLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IHBvc2l0aW9uLnRvcCArICggJCh0aGlzKS5oZWlnaHQoKSAtIGNhY2hlLiRuYXYuaGVpZ2h0KCkgKSxcbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcjogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZS4kbmF2LmZpbmQoJ2FbaHJlZj1cIiMnICsgZWxlbWVudC5pZCArICdcIl0nKS5wYXJlbnQoKS5hZGRDbGFzcygnY3VycmVudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uTGVhdmU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZS4kbmF2LmZpbmQoJ2FbaHJlZj1cIiMnICsgZWxlbWVudC5pZCArICdcIl0nKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY3VycmVudCcpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgdGltZWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgbGF6eUltYWdlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhY2hlLiRsYXp5Lmxhenlsb2FkKHtcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGQgOiAyMDAsXG4gICAgICAgICAgICAgICAgZWZmZWN0IDogJ2ZhZGVJbidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfTtcbiAgICBcblxuICAgIGFwcC5pbml0KCk7XG4gICAgXG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZSBsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIFxuICAgICAgICBhcHAubmF2SGlnaGxpZ2h0KCk7XG4gICAgICAgIGFwcC5uYXZTY3JvbGwoKTtcbiAgICAgICAgYXBwLmp1bXAoKTtcbiAgICAgICAgXG4gICAgfSk7XG4gICAgXG5cbn0pKGpRdWVyeSk7XG4iLCIvKiEgQmFja3N0cmV0Y2ggLSB2Mi4wLjQgLSAyMDEzLTA2LTE5XG4qIGh0dHA6Ly9zcm9iYmluLmNvbS9qcXVlcnktcGx1Z2lucy9iYWNrc3RyZXRjaC9cbiogQ29weXJpZ2h0IChjKSAyMDEzIFNjb3R0IFJvYmJpbjsgTGljZW5zZWQgTUlUICovXG4oZnVuY3Rpb24oYSxkLHApe2EuZm4uYmFja3N0cmV0Y2g9ZnVuY3Rpb24oYyxiKXsoYz09PXB8fDA9PT1jLmxlbmd0aCkmJmEuZXJyb3IoXCJObyBpbWFnZXMgd2VyZSBzdXBwbGllZCBmb3IgQmFja3N0cmV0Y2hcIik7MD09PWEoZCkuc2Nyb2xsVG9wKCkmJmQuc2Nyb2xsVG8oMCwwKTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YSh0aGlzKSxnPWQuZGF0YShcImJhY2tzdHJldGNoXCIpO2lmKGcpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBjJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBnW2NdKXtnW2NdKGIpO3JldHVybn1iPWEuZXh0ZW5kKGcub3B0aW9ucyxiKTtnLmRlc3Ryb3koITApfWc9bmV3IHEodGhpcyxjLGIpO2QuZGF0YShcImJhY2tzdHJldGNoXCIsZyl9KX07YS5iYWNrc3RyZXRjaD1mdW5jdGlvbihjLGIpe3JldHVybiBhKFwiYm9keVwiKS5iYWNrc3RyZXRjaChjLGIpLmRhdGEoXCJiYWNrc3RyZXRjaFwiKX07YS5leHByW1wiOlwiXS5iYWNrc3RyZXRjaD1mdW5jdGlvbihjKXtyZXR1cm4gYShjKS5kYXRhKFwiYmFja3N0cmV0Y2hcIikhPT1wfTthLmZuLmJhY2tzdHJldGNoLmRlZmF1bHRzPXtjZW50ZXJlZFg6ITAsY2VudGVyZWRZOiEwLGR1cmF0aW9uOjVFMyxmYWRlOjB9O3ZhciByPXtsZWZ0OjAsdG9wOjAsb3ZlcmZsb3c6XCJoaWRkZW5cIixtYXJnaW46MCxwYWRkaW5nOjAsaGVpZ2h0OlwiMTAwJVwiLHdpZHRoOlwiMTAwJVwiLHpJbmRleDotOTk5OTk5fSxzPXtwb3NpdGlvbjpcImFic29sdXRlXCIsZGlzcGxheTpcIm5vbmVcIixtYXJnaW46MCxwYWRkaW5nOjAsYm9yZGVyOlwibm9uZVwiLHdpZHRoOlwiYXV0b1wiLGhlaWdodDpcImF1dG9cIixtYXhIZWlnaHQ6XCJub25lXCIsbWF4V2lkdGg6XCJub25lXCIsekluZGV4Oi05OTk5OTl9LHE9ZnVuY3Rpb24oYyxiLGUpe3RoaXMub3B0aW9ucz1hLmV4dGVuZCh7fSxhLmZuLmJhY2tzdHJldGNoLmRlZmF1bHRzLGV8fHt9KTt0aGlzLmltYWdlcz1hLmlzQXJyYXkoYik/YjpbYl07YS5lYWNoKHRoaXMuaW1hZ2VzLGZ1bmN0aW9uKCl7YShcIjxpbWcgLz5cIilbMF0uc3JjPXRoaXN9KTt0aGlzLmlzQm9keT1jPT09ZG9jdW1lbnQuYm9keTt0aGlzLiRjb250YWluZXI9YShjKTt0aGlzLiRyb290PXRoaXMuaXNCb2R5P2w/YShkKTphKGRvY3VtZW50KTp0aGlzLiRjb250YWluZXI7Yz10aGlzLiRjb250YWluZXIuY2hpbGRyZW4oXCIuYmFja3N0cmV0Y2hcIikuZmlyc3QoKTt0aGlzLiR3cmFwPWMubGVuZ3RoP2M6YSgnPGRpdiBjbGFzcz1cImJhY2tzdHJldGNoXCI+PC9kaXY+JykuY3NzKHIpLmFwcGVuZFRvKHRoaXMuJGNvbnRhaW5lcik7dGhpcy5pc0JvZHl8fChjPXRoaXMuJGNvbnRhaW5lci5jc3MoXCJwb3NpdGlvblwiKSxiPXRoaXMuJGNvbnRhaW5lci5jc3MoXCJ6SW5kZXhcIiksdGhpcy4kY29udGFpbmVyLmNzcyh7cG9zaXRpb246XCJzdGF0aWNcIj09PWM/XCJyZWxhdGl2ZVwiOmMsekluZGV4OlwiYXV0b1wiPT09Yj8wOmIsYmFja2dyb3VuZDpcIm5vbmVcIn0pLHRoaXMuJHdyYXAuY3NzKHt6SW5kZXg6LTk5OTk5OH0pKTt0aGlzLiR3cmFwLmNzcyh7cG9zaXRpb246dGhpcy5pc0JvZHkmJmw/XCJmaXhlZFwiOlwiYWJzb2x1dGVcIn0pO3RoaXMuaW5kZXg9MDt0aGlzLnNob3codGhpcy5pbmRleCk7YShkKS5vbihcInJlc2l6ZS5iYWNrc3RyZXRjaFwiLGEucHJveHkodGhpcy5yZXNpemUsdGhpcykpLm9uKFwib3JpZW50YXRpb25jaGFuZ2UuYmFja3N0cmV0Y2hcIixhLnByb3h5KGZ1bmN0aW9uKCl7dGhpcy5pc0JvZHkmJjA9PT1kLnBhZ2VZT2Zmc2V0JiYoZC5zY3JvbGxUbygwLDEpLHRoaXMucmVzaXplKCkpfSx0aGlzKSl9O3EucHJvdG90eXBlPXtyZXNpemU6ZnVuY3Rpb24oKXt0cnl7dmFyIGE9e2xlZnQ6MCx0b3A6MH0sYj10aGlzLmlzQm9keT90aGlzLiRyb290LndpZHRoKCk6dGhpcy4kcm9vdC5pbm5lcldpZHRoKCksZT1iLGc9dGhpcy5pc0JvZHk/ZC5pbm5lckhlaWdodD9kLmlubmVySGVpZ2h0OnRoaXMuJHJvb3QuaGVpZ2h0KCk6dGhpcy4kcm9vdC5pbm5lckhlaWdodCgpLGo9ZS90aGlzLiRpbWcuZGF0YShcInJhdGlvXCIpLGY7aj49Zz8oZj0oai1nKS8yLHRoaXMub3B0aW9ucy5jZW50ZXJlZFkmJihhLnRvcD1cIi1cIitmK1wicHhcIikpOihqPWcsZT1qKnRoaXMuJGltZy5kYXRhKFwicmF0aW9cIiksZj0oZS1iKS8yLHRoaXMub3B0aW9ucy5jZW50ZXJlZFgmJihhLmxlZnQ9XCItXCIrZitcInB4XCIpKTt0aGlzLiR3cmFwLmNzcyh7d2lkdGg6YixoZWlnaHQ6Z30pLmZpbmQoXCJpbWc6bm90KC5kZWxldGVhYmxlKVwiKS5jc3Moe3dpZHRoOmUsaGVpZ2h0Omp9KS5jc3MoYSl9Y2F0Y2goaCl7fXJldHVybiB0aGlzfSxzaG93OmZ1bmN0aW9uKGMpe2lmKCEoTWF0aC5hYnMoYyk+dGhpcy5pbWFnZXMubGVuZ3RoLTEpKXt2YXIgYj10aGlzLGU9Yi4kd3JhcC5maW5kKFwiaW1nXCIpLmFkZENsYXNzKFwiZGVsZXRlYWJsZVwiKSxkPXtyZWxhdGVkVGFyZ2V0OmIuJGNvbnRhaW5lclswXX07Yi4kY29udGFpbmVyLnRyaWdnZXIoYS5FdmVudChcImJhY2tzdHJldGNoLmJlZm9yZVwiLGQpLFtiLGNdKTt0aGlzLmluZGV4PWM7Y2xlYXJJbnRlcnZhbChiLmludGVydmFsKTtiLiRpbWc9YShcIjxpbWcgLz5cIikuY3NzKHMpLmJpbmQoXCJsb2FkXCIsZnVuY3Rpb24oZil7dmFyIGg9dGhpcy53aWR0aHx8YShmLnRhcmdldCkud2lkdGgoKTtmPXRoaXMuaGVpZ2h0fHxhKGYudGFyZ2V0KS5oZWlnaHQoKTthKHRoaXMpLmRhdGEoXCJyYXRpb1wiLGgvZik7YSh0aGlzKS5mYWRlSW4oYi5vcHRpb25zLnNwZWVkfHxiLm9wdGlvbnMuZmFkZSxmdW5jdGlvbigpe2UucmVtb3ZlKCk7Yi5wYXVzZWR8fGIuY3ljbGUoKTthKFtcImFmdGVyXCIsXCJzaG93XCJdKS5lYWNoKGZ1bmN0aW9uKCl7Yi4kY29udGFpbmVyLnRyaWdnZXIoYS5FdmVudChcImJhY2tzdHJldGNoLlwiK3RoaXMsZCksW2IsY10pfSl9KTtiLnJlc2l6ZSgpfSkuYXBwZW5kVG8oYi4kd3JhcCk7Yi4kaW1nLmF0dHIoXCJzcmNcIixiLmltYWdlc1tjXSk7cmV0dXJuIGJ9fSxuZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2hvdyh0aGlzLmluZGV4PHRoaXMuaW1hZ2VzLmxlbmd0aC0xP3RoaXMuaW5kZXgrMTowKX0scHJldjpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNob3coMD09PXRoaXMuaW5kZXg/dGhpcy5pbWFnZXMubGVuZ3RoLTE6dGhpcy5pbmRleC0xKX0scGF1c2U6ZnVuY3Rpb24oKXt0aGlzLnBhdXNlZD0hMDtyZXR1cm4gdGhpc30scmVzdW1lOmZ1bmN0aW9uKCl7dGhpcy5wYXVzZWQ9ITE7dGhpcy5uZXh0KCk7cmV0dXJuIHRoaXN9LGN5Y2xlOmZ1bmN0aW9uKCl7MTx0aGlzLmltYWdlcy5sZW5ndGgmJihjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpLHRoaXMuaW50ZXJ2YWw9c2V0SW50ZXJ2YWwoYS5wcm94eShmdW5jdGlvbigpe3RoaXMucGF1c2VkfHx0aGlzLm5leHQoKX0sdGhpcyksdGhpcy5vcHRpb25zLmR1cmF0aW9uKSk7cmV0dXJuIHRoaXN9LGRlc3Ryb3k6ZnVuY3Rpb24oYyl7YShkKS5vZmYoXCJyZXNpemUuYmFja3N0cmV0Y2ggb3JpZW50YXRpb25jaGFuZ2UuYmFja3N0cmV0Y2hcIik7Y2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtjfHx0aGlzLiR3cmFwLnJlbW92ZSgpO3RoaXMuJGNvbnRhaW5lci5yZW1vdmVEYXRhKFwiYmFja3N0cmV0Y2hcIil9fTt2YXIgbCxmPW5hdmlnYXRvci51c2VyQWdlbnQsbT1uYXZpZ2F0b3IucGxhdGZvcm0sZT1mLm1hdGNoKC9BcHBsZVdlYktpdFxcLyhbMC05XSspLyksZT0hIWUmJmVbMV0saD1mLm1hdGNoKC9GZW5uZWNcXC8oWzAtOV0rKS8pLGg9ISFoJiZoWzFdLG49Zi5tYXRjaCgvT3BlcmEgTW9iaVxcLyhbMC05XSspLyksdD0hIW4mJm5bMV0saz1mLm1hdGNoKC9NU0lFIChbMC05XSspLyksaz0hIWsmJmtbMV07bD0hKCgtMTxtLmluZGV4T2YoXCJpUGhvbmVcIil8fC0xPG0uaW5kZXhPZihcImlQYWRcIil8fC0xPG0uaW5kZXhPZihcImlQb2RcIikpJiZlJiY1MzQ+ZXx8ZC5vcGVyYW1pbmkmJlwiW29iamVjdCBPcGVyYU1pbmldXCI9PT17fS50b1N0cmluZy5jYWxsKGQub3BlcmFtaW5pKXx8biYmNzQ1OD50fHwtMTxmLmluZGV4T2YoXCJBbmRyb2lkXCIpJiZlJiY1MzM+ZXx8aCYmNj5ofHxcInBhbG1HZXRSZXNvdXJjZVwiaW4gZCYmZSYmNTM0PmV8fC0xPGYuaW5kZXhPZihcIk1lZUdvXCIpJiYtMTxmLmluZGV4T2YoXCJOb2tpYUJyb3dzZXIvOC41LjBcIil8fGsmJjY+PWspfSkoalF1ZXJ5LHdpbmRvdyk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoJCkge1xuXG4gICAgJC5mbi5jaXJjbGlmdWwgPSBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2spIHtcblxuICAgICAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG4gICAgICAgICAgICAvLyBUaGVzZSBhcmUgdGhlIGRlZmF1bHRzLlxuICAgICAgICAgICAgc3RhcnRkZWdyZWU6IDAsXG4gICAgICAgICAgICBmZ2NvbG9yOiBcIiM1NTZiMmZcIixcbiAgICAgICAgICAgIGJnY29sb3I6IFwiI2VlZVwiLFxuICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICB3aWR0aDogMTUsXG4gICAgICAgICAgICBkaW1lbnNpb246IDIwMCxcbiAgICAgICAgICAgIGZvbnRzaXplOiAxNSxcbiAgICAgICAgICAgIHBlcmNlbnQ6IDUwLFxuICAgICAgICAgICAgYW5pbWF0aW9uc3RlcDogMS4wLFxuICAgICAgICAgICAgaWNvbnNpemU6ICcyMHB4JyxcbiAgICAgICAgICAgIGljb25jb2xvcjogJyM5OTknLFxuICAgICAgICAgICAgYm9yZGVyOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICBjb21wbGV0ZTogbnVsbCxcbiAgICAgICAgICAgIGJvcmRlcnNpemU6IDEwXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgY3VzdG9tU2V0dGluZ3MgPSBbXCJmZ2NvbG9yXCIsIFwiYmdjb2xvclwiLCBcImZpbGxcIiwgXCJ3aWR0aFwiLCBcImRpbWVuc2lvblwiLCBcImZvbnRzaXplXCIsIFwiYW5pbWF0aW9uc3RlcFwiLCBcImVuZFBlcmNlbnRcIiwgXCJpY29uXCIsIFwiaWNvbmNvbG9yXCIsIFwiaWNvbnNpemVcIiwgXCJib3JkZXJcIiwgXCJzdGFydGRlZ3JlZVwiLCBcImJvcmRlcnNpemVcIl07XG5cbiAgICAgICAgICAgIHZhciBjdXN0b21TZXR0aW5nc09iaiA9IHt9O1xuICAgICAgICAgICAgdmFyIGljb24gPSAnJztcbiAgICAgICAgICAgIHZhciBwZXJjZW50O1xuICAgICAgICAgICAgdmFyIGVuZFBlcmNlbnQgPSAwO1xuICAgICAgICAgICAgdmFyIG9iaiA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgZmlsbCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHRleHQsIGluZm87XG5cbiAgICAgICAgICAgIG9iai5hZGRDbGFzcygnY2lyY2xpZnVsJyk7XG5cbiAgICAgICAgICAgIGNoZWNrRGF0YUF0dHJpYnV0ZXMob2JqKTtcblxuICAgICAgICAgICAgaWYgKG9iai5kYXRhKCd0ZXh0JykgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IG9iai5kYXRhKCd0ZXh0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAob2JqLmRhdGEoJ2ljb24nKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICQoJzxpPjwvaT4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYSAnICsgJCh0aGlzKS5kYXRhKCdpY29uJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29sb3InOiBjdXN0b21TZXR0aW5nc09iai5pY29uY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IGN1c3RvbVNldHRpbmdzT2JqLmljb25zaXplXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob2JqLmRhdGEoJ3R5cGUnKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICQodGhpcykuZGF0YSgndHlwZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09ICdoYWxmJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2lyY2xlVGV4dChvYmosICdjaXJjbGUtdGV4dC1oYWxmJywgKGN1c3RvbVNldHRpbmdzT2JqLmRpbWVuc2lvbiAvIDEuNDUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENpcmNsZVRleHQob2JqLCAnY2lyY2xlLXRleHQnLCBjdXN0b21TZXR0aW5nc09iai5kaW1lbnNpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2lyY2xlVGV4dChvYmosICdjaXJjbGUtdGV4dCcsIGN1c3RvbVNldHRpbmdzT2JqLmRpbWVuc2lvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5kYXRhKFwidG90YWxcIikgIT0gdW5kZWZpbmVkICYmICQodGhpcykuZGF0YShcInBhcnRcIikgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsID0gJCh0aGlzKS5kYXRhKFwidG90YWxcIikgLyAxMDA7XG5cbiAgICAgICAgICAgICAgICBwZXJjZW50ID0gKCgkKHRoaXMpLmRhdGEoXCJwYXJ0XCIpIC8gdG90YWwpIC8gMTAwKS50b0ZpeGVkKDMpO1xuICAgICAgICAgICAgICAgIGVuZFBlcmNlbnQgPSAoJCh0aGlzKS5kYXRhKFwicGFydFwiKSAvIHRvdGFsKS50b0ZpeGVkKDMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5kYXRhKFwicGVyY2VudFwiKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA9ICQodGhpcykuZGF0YShcInBlcmNlbnRcIikgLyAxMDA7XG4gICAgICAgICAgICAgICAgICAgIGVuZFBlcmNlbnQgPSAkKHRoaXMpLmRhdGEoXCJwZXJjZW50XCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnQgPSBzZXR0aW5ncy5wZXJjZW50IC8gMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQodGhpcykuZGF0YSgnaW5mbycpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluZm8gPSAkKHRoaXMpLmRhdGEoJ2luZm8nKTtcblxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ3R5cGUnKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICQodGhpcykuZGF0YSgndHlwZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09ICdoYWxmJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSW5mb1RleHQob2JqLCAwLjkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSW5mb1RleHQob2JqLCAxLjI1KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZEluZm9UZXh0KG9iaiwgMS4yNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKHRoaXMpLndpZHRoKGN1c3RvbVNldHRpbmdzT2JqLmRpbWVuc2lvbiArICdweCcpO1xuXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IGN1c3RvbVNldHRpbmdzT2JqLmRpbWVuc2lvbixcbiAgICAgICAgICAgICAgICBjYW52YXMgPSAkKCc8Y2FudmFzPjwvY2FudmFzPicpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzaXplXG4gICAgICAgICAgICAgICAgfSkuYXBwZW5kVG8oJCh0aGlzKSkuZ2V0KDApO1xuXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICB2YXIgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgICAgICBpZiAoIGRwciApIHtcbiAgICAgICAgICAgICAgICB2YXIgJGNhbnZhcyA9ICQoY2FudmFzKTtcbiAgICAgICAgICAgICAgICAkY2FudmFzLmNzcygnd2lkdGgnLCBzaXplKTtcbiAgICAgICAgICAgICAgICAkY2FudmFzLmNzcygnaGVpZ2h0Jywgc2l6ZSk7XG4gICAgICAgICAgICAgICAgJGNhbnZhcy5hdHRyKCd3aWR0aCcsIHNpemUgKiBkcHIpO1xuICAgICAgICAgICAgICAgICRjYW52YXMuYXR0cignaGVpZ2h0Jywgc2l6ZSAqIGRwcik7XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0LnNjYWxlKGRwciwgZHByKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoY2FudmFzKS5wYXJlbnQoKTtcbiAgICAgICAgICAgIHZhciB4ID0gc2l6ZSAvIDI7XG4gICAgICAgICAgICB2YXIgeSA9IHNpemUgLyAyO1xuICAgICAgICAgICAgdmFyIGRlZ3JlZXMgPSBjdXN0b21TZXR0aW5nc09iai5wZXJjZW50ICogMzYwLjA7XG4gICAgICAgICAgICB2YXIgcmFkaWFucyA9IGRlZ3JlZXMgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gc2l6ZSAvIDIuNTtcbiAgICAgICAgICAgIHZhciBzdGFydEFuZ2xlID0gMi4zICogTWF0aC5QSTtcbiAgICAgICAgICAgIHZhciBlbmRBbmdsZSA9IDA7XG4gICAgICAgICAgICB2YXIgY291bnRlckNsb2Nrd2lzZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGN1clBlcmMgPSBjdXN0b21TZXR0aW5nc09iai5hbmltYXRpb25zdGVwID09PSAwLjAgPyBlbmRQZXJjZW50IDogMC4wO1xuICAgICAgICAgICAgdmFyIGN1clN0ZXAgPSBNYXRoLm1heChjdXN0b21TZXR0aW5nc09iai5hbmltYXRpb25zdGVwLCAwLjApO1xuICAgICAgICAgICAgdmFyIGNpcmMgPSBNYXRoLlBJICogMjtcbiAgICAgICAgICAgIHZhciBxdWFydCA9IE1hdGguUEkgLyAyO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSAnJztcbiAgICAgICAgICAgIHZhciBmaXJlQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGFkZGl0aW9uYWxBbmdlbFBJID0gKGN1c3RvbVNldHRpbmdzT2JqLnN0YXJ0ZGVncmVlIC8gMTgwKSAqIE1hdGguUEk7XG5cbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ3R5cGUnKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJCh0aGlzKS5kYXRhKCd0eXBlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAnaGFsZicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBbmdsZSA9IDIuMCAqIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgIGVuZEFuZ2xlID0gMy4xMztcbiAgICAgICAgICAgICAgICAgICAgY2lyYyA9IE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgIHF1YXJ0ID0gTWF0aC5QSSAvIDAuOTk2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCQodGhpcykuZGF0YSgndHlwZScpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEoJ3R5cGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09ICdhbmdsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBbmdsZSA9IDIuMjUgKiBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICBlbmRBbmdsZSA9IDIuNDtcbiAgICAgICAgICAgICAgICAgICAgY2lyYyA9IDEuNTMgKyBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICBxdWFydCA9IDAuNzMgKyBNYXRoLlBJIC8gMC45OTY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGFkZHMgdGV4dCB0byBjaXJjbGVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0gb2JqXG4gICAgICAgICAgICAgKiBAcGFyYW0gY3NzQ2xhc3NcbiAgICAgICAgICAgICAqIEBwYXJhbSBsaW5lSGVpZ2h0XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZENpcmNsZVRleHQob2JqLCBjc3NDbGFzcywgbGluZUhlaWdodCkge1xuICAgICAgICAgICAgICAgICQoXCI8c3Bhbj48L3NwYW4+XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhvYmopXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhjc3NDbGFzcylcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwodGV4dClcbiAgICAgICAgICAgICAgICAgICAgLnByZXBlbmQoaWNvbilcbiAgICAgICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiBsaW5lSGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiBjdXN0b21TZXR0aW5nc09iai5mb250c2l6ZSArICdweCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogYWRkcyBpbmZvIHRleHQgdG8gY2lyY2xlXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtIG9ialxuICAgICAgICAgICAgICogQHBhcmFtIGZhY3RvclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRJbmZvVGV4dChvYmosIGZhY3Rvcikge1xuICAgICAgICAgICAgICAgICQoJzxzcGFuPjwvc3Bhbj4nKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8ob2JqKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2NpcmNsZS1pbmZvLWhhbGYnKVxuICAgICAgICAgICAgICAgICAgICAuY3NzKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JywgKGN1c3RvbVNldHRpbmdzT2JqLmRpbWVuc2lvbiAqIGZhY3RvcikgKyAncHgnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoaW5mbyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogY2hlY2tzIHdoaWNoIGRhdGEgYXR0cmlidXRlcyBhcmUgZGVmaW5lZFxuICAgICAgICAgICAgICogQHBhcmFtIG9ialxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja0RhdGFBdHRyaWJ1dGVzKG9iaikge1xuICAgICAgICAgICAgICAgICQuZWFjaChjdXN0b21TZXR0aW5ncywgZnVuY3Rpb24gKGluZGV4LCBhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5kYXRhKGF0dHJpYnV0ZSkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21TZXR0aW5nc09ialthdHRyaWJ1dGVdID0gb2JqLmRhdGEoYXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVNldHRpbmdzT2JqW2F0dHJpYnV0ZV0gPSAkKHNldHRpbmdzKS5hdHRyKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlID09ICdmaWxsJyAmJiBvYmouZGF0YSgnZmlsbCcpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBhbmltYXRlIGZvcmVncm91bmQgY2lyY2xlXG4gICAgICAgICAgICAgKiBAcGFyYW0gY3VycmVudFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBhbmltYXRlKGN1cnJlbnQpIHtcblxuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYXJjKHgsIHksIHJhZGl1cywgZW5kQW5nbGUsIHN0YXJ0QW5nbGUsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gY3VzdG9tU2V0dGluZ3NPYmoud2lkdGggKyAxO1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGN1c3RvbVNldHRpbmdzT2JqLmJnY29sb3I7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY3VzdG9tU2V0dGluZ3NPYmouZmlsbDtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmFyYyh4LCB5LCByYWRpdXMsIC0ocXVhcnQpICsgYWRkaXRpb25hbEFuZ2VsUEksICgoY2lyYykgKiBjdXJyZW50KSAtIHF1YXJ0ICsgYWRkaXRpb25hbEFuZ2VsUEksIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXN0b21TZXR0aW5nc09iai5ib3JkZXIgPT0gJ291dGxpbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gY3VzdG9tU2V0dGluZ3NPYmoud2lkdGggKyBjdXN0b21TZXR0aW5nc09iai5ib3JkZXJzaXplO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VzdG9tU2V0dGluZ3NPYmouYm9yZGVyID09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gY3VzdG9tU2V0dGluZ3NPYmoud2lkdGggLSBjdXN0b21TZXR0aW5nc09iai5ib3JkZXJzaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjdXN0b21TZXR0aW5nc09iai5mZ2NvbG9yO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VyUGVyYyA8IGVuZFBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyUGVyYyArPSBjdXJTdGVwO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZShNYXRoLm1pbihjdXJQZXJjLCBlbmRQZXJjZW50KSAvIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9iaik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1clBlcmMgPT0gZW5kUGVyY2VudCAmJiBmaXJlQ2FsbGJhY2sgJiYgdHlwZW9mKG9wdGlvbnMpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRpb25zLmNvbXBsZXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb21wbGV0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlQ2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYW5pbWF0ZShjdXJQZXJjIC8gMTAwKTtcblxuICAgICAgICB9KTtcbiAgICB9O1xufShqUXVlcnkpKTsiLCIvKiFcbiAqIExhenkgTG9hZCAtIGpRdWVyeSBwbHVnaW4gZm9yIGxhenkgbG9hZGluZyBpbWFnZXNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMDctMjAxNSBNaWthIFR1dXBvbGFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiAgIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKlxuICogUHJvamVjdCBob21lOlxuICogICBodHRwOi8vd3d3LmFwcGVsc2lpbmkubmV0L3Byb2plY3RzL2xhenlsb2FkXG4gKlxuICogVmVyc2lvbjogIDEuOS41XG4gKlxuICovXG5cbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcbiAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcblxuICAgICQuZm4ubGF6eWxvYWQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBlbGVtZW50cyA9IHRoaXM7XG4gICAgICAgIHZhciAkY29udGFpbmVyO1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQgICAgICAgOiAwLFxuICAgICAgICAgICAgZmFpbHVyZV9saW1pdCAgIDogMCxcbiAgICAgICAgICAgIGV2ZW50ICAgICAgICAgICA6IFwic2Nyb2xsXCIsXG4gICAgICAgICAgICBlZmZlY3QgICAgICAgICAgOiBcInNob3dcIixcbiAgICAgICAgICAgIGNvbnRhaW5lciAgICAgICA6IHdpbmRvdyxcbiAgICAgICAgICAgIGRhdGFfYXR0cmlidXRlICA6IFwib3JpZ2luYWxcIixcbiAgICAgICAgICAgIHNraXBfaW52aXNpYmxlICA6IGZhbHNlLFxuICAgICAgICAgICAgYXBwZWFyICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIGxvYWQgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBwbGFjZWhvbGRlciAgICAgOiBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBWUFBQUFmRmNTSkFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFEc1FBQUE3RUFaVXJEaHNBQUFBTlNVUkJWQmhYWXpoOCtQQi9BQWZmQTBuTlB1Q0xBQUFBQUVsRlRrU3VRbUNDXCJcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XG5cbiAgICAgICAgICAgIGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3Muc2tpcF9pbnZpc2libGUgJiYgISR0aGlzLmlzKFwiOnZpc2libGVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJC5hYm92ZXRoZXRvcCh0aGlzLCBzZXR0aW5ncykgfHxcbiAgICAgICAgICAgICAgICAgICAgJC5sZWZ0b2ZiZWdpbih0aGlzLCBzZXR0aW5ncykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIE5vdGhpbmcuICovXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghJC5iZWxvd3RoZWZvbGQodGhpcywgc2V0dGluZ3MpICYmXG4gICAgICAgICAgICAgICAgICAgICEkLnJpZ2h0b2Zmb2xkKHRoaXMsIHNldHRpbmdzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMudHJpZ2dlcihcImFwcGVhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGlmIHdlIGZvdW5kIGFuIGltYWdlIHdlJ2xsIGxvYWQsIHJlc2V0IHRoZSBjb3VudGVyICovXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKytjb3VudGVyID4gc2V0dGluZ3MuZmFpbHVyZV9saW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8qIE1haW50YWluIEJDIGZvciBhIGNvdXBsZSBvZiB2ZXJzaW9ucy4gKi9cbiAgICAgICAgICAgIGlmICh1bmRlZmluZWQgIT09IG9wdGlvbnMuZmFpbHVyZWxpbWl0KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5mYWlsdXJlX2xpbWl0ID0gb3B0aW9ucy5mYWlsdXJlbGltaXQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuZmFpbHVyZWxpbWl0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gb3B0aW9ucy5lZmZlY3RzcGVlZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZWZmZWN0X3NwZWVkID0gb3B0aW9ucy5lZmZlY3RzcGVlZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5lZmZlY3RzcGVlZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJC5leHRlbmQoc2V0dGluZ3MsIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2FjaGUgY29udGFpbmVyIGFzIGpRdWVyeSBhcyBvYmplY3QuICovXG4gICAgICAgICRjb250YWluZXIgPSAoc2V0dGluZ3MuY29udGFpbmVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5jb250YWluZXIgPT09IHdpbmRvdykgPyAkd2luZG93IDogJChzZXR0aW5ncy5jb250YWluZXIpO1xuXG4gICAgICAgIC8qIEZpcmUgb25lIHNjcm9sbCBldmVudCBwZXIgc2Nyb2xsLiBOb3Qgb25lIHNjcm9sbCBldmVudCBwZXIgaW1hZ2UuICovXG4gICAgICAgIGlmICgwID09PSBzZXR0aW5ncy5ldmVudC5pbmRleE9mKFwic2Nyb2xsXCIpKSB7XG4gICAgICAgICAgICAkY29udGFpbmVyLmJpbmQoc2V0dGluZ3MuZXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyICRzZWxmID0gJChzZWxmKTtcblxuICAgICAgICAgICAgc2VsZi5sb2FkZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgLyogSWYgbm8gc3JjIGF0dHJpYnV0ZSBnaXZlbiB1c2UgZGF0YTp1cmkuICovXG4gICAgICAgICAgICBpZiAoJHNlbGYuYXR0cihcInNyY1wiKSA9PT0gdW5kZWZpbmVkIHx8ICRzZWxmLmF0dHIoXCJzcmNcIikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWxmLmlzKFwiaW1nXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzZWxmLmF0dHIoXCJzcmNcIiwgc2V0dGluZ3MucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyogV2hlbiBhcHBlYXIgaXMgdHJpZ2dlcmVkIGxvYWQgb3JpZ2luYWwgaW1hZ2UuICovXG4gICAgICAgICAgICAkc2VsZi5vbmUoXCJhcHBlYXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuYXBwZWFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHNfbGVmdCA9IGVsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFwcGVhci5jYWxsKHNlbGYsIGVsZW1lbnRzX2xlZnQsIHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkKFwiPGltZyAvPlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmJpbmQoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gJHNlbGYuYXR0cihcImRhdGEtXCIgKyBzZXR0aW5ncy5kYXRhX2F0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkc2VsZi5pcyhcImltZ1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2VsZi5hdHRyKFwic3JjXCIsIG9yaWdpbmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2VsZi5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIFwidXJsKCdcIiArIG9yaWdpbmFsICsgXCInKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGZbc2V0dGluZ3MuZWZmZWN0XShzZXR0aW5ncy5lZmZlY3Rfc3BlZWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogUmVtb3ZlIGltYWdlIGZyb20gYXJyYXkgc28gaXQgaXMgbm90IGxvb3BlZCBuZXh0IHRpbWUuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAgPSAkLmdyZXAoZWxlbWVudHMsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFlbGVtZW50LmxvYWRlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9ICQodGVtcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MubG9hZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHNfbGVmdCA9IGVsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MubG9hZC5jYWxsKHNlbGYsIGVsZW1lbnRzX2xlZnQsIHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJzcmNcIiwgJHNlbGYuYXR0cihcImRhdGEtXCIgKyBzZXR0aW5ncy5kYXRhX2F0dHJpYnV0ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKiBXaGVuIHdhbnRlZCBldmVudCBpcyB0cmlnZ2VyZWQgbG9hZCBvcmlnaW5hbCBpbWFnZSAqL1xuICAgICAgICAgICAgLyogYnkgdHJpZ2dlcmluZyBhcHBlYXIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICgwICE9PSBzZXR0aW5ncy5ldmVudC5pbmRleE9mKFwic2Nyb2xsXCIpKSB7XG4gICAgICAgICAgICAgICAgJHNlbGYuYmluZChzZXR0aW5ncy5ldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzZWxmLnRyaWdnZXIoXCJhcHBlYXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyogQ2hlY2sgaWYgc29tZXRoaW5nIGFwcGVhcnMgd2hlbiB3aW5kb3cgaXMgcmVzaXplZC4gKi9cbiAgICAgICAgJHdpbmRvdy5iaW5kKFwicmVzaXplXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIFdpdGggSU9TNSBmb3JjZSBsb2FkaW5nIGltYWdlcyB3aGVuIG5hdmlnYXRpbmcgd2l0aCBiYWNrIGJ1dHRvbi4gKi9cbiAgICAgICAgLyogTm9uIG9wdGltYWwgd29ya2Fyb3VuZC4gKi9cbiAgICAgICAgaWYgKCgvKD86aXBob25lfGlwb2R8aXBhZCkuKm9zIDUvZ2kpLnRlc3QobmF2aWdhdG9yLmFwcFZlcnNpb24pKSB7XG4gICAgICAgICAgICAkd2luZG93LmJpbmQoXCJwYWdlc2hvd1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQucGVyc2lzdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoXCJhcHBlYXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRm9yY2UgaW5pdGlhbCBjaGVjayBpZiBpbWFnZXMgc2hvdWxkIGFwcGVhci4gKi9cbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qIENvbnZlbmllbmNlIG1ldGhvZHMgaW4galF1ZXJ5IG5hbWVzcGFjZS4gICAgICAgICAgICovXG4gICAgLyogVXNlIGFzICAkLmJlbG93dGhlZm9sZChlbGVtZW50LCB7dGhyZXNob2xkIDogMTAwLCBjb250YWluZXIgOiB3aW5kb3d9KSAqL1xuXG4gICAgJC5iZWxvd3RoZWZvbGQgPSBmdW5jdGlvbihlbGVtZW50LCBzZXR0aW5ncykge1xuICAgICAgICB2YXIgZm9sZDtcblxuICAgICAgICBpZiAoc2V0dGluZ3MuY29udGFpbmVyID09PSB1bmRlZmluZWQgfHwgc2V0dGluZ3MuY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSAod2luZG93LmlubmVySGVpZ2h0ID8gd2luZG93LmlubmVySGVpZ2h0IDogJHdpbmRvdy5oZWlnaHQoKSkgKyAkd2luZG93LnNjcm9sbFRvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9ICQoc2V0dGluZ3MuY29udGFpbmVyKS5vZmZzZXQoKS50b3AgKyAkKHNldHRpbmdzLmNvbnRhaW5lcikuaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9sZCA8PSAkKGVsZW1lbnQpLm9mZnNldCgpLnRvcCAtIHNldHRpbmdzLnRocmVzaG9sZDtcbiAgICB9O1xuXG4gICAgJC5yaWdodG9mZm9sZCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHNldHRpbmdzKSB7XG4gICAgICAgIHZhciBmb2xkO1xuXG4gICAgICAgIGlmIChzZXR0aW5ncy5jb250YWluZXIgPT09IHVuZGVmaW5lZCB8fCBzZXR0aW5ncy5jb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9ICR3aW5kb3cud2lkdGgoKSArICR3aW5kb3cuc2Nyb2xsTGVmdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9ICQoc2V0dGluZ3MuY29udGFpbmVyKS5vZmZzZXQoKS5sZWZ0ICsgJChzZXR0aW5ncy5jb250YWluZXIpLndpZHRoKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9sZCA8PSAkKGVsZW1lbnQpLm9mZnNldCgpLmxlZnQgLSBzZXR0aW5ncy50aHJlc2hvbGQ7XG4gICAgfTtcblxuICAgICQuYWJvdmV0aGV0b3AgPSBmdW5jdGlvbihlbGVtZW50LCBzZXR0aW5ncykge1xuICAgICAgICB2YXIgZm9sZDtcblxuICAgICAgICBpZiAoc2V0dGluZ3MuY29udGFpbmVyID09PSB1bmRlZmluZWQgfHwgc2V0dGluZ3MuY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSAkd2luZG93LnNjcm9sbFRvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9ICQoc2V0dGluZ3MuY29udGFpbmVyKS5vZmZzZXQoKS50b3A7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9sZCA+PSAkKGVsZW1lbnQpLm9mZnNldCgpLnRvcCArIHNldHRpbmdzLnRocmVzaG9sZCAgKyAkKGVsZW1lbnQpLmhlaWdodCgpO1xuICAgIH07XG5cbiAgICAkLmxlZnRvZmJlZ2luID0gZnVuY3Rpb24oZWxlbWVudCwgc2V0dGluZ3MpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLmNvbnRhaW5lciA9PT0gdW5kZWZpbmVkIHx8IHNldHRpbmdzLmNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gJHdpbmRvdy5zY3JvbGxMZWZ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gJChzZXR0aW5ncy5jb250YWluZXIpLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm9sZCA+PSAkKGVsZW1lbnQpLm9mZnNldCgpLmxlZnQgKyBzZXR0aW5ncy50aHJlc2hvbGQgKyAkKGVsZW1lbnQpLndpZHRoKCk7XG4gICAgfTtcblxuICAgICQuaW52aWV3cG9ydCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHNldHRpbmdzKSB7XG4gICAgICAgICByZXR1cm4gISQucmlnaHRvZmZvbGQoZWxlbWVudCwgc2V0dGluZ3MpICYmICEkLmxlZnRvZmJlZ2luKGVsZW1lbnQsIHNldHRpbmdzKSAmJlxuICAgICAgICAgICAgICAgICEkLmJlbG93dGhlZm9sZChlbGVtZW50LCBzZXR0aW5ncykgJiYgISQuYWJvdmV0aGV0b3AoZWxlbWVudCwgc2V0dGluZ3MpO1xuICAgICB9O1xuXG4gICAgLyogQ3VzdG9tIHNlbGVjdG9ycyBmb3IgeW91ciBjb252ZW5pZW5jZS4gICAqL1xuICAgIC8qIFVzZSBhcyAkKFwiaW1nOmJlbG93LXRoZS1mb2xkXCIpLnNvbWV0aGluZygpIG9yICovXG4gICAgLyogJChcImltZ1wiKS5maWx0ZXIoXCI6YmVsb3ctdGhlLWZvbGRcIikuc29tZXRoaW5nKCkgd2hpY2ggaXMgZmFzdGVyICovXG5cbiAgICAkLmV4dGVuZCgkLmV4cHJbXCI6XCJdLCB7XG4gICAgICAgIFwiYmVsb3ctdGhlLWZvbGRcIiA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuICQuYmVsb3d0aGVmb2xkKGEsIHt0aHJlc2hvbGQgOiAwfSk7IH0sXG4gICAgICAgIFwiYWJvdmUtdGhlLXRvcFwiICA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuICEkLmJlbG93dGhlZm9sZChhLCB7dGhyZXNob2xkIDogMH0pOyB9LFxuICAgICAgICBcInJpZ2h0LW9mLXNjcmVlblwiOiBmdW5jdGlvbihhKSB7IHJldHVybiAkLnJpZ2h0b2Zmb2xkKGEsIHt0aHJlc2hvbGQgOiAwfSk7IH0sXG4gICAgICAgIFwibGVmdC1vZi1zY3JlZW5cIiA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuICEkLnJpZ2h0b2Zmb2xkKGEsIHt0aHJlc2hvbGQgOiAwfSk7IH0sXG4gICAgICAgIFwiaW4tdmlld3BvcnRcIiAgICA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuICQuaW52aWV3cG9ydChhLCB7dGhyZXNob2xkIDogMH0pOyB9LFxuICAgICAgICAvKiBNYWludGFpbiBCQyBmb3IgY291cGxlIG9mIHZlcnNpb25zLiAqL1xuICAgICAgICBcImFib3ZlLXRoZS1mb2xkXCIgOiBmdW5jdGlvbihhKSB7IHJldHVybiAhJC5iZWxvd3RoZWZvbGQoYSwge3RocmVzaG9sZCA6IDB9KTsgfSxcbiAgICAgICAgXCJyaWdodC1vZi1mb2xkXCIgIDogZnVuY3Rpb24oYSkgeyByZXR1cm4gJC5yaWdodG9mZm9sZChhLCB7dGhyZXNob2xkIDogMH0pOyB9LFxuICAgICAgICBcImxlZnQtb2YtZm9sZFwiICAgOiBmdW5jdGlvbihhKSB7IHJldHVybiAhJC5yaWdodG9mZm9sZChhLCB7dGhyZXNob2xkIDogMH0pOyB9XG4gICAgfSk7XG5cbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7IiwiLyohXG4gKiBqUXVlcnkgU2Nyb2xsc3B5IFBsdWdpblxuICogQXV0aG9yOiBAc3hhbGV4YW5kZXJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG47KGZ1bmN0aW9uICggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG4gICAgJC5mbi5leHRlbmQoe1xuICAgICAgc2Nyb2xsc3B5OiBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgICAgIFxuICAgICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMCxcbiAgICAgICAgICAgIG1vZGU6ICd2ZXJ0aWNhbCcsXG4gICAgICAgICAgICBuYW1lc3BhY2U6ICdzY3JvbGxzcHknLFxuICAgICAgICAgICAgYnVmZmVyOiAwLFxuICAgICAgICAgICAgY29udGFpbmVyOiB3aW5kb3csXG4gICAgICAgICAgICBvbkVudGVyOiBvcHRpb25zLm9uRW50ZXIgPyBvcHRpb25zLm9uRW50ZXIgOiBbXSxcbiAgICAgICAgICAgIG9uTGVhdmU6IG9wdGlvbnMub25MZWF2ZSA/IG9wdGlvbnMub25MZWF2ZSA6IFtdLFxuICAgICAgICAgICAgb25UaWNrOiBvcHRpb25zLm9uVGljayA/IG9wdGlvbnMub25UaWNrIDogW11cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpKSB7XG5cbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzO1xuICAgICAgICAgICAgICB2YXIgbyA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgIHZhciAkY29udGFpbmVyID0gJChvLmNvbnRhaW5lcik7XG4gICAgICAgICAgICAgIHZhciBtb2RlID0gby5tb2RlO1xuICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gby5idWZmZXI7XG4gICAgICAgICAgICAgIHZhciBlbnRlcnMgPSBsZWF2ZXMgPSAwO1xuICAgICAgICAgICAgICB2YXIgaW5zaWRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8qIGFkZCBsaXN0ZW5lciB0byBjb250YWluZXIgKi9cbiAgICAgICAgICAgICAgJGNvbnRhaW5lci5iaW5kKCdzY3JvbGwuJyArIG8ubmFtZXNwYWNlLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHt0b3A6ICQodGhpcykuc2Nyb2xsVG9wKCksIGxlZnQ6ICQodGhpcykuc2Nyb2xsTGVmdCgpfTtcbiAgICAgICAgICAgICAgICAgIHZhciB4eSA9IChtb2RlID09ICd2ZXJ0aWNhbCcpID8gcG9zaXRpb24udG9wICsgYnVmZmVyIDogcG9zaXRpb24ubGVmdCArIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgIHZhciBtYXggPSBvLm1heDtcbiAgICAgICAgICAgICAgICAgIHZhciBtaW4gPSBvLm1pbjtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgLyogZml4IG1heCAqL1xuICAgICAgICAgICAgICAgICAgaWYoJC5pc0Z1bmN0aW9uKG8ubWF4KSl7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IG8ubWF4KCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC8qIGZpeCBtYXggKi9cbiAgICAgICAgICAgICAgICAgIGlmKCQuaXNGdW5jdGlvbihvLm1pbikpe1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSBvLm1pbigpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZihtYXggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgbWF4ID0gKG1vZGUgPT0gJ3ZlcnRpY2FsJykgPyAkY29udGFpbmVyLmhlaWdodCgpIDogJGNvbnRhaW5lci5vdXRlcldpZHRoKCkgKyAkKGVsZW1lbnQpLm91dGVyV2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgLyogaWYgd2UgaGF2ZSByZWFjaGVkIHRoZSBtaW5pbXVtIGJvdW5kIGJ1dCBhcmUgYmVsb3cgdGhlIG1heCAuLi4gKi9cbiAgICAgICAgICAgICAgICAgIGlmKHh5ID49IG1pbiAmJiB4eSA8PSBtYXgpe1xuICAgICAgICAgICAgICAgICAgICAvKiB0cmlnZ2VyIGVudGVyIGV2ZW50ICovXG4gICAgICAgICAgICAgICAgICAgIGlmKCFpbnNpZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICBpbnNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICBlbnRlcnMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgIC8qIGZpcmUgZW50ZXIgZXZlbnQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS50cmlnZ2VyKCdzY3JvbGxFbnRlcicsIHtwb3NpdGlvbjogcG9zaXRpb259KVxuICAgICAgICAgICAgICAgICAgICAgICBpZigkLmlzRnVuY3Rpb24oby5vbkVudGVyKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgby5vbkVudGVyKGVsZW1lbnQsIHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAvKiB0cmlnZ2VyIHRpY2sgZXZlbnQgKi9cbiAgICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkudHJpZ2dlcignc2Nyb2xsVGljaycsIHtwb3NpdGlvbjogcG9zaXRpb24sIGluc2lkZTogaW5zaWRlLCBlbnRlcnM6IGVudGVycywgbGVhdmVzOiBsZWF2ZXN9KVxuICAgICAgICAgICAgICAgICAgICAgaWYoJC5pc0Z1bmN0aW9uKG8ub25UaWNrKSl7XG4gICAgICAgICAgICAgICAgICAgICAgIG8ub25UaWNrKGVsZW1lbnQsIHBvc2l0aW9uLCBpbnNpZGUsIGVudGVycywgbGVhdmVzKTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5zaWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICBpbnNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICBsZWF2ZXMrKztcbiAgICAgICAgICAgICAgICAgICAgICAvKiB0cmlnZ2VyIGxlYXZlIGV2ZW50ICovXG4gICAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS50cmlnZ2VyKCdzY3JvbGxMZWF2ZScsIHtwb3NpdGlvbjogcG9zaXRpb24sIGxlYXZlczpsZWF2ZXN9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgaWYoJC5pc0Z1bmN0aW9uKG8ub25MZWF2ZSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgby5vbkxlYXZlKGVsZW1lbnQsIHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7IFxuXG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9KVxuXG4gICAgXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKTsiXX0=
