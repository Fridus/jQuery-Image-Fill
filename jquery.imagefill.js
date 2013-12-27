/*global jQuery*/
/* jquery.imagefill
 *
 * Version 0.1 by Florent Detry
 *
 * Extends jQuery <http://jquery.com>
 *
 */
(function($) {
  'use strict';
  $.fn.imagefill = function(_options) {
    var options = $.extend({
      background: null,
      offsetx: 0,
      offsety: 0
    }, _options, true);

    var isLoaded = function(img) {
      return img.complete;
    };

    var _fill = function($img) {
      var width = $img.width(),
        height = $img.height(),
        parentWidth = $img.parent().width(),
        parentHeight = $img.parent().height();

      if( width >= height ) {
        $img.css('max-height', '100%');
        $img.css('max-width', 'none');
        $img.css('margin', '0 0 0 ' + -parseInt(((((width/height)*parentHeight)-parentWidth)/2)+options.offsetx, 10) + 'px');
      }
      else if(width < height ) {
        $img.css('max-width', '100%');
        $img.css('max-height', 'none');
        $img.css('margin', -parseInt(((((height/width)*parentWidth)-parentHeight)/2)+options.offsety, 10) + 'px 0 0 0');
      }
    };

    var fill = function(img) {
      var $img = $(img);

      if( isLoaded(img) ) {
        _fill($img);
      }
      else {
        $img.load(function() {
          _fill($img);
        });
      }
    };

    this.each(function(){
      var container = this,
        $imgs = $('img', container).not($('table img')),
        $containerNotImg = $(container).not('img');
      $containerNotImg.scrollLeft(0).scrollTop(0).css('overflow', 'hidden');
      if(options.background) {
        $containerNotImg.css('background', options.background);
      }
      $imgs.each(function(){
        fill(this);
      });
    });
    return this;
  };
})(jQuery);