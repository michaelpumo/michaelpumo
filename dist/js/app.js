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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL01vZGVybml6ci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2Vybml6ci9saWIvTW9kZXJuaXpyUHJvdG8uanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2NsYXNzZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2NyZWF0ZUVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2RvY0VsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2dldEJvZHkuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL2luamVjdEVsZW1lbnRXaXRoU3R5bGVzLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL2xpYi9pcy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2Vybml6ci9saWIvbXEuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3NldENsYXNzZXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlcm5penIvbGliL3Rlc3RNZWRpYVF1ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL2xpYi90ZXN0UnVubmVyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJuaXpyL2xpYi90ZXN0cy5qcyIsInNyYy9qcy9hcHAuanMiLCJzcmMvanMvcGx1Z2lucy9qcXVlcnkuYmFja3N0cmV0Y2guanMiLCJzcmMvanMvcGx1Z2lucy9qcXVlcnkuY2lyY2xpZnVsLmpzIiwic3JjL2pzL3BsdWdpbnMvanF1ZXJ5Lmxhenlsb2FkLmpzIiwic3JjL2pzL3BsdWdpbnMvanF1ZXJ5LnNjcm9sbHNweS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDclFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNb2Rlcm5penIgPSByZXF1aXJlKCcuL2xpYi9Nb2Rlcm5penInKSxcbiAgICBNb2Rlcm5penJQcm90byA9IHJlcXVpcmUoJy4vbGliL01vZGVybml6clByb3RvJyksXG4gICAgY2xhc3NlcyA9IHJlcXVpcmUoJy4vbGliL2NsYXNzZXMnKSxcbiAgICB0ZXN0UnVubmVyID0gcmVxdWlyZSgnLi9saWIvdGVzdFJ1bm5lcicpLFxuICAgIHNldENsYXNzZXMgPSByZXF1aXJlKCcuL2xpYi9zZXRDbGFzc2VzJyk7XG5cbi8vIFJ1biBlYWNoIHRlc3RcbnRlc3RSdW5uZXIoKTtcblxuLy8gUmVtb3ZlIHRoZSBcIm5vLWpzXCIgY2xhc3MgaWYgaXQgZXhpc3RzXG5zZXRDbGFzc2VzKGNsYXNzZXMpO1xuXG5kZWxldGUgTW9kZXJuaXpyUHJvdG8uYWRkVGVzdDtcbmRlbGV0ZSBNb2Rlcm5penJQcm90by5hZGRBc3luY1Rlc3Q7XG5cbi8vIFJ1biB0aGUgdGhpbmdzIHRoYXQgYXJlIHN1cHBvc2VkIHRvIHJ1biBhZnRlciB0aGUgdGVzdHNcbmZvciAodmFyIGkgPSAwOyBpIDwgTW9kZXJuaXpyLl9xLmxlbmd0aDsgaSsrKSB7XG4gIE1vZGVybml6ci5fcVtpXSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVybml6cjtcbiIsInZhciBNb2Rlcm5penJQcm90byA9IHJlcXVpcmUoJy4vTW9kZXJuaXpyUHJvdG8nKTtcblxuXG4gIC8vIEZha2Ugc29tZSBvZiBPYmplY3QuY3JlYXRlXG4gIC8vIHNvIHdlIGNhbiBmb3JjZSBub24gdGVzdCByZXN1bHRzXG4gIC8vIHRvIGJlIG5vbiBcIm93blwiIHByb3BlcnRpZXMuXG4gIHZhciBNb2Rlcm5penIgPSBmdW5jdGlvbigpe307XG4gIE1vZGVybml6ci5wcm90b3R5cGUgPSBNb2Rlcm5penJQcm90bztcblxuICAvLyBMZWFrIG1vZGVybml6ciBnbG9iYWxseSB3aGVuIHlvdSBgcmVxdWlyZWAgaXRcbiAgLy8gcmF0aGVyIHRoYW4gZm9yY2UgaXQgaGVyZS5cbiAgLy8gT3ZlcndyaXRlIG5hbWUgc28gY29uc3RydWN0b3IgbmFtZSBpcyBuaWNlciA6RFxuICBNb2Rlcm5penIgPSBuZXcgTW9kZXJuaXpyKCk7XG5cbiAgXG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZXJuaXpyOyIsInZhciB0ZXN0cyA9IHJlcXVpcmUoJy4vdGVzdHMnKTtcblxuXG4gIHZhciBNb2Rlcm5penJQcm90byA9IHtcbiAgICAvLyBUaGUgY3VycmVudCB2ZXJzaW9uLCBkdW1teVxuICAgIF92ZXJzaW9uOiAndjMuMC4wcHJlJyxcblxuICAgIC8vIEFueSBzZXR0aW5ncyB0aGF0IGRvbid0IHdvcmsgYXMgc2VwYXJhdGUgbW9kdWxlc1xuICAgIC8vIGNhbiBnbyBpbiBoZXJlIGFzIGNvbmZpZ3VyYXRpb24uXG4gICAgX2NvbmZpZzoge1xuICAgICAgY2xhc3NQcmVmaXggOiAnJyxcbiAgICAgIGVuYWJsZUNsYXNzZXMgOiB0cnVlXG4gICAgfSxcblxuICAgIC8vIFF1ZXVlIG9mIHRlc3RzXG4gICAgX3E6IFtdLFxuXG4gICAgLy8gU3R1YiB0aGVzZSBmb3IgcGVvcGxlIHdobyBhcmUgbGlzdGVuaW5nXG4gICAgb246IGZ1bmN0aW9uKCB0ZXN0LCBjYiApIHtcbiAgICAgIC8vIEkgZG9uJ3QgcmVhbGx5IHRoaW5rIHBlb3BsZSBzaG91bGQgZG8gdGhpcywgYnV0IHdlIGNhblxuICAgICAgLy8gc2FmZSBndWFyZCBpdCBhIGJpdC5cbiAgICAgIC8vIC0tIE5PVEU6OiB0aGlzIGdldHMgV0FZIG92ZXJyaWRkZW4gaW4gc3JjL2FkZFRlc3QgZm9yXG4gICAgICAvLyBhY3R1YWwgYXN5bmMgdGVzdHMuIFRoaXMgaXMgaW4gY2FzZSBwZW9wbGUgbGlzdGVuIHRvXG4gICAgICAvLyBzeW5jaHJvbm91cyB0ZXN0cy4gSSB3b3VsZCBsZWF2ZSBpdCBvdXQsIGJ1dCB0aGUgY29kZVxuICAgICAgLy8gdG8gKmRpc2FsbG93KiBzeW5jIHRlc3RzIGluIHRoZSByZWFsIHZlcnNpb24gb2YgdGhpc1xuICAgICAgLy8gZnVuY3Rpb24gaXMgYWN0dWFsbHkgbGFyZ2VyIHRoYW4gdGhpcy5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNiKHRoaXNbdGVzdF0pO1xuICAgICAgfSwgMCk7XG4gICAgfSxcblxuICAgIGFkZFRlc3Q6IGZ1bmN0aW9uKCBuYW1lLCBmbiwgb3B0aW9ucyApIHtcbiAgICAgIHRlc3RzLnB1c2goe25hbWUgOiBuYW1lLCBmbiA6IGZuLCBvcHRpb25zIDogb3B0aW9ucyB9KTtcbiAgICB9LFxuXG4gICAgYWRkQXN5bmNUZXN0OiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHRlc3RzLnB1c2goe25hbWUgOiBudWxsLCBmbiA6IGZufSk7XG4gICAgfVxuICB9O1xuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVybml6clByb3RvOyIsIlxuICB2YXIgY2xhc3NlcyA9IFtdO1xuICBcbm1vZHVsZS5leHBvcnRzID0gY2xhc3NlczsiLCJcbiAgdmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudC5hcHBseShkb2N1bWVudCwgYXJndW1lbnRzKTtcbiAgfTtcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUVsZW1lbnQ7IiwiXG4gIHZhciBkb2NFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICBcbm1vZHVsZS5leHBvcnRzID0gZG9jRWxlbWVudDsiLCJ2YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4vY3JlYXRlRWxlbWVudCcpO1xuXG5cbiAgZnVuY3Rpb24gZ2V0Qm9keSgpIHtcbiAgICAvLyBBZnRlciBwYWdlIGxvYWQgaW5qZWN0aW5nIGEgZmFrZSBib2R5IGRvZXNuJ3Qgd29yayBzbyBjaGVjayBpZiBib2R5IGV4aXN0c1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuICAgIGlmKCFib2R5KSB7XG4gICAgICAvLyBDYW4ndCB1c2UgdGhlIHJlYWwgYm9keSBjcmVhdGUgYSBmYWtlIG9uZS5cbiAgICAgIGJvZHkgPSBjcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgICBib2R5LmZha2UgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgXG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0Qm9keTsiLCJ2YXIgTW9kZXJuaXpyUHJvdG8gPSByZXF1aXJlKCcuL01vZGVybml6clByb3RvJyk7XG52YXIgZG9jRWxlbWVudCA9IHJlcXVpcmUoJy4vZG9jRWxlbWVudCcpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuL2NyZWF0ZUVsZW1lbnQnKTtcbnZhciBnZXRCb2R5ID0gcmVxdWlyZSgnLi9nZXRCb2R5Jyk7XG5cblxuICAvLyBJbmplY3QgZWxlbWVudCB3aXRoIHN0eWxlIGVsZW1lbnQgYW5kIHNvbWUgQ1NTIHJ1bGVzXG4gIGZ1bmN0aW9uIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzKCBydWxlLCBjYWxsYmFjaywgbm9kZXMsIHRlc3RuYW1lcyApIHtcbiAgICB2YXIgbW9kID0gJ21vZGVybml6cic7XG4gICAgdmFyIHN0eWxlO1xuICAgIHZhciByZXQ7XG4gICAgdmFyIG5vZGU7XG4gICAgdmFyIGRvY092ZXJmbG93O1xuICAgIHZhciBkaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgYm9keSA9IGdldEJvZHkoKTtcblxuICAgIGlmICggcGFyc2VJbnQobm9kZXMsIDEwKSApIHtcbiAgICAgIC8vIEluIG9yZGVyIG5vdCB0byBnaXZlIGZhbHNlIHBvc2l0aXZlcyB3ZSBjcmVhdGUgYSBub2RlIGZvciBlYWNoIHRlc3RcbiAgICAgIC8vIFRoaXMgYWxzbyBhbGxvd3MgdGhlIG1ldGhvZCB0byBzY2FsZSBmb3IgdW5zcGVjaWZpZWQgdXNlc1xuICAgICAgd2hpbGUgKCBub2Rlcy0tICkge1xuICAgICAgICBub2RlID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5vZGUuaWQgPSB0ZXN0bmFtZXMgPyB0ZXN0bmFtZXNbbm9kZXNdIDogbW9kICsgKG5vZGVzICsgMSk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyA8c3R5bGU+IGVsZW1lbnRzIGluIElFNi05IGFyZSBjb25zaWRlcmVkICdOb1Njb3BlJyBlbGVtZW50cyBhbmQgdGhlcmVmb3JlIHdpbGwgYmUgcmVtb3ZlZFxuICAgIC8vIHdoZW4gaW5qZWN0ZWQgd2l0aCBpbm5lckhUTUwuIFRvIGdldCBhcm91bmQgdGhpcyB5b3UgbmVlZCB0byBwcmVwZW5kIHRoZSAnTm9TY29wZScgZWxlbWVudFxuICAgIC8vIHdpdGggYSAnc2NvcGVkJyBlbGVtZW50LCBpbiBvdXIgY2FzZSB0aGUgc29mdC1oeXBoZW4gZW50aXR5IGFzIGl0IHdvbid0IG1lc3Mgd2l0aCBvdXIgbWVhc3VyZW1lbnRzLlxuICAgIC8vIG1zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMzODk3JTI4VlMuODUlMjkuYXNweFxuICAgIC8vIERvY3VtZW50cyBzZXJ2ZWQgYXMgeG1sIHdpbGwgdGhyb3cgaWYgdXNpbmcgJnNoeTsgc28gdXNlIHhtbCBmcmllbmRseSBlbmNvZGVkIHZlcnNpb24uIFNlZSBpc3N1ZSAjMjc3XG4gICAgc3R5bGUgPSBbJyYjMTczOycsJzxzdHlsZSBpZD1cInMnLCBtb2QsICdcIj4nLCBydWxlLCAnPC9zdHlsZT4nXS5qb2luKCcnKTtcbiAgICBkaXYuaWQgPSBtb2Q7XG4gICAgLy8gSUU2IHdpbGwgZmFsc2UgcG9zaXRpdmUgb24gc29tZSB0ZXN0cyBkdWUgdG8gdGhlIHN0eWxlIGVsZW1lbnQgaW5zaWRlIHRoZSB0ZXN0IGRpdiBzb21laG93IGludGVyZmVyaW5nIG9mZnNldEhlaWdodCwgc28gaW5zZXJ0IGl0IGludG8gYm9keSBvciBmYWtlYm9keS5cbiAgICAvLyBPcGVyYSB3aWxsIGFjdCBhbGwgcXVpcmt5IHdoZW4gaW5qZWN0aW5nIGVsZW1lbnRzIGluIGRvY3VtZW50RWxlbWVudCB3aGVuIHBhZ2UgaXMgc2VydmVkIGFzIHhtbCwgbmVlZHMgZmFrZWJvZHkgdG9vLiAjMjcwXG4gICAgKCFib2R5LmZha2UgPyBkaXYgOiBib2R5KS5pbm5lckhUTUwgKz0gc3R5bGU7XG4gICAgYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIGlmICggYm9keS5mYWtlICkge1xuICAgICAgLy9hdm9pZCBjcmFzaGluZyBJRTgsIGlmIGJhY2tncm91bmQgaW1hZ2UgaXMgdXNlZFxuICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAvL1NhZmFyaSA1LjEzLzUuMS40IE9TWCBzdG9wcyBsb2FkaW5nIGlmIDo6LXdlYmtpdC1zY3JvbGxiYXIgaXMgdXNlZCBhbmQgc2Nyb2xsYmFycyBhcmUgdmlzaWJsZVxuICAgICAgYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgZG9jT3ZlcmZsb3cgPSBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93O1xuICAgICAgZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgZG9jRWxlbWVudC5hcHBlbmRDaGlsZChib2R5KTtcbiAgICB9XG5cbiAgICByZXQgPSBjYWxsYmFjayhkaXYsIHJ1bGUpO1xuICAgIC8vIElmIHRoaXMgaXMgZG9uZSBhZnRlciBwYWdlIGxvYWQgd2UgZG9uJ3Qgd2FudCB0byByZW1vdmUgdGhlIGJvZHkgc28gY2hlY2sgaWYgYm9keSBleGlzdHNcbiAgICBpZiAoIGJvZHkuZmFrZSApIHtcbiAgICAgIGJvZHkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChib2R5KTtcbiAgICAgIGRvY0VsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBkb2NPdmVyZmxvdztcbiAgICAgIC8vIFRyaWdnZXIgbGF5b3V0IHNvIGtpbmV0aWMgc2Nyb2xsaW5nIGlzbid0IGRpc2FibGVkIGluIGlPUzYrXG4gICAgICBkb2NFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICB9XG5cbiAgICByZXR1cm4gISFyZXQ7XG5cbiAgfVxuXG4gIFxuXG5tb2R1bGUuZXhwb3J0cyA9IGluamVjdEVsZW1lbnRXaXRoU3R5bGVzOyIsIlxuICAvKipcbiAgICogaXMgcmV0dXJucyBhIGJvb2xlYW4gZm9yIGlmIHR5cGVvZiBvYmogaXMgZXhhY3RseSB0eXBlLlxuICAgKi9cbiAgZnVuY3Rpb24gaXMoIG9iaiwgdHlwZSApIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gdHlwZTtcbiAgfVxuICBcbm1vZHVsZS5leHBvcnRzID0gaXM7IiwidmFyIE1vZGVybml6clByb3RvID0gcmVxdWlyZSgnLi9Nb2Rlcm5penJQcm90bycpO1xudmFyIHRlc3RNZWRpYVF1ZXJ5ID0gcmVxdWlyZSgnLi90ZXN0TWVkaWFRdWVyeScpO1xuXG5cbiAgLy8gTW9kZXJuaXpyLm1xIHRlc3RzIGEgZ2l2ZW4gbWVkaWEgcXVlcnksIGxpdmUgYWdhaW5zdCB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgd2luZG93XG4gIC8vIEEgZmV3IGltcG9ydGFudCBub3RlczpcbiAgLy8gICAqIElmIGEgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IG1lZGlhIHF1ZXJpZXMgYXQgYWxsIChlZy4gb2xkSUUpIHRoZSBtcSgpIHdpbGwgYWx3YXlzIHJldHVybiBmYWxzZVxuICAvLyAgICogQSBtYXgtd2lkdGggb3Igb3JpZW50YXRpb24gcXVlcnkgd2lsbCBiZSBldmFsdWF0ZWQgYWdhaW5zdCB0aGUgY3VycmVudCBzdGF0ZSwgd2hpY2ggbWF5IGNoYW5nZSBsYXRlci5cbiAgLy8gICAqIFlvdSBtdXN0IHNwZWNpZnkgdmFsdWVzLiBFZy4gSWYgeW91IGFyZSB0ZXN0aW5nIHN1cHBvcnQgZm9yIHRoZSBtaW4td2lkdGggbWVkaWEgcXVlcnkgdXNlOlxuICAvLyAgICAgICBNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6MCknKVxuICAvLyB1c2FnZTpcbiAgLy8gTW9kZXJuaXpyLm1xKCdvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDo3NjgpJylcbiAgdmFyIG1xID0gTW9kZXJuaXpyUHJvdG8ubXEgPSB0ZXN0TWVkaWFRdWVyeTtcbiAgXG5cbm1vZHVsZS5leHBvcnRzID0gbXE7IiwidmFyIE1vZGVybml6ciA9IHJlcXVpcmUoJy4vTW9kZXJuaXpyJyk7XG52YXIgZG9jRWxlbWVudCA9IHJlcXVpcmUoJy4vZG9jRWxlbWVudCcpO1xuXG5cbiAgLy8gUGFzcyBpbiBhbiBhbmQgYXJyYXkgb2YgY2xhc3MgbmFtZXMsIGUuZy46XG4gIC8vICBbJ25vLXdlYnAnLCAnYm9yZGVycmFkaXVzJywgLi4uXVxuICBmdW5jdGlvbiBzZXRDbGFzc2VzKCBjbGFzc2VzICkge1xuICAgIHZhciBjbGFzc05hbWUgPSBkb2NFbGVtZW50LmNsYXNzTmFtZTtcbiAgICB2YXIgcmVnZXg7XG4gICAgdmFyIGNsYXNzUHJlZml4ID0gTW9kZXJuaXpyLl9jb25maWcuY2xhc3NQcmVmaXggfHwgJyc7XG5cbiAgICAvLyBDaGFuZ2UgYG5vLWpzYCB0byBganNgICh3ZSBkbyB0aGlzIHJlZ2FyZGxlcyBvZiB0aGUgYGVuYWJsZUNsYXNzZXNgXG4gICAgLy8gb3B0aW9uKVxuICAgIC8vIEhhbmRsZSBjbGFzc1ByZWZpeCBvbiB0aGlzIHRvb1xuICAgIHZhciByZUpTID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpJytjbGFzc1ByZWZpeCsnbm8tanMoXFxcXHN8JCknKTtcbiAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUucmVwbGFjZShyZUpTLCAnJDEnK2NsYXNzUHJlZml4KydqcyQyJyk7XG5cbiAgICBpZihNb2Rlcm5penIuX2NvbmZpZy5lbmFibGVDbGFzc2VzKSB7XG4gICAgICAvLyBBZGQgdGhlIG5ldyBjbGFzc2VzXG4gICAgICBjbGFzc05hbWUgKz0gJyAnICsgY2xhc3NQcmVmaXggKyBjbGFzc2VzLmpvaW4oJyAnICsgY2xhc3NQcmVmaXgpO1xuICAgICAgZG9jRWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgfVxuXG4gIH1cblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBzZXRDbGFzc2VzOyIsInZhciBpbmplY3RFbGVtZW50V2l0aFN0eWxlcyA9IHJlcXVpcmUoJy4vaW5qZWN0RWxlbWVudFdpdGhTdHlsZXMnKTtcblxuXG4gIC8vIGFkYXB0ZWQgZnJvbSBtYXRjaE1lZGlhIHBvbHlmaWxsXG4gIC8vIGJ5IFNjb3R0IEplaGwgYW5kIFBhdWwgSXJpc2hcbiAgLy8gZ2lzdC5naXRodWIuY29tLzc4Njc2OFxuICB2YXIgdGVzdE1lZGlhUXVlcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBtYXRjaE1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEgfHwgd2luZG93Lm1zTWF0Y2hNZWRpYTtcbiAgICBpZiAoIG1hdGNoTWVkaWEgKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCBtcSApIHtcbiAgICAgICAgdmFyIG1xbCA9IG1hdGNoTWVkaWEobXEpO1xuICAgICAgICByZXR1cm4gbXFsICYmIG1xbC5tYXRjaGVzIHx8IGZhbHNlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCBtcSApIHtcbiAgICAgIHZhciBib29sID0gZmFsc2U7XG5cbiAgICAgIGluamVjdEVsZW1lbnRXaXRoU3R5bGVzKCdAbWVkaWEgJyArIG1xICsgJyB7ICNtb2Rlcm5penIgeyBwb3NpdGlvbjogYWJzb2x1dGU7IH0gfScsIGZ1bmN0aW9uKCBub2RlICkge1xuICAgICAgICBib29sID0gKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID9cbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKSA6XG4gICAgICAgICAgICAgICAgbm9kZS5jdXJyZW50U3R5bGUpWydwb3NpdGlvbiddID09ICdhYnNvbHV0ZSc7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGJvb2w7XG4gICAgfTtcbiAgfSkoKTtcblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSB0ZXN0TWVkaWFRdWVyeTsiLCJ2YXIgdGVzdHMgPSByZXF1aXJlKCcuL3Rlc3RzJyk7XG52YXIgTW9kZXJuaXpyID0gcmVxdWlyZSgnLi9Nb2Rlcm5penInKTtcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi9jbGFzc2VzJyk7XG52YXIgaXMgPSByZXF1aXJlKCcuL2lzJyk7XG5cblxuICAvLyBSdW4gdGhyb3VnaCBhbGwgdGVzdHMgYW5kIGRldGVjdCB0aGVpciBzdXBwb3J0IGluIHRoZSBjdXJyZW50IFVBLlxuICBmdW5jdGlvbiB0ZXN0UnVubmVyKCkge1xuICAgIHZhciBmZWF0dXJlTmFtZXM7XG4gICAgdmFyIGZlYXR1cmU7XG4gICAgdmFyIGFsaWFzSWR4O1xuICAgIHZhciByZXN1bHQ7XG4gICAgdmFyIG5hbWVJZHg7XG4gICAgdmFyIGZlYXR1cmVOYW1lO1xuICAgIHZhciBmZWF0dXJlTmFtZVNwbGl0O1xuICAgIHZhciBtb2Rlcm5penJQcm9wO1xuICAgIHZhciBtUHJvcENvdW50O1xuXG4gICAgZm9yICggdmFyIGZlYXR1cmVJZHggaW4gdGVzdHMgKSB7XG4gICAgICBmZWF0dXJlTmFtZXMgPSBbXTtcbiAgICAgIGZlYXR1cmUgPSB0ZXN0c1tmZWF0dXJlSWR4XTtcbiAgICAgIC8vIHJ1biB0aGUgdGVzdCwgdGhyb3cgdGhlIHJldHVybiB2YWx1ZSBpbnRvIHRoZSBNb2Rlcm5penIsXG4gICAgICAvLyAgIHRoZW4gYmFzZWQgb24gdGhhdCBib29sZWFuLCBkZWZpbmUgYW4gYXBwcm9wcmlhdGUgY2xhc3NOYW1lXG4gICAgICAvLyAgIGFuZCBwdXNoIGl0IGludG8gYW4gYXJyYXkgb2YgY2xhc3NlcyB3ZSdsbCBqb2luIGxhdGVyLlxuICAgICAgLy9cbiAgICAgIC8vICAgSWYgdGhlcmUgaXMgbm8gbmFtZSwgaXQncyBhbiAnYXN5bmMnIHRlc3QgdGhhdCBpcyBydW4sXG4gICAgICAvLyAgIGJ1dCBub3QgZGlyZWN0bHkgYWRkZWQgdG8gdGhlIG9iamVjdC4gVGhhdCBzaG91bGRcbiAgICAgIC8vICAgYmUgZG9uZSB3aXRoIGEgcG9zdC1ydW4gYWRkVGVzdCBjYWxsLlxuICAgICAgaWYgKCBmZWF0dXJlLm5hbWUgKSB7XG4gICAgICAgIGZlYXR1cmVOYW1lcy5wdXNoKGZlYXR1cmUubmFtZS50b0xvd2VyQ2FzZSgpKTtcblxuICAgICAgICBpZiAoZmVhdHVyZS5vcHRpb25zICYmIGZlYXR1cmUub3B0aW9ucy5hbGlhc2VzICYmIGZlYXR1cmUub3B0aW9ucy5hbGlhc2VzLmxlbmd0aCkge1xuICAgICAgICAgIC8vIEFkZCBhbGwgdGhlIGFsaWFzZXMgaW50byB0aGUgbmFtZXMgbGlzdFxuICAgICAgICAgIGZvciAoYWxpYXNJZHggPSAwOyBhbGlhc0lkeCA8IGZlYXR1cmUub3B0aW9ucy5hbGlhc2VzLmxlbmd0aDsgYWxpYXNJZHgrKykge1xuICAgICAgICAgICAgZmVhdHVyZU5hbWVzLnB1c2goZmVhdHVyZS5vcHRpb25zLmFsaWFzZXNbYWxpYXNJZHhdLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBSdW4gdGhlIHRlc3QsIG9yIHVzZSB0aGUgcmF3IHZhbHVlIGlmIGl0J3Mgbm90IGEgZnVuY3Rpb25cbiAgICAgIHJlc3VsdCA9IGlzKGZlYXR1cmUuZm4sICdmdW5jdGlvbicpID8gZmVhdHVyZS5mbigpIDogZmVhdHVyZS5mbjtcblxuXG4gICAgICAvLyBTZXQgZWFjaCBvZiB0aGUgbmFtZXMgb24gdGhlIE1vZGVybml6ciBvYmplY3RcbiAgICAgIGZvciAobmFtZUlkeCA9IDA7IG5hbWVJZHggPCBmZWF0dXJlTmFtZXMubGVuZ3RoOyBuYW1lSWR4KyspIHtcbiAgICAgICAgZmVhdHVyZU5hbWUgPSBmZWF0dXJlTmFtZXNbbmFtZUlkeF07XG4gICAgICAgIC8vIFN1cHBvcnQgZG90IHByb3BlcnRpZXMgYXMgc3ViIHRlc3RzLiBXZSBkb24ndCBkbyBjaGVja2luZyB0byBtYWtlIHN1cmVcbiAgICAgICAgLy8gdGhhdCB0aGUgaW1wbGllZCBwYXJlbnQgdGVzdHMgaGF2ZSBiZWVuIGFkZGVkLiBZb3UgbXVzdCBjYWxsIHRoZW0gaW5cbiAgICAgICAgLy8gb3JkZXIgKGVpdGhlciBpbiB0aGUgdGVzdCwgb3IgbWFrZSB0aGUgcGFyZW50IHRlc3QgYSBkZXBlbmRlbmN5KS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gQ2FwIGl0IHRvIFRXTyB0byBtYWtlIHRoZSBsb2dpYyBzaW1wbGUgYW5kIGJlY2F1c2Ugd2hvIG5lZWRzIHRoYXQga2luZCBvZiBzdWJ0ZXN0aW5nXG4gICAgICAgIC8vIGhhc2h0YWcgZmFtb3VzIGxhc3Qgd29yZHNcbiAgICAgICAgZmVhdHVyZU5hbWVTcGxpdCA9IGZlYXR1cmVOYW1lLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgaWYgKGZlYXR1cmVOYW1lU3BsaXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgTW9kZXJuaXpyW2ZlYXR1cmVOYW1lU3BsaXRbMF1dID0gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZlYXR1cmVOYW1lU3BsaXQubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgTW9kZXJuaXpyW2ZlYXR1cmVOYW1lU3BsaXRbMF1dW2ZlYXR1cmVOYW1lU3BsaXRbMV1dID0gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgY2xhc3Nlcy5wdXNoKChyZXN1bHQgPyAnJyA6ICduby0nKSArIGZlYXR1cmVOYW1lU3BsaXQuam9pbignLScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBcblxubW9kdWxlLmV4cG9ydHMgPSB0ZXN0UnVubmVyOyIsIlxuICB2YXIgdGVzdHMgPSBbXTtcbiAgXG5tb2R1bGUuZXhwb3J0cyA9IHRlc3RzOyIsInJlcXVpcmUoJ2Jyb3dzZXJuaXpyL2xpYi9tcScpO1xucmVxdWlyZSgnYnJvd3Nlcm5penInKTtcblxudmFyIE1vZGVybml6ciAgID0gcmVxdWlyZSgnYnJvd3Nlcm5penInKSxcbiAgICBiYWNrc3RyZXRjaCA9IHJlcXVpcmUoJy4vcGx1Z2lucy9qcXVlcnkuYmFja3N0cmV0Y2gnKSxcbiAgICBjaXJjbGlmdWwgICA9IHJlcXVpcmUoJy4vcGx1Z2lucy9qcXVlcnkuY2lyY2xpZnVsJyksXG4gICAgbGF6eWxvYWQgICAgPSByZXF1aXJlKCcuL3BsdWdpbnMvanF1ZXJ5Lmxhenlsb2FkJyksXG4gICAgc2Nyb2xsc3B5ICAgPSByZXF1aXJlKCcuL3BsdWdpbnMvanF1ZXJ5LnNjcm9sbHNweScpO1xuXG4oZnVuY3Rpb24oJCkge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGNhY2hlID0ge1xuICAgICAgICBcbiAgICAgICAgJGh0bWxCb2R5OiAkKCdodG1sLCBib2R5JyksXG4gICAgICAgICRib2R5OiAkKCdib2R5JyksXG4gICAgICAgICRuYXY6ICQoJyNuYXYnKSxcbiAgICAgICAgJG5hdkJ1dHRvbjogJCgnI25hdi1idXR0b24nKSxcbiAgICAgICAgJG9ud2FyZDogJCgnI29ud2FyZCcpLFxuICAgICAgICAkc2VjdGlvbnM6ICQoJyNzZWN0aW9ucycpLFxuICAgICAgICAkc2VjdGlvbjogJCgnLnNlY3Rpb24nKSxcbiAgICAgICAgJHN0YXQ6ICQoJy5zdGF0JyksXG4gICAgICAgICR0aW1lbGluZUV2ZW50OiAkKCcudGltZWxpbmUtZXZlbnQnKSxcbiAgICAgICAgJGxhenk6ICQoJ2ltZy5sYXp5JylcbiAgICAgICAgXG4gICAgfTtcbiAgICBcbiAgICB2YXIgYXBwID0ge1xuICAgICAgICBcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFwcC5iYWNrc3RyZXRjaCgpO1xuICAgICAgICAgICAgYXBwLmp1bXAoKTtcbiAgICAgICAgICAgIGFwcC5zdGF0cygpO1xuICAgICAgICAgICAgYXBwLm5hdlNjcm9sbCgpO1xuICAgICAgICAgICAgYXBwLm5hdlRvZ2dsZSgpO1xuICAgICAgICAgICAgYXBwLnRpbWVsaW5lKCk7XG4gICAgICAgICAgICBhcHAubGF6eUltYWdlcygpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBiYWNrc3RyZXRjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQoJyNzZWN0aW9uLWNvdmVyJykuYmFja3N0cmV0Y2goJy9kaXN0L2ltYWdlcy9jb3Zlci1sYW5kc2NhcGUuanBnJyk7XG4gICAgICAgICAgICAkKCcjc2VjdGlvbi1xdW90ZXMnKS5iYWNrc3RyZXRjaCgnL2Rpc3QvaW1hZ2VzL21pY2hhZWxwdW1vLmpwZycpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBqdW1wOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyICRhbmNob3IgPSBjYWNoZS4kb253YXJkO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkYW5jaG9yLm9mZignY2xpY2snKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJGFuY2hvci5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0cmF2ZWwgPSAoIGNhY2hlLiRzZWN0aW9uLmVxKDEpLm9mZnNldCgpLnRvcCApO1xuXG4gICAgICAgICAgICAgICAgaWYoIE1vZGVybml6ci5tcSgnb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KScpICkge1xuICAgICAgICAgICAgICAgICAgICB0cmF2ZWwgPSAoIGNhY2hlLiRzZWN0aW9uLmVxKDEpLm9mZnNldCgpLnRvcCApIC0gY2FjaGUuJG5hdi5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgY2FjaGUuJGh0bWxCb2R5LmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHRyYXZlbFxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgc3RhdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKGNhbnZhcy5nZXRDb250ZXh0KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYWNoZS4kc3RhdC5jaXJjbGlmdWwoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBuYXZTY3JvbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgJGFuY2hvcnMgPSBjYWNoZS4kbmF2LmZpbmQoJ2EnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJGFuY2hvcnMub2ZmKCdjbGljaycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkYW5jaG9ycy5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0cmF2ZWwgPSAoICQoICQuYXR0cih0aGlzLCAnaHJlZicpICkub2Zmc2V0KCkudG9wICk7XG5cbiAgICAgICAgICAgICAgICBpZiggTW9kZXJuaXpyLm1xKCdvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpJykgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYXZlbCA9ICggJCggJC5hdHRyKHRoaXMsICdocmVmJykgKS5vZmZzZXQoKS50b3AgKSAtICggY2FjaGUuJG5hdi5oZWlnaHQoKSAtIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBjYWNoZS4kaHRtbEJvZHkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdHJhdmVsICAgIFxuICAgICAgICAgICAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUuJG5hdi5yZW1vdmVDbGFzcygnbmF2LW9wZW4nKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgbmF2VG9nZ2xlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FjaGUuJG5hdkJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICBcbiAgICAgICAgICAgICAgICBjYWNoZS4kbmF2LnRvZ2dsZUNsYXNzKCduYXYtb3BlbicpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIG5hdkhpZ2hsaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhY2hlLiRzZWN0aW9uLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSAkKHRoaXMpLnBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zY3JvbGxzcHkoe1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBtaW46IHBvc2l0aW9uLnRvcCAtIGNhY2hlLiRuYXYuaGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgICAgIG1heDogcG9zaXRpb24udG9wICsgKCAkKHRoaXMpLmhlaWdodCgpIC0gY2FjaGUuJG5hdi5oZWlnaHQoKSApLFxuICAgICAgICAgICAgICAgICAgICBvbkVudGVyOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLiRuYXYuZmluZCgnYVtocmVmPVwiIycgKyBlbGVtZW50LmlkICsgJ1wiXScpLnBhcmVudCgpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb25MZWF2ZTogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLiRuYXYuZmluZCgnYVtocmVmPVwiIycgKyBlbGVtZW50LmlkICsgJ1wiXScpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdjdXJyZW50Jyk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICB0aW1lbGluZTogZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBsYXp5SW1hZ2VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FjaGUuJGxhenkubGF6eWxvYWQoe1xuICAgICAgICAgICAgICAgIHRocmVzaG9sZCA6IDIwMCxcbiAgICAgICAgICAgICAgICBlZmZlY3QgOiAnZmFkZUluJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9O1xuICAgIFxuXG4gICAgYXBwLmluaXQoKTtcbiAgICBcblxuICAgICQod2luZG93KS5vbigncmVzaXplIGxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgXG4gICAgICAgIGFwcC5uYXZIaWdobGlnaHQoKTtcbiAgICAgICAgYXBwLm5hdlNjcm9sbCgpO1xuICAgICAgICBhcHAuanVtcCgpO1xuICAgICAgICBcbiAgICB9KTtcbiAgICBcblxufSkoalF1ZXJ5KTtcbiIsIi8qISBCYWNrc3RyZXRjaCAtIHYyLjAuNCAtIDIwMTMtMDYtMTlcbiogaHR0cDovL3Nyb2JiaW4uY29tL2pxdWVyeS1wbHVnaW5zL2JhY2tzdHJldGNoL1xuKiBDb3B5cmlnaHQgKGMpIDIwMTMgU2NvdHQgUm9iYmluOyBMaWNlbnNlZCBNSVQgKi9cbihmdW5jdGlvbihhLGQscCl7YS5mbi5iYWNrc3RyZXRjaD1mdW5jdGlvbihjLGIpeyhjPT09cHx8MD09PWMubGVuZ3RoKSYmYS5lcnJvcihcIk5vIGltYWdlcyB3ZXJlIHN1cHBsaWVkIGZvciBCYWNrc3RyZXRjaFwiKTswPT09YShkKS5zY3JvbGxUb3AoKSYmZC5zY3JvbGxUbygwLDApO3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpLGc9ZC5kYXRhKFwiYmFja3N0cmV0Y2hcIik7aWYoZyl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGMmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGdbY10pe2dbY10oYik7cmV0dXJufWI9YS5leHRlbmQoZy5vcHRpb25zLGIpO2cuZGVzdHJveSghMCl9Zz1uZXcgcSh0aGlzLGMsYik7ZC5kYXRhKFwiYmFja3N0cmV0Y2hcIixnKX0pfTthLmJhY2tzdHJldGNoPWZ1bmN0aW9uKGMsYil7cmV0dXJuIGEoXCJib2R5XCIpLmJhY2tzdHJldGNoKGMsYikuZGF0YShcImJhY2tzdHJldGNoXCIpfTthLmV4cHJbXCI6XCJdLmJhY2tzdHJldGNoPWZ1bmN0aW9uKGMpe3JldHVybiBhKGMpLmRhdGEoXCJiYWNrc3RyZXRjaFwiKSE9PXB9O2EuZm4uYmFja3N0cmV0Y2guZGVmYXVsdHM9e2NlbnRlcmVkWDohMCxjZW50ZXJlZFk6ITAsZHVyYXRpb246NUUzLGZhZGU6MH07dmFyIHI9e2xlZnQ6MCx0b3A6MCxvdmVyZmxvdzpcImhpZGRlblwiLG1hcmdpbjowLHBhZGRpbmc6MCxoZWlnaHQ6XCIxMDAlXCIsd2lkdGg6XCIxMDAlXCIsekluZGV4Oi05OTk5OTl9LHM9e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIixkaXNwbGF5Olwibm9uZVwiLG1hcmdpbjowLHBhZGRpbmc6MCxib3JkZXI6XCJub25lXCIsd2lkdGg6XCJhdXRvXCIsaGVpZ2h0OlwiYXV0b1wiLG1heEhlaWdodDpcIm5vbmVcIixtYXhXaWR0aDpcIm5vbmVcIix6SW5kZXg6LTk5OTk5OX0scT1mdW5jdGlvbihjLGIsZSl7dGhpcy5vcHRpb25zPWEuZXh0ZW5kKHt9LGEuZm4uYmFja3N0cmV0Y2guZGVmYXVsdHMsZXx8e30pO3RoaXMuaW1hZ2VzPWEuaXNBcnJheShiKT9iOltiXTthLmVhY2godGhpcy5pbWFnZXMsZnVuY3Rpb24oKXthKFwiPGltZyAvPlwiKVswXS5zcmM9dGhpc30pO3RoaXMuaXNCb2R5PWM9PT1kb2N1bWVudC5ib2R5O3RoaXMuJGNvbnRhaW5lcj1hKGMpO3RoaXMuJHJvb3Q9dGhpcy5pc0JvZHk/bD9hKGQpOmEoZG9jdW1lbnQpOnRoaXMuJGNvbnRhaW5lcjtjPXRoaXMuJGNvbnRhaW5lci5jaGlsZHJlbihcIi5iYWNrc3RyZXRjaFwiKS5maXJzdCgpO3RoaXMuJHdyYXA9Yy5sZW5ndGg/YzphKCc8ZGl2IGNsYXNzPVwiYmFja3N0cmV0Y2hcIj48L2Rpdj4nKS5jc3MocikuYXBwZW5kVG8odGhpcy4kY29udGFpbmVyKTt0aGlzLmlzQm9keXx8KGM9dGhpcy4kY29udGFpbmVyLmNzcyhcInBvc2l0aW9uXCIpLGI9dGhpcy4kY29udGFpbmVyLmNzcyhcInpJbmRleFwiKSx0aGlzLiRjb250YWluZXIuY3NzKHtwb3NpdGlvbjpcInN0YXRpY1wiPT09Yz9cInJlbGF0aXZlXCI6Yyx6SW5kZXg6XCJhdXRvXCI9PT1iPzA6YixiYWNrZ3JvdW5kOlwibm9uZVwifSksdGhpcy4kd3JhcC5jc3Moe3pJbmRleDotOTk5OTk4fSkpO3RoaXMuJHdyYXAuY3NzKHtwb3NpdGlvbjp0aGlzLmlzQm9keSYmbD9cImZpeGVkXCI6XCJhYnNvbHV0ZVwifSk7dGhpcy5pbmRleD0wO3RoaXMuc2hvdyh0aGlzLmluZGV4KTthKGQpLm9uKFwicmVzaXplLmJhY2tzdHJldGNoXCIsYS5wcm94eSh0aGlzLnJlc2l6ZSx0aGlzKSkub24oXCJvcmllbnRhdGlvbmNoYW5nZS5iYWNrc3RyZXRjaFwiLGEucHJveHkoZnVuY3Rpb24oKXt0aGlzLmlzQm9keSYmMD09PWQucGFnZVlPZmZzZXQmJihkLnNjcm9sbFRvKDAsMSksdGhpcy5yZXNpemUoKSl9LHRoaXMpKX07cS5wcm90b3R5cGU9e3Jlc2l6ZTpmdW5jdGlvbigpe3RyeXt2YXIgYT17bGVmdDowLHRvcDowfSxiPXRoaXMuaXNCb2R5P3RoaXMuJHJvb3Qud2lkdGgoKTp0aGlzLiRyb290LmlubmVyV2lkdGgoKSxlPWIsZz10aGlzLmlzQm9keT9kLmlubmVySGVpZ2h0P2QuaW5uZXJIZWlnaHQ6dGhpcy4kcm9vdC5oZWlnaHQoKTp0aGlzLiRyb290LmlubmVySGVpZ2h0KCksaj1lL3RoaXMuJGltZy5kYXRhKFwicmF0aW9cIiksZjtqPj1nPyhmPShqLWcpLzIsdGhpcy5vcHRpb25zLmNlbnRlcmVkWSYmKGEudG9wPVwiLVwiK2YrXCJweFwiKSk6KGo9ZyxlPWoqdGhpcy4kaW1nLmRhdGEoXCJyYXRpb1wiKSxmPShlLWIpLzIsdGhpcy5vcHRpb25zLmNlbnRlcmVkWCYmKGEubGVmdD1cIi1cIitmK1wicHhcIikpO3RoaXMuJHdyYXAuY3NzKHt3aWR0aDpiLGhlaWdodDpnfSkuZmluZChcImltZzpub3QoLmRlbGV0ZWFibGUpXCIpLmNzcyh7d2lkdGg6ZSxoZWlnaHQ6an0pLmNzcyhhKX1jYXRjaChoKXt9cmV0dXJuIHRoaXN9LHNob3c6ZnVuY3Rpb24oYyl7aWYoIShNYXRoLmFicyhjKT50aGlzLmltYWdlcy5sZW5ndGgtMSkpe3ZhciBiPXRoaXMsZT1iLiR3cmFwLmZpbmQoXCJpbWdcIikuYWRkQ2xhc3MoXCJkZWxldGVhYmxlXCIpLGQ9e3JlbGF0ZWRUYXJnZXQ6Yi4kY29udGFpbmVyWzBdfTtiLiRjb250YWluZXIudHJpZ2dlcihhLkV2ZW50KFwiYmFja3N0cmV0Y2guYmVmb3JlXCIsZCksW2IsY10pO3RoaXMuaW5kZXg9YztjbGVhckludGVydmFsKGIuaW50ZXJ2YWwpO2IuJGltZz1hKFwiPGltZyAvPlwiKS5jc3MocykuYmluZChcImxvYWRcIixmdW5jdGlvbihmKXt2YXIgaD10aGlzLndpZHRofHxhKGYudGFyZ2V0KS53aWR0aCgpO2Y9dGhpcy5oZWlnaHR8fGEoZi50YXJnZXQpLmhlaWdodCgpO2EodGhpcykuZGF0YShcInJhdGlvXCIsaC9mKTthKHRoaXMpLmZhZGVJbihiLm9wdGlvbnMuc3BlZWR8fGIub3B0aW9ucy5mYWRlLGZ1bmN0aW9uKCl7ZS5yZW1vdmUoKTtiLnBhdXNlZHx8Yi5jeWNsZSgpO2EoW1wiYWZ0ZXJcIixcInNob3dcIl0pLmVhY2goZnVuY3Rpb24oKXtiLiRjb250YWluZXIudHJpZ2dlcihhLkV2ZW50KFwiYmFja3N0cmV0Y2guXCIrdGhpcyxkKSxbYixjXSl9KX0pO2IucmVzaXplKCl9KS5hcHBlbmRUbyhiLiR3cmFwKTtiLiRpbWcuYXR0cihcInNyY1wiLGIuaW1hZ2VzW2NdKTtyZXR1cm4gYn19LG5leHQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zaG93KHRoaXMuaW5kZXg8dGhpcy5pbWFnZXMubGVuZ3RoLTE/dGhpcy5pbmRleCsxOjApfSxwcmV2OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2hvdygwPT09dGhpcy5pbmRleD90aGlzLmltYWdlcy5sZW5ndGgtMTp0aGlzLmluZGV4LTEpfSxwYXVzZTpmdW5jdGlvbigpe3RoaXMucGF1c2VkPSEwO3JldHVybiB0aGlzfSxyZXN1bWU6ZnVuY3Rpb24oKXt0aGlzLnBhdXNlZD0hMTt0aGlzLm5leHQoKTtyZXR1cm4gdGhpc30sY3ljbGU6ZnVuY3Rpb24oKXsxPHRoaXMuaW1hZ2VzLmxlbmd0aCYmKGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCksdGhpcy5pbnRlcnZhbD1zZXRJbnRlcnZhbChhLnByb3h5KGZ1bmN0aW9uKCl7dGhpcy5wYXVzZWR8fHRoaXMubmV4dCgpfSx0aGlzKSx0aGlzLm9wdGlvbnMuZHVyYXRpb24pKTtyZXR1cm4gdGhpc30sZGVzdHJveTpmdW5jdGlvbihjKXthKGQpLm9mZihcInJlc2l6ZS5iYWNrc3RyZXRjaCBvcmllbnRhdGlvbmNoYW5nZS5iYWNrc3RyZXRjaFwiKTtjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO2N8fHRoaXMuJHdyYXAucmVtb3ZlKCk7dGhpcy4kY29udGFpbmVyLnJlbW92ZURhdGEoXCJiYWNrc3RyZXRjaFwiKX19O3ZhciBsLGY9bmF2aWdhdG9yLnVzZXJBZ2VudCxtPW5hdmlnYXRvci5wbGF0Zm9ybSxlPWYubWF0Y2goL0FwcGxlV2ViS2l0XFwvKFswLTldKykvKSxlPSEhZSYmZVsxXSxoPWYubWF0Y2goL0Zlbm5lY1xcLyhbMC05XSspLyksaD0hIWgmJmhbMV0sbj1mLm1hdGNoKC9PcGVyYSBNb2JpXFwvKFswLTldKykvKSx0PSEhbiYmblsxXSxrPWYubWF0Y2goL01TSUUgKFswLTldKykvKSxrPSEhayYma1sxXTtsPSEoKC0xPG0uaW5kZXhPZihcImlQaG9uZVwiKXx8LTE8bS5pbmRleE9mKFwiaVBhZFwiKXx8LTE8bS5pbmRleE9mKFwiaVBvZFwiKSkmJmUmJjUzND5lfHxkLm9wZXJhbWluaSYmXCJbb2JqZWN0IE9wZXJhTWluaV1cIj09PXt9LnRvU3RyaW5nLmNhbGwoZC5vcGVyYW1pbmkpfHxuJiY3NDU4PnR8fC0xPGYuaW5kZXhPZihcIkFuZHJvaWRcIikmJmUmJjUzMz5lfHxoJiY2Pmh8fFwicGFsbUdldFJlc291cmNlXCJpbiBkJiZlJiY1MzQ+ZXx8LTE8Zi5pbmRleE9mKFwiTWVlR29cIikmJi0xPGYuaW5kZXhPZihcIk5va2lhQnJvd3Nlci84LjUuMFwiKXx8ayYmNj49ayl9KShqUXVlcnksd2luZG93KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAkLmZuLmNpcmNsaWZ1bCA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xuXG4gICAgICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcbiAgICAgICAgICAgIC8vIFRoZXNlIGFyZSB0aGUgZGVmYXVsdHMuXG4gICAgICAgICAgICBzdGFydGRlZ3JlZTogMCxcbiAgICAgICAgICAgIGZnY29sb3I6IFwiIzU1NmIyZlwiLFxuICAgICAgICAgICAgYmdjb2xvcjogXCIjZWVlXCIsXG4gICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgIHdpZHRoOiAxNSxcbiAgICAgICAgICAgIGRpbWVuc2lvbjogMjAwLFxuICAgICAgICAgICAgZm9udHNpemU6IDE1LFxuICAgICAgICAgICAgcGVyY2VudDogNTAsXG4gICAgICAgICAgICBhbmltYXRpb25zdGVwOiAxLjAsXG4gICAgICAgICAgICBpY29uc2l6ZTogJzIwcHgnLFxuICAgICAgICAgICAgaWNvbmNvbG9yOiAnIzk5OScsXG4gICAgICAgICAgICBib3JkZXI6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBudWxsLFxuICAgICAgICAgICAgYm9yZGVyc2l6ZTogMTBcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBjdXN0b21TZXR0aW5ncyA9IFtcImZnY29sb3JcIiwgXCJiZ2NvbG9yXCIsIFwiZmlsbFwiLCBcIndpZHRoXCIsIFwiZGltZW5zaW9uXCIsIFwiZm9udHNpemVcIiwgXCJhbmltYXRpb25zdGVwXCIsIFwiZW5kUGVyY2VudFwiLCBcImljb25cIiwgXCJpY29uY29sb3JcIiwgXCJpY29uc2l6ZVwiLCBcImJvcmRlclwiLCBcInN0YXJ0ZGVncmVlXCIsIFwiYm9yZGVyc2l6ZVwiXTtcblxuICAgICAgICAgICAgdmFyIGN1c3RvbVNldHRpbmdzT2JqID0ge307XG4gICAgICAgICAgICB2YXIgaWNvbiA9ICcnO1xuICAgICAgICAgICAgdmFyIHBlcmNlbnQ7XG4gICAgICAgICAgICB2YXIgZW5kUGVyY2VudCA9IDA7XG4gICAgICAgICAgICB2YXIgb2JqID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBmaWxsID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgdGV4dCwgaW5mbztcblxuICAgICAgICAgICAgb2JqLmFkZENsYXNzKCdjaXJjbGlmdWwnKTtcblxuICAgICAgICAgICAgY2hlY2tEYXRhQXR0cmlidXRlcyhvYmopO1xuXG4gICAgICAgICAgICBpZiAob2JqLmRhdGEoJ3RleHQnKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gb2JqLmRhdGEoJ3RleHQnKTtcblxuICAgICAgICAgICAgICAgIGlmIChvYmouZGF0YSgnaWNvbicpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpY29uID0gJCgnPGk+PC9pPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhICcgKyAkKHRoaXMpLmRhdGEoJ2ljb24nKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb2xvcic6IGN1c3RvbVNldHRpbmdzT2JqLmljb25jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogY3VzdG9tU2V0dGluZ3NPYmouaWNvbnNpemVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvYmouZGF0YSgndHlwZScpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gJCh0aGlzKS5kYXRhKCd0eXBlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ2hhbGYnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDaXJjbGVUZXh0KG9iaiwgJ2NpcmNsZS10ZXh0LWhhbGYnLCAoY3VzdG9tU2V0dGluZ3NPYmouZGltZW5zaW9uIC8gMS40NSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2lyY2xlVGV4dChvYmosICdjaXJjbGUtdGV4dCcsIGN1c3RvbVNldHRpbmdzT2JqLmRpbWVuc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhZGRDaXJjbGVUZXh0KG9iaiwgJ2NpcmNsZS10ZXh0JywgY3VzdG9tU2V0dGluZ3NPYmouZGltZW5zaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoXCJ0b3RhbFwiKSAhPSB1bmRlZmluZWQgJiYgJCh0aGlzKS5kYXRhKFwicGFydFwiKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWwgPSAkKHRoaXMpLmRhdGEoXCJ0b3RhbFwiKSAvIDEwMDtcblxuICAgICAgICAgICAgICAgIHBlcmNlbnQgPSAoKCQodGhpcykuZGF0YShcInBhcnRcIikgLyB0b3RhbCkgLyAxMDApLnRvRml4ZWQoMyk7XG4gICAgICAgICAgICAgICAgZW5kUGVyY2VudCA9ICgkKHRoaXMpLmRhdGEoXCJwYXJ0XCIpIC8gdG90YWwpLnRvRml4ZWQoMyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoXCJwZXJjZW50XCIpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwZXJjZW50ID0gJCh0aGlzKS5kYXRhKFwicGVyY2VudFwiKSAvIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgZW5kUGVyY2VudCA9ICQodGhpcykuZGF0YShcInBlcmNlbnRcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA9IHNldHRpbmdzLnBlcmNlbnQgLyAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5kYXRhKCdpbmZvJykgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW5mbyA9ICQodGhpcykuZGF0YSgnaW5mbycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuZGF0YSgndHlwZScpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gJCh0aGlzKS5kYXRhKCd0eXBlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ2hhbGYnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJbmZvVGV4dChvYmosIDAuOSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJbmZvVGV4dChvYmosIDEuMjUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkSW5mb1RleHQob2JqLCAxLjI1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQodGhpcykud2lkdGgoY3VzdG9tU2V0dGluZ3NPYmouZGltZW5zaW9uICsgJ3B4Jyk7XG5cbiAgICAgICAgICAgIHZhciBzaXplID0gY3VzdG9tU2V0dGluZ3NPYmouZGltZW5zaW9uLFxuICAgICAgICAgICAgICAgIGNhbnZhcyA9ICQoJzxjYW52YXM+PC9jYW52YXM+JykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzaXplLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNpemVcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmRUbygkKHRoaXMpKS5nZXQoMCk7XG5cbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgIHZhciBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgICAgIGlmICggZHByICkge1xuICAgICAgICAgICAgICAgIHZhciAkY2FudmFzID0gJChjYW52YXMpO1xuICAgICAgICAgICAgICAgICRjYW52YXMuY3NzKCd3aWR0aCcsIHNpemUpO1xuICAgICAgICAgICAgICAgICRjYW52YXMuY3NzKCdoZWlnaHQnLCBzaXplKTtcbiAgICAgICAgICAgICAgICAkY2FudmFzLmF0dHIoJ3dpZHRoJywgc2l6ZSAqIGRwcik7XG4gICAgICAgICAgICAgICAgJGNhbnZhcy5hdHRyKCdoZWlnaHQnLCBzaXplICogZHByKTtcblxuICAgICAgICAgICAgICAgIGNvbnRleHQuc2NhbGUoZHByLCBkcHIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJChjYW52YXMpLnBhcmVudCgpO1xuICAgICAgICAgICAgdmFyIHggPSBzaXplIC8gMjtcbiAgICAgICAgICAgIHZhciB5ID0gc2l6ZSAvIDI7XG4gICAgICAgICAgICB2YXIgZGVncmVlcyA9IGN1c3RvbVNldHRpbmdzT2JqLnBlcmNlbnQgKiAzNjAuMDtcbiAgICAgICAgICAgIHZhciByYWRpYW5zID0gZGVncmVlcyAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgICAgIHZhciByYWRpdXMgPSBzaXplIC8gMi41O1xuICAgICAgICAgICAgdmFyIHN0YXJ0QW5nbGUgPSAyLjMgKiBNYXRoLlBJO1xuICAgICAgICAgICAgdmFyIGVuZEFuZ2xlID0gMDtcbiAgICAgICAgICAgIHZhciBjb3VudGVyQ2xvY2t3aXNlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgY3VyUGVyYyA9IGN1c3RvbVNldHRpbmdzT2JqLmFuaW1hdGlvbnN0ZXAgPT09IDAuMCA/IGVuZFBlcmNlbnQgOiAwLjA7XG4gICAgICAgICAgICB2YXIgY3VyU3RlcCA9IE1hdGgubWF4KGN1c3RvbVNldHRpbmdzT2JqLmFuaW1hdGlvbnN0ZXAsIDAuMCk7XG4gICAgICAgICAgICB2YXIgY2lyYyA9IE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgdmFyIHF1YXJ0ID0gTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICB2YXIgdHlwZSA9ICcnO1xuICAgICAgICAgICAgdmFyIGZpcmVDYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICB2YXIgYWRkaXRpb25hbEFuZ2VsUEkgPSAoY3VzdG9tU2V0dGluZ3NPYmouc3RhcnRkZWdyZWUgLyAxODApICogTWF0aC5QSTtcblxuICAgICAgICAgICAgaWYgKCQodGhpcykuZGF0YSgndHlwZScpICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAkKHRoaXMpLmRhdGEoJ3R5cGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09ICdoYWxmJykge1xuICAgICAgICAgICAgICAgICAgICBzdGFydEFuZ2xlID0gMi4wICogTWF0aC5QSTtcbiAgICAgICAgICAgICAgICAgICAgZW5kQW5nbGUgPSAzLjEzO1xuICAgICAgICAgICAgICAgICAgICBjaXJjID0gTWF0aC5QSTtcbiAgICAgICAgICAgICAgICAgICAgcXVhcnQgPSBNYXRoLlBJIC8gMC45OTY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5kYXRhKCd0eXBlJykgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9ICQodGhpcykuZGF0YSgndHlwZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ2FuZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICBzdGFydEFuZ2xlID0gMi4yNSAqIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgIGVuZEFuZ2xlID0gMi40O1xuICAgICAgICAgICAgICAgICAgICBjaXJjID0gMS41MyArIE1hdGguUEk7XG4gICAgICAgICAgICAgICAgICAgIHF1YXJ0ID0gMC43MyArIE1hdGguUEkgLyAwLjk5NjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogYWRkcyB0ZXh0IHRvIGNpcmNsZVxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwYXJhbSBvYmpcbiAgICAgICAgICAgICAqIEBwYXJhbSBjc3NDbGFzc1xuICAgICAgICAgICAgICogQHBhcmFtIGxpbmVIZWlnaHRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gYWRkQ2lyY2xlVGV4dChvYmosIGNzc0NsYXNzLCBsaW5lSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgJChcIjxzcGFuPjwvc3Bhbj5cIilcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKG9iailcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGNzc0NsYXNzKVxuICAgICAgICAgICAgICAgICAgICAuaHRtbCh0ZXh0KVxuICAgICAgICAgICAgICAgICAgICAucHJlcGVuZChpY29uKVxuICAgICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6IGxpbmVIZWlnaHQgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6IGN1c3RvbVNldHRpbmdzT2JqLmZvbnRzaXplICsgJ3B4J1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBhZGRzIGluZm8gdGV4dCB0byBjaXJjbGVcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0gb2JqXG4gICAgICAgICAgICAgKiBAcGFyYW0gZmFjdG9yXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZEluZm9UZXh0KG9iaiwgZmFjdG9yKSB7XG4gICAgICAgICAgICAgICAgJCgnPHNwYW4+PC9zcGFuPicpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhvYmopXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnY2lyY2xlLWluZm8taGFsZicpXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnLCAoY3VzdG9tU2V0dGluZ3NPYmouZGltZW5zaW9uICogZmFjdG9yKSArICdweCdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChpbmZvKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBjaGVja3Mgd2hpY2ggZGF0YSBhdHRyaWJ1dGVzIGFyZSBkZWZpbmVkXG4gICAgICAgICAgICAgKiBAcGFyYW0gb2JqXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrRGF0YUF0dHJpYnV0ZXMob2JqKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGN1c3RvbVNldHRpbmdzLCBmdW5jdGlvbiAoaW5kZXgsIGF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmRhdGEoYXR0cmlidXRlKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVNldHRpbmdzT2JqW2F0dHJpYnV0ZV0gPSBvYmouZGF0YShhdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tU2V0dGluZ3NPYmpbYXR0cmlidXRlXSA9ICQoc2V0dGluZ3MpLmF0dHIoYXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyaWJ1dGUgPT0gJ2ZpbGwnICYmIG9iai5kYXRhKCdmaWxsJykgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGFuaW1hdGUgZm9yZWdyb3VuZCBjaXJjbGVcbiAgICAgICAgICAgICAqIEBwYXJhbSBjdXJyZW50XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFuaW1hdGUoY3VycmVudCkge1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5hcmMoeCwgeSwgcmFkaXVzLCBlbmRBbmdsZSwgc3RhcnRBbmdsZSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBjdXN0b21TZXR0aW5nc09iai53aWR0aCArIDE7XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY3VzdG9tU2V0dGluZ3NPYmouYmdjb2xvcjtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjdXN0b21TZXR0aW5nc09iai5maWxsO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYXJjKHgsIHksIHJhZGl1cywgLShxdWFydCkgKyBhZGRpdGlvbmFsQW5nZWxQSSwgKChjaXJjKSAqIGN1cnJlbnQpIC0gcXVhcnQgKyBhZGRpdGlvbmFsQW5nZWxQSSwgZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbVNldHRpbmdzT2JqLmJvcmRlciA9PSAnb3V0bGluZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBjdXN0b21TZXR0aW5nc09iai53aWR0aCArIGN1c3RvbVNldHRpbmdzT2JqLmJvcmRlcnNpemU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXN0b21TZXR0aW5nc09iai5ib3JkZXIgPT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBjdXN0b21TZXR0aW5nc09iai53aWR0aCAtIGN1c3RvbVNldHRpbmdzT2JqLmJvcmRlcnNpemU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGN1c3RvbVNldHRpbmdzT2JqLmZnY29sb3I7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcblxuICAgICAgICAgICAgICAgIGlmIChjdXJQZXJjIDwgZW5kUGVyY2VudCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJQZXJjICs9IGN1clN0ZXA7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlKE1hdGgubWluKGN1clBlcmMsIGVuZFBlcmNlbnQpIC8gMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgb2JqKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VyUGVyYyA9PSBlbmRQZXJjZW50ICYmIGZpcmVDYWxsYmFjayAmJiB0eXBlb2Yob3B0aW9ucykgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKG9wdGlvbnMuY29tcGxldGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbXBsZXRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVDYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhbmltYXRlKGN1clBlcmMgLyAxMDApO1xuXG4gICAgICAgIH0pO1xuICAgIH07XG59KGpRdWVyeSkpOyIsIi8qIVxuICogTGF6eSBMb2FkIC0galF1ZXJ5IHBsdWdpbiBmb3IgbGF6eSBsb2FkaW5nIGltYWdlc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAwNy0yMDE1IE1pa2EgVHV1cG9sYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqICAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqXG4gKiBQcm9qZWN0IGhvbWU6XG4gKiAgIGh0dHA6Ly93d3cuYXBwZWxzaWluaS5uZXQvcHJvamVjdHMvbGF6eWxvYWRcbiAqXG4gKiBWZXJzaW9uOiAgMS45LjVcbiAqXG4gKi9cblxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuXG4gICAgJC5mbi5sYXp5bG9hZCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gdGhpcztcbiAgICAgICAgdmFyICRjb250YWluZXI7XG4gICAgICAgIHZhciBzZXR0aW5ncyA9IHtcbiAgICAgICAgICAgIHRocmVzaG9sZCAgICAgICA6IDAsXG4gICAgICAgICAgICBmYWlsdXJlX2xpbWl0ICAgOiAwLFxuICAgICAgICAgICAgZXZlbnQgICAgICAgICAgIDogXCJzY3JvbGxcIixcbiAgICAgICAgICAgIGVmZmVjdCAgICAgICAgICA6IFwic2hvd1wiLFxuICAgICAgICAgICAgY29udGFpbmVyICAgICAgIDogd2luZG93LFxuICAgICAgICAgICAgZGF0YV9hdHRyaWJ1dGUgIDogXCJvcmlnaW5hbFwiLFxuICAgICAgICAgICAgc2tpcF9pbnZpc2libGUgIDogZmFsc2UsXG4gICAgICAgICAgICBhcHBlYXIgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgbG9hZCAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyICAgICA6IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBRUFBQUFCQ0FZQUFBQWZGY1NKQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQURzUUFBQTdFQVpVckRoc0FBQUFOU1VSQlZCaFhZemg4K1BCL0FBZmZBMG5OUHVDTEFBQUFBRWxGVGtTdVFtQ0NcIlxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgICAgICAgZWxlbWVudHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5za2lwX2ludmlzaWJsZSAmJiAhJHRoaXMuaXMoXCI6dmlzaWJsZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgkLmFib3ZldGhldG9wKHRoaXMsIHNldHRpbmdzKSB8fFxuICAgICAgICAgICAgICAgICAgICAkLmxlZnRvZmJlZ2luKHRoaXMsIHNldHRpbmdzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogTm90aGluZy4gKi9cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCEkLmJlbG93dGhlZm9sZCh0aGlzLCBzZXR0aW5ncykgJiZcbiAgICAgICAgICAgICAgICAgICAgISQucmlnaHRvZmZvbGQodGhpcywgc2V0dGluZ3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy50cmlnZ2VyKFwiYXBwZWFyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogaWYgd2UgZm91bmQgYW4gaW1hZ2Ugd2UnbGwgbG9hZCwgcmVzZXQgdGhlIGNvdW50ZXIgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgrK2NvdW50ZXIgPiBzZXR0aW5ncy5mYWlsdXJlX2xpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0aW9ucykge1xuICAgICAgICAgICAgLyogTWFpbnRhaW4gQkMgZm9yIGEgY291cGxlIG9mIHZlcnNpb25zLiAqL1xuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gb3B0aW9ucy5mYWlsdXJlbGltaXQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZhaWx1cmVfbGltaXQgPSBvcHRpb25zLmZhaWx1cmVsaW1pdDtcbiAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5mYWlsdXJlbGltaXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBvcHRpb25zLmVmZmVjdHNwZWVkKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5lZmZlY3Rfc3BlZWQgPSBvcHRpb25zLmVmZmVjdHNwZWVkO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmVmZmVjdHNwZWVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkLmV4dGVuZChzZXR0aW5ncywgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDYWNoZSBjb250YWluZXIgYXMgalF1ZXJ5IGFzIG9iamVjdC4gKi9cbiAgICAgICAgJGNvbnRhaW5lciA9IChzZXR0aW5ncy5jb250YWluZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmNvbnRhaW5lciA9PT0gd2luZG93KSA/ICR3aW5kb3cgOiAkKHNldHRpbmdzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgLyogRmlyZSBvbmUgc2Nyb2xsIGV2ZW50IHBlciBzY3JvbGwuIE5vdCBvbmUgc2Nyb2xsIGV2ZW50IHBlciBpbWFnZS4gKi9cbiAgICAgICAgaWYgKDAgPT09IHNldHRpbmdzLmV2ZW50LmluZGV4T2YoXCJzY3JvbGxcIikpIHtcbiAgICAgICAgICAgICRjb250YWluZXIuYmluZChzZXR0aW5ncy5ldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgJHNlbGYgPSAkKHNlbGYpO1xuXG4gICAgICAgICAgICBzZWxmLmxvYWRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvKiBJZiBubyBzcmMgYXR0cmlidXRlIGdpdmVuIHVzZSBkYXRhOnVyaS4gKi9cbiAgICAgICAgICAgIGlmICgkc2VsZi5hdHRyKFwic3JjXCIpID09PSB1bmRlZmluZWQgfHwgJHNlbGYuYXR0cihcInNyY1wiKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGYuaXMoXCJpbWdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNlbGYuYXR0cihcInNyY1wiLCBzZXR0aW5ncy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKiBXaGVuIGFwcGVhciBpcyB0cmlnZ2VyZWQgbG9hZCBvcmlnaW5hbCBpbWFnZS4gKi9cbiAgICAgICAgICAgICRzZWxmLm9uZShcImFwcGVhclwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5hcHBlYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50c19sZWZ0ID0gZWxlbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYXBwZWFyLmNhbGwoc2VsZiwgZWxlbWVudHNfbGVmdCwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICQoXCI8aW1nIC8+XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYmluZChcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZ2luYWwgPSAkc2VsZi5hdHRyKFwiZGF0YS1cIiArIHNldHRpbmdzLmRhdGFfYXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2VsZi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRzZWxmLmlzKFwiaW1nXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZWxmLmF0dHIoXCJzcmNcIiwgb3JpZ2luYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZWxmLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgXCJ1cmwoJ1wiICsgb3JpZ2luYWwgKyBcIicpXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2VsZltzZXR0aW5ncy5lZmZlY3RdKHNldHRpbmdzLmVmZmVjdF9zcGVlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYWRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBSZW1vdmUgaW1hZ2UgZnJvbSBhcnJheSBzbyBpdCBpcyBub3QgbG9vcGVkIG5leHQgdGltZS4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcCA9ICQuZ3JlcChlbGVtZW50cywgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWVsZW1lbnQubG9hZGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gJCh0ZW1wKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5sb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50c19sZWZ0ID0gZWxlbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5sb2FkLmNhbGwoc2VsZiwgZWxlbWVudHNfbGVmdCwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInNyY1wiLCAkc2VsZi5hdHRyKFwiZGF0YS1cIiArIHNldHRpbmdzLmRhdGFfYXR0cmlidXRlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIFdoZW4gd2FudGVkIGV2ZW50IGlzIHRyaWdnZXJlZCBsb2FkIG9yaWdpbmFsIGltYWdlICovXG4gICAgICAgICAgICAvKiBieSB0cmlnZ2VyaW5nIGFwcGVhci4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKDAgIT09IHNldHRpbmdzLmV2ZW50LmluZGV4T2YoXCJzY3JvbGxcIikpIHtcbiAgICAgICAgICAgICAgICAkc2VsZi5iaW5kKHNldHRpbmdzLmV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxmLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNlbGYudHJpZ2dlcihcImFwcGVhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKiBDaGVjayBpZiBzb21ldGhpbmcgYXBwZWFycyB3aGVuIHdpbmRvdyBpcyByZXNpemVkLiAqL1xuICAgICAgICAkd2luZG93LmJpbmQoXCJyZXNpemVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyogV2l0aCBJT1M1IGZvcmNlIGxvYWRpbmcgaW1hZ2VzIHdoZW4gbmF2aWdhdGluZyB3aXRoIGJhY2sgYnV0dG9uLiAqL1xuICAgICAgICAvKiBOb24gb3B0aW1hbCB3b3JrYXJvdW5kLiAqL1xuICAgICAgICBpZiAoKC8oPzppcGhvbmV8aXBvZHxpcGFkKS4qb3MgNS9naSkudGVzdChuYXZpZ2F0b3IuYXBwVmVyc2lvbikpIHtcbiAgICAgICAgICAgICR3aW5kb3cuYmluZChcInBhZ2VzaG93XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgZXZlbnQub3JpZ2luYWxFdmVudC5wZXJzaXN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlcihcImFwcGVhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBGb3JjZSBpbml0aWFsIGNoZWNrIGlmIGltYWdlcyBzaG91bGQgYXBwZWFyLiAqL1xuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyogQ29udmVuaWVuY2UgbWV0aG9kcyBpbiBqUXVlcnkgbmFtZXNwYWNlLiAgICAgICAgICAgKi9cbiAgICAvKiBVc2UgYXMgICQuYmVsb3d0aGVmb2xkKGVsZW1lbnQsIHt0aHJlc2hvbGQgOiAxMDAsIGNvbnRhaW5lciA6IHdpbmRvd30pICovXG5cbiAgICAkLmJlbG93dGhlZm9sZCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHNldHRpbmdzKSB7XG4gICAgICAgIHZhciBmb2xkO1xuXG4gICAgICAgIGlmIChzZXR0aW5ncy5jb250YWluZXIgPT09IHVuZGVmaW5lZCB8fCBzZXR0aW5ncy5jb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAkd2luZG93LmhlaWdodCgpKSArICR3aW5kb3cuc2Nyb2xsVG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gJChzZXR0aW5ncy5jb250YWluZXIpLm9mZnNldCgpLnRvcCArICQoc2V0dGluZ3MuY29udGFpbmVyKS5oZWlnaHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb2xkIDw9ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wIC0gc2V0dGluZ3MudGhyZXNob2xkO1xuICAgIH07XG5cbiAgICAkLnJpZ2h0b2Zmb2xkID0gZnVuY3Rpb24oZWxlbWVudCwgc2V0dGluZ3MpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLmNvbnRhaW5lciA9PT0gdW5kZWZpbmVkIHx8IHNldHRpbmdzLmNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gJHdpbmRvdy53aWR0aCgpICsgJHdpbmRvdy5zY3JvbGxMZWZ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gJChzZXR0aW5ncy5jb250YWluZXIpLm9mZnNldCgpLmxlZnQgKyAkKHNldHRpbmdzLmNvbnRhaW5lcikud2lkdGgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb2xkIDw9ICQoZWxlbWVudCkub2Zmc2V0KCkubGVmdCAtIHNldHRpbmdzLnRocmVzaG9sZDtcbiAgICB9O1xuXG4gICAgJC5hYm92ZXRoZXRvcCA9IGZ1bmN0aW9uKGVsZW1lbnQsIHNldHRpbmdzKSB7XG4gICAgICAgIHZhciBmb2xkO1xuXG4gICAgICAgIGlmIChzZXR0aW5ncy5jb250YWluZXIgPT09IHVuZGVmaW5lZCB8fCBzZXR0aW5ncy5jb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9ICR3aW5kb3cuc2Nyb2xsVG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gJChzZXR0aW5ncy5jb250YWluZXIpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb2xkID49ICQoZWxlbWVudCkub2Zmc2V0KCkudG9wICsgc2V0dGluZ3MudGhyZXNob2xkICArICQoZWxlbWVudCkuaGVpZ2h0KCk7XG4gICAgfTtcblxuICAgICQubGVmdG9mYmVnaW4gPSBmdW5jdGlvbihlbGVtZW50LCBzZXR0aW5ncykge1xuICAgICAgICB2YXIgZm9sZDtcblxuICAgICAgICBpZiAoc2V0dGluZ3MuY29udGFpbmVyID09PSB1bmRlZmluZWQgfHwgc2V0dGluZ3MuY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSAkd2luZG93LnNjcm9sbExlZnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSAkKHNldHRpbmdzLmNvbnRhaW5lcikub2Zmc2V0KCkubGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb2xkID49ICQoZWxlbWVudCkub2Zmc2V0KCkubGVmdCArIHNldHRpbmdzLnRocmVzaG9sZCArICQoZWxlbWVudCkud2lkdGgoKTtcbiAgICB9O1xuXG4gICAgJC5pbnZpZXdwb3J0ID0gZnVuY3Rpb24oZWxlbWVudCwgc2V0dGluZ3MpIHtcbiAgICAgICAgIHJldHVybiAhJC5yaWdodG9mZm9sZChlbGVtZW50LCBzZXR0aW5ncykgJiYgISQubGVmdG9mYmVnaW4oZWxlbWVudCwgc2V0dGluZ3MpICYmXG4gICAgICAgICAgICAgICAgISQuYmVsb3d0aGVmb2xkKGVsZW1lbnQsIHNldHRpbmdzKSAmJiAhJC5hYm92ZXRoZXRvcChlbGVtZW50LCBzZXR0aW5ncyk7XG4gICAgIH07XG5cbiAgICAvKiBDdXN0b20gc2VsZWN0b3JzIGZvciB5b3VyIGNvbnZlbmllbmNlLiAgICovXG4gICAgLyogVXNlIGFzICQoXCJpbWc6YmVsb3ctdGhlLWZvbGRcIikuc29tZXRoaW5nKCkgb3IgKi9cbiAgICAvKiAkKFwiaW1nXCIpLmZpbHRlcihcIjpiZWxvdy10aGUtZm9sZFwiKS5zb21ldGhpbmcoKSB3aGljaCBpcyBmYXN0ZXIgKi9cblxuICAgICQuZXh0ZW5kKCQuZXhwcltcIjpcIl0sIHtcbiAgICAgICAgXCJiZWxvdy10aGUtZm9sZFwiIDogZnVuY3Rpb24oYSkgeyByZXR1cm4gJC5iZWxvd3RoZWZvbGQoYSwge3RocmVzaG9sZCA6IDB9KTsgfSxcbiAgICAgICAgXCJhYm92ZS10aGUtdG9wXCIgIDogZnVuY3Rpb24oYSkgeyByZXR1cm4gISQuYmVsb3d0aGVmb2xkKGEsIHt0aHJlc2hvbGQgOiAwfSk7IH0sXG4gICAgICAgIFwicmlnaHQtb2Ytc2NyZWVuXCI6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuICQucmlnaHRvZmZvbGQoYSwge3RocmVzaG9sZCA6IDB9KTsgfSxcbiAgICAgICAgXCJsZWZ0LW9mLXNjcmVlblwiIDogZnVuY3Rpb24oYSkgeyByZXR1cm4gISQucmlnaHRvZmZvbGQoYSwge3RocmVzaG9sZCA6IDB9KTsgfSxcbiAgICAgICAgXCJpbi12aWV3cG9ydFwiICAgIDogZnVuY3Rpb24oYSkgeyByZXR1cm4gJC5pbnZpZXdwb3J0KGEsIHt0aHJlc2hvbGQgOiAwfSk7IH0sXG4gICAgICAgIC8qIE1haW50YWluIEJDIGZvciBjb3VwbGUgb2YgdmVyc2lvbnMuICovXG4gICAgICAgIFwiYWJvdmUtdGhlLWZvbGRcIiA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuICEkLmJlbG93dGhlZm9sZChhLCB7dGhyZXNob2xkIDogMH0pOyB9LFxuICAgICAgICBcInJpZ2h0LW9mLWZvbGRcIiAgOiBmdW5jdGlvbihhKSB7IHJldHVybiAkLnJpZ2h0b2Zmb2xkKGEsIHt0aHJlc2hvbGQgOiAwfSk7IH0sXG4gICAgICAgIFwibGVmdC1vZi1mb2xkXCIgICA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuICEkLnJpZ2h0b2Zmb2xkKGEsIHt0aHJlc2hvbGQgOiAwfSk7IH1cbiAgICB9KTtcblxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTsiLCIvKiFcbiAqIGpRdWVyeSBTY3JvbGxzcHkgUGx1Z2luXG4gKiBBdXRob3I6IEBzeGFsZXhhbmRlclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgICAkLmZuLmV4dGVuZCh7XG4gICAgICBzY3JvbGxzcHk6IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgXG4gICAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAwLFxuICAgICAgICAgICAgbW9kZTogJ3ZlcnRpY2FsJyxcbiAgICAgICAgICAgIG5hbWVzcGFjZTogJ3Njcm9sbHNweScsXG4gICAgICAgICAgICBidWZmZXI6IDAsXG4gICAgICAgICAgICBjb250YWluZXI6IHdpbmRvdyxcbiAgICAgICAgICAgIG9uRW50ZXI6IG9wdGlvbnMub25FbnRlciA/IG9wdGlvbnMub25FbnRlciA6IFtdLFxuICAgICAgICAgICAgb25MZWF2ZTogb3B0aW9ucy5vbkxlYXZlID8gb3B0aW9ucy5vbkxlYXZlIDogW10sXG4gICAgICAgICAgICBvblRpY2s6IG9wdGlvbnMub25UaWNrID8gb3B0aW9ucy5vblRpY2sgOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGkpIHtcblxuICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XG4gICAgICAgICAgICAgIHZhciBvID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgdmFyICRjb250YWluZXIgPSAkKG8uY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgdmFyIG1vZGUgPSBvLm1vZGU7XG4gICAgICAgICAgICAgIHZhciBidWZmZXIgPSBvLmJ1ZmZlcjtcbiAgICAgICAgICAgICAgdmFyIGVudGVycyA9IGxlYXZlcyA9IDA7XG4gICAgICAgICAgICAgIHZhciBpbnNpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLyogYWRkIGxpc3RlbmVyIHRvIGNvbnRhaW5lciAqL1xuICAgICAgICAgICAgICAkY29udGFpbmVyLmJpbmQoJ3Njcm9sbC4nICsgby5uYW1lc3BhY2UsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0ge3RvcDogJCh0aGlzKS5zY3JvbGxUb3AoKSwgbGVmdDogJCh0aGlzKS5zY3JvbGxMZWZ0KCl9O1xuICAgICAgICAgICAgICAgICAgdmFyIHh5ID0gKG1vZGUgPT0gJ3ZlcnRpY2FsJykgPyBwb3NpdGlvbi50b3AgKyBidWZmZXIgOiBwb3NpdGlvbi5sZWZ0ICsgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgdmFyIG1heCA9IG8ubWF4O1xuICAgICAgICAgICAgICAgICAgdmFyIG1pbiA9IG8ubWluO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvKiBmaXggbWF4ICovXG4gICAgICAgICAgICAgICAgICBpZigkLmlzRnVuY3Rpb24oby5tYXgpKXtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gby5tYXgoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgLyogZml4IG1heCAqL1xuICAgICAgICAgICAgICAgICAgaWYoJC5pc0Z1bmN0aW9uKG8ubWluKSl7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IG8ubWluKCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmKG1heCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICBtYXggPSAobW9kZSA9PSAndmVydGljYWwnKSA/ICRjb250YWluZXIuaGVpZ2h0KCkgOiAkY29udGFpbmVyLm91dGVyV2lkdGgoKSArICQoZWxlbWVudCkub3V0ZXJXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvKiBpZiB3ZSBoYXZlIHJlYWNoZWQgdGhlIG1pbmltdW0gYm91bmQgYnV0IGFyZSBiZWxvdyB0aGUgbWF4IC4uLiAqL1xuICAgICAgICAgICAgICAgICAgaWYoeHkgPj0gbWluICYmIHh5IDw9IG1heCl7XG4gICAgICAgICAgICAgICAgICAgIC8qIHRyaWdnZXIgZW50ZXIgZXZlbnQgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYoIWluc2lkZSl7XG4gICAgICAgICAgICAgICAgICAgICAgIGluc2lkZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgIGVudGVycysrO1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgLyogZmlyZSBlbnRlciBldmVudCAqL1xuICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnRyaWdnZXIoJ3Njcm9sbEVudGVyJywge3Bvc2l0aW9uOiBwb3NpdGlvbn0pXG4gICAgICAgICAgICAgICAgICAgICAgIGlmKCQuaXNGdW5jdGlvbihvLm9uRW50ZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBvLm9uRW50ZXIoZWxlbWVudCwgcG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIC8qIHRyaWdnZXIgdGljayBldmVudCAqL1xuICAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS50cmlnZ2VyKCdzY3JvbGxUaWNrJywge3Bvc2l0aW9uOiBwb3NpdGlvbiwgaW5zaWRlOiBpbnNpZGUsIGVudGVyczogZW50ZXJzLCBsZWF2ZXM6IGxlYXZlc30pXG4gICAgICAgICAgICAgICAgICAgICBpZigkLmlzRnVuY3Rpb24oby5vblRpY2spKXtcbiAgICAgICAgICAgICAgICAgICAgICAgby5vblRpY2soZWxlbWVudCwgcG9zaXRpb24sIGluc2lkZSwgZW50ZXJzLCBsZWF2ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihpbnNpZGUpe1xuICAgICAgICAgICAgICAgICAgICAgIGluc2lkZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIGxlYXZlcysrO1xuICAgICAgICAgICAgICAgICAgICAgIC8qIHRyaWdnZXIgbGVhdmUgZXZlbnQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnRyaWdnZXIoJ3Njcm9sbExlYXZlJywge3Bvc2l0aW9uOiBwb3NpdGlvbiwgbGVhdmVzOmxlYXZlc30pXG5cbiAgICAgICAgICAgICAgICAgICAgICBpZigkLmlzRnVuY3Rpb24oby5vbkxlYXZlKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLm9uTGVhdmUoZWxlbWVudCwgcG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTsgXG5cbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pXG5cbiAgICBcbn0pKCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApOyJdfQ==
