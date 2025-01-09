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
  if (vessel.BoatLocation.BoatCityName != '') {
    vesselKeywordLocationLink = "/yacht-search/ys_keyword-".concat(vessel.BoatLocation.BoatCityName.replace(' ', '-'));
    vesselLocation = vessel.BoatLocation.BoatCountryID == "US" || vessel.BoatLocation.BoatCountryID == "United States" ? "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatStateCode) : "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatCountryID);
    vesselLocation = vesselLocation;
  } else {
    vesselKeywordLocationLink = "/yacht-search/ys_keyword-".concat(vessel.BoatLocation.BoatCountryID.replace(' ', '-'));
    vesselLocation = "".concat(vessel.BoatLocation.BoatCountryID);
  }
  return "\n\t\t\t<div class=\"ysp-yacht-item ysp-view-grid\" data-post-id=\"".concat(vessel._postID, "\" data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t<div class=\"ri-image\">\n\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t<img class=\"yacht-image\" src=\"").concat(vessel.Images ? vessel.Images[0].Uri : ysp_yacht_sync.assets_url + 'images/default-yacht-image.jpeg', "\" alt=\"yacht-image\" loading=\"lazy\" />\n\t\t\t\t\t\t\n\t\t\t\t\t\t<svg title=\"like\" class=\"like-me love\" xmlns=\"http://www.w3.org/2000/svg\" width=\"57\" height=\"54\" viewBox=\"0 0 57 54\" fill=\"none\"  data-yacht-id=\"").concat(vessel.DocumentID, "\">\n\t\t\t\t\t\t  <g filter=\"url(#filter0_d_2888_4333)\">\n\t\t\t\t\t\t    <path d=\"M34.7028 11.5755C36.2094 11.5755 37.6251 12.1699 38.6898 13.2488L38.8223 13.383C41.0206 15.6116 41.0206 19.2375 38.8223 21.466L38.0992 22.199L27.4995 32.9442L18.4883 23.808L16.9011 22.199L16.178 21.466C13.9797 19.2375 13.9797 15.6116 16.178 13.383L16.3083 13.2509C17.3739 12.1708 18.79 11.5759 20.2962 11.5764C21.8023 11.5764 23.2176 12.1708 24.2819 13.2492L25.005 13.9822L27.4991 16.5101L29.9928 13.9818L30.7158 13.2488C31.7801 12.1699 33.1962 11.5755 34.7028 11.5755ZM34.7028 8C32.357 8 30.0112 8.9068 28.2222 10.7204L27.4991 11.4534L26.776 10.7204C24.9878 8.90723 22.642 8.00043 20.297 8C17.9508 8 15.605 8.90723 13.8147 10.7221L13.6844 10.8542C10.1046 14.4832 10.1046 20.3645 13.6844 23.9935L14.4074 24.7265L15.9946 26.3354L27.4995 38L40.5933 24.7265L41.3164 23.9935C44.8945 20.3663 44.8945 14.4814 41.3164 10.8542L41.1839 10.72C39.3945 8.9068 37.0486 8 34.7028 8Z\" fill=\"white\"></path>\n\t\t\t\t\t\t  </g>\n\t\t\t\t\t\t  <defs>\n\t\t\t\t\t\t    <filter id=\"filter0_d_2888_4333\" x=\"-0.000488281\" y=\"0\" width=\"57.0005\" height=\"54\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n\t\t\t\t\t\t      <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood>\n\t\t\t\t\t\t      <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix>\n\t\t\t\t\t\t      <feOffset dx=\"1\" dy=\"4\"></feOffset>\n\t\t\t\t\t\t      <feGaussianBlur stdDeviation=\"6\"></feGaussianBlur>\n\t\t\t\t\t\t      <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite>\n\t\t\t\t\t\t      <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_2888_4333\"></feBlend>\n\t\t\t\t\t\t      <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_2888_4333\" result=\"shape\"></feBlend>\n\t\t\t\t\t\t    </filter>\n\t\t\t\t\t\t  </defs>\n\t\t\t\t\t\t</svg>\n\n\t\t\t\t\t\t<label class=\"top-compare\" title=\"compare\">\n\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"compare_toggle\" name=\"compare\" value=\"").concat(vessel._postID, "\" />\n\n\t\t\t\t\t\t\t<svg width=\"58\" height=\"25\" viewBox=\"0 0 58 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t<path d=\"M51.5029 18.1953L54.6753 14.7767C55.4411 13.9515 55.1258 12.5418 54.0937 12.1843L52.2 11.5284V4.6875C52.2 3.82456 51.5508 3.125 50.75 3.125H47.85V1.17187C47.85 0.524658 47.3631 0 46.7625 0H40.2375C39.6369 0 39.15 0.524658 39.15 1.17187V3.125H36.25C35.4492 3.125 34.8 3.82456 34.8 4.6875V11.5284L32.9063 12.1843C31.8753 12.5414 31.5581 13.9506 32.3247 14.7767L35.4971 18.1953C34.7016 20.3265 32.8782 21.875 30.0875 21.875C29.4869 21.875 29 22.3997 29 23.0469V23.8281C29 24.4753 29.4869 25 30.0875 25C32.8526 25 34.9585 23.9937 36.5789 22.0998C37.2322 23.8004 38.7885 25 40.6 25H46.4C48.2116 25 49.7678 23.8004 50.4211 22.0998C52.0412 23.9934 54.147 25 56.9125 25C57.5131 25 58 24.4753 58 23.8281V23.0469C58 22.3997 57.5131 21.875 56.9125 21.875C54.1567 21.875 52.3114 20.3613 51.5029 18.1953ZM37.7 6.25H49.3V10.524L43.9437 8.66875C43.6552 8.5688 43.3448 8.5688 43.0563 8.66875L37.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t<path d=\"M22.5029 18.1953L25.6753 14.7767C26.4411 13.9515 26.1258 12.5418 25.0937 12.1843L23.2 11.5284V4.6875C23.2 3.82456 22.5508 3.125 21.75 3.125H18.85V1.17188C18.85 0.524658 18.3631 0 17.7625 0H11.2375C10.6369 0 10.15 0.524658 10.15 1.17188V3.125H7.25C6.44919 3.125 5.8 3.82456 5.8 4.6875V11.5284L3.9063 12.1843C2.8753 12.5414 2.55807 13.9506 3.32467 14.7767L6.49709 18.1953C5.70158 20.3265 3.87816 21.875 1.0875 21.875C0.486883 21.875 0 22.3997 0 23.0469V23.8281C0 24.4753 0.486883 25 1.0875 25C3.8526 25 5.95855 23.9937 7.57888 22.0998C8.23224 23.8004 9.78845 25 11.6 25H17.4C19.2115 25 20.7678 23.8004 21.4211 22.0998C23.0412 23.9934 25.147 25 27.9125 25C28.5131 25 29 24.4753 29 23.8281V23.0469C29 22.3997 28.5131 21.875 27.9125 21.875C25.1567 21.875 23.3114 20.3613 22.5029 18.1953ZM8.7 6.25H20.3V10.524L14.9437 8.66875C14.6552 8.5688 14.3448 8.5688 14.0563 8.66875L8.7 10.524V6.25Z\" fill=\"white\"/>\n\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</label>\n\n\n\t\t\t\t\t\t").concat(vessel.CompanyName === ysp_yacht_sync.company_name ? "<div class=\"company-banner\"><img src=\"".concat(ysp_yacht_sync.company_logo, "\"></div>") : '', "\n\t\t\t\t\n\t\t\t\t\t\t<span class=\"ri-price\">").concat(price, "</span>\n\t\t\t\t\t</a>\t\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"result-item-info\">\n\t\t\t\t\t<div class=\"ri-top\">\n\t\t\t\t\t\t<a href=\"").concat(vessel._link, "\">\n\t\t\t\t\t\t\t<span class=\"ri-name\">").concat(vessel.ModelYear ? vessel.ModelYear : '', " ").concat(vessel.MakeString ? vessel.MakeString : '', " ").concat(vessel.Model ? vessel.Model : '', "</span><br>\n\n\t\t\t\t\t\t\t<span class=\"ri-sub-name\">").concat(vessel.BoatName ? vessel.BoatName : 'N/A', "</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"ri-bottom\">\n\t\t\t\t\t\t<span class=\"ri-location\">\t\n\t\t\t\t\t\t\t<a href=\"").concat(vesselKeywordLocationLink, "\">\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t\t\t\t<path d=\"M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t<path d=\"M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z\" stroke=\"#067AED\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t").concat(vesselLocation, "\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t<a href=\"#ysp-yacht-results-lead-modal\" class=\"ri-contact\" data-modal=\"#ysp-yacht-results-lead-modal\">\n\t\t\t\t\t\t\tContact\n\t\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n\t\t\t\t\t\t\t<g clip-path=\"url(#clip0_8101_10277)\">\n\t\t\t\t\t\t\t<path d=\"M15.5556 0H5.7778C5.53214 0 5.33334 0.198792 5.33334 0.444458C5.33334 0.690125 5.53214 0.888917 5.7778 0.888917H14.4827L0.130219 15.2413C-0.0434062 15.415 -0.0434062 15.6962 0.130219 15.8698C0.21701 15.9566 0.33076 16 0.444469 16C0.558177 16 0.671885 15.9566 0.758719 15.8698L15.1111 1.51737V10.2222C15.1111 10.4679 15.3099 10.6667 15.5556 10.6667C15.8013 10.6667 16.0001 10.4679 16.0001 10.2222V0.444458C16 0.198792 15.8012 0 15.5556 0Z\" fill=\"#067AED\"/>\n\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t<defs>\n\t\t\t\t\t\t\t<clipPath id=\"clip0_8101_10277\">\n\t\t\t\t\t\t\t<rect width=\"16\" height=\"16\" fill=\"white\"/>\n\t\t\t\t\t\t\t</clipPath>\n\t\t\t\t\t\t\t</defs>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
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
  if (vessel.BoatLocation.BoatCityName != '') {
    vesselKeywordLocationLink = "/yacht-search/ys_keyword-".concat(vessel.BoatLocation.BoatCityName.replace(' ', '-'));
    vesselLocation = vessel.BoatLocation.BoatCountryID == "US" || vessel.BoatLocation.BoatCountryID == "United States" ? "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatStateCode) : "".concat(vessel.BoatLocation.BoatCityName.toLowerCase(), ", ").concat(vessel.BoatLocation.BoatCountryID);
    vesselLocation = vesselLocation;
  } else {
    vesselKeywordLocationLink = "/yacht-search/ys_keyword-".concat(vessel.BoatLocation.BoatCountryID.replace(' ', '-'));
    vesselLocation = "".concat(vessel.BoatLocation.BoatCountryID);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS1wYWdpbmF0aW9uLmpzIiwianF1ZXJ5LW1vZGFsLmpzIiwid2hhdGV2ZXIuanMiLCJjb21tb24uanMiLCJhcGktY2xpZW50LmpzIiwidGVtcGxhdGVzLmpzIiwiZmlsbC1maWVsZHMuanMiLCJ5YWNodFNlYXJjaFRhZ3MuanMiLCJ5YWNodFNlYXJjaExvdmVkLmpzIiwieWFjaHRTZWFyY2hDb21wYXJlLmpzIiwieWFjaHRTZWFyY2guanMiLCJsZWFkcy5qcyJdLCJuYW1lcyI6WyIkIiwibWV0aG9kcyIsImluaXQiLCJvcHRpb25zIiwibyIsImV4dGVuZCIsIml0ZW1zIiwiaXRlbXNPblBhZ2UiLCJwYWdlcyIsImRpc3BsYXllZFBhZ2VzIiwiZWRnZXMiLCJjdXJyZW50UGFnZSIsInVzZUFuY2hvcnMiLCJocmVmVGV4dFByZWZpeCIsImhyZWZUZXh0U3VmZml4IiwicHJldlRleHQiLCJuZXh0VGV4dCIsImVsbGlwc2VUZXh0IiwiZWxsaXBzZVBhZ2VTZXQiLCJjc3NTdHlsZSIsImxpc3RTdHlsZSIsImxhYmVsTWFwIiwic2VsZWN0T25DbGljayIsIm5leHRBdEZyb250IiwiaW52ZXJ0UGFnZU9yZGVyIiwidXNlU3RhcnRFZGdlIiwidXNlRW5kRWRnZSIsIm9uUGFnZUNsaWNrIiwicGFnZU51bWJlciIsImV2ZW50Iiwib25Jbml0Iiwic2VsZiIsIk1hdGgiLCJjZWlsIiwiaGFsZkRpc3BsYXllZCIsImVhY2giLCJhZGRDbGFzcyIsImRhdGEiLCJfZHJhdyIsImNhbGwiLCJzZWxlY3RQYWdlIiwicGFnZSIsIl9zZWxlY3RQYWdlIiwicHJldlBhZ2UiLCJuZXh0UGFnZSIsImdldFBhZ2VzQ291bnQiLCJzZXRQYWdlc0NvdW50IiwiY291bnQiLCJnZXRDdXJyZW50UGFnZSIsImRlc3Ryb3kiLCJlbXB0eSIsImRyYXdQYWdlIiwicmVkcmF3IiwiZGlzYWJsZSIsImRpc2FibGVkIiwiZW5hYmxlIiwidXBkYXRlSXRlbXMiLCJuZXdJdGVtcyIsIl9nZXRQYWdlcyIsInVwZGF0ZUl0ZW1zT25QYWdlIiwiZ2V0SXRlbXNPblBhZ2UiLCJpbnRlcnZhbCIsIl9nZXRJbnRlcnZhbCIsImkiLCJ0YWdOYW1lIiwicHJvcCIsImF0dHIiLCIkcGFuZWwiLCJhcHBlbmRUbyIsIl9hcHBlbmRJdGVtIiwidGV4dCIsImNsYXNzZXMiLCJzdGFydCIsImVuZCIsIm1pbiIsImFwcGVuZCIsImJlZ2luIiwibWF4IiwiX2VsbGlwc2VDbGljayIsInBhZ2VJbmRleCIsIm9wdHMiLCIkbGluayIsIiRsaW5rV3JhcHBlciIsIiR1bCIsImZpbmQiLCJsZW5ndGgiLCJjbGljayIsIiRlbGxpcCIsInBhcmVudCIsInJlbW92ZUNsYXNzIiwiJHRoaXMiLCJ2YWwiLCJwYXJzZUludCIsInByZXYiLCJodG1sIiwiZm9jdXMiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXl1cCIsIndoaWNoIiwiYmluZCIsImZuIiwicGFnaW5hdGlvbiIsIm1ldGhvZCIsImNoYXJBdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFyZ3VtZW50cyIsIl90eXBlb2YiLCJlcnJvciIsImpRdWVyeSIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIndpbmRvdyIsImRvY3VtZW50IiwidW5kZWZpbmVkIiwibW9kYWxzIiwiZ2V0Q3VycmVudCIsInNlbGVjdEN1cnJlbnQiLCJzZWxlY3RlZCIsIiRibG9ja2VyIiwidG9nZ2xlQ2xhc3MiLCJ5c3BfbW9kYWwiLCJlbCIsInJlbW92ZSIsInRhcmdldCIsIiRib2R5IiwiZGVmYXVsdHMiLCJkb0ZhZGUiLCJpc05hTiIsImZhZGVEdXJhdGlvbiIsImNsb3NlRXhpc3RpbmciLCJpc0FjdGl2ZSIsImNsb3NlIiwicHVzaCIsImlzIiwiYW5jaG9yIiwidGVzdCIsIiRlbG0iLCJvcGVuIiwibW9kYWwiLCJlbG0iLCJzaG93U3Bpbm5lciIsInRyaWdnZXIiLCJBSkFYX1NFTkQiLCJnZXQiLCJkb25lIiwiQUpBWF9TVUNDRVNTIiwiY3VycmVudCIsIm9uIiwiQ0xPU0UiLCJoaWRlU3Bpbm5lciIsIkFKQVhfQ09NUExFVEUiLCJmYWlsIiwiQUpBWF9GQUlMIiwicG9wIiwiY29uc3RydWN0b3IiLCJtIiwiYmxvY2siLCJibHVyIiwic2V0VGltZW91dCIsInNob3ciLCJmYWRlRGVsYXkiLCJvZmYiLCJlc2NhcGVDbG9zZSIsImNsaWNrQ2xvc2UiLCJlIiwidW5ibG9jayIsImhpZGUiLCJCRUZPUkVfQkxPQ0siLCJfY3R4IiwiY3NzIiwiYmxvY2tlckNsYXNzIiwiYW5pbWF0ZSIsIm9wYWNpdHkiLCJCTE9DSyIsIm5vdyIsImZhZGVPdXQiLCJjaGlsZHJlbiIsIkJFRk9SRV9PUEVOIiwic2hvd0Nsb3NlIiwiY2xvc2VCdXR0b24iLCJjbG9zZUNsYXNzIiwiY2xvc2VUZXh0IiwibW9kYWxDbGFzcyIsImRpc3BsYXkiLCJPUEVOIiwiQkVGT1JFX0NMT1NFIiwiX3RoaXMiLCJBRlRFUl9DTE9TRSIsInNwaW5uZXIiLCJzcGlubmVySHRtbCIsIiRhbmNob3IiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImRhdGFfbW9kYWwiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIlN0cmluZyIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsIm1hcCIsInMiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsImpvaW4iLCJlbnVtZXJhYmxlIiwieXNwX2dldF9mb3JtX2RhdGEiLCJmb3JtX2VsZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJmZCIsImZyb21FbnRyaWVzIiwiZW50cmllcyIsIl9pIiwiX09iamVjdCRlbnRyaWVzIiwiX09iamVjdCRlbnRyaWVzJF9pIiwiX3NsaWNlZFRvQXJyYXkiLCJmSW5kZXgiLCJmaWVsZCIsIlZhbEFycmF5IiwiZ2V0QWxsIiwieXNwX3NldF9mb3JtX3RvX2RhdGEiLCJpbnB1dERhdGEiLCJmb3JtQSIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JtQiIsInJlc2V0IiwiZm9ybUlucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlIiwiaW5wdXQiLCJuYW1lIiwiZ2V0QXR0cmlidXRlIiwiaGFzUHJldHR5IiwiaXNBcnJheSIsImhQIiwidHlwZSIsImNoZWNrZWQiLCJ5c3BfcHVzaF9oaXN0b3J5Iiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic3RycGF0aCIsInByb3BlcnR5IiwiaXQiLCJzZXQiLCJ0b1N0cmluZyIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJ5c3BfeWFjaHRfc3luYyIsInlhY2h0X3NlYXJjaF91cmwiLCJ5c3BfYXBpIiwiY2FsbF9hcGkiLCJwYXRoIiwicGFzc2luZ19kYXRhIiwieGh0dHAiLCJYTUxIdHRwUmVxdWVzdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlRGF0YSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIl9xdWVzdGlvbk1hcmsiLCJ3cF9yZXN0X3VybCIsInNlbmQiLCJzZXRSZXF1ZXN0SGVhZGVyIiwic3RyaW5naWZ5IiwieXNwX3RlbXBsYXRlcyIsInlhY2h0IiwiZ3JpZCIsInZlc3NlbCIsInBhcmFtcyIsIm1ldGVycyIsIk5vbWluYWxMZW5ndGgiLCJwcmljZSIsImV1cm9wZV9vcHRpb25fcGlja2VkIiwidG9GaXhlZCIsIllTUF9FdXJvVmFsIiwiY29uY2F0IiwiSW50bCIsIk51bWJlckZvcm1hdCIsIm1pbmltdW1GcmFjdGlvbkRpZ2l0cyIsImZvcm1hdCIsImN1cnJlbmN5IiwiWVNQX1VTRFZhbCIsInZlc3NlbExvY2F0aW9uIiwidmVzc2VsS2V5d29yZExvY2F0aW9uTGluayIsIkJvYXRMb2NhdGlvbiIsIkJvYXRDaXR5TmFtZSIsInJlcGxhY2UiLCJCb2F0Q291bnRyeUlEIiwiQm9hdFN0YXRlQ29kZSIsIl9wb3N0SUQiLCJEb2N1bWVudElEIiwiX2xpbmsiLCJJbWFnZXMiLCJVcmkiLCJhc3NldHNfdXJsIiwiQ29tcGFueU5hbWUiLCJjb21wYW55X25hbWUiLCJjb21wYW55X2xvZ28iLCJNb2RlbFllYXIiLCJNYWtlU3RyaW5nIiwiTW9kZWwiLCJCb2F0TmFtZSIsImxpc3QiLCJQcmljZSIsImV1cm9fY19jIiwiY29tcGFyZV9wcmV2aWV3Iiwibm9SZXN1bHRzIiwieWFjaHRfdGFnIiwibGFiZWwiLCJuZXh0X3RleHQiLCJwcmV2X3RleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZWxlX3F1aWNrX3NlYXJjaCIsIkZpbGxPcHRpb25zIiwic2VsZWN0b3JFbGVtZW50cyIsImxhYmVscyIsInRoZW4iLCJyT3B0aW9ucyIsIl9sb29wIiwiU2VsZWN0b3JFbGUiLCJiIiwib3B0aW9uIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsIlVSTFJFRiIsIlVSTCIsImxvY2F0aW9uIiwiaHJlZiIsIlVybFZhbCIsInN0cnBhdGhzIiwieWFjaHRfc2VhcmNoX3BhZ2VfaWQiLCJwYXRocyIsInByZXR0eV91cmxfcGF0aF9wYXJhbXMiLCJwaGFzZV9wYXRoIiwib25seV92YWxzIiwiZWFjaFdvcmRDYXBpdGFsaXplIiwieXNwX21ha2VTZWFyY2hUYWdzIiwidGFnc0VsZSIsInRlIiwiaW5uZXJIVE1MIiwieXNwX3RhZ3Nfbm90X3ByaW50IiwiX2xvb3AyIiwicGFyYW1LZXkiLCJpbm5lclRleHQiLCJoYXNBdHRyaWJ1dGUiLCJpbmRleE9mIiwiZWxlSW5wdXQiLCJuZXdUYWdFbGUiLCJ0YWdWYWwiLCJzZWxlY3RlZEluZGV4IiwibWF0Y2giLCJlbGVVbml0IiwiY2xhc3NOYW1lIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJ5c3BUYWdFbGUiLCJrZXkiLCJjdXJyZW50VGFyZ2V0IiwiaW5wdXRFbGVzIiwiZWxlSSIsImZvcm0iLCJyZXF1ZXN0U3VibWl0IiwieXNwX21hcmtMb3ZlZFZlc3NlbCIsImVsZV9jYXJkIiwieWFjaHRJZCIsImhhc0NsYXNzIiwieXNwX2FkZExvdmVkVmVzc2VsIiwieXNwX3JlbW92ZUxvdmVkVmVzc2VsIiwieXNfeWFjaHRzX2xvdmVkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImxvdmVkVmVzc2VscyIsInNldEl0ZW0iLCJpbmRleGVkIiwic3BsaWNlIiwiWVNQX1Zlc3NlbENvbXBhcmVMaXN0IiwieXNwX3Jlc3RvcmVDb21wYXJlcyIsImNvbXBhcmVfcG9zdF9pZHMiLCJ5c3BfbWFrZUNvbXBhcmVMaW5rb3V0IiwieXNwX21ha2VDb21wYXJlVmVzc2VsIiwiY2hhbmdlIiwieXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QiLCJ5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCIsImdldEVsZW1lbnRCeUlkIiwiZGF0YV9yZXN1bHQiLCJyZXN1bHRzIiwiaXRlbSIsImVsZV9wcmV2aWV3IiwieXNwQmVmb3JlWWFjaHRTZWFyY2giLCJFdmVudCIsInlzcEFmdGVyWWFjaHRTZWFyY2giLCJ5c3BBZnRlclJlbmRlcmluZ1lhY2h0IiwieXNwX3lhY2h0X3NlYXJjaF9hbmRfcmVhZGVyIiwiY2xhc3NMaXN0IiwidGl0bGUiLCJTRU8iLCJoZWFkaW5nIiwicCIsIm1heGltdW1TaWduaWZpY2FudERpZ2l0cyIsInRvdGFsIiwiY3VycmVudFVSTCIsImRvbnRfcHVzaCIsInZpZXciLCJwYWdlX2luZGV4IiwiUmVnRXhwIiwiZm9ybURhdGFPYmplY3QiLCJkb2N1bWVudEVsZW1lbnQiLCJib2R5Iiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwiZGlzcGF0Y2hFdmVudCIsIkZpbGxMaXN0cyIsImxpc3RFbGVtZW50cyIsImxpc3ROZWVkZWRFbGVtZW50cyIsImlucHV0X2VsZSIsImxpc3RfaWQiLCJlbGVfbGlzdCIsIl9sb29wMyIsInlhY2h0U2VhcmNoQW5kUmVzdWx0cyIsIm9tc2UiLCJzdHlsZSIsIm92ZXJmbG93WSIsImFwaV9kYXRhIiwiZWxlUmVzZXQiLCJlbGVDaGVjayIsImVsZVZpZXdPcHRpb24iLCJpbnB1dF9uYW1lIiwib25seV92YWxzX2FycmF5Iiwib3YiLCJ1cmxWYWwiLCJfbG9vcDQiLCJsb3ZlZF95YWNodHMiLCJ5c19vbmx5X3RoZXNlIiwibW9iaWxlRm9ybSIsIkxlYWRGb3JtcyIsImZFbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFBLFVBQUFBLENBQUEsRUFBQTtFQUVBLElBQUFDLE9BQUEsR0FBQTtJQUNBQyxJQUFBLEVBQUEsU0FBQUEsSUFBQUEsQ0FBQUMsT0FBQSxFQUFBO01BQ0EsSUFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLE1BQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxjQUFBLEVBQUEsQ0FBQTtRQUNBQyxLQUFBLEVBQUEsQ0FBQTtRQUNBQyxXQUFBLEVBQUEsQ0FBQTtRQUNBQyxVQUFBLEVBQUEsSUFBQTtRQUNBQyxjQUFBLEVBQUEsUUFBQTtRQUNBQyxjQUFBLEVBQUEsRUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxRQUFBLEVBQUEsTUFBQTtRQUNBQyxXQUFBLEVBQUEsVUFBQTtRQUNBQyxjQUFBLEVBQUEsSUFBQTtRQUNBQyxRQUFBLEVBQUEsYUFBQTtRQUNBQyxTQUFBLEVBQUEsRUFBQTtRQUNBQyxRQUFBLEVBQUEsRUFBQTtRQUNBQyxhQUFBLEVBQUEsSUFBQTtRQUNBQyxXQUFBLEVBQUEsS0FBQTtRQUNBQyxlQUFBLEVBQUEsS0FBQTtRQUNBQyxZQUFBLEVBQUEsSUFBQTtRQUNBQyxVQUFBLEVBQUEsSUFBQTtRQUNBQyxXQUFBLEVBQUEsU0FBQUEsV0FBQUEsQ0FBQUMsVUFBQSxFQUFBQyxLQUFBLEVBQUE7VUFDQTtVQUNBO1FBQUEsQ0FDQTtRQUNBQyxNQUFBLEVBQUEsU0FBQUEsTUFBQUEsQ0FBQSxFQUFBO1VBQ0E7UUFBQTtNQUVBLENBQUEsRUFBQTNCLE9BQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTtNQUVBLElBQUE0QixJQUFB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QUFBO0VBRUFELFVBQUEsQ0FBQUUsT0FBQSxDQUFBLFVBQUFDLEdBQUEsRUFBQTtJQUNBLElBQUFDLEtBQUEsR0FBQUQsR0FBQTtJQUVBLElBQUFFLElBQUEsR0FBQUYsR0FBQSxDQUFBRyxZQUFBLENBQUEsTUFBQSxDQUFBO0lBRUEsSUFBQUMsU0FBQSxHQUFBWixTQUFBLENBQUFVLElBQUEsQ0FBQTs7SUFFQTs7SUFFQSxJQUFBLE9BQUFFLFNBQUEsSUFBQSxNQUFBLElBQUEsT0FBQUEsU0FBQSxJQUFBLFdBQUEsRUFBQTtNQUVBLElBQUF4SSxLQUFBLENBQUF5SSxPQUFBLENBQUFELFNBQUEsQ0FBQSxFQUFBO1FBQ0E7O1FBRUFBLFNBQUEsQ0FBQUwsT0FBQSxDQUFBLFVBQUFPLEVBQUEsRUFBQTtVQUVBLElBQUEsT0FBQUwsS0FBQSxDQUFBTSxJQUFBLElBQUEsV0FBQSxLQUFBTixLQUFBLENBQUFNLElBQUEsSUFBQSxVQUFBLElBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLE9BQUEsQ0FBQSxJQUFBTixLQUFBLENBQUFFLFlBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQUcsRUFBQSxFQUFBO1lBQ0FMLEtBQUEsQ0FBQU8sT0FBQSxHQUFBLElBQUE7VUFDQTtRQUVBLENBQUEsQ0FBQTtNQUVBLENBQUEsTUFDQTtRQUVBLElBQUEsT0FBQVAsS0FBQSxDQUFBTSxJQUFBLElBQUEsV0FBQSxLQUFBTixLQUFBLENBQUFNLElBQUEsSUFBQSxVQUFBLElBQUFOLEtBQUEsQ0FBQU0sSUFBQSxJQUFBLE9BQUEsQ0FBQSxJQUFBTixLQUFBLENBQUFFLFlBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQUMsU0FBQSxFQUFBO1VBQ0FILEtBQUEsQ0FBQU8sT0FBQSxHQUFBLElBQUE7UUFDQSxDQUFBLE1BQ0EsSUFBQVAsS0FBQSxDQUFBTSxJQUFBLElBQUEsVUFBQSxJQUFBTixLQUFBLENBQUFNLElBQUEsSUFBQSxPQUFBLEVBQUE7VUFDQU4sS0FBQSxDQUFBbEMsS0FBQSxHQUFBcUMsU0FBQTtRQUNBO01BRUE7SUFFQTtF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QUFBLG1CQUFBLENBQUE7RUFFQXVOLFNBQUEsQ0FBQXROLE9BQUEsQ0FBQSxVQUFBdU4sSUFBQSxFQUFBO0lBQ0FBLElBQUEsQ0FBQTdILGdCQUFBLENBQUEsUUFBQSxFQUFBLFVBQUE3SixDQUFBLEVBQUE7TUFDQUEsQ0FBQSxDQUFBMkIsY0FBQSxDQUFBLENBQUE7TUFFQSxJQUFBbUIsUUFBQSxHQUFBRixpQkFBQSxDQUFBNUMsQ0FBQSxDQUFBekMsTUFBQSxDQUFBO01BRUFrSSxPQUFBLENBQUFDLFFBQUEsQ0FBQSxNQUFBLEVBQUEsU0FBQSxFQUFBNUMsUUFBQSxDQUFBLENBQ0FvSCxJQUFBLENBQUEsVUFBQW9FLFdBQUEsRUFBQTtRQUNBdE8sQ0FBQSxDQUFBekMsTUFBQSxDQUFBdUcsYUFBQSxDQUFBLGtCQUFBLENBQUEsQ0FBQTZNLEtBQUEsQ0FBQXhQLE9BQUEsR0FBQSxPQUFBO1FBRUFuQixDQUFBLENBQUF6QyxNQUFBLENBQUF1RyxhQUFBLENBQUEsb0JBQUEsQ0FBQSxDQUFBNk0sS0FBQSxDQUFBeFAsT0FBQSxHQUFBLE1BQUE7TUFDQSxDQUFBLENBQUEsU0FDQSxDQUFBLFVBQUE5RSxLQUFBLEVBQUE7UUFDQXdGLE9BQUEsQ0FBQUMsR0FBQSxDQUFBekYsS0FBQSxDQUFBO01BQ0EsQ0FBQSxDQUFBO0lBQ0EsQ0FBQSxDQUFBO0VBQ0EsQ0FBQSxDQUFBO0FBRUEsQ0FBQSxDQUFBIiwiZmlsZSI6Imdsb2JhbFBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAvKipcbiogc2ltcGxlUGFnaW5hdGlvbi5qcyB2MS42XG4qIEEgc2ltcGxlIGpRdWVyeSBwYWdpbmF0aW9uIHBsdWdpbi5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL3NpbXBsZVBhZ2luYXRpb24uanMvXG4qXG4qIENvcHlyaWdodCAyMDEyLCBGbGF2aXVzIE1hdGlzXG4qIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiogaHR0cDovL2ZsYXZpdXNtYXRpcy5naXRodWIuY29tL2xpY2Vuc2UuaHRtbFxuKi9cblxuKGZ1bmN0aW9uKCQpe1xuXG5cdHZhciBtZXRob2RzID0ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0XHRcdHZhciBvID0gJC5leHRlbmQoe1xuXHRcdFx0XHRpdGVtczogMSxcblx0XHRcdFx0aXRlbXNPblBhZ2U6IDEsXG5cdFx0XHRcdHBhZ2VzOiAwLFxuXHRcdFx0XHRkaXNwbGF5ZWRQYWdlczogNSxcblx0XHRcdFx0ZWRnZXM6IDIsXG5cdFx0XHRcdGN1cnJlbnRQYWdlOiAwLFxuXHRcdFx0XHR1c2VBbmNob3JzOiB0cnVlLFxuXHRcdFx0XHRocmVmVGV4dFByZWZpeDogJyNwYWdlLScsXG5cdFx0XHRcdGhyZWZUZXh0U3VmZml4OiAnJyxcblx0XHRcdFx0cHJldlRleHQ6ICdQcmV2Jyxcblx0XHRcdFx0bmV4dFRleHQ6ICdOZXh0Jyxcblx0XHRcdFx0ZWxsaXBzZVRleHQ6ICcmaGVsbGlwOycsXG5cdFx0XHRcdGVsbGlwc2VQYWdlU2V0OiB0cnVlLFxuXHRcdFx0XHRjc3NTdHlsZTogJ2xpZ2h0LXRoZW1lJyxcblx0XHRcdFx0bGlzdFN0eWxlOiAnJyxcblx0XHRcdFx0bGFiZWxNYXA6IFtdLFxuXHRcdFx0XHRzZWxlY3RPbkNsaWNrOiB0cnVlLFxuXHRcdFx0XHRuZXh0QXRGcm9udDogZmFsc2UsXG5cdFx0XHRcdGludmVydFBhZ2VPcmRlcjogZmFsc2UsXG5cdFx0XHRcdHVzZVN0YXJ0RWRnZSA6IHRydWUsXG5cdFx0XHRcdHVzZUVuZEVkZ2UgOiB0cnVlLFxuXHRcdFx0XHRvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcblx0XHRcdFx0XHQvLyBDYWxsYmFjayB0cmlnZ2VyZWQgd2hlbiBhIHBhZ2UgaXMgY2xpY2tlZFxuXHRcdFx0XHRcdC8vIFBhZ2UgbnVtYmVyIGlzIGdpdmVuIGFzIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vIENhbGxiYWNrIHRyaWdnZXJlZCBpbW1lZGlhdGVseSBhZnRlciBpbml0aWFsaXphdGlvblxuXHRcdFx0XHR9XG5cdFx0XHR9LCBvcHRpb25zIHx8IHt9KTtcblxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRvLnBhZ2VzID0gby5wYWdlcyA/IG8ucGFnZXMgOiBNYXRoLmNlaWwoby5pdGVtcyAvIG8uaXRlbXNPblBhZ2UpID8gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKSA6IDE7XG5cdFx0XHRpZiAoby5jdXJyZW50UGFnZSlcblx0XHRcdFx0by5jdXJyZW50UGFnZSA9IG8uY3VycmVudFBhZ2UgLSAxO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvLmN1cnJlbnRQYWdlID0gIW8uaW52ZXJ0UGFnZU9yZGVyID8gMCA6IG8ucGFnZXMgLSAxO1xuXHRcdFx0by5oYWxmRGlzcGxheWVkID0gby5kaXNwbGF5ZWRQYWdlcyAvIDI7XG5cblx0XHRcdHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5hZGRDbGFzcyhvLmNzc1N0eWxlICsgJyBzaW1wbGUtcGFnaW5hdGlvbicpLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHNlbGYpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG8ub25Jbml0KCk7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRzZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlKSB7XG5cdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgcGFnZSAtIDEpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHByZXZQYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlIDwgby5wYWdlcyAtIDEpIHtcblx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwodGhpcywgby5jdXJyZW50UGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0bmV4dFBhZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0aWYgKG8uY3VycmVudFBhZ2UgPCBvLnBhZ2VzIC0gMSkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlICsgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvLmN1cnJlbnRQYWdlID4gMCkge1xuXHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbCh0aGlzLCBvLmN1cnJlbnRQYWdlIC0gMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRnZXRQYWdlc0NvdW50OiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5wYWdlcztcblx0XHR9LFxuXG5cdFx0c2V0UGFnZXNDb3VudDogZnVuY3Rpb24oY291bnQpIHtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicpLnBhZ2VzID0gY291bnQ7XG5cdFx0fSxcblxuXHRcdGdldEN1cnJlbnRQYWdlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJykuY3VycmVudFBhZ2UgKyAxO1xuXHRcdH0sXG5cblx0XHRkZXN0cm95OiBmdW5jdGlvbigpe1xuXHRcdFx0dGhpcy5lbXB0eSgpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGRyYXdQYWdlOiBmdW5jdGlvbiAocGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uY3VycmVudFBhZ2UgPSBwYWdlIC0gMTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHJlZHJhdzogZnVuY3Rpb24oKXtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cblx0XHRkaXNhYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5kYXRhKCdwYWdpbmF0aW9uJywgbyk7XG5cdFx0XHRtZXRob2RzLl9kcmF3LmNhbGwodGhpcyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXG5cdFx0ZW5hYmxlOiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUl0ZW1zOiBmdW5jdGlvbiAobmV3SXRlbXMpIHtcblx0XHRcdHZhciBvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyk7XG5cdFx0XHRvLml0ZW1zID0gbmV3SXRlbXM7XG5cdFx0XHRvLnBhZ2VzID0gbWV0aG9kcy5fZ2V0UGFnZXMobyk7XG5cdFx0XHR0aGlzLmRhdGEoJ3BhZ2luYXRpb24nLCBvKTtcblx0XHRcdG1ldGhvZHMuX2RyYXcuY2FsbCh0aGlzKTtcblx0XHR9LFxuXG5cdFx0dXBkYXRlSXRlbXNPblBhZ2U6IGZ1bmN0aW9uIChpdGVtc09uUGFnZSkge1xuXHRcdFx0dmFyIG8gPSB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKTtcblx0XHRcdG8uaXRlbXNPblBhZ2UgPSBpdGVtc09uUGFnZTtcblx0XHRcdG8ucGFnZXMgPSBtZXRob2RzLl9nZXRQYWdlcyhvKTtcblx0XHRcdHRoaXMuZGF0YSgncGFnaW5hdGlvbicsIG8pO1xuXHRcdFx0bWV0aG9kcy5fc2VsZWN0UGFnZS5jYWxsKHRoaXMsIDApO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblxuXHRcdGdldEl0ZW1zT25QYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3BhZ2luYXRpb24nKS5pdGVtc09uUGFnZTtcblx0XHR9LFxuXG5cdFx0X2RyYXc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyXHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdGludGVydmFsID0gbWV0aG9kcy5fZ2V0SW50ZXJ2YWwobyksXG5cdFx0XHRcdGksXG5cdFx0XHRcdHRhZ05hbWU7XG5cblx0XHRcdG1ldGhvZHMuZGVzdHJveS5jYWxsKHRoaXMpO1xuXG5cdFx0XHR0YWdOYW1lID0gKHR5cGVvZiB0aGlzLnByb3AgPT09ICdmdW5jdGlvbicpID8gdGhpcy5wcm9wKCd0YWdOYW1lJykgOiB0aGlzLmF0dHIoJ3RhZ05hbWUnKTtcblxuXHRcdFx0dmFyICRwYW5lbCA9IHRhZ05hbWUgPT09ICdVTCcgPyB0aGlzIDogJCgnPHVsJyArIChvLmxpc3RTdHlsZSA/ICcgY2xhc3M9XCInICsgby5saXN0U3R5bGUgKyAnXCInIDogJycpICsgJz48L3VsPicpLmFwcGVuZFRvKHRoaXMpO1xuXG5cdFx0XHQvLyBHZW5lcmF0ZSBQcmV2IGxpbmtcblx0XHRcdGlmIChvLnByZXZUZXh0KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlIC0gMSA6IG8uY3VycmVudFBhZ2UgKyAxLCB7dGV4dDogby5wcmV2VGV4dCwgY2xhc3NlczogJ3ByZXYnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIE5leHQgbGluayAoaWYgb3B0aW9uIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiBvLm5leHRBdEZyb250KSB7XG5cdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCAhby5pbnZlcnRQYWdlT3JkZXIgPyBvLmN1cnJlbnRQYWdlICsgMSA6IG8uY3VycmVudFBhZ2UgLSAxLCB7dGV4dDogby5uZXh0VGV4dCwgY2xhc3NlczogJ25leHQnfSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIHN0YXJ0IGVkZ2VzXG5cdFx0XHRpZiAoIW8uaW52ZXJ0UGFnZU9yZGVyKSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZihvLnVzZVN0YXJ0RWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChvLmVkZ2VzIDwgaW50ZXJ2YWwuc3RhcnQgJiYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyAhPSAxKSkge1xuXHRcdFx0XHRcdFx0JHBhbmVsLmFwcGVuZCgnPGxpIGNsYXNzPVwiZGlzYWJsZWRcIj48c3BhbiBjbGFzcz1cImVsbGlwc2VcIj4nICsgby5lbGxpcHNlVGV4dCArICc8L3NwYW4+PC9saT4nKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGludGVydmFsLnN0YXJ0IC0gby5lZGdlcyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgby5lZGdlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmKG8udXNlU3RhcnRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IG8ucGFnZXMgLSAxOyBpID49IGJlZ2luOyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgaW50ZXJ2YWwgbGlua3Ncblx0XHRcdGlmICghby5pbnZlcnRQYWdlT3JkZXIpIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuc3RhcnQ7IGkgPCBpbnRlcnZhbC5lbmQ7IGkrKykge1xuXHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChpID0gaW50ZXJ2YWwuZW5kIC0gMTsgaSA+PSBpbnRlcnZhbC5zdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGVuZCBlZGdlc1xuXHRcdFx0aWYgKCFvLmludmVydFBhZ2VPcmRlcikge1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwuZW5kIDwgby5wYWdlcyAmJiBvLmVkZ2VzID4gMCkge1xuXHRcdFx0XHRcdGlmIChvLnBhZ2VzIC0gby5lZGdlcyA+IGludGVydmFsLmVuZCAmJiAoby5wYWdlcyAtIG8uZWRnZXMgLSBpbnRlcnZhbC5lbmQgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvLnBhZ2VzIC0gby5lZGdlcyAtIGludGVydmFsLmVuZCA9PSAxKSB7XG5cdFx0XHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoby51c2VFbmRFZGdlKSB7XG5cdFx0XHRcdFx0XHR2YXIgYmVnaW4gPSBNYXRoLm1heChvLnBhZ2VzIC0gby5lZGdlcywgaW50ZXJ2YWwuZW5kKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGJlZ2luOyBpIDwgby5wYWdlczsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChpbnRlcnZhbC5zdGFydCA+IDAgJiYgby5lZGdlcyA+IDApIHtcblx0XHRcdFx0XHRpZiAoby5lZGdlcyA8IGludGVydmFsLnN0YXJ0ICYmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgIT0gMSkpIHtcblx0XHRcdFx0XHRcdCRwYW5lbC5hcHBlbmQoJzxsaSBjbGFzcz1cImRpc2FibGVkXCI+PHNwYW4gY2xhc3M9XCJlbGxpcHNlXCI+JyArIG8uZWxsaXBzZVRleHQgKyAnPC9zcGFuPjwvbGk+Jyk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpbnRlcnZhbC5zdGFydCAtIG8uZWRnZXMgPT0gMSkge1xuXHRcdFx0XHRcdFx0bWV0aG9kcy5fYXBwZW5kSXRlbS5jYWxsKHRoaXMsIG8uZWRnZXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKG8udXNlRW5kRWRnZSkge1xuXHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKG8uZWRnZXMsIGludGVydmFsLnN0YXJ0KTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IGVuZCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdG1ldGhvZHMuX2FwcGVuZEl0ZW0uY2FsbCh0aGlzLCBpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR2VuZXJhdGUgTmV4dCBsaW5rICh1bmxlc3Mgb3B0aW9uIGlzIHNldCBmb3IgYXQgZnJvbnQpXG5cdFx0XHRpZiAoby5uZXh0VGV4dCAmJiAhby5uZXh0QXRGcm9udCkge1xuXHRcdFx0XHRtZXRob2RzLl9hcHBlbmRJdGVtLmNhbGwodGhpcywgIW8uaW52ZXJ0UGFnZU9yZGVyID8gby5jdXJyZW50UGFnZSArIDEgOiBvLmN1cnJlbnRQYWdlIC0gMSwge3RleHQ6IG8ubmV4dFRleHQsIGNsYXNzZXM6ICduZXh0J30pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoby5lbGxpcHNlUGFnZVNldCAmJiAhby5kaXNhYmxlZCkge1xuXHRcdFx0XHRtZXRob2RzLl9lbGxpcHNlQ2xpY2suY2FsbCh0aGlzLCAkcGFuZWwpO1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdF9nZXRQYWdlczogZnVuY3Rpb24obykge1xuXHRcdFx0dmFyIHBhZ2VzID0gTWF0aC5jZWlsKG8uaXRlbXMgLyBvLml0ZW1zT25QYWdlKTtcblx0XHRcdHJldHVybiBwYWdlcyB8fCAxO1xuXHRcdH0sXG5cblx0XHRfZ2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKG8pIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN0YXJ0OiBNYXRoLmNlaWwoby5jdXJyZW50UGFnZSA+IG8uaGFsZkRpc3BsYXllZCA/IE1hdGgubWF4KE1hdGgubWluKG8uY3VycmVudFBhZ2UgLSBvLmhhbGZEaXNwbGF5ZWQsIChvLnBhZ2VzIC0gby5kaXNwbGF5ZWRQYWdlcykpLCAwKSA6IDApLFxuXHRcdFx0XHRlbmQ6IE1hdGguY2VpbChvLmN1cnJlbnRQYWdlID4gby5oYWxmRGlzcGxheWVkID8gTWF0aC5taW4oby5jdXJyZW50UGFnZSArIG8uaGFsZkRpc3BsYXllZCwgby5wYWdlcykgOiBNYXRoLm1pbihvLmRpc3BsYXllZFBhZ2VzLCBvLnBhZ2VzKSlcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdF9hcHBlbmRJdGVtOiBmdW5jdGlvbihwYWdlSW5kZXgsIG9wdHMpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcywgb3B0aW9ucywgJGxpbmssIG8gPSBzZWxmLmRhdGEoJ3BhZ2luYXRpb24nKSwgJGxpbmtXcmFwcGVyID0gJCgnPGxpPjwvbGk+JyksICR1bCA9IHNlbGYuZmluZCgndWwnKTtcblxuXHRcdFx0cGFnZUluZGV4ID0gcGFnZUluZGV4IDwgMCA/IDAgOiAocGFnZUluZGV4IDwgby5wYWdlcyA/IHBhZ2VJbmRleCA6IG8ucGFnZXMgLSAxKTtcblxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0dGV4dDogcGFnZUluZGV4ICsgMSxcblx0XHRcdFx0Y2xhc3NlczogJydcblx0XHRcdH07XG5cblx0XHRcdGlmIChvLmxhYmVsTWFwLmxlbmd0aCAmJiBvLmxhYmVsTWFwW3BhZ2VJbmRleF0pIHtcblx0XHRcdFx0b3B0aW9ucy50ZXh0ID0gby5sYWJlbE1hcFtwYWdlSW5kZXhdO1xuXHRcdFx0fVxuXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQob3B0aW9ucywgb3B0cyB8fCB7fSk7XG5cblx0XHRcdGlmIChwYWdlSW5kZXggPT0gby5jdXJyZW50UGFnZSB8fCBvLmRpc2FibGVkKSB7XG5cdFx0XHRcdGlmIChvLmRpc2FibGVkIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ3ByZXYnIHx8IG9wdGlvbnMuY2xhc3NlcyA9PT0gJ25leHQnKSB7XG5cdFx0XHRcdFx0JGxpbmtXcmFwcGVyLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRsaW5rV3JhcHBlci5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiBjbGFzcz1cImN1cnJlbnRcIj4nICsgKG9wdGlvbnMudGV4dCkgKyAnPC9zcGFuPicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG8udXNlQW5jaG9ycykge1xuXHRcdFx0XHRcdCRsaW5rID0gJCgnPGEgaHJlZj1cIicgKyBvLmhyZWZUZXh0UHJlZml4ICsgKHBhZ2VJbmRleCArIDEpICsgby5ocmVmVGV4dFN1ZmZpeCArICdcIiBjbGFzcz1cInBhZ2UtbGlua1wiPicgKyAob3B0aW9ucy50ZXh0KSArICc8L2E+Jyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGxpbmsgPSAkKCc8c3BhbiA+JyArIChvcHRpb25zLnRleHQpICsgJzwvc3Bhbj4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbGluay5jbGljayhmdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdFx0cmV0dXJuIG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCBwYWdlSW5kZXgsIGV2ZW50KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLmNsYXNzZXMpIHtcblx0XHRcdFx0JGxpbmsuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc2VzKTtcblx0XHRcdH1cblxuXHRcdFx0JGxpbmtXcmFwcGVyLmFwcGVuZCgkbGluayk7XG5cblx0XHRcdGlmICgkdWwubGVuZ3RoKSB7XG5cdFx0XHRcdCR1bC5hcHBlbmQoJGxpbmtXcmFwcGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCRsaW5rV3JhcHBlcik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9zZWxlY3RQYWdlOiBmdW5jdGlvbihwYWdlSW5kZXgsIGV2ZW50KSB7XG5cdFx0XHR2YXIgbyA9IHRoaXMuZGF0YSgncGFnaW5hdGlvbicpO1xuXHRcdFx0by5jdXJyZW50UGFnZSA9IHBhZ2VJbmRleDtcblx0XHRcdGlmIChvLnNlbGVjdE9uQ2xpY2spIHtcblx0XHRcdFx0bWV0aG9kcy5fZHJhdy5jYWxsKHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG8ub25QYWdlQ2xpY2socGFnZUluZGV4ICsgMSwgZXZlbnQpO1xuXHRcdH0sXG5cblxuXHRcdF9lbGxpcHNlQ2xpY2s6IGZ1bmN0aW9uKCRwYW5lbCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRvID0gdGhpcy5kYXRhKCdwYWdpbmF0aW9uJyksXG5cdFx0XHRcdCRlbGxpcCA9ICRwYW5lbC5maW5kKCcuZWxsaXBzZScpO1xuXHRcdFx0JGVsbGlwLmFkZENsYXNzKCdjbGlja2FibGUnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRcdCRlbGxpcC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRpZiAoIW8uZGlzYWJsZSkge1xuXHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHR2YWwgPSAocGFyc2VJbnQoJHRoaXMucGFyZW50KCkucHJldigpLnRleHQoKSwgMTApIHx8IDApICsgMTtcblx0XHRcdFx0XHQkdGhpc1xuXHRcdFx0XHRcdFx0Lmh0bWwoJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG1heD1cIicgKyBvLnBhZ2VzICsgJ1wiIHN0ZXA9XCIxXCIgdmFsdWU9XCInICsgdmFsICsgJ1wiPicpXG5cdFx0XHRcdFx0XHQuZmluZCgnaW5wdXQnKVxuXHRcdFx0XHRcdFx0LmZvY3VzKClcblx0XHRcdFx0XHRcdC5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0XHQvLyBwcmV2ZW50IGlucHV0IG51bWJlciBhcnJvd3MgZnJvbSBidWJibGluZyBhIGNsaWNrIGV2ZW50IG9uICRlbGxpcFxuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChldmVudC53aGljaCA9PT0gMTMgJiYgdmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVudGVyIHRvIGFjY2VwdFxuXHRcdFx0XHRcdFx0XHRcdGlmICgodmFsPjApJiYodmFsPD1vLnBhZ2VzKSlcblx0XHRcdFx0XHRcdFx0XHRtZXRob2RzLl9zZWxlY3RQYWdlLmNhbGwoc2VsZiwgdmFsIC0gMSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT09IDI3KSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZXNjYXBlIHRvIGNhbmNlbFxuXHRcdFx0XHRcdFx0XHRcdCRlbGxpcC5lbXB0eSgpLmh0bWwoby5lbGxpcHNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuYmluZCgnYmx1cicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAodmFsICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZHMuX3NlbGVjdFBhZ2UuY2FsbChzZWxmLCB2YWwgLSAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQkZWxsaXAuZW1wdHkoKS5odG1sKG8uZWxsaXBzZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fTtcblxuXHQkLmZuLnBhZ2luYXRpb24gPSBmdW5jdGlvbihtZXRob2QpIHtcblxuXHRcdC8vIE1ldGhvZCBjYWxsaW5nIGxvZ2ljXG5cdFx0aWYgKG1ldGhvZHNbbWV0aG9kXSAmJiBtZXRob2QuY2hhckF0KDApICE9ICdfJykge1xuXHRcdFx0cmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcblx0XHRcdHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5lcnJvcignTWV0aG9kICcgKyAgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkucGFnaW5hdGlvbicpO1xuXHRcdH1cblxuXHR9O1xuXG59KShqUXVlcnkpOyIsIi8qXG4gICAgQSBzaW1wbGUgalF1ZXJ5IG1vZGFsIChodHRwOi8vZ2l0aHViLmNvbS9reWxlZm94L2pxdWVyeS1tb2RhbClcbiAgICBWZXJzaW9uIDAuOS4yXG4qL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgLy8gTWFraW5nIHlvdXIgalF1ZXJ5IHBsdWdpbiB3b3JrIGJldHRlciB3aXRoIG5wbSB0b29sc1xuICAvLyBodHRwOi8vYmxvZy5ucG1qcy5vcmcvcG9zdC8xMTI3MTIxNjk4MzAvbWFraW5nLXlvdXItanF1ZXJ5LXBsdWdpbi13b3JrLWJldHRlci13aXRoLW5wbVxuICBpZih0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgIGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgd2luZG93LCBkb2N1bWVudCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZmFjdG9yeShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQpO1xuICB9XG59KGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuXG4gIHZhciBtb2RhbHMgPSBbXSxcbiAgICAgIGdldEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG1vZGFscy5sZW5ndGggPyBtb2RhbHNbbW9kYWxzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgICAgIH0sXG4gICAgICBzZWxlY3RDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLFxuICAgICAgICAgICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChpPW1vZGFscy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgICAgaWYgKG1vZGFsc1tpXS4kYmxvY2tlcikge1xuICAgICAgICAgICAgbW9kYWxzW2ldLiRibG9ja2VyLnRvZ2dsZUNsYXNzKCdjdXJyZW50Jywhc2VsZWN0ZWQpLnRvZ2dsZUNsYXNzKCdiZWhpbmQnLHNlbGVjdGVkKTtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgJC55c3BfbW9kYWwgPSBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuICAgIHZhciByZW1vdmUsIHRhcmdldDtcbiAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLnlzcF9tb2RhbC5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zLmRvRmFkZSA9ICFpc05hTihwYXJzZUludCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCAxMCkpO1xuICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2VFeGlzdGluZylcbiAgICAgIHdoaWxlICgkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKVxuICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpOyAvLyBDbG9zZSBhbnkgb3BlbiBtb2RhbHMuXG4gICAgbW9kYWxzLnB1c2godGhpcyk7XG4gICAgaWYgKGVsLmlzKCdhJykpIHtcbiAgICAgIHRhcmdldCA9IGVsLmF0dHIoJ2hyZWYnKTtcbiAgICAgIHRoaXMuYW5jaG9yID0gZWw7XG4gICAgICAvL1NlbGVjdCBlbGVtZW50IGJ5IGlkIGZyb20gaHJlZlxuICAgICAgaWYgKC9eIy8udGVzdCh0YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuJGVsbSA9ICQodGFyZ2V0KTtcbiAgICAgICAgaWYgKHRoaXMuJGVsbS5sZW5ndGggIT09IDEpIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiRlbG0pO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIC8vQUpBWFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZWxtID0gJCgnPGRpdj4nKTtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgICAgcmVtb3ZlID0gZnVuY3Rpb24oZXZlbnQsIG1vZGFsKSB7IG1vZGFsLmVsbS5yZW1vdmUoKTsgfTtcbiAgICAgICAgdGhpcy5zaG93U3Bpbm5lcigpO1xuICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfU0VORCk7XG4gICAgICAgICQuZ2V0KHRhcmdldCkuZG9uZShmdW5jdGlvbihodG1sKSB7XG4gICAgICAgICAgaWYgKCEkLnlzcF9tb2RhbC5pc0FjdGl2ZSgpKSByZXR1cm47XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MpO1xuICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuICAgICAgICAgIGN1cnJlbnQuJGVsbS5lbXB0eSgpLmFwcGVuZChodG1sKS5vbigkLnlzcF9tb2RhbC5DTE9TRSwgcmVtb3ZlKTtcbiAgICAgICAgICBjdXJyZW50LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgY3VycmVudC5vcGVuKCk7XG4gICAgICAgICAgZWwudHJpZ2dlcigkLnlzcF9tb2RhbC5BSkFYX0NPTVBMRVRFKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfRkFJTCk7XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgICAgICAgY3VycmVudC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgIG1vZGFscy5wb3AoKTsgLy8gcmVtb3ZlIGV4cGVjdGVkIG1vZGFsIGZyb20gdGhlIGxpc3RcbiAgICAgICAgICBlbC50cmlnZ2VyKCQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxtID0gZWw7XG4gICAgICB0aGlzLmFuY2hvciA9IGVsO1xuICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kZWxtKTtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfTtcblxuICAkLnlzcF9tb2RhbC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6ICQueXNwX21vZGFsLFxuXG4gICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICB0aGlzLmJsb2NrKCk7XG4gICAgICB0aGlzLmFuY2hvci5ibHVyKCk7XG4gICAgICBpZih0aGlzLm9wdGlvbnMuZG9GYWRlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbS5zaG93KCk7XG4gICAgICAgIH0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24gKiB0aGlzLm9wdGlvbnMuZmFkZURlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJykub24oJ2tleWRvd24ubW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNyAmJiBjdXJyZW50Lm9wdGlvbnMuZXNjYXBlQ2xvc2UpIGN1cnJlbnQuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jbGlja0Nsb3NlKVxuICAgICAgICB0aGlzLiRibG9ja2VyLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICAkLnlzcF9tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgbW9kYWxzLnBvcCgpO1xuICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLm1vZGFsJyk7XG4gICAgfSxcblxuICAgIGJsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsbS50cmlnZ2VyKCQueXNwX21vZGFsLkJFRk9SRV9CTE9DSywgW3RoaXMuX2N0eCgpXSk7XG4gICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKTtcbiAgICAgIHRoaXMuJGJsb2NrZXIgPSAkKCc8ZGl2IGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5ibG9ja2VyQ2xhc3MgKyAnIGJsb2NrZXIgY3VycmVudFwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGJvZHkpO1xuICAgICAgc2VsZWN0Q3VycmVudCgpO1xuICAgICAgaWYodGhpcy5vcHRpb25zLmRvRmFkZSkge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNzcygnb3BhY2l0eScsMCkuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkxPQ0ssIFt0aGlzLl9jdHgoKV0pO1xuICAgIH0sXG5cbiAgICB1bmJsb2NrOiBmdW5jdGlvbihub3cpIHtcbiAgICAgIGlmICghbm93ICYmIHRoaXMub3B0aW9ucy5kb0ZhZGUpXG4gICAgICAgIHRoaXMuJGJsb2NrZXIuZmFkZU91dCh0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uLCB0aGlzLnVuYmxvY2suYmluZCh0aGlzLHRydWUpKTtcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLiRibG9ja2VyLmNoaWxkcmVuKCkuYXBwZW5kVG8odGhpcy4kYm9keSk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuJGJsb2NrZXIgPSBudWxsO1xuICAgICAgICBzZWxlY3RDdXJyZW50KCk7XG4gICAgICAgIGlmICghJC55c3BfbW9kYWwuaXNBY3RpdmUoKSlcbiAgICAgICAgICB0aGlzLiRib2R5LmNzcygnb3ZlcmZsb3cnLCcnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5CRUZPUkVfT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dDbG9zZSkge1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gJCgnPGEgaHJlZj1cIiNjbG9zZS1tb2RhbFwiIHJlbD1cIm1vZGFsOmNsb3NlXCIgY2xhc3M9XCJjbG9zZS1tb2RhbCAnICsgdGhpcy5vcHRpb25zLmNsb3NlQ2xhc3MgKyAnXCI+JyArIHRoaXMub3B0aW9ucy5jbG9zZVRleHQgKyAnPC9hPicpO1xuICAgICAgICB0aGlzLiRlbG0uYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLmFkZENsYXNzKHRoaXMub3B0aW9ucy5tb2RhbENsYXNzKS5hcHBlbmRUbyh0aGlzLiRibG9ja2VyKTtcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmNzcyh7b3BhY2l0eTogMCwgZGlzcGxheTogJ2lubGluZS1ibG9jayd9KS5hbmltYXRlKHtvcGFjaXR5OiAxfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRlbG0uY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuT1BFTiwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQkVGT1JFX0NMT1NFLCBbdGhpcy5fY3R4KCldKTtcbiAgICAgIGlmICh0aGlzLmNsb3NlQnV0dG9uKSB0aGlzLmNsb3NlQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGlmKHRoaXMub3B0aW9ucy5kb0ZhZGUpIHtcbiAgICAgICAgdGhpcy4kZWxtLmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSwgW190aGlzLl9jdHgoKV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVsbS5oaWRlKDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBfdGhpcy4kZWxtLnRyaWdnZXIoJC55c3BfbW9kYWwuQUZURVJfQ0xPU0UsIFtfdGhpcy5fY3R4KCldKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLiRlbG0udHJpZ2dlcigkLnlzcF9tb2RhbC5DTE9TRSwgW3RoaXMuX2N0eCgpXSk7XG4gICAgfSxcblxuICAgIHNob3dTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnNob3dTcGlubmVyKSByZXR1cm47XG4gICAgICB0aGlzLnNwaW5uZXIgPSB0aGlzLnNwaW5uZXIgfHwgJCgnPGRpdiBjbGFzcz1cIicgKyB0aGlzLm9wdGlvbnMubW9kYWxDbGFzcyArICctc3Bpbm5lclwiPjwvZGl2PicpXG4gICAgICAgIC5hcHBlbmQodGhpcy5vcHRpb25zLnNwaW5uZXJIdG1sKTtcbiAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuc3Bpbm5lcik7XG4gICAgICB0aGlzLnNwaW5uZXIuc2hvdygpO1xuICAgIH0sXG5cbiAgICBoaWRlU3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zcGlubmVyKSB0aGlzLnNwaW5uZXIucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIC8vUmV0dXJuIGNvbnRleHQgZm9yIGN1c3RvbSBldmVudHNcbiAgICBfY3R4OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7IGVsbTogdGhpcy4kZWxtLCAkZWxtOiB0aGlzLiRlbG0sICRibG9ja2VyOiB0aGlzLiRibG9ja2VyLCBvcHRpb25zOiB0aGlzLm9wdGlvbnMsICRhbmNob3I6IHRoaXMuYW5jaG9yIH07XG4gICAgfVxuICB9O1xuXG4gICQueXNwX21vZGFsLmNsb3NlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoISQueXNwX21vZGFsLmlzQWN0aXZlKCkpIHJldHVybjtcbiAgICBpZiAoZXZlbnQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG4gICAgY3VycmVudC5jbG9zZSgpO1xuICAgIHJldHVybiBjdXJyZW50LiRlbG07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBpZiB0aGVyZSBjdXJyZW50bHkgaXMgYW4gYWN0aXZlIG1vZGFsXG4gICQueXNwX21vZGFsLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtb2RhbHMubGVuZ3RoID4gMDtcbiAgfTtcblxuICAkLnlzcF9tb2RhbC5nZXRDdXJyZW50ID0gZ2V0Q3VycmVudDtcblxuICAkLnlzcF9tb2RhbC5kZWZhdWx0cyA9IHtcbiAgICBjbG9zZUV4aXN0aW5nOiB0cnVlLFxuICAgIGVzY2FwZUNsb3NlOiB0cnVlLFxuICAgIGNsaWNrQ2xvc2U6IHRydWUsXG4gICAgY2xvc2VUZXh0OiAnQ2xvc2UnLFxuICAgIGNsb3NlQ2xhc3M6ICcnLFxuICAgIG1vZGFsQ2xhc3M6IFwieXNwLW1vZGFsXCIsXG4gICAgYmxvY2tlckNsYXNzOiBcImpxdWVyeS1tb2RhbFwiLFxuICAgIHNwaW5uZXJIdG1sOiAnPGRpdiBjbGFzcz1cInJlY3QxXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QyXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3QzXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJlY3Q0XCI+PC9kaXY+JyxcbiAgICBzaG93U3Bpbm5lcjogdHJ1ZSxcbiAgICBzaG93Q2xvc2U6IHRydWUsXG4gICAgZmFkZUR1cmF0aW9uOiBudWxsLCAgIC8vIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhlIGZhZGUgYW5pbWF0aW9uIHRha2VzLlxuICAgIGZhZGVEZWxheTogMS4wICAgICAgICAvLyBQb2ludCBkdXJpbmcgdGhlIG92ZXJsYXkncyBmYWRlLWluIHRoYXQgdGhlIG1vZGFsIGJlZ2lucyB0byBmYWRlIGluICguNSA9IDUwJSwgMS41ID0gMTUwJSwgZXRjLilcbiAgfTtcblxuICAvLyBFdmVudCBjb25zdGFudHNcbiAgJC55c3BfbW9kYWwuQkVGT1JFX0JMT0NLID0gJ21vZGFsOmJlZm9yZS1ibG9jayc7XG4gICQueXNwX21vZGFsLkJMT0NLID0gJ21vZGFsOmJsb2NrJztcbiAgJC55c3BfbW9kYWwuQkVGT1JFX09QRU4gPSAnbW9kYWw6YmVmb3JlLW9wZW4nO1xuICAkLnlzcF9tb2RhbC5PUEVOID0gJ21vZGFsOm9wZW4nO1xuICAkLnlzcF9tb2RhbC5CRUZPUkVfQ0xPU0UgPSAnbW9kYWw6YmVmb3JlLWNsb3NlJztcbiAgJC55c3BfbW9kYWwuQ0xPU0UgPSAnbW9kYWw6Y2xvc2UnO1xuICAkLnlzcF9tb2RhbC5BRlRFUl9DTE9TRSA9ICdtb2RhbDphZnRlci1jbG9zZSc7XG4gICQueXNwX21vZGFsLkFKQVhfU0VORCA9ICdtb2RhbDphamF4OnNlbmQnO1xuICAkLnlzcF9tb2RhbC5BSkFYX1NVQ0NFU1MgPSAnbW9kYWw6YWpheDpzdWNjZXNzJztcbiAgJC55c3BfbW9kYWwuQUpBWF9GQUlMID0gJ21vZGFsOmFqYXg6ZmFpbCc7XG4gICQueXNwX21vZGFsLkFKQVhfQ09NUExFVEUgPSAnbW9kYWw6YWpheDpjb21wbGV0ZSc7XG5cbiAgJC5mbi55c3BfbW9kYWwgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIG5ldyAkLnlzcF9tb2RhbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gQXV0b21hdGljYWxseSBiaW5kIGxpbmtzIHdpdGggcmVsPVwibW9kYWw6Y2xvc2VcIiB0bywgd2VsbCwgY2xvc2UgdGhlIG1vZGFsLlxuICAkKGRvY3VtZW50KS5vbignY2xpY2subW9kYWwnLCAnYVtyZWx+PVwibW9kYWw6Y2xvc2VcIl0nLCAkLnlzcF9tb2RhbC5jbG9zZSk7XG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5tb2RhbCcsICdhW3JlbH49XCJtb2RhbDpvcGVuXCJdJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcykubW9kYWwoKTtcbiAgfSk7XG59KSk7IiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgXG4gIGpRdWVyeSgnW2RhdGEtbW9kYWxdJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnZnVjayBtZSAnKTtcblxuICAgIHZhciBkYXRhX21vZGFsID0galF1ZXJ5KHRoaXMpLmRhdGEoJ21vZGFsJyk7XG5cbiAgICBqUXVlcnkoIGRhdGFfbW9kYWwgKS55c3BfbW9kYWwoe1xuICAgIFx0Y2xvc2VUZXh0OiAnWCcsXG4gICAgICBtb2RhbENsYXNzOiAneXNwLW1vZGFsLW9wZW4nLFxuICAgICAgY2xvc2VDbGFzczogJ3lzcC1tb2RlbC1jbG9zZSdcbiAgICB9KTtcbiAgfSk7XG59KTtcbiIsIk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTdHJpbmcucHJvdG90eXBlLCAnZWFjaFdvcmRDYXBpdGFsaXplJywge1xuICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9Mb3dlckNhc2UoKVxuICAgIC5zcGxpdCgnICcpXG4gICAgLm1hcCgocykgPT4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc3Vic3RyaW5nKDEpKVxuICAgIC5qb2luKCcgJyk7XG4gIH0sXG4gIGVudW1lcmFibGU6IGZhbHNlXG59KTtcblxuZnVuY3Rpb24geXNwX2dldF9mb3JtX2RhdGEoZm9ybV9lbGUpIHtcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoIGZvcm1fZWxlICk7XG5cbiAgICBsZXQgZmQ9T2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhLmVudHJpZXMoKSk7XG5cbiAgICBmb3IgKGNvbnN0IFtmSW5kZXgsIGZpZWxkXSBvZiBPYmplY3QuZW50cmllcyhmZCkpIHtcblxuICAgICAgICBsZXQgVmFsQXJyYXkgPSBmb3JtRGF0YS5nZXRBbGwoZkluZGV4KTtcblxuICAgICAgICBpZiAodHlwZW9mIFZhbEFycmF5WzFdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBmZFsgZkluZGV4IF0gPSBWYWxBcnJheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmZFsgZkluZGV4IF0gPT0gJycpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBmZFtmSW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZkO1xufVxuXG5mdW5jdGlvbiB5c3Bfc2V0X2Zvcm1fdG9fZGF0YShpbnB1dERhdGEpIHtcblxuICAgIGxldCBmb3JtQT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG4gICAgbGV0IGZvcm1CPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AtbW9iaWxlLXlhY2h0LXNlYXJjaC1mb3JtJyk7XG5cbiAgICBmb3JtQS5yZXNldCgpO1xuICAgIGZvcm1CLnJlc2V0KCk7XG5cbiAgICBsZXQgZm9ybUlucHV0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC15YWNodC1zZWFyY2gtZm9ybVwiXSwgI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybVwiXScpO1xuXG4gICAgZm9ybUlucHV0cy5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgbGV0IGlucHV0ID0gZWxlO1xuXG4gICAgICAgIGxldCBuYW1lID0gZWxlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgIGxldCBoYXNQcmV0dHkgPSBpbnB1dERhdGFbIG5hbWUgXTtcblxuICAgICAgIC8vIGNvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBoYXNQcmV0dHkgIT0gJ251bGwnICYmIHR5cGVvZiBoYXNQcmV0dHkgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGFzUHJldHR5KSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaGFzUHJldHR5KTtcblxuICAgICAgICAgICAgICAgIGhhc1ByZXR0eS5mb3JFYWNoKChoUCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhQICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoYXNQcmV0dHkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGhhc1ByZXR0eTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHlzcF9wdXNoX2hpc3RvcnkoIGRhdGEgPSB7fSApIHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgIGxldCBzdHJwYXRoPScnO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGxldCBpdCA9IGRhdGFbIHByb3BlcnR5IF07XG5cblxuICAgICAgICBpZiAoaXQgIT0gJycgJiYgdHlwZW9mIGl0ICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpdCA9PSAnc3RyaW5nJyAmJiBwcm9wZXJ0eSAhPSAnT25GaXJzdExvYWQnICYmIHR5cGVvZiBpdCAhPSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChwcm9wZXJ0eSwgaXQpO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKGl0LnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJykpKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXQpKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBpdCk7XG5cbiAgICAgICAgICAgIGl0ID0gaXQubWFwKChwcm9wKSA9PiB7IHJldHVybiBwcm9wLnRvU3RyaW5nKCkuc3BsaXQoJyAnKS5qb2luKCctJyk7IH0pO1xuXG4gICAgICAgICAgICBzdHJwYXRoPXN0cnBhdGgrXCJcIitwcm9wZXJ0eSsnLScrKCBpdC5qb2luKFwiK1wiKSApKycvJztcbiAgICAgICAgICAgIHN0cnBhdGg9c3RycGF0aC50b0xvd2VyQ2FzZSgpOyAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy9oaXN0b3J5LnB1c2hTdGF0ZShkYXRhLCAnJywgeXNwX3lhY2h0X3N5bmMueWFjaHRfc2VhcmNoX3VybCsnPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCkpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKGRhdGEsICcnLCB5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfdXJsK3N0cnBhdGgpO1xuXG4gICAgcmV0dXJuIHlzcF95YWNodF9zeW5jLnlhY2h0X3NlYXJjaF91cmwrc3RycGF0aDsgICAgXG59XG5cbiIsInZhciB5c3BfYXBpPXt9O1xuXG4gICAgeXNwX2FwaS5jYWxsX2FwaT1mdW5jdGlvbihtZXRob2QsIHBhdGgsIHBhc3NpbmdfZGF0YSkge1xuICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VEYXRhID0gSlNPTi5wYXJzZSggdGhpcy5yZXNwb25zZVRleHQgKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlRGF0YSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0dFVCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhc3NpbmdfZGF0YS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBwYXNzaW5nX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KHByb3BlcnR5LCBwYXNzaW5nX2RhdGFbIHByb3BlcnR5IF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgX3F1ZXN0aW9uTWFyaz1zZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHlzcF95YWNodF9zeW5jLndwX3Jlc3RfdXJsK1wieXNwL1wiKyBwYXRoICsgKChfcXVlc3Rpb25NYXJrICE9ICcnKT8nPycrc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk6JycpLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdQT1NUJzpcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5vcGVuKFwiUE9TVFwiLCB5c3BfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInlzcC9cIisgcGF0aCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgICAgICAgICAgICAgICAgICB4aHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHBhc3NpbmdfZGF0YSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfTsiLCJ2YXIgeXNwX3RlbXBsYXRlcz17fTtcblx0eXNwX3RlbXBsYXRlcy55YWNodD17fTtcblx0XG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuZ3JpZD1mdW5jdGlvbih2ZXNzZWwsIHBhcmFtcykge1xuXHRcdGxldCBtZXRlcnMgPSBwYXJzZUludCh2ZXNzZWwuTm9taW5hbExlbmd0aCkgKiAwLjMwNDg7XG5cblx0XHRsZXQgcHJpY2UgPSAnJztcblx0XHRsZXQgbGVuZ3RoID0gJyc7XG5cblx0XHRpZiAoeXNwX3lhY2h0X3N5bmMuZXVyb3BlX29wdGlvbl9waWNrZWQgPT0gXCJ5ZXNcIikge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gKHR5cGVvZiB2ZXNzZWwuWVNQX0V1cm9WYWwgIT0gJ3VuZGVmaW5lZCcgJiYgdmVzc2VsLllTUF9FdXJvVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0fSBcblx0XHRlbHNlIHtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gdmVzc2VsLk5vbWluYWxMZW5ndGggKyBcIiAvIFwiICsgbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cblx0XHRcdGlmIChwYXJhbXMuY3VycmVuY3kgPT0gJ0V1cicpIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBg4oKsJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQodmVzc2VsLllTUF9FdXJvVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cHJpY2UgPSAodHlwZW9mIHZlc3NlbC5ZU1BfVVNEVmFsICE9ICd1bmRlZmluZWQnICYmIHZlc3NlbC5ZU1BfVVNEVmFsID4gMCkgPyBgJCR7bmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi11cycsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyfSkuZm9ybWF0KHZlc3NlbC5ZU1BfVVNEVmFsKSB9YCA6ICdDb250YWN0IFVzIEZvciBQcmljZSc7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRsZXQgdmVzc2VsTG9jYXRpb24sIHZlc3NlbEtleXdvcmRMb2NhdGlvbkxpbms7XG5cblx0XHRpZiAodmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUgIT0gJycpIHtcblxuXHQgICAgICAgIHZlc3NlbEtleXdvcmRMb2NhdGlvbkxpbms9YC95YWNodC1zZWFyY2gveXNfa2V5d29yZC0keyB2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDaXR5TmFtZS5yZXBsYWNlKCcgJywgJy0nKSB9YDtcblx0XHRcdFxuXHRcdFx0dmVzc2VsTG9jYXRpb24gPSAodmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEID09IFwiVVNcIiB8fCB2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUQgPT0gXCJVbml0ZWQgU3RhdGVzXCIgPyBgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDaXR5TmFtZS50b0xvd2VyQ2FzZSgpfSwgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRTdGF0ZUNvZGV9YCA6IGAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lLnRvTG93ZXJDYXNlKCl9LCAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRH1gKTtcblx0ICAgICAgICBcblx0ICAgICAgICAgICAgdmVzc2VsTG9jYXRpb24gPSB2ZXNzZWxMb2NhdGlvbjtcblxuXHRcdH1cblx0XHRlbHNlIHtcblx0ICAgICAgICB2ZXNzZWxLZXl3b3JkTG9jYXRpb25MaW5rPWAveWFjaHQtc2VhcmNoL3lzX2tleXdvcmQtJHsgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlELnJlcGxhY2UoJyAnLCAnLScpIH1gO1xuXG5cdFx0XHR2ZXNzZWxMb2NhdGlvbiA9IGAke3Zlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRH1gO1xuXHRcdH1cblxuXHRcdHJldHVybiBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwieXNwLXlhY2h0LWl0ZW0geXNwLXZpZXctZ3JpZFwiIGRhdGEtcG9zdC1pZD1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiBkYXRhLXlhY2h0LWlkPVwiJHsgdmVzc2VsLkRvY3VtZW50SUQgfVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmktaW1hZ2VcIj5cblx0XHRcdFx0XHQ8YSBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdDxpbWcgY2xhc3M9XCJ5YWNodC1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogeXNwX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PHN2ZyB0aXRsZT1cImxpa2VcIiBjbGFzcz1cImxpa2UtbWUgbG92ZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjU3XCIgaGVpZ2h0PVwiNTRcIiB2aWV3Qm94PVwiMCAwIDU3IDU0XCIgZmlsbD1cIm5vbmVcIiAgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0XHRcdCAgPGcgZmlsdGVyPVwidXJsKCNmaWx0ZXIwX2RfMjg4OF80MzMzKVwiPlxuXHRcdFx0XHRcdFx0ICAgIDxwYXRoIGQ9XCJNMzQuNzAyOCAxMS41NzU1QzM2LjIwOTQgMTEuNTc1NSAzNy42MjUxIDEyLjE2OTkgMzguNjg5OCAxMy4yNDg4TDM4LjgyMjMgMTMuMzgzQzQxLjAyMDYgMTUuNjExNiA0MS4wMjA2IDE5LjIzNzUgMzguODIyMyAyMS40NjZMMzguMDk5MiAyMi4xOTlMMjcuNDk5NSAzMi45NDQyTDE4LjQ4ODMgMjMuODA4TDE2LjkwMTEgMjIuMTk5TDE2LjE3OCAyMS40NjZDMTMuOTc5NyAxOS4yMzc1IDEzLjk3OTcgMTUuNjExNiAxNi4xNzggMTMuMzgzTDE2LjMwODMgMTMuMjUwOUMxNy4zNzM5IDEyLjE3MDggMTguNzkgMTEuNTc1OSAyMC4yOTYyIDExLjU3NjRDMjEuODAyMyAxMS41NzY0IDIzLjIxNzYgMTIuMTcwOCAyNC4yODE5IDEzLjI0OTJMMjUuMDA1IDEzLjk4MjJMMjcuNDk5MSAxNi41MTAxTDI5Ljk5MjggMTMuOTgxOEwzMC43MTU4IDEzLjI0ODhDMzEuNzgwMSAxMi4xNjk5IDMzLjE5NjIgMTEuNTc1NSAzNC43MDI4IDExLjU3NTVaTTM0LjcwMjggOEMzMi4zNTcgOCAzMC4wMTEyIDguOTA2OCAyOC4yMjIyIDEwLjcyMDRMMjcuNDk5MSAxMS40NTM0TDI2Ljc3NiAxMC43MjA0QzI0Ljk4NzggOC45MDcyMyAyMi42NDIgOC4wMDA0MyAyMC4yOTcgOEMxNy45NTA4IDggMTUuNjA1IDguOTA3MjMgMTMuODE0NyAxMC43MjIxTDEzLjY4NDQgMTAuODU0MkMxMC4xMDQ2IDE0LjQ4MzIgMTAuMTA0NiAyMC4zNjQ1IDEzLjY4NDQgMjMuOTkzNUwxNC40MDc0IDI0LjcyNjVMMTUuOTk0NiAyNi4zMzU0TDI3LjQ5OTUgMzhMNDAuNTkzMyAyNC43MjY1TDQxLjMxNjQgMjMuOTkzNUM0NC44OTQ1IDIwLjM2NjMgNDQuODk0NSAxNC40ODE0IDQxLjMxNjQgMTAuODU0Mkw0MS4xODM5IDEwLjcyQzM5LjM5NDUgOC45MDY4IDM3LjA0ODYgOCAzNC43MDI4IDhaXCIgZmlsbD1cIndoaXRlXCI+PC9wYXRoPlxuXHRcdFx0XHRcdFx0ICA8L2c+XG5cdFx0XHRcdFx0XHQgIDxkZWZzPlxuXHRcdFx0XHRcdFx0ICAgIDxmaWx0ZXIgaWQ9XCJmaWx0ZXIwX2RfMjg4OF80MzMzXCIgeD1cIi0wLjAwMDQ4ODI4MVwiIHk9XCIwXCIgd2lkdGg9XCI1Ny4wMDA1XCIgaGVpZ2h0PVwiNTRcIiBmaWx0ZXJVbml0cz1cInVzZXJTcGFjZU9uVXNlXCIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPVwic1JHQlwiPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT1cIjBcIiByZXN1bHQ9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIj48L2ZlRmxvb2Q+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb2xvck1hdHJpeCBpbj1cIlNvdXJjZUFscGhhXCIgdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwXCIgcmVzdWx0PVwiaGFyZEFscGhhXCI+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlT2Zmc2V0IGR4PVwiMVwiIGR5PVwiNFwiPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPVwiNlwiPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVDb21wb3NpdGUgaW4yPVwiaGFyZEFscGhhXCIgb3BlcmF0b3I9XCJvdXRcIj48L2ZlQ29tcG9zaXRlPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT1cIm1hdHJpeFwiIHZhbHVlcz1cIjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMFwiPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUJsZW5kIG1vZGU9XCJub3JtYWxcIiBpbjI9XCJCYWNrZ3JvdW5kSW1hZ2VGaXhcIiByZXN1bHQ9XCJlZmZlY3QxX2Ryb3BTaGFkb3dfMjg4OF80MzMzXCI+PC9mZUJsZW5kPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQmxlbmQgbW9kZT1cIm5vcm1hbFwiIGluPVwiU291cmNlR3JhcGhpY1wiIGluMj1cImVmZmVjdDFfZHJvcFNoYWRvd18yODg4XzQzMzNcIiByZXN1bHQ9XCJzaGFwZVwiPjwvZmVCbGVuZD5cblx0XHRcdFx0XHRcdCAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHRcdCAgPC9kZWZzPlxuXHRcdFx0XHRcdFx0PC9zdmc+XG5cblx0XHRcdFx0XHRcdDxsYWJlbCBjbGFzcz1cInRvcC1jb21wYXJlXCIgdGl0bGU9XCJjb21wYXJlXCI+XG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNvbXBhcmVfdG9nZ2xlXCIgbmFtZT1cImNvbXBhcmVcIiB2YWx1ZT1cIiR7IHZlc3NlbC5fcG9zdElEIH1cIiAvPlxuXG5cdFx0XHRcdFx0XHRcdDxzdmcgd2lkdGg9XCI1OFwiIGhlaWdodD1cIjI1XCIgdmlld0JveD1cIjAgMCA1OCAyNVwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTUxLjUwMjkgMTguMTk1M0w1NC42NzUzIDE0Ljc3NjdDNTUuNDQxMSAxMy45NTE1IDU1LjEyNTggMTIuNTQxOCA1NC4wOTM3IDEyLjE4NDNMNTIuMiAxMS41Mjg0VjQuNjg3NUM1Mi4yIDMuODI0NTYgNTEuNTUwOCAzLjEyNSA1MC43NSAzLjEyNUg0Ny44NVYxLjE3MTg3QzQ3Ljg1IDAuNTI0NjU4IDQ3LjM2MzEgMCA0Ni43NjI1IDBINDAuMjM3NUMzOS42MzY5IDAgMzkuMTUgMC41MjQ2NTggMzkuMTUgMS4xNzE4N1YzLjEyNUgzNi4yNUMzNS40NDkyIDMuMTI1IDM0LjggMy44MjQ1NiAzNC44IDQuNjg3NVYxMS41Mjg0TDMyLjkwNjMgMTIuMTg0M0MzMS44NzUzIDEyLjU0MTQgMzEuNTU4MSAxMy45NTA2IDMyLjMyNDcgMTQuNzc2N0wzNS40OTcxIDE4LjE5NTNDMzQuNzAxNiAyMC4zMjY1IDMyLjg3ODIgMjEuODc1IDMwLjA4NzUgMjEuODc1QzI5LjQ4NjkgMjEuODc1IDI5IDIyLjM5OTcgMjkgMjMuMDQ2OVYyMy44MjgxQzI5IDI0LjQ3NTMgMjkuNDg2OSAyNSAzMC4wODc1IDI1QzMyLjg1MjYgMjUgMzQuOTU4NSAyMy45OTM3IDM2LjU3ODkgMjIuMDk5OEMzNy4yMzIyIDIzLjgwMDQgMzguNzg4NSAyNSA0MC42IDI1SDQ2LjRDNDguMjExNiAyNSA0OS43Njc4IDIzLjgwMDQgNTAuNDIxMSAyMi4wOTk4QzUyLjA0MTIgMjMuOTkzNCA1NC4xNDcgMjUgNTYuOTEyNSAyNUM1Ny41MTMxIDI1IDU4IDI0LjQ3NTMgNTggMjMuODI4MVYyMy4wNDY5QzU4IDIyLjM5OTcgNTcuNTEzMSAyMS44NzUgNTYuOTEyNSAyMS44NzVDNTQuMTU2NyAyMS44NzUgNTIuMzExNCAyMC4zNjEzIDUxLjUwMjkgMTguMTk1M1pNMzcuNyA2LjI1SDQ5LjNWMTAuNTI0TDQzLjk0MzcgOC42Njg3NUM0My42NTUyIDguNTY4OCA0My4zNDQ4IDguNTY4OCA0My4wNTYzIDguNjY4NzVMMzcuNyAxMC41MjRWNi4yNVpcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNMjIuNTAyOSAxOC4xOTUzTDI1LjY3NTMgMTQuNzc2N0MyNi40NDExIDEzLjk1MTUgMjYuMTI1OCAxMi41NDE4IDI1LjA5MzcgMTIuMTg0M0wyMy4yIDExLjUyODRWNC42ODc1QzIzLjIgMy44MjQ1NiAyMi41NTA4IDMuMTI1IDIxLjc1IDMuMTI1SDE4Ljg1VjEuMTcxODhDMTguODUgMC41MjQ2NTggMTguMzYzMSAwIDE3Ljc2MjUgMEgxMS4yMzc1QzEwLjYzNjkgMCAxMC4xNSAwLjUyNDY1OCAxMC4xNSAxLjE3MTg4VjMuMTI1SDcuMjVDNi40NDkxOSAzLjEyNSA1LjggMy44MjQ1NiA1LjggNC42ODc1VjExLjUyODRMMy45MDYzIDEyLjE4NDNDMi44NzUzIDEyLjU0MTQgMi41NTgwNyAxMy45NTA2IDMuMzI0NjcgMTQuNzc2N0w2LjQ5NzA5IDE4LjE5NTNDNS43MDE1OCAyMC4zMjY1IDMuODc4MTYgMjEuODc1IDEuMDg3NSAyMS44NzVDMC40ODY4ODMgMjEuODc1IDAgMjIuMzk5NyAwIDIzLjA0NjlWMjMuODI4MUMwIDI0LjQ3NTMgMC40ODY4ODMgMjUgMS4wODc1IDI1QzMuODUyNiAyNSA1Ljk1ODU1IDIzLjk5MzcgNy41Nzg4OCAyMi4wOTk4QzguMjMyMjQgMjMuODAwNCA5Ljc4ODQ1IDI1IDExLjYgMjVIMTcuNEMxOS4yMTE1IDI1IDIwLjc2NzggMjMuODAwNCAyMS40MjExIDIyLjA5OThDMjMuMDQxMiAyMy45OTM0IDI1LjE0NyAyNSAyNy45MTI1IDI1QzI4LjUxMzEgMjUgMjkgMjQuNDc1MyAyOSAyMy44MjgxVjIzLjA0NjlDMjkgMjIuMzk5NyAyOC41MTMxIDIxLjg3NSAyNy45MTI1IDIxLjg3NUMyNS4xNTY3IDIxLjg3NSAyMy4zMTE0IDIwLjM2MTMgMjIuNTAyOSAxOC4xOTUzWk04LjcgNi4yNUgyMC4zVjEwLjUyNEwxNC45NDM3IDguNjY4NzVDMTQuNjU1MiA4LjU2ODggMTQuMzQ0OCA4LjU2ODggMTQuMDU2MyA4LjY2ODc1TDguNyAxMC41MjRWNi4yNVpcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDwvc3ZnPlx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8L2xhYmVsPlxuXG5cblx0XHRcdFx0XHRcdCR7dmVzc2VsLkNvbXBhbnlOYW1lID09PSB5c3BfeWFjaHRfc3luYy5jb21wYW55X25hbWUgPyBgPGRpdiBjbGFzcz1cImNvbXBhbnktYmFubmVyXCI+PGltZyBzcmM9XCIke3lzcF95YWNodF9zeW5jLmNvbXBhbnlfbG9nb31cIj48L2Rpdj5gIDogJyd9XG5cdFx0XHRcdFxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1wcmljZVwiPiR7IHByaWNlIH08L3NwYW4+XG5cdFx0XHRcdFx0PC9hPlx0XG5cdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJyZXN1bHQtaXRlbS1pbmZvXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLXRvcFwiPlxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktbmFtZVwiPiR7dmVzc2VsLk1vZGVsWWVhciA/IHZlc3NlbC5Nb2RlbFllYXIgOiAnJ30gJHt2ZXNzZWwuTWFrZVN0cmluZyA/IHZlc3NlbC5NYWtlU3RyaW5nIDogJyd9ICR7dmVzc2VsLk1vZGVsID8gdmVzc2VsLk1vZGVsIDogJyd9PC9zcGFuPjxicj5cblxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJpLXN1Yi1uYW1lXCI+JHsgdmVzc2VsLkJvYXROYW1lID8gdmVzc2VsLkJvYXROYW1lIDogJ04vQScgfTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJyaS1ib3R0b21cIj5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicmktbG9jYXRpb25cIj5cdFxuXHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiJHsgdmVzc2VsS2V5d29yZExvY2F0aW9uTGluayB9XCI+XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMThcIiB2aWV3Qm94PVwiMCAwIDE4IDE4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk0xNS43NSA3LjVDMTUuNzUgMTIuNzUgOSAxNy4yNSA5IDE3LjI1QzkgMTcuMjUgMi4yNSAxMi43NSAyLjI1IDcuNUMyLjI1IDUuNzA5NzkgMi45NjExNiAzLjk5MjkgNC4yMjcwMyAyLjcyNzAzQzUuNDkyOSAxLjQ2MTE2IDcuMjA5NzkgMC43NSA5IDAuNzVDMTAuNzkwMiAwLjc1IDEyLjUwNzEgMS40NjExNiAxMy43NzMgMi43MjcwM0MxNS4wMzg4IDMuOTkyOSAxNS43NSA1LjcwOTc5IDE1Ljc1IDcuNVpcIiBzdHJva2U9XCIjMDY3QUVEXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9XCJNOSA5Ljc1QzEwLjI0MjYgOS43NSAxMS4yNSA4Ljc0MjY0IDExLjI1IDcuNUMxMS4yNSA2LjI1NzM2IDEwLjI0MjYgNS4yNSA5IDUuMjVDNy43NTczNiA1LjI1IDYuNzUgNi4yNTczNiA2Ljc1IDcuNUM2Ljc1IDguNzQyNjQgNy43NTczNiA5Ljc1IDkgOS43NVpcIiBzdHJva2U9XCIjMDY3QUVEXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxuXHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0XHRcdCR7IHZlc3NlbExvY2F0aW9uIH1cblx0XHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdFx0PC9zcGFuPlxuXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxcIiBjbGFzcz1cInJpLWNvbnRhY3RcIiBkYXRhLW1vZGFsPVwiI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxcIj5cblx0XHRcdFx0XHRcdFx0Q29udGFjdFxuXHRcdFx0XHRcdFx0XHQ8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cIm5vbmVcIj5cblx0XHRcdFx0XHRcdFx0PGcgY2xpcC1wYXRoPVwidXJsKCNjbGlwMF84MTAxXzEwMjc3KVwiPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTE1LjU1NTYgMEg1Ljc3NzhDNS41MzIxNCAwIDUuMzMzMzQgMC4xOTg3OTIgNS4zMzMzNCAwLjQ0NDQ1OEM1LjMzMzM0IDAuNjkwMTI1IDUuNTMyMTQgMC44ODg5MTcgNS43Nzc4IDAuODg4OTE3SDE0LjQ4MjdMMC4xMzAyMTkgMTUuMjQxM0MtMC4wNDM0MDYyIDE1LjQxNSAtMC4wNDM0MDYyIDE1LjY5NjIgMC4xMzAyMTkgMTUuODY5OEMwLjIxNzAxIDE1Ljk1NjYgMC4zMzA3NiAxNiAwLjQ0NDQ2OSAxNkMwLjU1ODE3NyAxNiAwLjY3MTg4NSAxNS45NTY2IDAuNzU4NzE5IDE1Ljg2OThMMTUuMTExMSAxLjUxNzM3VjEwLjIyMjJDMTUuMTExMSAxMC40Njc5IDE1LjMwOTkgMTAuNjY2NyAxNS41NTU2IDEwLjY2NjdDMTUuODAxMyAxMC42NjY3IDE2LjAwMDEgMTAuNDY3OSAxNi4wMDAxIDEwLjIyMjJWMC40NDQ0NThDMTYgMC4xOTg3OTIgMTUuODAxMiAwIDE1LjU1NTYgMFpcIiBmaWxsPVwiIzA2N0FFRFwiLz5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0XHQ8ZGVmcz5cblx0XHRcdFx0XHRcdFx0PGNsaXBQYXRoIGlkPVwiY2xpcDBfODEwMV8xMDI3N1wiPlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDwvY2xpcFBhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZGVmcz5cblx0XHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblx0fTtcblxuXHR5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3Q9ZnVuY3Rpb24odmVzc2VsKSB7XG5cdFx0bGV0IG1ldGVycyA9IHBhcnNlSW50KHZlc3NlbC5Ob21pbmFsTGVuZ3RoKSAqIDAuMzA0ODtcblx0XHRsZXQgcHJpY2UgPSAnJztcblx0XHRsZXQgbGVuZ3RoID0gJyc7XG5cblx0XHRpZih5c3BfeWFjaHRfc3luYy5ldXJvcGVfb3B0aW9uX3BpY2tlZCA9PSBcInllc1wiKXtcblx0XHRcdGxlbmd0aCA9IHZlc3NlbC5Ob21pbmFsTGVuZ3RoID8gbWV0ZXJzLnRvRml4ZWQoMikgKyAnIG0nIDogJ04vQSc7XG5cdFx0XHRwcmljZSA9IHZlc3NlbC5QcmljZSA/IGDigqwgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQoKHBhcnNlSW50KHZlc3NlbC5QcmljZS5zbGljZSgwLCAtMykpICogeXNwX3lhY2h0X3N5bmMuZXVyb19jX2MpKX1gIDogJ0NvbnRhY3QgVXMgRm9yIFByaWNlJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVuZ3RoID0gdmVzc2VsLk5vbWluYWxMZW5ndGggPyB2ZXNzZWwuTm9taW5hbExlbmd0aCArIFwiIC8gXCIgKyBtZXRlcnMudG9GaXhlZCgyKSArICcgbScgOiAnTi9BJztcblx0XHRcdHByaWNlID0gdmVzc2VsLlByaWNlID8gYCQgJHtuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLXVzJywgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDJ9KS5mb3JtYXQocGFyc2VJbnQodmVzc2VsLlByaWNlLnNsaWNlKDAsIC0zKSkpfWAgOiAnQ29udGFjdCBVcyBGb3IgUHJpY2UnXG5cdFx0fVxuXG5cdFx0bGV0IHZlc3NlbExvY2F0aW9uLCB2ZXNzZWxLZXl3b3JkTG9jYXRpb25MaW5rO1xuXG5cdFx0aWYgKHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENpdHlOYW1lICE9ICcnKSB7XG5cblx0ICAgICAgICB2ZXNzZWxLZXl3b3JkTG9jYXRpb25MaW5rPWAveWFjaHQtc2VhcmNoL3lzX2tleXdvcmQtJHsgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUucmVwbGFjZSgnICcsICctJykgfWA7XG5cdFx0XHRcblx0XHRcdHZlc3NlbExvY2F0aW9uID0gKHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRCA9PSBcIlVTXCIgfHwgdmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEID09IFwiVW5pdGVkIFN0YXRlc1wiID8gYCR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q2l0eU5hbWUudG9Mb3dlckNhc2UoKX0sICR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0U3RhdGVDb2RlfWAgOiBgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDaXR5TmFtZS50b0xvd2VyQ2FzZSgpfSwgJHt2ZXNzZWwuQm9hdExvY2F0aW9uLkJvYXRDb3VudHJ5SUR9YCk7XG5cdCAgICAgICAgXG5cdCAgICAgICAgICAgIHZlc3NlbExvY2F0aW9uID0gdmVzc2VsTG9jYXRpb247XG5cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdCAgICAgICAgdmVzc2VsS2V5d29yZExvY2F0aW9uTGluaz1gL3lhY2h0LXNlYXJjaC95c19rZXl3b3JkLSR7IHZlc3NlbC5Cb2F0TG9jYXRpb24uQm9hdENvdW50cnlJRC5yZXBsYWNlKCcgJywgJy0nKSB9YDtcblx0ICAgICAgICBcblx0XHRcdHZlc3NlbExvY2F0aW9uID0gYCR7dmVzc2VsLkJvYXRMb2NhdGlvbi5Cb2F0Q291bnRyeUlEfWA7XG5cdFx0fVxuXG5cblx0XHRyZXR1cm4gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInlzcC15YWNodC1pdGVtIHlzcC12aWV3LWxpc3RcIiBkYXRhLXBvc3QtaWQ9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgZGF0YS15YWNodC1pZD1cIiR7IHZlc3NlbC5Eb2N1bWVudElEIH1cIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLWltYWdlXCI+XG5cdFx0XHRcdFx0PGEgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtaW1hZ2VcIiBzcmM9XCIke3Zlc3NlbC5JbWFnZXMgPyB2ZXNzZWwuSW1hZ2VzWzBdLlVyaSA6IHlzcF95YWNodF9zeW5jLmFzc2V0c191cmwgKyAnaW1hZ2VzL2RlZmF1bHQteWFjaHQtaW1hZ2UuanBlZyd9XCIgYWx0PVwieWFjaHQtaW1hZ2VcIiBsb2FkaW5nPVwibGF6eVwiIC8+XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdDxzdmcgdGl0bGU9XCJjb21wYXJlXCIgY2xhc3M9XCJsaWtlLW1lIGxvdmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCI1N1wiIGhlaWdodD1cIjU0XCIgdmlld0JveD1cIjAgMCA1NyA1NFwiIGZpbGw9XCJub25lXCIgIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XG5cdFx0XHRcdFx0XHQgIDxnIGZpbHRlcj1cInVybCgjZmlsdGVyMF9kXzI4ODhfNDMzMylcIj5cblx0XHRcdFx0XHRcdCAgICA8cGF0aCBkPVwiTTM0LjcwMjggMTEuNTc1NUMzNi4yMDk0IDExLjU3NTUgMzcuNjI1MSAxMi4xNjk5IDM4LjY4OTggMTMuMjQ4OEwzOC44MjIzIDEzLjM4M0M0MS4wMjA2IDE1LjYxMTYgNDEuMDIwNiAxOS4yMzc1IDM4LjgyMjMgMjEuNDY2TDM4LjA5OTIgMjIuMTk5TDI3LjQ5OTUgMzIuOTQ0MkwxOC40ODgzIDIzLjgwOEwxNi45MDExIDIyLjE5OUwxNi4xNzggMjEuNDY2QzEzLjk3OTcgMTkuMjM3NSAxMy45Nzk3IDE1LjYxMTYgMTYuMTc4IDEzLjM4M0wxNi4zMDgzIDEzLjI1MDlDMTcuMzczOSAxMi4xNzA4IDE4Ljc5IDExLjU3NTkgMjAuMjk2MiAxMS41NzY0QzIxLjgwMjMgMTEuNTc2NCAyMy4yMTc2IDEyLjE3MDggMjQuMjgxOSAxMy4yNDkyTDI1LjAwNSAxMy45ODIyTDI3LjQ5OTEgMTYuNTEwMUwyOS45OTI4IDEzLjk4MThMMzAuNzE1OCAxMy4yNDg4QzMxLjc4MDEgMTIuMTY5OSAzMy4xOTYyIDExLjU3NTUgMzQuNzAyOCAxMS41NzU1Wk0zNC43MDI4IDhDMzIuMzU3IDggMzAuMDExMiA4LjkwNjggMjguMjIyMiAxMC43MjA0TDI3LjQ5OTEgMTEuNDUzNEwyNi43NzYgMTAuNzIwNEMyNC45ODc4IDguOTA3MjMgMjIuNjQyIDguMDAwNDMgMjAuMjk3IDhDMTcuOTUwOCA4IDE1LjYwNSA4LjkwNzIzIDEzLjgxNDcgMTAuNzIyMUwxMy42ODQ0IDEwLjg1NDJDMTAuMTA0NiAxNC40ODMyIDEwLjEwNDYgMjAuMzY0NSAxMy42ODQ0IDIzLjk5MzVMMTQuNDA3NCAyNC43MjY1TDE1Ljk5NDYgMjYuMzM1NEwyNy40OTk1IDM4TDQwLjU5MzMgMjQuNzI2NUw0MS4zMTY0IDIzLjk5MzVDNDQuODk0NSAyMC4zNjYzIDQ0Ljg5NDUgMTQuNDgxNCA0MS4zMTY0IDEwLjg1NDJMNDEuMTgzOSAxMC43MkMzOS4zOTQ1IDguOTA2OCAzNy4wNDg2IDggMzQuNzAyOCA4WlwiIGZpbGw9XCJ3aGl0ZVwiPjwvcGF0aD5cblx0XHRcdFx0XHRcdCAgPC9nPlxuXHRcdFx0XHRcdFx0ICA8ZGVmcz5cblx0XHRcdFx0XHRcdCAgICA8ZmlsdGVyIGlkPVwiZmlsdGVyMF9kXzI4ODhfNDMzM1wiIHg9XCItMC4wMDA0ODgyODFcIiB5PVwiMFwiIHdpZHRoPVwiNTcuMDAwNVwiIGhlaWdodD1cIjU0XCIgZmlsdGVyVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz1cInNSR0JcIj5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUZsb29kIGZsb29kLW9wYWNpdHk9XCIwXCIgcmVzdWx0PVwiQmFja2dyb3VuZEltYWdlRml4XCI+PC9mZUZsb29kPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29sb3JNYXRyaXggaW49XCJTb3VyY2VBbHBoYVwiIHR5cGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMFwiIHJlc3VsdD1cImhhcmRBbHBoYVwiPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZU9mZnNldCBkeD1cIjFcIiBkeT1cIjRcIj48L2ZlT2Zmc2V0PlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj1cIjZcIj48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHRcdFx0ICAgICAgPGZlQ29tcG9zaXRlIGluMj1cImhhcmRBbHBoYVwiIG9wZXJhdG9yPVwib3V0XCI+PC9mZUNvbXBvc2l0ZT5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDBcIj48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0XHQgICAgICA8ZmVCbGVuZCBtb2RlPVwibm9ybWFsXCIgaW4yPVwiQmFja2dyb3VuZEltYWdlRml4XCIgcmVzdWx0PVwiZWZmZWN0MV9kcm9wU2hhZG93XzI4ODhfNDMzM1wiPjwvZmVCbGVuZD5cblx0XHRcdFx0XHRcdCAgICAgIDxmZUJsZW5kIG1vZGU9XCJub3JtYWxcIiBpbj1cIlNvdXJjZUdyYXBoaWNcIiBpbjI9XCJlZmZlY3QxX2Ryb3BTaGFkb3dfMjg4OF80MzMzXCIgcmVzdWx0PVwic2hhcGVcIj48L2ZlQmxlbmQ+XG5cdFx0XHRcdFx0XHQgICAgPC9maWx0ZXI+XG5cdFx0XHRcdFx0XHQgIDwvZGVmcz5cblx0XHRcdFx0XHRcdDwvc3ZnPlxuXG5cdFx0XHRcdFx0XHQ8bGFiZWwgY2xhc3M9XCJ0b3AtY29tcGFyZVwiIHRpdGxlPVwiY29tcGFyZVwiPlxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjb21wYXJlX3RvZ2dsZVwiIG5hbWU9XCJjb21wYXJlXCIgdmFsdWU9XCIkeyB2ZXNzZWwuX3Bvc3RJRCB9XCIgLz5cblxuXHRcdFx0XHRcdFx0XHQ8c3ZnIHdpZHRoPVwiNThcIiBoZWlnaHQ9XCIyNVwiIHZpZXdCb3g9XCIwIDAgNTggMjVcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD1cIk01MS41MDI5IDE4LjE5NTNMNTQuNjc1MyAxNC43NzY3QzU1LjQ0MTEgMTMuOTUxNSA1NS4xMjU4IDEyLjU0MTggNTQuMDkzNyAxMi4xODQzTDUyLjIgMTEuNTI4NFY0LjY4NzVDNTIuMiAzLjgyNDU2IDUxLjU1MDggMy4xMjUgNTAuNzUgMy4xMjVINDcuODVWMS4xNzE4N0M0Ny44NSAwLjUyNDY1OCA0Ny4zNjMxIDAgNDYuNzYyNSAwSDQwLjIzNzVDMzkuNjM2OSAwIDM5LjE1IDAuNTI0NjU4IDM5LjE1IDEuMTcxODdWMy4xMjVIMzYuMjVDMzUuNDQ5MiAzLjEyNSAzNC44IDMuODI0NTYgMzQuOCA0LjY4NzVWMTEuNTI4NEwzMi45MDYzIDEyLjE4NDNDMzEuODc1MyAxMi41NDE0IDMxLjU1ODEgMTMuOTUwNiAzMi4zMjQ3IDE0Ljc3NjdMMzUuNDk3MSAxOC4xOTUzQzM0LjcwMTYgMjAuMzI2NSAzMi44NzgyIDIxLjg3NSAzMC4wODc1IDIxLjg3NUMyOS40ODY5IDIxLjg3NSAyOSAyMi4zOTk3IDI5IDIzLjA0NjlWMjMuODI4MUMyOSAyNC40NzUzIDI5LjQ4NjkgMjUgMzAuMDg3NSAyNUMzMi44NTI2IDI1IDM0Ljk1ODUgMjMuOTkzNyAzNi41Nzg5IDIyLjA5OThDMzcuMjMyMiAyMy44MDA0IDM4Ljc4ODUgMjUgNDAuNiAyNUg0Ni40QzQ4LjIxMTYgMjUgNDkuNzY3OCAyMy44MDA0IDUwLjQyMTEgMjIuMDk5OEM1Mi4wNDEyIDIzLjk5MzQgNTQuMTQ3IDI1IDU2LjkxMjUgMjVDNTcuNTEzMSAyNSA1OCAyNC40NzUzIDU4IDIzLjgyODFWMjMuMDQ2OUM1OCAyMi4zOTk3IDU3LjUxMzEgMjEuODc1IDU2LjkxMjUgMjEuODc1QzU0LjE1NjcgMjEuODc1IDUyLjMxMTQgMjAuMzYxMyA1MS41MDI5IDE4LjE5NTNaTTM3LjcgNi4yNUg0OS4zVjEwLjUyNEw0My45NDM3IDguNjY4NzVDNDMuNjU1MiA4LjU2ODggNDMuMzQ0OCA4LjU2ODggNDMuMDU2MyA4LjY2ODc1TDM3LjcgMTAuNTI0VjYuMjVaXCIgZmlsbD1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTIyLjUwMjkgMTguMTk1M0wyNS42NzUzIDE0Ljc3NjdDMjYuNDQxMSAxMy45NTE1IDI2LjEyNTggMTIuNTQxOCAyNS4wOTM3IDEyLjE4NDNMMjMuMiAxMS41Mjg0VjQuNjg3NUMyMy4yIDMuODI0NTYgMjIuNTUwOCAzLjEyNSAyMS43NSAzLjEyNUgxOC44NVYxLjE3MTg4QzE4Ljg1IDAuNTI0NjU4IDE4LjM2MzEgMCAxNy43NjI1IDBIMTEuMjM3NUMxMC42MzY5IDAgMTAuMTUgMC41MjQ2NTggMTAuMTUgMS4xNzE4OFYzLjEyNUg3LjI1QzYuNDQ5MTkgMy4xMjUgNS44IDMuODI0NTYgNS44IDQuNjg3NVYxMS41Mjg0TDMuOTA2MyAxMi4xODQzQzIuODc1MyAxMi41NDE0IDIuNTU4MDcgMTMuOTUwNiAzLjMyNDY3IDE0Ljc3NjdMNi40OTcwOSAxOC4xOTUzQzUuNzAxNTggMjAuMzI2NSAzLjg3ODE2IDIxLjg3NSAxLjA4NzUgMjEuODc1QzAuNDg2ODgzIDIxLjg3NSAwIDIyLjM5OTcgMCAyMy4wNDY5VjIzLjgyODFDMCAyNC40NzUzIDAuNDg2ODgzIDI1IDEuMDg3NSAyNUMzLjg1MjYgMjUgNS45NTg1NSAyMy45OTM3IDcuNTc4ODggMjIuMDk5OEM4LjIzMjI0IDIzLjgwMDQgOS43ODg0NSAyNSAxMS42IDI1SDE3LjRDMTkuMjExNSAyNSAyMC43Njc4IDIzLjgwMDQgMjEuNDIxMSAyMi4wOTk4QzIzLjA0MTIgMjMuOTkzNCAyNS4xNDcgMjUgMjcuOTEyNSAyNUMyOC41MTMxIDI1IDI5IDI0LjQ3NTMgMjkgMjMuODI4MVYyMy4wNDY5QzI5IDIyLjM5OTcgMjguNTEzMSAyMS44NzUgMjcuOTEyNSAyMS44NzVDMjUuMTU2NyAyMS44NzUgMjMuMzExNCAyMC4zNjEzIDIyLjUwMjkgMTguMTk1M1pNOC43IDYuMjVIMjAuM1YxMC41MjRMMTQuOTQzNyA4LjY2ODc1QzE0LjY1NTIgOC41Njg4IDE0LjM0NDggOC41Njg4IDE0LjA1NjMgOC42Njg3NUw4LjcgMTAuNTI0VjYuMjVaXCIgZmlsbD1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8L3N2Zz5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PC9sYWJlbD5cblxuXHRcdFx0XHRcdFx0JHt2ZXNzZWwuQ29tcGFueU5hbWUgPT09IHlzcF95YWNodF9zeW5jLmNvbXBhbnlfbmFtZSA/IGA8ZGl2IGNsYXNzPVwiY29tcGFueS1iYW5uZXJcIj48aW1nIHNyYz1cIiR7eXNwX3lhY2h0X3N5bmMuY29tcGFueV9sb2dvfVwiPjwvZGl2PmAgOiAnJ31cblx0XHRcdFx0XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInJpLXByaWNlXCI+JHsgcHJpY2UgfTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2E+XHRcblx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInJlc3VsdC1pdGVtLWluZm9cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmktdG9wXCI+XG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiJHsgdmVzc2VsLl9saW5rIH1cIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1uYW1lXCI+JHt2ZXNzZWwuTW9kZWxZZWFyID8gdmVzc2VsLk1vZGVsWWVhciA6ICcnfSAke3Zlc3NlbC5NYWtlU3RyaW5nID8gdmVzc2VsLk1ha2VTdHJpbmcgOiAnJ30gJHt2ZXNzZWwuTW9kZWwgPyB2ZXNzZWwuTW9kZWwgOiAnJ308L3NwYW4+PGJyIC8+XG5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1zdWItbmFtZVwiPiR7IHZlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICdOL0EnIH08L3NwYW4+PGJyIC8+XG5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJyaS1sb2NhdGlvblwiPlx0XHRcblx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiJHsgdmVzc2VsS2V5d29yZExvY2F0aW9uTGluayB9XCI+XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0PHN2ZyB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMThcIiB2aWV3Qm94PVwiMCAwIDE4IDE4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTE1Ljc1IDcuNUMxNS43NSAxMi43NSA5IDE3LjI1IDkgMTcuMjVDOSAxNy4yNSAyLjI1IDEyLjc1IDIuMjUgNy41QzIuMjUgNS43MDk3OSAyLjk2MTE2IDMuOTkyOSA0LjIyNzAzIDIuNzI3MDNDNS40OTI5IDEuNDYxMTYgNy4yMDk3OSAwLjc1IDkgMC43NUMxMC43OTAyIDAuNzUgMTIuNTA3MSAxLjQ2MTE2IDEzLjc3MyAyLjcyNzAzQzE1LjAzODggMy45OTI5IDE1Ljc1IDUuNzA5NzkgMTUuNzUgNy41WlwiIHN0cm9rZT1cIiMwNjdBRURcIiBzdHJva2Utd2lkdGg9XCIxLjVcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIi8+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTkgOS43NUMxMC4yNDI2IDkuNzUgMTEuMjUgOC43NDI2NCAxMS4yNSA3LjVDMTEuMjUgNi4yNTczNiAxMC4yNDI2IDUuMjUgOSA1LjI1QzcuNzU3MzYgNS4yNSA2Ljc1IDYuMjU3MzYgNi43NSA3LjVDNi43NSA4Ljc0MjY0IDcuNzU3MzYgOS43NSA5IDkuNzVaXCIgc3Ryb2tlPVwiIzA2N0FFRFwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cblx0XHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0XHRcdFx0JHsgdmVzc2VsTG9jYXRpb24gfVxuXHRcdFx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInJpLWJvdHRvbVwiPlxuXHRcdFx0XHRcdFx0PHNwYW4+XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0PC9zcGFuPlxuXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxcIiBjbGFzcz1cInJpLWNvbnRhY3RcIiBkYXRhLW1vZGFsPVwiI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWxcIj5cblx0XHRcdFx0XHRcdFx0Q29udGFjdFxuXHRcdFx0XHRcdFx0XHQ8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cIm5vbmVcIj5cblx0XHRcdFx0XHRcdFx0PGcgY2xpcC1wYXRoPVwidXJsKCNjbGlwMF84MTAxXzEwMjc3KVwiPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPVwiTTE1LjU1NTYgMEg1Ljc3NzhDNS41MzIxNCAwIDUuMzMzMzQgMC4xOTg3OTIgNS4zMzMzNCAwLjQ0NDQ1OEM1LjMzMzM0IDAuNjkwMTI1IDUuNTMyMTQgMC44ODg5MTcgNS43Nzc4IDAuODg4OTE3SDE0LjQ4MjdMMC4xMzAyMTkgMTUuMjQxM0MtMC4wNDM0MDYyIDE1LjQxNSAtMC4wNDM0MDYyIDE1LjY5NjIgMC4xMzAyMTkgMTUuODY5OEMwLjIxNzAxIDE1Ljk1NjYgMC4zMzA3NiAxNiAwLjQ0NDQ2OSAxNkMwLjU1ODE3NyAxNiAwLjY3MTg4NSAxNS45NTY2IDAuNzU4NzE5IDE1Ljg2OThMMTUuMTExMSAxLjUxNzM3VjEwLjIyMjJDMTUuMTExMSAxMC40Njc5IDE1LjMwOTkgMTAuNjY2NyAxNS41NTU2IDEwLjY2NjdDMTUuODAxMyAxMC42NjY3IDE2LjAwMDEgMTAuNDY3OSAxNi4wMDAxIDEwLjIyMjJWMC40NDQ0NThDMTYgMC4xOTg3OTIgMTUuODAxMiAwIDE1LjU1NTYgMFpcIiBmaWxsPVwiIzA2N0FFRFwiLz5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0XHQ8ZGVmcz5cblx0XHRcdFx0XHRcdFx0PGNsaXBQYXRoIGlkPVwiY2xpcDBfODEwMV8xMDI3N1wiPlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiBmaWxsPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDwvY2xpcFBhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZGVmcz5cblx0XHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHRcblx0XHRgO1xuXHR9O1xuXG5cdHlzcF90ZW1wbGF0ZXMueWFjaHQuY29tcGFyZV9wcmV2aWV3ID0gZnVuY3Rpb24odmVzc2VsLCBwYXJhbXMpIHtcblxuXHRcdHJldHVybiBgXG5cblx0XHRcdDxkaXYgY2xhc3M9XCJ5c3AteWFjaHQtY29tcGFyZS1wcmV2aWV3XCIgZGF0YS1wb3N0LWlkPVwiJHsgdmVzc2VsLl9wb3N0SUQgfVwiIGRhdGEteWFjaHQtaWQ9XCIkeyB2ZXNzZWwuRG9jdW1lbnRJRCB9XCI+XHRcdFx0XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwicmVtb3ZlLWZyb20tY29tcGFyZVwiPlxuXHRcdFx0XHRcdDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHRcdDxyZWN0IHg9XCIwLjVcIiB5PVwiMC41XCIgd2lkdGg9XCIyM1wiIGhlaWdodD1cIjIzXCIgcng9XCIxMS41XCIgc3Ryb2tlPVwiI0ZGRkZGRlwiLz5cblx0XHRcdFx0XHQ8cGF0aCBkPVwiTTguMjY4NzYgMTQuOTM0NkM4LjA0OTA5IDE1LjE1NDMgOC4wNDkwOSAxNS41MTA0IDguMjY4NzYgMTUuNzMwMUM4LjQ4ODQzIDE1Ljk0OTggOC44NDQ1OCAxNS45NDk4IDkuMDY0MjUgMTUuNzMwMUw4LjI2ODc2IDE0LjkzNDZaTTEyLjM5NzYgMTIuMzk2OEMxMi42MTczIDEyLjE3NzEgMTIuNjE3MyAxMS44MjA5IDEyLjM5NzYgMTEuNjAxM0MxMi4xNzc5IDExLjM4MTYgMTEuODIxOCAxMS4zODE2IDExLjYwMjEgMTEuNjAxM0wxMi4zOTc2IDEyLjM5NjhaTTExLjYwMTggMTEuNjAxNkMxMS4zODIxIDExLjgyMTMgMTEuMzgyMSAxMi4xNzc0IDExLjYwMTggMTIuMzk3MUMxMS44MjE0IDEyLjYxNjggMTIuMTc3NiAxMi42MTY4IDEyLjM5NzMgMTIuMzk3MUwxMS42MDE4IDExLjYwMTZaTTE1LjczMDYgOS4wNjM3NkMxNS45NTAzIDguODQ0MDkgMTUuOTUwMyA4LjQ4Nzk0IDE1LjczMDYgOC4yNjgyN0MxNS41MTA5IDguMDQ4NiAxNS4xNTQ4IDguMDQ4NiAxNC45MzUxIDguMjY4MjdMMTUuNzMwNiA5LjA2Mzc2Wk0xMi4zOTczIDExLjYwMTNDMTIuMTc3NiAxMS4zODE2IDExLjgyMTQgMTEuMzgxNiAxMS42MDE4IDExLjYwMTNDMTEuMzgyMSAxMS44MjA5IDExLjM4MjEgMTIuMTc3MSAxMS42MDE4IDEyLjM5NjhMMTIuMzk3MyAxMS42MDEzWk0xNC45MzUxIDE1LjczMDFDMTUuMTU0OCAxNS45NDk4IDE1LjUxMDkgMTUuOTQ5OCAxNS43MzA2IDE1LjczMDFDMTUuOTUwMyAxNS41MTA0IDE1Ljk1MDMgMTUuMTU0MyAxNS43MzA2IDE0LjkzNDZMMTQuOTM1MSAxNS43MzAxWk0xMS42MDIxIDEyLjM5NzFDMTEuODIxOCAxMi42MTY4IDEyLjE3NzkgMTIuNjE2OCAxMi4zOTc2IDEyLjM5NzFDMTIuNjE3MyAxMi4xNzc0IDEyLjYxNzMgMTEuODIxMyAxMi4zOTc2IDExLjYwMTZMMTEuNjAyMSAxMi4zOTcxWk05LjA2NDI1IDguMjY4MjdDOC44NDQ1OCA4LjA0ODYgOC40ODg0MyA4LjA0ODYgOC4yNjg3NiA4LjI2ODI3QzguMDQ5MDkgOC40ODc5NCA4LjA0OTA5IDguODQ0MDkgOC4yNjg3NiA5LjA2Mzc2TDkuMDY0MjUgOC4yNjgyN1pNOS4wNjQyNSAxNS43MzAxTDEyLjM5NzYgMTIuMzk2OEwxMS42MDIxIDExLjYwMTNMOC4yNjg3NiAxNC45MzQ2TDkuMDY0MjUgMTUuNzMwMVpNMTIuMzk3MyAxMi4zOTcxTDE1LjczMDYgOS4wNjM3NkwxNC45MzUxIDguMjY4MjdMMTEuNjAxOCAxMS42MDE2TDEyLjM5NzMgMTIuMzk3MVpNMTEuNjAxOCAxMi4zOTY4TDE0LjkzNTEgMTUuNzMwMUwxNS43MzA2IDE0LjkzNDZMMTIuMzk3MyAxMS42MDEzTDExLjYwMTggMTIuMzk2OFpNMTIuMzk3NiAxMS42MDE2TDkuMDY0MjUgOC4yNjgyN0w4LjI2ODc2IDkuMDYzNzZMMTEuNjAyMSAxMi4zOTcxTDEyLjM5NzYgMTEuNjAxNlpcIiBmaWxsPVwiI0ZGRkZGRlwiLz5cblx0XHRcdFx0XHQ8L3N2Zz5cblx0XHRcdFx0PC9zcGFuPlxuXG5cdFx0XHRcdDxhIGNsYXNzPVwicHJldmlldy1saW5rXCIgaHJlZj1cIiR7IHZlc3NlbC5fbGluayB9XCI+XG5cblx0XHRcdFx0XHQ8aW1nIGNsYXNzPVwieWFjaHQtbWFpbi1pbWFnZVwiIHNyYz1cIiR7dmVzc2VsLkltYWdlcyA/IHZlc3NlbC5JbWFnZXNbMF0uVXJpIDogeXNwX3lhY2h0X3N5bmMuYXNzZXRzX3VybCArICdpbWFnZXMvZGVmYXVsdC15YWNodC1pbWFnZS5qcGVnJ31cIiBhbHQ9XCJ5YWNodC1pbWFnZVwiIGxvYWRpbmc9XCJsYXp5XCIgLz5cblx0XHRcdFx0XG5cdFx0XHRcdFx0PGg2IGNsYXNzPVwieWFjaHQtdGl0bGVcIj4ke3Zlc3NlbC5Nb2RlbFllYXIgPyB2ZXNzZWwuTW9kZWxZZWFyIDogJyd9ICR7dmVzc2VsLk1ha2VTdHJpbmcgPyB2ZXNzZWwuTWFrZVN0cmluZyA6ICcnfSAke3Zlc3NlbC5Nb2RlbCA/IHZlc3NlbC5Nb2RlbCA6ICcnfSAke3Zlc3NlbC5Cb2F0TmFtZSA/IHZlc3NlbC5Cb2F0TmFtZSA6ICcnfTwvaDY+XG5cdFx0XHRcdDwvYT5cblxuXHRcdFx0PC9kaXY+XG5cblx0XHRgO1xuXG5cdH07XG5cblx0eXNwX3RlbXBsYXRlcy5ub1Jlc3VsdHM9ZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGI+Tm8gUmVzdWx0czwvYj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgfTtcblxuXG4gICAgeXNwX3RlbXBsYXRlcy55YWNodF90YWcgPSBmdW5jdGlvbihsYWJlbCwgdmFsdWUpIHtcblxuICAgIFx0cmV0dXJuIGBcbiAgICBcdFx0PHNwYW4+XG5cdCAgICBcdFx0JHt2YWx1ZX1cblxuXHQgICAgXHRcdDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiOFwiIGhlaWdodD1cIjhcIiB2aWV3Qm94PVwiMCAwIDggOFwiIGZpbGw9XCJub25lXCI+XG5cdFx0XHRcdDxwYXRoIGQ9XCJNMC4yMTk3NTQgMC4yMjAxMjFDMC4yODkzMTkgMC4xNTA0NTcgMC4zNzE5MzYgMC4wOTUxOTAyIDAuNDYyODc4IDAuMDU3NDgyN0MwLjU1MzgyMSAwLjAxOTc3NTIgMC42NTEzMDUgMC4wMDAzNjYyMTEgMC43NDk3NTQgMC4wMDAzNjYyMTFDMC44NDgyMDQgMC4wMDAzNjYyMTEgMC45NDU2ODggMC4wMTk3NzUyIDEuMDM2NjMgMC4wNTc0ODI3QzEuMTI3NTcgMC4wOTUxOTAyIDEuMjEwMTkgMC4xNTA0NTcgMS4yNzk3NSAwLjIyMDEyMUwzLjk5OTc1IDIuOTM5MTJMNi43MTk3NSAwLjIyMDEyMUM2Ljc4OTM2IDAuMTUwNTIgNi44NzE5OCAwLjA5NTMwOTggNi45NjI5MiAwLjA1NzY0MjJDNy4wNTM4NiAwLjAxOTk3NDYgNy4xNTEzMiAwLjAwMDU4NzQ2NSA3LjI0OTc1IDAuMDAwNTg3NDYzQzcuMzQ4MTggMC4wMDA1ODc0NjEgNy40NDU2NSAwLjAxOTk3NDcgNy41MzY1OSAwLjA1NzY0MjJDNy42Mjc1MyAwLjA5NTMwOTggNy43MTAxNSAwLjE1MDUyIDcuNzc5NzUgMC4yMjAxMjFDNy44NDkzNSAwLjI4OTcyMSA3LjkwNDU2IDAuMzcyMzQ5IDcuOTQyMjMgMC40NjMyODdDNy45Nzk5IDAuNTU0MjI0IDcuOTk5MjkgMC42NTE2OTEgNy45OTkyOSAwLjc1MDEyMUM3Ljk5OTI5IDAuODQ4NTUxIDcuOTc5OSAwLjk0NjAxNyA3Ljk0MjIzIDEuMDM2OTVDNy45MDQ1NiAxLjEyNzg5IDcuODQ5MzUgMS4yMTA1MiA3Ljc3OTc1IDEuMjgwMTJMNS4wNjA3NSA0LjAwMDEyTDcuNzc5NzUgNi43MjAxMkM3LjkyMDMyIDYuODYwNjkgNy45OTkyOSA3LjA1MTMzIDcuOTk5MjkgNy4yNTAxMkM3Ljk5OTI5IDcuNDQ4OTEgNy45MjAzMiA3LjYzOTU2IDcuNzc5NzUgNy43ODAxMkM3LjYzOTE5IDcuOTIwNjkgNy40NDg1NCA3Ljk5OTY1IDcuMjQ5NzUgNy45OTk2NUM3LjA1MDk3IDcuOTk5NjUgNi44NjAzMiA3LjkyMDY5IDYuNzE5NzUgNy43ODAxMkwzLjk5OTc1IDUuMDYxMTJMMS4yNzk3NSA3Ljc4MDEyQzEuMTM5MTkgNy45MjA2OSAwLjk0ODU0MyA3Ljk5OTY1IDAuNzQ5NzU0IDcuOTk5NjVDMC41NTA5NjYgNy45OTk2NSAwLjM2MDMxOSA3LjkyMDY5IDAuMjE5NzU0IDcuNzgwMTJDMC4wNzkxODk3IDcuNjM5NTYgMC4wMDAyMjEyNTIgNy40NDg5MSAwLjAwMDIyMTI1MiA3LjI1MDEyQzAuMDAwMjIxMjUyIDcuMDUxMzMgMC4wNzkxODk3IDYuODYwNjkgMC4yMTk3NTQgNi43MjAxMkwyLjkzODc1IDQuMDAwMTJMMC4yMTk3NTQgMS4yODAxMkMwLjE1MDA5IDEuMjEwNTYgMC4wOTQ4MjQgMS4xMjc5NCAwLjA1NzExNjUgMS4wMzdDMC4wMTk0MDkgMC45NDYwNTQgMCAwLjg0ODU3IDAgMC43NTAxMjFDMCAwLjY1MTY3MSAwLjAxOTQwOSAwLjU1NDE4NyAwLjA1NzExNjUgMC40NjMyNDRDMC4wOTQ4MjQgMC4zNzIzMDIgMC4xNTAwOSAwLjI4OTY4NiAwLjIxOTc1NCAwLjIyMDEyMVpcIiBmaWxsPVwiIzJEMzc0OFwiLz5cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHQ8L3NwYW4+XG4gICAgXHRgO1xuICAgIH07XG5cbiAgICB5c3BfdGVtcGxhdGVzLnBhZ2luYXRpb24gPSB7fTtcbiAgICBcbiAgICBcdHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5uZXh0X3RleHQgPSBgPmA7XG5cbiAgICBcdHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5wcmV2X3RleHQgPSBgPGA7XG5cbiIsIlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cblx0bGV0IGVsZV9xdWlja19zZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXF1aWNrLXNlYXJjaC1mb3JtJyk7XG5cblx0aWYgKGVsZV9xdWlja19zZWFyY2gpIHtcblx0XHQvLyBGaWxsIG9wdGlvbnNcblx0ICAgIGxldCBGaWxsT3B0aW9ucz1bXTtcblx0ICAgIGxldCBzZWxlY3RvckVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55c3AtcXVpY2stc2VhcmNoLWZvcm0gc2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zXVwiKTtcblxuXHQgICAgc2VsZWN0b3JFbGVtZW50cy5mb3JFYWNoKChlbGUpID0+IHtcblx0ICAgICAgICBGaWxsT3B0aW9ucy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1vcHRpb25zJykpO1xuXHQgICAgfSk7XG5cdCAgICBcblx0ICAgIHlzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnZHJvcGRvd24tb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxPcHRpb25zfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuXHQgICAgICAgIGZvciAobGV0IGxhYmVsIGluIHJPcHRpb25zKSB7XG5cblx0ICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi55c3AtcXVpY2stc2VhcmNoLWZvcm0gc2VsZWN0W2RhdGEtZmlsbC1vcHRpb25zPSdcIisgbGFiZWwgK1wiJ11cIik7XG5cdCAgICAgICAgICAgIGxldCBuYW1lID0gU2VsZWN0b3JFbGVbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cblx0ICAgICAgICAgICAgck9wdGlvbnNbbGFiZWxdLmZvckVhY2goZnVuY3Rpb24oYikge1xuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICBcdGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG5cdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG5cdFx0ICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSBiO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLmFkZChvcHRpb24pO1xuXHQgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGxldCBVUkxSRUYgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuXHQgICAgICAgICAgICBsZXQgVXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcblxuXHQgICAgICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cblx0ICAgICAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZSh5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG5cdCAgICAgICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuXHQgICAgICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuXHQgICAgICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuXHQgICAgICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcblx0ICAgICAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dPW9ubHlfdmFscy5qb2luKCcgJyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV0gPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXS5lYWNoV29yZENhcGl0YWxpemUoKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIFxuXHQgICAgICAgICAgICBpZiAoVXJsVmFsICE9ICcnICYmIFVybFZhbCAhPSBudWxsKSB7XG5cdCAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhVcmxWYWwpO1xuXG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIFVybFZhbCA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIFVybFZhbCA9IFVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsOyBcblx0ICAgICAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIH1cblxuXG5cdCAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cblx0ICAgICAgICAgICAgY29uc29sZS5sb2coIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXSk7XG5cblx0ICAgICAgICAgICAgaWYgKGhhc1ByZXR0eSAhPSAnJyAmJiBoYXNQcmV0dHkgIT0gbnVsbCkge1xuXHQgICAgICAgICAgICAgICAgU2VsZWN0b3JFbGUuZm9yRWFjaCgoZWxlKSA9PiB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gaGFzUHJldHR5OyBcblx0ICAgICAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KVxuXHR9XG59KTsiLCJmdW5jdGlvbiB5c3BfbWFrZVNlYXJjaFRhZ3MoIGRhdGEgKSB7XG5cblx0bGV0IHRhZ3NFbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXNlYXJjaC10YWdzJyk7XG4gICAgICAgIFxuICAgIGlmICh0YWdzRWxlKSB7XG4gICAgICAgIHRhZ3NFbGUuZm9yRWFjaChmdW5jdGlvbih0ZSkge1xuICAgICAgICAgICAgdGUuaW5uZXJIVE1MPVwiXCI7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdmFyIHlzcF90YWdzX25vdF9wcmludCA9IFsncGFnZV9pbmRleCcsICcnXTtcblxuICAgICAgICBmb3IgKGxldCBwYXJhbUtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWw9Jyc7XG5cbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9JysgcGFyYW1LZXkgKyddJykpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxhYmVsPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj0nKyBwYXJhbUtleSArJ10nKS5pbm5lclRleHQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbbmFtZT0nKyBwYXJhbUtleSArJ10nKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykuaGFzQXR0cmlidXRlKCdsYWJlbCcpKSB7XG5cbiAgICAgICAgICAgICAgICBsYWJlbD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqW25hbWU9JysgcGFyYW1LZXkgKyddJykuZ2V0QXR0cmlidXRlKCdsYWJlbCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGFnc0VsZS5mb3JFYWNoKGZ1bmN0aW9uKHRlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoeXNwX3RhZ3Nfbm90X3ByaW50LmluZGV4T2YoIHBhcmFtS2V5ICkgPT0gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZT0nKyBwYXJhbUtleSArJ10nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlSW5wdXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1RhZ0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFnVmFsID0gZGF0YVtwYXJhbUtleV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlSW5wdXQudGFnTmFtZSA9PSAnU0VMRUNUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSBlbGVJbnB1dC5vcHRpb25zWyBlbGVJbnB1dC5zZWxlY3RlZEluZGV4IF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbUtleS5tYXRjaCgncHJpY2UnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgPSAnJCcrdGFnVmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbUtleS5tYXRjaCgnbGVuZ3RoJykgJiYgcGFyYW1LZXkgIT0gJ2xlbmd0aHVuaXQnKSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbGVVbml0ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55c3AteWFjaHQtc2VhcmNoLWZvcm0gW25hbWU9bGVuZ3RodW5pdF06Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEgZWxlVW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZVVuaXQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybSBbbmFtZT1sZW5ndGh1bml0XScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ1ZhbCA9IHRhZ1ZhbCArJyAnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVVbml0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWdWYWwgKz0gZWxlVW5pdC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5jbGFzc05hbWUgPSAnYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSB5c3AtdGFnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggbGFiZWwgIT0gbnVsbCAmJiBsYWJlbCAhPSAnbnVsbCcgJiYgbGFiZWwgIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmlubmVySFRNTCA9IHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnKGxhYmVsLCB0YWdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFnRWxlLmlubmVySFRNTCA9IHlzcF90ZW1wbGF0ZXMueWFjaHRfdGFnKCcnLCB0YWdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhZ0VsZS5zZXRBdHRyaWJ1dGUoJ2tleScsIHBhcmFtS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZS5hcHBlbmRDaGlsZCggbmV3VGFnRWxlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC10YWdba2V5PVwiJysgcGFyYW1LZXkgKydcIl0nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKCcueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4ueXNwLXRhZ1trZXk9XCInKyBwYXJhbUtleSArJ1wiXScpLmZvckVhY2goZnVuY3Rpb24oeXNwVGFnRWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeXNwVGFnRWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2tleScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRFbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnlzcC15YWNodC1zZWFyY2gtZm9ybSBzZWxlY3RbbmFtZT0nKyBrZXkgKyddLCAueXNwLXlhY2h0LXNlYXJjaC1mb3JtIGlucHV0W25hbWU9Jysga2V5ICsnXScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dEVsZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dEVsZXMuZm9yRWFjaChmdW5jdGlvbihlbGVJKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVJLnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGVsZUkudHlwZSA9PSAnY2hlY2tib3gnIHx8IGVsZUkudHlwZSA9PSAncmFkaW8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVJLmNoZWNrZWQ9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZUkudmFsdWU9Jyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRFbGVzWzBdLmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxufSIsImZ1bmN0aW9uIHlzcF9tYXJrTG92ZWRWZXNzZWwoIGVsZV9jYXJkICkge1xuXG4gICAgalF1ZXJ5KCcubG92ZScsIGVsZV9jYXJkKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnRvZ2dsZUNsYXNzKCdsb3ZlZCcpO1xuXG4gICAgICAgIGxldCB5YWNodElkID0galF1ZXJ5KHRoaXMpLmRhdGEoJ3lhY2h0LWlkJyk7XG4gICAgXG4gICAgICAgIGlmICggalF1ZXJ5KHRoaXMpLmhhc0NsYXNzKCdsb3ZlZCcpICkge1xuICAgICAgICAgICAgeXNwX2FkZExvdmVkVmVzc2VsKHlhY2h0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeXNwX3JlbW92ZUxvdmVkVmVzc2VsKHlhY2h0SWQpO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0geXNwX2dldF9mb3JtX2RhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnlzcC15YWNodC1zZWFyY2gtZm9ybScpKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMueXNfeWFjaHRzX2xvdmVkICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgZWxlX2NhcmQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5c3BfbG92ZWRfdmVzc2VscycpICE9IFwiXCIpIHtcblxuICAgICAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB5YWNodElkID0gZWxlX2NhcmQuZGF0YSgneWFjaHQtaWQnKTtcblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKSAhPSAtMSkge1xuXG4gICAgICAgICAgICBlbGVfY2FyZC5hZGRDbGFzcygnbG92ZWQnKTtcblxuICAgICAgICAgICAgalF1ZXJ5KCcubG92ZScsIGVsZV9jYXJkKS5hZGRDbGFzcygnbG92ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5mdW5jdGlvbiB5c3BfYWRkTG92ZWRWZXNzZWwoIHlhY2h0SWQgKSB7XG5cbiAgICBsZXQgbG92ZWRWZXNzZWxzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSk7XG5cblxuICAgICAgICBpZiAobG92ZWRWZXNzZWxzID09IG51bGwpIHtcbiAgICAgICAgICAgIGxvdmVkVmVzc2VscyA9IFtdO1xuICAgICAgICB9XG5cbiAgICBpZiAobG92ZWRWZXNzZWxzLmluZGV4T2YoIHlhY2h0SWQgKSA9PSAtMSkge1xuXG4gICAgICAgIGxvdmVkVmVzc2Vscy5wdXNoKHlhY2h0SWQpO1xuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBhbHJlYWR5IGFkZGVkXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2cobG92ZWRWZXNzZWxzICk7XG4gICAgXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5c3BfbG92ZWRfdmVzc2Vsc1wiLCBKU09OLnN0cmluZ2lmeShsb3ZlZFZlc3NlbHMpKTtcblxufSBcblxuZnVuY3Rpb24geXNwX3JlbW92ZUxvdmVkVmVzc2VsKCB5YWNodElkICkge1xuXG4gICAgbGV0IGxvdmVkVmVzc2VscyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3lzcF9sb3ZlZF92ZXNzZWxzJykpO1xuXG5cbiAgICAgICAgaWYgKGxvdmVkVmVzc2VscyA9PSBudWxsKSB7XG4gICAgICAgICAgICBsb3ZlZFZlc3NlbHMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgbGV0IGluZGV4ZWQgPSBsb3ZlZFZlc3NlbHMuaW5kZXhPZiggeWFjaHRJZCApO1xuXG4gICAgY29uc29sZS5sb2coaW5kZXhlZCk7XG5cbiAgICBpZiAoaW5kZXhlZCAhPSAtMSkge1xuXG4gICAgICAgIGRlbGV0ZSBsb3ZlZFZlc3NlbHNbaW5kZXhlZF07ICAgICAgICBcbiAgICAgICAgbG92ZWRWZXNzZWxzLnNwbGljZShpbmRleGVkLCAxKTtcblxuXG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGFscmVhZHkgYWRkZWRcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhsb3ZlZFZlc3NlbHMgKTtcbiAgICBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInlzcF9sb3ZlZF92ZXNzZWxzXCIsIEpTT04uc3RyaW5naWZ5KGxvdmVkVmVzc2VscykpO1xuXG59IiwidmFyIFlTUF9WZXNzZWxDb21wYXJlTGlzdD1bXTtcblxuXG5mdW5jdGlvbiB5c3BfcmVzdG9yZUNvbXBhcmVzKCkge1xuICAgIGxldCBVUkxSRUY9bmV3IFVSTChsb2NhdGlvbi5ocmVmKTsgLy8gbWF5YmUgZm9yIGEgcmUtZG9cbiAgICBsZXQgY29tcGFyZV9wb3N0X2lkcyA9IFVSTFJFRi5zZWFyY2hQYXJhbXMuZ2V0KCAncmVzdG9yZV90b19jb21wYXJlJyApOyBcblxuICAgIGNvbnNvbGUubG9nKHR5cGVvZiBjb21wYXJlX3Bvc3RfaWRzKTtcbiAgICBjb25zb2xlLmxvZyhjb21wYXJlX3Bvc3RfaWRzKTtcblxuICAgIGlmICh0eXBlb2YgY29tcGFyZV9wb3N0X2lkcyA9PSAnc3RyaW5nJykge1xuICAgICAgICBZU1BfVmVzc2VsQ29tcGFyZUxpc3QgPSBjb21wYXJlX3Bvc3RfaWRzLnNwbGl0KCcsJyk7XG4gICAgXG5cbiAgICAgICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xuICAgIH1cblxuXG5cbn1cblxuXG5mdW5jdGlvbiB5c3BfbWFrZUNvbXBhcmVWZXNzZWwoZWxlX2NhcmQpIHtcblx0IFxuXHQgalF1ZXJ5KCcuY29tcGFyZV90b2dnbGUnLCBlbGVfY2FyZCkuY2hhbmdlKGZ1bmN0aW9uKGUpIHtcblx0IFx0Y29uc29sZS5sb2coJ2hvd2R5Jyk7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgbGV0IHlhY2h0SWQgPSBlbGVfY2FyZC5kYXRhKCdwb3N0LWlkJyk7XG4gICAgXG4gICAgICAgIGlmICggalF1ZXJ5KHRoaXMpLmhhc0NsYXNzKCdhcm1lZCcpICkge1xuICAgICAgICAgICAgeXNwX2FkZFZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdCh5YWNodElkKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBsZXQgeWFjaHRJZCA9IGVsZV9jYXJkLmRhdGEoJ3Bvc3QtaWQnKTtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApICE9IC0xICB8fCBZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZC50b1N0cmluZygpICkgIT0gLTEgKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvIHdvcmxkIHJlc3RvcmVkJyk7XG5cbiAgICAgICAgZWxlX2NhcmQuYWRkQ2xhc3MoJ2FybWVkJyk7XG5cbiAgICAgICAgalF1ZXJ5KCcuY29tcGFyZV90b2dnbGUnLCBlbGVfY2FyZCkuYWRkQ2xhc3MoJ2FybWVkJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHlzcF9hZGRWZXNzZWxUb0NvbXBhcmVMaXN0KHlhY2h0SWQpIHtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QuaW5kZXhPZiggeWFjaHRJZCApID09IC0xKSB7XG5cbiAgICBcdFlTUF9WZXNzZWxDb21wYXJlTGlzdC5wdXNoKHlhY2h0SWQpO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgeXNwX21ha2VDb21wYXJlTGlua291dCgpO1xufVxuICAgIFxuZnVuY3Rpb24geXNwX3JlbW92ZVZlc3NlbFRvQ29tcGFyZUxpc3QoeWFjaHRJZCkge1xuXHRsZXQgaW5kZXhlZCA9IFlTUF9WZXNzZWxDb21wYXJlTGlzdC5pbmRleE9mKCB5YWNodElkIClcblxuXHRpZiAoIGluZGV4ZWQgIT0gLTEpIHtcblxuICAgIFx0ZGVsZXRlIFlTUF9WZXNzZWxDb21wYXJlTGlzdFtpbmRleGVkXTsgICAgICAgIFxuICAgICAgICBZU1BfVmVzc2VsQ29tcGFyZUxpc3Quc3BsaWNlKGluZGV4ZWQsIDEpO1xuICBcdFx0XG4gICAgICAgIFxuICAgIH1cblxuICAgIHlzcF9tYWtlQ29tcGFyZUxpbmtvdXQoKTtcbn1cblxuZnVuY3Rpb24geXNwX21ha2VDb21wYXJlTGlua291dCgpIHtcblxuICAgIGlmIChZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RoID49IDIpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5c3BfY29tcGFyZV9saW5rb3V0JykuaHJlZj15c3BfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInlzcC9jb21wYXJlLz9wb3N0SUQ9XCIrWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmpvaW4oJywnKTtcbiAgICBcdCAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dCcpLmlubmVySFRNTD1gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ5c3AtZ2VuZXJhbC1idXR0b25cIj5Db21wYXJlICggJHtZU1BfVmVzc2VsQ29tcGFyZUxpc3QubGVuZ3RofSApPC9idXR0b24+YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dF9tb2JpbGUnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lzcF9jb21wYXJlX2xpbmtvdXRfbW9iaWxlJykuaHJlZj15c3BfeWFjaHRfc3luYy53cF9yZXN0X3VybCtcInlzcC9jb21wYXJlLz9wb3N0SUQ9XCIrWVNQX1Zlc3NlbENvbXBhcmVMaXN0LmpvaW4oJywnKTtcbiAgICBcdCAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneXNwX2NvbXBhcmVfbGlua291dF9tb2JpbGUnKS5pbm5lckhUTUw9YDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwieXNwLWdlbmVyYWwtYnV0dG9uXCI+Q29tcGFyZSAoICR7WVNQX1Zlc3NlbENvbXBhcmVMaXN0Lmxlbmd0aH0gKTwvYnV0dG9uPmA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAncG9zdF9faW4nOiBZU1BfVmVzc2VsQ29tcGFyZUxpc3QsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHlzcF9hcGkuY2FsbF9hcGkoXCJQT1NUXCIsIFwieWFjaHRzXCIsIHBhcmFtcykudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuXG4gICAgICAgICAgICBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cycpLmh0bWwoJycpO1xuXG4gICAgICAgICAgICBkYXRhX3Jlc3VsdC5yZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmNvbXBhcmVfcHJldmlldyhpdGVtLCBwYXJhbXMpICk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZWxlX3ByZXZpZXcgPSBqUXVlcnkoJyN5c3AtY29tcGFyZS1wcmV2aWV3cyAqW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcucmVtb3ZlLWZyb20tY29tcGFyZScsIGVsZV9wcmV2aWV3KS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCdkaXZbZGF0YS1wb3N0LWlkPScrIGl0ZW0uX3Bvc3RJRCArJ10gLmNvbXBhcmVfdG9nZ2xlJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKS5yZW1vdmVDbGFzcygnYXJtZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICB5c3BfcmVtb3ZlVmVzc2VsVG9Db21wYXJlTGlzdChpdGVtLl9wb3N0SUQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB5c3BfbWFrZUNvbXBhcmVMaW5rb3V0KCk7XG5cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1jb21wYXJlLXByZXZpZXdzJykuaHRtbCgnPHNwYW4gc3R5bGU9XCJjb2xvcjogI2ZmZjtcIj5QaWNrIHR3byB0byBjb21wYXJlLjwvc3Bhbj4nKTtcbiAgICAgICAgalF1ZXJ5KCcjeXNwX2NvbXBhcmVfbGlua291dCcpLmh0bWwoJycpO1xuICAgICAgICBqUXVlcnkoJyN5c3BfY29tcGFyZV9saW5rb3V0X21vYmlsZScpLmh0bWwoJycpO1xuICAgIH1cblxuXG4gICAgXG5cblxuXG59XG4iLCJjb25zdCB5c3BCZWZvcmVZYWNodFNlYXJjaCA9IG5ldyBFdmVudChcInlzcC1iZWZvcmUtc3VibWl0dGluZy15YWNodC1zZWFyY2hcIik7XG5jb25zdCB5c3BBZnRlcllhY2h0U2VhcmNoID0gbmV3IEV2ZW50KFwieXNwLWFmdGVyLXN1Ym1pdHRpbmcteWFjaHQtc2VhcmNoXCIpO1xuY29uc3QgeXNwQWZ0ZXJSZW5kZXJpbmdZYWNodCA9IG5ldyBFdmVudChcInlzcC1hZnRlci1yZW5kZXJpbmcteWFjaHQtc2VhcmNoXCIpO1xuXG5mdW5jdGlvbiB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZGF0YSkge1xuXG4gICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMnKS5odG1sKCcnKTtcbiAgICBqUXVlcnkoJyN5c3AteWFjaHQtcmVzdWx0cy1wYWdpbmF0aW9uJykuaHRtbCgnJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXlhY2h0LXJlc3VsdHMtc2VjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRlZCcpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AteWFjaHQtcmVzdWx0cy1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpO1xuXG4gICAgeXNwX3NldF9mb3JtX3RvX2RhdGEoIGRhdGEgKTtcblxuICAgIHlzcF9tYWtlU2VhcmNoVGFncyggZGF0YSApO1xuXG4gICAgLy8gR0VUIEFORCBXUklURVxuICAgIHJldHVybiB5c3BfYXBpLmNhbGxfYXBpKFwiUE9TVFwiLCBcInlhY2h0c1wiLCBkYXRhKS50aGVuKGZ1bmN0aW9uKGRhdGFfcmVzdWx0KSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC15YWNodC1yZXN1bHRzLXNlY3Rpb24nKS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AteWFjaHQtcmVzdWx0cy1zZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG5cbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBkYXRhX3Jlc3VsdC5TRU8udGl0bGU7XG4gICAgICAgIGpRdWVyeSgnI3lzcC1zZWFyY2gtaGVhZGluZycpLnRleHQoZGF0YV9yZXN1bHQuU0VPLmhlYWRpbmcpO1xuICAgICAgICBqUXVlcnkoJyN5c3Atc2VhcmNoLXBhcmFncmFwaCcpLnRleHQoZGF0YV9yZXN1bHQuU0VPLnApO1xuXG4gICAgICAgIGpRdWVyeSgnI3lzcC10b3RhbC15YWNodC1yZXN1bHRzJykudGV4dChuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLUlOJywgeyBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHM6IDMgfSkuZm9ybWF0KGRhdGFfcmVzdWx0LnRvdGFsKSk7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRVUkw9bnVsbDtcblxuICAgICAgICBpZiAodHlwZW9mIGRhdGEuZG9udF9wdXNoID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjdXJyZW50VVJMPXlzcF9wdXNoX2hpc3RvcnkoIGRhdGEgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRVUkwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZGF0YV9yZXN1bHQudG90YWwgPiAwKSB7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLnJlbW92ZUNsYXNzKFsndmlldy1ncmlkJywgJ3ZpZXctbGlzdCddKTtcblxuICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS52aWV3ICE9ICd1bmRlZmluZWQnICYmIGRhdGEudmlldy50b0xvd2VyQ2FzZSgpID09ICdsaXN0Jykge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmFkZENsYXNzKCd2aWV3LWxpc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmFkZENsYXNzKCd2aWV3LWdyaWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YV9yZXN1bHQucmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEudmlldyAhPSAndW5kZWZpbmVkJyAmJiBkYXRhLnZpZXcudG9Mb3dlckNhc2UoKSA9PSAnbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYWRkQ2xhc3MoJ3ZpZXctbGlzdCcpLnJlbW92ZUNsYXNzKCd2aWV3LWdyaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0Lmxpc3QoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmFkZENsYXNzKCd2aWV3LWdyaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXRoZS15YWNodC1yZXN1bHRzJykuYXBwZW5kKCB5c3BfdGVtcGxhdGVzLnlhY2h0LmdyaWQoaXRlbSwgZGF0YSkgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZWxlX2NhcmQgPSBqUXVlcnkoJyN5c3AtdGhlLXlhY2h0LXJlc3VsdHMgW2RhdGEtcG9zdC1pZD0nKyBpdGVtLl9wb3N0SUQgKyddJyk7XG5cbiAgICAgICAgICAgICAgICBqUXVlcnkoJ1tkYXRhLW1vZGFsPSN5c3AteWFjaHQtcmVzdWx0cy1sZWFkLW1vZGFsXScsIGVsZV9jYXJkKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IEJvYXROYW1lID0gaXRlbS5Nb2RlbFllYXIgKyAnICcgKyBpdGVtLk1ha2VTdHJpbmcgKyAnICcgKyBpdGVtLkJvYXROYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWwgLmJvYXRuYW1lJykuaHRtbChCb2F0TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnI3lzcC15YWNodC1yZXN1bHRzLWxlYWQtbW9kYWwgaW5wdXRbbmFtZT1XaGljaEJvYXRdJykudmFsKEJvYXROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcjeXNwLXlhY2h0LXJlc3VsdHMtbGVhZC1tb2RhbCBpbnB1dFtuYW1lPVdoaWNoQm9hdElEXScpLnZhbChpdGVtLl9wb3N0SUQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhX21vZGFsID0galF1ZXJ5KHRoaXMpLmRhdGEoJ21vZGFsJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCBkYXRhX21vZGFsICkueXNwX21vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWxDbGFzczogJ3lzcC1tb2RhbC1vcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlQ2xhc3M6ICd5c3AtbW9kZWwtY2xvc2UnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgeXNwX21hcmtMb3ZlZFZlc3NlbCggZWxlX2NhcmQgKTsgICAgIFxuICAgICAgICAgICAgICAgIHlzcF9tYWtlQ29tcGFyZVZlc3NlbCggZWxlX2NhcmQgKTsgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGpRdWVyeSgnI3lzcC15YWNodC1yZXN1bHRzLXBhZ2luYXRpb24nKS5wYWdpbmF0aW9uKHtcbiAgICAgICAgICAgICAgICBpdGVtczogZGF0YV9yZXN1bHQudG90YWwsXG4gICAgICAgICAgICAgICAgaXRlbXNPblBhZ2U6IDEyLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWdlOiBkYXRhLnBhZ2VfaW5kZXgsXG4gICAgICAgICAgICAgICAgcHJldlRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5wcmV2X3RleHQsXG4gICAgICAgICAgICAgICAgbmV4dFRleHQ6IHlzcF90ZW1wbGF0ZXMucGFnaW5hdGlvbi5uZXh0X3RleHQsXG4gICAgICAgICAgICAgICAgZWRnZXM6IDQsXG4gICAgICAgICAgICAgICAgZGlzcGxheWVkUGFnZXM6IDQsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRQcmVmaXg6IGN1cnJlbnRVUkwucmVwbGFjZShuZXcgUmVnRXhwKFwicGFnZV9pbmRleC0oXFxcXGQqKSgvKVwiLCBcImdcIiksIFwiXCIpKydwYWdlX2luZGV4LScsXG4gICAgICAgICAgICAgICAgaHJlZlRleHRTdWZmaXg6ICcvJyxcbiAgICAgICAgICAgICAgICBvblBhZ2VDbGljazogZnVuY3Rpb24ocGFnZU51bWJlciwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtIGlucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT1wYWdlTnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtRGF0YU9iamVjdCA9IHlzcF9nZXRfZm9ybV9kYXRhKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykgKTtcblxuICAgICAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoZm9ybURhdGFPYmplY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGpRdWVyeSgnI3lzcC10aGUteWFjaHQtcmVzdWx0cycpLmFwcGVuZCh5c3BfdGVtcGxhdGVzLm5vUmVzdWx0cygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IChqUXVlcnkoXCIuc2Nyb2xsLXRvLWhlcmUtb24teWFjaHQtc2VhcmNoXCIpLm9mZnNldCgpLnRvcClcbiAgICAgICAgfSwgMjUwKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtOm5vdCgjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybSknKS5kaXNwYXRjaEV2ZW50KHlzcEFmdGVyUmVuZGVyaW5nWWFjaHQpO1xuXG4gICAgICAgIHJldHVybiBkYXRhX3Jlc3VsdDtcblxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgfSk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gRmlsbCBMaXN0IE9wdGlvbnNcbiAgICBsZXQgRmlsbExpc3RzPVtdO1xuICAgIGxldCBsaXN0RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiZGF0YWxpc3RbZGF0YS1maWxsLWxpc3RdXCIpO1xuICAgIGxldCBsaXN0TmVlZGVkRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbGlzdF1cIik7XG5cbiAgICBsaXN0RWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgIEZpbGxMaXN0cy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1saXN0JykpO1xuICAgIH0pO1xuXG4gICAgbGlzdE5lZWRlZEVsZW1lbnRzLmZvckVhY2goKGlucHV0X2VsZSkgPT4ge1xuXG4gICAgICAgIGlucHV0X2VsZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGxldCBsaXN0X2lkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnbGlzdCcpO1xuXG4gICAgICAgICAgICBsZXQgZWxlX2xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGF0YWxpc3QjXCIrbGlzdF9pZCk7XG5cbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUubGVuZ3RoIDw9IDMpIHtcblxuICAgICAgICAgICAgICAgIHlzcF9hcGkuY2FsbF9hcGkoXG4gICAgICAgICAgICAgICAgICAgICdQT1NUJywgXG4gICAgICAgICAgICAgICAgICAgICdsaXN0LW9wdGlvbnMtd2l0aC12YWx1ZScsIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IFsgZWxlX2xpc3QuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbGwtbGlzdCcpIF0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uKHJPcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIk9QVElPTlwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFwcGVuZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9KTtcblxuICAgIH0pXG4gICAgXG4vKiAgICB5c3BfYXBpLmNhbGxfYXBpKCdQT1NUJywgJ2xpc3Qtb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxMaXN0c30pLnRoZW4oZnVuY3Rpb24ock9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgbGV0IFNlbGVjdG9yRWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImRhdGFsaXN0W2RhdGEtZmlsbC1saXN0PSdcIisgbGFiZWwgK1wiJ11cIik7XG5cbiAgICAgICAgICAgIHJPcHRpb25zW2xhYmVsXS5mb3JFYWNoKGZ1bmN0aW9uKGIpIHtcblxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiT1BUSU9OXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gYjtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGUuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuKi9cbiAgICBsZXQgeWFjaHRTZWFyY2hBbmRSZXN1bHRzPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3AteWFjaHQtc2VhcmNoLWZvcm0nKTtcblxuICAgIGlmICh5YWNodFNlYXJjaEFuZFJlc3VsdHMpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tbW9iaWxlLXNlYXJjaCcpLmZvckVhY2goKG9tc2UpID0+IHtcbiAgICAgICAgICAgIG9tc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXN1cGVyLW1vYmlsZS1zZWFyY2gnKS5zdHlsZS5kaXNwbGF5PSdibG9jayc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLm92ZXJmbG93WT0naGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgneXNwLW1vYmlsZS15YWNodC1zZWFyY2gtb3BlbicpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vYmlsZS1zZWFyY2gnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vYmlsZS1zZWFyY2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9J3Vuc2V0JztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LnJlbW92ZSgneXNwLW1vYmlsZS15YWNodC1zZWFyY2gtb3BlbicpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgZS50YXJnZXQuZGlzcGF0Y2hFdmVudCh5c3BCZWZvcmVZYWNodFNlYXJjaCk7XG5cbiAgICAgICAgICAgIGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9cGFnZV9pbmRleF0nKS52YWx1ZT0xO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0geXNwX2dldF9mb3JtX2RhdGEoZS50YXJnZXQpO1xuXG4gICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApLnRoZW4oZnVuY3Rpb24oYXBpX2RhdGEpIHtcblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoeXNwQWZ0ZXJZYWNodFNlYXJjaCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pOyBcblxuICAgICAgICB5YWNodFNlYXJjaEFuZFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQuc3VibWl0LW9uLWNoYW5nZScpLmZvckVhY2goKGVsZUlucHV0KSA9PiB7XG4gICAgICAgICAgICBlbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuZm9ybS5yZXF1ZXN0U3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgeWFjaHRTZWFyY2hBbmRSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmVzZXRdJykuZm9yRWFjaCgoZWxlUmVzZXQpID0+IHtcbiAgICAgICAgICAgIGVsZVJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwieXNfY29tcGFueV9vbmx5XCJdJykpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJ5c19jb21wYW55X29ubHlcIl0nKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZUNoZWNrKSB7XG4gICAgICAgICAgICAgICAgZWxlQ2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXZpZXddW2Zvcm09eXNwLXlhY2h0LXNlYXJjaC1mb3JtXSwgc2VsZWN0W25hbWU9dmlld11bZm9ybT15c3AteWFjaHQtc2VhcmNoLWZvcm1dLCAgc2VsZWN0W25hbWU9c29ydGJ5XVtmb3JtPXlzcC15YWNodC1zZWFyY2gtZm9ybV0nKS5mb3JFYWNoKChlbGVWaWV3T3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBlbGVWaWV3T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5mb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGljay1hbGwnKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZSkge1xuICAgICAgICAgICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0X25hbWUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCInKyBpbnB1dF9uYW1lICsnXCJdJykuZm9yRWFjaCgoZWxlSW5wdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWxlSW5wdXQuY2hlY2tlZD1mYWxzZTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUFJFVFRZIFVSTFxuICAgICAgICBsZXQgc3RycGF0aHM9d2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZSh5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG4gICAgICAgIGxldCBwYXRocyA9IHN0cnBhdGhzLnNwbGl0KFwiL1wiKTtcblxuICAgICAgICBsZXQgcHJldHR5X3VybF9wYXRoX3BhcmFtcz17fTtcblxuICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgICAgICAgICAgaWYgKHBhdGggIT0gJycpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGhhc2VfcGF0aCA9IHBhdGguc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICBvbmx5X3ZhbHM9b25seV92YWxzLmpvaW4oJyAnKS5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzX2FycmF5PShvbmx5X3ZhbHMuc3BsaXQoJysnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ubHlfdmFsc19hcnJheVsxXSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBvbmx5X3ZhbHMgPSBvbmx5X3ZhbHNfYXJyYXkubWFwKChvdikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG92LmVhY2hXb3JkQ2FwaXRhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG9ubHlfdmFscyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXT1vbmx5X3ZhbHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhwcmV0dHlfdXJsX3BhdGhfcGFyYW1zKTtcblxuICAgICAgICAvLyBSZXN0b3JlIEZpZWxkc1xuXG4gICAgICAgIGxldCBVUkxSRUY9bmV3IFVSTChsb2NhdGlvbi5ocmVmKTsgLy8gbWF5YmUgZm9yIGEgcmUtZG9cblxuICAgICAgICBsZXQgZm9ybUlucHV0cz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtICpbbmFtZV0sICpbbmFtZV1bZm9ybT1cInlzcC15YWNodC1zZWFyY2gtZm9ybVwiXSwgI3lzcC1tb2JpbGUteWFjaHQtc2VhcmNoLWZvcm0gKltuYW1lXSwgKltuYW1lXVtmb3JtPVwieXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybVwiXScpO1xuXG4gICAgICAgIGZvcm1JbnB1dHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBlbGU7XG5cbiAgICAgICAgICAgIGxldCBuYW1lID0gZWxlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXG4gICAgICAgICAgICBsZXQgdXJsVmFsID0gVVJMUkVGLnNlYXJjaFBhcmFtcy5nZXQoIG5hbWUgKTtcbiAgICAgICAgICAgICAgICAvLyB1cmxWYWwgPSA7XG4gICBcblxuICAgICAgICAgICAgbGV0IGhhc1ByZXR0eSA9IHByZXR0eV91cmxfcGF0aF9wYXJhbXNbIG5hbWUgXTtcblxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhoYXNQcmV0dHkpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhc1ByZXR0eSAhPSAnbnVsbCcgJiYgdHlwZW9mIGhhc1ByZXR0eSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaGFzUHJldHR5KSkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGhhc1ByZXR0eSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaGFzUHJldHR5LmZvckVhY2goKGhQKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQudHlwZSAhPSAndW5kZWZpbmVkJyAmJiAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IGhQICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0LnR5cGUgIT0gJ3VuZGVmaW5lZCcgJiYgKGlucHV0LnR5cGUgPT0gJ2NoZWNrYm94JyB8fCBpbnB1dC50eXBlID09ICdyYWRpbycpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PSBoYXNQcmV0dHkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZSAhPSAnY2hlY2tib3gnICYmIGlucHV0LnR5cGUgIT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBoYXNQcmV0dHk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodXJsVmFsICE9ICcnICYmIHVybFZhbCAhPSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHVybFZhbCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB1cmxWYWwgPSB1cmxWYWwuZWFjaFdvcmRDYXBpdGFsaXplKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC50eXBlICE9ICd1bmRlZmluZWQnICYmICAoaW5wdXQudHlwZSA9PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT0gJ3JhZGlvJykgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09IHVybFZhbCApIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZD10cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlICE9ICdjaGVja2JveCcgJiYgaW5wdXQudHlwZSAhPSAncmFkaW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdXJsVmFsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXN0b3JlIENvbXBhcmVcbiAgICAgICAgIHlzcF9yZXN0b3JlQ29tcGFyZXMoKTtcblxuICAgICAgICAvLyBGaWxsIG9wdGlvbnNcbiAgICAgICAgbGV0IEZpbGxPcHRpb25zPVtdO1xuICAgICAgICBsZXQgc2VsZWN0b3JFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnNdXCIpO1xuXG4gICAgICAgIHNlbGVjdG9yRWxlbWVudHMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICBGaWxsT3B0aW9ucy5wdXNoKGVsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsbC1vcHRpb25zJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHlzcF9hcGkuY2FsbF9hcGkoJ1BPU1QnLCAnZHJvcGRvd24tb3B0aW9ucycsIHtsYWJlbHM6IEZpbGxPcHRpb25zfSkudGhlbihmdW5jdGlvbihyT3B0aW9ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgbGFiZWwgaW4gck9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIGxldCBTZWxlY3RvckVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWxlY3RbZGF0YS1maWxsLW9wdGlvbnM9J1wiKyBsYWJlbCArXCInXVwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFNlbGVjdG9yRWxlKTtcblxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gU2VsZWN0b3JFbGVbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgICAgICAgICByT3B0aW9uc1tsYWJlbF0uZm9yRWFjaChmdW5jdGlvbihiKSB7XG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJPUFRJT05cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmFkZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBVUkxSRUYgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgICAgIGxldCBVcmxWYWwgPSBVUkxSRUYuc2VhcmNoUGFyYW1zLmdldCggbmFtZSApO1xuXG4gICAgICAgICAgICAgICAgbGV0IHN0cnBhdGhzPXdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgICAgICAgICAgICAgc3RycGF0aHM9c3RycGF0aHMucmVwbGFjZSh5c3BfeWFjaHRfc3luYy55YWNodF9zZWFyY2hfcGFnZV9pZCwgJycpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gc3RycGF0aHMuc3BsaXQoXCIvXCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eV91cmxfcGF0aF9wYXJhbXM9e307XG5cbiAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0aCAhPSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBoYXNlX3BhdGggPSBwYXRoLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb25seV92YWxzPXBoYXNlX3BhdGguc2xpY2UoMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXR0eV91cmxfcGF0aF9wYXJhbXNbcGhhc2VfcGF0aFswXV09b25seV92YWxzLmpvaW4oJyAnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zW3BoYXNlX3BhdGhbMF1dID0gcHJldHR5X3VybF9wYXRoX3BhcmFtc1twaGFzZV9wYXRoWzBdXS5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKFVybFZhbCAhPSAnJyAmJiBVcmxWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFVybFZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVcmxWYWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVybFZhbCA9IFVybFZhbC5lYWNoV29yZENhcGl0YWxpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdG9yRWxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gVXJsVmFsOyBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IFVybFZhbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBoYXNQcmV0dHkgPSBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF07XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCBwcmV0dHlfdXJsX3BhdGhfcGFyYW1zWyBuYW1lIF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc1ByZXR0eSAhPSAnJyAmJiBoYXNQcmV0dHkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBTZWxlY3RvckVsZS5mb3JFYWNoKChlbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS52YWx1ZSA9IGhhc1ByZXR0eTsgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGUudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGUudmFsdWUgPSBoYXNQcmV0dHkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZW5kZXIgWWFjaHRzIEZvciBQYWdlIExvYWRcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB5c3BfZ2V0X2Zvcm1fZGF0YShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcueXNwLXlhY2h0LXNlYXJjaC1mb3JtJykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XG5cbiAgICAgICAgICAgIC8vIExpa2VkIC8gTG92ZWQgXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtcy55c195YWNodHNfbG92ZWQgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgICAgIGxldCBsb3ZlZF95YWNodHMgPSBKU09OLnBhcnNlKCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneXNwX2xvdmVkX3Zlc3NlbHMnKSApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvdmVkX3lhY2h0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy55c19vbmx5X3RoZXNlID0gbG92ZWRfeWFjaHRzLmpvaW4oJywnKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnlzX29ubHlfdGhlc2U9XCIwLDAsMFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApOyAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG1vYmlsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLW1vYmlsZS15YWNodC1zZWFyY2gtZm9ybScpO1xuXG4gICAgICAgIGlmIChtb2JpbGVGb3JtKSB7XG4gICAgICAgICAgICBtb2JpbGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPXBhZ2VfaW5kZXhdJykudmFsdWU9MTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc3VwZXItbW9iaWxlLXNlYXJjaCcpLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5zdHlsZS5vdmVyZmxvd1k9J3Vuc2V0JztcblxuICAgICAgICAgICAgICAgIGxldCBwYXJhbXMgPSB5c3BfZ2V0X2Zvcm1fZGF0YShlLnRhcmdldCk7ICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB5c3BfeWFjaHRfc2VhcmNoX2FuZF9yZWFkZXIoIHBhcmFtcyApO1xuXG4gICAgICAgICAgICB9KTsgXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH1cblxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBMZWFkRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcueXNwLWxlYWQtZm9ybS12MicpO1xuXG4gICAgTGVhZEZvcm1zLmZvckVhY2goKGZFbGUpID0+IHtcbiAgICAgICAgZkVsZS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGxldCBmb3JtRGF0YSA9IHlzcF9nZXRfZm9ybV9kYXRhKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgeXNwX2FwaS5jYWxsX2FwaShcIlBPU1RcIiwgJ2xlYWQtdjInLCBmb3JtRGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhX3Jlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKCcuc3VjY2Vzcy1tZXNzYWdlJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQucXVlcnlTZWxlY3RvcignLmhpZGUtYWZ0ZXItc3VibWl0Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxufSk7XG4iXX0=
