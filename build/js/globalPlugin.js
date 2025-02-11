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
    if (vessel.BoatLocation.BoatCityName != '') {
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
    if (vessel.BoatLocation.BoatCityName != '') {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwid2hhdGV2ZXIuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwiZmlsbC1maWVsZHMuanMiLCJ5YWNodFNlYXJjaFRhZ3MuanMiLCJ5YWNodFNlYXJjaExvdmVkLmpzIiwieWFjaHRTZWFyY2hDb21wYXJlLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwibW9kYWxzIiwiZ2V0Q3VycmVudCIsInNlbGVjdEN1cnJlbnQiLCJzZWxlY3RlZCIsIiRibG9ja2VyIiwidG9nZ2xlQ2xhc3MiLCJ5c3BfbW9kYWwiLCJlbCIsInJlbW92ZSIsInRhcmdldCIsIiRib2R5IiwiZGVmYXVsdHMiLCJkb0ZhZGUiLCJpc05hTiIsImZhZGVEdXJhdGlvbiIsImNsb3NlRXhpc3RpbmciLCJpc0FjdGl2ZSIsImNsb3NlIiwicHVzaCIsImlzIiwiYW5jaG9yIiwidGVzdCIsIiRlbG0iLCJvcGVuIiwibW9kYWwiLCJlbG0iLCJzaG93U3Bpbm5lciIsInRyaWdnZXIiLCJBSkFYX1NFTkQiLCJnZXQiLCJkb25lIiwiQUpBWF9TVUNDRVNTIiwiY3VycmVudCIsIm9uIiwiQ0xPU0UiLCJoaWRlU3Bpbm5lciIsIkFKQVhfQ09NUExFVEUiLCJmYWlsIiwiQUpBWF9GQUlMIiwicG9wIiwiY29uc3RydWN0b3IiLCJtIiwiYmxvY2siLCJibHVyIiwic2V0VGltZW91dCIsInNob3ciLCJmYWRlRGVsYXkiLCJvZmYiLCJlc2NhcGVDbG9zZSIsImNsaWNrQ2xvc2UiLCJlIiwidW5ibG9jayIsImhpZGUiLCJCRUZPUkVfQkxPQ0siLCJfY3R4IiwiY3NzIiwiYmxvY2tlckNsYXNzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJCTE9DSyIsIm5vdyIsImZhZGVPdXQiLCJjaGlsZHJlbiIsIkJFRk9SRV9PUEVOIiwic2hvd0Nsb3NlIiwiY2xvc2VCdXR0b24iLCJjbG9zZUNsYXNzIiwiY2xvc2VUZXh0IiwibW9kYWxDbGFzcyIsImRpc3BsYXkiLCJPUEVOIiwiQkVGT1JFX0NMT1NFIiwiX3RoaXMiLCJBRlRFUl9DTE9TRSIsInNwaW5uZXIiLCJzcGlubmVySHRtbCIsIiRhbmNob3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImRhdGFfbW9kYWwiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIlN0cmluZyIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm1hcCIsInMiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJlbnVtZXJhYmxlIiwieXNwX2dldF9mb3JtX2RhdGEiLCJmb3JtX2VsZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJmZCIsImZyb21FbnRyaWVzIiwiZW50cmllcyIsIl9pIiwiX09iamVjdCRlbnRyaWVzIiwiX09iamVjdCRlbnRyaWVzJF9pIiwiX3NsaWNlZFRvQXJyYXkiLCJmSW5kZXgiLCJmaWVsZCIsIlZhbEFycmF5IiwiZ2V0QWxsIiwieXNwX3NldF9mb3JtX3RvX2RhdGEiLCJpbnB1dERhdGEiLCJmb3JtQSIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JtQiIsInJlc2V0IiwiZm9ybUlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlIiwiaW5wdXQiLCJuYW1lIiwiZ2V0QXR0cmlidXRlIiwiaGFzUHJldHR5IiwiaXNBcnJheSIsImhQIiwidHlwZSIsImNoZWNrZWQiLCJ5c3BfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJ0b1N0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJ5c3BfeWFjaHRfc3luYyIsInlhY2h0X3NlYXJjaF91cmwiLCJ5c3BfYXBpIiwiY2FsbF9hcGkiLCJwYXRoIiwicGFzc2luZ19kYXRhIiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlRGF0YSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIl9xdWVzdGlvbk1hcmsiLCJ3cF9yZXN0X3VybCIsInNlbmQiLCJzZXRSZXF1ZXN0SGVhZGVyIiwic3RyaW5naWZ5IiwieXNwX3RlbXBsYXRlcyIsInlhY2h0IiwiZ3JpZCIsInZlc3NlbCIsInBhcmFtcyIsIm1ldGVycyIsIk5vbWluYWxMZW5ndGgiLCJwcmljZSIsImV1cm9wZV9vcHRpb25fcGlja2VkIiwidG9GaXhlZCIsIllTUF9FdXJvVmFsIiwiY29uY2F0IiwiSW50bCIsIk51bWJlckZvcm1hdCIsIm1pbmltdW1GcmFjdGlvbkRpZ2l0cyIsImZvcm1hdCIsImN1cnJlbmN5IiwiWVNQX1VTRFZhbCIsInZlc3NlbExvY2F0aW9uIiwidmVzc2VsS2V5d29yZExvY2F0aW9uTGluayIsIkJvYXRMb2NhdGlvbiIsIkJvYXRDb3VudHJ5SUQiLCJCb2F0Q2l0eU5hbWUiLCJyZXBsYWNlIiwiQm9hdFN0YXRlQ29kZSIsIl9wb3N0SUQiLCJEb2N1bWVudElEIiwiX2xpbmsiLCJJbWFnZXMiLCJVcmkiLCJhc3NldHNfdXJsIiwiTW9kZWxZZWFyIiwiTWFrZVN0cmluZyIsIk1vZGVsIiwiQm9hdE5hbWUiLCJsaXN0IiwiUHJpY2UiLCJldXJvX2NfYyIsIkNvbXBhbnlOYW1lIiwiY29tcGFueV9uYW1lIiwiY29tcGFueV9sb2dvIiwiY29tcGFyZV9wcmV2aWV3Iiwibm9SZXN1bHRzIiwieWFjaHRfdGFnIiwibGFiZWwiLCJuZXh0X3RleHQiLCJwcmV2X3RleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZWxlX3F1aWNrX3NlYXJjaCIsIkZpbGxPcHRpb25zIiwic2VsZWN0b3JFbGVtZW50cyIsImxhYmVscyIsInRoZW4iLCJyT3B0aW9ucyIsIl9sb29wIiwiU2VsZWN0b3JFbGUiLCJiIiwib3B0aW9uIiwiY3JlYXRlRWxlbWVudCIsInQiLCJ2IiwiYWRkIiwiVVJMUkVGIiwiVVJMIiwibG9jYXRpb24iLCJocmVmIiwiVXJsVmFsIiwic3RycGF0aHMiLCJ5YWNodF9zZWFyY2hfcGFnZV9pZCIsInBhdGhzIiwicHJldHR5X3VybF9wYXRoX3BhcmFtcyIsInBoYXNlX3BhdGgiLCJvbmx5X3ZhbHMiLCJlYWNoV29yZENhcGl0YWxpemUiLCJ5c3BfbWFrZVNlYXJjaFRhZ3MiLCJ0YWdzRWxlIiwidGUiLCJpbm5lckhUTUwiLCJ5c3BfdGFnc19ub3RfcHJpbnQiLCJfbG9vcDIiLCJwYXJhbUtleSIsImlubmVyVGV4dCIsImhhc0F0dHJpYnV0ZSIsImluZGV4T2YiLCJlbGVJbnB1dCIsIm5ld1RhZ0VsZSIsInRhZ1ZhbCIsInNlbGVjdGVkSW5kZXgiLCJtYXRjaCIsImVsZVVuaXQiLCJjbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInlzcFRhZ0VsZSIsImtleSIsImN1cnJlbnRUYXJnZXQiLCJpbnB1dEVsZXMiLCJlbGVJIiwiZm9ybSIsInJlcXVlc3RTdWJtaXQiLCJ5c3BfbWFya0xvdmVkVmVzc2VsIiwiZWxlX2NhcmQiLCJ5YWNodElkIiwiaGFzQ2xhc3MiLCJ5c3BfYWRkTG92ZWRWZXNzZWwiLCJ5c3BfcmVtb3ZlTG92ZWRWZXNzZWwiLCJ5c195YWNodHNfbG92ZWQiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG92ZWRWZXNzZWxzIiwic2V0SXRlbSIsImluZGV4ZWQiLCJzcGxpY2UiLCJZU1BfVmVzc2VsQ29tcGFyZUxpc3QiLCJ5c3BfcmVzdG9yZUNvbXBhcmVzIiwiY29tcGFyZV9wb3N0X2lkcyIsInlzcF9tYWtlQ29tcGFyZUxpbmtvdXQiLCJ5c3BfbWFrZUNvbXBhcmVWZXNzZWwiLCJjaGFuZ2UiLCJ5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCIsInlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJkYXRhX3Jlc3VsdCIsInJlc3VsdHMiLCJpdGVtIiwiZWxlX3ByZXZpZXciLCJ5c3BCZWZvcmVZYWNodFNlYXJjaCIsIkV2ZW50IiwieXNwQWZ0ZXJZYWNodFNlYXJjaCIsInlzcEFmdGVyUmVuZGVyaW5nWWFjaHQiLCJ5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIiLCJjbGFzc0xpc3QiLCJ0aXRsZSIsIlNFTyIsImhlYWRpbmciLCJwIiwibWF4aW11bVNpZ25pZmljYW50RGlnaXRzIiwidG90YWwiLCJjdXJyZW50VVJMIiwiZG9udF9wdXNoIiwidmlldyIsInBhZ2VfaW5kZXgiLCJSZWdFeHAiLCJmb3JtRGF0YU9iamVjdCIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJkaXNwYXRjaEV2ZW50IiwiRmlsbExpc3RzIiwibGlzdEVsZW1lbnRzIiwibGlzdE5lZWRlZEVsZW1lbnRzIiwiaW5wdXRfZWxlIiwibGlzdF9pZCIsImVsZV9saXN0IiwiX2xvb3AzIiwieWFjaHRTZWFyY2hBbmRSZXN1bHRzIiwib21zZSIsInN0eWxlIiwib3ZlcmZsb3dZIiwiYXBpX2RhdGEiLCJlbGVSZXNldCIsImVsZUNoZWNrIiwiZWxlVmlld09wdGlvbiIsImlucHV0X25hbWUiLCJvbmx5X3ZhbHNfYXJyYXkiLCJvdiIsInVybFZhbCIsIl9sb29wNCIsImxvdmVkX3lhY2h0cyIsInlzX29ubHlfdGhlc2UiLCJtb2JpbGVGb3JtIiwiTGVhZEZvcm1zIiwiZkVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUEsVUFBQUEsQ0FBQSxFQUFBO0VBRUEsSUFBQUMsT0FBQSxHQUFBO0lBQ0FDLElBQUEsRUFBQSxTQUFBQSxJQUFBQSxDQUFBQyxPQUFBLEVBQUE7TUFDQSxJQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssTUFBQSxDQUFBO1FBQ0FDLEtBQUEsRUFBQSxDQUFBO1FBQ0FDLFdBQUEsRUFBQSxDQUFBO1FBQ0FDLEtBQUEsRUFBQSxDQUFBO1FBQ0FDLGNBQUEsRUFBQSxDQUFBO1FBQ0FDLEtBQUEsRUFBQSxDQUFBO1FBQ0FDLFdBQUEsRUFBQSxDQUFBO1FBQ0FDLFVBQUEsRUFBQSxJQUFBO1FBQ0FDLGNBQUEsRUFBQSxRQUFBO1FBQ0FDLGNBQUEsRUFBQSxFQUFBO1FBQ0FDLFFBQUEsRUFBQSxNQUFBO1FBQ0FDLFFBQUEsRUFBQSxNQUFBO1FBQ0FDLFdBQUEsRUFBQSxVQUFBO1FBQ0FDLGNBQUEsRUFBQSxJQUFBO1FBQ0FDLFFBQUEsRUFBQSxhQUFBO1FBQ0FDLFNBQUEsRUFBQSxFQUFBO1FBQ0FDLFFBQUEsRUFBQSxFQUFBO1FBQ0FDLGFBQUEsRUFBQSxJQUFBO1FBQ0FDLFdBQUEsRUFBQSxLQUFBO1FBQ0FDLGVBQUEsRUFBQSxLQUFBO1FBQ0FDLFlBQUEsRUFBQSxJQUFBO1FBQ0FDLFVBQUEsRUFBQSxJQUFBO1FBQ0FDLFdBQUEsRUFBQSxTQUFBQSxXQUFBQSxDQUFBQyxVQUFBLEVBQUFDLEtBQUEsRUFBQTtVQUNBO1VBQ0E7UUFBQSxDQUNBO1FBQ0FDLE1BQUEsRUFBQSxTQUFBQSxNQUFBQSxDQUFBLEVBQUE7VUFDQTtRQUFBO01BRUEsQ0FBQSxFQUFBM0IsT0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO01BRUEsSUFB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LDRKQUFBLENBQUE7RUFFQUQsVUFBQSxDQUFBRSxPQUFBLENBQUEsVUFBQUMsR0FBQSxFQUFBO0lBQ0EsSUFBQUMsS0FBQSxHQUFBRCxHQUFBO0lBRUEsSUFBQUUsSUFBQSxHQUFBRixHQUFBLENBQUFHLFlBQUEsQ0FBQSxNQUFBLENBQUE7SUFFQSxJQUFBQyxTQUFBLEdBQUFaLFNBQUEsQ0FBQVUsSUFBQSxDQUFBOztJQUVBOztJQUVBLElBQUEsT0FBQUUsU0FBQSxJQUFBLE1BQUEsSUFBQSxPQUFBQSxTQUFBLElBQUEsV0FBQSxFQUFBO01BRUEsSUFBQXhJLEtBQUEsQ0FBQXlJLE9BQUEsQ0FBQUQsU0FBQSxDQUFBLEVBQUE7UUFDQTs7UUFFQUEsU0FBQSxDQUFBTCxPQUFBLENBQUEsVUFBQU8sRUFBQSxFQUFBO1VBRUEsSUFBQSxPQUFBTCxLQUFBLENBQUFNLElBQUEsSUFBQSxXQUFBLEtBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFVBQUEsSUFBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsT0FBQSxDQUFBLElBQUFOLEtBQUEsQ0FBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBRyxFQUFBLEVBQUE7WUFDQUwsS0FBQSxDQUFBTyxPQUFBLEdBQUEsSUFBQTtVQUNBO1FBRUEsQ0FBQSxDQUFBO01BRUEsQ0FBQSxNQUNBO1FBRUEsSUFBQSxPQUFBUCxLQUFBLENBQUFNLElBQUEsSUFBQSxXQUFBLEtBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLFVBQUEsSUFBQU4sS0FBQSxDQUFBTSxJQUFBLElBQUEsT0FBQSxDQUFBLElBQUFOLEtBQUEsQ0FBQUUsWUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBQyxTQUFBLEVBQUE7VUFDQUgsS0FBQSxDQUFBTyxPQUFBLEdBQUEsSUFBQTtRQUNBLENBQUEsTUFDQSxJQUFBUCxLQUFBLENBQUFNLElBQUEsSUFBQSxVQUFBLElBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLE9BQUEsRUFBQTtVQUNBTixLQUFBLENBQUFsQyxLQUFBLEdBQUFxQyxTQUFBO1FBQ0E7TUFF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RUFBQTtRQUNBd0YsT0FBQSxDQUFBQyxHQUFBLENBQUF6RixLQUFBLENBQUE7TUFDQSxDQUFBLENBQUE7SUFDQSxDQUFBLENBQUE7RUFDQSxDQUFBLENBQUE7QUFFQSxDQUFBLENBQUEiLCJmaWxlIjoiZ2xvYmFsUGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIC8qKlxuKiBzaW1wbGVQYWdpbmF0aW9uLmpzIHYxLjZcbiogQSBzaW1wbGUgalF1ZXJ5IHBhZ2luYXRpb24gcGx1Z2luLlxuKiBodHRwOi8vZmxhdml1c21hdGlzLmdpdGh1Yi5jb20vc2ltcGxlUGFnaW5hdGlvbi5qcy9cbipcbiogQ29weXJpZ2h0IDIwMTIsIEZsYXZpdXMgTWF0aXNcbiogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuKiBodHRwOi8vZmxhdml1c21hdGlzLmdpdGh1Yi5jb20vbGljZW5zZS5odG1sXG4qL1xuXG4oZnVuY3Rpb24oJCl7XG5cblx0dmFyIG1ldGhvZHMgPSB7XG5cdFx0aW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xuXHRcdFx0dmFyIG8gPSAkLmV4dGVuZCh7XG5cdFx0XHRcdGl0ZW1zOiAxLFxuXHRcdFx0XHRpdGVtc09uUGFnZTogMSxcblx0XHRcdFx0cGFnZXM6IDAsXG5cdFx0XHRcdGRpc3BsYXllZFBhZ2VzOiA1LFxuXHRcdFx0XHRlZGdlczogMixcblx0XHRcdFx0Y3VycmVudFBhZ2U6IDAsXG5cdFx0XHRcdHVzZUFuY2hvcnM6IHRydWUsXG5cdFx0XHRcdGhyZWZUZXh0UHJlZml4OiAnI3BhZ2UtJyxcblx0XHRcdFx0aHJlZlRleHRTdWZmaXg6ICcnLFxuXHRcdFx0XHRwcmV2VGV4dDogJ1ByZXYnLFxuXHRcdFx0XHRuZXh0VGV4dDogJ05leHQnLFxuXHRcdFx0XHRlbGxpcHNlVGV4dDogJyZoZWxsaXA7Jyxcblx0XHRcdFx0ZWxsaXBzZVBhZ2VTZXQ6IHRydWUsXG5cdFx0XHRcdGNzc1N0eWxlOiAnbGlnaHQtdGhlbWUnLFxuXHRcdFx0XHRsaXN0U3R5bGU6ICcnLFxuXHRcdFx0XHRsYWJlbE1hcDogW10sXG5cdFx0XHRcdHNlbGVjdE9uQ2xpY2s6IHRydWUsXG5cdFx0XHRcdG5leHRBdEZyb250OiBmYWxzZSxcblx0XHRcdFx0aW52ZXJ0UGFnZU9yZGVyOiBmYWxzZSxcblx0XHRcdFx0dXNlU3RhcnRFZGdlIDogdHJ1ZSxcblx0XHRcdFx0dXNlRW5kRWRnZSA6IHRydWUsXG5cdFx0XHRcdG9uUGFnZUNsaWNrOiBmdW5jdGlvbihwYWdlTnVtYmVyLCBldmVudCkge1xuXHRcdFx0XHRcdC8vIENhbGxiYWNrIHRyaWdnZXJlZCB3aGVuIGEgcGFnZSBpcyBjbGlja2VkXG5cdFx0XHRcdFx0Ly8gUGFnZSBudW1iZXIgaXMgZ2l2ZW4gYXMgYW4gb3B0aW9uYWwgcGFyYW1ldGVyXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9uSW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Ly8gQ2FsbGJhY2sgdHJpZ2dlcmVkIGltbWVkaWF0ZWx5IGFmdGVyIGluaXRpYWxpemF0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH0sIG9wdGlvbnMgfHwge30pO1xuXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRcdG8ucGFnZXMgPSBvLnBhZ2VzID8gby5wYWdlcyA6IE1hdGguY2VpbChvLml0ZW1zIC8gby5pdGVtc09uUGFnZSkgPyBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpIDogMTtcblx0XHRcdGlmIChvLmN1cnJlbnRQYWdlKVxuXHRcdFx0XHRvLmN1cnJlbnRQYWdlID0gby5jdXJyZW50UGFnZSAtIDE7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdG8uY3VycmVudFBhZ2UgPSAhby5pbnZlcnRQYWdlT3JkZXIgPyAwIDogby5wYWdlcyAtIDE7XG5cdFx0XHRvLmhhbGZEaXNwbGF5ZWQgPSBvLmRpc3BsYXllZFBhZ2VzIC8gMjtcblxuXHRcdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmFkZENsYXNzKG8uY3NzU3R5bGUgKyAnIHNpbXBsZS1wYWdpbmF0aW9uJykuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwoc2VsZik7XG5cdFx0XHR9KTtcblxuXHRcdFx0by5vbkluaXQoKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHNlbGVjdFBhZ2U6IGZ1bmN0aW9uKHBhZ2UpIHtcblx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBwYWdlIC0gMSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0cHJldlBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPiAwKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgLSAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPCBvLnBhZ2VzIC0gMSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRuZXh0UGFnZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoby5jdXJyZW50UGFnZSA8IG8ucGFnZXMgLSAxKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgKyAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPiAwKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIG8uY3VycmVudFBhZ2UgLSAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGdldFBhZ2VzQ291bnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLnBhZ2VzO1xuXHRcdH0sXG5cblx0XHRzZXRQYWdlc0NvdW50OiBmdW5jdGlvbihjb3VudCkge1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJykucGFnZXMgPSBjb3VudDtcblx0XHR9LFxuXG5cdFx0Z2V0Q3VycmVudFBhZ2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5jdXJyZW50UGFnZSArIDE7XG5cdFx0fSxcblxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLmVtcHR5KCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZHJhd1BhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5jdXJyZW50UGFnZSA9IHBhZ2UgLSAxO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0cmVkcmF3OiBmdW5jdGlvbigpe1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRpc2FibGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRlbmFibGU6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXM6IGZ1bmN0aW9uIChuZXdJdGVtcykge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uaXRlbXMgPSBuZXdJdGVtcztcblx0XHRcdG8ucGFnZXMgPSBtZXRob2RzLl9nZXRQYWdlcyhvKTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVJdGVtc09uUGFnZTogZnVuY3Rpb24gKGl0ZW1zT25QYWdlKSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5pdGVtc09uUGFnZSA9IGl0ZW1zT25QYWdlO1xuXHRcdFx0by5wYWdlcyA9IG1ldGhvZHMuX2dldFBhZ2VzKG8pO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgMCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0Z2V0SXRlbXNPblBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLml0ZW1zT25QYWdlO1xuXHRcdH0sXG5cblx0XHRfZHJhdzogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXJcdG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKSxcblx0XHRcdFx0aW50ZXJ2YWwgPSBtZXRob2RzLl9nZXRJbnRlcnZhbChvKSxcblx0XHRcdFx0aSxcblx0XHRcdFx0dGFnTmFtZTtcblxuXHRcdFx0bWV0aG9kcy5kZXN0cm95LmNhbGwodGhpcyk7XG5cblx0XHRcdHRhZ05hbWUgPSAodHlwZW9mIHRoaXMucHJvcCA9PT0gJ2Z1bmN0aW9uJykgPyB0aGlzLnByb3AoJ3RhZ05hbWUnKSA6IHRoaXMuYXR0cigndGFnTmFtZScpO1xuXG5cdFx0XHR2YXIgJHBhbmVsID0gdGFnTmFtZSA9PT0gJ1VMJyA/IHRoaXMgOiAkKCc8dWwnICsgKG8ubGlzdFN0eWxlID8gJyBjbGFzcz1cIicgKyBvLmxpc3RTdHlsZSArICdcIicgOiAnJykgKyAnPjwvdWw+JykuYXBwZW5kVG8odGhpcyk7XG5cblx0XHRcdC8vIEdlbmVyYXRlIFByZXYgbGlua1xuXHRcdFx0aWYgKG8ucHJldlRleHQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgLSAxIDogby5jdXJyZW50UGFnZSArIDEsIHt0ZXh0OiBvLnByZXZUZXh0LCBjbGFzc2VzOiAncHJldid9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgTmV4dCBsaW5rIChpZiBvcHRpb24gc2V0IGZvciBhdCBmcm9udClcblx0XHRcdGlmIChvLm5leHRUZXh0ICYmIG8ubmV4dEF0RnJvbnQpIHtcblx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsICFvLmludmVydFBhZ2VPcmRlciA/IG8uY3VycmVudFBhZ2UgKyAxIDogby5jdXJyZW50UGFnZSAtIDEsIHt0ZXh0OiBvLm5leHRUZXh0LCBjbGFzc2VzOiAnbmV4dCd9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgc3RhcnQgZWRnZXNcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKGludGVydmFsLnN0YXJ0ID4gMCAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmKG8udXNlU3RhcnRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oby5lZGdlcywgaW50ZXJ2YWwuc3RhcnQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG8uZWRnZXMgPCBpbnRlcnZhbC5zdGFydCAmJiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzICE9IDEpKSB7XG5cdFx0XHRcdFx0XHQkcGFuZWwuYXBwZW5kKCc8bGkgY2xhc3M9XCJkaXNhYmxlZFwiPjxzcGFuIGNsYXNzPVwiZWxsaXBzZVwiPicgKyBvLmVsbGlwc2VUZXh0ICsgJzwvc3Bhbj48L2xpPicpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwuc3RhcnQgLSBvLmVkZ2VzID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBvLmVkZ2VzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5lbmQgPCBvLnBhZ2VzICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYoby51c2VTdGFydEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBiZWdpbiA9IE1hdGgubWF4KG8ucGFnZXMgLSBvLmVkZ2VzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gby5wYWdlcyAtIDE7IGkgPj0gYmVnaW47IGktLSkge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKG8ucGFnZXMgLSBvLmVkZ2VzID4gaW50ZXJ2YWwuZW5kICYmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBpbnRlcnZhbCBsaW5rc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRmb3IgKGkgPSBpbnRlcnZhbC5zdGFydDsgaSA8IGludGVydmFsLmVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKGkgPSBpbnRlcnZhbC5lbmQgLSAxOyBpID49IGludGVydmFsLnN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgZW5kIGVkZ2VzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5lbmQgPCBvLnBhZ2VzICYmIG8uZWRnZXMgPiAwKSB7XG5cdFx0XHRcdFx0aWYgKG8ucGFnZXMgLSBvLmVkZ2VzID4gaW50ZXJ2YWwuZW5kICYmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG8ucGFnZXMgLSBvLmVkZ2VzIC0gaW50ZXJ2YWwuZW5kID09IDEpIHtcblx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihvLnVzZUVuZEVkZ2UpIHtcblx0XHRcdFx0XHRcdHZhciBiZWdpbiA9IE1hdGgubWF4KG8ucGFnZXMgLSBvLmVkZ2VzLCBpbnRlcnZhbC5lbmQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gYmVnaW47IGkgPCBvLnBhZ2VzOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGludGVydmFsLnN0YXJ0ID4gMCAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmIChvLmVkZ2VzIDwgaW50ZXJ2YWwuc3RhcnQgJiYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgby5lZGdlcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoby51c2VFbmRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oby5lZGdlcywgaW50ZXJ2YWwuc3RhcnQpO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gZW5kIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBOZXh0IGxpbmsgKHVubGVzcyBvcHRpb24gaXMgc2V0IGZvciBhdCBmcm9udClcblx0XHRcdGlmIChvLm5leHRUZXh0ICYmICFvLm5leHRBdEZyb250KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlICsgMSA6IG8uY3VycmVudFBhZ2UgLSAxLCB7dGV4dDogby5uZXh0VGV4dCwgY2xhc3NlczogJ25leHQnfSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvLmVsbGlwc2VQYWdlU2V0ICYmICFvLmRpc2FibGVkKSB7XG5cdFx0XHRcdG1ldGhvZHMuX2VsbGlwc2VDbGljay5jYWxsKHRoaXMsICRwYW5lbCk7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0X2dldFBhZ2VzOiBmdW5jdGlvbihvKSB7XG5cdFx0XHR2YXIgcGFnZXMgPSBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpO1xuXHRcdFx0cmV0dXJuIHBhZ2VzIHx8IDE7XG5cdFx0fSxcblxuXHRcdF9nZXRJbnRlcnZhbDogZnVuY3Rpb24obykge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c3RhcnQ6IE1hdGguY2VpbChvLmN1cnJlbnRQYWdlID4gby5oYWxmRGlzcGxheWVkID8gTWF0aC5tYXgoTWF0aC5taW4oby5jdXJyZW50UGFnZSAtIG8uaGFsZkRpc3BsYXllZCwgKG8ucGFnZXMgLSBvLmRpc3BsYXllZFBhZ2VzKSksIDApIDogMCksXG5cdFx0XHRcdGVuZDogTWF0aC5jZWlsKG8uY3VycmVudFBhZ2UgPiBvLmhhbGZEaXNwbGF5ZWQgPyBNYXRoLm1pbihvLmN1cnJlbnRQYWdlICsgby5oYWxmRGlzcGxheWVkLCBvLnBhZ2VzKSA6IE1hdGgubWluKG8uZGlzcGxheWVkUGFnZXMsIG8ucGFnZXMpKVxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0X2FwcGVuZEl0ZW06IGZ1bmN0aW9uKHBhZ2VJbmRleCwgb3B0cykge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLCBvcHRpb25zLCAkbGluaywgbyA9IHNlbGYuZGF0YSgncGFnaW5hdGlvbicpLCAkbGlua1dyYXBwZXIgPSAkKCc8bGk+PC9saT4nKSwgJHVsID0gc2VsZi5maW5kKCd1bCcpO1xuXG5cdFx0XHRwYWdlSW5kZXggPSBwYWdlSW5kZXggPCAwID8gMCA6IChwYWdlSW5kZXggPCBvLnBhZ2VzID8gcGFnZUluZGV4IDogby5wYWdlcyAtIDEpO1xuXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHR0ZXh0OiBwYWdlSW5kZXggKyAxLFxuXHRcdFx0XHRjbGFzc2VzOiAnJ1xuXHRcdFx0fTtcblxuXHRcdFx0aWYgKG8ubGFiZWxNYXAubGVuZ3RoICYmIG8ubGFiZWxNYXBbcGFnZUluZGV4XSkge1xuXHRcdFx0XHRvcHRpb25zLnRleHQgPSBvLmxhYmVsTWFwW3BhZ2VJbmRleF07XG5cdFx0XHR9XG5cblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZChvcHRpb25zLCBvcHRzIHx8IHt9KTtcblxuXHRcdFx0aWYgKHBhZ2VJbmRleCA9PSBvLmN1cnJlbnRQYWdlIHx8IG8uZGlzYWJsZWQpIHtcblx0XHRcdFx0aWYgKG8uZGlzYWJsZWQgfHwgb3B0aW9ucy5jbGFzc2VzID09PSAncHJldicgfHwgb3B0aW9ucy5jbGFzc2VzID09PSAnbmV4dCcpIHtcblx0XHRcdFx0XHQkbGlua1dyYXBwZXIuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpbmtXcmFwcGVyLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbGluayA9ICQoJzxzcGFuIGNsYXNzPVwiY3VycmVudFwiPicgKyAob3B0aW9ucy50ZXh0KSArICc8L3NwYW4+Jyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoby51c2VBbmNob3JzKSB7XG5cdFx0XHRcdFx0JGxpbmsgPSAkKCc8YSBocmVmPVwiJyArIG8uaHJlZlRleHRQcmVmaXggKyAocGFnZUluZGV4ICsgMSkgKyBvLmhyZWZUZXh0U3VmZml4ICsgJ1wiIGNsYXNzPVwicGFnZS1saW5rXCI+JyArIChvcHRpb25zLnRleHQpICsgJzwvYT4nKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkbGluayA9ICQoJzxzcGFuID4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9zcGFuPicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRsaW5rLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdFx0XHRyZXR1cm4gbWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHBhZ2VJbmRleCwgZXZlbnQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuY2xhc3Nlcykge1xuXHRcdFx0XHQkbGluay5hZGRDbGFzcyhvcHRpb25zLmNsYXNzZXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQkbGlua1dyYXBwZXIuYXBwZW5kKCRsaW5rKTtcblxuXHRcdFx0aWYgKCR1bC5sZW5ndGgpIHtcblx0XHRcdFx0JHVsLmFwcGVuZCgkbGlua1dyYXBwZXIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZi5hcHBlbmQoJGxpbmtXcmFwcGVyKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3NlbGVjdFBhZ2U6IGZ1bmN0aW9uKHBhZ2VJbmRleCwgZXZlbnQpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLmN1cnJlbnRQYWdlID0gcGFnZUluZGV4O1xuXHRcdFx0aWYgKG8uc2VsZWN0T25DbGljaykge1xuXHRcdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gby5vblBhZ2VDbGljayhwYWdlSW5kZXggKyAxLCBldmVudCk7XG5cdFx0fSxcblxuXG5cdFx0X2VsbGlwc2VDbGljazogZnVuY3Rpb24oJHBhbmVsKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKSxcblx0XHRcdFx0JGVsbGlwID0gJHBhbmVsLmZpbmQoJy5lbGxpcHNlJyk7XG5cdFx0XHQkZWxsaXAuYWRkQ2xhc3MoJ2NsaWNrYWJsZScpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0JGVsbGlwLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGlmICghby5kaXNhYmxlKSB7XG5cdFx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdHZhbCA9IChwYXJzZUludCgkdGhpcy5wYXJlbnQoKS5wcmV2KCkudGV4dCgpLCAxMCkgfHwgMCkgKyAxO1xuXHRcdFx0XHRcdCR0aGlzXG5cdFx0XHRcdFx0XHQuaHRtbCgnPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIxXCIgbWF4PVwiJyArIG8ucGFnZXMgKyAnXCIgc3RlcD1cIjFcIiB2YWx1ZT1cIicgKyB2YWwgKyAnXCI+Jylcblx0XHRcdFx0XHRcdC5maW5kKCdpbnB1dCcpXG5cdFx0XHRcdFx0XHQuZm9jdXMoKVxuXHRcdFx0XHRcdFx0LmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdC8vIHByZXZlbnQgaW5wdXQgbnVtYmVyIGFycm93cyBmcm9tIGJ1YmJsaW5nIGEgY2xpY2sgZXZlbnQgb24gJGVsbGlwXG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5rZXl1cChmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50LndoaWNoID09PSAxMyAmJiB2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZW50ZXIgdG8gYWNjZXB0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCh2YWw+MCkmJih2YWw8PW8ucGFnZXMpKVxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCB2YWwgLSAxKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gMjcpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBlc2NhcGUgdG8gY2FuY2VsXG5cdFx0XHRcdFx0XHRcdFx0JGVsbGlwLmVtcHR5KCkuaHRtbChvLmVsbGlwc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5iaW5kKCdibHVyJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdFx0XHRcdGlmICh2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHNlbGYsIHZhbCAtIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCRlbGxpcC5lbXB0eSgpLmh0bWwoby5lbGxpcHNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9O1xuXG5cdCQuZm4ucGFnaW5hdGlvbiA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuXG5cdFx0Ly8gTWV0aG9kIGNhbGxpbmcgbG9naWNcblx0XHRpZiAobWV0aG9kc1ttZXRob2RdICYmIG1ldGhvZC5jaGFyQXQoMCkgIT0gJ18nKSB7XG5cdFx0XHRyZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkLmVycm9yKCdNZXRob2QgJyArICBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5wYWdpbmF0aW9uJyk7XG5cdFx0fVxuXG5cdH07XG5cbn0pKGpRdWVyeSk7IiwiLypcbiAgICBBIHNpbXBsZSBqUXVlcnkgbW9kYWwgKGh0dHA6Ly9naXRodWIuY29tL2t5bGVmb3gvanF1ZXJ5LW1vZGFsKVxuICAgIFZlcnNpb24gMC45LjJcbiovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAvLyBNYWtpbmcgeW91ciBqUXVlcnkgcGx1Z2luIHdvcmsgYmV0dGVyIHdpdGggbnBtIHRvb2xzXG4gIC8vIGh0dHA6Ly9ibG9nLm5wbWpzLm9yZy9wb3N0LzExMjcxMjE2OTgzMC9tYWtpbmcteW91ci1qcXVlcnktcGx1Z2luLXdvcmstYmV0dGVyLXdpdGgtbnBtXG4gIGlmKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCB3aW5kb3csIGRvY3VtZW50KTtcbiAgfVxuICBlbHNlIHtcbiAgICBmYWN0b3J5KGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7XG4gIH1cbn0oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG5cbiAgdmFyIG1vZGFscyA9IFtdLFxuICAgICAgZ2V0Q3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbW9kYWxzLmxlbmd0aCA/IG1vZGFsc1ttb2RhbHMubGVuZ3RoIC0gMV0gOiBudWxsO1xuICAgICAgfSxcbiAgICAgIHNlbGVjdEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICBzZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGk9bW9kYWxzLmxlbmd0aC0xOyBpPj0wOyBpLS0pIHtcbiAgICAgICAgICBpZiAobW9kYWxzW2ldLiRibG9ja2VyKSB7XG4gICAgICAgICAgICBtb2RhbHNbaV0uJGJsb2NrZXIudG9nZ2xlQ2xhc3MoJ2N1cnJlbnQnLCFzZWxlY3RlZCkudG9nZ2xlQ2xhc3MoJ2JlaGluZCcsc2VsZWN0ZWQpO1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAkLnlzcF9tb2RhbCA9IGZ1bmN0aW9uKGVsLCBvcHRpb25zKSB7XG4gICAgdmFyIHJlbW92ZSwgdGFyZ2V0O1xuICAgIHRoaXMuJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sICQueXNwX21vZGFsLmRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICB0aGlzLm9wdGlvbnMuZG9GYWRlID0gIWlzTmFOKHBhcnNlSW50KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24sIDEwKSk7XG4gICAgdGhpcy4kYmxvY2tlciA9IG51bGw7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5jbG9zZUV4aXN0aW5nKVxuICAgICAgd2hpbGUgKCQueXNwX21vZGFsLmlzQWN0aXZlKCkpXG4gICAgICAgICQueXNwX21vZGFsLmNsb3NlKCk7IC8vIENsb3NlIGFueSBvcGVuIG1vZGFscy5cbiAgICBtb2RhbHMucHVzaCh0aGlzKTtcbiAgICBpZiAoZWwuaXMoJ2EnKSkge1xuICAgICAgdGFyZ2V0ID0gZWwuYXR0cignaHJlZicpO1xuICAgICAgdGhpcy5hbmNob3IgPSBlbDtcbiAgICAgIC8vU2VsZWN0IGVsZW1lbnQgYnkgaWQgZnJvbSBocmVmXG4gICAgICBpZiAoL14jLy50ZXN0KHRhcmdldCkpIHtcbiAgICAgICAgdGhpcy4kZWxtID0gJCh0YXJnZXQpO1xuICAgICAgICBpZiAodGhpcy4kZWxtLmxlbmd0aCAhPT0gMSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJGVsbSk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgLy9BSkFYXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0gPSAkKCc8ZGl2PicpO1xuICAgICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgICByZW1vdmUgPSBmdW5jdGlvbihldmVudCwgbW9kYWwpIHsgbW9kYWwuZWxtLnJlbW92ZSgpOyB9O1xuICAgICAgICB0aGlzLnNob3dTcGlubmVyKCk7XG4gICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9TRU5EKTtcbiAgICAgICAgJC5nZXQodGFyZ2V0KS5kb25lKGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpIHJldHVybjtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfU1VDQ0VTUyk7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgICAgY3VycmVudC4kZWxtLmVtcHR5KCkuYXBwZW5kKGh0bWwpLm9uKCQueXNwX21vZGFsLkNMT1NFLCByZW1vdmUpO1xuICAgICAgICAgIGN1cnJlbnQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICBjdXJyZW50Lm9wZW4oKTtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUpO1xuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9GQUlMKTtcbiAgICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgICBjdXJyZW50LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgbW9kYWxzLnBvcCgpOyAvLyByZW1vdmUgZXhwZWN0ZWQgbW9kYWwgZnJvbSB0aGUgbGlzdFxuICAgICAgICAgIGVsLnRyaWdnZXIoJC55c3BfbW9kYWwuQUpBWF9DT01QTEVURSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbG0gPSBlbDtcbiAgICAgIHRoaXMuYW5jaG9yID0gZWw7XG4gICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICB9O1xuXG4gICQueXNwX21vZGFsLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogJC55c3BfbW9kYWwsXG5cbiAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtID0gdGhpcztcbiAgICAgIHRoaXMuYmxvY2soKTtcbiAgICAgIHRoaXMuYW5jaG9yLmJsdXIoKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBtLnNob3coKTtcbiAgICAgICAgfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiAqIHRoaXMub3B0aW9ucy5mYWRlRGVsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24ubW9kYWwnKS5vbigna2V5ZG93bi5tb2RhbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDI3ICYmIGN1cnJlbnQub3B0aW9ucy5lc2NhcGVDbG9zZSkgY3VycmVudC5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNsaWNrQ2xvc2UpXG4gICAgICAgIHRoaXMuJGJsb2NrZXIuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcylcbiAgICAgICAgICAgICQueXNwX21vZGFsLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICBtb2RhbHMucG9wKCk7XG4gICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleWRvd24ubW9kYWwnKTtcbiAgICB9LFxuXG4gICAgYmxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX0JMT0NLLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIHRoaXMuJGJvZHkuY3NzKCdvdmVyZmxvdycsJ2hpZGRlbicpO1xuICAgICAgdGhpcy4kYmxvY2tlciA9ICQoJzxkaXYgY2xhc3M9XCInICsgdGhpcy5vcHRpb25zLmJsb2NrZXJDbGFzcyArICcgYmxvY2tlciBjdXJyZW50XCI+PC9kaXY+JykuYXBwZW5kVG8odGhpcy4kYm9keSk7XG4gICAgICBzZWxlY3RDdXJyZW50KCk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIuY3NzKCdvcGFjaXR5JywwKS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbik7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CTE9DSywgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIHVuYmxvY2s6IGZ1bmN0aW9uKG5vdykge1xuICAgICAgaWYgKCFub3cgJiYgdGhpcy5vcHRpb25zLmRvRmFkZSlcbiAgICAgICAgdGhpcy4kYmxvY2tlci5mYWRlT3V0KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24sIHRoaXMudW5ibG9jay5iaW5kKHRoaXMsdHJ1ZSkpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIuY2hpbGRyZW4oKS5hcHBlbmRUbyh0aGlzLiRib2R5KTtcbiAgICAgICAgdGhpcy4kYmxvY2tlci5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy4kYmxvY2tlciA9IG51bGw7XG4gICAgICAgIHNlbGVjdEN1cnJlbnQoKTtcbiAgICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAgIHRoaXMuJGJvZHkuY3NzKCdvdmVyZmxvdycsJycpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9PUEVOLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd0Nsb3NlKSB7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSAkKCc8YSBocmVmPVwiI2Nsb3NlLW1vZGFsXCIgcmVsPVwibW9kYWw6Y2xvc2VcIiBjbGFzcz1cImNsb3NlLW1vZGFsICcgKyB0aGlzLm9wdGlvbnMuY2xvc2VDbGFzcyArICdcIj4nICsgdGhpcy5vcHRpb25zLmNsb3NlVGV4dCArICc8L2E+Jyk7XG4gICAgICAgIHRoaXMuJGVsbS5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbik7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0uYWRkQ2xhc3ModGhpcy5vcHRpb25zLm1vZGFsQ2xhc3MpLmFwcGVuZFRvKHRoaXMuJGJsb2NrZXIpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRlbG0uY3NzKHtvcGFjaXR5OiAwLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ30pLmFuaW1hdGUoe29wYWNpdHk6IDF9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5PUEVOLCBbdGhpcy5fY3R4KCldKTtcbiAgICB9LFxuXG4gICAgaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfQ0xPU0UsIFt0aGlzLl9jdHgoKV0pO1xuICAgICAgaWYgKHRoaXMuY2xvc2VCdXR0b24pIHRoaXMuY2xvc2VCdXR0b24ucmVtb3ZlKCk7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRlbG0uZmFkZU91dCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkFGVEVSX0NMT1NFLCBbX3RoaXMuX2N0eCgpXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtLmhpZGUoMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSwgW190aGlzLl9jdHgoKV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkNMT1NFLCBbdGhpcy5fY3R4KCldKTtcbiAgICB9LFxuXG4gICAgc2hvd1NwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2hvd1NwaW5uZXIpIHJldHVybjtcbiAgICAgIHRoaXMuc3Bpbm5lciA9IHRoaXMuc3Bpbm5lciB8fCAkKCc8ZGl2IGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5tb2RhbENsYXNzICsgJy1zcGlubmVyXCI+PC9kaXY+JylcbiAgICAgICAgLmFwcGVuZCh0aGlzLm9wdGlvbnMuc3Bpbm5lckh0bWwpO1xuICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy5zcGlubmVyKTtcbiAgICAgIHRoaXMuc3Bpbm5lci5zaG93KCk7XG4gICAgfSxcblxuICAgIGhpZGVTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnNwaW5uZXIpIHRoaXMuc3Bpbm5lci5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgLy9SZXR1cm4gY29udGV4dCBmb3IgY3VzdG9tIGV2ZW50c1xuICAgIF9jdHg6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHsgZWxtOiB0aGlzLiRlbG0sICRlbG06IHRoaXMuJGVsbSwgJGJsb2NrZXI6IHRoaXMuJGJsb2NrZXIsIG9wdGlvbnM6IHRoaXMub3B0aW9ucywgJGFuY2hvcjogdGhpcy5hbmNob3IgfTtcbiAgICB9XG4gIH07XG5cbiAgJC55c3BfbW9kYWwuY2xvc2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSkgcmV0dXJuO1xuICAgIGlmIChldmVudCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICBjdXJyZW50LmNsb3NlKCk7XG4gICAgcmV0dXJuIGN1cnJlbnQuJGVsbTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGlmIHRoZXJlIGN1cnJlbnRseSBpcyBhbiBhY3RpdmUgbW9kYWxcbiAgJC55c3BfbW9kYWwuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG1vZGFscy5sZW5ndGggPiAwO1xuICB9O1xuXG4gICQueXNwX21vZGFsLmdldEN1cnJlbnQgPSBnZXRDdXJyZW50O1xuXG4gICQueXNwX21vZGFsLmRlZmF1bHRzID0ge1xuICAgIGNsb3NlRXhpc3Rpbmc6IHRydWUsXG4gICAgZXNjYXBlQ2xvc2U6IHRydWUsXG4gICAgY2xpY2tDbG9zZTogdHJ1ZSxcbiAgICBjbG9zZVRleHQ6ICdDbG9zZScsXG4gICAgY2xvc2VDbGFzczogJycsXG4gICAgbW9kYWxDbGFzczogXCJ5c3AtbW9kYWxcIixcbiAgICBibG9ja2VyQ2xhc3M6IFwianF1ZXJ5LW1vZGFsXCIsXG4gICAgc3Bpbm5lckh0bWw6ICc8ZGl2IGNsYXNzPVwicmVjdDFcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmVjdDJcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmVjdDNcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmVjdDRcIj48L2Rpdj4nLFxuICAgIHNob3dTcGlubmVyOiB0cnVlLFxuICAgIHNob3dDbG9zZTogdHJ1ZSxcbiAgICBmYWRlRHVyYXRpb246IG51bGwsICAgLy8gTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGUgZmFkZSBhbmltYXRpb24gdGFrZXMuXG4gICAgZmFkZURlbGF5OiAxLjAgICAgICAgIC8vIFBvaW50IGR1cmluZyB0aGUgb3ZlcmxheSdzIGZhZGUtaW4gdGhhdCB0aGUgbW9kYWwgYmVnaW5zIHRvIGZhZGUgaW4gKC41ID0gNTAlLCAxLjUgPSAxNTAlLCBldGMuKVxuICB9O1xuXG4gIC8vIEV2ZW50IGNvbnN0YW50c1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfQkxPQ0sgPSAnbW9kYWw6YmVmb3JlLWJsb2NrJztcbiAgJC55c3BfbW9kYWwuQkxPQ0sgPSAnbW9kYWw6YmxvY2snO1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfT1BFTiA9ICdtb2RhbDpiZWZvcmUtb3Blbic7XG4gICQueXNwX21vZGFsLk9QRU4gPSAnbW9kYWw6b3Blbic7XG4gICQueXNwX21vZGFsLkJFRk9SRV9DTE9TRSA9ICdtb2RhbDpiZWZvcmUtY2xvc2UnO1xuICAkLnlzcF9tb2RhbC5DTE9TRSA9ICdtb2RhbDpjbG9zZSc7XG4gICQueXNwX21vZGFsLkFGVEVSX0NMT1NFID0gJ21vZGFsOmFmdGVyLWNsb3NlJztcbiAgJC55c3BfbW9kYWwuQUpBWF9TRU5EID0gJ21vZGFsOmFqYXg6c2VuZCc7XG4gICQueXNwX21vZGFsLkFKQVhfU1VDQ0VTUyA9ICdtb2RhbDphamF4OnN1Y2Nlc3MnO1xuICAkLnlzcF9tb2RhbC5BSkFYX0ZBSUwgPSAnbW9kYWw6YWpheDpmYWlsJztcbiAgJC55c3BfbW9kYWwuQUpBWF9DT01QTEVURSA9ICdtb2RhbDphamF4OmNvbXBsZXRlJztcblxuICAkLmZuLnlzcF9tb2RhbCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgbmV3ICQueXNwX21vZGFsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBBdXRvbWF0aWNhbGx5IGJpbmQgbGlua3Mgd2l0aCByZWw9XCJtb2RhbDpjbG9zZVwiIHRvLCB3ZWxsLCBjbG9zZSB0aGUgbW9kYWwuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5tb2RhbCcsICdhW3JlbH49XCJtb2RhbDpjbG9zZVwiXScsICQueXNwX21vZGFsLmNsb3NlKTtcbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLm1vZGFsJywgJ2FbcmVsfj1cIm1vZGFsOm9wZW5cIl0nLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCh0aGlzKS5tb2RhbCgpO1xuICB9KTtcbn0pKTsiLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICBcbiAgalF1ZXJ5KCdbZGF0YS1tb2RhbF0nKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdmdWNrIG1lICcpO1xuXG4gICAgdmFyIGRhdGFfbW9kYWwgPSBqUXVlcnkodGhpcykuZGF0YSgnbW9kYWwnKTtcblxuICAgIGpRdWVyeSggZGF0YV9tb2RhbCApLnlzcF9tb2RhbCh7XG4gICAgXHRjbG9zZVRleHQ6ICdYJyxcbiAgICAgIG1vZGFsQ2xhc3M6ICd5c3AtbW9kYWwtb3BlbicsXG4gICAgICBjbG9zZUNsYXNzOiAneXNwLW1vZGVsLWNsb3NlJ1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIiwiT2JqZWN0LmRlZmluZVByb3BlcnR5KFN0cmluZy5wcm90b3R5cGUsICdlYWNoV29yZENhcGl0YWxpemUnLCB7XG4gIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50b0xvd2VyQ2FzZSgpXG4gICAgLnNwbGl0KCcgJylcbiAgICAubWFwKChzKSA9PiBzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcy5zdWJzdHJpbmcoMSkpXG4gICAgLmpvaW4oJyAnKTtcbiAgfSxcbiAgZW51bWVyYWJsZTogZmFsc2Vcbn0pO1xuXG5mdW5jdGlvbiB5c3BfZ2V0X2Zvcm1fZGF0YShmb3JtX2VsZSkge1xuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSggZm9ybV9lbGUgKTtcblxuICAgIGxldCBmZD1PYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEuZW50cmllcygpKTtcblxuICAgIGZvciAoY29uc3QgW2ZJbmRleCwgZmllbGRdIG9mIE9iamVjdC5lbnRyaWVzKGZkKSkge1xuXG4gICAgICAgIGxldCBWYWxBcnJheSA9IGZvcm1EYXRhLmdldEFsbChmSW5kZXgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgVmFsQXJyYXlbMV0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGZkWyBmSW5kZXggXSA9IFZhbEFycmF5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZkWyBmSW5kZXggXSA9PSAnJykge1xuICAgICAgICAgICAgZGVsZXRlIGZkW2ZJbmRleF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmQ7XG59XG5cbmZ1bmN0aW9uIHlzcF9zZXRfZm9ybV90b19kYXRhKGlucHV0RGF0YSkge1xuXG4gICAgbGV0IGZvcm1BPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKTtcbiAgICBsZXQgZm9ybUI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgIGZvcm1BLnJlc2V0KCk7XG4gICAgZm9ybUIucmVzZXQoKTtcblxuICAgIGxldCBmb3JtSW5wdXRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLXlhY2h0LXNlYXJjaC1mb3JtXCJdLCAjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtXCJdJyk7XG5cbiAgICBmb3JtSW5wdXRzLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICBsZXQgaW5wdXQgPSBlbGU7XG5cbiAgICAgICAgbGV0IG5hbWUgPSBlbGUuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgbGV0IGhhc1ByZXR0eSA9IGlucHV0RGF0YVsgbmFtZSBdO1xuXG4gICAgICAgLy8gY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICBpZiAodHlwZW9mIGhhc1ByZXR0eSAhPSAnbnVsbCcgJiYgdHlwZW9mIGhhc1ByZXR0eSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoYXNQcmV0dHkpKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICAgICAgaGFzUHJldHR5LmZvckVhY2goKGhQKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaFAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhhc1ByZXR0eSApIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaGFzUHJldHR5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24geXNwX3B1c2hfaGlzdG9yeSggZGF0YSA9IHt9ICkge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgbGV0IHN0cnBhdGg9Jyc7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgbGV0IGl0ID0gZGF0YVsgcHJvcGVydHkgXTtcblxuXG4gICAgICAgIGlmIChpdCAhPSAnJyAmJiB0eXBlb2YgaXQgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGl0ID09ICdzdHJpbmcnICYmIHByb3BlcnR5ICE9ICdPbkZpcnN0TG9hZCcgJiYgdHlwZW9mIGl0ICE9ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBpdCk7XG5cbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aCtcIlwiK3Byb3BlcnR5KyctJysoaXQudG9TdHJpbmcoKS5zcGxpdCgnICcpLmpvaW4oJy0nKSkrJy8nO1xuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdCkpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIGl0KTtcblxuICAgICAgICAgICAgaXQgPSBpdC5tYXAoKHByb3ApID0+IHsgcmV0dXJuIHByb3AudG9TdHJpbmcoKS5zcGxpdCgnICcpLmpvaW4oJy0nKTsgfSk7XG5cbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aCtcIlwiK3Byb3BlcnR5KyctJysoIGl0LmpvaW4oXCIrXCIpICkrJy8nO1xuICAgICAgICAgICAgc3RycGF0aD1zdHJwYXRoLnRvTG93ZXJDYXNlKCk7ICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL2hpc3RvcnkucHVzaFN0YXRlKGRhdGEsICcnLCB5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsKyc/JytzZWFyY2hQYXJhbXMudG9TdHJpbmcoKSk7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoZGF0YSwgJycsIHlzcF95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrc3RycGF0aCk7XG5cbiAgICByZXR1cm4geXNwX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCtzdHJwYXRoOyAgICBcbn1cblxuIiwidmFyIHlzcF9hcGk9e307XG5cbiAgICB5c3BfYXBpLmNhbGxfYXBpPWZ1bmN0aW9uKG1ldGhvZCwgcGF0aCwgcGFzc2luZ19kYXRhKSB7XG4gICAgICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZURhdGEgPSBKU09OLnBhcnNlKCB0aGlzLnJlc3BvbnNlVGV4dCApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VEYXRhKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFzc2luZ19kYXRhLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQocHJvcGVydHksIHBhc3NpbmdfZGF0YVsgcHJvcGVydHkgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBfcXVlc3Rpb25NYXJrPXNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJHRVRcIiwgeXNwX3lhY2h0X3N5bmMud3BfcmVzdF91cmwrXCJ5c3AvXCIrIHBhdGggKyAoKF9xdWVzdGlvbk1hcmsgIT0gJycpPyc/JytzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTonJyksIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoKTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ1BPU1QnOlxuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLm9wZW4oXCJQT1NUXCIsIHlzcF95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wieXNwL1wiKyBwYXRoLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgICAgICAgICAgICAgICAgIHhodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkocGFzc2luZ19kYXRhKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9OyIsInZhciB5c3BfdGVtcGxhdGVzPXt9O1xuXHR5c3BfdGVtcGxhdGVzLnlhY2h0PXt9O1xuXHRcblx0eXNwX3RlbXBsYXRlcy55YWNodC5ncmlkPWZ1bmN0aW9uKHZlc3NlbCwgcGFyYW1zKSB7XG5cdFx0bGV0IG1ldGVycyA9IHBhcnNlSW50KHZlc3NlbC5Ob21pbmFsTGVuZ3RoKSAqIDAuMzA0ODtcblxuXHRcdGxldCBwcmljZSA9ICcnO1xuXHRcdGxldCBsZW5ndGggPSAnJztcblxuXHRcdGlmICh5c3BfeWFjaHRfc3luYy5ldXJvcGVfb3B0aW9uX3BpY2tlZCA9PSBcInllc1wiKSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfRXVyb1ZhbCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuWVNQX0V1cm9WYWwgPiAwKSA/IGDigqwke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCh2ZXNzZWwuWVNQX0V1cm9WYWwpIH1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHR9IFxuXHRcdGVsc2Uge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyB2ZXNzZWwuTm9taW5hbExlbmd0aCArIFwiIC8gXCIgKyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblxuXHRcdFx0aWYgKHBhcmFtcy5jdXJyZW5jeSA9PSAnRXVyJykge1xuXHRcdFx0XHRwcmljZSA9ICh0eXBlb2YgdmVzc2VsLllTUF9VU0RWYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9VU0RWYWwgPiAwKSA/IGDigqwke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCh2ZXNzZWwuWVNQX0V1cm9WYWwpIH1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRwcmljZSA9ICh0eXBlb2YgdmVzc2VsLllTUF9VU0RWYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9VU0RWYWwgPiAwKSA/IGAkJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9VU0RWYWwpIH1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGxldCB2ZXNzZWxMb2NhdGlvbiwgdmVzc2VsS2V5d29yZExvY2F0aW9uTGluaztcblxuXHRcdGlmICh0eXBlb2YgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRCAhPSBudWxsKSB7XG5cblx0XHRcdGlmICh2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDaXR5TmFtZSAhPSAnJykge1xuXG5cdFx0ICAgICAgICB2ZXNzZWxLZXl3b3JkTG9jYXRpb25MaW5rPWAveWFjaHQtc2VhcmNoL3lzX2tleXdvcmQtJHsgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUucmVwbGFjZSgvKCApL2csICctJykgfWA7XG5cdFx0XHRcdFxuXHRcdFx0XHR2ZXNzZWxMb2NhdGlvbiA9ICh2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUQgPT0gXCJVU1wiIHx8IHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRCA9PSBcIlVuaXRlZCBTdGF0ZXNcIiA/IGAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lLnRvTG93ZXJDYXNlKCl9LCAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdFN0YXRlQ29kZX1gIDogYCR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUudG9Mb3dlckNhc2UoKX0sICR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEfWApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0ICAgICAgICB2ZXNzZWxLZXl3b3JkTG9jYXRpb25MaW5rPWAveWFjaHQtc2VhcmNoL3lzX2tleXdvcmQtJHsgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlELnJlcGxhY2UoLyggKS9nLCAnLScpIH1gO1xuXG5cdFx0XHRcdHZlc3NlbExvY2F0aW9uID0gYCR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEfWA7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlzcC15YWNodC1pdGVtIHlzcC12aWV3LWdyaWRcIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLWltYWdlXCI+XG5cdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtaW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHlzcF95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cdFx0XHRcdFx0XHRcblx0XHRcblx0XHRcdFx0XHRcdDxzdmcgdGl0bGU9XCJsaWtlXCIgY2xhc3M9XCJsaWtlLW1lIGxvdmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCI1N1wiIGhlaWdodD1cIjU0XCIgdmlld0JveD1cIjAgMCA1NyA1NFwiIGZpbGw9XCJub25lXCIgIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XG5cdFx0XHRcdFx0XHQgIDxnIGZpbHRlcj1cInVybCgjZmlsdGVyMF9kXzI4ODhfNDMzMylcIj5cblx0XHRcdFx0XHRcdCAgICA8cGF0aCBkPVwiTTM0LjcwMjggMTEuNTc1NUMzNi4yMDk0IDExLjU3NTUgMzcuNjI1MSAxMi4xNjk5IDM4LjY4OTggMTMuMjQ4OEwzOC44MjIzIDEzLjM4M0M0MS4wMjA2IDE1LjYxMTYgNDEuMDIwNiAxOS4yMzc1IDM4LjgyMjMgMjEuNDY2TDM4LjA5OTIgMjIuMTk5TDI3LjQ5OTUgMzIuOTQ0MkwxOC40ODgzIDIzLjgwOEwxNi45MDExIDIyLjE5OUwxNi4xNzggMjEuNDY2QzEzLjk3OTcgMTkuMjM3NSAxMy45Nzk3IDE1LjYxMTYgMTYuMTc4IDEzLjM4M0wxNi4zMDgzIDEzLjI1MDlDMTcuMzczOSAxMi4xNzA4IDE4Ljc5IDExLjU3NTkgMjAuMjk2MiAxMS41NzY0QzIxLjgwMjMgMTEuNTc2NCAyMy4yMTc2IDEyLjE3MDggMjQuMjgxOSAxMy4yNDkyTDI1LjAwNSAxMy45ODIyTDI3LjQ5OTEgMTYuNTEwMUwyOS45OTI4IDEzLjk4MThMMzAuNzE1OCAxMy4yNDg4QzMxLjc4MDEgMTIuMTY5OSAzMy4xOTYyIDExLjU3NTUgMzQuNzAyOCAxMS41NzU1Wk0zNC43MDI4IDhDMzIuMzU3IDggMzAuMDExMiA4LjkwNjggMjguMjIyMiAxMC43MjA0TDI3LjQ5OTEgMTEuNDUzNEwyNi43NzYgMTAuNzIwNEMyNC45ODc4IDguOTA3MjMgMjIuNjQyIDguMDAwNDMgMjAuMjk3IDhDMTcuOTUwOCA4IDE1LjYwNSA4LjkwNzIzIDEzLjgxNDcgMTAuNzIyMUwxMy42ODQ0IDEwLjg1NDJDMTAuMTA0NiAxNC40ODMyIDEwLjEwNDYgMjAuMzY0NSAxMy42ODQ0IDIzLjk5MzVMMTQuNDA3NCAyNC43MjY1TDE1Ljk5NDYgMjYuMzM1NEwyNy40OTk1IDM4TDQwLjU5MzMgMjQuNzI2NUw0MS4zMTY0IDIzLjk5MzVDNDQuODk0NSAyMC4zNjYzIDQ0Ljg5NDUgMTQuNDgxNCA0MS4zMTY0IDEwLjg1NDJMNDEuMTgzOSAxMC43MkMzOS4zOTQ1IDguOTA2OCAzNy4wNDg2IDggMzQuNzAyOCA4WlwiIGZpbGw9XCJ3aGl0ZVwiPjwvcGF0aD5cblx0XHRcdFx0XHRcdCAgPC9nPlxuXHRcdFx0XHRcdFx0ICA8ZGVmcz5cblx0XHRcdFx0XHRcdCAgICA8ZmlsdGVyIGlkPVwiZmlsdGVyMF9kXzI4ODhfNDMzM1wiIHg9XCItMC4wMDA0ODgyODFcIiB5PVwiMFwiIHdpZHRoPVwiNTcuMDAwNVwiIGhlaWdodD1cIjU0XCIgZmlsdGVyVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz1cInNSR0JcIj5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUZsb29kIGZsb29kLW9wYWNpdHk9XCIwXCIgcmVzdWx0PVwiQmFja2dyb3VuZEltYWdlRml4XCI+PC9mZUZsb29kPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29sb3JNYXRyaXggaW49XCJTb3VyY2VBbHBoYVwiIHR5cGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMFwiIHJlc3VsdD1cImhhcmRBbHBoYVwiPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZU9mZnNldCBkeD1cIjFcIiBkeT1cIjRcIj48L2ZlT2Zmc2V0PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj1cIjZcIj48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29tcG9zaXRlIGluMj1cImhhcmRBbHBoYVwiIG9wZXJhdG9yPVwib3V0XCI+PC9mZUNvbXBvc2l0ZT5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDBcIj48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVCbGVuZCBtb2RlPVwibm9ybWFsXCIgaW4yPVwiQmFja2dyb3VuZEltYWdlRml4XCIgcmVzdWx0PVwiZWZmZWN0MV9kcm9wU2hhZG93XzI4ODhfNDMzM1wiPjwvZmVCbGVuZD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUJsZW5kIG1vZGU9XCJub3JtYWxcIiBpbj1cIlNvdXJjZUdyYXBoaWNcIiBpbjI9XCJlZmZlY3QxX2Ryb3BTaGFkb3dfMjg4OF80MzMzXCIgcmVzdWx0PVwic2hhcGVcIj48L2ZlQmxlbmQ+XG5cdFx0XHRcdFx0XHQgICAgPC9maWx0ZXI+XG5cdFx0XHRcdFx0XHQgIDwvZGVmcz5cblx0XHRcdFx0XHRcdDwvc3ZnPlxuXG5cdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJ0b3AtY29tcGFyZVwiIHRpdGxlPVwiY29tcGFyZVwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjb21wYXJlX3RvZ2dsZVwiIG5hbWU9XCJjb21wYXJlXCIgdmFsdWU9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgLz5cblxuXHRcdFx0XHRcdFx0XHQ8c3ZnIHdpZHRoPVwiNThcIiBoZWlnaHQ9XCIyNVwiIHZpZXdCb3g9XCIwIDAgNTggMjVcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk01MS41MDI5IDE4LjE5NTNMNTQuNjc1MyAxNC43NzY3QzU1LjQ0MTEgMTMuOTUxNSA1NS4xMjU4IDEyLjU0MTggNTQuMDkzNyAxMi4xODQzTDUyLjIgMTEuNTI4NFY0LjY4NzVDNTIuMiAzLjgyNDU2IDUxLjU1MDggMy4xMjUgNTAuNzUgMy4xMjVINDcuODVWMS4xNzE4N0M0Ny44NSAwLjUyNDY1OCA0Ny4zNjMxIDAgNDYuNzYyNSAwSDQwLjIzNzVDMzkuNjM2OSAwIDM5LjE1IDAuNTI0NjU4IDM5LjE1IDEuMTcxODdWMy4xMjVIMzYuMjVDMzUuNDQ5MiAzLjEyNSAzNC44IDMuODI0NTYgMzQuOCA0LjY4NzVWMTEuNTI4NEwzMi45MDYzIDEyLjE4NDNDMzEuODc1MyAxMi41NDE0IDMxLjU1ODEgMTMuOTUwNiAzMi4zMjQ3IDE0Ljc3NjdMMzUuNDk3MSAxOC4xOTUzQzM0LjcwMTYgMjAuMzI2NSAzMi44NzgyIDIxLjg3NSAzMC4wODc1IDIxLjg3NUMyOS40ODY5IDIxLjg3NSAyOSAyMi4zOTk3IDI5IDIzLjA0NjlWMjMuODI4MUMyOSAyNC40NzUzIDI5LjQ4NjkgMjUgMzAuMDg3NSAyNUMzMi44NTI2IDI1IDM0Ljk1ODUgMjMuOTkzNyAzNi41Nzg5IDIyLjA5OThDMzcuMjMyMiAyMy44MDA0IDM4Ljc4ODUgMjUgNDAuNiAyNUg0Ni40QzQ4LjIxMTYgMjUgNDkuNzY3OCAyMy44MDA0IDUwLjQyMTEgMjIuMDk5OEM1Mi4wNDEyIDIzLjk5MzQgNTQuMTQ3IDI1IDU2LjkxMjUgMjVDNTcuNTEzMSAyNSA1OCAyNC40NzUzIDU4IDIzLjgyODFWMjMuMDQ2OUM1OCAyMi4zOTk3IDU3LjUxMzEgMjEuODc1IDU2LjkxMjUgMjEuODc1QzU0LjE1NjcgMjEuODc1IDUyLjMxMTQgMjAuMzYxMyA1MS41MDI5IDE4LjE5NTNaTTM3LjcgNi4yNUg0OS4zVjEwLjUyNEw0My45NDM3IDguNjY4NzVDNDMuNjU1MiA4LjU2ODggNDMuMzQ0OCA4LjU2ODggNDMuMDU2MyA4LjY2ODc1TDM3LjcgMTAuNTI0VjYuMjVaXCIgZmlsbD1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTIyLjUwMjkgMTguMTk1M0wyNS42NzUzIDE0Ljc3NjdDMjYuNDQxMSAxMy45NTE1IDI2LjEyNTggMTIuNTQxOCAyNS4wOTM3IDEyLjE4NDNMMjMuMiAxMS41Mjg0VjQuNjg3NUMyMy4yIDMuODI0NTYgMjIuNTUwOCAzLjEyNSAyMS43NSAzLjEyNUgxOC44NVYxLjE3MTg4QzE4Ljg1IDAuNTI0NjU4IDE4LjM2MzEgMCAxNy43NjI1IDBIMTEuMjM3NUMxMC42MzY5IDAgMTAuMTUgMC41MjQ2NTggMTAuMTUgMS4xNzE4OFYzLjEyNUg3LjI1QzYuNDQ5MTkgMy4xMjUgNS44IDMuODI0NTYgNS44IDQuNjg3NVYxMS41Mjg0TDMuOTA2MyAxMi4xODQzQzIuODc1MyAxMi41NDE0IDIuNTU4MDcgMTMuOTUwNiAzLjMyNDY3IDE0Ljc3NjdMNi40OTcwOSAxOC4xOTUzQzUuNzAxNTggMjAuMzI2NSAzLjg3ODE2IDIxLjg3NSAxLjA4NzUgMjEuODc1QzAuNDg2ODgzIDIxLjg3NSAwIDIyLjM5OTcgMCAyMy4wNDY5VjIzLjgyODFDMCAyNC40NzUzIDAuNDg2ODgzIDI1IDEuMDg3NSAyNUMzLjg1MjYgMjUgNS45NTg1NSAyMy45OTM3IDcuNTc4ODggMjIuMDk5OEM4LjIzMjI0IDIzLjgwMDQgOS43ODg0NSAyNSAxMS42IDI1SDE3LjRDMTkuMjExNSAyNSAyMC43Njc4IDIzLjgwMDQgMjEuNDIxMSAyMi4wOTk4QzIzLjA0MTIgMjMuOTkzNCAyNS4xNDcgMjUgMjcuOTEyNSAyNUMyOC41MTMxIDI1IDI5IDI0LjQ3NTMgMjkgMjMuODI4MVYyMy4wNDY5QzI5IDIyLjM5OTcgMjguNTEzMSAyMS44NzUgMjcuOTEyNSAyMS44NzVDMjUuMTU2NyAyMS44NzUgMjMuMzExNCAyMC4zNjEzIDIyLjUwMjkgMTguMTk1M1pNOC43IDYuMjVIMjAuM1YxMC41MjRMMTQuOTQzNyA4LjY2ODc1QzE0LjY1NTIgOC41Njg4IDE0LjM0NDggOC41Njg4IDE0LjA1NjMgOC42Njg3NUw4LjcgMTAuNTI0VjYuMjVaXCIgZmlsbD1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8L3N2Zz5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJpLXByaWNlXCI+JHsgcHJpY2UgfTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2E+XHRcblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInJlc3VsdC1pdGVtLWluZm9cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmktdG9wXCI+XG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1uYW1lXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ308L3NwYW4+PGJyPlxuXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktc3ViLW5hbWVcIj4keyB2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnTi9BJyB9PC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLWJvdHRvbVwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1sb2NhdGlvblwiPlx0XG5cdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCIkeyB2ZXNzZWxLZXl3b3JkTG9jYXRpb25MaW5rIH1cIj5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQ8c3ZnIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxOFwiIHZpZXdCb3g9XCIwIDAgMTggMThcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTE1Ljc1IDcuNUMxNS43NSAxMi43NSA5IDE3LjI1IDkgMTcuMjVDOSAxNy4yNSAyLjI1IDEyLjc1IDIuMjUgNy41QzIuMjUgNS43MDk3OSAyLjk2MTE2IDMuOTkyOSA0LjIyNzAzIDIuNzI3MDNDNS40OTI5IDEuNDYxMTYgNy4yMDk3OSAwLjc1IDkgMC43NUMxMC43OTAyIDAuNzUgMTIuNTA3MSAxLjQ2MTE2IDEzLjc3MyAyLjcyNzAzQzE1LjAzODggMy45OTI5IDE1Ljc1IDUuNzA5NzkgMTUuNzUgNy41WlwiIHN0cm9rZT1cIiMwNjdBRURcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk05IDkuNzVDMTAuMjQyNiA5Ljc1IDExLjI1IDguNzQyNjQgMTEuMjUgNy41QzExLjI1IDYuMjU3MzYgMTAuMjQyNiA1LjI1IDkgNS4yNUM3Ljc1NzM2IDUuMjUgNi43NSA2LjI1NzM2IDYuNzUgNy41QzYuNzUgOC43NDI2NCA3Ljc1NzM2IDkuNzUgOSA5Ljc1WlwiIHN0cm9rZT1cIiMwNjdBRURcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG5cdFx0XHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0XHRcdFx0JHsgdmVzc2VsTG9jYXRpb24gfVxuXHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHQ8L3NwYW4+XG5cblx0XHRcdFx0XHRcdDxhIGhyZWY9XCIjeXNwLXlhY2h0LXJlc3VsdHMtbGVhZC1tb2RhbFwiIGNsYXNzPVwicmktY29udGFjdFwiIGRhdGEtbW9kYWw9XCIjeXNwLXlhY2h0LXJlc3VsdHMtbGVhZC1tb2RhbFwiPlxuXHRcdFx0XHRcdFx0XHRDb250YWN0XG5cdFx0XHRcdFx0XHRcdDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiPlxuXHRcdFx0XHRcdFx0XHQ8ZyBjbGlwLXBhdGg9XCJ1cmwoI2NsaXAwXzgxMDFfMTAyNzcpXCI+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNMTUuNTU1NiAwSDUuNzc3OEM1LjUzMjE0IDAgNS4zMzMzNCAwLjE5ODc5MiA1LjMzMzM0IDAuNDQ0NDU4QzUuMzMzMzQgMC42OTAxMjUgNS41MzIxNCAwLjg4ODkxNyA1Ljc3NzggMC44ODg5MTdIMTQuNDgyN0wwLjEzMDIxOSAxNS4yNDEzQy0wLjA0MzQwNjIgMTUuNDE1IC0wLjA0MzQwNjIgMTUuNjk2MiAwLjEzMDIxOSAxNS44Njk4QzAuMjE3MDEgMTUuOTU2NiAwLjMzMDc2IDE2IDAuNDQ0NDY5IDE2QzAuNTU4MTc3IDE2IDAuNjcxODg1IDE1Ljk1NjYgMC43NTg3MTkgMTUuODY5OEwxNS4xMTExIDEuNTE3MzdWMTAuMjIyMkMxNS4xMTExIDEwLjQ2NzkgMTUuMzA5OSAxMC42NjY3IDE1LjU1NTYgMTAuNjY2N0MxNS44MDEzIDEwLjY2NjcgMTYuMDAwMSAxMC40Njc5IDE2LjAwMDEgMTAuMjIyMlYwLjQ0NDQ1OEMxNiAwLjE5ODc5MiAxNS44MDEyIDAgMTUuNTU1NiAwWlwiIGZpbGw9XCIjMDY3QUVEXCIvPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHRcdDxkZWZzPlxuXHRcdFx0XHRcdFx0XHQ8Y2xpcFBhdGggaWQ9XCJjbGlwMF84MTAxXzEwMjc3XCI+XG5cdFx0XHRcdFx0XHRcdDxyZWN0IHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIGZpbGw9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XHRcdFx0PC9jbGlwUGF0aD5cblx0XHRcdFx0XHRcdFx0PC9kZWZzPlxuXHRcdFx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdD1mdW5jdGlvbih2ZXNzZWwpIHtcblx0XHRsZXQgbWV0ZXJzID0gcGFyc2VJbnQodmVzc2VsLk5vbWluYWxMZW5ndGgpICogMC4zMDQ4O1xuXHRcdGxldCBwcmljZSA9ICcnO1xuXHRcdGxldCBsZW5ndGggPSAnJztcblxuXHRcdGlmKHlzcF95YWNodF9zeW5jLmV1cm9wZV9vcHRpb25fcGlja2VkID09IFwieWVzXCIpe1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gdmVzc2VsLlByaWNlID8gYOKCrCAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdCgocGFyc2VJbnQodmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSkgKiB5c3BfeWFjaHRfc3luYy5ldXJvX2NfYykpfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZW5ndGggPSB2ZXNzZWwuTm9taW5hbExlbmd0aCA/IHZlc3NlbC5Ob21pbmFsTGVuZ3RoICsgXCIgLyBcIiArIG1ldGVycy50b0ZpeGVkKDIpICsgJyBtJyA6ICdOL0EnO1xuXHRcdFx0cHJpY2UgPSB2ZXNzZWwuUHJpY2UgPyBgJCAke25ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tdXMnLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMn0pLmZvcm1hdChwYXJzZUludCh2ZXNzZWwuUHJpY2Uuc2xpY2UoMCwgLTMpKSl9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSdcblx0XHR9XG5cblx0XHRsZXQgdmVzc2VsTG9jYXRpb24sIHZlc3NlbEtleXdvcmRMb2NhdGlvbkxpbms7XG5cblx0XHRpZiAodHlwZW9mIHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRCAhPSAndW5kZWZpbmVkJyAmJiB2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUQgIT0gbnVsbCkge1xuXG5cdFx0XHRpZiAodmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUgIT0gJycpIHtcblxuXHRcdCAgICAgICAgdmVzc2VsS2V5d29yZExvY2F0aW9uTGluaz1gL3lhY2h0LXNlYXJjaC95c19rZXl3b3JkLSR7IHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lLnJlcGxhY2UoLyggKS9nLCAnLScpIH1gO1xuXHRcdFx0XHRcblx0XHRcdFx0dmVzc2VsTG9jYXRpb24gPSAodmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEID09IFwiVVNcIiB8fCB2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUQgPT0gXCJVbml0ZWQgU3RhdGVzXCIgPyBgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDaXR5TmFtZS50b0xvd2VyQ2FzZSgpfSwgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRTdGF0ZUNvZGV9YCA6IGAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lLnRvTG93ZXJDYXNlKCl9LCAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRH1gKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdCAgICAgICAgdmVzc2VsS2V5d29yZExvY2F0aW9uTGluaz1gL3lhY2h0LXNlYXJjaC95c19rZXl3b3JkLSR7IHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRC5yZXBsYWNlKC8oICkvZywgJy0nKSB9YDtcblxuXHRcdFx0XHR2ZXNzZWxMb2NhdGlvbiA9IGAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRH1gO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ5c3AteWFjaHQtaXRlbSB5c3Atdmlldy1saXN0XCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJyaS1pbWFnZVwiPlxuXHRcdFx0XHRcdDxhIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXHRcdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LWltYWdlXCIgc3JjPVwiJHt2ZXNzZWwuSW1hZ2VzID8gdmVzc2VsLkltYWdlc1swXS5VcmkgOiB5c3BfeWFjaHRfc3luYy5hc3NldHNfdXJsICsgJ2ltYWdlcy9kZWZhdWx0LXlhY2h0LWltYWdlLmpwZWcnfVwiIGFsdD1cInlhY2h0LWltYWdlXCIgbG9hZGluZz1cImxhenlcIiAvPlxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8c3ZnIHRpdGxlPVwiY29tcGFyZVwiIGNsYXNzPVwibGlrZS1tZSBsb3ZlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNTdcIiBoZWlnaHQ9XCI1NFwiIHZpZXdCb3g9XCIwIDAgNTcgNTRcIiBmaWxsPVwibm9uZVwiICBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlxuXHRcdFx0XHRcdFx0ICA8ZyBmaWx0ZXI9XCJ1cmwoI2ZpbHRlcjBfZF8yODg4XzQzMzMpXCI+XG5cdFx0XHRcdFx0XHQgICAgPHBhdGggZD1cIk0zNC43MDI4IDExLjU3NTVDMzYuMjA5NCAxMS41NzU1IDM3LjYyNTEgMTIuMTY5OSAzOC42ODk4IDEzLjI0ODhMMzguODIyMyAxMy4zODNDNDEuMDIwNiAxNS42MTE2IDQxLjAyMDYgMTkuMjM3NSAzOC44MjIzIDIxLjQ2NkwzOC4wOTkyIDIyLjE5OUwyNy40OTk1IDMyLjk0NDJMMTguNDg4MyAyMy44MDhMMTYuOTAxMSAyMi4xOTlMMTYuMTc4IDIxLjQ2NkMxMy45Nzk3IDE5LjIzNzUgMTMuOTc5NyAxNS42MTE2IDE2LjE3OCAxMy4zODNMMTYuMzA4MyAxMy4yNTA5QzE3LjM3MzkgMTIuMTcwOCAxOC43OSAxMS41NzU5IDIwLjI5NjIgMTEuNTc2NEMyMS44MDIzIDExLjU3NjQgMjMuMjE3NiAxMi4xNzA4IDI0LjI4MTkgMTMuMjQ5MkwyNS4wMDUgMTMuOTgyMkwyNy40OTkxIDE2LjUxMDFMMjkuOTkyOCAxMy45ODE4TDMwLjcxNTggMTMuMjQ4OEMzMS43ODAxIDEyLjE2OTkgMzMuMTk2MiAxMS41NzU1IDM0LjcwMjggMTEuNTc1NVpNMzQuNzAyOCA4QzMyLjM1NyA4IDMwLjAxMTIgOC45MDY4IDI4LjIyMjIgMTAuNzIwNEwyNy40OTkxIDExLjQ1MzRMMjYuNzc2IDEwLjcyMDRDMjQuOTg3OCA4LjkwNzIzIDIyLjY0MiA4LjAwMDQzIDIwLjI5NyA4QzE3Ljk1MDggOCAxNS42MDUgOC45MDcyMyAxMy44MTQ3IDEwLjcyMjFMMTMuNjg0NCAxMC44NTQyQzEwLjEwNDYgMTQuNDgzMiAxMC4xMDQ2IDIwLjM2NDUgMTMuNjg0NCAyMy45OTM1TDE0LjQwNzQgMjQuNzI2NUwxNS45OTQ2IDI2LjMzNTRMMjcuNDk5NSAzOEw0MC41OTMzIDI0LjcyNjVMNDEuMzE2NCAyMy45OTM1QzQ0Ljg5NDUgMjAuMzY2MyA0NC44OTQ1IDE0LjQ4MTQgNDEuMzE2NCAxMC44NTQyTDQxLjE4MzkgMTAuNzJDMzkuMzk0NSA4LjkwNjggMzcuMDQ4NiA4IDM0LjcwMjggOFpcIiBmaWxsPVwid2hpdGVcIj48L3BhdGg+XG5cdFx0XHRcdFx0XHQgIDwvZz5cblx0XHRcdFx0XHRcdCAgPGRlZnM+XG5cdFx0XHRcdFx0XHQgICAgPGZpbHRlciBpZD1cImZpbHRlcjBfZF8yODg4XzQzMzNcIiB4PVwiLTAuMDAwNDg4MjgxXCIgeT1cIjBcIiB3aWR0aD1cIjU3LjAwMDVcIiBoZWlnaHQ9XCI1NFwiIGZpbHRlclVuaXRzPVwidXNlclNwYWNlT25Vc2VcIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9XCJzUkdCXCI+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PVwiMFwiIHJlc3VsdD1cIkJhY2tncm91bmRJbWFnZUZpeFwiPjwvZmVGbG9vZD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUNvbG9yTWF0cml4IGluPVwiU291cmNlQWxwaGFcIiB0eXBlPVwibWF0cml4XCIgdmFsdWVzPVwiMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDBcIiByZXN1bHQ9XCJoYXJkQWxwaGFcIj48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVPZmZzZXQgZHg9XCIxXCIgZHk9XCI0XCI+PC9mZU9mZnNldD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249XCI2XCI+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUNvbXBvc2l0ZSBpbjI9XCJoYXJkQWxwaGFcIiBvcGVyYXRvcj1cIm91dFwiPjwvZmVDb21wb3NpdGU+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPVwibWF0cml4XCIgdmFsdWVzPVwiMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwXCI+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQmxlbmQgbW9kZT1cIm5vcm1hbFwiIGluMj1cIkJhY2tncm91bmRJbWFnZUZpeFwiIHJlc3VsdD1cImVmZmVjdDFfZHJvcFNoYWRvd18yODg4XzQzMzNcIj48L2ZlQmxlbmQ+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVCbGVuZCBtb2RlPVwibm9ybWFsXCIgaW49XCJTb3VyY2VHcmFwaGljXCIgaW4yPVwiZWZmZWN0MV9kcm9wU2hhZG93XzI4ODhfNDMzM1wiIHJlc3VsdD1cInNoYXBlXCI+PC9mZUJsZW5kPlxuXHRcdFx0XHRcdFx0ICAgIDwvZmlsdGVyPlxuXHRcdFx0XHRcdFx0ICA8L2RlZnM+XG5cdFx0XHRcdFx0XHQ8L3N2Zz5cblxuXHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwidG9wLWNvbXBhcmVcIiB0aXRsZT1cImNvbXBhcmVcIj5cblx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY29tcGFyZV90b2dnbGVcIiBuYW1lPVwiY29tcGFyZVwiIHZhbHVlPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIC8+XG5cblx0XHRcdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjU4XCIgaGVpZ2h0PVwiMjVcIiB2aWV3Qm94PVwiMCAwIDU4IDI1XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNNTEuNTAyOSAxOC4xOTUzTDU0LjY3NTMgMTQuNzc2N0M1NS40NDExIDEzLjk1MTUgNTUuMTI1OCAxMi41NDE4IDU0LjA5MzcgMTIuMTg0M0w1Mi4yIDExLjUyODRWNC42ODc1QzUyLjIgMy44MjQ1NiA1MS41NTA4IDMuMTI1IDUwLjc1IDMuMTI1SDQ3Ljg1VjEuMTcxODdDNDcuODUgMC41MjQ2NTggNDcuMzYzMSAwIDQ2Ljc2MjUgMEg0MC4yMzc1QzM5LjYzNjkgMCAzOS4xNSAwLjUyNDY1OCAzOS4xNSAxLjE3MTg3VjMuMTI1SDM2LjI1QzM1LjQ0OTIgMy4xMjUgMzQuOCAzLjgyNDU2IDM0LjggNC42ODc1VjExLjUyODRMMzIuOTA2MyAxMi4xODQzQzMxLjg3NTMgMTIuNTQxNCAzMS41NTgxIDEzLjk1MDYgMzIuMzI0NyAxNC43NzY3TDM1LjQ5NzEgMTguMTk1M0MzNC43MDE2IDIwLjMyNjUgMzIuODc4MiAyMS44NzUgMzAuMDg3NSAyMS44NzVDMjkuNDg2OSAyMS44NzUgMjkgMjIuMzk5NyAyOSAyMy4wNDY5VjIzLjgyODFDMjkgMjQuNDc1MyAyOS40ODY5IDI1IDMwLjA4NzUgMjVDMzIuODUyNiAyNSAzNC45NTg1IDIzLjk5MzcgMzYuNTc4OSAyMi4wOTk4QzM3LjIzMjIgMjMuODAwNCAzOC43ODg1IDI1IDQwLjYgMjVINDYuNEM0OC4yMTE2IDI1IDQ5Ljc2NzggMjMuODAwNCA1MC40MjExIDIyLjA5OThDNTIuMDQxMiAyMy45OTM0IDU0LjE0NyAyNSA1Ni45MTI1IDI1QzU3LjUxMzEgMjUgNTggMjQuNDc1MyA1OCAyMy44MjgxVjIzLjA0NjlDNTggMjIuMzk5NyA1Ny41MTMxIDIxLjg3NSA1Ni45MTI1IDIxLjg3NUM1NC4xNTY3IDIxLjg3NSA1Mi4zMTE0IDIwLjM2MTMgNTEuNTAyOSAxOC4xOTUzWk0zNy43IDYuMjVINDkuM1YxMC41MjRMNDMuOTQzNyA4LjY2ODc1QzQzLjY1NTIgOC41Njg4IDQzLjM0NDggOC41Njg4IDQzLjA1NjMgOC42Njg3NUwzNy43IDEwLjUyNFY2LjI1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk0yMi41MDI5IDE4LjE5NTNMMjUuNjc1MyAxNC43NzY3QzI2LjQ0MTEgMTMuOTUxNSAyNi4xMjU4IDEyLjU0MTggMjUuMDkzNyAxMi4xODQzTDIzLjIgMTEuNTI4NFY0LjY4NzVDMjMuMiAzLjgyNDU2IDIyLjU1MDggMy4xMjUgMjEuNzUgMy4xMjVIMTguODVWMS4xNzE4OEMxOC44NSAwLjUyNDY1OCAxOC4zNjMxIDAgMTcuNzYyNSAwSDExLjIzNzVDMTAuNjM2OSAwIDEwLjE1IDAuNTI0NjU4IDEwLjE1IDEuMTcxODhWMy4xMjVINy4yNUM2LjQ0OTE5IDMuMTI1IDUuOCAzLjgyNDU2IDUuOCA0LjY4NzVWMTEuNTI4NEwzLjkwNjMgMTIuMTg0M0MyLjg3NTMgMTIuNTQxNCAyLjU1ODA3IDEzLjk1MDYgMy4zMjQ2NyAxNC43NzY3TDYuNDk3MDkgMTguMTk1M0M1LjcwMTU4IDIwLjMyNjUgMy44NzgxNiAyMS44NzUgMS4wODc1IDIxLjg3NUMwLjQ4Njg4MyAyMS44NzUgMCAyMi4zOTk3IDAgMjMuMDQ2OVYyMy44MjgxQzAgMjQuNDc1MyAwLjQ4Njg4MyAyNSAxLjA4NzUgMjVDMy44NTI2IDI1IDUuOTU4NTUgMjMuOTkzNyA3LjU3ODg4IDIyLjA5OThDOC4yMzIyNCAyMy44MDA0IDkuNzg4NDUgMjUgMTEuNiAyNUgxNy40QzE5LjIxMTUgMjUgMjAuNzY3OCAyMy44MDA0IDIxLjQyMTEgMjIuMDk5OEMyMy4wNDEyIDIzLjk5MzQgMjUuMTQ3IDI1IDI3LjkxMjUgMjVDMjguNTEzMSAyNSAyOSAyNC40NzUzIDI5IDIzLjgyODFWMjMuMDQ2OUMyOSAyMi4zOTk3IDI4LjUxMzEgMjEuODc1IDI3LjkxMjUgMjEuODc1QzI1LjE1NjcgMjEuODc1IDIzLjMxMTQgMjAuMzYxMyAyMi41MDI5IDE4LjE5NTNaTTguNyA2LjI1SDIwLjNWMTAuNTI0TDE0Ljk0MzcgOC42Njg3NUMxNC42NTUyIDguNTY4OCAxNC4zNDQ4IDguNTY4OCAxNC4wNTYzIDguNjY4NzVMOC43IDEwLjUyNFY2LjI1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XHRcdFx0PC9zdmc+XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDwvbGFiZWw+XG5cblx0XHRcdFx0XHRcdCR7dmVzc2VsLkNvbXBhbnlOYW1lID09PSB5c3BfeWFjaHRfc3luYy5jb21wYW55X25hbWUgPyBgPGRpdiBjbGFzcz1cImNvbXBhbnktYmFubmVyXCI+PGltZyBzcmM9XCIke3lzcF95YWNodF9zeW5jLmNvbXBhbnlfbG9nb31cIj48L2Rpdj5gIDogJyd9XG5cdFx0XHRcdFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1wcmljZVwiPiR7IHByaWNlIH08L3NwYW4+XG5cdFx0XHRcdFx0PC9hPlx0XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJyZXN1bHQtaXRlbS1pbmZvXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLXRvcFwiPlxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktbmFtZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9PC9zcGFuPjxiciAvPlxuXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktc3ViLW5hbWVcIj4keyB2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnTi9BJyB9PC9zcGFuPjxiciAvPlxuXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktbG9jYXRpb25cIj5cdFx0XG5cdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbEtleXdvcmRMb2NhdGlvbkxpbmsgfVwiPlx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdDxzdmcgd2lkdGg9XCIxOFwiIGhlaWdodD1cIjE4XCIgdmlld0JveD1cIjAgMCAxOCAxOFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk0xNS43NSA3LjVDMTUuNzUgMTIuNzUgOSAxNy4yNSA5IDE3LjI1QzkgMTcuMjUgMi4yNSAxMi43NSAyLjI1IDcuNUMyLjI1IDUuNzA5NzkgMi45NjExNiAzLjk5MjkgNC4yMjcwMyAyLjcyNzAzQzUuNDkyOSAxLjQ2MTE2IDcuMjA5NzkgMC43NSA5IDAuNzVDMTAuNzkwMiAwLjc1IDEyLjUwNzEgMS40NjExNiAxMy43NzMgMi43MjcwM0MxNS4wMzg4IDMuOTkyOSAxNS43NSA1LjcwOTc5IDE1Ljc1IDcuNVpcIiBzdHJva2U9XCIjMDY3QUVEXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk05IDkuNzVDMTAuMjQyNiA5Ljc1IDExLjI1IDguNzQyNjQgMTEuMjUgNy41QzExLjI1IDYuMjU3MzYgMTAuMjQyNiA1LjI1IDkgNS4yNUM3Ljc1NzM2IDUuMjUgNi43NSA2LjI1NzM2IDYuNzUgNy41QzYuNzUgOC43NDI2NCA3Ljc1NzM2IDkuNzUgOSA5Ljc1WlwiIHN0cm9rZT1cIiMwNjdBRURcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0XHRcdFx0XHRcdCR7IHZlc3NlbExvY2F0aW9uIH1cblx0XHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyaS1ib3R0b21cIj5cblx0XHRcdFx0XHRcdDxzcGFuPlxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDwvc3Bhbj5cblxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cIiN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsXCIgY2xhc3M9XCJyaS1jb250YWN0XCIgZGF0YS1tb2RhbD1cIiN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsXCI+XG5cdFx0XHRcdFx0XHRcdENvbnRhY3Rcblx0XHRcdFx0XHRcdFx0PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCI+XG5cdFx0XHRcdFx0XHRcdDxnIGNsaXAtcGF0aD1cInVybCgjY2xpcDBfODEwMV8xMDI3NylcIj5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk0xNS41NTU2IDBINS43Nzc4QzUuNTMyMTQgMCA1LjMzMzM0IDAuMTk4NzkyIDUuMzMzMzQgMC40NDQ0NThDNS4zMzMzNCAwLjY5MDEyNSA1LjUzMjE0IDAuODg4OTE3IDUuNzc3OCAwLjg4ODkxN0gxNC40ODI3TDAuMTMwMjE5IDE1LjI0MTNDLTAuMDQzNDA2MiAxNS40MTUgLTAuMDQzNDA2MiAxNS42OTYyIDAuMTMwMjE5IDE1Ljg2OThDMC4yMTcwMSAxNS45NTY2IDAuMzMwNzYgMTYgMC40NDQ0NjkgMTZDMC41NTgxNzcgMTYgMC42NzE4ODUgMTUuOTU2NiAwLjc1ODcxOSAxNS44Njk4TDE1LjExMTEgMS41MTczN1YxMC4yMjIyQzE1LjExMTEgMTAuNDY3OSAxNS4zMDk5IDEwLjY2NjcgMTUuNTU1NiAxMC42NjY3QzE1LjgwMTMgMTAuNjY2NyAxNi4wMDAxIDEwLjQ2NzkgMTYuMDAwMSAxMC4yMjIyVjAuNDQ0NDU4QzE2IDAuMTk4NzkyIDE1LjgwMTIgMCAxNS41NTU2IDBaXCIgZmlsbD1cIiMwNjdBRURcIi8+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdFx0XHRcdDxjbGlwUGF0aCBpZD1cImNsaXAwXzgxMDFfMTAyNzdcIj5cblx0XHRcdFx0XHRcdFx0PHJlY3Qgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgZmlsbD1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8L2NsaXBQYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2RlZnM+XG5cdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0XG5cdFx0YDtcblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0LmNvbXBhcmVfcHJldmlldyA9IGZ1bmN0aW9uKHZlc3NlbCwgcGFyYW1zKSB7XG5cblx0XHRyZXR1cm4gYFxuXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieXNwLXlhY2h0LWNvbXBhcmUtcHJldmlld1wiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlx0XHRcdFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJlbW92ZS1mcm9tLWNvbXBhcmVcIj5cblx0XHRcdFx0XHQ8c3ZnIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHRcdFx0XHQ8cmVjdCB4PVwiMC41XCIgeT1cIjAuNVwiIHdpZHRoPVwiMjNcIiBoZWlnaHQ9XCIyM1wiIHJ4PVwiMTEuNVwiIHN0cm9rZT1cIiNGRkZGRkZcIi8+XG5cdFx0XHRcdFx0PHBhdGggZD1cIk04LjI2ODc2IDE0LjkzNDZDOC4wNDkwOSAxNS4xNTQzIDguMDQ5MDkgMTUuNTEwNCA4LjI2ODc2IDE1LjczMDFDOC40ODg0MyAxNS45NDk4IDguODQ0NTggMTUuOTQ5OCA5LjA2NDI1IDE1LjczMDFMOC4yNjg3NiAxNC45MzQ2Wk0xMi4zOTc2IDEyLjM5NjhDMTIuNjE3MyAxMi4xNzcxIDEyLjYxNzMgMTEuODIwOSAxMi4zOTc2IDExLjYwMTNDMTIuMTc3OSAxMS4zODE2IDExLjgyMTggMTEuMzgxNiAxMS42MDIxIDExLjYwMTNMMTIuMzk3NiAxMi4zOTY4Wk0xMS42MDE4IDExLjYwMTZDMTEuMzgyMSAxMS44MjEzIDExLjM4MjEgMTIuMTc3NCAxMS42MDE4IDEyLjM5NzFDMTEuODIxNCAxMi42MTY4IDEyLjE3NzYgMTIuNjE2OCAxMi4zOTczIDEyLjM5NzFMMTEuNjAxOCAxMS42MDE2Wk0xNS43MzA2IDkuMDYzNzZDMTUuOTUwMyA4Ljg0NDA5IDE1Ljk1MDMgOC40ODc5NCAxNS43MzA2IDguMjY4MjdDMTUuNTEwOSA4LjA0ODYgMTUuMTU0OCA4LjA0ODYgMTQuOTM1MSA4LjI2ODI3TDE1LjczMDYgOS4wNjM3NlpNMTIuMzk3MyAxMS42MDEzQzEyLjE3NzYgMTEuMzgxNiAxMS44MjE0IDExLjM4MTYgMTEuNjAxOCAxMS42MDEzQzExLjM4MjEgMTEuODIwOSAxMS4zODIxIDEyLjE3NzEgMTEuNjAxOCAxMi4zOTY4TDEyLjM5NzMgMTEuNjAxM1pNMTQuOTM1MSAxNS43MzAxQzE1LjE1NDggMTUuOTQ5OCAxNS41MTA5IDE1Ljk0OTggMTUuNzMwNiAxNS43MzAxQzE1Ljk1MDMgMTUuNTEwNCAxNS45NTAzIDE1LjE1NDMgMTUuNzMwNiAxNC45MzQ2TDE0LjkzNTEgMTUuNzMwMVpNMTEuNjAyMSAxMi4zOTcxQzExLjgyMTggMTIuNjE2OCAxMi4xNzc5IDEyLjYxNjggMTIuMzk3NiAxMi4zOTcxQzEyLjYxNzMgMTIuMTc3NCAxMi42MTczIDExLjgyMTMgMTIuMzk3NiAxMS42MDE2TDExLjYwMjEgMTIuMzk3MVpNOS4wNjQyNSA4LjI2ODI3QzguODQ0NTggOC4wNDg2IDguNDg4NDMgOC4wNDg2IDguMjY4NzYgOC4yNjgyN0M4LjA0OTA5IDguNDg3OTQgOC4wNDkwOSA4Ljg0NDA5IDguMjY4NzYgOS4wNjM3Nkw5LjA2NDI1IDguMjY4MjdaTTkuMDY0MjUgMTUuNzMwMUwxMi4zOTc2IDEyLjM5NjhMMTEuNjAyMSAxMS42MDEzTDguMjY4NzYgMTQuOTM0Nkw5LjA2NDI1IDE1LjczMDFaTTEyLjM5NzMgMTIuMzk3MUwxNS43MzA2IDkuMDYzNzZMMTQuOTM1MSA4LjI2ODI3TDExLjYwMTggMTEuNjAxNkwxMi4zOTczIDEyLjM5NzFaTTExLjYwMTggMTIuMzk2OEwxNC45MzUxIDE1LjczMDFMMTUuNzMwNiAxNC45MzQ2TDEyLjM5NzMgMTEuNjAxM0wxMS42MDE4IDEyLjM5NjhaTTEyLjM5NzYgMTEuNjAxNkw5LjA2NDI1IDguMjY4MjdMOC4yNjg3NiA5LjA2Mzc2TDExLjYwMjEgMTIuMzk3MUwxMi4zOTc2IDExLjYwMTZaXCIgZmlsbD1cIiNGRkZGRkZcIi8+XG5cdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdDwvc3Bhbj5cblxuXHRcdFx0XHQ8YSBjbGFzcz1cInByZXZpZXctbGlua1wiIGhyZWY9XCIkeyB2ZXNzZWwuX2xpbmsgfVwiPlxuXG5cdFx0XHRcdFx0PGltZyBjbGFzcz1cInlhY2h0LW1haW4taW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHlzcF95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cdFx0XHRcdFxuXHRcdFx0XHRcdDxoNiBjbGFzcz1cInlhY2h0LXRpdGxlXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ30gJHt2ZXNzZWwuQm9hdE5hbWUgPyB2ZXNzZWwuQm9hdE5hbWUgOiAnJ308L2g2PlxuXHRcdFx0XHQ8L2E+XG5cblx0XHRcdDwvZGl2PlxuXG5cdFx0YDtcblxuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzPWZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxiPk5vIFJlc3VsdHM8L2I+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgIH07XG5cblxuICAgIHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnID0gZnVuY3Rpb24obGFiZWwsIHZhbHVlKSB7XG5cbiAgICBcdHJldHVybiBgXG4gICAgXHRcdDxzcGFuPlxuXHQgICAgXHRcdCR7dmFsdWV9XG5cblx0ICAgIFx0XHQ8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjhcIiBoZWlnaHQ9XCI4XCIgdmlld0JveD1cIjAgMCA4IDhcIiBmaWxsPVwibm9uZVwiPlxuXHRcdFx0XHQ8cGF0aCBkPVwiTTAuMjE5NzU0IDAuMjIwMTIxQzAuMjg5MzE5IDAuMTUwNDU3IDAuMzcxOTM2IDAuMDk1MTkwMiAwLjQ2Mjg3OCAwLjA1NzQ4MjdDMC41NTM4MjEgMC4wMTk3NzUyIDAuNjUxMzA1IDAuMDAwMzY2MjExIDAuNzQ5NzU0IDAuMDAwMzY2MjExQzAuODQ4MjA0IDAuMDAwMzY2MjExIDAuOTQ1Njg4IDAuMDE5Nzc1MiAxLjAzNjYzIDAuMDU3NDgyN0MxLjEyNzU3IDAuMDk1MTkwMiAxLjIxMDE5IDAuMTUwNDU3IDEuMjc5NzUgMC4yMjAxMjFMMy45OTk3NSAyLjkzOTEyTDYuNzE5NzUgMC4yMjAxMjFDNi43ODkzNiAwLjE1MDUyIDYuODcxOTggMC4wOTUzMDk4IDYuOTYyOTIgMC4wNTc2NDIyQzcuMDUzODYgMC4wMTk5NzQ2IDcuMTUxMzIgMC4wMDA1ODc0NjUgNy4yNDk3NSAwLjAwMDU4NzQ2M0M3LjM0ODE4IDAuMDAwNTg3NDYxIDcuNDQ1NjUgMC4wMTk5NzQ3IDcuNTM2NTkgMC4wNTc2NDIyQzcuNjI3NTMgMC4wOTUzMDk4IDcuNzEwMTUgMC4xNTA1MiA3Ljc3OTc1IDAuMjIwMTIxQzcuODQ5MzUgMC4yODk3MjEgNy45MDQ1NiAwLjM3MjM0OSA3Ljk0MjIzIDAuNDYzMjg3QzcuOTc5OSAwLjU1NDIyNCA3Ljk5OTI5IDAuNjUxNjkxIDcuOTk5MjkgMC43NTAxMjFDNy45OTkyOSAwLjg0ODU1MSA3Ljk3OTkgMC45NDYwMTcgNy45NDIyMyAxLjAzNjk1QzcuOTA0NTYgMS4xMjc4OSA3Ljg0OTM1IDEuMjEwNTIgNy43Nzk3NSAxLjI4MDEyTDUuMDYwNzUgNC4wMDAxMkw3Ljc3OTc1IDYuNzIwMTJDNy45MjAzMiA2Ljg2MDY5IDcuOTk5MjkgNy4wNTEzMyA3Ljk5OTI5IDcuMjUwMTJDNy45OTkyOSA3LjQ0ODkxIDcuOTIwMzIgNy42Mzk1NiA3Ljc3OTc1IDcuNzgwMTJDNy42MzkxOSA3LjkyMDY5IDcuNDQ4NTQgNy45OTk2NSA3LjI0OTc1IDcuOTk5NjVDNy4wNTA5NyA3Ljk5OTY1IDYuODYwMzIgNy45MjA2OSA2LjcxOTc1IDcuNzgwMTJMMy45OTk3NSA1LjA2MTEyTDEuMjc5NzUgNy43ODAxMkMxLjEzOTE5IDcuOTIwNjkgMC45NDg1NDMgNy45OTk2NSAwLjc0OTc1NCA3Ljk5OTY1QzAuNTUwOTY2IDcuOTk5NjUgMC4zNjAzMTkgNy45MjA2OSAwLjIxOTc1NCA3Ljc4MDEyQzAuMDc5MTg5NyA3LjYzOTU2IDAuMDAwMjIxMjUyIDcuNDQ4OTEgMC4wMDAyMjEyNTIgNy4yNTAxMkMwLjAwMDIyMTI1MiA3LjA1MTMzIDAuMDc5MTg5NyA2Ljg2MDY5IDAuMjE5NzU0IDYuNzIwMTJMMi45Mzg3NSA0LjAwMDEyTDAuMjE5NzU0IDEuMjgwMTJDMC4xNTAwOSAxLjIxMDU2IDAuMDk0ODI0IDEuMTI3OTQgMC4wNTcxMTY1IDEuMDM3QzAuMDE5NDA5IDAuOTQ2MDU0IDAgMC44NDg1NyAwIDAuNzUwMTIxQzAgMC42NTE2NzEgMC4wMTk0MDkgMC41NTQxODcgMC4wNTcxMTY1IDAuNDYzMjQ0QzAuMDk0ODI0IDAuMzcyMzAyIDAuMTUwMDkgMC4yODk2ODYgMC4yMTk3NTQgMC4yMjAxMjFaXCIgZmlsbD1cIiMyRDM3NDhcIi8+XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0PC9zcGFuPlxuICAgIFx0YDtcbiAgICB9O1xuXG4gICAgeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uID0ge307XG4gICAgXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ubmV4dF90ZXh0ID0gYD5gO1xuXG4gICAgXHR5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24ucHJldl90ZXh0ID0gYDxgO1xuXG4iLCJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG5cdGxldCBlbGVfcXVpY2tfc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC1xdWljay1zZWFyY2gtZm9ybScpO1xuXG5cdGlmIChlbGVfcXVpY2tfc2VhcmNoKSB7XG5cdFx0Ly8gRmlsbCBvcHRpb25zXG5cdCAgICBsZXQgRmlsbE9wdGlvbnM9W107XG5cdCAgICBsZXQgc2VsZWN0b3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXNwLXF1aWNrLXNlYXJjaC1mb3JtIHNlbGVjdFtkYXRhLWZpbGwtb3B0aW9uc11cIik7XG5cblx0ICAgIHNlbGVjdG9yRWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgRmlsbE9wdGlvbnMucHVzaChlbGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtb3B0aW9ucycpKTtcblx0ICAgIH0pO1xuXHQgICAgXG5cdCAgICB5c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2Ryb3Bkb3duLW9wdGlvbnMnLCB7bGFiZWxzOiBGaWxsT3B0aW9uc30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblx0ICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG5cdCAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIueXNwLXF1aWNrLXNlYXJjaC1mb3JtIHNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXHQgICAgICAgICAgICBsZXQgbmFtZSA9IFNlbGVjdG9yRWxlWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG5cdCAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblx0ICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuXHQgICAgICAgICAgICAgICAgXHRsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuXHQgICAgICAgICAgICAgICAgXHRcdGlmICh0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbi50ZXh0ID0gYi50O1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiLnY7XG5cdCAgICAgICAgICAgICAgICBcdFx0fVxuXHQgICAgICAgICAgICAgICAgXHRcdGVsc2Uge1xuXHRcdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG5cdFx0XHQgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cdCAgICAgICAgICAgICAgICBcdFx0fVxuXG5cblx0ICAgICAgICAgICAgICAgICAgICBlbGUuYWRkKG9wdGlvbik7XG5cdCAgICAgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgbGV0IFVSTFJFRiA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG5cdCAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG5cdCAgICAgICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuXHQgICAgICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHlzcF95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cblx0ICAgICAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG5cdCAgICAgICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG5cdCAgICAgICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG5cdCAgICAgICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuXHQgICAgICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzLmpvaW4oJyAnKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIGlmIChVcmxWYWwgIT0gJycgJiYgVXJsVmFsICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFVybFZhbCk7XG5cblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVXJsVmFsID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgVXJsVmFsID0gVXJsVmFsLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWw7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXG5cblx0ICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuXHQgICAgICAgICAgICBjb25zb2xlLmxvZyggcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdKTtcblxuXHQgICAgICAgICAgICBpZiAoaGFzUHJldHR5ICE9ICcnICYmIGhhc1ByZXR0eSAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHk7IFxuXHQgICAgICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdH1cbn0pOyIsImZ1bmN0aW9uIHlzcF9tYWtlU2VhcmNoVGFncyggZGF0YSApIHtcblxuXHRsZXQgdGFnc0VsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3Atc2VhcmNoLXRhZ3MnKTtcbiAgICAgICAgXG4gICAgaWYgKHRhZ3NFbGUpIHtcbiAgICAgICAgdGFnc0VsZS5mb3JFYWNoKGZ1bmN0aW9uKHRlKSB7XG4gICAgICAgICAgICB0ZS5pbm5lckhUTUw9XCJcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgeXNwX3RhZ3Nfbm90X3ByaW50ID0gWydwYWdlX2luZGV4JywgJyddO1xuXG4gICAgICAgIGZvciAobGV0IHBhcmFtS2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbD0nJztcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj0nKyBwYXJhbUtleSArJ10nKSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGFiZWw9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPScrIHBhcmFtS2V5ICsnXScpLmlubmVyVGV4dDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltuYW1lPScrIHBhcmFtS2V5ICsnXScpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5oYXNBdHRyaWJ1dGUoJ2xhYmVsJykpIHtcblxuICAgICAgICAgICAgICAgIGxhYmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKS5nZXRBdHRyaWJ1dGUoJ2xhYmVsJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0YWdzRWxlLmZvckVhY2goZnVuY3Rpb24odGUpIHtcblxuICAgICAgICAgICAgICAgIGlmICh5c3BfdGFnc19ub3RfcHJpbnQuaW5kZXhPZiggcGFyYW1LZXkgKSA9PSAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lPScrIHBhcmFtS2V5ICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGFnRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWdWYWwgPSBkYXRhW3BhcmFtS2V5XTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVJbnB1dC50YWdOYW1lID09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9IGVsZUlucHV0Lm9wdGlvbnNbIGVsZUlucHV0LnNlbGVjdGVkSW5kZXggXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdwcmljZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9ICckJyt0YWdWYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtS2V5Lm1hdGNoKCdsZW5ndGgnKSAmJiBwYXJhbUtleSAhPSAnbGVuZ3RodW5pdCcpICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZVVuaXQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBbbmFtZT1sZW5ndGh1bml0XTpjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBlbGVVbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlVW5pdCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIFtuYW1lPWxlbmd0aHVuaXRdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnVmFsID0gdGFnVmFsICsnICc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZVVuaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCArPSBlbGVVbml0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmNsYXNzTmFtZSA9ICdidG4gYnRuLXByaW1hcnkgYnRuLXNtIHlzcC10YWcnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBsYWJlbCAhPSBudWxsICYmIGxhYmVsICE9ICdudWxsJyAmJiBsYWJlbCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcobGFiZWwsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYWdFbGUuaW5uZXJIVE1MID0geXNwX3RlbXBsYXRlcy55YWNodF90YWcoJycsIHRhZ1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLnNldEF0dHJpYnV0ZSgna2V5JywgcGFyYW1LZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlLmFwcGVuZENoaWxkKCBuZXdUYWdFbGUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygoJy55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3Bhbi55c3AtdGFnW2tleT1cIicrIHBhcmFtS2V5ICsnXCJdJykuZm9yRWFjaChmdW5jdGlvbih5c3BUYWdFbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5c3BUYWdFbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgna2V5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dEVsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIHNlbGVjdFtuYW1lPScrIGtleSArJ10sIC55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT0nKyBrZXkgKyddJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0RWxlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGVsZUkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVsZUkudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoZWxlSS50eXBlID09ICdjaGVja2JveCcgfHwgZWxlSS50eXBlID09ICdyYWRpbycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZUkuY2hlY2tlZD1mYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlSS52YWx1ZT0nJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZXNbMF0uZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZnVuY3Rpb24geXNwX21hcmtMb3ZlZFZlc3NlbCggZWxlX2NhcmQgKSB7XG5cbiAgICBqUXVlcnkoJy5sb3ZlJywgZWxlX2NhcmQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2xvdmVkJyk7XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBqUXVlcnkodGhpcykuZGF0YSgneWFjaHQtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2xvdmVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5c3BfcmVtb3ZlTG92ZWRWZXNzZWwoeWFjaHRJZCk7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB5c3BfZ2V0X2Zvcm1fZGF0YShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcy55c195YWNodHNfbG92ZWQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBlbGVfY2FyZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgIT0gXCJcIikge1xuXG4gICAgICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCd5YWNodC1pZCcpO1xuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApICE9IC0xKSB7XG5cbiAgICAgICAgICAgIGVsZV9jYXJkLmFkZENsYXNzKCdsb3ZlZCcpO1xuXG4gICAgICAgICAgICBqUXVlcnkoJy5sb3ZlJywgZWxlX2NhcmQpLmFkZENsYXNzKCdsb3ZlZCcpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHlzcF9hZGRMb3ZlZFZlc3NlbCggeWFjaHRJZCApIHtcblxuICAgIGxldCBsb3ZlZFZlc3NlbHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpKTtcblxuXG4gICAgICAgIGlmIChsb3ZlZFZlc3NlbHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgbG92ZWRWZXNzZWxzID0gW107XG4gICAgICAgIH1cblxuICAgIGlmIChsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApID09IC0xKSB7XG5cbiAgICAgICAgbG92ZWRWZXNzZWxzLnB1c2goeWFjaHRJZCk7XG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGFscmVhZHkgYWRkZWRcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhsb3ZlZFZlc3NlbHMgKTtcbiAgICBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInlzcF9sb3ZlZF92ZXNzZWxzXCIsIEpTT04uc3RyaW5naWZ5KGxvdmVkVmVzc2VscykpO1xuXG59IFxuXG5mdW5jdGlvbiB5c3BfcmVtb3ZlTG92ZWRWZXNzZWwoIHlhY2h0SWQgKSB7XG5cbiAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICBsZXQgaW5kZXhlZCA9IGxvdmVkVmVzc2Vscy5pbmRleE9mKCB5YWNodElkICk7XG5cbiAgICBjb25zb2xlLmxvZyhpbmRleGVkKTtcblxuICAgIGlmIChpbmRleGVkICE9IC0xKSB7XG5cbiAgICAgICAgZGVsZXRlIGxvdmVkVmVzc2Vsc1tpbmRleGVkXTsgICAgICAgIFxuICAgICAgICBsb3ZlZFZlc3NlbHMuc3BsaWNlKGluZGV4ZWQsIDEpO1xuXG5cblxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gYWxyZWFkeSBhZGRlZFxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGxvdmVkVmVzc2VscyApO1xuICAgIFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwieXNwX2xvdmVkX3Zlc3NlbHNcIiwgSlNPTi5zdHJpbmdpZnkobG92ZWRWZXNzZWxzKSk7XG5cbn0iLCJ2YXIgWVNQX1Zlc3NlbENvbXBhcmVMaXN0PVtdO1xuXG5cbmZ1bmN0aW9uIHlzcF9yZXN0b3JlQ29tcGFyZXMoKSB7XG4gICAgbGV0IFVSTFJFRj1uZXcgVVJMKGxvY2F0aW9uLmhyZWYpOyAvLyBtYXliZSBmb3IgYSByZS1kb1xuICAgIGxldCBjb21wYXJlX3Bvc3RfaWRzID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoICdyZXN0b3JlX3RvX2NvbXBhcmUnICk7IFxuXG4gICAgY29uc29sZS5sb2codHlwZW9mIGNvbXBhcmVfcG9zdF9pZHMpO1xuICAgIGNvbnNvbGUubG9nKGNvbXBhcmVfcG9zdF9pZHMpO1xuXG4gICAgaWYgKHR5cGVvZiBjb21wYXJlX3Bvc3RfaWRzID09ICdzdHJpbmcnKSB7XG4gICAgICAgIFlTUF9WZXNzZWxDb21wYXJlTGlzdCA9IGNvbXBhcmVfcG9zdF9pZHMuc3BsaXQoJywnKTtcbiAgICBcblxuICAgICAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG4gICAgfVxuXG5cblxufVxuXG5cbmZ1bmN0aW9uIHlzcF9tYWtlQ29tcGFyZVZlc3NlbChlbGVfY2FyZCkge1xuXHQgXG5cdCBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xuXHQgXHRjb25zb2xlLmxvZygnaG93ZHknKTtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgICAgIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3Bvc3QtaWQnKTtcbiAgICBcbiAgICAgICAgaWYgKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoJ2FybWVkJykgKSB7XG4gICAgICAgICAgICB5c3BfYWRkVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgncG9zdC1pZCcpO1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkICkgIT0gLTEgIHx8IFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkLnRvU3RyaW5nKCkgKSAhPSAtMSApIHtcblxuICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8gd29ybGQgcmVzdG9yZWQnKTtcblxuICAgICAgICBlbGVfY2FyZC5hZGRDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICBqUXVlcnkoJy5jb21wYXJlX3RvZ2dsZScsIGVsZV9jYXJkKS5hZGRDbGFzcygnYXJtZWQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24geXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCkge1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkICkgPT0gLTEpIHtcblxuICAgIFx0WVNQX1Zlc3NlbENvbXBhcmVMaXN0LnB1c2goeWFjaHRJZCk7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG59XG4gICAgXG5mdW5jdGlvbiB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKSB7XG5cdGxldCBpbmRleGVkID0gWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmluZGV4T2YoIHlhY2h0SWQgKVxuXG5cdGlmICggaW5kZXhlZCAhPSAtMSkge1xuXG4gICAgXHRkZWxldGUgWVNQX1Zlc3NlbENvbXBhcmVMaXN0W2luZGV4ZWRdOyAgICAgICAgXG4gICAgICAgIFlTUF9WZXNzZWxDb21wYXJlTGlzdC5zcGxpY2UoaW5kZXhlZCwgMSk7XG4gIFx0XHRcbiAgICAgICAgXG4gICAgfVxuXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuXG5mdW5jdGlvbiB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCkge1xuXG4gICAgaWYgKFlTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGggPj0gMikge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXQnKS5ocmVmPXlzcF95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wieXNwL2NvbXBhcmUvP3Bvc3RJRD1cIitZU1BfVmVzc2VsQ29tcGFyZUxpc3Quam9pbignLCcpO1xuICAgIFx0ICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykuaW5uZXJIVE1MPWA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInlzcC1nZW5lcmFsLWJ1dHRvblwiPkNvbXBhcmUgKCAke1lTUF9WZXNzZWxDb21wYXJlTGlzdC5sZW5ndGh9ICk8L2J1dHRvbj5gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0X21vYmlsZScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dF9tb2JpbGUnKS5ocmVmPXlzcF95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wieXNwL2NvbXBhcmUvP3Bvc3RJRD1cIitZU1BfVmVzc2VsQ29tcGFyZUxpc3Quam9pbignLCcpO1xuICAgIFx0ICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0X21vYmlsZScpLmlubmVySFRNTD1gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ5c3AtZ2VuZXJhbC1idXR0b25cIj5Db21wYXJlICggJHtZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RofSApPC9idXR0b24+YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICdwb3N0X19pbic6IFlTUF9WZXNzZWxDb21wYXJlTGlzdCxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4geXNwX2FwaS5jYWxsX2FwaShcIlBPU1RcIiwgXCJ5YWNodHNcIiwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgIGRhdGFfcmVzdWx0LnJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQuY29tcGFyZV9wcmV2aWV3KGl0ZW0sIHBhcmFtcykgKTtcblxuICAgICAgICAgICAgICAgIGxldCBlbGVfcHJldmlldyA9IGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzICpbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5yZW1vdmUtZnJvbS1jb21wYXJlJywgZWxlX3ByZXZpZXcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJ2RpdltkYXRhLXBvc3QtaWQ9JysgaXRlbS5fcG9zdElEICsnXSAuY29tcGFyZV90b2dnbGUnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnJlbW92ZUNsYXNzKCdhcm1lZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF9yZW1vdmVWZXNzZWxUb0NvbXBhcmVMaXN0KGl0ZW0uX3Bvc3RJRCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcblxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLWNvbXBhcmUtcHJldmlld3MnKS5odG1sKCc8c3BhbiBzdHlsZT1cImNvbG9yOiAjZmZmO1wiPlBpY2sgdHdvIHRvIGNvbXBhcmUuPC9zcGFuPicpO1xuICAgICAgICBqUXVlcnkoJyN5c3BfY29tcGFyZV9saW5rb3V0JykuaHRtbCgnJyk7XG4gICAgICAgIGpRdWVyeSgnI3lzcF9jb21wYXJlX2xpbmtvdXRfbW9iaWxlJykuaHRtbCgnJyk7XG4gICAgfVxuXG5cbiAgICBcblxuXG5cbn1cbiIsImNvbnN0IHlzcEJlZm9yZVlhY2h0U2VhcmNoID0gbmV3IEV2ZW50KFwieXNwLWJlZm9yZS1zdWJtaXR0aW5nLXlhY2h0LXNlYXJjaFwiKTtcbmNvbnN0IHlzcEFmdGVyWWFjaHRTZWFyY2ggPSBuZXcgRXZlbnQoXCJ5c3AtYWZ0ZXItc3VibWl0dGluZy15YWNodC1zZWFyY2hcIik7XG5jb25zdCB5c3BBZnRlclJlbmRlcmluZ1lhY2h0ID0gbmV3IEV2ZW50KFwieXNwLWFmdGVyLXJlbmRlcmluZy15YWNodC1zZWFyY2hcIik7XG5cbmZ1bmN0aW9uIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlcihkYXRhKSB7XG5cbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmh0bWwoJycpO1xuICAgIGpRdWVyeSgnI3lzcC15YWNodC1yZXN1bHRzLXBhZ2luYXRpb24nKS5odG1sKCcnKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AteWFjaHQtcmVzdWx0cy1zZWN0aW9uJykuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGVkJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC15YWNodC1yZXN1bHRzLXNlY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJyk7XG5cbiAgICB5c3Bfc2V0X2Zvcm1fdG9fZGF0YSggZGF0YSApO1xuXG4gICAgeXNwX21ha2VTZWFyY2hUYWdzKCBkYXRhICk7XG5cbiAgICAvLyBHRVQgQU5EIFdSSVRFXG4gICAgcmV0dXJuIHlzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIGRhdGEpLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXlhY2h0LXJlc3VsdHMtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC15YWNodC1yZXN1bHRzLXNlY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcblxuICAgICAgICBkb2N1bWVudC50aXRsZSA9IGRhdGFfcmVzdWx0LlNFTy50aXRsZTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwLXNlYXJjaC1oZWFkaW5nJykudGV4dChkYXRhX3Jlc3VsdC5TRU8uaGVhZGluZyk7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1zZWFyY2gtcGFyYWdyYXBoJykudGV4dChkYXRhX3Jlc3VsdC5TRU8ucCk7XG5cbiAgICAgICAgalF1ZXJ5KCcjeXNwLXRvdGFsLXlhY2h0LXJlc3VsdHMnKS50ZXh0KG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tSU4nLCB7IG1heGltdW1TaWduaWZpY2FudERpZ2l0czogMyB9KS5mb3JtYXQoZGF0YV9yZXN1bHQudG90YWwpKTtcblxuICAgICAgICBsZXQgY3VycmVudFVSTD1udWxsO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5kb250X3B1c2ggPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVUkw9eXNwX3B1c2hfaGlzdG9yeSggZGF0YSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFVSTCA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChkYXRhX3Jlc3VsdC50b3RhbCA+IDApIHtcblxuICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykucmVtb3ZlQ2xhc3MoWyd2aWV3LWdyaWQnLCAndmlldy1saXN0J10pO1xuXG4gICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnZpZXcgIT0gJ3VuZGVmaW5lZCcgJiYgZGF0YS52aWV3LnRvTG93ZXJDYXNlKCkgPT0gJ2xpc3QnKSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYWRkQ2xhc3MoJ3ZpZXctbGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYWRkQ2xhc3MoJ3ZpZXctZ3JpZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS52aWV3ICE9ICd1bmRlZmluZWQnICYmIGRhdGEudmlldy50b0xvd2VyQ2FzZSgpID09ICdsaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMnKS5hZGRDbGFzcygndmlldy1saXN0JykucmVtb3ZlQ2xhc3MoJ3ZpZXctZ3JpZCcpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQubGlzdChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYWRkQ2xhc3MoJ3ZpZXctZ3JpZCcpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMnKS5hcHBlbmQoIHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZChpdGVtLCBkYXRhKSApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBlbGVfY2FyZCA9IGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cyBbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10nKTtcblxuICAgICAgICAgICAgICAgIGpRdWVyeSgnW2RhdGEtbW9kYWw9I3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxdJywgZWxlX2NhcmQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgQm9hdE5hbWUgPSBpdGVtLk1vZGVsWWVhciArICcgJyArIGl0ZW0uTWFrZVN0cmluZyArICcgJyArIGl0ZW0uQm9hdE5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXlhY2h0LXJlc3VsdHMtbGVhZC1tb2RhbCAuYm9hdG5hbWUnKS5odG1sKEJvYXROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXlhY2h0LXJlc3VsdHMtbGVhZC1tb2RhbCBpbnB1dFtuYW1lPVdoaWNoQm9hdF0nKS52YWwoQm9hdE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJyN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsIGlucHV0W25hbWU9V2hpY2hCb2F0SURdJykudmFsKGl0ZW0uX3Bvc3RJRCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFfbW9kYWwgPSBqUXVlcnkodGhpcykuZGF0YSgnbW9kYWwnKTtcblxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoIGRhdGFfbW9kYWwgKS55c3BfbW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VUZXh0OiAnWCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RhbENsYXNzOiAneXNwLW1vZGFsLW9wZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VDbGFzczogJ3lzcC1tb2RlbC1jbG9zZSdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB5c3BfbWFya0xvdmVkVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgXG4gICAgICAgICAgICAgICAgeXNwX21ha2VDb21wYXJlVmVzc2VsKCBlbGVfY2FyZCApOyAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXlhY2h0LXJlc3VsdHMtcGFnaW5hdGlvbicpLnBhZ2luYXRpb24oe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBkYXRhX3Jlc3VsdC50b3RhbCxcbiAgICAgICAgICAgICAgICBpdGVtc09uUGFnZTogMTIsXG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2U6IGRhdGEucGFnZV9pbmRleCxcbiAgICAgICAgICAgICAgICBwcmV2VGV4dDogeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLnByZXZfdGV4dCxcbiAgICAgICAgICAgICAgICBuZXh0VGV4dDogeXNwX3RlbXBsYXRlcy5wYWdpbmF0aW9uLm5leHRfdGV4dCxcbiAgICAgICAgICAgICAgICBlZGdlczogNCxcbiAgICAgICAgICAgICAgICBkaXNwbGF5ZWRQYWdlczogNCxcbiAgICAgICAgICAgICAgICBocmVmVGV4dFByZWZpeDogY3VycmVudFVSTC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJwYWdlX2luZGV4LShcXFxcZCopKC8pXCIsIFwiZ1wiKSwgXCJcIikrJ3BhZ2VfaW5kZXgtJyxcbiAgICAgICAgICAgICAgICBocmVmVGV4dFN1ZmZpeDogJy8nLFxuICAgICAgICAgICAgICAgIG9uUGFnZUNsaWNrOiBmdW5jdGlvbihwYWdlTnVtYmVyLCBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPXBhZ2VOdW1iZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1EYXRhT2JqZWN0ID0geXNwX2dldF9mb3JtX2RhdGEoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0nKSApO1xuXG4gICAgICAgICAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlcihmb3JtRGF0YU9iamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYXBwZW5kKHlzcF90ZW1wbGF0ZXMubm9SZXN1bHRzKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgalF1ZXJ5KFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogKGpRdWVyeShcIi5zY3JvbGwtdG8taGVyZS1vbi15YWNodC1zZWFyY2hcIikub2Zmc2V0KCkudG9wKVxuICAgICAgICB9LCAyNTApO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm06bm90KCN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtKScpLmRpc3BhdGNoRXZlbnQoeXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGFfcmVzdWx0O1xuXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG5cbiAgICB9KTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBGaWxsIExpc3QgT3B0aW9uc1xuICAgIGxldCBGaWxsTGlzdHM9W107XG4gICAgbGV0IGxpc3RFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkYXRhbGlzdFtkYXRhLWZpbGwtbGlzdF1cIik7XG4gICAgbGV0IGxpc3ROZWVkZWRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFtsaXN0XVwiKTtcblxuICAgIGxpc3RFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgRmlsbExpc3RzLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLWxpc3QnKSk7XG4gICAgfSk7XG5cbiAgICBsaXN0TmVlZGVkRWxlbWVudHMuZm9yRWFjaCgoaW5wdXRfZWxlKSA9PiB7XG5cbiAgICAgICAgaW5wdXRfZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgbGV0IGxpc3RfaWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdsaXN0Jyk7XG5cbiAgICAgICAgICAgIGxldCBlbGVfbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkYXRhbGlzdCNcIitsaXN0X2lkKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPD0gMykge1xuXG4gICAgICAgICAgICAgICAgeXNwX2FwaS5jYWxsX2FwaShcbiAgICAgICAgICAgICAgICAgICAgJ1BPU1QnLCBcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3Qtb3B0aW9ucy13aXRoLXZhbHVlJywgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsczogWyBlbGVfbGlzdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykgXSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pO1xuXG4gICAgfSlcbiAgICBcbi8qICAgIHlzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnbGlzdC1vcHRpb25zJywge2xhYmVsczogRmlsbExpc3RzfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICBsZXQgU2VsZWN0b3JFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3Q9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG4gICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5hcHBlbmQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4qL1xuICAgIGxldCB5YWNodFNlYXJjaEFuZFJlc3VsdHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC15YWNodC1zZWFyY2gtZm9ybScpO1xuXG4gICAgaWYgKHlhY2h0U2VhcmNoQW5kUmVzdWx0cykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Blbi1tb2JpbGUtc2VhcmNoJykuZm9yRWFjaCgob21zZSkgPT4ge1xuICAgICAgICAgICAgb21zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QuYWRkKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9iaWxlLXNlYXJjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zdXBlci1tb2JpbGUtc2VhcmNoJykuc3R5bGUuZGlzcGxheT0nbm9uZSc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0ndW5zZXQnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QucmVtb3ZlKCd5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1vcGVuJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHlzcEJlZm9yZVlhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB5c3BfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG5cbiAgICAgICAgICAgIHlzcF95YWNodF9zZWFyY2hfYW5kX3JlYWRlciggcGFyYW1zICkudGhlbihmdW5jdGlvbihhcGlfZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZGlzcGF0Y2hFdmVudCh5c3BBZnRlcllhY2h0U2VhcmNoKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7IFxuXG4gICAgICAgIHlhY2h0U2VhcmNoQW5kUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dC5zdWJtaXQtb24tY2hhbmdlJykuZm9yRWFjaCgoZWxlSW5wdXQpID0+IHtcbiAgICAgICAgICAgIGVsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1yZXNldF0nKS5mb3JFYWNoKChlbGVSZXNldCkgPT4ge1xuICAgICAgICAgICAgZWxlUmVzZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ5c19jb21wYW55X29ubHlcIl0nKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInlzX2NvbXBhbnlfb25seVwiXScpLmZvckVhY2goZnVuY3Rpb24oZWxlQ2hlY2spIHtcbiAgICAgICAgICAgICAgICBlbGVDaGVjay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9dmlld11bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dLCBzZWxlY3RbbmFtZT12aWV3XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0sICBzZWxlY3RbbmFtZT1zb3J0YnldW2Zvcm09eXNwLXlhY2h0LXNlYXJjaC1mb3JtXScpLmZvckVhY2goKGVsZVZpZXdPcHRpb24pID0+IHtcbiAgICAgICAgICAgIGVsZVZpZXdPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waWNrLWFsbCcpLmZvckVhY2goZnVuY3Rpb24oZWxlKSB7XG4gICAgICAgICAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRfbmFtZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cIicrIGlucHV0X25hbWUgKydcIl0nKS5mb3JFYWNoKChlbGVJbnB1dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVJbnB1dC5jaGVja2VkPWZhbHNlO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQUkVUVFkgVVJMXG4gICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgICAgICBzdHJwYXRocz1zdHJwYXRocy5yZXBsYWNlKHlzcF95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF9wYWdlX2lkLCAnJyk7XG5cbiAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG4gICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG4gICAgICAgIHBhdGhzLmZvckVhY2goZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHM9cGhhc2VfcGF0aC5zbGljZSgxKTtcblxuICAgICAgICAgICAgICAgIG9ubHlfdmFscz1vbmx5X3ZhbHMuam9pbignICcpLmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBvbmx5X3ZhbHNfYXJyYXk9KG9ubHlfdmFscy5zcGxpdCgnKycpKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb25seV92YWxzX2FycmF5WzFdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ubHlfdmFscyA9IG9ubHlfdmFsc19hcnJheS5tYXAoKG92KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3YuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cob25seV92YWxzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHByZXR0eV91cmxfcGF0aF9wYXJhbXMpO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgRmllbGRzXG5cbiAgICAgICAgbGV0IFVSTFJFRj1uZXcgVVJMKGxvY2F0aW9uLmhyZWYpOyAvLyBtYXliZSBmb3IgYSByZS1kb1xuXG4gICAgICAgIGxldCBmb3JtSW5wdXRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLXlhY2h0LXNlYXJjaC1mb3JtXCJdLCAjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSAqW25hbWVdLCAqW25hbWVdW2Zvcm09XCJ5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtXCJdJyk7XG5cbiAgICAgICAgZm9ybUlucHV0cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBpbnB1dCA9IGVsZTtcblxuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbGUuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgIGxldCB1cmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuICAgICAgICAgICAgICAgIC8vIHVybFZhbCA9IDtcbiAgIFxuXG4gICAgICAgICAgICBsZXQgaGFzUHJldHR5ID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdO1xuXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFzUHJldHR5ICE9ICdudWxsJyAmJiB0eXBlb2YgaGFzUHJldHR5ICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShoYXNQcmV0dHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgICAgICAgICBoYXNQcmV0dHkuZm9yRWFjaCgoaFApID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gaFAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhhc1ByZXR0eSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGhhc1ByZXR0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1cmxWYWwgIT0gJycgJiYgdXJsVmFsICE9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdXJsVmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHVybFZhbCA9IHVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT0gdXJsVmFsICkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUgIT0gJ2NoZWNrYm94JyAmJiBpbnB1dC50eXBlICE9ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB1cmxWYWw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc3RvcmUgQ29tcGFyZVxuICAgICAgICAgeXNwX3Jlc3RvcmVDb21wYXJlcygpO1xuXG4gICAgICAgIC8vIEZpbGwgb3B0aW9uc1xuICAgICAgICBsZXQgRmlsbE9wdGlvbnM9W107XG4gICAgICAgIGxldCBzZWxlY3RvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9uc11cIik7XG5cbiAgICAgICAgc2VsZWN0b3JFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgIEZpbGxPcHRpb25zLnB1c2goZWxlLmdldEF0dHJpYnV0ZSgnZGF0YS1maWxsLW9wdGlvbnMnKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgeXNwX2FwaS5jYWxsX2FwaSgnUE9TVCcsICdkcm9wZG93bi1vcHRpb25zJywge2xhYmVsczogRmlsbE9wdGlvbnN9KS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBsYWJlbCBpbiByT3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNlbGVjdFtkYXRhLWZpbGwtb3B0aW9ucz0nXCIrIGxhYmVsICtcIiddXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coU2VsZWN0b3JFbGUpO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBTZWxlY3RvckVsZVswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBiID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiLnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYi52O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5hZGQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgVVJMUkVGID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgICAgICBsZXQgVXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcblxuICAgICAgICAgICAgICAgIGxldCBzdHJwYXRocz13aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgICAgICAgICAgICAgIHN0cnBhdGhzPXN0cnBhdGhzLnJlcGxhY2UoeXNwX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3BhZ2VfaWQsICcnKTtcblxuICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zPXt9O1xuXG4gICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaChmdW5jdGlvbihwYXRoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwaGFzZV9wYXRoID0gcGF0aC5zcGxpdCgnLScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9ubHlfdmFscz1waGFzZV9wYXRoLnNsaWNlKDEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscy5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0uZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChVcmxWYWwgIT0gJycgJiYgVXJsVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhVcmxWYWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVXJsVmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVcmxWYWwgPSBVcmxWYWwuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IFVybFZhbDsgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBVcmxWYWwudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgaGFzUHJldHR5ID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdO1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyggcHJldHR5X3VybF9wYXRoX3BhcmFtc1sgbmFtZSBdKTtcblxuICAgICAgICAgICAgICAgIGlmIChoYXNQcmV0dHkgIT0gJycgJiYgaGFzUHJldHR5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHk7IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUmVuZGVyIFlhY2h0cyBGb3IgUGFnZSBMb2FkXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0geXNwX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xuXG4gICAgICAgICAgICAvLyBMaWtlZCAvIExvdmVkIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMueXNfeWFjaHRzX2xvdmVkICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG92ZWRfeWFjaHRzID0gSlNPTi5wYXJzZSggbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykgKTtcblxuICAgICAgICAgICAgICAgIGlmIChsb3ZlZF95YWNodHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMueXNfb25seV90aGVzZSA9IGxvdmVkX3lhY2h0cy5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy55c19vbmx5X3RoZXNlPVwiMCwwLDBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTsgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBtb2JpbGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgICAgICBpZiAobW9iaWxlRm9ybSkge1xuICAgICAgICAgICAgbW9iaWxlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1wYWdlX2luZGV4XScpLnZhbHVlPTE7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdub25lJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUub3ZlcmZsb3dZPSd1bnNldCc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0geXNwX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpOyAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgeXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyKCBwYXJhbXMgKTtcblxuICAgICAgICAgICAgfSk7IFxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICB9XG5cbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgTGVhZEZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC1sZWFkLWZvcm0tdjInKTtcblxuICAgIExlYWRGb3Jtcy5mb3JFYWNoKChmRWxlKSA9PiB7XG4gICAgICAgIGZFbGUuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBsZXQgZm9ybURhdGEgPSB5c3BfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHlzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsICdsZWFkLXYyJywgZm9ybURhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YV9yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignLnN1Y2Nlc3MtbWVzc2FnZScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLWFmdGVyLXN1Ym1pdCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbn0pO1xuIl19
