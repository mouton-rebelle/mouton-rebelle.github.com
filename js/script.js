(function() {

  $(document).ready(function() {
    var filterPath, locationPath, scrollElem, scrollableElement;
    $('#me').scrollspy({
      min: 0,
      max: $('#me').outerHeight(),
      onEnter: function(element, position) {
        return $('body').removeClass('corner');
      },
      onLeave: function(element, position) {
        return $('body').addClass('corner');
      }
    });
    $('.bloc').each(function() {
      var position;
      position = $(this).position();
      $(this).scrollspy({
        min: position.top,
        max: position.top + $(this).outerHeight(),
        onEnter: function(element, position) {
          $('[href=#' + element.id + ']').addClass('on');
          return $('body').addClass('corner');
        },
        onLeave: function(element, position) {
          return $('[href=#' + element.id + ']').removeClass('on');
        }
      });
      return $('body').trigger('scroll');
    });
    filterPath = function(string) {
      return string.replace(/^\//, "").replace(/(index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "");
    };
    scrollableElement = function(els) {
      var $scrollElement, argLength, el, i, isScrollable;
      i = 0;
      argLength = arguments.length;
      while (i < argLength) {
        el = arguments[i];
        $scrollElement = $(el);
        if ($scrollElement.scrollTop() > 0) {
          return el;
        } else {
          $scrollElement.scrollTop(1);
          isScrollable = $scrollElement.scrollTop() > 0;
          $scrollElement.scrollTop(0);
          if (isScrollable) return el;
        }
        i++;
      }
      return [];
    };
    locationPath = filterPath(location.pathname);
    scrollElem = scrollableElement("html", "body");
    return $("a[href*=#]").each(function() {
      var $target, target, targetOffset, thisPath;
      thisPath = filterPath(this.pathname) || locationPath;
      if (locationPath === thisPath && (location.hostname === this.hostname || !this.hostname) && this.hash.replace(/#/, "")) {
        $target = $(this.hash);
        target = this.hash;
        if (target) {
          targetOffset = $target.offset().top;
          return $(this).click(function(event) {
            event.preventDefault();
            return $(scrollElem).animate({
              scrollTop: targetOffset
            }, 400, function() {
              return location.hash = target;
            });
          });
        }
      }
    });
  });

}).call(this);
