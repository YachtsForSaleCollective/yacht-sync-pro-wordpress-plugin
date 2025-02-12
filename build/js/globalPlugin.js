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
  var vesselLocation, vesselKeywordLocationLink;
  if (typeof vessel.BoatLocation.BoatCountryID != 'undefined' && vessel.BoatLocation.BoatCountryID != null) {
    if (typeof vessel.BoatLocation.BoatCityName == 'string' && vessel.BoatLocation.BoatCityName != '') {
      vesselKeywordLocationLink = "/yacht-search/ys_keyword-".concat(vessel.BoatLocation.BoatCityName.replace(/( )/g, '-'));
      vesselLocation = vessel.BoatLocation.BoatCountryID == "US" || vessel.BoatLocation.BoatCountryID == "United States" ? "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatStateCode) : "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatCountryID);
    } else {
      vesselKeywordLocationLink = "/yacht-search/ys_keyword-".concat(vessel.BoatLocation.BoatCountryID.replace(/( )/g, '-'));
      vesselLocation = "".concat(vessel.BoatLocation.BoatCountryID);
    }
  }
  return "\n\t\t\t<div class=\"ysp-yacht-item ysp-view-grid\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t<div class=\"ri-image\">\n\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t<img class=\"yacht-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\t\t\n\t\t\n\t\t\t\t\t\t<svg title=\"like\" class=\"like-me love\" xmlns=\"http://www.w3.org/2000/svg\" width=\"57\" height=\"54\" viewBox=\"0 0 57 54\" fill=\"none\"  data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t\t\t  <g filter=\"url(#filter0_d_2888_4333)\">\n\t\t\t\t\t\t    <path d=\"M34.7028 11.5755C36.2094 11.5755 37.6251 12.1699 38.6898 13.2488L38.8223 13.383C41.0206 15.6116 41.0206 19.2375 38.8223 21.466L38.0992 22.199L27.4995 32.9442L18.4883 23.808L16.9011 22.199L16.178 21.466C13.9797 19.2375 13.9797 15.6116 16.178 13.383L16.3083 13.2509C17.3739 12.1708 18.79 11.5759 20.2962 11.5764C21.8023 11.5764 23.2176 12.1708 24.2819 13.2492L25.005 13.9822L27.4991 16.5101L29.9928 13.9818L30.7158 13.2488C31.7801 12.1699 33.1962 11.5755 34.7028 11.5755ZM34.7028 8C32.357 8 30.0112 8.9068 28.2222 10.7204L27.4991 11.4534L26.776 10.7204C24.9878 8.90723 22.642 8.00043 20.297 8C17.9508 8 15.605 8.90723 13.8147 10.7221L13.6844 10.8542C10.1046 14.4832 10.1046 20.3645 13.6844 23.9935L14.4074 24.7265L15.9946 26.3354L27.4995 38L40.5933 24.7265L41.3164 23.9935C44.8945 20.3663 44.8945 14.4814 41.3164 10.8542L41.1839 10.72C39.3945 8.9068 37.0486 8 34.7028 8Z\" fill=\"white\"></path>\n\t\t\t\t\t\t  </g>\n\t\t\t\t\t\t  <defs>\n\t\t\t\t\t\t    <filter id=\"filter0_d_2888_4333\" x=\"-0.000488281\" y=\"0\" width=\"57.0005\" height=\"54\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n\t\t\t\t\t\t      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood>\n\t\t\t\t\t\t      <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix>\n\t\t\t\t\t\t      <feOffset dx=\"1\" dy=\"4\"></feOffset>\n\t\t\t\t\t\t      <feGaussianBlur stdDeviation=\"6\"></feGaussianBlur>\n\t\t\t\t\t\t      <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite>\n\t\t\t\t\t\t      <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_2888_4333\"></feBlend>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_2888_4333\" result=\"shape\"></feBlend>\n\t\t\t\t\t\t    </filter>\n\t\t\t\t\t\t  </defs>\n\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t<label class=\"top-compare\" title=\"compare\">\n\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"compare_toggle\" name=\"compare\" value=\"").concat(vessel._postID, "\" />\n\n\t\t\t\t\t\t\t<svg width=\"58\" height=\"25\" viewBox=\"0 0 58 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M51.5029 18.1953L54.6753 14.7767C55.4411 13.9515 55.1258 12.5418 54.0937 12.1843L52.2 11.5284V4.6875C52.2 3.82456 51.5508 3.125 50.75 3.125H47.85V1.17187C47.85 0.524658 47.3631 0 46.7625 0H40.2375C39.6369 0 39.15 0.524658 39.15 1.17187V3.125H36.25C35.4492 3.125 34.8 3.82456 34.8 4.6875V11.5284L32.9063 12.1843C31.8753 12.5414 31.5581 13.9506 32.3247 14.7767L35.4971 18.1953C34.7016 20.3265 32.8782 21.875 30.0875 21.875C29.4869 21.875 29 22.3997 29 23.0469V23.8281C29 24.4753 29.4869 25 30.0875 25C32.8526 25 34.9585 23.9937 36.5789 22.0998C37.2322 23.8004 38.7885 25 40.6 25H46.4C48.2116 25 49.7678 23.8004 50.4211 22.0998C52.0412 23.9934 54.147 25 56.9125 25C57.5131 25 58 24.4753 58 23.8281V23.0469C58 22.3997 57.5131 21.875 56.9125 21.875C54.1567 21.875 52.3114 20.3613 51.5029 18.1953ZM37.7 6.25H49.3V10.524L43.9437 8.66875C43.6552 8.5688 43.3448 8.5688 43.0563 8.66875L37.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t<path d=\"M22.5029 18.1953L25.6753 14.7767C26.4411 13.9515 26.1258 12.5418 25.0937 12.1843L23.2 11.5284V4.6875C23.2 3.82456 22.5508 3.125 21.75 3.125H18.85V1.17188C18.85 0.524658 18.3631 0 17.7625 0H11.2375C10.6369 0 10.15 0.524658 10.15 1.17188V3.125H7.25C6.44919 3.125 5.8 3.82456 5.8 4.6875V11.5284L3.9063 12.1843C2.8753 12.5414 2.55807 13.9506 3.32467 14.7767L6.49709 18.1953C5.70158 20.3265 3.87816 21.875 1.0875 21.875C0.486883 21.875 0 22.3997 0 23.0469V23.8281C0 24.4753 0.486883 25 1.0875 25C3.8526 25 5.95855 23.9937 7.57888 22.0998C8.23224 23.8004 9.78845 25 11.6 25H17.4C19.2115 25 20.7678 23.8004 21.4211 22.0998C23.0412 23.9934 25.147 25 27.9125 25C28.5131 25 29 24.4753 29 23.8281V23.0469C29 22.3997 28.5131 21.875 27.9125 21.875C25.1567 21.875 23.3114 20.3613 22.5029 18.1953ZM8.7 6.25H20.3V10.524L14.9437 8.66875C14.6552 8.5688 14.3448 8.5688 14.0563 8.66875L8.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</label>\n\t\t\t\t\n\t\t\t\t\t\t<span class=\"ri-price\">").concat(price, "</span>\n\t\t\t\t\t</a>\t\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"result-item-info\">\n\t\t\t\t\t<div class=\"ri-top\">\n\t\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\t<span class=\"ri-name\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', "</span><br>\n\n\t\t\t\t\t\t\t<span class=\"ri-sub-name\">").concat(vessel.BoatName ? vessel.BoatName : 'N/A', "</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"ri-bottom\">\n\t\t\t\t\t\t<span class=\"ri-location\">\t\n\t\t\t\t\t\t\t<a href=\"").concat(vesselKeywordLocationLink, "\">\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t<path d=\"M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t<path d=\"M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t").concat(vesselLocation, "\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t<a href=\"#ysp-yacht-results-lead-modal\" class=\"ri-contact\" data-modal=\"#ysp-yacht-results-lead-modal\">\n\t\t\t\t\t\t\tContact\n\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n\t\t\t\t\t\t\t<g clip-path=\"url(#clip0_8101_10277)\">\n\t\t\t\t\t\t\t<path d=\"M15.5556 0H5.7778C5.53214 0 5.33334 0.198792 5.33334 0.444458C5.33334 0.690125 5.53214 0.888917 5.7778 0.888917H14.4827L0.130219 15.2413C-0.0434062 15.415 -0.0434062 15.6962 0.130219 15.8698C0.21701 15.9566 0.33076 16 0.444469 16C0.558177 16 0.671885 15.9566 0.758719 15.8698L15.1111 1.51737V10.2222C15.1111 10.4679 15.3099 10.6667 15.5556 10.6667C15.8013 10.6667 16.0001 10.4679 16.0001 10.2222V0.444458C16 0.198792 15.8012 0 15.5556 0Z\" fill=\"#067AED\"/>\n\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<clipPath id=\"clip0_8101_10277\">\n\t\t\t\t\t\t\t<rect width=\"16\" height=\"16\" fill=\"white\"/>\n\t\t\t\t\t\t\t</clipPath>\n\t\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
};
ysp_templates.yacht.list = function (vessel) {
  var meters = parseInt(vessel.NominalLength) * 0.3048;
  var price = '';
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
  var vesselLocation, vesselKeywordLocationLink;
  if (typeof vessel.BoatLocation.BoatCountryID != 'undefined' && vessel.BoatLocation.BoatCountryID != null) {
    if (typeof vessel.BoatLocation.BoatCityName == 'string' && vessel.BoatLocation.BoatCityName != '') {
      vesselKeywordLocationLink = "/yacht-search/ys_keyword-".concat(vessel.BoatLocation.BoatCityName.replace(/( )/g, '-'));
      vesselLocation = vessel.BoatLocation.BoatCountryID == "US" || vessel.BoatLocation.BoatCountryID == "United States" ? "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatStateCode) : "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatCountryID);
    } else {
      vesselKeywordLocationLink = "/yacht-search/ys_keyword-".concat(vessel.BoatLocation.BoatCountryID.replace(/( )/g, '-'));
      vesselLocation = "".concat(vessel.BoatLocation.BoatCountryID);
    }
  }
  return "\n\t\t\t<div class=\"ysp-yacht-item ysp-view-list\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t<div class=\"ri-image\">\n\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t<img class=\"yacht-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\t\t\n\t\t\t\t\t\t<svg title=\"compare\" class=\"like-me love\" xmlns=\"http://www.w3.org/2000/svg\" width=\"57\" height=\"54\" viewBox=\"0 0 57 54\" fill=\"none\"  data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t\t\t  <g filter=\"url(#filter0_d_2888_4333)\">\n\t\t\t\t\t\t    <path d=\"M34.7028 11.5755C36.2094 11.5755 37.6251 12.1699 38.6898 13.2488L38.8223 13.383C41.0206 15.6116 41.0206 19.2375 38.8223 21.466L38.0992 22.199L27.4995 32.9442L18.4883 23.808L16.9011 22.199L16.178 21.466C13.9797 19.2375 13.9797 15.6116 16.178 13.383L16.3083 13.2509C17.3739 12.1708 18.79 11.5759 20.2962 11.5764C21.8023 11.5764 23.2176 12.1708 24.2819 13.2492L25.005 13.9822L27.4991 16.5101L29.9928 13.9818L30.7158 13.2488C31.7801 12.1699 33.1962 11.5755 34.7028 11.5755ZM34.7028 8C32.357 8 30.0112 8.9068 28.2222 10.7204L27.4991 11.4534L26.776 10.7204C24.9878 8.90723 22.642 8.00043 20.297 8C17.9508 8 15.605 8.90723 13.8147 10.7221L13.6844 10.8542C10.1046 14.4832 10.1046 20.3645 13.6844 23.9935L14.4074 24.7265L15.9946 26.3354L27.4995 38L40.5933 24.7265L41.3164 23.9935C44.8945 20.3663 44.8945 14.4814 41.3164 10.8542L41.1839 10.72C39.3945 8.9068 37.0486 8 34.7028 8Z\" fill=\"white\"></path>\n\t\t\t\t\t\t  </g>\n\t\t\t\t\t\t  <defs>\n\t\t\t\t\t\t    <filter id=\"filter0_d_2888_4333\" x=\"-0.000488281\" y=\"0\" width=\"57.0005\" height=\"54\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n\t\t\t\t\t\t      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood>\n\t\t\t\t\t\t      <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix>\n\t\t\t\t\t\t      <feOffset dx=\"1\" dy=\"4\"></feOffset>\n\t\t\t\t\t\t      <feGaussianBlur stdDeviation=\"6\"></feGaussianBlur>\n\t\t\t\t\t\t      <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite>\n\t\t\t\t\t\t      <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_2888_4333\"></feBlend>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_2888_4333\" result=\"shape\"></feBlend>\n\t\t\t\t\t\t    </filter>\n\t\t\t\t\t\t  </defs>\n\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t<label class=\"top-compare\" title=\"compare\">\n\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"compare_toggle\" name=\"compare\" value=\"").concat(vessel._postID, "\" />\n\n\t\t\t\t\t\t\t<svg width=\"58\" height=\"25\" viewBox=\"0 0 58 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M51.5029 18.1953L54.6753 14.7767C55.4411 13.9515 55.1258 12.5418 54.0937 12.1843L52.2 11.5284V4.6875C52.2 3.82456 51.5508 3.125 50.75 3.125H47.85V1.17187C47.85 0.524658 47.3631 0 46.7625 0H40.2375C39.6369 0 39.15 0.524658 39.15 1.17187V3.125H36.25C35.4492 3.125 34.8 3.82456 34.8 4.6875V11.5284L32.9063 12.1843C31.8753 12.5414 31.5581 13.9506 32.3247 14.7767L35.4971 18.1953C34.7016 20.3265 32.8782 21.875 30.0875 21.875C29.4869 21.875 29 22.3997 29 23.0469V23.8281C29 24.4753 29.4869 25 30.0875 25C32.8526 25 34.9585 23.9937 36.5789 22.0998C37.2322 23.8004 38.7885 25 40.6 25H46.4C48.2116 25 49.7678 23.8004 50.4211 22.0998C52.0412 23.9934 54.147 25 56.9125 25C57.5131 25 58 24.4753 58 23.8281V23.0469C58 22.3997 57.5131 21.875 56.9125 21.875C54.1567 21.875 52.3114 20.3613 51.5029 18.1953ZM37.7 6.25H49.3V10.524L43.9437 8.66875C43.6552 8.5688 43.3448 8.5688 43.0563 8.66875L37.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t<path d=\"M22.5029 18.1953L25.6753 14.7767C26.4411 13.9515 26.1258 12.5418 25.0937 12.1843L23.2 11.5284V4.6875C23.2 3.82456 22.5508 3.125 21.75 3.125H18.85V1.17188C18.85 0.524658 18.3631 0 17.7625 0H11.2375C10.6369 0 10.15 0.524658 10.15 1.17188V3.125H7.25C6.44919 3.125 5.8 3.82456 5.8 4.6875V11.5284L3.9063 12.1843C2.8753 12.5414 2.55807 13.9506 3.32467 14.7767L6.49709 18.1953C5.70158 20.3265 3.87816 21.875 1.0875 21.875C0.486883 21.875 0 22.3997 0 23.0469V23.8281C0 24.4753 0.486883 25 1.0875 25C3.8526 25 5.95855 23.9937 7.57888 22.0998C8.23224 23.8004 9.78845 25 11.6 25H17.4C19.2115 25 20.7678 23.8004 21.4211 22.0998C23.0412 23.9934 25.147 25 27.9125 25C28.5131 25 29 24.4753 29 23.8281V23.0469C29 22.3997 28.5131 21.875 27.9125 21.875C25.1567 21.875 23.3114 20.3613 22.5029 18.1953ZM8.7 6.25H20.3V10.524L14.9437 8.66875C14.6552 8.5688 14.3448 8.5688 14.0563 8.66875L8.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</label>\n\n\t\t\t\t\t\t").concat(vessel.CompanyName === ysp_yacht_sync.company_name ? "<div class=\"company-banner\"><img src=\"".concat(ysp_yacht_sync.company_logo, "\"></div>") : '', "\n\t\t\t\t\n\t\t\t\t\t\t<span class=\"ri-price\">").concat(price, "</span>\n\t\t\t\t\t</a>\t\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"result-item-info\">\n\t\t\t\t\t<div class=\"ri-top\">\n\t\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\t<span class=\"ri-name\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', "</span><br />\n\n\t\t\t\t\t\t\t<span class=\"ri-sub-name\">").concat(vessel.BoatName ? vessel.BoatName : 'N/A', "</span><br />\n\n\t\t\t\t\t\t\t<span class=\"ri-location\">\t\t\n\t\t\t\t\t\t\t\t<a href=\"").concat(vesselKeywordLocationLink, "\">\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t\t<path d=\"M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t<path d=\"M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t").concat(vesselLocation, "\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"ri-bottom\">\n\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t<a href=\"#ysp-yacht-results-lead-modal\" class=\"ri-contact\" data-modal=\"#ysp-yacht-results-lead-modal\">\n\t\t\t\t\t\t\tContact\n\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n\t\t\t\t\t\t\t<g clip-path=\"url(#clip0_8101_10277)\">\n\t\t\t\t\t\t\t<path d=\"M15.5556 0H5.7778C5.53214 0 5.33334 0.198792 5.33334 0.444458C5.33334 0.690125 5.53214 0.888917 5.7778 0.888917H14.4827L0.130219 15.2413C-0.0434062 15.415 -0.0434062 15.6962 0.130219 15.8698C0.21701 15.9566 0.33076 16 0.444469 16C0.558177 16 0.671885 15.9566 0.758719 15.8698L15.1111 1.51737V10.2222C15.1111 10.4679 15.3099 10.6667 15.5556 10.6667C15.8013 10.6667 16.0001 10.4679 16.0001 10.2222V0.444458C16 0.198792 15.8012 0 15.5556 0Z\" fill=\"#067AED\"/>\n\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<clipPath id=\"clip0_8101_10277\">\n\t\t\t\t\t\t\t<rect width=\"16\" height=\"16\" fill=\"white\"/>\n\t\t\t\t\t\t\t</clipPath>\n\t\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t");
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
            if (_typeof(b) == 'object') {
              option.text = b.t;
              option.value = b.v;
            } else {
              option.text = b;
              option.value = b;
            }
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
            if (_typeof(b) == 'object') {
              option.text = b.t;
              option.value = b.v;
            } else {
              option.text = b;
              option.value = b;
            }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwid2hhdGV2ZXIuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwiZmlsbC1maWVsZHMuanMiLCJ5YWNodFNlYXJjaFRhZ3MuanMiLCJ5YWNodFNlYXJjaExvdmVkLmpzIiwieWFjaHRTZWFyY2hDb21wYXJlLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwibW9kYWxzIiwiZ2V0Q3VycmVudCIsInNlbGVjdEN1cnJlbnQiLCJzZWxlY3RlZCIsIiRibG9ja2VyIiwidG9nZ2xlQ2xhc3MiLCJ5c3BfbW9kYWwiLCJlbCIsInJlbW92ZSIsInRhcmdldCIsIiRib2R5IiwiZGVmYXVsdHMiLCJkb0ZhZGUiLCJpc05hTiIsImZhZGVEdXJhdGlvbiIsImNsb3NlRXhpc3RpbmciLCJpc0FjdGl2ZSIsImNsb3NlIiwicHVzaCIsImlzIiwiYW5jaG9yIiwidGVzdCIsIiRlbG0iLCJvcGVuIiwibW9kYWwiLCJlbG0iLCJzaG93U3Bpbm5lciIsInRyaWdnZXIiLCJBSkFYX1NFTkQiLCJnZXQiLCJkb25lIiwiQUpBWF9TVUNDRVNTIiwiY3VycmVudCIsIm9uIiwiQ0xPU0UiLCJoaWRlU3Bpbm5lciIsIkFKQVhfQ09NUExFVEUiLCJmYWlsIiwiQUpBWF9GQUlMIiwicG9wIiwiY29uc3RydWN0b3IiLCJtIiwiYmxvY2siLCJibHVyIiwic2V0VGltZW91dCIsInNob3ciLCJmYWRlRGVsYXkiLCJvZmYiLCJlc2NhcGVDbG9zZSIsImNsaWNrQ2xvc2UiLCJlIiwidW5ibG9jayIsImhpZGUiLCJCRUZPUkVfQkxPQ0siLCJfY3R4IiwiY3NzIiwiYmxvY2tlckNsYXNzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJCTE9DSyIsIm5vdyIsImZhZGVPdXQiLCJjaGlsZHJlbiIsIkJFRk9SRV9PUEVOIiwic2hvd0Nsb3NlIiwiY2xvc2VCdXR0b24iLCJjbG9zZUNsYXNzIiwiY2xvc2VUZXh0IiwibW9kYWxDbGFzcyIsImRpc3BsYXkiLCJPUEVOIiwiQkVGT1JFX0NMT1NFIiwiX3RoaXMiLCJBRlRFUl9DTE9TRSIsInNwaW5uZXIiLCJzcGlubmVySHRtbCIsIiRhbmNob3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImRhdGFfbW9kYWwiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIlN0cmluZyIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm1hcCIsInMiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJlbnVtZXJhYmxlIiwieXNwX2dldF9mb3JtX2RhdGEiLCJmb3JtX2VsZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJmZCIsImZyb21FbnRyaWVzIiwiZW50cmllcyIsIl9pIiwiX09iamVjdCRlbnRyaWVzIiwiX09iamVjdCRlbnRyaWVzJF9pIiwiX3NsaWNlZFRvQXJyYXkiLCJmSW5kZXgiLCJmaWVsZCIsIlZhbEFycmF5IiwiZ2V0QWxsIiwieXNwX3NldF9mb3JtX3RvX2RhdGEiLCJpbnB1dERhdGEiLCJmb3JtQSIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JtQiIsInJlc2V0IiwiZm9ybUlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlIiwiaW5wdXQiLCJuYW1lIiwiZ2V0QXR0cmlidXRlIiwiaGFzUHJldHR5IiwiaXNBcnJheSIsImhQIiwidHlwZSIsImNoZWNrZWQiLCJ5c3BfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJ0b1N0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJ5c3BfeWFjaHRfc3luYyIsInlhY2h0X3NlYXJjaF91cmwiLCJ5c3BfYXBpIiwiY2FsbF9hcGkiLCJwYXRoIiwicGFzc2luZ19kYXRhIiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlRGF0YSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIl9xdWVzdGlvbk1hcmsiLCJ3cF9yZXN0X3VybCIsInNlbmQiLCJzZXRSZXF1ZXN0SGVhZGVyIiwic3RyaW5naWZ5IiwieXNwX3RlbXBsYXRlcyIsInlhY2h0IiwiZ3JpZCIsInZlc3NlbCIsInBhcmFtcyIsIm1ldGVycyIsIk5vbWluYWxMZW5ndGgiLCJwcmljZSIsImV1cm9wZV9vcHRpb25fcGlja2VkIiwidG9GaXhlZCIsIllTUF9FdXJvVmFsIiwiY29uY2F0IiwiSW50bCIsIk51bWJlckZvcm1hdCIsIm1pbmltdW1GcmFjdGlvbkRpZ2l0cyIsImZvcm1hdCIsImN1cnJlbmN5IiwiWVNQX1VTRFZhbCIsInZlc3NlbExvY2F0aW9uIiwidmVzc2VsS2V5d29yZExvY2F0aW9uTGluayIsIkJvYXRMb2NhdGlvbiIsIkJvYXRDb3VudHJ5SUQiLCJCb2F0Q2l0eU5hbWUiLCJyZXBsYWNlIiwiQm9hdFN0YXRlQ29kZSIsIl9wb3N0SUQiLCJEb2N1bWVudElEIiwiX2xpbmsiLCJJbWFnZXMiLCJVcmkiLCJhc3NldHNfdXJsIiwiTW9kZWxZZWFyIiwiTWFrZVN0cmluZyIsIk1vZGVsIiwiQm9hdE5hbWUiLCJsaXN0IiwiUHJpY2UiLCJldXJvX2NfYyIsIkNvbXBhbnlOYW1lIiwiY29tcGFueV9uYW1lIiwiY29tcGFueV9sb2dvIiwiY29tcGFyZV9wcmV2aWV3Iiwibm9SZXN1bHRzIiwieWFjaHRfdGFnIiwibGFiZWwiLCJuZXh0X3RleHQiLCJwcmV2X3RleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZWxlX3F1aWNrX3NlYXJjaCIsIkZpbGxPcHRpb25zIiwic2VsZWN0b3JFbGVtZW50cyIsImxhYmVscyIsInRoZW4iLCJyT3B0aW9ucyIsIl9sb29wIiwiU2VsZWN0b3JFbGUiLCJiIiwib3B0aW9uIiwiY3JlYXRlRWxlbWVudCIsInQiLCJ2IiwiYWRkIiwiVVJMUkVGIiwiVVJMIiwibG9jYXRpb24iLCJocmVmIiwiVXJsVmFsIiwic3RycGF0aHMiLCJ5YWNodF9zZWFyY2hfcGFnZV9pZCIsInBhdGhzIiwicHJldHR5X3VybF9wYXRoX3BhcmFtcyIsInBoYXNlX3BhdGgiLCJvbmx5X3ZhbHMiLCJlYWNoV29yZENhcGl0YWxpemUiLCJ5c3BfbWFrZVNlYXJjaFRhZ3MiLCJ0YWdzRWxlIiwidGUiLCJpbm5lckhUTUwiLCJ5c3BfdGFnc19ub3RfcHJpbnQiLCJfbG9vcDIiLCJwYXJhbUtleSIsImlubmVyVGV4dCIsImhhc0F0dHJpYnV0ZSIsImluZGV4T2YiLCJlbGVJbnB1dCIsIm5ld1RhZ0VsZSIsInRhZ1ZhbCIsInNlbGVjdGVkSW5kZXgiLCJtYXRjaCIsImVsZVVuaXQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInlzcFRhZ0VsZSIsImtleSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJ5c195YWNodHNfbG92ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG92ZWRWZXNzZWxzIiwic2V0SXRlbSIsImluZGV4ZWQiLCJzcGxpY2UiLCJZU1BfVmVzc2VsQ29tcGFyZUxpc3QiLCJ5c3BfcmVzdG9yZUNvbXBhcmVzIiwiY29tcGFyZV9wb3N0X2lkcyIsInlzcF9tYWtlQ29tcGFyZUxpbmtvdXQiLCJ5c3BfbWFrZUNvbXBhcmVWZXNzZWwiLCJjaGFuZ2UiLCJ5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCIsInlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJkYXRhX3Jlc3VsdCIsInJlc3VsdHMiLCJpdGVtIiwiZWxlX3ByZXZpZXciLCJ5c3BCZWZvcmVZYWNodFNlYXJjaCIsIkV2ZW50IiwieXNwQWZ0ZXJZYWNodFNlYXJjaCIsInlzcEFmdGVyUmVuZGVyaW5nWWFjaHQiLCJ5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIiLCJjbGFzc0xpc3QiLCJ0aXRsZSIsIlNFTyIsImhlYWRpbmciLCJwIiwibWF4aW11bVNpZ25pZmljYW50RGlnaXRzIiwidG90YWwiLCJjdXJyZW50VVJMIiwiZG9udF9wdXNoIiwidmlldyIsInBhZ2VfaW5kZXgiLCJSZWdFeHAiLCJmb3JtRGF0YU9iamVjdCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJkaXNwYXRjaEV2ZW50IiwiRmlsbExpc3RzIiwibGlzdEVsZW1lbnRzIiwibGlzdE5lZWRlZEVsZW1lbnRzIiwiaW5wdXRfZWxlIiwibGlzdF9pZCIsImVsZV9saXN0IiwiX2xvb3AzIiwieWFjaHRTZWFyY2hBbmRSZXN1bHRzIiwib21zZSIsInN0eWxlIiwib3ZlcmZsb3dZIiwiYXBpX2RhdGEiLCJlbGVSZXNldCIsImVsZUNoZWNrIiwiZWxlVmlld09wdGlvbiIsImlucHV0X25hbWUiLCJvbmx5X3ZhbHNfYXJyYXkiLCJvdiIsInVybFZhbCIsIl9sb29wNCIsImxvdmVkX3lhY2h0cyIsInlzX29ubHlfdGhlc2UiLCJtb2JpbGVGb3JtIiwiTGVhZEZvcm1zIiwiZkVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUEsVUFBQUEsQ0FBQSxFQUFBO0VBRUEsSUFBQUMsT0FBQSxHQUFBO0lBQ0FDLElBQUEsRUFBQSxTQUFBQSxJQUFBQSxDQUFBQyxPQUFBLEVBQUE7TUFDQSxJQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssTUFBQSxDQUFBO1FBQ0FDLEtBQUEsRUFBQSxDQUFBO1FBQ0FDLFdBQUEsRUFBQSxDQUFBO1FBQ0FDLEtBQUEsRUFBQSxDQUFBO1FBQ0FDLGNBQUEsRUFBQSxDQUFBO1FBQ0FDLEtBQUEsRUFBQSxDQUFBO1FBQ0FDLFdBQUEsRUFBQSxDQUFBO1FBQ0FDLFVBQUEsRUFBQSxJQUFBO1FBQ0FDLGNBQUEsRUFBQSxRQUFBO1FBQ0FDLGNBQUEsRUFBQSxFQUFBO1FBQ0FDLFFBQUEsRUFBQSxNQUFBO1FBQ0FDLFFBQUEsRUFBQSxNQUFBO1FBQ0FDLFdBQUEsRUFBQSxVQUFBO1FBQ0FDLGNBQUEsRUFBQSxJQUFBO1FBQ0FDLFFBQUEsRUFBQSxhQUFBO1FBQ0FDLFNBQUEsRUFBQSxFQUFBO1FBQ0FDLFFBQUEsRUFBQSxFQUFBO1FBQ0FDLGFBQUEsRUFBQSxJQUFBO1FBQ0FDLFdBQUEsRUFBQSxLQUFBO1FBQ0FDLGVBQUEsRUFBQSxLQUFBO1FBQ0FDLFlBQUEsRUFBQSxJQUFBO1FBQ0FDLFVBQUEsRUFBQSxJQUFBO1FBQ0FDLFdBQUEsRUFBQSxTQUFBQSxXQUFBQSxDQUFBQyxVQUFBLEVBQUFDLEtBQUEsRUFBQTtVQUNBO1VBQ0E7UUFBQSxDQUNBO1FBQ0FDLE1BQUEsRUFBQSxTQUFBQSxNQUFBQSxDQUFBLEVBQUE7VUFDQTtRQUFBO01BRUEsQ0FBQSxFQUFBM0IsT0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO01BRUEsSUFB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LDRKQUFBLENBQUE7RUFFQUQsVUFBQSxDQUFBRSxPQUFBLENBQUEsVUFBQUMsR0FBQSxFQUFBO0lBQ0EsSUFBQUMsS0FBQSxHQUFBRCxHQUFBO0lBRUEsSUFBQUUsSUFBQSxHQUFBRixHQUFBLENBQUFHLFlBQUEsQ0FBQSxNQUFBLENBQUE7SUFFQSxJQUFBQyxTQUFBLEdBQUFaLFNBQUEsQ0FBQVUsSUFBQSxDQUFBOztJQUVBOztJQUVBLElBQUEsT0FBQUUsU0FBQSxJQUFBLE1BQUEsSUFBQSxPQUFBQSxTQUFBLElBQUEsV0FBQSxFQUFBO01BRUEsSUFBQXhJLEtBQUEsQ0FBQXlJLE9BQUEsQ0FBQUQsU0FBQSxDQUFBLEVBQUE7UUFDQTs7UUFFQUEsU0FBQSxDQUFBTCxPQUFBLENBQUEsVUFBQU8sRUFBQSxFQUFBO1VBRUEsSUFBQSxPQUFBTCxLQUFBLENBQUFNLElBQUEsSUFBQSxXQUFBLEtBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFVBQUEsSUFBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsT0FBQSxDQUFBLElBQUFOLEtBQUEsQ0FBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBRyxFQUFBLEVBQUE7WUFDQUwsS0FBQSxDQUFBTyxPQUFBLEdBQUEsSUFBQTtVQUNBO1FBRUEsQ0FBQSxDQUFBO01BRUEsQ0FBQSxNQUNBO1FBRUEsSUFBQSxPQUFBUCxLQUFBLENBQUFNLElBQUEsSUFBQSxXQUFBLEtBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFVBQUEsSUFBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsT0FBQSxDQUFBLElBQUFOLEtBQUEsQ0FBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBQyxTQUFBLEVBQUE7VUFDQUgsS0FBQSxDQUFBTyxPQUFBLEdBQUEsSUFBQTtRQUNBLENBQUEsTUFDQSxJQUFBUCxLQUFBLENBQUFNLElBQUEsSUFBQSxVQUFBLElBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLE9BQUEsRUFBQTtVQUNBTixLQUFBLENBQUFsQyxLQUFBLEdBQUFxQyxTQUFBO1FBQ0E7TUFF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LENBQUF1RyxhQUFBLENBQUEsb0JBQUEsQ0FBQSxDQUFBK00sS0FBQSxDQUFBMVAsT0FBQSxHQUFBLE1BQUE7TUFDQSxDQUFBLENBQUEsU0FDQSxDQUFBLFVBQUE5RSxLQUFBLEVBQUE7UUFDQXdGLE9BQUEsQ0FBQUMsR0FBQSxDQUFBekYsS0FBQSxDQUFBO01BQ0EsQ0FBQSxDQUFBO0lBQ0EsQ0FBQSxDQUFBO0VBQ0EsQ0FBQSxDQUFBO0FBRUEsQ0FBQSxDQUFBIiwiZmlsZSI6Imdsb2JhbFBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAvKipcbiogc2ltcGxlUGFnaW5hdGlvbi5qcyB2MS42XG4qIEEgc2ltcGxlIGpRdWVyeSBwYWdpbmF0aW9uIHBsdWdpbi5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL3NpbXBsZVBhZ2luYXRpb24uanMvXG4qXG4qIENvcHlyaWdodCAyMDEyLCBGbGF2aXVzIE1hdGlzXG4qIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL2xpY2Vuc2UuaHRtbFxuKi9cblxuKGZ1bmN0aW9uKCQpe1xuXG5cdHZhciBtZXRob2RzID0ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0XHRcdHZhciBvID0gJC5leHRlbmQoe1xuXHRcdFx0XHRpdGVtczogMSxcblx0XHRcdFx0aXRlbXNPblBhZ2U6IDEsXG5cdFx0XHRcdHBhZ2VzOiAwLFxuXHRcdFx0XHRkaXNwbGF5ZWRQYWdlczogNSxcblx0XHRcdFx0ZWRnZXM6IDIsXG5cdFx0XHRcdGN1cnJlbnRQYWdlOiAwLFxuXHRcdFx0XHR1c2VBbmNob3JzOiB0cnVlLFxuXHRcdFx0XHRocmVmVGV4dFByZWZpeDogJyNwYWdlLScsXG5cdFx0XHRcdGhyZWZUZXh0U3VmZml4OiAnJyxcblx0XHRcdFx0cHJldlRleHQ6ICdQcmV2Jyxcblx0XHRcdFx0bmV4dFRleHQ6ICdOZXh0Jyxcblx0XHRcdFx0ZWxsaXBzZVRleHQ6ICcmaGVsbGlwOycsXG5cdFx0XHRcdGVsbGlwc2VQYWdlU2V0OiB0cnVlLFxuXHRcdFx0XHRjc3NTdHlsZTogJ2xpZ2h0LXRoZW1lJyxcblx0XHRcdFx0bGlzdFN0eWxlOiAnJyxcblx0XHRcdFx0bGFiZWxNYXA6IFtdLFxuXHRcdFx0XHRzZWxlY3RPbkNsaWNrOiB0cnVlLFxuXHRcdFx0XHRuZXh0QXRGcm9udDogZmFsc2UsXG5cdFx0XHRcdGludmVydFBhZ2VPcmRlcjogZmFsc2UsXG5cdFx0XHRcdHVzZVN0YXJ0RWRnZSA6IHRydWUsXG5cdFx0XHRcdHVzZUVuZEVkZ2UgOiB0cnVlLFxuXHRcdFx0XHRvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcblx0XHRcdFx0XHQvLyBDYWxsYmFjayB0cmlnZ2VyZWQgd2hlbiBhIHBhZ2UgaXMgY2xpY2tlZFxuXHRcdFx0XHRcdC8vIFBhZ2UgbnVtYmVyIGlzIGdpdmVuIGFzIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIENhbGxiYWNrIHRyaWdnZXJlZCBpbW1lZGlhdGVseSBhZnRlciBpbml0aWFsaXphdGlvblxuXHRcdFx0XHR9XG5cdFx0XHR9LCBvcHRpb25zIHx8IHt9KTtcblxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRvLnBhZ2VzID0gby5wYWdlcyA/IG8ucGFnZXMgOiBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpID8gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKSA6IDE7XG5cdFx0XHRpZiAoby5jdXJyZW50UGFnZSlcblx0XHRcdFx0by5jdXJyZW50UGFnZSA9IG8uY3VycmVudFBhZ2UgLSAxO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvLmN1cnJlbnRQYWdlID0gIW8uaW52ZXJ0UGFnZU9yZGVyID8gMCA6IG8ucGFnZXMgLSAxO1xuXHRcdFx0by5oYWxmRGlzcGxheWVkID0gby5kaXNwbGF5ZWRQYWdlcyAvIDI7XG5cblx0XHRcdHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5hZGRDbGFzcyhvLmNzc1N0eWxlICsgJyBzaW1wbGUtcGFnaW5hdGlvbicpLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHNlbGYpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG8ub25Jbml0KCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRzZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlKSB7XG5cdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgcGFnZSAtIDEpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHByZXZQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlIDwgby5wYWdlcyAtIDEpIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0bmV4dFBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPCBvLnBhZ2VzIC0gMSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRQYWdlc0NvdW50OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5wYWdlcztcblx0XHR9LFxuXG5cdFx0c2V0UGFnZXNDb3VudDogZnVuY3Rpb24oY291bnQpIHtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLnBhZ2VzID0gY291bnQ7XG5cdFx0fSxcblxuXHRcdGdldEN1cnJlbnRQYWdlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykuY3VycmVudFBhZ2UgKyAxO1xuXHRcdH0sXG5cblx0XHRkZXN0cm95OiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5lbXB0eSgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRyYXdQYWdlOiBmdW5jdGlvbiAocGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uY3VycmVudFBhZ2UgPSBwYWdlIC0gMTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHJlZHJhdzogZnVuY3Rpb24oKXtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkaXNhYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZW5hYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zOiBmdW5jdGlvbiAobmV3SXRlbXMpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLml0ZW1zID0gbmV3SXRlbXM7XG5cdFx0XHRvLnBhZ2VzID0gbWV0aG9kcy5fZ2V0UGFnZXMobyk7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXNPblBhZ2U6IGZ1bmN0aW9uIChpdGVtc09uUGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uaXRlbXNPblBhZ2UgPSBpdGVtc09uUGFnZTtcblx0XHRcdG8ucGFnZXMgPSBtZXRob2RzLl9nZXRQYWdlcyhvKTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIDApO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGdldEl0ZW1zT25QYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5pdGVtc09uUGFnZTtcblx0XHR9LFxuXG5cdFx0X2RyYXc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyXHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdGludGVydmFsID0gbWV0aG9kcy5fZ2V0SW50ZXJ2YWwobyksXG5cdFx0XHRcdGksXG5cdFx0XHRcdHRhZ05hbWU7XG5cblx0XHRcdG1ldGhvZHMuZGVzdHJveS5jYWxsKHRoaXMpO1xuXG5cdFx0XHR0YWdOYW1lID0gKHR5cGVvZiB0aGlzLnByb3AgPT09ICdmdW5jdGlvbicpID8gdGhpcy5wcm9wKCd0YWdOYW1lJykgOiB0aGlzLmF0dHIoJ3RhZ05hbWUnKTtcblxuXHRcdFx0dmFyICRwYW5lbCA9IHRhZ05hbWUgPT09ICdVTCcgPyB0aGlzIDogJCgnPHVsJyArIChvLmxpc3RTdHlsZSA/ICcgY2xhc3M9XCInICsgby5saXN0U3R5bGUgKyAnXCInIDogJycpICsgJz48L3VsPicpLmFwcGVuZFRvKHRoaXMpO1xuXG5cdFx0XHQvLyBHZW5lcmF0ZSBQcmV2IGxpbmtcblx0XHRcdGlmIChvLnByZXZUZXh0KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlIC0gMSA6IG8uY3VycmVudFBhZ2UgKyAxLCB7dGV4dDogby5wcmV2VGV4dCwgY2xhc3NlczogJ3ByZXYnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIE5leHQgbGluayAoaWYgb3B0aW9uIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiBvLm5leHRBdEZyb250KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlICsgMSA6IG8uY3VycmVudFBhZ2UgLSAxLCB7dGV4dDogby5uZXh0VGV4dCwgY2xhc3NlczogJ25leHQnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIHN0YXJ0IGVkZ2VzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZihvLnVzZVN0YXJ0RWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChvLmVkZ2VzIDwgaW50ZXJ2YWwuc3RhcnQgJiYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgby5lZGdlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmKG8udXNlU3RhcnRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IG8ucGFnZXMgLSAxOyBpID49IGJlZ2luOyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgaW50ZXJ2YWwgbGlua3Ncblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuc3RhcnQ7IGkgPCBpbnRlcnZhbC5lbmQ7IGkrKykge1xuXHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuZW5kIC0gMTsgaSA+PSBpbnRlcnZhbC5zdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGVuZCBlZGdlc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoby51c2VFbmRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGJlZ2luOyBpIDwgby5wYWdlczsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZiAoby5lZGdlcyA8IGludGVydmFsLnN0YXJ0ICYmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIG8uZWRnZXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKG8udXNlRW5kRWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGVuZCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgTmV4dCBsaW5rICh1bmxlc3Mgb3B0aW9uIGlzIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiAhby5uZXh0QXRGcm9udCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSArIDEgOiBvLmN1cnJlbnRQYWdlIC0gMSwge3RleHQ6IG8ubmV4dFRleHQsIGNsYXNzZXM6ICduZXh0J30pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoby5lbGxpcHNlUGFnZVNldCAmJiAhby5kaXNhYmxlZCkge1xuXHRcdFx0XHRtZXRob2RzLl9lbGxpcHNlQ2xpY2suY2FsbCh0aGlzLCAkcGFuZWwpO1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdF9nZXRQYWdlczogZnVuY3Rpb24obykge1xuXHRcdFx0dmFyIHBhZ2VzID0gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKTtcblx0XHRcdHJldHVybiBwYWdlcyB8fCAxO1xuXHRcdH0sXG5cblx0XHRfZ2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKG8pIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN0YXJ0OiBNYXRoLmNlaWwoby5jdXJyZW50UGFnZSA+IG8uaGFsZkRpc3BsYXllZCA/IE1hdGgubWF4KE1hdGgubWluKG8uY3VycmVudFBhZ2UgLSBvLmhhbGZEaXNwbGF5ZWQsIChvLnBhZ2VzIC0gby5kaXNwbGF5ZWRQYWdlcykpLCAwKSA6IDApLFxuXHRcdFx0XHRlbmQ6IE1hdGguY2VpbChvLmN1cnJlbnRQYWdlID4gby5oYWxmRGlzcGxheWVkID8gTWF0aC5taW4oby5jdXJyZW50UGFnZSArIG8uaGFsZkRpc3BsYXllZCwgby5wYWdlcykgOiBNYXRoLm1pbihvLmRpc3BsYXllZFBhZ2VzLCBvLnBhZ2VzKSlcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdF9hcHBlbmRJdGVtOiBmdW5jdGlvbihwYWdlSW5kZXgsIG9wdHMpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcywgb3B0aW9ucywgJGxpbmssIG8gPSBzZWxmLmRhdGEoJ3BhZ2luYXRpb24nKSwgJGxpbmtXcmFwcGVyID0gJCgnPGxpPjwvbGk+JyksICR1bCA9IHNlbGYuZmluZCgndWwnKTtcblxuXHRcdFx0cGFnZUluZGV4ID0gcGFnZUluZGV4IDwgMCA/IDAgOiAocGFnZUluZGV4IDwgby5wYWdlcyA/IHBhZ2VJbmRleCA6IG8ucGFnZXMgLSAxKTtcblxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0dGV4dDogcGFnZUluZGV4ICsgMSxcblx0XHRcdFx0Y2xhc3NlczogJydcblx0XHRcdH07XG5cblx0XHRcdGlmIChvLmxhYmVsTWFwLmxlbmd0aCAmJiBvLmxhYmVsTWFwW3BhZ2VJbmRleF0pIHtcblx0XHRcdFx0b3B0aW9ucy50ZXh0ID0gby5sYWJlbE1hcFtwYWdlSW5kZXhdO1xuXHRcdFx0fVxuXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQob3B0aW9ucywgb3B0cyB8fCB7fSk7XG5cblx0XHRcdGlmIChwYWdlSW5kZXggPT0gby5jdXJyZW50UGFnZSB8fCBvLmRpc2FibGVkKSB7XG5cdFx0XHRcdGlmIChvLmRpc2FibGVkIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ3ByZXYnIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ25leHQnKSB7XG5cdFx0XHRcdFx0JGxpbmtXcmFwcGVyLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRsaW5rV3JhcHBlci5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiBjbGFzcz1cImN1cnJlbnRcIj4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9zcGFuPicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8udXNlQW5jaG9ycykge1xuXHRcdFx0XHRcdCRsaW5rID0gJCgnPGEgaHJlZj1cIicgKyBvLmhyZWZUZXh0UHJlZml4ICsgKHBhZ2VJbmRleCArIDEpICsgby5ocmVmVGV4dFN1ZmZpeCArICdcIiBjbGFzcz1cInBhZ2UtbGlua1wiPicgKyAob3B0aW9ucy50ZXh0KSArICc8L2E+Jyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiA+JyArIChvcHRpb25zLnRleHQpICsgJzwvc3Bhbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbGluay5jbGljayhmdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdFx0cmV0dXJuIG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCBwYWdlSW5kZXgsIGV2ZW50KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLmNsYXNzZXMpIHtcblx0XHRcdFx0JGxpbmsuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzKTtcblx0XHRcdH1cblxuXHRcdFx0JGxpbmtXcmFwcGVyLmFwcGVuZCgkbGluayk7XG5cblx0XHRcdGlmICgkdWwubGVuZ3RoKSB7XG5cdFx0XHRcdCR1bC5hcHBlbmQoJGxpbmtXcmFwcGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCRsaW5rV3JhcHBlcik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9zZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlSW5kZXgsIGV2ZW50KSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5jdXJyZW50UGFnZSA9IHBhZ2VJbmRleDtcblx0XHRcdGlmIChvLnNlbGVjdE9uQ2xpY2spIHtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG8ub25QYWdlQ2xpY2socGFnZUluZGV4ICsgMSwgZXZlbnQpO1xuXHRcdH0sXG5cblxuXHRcdF9lbGxpcHNlQ2xpY2s6IGZ1bmN0aW9uKCRwYW5lbCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdCRlbGxpcCA9ICRwYW5lbC5maW5kKCcuZWxsaXBzZScpO1xuXHRcdFx0JGVsbGlwLmFkZENsYXNzKCdjbGlja2FibGUnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdCRlbGxpcC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRpZiAoIW8uZGlzYWJsZSkge1xuXHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWwgPSAocGFyc2VJbnQoJHRoaXMucGFyZW50KCkucHJldigpLnRleHQoKSwgMTApIHx8IDApICsgMTtcblx0XHRcdFx0XHQkdGhpc1xuXHRcdFx0XHRcdFx0Lmh0bWwoJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIicgKyBvLnBhZ2VzICsgJ1wiIHN0ZXA9XCIxXCIgdmFsdWU9XCInICsgdmFsICsgJ1wiPicpXG5cdFx0XHRcdFx0XHQuZmluZCgnaW5wdXQnKVxuXHRcdFx0XHRcdFx0LmZvY3VzKClcblx0XHRcdFx0XHRcdC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHQvLyBwcmV2ZW50IGlucHV0IG51bWJlciBhcnJvd3MgZnJvbSBidWJibGluZyBhIGNsaWNrIGV2ZW50IG9uICRlbGxpcFxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChldmVudC53aGljaCA9PT0gMTMgJiYgdmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVudGVyIHRvIGFjY2VwdFxuXHRcdFx0XHRcdFx0XHRcdGlmICgodmFsPjApJiYodmFsPD1vLnBhZ2VzKSlcblx0XHRcdFx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgdmFsIC0gMSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IDI3KSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZXNjYXBlIHRvIGNhbmNlbFxuXHRcdFx0XHRcdFx0XHRcdCRlbGxpcC5lbXB0eSgpLmh0bWwoby5lbGxpcHNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuYmluZCgnYmx1cicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAodmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCB2YWwgLSAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQkZWxsaXAuZW1wdHkoKS5odG1sKG8uZWxsaXBzZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fTtcblxuXHQkLmZuLnBhZ2luYXRpb24gPSBmdW5jdGlvbihtZXRob2QpIHtcblxuXHRcdC8vIE1ldGhvZCBjYWxsaW5nIGxvZ2ljXG5cdFx0aWYgKG1ldGhvZHNbbWV0aG9kXSAmJiBtZXRob2QuY2hhckF0KDApICE9ICdfJykge1xuXHRcdFx0cmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcblx0XHRcdHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5lcnJvcignTWV0aG9kICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkucGFnaW5hdGlvbicpO1xuXHRcdH1cblxuXHR9O1xuXG59KShqUXVlcnkpOyIsIi8qXG4gICAgQSBzaW1wbGUgalF1ZXJ5IG1vZGFsIChodHRwOi8vZ2l0aHViLmNvbS9reWxlZm94L2pxdWVyeS1tb2RhbClcbiAgICBWZXJzaW9uIDAuOS4yXG4qL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgLy8gTWFraW5nIHlvdXIgalF1ZXJ5IHBsdWdpbiB3b3JrIGJldHRlciB3aXRoIG5wbSB0b29sc1xuICAvLyBodHRwOi8vYmxvZy5ucG1qcy5vcmcvcG9zdC8xMTI3MTIxNjk4MzAvbWFraW5nLXlvdXItanF1ZXJ5LXBsdWdpbi13b3JrLWJldHRlci13aXRoLW5wbVxuICBpZih0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgIGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgd2luZG93LCBkb2N1bWVudCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZmFjdG9yeShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpO1xuICB9XG59KGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuXG4gIHZhciBtb2RhbHMgPSBbXSxcbiAgICAgIGdldEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1vZGFscy5sZW5ndGggPyBtb2RhbHNbbW9kYWxzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChpPW1vZGFscy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgICAgaWYgKG1vZGFsc1tpXS4kYmxvY2tlcikge1xuICAgICAgICAgICAgbW9kYWxzW2ldLiRibG9ja2VyLnRvZ2dsZUNsYXNzKCdjdXJyZW50Jywhc2VsZWN0ZWQpLnRvZ2dsZUNsYXNzKCdiZWhpbmQnLHNlbGVjdGVkKTtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgJC55c3BfbW9kYWwgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICAgIHZhciByZW1vdmUsIHRhcmdldDtcbiAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLnlzcF9tb2RhbC5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLmRvRmFkZSA9ICFpc05hTihwYXJzZUludCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCAxMCkpO1xuICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VFeGlzdGluZylcbiAgICAgIHdoaWxlICgkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpOyAvLyBDbG9zZSBhbnkgb3BlbiBtb2RhbHMuXG4gICAgbW9kYWxzLnB1c2godGhpcyk7XG4gICAgaWYgKGVsLmlzKCdhJykpIHtcbiAgICAgIHRhcmdldCA9IGVsLmF0dHIoJ2hyZWYnKTtcbiAgICAgIHRoaXMuYW5jaG9yID0gZWw7XG4gICAgICAvL1NlbGVjdCBlbGVtZW50IGJ5IGlkIGZyb20gaHJlZlxuICAgICAgaWYgKC9eIy8udGVzdCh0YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuJGVsbSA9ICQodGFyZ2V0KTtcbiAgICAgICAgaWYgKHRoaXMuJGVsbS5sZW5ndGggIT09IDEpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIC8vQUpBWFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtID0gJCgnPGRpdj4nKTtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgICAgcmVtb3ZlID0gZnVuY3Rpb24oZXZlbnQsIG1vZGFsKSB7IG1vZGFsLmVsbS5yZW1vdmUoKTsgfTtcbiAgICAgICAgdGhpcy5zaG93U3Bpbm5lcigpO1xuICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfU0VORCk7XG4gICAgICAgICQuZ2V0KHRhcmdldCkuZG9uZShmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKSByZXR1cm47XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MpO1xuICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIGN1cnJlbnQuJGVsbS5lbXB0eSgpLmFwcGVuZChodG1sKS5vbigkLnlzcF9tb2RhbC5DTE9TRSwgcmVtb3ZlKTtcbiAgICAgICAgICBjdXJyZW50LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgY3VycmVudC5vcGVuKCk7XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfRkFJTCk7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgICAgY3VycmVudC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgIG1vZGFscy5wb3AoKTsgLy8gcmVtb3ZlIGV4cGVjdGVkIG1vZGFsIGZyb20gdGhlIGxpc3RcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxtID0gZWw7XG4gICAgICB0aGlzLmFuY2hvciA9IGVsO1xuICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfTtcblxuICAkLnlzcF9tb2RhbC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6ICQueXNwX21vZGFsLFxuXG4gICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICB0aGlzLmJsb2NrKCk7XG4gICAgICB0aGlzLmFuY2hvci5ibHVyKCk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbS5zaG93KCk7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24gKiB0aGlzLm9wdGlvbnMuZmFkZURlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJykub24oJ2tleWRvd24ubW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNyAmJiBjdXJyZW50Lm9wdGlvbnMuZXNjYXBlQ2xvc2UpIGN1cnJlbnQuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja0Nsb3NlKVxuICAgICAgICB0aGlzLiRibG9ja2VyLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgbW9kYWxzLnBvcCgpO1xuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJyk7XG4gICAgfSxcblxuICAgIGJsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9CTE9DSywgW3RoaXMuX2N0eCgpXSk7XG4gICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuJGJsb2NrZXIgPSAkKCc8ZGl2IGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5ibG9ja2VyQ2xhc3MgKyAnIGJsb2NrZXIgY3VycmVudFwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGJvZHkpO1xuICAgICAgc2VsZWN0Q3VycmVudCgpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNzcygnb3BhY2l0eScsMCkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkxPQ0ssIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICB1bmJsb2NrOiBmdW5jdGlvbihub3cpIHtcbiAgICAgIGlmICghbm93ICYmIHRoaXMub3B0aW9ucy5kb0ZhZGUpXG4gICAgICAgIHRoaXMuJGJsb2NrZXIuZmFkZU91dCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCB0aGlzLnVuYmxvY2suYmluZCh0aGlzLHRydWUpKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNoaWxkcmVuKCkuYXBwZW5kVG8odGhpcy4kYm9keSk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgICAgICBzZWxlY3RDdXJyZW50KCk7XG4gICAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCcnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dDbG9zZSkge1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gJCgnPGEgaHJlZj1cIiNjbG9zZS1tb2RhbFwiIHJlbD1cIm1vZGFsOmNsb3NlXCIgY2xhc3M9XCJjbG9zZS1tb2RhbCAnICsgdGhpcy5vcHRpb25zLmNsb3NlQ2xhc3MgKyAnXCI+JyArIHRoaXMub3B0aW9ucy5jbG9zZVRleHQgKyAnPC9hPicpO1xuICAgICAgICB0aGlzLiRlbG0uYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLmFkZENsYXNzKHRoaXMub3B0aW9ucy5tb2RhbENsYXNzKS5hcHBlbmRUbyh0aGlzLiRibG9ja2VyKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmNzcyh7b3BhY2l0eTogMCwgZGlzcGxheTogJ2lubGluZS1ibG9jayd9KS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0uY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX0NMT1NFLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIGlmICh0aGlzLmNsb3NlQnV0dG9uKSB0aGlzLmNsb3NlQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSwgW190aGlzLl9jdHgoKV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbS5oaWRlKDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UsIFtfdGhpcy5fY3R4KCldKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5DTE9TRSwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIHNob3dTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnNob3dTcGlubmVyKSByZXR1cm47XG4gICAgICB0aGlzLnNwaW5uZXIgPSB0aGlzLnNwaW5uZXIgfHwgJCgnPGRpdiBjbGFzcz1cIicgKyB0aGlzLm9wdGlvbnMubW9kYWxDbGFzcyArICctc3Bpbm5lclwiPjwvZGl2PicpXG4gICAgICAgIC5hcHBlbmQodGhpcy5vcHRpb25zLnNwaW5uZXJIdG1sKTtcbiAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuc3Bpbm5lcik7XG4gICAgICB0aGlzLnNwaW5uZXIuc2hvdygpO1xuICAgIH0sXG5cbiAgICBoaWRlU3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zcGlubmVyKSB0aGlzLnNwaW5uZXIucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIC8vUmV0dXJuIGNvbnRleHQgZm9yIGN1c3RvbSBldmVudHNcbiAgICBfY3R4OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7IGVsbTogdGhpcy4kZWxtLCAkZWxtOiB0aGlzLiRlbG0sICRibG9ja2VyOiB0aGlzLiRibG9ja2VyLCBvcHRpb25zOiB0aGlzLm9wdGlvbnMsICRhbmNob3I6IHRoaXMuYW5jaG9yIH07XG4gICAgfVxuICB9O1xuXG4gICQueXNwX21vZGFsLmNsb3NlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpIHJldHVybjtcbiAgICBpZiAoZXZlbnQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgY3VycmVudC5jbG9zZSgpO1xuICAgIHJldHVybiBjdXJyZW50LiRlbG07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBpZiB0aGVyZSBjdXJyZW50bHkgaXMgYW4gYWN0aXZlIG1vZGFsXG4gICQueXNwX21vZGFsLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtb2RhbHMubGVuZ3RoID4gMDtcbiAgfTtcblxuICAkLnlzcF9tb2RhbC5nZXRDdXJyZW50ID0gZ2V0Q3VycmVudDtcblxuICAkLnlzcF9tb2RhbC5kZWZhdWx0cyA9IHtcbiAgICBjbG9zZUV4aXN0aW5nOiB0cnVlLFxuICAgIGVzY2FwZUNsb3NlOiB0cnVlLFxuICAgIGNsaWNrQ2xvc2U6IHRydWUsXG4gICAgY2xvc2VUZXh0OiAnQ2xvc2UnLFxuICAgIGNsb3NlQ2xhc3M6ICcnLFxuICAgIG1vZGFsQ2xhc3M6IFwieXNwLW1vZGFsXCIsXG4gICAgYmxvY2tlckNsYXNzOiBcImpxdWVyeS1tb2RhbFwiLFxuICAgIHNwaW5uZXJIdG1sOiAnPGRpdiBjbGFzcz1cInJlY3QxXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QyXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QzXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3Q0XCI+PC9kaXY+JyxcbiAgICBzaG93U3Bpbm5lcjogdHJ1ZSxcbiAgICBzaG93Q2xvc2U6IHRydWUsXG4gICAgZmFkZUR1cmF0aW9uOiBudWxsLCAgIC8vIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhlIGZhZGUgYW5pbWF0aW9uIHRha2VzLlxuICAgIGZhZGVEZWxheTogMS4wICAgICAgICAvLyBQb2ludCBkdXJpbmcgdGhlIG92ZXJsYXkncyBmYWRlLWluIHRoYXQgdGhlIG1vZGFsIGJlZ2lucyB0byBmYWRlIGluICguNSA9IDUwJSwgMS41ID0gMTUwJSwgZXRjLilcbiAgfTtcblxuICAvLyBFdmVudCBjb25zdGFudHNcbiAgJC55c3BfbW9kYWwuQkVGT1JFX0JMT0NLID0gJ21vZGFsOmJlZm9yZS1ibG9jayc7XG4gICQueXNwX21vZGFsLkJMT0NLID0gJ21vZGFsOmJsb2NrJztcbiAgJC55c3BfbW9kYWwuQkVGT1JFX09QRU4gPSAnbW9kYWw6YmVmb3JlLW9wZW4nO1xuICAkLnlzcF9tb2RhbC5PUEVOID0gJ21vZGFsOm9wZW4nO1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfQ0xPU0UgPSAnbW9kYWw6YmVmb3JlLWNsb3NlJztcbiAgJC55c3BfbW9kYWwuQ0xPU0UgPSAnbW9kYWw6Y2xvc2UnO1xuICAkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSA9ICdtb2RhbDphZnRlci1jbG9zZSc7XG4gICQueXNwX21vZGFsLkFKQVhfU0VORCA9ICdtb2RhbDphamF4OnNlbmQnO1xuICAkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MgPSAnbW9kYWw6YWpheDpzdWNjZXNzJztcbiAgJC55c3BfbW9kYWwuQUpBWF9GQUlMID0gJ21vZGFsOmFqYXg6ZmFpbCc7XG4gICQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUgPSAnbW9kYWw6YWpheDpjb21wbGV0ZSc7XG5cbiAgJC5mbi55c3BfbW9kYWwgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIG5ldyAkLnlzcF9tb2RhbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gQXV0b21hdGljYWxseSBiaW5kIGxpbmtzIHdpdGggcmVsPVwibW9kYWw6Y2xvc2VcIiB0bywgd2VsbCwgY2xvc2UgdGhlIG1vZGFsLlxuICAkKGRvY3VtZW50KS5vbignY2xpY2subW9kYWwnLCAnYVtyZWx+PVwibW9kYWw6Y2xvc2VcIl0nLCAkLnlzcF9tb2RhbC5jbG9zZSk7XG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5tb2RhbCcsICdhW3JlbH49XCJtb2RhbDpvcGVuXCJdJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcykubW9kYWwoKTtcbiAgfSk7XG59KSk7IiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgXG4gIGpRdWVyeSgnW2RhdGEtbW9kYWxdJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnZnVjayBtZSAnKTtcblxuICAgIHZhciBkYXRhX21vZGFsID0galF1ZXJ5KHRoaXMpLmRhdGEoJ21vZGFsJyk7XG5cbiAgICBqUXVlcnkoIGRhdGFfbW9kYWwgKS55c3BfbW9kYWwoe1xuICAgIFx0Y2xvc2VUZXh0OiAnWCcsXG4gICAgICBtb2RhbENsYXNzOiAneXNwLW1vZGFsLW9wZW4nLFxuICAgICAgY2xvc2VDbGFzczogJ3lzcC1tb2RlbC1jbG9zZSdcbiAgICB9KTtcbiAgfSk7XG59KTtcbiIsIk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdHJpbmcucHJvdG90eXBlLCAnZWFjaFdvcmRDYXBpdGFsaXplJywge1xuICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9Mb3dlckNhc2UoKVxuICAgIC5zcGxpdCgnICcpXG4gICAgLm1hcCgocykgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc3Vic3RyaW5nKDEpKVxuICAgIC5qb2luKCcgJyk7XG4gIH0sXG4gIGVudW1lcmFibGU6IGZhbHNlXG59KTtcblxuZnVuY3Rpb24geXNwX2dldF9mb3JtX2RhdGEoZm9ybV9lbGUpIHtcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoIGZvcm1fZWxlICk7XG5cbiAgICBsZXQgZmQ9T2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhLmVudHJpZXMoKSk7XG5cbiAgICBmb3IgKGNvbnN0IFtmSW5kZXgsIGZpZWxkXSBvZiBPYmplY3QuZW50cmllcyhmZCkpIHtcblxuICAgICAgICBsZXQgVmFsQXJyYXkgPSBmb3JtRGF0YS5nZXRBbGwoZkluZGV4KTtcblxuICAgICAgICBpZiAodHlwZW9mIFZhbEFycmF5WzFdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBmZFsgZkluZGV4IF0gPSBWYWxBcnJheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmZFsgZkluZGV4IF0gPT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBmZFtmSW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZkO1xufVxuXG5mdW5jdGlvbiB5c3Bfc2V0X2Zvcm1fdG9fZGF0YShpbnB1dERhdGEpIHtcblxuICAgIGxldCBmb3JtQT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG4gICAgbGV0IGZvcm1CPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG5cbiAgICBmb3JtQS5yZXNldCgpO1xuICAgIGZvcm1CLnJlc2V0KCk7XG5cbiAgICBsZXQgZm9ybUlucHV0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC15YWNodC1zZWFyY2gtZm9ybVwiXSwgI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybVwiXScpO1xuXG4gICAgZm9ybUlucHV0cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgbGV0IGlucHV0ID0gZWxlO1xuXG4gICAgICAgIGxldCBuYW1lID0gZWxlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgIGxldCBoYXNQcmV0dHkgPSBpbnB1dERhdGFbIG5hbWUgXTtcblxuICAgICAgIC8vIGNvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBoYXNQcmV0dHkgIT0gJ251bGwnICYmIHR5cGVvZiBoYXNQcmV0dHkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGFzUHJldHR5KSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgICAgIGhhc1ByZXR0eS5mb3JFYWNoKChoUCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhQICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoYXNQcmV0dHkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGhhc1ByZXR0eTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHlzcF9wdXNoX2hpc3RvcnkoIGRhdGEgPSB7fSApIHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGxldCBzdHJwYXRoPScnO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGxldCBpdCA9IGRhdGFbIHByb3BlcnR5IF07XG5cblxuICAgICAgICBpZiAoaXQgIT0gJycgJiYgdHlwZW9mIGl0ICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBwcm9wZXJ0eSAhPSAnT25GaXJzdExvYWQnICYmIHR5cGVvZiBpdCAhPSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgaXQpO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKGl0LnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJykpKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXQpKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBpdCk7XG5cbiAgICAgICAgICAgIGl0ID0gaXQubWFwKChwcm9wKSA9PiB7IHJldHVybiBwcm9wLnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJyk7IH0pO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKCBpdC5qb2luKFwiK1wiKSApKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpOyAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy9oaXN0b3J5LnB1c2hTdGF0ZShkYXRhLCAnJywgeXNwX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCsnPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKGRhdGEsICcnLCB5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsK3N0cnBhdGgpO1xuXG4gICAgcmV0dXJuIHlzcF95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrc3RycGF0aDsgICAgXG59XG5cbiIsInZhciB5c3BfYXBpPXt9O1xuXG4gICAgeXNwX2FwaS5jYWxsX2FwaT1mdW5jdGlvbihtZXRob2QsIHBhdGgsIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZSggdGhpcy5yZXNwb25zZVRleHQgKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlRGF0YSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0dFVCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhc3NpbmdfZGF0YS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBwYXNzaW5nX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBwYXNzaW5nX2RhdGFbIHByb3BlcnR5IF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgX3F1ZXN0aW9uTWFyaz1zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHlzcF95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wieXNwL1wiKyBwYXRoICsgKChfcXVlc3Rpb25NYXJrICE9ICcnKT8nPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk6JycpLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdQT1NUJzpcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiUE9TVFwiLCB5c3BfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInlzcC9cIisgcGF0aCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHBhc3NpbmdfZGF0YSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTsiLCJ2YXIgeXNwX3RlbXBsYXRlcz17fTtcblx0eXNwX3RlbXBsYXRlcy55YWNodD17fTtcblx0XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZD1mdW5jdGlvbih2ZXNzZWwsIHBhcmFtcykge1xuXHRcdGxldCBtZXRlcnMgPSBwYXJzZUludCh2ZXNzZWwuTm9taW5hbExlbmd0aCkgKiAwLjMwNDg7XG5cblx0XHRsZXQgcHJpY2UgPSAnJztcblx0XHRsZXQgbGVuZ3RoID0gJyc7XG5cblx0XHRpZiAoeXNwX3lhY2h0X3N5bmMuZXVyb3BlX29wdGlvbl9waWNrZWQgPT0gXCJ5ZXNcIikge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX0V1cm9WYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9FdXJvVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0fSBcblx0XHRlbHNlIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gdmVzc2VsLk5vbWluYWxMZW5ndGggKyBcIiAvIFwiICsgbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cblx0XHRcdGlmIChwYXJhbXMuY3VycmVuY3kgPT0gJ0V1cicpIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBgJCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfVVNEVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRsZXQgdmVzc2VsTG9jYXRpb24sIHZlc3NlbEtleXdvcmRMb2NhdGlvbkxpbms7XG5cblx0XHRpZiAodHlwZW9mIHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUQgIT0gbnVsbCkge1xuXG5cdFx0XHRpZiAodHlwZW9mIHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lID09ICdzdHJpbmcnICYmIHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lICE9ICcnKSB7XG5cblx0XHQgICAgICAgIHZlc3NlbEtleXdvcmRMb2NhdGlvbkxpbms9YC95YWNodC1zZWFyY2gveXNfa2V5d29yZC0keyB2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDaXR5TmFtZS5yZXBsYWNlKC8oICkvZywgJy0nKSB9YDtcblx0XHRcdFx0XG5cdFx0XHRcdHZlc3NlbExvY2F0aW9uID0gKHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRCA9PSBcIlVTXCIgfHwgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEID09IFwiVW5pdGVkIFN0YXRlc1wiID8gYCR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUudG9Mb3dlckNhc2UoKX0sICR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0U3RhdGVDb2RlfWAgOiBgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDaXR5TmFtZS50b0xvd2VyQ2FzZSgpfSwgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUR9YCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHQgICAgICAgIHZlc3NlbEtleXdvcmRMb2NhdGlvbkxpbms9YC95YWNodC1zZWFyY2gveXNfa2V5d29yZC0keyB2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUQucmVwbGFjZSgvKCApL2csICctJykgfWA7XG5cblx0XHRcdFx0dmVzc2VsTG9jYXRpb24gPSBgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUR9YDtcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieXNwLXlhY2h0LWl0ZW0geXNwLXZpZXctZ3JpZFwiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmktaW1hZ2VcIj5cblx0XHRcdFx0XHQ8YSBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogeXNwX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XHRcdFxuXHRcdFxuXHRcdFx0XHRcdFx0PHN2ZyB0aXRsZT1cImxpa2VcIiBjbGFzcz1cImxpa2UtbWUgbG92ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjU3XCIgaGVpZ2h0PVwiNTRcIiB2aWV3Qm94PVwiMCAwIDU3IDU0XCIgZmlsbD1cIm5vbmVcIiAgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0XHRcdCAgPGcgZmlsdGVyPVwidXJsKCNmaWx0ZXIwX2RfMjg4OF80MzMzKVwiPlxuXHRcdFx0XHRcdFx0ICAgIDxwYXRoIGQ9XCJNMzQuNzAyOCAxMS41NzU1QzM2LjIwOTQgMTEuNTc1NSAzNy42MjUxIDEyLjE2OTkgMzguNjg5OCAxMy4yNDg4TDM4LjgyMjMgMTMuMzgzQzQxLjAyMDYgMTUuNjExNiA0MS4wMjA2IDE5LjIzNzUgMzguODIyMyAyMS40NjZMMzguMDk5MiAyMi4xOTlMMjcuNDk5NSAzMi45NDQyTDE4LjQ4ODMgMjMuODA4TDE2LjkwMTEgMjIuMTk5TDE2LjE3OCAyMS40NjZDMTMuOTc5NyAxOS4yMzc1IDEzLjk3OTcgMTUuNjExNiAxNi4xNzggMTMuMzgzTDE2LjMwODMgMTMuMjUwOUMxNy4zNzM5IDEyLjE3MDggMTguNzkgMTEuNTc1OSAyMC4yOTYyIDExLjU3NjRDMjEuODAyMyAxMS41NzY0IDIzLjIxNzYgMTIuMTcwOCAyNC4yODE5IDEzLjI0OTJMMjUuMDA1IDEzLjk4MjJMMjcuNDk5MSAxNi41MTAxTDI5Ljk5MjggMTMuOTgxOEwzMC43MTU4IDEzLjI0ODhDMzEuNzgwMSAxMi4xNjk5IDMzLjE5NjIgMTEuNTc1NSAzNC43MDI4IDExLjU3NTVaTTM0LjcwMjggOEMzMi4zNTcgOCAzMC4wMTEyIDguOTA2OCAyOC4yMjIyIDEwLjcyMDRMMjcuNDk5MSAxMS40NTM0TDI2Ljc3NiAxMC43MjA0QzI0Ljk4NzggOC45MDcyMyAyMi42NDIgOC4wMDA0MyAyMC4yOTcgOEMxNy45NTA4IDggMTUuNjA1IDguOTA3MjMgMTMuODE0NyAxMC43MjIxTDEzLjY4NDQgMTAuODU0MkMxMC4xMDQ2IDE0LjQ4MzIgMTAuMTA0NiAyMC4zNjQ1IDEzLjY4NDQgMjMuOTkzNUwxNC40MDc0IDI0LjcyNjVMMTUuOTk0NiAyNi4zMzU0TDI3LjQ5OTUgMzhMNDAuNTkzMyAyNC43MjY1TDQxLjMxNjQgMjMuOTkzNUM0NC44OTQ1IDIwLjM2NjMgNDQuODk0NSAxNC40ODE0IDQxLjMxNjQgMTAuODU0Mkw0MS4xODM5IDEwLjcyQzM5LjM5NDUgOC45MDY4IDM3LjA0ODYgOCAzNC43MDI4IDhaXCIgZmlsbD1cIndoaXRlXCI+PC9wYXRoPlxuXHRcdFx0XHRcdFx0ICA8L2c+XG5cdFx0XHRcdFx0XHQgIDxkZWZzPlxuXHRcdFx0XHRcdFx0ICAgIDxmaWx0ZXIgaWQ9XCJmaWx0ZXIwX2RfMjg4OF80MzMzXCIgeD1cIi0wLjAwMDQ4ODI4MVwiIHk9XCIwXCIgd2lkdGg9XCI1Ny4wMDA1XCIgaGVpZ2h0PVwiNTRcIiBmaWx0ZXJVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPVwic1JHQlwiPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT1cIjBcIiByZXN1bHQ9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIj48L2ZlRmxvb2Q+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb2xvck1hdHJpeCBpbj1cIlNvdXJjZUFscGhhXCIgdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwXCIgcmVzdWx0PVwiaGFyZEFscGhhXCI+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlT2Zmc2V0IGR4PVwiMVwiIGR5PVwiNFwiPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPVwiNlwiPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb21wb3NpdGUgaW4yPVwiaGFyZEFscGhhXCIgb3BlcmF0b3I9XCJvdXRcIj48L2ZlQ29tcG9zaXRlPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMFwiPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUJsZW5kIG1vZGU9XCJub3JtYWxcIiBpbjI9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIiByZXN1bHQ9XCJlZmZlY3QxX2Ryb3BTaGFkb3dfMjg4OF80MzMzXCI+PC9mZUJsZW5kPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQmxlbmQgbW9kZT1cIm5vcm1hbFwiIGluPVwiU291cmNlR3JhcGhpY1wiIGluMj1cImVmZmVjdDFfZHJvcFNoYWRvd18yODg4XzQzMzNcIiByZXN1bHQ9XCJzaGFwZVwiPjwvZmVCbGVuZD5cblx0XHRcdFx0XHRcdCAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHRcdCAgPC9kZWZzPlxuXHRcdFx0XHRcdFx0PC9zdmc+XG5cblx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cInRvcC1jb21wYXJlXCIgdGl0bGU9XCJjb21wYXJlXCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNvbXBhcmVfdG9nZ2xlXCIgbmFtZT1cImNvbXBhcmVcIiB2YWx1ZT1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiAvPlxuXG5cdFx0XHRcdFx0XHRcdDxzdmcgd2lkdGg9XCI1OFwiIGhlaWdodD1cIjI1XCIgdmlld0JveD1cIjAgMCA1OCAyNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTUxLjUwMjkgMTguMTk1M0w1NC42NzUzIDE0Ljc3NjdDNTUuNDQxMSAxMy45NTE1IDU1LjEyNTggMTIuNTQxOCA1NC4wOTM3IDEyLjE4NDNMNTIuMiAxMS41Mjg0VjQuNjg3NUM1Mi4yIDMuODI0NTYgNTEuNTUwOCAzLjEyNSA1MC43NSAzLjEyNUg0Ny44NVYxLjE3MTg3QzQ3Ljg1IDAuNTI0NjU4IDQ3LjM2MzEgMCA0Ni43NjI1IDBINDAuMjM3NUMzOS42MzY5IDAgMzkuMTUgMC41MjQ2NTggMzkuMTUgMS4xNzE4N1YzLjEyNUgzNi4yNUMzNS40NDkyIDMuMTI1IDM0LjggMy44MjQ1NiAzNC44IDQuNjg3NVYxMS41Mjg0TDMyLjkwNjMgMTIuMTg0M0MzMS44NzUzIDEyLjU0MTQgMzEuNTU4MSAxMy45NTA2IDMyLjMyNDcgMTQuNzc2N0wzNS40OTcxIDE4LjE5NTNDMzQuNzAxNiAyMC4zMjY1IDMyLjg3ODIgMjEuODc1IDMwLjA4NzUgMjEuODc1QzI5LjQ4NjkgMjEuODc1IDI5IDIyLjM5OTcgMjkgMjMuMDQ2OVYyMy44MjgxQzI5IDI0LjQ3NTMgMjkuNDg2OSAyNSAzMC4wODc1IDI1QzMyLjg1MjYgMjUgMzQuOTU4NSAyMy45OTM3IDM2LjU3ODkgMjIuMDk5OEMzNy4yMzIyIDIzLjgwMDQgMzguNzg4NSAyNSA0MC42IDI1SDQ2LjRDNDguMjExNiAyNSA0OS43Njc4IDIzLjgwMDQgNTAuNDIxMSAyMi4wOTk4QzUyLjA0MTIgMjMuOTkzNCA1NC4xNDcgMjUgNTYuOTEyNSAyNUM1Ny41MTMxIDI1IDU4IDI0LjQ3NTMgNTggMjMuODI4MVYyMy4wNDY5QzU4IDIyLjM5OTcgNTcuNTEzMSAyMS44NzUgNTYuOTEyNSAyMS44NzVDNTQuMTU2NyAyMS44NzUgNTIuMzExNCAyMC4zNjEzIDUxLjUwMjkgMTguMTk1M1pNMzcuNyA2LjI1SDQ5LjNWMTAuNTI0TDQzLjk0MzcgOC42Njg3NUM0My42NTUyIDguNTY4OCA0My4zNDQ4IDguNTY4OCA0My4wNTYzIDguNjY4NzVMMzcuNyAxMC41MjRWNi4yNVpcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNMjIuNTAyOSAxOC4xOTUzTDI1LjY3NTMgMTQuNzc2N0MyNi40NDExIDEzLjk1MTUgMjYuMTI1OCAxMi41NDE4IDI1LjA5MzcgMTIuMTg0M0wyMy4yIDExLjUyODRWNC42ODc1QzIzLjIgMy44MjQ1NiAyMi41NTA4IDMuMTI1IDIxLjc1IDMuMTI1SDE4Ljg1VjEuMTcxODhDMTguODUgMC41MjQ2NTggMTguMzYzMSAwIDE3Ljc2MjUgMEgxMS4yMzc1QzEwLjYzNjkgMCAxMC4xNSAwLjUyNDY1OCAxMC4xNSAxLjE3MTg4VjMuMTI1SDcuMjVDNi40NDkxOSAzLjEyNSA1LjggMy44MjQ1NiA1LjggNC42ODc1VjExLjUyODRMMy45MDYzIDEyLjE4NDNDMi44NzUzIDEyLjU0MTQgMi41NTgwNyAxMy45NTA2IDMuMzI0NjcgMTQuNzc2N0w2LjQ5NzA5IDE4LjE5NTNDNS43MDE1OCAyMC4zMjY1IDMuODc4MTYgMjEuODc1IDEuMDg3NSAyMS44NzVDMC40ODY4ODMgMjEuODc1IDAgMjIuMzk5NyAwIDIzLjA0NjlWMjMuODI4MUMwIDI0LjQ3NTMgMC40ODY4ODMgMjUgMS4wODc1IDI1QzMuODUyNiAyNSA1Ljk1ODU1IDIzLjk5MzcgNy41Nzg4OCAyMi4wOTk4QzguMjMyMjQgMjMuODAwNCA5Ljc4ODQ1IDI1IDExLjYgMjVIMTcuNEMxOS4yMTE1IDI1IDIwLjc2NzggMjMuODAwNCAyMS40MjExIDIyLjA5OThDMjMuMDQxMiAyMy45OTM0IDI1LjE0NyAyNSAyNy45MTI1IDI1QzI4LjUxMzEgMjUgMjkgMjQuNDc1MyAyOSAyMy44MjgxVjIzLjA0NjlDMjkgMjIuMzk5NyAyOC41MTMxIDIxLjg3NSAyNy45MTI1IDIxLjg3NUMyNS4xNTY3IDIxLjg3NSAyMy4zMTE0IDIwLjM2MTMgMjIuNTAyOSAxOC4xOTUzWk04LjcgNi4yNUgyMC4zVjEwLjUyNEwxNC45NDM3IDguNjY4NzVDMTQuNjU1MiA4LjU2ODggMTQuMzQ0OCA4LjU2ODggMTQuMDU2MyA4LjY2ODc1TDguNyAxMC41MjRWNi4yNVpcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDwvc3ZnPlx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktcHJpY2VcIj4keyBwcmljZSB9PC9zcGFuPlxuXHRcdFx0XHRcdDwvYT5cdFxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmVzdWx0LWl0ZW0taW5mb1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyaS10b3BcIj5cblx0XHRcdFx0XHRcdDxhIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJpLW5hbWVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfTwvc3Bhbj48YnI+XG5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1zdWItbmFtZVwiPiR7IHZlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICdOL0EnIH08L3NwYW4+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmktYm90dG9tXCI+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJpLWxvY2F0aW9uXCI+XHRcblx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbEtleXdvcmRMb2NhdGlvbkxpbmsgfVwiPlx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdDxzdmcgd2lkdGg9XCIxOFwiIGhlaWdodD1cIjE4XCIgdmlld0JveD1cIjAgMCAxOCAxOFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNMTUuNzUgNy41QzE1Ljc1IDEyLjc1IDkgMTcuMjUgOSAxNy4yNUM5IDE3LjI1IDIuMjUgMTIuNzUgMi4yNSA3LjVDMi4yNSA1LjcwOTc5IDIuOTYxMTYgMy45OTI5IDQuMjI3MDMgMi43MjcwM0M1LjQ5MjkgMS40NjExNiA3LjIwOTc5IDAuNzUgOSAwLjc1QzEwLjc5MDIgMC43NSAxMi41MDcxIDEuNDYxMTYgMTMuNzczIDIuNzI3MDNDMTUuMDM4OCAzLjk5MjkgMTUuNzUgNS43MDk3OSAxNS43NSA3LjVaXCIgc3Ryb2tlPVwiIzA2N0FFRFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTkgOS43NUMxMC4yNDI2IDkuNzUgMTEuMjUgOC43NDI2NCAxMS4yNSA3LjVDMTEuMjUgNi4yNTczNiAxMC4yNDI2IDUuMjUgOSA1LjI1QzcuNzU3MzYgNS4yNSA2Ljc1IDYuMjU3MzYgNi43NSA3LjVDNi43NSA4Ljc0MjY0IDcuNzU3MzYgOS43NSA5IDkuNzVaXCIgc3Ryb2tlPVwiIzA2N0FFRFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cblx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0XHRcdFx0XHQkeyB2ZXNzZWxMb2NhdGlvbiB9XG5cdFx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHRcdDwvc3Bhbj5cblxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cIiN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsXCIgY2xhc3M9XCJyaS1jb250YWN0XCIgZGF0YS1tb2RhbD1cIiN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsXCI+XG5cdFx0XHRcdFx0XHRcdENvbnRhY3Rcblx0XHRcdFx0XHRcdFx0PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCI+XG5cdFx0XHRcdFx0XHRcdDxnIGNsaXAtcGF0aD1cInVybCgjY2xpcDBfODEwMV8xMDI3NylcIj5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk0xNS41NTU2IDBINS43Nzc4QzUuNTMyMTQgMCA1LjMzMzM0IDAuMTk4NzkyIDUuMzMzMzQgMC40NDQ0NThDNS4zMzMzNCAwLjY5MDEyNSA1LjUzMjE0IDAuODg4OTE3IDUuNzc3OCAwLjg4ODkxN0gxNC40ODI3TDAuMTMwMjE5IDE1LjI0MTNDLTAuMDQzNDA2MiAxNS40MTUgLTAuMDQzNDA2MiAxNS42OTYyIDAuMTMwMjE5IDE1Ljg2OThDMC4yMTcwMSAxNS45NTY2IDAuMzMwNzYgMTYgMC40NDQ0NjkgMTZDMC41NTgxNzcgMTYgMC42NzE4ODUgMTUuOTU2NiAwLjc1ODcxOSAxNS44Njk4TDE1LjExMTEgMS41MTczN1YxMC4yMjIyQzE1LjExMTEgMTAuNDY3OSAxNS4zMDk5IDEwLjY2NjcgMTUuNTU1NiAxMC42NjY3QzE1LjgwMTMgMTAuNjY2NyAxNi4wMDAxIDEwLjQ2NzkgMTYuMDAwMSAxMC4yMjIyVjAuNDQ0NDU4QzE2IDAuMTk4NzkyIDE1LjgwMTIgMCAxNS41NTU2IDBaXCIgZmlsbD1cIiMwNjdBRURcIi8+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdFx0XHRcdDxjbGlwUGF0aCBpZD1cImNsaXAwXzgxMDFfMTAyNzdcIj5cblx0XHRcdFx0XHRcdFx0PHJlY3Qgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbD1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8L2NsaXBQYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2RlZnM+XG5cdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy55YWNodC5saXN0PWZ1bmN0aW9uKHZlc3NlbCkge1xuXHRcdGxldCBtZXRlcnMgPSBwYXJzZUludCh2ZXNzZWwuTm9taW5hbExlbmd0aCkgKiAwLjMwNDg7XG5cdFx0bGV0IHByaWNlID0gJyc7XG5cdFx0bGV0IGxlbmd0aCA9ICcnO1xuXG5cdFx0aWYoeXNwX3lhY2h0X3N5bmMuZXVyb3BlX29wdGlvbl9waWNrZWQgPT0gXCJ5ZXNcIil7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSB2ZXNzZWwuUHJpY2UgPyBg4oKsICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KChwYXJzZUludCh2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpKSAqIHlzcF95YWNodF9zeW5jLmV1cm9fY19jKSl9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gdmVzc2VsLk5vbWluYWxMZW5ndGggKyBcIiAvIFwiICsgbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9IHZlc3NlbC5QcmljZSA/IGAkICR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHBhcnNlSW50KHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykpKX1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJ1xuXHRcdH1cblxuXHRcdGxldCB2ZXNzZWxMb2NhdGlvbiwgdmVzc2VsS2V5d29yZExvY2F0aW9uTGluaztcblxuXHRcdGlmICh0eXBlb2YgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRCAhPSBudWxsKSB7XG5cblx0XHRcdGlmICh0eXBlb2YgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUgPT0gJ3N0cmluZycgJiYgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUgIT0gJycpIHtcblxuXHRcdCAgICAgICAgdmVzc2VsS2V5d29yZExvY2F0aW9uTGluaz1gL3lhY2h0LXNlYXJjaC95c19rZXl3b3JkLSR7IHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lLnJlcGxhY2UoLyggKS9nLCAnLScpIH1gO1xuXHRcdFx0XHRcblx0XHRcdFx0dmVzc2VsTG9jYXRpb24gPSAodmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEID09IFwiVVNcIiB8fCB2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUQgPT0gXCJVbml0ZWQgU3RhdGVzXCIgPyBgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDaXR5TmFtZS50b0xvd2VyQ2FzZSgpfSwgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRTdGF0ZUNvZGV9YCA6IGAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lLnRvTG93ZXJDYXNlKCl9LCAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRH1gKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdCAgICAgICAgdmVzc2VsS2V5d29yZExvY2F0aW9uTGluaz1gL3lhY2h0LXNlYXJjaC95c19rZXl3b3JkLSR7IHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRC5yZXBsYWNlKC8oICkvZywgJy0nKSB9YDtcblxuXHRcdFx0XHR2ZXNzZWxMb2NhdGlvbiA9IGAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRH1gO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ5c3AteWFjaHQtaXRlbSB5c3Atdmlldy1saXN0XCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJyaS1pbWFnZVwiPlxuXHRcdFx0XHRcdDxhIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LWltYWdlXCIgc3JjPVwiJHt2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiB5c3BfeWFjaHRfc3luYy5hc3NldHNfdXJsICsgJ2ltYWdlcy9kZWZhdWx0LXlhY2h0LWltYWdlLmpwZWcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8c3ZnIHRpdGxlPVwiY29tcGFyZVwiIGNsYXNzPVwibGlrZS1tZSBsb3ZlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNTdcIiBoZWlnaHQ9XCI1NFwiIHZpZXdCb3g9XCIwIDAgNTcgNTRcIiBmaWxsPVwibm9uZVwiICBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlxuXHRcdFx0XHRcdFx0ICA8ZyBmaWx0ZXI9XCJ1cmwoI2ZpbHRlcjBfZF8yODg4XzQzMzMpXCI+XG5cdFx0XHRcdFx0XHQgICAgPHBhdGggZD1cIk0zNC43MDI4IDExLjU3NTVDMzYuMjA5NCAxMS41NzU1IDM3LjYyNTEgMTIuMTY5OSAzOC42ODk4IDEzLjI0ODhMMzguODIyMyAxMy4zODNDNDEuMDIwNiAxNS42MTE2IDQxLjAyMDYgMTkuMjM3NSAzOC44MjIzIDIxLjQ2NkwzOC4wOTkyIDIyLjE5OUwyNy40OTk1IDMyLjk0NDJMMTguNDg4MyAyMy44MDhMMTYuOTAxMSAyMi4xOTlMMTYuMTc4IDIxLjQ2NkMxMy45Nzk3IDE5LjIzNzUgMTMuOTc5NyAxNS42MTE2IDE2LjE3OCAxMy4zODNMMTYuMzA4MyAxMy4yNTA5QzE3LjM3MzkgMTIuMTcwOCAxOC43OSAxMS41NzU5IDIwLjI5NjIgMTEuNTc2NEMyMS44MDIzIDExLjU3NjQgMjMuMjE3NiAxMi4xNzA4IDI0LjI4MTkgMTMuMjQ5MkwyNS4wMDUgMTMuOTgyMkwyNy40OTkxIDE2LjUxMDFMMjkuOTkyOCAxMy45ODE4TDMwLjcxNTggMTMuMjQ4OEMzMS43ODAxIDEyLjE2OTkgMzMuMTk2MiAxMS41NzU1IDM0LjcwMjggMTEuNTc1NVpNMzQuNzAyOCA4QzMyLjM1NyA4IDMwLjAxMTIgOC45MDY4IDI4LjIyMjIgMTAuNzIwNEwyNy40OTkxIDExLjQ1MzRMMjYuNzc2IDEwLjcyMDRDMjQuOTg3OCA4LjkwNzIzIDIyLjY0MiA4LjAwMDQzIDIwLjI5NyA4QzE3Ljk1MDggOCAxNS42MDUgOC45MDcyMyAxMy44MTQ3IDEwLjcyMjFMMTMuNjg0NCAxMC44NTQyQzEwLjEwNDYgMTQuNDgzMiAxMC4xMDQ2IDIwLjM2NDUgMTMuNjg0NCAyMy45OTM1TDE0LjQwNzQgMjQuNzI2NUwxNS45OTQ2IDI2LjMzNTRMMjcuNDk5NSAzOEw0MC41OTMzIDI0LjcyNjVMNDEuMzE2NCAyMy45OTM1QzQ0Ljg5NDUgMjAuMzY2MyA0NC44OTQ1IDE0LjQ4MTQgNDEuMzE2NCAxMC44NTQyTDQxLjE4MzkgMTAuNzJDMzkuMzk0NSA4LjkwNjggMzcuMDQ4NiA4IDM0LjcwMjggOFpcIiBmaWxsPVwid2hpdGVcIj48L3BhdGg+XG5cdFx0XHRcdFx0XHQgIDwvZz5cblx0XHRcdFx0XHRcdCAgPGRlZnM+XG5cdFx0XHRcdFx0XHQgICAgPGZpbHRlciBpZD1cImZpbHRlcjBfZF8yODg4XzQzMzNcIiB4PVwiLTAuMDAwNDg4MjgxXCIgeT1cIjBcIiB3aWR0aD1cIjU3LjAwMDVcIiBoZWlnaHQ9XCI1NFwiIGZpbHRlclVuaXRzPVwidXNlclNwYWNlT25Vc2VcIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9XCJzUkdCXCI+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PVwiMFwiIHJlc3VsdD1cIkJhY2tncm91bmRJbWFnZUZpeFwiPjwvZmVGbG9vZD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUNvbG9yTWF0cml4IGluPVwiU291cmNlQWxwaGFcIiB0eXBlPVwibWF0cml4XCIgdmFsdWVzPVwiMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDBcIiByZXN1bHQ9XCJoYXJkQWxwaGFcIj48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVPZmZzZXQgZHg9XCIxXCIgZHk9XCI0XCI+PC9mZU9mZnNldD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249XCI2XCI+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUNvbXBvc2l0ZSBpbjI9XCJoYXJkQWxwaGFcIiBvcGVyYXRvcj1cIm91dFwiPjwvZmVDb21wb3NpdGU+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPVwibWF0cml4XCIgdmFsdWVzPVwiMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwXCI+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQmxlbmQgbW9kZT1cIm5vcm1hbFwiIGluMj1cIkJhY2tncm91bmRJbWFnZUZpeFwiIHJlc3VsdD1cImVmZmVjdDFfZHJvcFNoYWRvd18yODg4XzQzMzNcIj48L2ZlQmxlbmQ+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVCbGVuZCBtb2RlPVwibm9ybWFsXCIgaW49XCJTb3VyY2VHcmFwaGljXCIgaW4yPVwiZWZmZWN0MV9kcm9wU2hhZG93XzI4ODhfNDMzM1wiIHJlc3VsdD1cInNoYXBlXCI+PC9mZUJsZW5kPlxuXHRcdFx0XHRcdFx0ICAgIDwvZmlsdGVyPlxuXHRcdFx0XHRcdFx0ICA8L2RlZnM+XG5cdFx0XHRcdFx0XHQ8L3N2Zz5cblxuXHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwidG9wLWNvbXBhcmVcIiB0aXRsZT1cImNvbXBhcmVcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY29tcGFyZV90b2dnbGVcIiBuYW1lPVwiY29tcGFyZVwiIHZhbHVlPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIC8+XG5cblx0XHRcdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjU4XCIgaGVpZ2h0PVwiMjVcIiB2aWV3Qm94PVwiMCAwIDU4IDI1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNNTEuNTAyOSAxOC4xOTUzTDU0LjY3NTMgMTQuNzc2N0M1NS40NDExIDEzLjk1MTUgNTUuMTI1OCAxMi41NDE4IDU0LjA5MzcgMTIuMTg0M0w1Mi4yIDExLjUyODRWNC42ODc1QzUyLjIgMy44MjQ1NiA1MS41NTA4IDMuMTI1IDUwLjc1IDMuMTI1SDQ3Ljg1VjEuMTcxODdDNDcuODUgMC41MjQ2NTggNDcuMzYzMSAwIDQ2Ljc2MjUgMEg0MC4yMzc1QzM5LjYzNjkgMCAzOS4xNSAwLjUyNDY1OCAzOS4xNSAxLjE3MTg3VjMuMTI1SDM2LjI1QzM1LjQ0OTIgMy4xMjUgMzQuOCAzLjgyNDU2IDM0LjggNC42ODc1VjExLjUyODRMMzIuOTA2MyAxMi4xODQzQzMxLjg3NTMgMTIuNTQxNCAzMS41NTgxIDEzLjk1MDYgMzIuMzI0NyAxNC43NzY3TDM1LjQ5NzEgMTguMTk1M0MzNC43MDE2IDIwLjMyNjUgMzIuODc4MiAyMS44NzUgMzAuMDg3NSAyMS44NzVDMjkuNDg2OSAyMS44NzUgMjkgMjIuMzk5NyAyOSAyMy4wNDY5VjIzLjgyODFDMjkgMjQuNDc1MyAyOS40ODY5IDI1IDMwLjA4NzUgMjVDMzIuODUyNiAyNSAzNC45NTg1IDIzLjk5MzcgMzYuNTc4OSAyMi4wOTk4QzM3LjIzMjIgMjMuODAwNCAzOC43ODg1IDI1IDQwLjYgMjVINDYuNEM0OC4yMTE2IDI1IDQ5Ljc2NzggMjMuODAwNCA1MC40MjExIDIyLjA5OThDNTIuMDQxMiAyMy45OTM0IDU0LjE0NyAyNSA1Ni45MTI1IDI1QzU3LjUxMzEgMjUgNTggMjQuNDc1MyA1OCAyMy44MjgxVjIzLjA0NjlDNTggMjIuMzk5NyA1Ny41MTMxIDIxLjg3NSA1Ni45MTI1IDIxLjg3NUM1NC4xNTY3IDIxLjg3NSA1Mi4zMTE0IDIwLjM2MTMgNTEuNTAyOSAxOC4xOTUzWk0zNy43IDYuMjVINDkuM1YxMC41MjRMNDMuOTQzNyA4LjY2ODc1QzQzLjY1NTIgOC41Njg4IDQzLjM0NDggOC41Njg4IDQzLjA1NjMgOC42Njg3NUwzNy43IDEwLjUyNFY2LjI1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk0yMi41MDI5IDE4LjE5NTNMMjUuNjc1MyAxNC43NzY3QzI2LjQ0MTEgMTMuOTUxNSAyNi4xMjU4IDEyLjU0MTggMjUuMDkzNyAxMi4xODQzTDIzLjIgMTEuNTI4NFY0LjY4NzVDMjMuMiAzLjgyNDU2IDIyLjU1MDggMy4xMjUgMjEuNzUgMy4xMjVIMTguODVWMS4xNzE4OEMxOC44NSAwLjUyNDY1OCAxOC4zNjMxIDAgMTcuNzYyNSAwSDExLjIzNzVDMTAuNjM2OSAwIDEwLjE1IDAuNTI0NjU4IDEwLjE1IDEuMTcxODhWMy4xMjVINy4yNUM2LjQ0OTE5IDMuMTI1IDUuOCAzLjgyNDU2IDUuOCA0LjY4NzVWMTEuNTI4NEwzLjkwNjMgMTIuMTg0M0MyLjg3NTMgMTIuNTQxNCAyLjU1ODA3IDEzLjk1MDYgMy4zMjQ2NyAxNC43NzY3TDYuNDk3MDkgMTguMTk1M0M1LjcwMTU4IDIwLjMyNjUgMy44NzgxNiAyMS44NzUgMS4wODc1IDIxLjg3NUMwLjQ4Njg4MyAyMS44NzUgMCAyMi4zOTk3IDAgMjMuMDQ2OVYyMy44MjgxQzAgMjQuNDc1MyAwLjQ4Njg4MyAyNSAxLjA4NzUgMjVDMy44NTI2IDI1IDUuOTU4NTUgMjMuOTkzNyA3LjU3ODg4IDIyLjA5OThDOC4yMzIyNCAyMy44MDA0IDkuNzg4NDUgMjUgMTEuNiAyNUgxNy40QzE5LjIxMTUgMjUgMjAuNzY3OCAyMy44MDA0IDIxLjQyMTEgMjIuMDk5OEMyMy4wNDEyIDIzLjk5MzQgMjUuMTQ3IDI1IDI3LjkxMjUgMjVDMjguNTEzMSAyNSAyOSAyNC40NzUzIDI5IDIzLjgyODFWMjMuMDQ2OUMyOSAyMi4zOTk3IDI4LjUxMzEgMjEuODc1IDI3LjkxMjUgMjEuODc1QzI1LjE1NjcgMjEuODc1IDIzLjMxMTQgMjAuMzYxMyAyMi41MDI5IDE4LjE5NTNaTTguNyA2LjI1SDIwLjNWMTAuNTI0TDE0Ljk0MzcgOC42Njg3NUMxNC42NTUyIDguNTY4OCAxNC4zNDQ4IDguNTY4OCAxNC4wNTYzIDguNjY4NzVMOC43IDEwLjUyNFY2LjI1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XHRcdFx0PC9zdmc+XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDwvbGFiZWw+XG5cblx0XHRcdFx0XHRcdCR7dmVzc2VsLkNvbXBhbnlOYW1lID09PSB5c3BfeWFjaHRfc3luYy5jb21wYW55X25hbWUgPyBgPGRpdiBjbGFzcz1cImNvbXBhbnktYmFubmVyXCI+PGltZyBzcmM9XCIke3lzcF95YWNodF9zeW5jLmNvbXBhbnlfbG9nb31cIj48L2Rpdj5gIDogJyd9XG5cdFx0XHRcdFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1wcmljZVwiPiR7IHByaWNlIH08L3NwYW4+XG5cdFx0XHRcdFx0PC9hPlx0XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJyZXN1bHQtaXRlbS1pbmZvXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLXRvcFwiPlxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktbmFtZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9PC9zcGFuPjxiciAvPlxuXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktc3ViLW5hbWVcIj4keyB2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnTi9BJyB9PC9zcGFuPjxiciAvPlxuXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktbG9jYXRpb25cIj5cdFx0XG5cdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbEtleXdvcmRMb2NhdGlvbkxpbmsgfVwiPlx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdDxzdmcgd2lkdGg9XCIxOFwiIGhlaWdodD1cIjE4XCIgdmlld0JveD1cIjAgMCAxOCAxOFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk0xNS43NSA3LjVDMTUuNzUgMTIuNzUgOSAxNy4yNSA5IDE3LjI1QzkgMTcuMjUgMi4yNSAxMi43NSAyLjI1IDcuNUMyLjI1IDUuNzA5NzkgMi45NjExNiAzLjk5MjkgNC4yMjcwMyAyLjcyNzAzQzUuNDkyOSAxLjQ2MTE2IDcuMjA5NzkgMC43NSA5IDAuNzVDMTAuNzkwMiAwLjc1IDEyLjUwNzEgMS40NjExNiAxMy43NzMgMi43MjcwM0MxNS4wMzg4IDMuOTkyOSAxNS43NSA1LjcwOTc5IDE1Ljc1IDcuNVpcIiBzdHJva2U9XCIjMDY3QUVEXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk05IDkuNzVDMTAuMjQyNiA5Ljc1IDExLjI1IDguNzQyNjQgMTEuMjUgNy41QzExLjI1IDYuMjU3MzYgMTAuMjQyNiA1LjI1IDkgNS4yNUM3Ljc1NzM2IDUuMjUgNi43NSA2LjI1NzM2IDYuNzUgNy41QzYuNzUgOC43NDI2NCA3Ljc1NzM2IDkuNzUgOSA5Ljc1WlwiIHN0cm9rZT1cIiMwNjdBRURcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0XHRcdFx0XHRcdCR7IHZlc3NlbExvY2F0aW9uIH1cblx0XHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyaS1ib3R0b21cIj5cblx0XHRcdFx0XHRcdDxzcGFuPlxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDwvc3Bhbj5cblxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cIiN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsXCIgY2xhc3M9XCJyaS1jb250YWN0XCIgZGF0YS1tb2RhbD1cIiN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsXCI+XG5cdFx0XHRcdFx0XHRcdENvbnRhY3Rcblx0XHRcdFx0XHRcdFx0PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCI+XG5cdFx0XHRcdFx0XHRcdDxnIGNsaXAtcGF0aD1cInVybCgjY2xpcDBfODEwMV8xMDI3NylcIj5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk0xNS41NTU2IDBINS43Nzc4QzUuNTMyMTQgMCA1LjMzMzM0IDAuMTk4NzkyIDUuMzMzMzQgMC40NDQ0NThDNS4zMzMzNCAwLjY5MDEyNSA1LjUzMjE0IDAuODg4OTE3IDUuNzc3OCAwLjg4ODkxN0gxNC40ODI3TDAuMTMwMjE5IDE1LjI0MTNDLTAuMDQzNDA2MiAxNS40MTUgLTAuMDQzNDA2MiAxNS42OTYyIDAuMTMwMjE5IDE1Ljg2OThDMC4yMTcwMSAxNS45NTY2IDAuMzMwNzYgMTYgMC40NDQ0NjkgMTZDMC41NTgxNzcgMTYgMC42NzE4ODUgMTUuOTU2NiAwLjc1ODcxOSAxNS44Njk4TDE1LjExMTEgMS41MTczN1YxMC4yMjIyQzE1LjExMTEgMTAuNDY3OSAxNS4zMDk5IDEwLjY2NjcgMTUuNTU1NiAxMC42NjY3QzE1LjgwMTMgMTAuNjY2NyAxNi4wMDAxIDEwLjQ2NzkgMTYuMDAwMSAxMC4yMjIyVjAuNDQ0NDU4QzE2IDAuMTk4NzkyIDE1LjgwMTIgMCAxNS41NTU2IDBaXCIgZmlsbD1cIiMwNjdBRURcIi8+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdFx0XHRcdDxjbGlwUGF0aCBpZD1cImNsaXAwXzgxMDFfMTAyNzdcIj5cblx0XHRcdFx0XHRcdFx0PHJlY3Qgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbD1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8L2NsaXBQYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2RlZnM+XG5cdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0XG5cdFx0YDtcblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0LmNvbXBhcmVfcHJldmlldyA9IGZ1bmN0aW9uKHZlc3NlbCwgcGFyYW1zKSB7XG5cblx0XHRyZXR1cm4gYFxuXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieXNwLXlhY2h0LWNvbXBhcmUtcHJldmlld1wiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlx0XHRcdFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJlbW92ZS1mcm9tLWNvbXBhcmVcIj5cblx0XHRcdFx0XHQ8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHRcdFx0XHQ8cmVjdCB4PVwiMC41XCIgeT1cIjAuNVwiIHdpZHRoPVwiMjNcIiBoZWlnaHQ9XCIyM1wiIHJ4PVwiMTEuNVwiIHN0cm9rZT1cIiNGRkZGRkZcIi8+XG5cdFx0XHRcdFx0PHBhdGggZD1cIk04LjI2ODc2IDE0LjkzNDZDOC4wNDkwOSAxNS4xNTQzIDguMDQ5MDkgMTUuNTEwNCA4LjI2ODc2IDE1LjczMDFDOC40ODg0MyAxNS45NDk4IDguODQ0NTggMTUuOTQ5OCA5LjA2NDI1IDE1LjczMDFMOC4yNjg3NiAxNC45MzQ2Wk0xMi4zOTc2IDEyLjM5NjhDMTIuNjE3MyAxMi4xNzcxIDEyLjYxNzMgMTEuODIwOSAxMi4zOTc2IDExLjYwMTNDMTIuMTc3OSAxMS4zODE2IDExLjgyMTggMTEuMzgxNiAxMS42MDIxIDExLjYwMTNMMTIuMzk3NiAxMi4zOTY4Wk0xMS42MDE4IDExLjYwMTZDMTEuMzgyMSAxMS44MjEzIDExLjM4MjEgMTIuMTc3NCAxMS42MDE4IDEyLjM5NzFDMTEuODIxNCAxMi42MTY4IDEyLjE3NzYgMTIuNjE2OCAxMi4zOTczIDEyLjM5NzFMMTEuNjAxOCAxMS42MDE2Wk0xNS43MzA2IDkuMDYzNzZDMTUuOTUwMyA4Ljg0NDA5IDE1Ljk1MDMgOC40ODc5NCAxNS43MzA2IDguMjY4MjdDMTUuNTEwOSA4LjA0ODYgMTUuMTU0OCA4LjA0ODYgMTQuOTM1MSA4LjI2ODI3TDE1LjczMDYgOS4wNjM3NlpNMTIuMzk3MyAxMS42MDEzQzEyLjE3NzYgMTEuMzgxNiAxMS44MjE0IDExLjM4MTYgMTEuNjAxOCAxMS42MDEzQzExLjM4MjEgMTEuODIwOSAxMS4zODIxIDEyLjE3NzEgMTEuNjAxOCAxMi4zOTY4TDEyLjM5NzMgMTEuNjAxM1pNMTQuOTM1MSAxNS43MzAxQzE1LjE1NDggMTUuOTQ5OCAxNS41MTA5IDE1Ljk0OTggMTUuNzMwNiAxNS43MzAxQzE1Ljk1MDMgMTUuNTEwNCAxNS45NTAzIDE1LjE1NDMgMTUuNzMwNiAxNC45MzQ2TDE0LjkzNTEgMTUuNzMwMVpNMTEuNjAyMSAxMi4zOTcxQzExLjgyMTggMTIuNjE2OCAxMi4xNzc5IDEyLjYxNjggMTIuMzk3NiAxMi4zOTcxQzEyLjYxNzMgMTIuMTc3NCAxMi42MTczIDExLjgyMTMgMTIuMzk3NiAxMS42MDE2TDExLjYwMjEgMTIuMzk3MVpNOS4wNjQyNSA4LjI2ODI3QzguODQ0NTggOC4wNDg2IDguNDg4NDMgOC4wNDg2IDguMjY4NzYgOC4yNjgyN0M4LjA0OTA5IDguNDg3OTQgOC4wNDkwOSA4Ljg0NDA5IDguMjY4NzYgOS4wNjM3Nkw5LjA2NDI1IDguMjY4MjdaTTkuMDY0MjUgMTUuNzMwMUwxMi4zOTc2IDEyLjM5NjhMMTEuNjAyMSAxMS42MDEzTDguMjY4NzYgMTQuOTM0Nkw5LjA2NDI1IDE1LjczMDFaTTEyLjM5NzMgMTIuMzk3MUwxNS43MzA2IDkuMDYzNzZMMTQuOTM1MSA4LjI2ODI3TDExLjYwMTggMTEuNjAxNkwxMi4zOTczIDEyLjM5NzFaTTExLjYwMTggMTIuMzk2OEwxNC45MzUxIDE1LjczMDFMMTUuNzMwNiAxNC45MzQ2TDEyLjM5NzMgMTEuNjAxM0wxMS42MDE4IDEyLjM5NjhaTTEyLjM5NzYgMTEuNjAxNkw5LjA2NDI1IDguMjY4MjdMOC4yNjg3NiA5LjA2Mzc2TDExLjYwMjEgMTIuMzk3MUwxMi4zOTc2IDExLjYwMTZaXCIgZmlsbD1cIiNGRkZGRkZcIi8+XG5cdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdDwvc3Bhbj5cblxuXHRcdFx0XHQ8YSBjbGFzcz1cInByZXZpZXctbGlua1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXG5cdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHlzcF95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cdFx0XHRcdFxuXHRcdFx0XHRcdDxoNiBjbGFzcz1cInlhY2h0LXRpdGxlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ30gJHt2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnJ308L2g2PlxuXHRcdFx0XHQ8L2E+XG5cblx0XHRcdDwvZGl2PlxuXG5cdFx0YDtcblxuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzPWZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxiPk5vIFJlc3VsdHM8L2I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgIH07XG5cblxuICAgIHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnID0gZnVuY3Rpb24obGFiZWwsIHZhbHVlKSB7XG5cbiAgICBcdHJldHVybiBgXG4gICAgXHRcdDxzcGFuPlxuXHQgICAgXHRcdCR7dmFsdWV9XG5cblx0ICAgIFx0XHQ8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjhcIiBoZWlnaHQ9XCI4XCIgdmlld0JveD1cIjAgMCA4IDhcIiBmaWxsPVwibm9uZVwiPlxuXHRcdFx0XHQ8cGF0aCBkPVwiTTAuMjE5NzU0IDAuMjIwMTIxQzAuMjg5MzE5IDAuMTUwNDU3IDAuMzcxOTM2IDAuMDk1MTkwMiAwLjQ2Mjg3OCAwLjA1NzQ4MjdDMC41NTM4MjEgMC4wMTk3NzUyIDAuNjUxMzA1IDAuMDAwMzY2MjExIDAuNzQ5NzU0IDAuMDAwMzY2MjExQzAuODQ4MjA0IDAuMDAwMzY2MjExIDAuOTQ1Njg4IDAuMDE5Nzc1MiAxLjAzNjYzIDAuMDU3NDgyN0MxLjEyNzU3IDAuMDk1MTkwMiAxLjIxMDE5IDAuMTUwNDU3IDEuMjc5NzUgMC4yMjAxMjFMMy45OTk3NSAyLjkzOTEyTDYuNzE5NzUgMC4yMjAxMjFDNi43ODkzNiAwLjE1MDUyIDYuODcxOTggMC4wOTUzMDk4IDYuOTYyOTIgMC4wNTc2NDIyQzcuMDUzODYgMC4wMTk5NzQ2IDcuMTUxMzIgMC4wMDA1ODc0NjUgNy4yNDk3NSAwLjAwMDU4NzQ2M0M3LjM0ODE4IDAuMDAwNTg3NDYxIDcuNDQ1NjUgMC4wMTk5NzQ3IDcuNTM2NTkgMC4wNTc2NDIyQzcuNjI3NTMgMC4wOTUzMDk4IDcuNzEwMTUgMC4xNTA1MiA3Ljc3OTc1IDAuMjIwMTIxQzcuODQ5MzUgMC4yODk3MjEgNy45MDQ1NiAwLjM3MjM0OSA3Ljk0MjIzIDAuNDYzMjg3QzcuOTc5OSAwLjU1NDIyNCA3Ljk5OTI5IDAuNjUxNjkxIDcuOTk5MjkgMC43NTAxMjFDNy45OTkyOSAwLjg0ODU1MSA3Ljk3OTkgMC45NDYwMTcgNy45NDIyMyAxLjAzNjk1QzcuOTA0NTYgMS4xMjc4OSA3Ljg0OTM1IDEuMjEwNTIgNy43Nzk3NSAxLjI4MDEyTDUuMDYwNzUgNC4wMDAxMkw3Ljc3OTc1IDYuNzIwMTJDNy45MjAzMiA2Ljg2MDY5IDcuOTk5MjkgNy4wNTEzMyA3Ljk5OTI5IDcuMjUwMTJDNy45OTkyOSA3LjQ0ODkxIDcuOTIwMzIgNy42Mzk1NiA3Ljc3OTc1IDcuNzgwMTJDNy42MzkxOSA3LjkyMDY5IDcuNDQ4NTQgNy45OTk2NSA3LjI0OTc1IDcuOTk5NjVDNy4wNTA5NyA3Ljk5OTY1IDYuODYwMzIgNy45MjA2OSA2LjcxOTc1IDcuNzgwMTJMMy45OTk3NSA1LjA2MTEyTDEuMjc5NzUgNy43ODAxMkMxLjEzOTE5IDcuOTIwNjkgMC45NDg1NDMgNy45OTk2NSAwLjc0OTc1NCA3Ljk5OTY1QzAuNTUwOTY2IDcuOTk5NjUgMC4zNjAzMTkgNy45MjA2OSAwLjIxOTc1NCA3Ljc4MDEyQzAuMDc5MTg5NyA3LjYzOTU2IDAuMDAwMjIxMjUyIDcuNDQ4OTEgMC4wMDAyMjEyNTIgNy4yNTAxMkMwLjAwMDIyMTI1MiA3LjA1MTMzIDAuMDc5MTg5NyA2Ljg2MDY5IDAuMjE5NzU0IDYuNzIwMTJMMi45Mzg3NSA0LjAwMDEyTDAuMjE5NzU0IDEuMjgwMTJDMC4xNTAwOSAxLjIxMDU2IDAuMDk0ODI0IDEuMTI3OTQgMC4wNTcxMTY1IDEuMDM3QzAuMDE5NDA5IDAuOTQ2MDU0IDAgMC44NDg1NyAwIDAuNzUwMTIxQzAgMC42NTE2NzEgMC4wMTk0MDkgMC41NTQxODcgMC4wNTcxMTY1IDAuNDYzMjQ0QzAuMDk0ODI0IDAuMzcyMzAyIDAuMTUwMDkgMC4yODk2ODYgMC4yMTk3NTQgMC4yMjAxMjFaXCIgZmlsbD1cIiMyRDM3NDhcIi8+XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0PC9zcGFuPlxuICAgIFx0YDtcbiAgICB9O1xuXG4gICAgeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uID0ge307XG4gICAgXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ubmV4dF90ZXh0ID0gYD5gO1xuXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ucHJldl90ZXh0ID0gYDxgO1xuXG4iLCJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG5cdGxldCBlbGVfcXVpY2tfc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC1xdWljay1zZWFyY2gtZm9ybScpO1xuXG5cdGlmIChlbGVfcXVpY2tfc2VhcmNoKSB7XG5cdFx0Ly8gRmlsbCBvcHRpb25zXG5cdCAgICBsZXQgRmlsbE9wdGlvbnM9W107XG5cdCAgICBsZXQgc2VsZWN0b3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXNwLXF1aWNrLXNlYXJjaC1mb3JtIHNlbGVjdFtkYXRhLWZpbGwtb3B0aW9uc11cIik7XG5cblx0ICAgIHNlbGVjdG9yRWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcblx0ICAgIH0pO1xuXHQgICAgXG5cdCAgICB5c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2Ryb3Bkb3duLW9wdGlvbnMnLCB7bGFiZWxzOiBGaWxsT3B0aW9uc30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblx0ICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG5cdCAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXNwLXF1aWNrLXNlYXJjaC1mb3JtIHNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXHQgICAgICAgICAgICBsZXQgbmFtZSA9IFNlbGVjdG9yRWxlWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG5cdCAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblx0ICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgICAgICAgICAgXHRsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuXHQgICAgICAgICAgICAgICAgXHRcdGlmICh0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbi50ZXh0ID0gYi50O1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiLnY7XG5cdCAgICAgICAgICAgICAgICBcdFx0fVxuXHQgICAgICAgICAgICAgICAgXHRcdGVsc2Uge1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cdCAgICAgICAgICAgICAgICBcdFx0fVxuXG5cblx0ICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG5cdCAgICAgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG5cdCAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG5cdCAgICAgICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuXHQgICAgICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHlzcF95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cblx0ICAgICAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG5cdCAgICAgICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG5cdCAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG5cdCAgICAgICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzLmpvaW4oJyAnKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIGlmIChVcmxWYWwgIT0gJycgJiYgVXJsVmFsICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFVybFZhbCk7XG5cblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVXJsVmFsID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgVXJsVmFsID0gVXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXG5cblx0ICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuXHQgICAgICAgICAgICBjb25zb2xlLmxvZyggcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdKTtcblxuXHQgICAgICAgICAgICBpZiAoaGFzUHJldHR5ICE9ICcnICYmIGhhc1ByZXR0eSAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHk7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdH1cbn0pOyIsImZ1bmN0aW9uIHlzcF9tYWtlU2VhcmNoVGFncyggZGF0YSApIHtcblxuXHRsZXQgdGFnc0VsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3Atc2VhcmNoLXRhZ3MnKTtcbiAgICAgICAgXG4gICAgaWYgKHRhZ3NFbGUpIHtcbiAgICAgICAgdGFnc0VsZS5mb3JFYWNoKGZ1bmN0aW9uKHRlKSB7XG4gICAgICAgICAgICB0ZS5pbm5lckhUTUw9XCJcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgeXNwX3RhZ3Nfbm90X3ByaW50ID0gWydwYWdlX2luZGV4JywgJyddO1xuXG4gICAgICAgIGZvciAobGV0IHBhcmFtS2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbD0nJztcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj0nKyBwYXJhbUtleSArJ10nKSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGFiZWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPScrIHBhcmFtS2V5ICsnXScpLmlubmVyVGV4dDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltuYW1lPScrIHBhcmFtS2V5ICsnXScpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5oYXNBdHRyaWJ1dGUoJ2xhYmVsJykpIHtcblxuICAgICAgICAgICAgICAgIGxhYmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5nZXRBdHRyaWJ1dGUoJ2xhYmVsJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0YWdzRWxlLmZvckVhY2goZnVuY3Rpb24odGUpIHtcblxuICAgICAgICAgICAgICAgIGlmICh5c3BfdGFnc19ub3RfcHJpbnQuaW5kZXhPZiggcGFyYW1LZXkgKSA9PSAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lPScrIHBhcmFtS2V5ICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFnRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWdWYWwgPSBkYXRhW3BhcmFtS2V5XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dC50YWdOYW1lID09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9IGVsZUlucHV0Lm9wdGlvbnNbIGVsZUlucHV0LnNlbGVjdGVkSW5kZXggXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdwcmljZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9ICckJyt0YWdWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdsZW5ndGgnKSAmJiBwYXJhbUtleSAhPSAnbGVuZ3RodW5pdCcpICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZVVuaXQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBbbmFtZT1sZW5ndGh1bml0XTpjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBlbGVVbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlVW5pdCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIFtuYW1lPWxlbmd0aHVuaXRdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsID0gdGFnVmFsICsnICc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZVVuaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCArPSBlbGVVbml0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmNsYXNzTmFtZSA9ICdidG4gYnRuLXByaW1hcnkgYnRuLXNtIHlzcC10YWcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBsYWJlbCAhPSBudWxsICYmIGxhYmVsICE9ICdudWxsJyAmJiBsYWJlbCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcobGFiZWwsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcoJycsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLnNldEF0dHJpYnV0ZSgna2V5JywgcGFyYW1LZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlLmFwcGVuZENoaWxkKCBuZXdUYWdFbGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygoJy55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3Bhbi55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykuZm9yRWFjaChmdW5jdGlvbih5c3BUYWdFbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5c3BUYWdFbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgna2V5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dEVsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIHNlbGVjdFtuYW1lPScrIGtleSArJ10sIC55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT0nKyBrZXkgKyddJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0RWxlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGVsZUkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVsZUkudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoZWxlSS50eXBlID09ICdjaGVja2JveCcgfHwgZWxlSS50eXBlID09ICdyYWRpbycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZUkuY2hlY2tlZD1mYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlSS52YWx1ZT0nJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZXNbMF0uZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZnVuY3Rpb24geXNwX21hcmtMb3ZlZFZlc3NlbCggZWxlX2NhcmQgKSB7XG5cbiAgICBqUXVlcnkoJy5sb3ZlJywgZWxlX2NhcmQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2xvdmVkJyk7XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBqUXVlcnkodGhpcykuZGF0YSgneWFjaHQtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2xvdmVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5c3BfcmVtb3ZlTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB5c3BfZ2V0X2Zvcm1fZGF0YShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcy55c195YWNodHNfbG92ZWQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlbGVfY2FyZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgIT0gXCJcIikge1xuXG4gICAgICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCd5YWNodC1pZCcpO1xuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApICE9IC0xKSB7XG5cbiAgICAgICAgICAgIGVsZV9jYXJkLmFkZENsYXNzKCdsb3ZlZCcpO1xuXG4gICAgICAgICAgICBqUXVlcnkoJy5sb3ZlJywgZWxlX2NhcmQpLmFkZENsYXNzKCdsb3ZlZCcpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHlzcF9hZGRMb3ZlZFZlc3NlbCggeWFjaHRJZCApIHtcblxuICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgIGlmIChsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApID09IC0xKSB7XG5cbiAgICAgICAgbG92ZWRWZXNzZWxzLnB1c2goeWFjaHRJZCk7XG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGFscmVhZHkgYWRkZWRcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhsb3ZlZFZlc3NlbHMgKTtcbiAgICBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInlzcF9sb3ZlZF92ZXNzZWxzXCIsIEpTT04uc3RyaW5naWZ5KGxvdmVkVmVzc2VscykpO1xuXG59IFxuXG5mdW5jdGlvbiB5c3BfcmVtb3ZlTG92ZWRWZXNzZWwoIHlhY2h0SWQgKSB7XG5cbiAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICBsZXQgaW5kZXhlZCA9IGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICk7XG5cbiAgICBjb25zb2xlLmxvZyhpbmRleGVkKTtcblxuICAgIGlmIChpbmRleGVkICE9IC0xKSB7XG5cbiAgICAgICAgZGVsZXRlIGxvdmVkVmVzc2Vsc1tpbmRleGVkXTsgICAgICAgIFxuICAgICAgICBsb3ZlZFZlc3NlbHMuc3BsaWNlKGluZGV4ZWQsIDEpO1xuXG5cblxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gYWxyZWFkeSBhZGRlZFxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGxvdmVkVmVzc2VscyApO1xuICAgIFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwieXNwX2xvdmVkX3Zlc3NlbHNcIiwgSlNPTi5zdHJpbmdpZnkobG92ZWRWZXNzZWxzKSk7XG5cbn0iLCJ2YXIgWVNQX1Zlc3NlbENvbXBhcmVMaXN0PVtdO1xuXG5cbmZ1bmN0aW9uIHlzcF9yZXN0b3JlQ29tcGFyZXMoKSB7XG4gICAgbGV0IFVSTFJFRj1uZXcgVVJMKGxvY2F0aW9uLmhyZWYpOyAvLyBtYXliZSBmb3IgYSByZS1kb1xuICAgIGxldCBjb21wYXJlX3Bvc3RfaWRzID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoICdyZXN0b3JlX3RvX2NvbXBhcmUnICk7IFxuXG4gICAgY29uc29sZS5sb2codHlwZW9mIGNvbXBhcmVfcG9zdF9pZHMpO1xuICAgIGNvbnNvbGUubG9nKGNvbXBhcmVfcG9zdF9pZHMpO1xuXG4gICAgaWYgKHR5cGVvZiBjb21wYXJlX3Bvc3RfaWRzID09ICdzdHJpbmcnKSB7XG4gICAgICAgIFlTUF9WZXNzZWxDb21wYXJlTGlzdCA9IGNvbXBhcmVfcG9zdF9pZHMuc3BsaXQoJywnKTtcbiAgICBcblxuICAgICAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG4gICAgfVxuXG5cblxufVxuXG5cbmZ1bmN0aW9uIHlzcF9tYWtlQ29tcGFyZVZlc3NlbChlbGVfY2FyZCkge1xuXHQgXG5cdCBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xuXHQgXHRjb25zb2xlLmxvZygnaG93ZHknKTtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgICAgIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3Bvc3QtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2FybWVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgncG9zdC1pZCcpO1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkICkgIT0gLTEgIHx8IFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkLnRvU3RyaW5nKCkgKSAhPSAtMSApIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8gd29ybGQgcmVzdG9yZWQnKTtcblxuICAgICAgICBlbGVfY2FyZC5hZGRDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5hZGRDbGFzcygnYXJtZWQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24geXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCkge1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkICkgPT0gLTEpIHtcblxuICAgIFx0WVNQX1Zlc3NlbENvbXBhcmVMaXN0LnB1c2goeWFjaHRJZCk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG59XG4gICAgXG5mdW5jdGlvbiB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKSB7XG5cdGxldCBpbmRleGVkID0gWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQgKVxuXG5cdGlmICggaW5kZXhlZCAhPSAtMSkge1xuXG4gICAgXHRkZWxldGUgWVNQX1Zlc3NlbENvbXBhcmVMaXN0W2luZGV4ZWRdOyAgICAgICAgXG4gICAgICAgIFlTUF9WZXNzZWxDb21wYXJlTGlzdC5zcGxpY2UoaW5kZXhlZCwgMSk7XG4gIFx0XHRcbiAgICAgICAgXG4gICAgfVxuXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuXG5mdW5jdGlvbiB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCkge1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGggPj0gMikge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKS5ocmVmPXlzcF95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wieXNwL2NvbXBhcmUvP3Bvc3RJRD1cIitZU1BfVmVzc2VsQ29tcGFyZUxpc3Quam9pbignLCcpO1xuICAgIFx0ICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykuaW5uZXJIVE1MPWA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInlzcC1nZW5lcmFsLWJ1dHRvblwiPkNvbXBhcmUgKCAke1lTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGh9ICk8L2J1dHRvbj5gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0X21vYmlsZScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dF9tb2JpbGUnKS5ocmVmPXlzcF95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wieXNwL2NvbXBhcmUvP3Bvc3RJRD1cIitZU1BfVmVzc2VsQ29tcGFyZUxpc3Quam9pbignLCcpO1xuICAgIFx0ICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0X21vYmlsZScpLmlubmVySFRNTD1gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ5c3AtZ2VuZXJhbC1idXR0b25cIj5Db21wYXJlICggJHtZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RofSApPC9idXR0b24+YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICdwb3N0X19pbic6IFlTUF9WZXNzZWxDb21wYXJlTGlzdCxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4geXNwX2FwaS5jYWxsX2FwaShcIlBPU1RcIiwgXCJ5YWNodHNcIiwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgIGRhdGFfcmVzdWx0LnJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQuY29tcGFyZV9wcmV2aWV3KGl0ZW0sIHBhcmFtcykgKTtcblxuICAgICAgICAgICAgICAgIGxldCBlbGVfcHJldmlldyA9IGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzICpbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5yZW1vdmUtZnJvbS1jb21wYXJlJywgZWxlX3ByZXZpZXcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJ2RpdltkYXRhLXBvc3QtaWQ9JysgaXRlbS5fcG9zdElEICsnXSAuY29tcGFyZV90b2dnbGUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnJlbW92ZUNsYXNzKCdhcm1lZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KGl0ZW0uX3Bvc3RJRCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcblxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MnKS5odG1sKCc8c3BhbiBzdHlsZT1cImNvbG9yOiAjZmZmO1wiPlBpY2sgdHdvIHRvIGNvbXBhcmUuPC9zcGFuPicpO1xuICAgICAgICBqUXVlcnkoJyN5c3BfY29tcGFyZV9saW5rb3V0JykuaHRtbCgnJyk7XG4gICAgICAgIGpRdWVyeSgnI3lzcF9jb21wYXJlX2xpbmtvdXRfbW9iaWxlJykuaHRtbCgnJyk7XG4gICAgfVxuXG5cbiAgICBcblxuXG5cbn1cbiIsImNvbnN0IHlzcEJlZm9yZVlhY2h0U2VhcmNoID0gbmV3IEV2ZW50KFwieXNwLWJlZm9yZS1zdWJtaXR0aW5nLXlhY2h0LXNlYXJjaFwiKTtcbmNvbnN0IHlzcEFmdGVyWWFjaHRTZWFyY2ggPSBuZXcgRXZlbnQoXCJ5c3AtYWZ0ZXItc3VibWl0dGluZy15YWNodC1zZWFyY2hcIik7XG5jb25zdCB5c3BBZnRlclJlbmRlcmluZ1lhY2h0ID0gbmV3IEV2ZW50KFwieXNwLWFmdGVyLXJlbmRlcmluZy15YWNodC1zZWFyY2hcIik7XG5cbmZ1bmN0aW9uIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlcihkYXRhKSB7XG5cbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmh0bWwoJycpO1xuICAgIGpRdWVyeSgnI3lzcC15YWNodC1yZXN1bHRzLXBhZ2luYXRpb24nKS5odG1sKCcnKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AteWFjaHQtcmVzdWx0cy1zZWN0aW9uJykuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGVkJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC15YWNodC1yZXN1bHRzLXNlY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG5cbiAgICB5c3Bfc2V0X2Zvcm1fdG9fZGF0YSggZGF0YSApO1xuXG4gICAgeXNwX21ha2VTZWFyY2hUYWdzKCBkYXRhICk7XG5cbiAgICAvLyBHRVQgQU5EIFdSSVRFXG4gICAgcmV0dXJuIHlzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIGRhdGEpLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXlhY2h0LXJlc3VsdHMtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC15YWNodC1yZXN1bHRzLXNlY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcblxuICAgICAgICBkb2N1bWVudC50aXRsZSA9IGRhdGFfcmVzdWx0LlNFTy50aXRsZTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLXNlYXJjaC1oZWFkaW5nJykudGV4dChkYXRhX3Jlc3VsdC5TRU8uaGVhZGluZyk7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1zZWFyY2gtcGFyYWdyYXBoJykudGV4dChkYXRhX3Jlc3VsdC5TRU8ucCk7XG5cbiAgICAgICAgalF1ZXJ5KCcjeXNwLXRvdGFsLXlhY2h0LXJlc3VsdHMnKS50ZXh0KG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tSU4nLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMyB9KS5mb3JtYXQoZGF0YV9yZXN1bHQudG90YWwpKTtcblxuICAgICAgICBsZXQgY3VycmVudFVSTD1udWxsO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5kb250X3B1c2ggPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVUkw9eXNwX3B1c2hfaGlzdG9yeSggZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFVSTCA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChkYXRhX3Jlc3VsdC50b3RhbCA+IDApIHtcblxuICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykucmVtb3ZlQ2xhc3MoWyd2aWV3LWdyaWQnLCAndmlldy1saXN0J10pO1xuXG4gICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnZpZXcgIT0gJ3VuZGVmaW5lZCcgJiYgZGF0YS52aWV3LnRvTG93ZXJDYXNlKCkgPT0gJ2xpc3QnKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYWRkQ2xhc3MoJ3ZpZXctbGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYWRkQ2xhc3MoJ3ZpZXctZ3JpZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS52aWV3ICE9ICd1bmRlZmluZWQnICYmIGRhdGEudmlldy50b0xvd2VyQ2FzZSgpID09ICdsaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMnKS5hZGRDbGFzcygndmlldy1saXN0JykucmVtb3ZlQ2xhc3MoJ3ZpZXctZ3JpZCcpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYWRkQ2xhc3MoJ3ZpZXctZ3JpZCcpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBlbGVfY2FyZCA9IGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcblxuICAgICAgICAgICAgICAgIGpRdWVyeSgnW2RhdGEtbW9kYWw9I3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxdJywgZWxlX2NhcmQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgQm9hdE5hbWUgPSBpdGVtLk1vZGVsWWVhciArICcgJyArIGl0ZW0uTWFrZVN0cmluZyArICcgJyArIGl0ZW0uQm9hdE5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXlhY2h0LXJlc3VsdHMtbGVhZC1tb2RhbCAuYm9hdG5hbWUnKS5odG1sKEJvYXROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXlhY2h0LXJlc3VsdHMtbGVhZC1tb2RhbCBpbnB1dFtuYW1lPVdoaWNoQm9hdF0nKS52YWwoQm9hdE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsIGlucHV0W25hbWU9V2hpY2hCb2F0SURdJykudmFsKGl0ZW0uX3Bvc3RJRCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFfbW9kYWwgPSBqUXVlcnkodGhpcykuZGF0YSgnbW9kYWwnKTtcblxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoIGRhdGFfbW9kYWwgKS55c3BfbW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VUZXh0OiAnWCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbENsYXNzOiAneXNwLW1vZGFsLW9wZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGFzczogJ3lzcC1tb2RlbC1jbG9zZSdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB5c3BfbWFya0xvdmVkVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgXG4gICAgICAgICAgICAgICAgeXNwX21ha2VDb21wYXJlVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXlhY2h0LXJlc3VsdHMtcGFnaW5hdGlvbicpLnBhZ2luYXRpb24oe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBkYXRhX3Jlc3VsdC50b3RhbCxcbiAgICAgICAgICAgICAgICBpdGVtc09uUGFnZTogMTIsXG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IGRhdGEucGFnZV9pbmRleCxcbiAgICAgICAgICAgICAgICBwcmV2VGV4dDogeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLnByZXZfdGV4dCxcbiAgICAgICAgICAgICAgICBuZXh0VGV4dDogeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLm5leHRfdGV4dCxcbiAgICAgICAgICAgICAgICBlZGdlczogNCxcbiAgICAgICAgICAgICAgICBkaXNwbGF5ZWRQYWdlczogNCxcbiAgICAgICAgICAgICAgICBocmVmVGV4dFByZWZpeDogY3VycmVudFVSTC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJwYWdlX2luZGV4LShcXFxcZCopKC8pXCIsIFwiZ1wiKSwgXCJcIikrJ3BhZ2VfaW5kZXgtJyxcbiAgICAgICAgICAgICAgICBocmVmVGV4dFN1ZmZpeDogJy8nLFxuICAgICAgICAgICAgICAgIG9uUGFnZUNsaWNrOiBmdW5jdGlvbihwYWdlTnVtYmVyLCBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPXBhZ2VOdW1iZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1EYXRhT2JqZWN0ID0geXNwX2dldF9mb3JtX2RhdGEoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlcihmb3JtRGF0YU9iamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYXBwZW5kKHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgalF1ZXJ5KFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogKGpRdWVyeShcIi5zY3JvbGwtdG8taGVyZS1vbi15YWNodC1zZWFyY2hcIikub2Zmc2V0KCkudG9wKVxuICAgICAgICB9LCAyNTApO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm06bm90KCN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtKScpLmRpc3BhdGNoRXZlbnQoeXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGFfcmVzdWx0O1xuXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG5cbiAgICB9KTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBGaWxsIExpc3QgT3B0aW9uc1xuICAgIGxldCBGaWxsTGlzdHM9W107XG4gICAgbGV0IGxpc3RFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkYXRhbGlzdFtkYXRhLWZpbGwtbGlzdF1cIik7XG4gICAgbGV0IGxpc3ROZWVkZWRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtsaXN0XVwiKTtcblxuICAgIGxpc3RFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgRmlsbExpc3RzLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLWxpc3QnKSk7XG4gICAgfSk7XG5cbiAgICBsaXN0TmVlZGVkRWxlbWVudHMuZm9yRWFjaCgoaW5wdXRfZWxlKSA9PiB7XG5cbiAgICAgICAgaW5wdXRfZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgbGV0IGxpc3RfaWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdsaXN0Jyk7XG5cbiAgICAgICAgICAgIGxldCBlbGVfbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkYXRhbGlzdCNcIitsaXN0X2lkKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPD0gMykge1xuXG4gICAgICAgICAgICAgICAgeXNwX2FwaS5jYWxsX2FwaShcbiAgICAgICAgICAgICAgICAgICAgJ1BPU1QnLCBcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3Qtb3B0aW9ucy13aXRoLXZhbHVlJywgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsczogWyBlbGVfbGlzdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykgXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pO1xuXG4gICAgfSlcbiAgICBcbi8qICAgIHlzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnbGlzdC1vcHRpb25zJywge2xhYmVsczogRmlsbExpc3RzfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5hcHBlbmQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4qL1xuICAgIGxldCB5YWNodFNlYXJjaEFuZFJlc3VsdHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC15YWNodC1zZWFyY2gtZm9ybScpO1xuXG4gICAgaWYgKHlhY2h0U2VhcmNoQW5kUmVzdWx0cykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1tb2JpbGUtc2VhcmNoJykuZm9yRWFjaCgob21zZSkgPT4ge1xuICAgICAgICAgICAgb21zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zdXBlci1tb2JpbGUtc2VhcmNoJykuc3R5bGUuZGlzcGxheT0nbm9uZSc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0ndW5zZXQnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEJlZm9yZVlhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB5c3BfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG5cbiAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciggcGFyYW1zICkudGhlbihmdW5jdGlvbihhcGlfZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZGlzcGF0Y2hFdmVudCh5c3BBZnRlcllhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7IFxuXG4gICAgICAgIHlhY2h0U2VhcmNoQW5kUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dC5zdWJtaXQtb24tY2hhbmdlJykuZm9yRWFjaCgoZWxlSW5wdXQpID0+IHtcbiAgICAgICAgICAgIGVsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1yZXNldF0nKS5mb3JFYWNoKChlbGVSZXNldCkgPT4ge1xuICAgICAgICAgICAgZWxlUmVzZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ5c19jb21wYW55X29ubHlcIl0nKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInlzX2NvbXBhbnlfb25seVwiXScpLmZvckVhY2goZnVuY3Rpb24oZWxlQ2hlY2spIHtcbiAgICAgICAgICAgICAgICBlbGVDaGVjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9dmlld11bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dLCBzZWxlY3RbbmFtZT12aWV3XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0sICBzZWxlY3RbbmFtZT1zb3J0YnldW2Zvcm09eXNwLXlhY2h0LXNlYXJjaC1mb3JtXScpLmZvckVhY2goKGVsZVZpZXdPcHRpb24pID0+IHtcbiAgICAgICAgICAgIGVsZVZpZXdPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waWNrLWFsbCcpLmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XG4gICAgICAgICAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRfbmFtZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cIicrIGlucHV0X25hbWUgKydcIl0nKS5mb3JFYWNoKChlbGVJbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVJbnB1dC5jaGVja2VkPWZhbHNlO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQUkVUVFkgVVJMXG4gICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHlzcF95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cbiAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG4gICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG4gICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgIG9ubHlfdmFscz1vbmx5X3ZhbHMuam9pbignICcpLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHNfYXJyYXk9KG9ubHlfdmFscy5zcGxpdCgnKycpKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25seV92YWxzX2FycmF5WzFdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ubHlfdmFscyA9IG9ubHlfdmFsc19hcnJheS5tYXAoKG92KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3YuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cob25seV92YWxzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHByZXR0eV91cmxfcGF0aF9wYXJhbXMpO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgRmllbGRzXG5cbiAgICAgICAgbGV0IFVSTFJFRj1uZXcgVVJMKGxvY2F0aW9uLmhyZWYpOyAvLyBtYXliZSBmb3IgYSByZS1kb1xuXG4gICAgICAgIGxldCBmb3JtSW5wdXRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLXlhY2h0LXNlYXJjaC1mb3JtXCJdLCAjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtXCJdJyk7XG5cbiAgICAgICAgZm9ybUlucHV0cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IGVsZTtcblxuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbGUuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgIGxldCB1cmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuICAgICAgICAgICAgICAgIC8vIHVybFZhbCA9IDtcbiAgIFxuXG4gICAgICAgICAgICBsZXQgaGFzUHJldHR5ID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdO1xuXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFzUHJldHR5ICE9ICdudWxsJyAmJiB0eXBlb2YgaGFzUHJldHR5ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoYXNQcmV0dHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgICAgICAgICBoYXNQcmV0dHkuZm9yRWFjaCgoaFApID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaFAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhhc1ByZXR0eSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGhhc1ByZXR0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1cmxWYWwgIT0gJycgJiYgdXJsVmFsICE9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdXJsVmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybFZhbCA9IHVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gdXJsVmFsICkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB1cmxWYWw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgQ29tcGFyZVxuICAgICAgICAgeXNwX3Jlc3RvcmVDb21wYXJlcygpO1xuXG4gICAgICAgIC8vIEZpbGwgb3B0aW9uc1xuICAgICAgICBsZXQgRmlsbE9wdGlvbnM9W107XG4gICAgICAgIGxldCBzZWxlY3RvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9uc11cIik7XG5cbiAgICAgICAgc2VsZWN0b3JFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIEZpbGxPcHRpb25zLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLW9wdGlvbnMnKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coU2VsZWN0b3JFbGUpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBTZWxlY3RvckVsZVswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBiID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiLnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYi52O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hZGQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgVVJMUkVGID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgICAgICBsZXQgVXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcblxuICAgICAgICAgICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgICAgICAgICAgICAgIHN0cnBhdGhzPXN0cnBhdGhzLnJlcGxhY2UoeXNwX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3BhZ2VfaWQsICcnKTtcblxuICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG4gICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFscz1waGFzZV9wYXRoLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscy5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0uZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChVcmxWYWwgIT0gJycgJiYgVXJsVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhVcmxWYWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVXJsVmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVcmxWYWwgPSBVcmxWYWwuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IFVybFZhbDsgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWwudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgaGFzUHJldHR5ID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdO1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyggcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdKTtcblxuICAgICAgICAgICAgICAgIGlmIChoYXNQcmV0dHkgIT0gJycgJiYgaGFzUHJldHR5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHk7IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUmVuZGVyIFlhY2h0cyBGb3IgUGFnZSBMb2FkXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0geXNwX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuXG4gICAgICAgICAgICAvLyBMaWtlZCAvIExvdmVkIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMueXNfeWFjaHRzX2xvdmVkICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG92ZWRfeWFjaHRzID0gSlNPTi5wYXJzZSggbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgKTtcblxuICAgICAgICAgICAgICAgIGlmIChsb3ZlZF95YWNodHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMueXNfb25seV90aGVzZSA9IGxvdmVkX3lhY2h0cy5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy55c19vbmx5X3RoZXNlPVwiMCwwLDBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTsgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBtb2JpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgICAgICBpZiAobW9iaWxlRm9ybSkge1xuICAgICAgICAgICAgbW9iaWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdub25lJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSd1bnNldCc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0geXNwX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpOyAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTtcblxuICAgICAgICAgICAgfSk7IFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICB9XG5cbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgTGVhZEZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC1sZWFkLWZvcm0tdjInKTtcblxuICAgIExlYWRGb3Jtcy5mb3JFYWNoKChmRWxlKSA9PiB7XG4gICAgICAgIGZFbGUuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBsZXQgZm9ybURhdGEgPSB5c3BfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHlzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsICdsZWFkLXYyJywgZm9ybURhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignLnN1Y2Nlc3MtbWVzc2FnZScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLWFmdGVyLXN1Ym1pdCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbn0pO1xuIl19
