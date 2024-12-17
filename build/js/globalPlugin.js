"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
* simplePagination.js v1.6
* A simple jQuery pagination plugin.
* http://flaviusmatis.github.com/simplePagination.js/
*
* Copyright 2012, Flavius Matis
* Released under the MIT license.
* http://flaviusmatis.github.com/license.html
*/

(function ($) {
  var methods = {
    init: function init(options) {
      var o = $.extend({
        items: 1,
        itemsOnPage: 1,
        pages: 0,
        displayedPages: 5,
        edges: 2,
        currentPage: 0,
        useAnchors: true,
        hrefTextPrefix: '#page-',
        hrefTextSuffix: '',
        prevText: 'Prev',
        nextText: 'Next',
        ellipseText: '&hellip;',
        ellipsePageSet: true,
        cssStyle: 'light-theme',
        listStyle: '',
        labelMap: [],
        selectOnClick: true,
        nextAtFront: false,
        invertPageOrder: false,
        useStartEdge: true,
        useEndEdge: true,
        onPageClick: function onPageClick(pageNumber, event) {
          // Callback triggered when a page is clicked
          // Page number is given as an optional parameter
        },
        onInit: function onInit() {
          // Callback triggered immediately after initialization
        }
      }, options || {});
      var self = this;
      o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
      if (o.currentPage) o.currentPage = o.currentPage - 1;else o.currentPage = !o.invertPageOrder ? 0 : o.pages - 1;
      o.halfDisplayed = o.displayedPages / 2;
      this.each(function () {
        self.addClass(o.cssStyle + ' simple-pagination').data('pagination', o);
        methods._draw.call(self);
      });
      o.onInit();
      return this;
    },
    selectPage: function selectPage(page) {
      methods._selectPage.call(this, page - 1);
      return this;
    },
    prevPage: function prevPage() {
      var o = this.data('pagination');
      if (!o.invertPageOrder) {
        if (o.currentPage > 0) {
          methods._selectPage.call(this, o.currentPage - 1);
        }
      } else {
        if (o.currentPage < o.pages - 1) {
          methods._selectPage.call(this, o.currentPage + 1);
        }
      }
      return this;
    },
    nextPage: function nextPage() {
      var o = this.data('pagination');
      if (!o.invertPageOrder) {
        if (o.currentPage < o.pages - 1) {
          methods._selectPage.call(this, o.currentPage + 1);
        }
      } else {
        if (o.currentPage > 0) {
          methods._selectPage.call(this, o.currentPage - 1);
        }
      }
      return this;
    },
    getPagesCount: function getPagesCount() {
      return this.data('pagination').pages;
    },
    setPagesCount: function setPagesCount(count) {
      this.data('pagination').pages = count;
    },
    getCurrentPage: function getCurrentPage() {
      return this.data('pagination').currentPage + 1;
    },
    destroy: function destroy() {
      this.empty();
      return this;
    },
    drawPage: function drawPage(page) {
      var o = this.data('pagination');
      o.currentPage = page - 1;
      this.data('pagination', o);
      methods._draw.call(this);
      return this;
    },
    redraw: function redraw() {
      methods._draw.call(this);
      return this;
    },
    disable: function disable() {
      var o = this.data('pagination');
      o.disabled = true;
      this.data('pagination', o);
      methods._draw.call(this);
      return this;
    },
    enable: function enable() {
      var o = this.data('pagination');
      o.disabled = false;
      this.data('pagination', o);
      methods._draw.call(this);
      return this;
    },
    updateItems: function updateItems(newItems) {
      var o = this.data('pagination');
      o.items = newItems;
      o.pages = methods._getPages(o);
      this.data('pagination', o);
      methods._draw.call(this);
    },
    updateItemsOnPage: function updateItemsOnPage(itemsOnPage) {
      var o = this.data('pagination');
      o.itemsOnPage = itemsOnPage;
      o.pages = methods._getPages(o);
      this.data('pagination', o);
      methods._selectPage.call(this, 0);
      return this;
    },
    getItemsOnPage: function getItemsOnPage() {
      return this.data('pagination').itemsOnPage;
    },
    _draw: function _draw() {
      var o = this.data('pagination'),
        interval = methods._getInterval(o),
        i,
        tagName;
      methods.destroy.call(this);
      tagName = typeof this.prop === 'function' ? this.prop('tagName') : this.attr('tagName');
      var $panel = tagName === 'UL' ? this : $('<ul' + (o.listStyle ? ' class="' + o.listStyle + '"' : '') + '></ul>').appendTo(this);

      // Generate Prev link
      if (o.prevText) {
        methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage - 1 : o.currentPage + 1, {
          text: o.prevText,
          classes: 'prev'
        });
      }

      // Generate Next link (if option set for at front)
      if (o.nextText && o.nextAtFront) {
        methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {
          text: o.nextText,
          classes: 'next'
        });
      }

      // Generate start edges
      if (!o.invertPageOrder) {
        if (interval.start > 0 && o.edges > 0) {
          if (o.useStartEdge) {
            var end = Math.min(o.edges, interval.start);
            for (i = 0; i < end; i++) {
              methods._appendItem.call(this, i);
            }
          }
          if (o.edges < interval.start && interval.start - o.edges != 1) {
            $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
          } else if (interval.start - o.edges == 1) {
            methods._appendItem.call(this, o.edges);
          }
        }
      } else {
        if (interval.end < o.pages && o.edges > 0) {
          if (o.useStartEdge) {
            var begin = Math.max(o.pages - o.edges, interval.end);
            for (i = o.pages - 1; i >= begin; i--) {
              methods._appendItem.call(this, i);
            }
          }
          if (o.pages - o.edges > interval.end && o.pages - o.edges - interval.end != 1) {
            $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
          } else if (o.pages - o.edges - interval.end == 1) {
            methods._appendItem.call(this, interval.end);
          }
        }
      }

      // Generate interval links
      if (!o.invertPageOrder) {
        for (i = interval.start; i < interval.end; i++) {
          methods._appendItem.call(this, i);
        }
      } else {
        for (i = interval.end - 1; i >= interval.start; i--) {
          methods._appendItem.call(this, i);
        }
      }

      // Generate end edges
      if (!o.invertPageOrder) {
        if (interval.end < o.pages && o.edges > 0) {
          if (o.pages - o.edges > interval.end && o.pages - o.edges - interval.end != 1) {
            $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
          } else if (o.pages - o.edges - interval.end == 1) {
            methods._appendItem.call(this, interval.end);
          }
          if (o.useEndEdge) {
            var begin = Math.max(o.pages - o.edges, interval.end);
            for (i = begin; i < o.pages; i++) {
              methods._appendItem.call(this, i);
            }
          }
        }
      } else {
        if (interval.start > 0 && o.edges > 0) {
          if (o.edges < interval.start && interval.start - o.edges != 1) {
            $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
          } else if (interval.start - o.edges == 1) {
            methods._appendItem.call(this, o.edges);
          }
          if (o.useEndEdge) {
            var end = Math.min(o.edges, interval.start);
            for (i = end - 1; i >= 0; i--) {
              methods._appendItem.call(this, i);
            }
          }
        }
      }

      // Generate Next link (unless option is set for at front)
      if (o.nextText && !o.nextAtFront) {
        methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {
          text: o.nextText,
          classes: 'next'
        });
      }
      if (o.ellipsePageSet && !o.disabled) {
        methods._ellipseClick.call(this, $panel);
      }
    },
    _getPages: function _getPages(o) {
      var pages = Math.ceil(o.items / o.itemsOnPage);
      return pages || 1;
    },
    _getInterval: function _getInterval(o) {
      return {
        start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, o.pages - o.displayedPages), 0) : 0),
        end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
      };
    },
    _appendItem: function _appendItem(pageIndex, opts) {
      var self = this,
        options,
        $link,
        o = self.data('pagination'),
        $linkWrapper = $('<li></li>'),
        $ul = self.find('ul');
      pageIndex = pageIndex < 0 ? 0 : pageIndex < o.pages ? pageIndex : o.pages - 1;
      options = {
        text: pageIndex + 1,
        classes: ''
      };
      if (o.labelMap.length && o.labelMap[pageIndex]) {
        options.text = o.labelMap[pageIndex];
      }
      options = $.extend(options, opts || {});
      if (pageIndex == o.currentPage || o.disabled) {
        if (o.disabled || options.classes === 'prev' || options.classes === 'next') {
          $linkWrapper.addClass('disabled');
        } else {
          $linkWrapper.addClass('active');
        }
        $link = $('<span class="current">' + options.text + '</span>');
      } else {
        if (o.useAnchors) {
          $link = $('<a href="' + o.hrefTextPrefix + (pageIndex + 1) + o.hrefTextSuffix + '" class="page-link">' + options.text + '</a>');
        } else {
          $link = $('<span >' + options.text + '</span>');
        }
        $link.click(function (event) {
          return methods._selectPage.call(self, pageIndex, event);
        });
      }
      if (options.classes) {
        $link.addClass(options.classes);
      }
      $linkWrapper.append($link);
      if ($ul.length) {
        $ul.append($linkWrapper);
      } else {
        self.append($linkWrapper);
      }
    },
    _selectPage: function _selectPage(pageIndex, event) {
      var o = this.data('pagination');
      o.currentPage = pageIndex;
      if (o.selectOnClick) {
        methods._draw.call(this);
      }
      return o.onPageClick(pageIndex + 1, event);
    },
    _ellipseClick: function _ellipseClick($panel) {
      var self = this,
        o = this.data('pagination'),
        $ellip = $panel.find('.ellipse');
      $ellip.addClass('clickable').parent().removeClass('disabled');
      $ellip.click(function (event) {
        if (!o.disable) {
          var $this = $(this),
            val = (parseInt($this.parent().prev().text(), 10) || 0) + 1;
          $this.html('<input type="number" min="1" max="' + o.pages + '" step="1" value="' + val + '">').find('input').focus().click(function (event) {
            // prevent input number arrows from bubbling a click event on $ellip
            event.stopPropagation();
          }).keyup(function (event) {
            var val = $(this).val();
            if (event.which === 13 && val !== '') {
              // enter to accept
              if (val > 0 && val <= o.pages) methods._selectPage.call(self, val - 1);
            } else if (event.which === 27) {
              // escape to cancel
              $ellip.empty().html(o.ellipseText);
            }
          }).bind('blur', function (event) {
            var val = $(this).val();
            if (val !== '') {
              methods._selectPage.call(self, val - 1);
            }
            $ellip.empty().html(o.ellipseText);
            return false;
          });
        }
        return false;
      });
    }
  };
  $.fn.pagination = function (method) {
    // Method calling logic
    if (methods[method] && method.charAt(0) != '_') {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (_typeof(method) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.pagination');
    }
  };
})(jQuery);
/*
    A simple jQuery modal (http://github.com/kylefox/jquery-modal)
    Version 0.9.2
*/

(function (factory) {
  // Making your jQuery plugin work better with npm tools
  // http://blog.npmjs.org/post/112712169830/making-your-jquery-plugin-work-better-with-npm
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    factory(require("jquery"), window, document);
  } else {
    factory(jQuery, window, document);
  }
})(function ($, window, document, undefined) {
  var modals = [],
    getCurrent = function getCurrent() {
      return modals.length ? modals[modals.length - 1] : null;
    },
    selectCurrent = function selectCurrent() {
      var i,
        selected = false;
      for (i = modals.length - 1; i >= 0; i--) {
        if (modals[i].$blocker) {
          modals[i].$blocker.toggleClass('current', !selected).toggleClass('behind', selected);
          selected = true;
        }
      }
    };
  $.ysp_modal = function (el, options) {
    var remove, target;
    this.$body = $('body');
    this.options = $.extend({}, $.ysp_modal.defaults, options);
    this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10));
    this.$blocker = null;
    if (this.options.closeExisting) while ($.ysp_modal.isActive()) $.ysp_modal.close(); // Close any open modals.
    modals.push(this);
    if (el.is('a')) {
      target = el.attr('href');
      this.anchor = el;
      //Select element by id from href
      if (/^#/.test(target)) {
        this.$elm = $(target);
        if (this.$elm.length !== 1) return null;
        this.$body.append(this.$elm);
        this.open();
        //AJAX
      } else {
        this.$elm = $('<div>');
        this.$body.append(this.$elm);
        remove = function remove(event, modal) {
          modal.elm.remove();
        };
        this.showSpinner();
        el.trigger($.ysp_modal.AJAX_SEND);
        $.get(target).done(function (html) {
          if (!$.ysp_modal.isActive()) return;
          el.trigger($.ysp_modal.AJAX_SUCCESS);
          var current = getCurrent();
          current.$elm.empty().append(html).on($.ysp_modal.CLOSE, remove);
          current.hideSpinner();
          current.open();
          el.trigger($.ysp_modal.AJAX_COMPLETE);
        }).fail(function () {
          el.trigger($.ysp_modal.AJAX_FAIL);
          var current = getCurrent();
          current.hideSpinner();
          modals.pop(); // remove expected modal from the list
          el.trigger($.ysp_modal.AJAX_COMPLETE);
        });
      }
    } else {
      this.$elm = el;
      this.anchor = el;
      this.$body.append(this.$elm);
      this.open();
    }
  };
  $.ysp_modal.prototype = {
    constructor: $.ysp_modal,
    open: function open() {
      var m = this;
      this.block();
      this.anchor.blur();
      if (this.options.doFade) {
        setTimeout(function () {
          m.show();
        }, this.options.fadeDuration * this.options.fadeDelay);
      } else {
        this.show();
      }
      $(document).off('keydown.modal').on('keydown.modal', function (event) {
        var current = getCurrent();
        if (event.which === 27 && current.options.escapeClose) current.close();
      });
      if (this.options.clickClose) this.$blocker.click(function (e) {
        if (e.target === this) $.ysp_modal.close();
      });
    },
    close: function close() {
      modals.pop();
      this.unblock();
      this.hide();
      if (!$.ysp_modal.isActive()) $(document).off('keydown.modal');
    },
    block: function block() {
      this.$elm.trigger($.ysp_modal.BEFORE_BLOCK, [this._ctx()]);
      this.$body.css('overflow', 'hidden');
      this.$blocker = $('<div class="' + this.options.blockerClass + ' blocker current"></div>').appendTo(this.$body);
      selectCurrent();
      if (this.options.doFade) {
        this.$blocker.css('opacity', 0).animate({
          opacity: 1
        }, this.options.fadeDuration);
      }
      this.$elm.trigger($.ysp_modal.BLOCK, [this._ctx()]);
    },
    unblock: function unblock(now) {
      if (!now && this.options.doFade) this.$blocker.fadeOut(this.options.fadeDuration, this.unblock.bind(this, true));else {
        this.$blocker.children().appendTo(this.$body);
        this.$blocker.remove();
        this.$blocker = null;
        selectCurrent();
        if (!$.ysp_modal.isActive()) this.$body.css('overflow', '');
      }
    },
    show: function show() {
      this.$elm.trigger($.ysp_modal.BEFORE_OPEN, [this._ctx()]);
      if (this.options.showClose) {
        this.closeButton = $('<a href="#close-modal" rel="modal:close" class="close-modal ' + this.options.closeClass + '">' + this.options.closeText + '</a>');
        this.$elm.append(this.closeButton);
      }
      this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker);
      if (this.options.doFade) {
        this.$elm.css({
          opacity: 0,
          display: 'inline-block'
        }).animate({
          opacity: 1
        }, this.options.fadeDuration);
      } else {
        this.$elm.css('display', 'inline-block');
      }
      this.$elm.trigger($.ysp_modal.OPEN, [this._ctx()]);
    },
    hide: function hide() {
      this.$elm.trigger($.ysp_modal.BEFORE_CLOSE, [this._ctx()]);
      if (this.closeButton) this.closeButton.remove();
      var _this = this;
      if (this.options.doFade) {
        this.$elm.fadeOut(this.options.fadeDuration, function () {
          _this.$elm.trigger($.ysp_modal.AFTER_CLOSE, [_this._ctx()]);
        });
      } else {
        this.$elm.hide(0, function () {
          _this.$elm.trigger($.ysp_modal.AFTER_CLOSE, [_this._ctx()]);
        });
      }
      this.$elm.trigger($.ysp_modal.CLOSE, [this._ctx()]);
    },
    showSpinner: function showSpinner() {
      if (!this.options.showSpinner) return;
      this.spinner = this.spinner || $('<div class="' + this.options.modalClass + '-spinner"></div>').append(this.options.spinnerHtml);
      this.$body.append(this.spinner);
      this.spinner.show();
    },
    hideSpinner: function hideSpinner() {
      if (this.spinner) this.spinner.remove();
    },
    //Return context for custom events
    _ctx: function _ctx() {
      return {
        elm: this.$elm,
        $elm: this.$elm,
        $blocker: this.$blocker,
        options: this.options,
        $anchor: this.anchor
      };
    }
  };
  $.ysp_modal.close = function (event) {
    if (!$.ysp_modal.isActive()) return;
    if (event) event.preventDefault();
    var current = getCurrent();
    current.close();
    return current.$elm;
  };

  // Returns if there currently is an active modal
  $.ysp_modal.isActive = function () {
    return modals.length > 0;
  };
  $.ysp_modal.getCurrent = getCurrent;
  $.ysp_modal.defaults = {
    closeExisting: true,
    escapeClose: true,
    clickClose: true,
    closeText: 'Close',
    closeClass: '',
    modalClass: "ysp-modal",
    blockerClass: "jquery-modal",
    spinnerHtml: '<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',
    showSpinner: true,
    showClose: true,
    fadeDuration: null,
    // Number of milliseconds the fade animation takes.
    fadeDelay: 1.0 // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
  };

  // Event constants
  $.ysp_modal.BEFORE_BLOCK = 'modal:before-block';
  $.ysp_modal.BLOCK = 'modal:block';
  $.ysp_modal.BEFORE_OPEN = 'modal:before-open';
  $.ysp_modal.OPEN = 'modal:open';
  $.ysp_modal.BEFORE_CLOSE = 'modal:before-close';
  $.ysp_modal.CLOSE = 'modal:close';
  $.ysp_modal.AFTER_CLOSE = 'modal:after-close';
  $.ysp_modal.AJAX_SEND = 'modal:ajax:send';
  $.ysp_modal.AJAX_SUCCESS = 'modal:ajax:success';
  $.ysp_modal.AJAX_FAIL = 'modal:ajax:fail';
  $.ysp_modal.AJAX_COMPLETE = 'modal:ajax:complete';
  $.fn.ysp_modal = function (options) {
    if (this.length === 1) {
      new $.ysp_modal(this, options);
    }
    return this;
  };

  // Automatically bind links with rel="modal:close" to, well, close the modal.
  $(document).on('click.modal', 'a[rel~="modal:close"]', $.ysp_modal.close);
  $(document).on('click.modal', 'a[rel~="modal:open"]', function (event) {
    event.preventDefault();
    $(this).modal();
  });
});
jQuery(document).ready(function () {
  jQuery('[data-modal]').click(function (e) {
    e.preventDefault();
    console.log('fuck me ');
    var data_modal = jQuery(this).data('modal');
    jQuery(data_modal).ysp_modal({
      closeText: 'X',
      modalClass: 'ysp-modal-open',
      closeClass: 'ysp-model-close'
    });
  });
});
Object.defineProperty(String.prototype, 'eachWordCapitalize', {
  value: function value() {
    return this.toLowerCase().split(' ').map(function (s) {
      return s.charAt(0).toUpperCase() + s.substring(1);
    }).join(' ');
  },
  enumerable: false
});
function ysp_get_form_data(form_ele) {
  var formData = new FormData(form_ele);
  var fd = Object.fromEntries(formData.entries());
  for (var _i = 0, _Object$entries = Object.entries(fd); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      fIndex = _Object$entries$_i[0],
      field = _Object$entries$_i[1];
    var ValArray = formData.getAll(fIndex);
    if (typeof ValArray[1] != 'undefined') {
      fd[fIndex] = ValArray;
    }
    if (fd[fIndex] == '') {
      delete fd[fIndex];
    }
  }
  return fd;
}
function ysp_set_form_to_data(inputData) {
  var formA = document.querySelector('.ysp-yacht-search-form');
  var formB = document.querySelector('#ysp-mobile-yacht-search-form');
  formA.reset();
  formB.reset();
  var formInputs = document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"], #ysp-mobile-yacht-search-form *[name], *[name][form="ysp-mobile-yacht-search-form"]');
  formInputs.forEach(function (ele) {
    var input = ele;
    var name = ele.getAttribute('name');
    var hasPretty = inputData[name];

    // console.log(hasPretty);

    if (typeof hasPretty != 'null' && typeof hasPretty != 'undefined') {
      if (Array.isArray(hasPretty)) {
        //console.log(hasPretty);

        hasPretty.forEach(function (hP) {
          if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hP) {
            input.checked = true;
          }
        });
      } else {
        if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hasPretty) {
          input.checked = true;
        } else if (input.type != 'checkbox' && input.type != 'radio') {
          input.value = hasPretty;
        }
      }
    }
  });
}
function ysp_push_history() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var searchParams = new URLSearchParams();
  var strpath = '';
  for (var property in data) {
    var it = data[property];
    if (it != '' && typeof it != 'undefined' && typeof it == 'string' && property != 'OnFirstLoad' && _typeof(it) != 'object') {
      searchParams.set(property, it);
      strpath = strpath + "" + property + '-' + it.toString().split(' ').join('-') + '/';
      strpath = strpath.toLowerCase();
    } else if (Array.isArray(it)) {
      searchParams.set(property, it);
      it = it.map(function (prop) {
        return prop.toString().split(' ').join('-');
      });
      strpath = strpath + "" + property + '-' + it.join("+") + '/';
      strpath = strpath.toLowerCase();
    }
  }

  //history.pushState(data, '', ysp_yacht_sync.yacht_search_url+'?'+searchParams.toString());
  history.pushState(data, '', ysp_yacht_sync.yacht_search_url + strpath);
  return ysp_yacht_sync.yacht_search_url + strpath;
}
var ysp_api = {};
ysp_api.call_api = function (method, path, passing_data) {
  var xhttp = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var responseData = JSON.parse(this.responseText);
        resolve(responseData);
      }
    };
    switch (method) {
      case 'GET':
        var searchParams = new URLSearchParams();
        if (passing_data.length != 0) {
          for (var property in passing_data) {
            searchParams.set(property, passing_data[property]);
          }
        }
        var _questionMark = searchParams.toString();
        xhttp.open("GET", ysp_yacht_sync.wp_rest_url + "ysp/" + path + (_questionMark != '' ? '?' + searchParams.toString() : ''), true);
        xhttp.send();
        break;
      case 'POST':
        xhttp.open("POST", ysp_yacht_sync.wp_rest_url + "ysp/" + path, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(passing_data));
        break;
    }
  });
};
var ysp_templates = {};
ysp_templates.yacht = {};
ysp_templates.yacht.grid = function (vessel, params) {
  var meters = parseInt(vessel.NominalLength) * 0.3048;
  var price = '';
  var length = '';
  if (ysp_yacht_sync.europe_option_picked == "yes") {
    length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
    price = typeof vessel.YSP_EuroVal != 'undefined' && vessel.YSP_EuroVal > 0 ? "\u20AC".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(vessel.YSP_EuroVal)) : 'Contact Us For Price';
  } else {
    length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';
    if (params.currency == 'Eur') {
      price = typeof vessel.YSP_USDVal != 'undefined' && vessel.YSP_USDVal > 0 ? "\u20AC".concat(new Intl.NumberFormat('en-us', {
        minimumFractionDigits: 2
      }).format(vessel.YSP_EuroVal)) : 'Contact Us For Price';
    } else {
      price = typeof vessel.YSP_USDVal != 'undefined' && vessel.YSP_USDVal > 0 ? "$".concat(new Intl.NumberFormat('en-us', {
        minimumFractionDigits: 2
      }).format(vessel.YSP_USDVal)) : 'Contact Us For Price';
    }
  }
  var vesselLocation = vessel.BoatLocation.BoatCountryID == "US" || vessel.BoatLocation.BoatCountryID == "United States" ? "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatStateCode) : "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatCountryID);
  vesselLocation = vesselLocation;
  return "\n\t\t\t<div class=\"ysp-yacht-item ysp-view-grid\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t<div class=\"ri-image\">\n\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t<img class=\"yacht-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\t\t\n\t\t\t\t\t\t<svg title=\"like\" class=\"like-me love\" xmlns=\"http://www.w3.org/2000/svg\" width=\"57\" height=\"54\" viewBox=\"0 0 57 54\" fill=\"none\"  data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t\t\t  <g filter=\"url(#filter0_d_2888_4333)\">\n\t\t\t\t\t\t    <path d=\"M34.7028 11.5755C36.2094 11.5755 37.6251 12.1699 38.6898 13.2488L38.8223 13.383C41.0206 15.6116 41.0206 19.2375 38.8223 21.466L38.0992 22.199L27.4995 32.9442L18.4883 23.808L16.9011 22.199L16.178 21.466C13.9797 19.2375 13.9797 15.6116 16.178 13.383L16.3083 13.2509C17.3739 12.1708 18.79 11.5759 20.2962 11.5764C21.8023 11.5764 23.2176 12.1708 24.2819 13.2492L25.005 13.9822L27.4991 16.5101L29.9928 13.9818L30.7158 13.2488C31.7801 12.1699 33.1962 11.5755 34.7028 11.5755ZM34.7028 8C32.357 8 30.0112 8.9068 28.2222 10.7204L27.4991 11.4534L26.776 10.7204C24.9878 8.90723 22.642 8.00043 20.297 8C17.9508 8 15.605 8.90723 13.8147 10.7221L13.6844 10.8542C10.1046 14.4832 10.1046 20.3645 13.6844 23.9935L14.4074 24.7265L15.9946 26.3354L27.4995 38L40.5933 24.7265L41.3164 23.9935C44.8945 20.3663 44.8945 14.4814 41.3164 10.8542L41.1839 10.72C39.3945 8.9068 37.0486 8 34.7028 8Z\" fill=\"white\"></path>\n\t\t\t\t\t\t  </g>\n\t\t\t\t\t\t  <defs>\n\t\t\t\t\t\t    <filter id=\"filter0_d_2888_4333\" x=\"-0.000488281\" y=\"0\" width=\"57.0005\" height=\"54\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n\t\t\t\t\t\t      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood>\n\t\t\t\t\t\t      <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix>\n\t\t\t\t\t\t      <feOffset dx=\"1\" dy=\"4\"></feOffset>\n\t\t\t\t\t\t      <feGaussianBlur stdDeviation=\"6\"></feGaussianBlur>\n\t\t\t\t\t\t      <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite>\n\t\t\t\t\t\t      <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_2888_4333\"></feBlend>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_2888_4333\" result=\"shape\"></feBlend>\n\t\t\t\t\t\t    </filter>\n\t\t\t\t\t\t  </defs>\n\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t<label class=\"top-compare\" title=\"compare\">\n\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"compare_toggle\" name=\"compare\" value=\"").concat(vessel._postID, "\" />\n\n\t\t\t\t\t\t\t<svg width=\"58\" height=\"25\" viewBox=\"0 0 58 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M51.5029 18.1953L54.6753 14.7767C55.4411 13.9515 55.1258 12.5418 54.0937 12.1843L52.2 11.5284V4.6875C52.2 3.82456 51.5508 3.125 50.75 3.125H47.85V1.17187C47.85 0.524658 47.3631 0 46.7625 0H40.2375C39.6369 0 39.15 0.524658 39.15 1.17187V3.125H36.25C35.4492 3.125 34.8 3.82456 34.8 4.6875V11.5284L32.9063 12.1843C31.8753 12.5414 31.5581 13.9506 32.3247 14.7767L35.4971 18.1953C34.7016 20.3265 32.8782 21.875 30.0875 21.875C29.4869 21.875 29 22.3997 29 23.0469V23.8281C29 24.4753 29.4869 25 30.0875 25C32.8526 25 34.9585 23.9937 36.5789 22.0998C37.2322 23.8004 38.7885 25 40.6 25H46.4C48.2116 25 49.7678 23.8004 50.4211 22.0998C52.0412 23.9934 54.147 25 56.9125 25C57.5131 25 58 24.4753 58 23.8281V23.0469C58 22.3997 57.5131 21.875 56.9125 21.875C54.1567 21.875 52.3114 20.3613 51.5029 18.1953ZM37.7 6.25H49.3V10.524L43.9437 8.66875C43.6552 8.5688 43.3448 8.5688 43.0563 8.66875L37.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t<path d=\"M22.5029 18.1953L25.6753 14.7767C26.4411 13.9515 26.1258 12.5418 25.0937 12.1843L23.2 11.5284V4.6875C23.2 3.82456 22.5508 3.125 21.75 3.125H18.85V1.17188C18.85 0.524658 18.3631 0 17.7625 0H11.2375C10.6369 0 10.15 0.524658 10.15 1.17188V3.125H7.25C6.44919 3.125 5.8 3.82456 5.8 4.6875V11.5284L3.9063 12.1843C2.8753 12.5414 2.55807 13.9506 3.32467 14.7767L6.49709 18.1953C5.70158 20.3265 3.87816 21.875 1.0875 21.875C0.486883 21.875 0 22.3997 0 23.0469V23.8281C0 24.4753 0.486883 25 1.0875 25C3.8526 25 5.95855 23.9937 7.57888 22.0998C8.23224 23.8004 9.78845 25 11.6 25H17.4C19.2115 25 20.7678 23.8004 21.4211 22.0998C23.0412 23.9934 25.147 25 27.9125 25C28.5131 25 29 24.4753 29 23.8281V23.0469C29 22.3997 28.5131 21.875 27.9125 21.875C25.1567 21.875 23.3114 20.3613 22.5029 18.1953ZM8.7 6.25H20.3V10.524L14.9437 8.66875C14.6552 8.5688 14.3448 8.5688 14.0563 8.66875L8.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</label>\n\n\n\t\t\t\t\t\t").concat(vessel.CompanyName === ysp_yacht_sync.company_name ? "<div class=\"company-banner\"><img src=\"".concat(ysp_yacht_sync.company_logo, "\"></div>") : '', "\n\t\t\t\t\n\t\t\t\t\t\t<span class=\"ri-price\">").concat(price, "</span>\n\t\t\t\t\t</a>\t\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"result-item-info\">\n\t\t\t\t\t<div class=\"ri-top\">\n\t\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\t<span class=\"ri-name\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', "</span><br>\n\n\t\t\t\t\t\t\t<span class=\"ri-sub-name\">").concat(vessel.BoatName ? vessel.BoatName : 'N/A', "</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"ri-bottom\">\n\t\t\t\t\t\t<span class=\"ri-location\">\t\n\t\t\t\t\t\t\t<a href=\"/yacht-search/ys_keyword-").concat(vessel.BoatLocation.BoatCityName.replace(' ', '-'), "/\">\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t<path d=\"M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t<path d=\"M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t").concat(vesselLocation, "\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t<a href=\"#ysp-yacht-results-lead-modal\" class=\"ri-contact\" data-modal=\"#ysp-yacht-results-lead-modal\">\n\t\t\t\t\t\t\tContact\n\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n\t\t\t\t\t\t\t<g clip-path=\"url(#clip0_8101_10277)\">\n\t\t\t\t\t\t\t<path d=\"M15.5556 0H5.7778C5.53214 0 5.33334 0.198792 5.33334 0.444458C5.33334 0.690125 5.53214 0.888917 5.7778 0.888917H14.4827L0.130219 15.2413C-0.0434062 15.415 -0.0434062 15.6962 0.130219 15.8698C0.21701 15.9566 0.33076 16 0.444469 16C0.558177 16 0.671885 15.9566 0.758719 15.8698L15.1111 1.51737V10.2222C15.1111 10.4679 15.3099 10.6667 15.5556 10.6667C15.8013 10.6667 16.0001 10.4679 16.0001 10.2222V0.444458C16 0.198792 15.8012 0 15.5556 0Z\" fill=\"#067AED\"/>\n\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<clipPath id=\"clip0_8101_10277\">\n\t\t\t\t\t\t\t<rect width=\"16\" height=\"16\" fill=\"white\"/>\n\t\t\t\t\t\t\t</clipPath>\n\t\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
};
ysp_templates.yacht.list = function (vessel) {
  var meters = parseInt(vessel.NominalLength) * 0.3048;
  var price = '';
  if (typeof vessel.Price == 'string') {
    var _price = vessel.Price.slice(0, -3);
  }
  var length = '';
  if (ysp_yacht_sync.europe_option_picked == "yes") {
    length = vessel.NominalLength ? meters.toFixed(2) + ' m' : 'N/A';
    price = vessel.Price ? "\u20AC ".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(parseInt(vessel.Price.slice(0, -3)) * ysp_yacht_sync.euro_c_c)) : 'Contact Us For Price';
  } else {
    length = vessel.NominalLength ? vessel.NominalLength + " / " + meters.toFixed(2) + ' m' : 'N/A';
    price = vessel.Price ? "$ ".concat(new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2
    }).format(parseInt(vessel.Price.slice(0, -3)))) : 'Contact Us For Price';
  }
  var vesselLocation = vessel.BoatLocation.BoatCountryID == "US" || vessel.BoatLocation.BoatCountryID == "United States" ? "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatStateCode) : "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatCountryID);
  vesselLocation = vesselLocation;
  return "\n\t\t\t<div class=\"ysp-yacht-item ysp-view-list\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t<div class=\"ri-image\">\n\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t<img class=\"yacht-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\t\t\n\t\t\t\t\t\t<svg title=\"compare\" class=\"like-me love\" xmlns=\"http://www.w3.org/2000/svg\" width=\"57\" height=\"54\" viewBox=\"0 0 57 54\" fill=\"none\"  data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t\t\t  <g filter=\"url(#filter0_d_2888_4333)\">\n\t\t\t\t\t\t    <path d=\"M34.7028 11.5755C36.2094 11.5755 37.6251 12.1699 38.6898 13.2488L38.8223 13.383C41.0206 15.6116 41.0206 19.2375 38.8223 21.466L38.0992 22.199L27.4995 32.9442L18.4883 23.808L16.9011 22.199L16.178 21.466C13.9797 19.2375 13.9797 15.6116 16.178 13.383L16.3083 13.2509C17.3739 12.1708 18.79 11.5759 20.2962 11.5764C21.8023 11.5764 23.2176 12.1708 24.2819 13.2492L25.005 13.9822L27.4991 16.5101L29.9928 13.9818L30.7158 13.2488C31.7801 12.1699 33.1962 11.5755 34.7028 11.5755ZM34.7028 8C32.357 8 30.0112 8.9068 28.2222 10.7204L27.4991 11.4534L26.776 10.7204C24.9878 8.90723 22.642 8.00043 20.297 8C17.9508 8 15.605 8.90723 13.8147 10.7221L13.6844 10.8542C10.1046 14.4832 10.1046 20.3645 13.6844 23.9935L14.4074 24.7265L15.9946 26.3354L27.4995 38L40.5933 24.7265L41.3164 23.9935C44.8945 20.3663 44.8945 14.4814 41.3164 10.8542L41.1839 10.72C39.3945 8.9068 37.0486 8 34.7028 8Z\" fill=\"white\"></path>\n\t\t\t\t\t\t  </g>\n\t\t\t\t\t\t  <defs>\n\t\t\t\t\t\t    <filter id=\"filter0_d_2888_4333\" x=\"-0.000488281\" y=\"0\" width=\"57.0005\" height=\"54\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n\t\t\t\t\t\t      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood>\n\t\t\t\t\t\t      <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix>\n\t\t\t\t\t\t      <feOffset dx=\"1\" dy=\"4\"></feOffset>\n\t\t\t\t\t\t      <feGaussianBlur stdDeviation=\"6\"></feGaussianBlur>\n\t\t\t\t\t\t      <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite>\n\t\t\t\t\t\t      <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_2888_4333\"></feBlend>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_2888_4333\" result=\"shape\"></feBlend>\n\t\t\t\t\t\t    </filter>\n\t\t\t\t\t\t  </defs>\n\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t<label class=\"top-compare\" title=\"compare\">\n\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"compare_toggle\" name=\"compare\" value=\"").concat(vessel._postID, "\" />\n\n\t\t\t\t\t\t\t<svg width=\"58\" height=\"25\" viewBox=\"0 0 58 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M51.5029 18.1953L54.6753 14.7767C55.4411 13.9515 55.1258 12.5418 54.0937 12.1843L52.2 11.5284V4.6875C52.2 3.82456 51.5508 3.125 50.75 3.125H47.85V1.17187C47.85 0.524658 47.3631 0 46.7625 0H40.2375C39.6369 0 39.15 0.524658 39.15 1.17187V3.125H36.25C35.4492 3.125 34.8 3.82456 34.8 4.6875V11.5284L32.9063 12.1843C31.8753 12.5414 31.5581 13.9506 32.3247 14.7767L35.4971 18.1953C34.7016 20.3265 32.8782 21.875 30.0875 21.875C29.4869 21.875 29 22.3997 29 23.0469V23.8281C29 24.4753 29.4869 25 30.0875 25C32.8526 25 34.9585 23.9937 36.5789 22.0998C37.2322 23.8004 38.7885 25 40.6 25H46.4C48.2116 25 49.7678 23.8004 50.4211 22.0998C52.0412 23.9934 54.147 25 56.9125 25C57.5131 25 58 24.4753 58 23.8281V23.0469C58 22.3997 57.5131 21.875 56.9125 21.875C54.1567 21.875 52.3114 20.3613 51.5029 18.1953ZM37.7 6.25H49.3V10.524L43.9437 8.66875C43.6552 8.5688 43.3448 8.5688 43.0563 8.66875L37.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t<path d=\"M22.5029 18.1953L25.6753 14.7767C26.4411 13.9515 26.1258 12.5418 25.0937 12.1843L23.2 11.5284V4.6875C23.2 3.82456 22.5508 3.125 21.75 3.125H18.85V1.17188C18.85 0.524658 18.3631 0 17.7625 0H11.2375C10.6369 0 10.15 0.524658 10.15 1.17188V3.125H7.25C6.44919 3.125 5.8 3.82456 5.8 4.6875V11.5284L3.9063 12.1843C2.8753 12.5414 2.55807 13.9506 3.32467 14.7767L6.49709 18.1953C5.70158 20.3265 3.87816 21.875 1.0875 21.875C0.486883 21.875 0 22.3997 0 23.0469V23.8281C0 24.4753 0.486883 25 1.0875 25C3.8526 25 5.95855 23.9937 7.57888 22.0998C8.23224 23.8004 9.78845 25 11.6 25H17.4C19.2115 25 20.7678 23.8004 21.4211 22.0998C23.0412 23.9934 25.147 25 27.9125 25C28.5131 25 29 24.4753 29 23.8281V23.0469C29 22.3997 28.5131 21.875 27.9125 21.875C25.1567 21.875 23.3114 20.3613 22.5029 18.1953ZM8.7 6.25H20.3V10.524L14.9437 8.66875C14.6552 8.5688 14.3448 8.5688 14.0563 8.66875L8.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</label>\n\n\t\t\t\t\t\t").concat(vessel.CompanyName === ysp_yacht_sync.company_name ? "<div class=\"company-banner\"><img src=\"".concat(ysp_yacht_sync.company_logo, "\"></div>") : '', "\n\t\t\t\t\n\t\t\t\t\t\t<span class=\"ri-price\">").concat(price, "</span>\n\t\t\t\t\t</a>\t\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"result-item-info\">\n\t\t\t\t\t<div class=\"ri-top\">\n\t\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\t<span class=\"ri-name\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', "</span><br />\n\n\t\t\t\t\t\t\t<span class=\"ri-sub-name\">").concat(vessel.BoatName ? vessel.BoatName : 'N/A', "</span><br />\n\n\t\t\t\t\t\t\t<span class=\"ri-location\">\t\t\n\t\t\t\t\t\t\t\t<a href=\"/yacht-search/ys_keyword-").concat(vessel.BoatLocation.BoatCityName.replace(' ', '-'), "/\">\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t<path d=\"M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t<path d=\"M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t").concat(vesselLocation, "\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"ri-bottom\">\n\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t<a href=\"#ysp-yacht-results-lead-modal\" class=\"ri-contact\" data-modal=\"#ysp-yacht-results-lead-modal\">\n\t\t\t\t\t\t\tContact\n\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n\t\t\t\t\t\t\t<g clip-path=\"url(#clip0_8101_10277)\">\n\t\t\t\t\t\t\t<path d=\"M15.5556 0H5.7778C5.53214 0 5.33334 0.198792 5.33334 0.444458C5.33334 0.690125 5.53214 0.888917 5.7778 0.888917H14.4827L0.130219 15.2413C-0.0434062 15.415 -0.0434062 15.6962 0.130219 15.8698C0.21701 15.9566 0.33076 16 0.444469 16C0.558177 16 0.671885 15.9566 0.758719 15.8698L15.1111 1.51737V10.2222C15.1111 10.4679 15.3099 10.6667 15.5556 10.6667C15.8013 10.6667 16.0001 10.4679 16.0001 10.2222V0.444458C16 0.198792 15.8012 0 15.5556 0Z\" fill=\"#067AED\"/>\n\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<clipPath id=\"clip0_8101_10277\">\n\t\t\t\t\t\t\t<rect width=\"16\" height=\"16\" fill=\"white\"/>\n\t\t\t\t\t\t\t</clipPath>\n\t\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t");
};
ysp_templates.yacht.compare_preview = function (vessel, params) {
  return "\n\n\t\t\t<div class=\"ysp-yacht-compare-preview\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\t\t\t\n\t\t\t\t<span class=\"remove-from-compare\">\n\t\t\t\t\t<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<rect x=\"0.5\" y=\"0.5\" width=\"23\" height=\"23\" rx=\"11.5\" stroke=\"#FFFFFF\"/>\n\t\t\t\t\t<path d=\"M8.26876 14.9346C8.04909 15.1543 8.04909 15.5104 8.26876 15.7301C8.48843 15.9498 8.84458 15.9498 9.06425 15.7301L8.26876 14.9346ZM12.3976 12.3968C12.6173 12.1771 12.6173 11.8209 12.3976 11.6013C12.1779 11.3816 11.8218 11.3816 11.6021 11.6013L12.3976 12.3968ZM11.6018 11.6016C11.3821 11.8213 11.3821 12.1774 11.6018 12.3971C11.8214 12.6168 12.1776 12.6168 12.3973 12.3971L11.6018 11.6016ZM15.7306 9.06376C15.9503 8.84409 15.9503 8.48794 15.7306 8.26827C15.5109 8.0486 15.1548 8.0486 14.9351 8.26827L15.7306 9.06376ZM12.3973 11.6013C12.1776 11.3816 11.8214 11.3816 11.6018 11.6013C11.3821 11.8209 11.3821 12.1771 11.6018 12.3968L12.3973 11.6013ZM14.9351 15.7301C15.1548 15.9498 15.5109 15.9498 15.7306 15.7301C15.9503 15.5104 15.9503 15.1543 15.7306 14.9346L14.9351 15.7301ZM11.6021 12.3971C11.8218 12.6168 12.1779 12.6168 12.3976 12.3971C12.6173 12.1774 12.6173 11.8213 12.3976 11.6016L11.6021 12.3971ZM9.06425 8.26827C8.84458 8.0486 8.48843 8.0486 8.26876 8.26827C8.04909 8.48794 8.04909 8.84409 8.26876 9.06376L9.06425 8.26827ZM9.06425 15.7301L12.3976 12.3968L11.6021 11.6013L8.26876 14.9346L9.06425 15.7301ZM12.3973 12.3971L15.7306 9.06376L14.9351 8.26827L11.6018 11.6016L12.3973 12.3971ZM11.6018 12.3968L14.9351 15.7301L15.7306 14.9346L12.3973 11.6013L11.6018 12.3968ZM12.3976 11.6016L9.06425 8.26827L8.26876 9.06376L11.6021 12.3971L12.3976 11.6016Z\" fill=\"#FFFFFF\"/>\n\t\t\t\t\t</svg>\n\t\t\t\t</span>\n\n\t\t\t\t<a class=\"preview-link\" href=\"").concat(vessel._link, "\">\n\n\t\t\t\t\t<img class=\"yacht-main-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\n\t\t\t\t\t<h6 class=\"yacht-title\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', " ").concat(vessel.BoatName ? vessel.BoatName : '', "</h6>\n\t\t\t\t</a>\n\n\t\t\t</div>\n\n\t\t");
};
ysp_templates.noResults = function () {
  return "\n            <div>\n                <b>No Results</b>\n            </div>\n        ";
};
ysp_templates.yacht_tag = function (label, value) {
  return "\n    \t\t<span>\n\t    \t\t".concat(value, "\n\n\t    \t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"8\" viewBox=\"0 0 8 8\" fill=\"none\">\n\t\t\t\t<path d=\"M0.219754 0.220121C0.289319 0.150457 0.371936 0.0951902 0.462878 0.0574827C0.553821 0.0197752 0.651305 0.000366211 0.749754 0.000366211C0.848204 0.000366211 0.945688 0.0197752 1.03663 0.0574827C1.12757 0.0951902 1.21019 0.150457 1.27975 0.220121L3.99975 2.93912L6.71975 0.220121C6.78936 0.15052 6.87198 0.0953098 6.96292 0.0576422C7.05386 0.0199746 7.15132 0.000587465 7.24975 0.000587463C7.34818 0.000587461 7.44565 0.0199747 7.53659 0.0576422C7.62753 0.0953098 7.71015 0.15052 7.77975 0.220121C7.84935 0.289721 7.90456 0.372349 7.94223 0.463287C7.9799 0.554224 7.99929 0.651691 7.99929 0.750121C7.99929 0.848551 7.9799 0.946017 7.94223 1.03695C7.90456 1.12789 7.84935 1.21052 7.77975 1.28012L5.06075 4.00012L7.77975 6.72012C7.92032 6.86069 7.99929 7.05133 7.99929 7.25012C7.99929 7.44891 7.92032 7.63956 7.77975 7.78012C7.63919 7.92069 7.44854 7.99965 7.24975 7.99965C7.05097 7.99965 6.86032 7.92069 6.71975 7.78012L3.99975 5.06112L1.27975 7.78012C1.13919 7.92069 0.948543 7.99965 0.749754 7.99965C0.550966 7.99965 0.360319 7.92069 0.219754 7.78012C0.0791897 7.63956 0.000221252 7.44891 0.000221252 7.25012C0.000221252 7.05133 0.0791897 6.86069 0.219754 6.72012L2.93875 4.00012L0.219754 1.28012C0.15009 1.21056 0.094824 1.12794 0.0571165 1.037C0.019409 0.946054 0 0.84857 0 0.750121C0 0.651671 0.019409 0.554187 0.0571165 0.463244C0.094824 0.372302 0.15009 0.289686 0.219754 0.220121Z\" fill=\"#2D3748\"/>\n\t\t\t\t</svg>\n\t\t\t</span>\n    \t");
};
ysp_templates.pagination = {};
ysp_templates.pagination.next_text = ">";
ysp_templates.pagination.prev_text = "<";
document.addEventListener("DOMContentLoaded", function () {
  var ele_quick_search = document.querySelector('.ysp-quick-search-form');
  if (ele_quick_search) {
    // Fill options
    var FillOptions = [];
    var selectorElements = document.querySelectorAll(".ysp-quick-search-form select[data-fill-options]");
    selectorElements.forEach(function (ele) {
      FillOptions.push(ele.getAttribute('data-fill-options'));
    });
    ysp_api.call_api('POST', 'dropdown-options', {
      labels: FillOptions
    }).then(function (rOptions) {
      var _loop = function _loop() {
        var SelectorEle = document.querySelectorAll(".ysp-quick-search-form select[data-fill-options='" + label + "']");
        var name = SelectorEle[0].getAttribute('name');
        rOptions[label].forEach(function (b) {
          SelectorEle.forEach(function (ele) {
            var option = document.createElement("OPTION");
            option.text = b;
            option.value = b;
            ele.add(option);
          });
        });
        var URLREF = new URL(location.href);
        var UrlVal = URLREF.searchParams.get(name);
        var strpaths = window.location.href;
        strpaths = strpaths.replace(ysp_yacht_sync.yacht_search_page_id, '');
        var paths = strpaths.split("/");
        var pretty_url_path_params = {};
        paths.forEach(function (path) {
          if (path != '') {
            var phase_path = path.split('-');
            var only_vals = phase_path.slice(1);
            pretty_url_path_params[phase_path[0]] = only_vals.join(' ');
            if (typeof pretty_url_path_params[phase_path[0]] == 'string') {
              pretty_url_path_params[phase_path[0]] = pretty_url_path_params[phase_path[0]].eachWordCapitalize();
            }
          }
        });
        if (UrlVal != '' && UrlVal != null) {
          console.log(UrlVal);
          if (typeof UrlVal == 'string') {
            UrlVal = UrlVal.eachWordCapitalize();
          }
          SelectorEle.forEach(function (ele) {
            ele.value = UrlVal;
          });
        }
        var hasPretty = pretty_url_path_params[name];
        console.log(pretty_url_path_params[name]);
        if (hasPretty != '' && hasPretty != null) {
          SelectorEle.forEach(function (ele) {
            ele.value = hasPretty;
          });
        }
      };
      for (var label in rOptions) {
        _loop();
      }
    });
  }
});
function ysp_makeSearchTags(data) {
  var tagsEle = document.querySelectorAll('.ysp-search-tags');
  if (tagsEle) {
    tagsEle.forEach(function (te) {
      te.innerHTML = "";
    });
    var ysp_tags_not_print = ['page_index', ''];
    var _loop2 = function _loop2(paramKey) {
      var label = '';
      if (document.querySelector('label[for=' + paramKey + ']')) {
        label = document.querySelector('label[for=' + paramKey + ']').innerText;
      } else if (document.querySelector('*[name=' + paramKey + ']') && document.querySelector('*[name=' + paramKey + ']').hasAttribute('label')) {
        label = document.querySelector('*[name=' + paramKey + ']').getAttribute('label');
      }
      tagsEle.forEach(function (te) {
        if (ysp_tags_not_print.indexOf(paramKey) == -1) {
          var eleInput = document.querySelector('.ysp-yacht-search-form *[name=' + paramKey + ']');
          if (eleInput) {
            var newTagEle = document.createElement('span');
            var tagVal = data[paramKey];
            if (eleInput.tagName == 'SELECT') {
              tagVal = eleInput.options[eleInput.selectedIndex].innerText;
            }
            if (paramKey.match('price')) {
              tagVal = '$' + tagVal;
            }
            if (paramKey.match('length') && paramKey != 'lengthunit') {
              var eleUnit = document.querySelector('.ysp-yacht-search-form [name=lengthunit]:checked');
              if (!eleUnit) {
                eleUnit = document.querySelector('.ysp-yacht-search-form [name=lengthunit]');
              }
              tagVal = tagVal + ' ';
              if (eleUnit) {
                tagVal += eleUnit.value;
              }
            }
            newTagEle.className = 'btn btn-primary btn-sm ysp-tag';
            if (label != null && label != 'null' && label != '') {
              newTagEle.innerHTML = ysp_templates.yacht_tag(label, tagVal);
            } else {
              newTagEle.innerHTML = ysp_templates.yacht_tag('', tagVal);
            }
            newTagEle.setAttribute('key', paramKey);
            te.appendChild(newTagEle);
            console.log(document.querySelector('.ysp-tag[key="' + paramKey + '"]'));
            console.log('.ysp-tag[key="' + paramKey + '"]');
            document.querySelectorAll('span.ysp-tag[key="' + paramKey + '"]').forEach(function (yspTagEle) {
              yspTagEle.addEventListener('click', function (event) {
                console.log(event);
                var key = event.currentTarget.getAttribute('key');
                console.log(key);
                var inputEles = document.querySelectorAll('.ysp-yacht-search-form select[name=' + key + '], .ysp-yacht-search-form input[name=' + key + ']');
                console.log(inputEles);
                inputEles.forEach(function (eleI) {
                  if (typeof eleI.type != 'undefined' && (eleI.type == 'checkbox' || eleI.type == 'radio')) {
                    eleI.checked = false;
                  } else {
                    eleI.value = '';
                  }
                });
                event.currentTarget.remove();
                inputEles[0].form.requestSubmit();
              });
            });
          }
        }
      });
    };
    for (var paramKey in data) {
      _loop2(paramKey);
    }
  }
}
function ysp_markLovedVessel(ele_card) {
  jQuery('.love', ele_card).click(function (e) {
    e.preventDefault();
    jQuery(this).toggleClass('loved');
    var yachtId = jQuery(this).data('yacht-id');
    if (jQuery(this).hasClass('loved')) {
      ysp_addLovedVessel(yachtId);
    } else {
      ysp_removeLovedVessel(yachtId);
      var params = ysp_get_form_data(document.querySelector('.ysp-yacht-search-form'));
      if (typeof params.ys_yachts_loved != 'undefined') {
        ele_card.remove();
      }
    }
  });
  if (localStorage.getItem('ysp_loved_vessels') != "") {
    var lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));
    if (lovedVessels == null) {
      lovedVessels = [];
    }
    var yachtId = ele_card.data('yacht-id');
    if (lovedVessels.indexOf(yachtId) != -1) {
      ele_card.addClass('loved');
      jQuery('.love', ele_card).addClass('loved');
    }
  }
}
function ysp_addLovedVessel(yachtId) {
  var lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));
  if (lovedVessels == null) {
    lovedVessels = [];
  }
  if (lovedVessels.indexOf(yachtId) == -1) {
    lovedVessels.push(yachtId);
  } else {
    // already added
  }
  console.log(lovedVessels);
  localStorage.setItem("ysp_loved_vessels", JSON.stringify(lovedVessels));
}
function ysp_removeLovedVessel(yachtId) {
  var lovedVessels = JSON.parse(localStorage.getItem('ysp_loved_vessels'));
  if (lovedVessels == null) {
    lovedVessels = [];
  }
  var indexed = lovedVessels.indexOf(yachtId);
  console.log(indexed);
  if (indexed != -1) {
    delete lovedVessels[indexed];
    lovedVessels.splice(indexed, 1);
  } else {
    // already added
  }
  console.log(lovedVessels);
  localStorage.setItem("ysp_loved_vessels", JSON.stringify(lovedVessels));
}
var YSP_VesselCompareList = [];
function ysp_restoreCompares() {
  var URLREF = new URL(location.href); // maybe for a re-do
  var compare_post_ids = URLREF.searchParams.get('restore_to_compare');
  console.log(_typeof(compare_post_ids));
  console.log(compare_post_ids);
  if (typeof compare_post_ids == 'string') {
    YSP_VesselCompareList = compare_post_ids.split(',');
    ysp_makeCompareLinkout();
  }
}
function ysp_makeCompareVessel(ele_card) {
  jQuery('.compare_toggle', ele_card).change(function (e) {
    console.log('howdy');
    e.preventDefault();
    jQuery(this).toggleClass('armed');
    var yachtId = ele_card.data('post-id');
    if (jQuery(this).hasClass('armed')) {
      ysp_addVesselToCompareList(yachtId);
    } else {
      ysp_removeVesselToCompareList(yachtId);
    }
  });
  var yachtId = ele_card.data('post-id');
  if (YSP_VesselCompareList.indexOf(yachtId) != -1 || YSP_VesselCompareList.indexOf(yachtId.toString()) != -1) {
    console.log('hello world restored');
    ele_card.addClass('armed');
    jQuery('.compare_toggle', ele_card).addClass('armed').prop('checked', true);
  }
}
function ysp_addVesselToCompareList(yachtId) {
  if (YSP_VesselCompareList.indexOf(yachtId) == -1) {
    YSP_VesselCompareList.push(yachtId);
  }
  ysp_makeCompareLinkout();
}
function ysp_removeVesselToCompareList(yachtId) {
  var indexed = YSP_VesselCompareList.indexOf(yachtId);
  if (indexed != -1) {
    delete YSP_VesselCompareList[indexed];
    YSP_VesselCompareList.splice(indexed, 1);
  }
  ysp_makeCompareLinkout();
}
function ysp_makeCompareLinkout() {
  if (YSP_VesselCompareList.length >= 2) {
    if (document.getElementById('ysp_compare_linkout')) {
      document.getElementById('ysp_compare_linkout').href = ysp_yacht_sync.wp_rest_url + "ysp/compare/?postID=" + YSP_VesselCompareList.join(',');
      document.getElementById('ysp_compare_linkout').innerHTML = "<button type=\"button\" class=\"ysp-general-button\">Compare ( ".concat(YSP_VesselCompareList.length, " )</button>");
    }
    if (document.getElementById('ysp_compare_linkout_mobile')) {
      document.getElementById('ysp_compare_linkout_mobile').href = ysp_yacht_sync.wp_rest_url + "ysp/compare/?postID=" + YSP_VesselCompareList.join(',');
      document.getElementById('ysp_compare_linkout_mobile').innerHTML = "<button type=\"button\" class=\"ysp-general-button\">Compare ( ".concat(YSP_VesselCompareList.length, " )</button>");
    }
    var params = {
      'post__in': YSP_VesselCompareList
    };
    return ysp_api.call_api("POST", "yachts", params).then(function (data_result) {
      jQuery('#ysp-compare-previews').html('');
      data_result.results.forEach(function (item) {
        jQuery('#ysp-compare-previews').append(ysp_templates.yacht.compare_preview(item, params));
        var ele_preview = jQuery('#ysp-compare-previews *[data-post-id=' + item._postID + ']');
        jQuery('.remove-from-compare', ele_preview).click(function () {
          jQuery('div[data-post-id=' + item._postID + '] .compare_toggle').prop('checked', false).removeClass('armed');
          ysp_removeVesselToCompareList(item._postID);
          ysp_makeCompareLinkout();
        });
      });
    });
  } else {
    jQuery('#ysp-compare-previews').html('<span style="color: #fff;">Pick two to compare.</span>');
    jQuery('#ysp_compare_linkout').html('');
    jQuery('#ysp_compare_linkout_mobile').html('');
  }
}
var yspBeforeYachtSearch = new Event("ysp-before-submitting-yacht-search");
var yspAfterYachtSearch = new Event("ysp-after-submitting-yacht-search");
var yspAfterRenderingYacht = new Event("ysp-after-rendering-yacht-search");
function ysp_yacht_search_and_reader(data) {
  console.log(data);
  jQuery('#ysp-the-yacht-results').html('');
  jQuery('#ysp-yacht-results-pagination').html('');
  document.querySelector('#ysp-yacht-results-section').classList.remove('loaded');
  document.querySelector('#ysp-yacht-results-section').classList.add('loading');
  ysp_set_form_to_data(data);
  ysp_makeSearchTags(data);

  // GET AND WRITE
  return ysp_api.call_api("POST", "yachts", data).then(function (data_result) {
    document.querySelector('#ysp-yacht-results-section').classList.remove('loading');
    document.querySelector('#ysp-yacht-results-section').classList.add('loaded');
    document.title = data_result.SEO.title;
    jQuery('#ysp-search-heading').text(data_result.SEO.heading);
    jQuery('#ysp-search-paragraph').text(data_result.SEO.p);
    jQuery('#ysp-total-yacht-results').text(new Intl.NumberFormat('en-IN', {
      maximumSignificantDigits: 3
    }).format(data_result.total));
    var currentURL = null;
    if (typeof data.dont_push == 'undefined') {
      currentURL = ysp_push_history(data);
    } else {
      currentURL = location.href;
    }
    if (data_result.total > 0) {
      jQuery('#ysp-the-yacht-results').removeClass(['view-grid', 'view-list']);
      if (typeof data.view != 'undefined' && data.view.toLowerCase() == 'list') {
        jQuery('#ysp-the-yacht-results').addClass('view-list');
      } else {
        jQuery('#ysp-the-yacht-results').addClass('view-grid');
      }
      data_result.results.forEach(function (item) {
        if (typeof data.view != 'undefined' && data.view.toLowerCase() == 'list') {
          jQuery('#ysp-the-yacht-results').addClass('view-list').removeClass('view-grid');
          jQuery('#ysp-the-yacht-results').append(ysp_templates.yacht.list(item, data));
        } else {
          jQuery('#ysp-the-yacht-results').addClass('view-grid');
          jQuery('#ysp-the-yacht-results').append(ysp_templates.yacht.grid(item, data));
        }
        var ele_card = jQuery('#ysp-the-yacht-results [data-post-id=' + item._postID + ']');
        jQuery('[data-modal=#ysp-yacht-results-lead-modal]', ele_card).click(function (e) {
          e.preventDefault();
          var BoatName = item.ModelYear + ' ' + item.MakeString + ' ' + item.BoatName;
          jQuery('#ysp-yacht-results-lead-modal .boatname').html(BoatName);
          jQuery('#ysp-yacht-results-lead-modal input[name=WhichBoat]').val(BoatName);
          jQuery('#ysp-yacht-results-lead-modal input[name=WhichBoatID]').val(item._postID);
          var data_modal = jQuery(this).data('modal');
          jQuery(data_modal).ysp_modal({
            closeText: 'X',
            modalClass: 'ysp-modal-open',
            closeClass: 'ysp-model-close'
          });
        });
        ysp_markLovedVessel(ele_card);
        ysp_makeCompareVessel(ele_card);
      });
      jQuery('#ysp-yacht-results-pagination').pagination({
        items: data_result.total,
        itemsOnPage: 12,
        currentPage: data.page_index,
        prevText: ysp_templates.pagination.prev_text,
        nextText: ysp_templates.pagination.next_text,
        edges: 4,
        displayedPages: 4,
        hrefTextPrefix: currentURL.replace(new RegExp("page_index-(\\d*)(/)", "g"), "") + 'page_index-',
        hrefTextSuffix: '/',
        onPageClick: function onPageClick(pageNumber, event) {
          event.preventDefault();
          document.querySelector('.ysp-yacht-search-form input[name=page_index]').value = pageNumber;
          var formDataObject = ysp_get_form_data(document.querySelector('.ysp-yacht-search-form'));
          ysp_yacht_search_and_reader(formDataObject);
        }
      });
    } else {
      jQuery('#ysp-the-yacht-results').append(ysp_templates.noResults());
    }
    jQuery([document.documentElement, document.body]).animate({
      scrollTop: jQuery(".scroll-to-here-on-yacht-search").offset().top
    }, 250);
    document.querySelector('.ysp-yacht-search-form:not(#ysp-mobile-yacht-search-form)').dispatchEvent(yspAfterRenderingYacht);
    return data_result;
  })["catch"](function (error) {
    console.log(error);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  // Fill List Options
  var FillLists = [];
  var listElements = document.querySelectorAll("datalist[data-fill-list]");
  var listNeededElements = document.querySelectorAll("input[list]");
  listElements.forEach(function (ele) {
    FillLists.push(ele.getAttribute('data-fill-list'));
  });
  listNeededElements.forEach(function (input_ele) {
    input_ele.addEventListener('input', function (event) {
      var list_id = event.target.getAttribute('list');
      var ele_list = document.querySelector("datalist#" + list_id);
      if (event.target.value.length <= 3) {
        ysp_api.call_api('POST', 'list-options-with-value', {
          labels: [ele_list.getAttribute('data-fill-list')],
          value: event.target.value
        }).then(function (rOptions) {
          var _loop3 = function _loop3() {
            var SelectorEle = document.querySelectorAll("datalist[data-fill-list='" + label + "']");
            SelectorEle.forEach(function (ele) {
              ele.innerHTML = '';
            });
            rOptions[label].forEach(function (b) {
              var option = document.createElement("OPTION");
              option.text = b;
              option.value = b;
              SelectorEle.forEach(function (ele) {
                ele.append(option);
              });
            });
          };
          for (var label in rOptions) {
            _loop3();
          }
        });
      }
    });
  });

  /*    ysp_api.call_api('POST', 'list-options', {labels: FillLists}).then(function(rOptions) {
          for (let label in rOptions) {
  
              let SelectorEle = document.querySelectorAll("datalist[data-fill-list='"+ label +"']");
  
              rOptions[label].forEach(function(b) {
  
                  let option = document.createElement("OPTION");
  
                      option.text = b;
                      option.value = b;
  
                  SelectorEle.forEach((ele) => {
                      ele.append(option);
                  });
              });
          }
      });
  */
  var yachtSearchAndResults = document.querySelector('#ysp-yacht-search-form');
  if (yachtSearchAndResults) {
    document.querySelectorAll('.open-mobile-search').forEach(function (omse) {
      omse.addEventListener('click', function (e) {
        document.querySelector('#ysp-super-mobile-search').style.display = 'block';
        document.querySelector('body').style.overflowY = 'hidden';
        document.querySelector('body').classList.add('ysp-mobile-yacht-search-open');
      });
    });
    if (document.querySelector('#close-mobile-search')) {
      document.querySelector('#close-mobile-search').addEventListener('click', function (e) {
        document.querySelector('#ysp-super-mobile-search').style.display = 'none';
        document.querySelector('body').style.overflowY = 'unset';
        document.querySelector('body').classList.remove('ysp-mobile-yacht-search-open');
      });
    }
    yachtSearchAndResults.addEventListener('submit', function (e) {
      e.preventDefault();
      e.target.dispatchEvent(yspBeforeYachtSearch);
      e.target.querySelector('input[name=page_index]').value = 1;
      var params = ysp_get_form_data(e.target);
      ysp_yacht_search_and_reader(params).then(function (api_data) {
        e.target.dispatchEvent(yspAfterYachtSearch);
      });
    });
    yachtSearchAndResults.querySelectorAll('input.submit-on-change').forEach(function (eleInput) {
      eleInput.addEventListener('change', function (e) {
        e.target.form.requestSubmit();
      });
    });
    yachtSearchAndResults.querySelectorAll('input[type=reset]').forEach(function (eleReset) {
      eleReset.addEventListener('click', function (e) {
        e.target.form.requestSubmit();
      });
    });
    if (document.querySelector('input[name="ys_company_only"]')) {
      document.querySelectorAll('input[name="ys_company_only"]').forEach(function (eleCheck) {
        eleCheck.addEventListener('change', function (e) {
          e.target.form.requestSubmit();
        });
      });
    }
    document.querySelectorAll('input[name=view][form=ysp-yacht-search-form], select[name=view][form=ysp-yacht-search-form],  select[name=sortby][form=ysp-yacht-search-form]').forEach(function (eleViewOption) {
      eleViewOption.addEventListener('change', function (e) {
        e.target.form.requestSubmit();
      });
    });
    document.querySelectorAll('.pick-all').forEach(function (ele) {
      ele.addEventListener('click', function (e) {
        var input_name = e.target.getAttribute('name');
        document.querySelectorAll('input[name="' + input_name + '"]').forEach(function (eleInput) {
          eleInput.checked = false;
        });
      });
    });

    // PRETTY URL
    var strpaths = window.location.href;
    strpaths = strpaths.replace(ysp_yacht_sync.yacht_search_page_id, '');
    var paths = strpaths.split("/");
    var pretty_url_path_params = {};
    paths.forEach(function (path) {
      if (path != '') {
        var phase_path = path.split('-');
        var only_vals = phase_path.slice(1);
        only_vals = only_vals.join(' ').eachWordCapitalize();
        var only_vals_array = only_vals.split('+');
        if (typeof only_vals_array[1] != 'undefined') {
          only_vals = only_vals_array.map(function (ov) {
            return ov.eachWordCapitalize();
          });

          //console.log(only_vals);
        }
        pretty_url_path_params[phase_path[0]] = only_vals;
      }
    });

    //console.log(pretty_url_path_params);

    // Restore Fields

    var URLREF = new URL(location.href); // maybe for a re-do

    var formInputs = document.querySelectorAll('.ysp-yacht-search-form *[name], *[name][form="ysp-yacht-search-form"], #ysp-mobile-yacht-search-form *[name], *[name][form="ysp-mobile-yacht-search-form"]');
    formInputs.forEach(function (ele) {
      var input = ele;
      var name = ele.getAttribute('name');
      var urlVal = URLREF.searchParams.get(name);
      // urlVal = ;

      var hasPretty = pretty_url_path_params[name];

      // console.log(hasPretty);

      if (typeof hasPretty != 'null' && typeof hasPretty != 'undefined') {
        if (Array.isArray(hasPretty)) {
          //console.log(hasPretty);

          hasPretty.forEach(function (hP) {
            if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hP) {
              input.checked = true;
            }
          });
        } else {
          if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == hasPretty) {
            input.checked = true;
          } else if (input.type != 'checkbox' && input.type != 'radio') {
            input.value = hasPretty;
          }
        }
      }
      if (urlVal != '' && urlVal != null) {
        if (typeof urlVal == 'string') {
          urlVal = urlVal.eachWordCapitalize();
        }
        if (typeof input.type != 'undefined' && (input.type == 'checkbox' || input.type == 'radio') && input.getAttribute('value') == urlVal) {
          input.checked = true;
        } else if (input.type != 'checkbox' && input.type != 'radio') {
          input.value = urlVal;
        }
      }
    });

    // Restore Compare
    ysp_restoreCompares();

    // Fill options
    var FillOptions = [];
    var selectorElements = document.querySelectorAll("select[data-fill-options]");
    selectorElements.forEach(function (ele) {
      FillOptions.push(ele.getAttribute('data-fill-options'));
    });
    ysp_api.call_api('POST', 'dropdown-options', {
      labels: FillOptions
    }).then(function (rOptions) {
      var _loop4 = function _loop4() {
        var SelectorEle = document.querySelectorAll("select[data-fill-options='" + label + "']");
        console.log(SelectorEle);
        var name = SelectorEle[0].getAttribute('name');
        rOptions[label].forEach(function (b) {
          SelectorEle.forEach(function (ele) {
            var option = document.createElement("OPTION");
            option.text = b;
            option.value = b;
            ele.add(option);
          });
        });
        var URLREF = new URL(location.href);
        var UrlVal = URLREF.searchParams.get(name);
        var strpaths = window.location.href;
        strpaths = strpaths.replace(ysp_yacht_sync.yacht_search_page_id, '');
        var paths = strpaths.split("/");
        var pretty_url_path_params = {};
        paths.forEach(function (path) {
          if (path != '') {
            var phase_path = path.split('-');
            var only_vals = phase_path.slice(1);
            pretty_url_path_params[phase_path[0]] = only_vals.join(' ');
            if (typeof pretty_url_path_params[phase_path[0]] == 'string') {
              pretty_url_path_params[phase_path[0]] = pretty_url_path_params[phase_path[0]].eachWordCapitalize();
            }
          }
        });
        if (UrlVal != '' && UrlVal != null) {
          //console.log(UrlVal);

          if (typeof UrlVal == 'string') {
            UrlVal = UrlVal.eachWordCapitalize();
          }
          SelectorEle.forEach(function (ele) {
            ele.value = UrlVal;
            if (ele.value == '') {
              ele.value = UrlVal.toUpperCase();
            }
          });
        }
        var hasPretty = pretty_url_path_params[name];

        //console.log( pretty_url_path_params[ name ]);

        if (hasPretty != '' && hasPretty != null) {
          SelectorEle.forEach(function (ele) {
            ele.value = hasPretty;
            if (ele.value == '') {
              ele.value = hasPretty.toUpperCase();
            }
          });
        }
      };
      for (var label in rOptions) {
        _loop4();
      }
    }).then(function () {
      // Render Yachts For Page Load
      var params = ysp_get_form_data(document.querySelector('.ysp-yacht-search-form'));
      console.log(params);

      // Liked / Loved 
      if (typeof params.ys_yachts_loved != 'undefined') {
        var loved_yachts = JSON.parse(localStorage.getItem('ysp_loved_vessels'));
        if (loved_yachts.length > 0) {
          params.ys_only_these = loved_yachts.join(',');
        } else {
          params.ys_only_these = "0,0,0";
        }
      }
      ysp_yacht_search_and_reader(params);
    });
    var mobileForm = document.querySelector('#ysp-mobile-yacht-search-form');
    if (mobileForm) {
      mobileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.target.querySelector('input[name=page_index]').value = 1;
        document.querySelector('#ysp-super-mobile-search').style.display = 'none';
        document.querySelector('body').style.overflowY = 'unset';
        var params = ysp_get_form_data(e.target);
        ysp_yacht_search_and_reader(params);
      });
    }
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var LeadForms = document.querySelectorAll('.ysp-lead-form-v2');
  LeadForms.forEach(function (fEle) {
    fEle.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = ysp_get_form_data(e.target);
      ysp_api.call_api("POST", 'lead-v2', formData).then(function (data_result) {
        e.target.querySelector('.success-message').style.display = 'block';
        e.target.querySelector('.hide-after-submit').style.display = 'none';
      })["catch"](function (error) {
        console.log(error);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwid2hhdGV2ZXIuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwiZmlsbC1maWVsZHMuanMiLCJ5YWNodFNlYXJjaFRhZ3MuanMiLCJ5YWNodFNlYXJjaExvdmVkLmpzIiwieWFjaHRTZWFyY2hDb21wYXJlLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwibW9kYWxzIiwiZ2V0Q3VycmVudCIsInNlbGVjdEN1cnJlbnQiLCJzZWxlY3RlZCIsIiRibG9ja2VyIiwidG9nZ2xlQ2xhc3MiLCJ5c3BfbW9kYWwiLCJlbCIsInJlbW92ZSIsInRhcmdldCIsIiRib2R5IiwiZGVmYXVsdHMiLCJkb0ZhZGUiLCJpc05hTiIsImZhZGVEdXJhdGlvbiIsImNsb3NlRXhpc3RpbmciLCJpc0FjdGl2ZSIsImNsb3NlIiwicHVzaCIsImlzIiwiYW5jaG9yIiwidGVzdCIsIiRlbG0iLCJvcGVuIiwibW9kYWwiLCJlbG0iLCJzaG93U3Bpbm5lciIsInRyaWdnZXIiLCJBSkFYX1NFTkQiLCJnZXQiLCJkb25lIiwiQUpBWF9TVUNDRVNTIiwiY3VycmVudCIsIm9uIiwiQ0xPU0UiLCJoaWRlU3Bpbm5lciIsIkFKQVhfQ09NUExFVEUiLCJmYWlsIiwiQUpBWF9GQUlMIiwicG9wIiwiY29uc3RydWN0b3IiLCJtIiwiYmxvY2siLCJibHVyIiwic2V0VGltZW91dCIsInNob3ciLCJmYWRlRGVsYXkiLCJvZmYiLCJlc2NhcGVDbG9zZSIsImNsaWNrQ2xvc2UiLCJlIiwidW5ibG9jayIsImhpZGUiLCJCRUZPUkVfQkxPQ0siLCJfY3R4IiwiY3NzIiwiYmxvY2tlckNsYXNzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJCTE9DSyIsIm5vdyIsImZhZGVPdXQiLCJjaGlsZHJlbiIsIkJFRk9SRV9PUEVOIiwic2hvd0Nsb3NlIiwiY2xvc2VCdXR0b24iLCJjbG9zZUNsYXNzIiwiY2xvc2VUZXh0IiwibW9kYWxDbGFzcyIsImRpc3BsYXkiLCJPUEVOIiwiQkVGT1JFX0NMT1NFIiwiX3RoaXMiLCJBRlRFUl9DTE9TRSIsInNwaW5uZXIiLCJzcGlubmVySHRtbCIsIiRhbmNob3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImRhdGFfbW9kYWwiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIlN0cmluZyIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm1hcCIsInMiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJlbnVtZXJhYmxlIiwieXNwX2dldF9mb3JtX2RhdGEiLCJmb3JtX2VsZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJmZCIsImZyb21FbnRyaWVzIiwiZW50cmllcyIsIl9pIiwiX09iamVjdCRlbnRyaWVzIiwiX09iamVjdCRlbnRyaWVzJF9pIiwiX3NsaWNlZFRvQXJyYXkiLCJmSW5kZXgiLCJmaWVsZCIsIlZhbEFycmF5IiwiZ2V0QWxsIiwieXNwX3NldF9mb3JtX3RvX2RhdGEiLCJpbnB1dERhdGEiLCJmb3JtQSIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JtQiIsInJlc2V0IiwiZm9ybUlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlIiwiaW5wdXQiLCJuYW1lIiwiZ2V0QXR0cmlidXRlIiwiaGFzUHJldHR5IiwiaXNBcnJheSIsImhQIiwidHlwZSIsImNoZWNrZWQiLCJ5c3BfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJ0b1N0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJ5c3BfeWFjaHRfc3luYyIsInlhY2h0X3NlYXJjaF91cmwiLCJ5c3BfYXBpIiwiY2FsbF9hcGkiLCJwYXRoIiwicGFzc2luZ19kYXRhIiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlRGF0YSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIl9xdWVzdGlvbk1hcmsiLCJ3cF9yZXN0X3VybCIsInNlbmQiLCJzZXRSZXF1ZXN0SGVhZGVyIiwic3RyaW5naWZ5IiwieXNwX3RlbXBsYXRlcyIsInlhY2h0IiwiZ3JpZCIsInZlc3NlbCIsInBhcmFtcyIsIm1ldGVycyIsIk5vbWluYWxMZW5ndGgiLCJwcmljZSIsImV1cm9wZV9vcHRpb25fcGlja2VkIiwidG9GaXhlZCIsIllTUF9FdXJvVmFsIiwiY29uY2F0IiwiSW50bCIsIk51bWJlckZvcm1hdCIsIm1pbmltdW1GcmFjdGlvbkRpZ2l0cyIsImZvcm1hdCIsImN1cnJlbmN5IiwiWVNQX1VTRFZhbCIsInZlc3NlbExvY2F0aW9uIiwiQm9hdExvY2F0aW9uIiwiQm9hdENvdW50cnlJRCIsIkJvYXRDaXR5TmFtZSIsIkJvYXRTdGF0ZUNvZGUiLCJfcG9zdElEIiwiRG9jdW1lbnRJRCIsIl9saW5rIiwiSW1hZ2VzIiwiVXJpIiwiYXNzZXRzX3VybCIsIkNvbXBhbnlOYW1lIiwiY29tcGFueV9uYW1lIiwiY29tcGFueV9sb2dvIiwiTW9kZWxZZWFyIiwiTWFrZVN0cmluZyIsIk1vZGVsIiwiQm9hdE5hbWUiLCJyZXBsYWNlIiwibGlzdCIsIlByaWNlIiwiZXVyb19jX2MiLCJjb21wYXJlX3ByZXZpZXciLCJub1Jlc3VsdHMiLCJ5YWNodF90YWciLCJsYWJlbCIsIm5leHRfdGV4dCIsInByZXZfdGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbGVfcXVpY2tfc2VhcmNoIiwiRmlsbE9wdGlvbnMiLCJzZWxlY3RvckVsZW1lbnRzIiwibGFiZWxzIiwidGhlbiIsInJPcHRpb25zIiwiX2xvb3AiLCJTZWxlY3RvckVsZSIsImIiLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiVVJMUkVGIiwiVVJMIiwibG9jYXRpb24iLCJocmVmIiwiVXJsVmFsIiwic3RycGF0aHMiLCJ5YWNodF9zZWFyY2hfcGFnZV9pZCIsInBhdGhzIiwicHJldHR5X3VybF9wYXRoX3BhcmFtcyIsInBoYXNlX3BhdGgiLCJvbmx5X3ZhbHMiLCJlYWNoV29yZENhcGl0YWxpemUiLCJ5c3BfbWFrZVNlYXJjaFRhZ3MiLCJ0YWdzRWxlIiwidGUiLCJpbm5lckhUTUwiLCJ5c3BfdGFnc19ub3RfcHJpbnQiLCJfbG9vcDIiLCJwYXJhbUtleSIsImlubmVyVGV4dCIsImhhc0F0dHJpYnV0ZSIsImluZGV4T2YiLCJlbGVJbnB1dCIsIm5ld1RhZ0VsZSIsInRhZ1ZhbCIsInNlbGVjdGVkSW5kZXgiLCJtYXRjaCIsImVsZVVuaXQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInlzcFRhZ0VsZSIsImtleSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJ5c195YWNodHNfbG92ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG92ZWRWZXNzZWxzIiwic2V0SXRlbSIsImluZGV4ZWQiLCJzcGxpY2UiLCJZU1BfVmVzc2VsQ29tcGFyZUxpc3QiLCJ5c3BfcmVzdG9yZUNvbXBhcmVzIiwiY29tcGFyZV9wb3N0X2lkcyIsInlzcF9tYWtlQ29tcGFyZUxpbmtvdXQiLCJ5c3BfbWFrZUNvbXBhcmVWZXNzZWwiLCJjaGFuZ2UiLCJ5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCIsInlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJkYXRhX3Jlc3VsdCIsInJlc3VsdHMiLCJpdGVtIiwiZWxlX3ByZXZpZXciLCJ5c3BCZWZvcmVZYWNodFNlYXJjaCIsIkV2ZW50IiwieXNwQWZ0ZXJZYWNodFNlYXJjaCIsInlzcEFmdGVyUmVuZGVyaW5nWWFjaHQiLCJ5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIiLCJjbGFzc0xpc3QiLCJ0aXRsZSIsIlNFTyIsImhlYWRpbmciLCJwIiwibWF4aW11bVNpZ25pZmljYW50RGlnaXRzIiwidG90YWwiLCJjdXJyZW50VVJMIiwiZG9udF9wdXNoIiwidmlldyIsInBhZ2VfaW5kZXgiLCJSZWdFeHAiLCJmb3JtRGF0YU9iamVjdCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJkaXNwYXRjaEV2ZW50IiwiRmlsbExpc3RzIiwibGlzdEVsZW1lbnRzIiwibGlzdE5lZWRlZEVsZW1lbnRzIiwiaW5wdXRfZWxlIiwibGlzdF9pZCIsImVsZV9saXN0IiwiX2xvb3AzIiwieWFjaHRTZWFyY2hBbmRSZXN1bHRzIiwib21zZSIsInN0eWxlIiwib3ZlcmZsb3dZIiwiYXBpX2RhdGEiLCJlbGVSZXNldCIsImVsZUNoZWNrIiwiZWxlVmlld09wdGlvbiIsImlucHV0X25hbWUiLCJvbmx5X3ZhbHNfYXJyYXkiLCJvdiIsInVybFZhbCIsIl9sb29wNCIsImxvdmVkX3lhY2h0cyIs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QUEsVUFBQUMsR0FBQSxFQUFBO0lBQ0EsSUFBQUMsS0FBQSxHQUFBRCxHQUFBO0lBRUEsSUFBQUUsSUFBQSxHQUFBRixHQUFBLENBQUFHLFlBQUEsQ0FBQSxNQUFBLENBQUE7SUFFQSxJQUFBQyxTQUFBLEdBQUFaLFNBQUEsQ0FBQVUsSUFBQSxDQUFBOztJQUVBOztJQUVBLElBQUEsT0FBQUUsU0FBQSxJQUFBLE1BQUEsSUFBQSxPQUFBQSxTQUFBLElBQUEsV0FBQSxFQUFBO01BRUEsSUFBQXhJLEtBQUEsQ0FBQXlJLE9BQUEsQ0FBQUQsU0FBQSxDQUFBLEVBQUE7UUFDQTs7UUFFQUEsU0FBQSxDQUFBTCxPQUFBLENBQUEsVUFBQU8sRUFBQSxFQUFBO1VBRUEsSUFBQSxPQUFBTCxLQUFBLENBQUFNLElBQUEsSUFBQSxXQUFBLEtBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFVBQUEsSUFBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsT0FBQSxDQUFBLElBQUFOLEtBQUEsQ0FBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBRyxFQUFBLEVBQUE7WUFDQUwsS0FBQSxDQUFBTyxPQUFBLEdBQUEsSUFBQTtVQUNBO1FBRUEsQ0FBQSxDQUFBO01BRUEsQ0FBQSxNQUNBO1FBRUEsSUFBQSxPQUFBUCxLQUFBLENBQUFNLElBQUEsSUFBQSxXQUFBLEtBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFVBQUEsSUFBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsT0FBQSxDQUFBLElBQUFOLEtBQUEsQ0FBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBQyxTQUFBLEVBQUE7VUFDQUgsS0FBQSxDQUFBTyxPQUFBLEdBQUEsSUFBQTtRQUNBLENBQUEsTUFDQSxJQUFBUCxLQUFBLENBQUFNLElBQUEsSUFBQSxVQUFBLElBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLE9BQUEsRUFBQTtVQUNBTixLQUFBLENBQUFsQyxLQUFBLEdBQUFxQyxTQUFBO1FBQ0E7TUFFQTtJQUVBO0VBQ0EsQ0FBQSxDQUFBO0FBQ0E7QUFFQSxTQUFB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Q0FBQSxVQUFBOUUsS0FBQSxFQUFBO1FBQ0F3RixPQUFBLENBQUFDLEdBQUEsQ0FBQXpGLEtBQUEsQ0FBQTtNQUNBLENBQUEsQ0FBQTtJQUNBLENBQUEsQ0FBQTtFQUNBLENBQUEsQ0FBQTtBQUVBLENBQUEsQ0FBQSIsImZpbGUiOiJnbG9iYWxQbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgLyoqXG4qIHNpbXBsZVBhZ2luYXRpb24uanMgdjEuNlxuKiBBIHNpbXBsZSBqUXVlcnkgcGFnaW5hdGlvbiBwbHVnaW4uXG4qIGh0dHA6Ly9mbGF2aXVzbWF0aXMuZ2l0aHViLmNvbS9zaW1wbGVQYWdpbmF0aW9uLmpzL1xuKlxuKiBDb3B5cmlnaHQgMjAxMiwgRmxhdml1cyBNYXRpc1xuKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4qIGh0dHA6Ly9mbGF2aXVzbWF0aXMuZ2l0aHViLmNvbS9saWNlbnNlLmh0bWxcbiovXG5cbihmdW5jdGlvbigkKXtcblxuXHR2YXIgbWV0aG9kcyA9IHtcblx0XHRpbml0OiBmdW5jdGlvbihvcHRpb25zKSB7XG5cdFx0XHR2YXIgbyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0aXRlbXM6IDEsXG5cdFx0XHRcdGl0ZW1zT25QYWdlOiAxLFxuXHRcdFx0XHRwYWdlczogMCxcblx0XHRcdFx0ZGlzcGxheWVkUGFnZXM6IDUsXG5cdFx0XHRcdGVkZ2VzOiAyLFxuXHRcdFx0XHRjdXJyZW50UGFnZTogMCxcblx0XHRcdFx0dXNlQW5jaG9yczogdHJ1ZSxcblx0XHRcdFx0aHJlZlRleHRQcmVmaXg6ICcjcGFnZS0nLFxuXHRcdFx0XHRocmVmVGV4dFN1ZmZpeDogJycsXG5cdFx0XHRcdHByZXZUZXh0OiAnUHJldicsXG5cdFx0XHRcdG5leHRUZXh0OiAnTmV4dCcsXG5cdFx0XHRcdGVsbGlwc2VUZXh0OiAnJmhlbGxpcDsnLFxuXHRcdFx0XHRlbGxpcHNlUGFnZVNldDogdHJ1ZSxcblx0XHRcdFx0Y3NzU3R5bGU6ICdsaWdodC10aGVtZScsXG5cdFx0XHRcdGxpc3RTdHlsZTogJycsXG5cdFx0XHRcdGxhYmVsTWFwOiBbXSxcblx0XHRcdFx0c2VsZWN0T25DbGljazogdHJ1ZSxcblx0XHRcdFx0bmV4dEF0RnJvbnQ6IGZhbHNlLFxuXHRcdFx0XHRpbnZlcnRQYWdlT3JkZXI6IGZhbHNlLFxuXHRcdFx0XHR1c2VTdGFydEVkZ2UgOiB0cnVlLFxuXHRcdFx0XHR1c2VFbmRFZGdlIDogdHJ1ZSxcblx0XHRcdFx0b25QYWdlQ2xpY2s6IGZ1bmN0aW9uKHBhZ2VOdW1iZXIsIGV2ZW50KSB7XG5cdFx0XHRcdFx0Ly8gQ2FsbGJhY2sgdHJpZ2dlcmVkIHdoZW4gYSBwYWdlIGlzIGNsaWNrZWRcblx0XHRcdFx0XHQvLyBQYWdlIG51bWJlciBpcyBnaXZlbiBhcyBhbiBvcHRpb25hbCBwYXJhbWV0ZXJcblx0XHRcdFx0fSxcblx0XHRcdFx0b25Jbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvLyBDYWxsYmFjayB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cblx0XHRcdFx0fVxuXHRcdFx0fSwgb3B0aW9ucyB8fCB7fSk7XG5cblx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0by5wYWdlcyA9IG8ucGFnZXMgPyBvLnBhZ2VzIDogTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKSA/IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSkgOiAxO1xuXHRcdFx0aWYgKG8uY3VycmVudFBhZ2UpXG5cdFx0XHRcdG8uY3VycmVudFBhZ2UgPSBvLmN1cnJlbnRQYWdlIC0gMTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0by5jdXJyZW50UGFnZSA9ICFvLmludmVydFBhZ2VPcmRlciA/IDAgOiBvLnBhZ2VzIC0gMTtcblx0XHRcdG8uaGFsZkRpc3BsYXllZCA9IG8uZGlzcGxheWVkUGFnZXMgLyAyO1xuXG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuYWRkQ2xhc3Moby5jc3NTdHlsZSArICcgc2ltcGxlLXBhZ2luYXRpb24nKS5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbChzZWxmKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRvLm9uSW5pdCgpO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0c2VsZWN0UGFnZTogZnVuY3Rpb24ocGFnZSkge1xuXHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIHBhZ2UgLSAxKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRwcmV2UGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA+IDApIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSAtIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA8IG8ucGFnZXMgLSAxKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdG5leHRQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlIDwgby5wYWdlcyAtIDEpIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA+IDApIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSAtIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0UGFnZXNDb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykucGFnZXM7XG5cdFx0fSxcblxuXHRcdHNldFBhZ2VzQ291bnQ6IGZ1bmN0aW9uKGNvdW50KSB7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5wYWdlcyA9IGNvdW50O1xuXHRcdH0sXG5cblx0XHRnZXRDdXJyZW50UGFnZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLmN1cnJlbnRQYWdlICsgMTtcblx0XHR9LFxuXG5cdFx0ZGVzdHJveTogZnVuY3Rpb24oKXtcblx0XHRcdHRoaXMuZW1wdHkoKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkcmF3UGFnZTogZnVuY3Rpb24gKHBhZ2UpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmN1cnJlbnRQYWdlID0gcGFnZSAtIDE7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRyZWRyYXc6IGZ1bmN0aW9uKCl7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZGlzYWJsZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGVuYWJsZTogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVJdGVtczogZnVuY3Rpb24gKG5ld0l0ZW1zKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5pdGVtcyA9IG5ld0l0ZW1zO1xuXHRcdFx0by5wYWdlcyA9IG1ldGhvZHMuX2dldFBhZ2VzKG8pO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zT25QYWdlOiBmdW5jdGlvbiAoaXRlbXNPblBhZ2UpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLml0ZW1zT25QYWdlID0gaXRlbXNPblBhZ2U7XG5cdFx0XHRvLnBhZ2VzID0gbWV0aG9kcy5fZ2V0UGFnZXMobyk7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCAwKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRJdGVtc09uUGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykuaXRlbXNPblBhZ2U7XG5cdFx0fSxcblxuXHRcdF9kcmF3OiBmdW5jdGlvbigpIHtcblx0XHRcdHZhclx0byA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLFxuXHRcdFx0XHRpbnRlcnZhbCA9IG1ldGhvZHMuX2dldEludGVydmFsKG8pLFxuXHRcdFx0XHRpLFxuXHRcdFx0XHR0YWdOYW1lO1xuXG5cdFx0XHRtZXRob2RzLmRlc3Ryb3kuY2FsbCh0aGlzKTtcblxuXHRcdFx0dGFnTmFtZSA9ICh0eXBlb2YgdGhpcy5wcm9wID09PSAnZnVuY3Rpb24nKSA/IHRoaXMucHJvcCgndGFnTmFtZScpIDogdGhpcy5hdHRyKCd0YWdOYW1lJyk7XG5cblx0XHRcdHZhciAkcGFuZWwgPSB0YWdOYW1lID09PSAnVUwnID8gdGhpcyA6ICQoJzx1bCcgKyAoby5saXN0U3R5bGUgPyAnIGNsYXNzPVwiJyArIG8ubGlzdFN0eWxlICsgJ1wiJyA6ICcnKSArICc+PC91bD4nKS5hcHBlbmRUbyh0aGlzKTtcblxuXHRcdFx0Ly8gR2VuZXJhdGUgUHJldiBsaW5rXG5cdFx0XHRpZiAoby5wcmV2VGV4dCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSAtIDEgOiBvLmN1cnJlbnRQYWdlICsgMSwge3RleHQ6IG8ucHJldlRleHQsIGNsYXNzZXM6ICdwcmV2J30pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBOZXh0IGxpbmsgKGlmIG9wdGlvbiBzZXQgZm9yIGF0IGZyb250KVxuXHRcdFx0aWYgKG8ubmV4dFRleHQgJiYgby5uZXh0QXRGcm9udCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSArIDEgOiBvLmN1cnJlbnRQYWdlIC0gMSwge3RleHQ6IG8ubmV4dFRleHQsIGNsYXNzZXM6ICduZXh0J30pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBzdGFydCBlZGdlc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuc3RhcnQgPiAwICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYoby51c2VTdGFydEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBlbmQgPSBNYXRoLm1pbihvLmVkZ2VzLCBpbnRlcnZhbC5zdGFydCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoby5lZGdlcyA8IGludGVydmFsLnN0YXJ0ICYmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIG8uZWRnZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGludGVydmFsLmVuZCA8IG8ucGFnZXMgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZihvLnVzZVN0YXJ0RWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGJlZ2luID0gTWF0aC5tYXgoby5wYWdlcyAtIG8uZWRnZXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBvLnBhZ2VzIC0gMTsgaSA+PSBiZWdpbjsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoby5wYWdlcyAtIG8uZWRnZXMgPiBpbnRlcnZhbC5lbmQgJiYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGludGVydmFsIGxpbmtzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGZvciAoaSA9IGludGVydmFsLnN0YXJ0OyBpIDwgaW50ZXJ2YWwuZW5kOyBpKyspIHtcblx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoaSA9IGludGVydmFsLmVuZCAtIDE7IGkgPj0gaW50ZXJ2YWwuc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBlbmQgZWRnZXNcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKGludGVydmFsLmVuZCA8IG8ucGFnZXMgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZiAoby5wYWdlcyAtIG8uZWRnZXMgPiBpbnRlcnZhbC5lbmQgJiYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKG8udXNlRW5kRWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGJlZ2luID0gTWF0aC5tYXgoby5wYWdlcyAtIG8uZWRnZXMsIGludGVydmFsLmVuZCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBiZWdpbjsgaSA8IG8ucGFnZXM7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuc3RhcnQgPiAwICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYgKG8uZWRnZXMgPCBpbnRlcnZhbC5zdGFydCAmJiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBvLmVkZ2VzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihvLnVzZUVuZEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBlbmQgPSBNYXRoLm1pbihvLmVkZ2VzLCBpbnRlcnZhbC5zdGFydCk7XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBlbmQgLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIE5leHQgbGluayAodW5sZXNzIG9wdGlvbiBpcyBzZXQgZm9yIGF0IGZyb250KVxuXHRcdFx0aWYgKG8ubmV4dFRleHQgJiYgIW8ubmV4dEF0RnJvbnQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgKyAxIDogby5jdXJyZW50UGFnZSAtIDEsIHt0ZXh0OiBvLm5leHRUZXh0LCBjbGFzc2VzOiAnbmV4dCd9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG8uZWxsaXBzZVBhZ2VTZXQgJiYgIW8uZGlzYWJsZWQpIHtcblx0XHRcdFx0bWV0aG9kcy5fZWxsaXBzZUNsaWNrLmNhbGwodGhpcywgJHBhbmVsKTtcblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHRfZ2V0UGFnZXM6IGZ1bmN0aW9uKG8pIHtcblx0XHRcdHZhciBwYWdlcyA9IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSk7XG5cdFx0XHRyZXR1cm4gcGFnZXMgfHwgMTtcblx0XHR9LFxuXG5cdFx0X2dldEludGVydmFsOiBmdW5jdGlvbihvKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzdGFydDogTWF0aC5jZWlsKG8uY3VycmVudFBhZ2UgPiBvLmhhbGZEaXNwbGF5ZWQgPyBNYXRoLm1heChNYXRoLm1pbihvLmN1cnJlbnRQYWdlIC0gby5oYWxmRGlzcGxheWVkLCAoby5wYWdlcyAtIG8uZGlzcGxheWVkUGFnZXMpKSwgMCkgOiAwKSxcblx0XHRcdFx0ZW5kOiBNYXRoLmNlaWwoby5jdXJyZW50UGFnZSA+IG8uaGFsZkRpc3BsYXllZCA/IE1hdGgubWluKG8uY3VycmVudFBhZ2UgKyBvLmhhbGZEaXNwbGF5ZWQsIG8ucGFnZXMpIDogTWF0aC5taW4oby5kaXNwbGF5ZWRQYWdlcywgby5wYWdlcykpXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRfYXBwZW5kSXRlbTogZnVuY3Rpb24ocGFnZUluZGV4LCBvcHRzKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsIG9wdGlvbnMsICRsaW5rLCBvID0gc2VsZi5kYXRhKCdwYWdpbmF0aW9uJyksICRsaW5rV3JhcHBlciA9ICQoJzxsaT48L2xpPicpLCAkdWwgPSBzZWxmLmZpbmQoJ3VsJyk7XG5cblx0XHRcdHBhZ2VJbmRleCA9IHBhZ2VJbmRleCA8IDAgPyAwIDogKHBhZ2VJbmRleCA8IG8ucGFnZXMgPyBwYWdlSW5kZXggOiBvLnBhZ2VzIC0gMSk7XG5cblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdHRleHQ6IHBhZ2VJbmRleCArIDEsXG5cdFx0XHRcdGNsYXNzZXM6ICcnXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoby5sYWJlbE1hcC5sZW5ndGggJiYgby5sYWJlbE1hcFtwYWdlSW5kZXhdKSB7XG5cdFx0XHRcdG9wdGlvbnMudGV4dCA9IG8ubGFiZWxNYXBbcGFnZUluZGV4XTtcblx0XHRcdH1cblxuXHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKG9wdGlvbnMsIG9wdHMgfHwge30pO1xuXG5cdFx0XHRpZiAocGFnZUluZGV4ID09IG8uY3VycmVudFBhZ2UgfHwgby5kaXNhYmxlZCkge1xuXHRcdFx0XHRpZiAoby5kaXNhYmxlZCB8fCBvcHRpb25zLmNsYXNzZXMgPT09ICdwcmV2JyB8fCBvcHRpb25zLmNsYXNzZXMgPT09ICduZXh0Jykge1xuXHRcdFx0XHRcdCRsaW5rV3JhcHBlci5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkbGlua1dyYXBwZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRsaW5rID0gJCgnPHNwYW4gY2xhc3M9XCJjdXJyZW50XCI+JyArIChvcHRpb25zLnRleHQpICsgJzwvc3Bhbj4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLnVzZUFuY2hvcnMpIHtcblx0XHRcdFx0XHQkbGluayA9ICQoJzxhIGhyZWY9XCInICsgby5ocmVmVGV4dFByZWZpeCArIChwYWdlSW5kZXggKyAxKSArIG8uaHJlZlRleHRTdWZmaXggKyAnXCIgY2xhc3M9XCJwYWdlLWxpbmtcIj4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9hPicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRsaW5rID0gJCgnPHNwYW4gPicgKyAob3B0aW9ucy50ZXh0KSArICc8L3NwYW4+Jyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JGxpbmsuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0XHRcdHJldHVybiBtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgcGFnZUluZGV4LCBldmVudCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5jbGFzc2VzKSB7XG5cdFx0XHRcdCRsaW5rLmFkZENsYXNzKG9wdGlvbnMuY2xhc3Nlcyk7XG5cdFx0XHR9XG5cblx0XHRcdCRsaW5rV3JhcHBlci5hcHBlbmQoJGxpbmspO1xuXG5cdFx0XHRpZiAoJHVsLmxlbmd0aCkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKCRsaW5rV3JhcHBlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxmLmFwcGVuZCgkbGlua1dyYXBwZXIpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfc2VsZWN0UGFnZTogZnVuY3Rpb24ocGFnZUluZGV4LCBldmVudCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uY3VycmVudFBhZ2UgPSBwYWdlSW5kZXg7XG5cdFx0XHRpZiAoby5zZWxlY3RPbkNsaWNrKSB7XG5cdFx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvLm9uUGFnZUNsaWNrKHBhZ2VJbmRleCArIDEsIGV2ZW50KTtcblx0XHR9LFxuXG5cblx0XHRfZWxsaXBzZUNsaWNrOiBmdW5jdGlvbigkcGFuZWwpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0byA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLFxuXHRcdFx0XHQkZWxsaXAgPSAkcGFuZWwuZmluZCgnLmVsbGlwc2UnKTtcblx0XHRcdCRlbGxpcC5hZGRDbGFzcygnY2xpY2thYmxlJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHQkZWxsaXAuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0aWYgKCFvLmRpc2FibGUpIHtcblx0XHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0XHRcdFx0dmFsID0gKHBhcnNlSW50KCR0aGlzLnBhcmVudCgpLnByZXYoKS50ZXh0KCksIDEwKSB8fCAwKSArIDE7XG5cdFx0XHRcdFx0JHRoaXNcblx0XHRcdFx0XHRcdC5odG1sKCc8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjFcIiBtYXg9XCInICsgby5wYWdlcyArICdcIiBzdGVwPVwiMVwiIHZhbHVlPVwiJyArIHZhbCArICdcIj4nKVxuXHRcdFx0XHRcdFx0LmZpbmQoJ2lucHV0Jylcblx0XHRcdFx0XHRcdC5mb2N1cygpXG5cdFx0XHRcdFx0XHQuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gcHJldmVudCBpbnB1dCBudW1iZXIgYXJyb3dzIGZyb20gYnViYmxpbmcgYSBjbGljayBldmVudCBvbiAkZWxsaXBcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmtleXVwKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnQud2hpY2ggPT09IDEzICYmIHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBlbnRlciB0byBhY2NlcHRcblx0XHRcdFx0XHRcdFx0XHRpZiAoKHZhbD4wKSYmKHZhbDw9by5wYWdlcykpXG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHZhbCAtIDEpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVzY2FwZSB0byBjYW5jZWxcblx0XHRcdFx0XHRcdFx0XHQkZWxsaXAuZW1wdHkoKS5odG1sKG8uZWxsaXBzZVRleHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmJpbmQoJ2JsdXInLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgdmFsIC0gMSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0JGVsbGlwLmVtcHR5KCkuaHRtbChvLmVsbGlwc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH07XG5cblx0JC5mbi5wYWdpbmF0aW9uID0gZnVuY3Rpb24obWV0aG9kKSB7XG5cblx0XHQvLyBNZXRob2QgY2FsbGluZyBsb2dpY1xuXHRcdGlmIChtZXRob2RzW21ldGhvZF0gJiYgbWV0aG9kLmNoYXJBdCgwKSAhPSAnXycpIHtcblx0XHRcdHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQuZXJyb3IoJ01ldGhvZCAnICsgIG1ldGhvZCArICcgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnBhZ2luYXRpb24nKTtcblx0XHR9XG5cblx0fTtcblxufSkoalF1ZXJ5KTsiLCIvKlxuICAgIEEgc2ltcGxlIGpRdWVyeSBtb2RhbCAoaHR0cDovL2dpdGh1Yi5jb20va3lsZWZveC9qcXVlcnktbW9kYWwpXG4gICAgVmVyc2lvbiAwLjkuMlxuKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gIC8vIE1ha2luZyB5b3VyIGpRdWVyeSBwbHVnaW4gd29yayBiZXR0ZXIgd2l0aCBucG0gdG9vbHNcbiAgLy8gaHR0cDovL2Jsb2cubnBtanMub3JnL3Bvc3QvMTEyNzEyMTY5ODMwL21ha2luZy15b3VyLWpxdWVyeS1wbHVnaW4td29yay1iZXR0ZXItd2l0aC1ucG1cbiAgaWYodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHdpbmRvdywgZG9jdW1lbnQpO1xuICB9XG4gIGVsc2Uge1xuICAgIGZhY3RvcnkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcbiAgfVxufShmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblxuICB2YXIgbW9kYWxzID0gW10sXG4gICAgICBnZXRDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtb2RhbHMubGVuZ3RoID8gbW9kYWxzW21vZGFscy5sZW5ndGggLSAxXSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgc2VsZWN0Q3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSxcbiAgICAgICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAoaT1tb2RhbHMubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuICAgICAgICAgIGlmIChtb2RhbHNbaV0uJGJsb2NrZXIpIHtcbiAgICAgICAgICAgIG1vZGFsc1tpXS4kYmxvY2tlci50b2dnbGVDbGFzcygnY3VycmVudCcsIXNlbGVjdGVkKS50b2dnbGVDbGFzcygnYmVoaW5kJyxzZWxlY3RlZCk7XG4gICAgICAgICAgICBzZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICQueXNwX21vZGFsID0gZnVuY3Rpb24oZWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgcmVtb3ZlLCB0YXJnZXQ7XG4gICAgdGhpcy4kYm9keSA9ICQoJ2JvZHknKTtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC55c3BfbW9kYWwuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucy5kb0ZhZGUgPSAhaXNOYU4ocGFyc2VJbnQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgMTApKTtcbiAgICB0aGlzLiRibG9ja2VyID0gbnVsbDtcbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlRXhpc3RpbmcpXG4gICAgICB3aGlsZSAoJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgJC55c3BfbW9kYWwuY2xvc2UoKTsgLy8gQ2xvc2UgYW55IG9wZW4gbW9kYWxzLlxuICAgIG1vZGFscy5wdXNoKHRoaXMpO1xuICAgIGlmIChlbC5pcygnYScpKSB7XG4gICAgICB0YXJnZXQgPSBlbC5hdHRyKCdocmVmJyk7XG4gICAgICB0aGlzLmFuY2hvciA9IGVsO1xuICAgICAgLy9TZWxlY3QgZWxlbWVudCBieSBpZCBmcm9tIGhyZWZcbiAgICAgIGlmICgvXiMvLnRlc3QodGFyZ2V0KSkge1xuICAgICAgICB0aGlzLiRlbG0gPSAkKHRhcmdldCk7XG4gICAgICAgIGlmICh0aGlzLiRlbG0ubGVuZ3RoICE9PSAxKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAvL0FKQVhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbSA9ICQoJzxkaXY+Jyk7XG4gICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJGVsbSk7XG4gICAgICAgIHJlbW92ZSA9IGZ1bmN0aW9uKGV2ZW50LCBtb2RhbCkgeyBtb2RhbC5lbG0ucmVtb3ZlKCk7IH07XG4gICAgICAgIHRoaXMuc2hvd1NwaW5uZXIoKTtcbiAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX1NFTkQpO1xuICAgICAgICAkLmdldCh0YXJnZXQpLmRvbmUoZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSkgcmV0dXJuO1xuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9TVUNDRVNTKTtcbiAgICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgICBjdXJyZW50LiRlbG0uZW1wdHkoKS5hcHBlbmQoaHRtbCkub24oJC55c3BfbW9kYWwuQ0xPU0UsIHJlbW92ZSk7XG4gICAgICAgICAgY3VycmVudC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgIGN1cnJlbnQub3BlbigpO1xuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9DT01QTEVURSk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0ZBSUwpO1xuICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIGN1cnJlbnQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICBtb2RhbHMucG9wKCk7IC8vIHJlbW92ZSBleHBlY3RlZCBtb2RhbCBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGVsbSA9IGVsO1xuICAgICAgdGhpcy5hbmNob3IgPSBlbDtcbiAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJGVsbSk7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH07XG5cbiAgJC55c3BfbW9kYWwucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiAkLnlzcF9tb2RhbCxcblxuICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG0gPSB0aGlzO1xuICAgICAgdGhpcy5ibG9jaygpO1xuICAgICAgdGhpcy5hbmNob3IuYmx1cigpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG0uc2hvdygpO1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uICogdGhpcy5vcHRpb25zLmZhZGVEZWxheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bi5tb2RhbCcpLm9uKCdrZXlkb3duLm1vZGFsJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMjcgJiYgY3VycmVudC5vcHRpb25zLmVzY2FwZUNsb3NlKSBjdXJyZW50LmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2xpY2tDbG9zZSlcbiAgICAgICAgdGhpcy4kYmxvY2tlci5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzKVxuICAgICAgICAgICAgJC55c3BfbW9kYWwuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIG1vZGFscy5wb3AoKTtcbiAgICAgIHRoaXMudW5ibG9jaygpO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bi5tb2RhbCcpO1xuICAgIH0sXG5cbiAgICBibG9jazogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfQkxPQ0ssIFt0aGlzLl9jdHgoKV0pO1xuICAgICAgdGhpcy4kYm9keS5jc3MoJ292ZXJmbG93JywnaGlkZGVuJyk7XG4gICAgICB0aGlzLiRibG9ja2VyID0gJCgnPGRpdiBjbGFzcz1cIicgKyB0aGlzLm9wdGlvbnMuYmxvY2tlckNsYXNzICsgJyBibG9ja2VyIGN1cnJlbnRcIj48L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLiRib2R5KTtcbiAgICAgIHNlbGVjdEN1cnJlbnQoKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kYmxvY2tlci5jc3MoJ29wYWNpdHknLDApLmFuaW1hdGUoe29wYWNpdHk6IDF9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJMT0NLLCBbdGhpcy5fY3R4KCldKTtcbiAgICB9LFxuXG4gICAgdW5ibG9jazogZnVuY3Rpb24obm93KSB7XG4gICAgICBpZiAoIW5vdyAmJiB0aGlzLm9wdGlvbnMuZG9GYWRlKVxuICAgICAgICB0aGlzLiRibG9ja2VyLmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgdGhpcy51bmJsb2NrLmJpbmQodGhpcyx0cnVlKSk7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy4kYmxvY2tlci5jaGlsZHJlbigpLmFwcGVuZFRvKHRoaXMuJGJvZHkpO1xuICAgICAgICB0aGlzLiRibG9ja2VyLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLiRibG9ja2VyID0gbnVsbDtcbiAgICAgICAgc2VsZWN0Q3VycmVudCgpO1xuICAgICAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpXG4gICAgICAgICAgdGhpcy4kYm9keS5jc3MoJ292ZXJmbG93JywnJyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX09QRU4sIFt0aGlzLl9jdHgoKV0pO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaG93Q2xvc2UpIHtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9ICQoJzxhIGhyZWY9XCIjY2xvc2UtbW9kYWxcIiByZWw9XCJtb2RhbDpjbG9zZVwiIGNsYXNzPVwiY2xvc2UtbW9kYWwgJyArIHRoaXMub3B0aW9ucy5jbG9zZUNsYXNzICsgJ1wiPicgKyB0aGlzLm9wdGlvbnMuY2xvc2VUZXh0ICsgJzwvYT4nKTtcbiAgICAgICAgdGhpcy4kZWxtLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS5hZGRDbGFzcyh0aGlzLm9wdGlvbnMubW9kYWxDbGFzcykuYXBwZW5kVG8odGhpcy4kYmxvY2tlcik7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHRoaXMuJGVsbS5jc3Moe29wYWNpdHk6IDAsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snfSkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLk9QRU4sIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICBoaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9DTE9TRSwgW3RoaXMuX2N0eCgpXSk7XG4gICAgICBpZiAodGhpcy5jbG9zZUJ1dHRvbikgdGhpcy5jbG9zZUJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHRoaXMuJGVsbS5mYWRlT3V0KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UsIFtfdGhpcy5fY3R4KCldKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0uaGlkZSgwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkFGVEVSX0NMT1NFLCBbX3RoaXMuX2N0eCgpXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQ0xPU0UsIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICBzaG93U3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5zaG93U3Bpbm5lcikgcmV0dXJuO1xuICAgICAgdGhpcy5zcGlubmVyID0gdGhpcy5zcGlubmVyIHx8ICQoJzxkaXYgY2xhc3M9XCInICsgdGhpcy5vcHRpb25zLm1vZGFsQ2xhc3MgKyAnLXNwaW5uZXJcIj48L2Rpdj4nKVxuICAgICAgICAuYXBwZW5kKHRoaXMub3B0aW9ucy5zcGlubmVySHRtbCk7XG4gICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLnNwaW5uZXIpO1xuICAgICAgdGhpcy5zcGlubmVyLnNob3coKTtcbiAgICB9LFxuXG4gICAgaGlkZVNwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3Bpbm5lcikgdGhpcy5zcGlubmVyLnJlbW92ZSgpO1xuICAgIH0sXG5cbiAgICAvL1JldHVybiBjb250ZXh0IGZvciBjdXN0b20gZXZlbnRzXG4gICAgX2N0eDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4geyBlbG06IHRoaXMuJGVsbSwgJGVsbTogdGhpcy4kZWxtLCAkYmxvY2tlcjogdGhpcy4kYmxvY2tlciwgb3B0aW9uczogdGhpcy5vcHRpb25zLCAkYW5jaG9yOiB0aGlzLmFuY2hvciB9O1xuICAgIH1cbiAgfTtcblxuICAkLnlzcF9tb2RhbC5jbG9zZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKSByZXR1cm47XG4gICAgaWYgKGV2ZW50KSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgIGN1cnJlbnQuY2xvc2UoKTtcbiAgICByZXR1cm4gY3VycmVudC4kZWxtO1xuICB9O1xuXG4gIC8vIFJldHVybnMgaWYgdGhlcmUgY3VycmVudGx5IGlzIGFuIGFjdGl2ZSBtb2RhbFxuICAkLnlzcF9tb2RhbC5pc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbW9kYWxzLmxlbmd0aCA+IDA7XG4gIH07XG5cbiAgJC55c3BfbW9kYWwuZ2V0Q3VycmVudCA9IGdldEN1cnJlbnQ7XG5cbiAgJC55c3BfbW9kYWwuZGVmYXVsdHMgPSB7XG4gICAgY2xvc2VFeGlzdGluZzogdHJ1ZSxcbiAgICBlc2NhcGVDbG9zZTogdHJ1ZSxcbiAgICBjbGlja0Nsb3NlOiB0cnVlLFxuICAgIGNsb3NlVGV4dDogJ0Nsb3NlJyxcbiAgICBjbG9zZUNsYXNzOiAnJyxcbiAgICBtb2RhbENsYXNzOiBcInlzcC1tb2RhbFwiLFxuICAgIGJsb2NrZXJDbGFzczogXCJqcXVlcnktbW9kYWxcIixcbiAgICBzcGlubmVySHRtbDogJzxkaXYgY2xhc3M9XCJyZWN0MVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJyZWN0MlwiPjwvZGl2PjxkaXYgY2xhc3M9XCJyZWN0M1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJyZWN0NFwiPjwvZGl2PicsXG4gICAgc2hvd1NwaW5uZXI6IHRydWUsXG4gICAgc2hvd0Nsb3NlOiB0cnVlLFxuICAgIGZhZGVEdXJhdGlvbjogbnVsbCwgICAvLyBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoZSBmYWRlIGFuaW1hdGlvbiB0YWtlcy5cbiAgICBmYWRlRGVsYXk6IDEuMCAgICAgICAgLy8gUG9pbnQgZHVyaW5nIHRoZSBvdmVybGF5J3MgZmFkZS1pbiB0aGF0IHRoZSBtb2RhbCBiZWdpbnMgdG8gZmFkZSBpbiAoLjUgPSA1MCUsIDEuNSA9IDE1MCUsIGV0Yy4pXG4gIH07XG5cbiAgLy8gRXZlbnQgY29uc3RhbnRzXG4gICQueXNwX21vZGFsLkJFRk9SRV9CTE9DSyA9ICdtb2RhbDpiZWZvcmUtYmxvY2snO1xuICAkLnlzcF9tb2RhbC5CTE9DSyA9ICdtb2RhbDpibG9jayc7XG4gICQueXNwX21vZGFsLkJFRk9SRV9PUEVOID0gJ21vZGFsOmJlZm9yZS1vcGVuJztcbiAgJC55c3BfbW9kYWwuT1BFTiA9ICdtb2RhbDpvcGVuJztcbiAgJC55c3BfbW9kYWwuQkVGT1JFX0NMT1NFID0gJ21vZGFsOmJlZm9yZS1jbG9zZSc7XG4gICQueXNwX21vZGFsLkNMT1NFID0gJ21vZGFsOmNsb3NlJztcbiAgJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UgPSAnbW9kYWw6YWZ0ZXItY2xvc2UnO1xuICAkLnlzcF9tb2RhbC5BSkFYX1NFTkQgPSAnbW9kYWw6YWpheDpzZW5kJztcbiAgJC55c3BfbW9kYWwuQUpBWF9TVUNDRVNTID0gJ21vZGFsOmFqYXg6c3VjY2Vzcyc7XG4gICQueXNwX21vZGFsLkFKQVhfRkFJTCA9ICdtb2RhbDphamF4OmZhaWwnO1xuICAkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFID0gJ21vZGFsOmFqYXg6Y29tcGxldGUnO1xuXG4gICQuZm4ueXNwX21vZGFsID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAxKSB7XG4gICAgICBuZXcgJC55c3BfbW9kYWwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEF1dG9tYXRpY2FsbHkgYmluZCBsaW5rcyB3aXRoIHJlbD1cIm1vZGFsOmNsb3NlXCIgdG8sIHdlbGwsIGNsb3NlIHRoZSBtb2RhbC5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLm1vZGFsJywgJ2FbcmVsfj1cIm1vZGFsOmNsb3NlXCJdJywgJC55c3BfbW9kYWwuY2xvc2UpO1xuICAkKGRvY3VtZW50KS5vbignY2xpY2subW9kYWwnLCAnYVtyZWx+PVwibW9kYWw6b3BlblwiXScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMpLm1vZGFsKCk7XG4gIH0pO1xufSkpOyIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIFxuICBqUXVlcnkoJ1tkYXRhLW1vZGFsXScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgY29uc29sZS5sb2coJ2Z1Y2sgbWUgJyk7XG5cbiAgICB2YXIgZGF0YV9tb2RhbCA9IGpRdWVyeSh0aGlzKS5kYXRhKCdtb2RhbCcpO1xuXG4gICAgalF1ZXJ5KCBkYXRhX21vZGFsICkueXNwX21vZGFsKHtcbiAgICBcdGNsb3NlVGV4dDogJ1gnLFxuICAgICAgbW9kYWxDbGFzczogJ3lzcC1tb2RhbC1vcGVuJyxcbiAgICAgIGNsb3NlQ2xhc3M6ICd5c3AtbW9kZWwtY2xvc2UnXG4gICAgfSk7XG4gIH0pO1xufSk7XG4iLCJPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgJ2VhY2hXb3JkQ2FwaXRhbGl6ZScsIHtcbiAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRvTG93ZXJDYXNlKClcbiAgICAuc3BsaXQoJyAnKVxuICAgIC5tYXAoKHMpID0+IHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnN1YnN0cmluZygxKSlcbiAgICAuam9pbignICcpO1xuICB9LFxuICBlbnVtZXJhYmxlOiBmYWxzZVxufSk7XG5cbmZ1bmN0aW9uIHlzcF9nZXRfZm9ybV9kYXRhKGZvcm1fZWxlKSB7XG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCBmb3JtX2VsZSApO1xuXG4gICAgbGV0IGZkPU9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpO1xuXG4gICAgZm9yIChjb25zdCBbZkluZGV4LCBmaWVsZF0gb2YgT2JqZWN0LmVudHJpZXMoZmQpKSB7XG5cbiAgICAgICAgbGV0IFZhbEFycmF5ID0gZm9ybURhdGEuZ2V0QWxsKGZJbmRleCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBWYWxBcnJheVsxXSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZmRbIGZJbmRleCBdID0gVmFsQXJyYXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmRbIGZJbmRleCBdID09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgZmRbZkluZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmZDtcbn1cblxuZnVuY3Rpb24geXNwX3NldF9mb3JtX3RvX2RhdGEoaW5wdXREYXRhKSB7XG5cbiAgICBsZXQgZm9ybUE9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpO1xuICAgIGxldCBmb3JtQj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybScpO1xuXG4gICAgZm9ybUEucmVzZXQoKTtcbiAgICBmb3JtQi5yZXNldCgpO1xuXG4gICAgbGV0IGZvcm1JbnB1dHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AteWFjaHQtc2VhcmNoLWZvcm1cIl0sICN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm1cIl0nKTtcblxuICAgIGZvcm1JbnB1dHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIGxldCBpbnB1dCA9IGVsZTtcblxuICAgICAgICBsZXQgbmFtZSA9IGVsZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICBsZXQgaGFzUHJldHR5ID0gaW5wdXREYXRhWyBuYW1lIF07XG5cbiAgICAgICAvLyBjb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgaGFzUHJldHR5ICE9ICdudWxsJyAmJiB0eXBlb2YgaGFzUHJldHR5ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGhhc1ByZXR0eSkpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgICAgICBoYXNQcmV0dHkuZm9yRWFjaCgoaFApID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoUCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaGFzUHJldHR5ICkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBoYXNQcmV0dHk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB5c3BfcHVzaF9oaXN0b3J5KCBkYXRhID0ge30gKSB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBsZXQgc3RycGF0aD0nJztcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBsZXQgaXQgPSBkYXRhWyBwcm9wZXJ0eSBdO1xuXG5cbiAgICAgICAgaWYgKGl0ICE9ICcnICYmIHR5cGVvZiBpdCAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaXQgPT0gJ3N0cmluZycgJiYgcHJvcGVydHkgIT0gJ09uRmlyc3RMb2FkJyAmJiB0eXBlb2YgaXQgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIGl0KTtcblxuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoK1wiXCIrcHJvcGVydHkrJy0nKyhpdC50b1N0cmluZygpLnNwbGl0KCcgJykuam9pbignLScpKSsnLyc7XG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGl0KSkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgaXQpO1xuXG4gICAgICAgICAgICBpdCA9IGl0Lm1hcCgocHJvcCkgPT4geyByZXR1cm4gcHJvcC50b1N0cmluZygpLnNwbGl0KCcgJykuam9pbignLScpOyB9KTtcblxuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoK1wiXCIrcHJvcGVydHkrJy0nKyggaXQuam9pbihcIitcIikgKSsnLyc7XG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgudG9Mb3dlckNhc2UoKTsgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vaGlzdG9yeS5wdXNoU3RhdGUoZGF0YSwgJycsIHlzcF95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrJz8nK3NlYXJjaFBhcmFtcy50b1N0cmluZygpKTtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShkYXRhLCAnJywgeXNwX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCtzdHJwYXRoKTtcblxuICAgIHJldHVybiB5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsK3N0cnBhdGg7ICAgIFxufVxuXG4iLCJ2YXIgeXNwX2FwaT17fTtcblxuICAgIHlzcF9hcGkuY2FsbF9hcGk9ZnVuY3Rpb24obWV0aG9kLCBwYXRoLCBwYXNzaW5nX2RhdGEpIHtcbiAgICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9IEpTT04ucGFyc2UoIHRoaXMucmVzcG9uc2VUZXh0ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZURhdGEpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdHRVQnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXNzaW5nX2RhdGEubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gcGFzc2luZ19kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgcGFzc2luZ19kYXRhWyBwcm9wZXJ0eSBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9xdWVzdGlvbk1hcms9c2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCB5c3BfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInlzcC9cIisgcGF0aCArICgoX3F1ZXN0aW9uTWFyayAhPSAnJyk/Jz8nK3NlYXJjaFBhcmFtcy50b1N0cmluZygpOicnKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnUE9TVCc6XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAub3BlbihcIlBPU1RcIiwgeXNwX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJ5c3AvXCIrIHBhdGgsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShwYXNzaW5nX2RhdGEpKTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH07IiwidmFyIHlzcF90ZW1wbGF0ZXM9e307XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQ9e307XG5cdFxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0LmdyaWQ9ZnVuY3Rpb24odmVzc2VsLCBwYXJhbXMpIHtcblx0XHRsZXQgbWV0ZXJzID0gcGFyc2VJbnQodmVzc2VsLk5vbWluYWxMZW5ndGgpICogMC4zMDQ4O1xuXG5cdFx0bGV0IHByaWNlID0gJyc7XG5cdFx0bGV0IGxlbmd0aCA9ICcnO1xuXG5cdFx0aWYgKHlzcF95YWNodF9zeW5jLmV1cm9wZV9vcHRpb25fcGlja2VkID09IFwieWVzXCIpIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9ICh0eXBlb2YgdmVzc2VsLllTUF9FdXJvVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfRXVyb1ZhbCA+IDApID8gYOKCrCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfRXVyb1ZhbCkgfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdH0gXG5cdFx0ZWxzZSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IHZlc3NlbC5Ob21pbmFsTGVuZ3RoICsgXCIgLyBcIiArIG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXG5cdFx0XHRpZiAocGFyYW1zLmN1cnJlbmN5ID09ICdFdXInKSB7XG5cdFx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX1VTRFZhbCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuWVNQX1VTRFZhbCA+IDApID8gYOKCrCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfRXVyb1ZhbCkgfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX1VTRFZhbCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuWVNQX1VTRFZhbCA+IDApID8gYCQke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCh2ZXNzZWwuWVNQX1VTRFZhbCkgfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0bGV0IHZlc3NlbExvY2F0aW9uID0gKHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRCA9PSBcIlVTXCIgfHwgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEID09IFwiVW5pdGVkIFN0YXRlc1wiID8gYCR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUudG9Mb3dlckNhc2UoKX0sICR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0U3RhdGVDb2RlfWAgOiBgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDaXR5TmFtZS50b0xvd2VyQ2FzZSgpfSwgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUR9YCk7XG4gICAgICAgIFxuICAgICAgICAgICAgdmVzc2VsTG9jYXRpb24gPSB2ZXNzZWxMb2NhdGlvbjtcblxuXHRcdHJldHVybiBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieXNwLXlhY2h0LWl0ZW0geXNwLXZpZXctZ3JpZFwiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmktaW1hZ2VcIj5cblx0XHRcdFx0XHQ8YSBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogeXNwX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PHN2ZyB0aXRsZT1cImxpa2VcIiBjbGFzcz1cImxpa2UtbWUgbG92ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjU3XCIgaGVpZ2h0PVwiNTRcIiB2aWV3Qm94PVwiMCAwIDU3IDU0XCIgZmlsbD1cIm5vbmVcIiAgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0XHRcdCAgPGcgZmlsdGVyPVwidXJsKCNmaWx0ZXIwX2RfMjg4OF80MzMzKVwiPlxuXHRcdFx0XHRcdFx0ICAgIDxwYXRoIGQ9XCJNMzQuNzAyOCAxMS41NzU1QzM2LjIwOTQgMTEuNTc1NSAzNy42MjUxIDEyLjE2OTkgMzguNjg5OCAxMy4yNDg4TDM4LjgyMjMgMTMuMzgzQzQxLjAyMDYgMTUuNjExNiA0MS4wMjA2IDE5LjIzNzUgMzguODIyMyAyMS40NjZMMzguMDk5MiAyMi4xOTlMMjcuNDk5NSAzMi45NDQyTDE4LjQ4ODMgMjMuODA4TDE2LjkwMTEgMjIuMTk5TDE2LjE3OCAyMS40NjZDMTMuOTc5NyAxOS4yMzc1IDEzLjk3OTcgMTUuNjExNiAxNi4xNzggMTMuMzgzTDE2LjMwODMgMTMuMjUwOUMxNy4zNzM5IDEyLjE3MDggMTguNzkgMTEuNTc1OSAyMC4yOTYyIDExLjU3NjRDMjEuODAyMyAxMS41NzY0IDIzLjIxNzYgMTIuMTcwOCAyNC4yODE5IDEzLjI0OTJMMjUuMDA1IDEzLjk4MjJMMjcuNDk5MSAxNi41MTAxTDI5Ljk5MjggMTMuOTgxOEwzMC43MTU4IDEzLjI0ODhDMzEuNzgwMSAxMi4xNjk5IDMzLjE5NjIgMTEuNTc1NSAzNC43MDI4IDExLjU3NTVaTTM0LjcwMjggOEMzMi4zNTcgOCAzMC4wMTEyIDguOTA2OCAyOC4yMjIyIDEwLjcyMDRMMjcuNDk5MSAxMS40NTM0TDI2Ljc3NiAxMC43MjA0QzI0Ljk4NzggOC45MDcyMyAyMi42NDIgOC4wMDA0MyAyMC4yOTcgOEMxNy45NTA4IDggMTUuNjA1IDguOTA3MjMgMTMuODE0NyAxMC43MjIxTDEzLjY4NDQgMTAuODU0MkMxMC4xMDQ2IDE0LjQ4MzIgMTAuMTA0NiAyMC4zNjQ1IDEzLjY4NDQgMjMuOTkzNUwxNC40MDc0IDI0LjcyNjVMMTUuOTk0NiAyNi4zMzU0TDI3LjQ5OTUgMzhMNDAuNTkzMyAyNC43MjY1TDQxLjMxNjQgMjMuOTkzNUM0NC44OTQ1IDIwLjM2NjMgNDQuODk0NSAxNC40ODE0IDQxLjMxNjQgMTAuODU0Mkw0MS4xODM5IDEwLjcyQzM5LjM5NDUgOC45MDY4IDM3LjA0ODYgOCAzNC43MDI4IDhaXCIgZmlsbD1cIndoaXRlXCI+PC9wYXRoPlxuXHRcdFx0XHRcdFx0ICA8L2c+XG5cdFx0XHRcdFx0XHQgIDxkZWZzPlxuXHRcdFx0XHRcdFx0ICAgIDxmaWx0ZXIgaWQ9XCJmaWx0ZXIwX2RfMjg4OF80MzMzXCIgeD1cIi0wLjAwMDQ4ODI4MVwiIHk9XCIwXCIgd2lkdGg9XCI1Ny4wMDA1XCIgaGVpZ2h0PVwiNTRcIiBmaWx0ZXJVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPVwic1JHQlwiPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT1cIjBcIiByZXN1bHQ9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIj48L2ZlRmxvb2Q+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb2xvck1hdHJpeCBpbj1cIlNvdXJjZUFscGhhXCIgdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwXCIgcmVzdWx0PVwiaGFyZEFscGhhXCI+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlT2Zmc2V0IGR4PVwiMVwiIGR5PVwiNFwiPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPVwiNlwiPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb21wb3NpdGUgaW4yPVwiaGFyZEFscGhhXCIgb3BlcmF0b3I9XCJvdXRcIj48L2ZlQ29tcG9zaXRlPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMFwiPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUJsZW5kIG1vZGU9XCJub3JtYWxcIiBpbjI9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIiByZXN1bHQ9XCJlZmZlY3QxX2Ryb3BTaGFkb3dfMjg4OF80MzMzXCI+PC9mZUJsZW5kPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQmxlbmQgbW9kZT1cIm5vcm1hbFwiIGluPVwiU291cmNlR3JhcGhpY1wiIGluMj1cImVmZmVjdDFfZHJvcFNoYWRvd18yODg4XzQzMzNcIiByZXN1bHQ9XCJzaGFwZVwiPjwvZmVCbGVuZD5cblx0XHRcdFx0XHRcdCAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHRcdCAgPC9kZWZzPlxuXHRcdFx0XHRcdFx0PC9zdmc+XG5cblx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cInRvcC1jb21wYXJlXCIgdGl0bGU9XCJjb21wYXJlXCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNvbXBhcmVfdG9nZ2xlXCIgbmFtZT1cImNvbXBhcmVcIiB2YWx1ZT1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiAvPlxuXG5cdFx0XHRcdFx0XHRcdDxzdmcgd2lkdGg9XCI1OFwiIGhlaWdodD1cIjI1XCIgdmlld0JveD1cIjAgMCA1OCAyNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTUxLjUwMjkgMTguMTk1M0w1NC42NzUzIDE0Ljc3NjdDNTUuNDQxMSAxMy45NTE1IDU1LjEyNTggMTIuNTQxOCA1NC4wOTM3IDEyLjE4NDNMNTIuMiAxMS41Mjg0VjQuNjg3NUM1Mi4yIDMuODI0NTYgNTEuNTUwOCAzLjEyNSA1MC43NSAzLjEyNUg0Ny44NVYxLjE3MTg3QzQ3Ljg1IDAuNTI0NjU4IDQ3LjM2MzEgMCA0Ni43NjI1IDBINDAuMjM3NUMzOS42MzY5IDAgMzkuMTUgMC41MjQ2NTggMzkuMTUgMS4xNzE4N1YzLjEyNUgzNi4yNUMzNS40NDkyIDMuMTI1IDM0LjggMy44MjQ1NiAzNC44IDQuNjg3NVYxMS41Mjg0TDMyLjkwNjMgMTIuMTg0M0MzMS44NzUzIDEyLjU0MTQgMzEuNTU4MSAxMy45NTA2IDMyLjMyNDcgMTQuNzc2N0wzNS40OTcxIDE4LjE5NTNDMzQuNzAxNiAyMC4zMjY1IDMyLjg3ODIgMjEuODc1IDMwLjA4NzUgMjEuODc1QzI5LjQ4NjkgMjEuODc1IDI5IDIyLjM5OTcgMjkgMjMuMDQ2OVYyMy44MjgxQzI5IDI0LjQ3NTMgMjkuNDg2OSAyNSAzMC4wODc1IDI1QzMyLjg1MjYgMjUgMzQuOTU4NSAyMy45OTM3IDM2LjU3ODkgMjIuMDk5OEMzNy4yMzIyIDIzLjgwMDQgMzguNzg4NSAyNSA0MC42IDI1SDQ2LjRDNDguMjExNiAyNSA0OS43Njc4IDIzLjgwMDQgNTAuNDIxMSAyMi4wOTk4QzUyLjA0MTIgMjMuOTkzNCA1NC4xNDcgMjUgNTYuOTEyNSAyNUM1Ny41MTMxIDI1IDU4IDI0LjQ3NTMgNTggMjMuODI4MVYyMy4wNDY5QzU4IDIyLjM5OTcgNTcuNTEzMSAyMS44NzUgNTYuOTEyNSAyMS44NzVDNTQuMTU2NyAyMS44NzUgNTIuMzExNCAyMC4zNjEzIDUxLjUwMjkgMTguMTk1M1pNMzcuNyA2LjI1SDQ5LjNWMTAuNTI0TDQzLjk0MzcgOC42Njg3NUM0My42NTUyIDguNTY4OCA0My4zNDQ4IDguNTY4OCA0My4wNTYzIDguNjY4NzVMMzcuNyAxMC41MjRWNi4yNVpcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNMjIuNTAyOSAxOC4xOTUzTDI1LjY3NTMgMTQuNzc2N0MyNi40NDExIDEzLjk1MTUgMjYuMTI1OCAxMi41NDE4IDI1LjA5MzcgMTIuMTg0M0wyMy4yIDExLjUyODRWNC42ODc1QzIzLjIgMy44MjQ1NiAyMi41NTA4IDMuMTI1IDIxLjc1IDMuMTI1SDE4Ljg1VjEuMTcxODhDMTguODUgMC41MjQ2NTggMTguMzYzMSAwIDE3Ljc2MjUgMEgxMS4yMzc1QzEwLjYzNjkgMCAxMC4xNSAwLjUyNDY1OCAxMC4xNSAxLjE3MTg4VjMuMTI1SDcuMjVDNi40NDkxOSAzLjEyNSA1LjggMy44MjQ1NiA1LjggNC42ODc1VjExLjUyODRMMy45MDYzIDEyLjE4NDNDMi44NzUzIDEyLjU0MTQgMi41NTgwNyAxMy45NTA2IDMuMzI0NjcgMTQuNzc2N0w2LjQ5NzA5IDE4LjE5NTNDNS43MDE1OCAyMC4zMjY1IDMuODc4MTYgMjEuODc1IDEuMDg3NSAyMS44NzVDMC40ODY4ODMgMjEuODc1IDAgMjIuMzk5NyAwIDIzLjA0NjlWMjMuODI4MUMwIDI0LjQ3NTMgMC40ODY4ODMgMjUgMS4wODc1IDI1QzMuODUyNiAyNSA1Ljk1ODU1IDIzLjk5MzcgNy41Nzg4OCAyMi4wOTk4QzguMjMyMjQgMjMuODAwNCA5Ljc4ODQ1IDI1IDExLjYgMjVIMTcuNEMxOS4yMTE1IDI1IDIwLjc2NzggMjMuODAwNCAyMS40MjExIDIyLjA5OThDMjMuMDQxMiAyMy45OTM0IDI1LjE0NyAyNSAyNy45MTI1IDI1QzI4LjUxMzEgMjUgMjkgMjQuNDc1MyAyOSAyMy44MjgxVjIzLjA0NjlDMjkgMjIuMzk5NyAyOC41MTMxIDIxLjg3NSAyNy45MTI1IDIxLjg3NUMyNS4xNTY3IDIxLjg3NSAyMy4zMTE0IDIwLjM2MTMgMjIuNTAyOSAxOC4xOTUzWk04LjcgNi4yNUgyMC4zVjEwLjUyNEwxNC45NDM3IDguNjY4NzVDMTQuNjU1MiA4LjU2ODggMTQuMzQ0OCA4LjU2ODggMTQuMDU2MyA4LjY2ODc1TDguNyAxMC41MjRWNi4yNVpcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDwvc3ZnPlx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8L2xhYmVsPlxuXG5cblx0XHRcdFx0XHRcdCR7dmVzc2VsLkNvbXBhbnlOYW1lID09PSB5c3BfeWFjaHRfc3luYy5jb21wYW55X25hbWUgPyBgPGRpdiBjbGFzcz1cImNvbXBhbnktYmFubmVyXCI+PGltZyBzcmM9XCIke3lzcF95YWNodF9zeW5jLmNvbXBhbnlfbG9nb31cIj48L2Rpdj5gIDogJyd9XG5cdFx0XHRcdFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1wcmljZVwiPiR7IHByaWNlIH08L3NwYW4+XG5cdFx0XHRcdFx0PC9hPlx0XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJyZXN1bHQtaXRlbS1pbmZvXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLXRvcFwiPlxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktbmFtZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9PC9zcGFuPjxicj5cblxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJpLXN1Yi1uYW1lXCI+JHsgdmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJ04vQScgfTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyaS1ib3R0b21cIj5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktbG9jYXRpb25cIj5cdFxuXHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiL3lhY2h0LXNlYXJjaC95c19rZXl3b3JkLSR7IHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lLnJlcGxhY2UoJyAnLCAnLScpIH0vXCI+XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMThcIiB2aWV3Qm94PVwiMCAwIDE4IDE4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk0xNS43NSA3LjVDMTUuNzUgMTIuNzUgOSAxNy4yNSA5IDE3LjI1QzkgMTcuMjUgMi4yNSAxMi43NSAyLjI1IDcuNUMyLjI1IDUuNzA5NzkgMi45NjExNiAzLjk5MjkgNC4yMjcwMyAyLjcyNzAzQzUuNDkyOSAxLjQ2MTE2IDcuMjA5NzkgMC43NSA5IDAuNzVDMTAuNzkwMiAwLjc1IDEyLjUwNzEgMS40NjExNiAxMy43NzMgMi43MjcwM0MxNS4wMzg4IDMuOTkyOSAxNS43NSA1LjcwOTc5IDE1Ljc1IDcuNVpcIiBzdHJva2U9XCIjMDY3QUVEXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNOSA5Ljc1QzEwLjI0MjYgOS43NSAxMS4yNSA4Ljc0MjY0IDExLjI1IDcuNUMxMS4yNSA2LjI1NzM2IDEwLjI0MjYgNS4yNSA5IDUuMjVDNy43NTczNiA1LjI1IDYuNzUgNi4yNTczNiA2Ljc1IDcuNUM2Ljc1IDguNzQyNjQgNy43NTczNiA5Ljc1IDkgOS43NVpcIiBzdHJva2U9XCIjMDY3QUVEXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuXHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0XHRcdCR7IHZlc3NlbExvY2F0aW9uIH1cblx0XHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdFx0PC9zcGFuPlxuXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxcIiBjbGFzcz1cInJpLWNvbnRhY3RcIiBkYXRhLW1vZGFsPVwiI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxcIj5cblx0XHRcdFx0XHRcdFx0Q29udGFjdFxuXHRcdFx0XHRcdFx0XHQ8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cIm5vbmVcIj5cblx0XHRcdFx0XHRcdFx0PGcgY2xpcC1wYXRoPVwidXJsKCNjbGlwMF84MTAxXzEwMjc3KVwiPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTE1LjU1NTYgMEg1Ljc3NzhDNS41MzIxNCAwIDUuMzMzMzQgMC4xOTg3OTIgNS4zMzMzNCAwLjQ0NDQ1OEM1LjMzMzM0IDAuNjkwMTI1IDUuNTMyMTQgMC44ODg5MTcgNS43Nzc4IDAuODg4OTE3SDE0LjQ4MjdMMC4xMzAyMTkgMTUuMjQxM0MtMC4wNDM0MDYyIDE1LjQxNSAtMC4wNDM0MDYyIDE1LjY5NjIgMC4xMzAyMTkgMTUuODY5OEMwLjIxNzAxIDE1Ljk1NjYgMC4zMzA3NiAxNiAwLjQ0NDQ2OSAxNkMwLjU1ODE3NyAxNiAwLjY3MTg4NSAxNS45NTY2IDAuNzU4NzE5IDE1Ljg2OThMMTUuMTExMSAxLjUxNzM3VjEwLjIyMjJDMTUuMTExMSAxMC40Njc5IDE1LjMwOTkgMTAuNjY2NyAxNS41NTU2IDEwLjY2NjdDMTUuODAxMyAxMC42NjY3IDE2LjAwMDEgMTAuNDY3OSAxNi4wMDAxIDEwLjIyMjJWMC40NDQ0NThDMTYgMC4xOTg3OTIgMTUuODAxMiAwIDE1LjU1NTYgMFpcIiBmaWxsPVwiIzA2N0FFRFwiLz5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0XHQ8ZGVmcz5cblx0XHRcdFx0XHRcdFx0PGNsaXBQYXRoIGlkPVwiY2xpcDBfODEwMV8xMDI3N1wiPlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDwvY2xpcFBhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZGVmcz5cblx0XHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3Q9ZnVuY3Rpb24odmVzc2VsKSB7XG5cdFx0bGV0IG1ldGVycyA9IHBhcnNlSW50KHZlc3NlbC5Ob21pbmFsTGVuZ3RoKSAqIDAuMzA0ODtcblx0XHRsZXQgcHJpY2UgPSAnJztcblxuXHRcdGlmICh0eXBlb2YgdmVzc2VsLlByaWNlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRsZXQgcHJpY2UgPSB2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpO1xuXHRcdH1cblx0XHRcblx0XHRsZXQgbGVuZ3RoID0gJyc7XG5cdFx0XG5cdFx0aWYoeXNwX3lhY2h0X3N5bmMuZXVyb3BlX29wdGlvbl9waWNrZWQgPT0gXCJ5ZXNcIil7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSB2ZXNzZWwuUHJpY2UgPyBg4oKsICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KChwYXJzZUludCh2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpKSAqIHlzcF95YWNodF9zeW5jLmV1cm9fY19jKSl9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gdmVzc2VsLk5vbWluYWxMZW5ndGggKyBcIiAvIFwiICsgbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9IHZlc3NlbC5QcmljZSA/IGAkICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHBhcnNlSW50KHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykpKX1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJ1xuXHRcdH1cblxuXHRcdGxldCB2ZXNzZWxMb2NhdGlvbiA9ICh2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUQgPT0gXCJVU1wiIHx8IHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRCA9PSBcIlVuaXRlZCBTdGF0ZXNcIiA/IGAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lLnRvTG93ZXJDYXNlKCl9LCAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdFN0YXRlQ29kZX1gIDogYCR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUudG9Mb3dlckNhc2UoKX0sICR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEfWApO1xuICAgICAgICBcbiAgICAgICAgICAgIHZlc3NlbExvY2F0aW9uID0gdmVzc2VsTG9jYXRpb247XG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlzcC15YWNodC1pdGVtIHlzcC12aWV3LWxpc3RcIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLWltYWdlXCI+XG5cdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtaW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHlzcF95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDxzdmcgdGl0bGU9XCJjb21wYXJlXCIgY2xhc3M9XCJsaWtlLW1lIGxvdmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCI1N1wiIGhlaWdodD1cIjU0XCIgdmlld0JveD1cIjAgMCA1NyA1NFwiIGZpbGw9XCJub25lXCIgIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XG5cdFx0XHRcdFx0XHQgIDxnIGZpbHRlcj1cInVybCgjZmlsdGVyMF9kXzI4ODhfNDMzMylcIj5cblx0XHRcdFx0XHRcdCAgICA8cGF0aCBkPVwiTTM0LjcwMjggMTEuNTc1NUMzNi4yMDk0IDExLjU3NTUgMzcuNjI1MSAxMi4xNjk5IDM4LjY4OTggMTMuMjQ4OEwzOC44MjIzIDEzLjM4M0M0MS4wMjA2IDE1LjYxMTYgNDEuMDIwNiAxOS4yMzc1IDM4LjgyMjMgMjEuNDY2TDM4LjA5OTIgMjIuMTk5TDI3LjQ5OTUgMzIuOTQ0MkwxOC40ODgzIDIzLjgwOEwxNi45MDExIDIyLjE5OUwxNi4xNzggMjEuNDY2QzEzLjk3OTcgMTkuMjM3NSAxMy45Nzk3IDE1LjYxMTYgMTYuMTc4IDEzLjM4M0wxNi4zMDgzIDEzLjI1MDlDMTcuMzczOSAxMi4xNzA4IDE4Ljc5IDExLjU3NTkgMjAuMjk2MiAxMS41NzY0QzIxLjgwMjMgMTEuNTc2NCAyMy4yMTc2IDEyLjE3MDggMjQuMjgxOSAxMy4yNDkyTDI1LjAwNSAxMy45ODIyTDI3LjQ5OTEgMTYuNTEwMUwyOS45OTI4IDEzLjk4MThMMzAuNzE1OCAxMy4yNDg4QzMxLjc4MDEgMTIuMTY5OSAzMy4xOTYyIDExLjU3NTUgMzQuNzAyOCAxMS41NzU1Wk0zNC43MDI4IDhDMzIuMzU3IDggMzAuMDExMiA4LjkwNjggMjguMjIyMiAxMC43MjA0TDI3LjQ5OTEgMTEuNDUzNEwyNi43NzYgMTAuNzIwNEMyNC45ODc4IDguOTA3MjMgMjIuNjQyIDguMDAwNDMgMjAuMjk3IDhDMTcuOTUwOCA4IDE1LjYwNSA4LjkwNzIzIDEzLjgxNDcgMTAuNzIyMUwxMy42ODQ0IDEwLjg1NDJDMTAuMTA0NiAxNC40ODMyIDEwLjEwNDYgMjAuMzY0NSAxMy42ODQ0IDIzLjk5MzVMMTQuNDA3NCAyNC43MjY1TDE1Ljk5NDYgMjYuMzM1NEwyNy40OTk1IDM4TDQwLjU5MzMgMjQuNzI2NUw0MS4zMTY0IDIzLjk5MzVDNDQuODk0NSAyMC4zNjYzIDQ0Ljg5NDUgMTQuNDgxNCA0MS4zMTY0IDEwLjg1NDJMNDEuMTgzOSAxMC43MkMzOS4zOTQ1IDguOTA2OCAzNy4wNDg2IDggMzQuNzAyOCA4WlwiIGZpbGw9XCJ3aGl0ZVwiPjwvcGF0aD5cblx0XHRcdFx0XHRcdCAgPC9nPlxuXHRcdFx0XHRcdFx0ICA8ZGVmcz5cblx0XHRcdFx0XHRcdCAgICA8ZmlsdGVyIGlkPVwiZmlsdGVyMF9kXzI4ODhfNDMzM1wiIHg9XCItMC4wMDA0ODgyODFcIiB5PVwiMFwiIHdpZHRoPVwiNTcuMDAwNVwiIGhlaWdodD1cIjU0XCIgZmlsdGVyVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz1cInNSR0JcIj5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUZsb29kIGZsb29kLW9wYWNpdHk9XCIwXCIgcmVzdWx0PVwiQmFja2dyb3VuZEltYWdlRml4XCI+PC9mZUZsb29kPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29sb3JNYXRyaXggaW49XCJTb3VyY2VBbHBoYVwiIHR5cGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMFwiIHJlc3VsdD1cImhhcmRBbHBoYVwiPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZU9mZnNldCBkeD1cIjFcIiBkeT1cIjRcIj48L2ZlT2Zmc2V0PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj1cIjZcIj48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29tcG9zaXRlIGluMj1cImhhcmRBbHBoYVwiIG9wZXJhdG9yPVwib3V0XCI+PC9mZUNvbXBvc2l0ZT5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDBcIj48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVCbGVuZCBtb2RlPVwibm9ybWFsXCIgaW4yPVwiQmFja2dyb3VuZEltYWdlRml4XCIgcmVzdWx0PVwiZWZmZWN0MV9kcm9wU2hhZG93XzI4ODhfNDMzM1wiPjwvZmVCbGVuZD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUJsZW5kIG1vZGU9XCJub3JtYWxcIiBpbj1cIlNvdXJjZUdyYXBoaWNcIiBpbjI9XCJlZmZlY3QxX2Ryb3BTaGFkb3dfMjg4OF80MzMzXCIgcmVzdWx0PVwic2hhcGVcIj48L2ZlQmxlbmQ+XG5cdFx0XHRcdFx0XHQgICAgPC9maWx0ZXI+XG5cdFx0XHRcdFx0XHQgIDwvZGVmcz5cblx0XHRcdFx0XHRcdDwvc3ZnPlxuXG5cdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJ0b3AtY29tcGFyZVwiIHRpdGxlPVwiY29tcGFyZVwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjb21wYXJlX3RvZ2dsZVwiIG5hbWU9XCJjb21wYXJlXCIgdmFsdWU9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgLz5cblxuXHRcdFx0XHRcdFx0XHQ8c3ZnIHdpZHRoPVwiNThcIiBoZWlnaHQ9XCIyNVwiIHZpZXdCb3g9XCIwIDAgNTggMjVcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk01MS41MDI5IDE4LjE5NTNMNTQuNjc1MyAxNC43NzY3QzU1LjQ0MTEgMTMuOTUxNSA1NS4xMjU4IDEyLjU0MTggNTQuMDkzNyAxMi4xODQzTDUyLjIgMTEuNTI4NFY0LjY4NzVDNTIuMiAzLjgyNDU2IDUxLjU1MDggMy4xMjUgNTAuNzUgMy4xMjVINDcuODVWMS4xNzE4N0M0Ny44NSAwLjUyNDY1OCA0Ny4zNjMxIDAgNDYuNzYyNSAwSDQwLjIzNzVDMzkuNjM2OSAwIDM5LjE1IDAuNTI0NjU4IDM5LjE1IDEuMTcxODdWMy4xMjVIMzYuMjVDMzUuNDQ5MiAzLjEyNSAzNC44IDMuODI0NTYgMzQuOCA0LjY4NzVWMTEuNTI4NEwzMi45MDYzIDEyLjE4NDNDMzEuODc1MyAxMi41NDE0IDMxLjU1ODEgMTMuOTUwNiAzMi4zMjQ3IDE0Ljc3NjdMMzUuNDk3MSAxOC4xOTUzQzM0LjcwMTYgMjAuMzI2NSAzMi44NzgyIDIxLjg3NSAzMC4wODc1IDIxLjg3NUMyOS40ODY5IDIxLjg3NSAyOSAyMi4zOTk3IDI5IDIzLjA0NjlWMjMuODI4MUMyOSAyNC40NzUzIDI5LjQ4NjkgMjUgMzAuMDg3NSAyNUMzMi44NTI2IDI1IDM0Ljk1ODUgMjMuOTkzNyAzNi41Nzg5IDIyLjA5OThDMzcuMjMyMiAyMy44MDA0IDM4Ljc4ODUgMjUgNDAuNiAyNUg0Ni40QzQ4LjIxMTYgMjUgNDkuNzY3OCAyMy44MDA0IDUwLjQyMTEgMjIuMDk5OEM1Mi4wNDEyIDIzLjk5MzQgNTQuMTQ3IDI1IDU2LjkxMjUgMjVDNTcuNTEzMSAyNSA1OCAyNC40NzUzIDU4IDIzLjgyODFWMjMuMDQ2OUM1OCAyMi4zOTk3IDU3LjUxMzEgMjEuODc1IDU2LjkxMjUgMjEuODc1QzU0LjE1NjcgMjEuODc1IDUyLjMxMTQgMjAuMzYxMyA1MS41MDI5IDE4LjE5NTNaTTM3LjcgNi4yNUg0OS4zVjEwLjUyNEw0My45NDM3IDguNjY4NzVDNDMuNjU1MiA4LjU2ODggNDMuMzQ0OCA4LjU2ODggNDMuMDU2MyA4LjY2ODc1TDM3LjcgMTAuNTI0VjYuMjVaXCIgZmlsbD1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTIyLjUwMjkgMTguMTk1M0wyNS42NzUzIDE0Ljc3NjdDMjYuNDQxMSAxMy45NTE1IDI2LjEyNTggMTIuNTQxOCAyNS4wOTM3IDEyLjE4NDNMMjMuMiAxMS41Mjg0VjQuNjg3NUMyMy4yIDMuODI0NTYgMjIuNTUwOCAzLjEyNSAyMS43NSAzLjEyNUgxOC44NVYxLjE3MTg4QzE4Ljg1IDAuNTI0NjU4IDE4LjM2MzEgMCAxNy43NjI1IDBIMTEuMjM3NUMxMC42MzY5IDAgMTAuMTUgMC41MjQ2NTggMTAuMTUgMS4xNzE4OFYzLjEyNUg3LjI1QzYuNDQ5MTkgMy4xMjUgNS44IDMuODI0NTYgNS44IDQuNjg3NVYxMS41Mjg0TDMuOTA2MyAxMi4xODQzQzIuODc1MyAxMi41NDE0IDIuNTU4MDcgMTMuOTUwNiAzLjMyNDY3IDE0Ljc3NjdMNi40OTcwOSAxOC4xOTUzQzUuNzAxNTggMjAuMzI2NSAzLjg3ODE2IDIxLjg3NSAxLjA4NzUgMjEuODc1QzAuNDg2ODgzIDIxLjg3NSAwIDIyLjM5OTcgMCAyMy4wNDY5VjIzLjgyODFDMCAyNC40NzUzIDAuNDg2ODgzIDI1IDEuMDg3NSAyNUMzLjg1MjYgMjUgNS45NTg1NSAyMy45OTM3IDcuNTc4ODggMjIuMDk5OEM4LjIzMjI0IDIzLjgwMDQgOS43ODg0NSAyNSAxMS42IDI1SDE3LjRDMTkuMjExNSAyNSAyMC43Njc4IDIzLjgwMDQgMjEuNDIxMSAyMi4wOTk4QzIzLjA0MTIgMjMuOTkzNCAyNS4xNDcgMjUgMjcuOTEyNSAyNUMyOC41MTMxIDI1IDI5IDI0LjQ3NTMgMjkgMjMuODI4MVYyMy4wNDY5QzI5IDIyLjM5OTcgMjguNTEzMSAyMS44NzUgMjcuOTEyNSAyMS44NzVDMjUuMTU2NyAyMS44NzUgMjMuMzExNCAyMC4zNjEzIDIyLjUwMjkgMTguMTk1M1pNOC43IDYuMjVIMjAuM1YxMC41MjRMMTQuOTQzNyA4LjY2ODc1QzE0LjY1NTIgOC41Njg4IDE0LjM0NDggOC41Njg4IDE0LjA1NjMgOC42Njg3NUw4LjcgMTAuNTI0VjYuMjVaXCIgZmlsbD1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8L3N2Zz5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PC9sYWJlbD5cblxuXHRcdFx0XHRcdFx0JHt2ZXNzZWwuQ29tcGFueU5hbWUgPT09IHlzcF95YWNodF9zeW5jLmNvbXBhbnlfbmFtZSA/IGA8ZGl2IGNsYXNzPVwiY29tcGFueS1iYW5uZXJcIj48aW1nIHNyYz1cIiR7eXNwX3lhY2h0X3N5bmMuY29tcGFueV9sb2dvfVwiPjwvZGl2PmAgOiAnJ31cblx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJpLXByaWNlXCI+JHsgcHJpY2UgfTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2E+XHRcblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInJlc3VsdC1pdGVtLWluZm9cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmktdG9wXCI+XG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1uYW1lXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ308L3NwYW4+PGJyIC8+XG5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1zdWItbmFtZVwiPiR7IHZlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICdOL0EnIH08L3NwYW4+PGJyIC8+XG5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1sb2NhdGlvblwiPlx0XHRcblx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiL3lhY2h0LXNlYXJjaC95c19rZXl3b3JkLSR7IHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lLnJlcGxhY2UoJyAnLCAnLScpIH0vXCI+XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMThcIiB2aWV3Qm94PVwiMCAwIDE4IDE4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTE1Ljc1IDcuNUMxNS43NSAxMi43NSA5IDE3LjI1IDkgMTcuMjVDOSAxNy4yNSAyLjI1IDEyLjc1IDIuMjUgNy41QzIuMjUgNS43MDk3OSAyLjk2MTE2IDMuOTkyOSA0LjIyNzAzIDIuNzI3MDNDNS40OTI5IDEuNDYxMTYgNy4yMDk3OSAwLjc1IDkgMC43NUMxMC43OTAyIDAuNzUgMTIuNTA3MSAxLjQ2MTE2IDEzLjc3MyAyLjcyNzAzQzE1LjAzODggMy45OTI5IDE1Ljc1IDUuNzA5NzkgMTUuNzUgNy41WlwiIHN0cm9rZT1cIiMwNjdBRURcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTkgOS43NUMxMC4yNDI2IDkuNzUgMTEuMjUgOC43NDI2NCAxMS4yNSA3LjVDMTEuMjUgNi4yNTczNiAxMC4yNDI2IDUuMjUgOSA1LjI1QzcuNzU3MzYgNS4yNSA2Ljc1IDYuMjU3MzYgNi43NSA3LjVDNi43NSA4Ljc0MjY0IDcuNzU3MzYgOS43NSA5IDkuNzVaXCIgc3Ryb2tlPVwiIzA2N0FFRFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0XHRcdFx0JHsgdmVzc2VsTG9jYXRpb24gfVxuXHRcdFx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLWJvdHRvbVwiPlxuXHRcdFx0XHRcdFx0PHNwYW4+XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PC9zcGFuPlxuXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxcIiBjbGFzcz1cInJpLWNvbnRhY3RcIiBkYXRhLW1vZGFsPVwiI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxcIj5cblx0XHRcdFx0XHRcdFx0Q29udGFjdFxuXHRcdFx0XHRcdFx0XHQ8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cIm5vbmVcIj5cblx0XHRcdFx0XHRcdFx0PGcgY2xpcC1wYXRoPVwidXJsKCNjbGlwMF84MTAxXzEwMjc3KVwiPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTE1LjU1NTYgMEg1Ljc3NzhDNS41MzIxNCAwIDUuMzMzMzQgMC4xOTg3OTIgNS4zMzMzNCAwLjQ0NDQ1OEM1LjMzMzM0IDAuNjkwMTI1IDUuNTMyMTQgMC44ODg5MTcgNS43Nzc4IDAuODg4OTE3SDE0LjQ4MjdMMC4xMzAyMTkgMTUuMjQxM0MtMC4wNDM0MDYyIDE1LjQxNSAtMC4wNDM0MDYyIDE1LjY5NjIgMC4xMzAyMTkgMTUuODY5OEMwLjIxNzAxIDE1Ljk1NjYgMC4zMzA3NiAxNiAwLjQ0NDQ2OSAxNkMwLjU1ODE3NyAxNiAwLjY3MTg4NSAxNS45NTY2IDAuNzU4NzE5IDE1Ljg2OThMMTUuMTExMSAxLjUxNzM3VjEwLjIyMjJDMTUuMTExMSAxMC40Njc5IDE1LjMwOTkgMTAuNjY2NyAxNS41NTU2IDEwLjY2NjdDMTUuODAxMyAxMC42NjY3IDE2LjAwMDEgMTAuNDY3OSAxNi4wMDAxIDEwLjIyMjJWMC40NDQ0NThDMTYgMC4xOTg3OTIgMTUuODAxMiAwIDE1LjU1NTYgMFpcIiBmaWxsPVwiIzA2N0FFRFwiLz5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0XHQ8ZGVmcz5cblx0XHRcdFx0XHRcdFx0PGNsaXBQYXRoIGlkPVwiY2xpcDBfODEwMV8xMDI3N1wiPlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDwvY2xpcFBhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZGVmcz5cblx0XHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHRcblx0XHRgO1xuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuY29tcGFyZV9wcmV2aWV3ID0gZnVuY3Rpb24odmVzc2VsLCBwYXJhbXMpIHtcblxuXHRcdHJldHVybiBgXG5cblx0XHRcdDxkaXYgY2xhc3M9XCJ5c3AteWFjaHQtY29tcGFyZS1wcmV2aWV3XCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XHRcdFx0XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwicmVtb3ZlLWZyb20tY29tcGFyZVwiPlxuXHRcdFx0XHRcdDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdDxyZWN0IHg9XCIwLjVcIiB5PVwiMC41XCIgd2lkdGg9XCIyM1wiIGhlaWdodD1cIjIzXCIgcng9XCIxMS41XCIgc3Ryb2tlPVwiI0ZGRkZGRlwiLz5cblx0XHRcdFx0XHQ8cGF0aCBkPVwiTTguMjY4NzYgMTQuOTM0NkM4LjA0OTA5IDE1LjE1NDMgOC4wNDkwOSAxNS41MTA0IDguMjY4NzYgMTUuNzMwMUM4LjQ4ODQzIDE1Ljk0OTggOC44NDQ1OCAxNS45NDk4IDkuMDY0MjUgMTUuNzMwMUw4LjI2ODc2IDE0LjkzNDZaTTEyLjM5NzYgMTIuMzk2OEMxMi42MTczIDEyLjE3NzEgMTIuNjE3MyAxMS44MjA5IDEyLjM5NzYgMTEuNjAxM0MxMi4xNzc5IDExLjM4MTYgMTEuODIxOCAxMS4zODE2IDExLjYwMjEgMTEuNjAxM0wxMi4zOTc2IDEyLjM5NjhaTTExLjYwMTggMTEuNjAxNkMxMS4zODIxIDExLjgyMTMgMTEuMzgyMSAxMi4xNzc0IDExLjYwMTggMTIuMzk3MUMxMS44MjE0IDEyLjYxNjggMTIuMTc3NiAxMi42MTY4IDEyLjM5NzMgMTIuMzk3MUwxMS42MDE4IDExLjYwMTZaTTE1LjczMDYgOS4wNjM3NkMxNS45NTAzIDguODQ0MDkgMTUuOTUwMyA4LjQ4Nzk0IDE1LjczMDYgOC4yNjgyN0MxNS41MTA5IDguMDQ4NiAxNS4xNTQ4IDguMDQ4NiAxNC45MzUxIDguMjY4MjdMMTUuNzMwNiA5LjA2Mzc2Wk0xMi4zOTczIDExLjYwMTNDMTIuMTc3NiAxMS4zODE2IDExLjgyMTQgMTEuMzgxNiAxMS42MDE4IDExLjYwMTNDMTEuMzgyMSAxMS44MjA5IDExLjM4MjEgMTIuMTc3MSAxMS42MDE4IDEyLjM5NjhMMTIuMzk3MyAxMS42MDEzWk0xNC45MzUxIDE1LjczMDFDMTUuMTU0OCAxNS45NDk4IDE1LjUxMDkgMTUuOTQ5OCAxNS43MzA2IDE1LjczMDFDMTUuOTUwMyAxNS41MTA0IDE1Ljk1MDMgMTUuMTU0MyAxNS43MzA2IDE0LjkzNDZMMTQuOTM1MSAxNS43MzAxWk0xMS42MDIxIDEyLjM5NzFDMTEuODIxOCAxMi42MTY4IDEyLjE3NzkgMTIuNjE2OCAxMi4zOTc2IDEyLjM5NzFDMTIuNjE3MyAxMi4xNzc0IDEyLjYxNzMgMTEuODIxMyAxMi4zOTc2IDExLjYwMTZMMTEuNjAyMSAxMi4zOTcxWk05LjA2NDI1IDguMjY4MjdDOC44NDQ1OCA4LjA0ODYgOC40ODg0MyA4LjA0ODYgOC4yNjg3NiA4LjI2ODI3QzguMDQ5MDkgOC40ODc5NCA4LjA0OTA5IDguODQ0MDkgOC4yNjg3NiA5LjA2Mzc2TDkuMDY0MjUgOC4yNjgyN1pNOS4wNjQyNSAxNS43MzAxTDEyLjM5NzYgMTIuMzk2OEwxMS42MDIxIDExLjYwMTNMOC4yNjg3NiAxNC45MzQ2TDkuMDY0MjUgMTUuNzMwMVpNMTIuMzk3MyAxMi4zOTcxTDE1LjczMDYgOS4wNjM3NkwxNC45MzUxIDguMjY4MjdMMTEuNjAxOCAxMS42MDE2TDEyLjM5NzMgMTIuMzk3MVpNMTEuNjAxOCAxMi4zOTY4TDE0LjkzNTEgMTUuNzMwMUwxNS43MzA2IDE0LjkzNDZMMTIuMzk3MyAxMS42MDEzTDExLjYwMTggMTIuMzk2OFpNMTIuMzk3NiAxMS42MDE2TDkuMDY0MjUgOC4yNjgyN0w4LjI2ODc2IDkuMDYzNzZMMTEuNjAyMSAxMi4zOTcxTDEyLjM5NzYgMTEuNjAxNlpcIiBmaWxsPVwiI0ZGRkZGRlwiLz5cblx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0PC9zcGFuPlxuXG5cdFx0XHRcdDxhIGNsYXNzPVwicHJldmlldy1saW5rXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cblx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogeXNwX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XG5cdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdDwvYT5cblxuXHRcdFx0PC9kaXY+XG5cblx0XHRgO1xuXG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy5ub1Jlc3VsdHM9ZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGI+Tm8gUmVzdWx0czwvYj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgfTtcblxuXG4gICAgeXNwX3RlbXBsYXRlcy55YWNodF90YWcgPSBmdW5jdGlvbihsYWJlbCwgdmFsdWUpIHtcblxuICAgIFx0cmV0dXJuIGBcbiAgICBcdFx0PHNwYW4+XG5cdCAgICBcdFx0JHt2YWx1ZX1cblxuXHQgICAgXHRcdDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiOFwiIGhlaWdodD1cIjhcIiB2aWV3Qm94PVwiMCAwIDggOFwiIGZpbGw9XCJub25lXCI+XG5cdFx0XHRcdDxwYXRoIGQ9XCJNMC4yMTk3NTQgMC4yMjAxMjFDMC4yODkzMTkgMC4xNTA0NTcgMC4zNzE5MzYgMC4wOTUxOTAyIDAuNDYyODc4IDAuMDU3NDgyN0MwLjU1MzgyMSAwLjAxOTc3NTIgMC42NTEzMDUgMC4wMDAzNjYyMTEgMC43NDk3NTQgMC4wMDAzNjYyMTFDMC44NDgyMDQgMC4wMDAzNjYyMTEgMC45NDU2ODggMC4wMTk3NzUyIDEuMDM2NjMgMC4wNTc0ODI3QzEuMTI3NTcgMC4wOTUxOTAyIDEuMjEwMTkgMC4xNTA0NTcgMS4yNzk3NSAwLjIyMDEyMUwzLjk5OTc1IDIuOTM5MTJMNi43MTk3NSAwLjIyMDEyMUM2Ljc4OTM2IDAuMTUwNTIgNi44NzE5OCAwLjA5NTMwOTggNi45NjI5MiAwLjA1NzY0MjJDNy4wNTM4NiAwLjAxOTk3NDYgNy4xNTEzMiAwLjAwMDU4NzQ2NSA3LjI0OTc1IDAuMDAwNTg3NDYzQzcuMzQ4MTggMC4wMDA1ODc0NjEgNy40NDU2NSAwLjAxOTk3NDcgNy41MzY1OSAwLjA1NzY0MjJDNy42Mjc1MyAwLjA5NTMwOTggNy43MTAxNSAwLjE1MDUyIDcuNzc5NzUgMC4yMjAxMjFDNy44NDkzNSAwLjI4OTcyMSA3LjkwNDU2IDAuMzcyMzQ5IDcuOTQyMjMgMC40NjMyODdDNy45Nzk5IDAuNTU0MjI0IDcuOTk5MjkgMC42NTE2OTEgNy45OTkyOSAwLjc1MDEyMUM3Ljk5OTI5IDAuODQ4NTUxIDcuOTc5OSAwLjk0NjAxNyA3Ljk0MjIzIDEuMDM2OTVDNy45MDQ1NiAxLjEyNzg5IDcuODQ5MzUgMS4yMTA1MiA3Ljc3OTc1IDEuMjgwMTJMNS4wNjA3NSA0LjAwMDEyTDcuNzc5NzUgNi43MjAxMkM3LjkyMDMyIDYuODYwNjkgNy45OTkyOSA3LjA1MTMzIDcuOTk5MjkgNy4yNTAxMkM3Ljk5OTI5IDcuNDQ4OTEgNy45MjAzMiA3LjYzOTU2IDcuNzc5NzUgNy43ODAxMkM3LjYzOTE5IDcuOTIwNjkgNy40NDg1NCA3Ljk5OTY1IDcuMjQ5NzUgNy45OTk2NUM3LjA1MDk3IDcuOTk5NjUgNi44NjAzMiA3LjkyMDY5IDYuNzE5NzUgNy43ODAxMkwzLjk5OTc1IDUuMDYxMTJMMS4yNzk3NSA3Ljc4MDEyQzEuMTM5MTkgNy45MjA2OSAwLjk0ODU0MyA3Ljk5OTY1IDAuNzQ5NzU0IDcuOTk5NjVDMC41NTA5NjYgNy45OTk2NSAwLjM2MDMxOSA3LjkyMDY5IDAuMjE5NzU0IDcuNzgwMTJDMC4wNzkxODk3IDcuNjM5NTYgMC4wMDAyMjEyNTIgNy40NDg5MSAwLjAwMDIyMTI1MiA3LjI1MDEyQzAuMDAwMjIxMjUyIDcuMDUxMzMgMC4wNzkxODk3IDYuODYwNjkgMC4yMTk3NTQgNi43MjAxMkwyLjkzODc1IDQuMDAwMTJMMC4yMTk3NTQgMS4yODAxMkMwLjE1MDA5IDEuMjEwNTYgMC4wOTQ4MjQgMS4xMjc5NCAwLjA1NzExNjUgMS4wMzdDMC4wMTk0MDkgMC45NDYwNTQgMCAwLjg0ODU3IDAgMC43NTAxMjFDMCAwLjY1MTY3MSAwLjAxOTQwOSAwLjU1NDE4NyAwLjA1NzExNjUgMC40NjMyNDRDMC4wOTQ4MjQgMC4zNzIzMDIgMC4xNTAwOSAwLjI4OTY4NiAwLjIxOTc1NCAwLjIyMDEyMVpcIiBmaWxsPVwiIzJEMzc0OFwiLz5cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHQ8L3NwYW4+XG4gICAgXHRgO1xuICAgIH07XG5cbiAgICB5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24gPSB7fTtcbiAgICBcbiAgICBcdHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5uZXh0X3RleHQgPSBgPmA7XG5cbiAgICBcdHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5wcmV2X3RleHQgPSBgPGA7XG5cbiIsIlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cblx0bGV0IGVsZV9xdWlja19zZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXF1aWNrLXNlYXJjaC1mb3JtJyk7XG5cblx0aWYgKGVsZV9xdWlja19zZWFyY2gpIHtcblx0XHQvLyBGaWxsIG9wdGlvbnNcblx0ICAgIGxldCBGaWxsT3B0aW9ucz1bXTtcblx0ICAgIGxldCBzZWxlY3RvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55c3AtcXVpY2stc2VhcmNoLWZvcm0gc2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zXVwiKTtcblxuXHQgICAgc2VsZWN0b3JFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICBGaWxsT3B0aW9ucy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1vcHRpb25zJykpO1xuXHQgICAgfSk7XG5cdCAgICBcblx0ICAgIHlzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnZHJvcGRvd24tb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxPcHRpb25zfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuXHQgICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cblx0ICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55c3AtcXVpY2stc2VhcmNoLWZvcm0gc2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zPSdcIisgbGFiZWwgK1wiJ11cIik7XG5cdCAgICAgICAgICAgIGxldCBuYW1lID0gU2VsZWN0b3JFbGVbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cblx0ICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICBcdGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG5cdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG5cdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLmFkZChvcHRpb24pO1xuXHQgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGxldCBVUkxSRUYgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuXHQgICAgICAgICAgICBsZXQgVXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcblxuXHQgICAgICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cblx0ICAgICAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZSh5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG5cdCAgICAgICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuXHQgICAgICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuXHQgICAgICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuXHQgICAgICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcblx0ICAgICAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscy5qb2luKCcgJyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXS5lYWNoV29yZENhcGl0YWxpemUoKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICBpZiAoVXJsVmFsICE9ICcnICYmIFVybFZhbCAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhVcmxWYWwpO1xuXG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVybFZhbCA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIFVybFZhbCA9IFVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsOyBcblx0ICAgICAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIH1cblxuXG5cdCAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cblx0ICAgICAgICAgICAgY29uc29sZS5sb2coIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXSk7XG5cblx0ICAgICAgICAgICAgaWYgKGhhc1ByZXR0eSAhPSAnJyAmJiBoYXNQcmV0dHkgIT0gbnVsbCkge1xuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5OyBcblx0ICAgICAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KVxuXHR9XG59KTsiLCJmdW5jdGlvbiB5c3BfbWFrZVNlYXJjaFRhZ3MoIGRhdGEgKSB7XG5cblx0bGV0IHRhZ3NFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXNlYXJjaC10YWdzJyk7XG4gICAgICAgIFxuICAgIGlmICh0YWdzRWxlKSB7XG4gICAgICAgIHRhZ3NFbGUuZm9yRWFjaChmdW5jdGlvbih0ZSkge1xuICAgICAgICAgICAgdGUuaW5uZXJIVE1MPVwiXCI7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdmFyIHlzcF90YWdzX25vdF9wcmludCA9IFsncGFnZV9pbmRleCcsICcnXTtcblxuICAgICAgICBmb3IgKGxldCBwYXJhbUtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWw9Jyc7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9JysgcGFyYW1LZXkgKyddJykpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxhYmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj0nKyBwYXJhbUtleSArJ10nKS5pbm5lclRleHQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykuaGFzQXR0cmlidXRlKCdsYWJlbCcpKSB7XG5cbiAgICAgICAgICAgICAgICBsYWJlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykuZ2V0QXR0cmlidXRlKCdsYWJlbCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGFnc0VsZS5mb3JFYWNoKGZ1bmN0aW9uKHRlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoeXNwX3RhZ3Nfbm90X3ByaW50LmluZGV4T2YoIHBhcmFtS2V5ICkgPT0gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZT0nKyBwYXJhbUtleSArJ10nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlSW5wdXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1RhZ0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFnVmFsID0gZGF0YVtwYXJhbUtleV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlSW5wdXQudGFnTmFtZSA9PSAnU0VMRUNUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSBlbGVJbnB1dC5vcHRpb25zWyBlbGVJbnB1dC5zZWxlY3RlZEluZGV4IF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbUtleS5tYXRjaCgncHJpY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSAnJCcrdGFnVmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbUtleS5tYXRjaCgnbGVuZ3RoJykgJiYgcGFyYW1LZXkgIT0gJ2xlbmd0aHVuaXQnKSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbGVVbml0ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gW25hbWU9bGVuZ3RodW5pdF06Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEgZWxlVW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZVVuaXQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBbbmFtZT1sZW5ndGh1bml0XScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9IHRhZ1ZhbCArJyAnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVVbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgKz0gZWxlVW5pdC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5jbGFzc05hbWUgPSAnYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSB5c3AtdGFnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbGFiZWwgIT0gbnVsbCAmJiBsYWJlbCAhPSAnbnVsbCcgJiYgbGFiZWwgIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmlubmVySFRNTCA9IHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnKGxhYmVsLCB0YWdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmlubmVySFRNTCA9IHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnKCcnLCB0YWdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5zZXRBdHRyaWJ1dGUoJ2tleScsIHBhcmFtS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZS5hcHBlbmRDaGlsZCggbmV3VGFnRWxlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC10YWdba2V5PVwiJysgcGFyYW1LZXkgKydcIl0nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKCcueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4ueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpLmZvckVhY2goZnVuY3Rpb24oeXNwVGFnRWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeXNwVGFnRWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2tleScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRFbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSBzZWxlY3RbbmFtZT0nKyBrZXkgKyddLCAueXNwLXlhY2h0LXNlYXJjaC1mb3JtIGlucHV0W25hbWU9Jysga2V5ICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dEVsZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZXMuZm9yRWFjaChmdW5jdGlvbihlbGVJKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVJLnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGVsZUkudHlwZSA9PSAnY2hlY2tib3gnIHx8IGVsZUkudHlwZSA9PSAncmFkaW8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVJLmNoZWNrZWQ9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZUkudmFsdWU9Jyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVzWzBdLmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxufSIsImZ1bmN0aW9uIHlzcF9tYXJrTG92ZWRWZXNzZWwoIGVsZV9jYXJkICkge1xuXG4gICAgalF1ZXJ5KCcubG92ZScsIGVsZV9jYXJkKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnRvZ2dsZUNsYXNzKCdsb3ZlZCcpO1xuXG4gICAgICAgIGxldCB5YWNodElkID0galF1ZXJ5KHRoaXMpLmRhdGEoJ3lhY2h0LWlkJyk7XG4gICAgXG4gICAgICAgIGlmICggalF1ZXJ5KHRoaXMpLmhhc0NsYXNzKCdsb3ZlZCcpICkge1xuICAgICAgICAgICAgeXNwX2FkZExvdmVkVmVzc2VsKHlhY2h0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeXNwX3JlbW92ZUxvdmVkVmVzc2VsKHlhY2h0SWQpO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0geXNwX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMueXNfeWFjaHRzX2xvdmVkICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZWxlX2NhcmQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpICE9IFwiXCIpIHtcblxuICAgICAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgneWFjaHQtaWQnKTtcblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKSAhPSAtMSkge1xuXG4gICAgICAgICAgICBlbGVfY2FyZC5hZGRDbGFzcygnbG92ZWQnKTtcblxuICAgICAgICAgICAgalF1ZXJ5KCcubG92ZScsIGVsZV9jYXJkKS5hZGRDbGFzcygnbG92ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5mdW5jdGlvbiB5c3BfYWRkTG92ZWRWZXNzZWwoIHlhY2h0SWQgKSB7XG5cbiAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICBpZiAobG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKSA9PSAtMSkge1xuXG4gICAgICAgIGxvdmVkVmVzc2Vscy5wdXNoKHlhY2h0SWQpO1xuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBhbHJlYWR5IGFkZGVkXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2cobG92ZWRWZXNzZWxzICk7XG4gICAgXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5c3BfbG92ZWRfdmVzc2Vsc1wiLCBKU09OLnN0cmluZ2lmeShsb3ZlZFZlc3NlbHMpKTtcblxufSBcblxuZnVuY3Rpb24geXNwX3JlbW92ZUxvdmVkVmVzc2VsKCB5YWNodElkICkge1xuXG4gICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgbGV0IGluZGV4ZWQgPSBsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApO1xuXG4gICAgY29uc29sZS5sb2coaW5kZXhlZCk7XG5cbiAgICBpZiAoaW5kZXhlZCAhPSAtMSkge1xuXG4gICAgICAgIGRlbGV0ZSBsb3ZlZFZlc3NlbHNbaW5kZXhlZF07ICAgICAgICBcbiAgICAgICAgbG92ZWRWZXNzZWxzLnNwbGljZShpbmRleGVkLCAxKTtcblxuXG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGFscmVhZHkgYWRkZWRcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhsb3ZlZFZlc3NlbHMgKTtcbiAgICBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInlzcF9sb3ZlZF92ZXNzZWxzXCIsIEpTT04uc3RyaW5naWZ5KGxvdmVkVmVzc2VscykpO1xuXG59IiwidmFyIFlTUF9WZXNzZWxDb21wYXJlTGlzdD1bXTtcblxuXG5mdW5jdGlvbiB5c3BfcmVzdG9yZUNvbXBhcmVzKCkge1xuICAgIGxldCBVUkxSRUY9bmV3IFVSTChsb2NhdGlvbi5ocmVmKTsgLy8gbWF5YmUgZm9yIGEgcmUtZG9cbiAgICBsZXQgY29tcGFyZV9wb3N0X2lkcyA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCAncmVzdG9yZV90b19jb21wYXJlJyApOyBcblxuICAgIGNvbnNvbGUubG9nKHR5cGVvZiBjb21wYXJlX3Bvc3RfaWRzKTtcbiAgICBjb25zb2xlLmxvZyhjb21wYXJlX3Bvc3RfaWRzKTtcblxuICAgIGlmICh0eXBlb2YgY29tcGFyZV9wb3N0X2lkcyA9PSAnc3RyaW5nJykge1xuICAgICAgICBZU1BfVmVzc2VsQ29tcGFyZUxpc3QgPSBjb21wYXJlX3Bvc3RfaWRzLnNwbGl0KCcsJyk7XG4gICAgXG5cbiAgICAgICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xuICAgIH1cblxuXG5cbn1cblxuXG5mdW5jdGlvbiB5c3BfbWFrZUNvbXBhcmVWZXNzZWwoZWxlX2NhcmQpIHtcblx0IFxuXHQgalF1ZXJ5KCcuY29tcGFyZV90b2dnbGUnLCBlbGVfY2FyZCkuY2hhbmdlKGZ1bmN0aW9uKGUpIHtcblx0IFx0Y29uc29sZS5sb2coJ2hvd2R5Jyk7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCdwb3N0LWlkJyk7XG4gICAgXG4gICAgICAgIGlmICggalF1ZXJ5KHRoaXMpLmhhc0NsYXNzKCdhcm1lZCcpICkge1xuICAgICAgICAgICAgeXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3Bvc3QtaWQnKTtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApICE9IC0xICB8fCBZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZC50b1N0cmluZygpICkgIT0gLTEgKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvIHdvcmxkIHJlc3RvcmVkJyk7XG5cbiAgICAgICAgZWxlX2NhcmQuYWRkQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgalF1ZXJ5KCcuY29tcGFyZV90b2dnbGUnLCBlbGVfY2FyZCkuYWRkQ2xhc3MoJ2FybWVkJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHlzcF9hZGRWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpIHtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApID09IC0xKSB7XG5cbiAgICBcdFlTUF9WZXNzZWxDb21wYXJlTGlzdC5wdXNoKHlhY2h0SWQpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuICAgIFxuZnVuY3Rpb24geXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCkge1xuXHRsZXQgaW5kZXhlZCA9IFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkIClcblxuXHRpZiAoIGluZGV4ZWQgIT0gLTEpIHtcblxuICAgIFx0ZGVsZXRlIFlTUF9WZXNzZWxDb21wYXJlTGlzdFtpbmRleGVkXTsgICAgICAgIFxuICAgICAgICBZU1BfVmVzc2VsQ29tcGFyZUxpc3Quc3BsaWNlKGluZGV4ZWQsIDEpO1xuICBcdFx0XG4gICAgICAgIFxuICAgIH1cblxuICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcbn1cblxuZnVuY3Rpb24geXNwX21ha2VDb21wYXJlTGlua291dCgpIHtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RoID49IDIpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykuaHJlZj15c3BfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInlzcC9jb21wYXJlLz9wb3N0SUQ9XCIrWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmpvaW4oJywnKTtcbiAgICBcdCAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dCcpLmlubmVySFRNTD1gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ5c3AtZ2VuZXJhbC1idXR0b25cIj5Db21wYXJlICggJHtZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RofSApPC9idXR0b24+YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dF9tb2JpbGUnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXRfbW9iaWxlJykuaHJlZj15c3BfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInlzcC9jb21wYXJlLz9wb3N0SUQ9XCIrWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmpvaW4oJywnKTtcbiAgICBcdCAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dF9tb2JpbGUnKS5pbm5lckhUTUw9YDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwieXNwLWdlbmVyYWwtYnV0dG9uXCI+Q29tcGFyZSAoICR7WVNQX1Zlc3NlbENvbXBhcmVMaXN0Lmxlbmd0aH0gKTwvYnV0dG9uPmA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAncG9zdF9faW4nOiBZU1BfVmVzc2VsQ29tcGFyZUxpc3QsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHlzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIHBhcmFtcykudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuXG4gICAgICAgICAgICBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cycpLmh0bWwoJycpO1xuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmNvbXBhcmVfcHJldmlldyhpdGVtLCBwYXJhbXMpICk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZWxlX3ByZXZpZXcgPSBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cyAqW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcucmVtb3ZlLWZyb20tY29tcGFyZScsIGVsZV9wcmV2aWV3KS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCdkaXZbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10gLmNvbXBhcmVfdG9nZ2xlJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKS5yZW1vdmVDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdChpdGVtLl9wb3N0SUQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG5cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuaHRtbCgnPHNwYW4gc3R5bGU9XCJjb2xvcjogI2ZmZjtcIj5QaWNrIHR3byB0byBjb21wYXJlLjwvc3Bhbj4nKTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwX2NvbXBhcmVfbGlua291dCcpLmh0bWwoJycpO1xuICAgICAgICBqUXVlcnkoJyN5c3BfY29tcGFyZV9saW5rb3V0X21vYmlsZScpLmh0bWwoJycpO1xuICAgIH1cblxuXG4gICAgXG5cblxuXG59XG4iLCJjb25zdCB5c3BCZWZvcmVZYWNodFNlYXJjaCA9IG5ldyBFdmVudChcInlzcC1iZWZvcmUtc3VibWl0dGluZy15YWNodC1zZWFyY2hcIik7XG5jb25zdCB5c3BBZnRlcllhY2h0U2VhcmNoID0gbmV3IEV2ZW50KFwieXNwLWFmdGVyLXN1Ym1pdHRpbmcteWFjaHQtc2VhcmNoXCIpO1xuY29uc3QgeXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCA9IG5ldyBFdmVudChcInlzcC1hZnRlci1yZW5kZXJpbmcteWFjaHQtc2VhcmNoXCIpO1xuXG5mdW5jdGlvbiB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZGF0YSkge1xuXG4gICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMnKS5odG1sKCcnKTtcbiAgICBqUXVlcnkoJyN5c3AteWFjaHQtcmVzdWx0cy1wYWdpbmF0aW9uJykuaHRtbCgnJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXlhY2h0LXJlc3VsdHMtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRlZCcpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AteWFjaHQtcmVzdWx0cy1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xuXG4gICAgeXNwX3NldF9mb3JtX3RvX2RhdGEoIGRhdGEgKTtcblxuICAgIHlzcF9tYWtlU2VhcmNoVGFncyggZGF0YSApO1xuXG4gICAgLy8gR0VUIEFORCBXUklURVxuICAgIHJldHVybiB5c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBcInlhY2h0c1wiLCBkYXRhKS50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC15YWNodC1yZXN1bHRzLXNlY3Rpb24nKS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AteWFjaHQtcmVzdWx0cy1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG5cbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBkYXRhX3Jlc3VsdC5TRU8udGl0bGU7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1zZWFyY2gtaGVhZGluZycpLnRleHQoZGF0YV9yZXN1bHQuU0VPLmhlYWRpbmcpO1xuICAgICAgICBqUXVlcnkoJyN5c3Atc2VhcmNoLXBhcmFncmFwaCcpLnRleHQoZGF0YV9yZXN1bHQuU0VPLnApO1xuXG4gICAgICAgIGpRdWVyeSgnI3lzcC10b3RhbC15YWNodC1yZXN1bHRzJykudGV4dChuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLUlOJywgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDMgfSkuZm9ybWF0KGRhdGFfcmVzdWx0LnRvdGFsKSk7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRVUkw9bnVsbDtcblxuICAgICAgICBpZiAodHlwZW9mIGRhdGEuZG9udF9wdXNoID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjdXJyZW50VVJMPXlzcF9wdXNoX2hpc3RvcnkoIGRhdGEgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRVUkwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZGF0YV9yZXN1bHQudG90YWwgPiAwKSB7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLnJlbW92ZUNsYXNzKFsndmlldy1ncmlkJywgJ3ZpZXctbGlzdCddKTtcblxuICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS52aWV3ICE9ICd1bmRlZmluZWQnICYmIGRhdGEudmlldy50b0xvd2VyQ2FzZSgpID09ICdsaXN0Jykge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmFkZENsYXNzKCd2aWV3LWxpc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmFkZENsYXNzKCd2aWV3LWdyaWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YV9yZXN1bHQucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEudmlldyAhPSAndW5kZWZpbmVkJyAmJiBkYXRhLnZpZXcudG9Mb3dlckNhc2UoKSA9PSAnbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYWRkQ2xhc3MoJ3ZpZXctbGlzdCcpLnJlbW92ZUNsYXNzKCd2aWV3LWdyaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3QoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmFkZENsYXNzKCd2aWV3LWdyaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmdyaWQoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZWxlX2NhcmQgPSBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMgW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG5cbiAgICAgICAgICAgICAgICBqUXVlcnkoJ1tkYXRhLW1vZGFsPSN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsXScsIGVsZV9jYXJkKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IEJvYXROYW1lID0gaXRlbS5Nb2RlbFllYXIgKyAnICcgKyBpdGVtLk1ha2VTdHJpbmcgKyAnICcgKyBpdGVtLkJvYXROYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWwgLmJvYXRuYW1lJykuaHRtbChCb2F0TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWwgaW5wdXRbbmFtZT1XaGljaEJvYXRdJykudmFsKEJvYXROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXlhY2h0LXJlc3VsdHMtbGVhZC1tb2RhbCBpbnB1dFtuYW1lPVdoaWNoQm9hdElEXScpLnZhbChpdGVtLl9wb3N0SUQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhX21vZGFsID0galF1ZXJ5KHRoaXMpLmRhdGEoJ21vZGFsJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBkYXRhX21vZGFsICkueXNwX21vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxDbGFzczogJ3lzcC1tb2RhbC1vcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xhc3M6ICd5c3AtbW9kZWwtY2xvc2UnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgeXNwX21hcmtMb3ZlZFZlc3NlbCggZWxlX2NhcmQgKTsgICAgIFxuICAgICAgICAgICAgICAgIHlzcF9tYWtlQ29tcGFyZVZlc3NlbCggZWxlX2NhcmQgKTsgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3lzcC15YWNodC1yZXN1bHRzLXBhZ2luYXRpb24nKS5wYWdpbmF0aW9uKHtcbiAgICAgICAgICAgICAgICBpdGVtczogZGF0YV9yZXN1bHQudG90YWwsXG4gICAgICAgICAgICAgICAgaXRlbXNPblBhZ2U6IDEyLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkYXRhLnBhZ2VfaW5kZXgsXG4gICAgICAgICAgICAgICAgcHJldlRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5wcmV2X3RleHQsXG4gICAgICAgICAgICAgICAgbmV4dFRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5uZXh0X3RleHQsXG4gICAgICAgICAgICAgICAgZWRnZXM6IDQsXG4gICAgICAgICAgICAgICAgZGlzcGxheWVkUGFnZXM6IDQsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRQcmVmaXg6IGN1cnJlbnRVUkwucmVwbGFjZShuZXcgUmVnRXhwKFwicGFnZV9pbmRleC0oXFxcXGQqKSgvKVwiLCBcImdcIiksIFwiXCIpKydwYWdlX2luZGV4LScsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRTdWZmaXg6ICcvJyxcbiAgICAgICAgICAgICAgICBvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIGlucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT1wYWdlTnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtRGF0YU9iamVjdCA9IHlzcF9nZXRfZm9ybV9kYXRhKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykgKTtcblxuICAgICAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZm9ybURhdGFPYmplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmFwcGVuZCh5c3BfdGVtcGxhdGVzLm5vUmVzdWx0cygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IChqUXVlcnkoXCIuc2Nyb2xsLXRvLWhlcmUtb24teWFjaHQtc2VhcmNoXCIpLm9mZnNldCgpLnRvcClcbiAgICAgICAgfSwgMjUwKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtOm5vdCgjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSknKS5kaXNwYXRjaEV2ZW50KHlzcEFmdGVyUmVuZGVyaW5nWWFjaHQpO1xuXG4gICAgICAgIHJldHVybiBkYXRhX3Jlc3VsdDtcblxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgfSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gRmlsbCBMaXN0IE9wdGlvbnNcbiAgICBsZXQgRmlsbExpc3RzPVtdO1xuICAgIGxldCBsaXN0RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3RdXCIpO1xuICAgIGxldCBsaXN0TmVlZGVkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbGlzdF1cIik7XG5cbiAgICBsaXN0RWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIEZpbGxMaXN0cy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykpO1xuICAgIH0pO1xuXG4gICAgbGlzdE5lZWRlZEVsZW1lbnRzLmZvckVhY2goKGlucHV0X2VsZSkgPT4ge1xuXG4gICAgICAgIGlucHV0X2VsZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGxldCBsaXN0X2lkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnbGlzdCcpO1xuXG4gICAgICAgICAgICBsZXQgZWxlX2xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGF0YWxpc3QjXCIrbGlzdF9pZCk7XG5cbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUubGVuZ3RoIDw9IDMpIHtcblxuICAgICAgICAgICAgICAgIHlzcF9hcGkuY2FsbF9hcGkoXG4gICAgICAgICAgICAgICAgICAgICdQT1NUJywgXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LW9wdGlvbnMtd2l0aC12YWx1ZScsIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IFsgZWxlX2xpc3QuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtbGlzdCcpIF0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFwcGVuZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KTtcblxuICAgIH0pXG4gICAgXG4vKiAgICB5c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2xpc3Qtb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxMaXN0c30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuKi9cbiAgICBsZXQgeWFjaHRTZWFyY2hBbmRSZXN1bHRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgIGlmICh5YWNodFNlYXJjaEFuZFJlc3VsdHMpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tbW9iaWxlLXNlYXJjaCcpLmZvckVhY2goKG9tc2UpID0+IHtcbiAgICAgICAgICAgIG9tc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdibG9jayc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0naGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgneXNwLW1vYmlsZS15YWNodC1zZWFyY2gtb3BlbicpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vYmlsZS1zZWFyY2gnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vYmlsZS1zZWFyY2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9J3Vuc2V0JztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LnJlbW92ZSgneXNwLW1vYmlsZS15YWNodC1zZWFyY2gtb3BlbicpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQuZGlzcGF0Y2hFdmVudCh5c3BCZWZvcmVZYWNodFNlYXJjaCk7XG5cbiAgICAgICAgICAgIGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT0xO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0geXNwX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpO1xuXG4gICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApLnRoZW4oZnVuY3Rpb24oYXBpX2RhdGEpIHtcblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoeXNwQWZ0ZXJZYWNodFNlYXJjaCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pOyBcblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQuc3VibWl0LW9uLWNoYW5nZScpLmZvckVhY2goKGVsZUlucHV0KSA9PiB7XG4gICAgICAgICAgICBlbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmVzZXRdJykuZm9yRWFjaCgoZWxlUmVzZXQpID0+IHtcbiAgICAgICAgICAgIGVsZVJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwieXNfY29tcGFueV9vbmx5XCJdJykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJ5c19jb21wYW55X29ubHlcIl0nKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZUNoZWNrKSB7XG4gICAgICAgICAgICAgICAgZWxlQ2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXZpZXddW2Zvcm09eXNwLXlhY2h0LXNlYXJjaC1mb3JtXSwgc2VsZWN0W25hbWU9dmlld11bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dLCAgc2VsZWN0W25hbWU9c29ydGJ5XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0nKS5mb3JFYWNoKChlbGVWaWV3T3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBlbGVWaWV3T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGljay1hbGwnKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZSkge1xuICAgICAgICAgICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0X25hbWUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCInKyBpbnB1dF9uYW1lICsnXCJdJykuZm9yRWFjaCgoZWxlSW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlSW5wdXQuY2hlY2tlZD1mYWxzZTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUFJFVFRZIFVSTFxuICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZSh5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG4gICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICBvbmx5X3ZhbHM9b25seV92YWxzLmpvaW4oJyAnKS5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzX2FycmF5PShvbmx5X3ZhbHMuc3BsaXQoJysnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ubHlfdmFsc19hcnJheVsxXSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBvbmx5X3ZhbHMgPSBvbmx5X3ZhbHNfYXJyYXkubWFwKChvdikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG92LmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG9ubHlfdmFscyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXT1vbmx5X3ZhbHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhwcmV0dHlfdXJsX3BhdGhfcGFyYW1zKTtcblxuICAgICAgICAvLyBSZXN0b3JlIEZpZWxkc1xuXG4gICAgICAgIGxldCBVUkxSRUY9bmV3IFVSTChsb2NhdGlvbi5ocmVmKTsgLy8gbWF5YmUgZm9yIGEgcmUtZG9cblxuICAgICAgICBsZXQgZm9ybUlucHV0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC15YWNodC1zZWFyY2gtZm9ybVwiXSwgI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybVwiXScpO1xuXG4gICAgICAgIGZvcm1JbnB1dHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBlbGU7XG5cbiAgICAgICAgICAgIGxldCBuYW1lID0gZWxlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICBsZXQgdXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcbiAgICAgICAgICAgICAgICAvLyB1cmxWYWwgPSA7XG4gICBcblxuICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhc1ByZXR0eSAhPSAnbnVsbCcgJiYgdHlwZW9mIGhhc1ByZXR0eSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGFzUHJldHR5KSkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaGFzUHJldHR5LmZvckVhY2goKGhQKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhQICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoYXNQcmV0dHkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBoYXNQcmV0dHk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodXJsVmFsICE9ICcnICYmIHVybFZhbCAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHVybFZhbCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB1cmxWYWwgPSB1cmxWYWwuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmICAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IHVybFZhbCApIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdXJsVmFsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXN0b3JlIENvbXBhcmVcbiAgICAgICAgIHlzcF9yZXN0b3JlQ29tcGFyZXMoKTtcblxuICAgICAgICAvLyBGaWxsIG9wdGlvbnNcbiAgICAgICAgbGV0IEZpbGxPcHRpb25zPVtdO1xuICAgICAgICBsZXQgc2VsZWN0b3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnNdXCIpO1xuXG4gICAgICAgIHNlbGVjdG9yRWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICBGaWxsT3B0aW9ucy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1vcHRpb25zJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHlzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnZHJvcGRvd24tb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxPcHRpb25zfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnM9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFNlbGVjdG9yRWxlKTtcblxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gU2VsZWN0b3JFbGVbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFkZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBVUkxSRUYgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG4gICAgICAgICAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgICAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZSh5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cbiAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzLmpvaW4oJyAnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXS5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKFVybFZhbCAhPSAnJyAmJiBVcmxWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFVybFZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVcmxWYWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVybFZhbCA9IFVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsOyBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IFVybFZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc1ByZXR0eSAhPSAnJyAmJiBoYXNQcmV0dHkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eTsgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZW5kZXIgWWFjaHRzIEZvciBQYWdlIExvYWRcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB5c3BfZ2V0X2Zvcm1fZGF0YShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG5cbiAgICAgICAgICAgIC8vIExpa2VkIC8gTG92ZWQgXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcy55c195YWNodHNfbG92ZWQgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIGxldCBsb3ZlZF95YWNodHMgPSBKU09OLnBhcnNlKCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvdmVkX3lhY2h0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy55c19vbmx5X3RoZXNlID0gbG92ZWRfeWFjaHRzLmpvaW4oJywnKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnlzX29ubHlfdGhlc2U9XCIwLDAsMFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApOyAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG1vYmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybScpO1xuXG4gICAgICAgIGlmIChtb2JpbGVGb3JtKSB7XG4gICAgICAgICAgICBtb2JpbGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPXBhZ2VfaW5kZXhdJykudmFsdWU9MTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9J3Vuc2V0JztcblxuICAgICAgICAgICAgICAgIGxldCBwYXJhbXMgPSB5c3BfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7ICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApO1xuXG4gICAgICAgICAgICB9KTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH1cblxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBMZWFkRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLWxlYWQtZm9ybS12MicpO1xuXG4gICAgTGVhZEZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGxldCBmb3JtRGF0YSA9IHlzcF9nZXRfZm9ybV9kYXRhKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeXNwX2FwaS5jYWxsX2FwaShcIlBPU1RcIiwgJ2xlYWQtdjInLCBmb3JtRGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCcuc3VjY2Vzcy1tZXNzYWdlJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignLmhpZGUtYWZ0ZXItc3VibWl0Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxufSk7XG4iXX0=
