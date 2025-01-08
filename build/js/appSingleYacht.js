"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lightGallery = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign.apply(this, arguments);
  };
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  }

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var lightGalleryCoreSettings = {
    mode: 'lg-slide',
    easing: 'ease',
    speed: 400,
    licenseKey: '0000-0000-000-0000',
    height: '100%',
    width: '100%',
    addClass: '',
    startClass: 'lg-start-zoom',
    backdropDuration: 300,
    container: '',
    startAnimationDuration: 400,
    zoomFromOrigin: true,
    hideBarsDelay: 0,
    showBarsAfter: 10000,
    slideDelay: 0,
    supportLegacyBrowser: true,
    allowMediaOverlap: false,
    videoMaxSize: '1280-720',
    loadYouTubePoster: true,
    defaultCaptionHeight: 0,
    ariaLabelledby: '',
    ariaDescribedby: '',
    closable: true,
    swipeToClose: true,
    closeOnTap: true,
    showCloseIcon: true,
    showMaximizeIcon: false,
    loop: true,
    escKey: true,
    keyPress: true,
    controls: true,
    slideEndAnimation: true,
    hideControlOnEnd: false,
    mousewheel: false,
    getCaptionFromTitleOrAlt: true,
    appendSubHtmlTo: '.lg-sub-html',
    subHtmlSelectorRelative: false,
    preload: 2,
    numberOfSlideItemsInDom: 10,
    selector: '',
    selectWithin: '',
    nextHtml: '',
    prevHtml: '',
    index: 0,
    iframeWidth: '100%',
    iframeHeight: '100%',
    iframeMaxWidth: '100%',
    iframeMaxHeight: '100%',
    download: true,
    counter: true,
    appendCounterTo: '.lg-toolbar',
    swipeThreshold: 50,
    enableSwipe: true,
    enableDrag: true,
    dynamic: false,
    dynamicEl: [],
    extraProps: [],
    exThumbImage: '',
    isMobile: undefined,
    mobileSettings: {
      controls: false,
      showCloseIcon: false,
      download: false
    },
    plugins: [],
    strings: {
      closeGallery: 'Close gallery',
      toggleMaximize: 'Toggle maximize',
      previousSlide: 'Previous slide',
      nextSlide: 'Next slide',
      download: 'Download',
      playVideo: 'Play video'
    }
  };
  function initLgPolyfills() {
    (function () {
      if (typeof window.CustomEvent === 'function') return false;
      function CustomEvent(event, params) {
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: null
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      window.CustomEvent = CustomEvent;
    })();
    (function () {
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
    })();
  }
  var lgQuery = /** @class */function () {
    function lgQuery(selector) {
      this.cssVenderPrefixes = ['TransitionDuration', 'TransitionTimingFunction', 'Transform', 'Transition'];
      this.selector = this._getSelector(selector);
      this.firstElement = this._getFirstEl();
      return this;
    }
    lgQuery.generateUUID = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    };
    lgQuery.prototype._getSelector = function (selector, context) {
      if (context === void 0) {
        context = document;
      }
      if (typeof selector !== 'string') {
        return selector;
      }
      context = context || document;
      var fl = selector.substring(0, 1);
      if (fl === '#') {
        return context.querySelector(selector);
      } else {
        return context.querySelectorAll(selector);
      }
    };
    lgQuery.prototype._each = function (func) {
      if (!this.selector) {
        return this;
      }
      if (this.selector.length !== undefined) {
        [].forEach.call(this.selector, func);
      } else {
        func(this.selector, 0);
      }
      return this;
    };
    lgQuery.prototype._setCssVendorPrefix = function (el, cssProperty, value) {
      // prettier-ignore
      var property = cssProperty.replace(/-([a-z])/gi, function (s, group1) {
        return group1.toUpperCase();
      });
      if (this.cssVenderPrefixes.indexOf(property) !== -1) {
        el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
        el.style['webkit' + property] = value;
        el.style['moz' + property] = value;
        el.style['ms' + property] = value;
        el.style['o' + property] = value;
      } else {
        el.style[property] = value;
      }
    };
    lgQuery.prototype._getFirstEl = function () {
      if (this.selector && this.selector.length !== undefined) {
        return this.selector[0];
      } else {
        return this.selector;
      }
    };
    lgQuery.prototype.isEventMatched = function (event, eventName) {
      var eventNamespace = eventName.split('.');
      return event.split('.').filter(function (e) {
        return e;
      }).every(function (e) {
        return eventNamespace.indexOf(e) !== -1;
      });
    };
    lgQuery.prototype.attr = function (attr, value) {
      if (value === undefined) {
        if (!this.firstElement) {
          return '';
        }
        return this.firstElement.getAttribute(attr);
      }
      this._each(function (el) {
        el.setAttribute(attr, value);
      });
      return this;
    };
    lgQuery.prototype.find = function (selector) {
      return $LG(this._getSelector(selector, this.selector));
    };
    lgQuery.prototype.first = function () {
      if (this.selector && this.selector.length !== undefined) {
        return $LG(this.selector[0]);
      } else {
        return $LG(this.selector);
      }
    };
    lgQuery.prototype.eq = function (index) {
      return $LG(this.selector[index]);
    };
    lgQuery.prototype.parent = function () {
      return $LG(this.selector.parentElement);
    };
    lgQuery.prototype.get = function () {
      return this._getFirstEl();
    };
    lgQuery.prototype.removeAttr = function (attributes) {
      var attrs = attributes.split(' ');
      this._each(function (el) {
        attrs.forEach(function (attr) {
          return el.removeAttribute(attr);
        });
      });
      return this;
    };
    lgQuery.prototype.wrap = function (className) {
      if (!this.firstElement) {
        return this;
      }
      var wrapper = document.createElement('div');
      wrapper.className = className;
      this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
      this.firstElement.parentNode.removeChild(this.firstElement);
      wrapper.appendChild(this.firstElement);
      return this;
    };
    lgQuery.prototype.addClass = function (classNames) {
      if (classNames === void 0) {
        classNames = '';
      }
      this._each(function (el) {
        // IE doesn't support multiple arguments
        classNames.split(' ').forEach(function (className) {
          if (className) {
            el.classList.add(className);
          }
        });
      });
      return this;
    };
    lgQuery.prototype.removeClass = function (classNames) {
      this._each(function (el) {
        // IE doesn't support multiple arguments
        classNames.split(' ').forEach(function (className) {
          if (className) {
            el.classList.remove(className);
          }
        });
      });
      return this;
    };
    lgQuery.prototype.hasClass = function (className) {
      if (!this.firstElement) {
        return false;
      }
      return this.firstElement.classList.contains(className);
    };
    lgQuery.prototype.hasAttribute = function (attribute) {
      if (!this.firstElement) {
        return false;
      }
      return this.firstElement.hasAttribute(attribute);
    };
    lgQuery.prototype.toggleClass = function (className) {
      if (!this.firstElement) {
        return this;
      }
      if (this.hasClass(className)) {
        this.removeClass(className);
      } else {
        this.addClass(className);
      }
      return this;
    };
    lgQuery.prototype.css = function (property, value) {
      var _this = this;
      this._each(function (el) {
        _this._setCssVendorPrefix(el, property, value);
      });
      return this;
    };
    // Need to pass separate namespaces for separate elements
    lgQuery.prototype.on = function (events, listener) {
      var _this = this;
      if (!this.selector) {
        return this;
      }
      events.split(' ').forEach(function (event) {
        if (!Array.isArray(lgQuery.eventListeners[event])) {
          lgQuery.eventListeners[event] = [];
        }
        lgQuery.eventListeners[event].push(listener);
        _this.selector.addEventListener(event.split('.')[0], listener);
      });
      return this;
    };
    // @todo - test this
    lgQuery.prototype.once = function (event, listener) {
      var _this = this;
      this.on(event, function () {
        _this.off(event);
        listener(event);
      });
      return this;
    };
    lgQuery.prototype.off = function (event) {
      var _this = this;
      if (!this.selector) {
        return this;
      }
      Object.keys(lgQuery.eventListeners).forEach(function (eventName) {
        if (_this.isEventMatched(event, eventName)) {
          lgQuery.eventListeners[eventName].forEach(function (listener) {
            _this.selector.removeEventListener(eventName.split('.')[0], listener);
          });
          lgQuery.eventListeners[eventName] = [];
        }
      });
      return this;
    };
    lgQuery.prototype.trigger = function (event, detail) {
      if (!this.firstElement) {
        return this;
      }
      var customEvent = new CustomEvent(event.split('.')[0], {
        detail: detail || null
      });
      this.firstElement.dispatchEvent(customEvent);
      return this;
    };
    // Does not support IE
    lgQuery.prototype.load = function (url) {
      var _this = this;
      fetch(url).then(function (res) {
        _this.selector.innerHTML = res;
      });
      return this;
    };
    lgQuery.prototype.html = function (html) {
      if (html === undefined) {
        if (!this.firstElement) {
          return '';
        }
        return this.firstElement.innerHTML;
      }
      this._each(function (el) {
        el.innerHTML = html;
      });
      return this;
    };
    lgQuery.prototype.append = function (html) {
      this._each(function (el) {
        if (typeof html === 'string') {
          el.insertAdjacentHTML('beforeend', html);
        } else {
          el.appendChild(html);
        }
      });
      return this;
    };
    lgQuery.prototype.prepend = function (html) {
      this._each(function (el) {
        el.insertAdjacentHTML('afterbegin', html);
      });
      return this;
    };
    lgQuery.prototype.remove = function () {
      this._each(function (el) {
        el.parentNode.removeChild(el);
      });
      return this;
    };
    lgQuery.prototype.empty = function () {
      this._each(function (el) {
        el.innerHTML = '';
      });
      return this;
    };
    lgQuery.prototype.scrollTop = function (scrollTop) {
      if (scrollTop !== undefined) {
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        return this;
      } else {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      }
    };
    lgQuery.prototype.scrollLeft = function (scrollLeft) {
      if (scrollLeft !== undefined) {
        document.body.scrollLeft = scrollLeft;
        document.documentElement.scrollLeft = scrollLeft;
        return this;
      } else {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      }
    };
    lgQuery.prototype.offset = function () {
      if (!this.firstElement) {
        return {
          left: 0,
          top: 0
        };
      }
      var rect = this.firstElement.getBoundingClientRect();
      var bodyMarginLeft = $LG('body').style().marginLeft;
      // Minus body margin - https://stackoverflow.com/questions/30711548/is-getboundingclientrect-left-returning-a-wrong-value
      return {
        left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
        top: rect.top + this.scrollTop()
      };
    };
    lgQuery.prototype.style = function () {
      if (!this.firstElement) {
        return {};
      }
      return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
    };
    // Width without padding and border even if box-sizing is used.
    lgQuery.prototype.width = function () {
      var style = this.style();
      return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    };
    // Height without padding and border even if box-sizing is used.
    lgQuery.prototype.height = function () {
      var style = this.style();
      return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    };
    lgQuery.eventListeners = {};
    return lgQuery;
  }();
  function $LG(selector) {
    initLgPolyfills();
    return new lgQuery(selector);
  }
  var defaultDynamicOptions = ['src', 'sources', 'subHtml', 'subHtmlUrl', 'html', 'video', 'poster', 'slideName', 'responsive', 'srcset', 'sizes', 'iframe', 'downloadUrl', 'download', 'width', 'facebookShareUrl', 'tweetText', 'iframeTitle', 'twitterShareUrl', 'pinterestShareUrl', 'pinterestText', 'fbHtml', 'disqusIdentifier', 'disqusUrl'];
  // Convert html data-attribute to camalcase
  function convertToData(attr) {
    // FInd a way for lgsize
    if (attr === 'href') {
      return 'src';
    }
    attr = attr.replace('data-', '');
    attr = attr.charAt(0).toLowerCase() + attr.slice(1);
    attr = attr.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
    return attr;
  }
  var utils = {
    /**
     * get possible width and height from the lgSize attribute. Used for ZoomFromOrigin option
     */
    getSize: function getSize(el, container, spacing, defaultLgSize) {
      if (spacing === void 0) {
        spacing = 0;
      }
      var LGel = $LG(el);
      var lgSize = LGel.attr('data-lg-size') || defaultLgSize;
      if (!lgSize) {
        return;
      }
      var isResponsiveSizes = lgSize.split(',');
      // if at-least two viewport sizes are available
      if (isResponsiveSizes[1]) {
        var wWidth = window.innerWidth;
        for (var i = 0; i < isResponsiveSizes.length; i++) {
          var size_1 = isResponsiveSizes[i];
          var responsiveWidth = parseInt(size_1.split('-')[2], 10);
          if (responsiveWidth > wWidth) {
            lgSize = size_1;
            break;
          }
          // take last item as last option
          if (i === isResponsiveSizes.length - 1) {
            lgSize = size_1;
          }
        }
      }
      var size = lgSize.split('-');
      var width = parseInt(size[0], 10);
      var height = parseInt(size[1], 10);
      var cWidth = container.width();
      var cHeight = container.height() - spacing;
      var maxWidth = Math.min(cWidth, width);
      var maxHeight = Math.min(cHeight, height);
      var ratio = Math.min(maxWidth / width, maxHeight / height);
      return {
        width: width * ratio,
        height: height * ratio
      };
    },
    /**
     * @desc Get transform value based on the imageSize. Used for ZoomFromOrigin option
     * @param {jQuery Element}
     * @returns {String} Transform CSS string
     */
    getTransform: function getTransform(el, container, top, bottom, imageSize) {
      if (!imageSize) {
        return;
      }
      var LGel = $LG(el).find('img').first();
      if (!LGel.get()) {
        return;
      }
      var containerRect = container.get().getBoundingClientRect();
      var wWidth = containerRect.width;
      // using innerWidth to include mobile safari bottom bar
      var wHeight = container.height() - (top + bottom);
      var elWidth = LGel.width();
      var elHeight = LGel.height();
      var elStyle = LGel.style();
      var x = (wWidth - elWidth) / 2 - LGel.offset().left + (parseFloat(elStyle.paddingLeft) || 0) + (parseFloat(elStyle.borderLeft) || 0) + $LG(window).scrollLeft() + containerRect.left;
      var y = (wHeight - elHeight) / 2 - LGel.offset().top + (parseFloat(elStyle.paddingTop) || 0) + (parseFloat(elStyle.borderTop) || 0) + $LG(window).scrollTop() + top;
      var scX = elWidth / imageSize.width;
      var scY = elHeight / imageSize.height;
      var transform = 'translate3d(' + (x *= -1) + 'px, ' + (y *= -1) + 'px, 0) scale3d(' + scX + ', ' + scY + ', 1)';
      return transform;
    },
    getIframeMarkup: function getIframeMarkup(iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
      var title = iframeTitle ? 'title="' + iframeTitle + '"' : '';
      return "<div class=\"lg-video-cont lg-has-iframe\" style=\"width:" + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + "\">\n                    <iframe class=\"lg-object\" frameborder=\"0\" " + title + " src=\"" + src + "\"  allowfullscreen=\"true\"></iframe>\n                </div>";
    },
    getImgMarkup: function getImgMarkup(index, src, altAttr, srcset, sizes, sources) {
      var srcsetAttr = srcset ? "srcset=\"" + srcset + "\"" : '';
      var sizesAttr = sizes ? "sizes=\"" + sizes + "\"" : '';
      var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + " class=\"lg-object lg-image\" data-index=\"" + index + "\" src=\"" + src + "\" />";
      var sourceTag = '';
      if (sources) {
        var sourceObj = typeof sources === 'string' ? JSON.parse(sources) : sources;
        sourceTag = sourceObj.map(function (source) {
          var attrs = '';
          Object.keys(source).forEach(function (key) {
            // Do not remove the first space as it is required to separate the attributes
            attrs += " " + key + "=\"" + source[key] + "\"";
          });
          return "<source " + attrs + "></source>";
        });
      }
      return "" + sourceTag + imgMarkup;
    },
    // Get src from responsive src
    getResponsiveSrc: function getResponsiveSrc(srcItms) {
      var rsWidth = [];
      var rsSrc = [];
      var src = '';
      for (var i = 0; i < srcItms.length; i++) {
        var _src = srcItms[i].split(' ');
        // Manage empty space
        if (_src[0] === '') {
          _src.splice(0, 1);
        }
        rsSrc.push(_src[0]);
        rsWidth.push(_src[1]);
      }
      var wWidth = window.innerWidth;
      for (var j = 0; j < rsWidth.length; j++) {
        if (parseInt(rsWidth[j], 10) > wWidth) {
          src = rsSrc[j];
          break;
        }
      }
      return src;
    },
    isImageLoaded: function isImageLoaded(img) {
      if (!img) return false;
      // During the onload event, IE correctly identifies any images that
      // weren’t downloaded as not complete. Others should too. Gecko-based
      // browsers act like NS4 in that they report this incorrectly.
      if (!img.complete) {
        return false;
      }
      // However, they do have two very useful properties: naturalWidth and
      // naturalHeight. These give the true size of the image. If it failed
      // to load, either of these should be zero.
      if (img.naturalWidth === 0) {
        return false;
      }
      // No other way of checking: assume it’s ok.
      return true;
    },
    getVideoPosterMarkup: function getVideoPosterMarkup(_poster, dummyImg, videoContStyle, playVideoString, _isVideo) {
      var videoClass = '';
      if (_isVideo && _isVideo.youtube) {
        videoClass = 'lg-has-youtube';
      } else if (_isVideo && _isVideo.vimeo) {
        videoClass = 'lg-has-vimeo';
      } else {
        videoClass = 'lg-has-html5';
      }
      return "<div class=\"lg-video-cont " + videoClass + "\" style=\"" + videoContStyle + "\">\n                <div class=\"lg-video-play-button\">\n                <svg\n                    viewBox=\"0 0 20 20\"\n                    preserveAspectRatio=\"xMidYMid\"\n                    focusable=\"false\"\n                    aria-labelledby=\"" + playVideoString + "\"\n                    role=\"img\"\n                    class=\"lg-video-play-icon\"\n                >\n                    <title>" + playVideoString + "</title>\n                    <polygon class=\"lg-video-play-icon-inner\" points=\"1,0 20,10 1,20\"></polygon>\n                </svg>\n                <svg class=\"lg-video-play-icon-bg\" viewBox=\"0 0 50 50\" focusable=\"false\">\n                    <circle cx=\"50%\" cy=\"50%\" r=\"20\"></circle></svg>\n                <svg class=\"lg-video-play-icon-circle\" viewBox=\"0 0 50 50\" focusable=\"false\">\n                    <circle cx=\"50%\" cy=\"50%\" r=\"20\"></circle>\n                </svg>\n            </div>\n            " + (dummyImg || '') + "\n            <img class=\"lg-object lg-video-poster\" src=\"" + _poster + "\" />\n        </div>";
    },
    /**
     * @desc Create dynamic elements array from gallery items when dynamic option is false
     * It helps to avoid frequent DOM interaction
     * and avoid multiple checks for dynamic elments
     *
     * @returns {Array} dynamicEl
     */
    getDynamicOptions: function getDynamicOptions(items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
      var dynamicElements = [];
      var availableDynamicOptions = __spreadArrays(defaultDynamicOptions, extraProps);
      [].forEach.call(items, function (item) {
        var dynamicEl = {};
        for (var i = 0; i < item.attributes.length; i++) {
          var attr = item.attributes[i];
          if (attr.specified) {
            var dynamicAttr = convertToData(attr.name);
            var label = '';
            if (availableDynamicOptions.indexOf(dynamicAttr) > -1) {
              label = dynamicAttr;
            }
            if (label) {
              dynamicEl[label] = attr.value;
            }
          }
        }
        var currentItem = $LG(item);
        var alt = currentItem.find('img').first().attr('alt');
        var title = currentItem.attr('title');
        var thumb = exThumbImage ? currentItem.attr(exThumbImage) : currentItem.find('img').first().attr('src');
        dynamicEl.thumb = thumb;
        if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) {
          dynamicEl.subHtml = title || alt || '';
        }
        dynamicEl.alt = alt || title || '';
        dynamicElements.push(dynamicEl);
      });
      return dynamicElements;
    },
    isMobile: function isMobile() {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    /**
     * @desc Check the given src is video
     * @param {String} src
     * @return {Object} video type
     * Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
     *
     * @todo - this information can be moved to dynamicEl to avoid frequent calls
     */
    isVideo: function isVideo(src, isHTML5VIdeo, index) {
      if (!src) {
        if (isHTML5VIdeo) {
          return {
            html5: true
          };
        } else {
          console.error('lightGallery :- data-src is not provided on slide item ' + (index + 1) + '. Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/');
          return;
        }
      }
      var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
      var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
      var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
      if (youtube) {
        return {
          youtube: youtube
        };
      } else if (vimeo) {
        return {
          vimeo: vimeo
        };
      } else if (wistia) {
        return {
          wistia: wistia
        };
      }
    }
  };

  // @ref - https://stackoverflow.com/questions/3971841/how-to-resize-images-proportionally-keeping-the-aspect-ratio
  // @ref - https://2ality.com/2017/04/setting-up-multi-platform-packages.html
  // Unique id for each gallery
  var lgId = 0;
  var LightGallery = /** @class */function () {
    function LightGallery(element, options) {
      this.lgOpened = false;
      this.index = 0;
      // lightGallery modules
      this.plugins = [];
      // false when lightGallery load first slide content;
      this.lGalleryOn = false;
      // True when a slide animation is in progress
      this.lgBusy = false;
      this.currentItemsInDom = [];
      // Scroll top value before lightGallery is opened
      this.prevScrollTop = 0;
      this.isDummyImageRemoved = false;
      this.dragOrSwipeEnabled = false;
      this.mediaContainerPosition = {
        top: 0,
        bottom: 0
      };
      if (!element) {
        return this;
      }
      lgId++;
      this.lgId = lgId;
      this.el = element;
      this.LGel = $LG(element);
      this.generateSettings(options);
      this.buildModules();
      // When using dynamic mode, ensure dynamicEl is an array
      if (this.settings.dynamic && this.settings.dynamicEl !== undefined && !Array.isArray(this.settings.dynamicEl)) {
        throw 'When using dynamic mode, you must also define dynamicEl as an Array.';
      }
      this.galleryItems = this.getItems();
      this.normalizeSettings();
      // Gallery items
      this.init();
      this.validateLicense();
      return this;
    }
    LightGallery.prototype.generateSettings = function (options) {
      // lightGallery settings
      this.settings = _assign(_assign({}, lightGalleryCoreSettings), options);
      if (this.settings.isMobile && typeof this.settings.isMobile === 'function' ? this.settings.isMobile() : utils.isMobile()) {
        var mobileSettings = _assign(_assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
        this.settings = _assign(_assign({}, this.settings), mobileSettings);
      }
    };
    LightGallery.prototype.normalizeSettings = function () {
      if (this.settings.slideEndAnimation) {
        this.settings.hideControlOnEnd = false;
      }
      if (!this.settings.closable) {
        this.settings.swipeToClose = false;
      }
      // And reset it on close to get the correct value next time
      this.zoomFromOrigin = this.settings.zoomFromOrigin;
      // At the moment, Zoom from image doesn't support dynamic options
      // @todo add zoomFromOrigin support for dynamic images
      if (this.settings.dynamic) {
        this.zoomFromOrigin = false;
      }
      if (!this.settings.container) {
        this.settings.container = document.body;
      }
      // settings.preload should not be grater than $item.length
      this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
    };
    LightGallery.prototype.init = function () {
      var _this = this;
      this.addSlideVideoInfo(this.galleryItems);
      this.buildStructure();
      this.LGel.trigger(lGEvents.init, {
        instance: this
      });
      if (this.settings.keyPress) {
        this.keyPress();
      }
      setTimeout(function () {
        _this.enableDrag();
        _this.enableSwipe();
        _this.triggerPosterClick();
      }, 50);
      this.arrow();
      if (this.settings.mousewheel) {
        this.mousewheel();
      }
      if (!this.settings.dynamic) {
        this.openGalleryOnItemClick();
      }
    };
    LightGallery.prototype.openGalleryOnItemClick = function () {
      var _this = this;
      var _loop_1 = function _loop_1(index) {
        var element = this_1.items[index];
        var $element = $LG(element);
        // Using different namespace for click because click event should not unbind if selector is same object('this')
        // @todo manage all event listners - should have namespace that represent element
        var uuid = lgQuery.generateUUID();
        $element.attr('data-lg-id', uuid).on("click.lgcustom-item-" + uuid, function (e) {
          e.preventDefault();
          var currentItemIndex = _this.settings.index || index;
          _this.openGallery(currentItemIndex, element);
        });
      };
      var this_1 = this;
      // Using for loop instead of using bubbling as the items can be any html element.
      for (var index = 0; index < this.items.length; index++) {
        _loop_1(index);
      }
    };
    /**
     * Module constructor
     * Modules are build incrementally.
     * Gallery should be opened only once all the modules are initialized.
     * use moduleBuildTimeout to make sure this
     */
    LightGallery.prototype.buildModules = function () {
      var _this = this;
      this.settings.plugins.forEach(function (plugin) {
        _this.plugins.push(new plugin(_this, $LG));
      });
    };
    LightGallery.prototype.validateLicense = function () {
      if (!this.settings.licenseKey) {
        console.error('Please provide a valid license key');
      } else if (this.settings.licenseKey === '0000-0000-000-0000') {
        console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
      }
    };
    LightGallery.prototype.getSlideItem = function (index) {
      return $LG(this.getSlideItemId(index));
    };
    LightGallery.prototype.getSlideItemId = function (index) {
      return "#lg-item-" + this.lgId + "-" + index;
    };
    LightGallery.prototype.getIdName = function (id) {
      return id + "-" + this.lgId;
    };
    LightGallery.prototype.getElementById = function (id) {
      return $LG("#" + this.getIdName(id));
    };
    LightGallery.prototype.manageSingleSlideClassName = function () {
      if (this.galleryItems.length < 2) {
        this.outer.addClass('lg-single-item');
      } else {
        this.outer.removeClass('lg-single-item');
      }
    };
    LightGallery.prototype.buildStructure = function () {
      var _this = this;
      var container = this.$container && this.$container.get();
      if (container) {
        return;
      }
      var controls = '';
      var subHtmlCont = '';
      // Create controls
      if (this.settings.controls) {
        controls = "<button type=\"button\" id=\"" + this.getIdName('lg-prev') + "\" aria-label=\"" + this.settings.strings['previousSlide'] + "\" class=\"lg-prev lg-icon\"> " + this.settings.prevHtml + " </button>\n                <button type=\"button\" id=\"" + this.getIdName('lg-next') + "\" aria-label=\"" + this.settings.strings['nextSlide'] + "\" class=\"lg-next lg-icon\"> " + this.settings.nextHtml + " </button>";
      }
      if (this.settings.appendSubHtmlTo !== '.lg-item') {
        subHtmlCont = '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
      }
      var addClasses = '';
      if (this.settings.allowMediaOverlap) {
        // Do not remove space before last single quote
        addClasses += 'lg-media-overlap ';
      }
      var ariaLabelledby = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : '';
      var ariaDescribedby = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : '';
      var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? 'lg-inline' : '');
      var closeIcon = this.settings.closable && this.settings.showCloseIcon ? "<button type=\"button\" aria-label=\"" + this.settings.strings['closeGallery'] + "\" id=\"" + this.getIdName('lg-close') + "\" class=\"lg-close lg-icon\"></button>" : '';
      var maximizeIcon = this.settings.showMaximizeIcon ? "<button type=\"button\" aria-label=\"" + this.settings.strings['toggleMaximize'] + "\" id=\"" + this.getIdName('lg-maximize') + "\" class=\"lg-maximize lg-icon\"></button>" : '';
      var template = "\n        <div class=\"" + containerClassName + "\" id=\"" + this.getIdName('lg-container') + "\" tabindex=\"-1\" aria-modal=\"true\" " + ariaLabelledby + " " + ariaDescribedby + " role=\"dialog\"\n        >\n            <div id=\"" + this.getIdName('lg-backdrop') + "\" class=\"lg-backdrop\"></div>\n\n            <div id=\"" + this.getIdName('lg-outer') + "\" class=\"lg-outer lg-use-css3 lg-css3 lg-hide-items " + addClasses + " \">\n\n              <div id=\"" + this.getIdName('lg-content') + "\" class=\"lg-content\">\n                <div id=\"" + this.getIdName('lg-inner') + "\" class=\"lg-inner\">\n                </div>\n                " + controls + "\n              </div>\n                <div id=\"" + this.getIdName('lg-toolbar') + "\" class=\"lg-toolbar lg-group\">\n                    " + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (this.settings.appendSubHtmlTo === '.lg-outer' ? subHtmlCont : '') + "\n                <div id=\"" + this.getIdName('lg-components') + "\" class=\"lg-components\">\n                    " + (this.settings.appendSubHtmlTo === '.lg-sub-html' ? subHtmlCont : '') + "\n                </div>\n            </div>\n        </div>\n        ";
      $LG(this.settings.container).append(template);
      if (document.body !== this.settings.container) {
        $LG(this.settings.container).css('position', 'relative');
      }
      this.outer = this.getElementById('lg-outer');
      this.$lgComponents = this.getElementById('lg-components');
      this.$backdrop = this.getElementById('lg-backdrop');
      this.$container = this.getElementById('lg-container');
      this.$inner = this.getElementById('lg-inner');
      this.$content = this.getElementById('lg-content');
      this.$toolbar = this.getElementById('lg-toolbar');
      this.$backdrop.css('transition-duration', this.settings.backdropDuration + 'ms');
      var outerClassNames = this.settings.mode + " ";
      this.manageSingleSlideClassName();
      if (this.settings.enableDrag) {
        outerClassNames += 'lg-grab ';
      }
      this.outer.addClass(outerClassNames);
      this.$inner.css('transition-timing-function', this.settings.easing);
      this.$inner.css('transition-duration', this.settings.speed + 'ms');
      if (this.settings.download) {
        this.$toolbar.append("<a id=\"" + this.getIdName('lg-download') + "\" target=\"_blank\" rel=\"noopener\" aria-label=\"" + this.settings.strings['download'] + "\" download class=\"lg-download lg-icon\"></a>");
      }
      this.counter();
      $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, function () {
        _this.refreshOnResize();
      });
      this.hideBars();
      this.manageCloseGallery();
      this.toggleMaximize();
      this.initModules();
    };
    LightGallery.prototype.refreshOnResize = function () {
      if (this.lgOpened) {
        var currentGalleryItem = this.galleryItems[this.index];
        var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
        this.mediaContainerPosition = this.getMediaContainerPosition();
        var _a = this.mediaContainerPosition,
          top_1 = _a.top,
          bottom = _a.bottom;
        this.currentImageSize = utils.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
        if (__slideVideoInfo) {
          this.resizeVideoSlide(this.index, this.currentImageSize);
        }
        if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
          var imgStyle = this.getDummyImgStyles(this.currentImageSize);
          this.outer.find('.lg-current .lg-dummy-img').first().attr('style', imgStyle);
        }
        this.LGel.trigger(lGEvents.containerResize);
      }
    };
    LightGallery.prototype.resizeVideoSlide = function (index, imageSize) {
      var lgVideoStyle = this.getVideoContStyle(imageSize);
      var currentSlide = this.getSlideItem(index);
      currentSlide.find('.lg-video-cont').attr('style', lgVideoStyle);
    };
    /**
     * Update slides dynamically.
     * Add, edit or delete slides dynamically when lightGallery is opened.
     * Modify the current gallery items and pass it via updateSlides method
     * @note
     * - Do not mutate existing lightGallery items directly.
     * - Always pass new list of gallery items
     * - You need to take care of thumbnails outside the gallery if any
     * - user this method only if you want to update slides when the gallery is opened. Otherwise, use `refresh()` method.
     * @param items Gallery items
     * @param index After the update operation, which slide gallery should navigate to
     * @category lGPublicMethods
     * @example
     * const plugin = lightGallery();
     *
     * // Adding slides dynamically
     * let galleryItems = [
     * // Access existing lightGallery items
     * // galleryItems are automatically generated internally from the gallery HTML markup
     * // or directly from galleryItems when dynamic gallery is used
     *   ...plugin.galleryItems,
     *     ...[
     *       {
     *         src: 'img/img-1.png',
     *           thumb: 'img/thumb1.png',
     *         },
     *     ],
     *   ];
     *   plugin.updateSlides(
     *     galleryItems,
     *     plugin.index,
     *   );
     *
     *
     * // Remove slides dynamically
     * galleryItems = JSON.parse(
     *   JSON.stringify(updateSlideInstance.galleryItems),
     * );
     * galleryItems.shift();
     * updateSlideInstance.updateSlides(galleryItems, 1);
     * @see <a href="/demos/update-slides/">Demo</a>
     */
    LightGallery.prototype.updateSlides = function (items, index) {
      if (this.index > items.length - 1) {
        this.index = items.length - 1;
      }
      if (items.length === 1) {
        this.index = 0;
      }
      if (!items.length) {
        this.closeGallery();
        return;
      }
      var currentSrc = this.galleryItems[index].src;
      this.galleryItems = items;
      this.updateControls();
      this.$inner.empty();
      this.currentItemsInDom = [];
      var _index = 0;
      // Find the current index based on source value of the slide
      this.galleryItems.some(function (galleryItem, itemIndex) {
        if (galleryItem.src === currentSrc) {
          _index = itemIndex;
          return true;
        }
        return false;
      });
      this.currentItemsInDom = this.organizeSlideItems(_index, -1);
      this.loadContent(_index, true);
      this.getSlideItem(_index).addClass('lg-current');
      this.index = _index;
      this.updateCurrentCounter(_index);
      this.LGel.trigger(lGEvents.updateSlides);
    };
    // Get gallery items based on multiple conditions
    LightGallery.prototype.getItems = function () {
      // Gallery items
      this.items = [];
      if (!this.settings.dynamic) {
        if (this.settings.selector === 'this') {
          this.items.push(this.el);
        } else if (this.settings.selector) {
          if (typeof this.settings.selector === 'string') {
            if (this.settings.selectWithin) {
              var selectWithin = $LG(this.settings.selectWithin);
              this.items = selectWithin.find(this.settings.selector).get();
            } else {
              this.items = this.el.querySelectorAll(this.settings.selector);
            }
          } else {
            this.items = this.settings.selector;
          }
        } else {
          this.items = this.el.children;
        }
        return utils.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
      } else {
        return this.settings.dynamicEl || [];
      }
    };
    /**
     * Open lightGallery.
     * Open gallery with specific slide by passing index of the slide as parameter.
     * @category lGPublicMethods
     * @param {Number} index  - index of the slide
     * @param {HTMLElement} element - Which image lightGallery should zoom from
     *
     * @example
     * const $dynamicGallery = document.getElementById('dynamic-gallery-demo');
     * const dynamicGallery = lightGallery($dynamicGallery, {
     *     dynamic: true,
     *     dynamicEl: [
     *         {
     *              src: 'img/1.jpg',
     *              thumb: 'img/thumb-1.jpg',
     *              subHtml: '<h4>Image 1 title</h4><p>Image 1 descriptions.</p>',
     *         },
     *         ...
     *     ],
     * });
     * $dynamicGallery.addEventListener('click', function () {
     *     // Starts with third item.(Optional).
     *     // This is useful if you want use dynamic mode with
     *     // custom thumbnails (thumbnails outside gallery),
     *     dynamicGallery.openGallery(2);
     * });
     *
     */
    LightGallery.prototype.openGallery = function (index, element) {
      var _this = this;
      if (index === void 0) {
        index = this.settings.index;
      }
      // prevent accidental double execution
      if (this.lgOpened) return;
      this.lgOpened = true;
      this.outer.get().focus();
      this.outer.removeClass('lg-hide-items');
      // Add display block, but still has opacity 0
      this.$container.addClass('lg-show');
      var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
      this.currentItemsInDom = itemsToBeInsertedToDom;
      var items = '';
      itemsToBeInsertedToDom.forEach(function (item) {
        items = items + ("<div id=\"" + item + "\" class=\"lg-item\"></div>");
      });
      this.$inner.append(items);
      this.addHtml(index);
      var transform = '';
      this.mediaContainerPosition = this.getMediaContainerPosition();
      var _a = this.mediaContainerPosition,
        top = _a.top,
        bottom = _a.bottom;
      if (!this.settings.allowMediaOverlap) {
        this.setMediaContainerPosition(top, bottom);
      }
      var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
      if (this.zoomFromOrigin && element) {
        this.currentImageSize = utils.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
        transform = utils.getTransform(element, this.outer, top, bottom, this.currentImageSize);
      }
      if (!this.zoomFromOrigin || !transform) {
        this.outer.addClass(this.settings.startClass);
        this.getSlideItem(index).removeClass('lg-complete');
      }
      var timeout = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
      setTimeout(function () {
        _this.outer.addClass('lg-components-open');
      }, timeout);
      this.index = index;
      this.LGel.trigger(lGEvents.beforeOpen);
      // add class lg-current to remove initial transition
      this.getSlideItem(index).addClass('lg-current');
      this.lGalleryOn = false;
      // Store the current scroll top value to scroll back after closing the gallery..
      this.prevScrollTop = $LG(window).scrollTop();
      setTimeout(function () {
        // Need to check both zoomFromOrigin and transform values as we need to set set the
        // default opening animation if user missed to add the lg-size attribute
        if (_this.zoomFromOrigin && transform) {
          var currentSlide_1 = _this.getSlideItem(index);
          currentSlide_1.css('transform', transform);
          setTimeout(function () {
            currentSlide_1.addClass('lg-start-progress lg-start-end-progress').css('transition-duration', _this.settings.startAnimationDuration + 'ms');
            _this.outer.addClass('lg-zoom-from-image');
          });
          setTimeout(function () {
            currentSlide_1.css('transform', 'translate3d(0, 0, 0)');
          }, 100);
        }
        setTimeout(function () {
          _this.$backdrop.addClass('in');
          _this.$container.addClass('lg-show-in');
        }, 10);
        // lg-visible class resets gallery opacity to 1
        if (!_this.zoomFromOrigin || !transform) {
          setTimeout(function () {
            _this.outer.addClass('lg-visible');
          }, _this.settings.backdropDuration);
        }
        // initiate slide function
        _this.slide(index, false, false, false);
        _this.LGel.trigger(lGEvents.afterOpen);
      });
      if (document.body === this.settings.container) {
        $LG('html').addClass('lg-on');
      }
    };
    /**
     * Note - Changing the position of the media on every slide transition creates a flickering effect.
     * Therefore, The height of the caption is calculated dynamically, only once based on the first slide caption.
     * if you have dynamic captions for each media,
     * you can provide an appropriate height for the captions via allowMediaOverlap option
     */
    LightGallery.prototype.getMediaContainerPosition = function () {
      if (this.settings.allowMediaOverlap) {
        return {
          top: 0,
          bottom: 0
        };
      }
      var top = this.$toolbar.get().clientHeight || 0;
      var subHtml = this.outer.find('.lg-components .lg-sub-html').get();
      var captionHeight = this.settings.defaultCaptionHeight || subHtml && subHtml.clientHeight || 0;
      var thumbContainer = this.outer.find('.lg-thumb-outer').get();
      var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
      var bottom = thumbHeight + captionHeight;
      return {
        top: top,
        bottom: bottom
      };
    };
    LightGallery.prototype.setMediaContainerPosition = function (top, bottom) {
      if (top === void 0) {
        top = 0;
      }
      if (bottom === void 0) {
        bottom = 0;
      }
      this.$content.css('top', top + 'px').css('bottom', bottom + 'px');
    };
    LightGallery.prototype.hideBars = function () {
      var _this = this;
      // Hide controllers if mouse doesn't move for some period
      setTimeout(function () {
        _this.outer.removeClass('lg-hide-items');
        if (_this.settings.hideBarsDelay > 0) {
          _this.outer.on('mousemove.lg click.lg touchstart.lg', function () {
            _this.outer.removeClass('lg-hide-items');
            clearTimeout(_this.hideBarTimeout);
            // Timeout will be cleared on each slide movement also
            _this.hideBarTimeout = setTimeout(function () {
              _this.outer.addClass('lg-hide-items');
            }, _this.settings.hideBarsDelay);
          });
          _this.outer.trigger('mousemove.lg');
        }
      }, this.settings.showBarsAfter);
    };
    LightGallery.prototype.initPictureFill = function ($img) {
      if (this.settings.supportLegacyBrowser) {
        try {
          picturefill({
            elements: [$img.get()]
          });
        } catch (e) {
          console.warn('lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.');
        }
      }
    };
    /**
     *  @desc Create image counter
     *  Ex: 1/10
     */
    LightGallery.prototype.counter = function () {
      if (this.settings.counter) {
        var counterHtml = "<div class=\"lg-counter\" role=\"status\" aria-live=\"polite\">\n                <span id=\"" + this.getIdName('lg-counter-current') + "\" class=\"lg-counter-current\">" + (this.index + 1) + " </span> /\n                <span id=\"" + this.getIdName('lg-counter-all') + "\" class=\"lg-counter-all\">" + this.galleryItems.length + " </span></div>";
        this.outer.find(this.settings.appendCounterTo).append(counterHtml);
      }
    };
    /**
     *  @desc add sub-html into the slide
     *  @param {Number} index - index of the slide
     */
    LightGallery.prototype.addHtml = function (index) {
      var subHtml;
      var subHtmlUrl;
      if (this.galleryItems[index].subHtmlUrl) {
        subHtmlUrl = this.galleryItems[index].subHtmlUrl;
      } else {
        subHtml = this.galleryItems[index].subHtml;
      }
      if (!subHtmlUrl) {
        if (subHtml) {
          // get first letter of sub-html
          // if first letter starts with . or # get the html form the jQuery object
          var fL = subHtml.substring(0, 1);
          if (fL === '.' || fL === '#') {
            if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic) {
              subHtml = $LG(this.items).eq(index).find(subHtml).first().html();
            } else {
              subHtml = $LG(subHtml).first().html();
            }
          }
        } else {
          subHtml = '';
        }
      }
      if (this.settings.appendSubHtmlTo !== '.lg-item') {
        if (subHtmlUrl) {
          this.outer.find('.lg-sub-html').load(subHtmlUrl);
        } else {
          this.outer.find('.lg-sub-html').html(subHtml);
        }
      } else {
        var currentSlide = $LG(this.getSlideItemId(index));
        if (subHtmlUrl) {
          currentSlide.load(subHtmlUrl);
        } else {
          currentSlide.append("<div class=\"lg-sub-html\">" + subHtml + "</div>");
        }
      }
      // Add lg-empty-html class if title doesn't exist
      if (typeof subHtml !== 'undefined' && subHtml !== null) {
        if (subHtml === '') {
          this.outer.find(this.settings.appendSubHtmlTo).addClass('lg-empty-html');
        } else {
          this.outer.find(this.settings.appendSubHtmlTo).removeClass('lg-empty-html');
        }
      }
      this.LGel.trigger(lGEvents.afterAppendSubHtml, {
        index: index
      });
    };
    /**
     *  @desc Preload slides
     *  @param {Number} index - index of the slide
     * @todo preload not working for the first slide, Also, should work for the first and last slide as well
     */
    LightGallery.prototype.preload = function (index) {
      for (var i = 1; i <= this.settings.preload; i++) {
        if (i >= this.galleryItems.length - index) {
          break;
        }
        this.loadContent(index + i, false);
      }
      for (var j = 1; j <= this.settings.preload; j++) {
        if (index - j < 0) {
          break;
        }
        this.loadContent(index - j, false);
      }
    };
    LightGallery.prototype.getDummyImgStyles = function (imageSize) {
      if (!imageSize) return '';
      return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
    };
    LightGallery.prototype.getVideoContStyle = function (imageSize) {
      if (!imageSize) return '';
      return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";
    };
    LightGallery.prototype.getDummyImageContent = function ($currentSlide, index, alt) {
      var $currentItem;
      if (!this.settings.dynamic) {
        $currentItem = $LG(this.items).eq(index);
      }
      if ($currentItem) {
        var _dummyImgSrc = void 0;
        if (!this.settings.exThumbImage) {
          _dummyImgSrc = $currentItem.find('img').first().attr('src');
        } else {
          _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
        }
        if (!_dummyImgSrc) return '';
        var imgStyle = this.getDummyImgStyles(this.currentImageSize);
        var dummyImgContent = "<img " + alt + " style=\"" + imgStyle + "\" class=\"lg-dummy-img\" src=\"" + _dummyImgSrc + "\" />";
        $currentSlide.addClass('lg-first-slide');
        this.outer.addClass('lg-first-slide-loading');
        return dummyImgContent;
      }
      return '';
    };
    LightGallery.prototype.setImgMarkup = function (src, $currentSlide, index) {
      var currentGalleryItem = this.galleryItems[index];
      var alt = currentGalleryItem.alt,
        srcset = currentGalleryItem.srcset,
        sizes = currentGalleryItem.sizes,
        sources = currentGalleryItem.sources;
      // Use the thumbnail as dummy image which will be resized to actual image size and
      // displayed on top of actual image
      var imgContent = '';
      var altAttr = alt ? 'alt="' + alt + '"' : '';
      if (this.isFirstSlideWithZoomAnimation()) {
        imgContent = this.getDummyImageContent($currentSlide, index, altAttr);
      } else {
        imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
      }
      var imgMarkup = "<picture class=\"lg-img-wrap\"> " + imgContent + "</picture>";
      $currentSlide.prepend(imgMarkup);
    };
    LightGallery.prototype.onSlideObjectLoad = function ($slide, isHTML5VideoWithoutPoster, onLoad, onError) {
      var mediaObject = $slide.find('.lg-object').first();
      if (utils.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster) {
        onLoad();
      } else {
        mediaObject.on('load.lg error.lg', function () {
          onLoad && onLoad();
        });
        mediaObject.on('error.lg', function () {
          onError && onError();
        });
      }
    };
    /**
     *
     * @param $el Current slide item
     * @param index
     * @param delay Delay is 0 except first time
     * @param speed Speed is same as delay, except it is 0 if gallery is opened via hash plugin
     * @param isFirstSlide
     */
    LightGallery.prototype.onLgObjectLoad = function (currentSlide, index, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
      var _this = this;
      this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, function () {
        _this.triggerSlideItemLoad(currentSlide, index, delay, speed, isFirstSlide);
      }, function () {
        currentSlide.addClass('lg-complete lg-complete_');
        currentSlide.html('<span class="lg-error-msg">Oops... Failed to load content...</span>');
      });
    };
    LightGallery.prototype.triggerSlideItemLoad = function ($currentSlide, index, delay, speed, isFirstSlide) {
      var _this = this;
      var currentGalleryItem = this.galleryItems[index];
      // Adding delay for video slides without poster for better performance and user experience
      // Videos should start playing once once the gallery is completely loaded
      var _speed = isFirstSlide && this.getSlideType(currentGalleryItem) === 'video' && !currentGalleryItem.poster ? speed : 0;
      setTimeout(function () {
        $currentSlide.addClass('lg-complete lg-complete_');
        _this.LGel.trigger(lGEvents.slideItemLoad, {
          index: index,
          delay: delay || 0,
          isFirstSlide: isFirstSlide
        });
      }, _speed);
    };
    LightGallery.prototype.isFirstSlideWithZoomAnimation = function () {
      return !!(!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize);
    };
    // Add video slideInfo
    LightGallery.prototype.addSlideVideoInfo = function (items) {
      var _this = this;
      items.forEach(function (element, index) {
        element.__slideVideoInfo = utils.isVideo(element.src, !!element.video, index);
        if (element.__slideVideoInfo && _this.settings.loadYouTubePoster && !element.poster && element.__slideVideoInfo.youtube) {
          element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
        }
      });
    };
    /**
     *  Load slide content into slide.
     *  This is used to load content into slides that is not visible too
     *  @param {Number} index - index of the slide.
     *  @param {Boolean} rec - if true call loadcontent() function again.
     */
    LightGallery.prototype.loadContent = function (index, rec) {
      var _this = this;
      var currentGalleryItem = this.galleryItems[index];
      var $currentSlide = $LG(this.getSlideItemId(index));
      var poster = currentGalleryItem.poster,
        srcset = currentGalleryItem.srcset,
        sizes = currentGalleryItem.sizes,
        sources = currentGalleryItem.sources;
      var src = currentGalleryItem.src;
      var video = currentGalleryItem.video;
      var _html5Video = video && typeof video === 'string' ? JSON.parse(video) : video;
      if (currentGalleryItem.responsive) {
        var srcDyItms = currentGalleryItem.responsive.split(',');
        src = utils.getResponsiveSrc(srcDyItms) || src;
      }
      var videoInfo = currentGalleryItem.__slideVideoInfo;
      var lgVideoStyle = '';
      var iframe = !!currentGalleryItem.iframe;
      var isFirstSlide = !this.lGalleryOn;
      // delay for adding complete class. it is 0 except first time.
      var delay = 0;
      if (isFirstSlide) {
        if (this.zoomFromOrigin && this.currentImageSize) {
          delay = this.settings.startAnimationDuration + 10;
        } else {
          delay = this.settings.backdropDuration + 10;
        }
      }
      if (!$currentSlide.hasClass('lg-loaded')) {
        if (videoInfo) {
          var _a = this.mediaContainerPosition,
            top_2 = _a.top,
            bottom = _a.bottom;
          var videoSize = utils.getSize(this.items[index], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
          lgVideoStyle = this.getVideoContStyle(videoSize);
        }
        if (iframe) {
          var markup = utils.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
          $currentSlide.prepend(markup);
        } else if (poster) {
          var dummyImg = '';
          var hasStartAnimation = isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
          if (hasStartAnimation) {
            dummyImg = this.getDummyImageContent($currentSlide, index, '');
          }
          var markup = utils.getVideoPosterMarkup(poster, dummyImg || '', lgVideoStyle, this.settings.strings['playVideo'], videoInfo);
          $currentSlide.prepend(markup);
        } else if (videoInfo) {
          var markup = "<div class=\"lg-video-cont \" style=\"" + lgVideoStyle + "\"></div>";
          $currentSlide.prepend(markup);
        } else {
          this.setImgMarkup(src, $currentSlide, index);
          if (srcset || sources) {
            var $img = $currentSlide.find('.lg-object');
            this.initPictureFill($img);
          }
        }
        if (poster || videoInfo) {
          this.LGel.trigger(lGEvents.hasVideo, {
            index: index,
            src: src,
            html5Video: _html5Video,
            hasPoster: !!poster
          });
        }
        this.LGel.trigger(lGEvents.afterAppendSlide, {
          index: index
        });
        if (this.lGalleryOn && this.settings.appendSubHtmlTo === '.lg-item') {
          this.addHtml(index);
        }
      }
      // For first time add some delay for displaying the start animation.
      var _speed = 0;
      // Do not change the delay value because it is required for zoom plugin.
      // If gallery opened from direct url (hash) speed value should be 0
      if (delay && !$LG(document.body).hasClass('lg-from-hash')) {
        _speed = delay;
      }
      // Only for first slide and zoomFromOrigin is enabled
      if (this.isFirstSlideWithZoomAnimation()) {
        setTimeout(function () {
          $currentSlide.removeClass('lg-start-end-progress lg-start-progress').removeAttr('style');
        }, this.settings.startAnimationDuration + 100);
        if (!$currentSlide.hasClass('lg-loaded')) {
          setTimeout(function () {
            if (_this.getSlideType(currentGalleryItem) === 'image') {
              $currentSlide.find('.lg-img-wrap').append(utils.getImgMarkup(index, src, '', srcset, sizes, currentGalleryItem.sources));
              if (srcset || sources) {
                var $img = $currentSlide.find('.lg-object');
                _this.initPictureFill($img);
              }
            }
            if (_this.getSlideType(currentGalleryItem) === 'image' || _this.getSlideType(currentGalleryItem) === 'video' && poster) {
              _this.onLgObjectLoad($currentSlide, index, delay, _speed, true, false);
              // load remaining slides once the slide is completely loaded
              _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), function () {
                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
              }, function () {
                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
              });
            }
          }, this.settings.startAnimationDuration + 100);
        }
      }
      // SLide content has been added to dom
      $currentSlide.addClass('lg-loaded');
      if (!this.isFirstSlideWithZoomAnimation() || this.getSlideType(currentGalleryItem) === 'video' && !poster) {
        this.onLgObjectLoad($currentSlide, index, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
      }
      // When gallery is opened once content is loaded (second time) need to add lg-complete class for css styling
      if ((!this.zoomFromOrigin || !this.currentImageSize) && $currentSlide.hasClass('lg-complete_') && !this.lGalleryOn) {
        setTimeout(function () {
          $currentSlide.addClass('lg-complete');
        }, this.settings.backdropDuration);
      }
      // Content loaded
      // Need to set lGalleryOn before calling preload function
      this.lGalleryOn = true;
      if (rec === true) {
        if (!$currentSlide.hasClass('lg-complete_')) {
          $currentSlide.find('.lg-object').first().on('load.lg error.lg', function () {
            _this.preload(index);
          });
        } else {
          this.preload(index);
        }
      }
    };
    /**
     * @desc Remove dummy image content and load next slides
     * Called only for the first time if zoomFromOrigin animation is enabled
     * @param index
     * @param $currentSlide
     * @param speed
     */
    LightGallery.prototype.loadContentOnFirstSlideLoad = function (index, $currentSlide, speed) {
      var _this = this;
      setTimeout(function () {
        $currentSlide.find('.lg-dummy-img').remove();
        $currentSlide.removeClass('lg-first-slide');
        _this.outer.removeClass('lg-first-slide-loading');
        _this.isDummyImageRemoved = true;
        _this.preload(index);
      }, speed + 300);
    };
    LightGallery.prototype.getItemsToBeInsertedToDom = function (index, prevIndex, numberOfItems) {
      var _this = this;
      if (numberOfItems === void 0) {
        numberOfItems = 0;
      }
      var itemsToBeInsertedToDom = [];
      // Minimum 2 items should be there
      var possibleNumberOfItems = Math.max(numberOfItems, 3);
      possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
      var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
      if (this.galleryItems.length <= 3) {
        this.galleryItems.forEach(function (_element, index) {
          itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index);
        });
        return itemsToBeInsertedToDom;
      }
      if (index < (this.galleryItems.length - 1) / 2) {
        for (var idx = index; idx > index - possibleNumberOfItems / 2 && idx >= 0; idx--) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
        }
        var numberOfExistingItems = itemsToBeInsertedToDom.length;
        for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index + idx + 1));
        }
      } else {
        for (var idx = index; idx <= this.galleryItems.length - 1 && idx < index + possibleNumberOfItems / 2; idx++) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
        }
        var numberOfExistingItems = itemsToBeInsertedToDom.length;
        for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index - idx - 1));
        }
      }
      if (this.settings.loop) {
        if (index === this.galleryItems.length - 1) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0);
        } else if (index === 0) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
        }
      }
      if (itemsToBeInsertedToDom.indexOf(prevIndexItem) === -1) {
        itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
      }
      return itemsToBeInsertedToDom;
    };
    LightGallery.prototype.organizeSlideItems = function (index, prevIndex) {
      var _this = this;
      var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, prevIndex, this.settings.numberOfSlideItemsInDom);
      itemsToBeInsertedToDom.forEach(function (item) {
        if (_this.currentItemsInDom.indexOf(item) === -1) {
          _this.$inner.append("<div id=\"" + item + "\" class=\"lg-item\"></div>");
        }
      });
      this.currentItemsInDom.forEach(function (item) {
        if (itemsToBeInsertedToDom.indexOf(item) === -1) {
          $LG("#" + item).remove();
        }
      });
      return itemsToBeInsertedToDom;
    };
    /**
     * Get previous index of the slide
     */
    LightGallery.prototype.getPreviousSlideIndex = function () {
      var prevIndex = 0;
      try {
        var currentItemId = this.outer.find('.lg-current').first().attr('id');
        prevIndex = parseInt(currentItemId.split('-')[3]) || 0;
      } catch (error) {
        prevIndex = 0;
      }
      return prevIndex;
    };
    LightGallery.prototype.setDownloadValue = function (index) {
      if (this.settings.download) {
        var currentGalleryItem = this.galleryItems[index];
        var hideDownloadBtn = currentGalleryItem.downloadUrl === false || currentGalleryItem.downloadUrl === 'false';
        if (hideDownloadBtn) {
          this.outer.addClass('lg-hide-download');
        } else {
          var $download = this.getElementById('lg-download');
          this.outer.removeClass('lg-hide-download');
          $download.attr('href', currentGalleryItem.downloadUrl || currentGalleryItem.src);
          if (currentGalleryItem.download) {
            $download.attr('download', currentGalleryItem.download);
          }
        }
      }
    };
    LightGallery.prototype.makeSlideAnimation = function (direction, currentSlideItem, previousSlideItem) {
      var _this = this;
      if (this.lGalleryOn) {
        previousSlideItem.addClass('lg-slide-progress');
      }
      setTimeout(function () {
        // remove all transitions
        _this.outer.addClass('lg-no-trans');
        _this.outer.find('.lg-item').removeClass('lg-prev-slide lg-next-slide');
        if (direction === 'prev') {
          //prevslide
          currentSlideItem.addClass('lg-prev-slide');
          previousSlideItem.addClass('lg-next-slide');
        } else {
          // next slide
          currentSlideItem.addClass('lg-next-slide');
          previousSlideItem.addClass('lg-prev-slide');
        }
        // give 50 ms for browser to add/remove class
        setTimeout(function () {
          _this.outer.find('.lg-item').removeClass('lg-current');
          currentSlideItem.addClass('lg-current');
          // reset all transitions
          _this.outer.removeClass('lg-no-trans');
        }, 50);
      }, this.lGalleryOn ? this.settings.slideDelay : 0);
    };
    /**
     * Goto a specific slide.
     * @param {Number} index - index of the slide
     * @param {Boolean} fromTouch - true if slide function called via touch event or mouse drag
     * @param {Boolean} fromThumb - true if slide function called via thumbnail click
     * @param {String} direction - Direction of the slide(next/prev)
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  // to go to 3rd slide
     *  plugin.slide(2);
     *
     */
    LightGallery.prototype.slide = function (index, fromTouch, fromThumb, direction) {
      var _this = this;
      var prevIndex = this.getPreviousSlideIndex();
      this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
      // Prevent multiple call, Required for hsh plugin
      if (this.lGalleryOn && prevIndex === index) {
        return;
      }
      var numberOfGalleryItems = this.galleryItems.length;
      if (!this.lgBusy) {
        if (this.settings.counter) {
          this.updateCurrentCounter(index);
        }
        var currentSlideItem = this.getSlideItem(index);
        var previousSlideItem_1 = this.getSlideItem(prevIndex);
        var currentGalleryItem = this.galleryItems[index];
        var videoInfo = currentGalleryItem.__slideVideoInfo;
        this.outer.attr('data-lg-slide-type', this.getSlideType(currentGalleryItem));
        this.setDownloadValue(index);
        if (videoInfo) {
          var _a = this.mediaContainerPosition,
            top_3 = _a.top,
            bottom = _a.bottom;
          var videoSize = utils.getSize(this.items[index], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
          this.resizeVideoSlide(index, videoSize);
        }
        this.LGel.trigger(lGEvents.beforeSlide, {
          prevIndex: prevIndex,
          index: index,
          fromTouch: !!fromTouch,
          fromThumb: !!fromThumb
        });
        this.lgBusy = true;
        clearTimeout(this.hideBarTimeout);
        this.arrowDisable(index);
        if (!direction) {
          if (index < prevIndex) {
            direction = 'prev';
          } else if (index > prevIndex) {
            direction = 'next';
          }
        }
        if (!fromTouch) {
          this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1);
        } else {
          this.outer.find('.lg-item').removeClass('lg-prev-slide lg-current lg-next-slide');
          var touchPrev = void 0;
          var touchNext = void 0;
          if (numberOfGalleryItems > 2) {
            touchPrev = index - 1;
            touchNext = index + 1;
            if (index === 0 && prevIndex === numberOfGalleryItems - 1) {
              // next slide
              touchNext = 0;
              touchPrev = numberOfGalleryItems - 1;
            } else if (index === numberOfGalleryItems - 1 && prevIndex === 0) {
              // prev slide
              touchNext = 0;
              touchPrev = numberOfGalleryItems - 1;
            }
          } else {
            touchPrev = 0;
            touchNext = 1;
          }
          if (direction === 'prev') {
            this.getSlideItem(touchNext).addClass('lg-next-slide');
          } else {
            this.getSlideItem(touchPrev).addClass('lg-prev-slide');
          }
          currentSlideItem.addClass('lg-current');
        }
        // Do not put load content in set timeout as it needs to load immediately when the gallery is opened
        if (!this.lGalleryOn) {
          this.loadContent(index, true);
        } else {
          setTimeout(function () {
            _this.loadContent(index, true);
            // Add title if this.settings.appendSubHtmlTo === lg-sub-html
            if (_this.settings.appendSubHtmlTo !== '.lg-item') {
              _this.addHtml(index);
            }
          }, this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
        }
        setTimeout(function () {
          _this.lgBusy = false;
          previousSlideItem_1.removeClass('lg-slide-progress');
          _this.LGel.trigger(lGEvents.afterSlide, {
            prevIndex: prevIndex,
            index: index,
            fromTouch: fromTouch,
            fromThumb: fromThumb
          });
        }, (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
      }
      this.index = index;
    };
    LightGallery.prototype.updateCurrentCounter = function (index) {
      this.getElementById('lg-counter-current').html(index + 1 + '');
    };
    LightGallery.prototype.updateCounterTotal = function () {
      this.getElementById('lg-counter-all').html(this.galleryItems.length + '');
    };
    LightGallery.prototype.getSlideType = function (item) {
      if (item.__slideVideoInfo) {
        return 'video';
      } else if (item.iframe) {
        return 'iframe';
      } else {
        return 'image';
      }
    };
    LightGallery.prototype.touchMove = function (startCoords, endCoords, e) {
      var distanceX = endCoords.pageX - startCoords.pageX;
      var distanceY = endCoords.pageY - startCoords.pageY;
      var allowSwipe = false;
      if (this.swipeDirection) {
        allowSwipe = true;
      } else {
        if (Math.abs(distanceX) > 15) {
          this.swipeDirection = 'horizontal';
          allowSwipe = true;
        } else if (Math.abs(distanceY) > 15) {
          this.swipeDirection = 'vertical';
          allowSwipe = true;
        }
      }
      if (!allowSwipe) {
        return;
      }
      var $currentSlide = this.getSlideItem(this.index);
      if (this.swipeDirection === 'horizontal') {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        // reset opacity and transition duration
        this.outer.addClass('lg-dragging');
        // move current slide
        this.setTranslate($currentSlide, distanceX, 0);
        // move next and prev slide with current slide
        var width = $currentSlide.get().offsetWidth;
        var slideWidthAmount = width * 15 / 100;
        var gutter = slideWidthAmount - Math.abs(distanceX * 10 / 100);
        this.setTranslate(this.outer.find('.lg-prev-slide').first(), -width + distanceX - gutter, 0);
        this.setTranslate(this.outer.find('.lg-next-slide').first(), width + distanceX + gutter, 0);
      } else if (this.swipeDirection === 'vertical') {
        if (this.settings.swipeToClose) {
          e === null || e === void 0 ? void 0 : e.preventDefault();
          this.$container.addClass('lg-dragging-vertical');
          var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
          this.$backdrop.css('opacity', opacity);
          var scale = 1 - Math.abs(distanceY) / (window.innerWidth * 2);
          this.setTranslate($currentSlide, 0, distanceY, scale, scale);
          if (Math.abs(distanceY) > 100) {
            this.outer.addClass('lg-hide-items').removeClass('lg-components-open');
          }
        }
      }
    };
    LightGallery.prototype.touchEnd = function (endCoords, startCoords, event) {
      var _this = this;
      var distance;
      // keep slide animation for any mode while dragg/swipe
      if (this.settings.mode !== 'lg-slide') {
        this.outer.addClass('lg-slide');
      }
      // set transition duration
      setTimeout(function () {
        _this.$container.removeClass('lg-dragging-vertical');
        _this.outer.removeClass('lg-dragging lg-hide-items').addClass('lg-components-open');
        var triggerClick = true;
        if (_this.swipeDirection === 'horizontal') {
          distance = endCoords.pageX - startCoords.pageX;
          var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
          if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
            _this.goToNextSlide(true);
            triggerClick = false;
          } else if (distance > 0 && distanceAbs > _this.settings.swipeThreshold) {
            _this.goToPrevSlide(true);
            triggerClick = false;
          }
        } else if (_this.swipeDirection === 'vertical') {
          distance = Math.abs(endCoords.pageY - startCoords.pageY);
          if (_this.settings.closable && _this.settings.swipeToClose && distance > 100) {
            _this.closeGallery();
            return;
          } else {
            _this.$backdrop.css('opacity', 1);
          }
        }
        _this.outer.find('.lg-item').removeAttr('style');
        if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
          // Trigger click if distance is less than 5 pix
          var target = $LG(event.target);
          if (_this.isPosterElement(target)) {
            _this.LGel.trigger(lGEvents.posterClick);
          }
        }
        _this.swipeDirection = undefined;
      });
      // remove slide class once drag/swipe is completed if mode is not slide
      setTimeout(function () {
        if (!_this.outer.hasClass('lg-dragging') && _this.settings.mode !== 'lg-slide') {
          _this.outer.removeClass('lg-slide');
        }
      }, this.settings.speed + 100);
    };
    LightGallery.prototype.enableSwipe = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isMoved = false;
      var isSwiping = false;
      if (this.settings.enableSwipe) {
        this.$inner.on('touchstart.lg', function (e) {
          _this.dragOrSwipeEnabled = true;
          var $item = _this.getSlideItem(_this.index);
          if (($LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) && !_this.outer.hasClass('lg-zoomed') && !_this.lgBusy && e.targetTouches.length === 1) {
            isSwiping = true;
            _this.touchAction = 'swipe';
            _this.manageSwipeClass();
            startCoords = {
              pageX: e.targetTouches[0].pageX,
              pageY: e.targetTouches[0].pageY
            };
          }
        });
        this.$inner.on('touchmove.lg', function (e) {
          if (isSwiping && _this.touchAction === 'swipe' && e.targetTouches.length === 1) {
            endCoords = {
              pageX: e.targetTouches[0].pageX,
              pageY: e.targetTouches[0].pageY
            };
            _this.touchMove(startCoords, endCoords, e);
            isMoved = true;
          }
        });
        this.$inner.on('touchend.lg', function (event) {
          if (_this.touchAction === 'swipe') {
            if (isMoved) {
              isMoved = false;
              _this.touchEnd(endCoords, startCoords, event);
            } else if (isSwiping) {
              var target = $LG(event.target);
              if (_this.isPosterElement(target)) {
                _this.LGel.trigger(lGEvents.posterClick);
              }
            }
            _this.touchAction = undefined;
            isSwiping = false;
          }
        });
      }
    };
    LightGallery.prototype.enableDrag = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isDraging = false;
      var isMoved = false;
      if (this.settings.enableDrag) {
        this.outer.on('mousedown.lg', function (e) {
          _this.dragOrSwipeEnabled = true;
          var $item = _this.getSlideItem(_this.index);
          if ($LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) {
            if (!_this.outer.hasClass('lg-zoomed') && !_this.lgBusy) {
              e.preventDefault();
              if (!_this.lgBusy) {
                _this.manageSwipeClass();
                startCoords = {
                  pageX: e.pageX,
                  pageY: e.pageY
                };
                isDraging = true;
                // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                _this.outer.get().scrollLeft += 1;
                _this.outer.get().scrollLeft -= 1;
                // *
                _this.outer.removeClass('lg-grab').addClass('lg-grabbing');
                _this.LGel.trigger(lGEvents.dragStart);
              }
            }
          }
        });
        $LG(window).on("mousemove.lg.global" + this.lgId, function (e) {
          if (isDraging && _this.lgOpened) {
            isMoved = true;
            endCoords = {
              pageX: e.pageX,
              pageY: e.pageY
            };
            _this.touchMove(startCoords, endCoords);
            _this.LGel.trigger(lGEvents.dragMove);
          }
        });
        $LG(window).on("mouseup.lg.global" + this.lgId, function (event) {
          if (!_this.lgOpened) {
            return;
          }
          var target = $LG(event.target);
          if (isMoved) {
            isMoved = false;
            _this.touchEnd(endCoords, startCoords, event);
            _this.LGel.trigger(lGEvents.dragEnd);
          } else if (_this.isPosterElement(target)) {
            _this.LGel.trigger(lGEvents.posterClick);
          }
          // Prevent execution on click
          if (isDraging) {
            isDraging = false;
            _this.outer.removeClass('lg-grabbing').addClass('lg-grab');
          }
        });
      }
    };
    LightGallery.prototype.triggerPosterClick = function () {
      var _this = this;
      this.$inner.on('click.lg', function (event) {
        if (!_this.dragOrSwipeEnabled && _this.isPosterElement($LG(event.target))) {
          _this.LGel.trigger(lGEvents.posterClick);
        }
      });
    };
    LightGallery.prototype.manageSwipeClass = function () {
      var _touchNext = this.index + 1;
      var _touchPrev = this.index - 1;
      if (this.settings.loop && this.galleryItems.length > 2) {
        if (this.index === 0) {
          _touchPrev = this.galleryItems.length - 1;
        } else if (this.index === this.galleryItems.length - 1) {
          _touchNext = 0;
        }
      }
      this.outer.find('.lg-item').removeClass('lg-next-slide lg-prev-slide');
      if (_touchPrev > -1) {
        this.getSlideItem(_touchPrev).addClass('lg-prev-slide');
      }
      this.getSlideItem(_touchNext).addClass('lg-next-slide');
    };
    /**
     * Go to next slide
     * @param {Boolean} fromTouch - true if slide function called via touch event
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  plugin.goToNextSlide();
     * @see <a href="/demos/methods/">Demo</a>
     */
    LightGallery.prototype.goToNextSlide = function (fromTouch) {
      var _this = this;
      var _loop = this.settings.loop;
      if (fromTouch && this.galleryItems.length < 3) {
        _loop = false;
      }
      if (!this.lgBusy) {
        if (this.index + 1 < this.galleryItems.length) {
          this.index++;
          this.LGel.trigger(lGEvents.beforeNextSlide, {
            index: this.index
          });
          this.slide(this.index, !!fromTouch, false, 'next');
        } else {
          if (_loop) {
            this.index = 0;
            this.LGel.trigger(lGEvents.beforeNextSlide, {
              index: this.index
            });
            this.slide(this.index, !!fromTouch, false, 'next');
          } else if (this.settings.slideEndAnimation && !fromTouch) {
            this.outer.addClass('lg-right-end');
            setTimeout(function () {
              _this.outer.removeClass('lg-right-end');
            }, 400);
          }
        }
      }
    };
    /**
     * Go to previous slides
     * @param {Boolean} fromTouch - true if slide function called via touch event
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery({});
     *  plugin.goToPrevSlide();
     * @see <a href="/demos/methods/">Demo</a>
     *
     */
    LightGallery.prototype.goToPrevSlide = function (fromTouch) {
      var _this = this;
      var _loop = this.settings.loop;
      if (fromTouch && this.galleryItems.length < 3) {
        _loop = false;
      }
      if (!this.lgBusy) {
        if (this.index > 0) {
          this.index--;
          this.LGel.trigger(lGEvents.beforePrevSlide, {
            index: this.index,
            fromTouch: fromTouch
          });
          this.slide(this.index, !!fromTouch, false, 'prev');
        } else {
          if (_loop) {
            this.index = this.galleryItems.length - 1;
            this.LGel.trigger(lGEvents.beforePrevSlide, {
              index: this.index,
              fromTouch: fromTouch
            });
            this.slide(this.index, !!fromTouch, false, 'prev');
          } else if (this.settings.slideEndAnimation && !fromTouch) {
            this.outer.addClass('lg-left-end');
            setTimeout(function () {
              _this.outer.removeClass('lg-left-end');
            }, 400);
          }
        }
      }
    };
    LightGallery.prototype.keyPress = function () {
      var _this = this;
      $LG(window).on("keydown.lg.global" + this.lgId, function (e) {
        if (_this.lgOpened && _this.settings.escKey === true && e.keyCode === 27) {
          e.preventDefault();
          if (_this.settings.allowMediaOverlap && _this.outer.hasClass('lg-can-toggle') && _this.outer.hasClass('lg-components-open')) {
            _this.outer.removeClass('lg-components-open');
          } else {
            _this.closeGallery();
          }
        }
        if (_this.lgOpened && _this.galleryItems.length > 1) {
          if (e.keyCode === 37) {
            e.preventDefault();
            _this.goToPrevSlide();
          }
          if (e.keyCode === 39) {
            e.preventDefault();
            _this.goToNextSlide();
          }
        }
      });
    };
    LightGallery.prototype.arrow = function () {
      var _this = this;
      this.getElementById('lg-prev').on('click.lg', function () {
        _this.goToPrevSlide();
      });
      this.getElementById('lg-next').on('click.lg', function () {
        _this.goToNextSlide();
      });
    };
    LightGallery.prototype.arrowDisable = function (index) {
      // Disable arrows if settings.hideControlOnEnd is true
      if (!this.settings.loop && this.settings.hideControlOnEnd) {
        var $prev = this.getElementById('lg-prev');
        var $next = this.getElementById('lg-next');
        if (index + 1 === this.galleryItems.length) {
          $next.attr('disabled', 'disabled').addClass('disabled');
        } else {
          $next.removeAttr('disabled').removeClass('disabled');
        }
        if (index === 0) {
          $prev.attr('disabled', 'disabled').addClass('disabled');
        } else {
          $prev.removeAttr('disabled').removeClass('disabled');
        }
      }
    };
    LightGallery.prototype.setTranslate = function ($el, xValue, yValue, scaleX, scaleY) {
      if (scaleX === void 0) {
        scaleX = 1;
      }
      if (scaleY === void 0) {
        scaleY = 1;
      }
      $el.css('transform', 'translate3d(' + xValue + 'px, ' + yValue + 'px, 0px) scale3d(' + scaleX + ', ' + scaleY + ', 1)');
    };
    LightGallery.prototype.mousewheel = function () {
      var _this = this;
      var lastCall = 0;
      this.outer.on('wheel.lg', function (e) {
        if (!e.deltaY || _this.galleryItems.length < 2) {
          return;
        }
        e.preventDefault();
        var now = new Date().getTime();
        if (now - lastCall < 1000) {
          return;
        }
        lastCall = now;
        if (e.deltaY > 0) {
          _this.goToNextSlide();
        } else if (e.deltaY < 0) {
          _this.goToPrevSlide();
        }
      });
    };
    LightGallery.prototype.isSlideElement = function (target) {
      return target.hasClass('lg-outer') || target.hasClass('lg-item') || target.hasClass('lg-img-wrap');
    };
    LightGallery.prototype.isPosterElement = function (target) {
      var playButton = this.getSlideItem(this.index).find('.lg-video-play-button').get();
      return target.hasClass('lg-video-poster') || target.hasClass('lg-video-play-button') || playButton && playButton.contains(target.get());
    };
    /**
     * Maximize minimize inline gallery.
     * @category lGPublicMethods
     */
    LightGallery.prototype.toggleMaximize = function () {
      var _this = this;
      this.getElementById('lg-maximize').on('click.lg', function () {
        _this.$container.toggleClass('lg-inline');
        _this.refreshOnResize();
      });
    };
    LightGallery.prototype.invalidateItems = function () {
      for (var index = 0; index < this.items.length; index++) {
        var element = this.items[index];
        var $element = $LG(element);
        $element.off("click.lgcustom-item-" + $element.attr('data-lg-id'));
      }
    };
    LightGallery.prototype.manageCloseGallery = function () {
      var _this = this;
      if (!this.settings.closable) return;
      var mousedown = false;
      this.getElementById('lg-close').on('click.lg', function () {
        _this.closeGallery();
      });
      if (this.settings.closeOnTap) {
        // If you drag the slide and release outside gallery gets close on chrome
        // for preventing this check mousedown and mouseup happened on .lg-item or lg-outer
        this.outer.on('mousedown.lg', function (e) {
          var target = $LG(e.target);
          if (_this.isSlideElement(target)) {
            mousedown = true;
          } else {
            mousedown = false;
          }
        });
        this.outer.on('mousemove.lg', function () {
          mousedown = false;
        });
        this.outer.on('mouseup.lg', function (e) {
          var target = $LG(e.target);
          if (_this.isSlideElement(target) && mousedown) {
            if (!_this.outer.hasClass('lg-dragging')) {
              _this.closeGallery();
            }
          }
        });
      }
    };
    /**
     * Close lightGallery if it is opened.
     *
     * @description If closable is false in the settings, you need to pass true via closeGallery method to force close gallery
     * @return returns the estimated time to close gallery completely including the close animation duration
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  plugin.closeGallery();
     *
     */
    LightGallery.prototype.closeGallery = function (force) {
      var _this = this;
      if (!this.lgOpened || !this.settings.closable && !force) {
        return 0;
      }
      this.LGel.trigger(lGEvents.beforeClose);
      $LG(window).scrollTop(this.prevScrollTop);
      var currentItem = this.items[this.index];
      var transform;
      if (this.zoomFromOrigin && currentItem) {
        var _a = this.mediaContainerPosition,
          top_4 = _a.top,
          bottom = _a.bottom;
        var _b = this.galleryItems[this.index],
          __slideVideoInfo = _b.__slideVideoInfo,
          poster = _b.poster;
        var imageSize = utils.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
        transform = utils.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
      }
      if (this.zoomFromOrigin && transform) {
        this.outer.addClass('lg-closing lg-zoom-from-image');
        this.getSlideItem(this.index).addClass('lg-start-end-progress').css('transition-duration', this.settings.startAnimationDuration + 'ms').css('transform', transform);
      } else {
        this.outer.addClass('lg-hide-items');
        // lg-zoom-from-image is used for setting the opacity to 1 if zoomFromOrigin is true
        // If the closing item doesn't have the lg-size attribute, remove this class to avoid the closing css conflicts
        this.outer.removeClass('lg-zoom-from-image');
      }
      // Unbind all events added by lightGallery
      // @todo
      //this.$el.off('.lg.tm');
      this.destroyModules();
      this.lGalleryOn = false;
      this.isDummyImageRemoved = false;
      this.zoomFromOrigin = this.settings.zoomFromOrigin;
      clearTimeout(this.hideBarTimeout);
      this.hideBarTimeout = false;
      $LG('html').removeClass('lg-on');
      this.outer.removeClass('lg-visible lg-components-open');
      // Resetting opacity to 0 isd required as  vertical swipe to close function adds inline opacity.
      this.$backdrop.removeClass('in').css('opacity', 0);
      var removeTimeout = this.zoomFromOrigin && transform ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
      this.$container.removeClass('lg-show-in');
      // Once the closign animation is completed and gallery is invisible
      setTimeout(function () {
        if (_this.zoomFromOrigin && transform) {
          _this.outer.removeClass('lg-zoom-from-image');
        }
        _this.$container.removeClass('lg-show');
        // Need to remove inline opacity as it is used in the stylesheet as well
        _this.$backdrop.removeAttr('style').css('transition-duration', _this.settings.backdropDuration + 'ms');
        _this.outer.removeClass("lg-closing " + _this.settings.startClass);
        _this.getSlideItem(_this.index).removeClass('lg-start-end-progress');
        _this.$inner.empty();
        if (_this.lgOpened) {
          _this.LGel.trigger(lGEvents.afterClose, {
            instance: _this
          });
        }
        if (_this.outer.get()) {
          _this.outer.get().blur();
        }
        _this.lgOpened = false;
      }, removeTimeout + 100);
      return removeTimeout + 100;
    };
    LightGallery.prototype.initModules = function () {
      this.plugins.forEach(function (module) {
        try {
          module.init();
        } catch (err) {
          console.warn("lightGallery:- make sure lightGallery module is properly initiated");
        }
      });
    };
    LightGallery.prototype.destroyModules = function (destroy) {
      this.plugins.forEach(function (module) {
        try {
          if (destroy) {
            module.destroy();
          } else {
            module.closeGallery && module.closeGallery();
          }
        } catch (err) {
          console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
        }
      });
    };
    /**
     * Refresh lightGallery with new set of children.
     *
     * @description This is useful to update the gallery when the child elements are changed without calling destroy method.
     *
     * If you are using dynamic mode, you can pass the modified array of dynamicEl as the first parameter to refresh the dynamic gallery
     * @see <a href="/demos/dynamic-mode/">Demo</a>
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  // Delete or add children, then call
     *  plugin.refresh();
     *
     */
    LightGallery.prototype.refresh = function (galleryItems) {
      if (!this.settings.dynamic) {
        this.invalidateItems();
      }
      if (galleryItems) {
        this.galleryItems = galleryItems;
      } else {
        this.galleryItems = this.getItems();
      }
      this.updateControls();
      this.openGalleryOnItemClick();
      this.LGel.trigger(lGEvents.updateSlides);
    };
    LightGallery.prototype.updateControls = function () {
      this.addSlideVideoInfo(this.galleryItems);
      this.updateCounterTotal();
      this.manageSingleSlideClassName();
    };
    /**
     * Destroy lightGallery.
     * Destroy lightGallery and its plugin instances completely
     *
     * @description This method also calls CloseGallery function internally. Returns the time takes to completely close and destroy the instance.
     * In case if you want to re-initialize lightGallery right after destroying it, initialize it only once the destroy process is completed.
     * You can use refresh method most of the times.
     * @category lGPublicMethods
     * @example
     *  const plugin = lightGallery();
     *  plugin.destroy();
     *
     */
    LightGallery.prototype.destroy = function () {
      var _this = this;
      var closeTimeout = this.closeGallery(true);
      setTimeout(function () {
        _this.destroyModules(true);
        if (!_this.settings.dynamic) {
          _this.invalidateItems();
        }
        $LG(window).off(".lg.global" + _this.lgId);
        _this.LGel.off('.lg');
        _this.$container.remove();
      }, closeTimeout);
      return closeTimeout;
    };
    return LightGallery;
  }();
  function lightGallery(el, options) {
    return new LightGallery(el, options);
  }
  return lightGallery;
});

/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgThumbnail = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign2 = function __assign() {
    _assign2 = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign2.apply(this, arguments);
  };
  var thumbnailsSettings = {
    thumbnail: true,
    animateThumb: true,
    currentPagerPosition: 'middle',
    alignThumbnails: 'middle',
    thumbWidth: 100,
    thumbHeight: '80px',
    thumbMargin: 5,
    appendThumbnailsTo: '.lg-components',
    toggleThumb: false,
    enableThumbDrag: true,
    enableThumbSwipe: true,
    thumbnailSwipeThreshold: 10,
    loadYouTubeThumbnail: true,
    youTubeThumbSize: 1,
    thumbnailPluginStrings: {
      toggleThumbnails: 'Toggle thumbnails'
    }
  };

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var Thumbnail = /** @class */function () {
    function Thumbnail(instance, $LG) {
      this.thumbOuterWidth = 0;
      this.thumbTotalWidth = 0;
      this.translateX = 0;
      this.thumbClickable = false;
      // get lightGallery core plugin instance
      this.core = instance;
      this.$LG = $LG;
      return this;
    }
    Thumbnail.prototype.init = function () {
      // extend module default settings with lightGallery core settings
      this.settings = _assign2(_assign2({}, thumbnailsSettings), this.core.settings);
      this.thumbOuterWidth = 0;
      this.thumbTotalWidth = this.core.galleryItems.length * (this.settings.thumbWidth + this.settings.thumbMargin);
      // Thumbnail animation value
      this.translateX = 0;
      this.setAnimateThumbStyles();
      if (!this.core.settings.allowMediaOverlap) {
        this.settings.toggleThumb = false;
      }
      if (this.settings.thumbnail) {
        this.build();
        if (this.settings.animateThumb) {
          if (this.settings.enableThumbDrag) {
            this.enableThumbDrag();
          }
          if (this.settings.enableThumbSwipe) {
            this.enableThumbSwipe();
          }
          this.thumbClickable = false;
        } else {
          this.thumbClickable = true;
        }
        this.toggleThumbBar();
        this.thumbKeyPress();
      }
    };
    Thumbnail.prototype.build = function () {
      var _this = this;
      this.setThumbMarkup();
      this.manageActiveClassOnSlideChange();
      this.$lgThumb.first().on('click.lg touchend.lg', function (e) {
        var $target = _this.$LG(e.target);
        if (!$target.hasAttribute('data-lg-item-id')) {
          return;
        }
        setTimeout(function () {
          // In IE9 and bellow touch does not support
          // Go to slide if browser does not support css transitions
          if (_this.thumbClickable && !_this.core.lgBusy) {
            var index = parseInt($target.attr('data-lg-item-id'));
            _this.core.slide(index, false, true, false);
          }
        }, 50);
      });
      this.core.LGel.on(lGEvents.beforeSlide + ".thumb", function (event) {
        var index = event.detail.index;
        _this.animateThumb(index);
      });
      this.core.LGel.on(lGEvents.beforeOpen + ".thumb", function () {
        _this.thumbOuterWidth = _this.core.outer.get().offsetWidth;
      });
      this.core.LGel.on(lGEvents.updateSlides + ".thumb", function () {
        _this.rebuildThumbnails();
      });
      this.core.LGel.on(lGEvents.containerResize + ".thumb", function () {
        if (!_this.core.lgOpened) return;
        setTimeout(function () {
          _this.thumbOuterWidth = _this.core.outer.get().offsetWidth;
          _this.animateThumb(_this.core.index);
          _this.thumbOuterWidth = _this.core.outer.get().offsetWidth;
        }, 50);
      });
    };
    Thumbnail.prototype.setThumbMarkup = function () {
      var thumbOuterClassNames = 'lg-thumb-outer ';
      if (this.settings.alignThumbnails) {
        thumbOuterClassNames += "lg-thumb-align-" + this.settings.alignThumbnails;
      }
      var html = "<div class=\"" + thumbOuterClassNames + "\">\n        <div class=\"lg-thumb lg-group\">\n        </div>\n        </div>";
      this.core.outer.addClass('lg-has-thumb');
      if (this.settings.appendThumbnailsTo === '.lg-components') {
        this.core.$lgComponents.append(html);
      } else {
        this.core.outer.append(html);
      }
      this.$thumbOuter = this.core.outer.find('.lg-thumb-outer').first();
      this.$lgThumb = this.core.outer.find('.lg-thumb').first();
      if (this.settings.animateThumb) {
        this.core.outer.find('.lg-thumb').css('transition-duration', this.core.settings.speed + 'ms').css('width', this.thumbTotalWidth + 'px').css('position', 'relative');
      }
      this.setThumbItemHtml(this.core.galleryItems);
    };
    Thumbnail.prototype.enableThumbDrag = function () {
      var _this = this;
      var thumbDragUtils = {
        cords: {
          startX: 0,
          endX: 0
        },
        isMoved: false,
        newTranslateX: 0,
        startTime: new Date(),
        endTime: new Date(),
        touchMoveTime: 0
      };
      var isDragging = false;
      this.$thumbOuter.addClass('lg-grab');
      this.core.outer.find('.lg-thumb').first().on('mousedown.lg.thumb', function (e) {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
          // execute only on .lg-object
          e.preventDefault();
          thumbDragUtils.cords.startX = e.pageX;
          thumbDragUtils.startTime = new Date();
          _this.thumbClickable = false;
          isDragging = true;
          // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
          _this.core.outer.get().scrollLeft += 1;
          _this.core.outer.get().scrollLeft -= 1;
          // *
          _this.$thumbOuter.removeClass('lg-grab').addClass('lg-grabbing');
        }
      });
      this.$LG(window).on("mousemove.lg.thumb.global" + this.core.lgId, function (e) {
        if (!_this.core.lgOpened) return;
        if (isDragging) {
          thumbDragUtils.cords.endX = e.pageX;
          thumbDragUtils = _this.onThumbTouchMove(thumbDragUtils);
        }
      });
      this.$LG(window).on("mouseup.lg.thumb.global" + this.core.lgId, function () {
        if (!_this.core.lgOpened) return;
        if (thumbDragUtils.isMoved) {
          thumbDragUtils = _this.onThumbTouchEnd(thumbDragUtils);
        } else {
          _this.thumbClickable = true;
        }
        if (isDragging) {
          isDragging = false;
          _this.$thumbOuter.removeClass('lg-grabbing').addClass('lg-grab');
        }
      });
    };
    Thumbnail.prototype.enableThumbSwipe = function () {
      var _this = this;
      var thumbDragUtils = {
        cords: {
          startX: 0,
          endX: 0
        },
        isMoved: false,
        newTranslateX: 0,
        startTime: new Date(),
        endTime: new Date(),
        touchMoveTime: 0
      };
      this.$lgThumb.on('touchstart.lg', function (e) {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
          e.preventDefault();
          thumbDragUtils.cords.startX = e.targetTouches[0].pageX;
          _this.thumbClickable = false;
          thumbDragUtils.startTime = new Date();
        }
      });
      this.$lgThumb.on('touchmove.lg', function (e) {
        if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
          e.preventDefault();
          thumbDragUtils.cords.endX = e.targetTouches[0].pageX;
          thumbDragUtils = _this.onThumbTouchMove(thumbDragUtils);
        }
      });
      this.$lgThumb.on('touchend.lg', function () {
        if (thumbDragUtils.isMoved) {
          thumbDragUtils = _this.onThumbTouchEnd(thumbDragUtils);
        } else {
          _this.thumbClickable = true;
        }
      });
    };
    // Rebuild thumbnails
    Thumbnail.prototype.rebuildThumbnails = function () {
      var _this = this;
      // Remove transitions
      this.$thumbOuter.addClass('lg-rebuilding-thumbnails');
      setTimeout(function () {
        _this.thumbTotalWidth = _this.core.galleryItems.length * (_this.settings.thumbWidth + _this.settings.thumbMargin);
        _this.$lgThumb.css('width', _this.thumbTotalWidth + 'px');
        _this.$lgThumb.empty();
        _this.setThumbItemHtml(_this.core.galleryItems);
        _this.animateThumb(_this.core.index);
      }, 50);
      setTimeout(function () {
        _this.$thumbOuter.removeClass('lg-rebuilding-thumbnails');
      }, 200);
    };
    // @ts-check
    Thumbnail.prototype.setTranslate = function (value) {
      this.$lgThumb.css('transform', 'translate3d(-' + value + 'px, 0px, 0px)');
    };
    Thumbnail.prototype.getPossibleTransformX = function (left) {
      if (left > this.thumbTotalWidth - this.thumbOuterWidth) {
        left = this.thumbTotalWidth - this.thumbOuterWidth;
      }
      if (left < 0) {
        left = 0;
      }
      return left;
    };
    Thumbnail.prototype.animateThumb = function (index) {
      this.$lgThumb.css('transition-duration', this.core.settings.speed + 'ms');
      if (this.settings.animateThumb) {
        var position = 0;
        switch (this.settings.currentPagerPosition) {
          case 'left':
            position = 0;
            break;
          case 'middle':
            position = this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
            break;
          case 'right':
            position = this.thumbOuterWidth - this.settings.thumbWidth;
        }
        this.translateX = (this.settings.thumbWidth + this.settings.thumbMargin) * index - 1 - position;
        if (this.translateX > this.thumbTotalWidth - this.thumbOuterWidth) {
          this.translateX = this.thumbTotalWidth - this.thumbOuterWidth;
        }
        if (this.translateX < 0) {
          this.translateX = 0;
        }
        this.setTranslate(this.translateX);
      }
    };
    Thumbnail.prototype.onThumbTouchMove = function (thumbDragUtils) {
      thumbDragUtils.newTranslateX = this.translateX;
      thumbDragUtils.isMoved = true;
      thumbDragUtils.touchMoveTime = new Date().valueOf();
      thumbDragUtils.newTranslateX -= thumbDragUtils.cords.endX - thumbDragUtils.cords.startX;
      thumbDragUtils.newTranslateX = this.getPossibleTransformX(thumbDragUtils.newTranslateX);
      // move current slide
      this.setTranslate(thumbDragUtils.newTranslateX);
      this.$thumbOuter.addClass('lg-dragging');
      return thumbDragUtils;
    };
    Thumbnail.prototype.onThumbTouchEnd = function (thumbDragUtils) {
      thumbDragUtils.isMoved = false;
      thumbDragUtils.endTime = new Date();
      this.$thumbOuter.removeClass('lg-dragging');
      var touchDuration = thumbDragUtils.endTime.valueOf() - thumbDragUtils.startTime.valueOf();
      var distanceXnew = thumbDragUtils.cords.endX - thumbDragUtils.cords.startX;
      var speedX = Math.abs(distanceXnew) / touchDuration;
      // Some magical numbers
      // Can be improved
      if (speedX > 0.15 && thumbDragUtils.endTime.valueOf() - thumbDragUtils.touchMoveTime < 30) {
        speedX += 1;
        if (speedX > 2) {
          speedX += 1;
        }
        speedX = speedX + speedX * (Math.abs(distanceXnew) / this.thumbOuterWidth);
        this.$lgThumb.css('transition-duration', Math.min(speedX - 1, 2) + 'settings');
        distanceXnew = distanceXnew * speedX;
        this.translateX = this.getPossibleTransformX(this.translateX - distanceXnew);
        this.setTranslate(this.translateX);
      } else {
        this.translateX = thumbDragUtils.newTranslateX;
      }
      if (Math.abs(thumbDragUtils.cords.endX - thumbDragUtils.cords.startX) < this.settings.thumbnailSwipeThreshold) {
        this.thumbClickable = true;
      }
      return thumbDragUtils;
    };
    Thumbnail.prototype.getThumbHtml = function (thumb, index) {
      var slideVideoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
      var thumbImg;
      if (slideVideoInfo.youtube) {
        if (this.settings.loadYouTubeThumbnail) {
          thumbImg = '//img.youtube.com/vi/' + slideVideoInfo.youtube[1] + '/' + this.settings.youTubeThumbSize + '.jpg';
        } else {
          thumbImg = thumb;
        }
      } else {
        thumbImg = thumb;
      }
      return "<div data-lg-item-id=\"" + index + "\" class=\"lg-thumb-item " + (index === this.core.index ? ' active' : '') + "\" \n        style=\"width:" + this.settings.thumbWidth + "px; height: " + this.settings.thumbHeight + ";\n            margin-right: " + this.settings.thumbMargin + "px;\">\n            <img data-lg-item-id=\"" + index + "\" src=\"" + thumbImg + "\" />\n        </div>";
    };
    Thumbnail.prototype.getThumbItemHtml = function (items) {
      var thumbList = '';
      for (var i = 0; i < items.length; i++) {
        thumbList += this.getThumbHtml(items[i].thumb, i);
      }
      return thumbList;
    };
    Thumbnail.prototype.setThumbItemHtml = function (items) {
      var thumbList = this.getThumbItemHtml(items);
      this.$lgThumb.html(thumbList);
    };
    Thumbnail.prototype.setAnimateThumbStyles = function () {
      if (this.settings.animateThumb) {
        this.core.outer.addClass('lg-animate-thumb');
      }
    };
    // Manage thumbnail active calss
    Thumbnail.prototype.manageActiveClassOnSlideChange = function () {
      var _this = this;
      // manage active class for thumbnail
      this.core.LGel.on(lGEvents.beforeSlide + ".thumb", function (event) {
        var $thumb = _this.core.outer.find('.lg-thumb-item');
        var index = event.detail.index;
        $thumb.removeClass('active');
        $thumb.eq(index).addClass('active');
      });
    };
    // Toggle thumbnail bar
    Thumbnail.prototype.toggleThumbBar = function () {
      var _this = this;
      if (this.settings.toggleThumb) {
        this.core.outer.addClass('lg-can-toggle');
        this.core.$toolbar.append('<button type="button" aria-label="' + this.settings.thumbnailPluginStrings['toggleThumbnails'] + '" class="lg-toggle-thumb lg-icon"></button>');
        this.core.outer.find('.lg-toggle-thumb').first().on('click.lg', function () {
          _this.core.outer.toggleClass('lg-components-open');
        });
      }
    };
    Thumbnail.prototype.thumbKeyPress = function () {
      var _this = this;
      this.$LG(window).on("keydown.lg.thumb.global" + this.core.lgId, function (e) {
        if (!_this.core.lgOpened || !_this.settings.toggleThumb) return;
        if (e.keyCode === 38) {
          e.preventDefault();
          _this.core.outer.addClass('lg-components-open');
        } else if (e.keyCode === 40) {
          e.preventDefault();
          _this.core.outer.removeClass('lg-components-open');
        }
      });
    };
    Thumbnail.prototype.destroy = function () {
      if (this.settings.thumbnail) {
        this.$LG(window).off(".lg.thumb.global" + this.core.lgId);
        this.core.LGel.off('.lg.thumb');
        this.core.LGel.off('.thumb');
        this.$thumbOuter.remove();
        this.core.outer.removeClass('lg-has-thumb');
      }
    };
    return Thumbnail;
  }();
  return Thumbnail;
});

/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgZoom = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign3 = function __assign() {
    _assign3 = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign3.apply(this, arguments);
  };
  var zoomSettings = {
    scale: 1,
    zoom: true,
    actualSize: true,
    showZoomInOutIcons: false,
    actualSizeIcons: {
      zoomIn: 'lg-zoom-in',
      zoomOut: 'lg-zoom-out'
    },
    enableZoomAfter: 300,
    zoomPluginStrings: {
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      viewActualSize: 'View actual size'
    }
  };

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var Zoom = /** @class */function () {
    function Zoom(instance, $LG) {
      // get lightGallery core plugin instance
      this.core = instance;
      this.$LG = $LG;
      this.settings = _assign3(_assign3({}, zoomSettings), this.core.settings);
      return this;
    }
    // Append Zoom controls. Actual size, Zoom-in, Zoom-out
    Zoom.prototype.buildTemplates = function () {
      var zoomIcons = this.settings.showZoomInOutIcons ? "<button id=\"" + this.core.getIdName('lg-zoom-in') + "\" type=\"button\" aria-label=\"" + this.settings.zoomPluginStrings['zoomIn'] + "\" class=\"lg-zoom-in lg-icon\"></button><button id=\"" + this.core.getIdName('lg-zoom-out') + "\" type=\"button\" aria-label=\"" + this.settings.zoomPluginStrings['zoomIn'] + "\" class=\"lg-zoom-out lg-icon\"></button>" : '';
      if (this.settings.actualSize) {
        zoomIcons += "<button id=\"" + this.core.getIdName('lg-actual-size') + "\" type=\"button\" aria-label=\"" + this.settings.zoomPluginStrings['viewActualSize'] + "\" class=\"" + this.settings.actualSizeIcons.zoomIn + " lg-icon\"></button>";
      }
      this.core.outer.addClass('lg-use-transition-for-zoom');
      this.core.$toolbar.first().append(zoomIcons);
    };
    /**
     * @desc Enable zoom option only once the image is completely loaded
     * If zoomFromOrigin is true, Zoom is enabled once the dummy image has been inserted
     *
     * Zoom styles are defined under lg-zoomable CSS class.
     */
    Zoom.prototype.enableZoom = function (event) {
      var _this = this;
      // delay will be 0 except first time
      var _speed = this.settings.enableZoomAfter + event.detail.delay;
      // set _speed value 0 if gallery opened from direct url and if it is first slide
      if (this.$LG('body').first().hasClass('lg-from-hash') && event.detail.delay) {
        // will execute only once
        _speed = 0;
      } else {
        // Remove lg-from-hash to enable starting animation.
        this.$LG('body').first().removeClass('lg-from-hash');
      }
      this.zoomableTimeout = setTimeout(function () {
        if (!_this.isImageSlide()) {
          return;
        }
        _this.core.getSlideItem(event.detail.index).addClass('lg-zoomable');
        if (event.detail.index === _this.core.index) {
          _this.setZoomEssentials();
        }
      }, _speed + 30);
    };
    Zoom.prototype.enableZoomOnSlideItemLoad = function () {
      // Add zoomable class
      this.core.LGel.on(lGEvents.slideItemLoad + ".zoom", this.enableZoom.bind(this));
    };
    Zoom.prototype.getModifier = function (rotateValue, axis, el) {
      var originalRotate = rotateValue;
      rotateValue = Math.abs(rotateValue);
      var transformValues = this.getCurrentTransform(el);
      if (!transformValues) {
        return 1;
      }
      var modifier = 1;
      if (axis === 'X') {
        var flipHorizontalValue = Math.sign(parseFloat(transformValues[0]));
        if (rotateValue === 0 || rotateValue === 180) {
          modifier = 1;
        } else if (rotateValue === 90) {
          if (originalRotate === -90 && flipHorizontalValue === 1 || originalRotate === 90 && flipHorizontalValue === -1) {
            modifier = -1;
          } else {
            modifier = 1;
          }
        }
        modifier = modifier * flipHorizontalValue;
      } else {
        var flipVerticalValue = Math.sign(parseFloat(transformValues[3]));
        if (rotateValue === 0 || rotateValue === 180) {
          modifier = 1;
        } else if (rotateValue === 90) {
          var sinX = parseFloat(transformValues[1]);
          var sinMinusX = parseFloat(transformValues[2]);
          modifier = Math.sign(sinX * sinMinusX * originalRotate * flipVerticalValue);
        }
        modifier = modifier * flipVerticalValue;
      }
      return modifier;
    };
    Zoom.prototype.getImageSize = function ($image, rotateValue, axis) {
      var imageSizes = {
        y: 'offsetHeight',
        x: 'offsetWidth'
      };
      if (Math.abs(rotateValue) === 90) {
        // Swap axis
        if (axis === 'x') {
          axis = 'y';
        } else {
          axis = 'x';
        }
      }
      return $image[imageSizes[axis]];
    };
    Zoom.prototype.getDragCords = function (e, rotateValue) {
      if (rotateValue === 90) {
        return {
          x: e.pageY,
          y: e.pageX
        };
      } else {
        return {
          x: e.pageX,
          y: e.pageY
        };
      }
    };
    Zoom.prototype.getSwipeCords = function (e, rotateValue) {
      var x = e.targetTouches[0].pageX;
      var y = e.targetTouches[0].pageY;
      if (rotateValue === 90) {
        return {
          x: y,
          y: x
        };
      } else {
        return {
          x: x,
          y: y
        };
      }
    };
    Zoom.prototype.getDragAllowedAxises = function (rotateValue, scale) {
      scale = scale || this.scale || 1;
      var allowY = this.imageYSize * scale > this.containerRect.height;
      var allowX = this.imageXSize * scale > this.containerRect.width;
      if (rotateValue === 90) {
        return {
          allowX: allowY,
          allowY: allowX
        };
      } else {
        return {
          allowX: allowX,
          allowY: allowY
        };
      }
    };
    /**
     *
     * @param {Element} el
     * @return matrix(cos(X), sin(X), -sin(X), cos(X), 0, 0);
     * Get the current transform value
     */
    Zoom.prototype.getCurrentTransform = function (el) {
      if (!el) {
        return;
      }
      var st = window.getComputedStyle(el, null);
      var tm = st.getPropertyValue('-webkit-transform') || st.getPropertyValue('-moz-transform') || st.getPropertyValue('-ms-transform') || st.getPropertyValue('-o-transform') || st.getPropertyValue('transform') || 'none';
      if (tm !== 'none') {
        return tm.split('(')[1].split(')')[0].split(',');
      }
      return;
    };
    Zoom.prototype.getCurrentRotation = function (el) {
      if (!el) {
        return 0;
      }
      var values = this.getCurrentTransform(el);
      if (values) {
        return Math.round(Math.atan2(parseFloat(values[1]), parseFloat(values[0])) * (180 / Math.PI));
        // If you want rotate in 360
        //return (angle < 0 ? angle + 360 : angle);
      }

      return 0;
    };
    Zoom.prototype.setZoomEssentials = function () {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      var rotateEl = this.core.getSlideItem(this.core.index).find('.lg-img-rotate').first().get();
      this.rotateValue = this.getCurrentRotation(rotateEl);
      this.imageYSize = this.getImageSize($image.get(), this.rotateValue, 'y');
      this.imageXSize = this.getImageSize($image.get(), this.rotateValue, 'x');
      this.containerRect = this.core.outer.get().getBoundingClientRect();
      this.modifierX = this.getModifier(this.rotateValue, 'X', rotateEl);
      this.modifierY = this.getModifier(this.rotateValue, 'Y', rotateEl);
    };
    /**
     * @desc Image zoom
     * Translate the wrap and scale the image to get better user experience
     *
     * @param {String} scale - Zoom decrement/increment value
     */
    Zoom.prototype.zoomImage = function (scale) {
      // Find offset manually to avoid issue after zoom
      var offsetX = (this.containerRect.width - this.imageXSize) / 2 + this.containerRect.left;
      var _a = this.core.mediaContainerPosition,
        top = _a.top,
        bottom = _a.bottom;
      var topBottomSpacing = Math.abs(top - bottom) / 2;
      var offsetY = (this.containerRect.height - this.imageYSize - topBottomSpacing * this.modifierX) / 2 + this.scrollTop + this.containerRect.top;
      var originalX;
      var originalY;
      if (scale === 1) {
        this.positionChanged = false;
      }
      var dragAllowedAxises = this.getDragAllowedAxises(Math.abs(this.rotateValue), scale);
      var allowY = dragAllowedAxises.allowY,
        allowX = dragAllowedAxises.allowX;
      if (this.positionChanged) {
        originalX = this.left / (this.scale - 1);
        originalY = this.top / (this.scale - 1);
        this.pageX = Math.abs(originalX) + offsetX;
        this.pageY = Math.abs(originalY) + offsetY;
        this.positionChanged = false;
      }
      var possibleSwipeCords = this.getPossibleSwipeDragCords(this.rotateValue, scale);
      var _x = offsetX - this.pageX;
      var _y = offsetY - this.pageY;
      var x = (scale - 1) * _x;
      var y = (scale - 1) * _y;
      if (allowX) {
        if (this.isBeyondPossibleLeft(x, possibleSwipeCords.minX)) {
          x = possibleSwipeCords.minX;
        } else if (this.isBeyondPossibleRight(x, possibleSwipeCords.maxX)) {
          x = possibleSwipeCords.maxX;
        }
      } else {
        if (scale > 1) {
          if (x < possibleSwipeCords.minX) {
            x = possibleSwipeCords.minX;
          } else if (x > possibleSwipeCords.maxX) {
            x = possibleSwipeCords.maxX;
          }
        }
      }
      if (allowY) {
        if (this.isBeyondPossibleTop(y, possibleSwipeCords.minY)) {
          y = possibleSwipeCords.minY;
        } else if (this.isBeyondPossibleBottom(y, possibleSwipeCords.maxY)) {
          y = possibleSwipeCords.maxY;
        }
      } else {
        // If the translate value based on index of beyond the viewport, utilize the available space to prevent image being cut out
        if (scale > 1) {
          //If image goes beyond viewport top, use the minim possible translate value
          if (y < possibleSwipeCords.minY) {
            y = possibleSwipeCords.minY;
          } else if (y > possibleSwipeCords.maxY) {
            y = possibleSwipeCords.maxY;
          }
        }
      }
      this.setZoomStyles({
        x: x,
        y: y,
        scale: scale
      });
    };
    /**
     * @desc apply scale3d to image and translate to image wrap
     * @param {style} X,Y and scale
     */
    Zoom.prototype.setZoomStyles = function (style) {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      var $dummyImage = this.core.outer.find('.lg-current .lg-dummy-img').first();
      var $imageWrap = $image.parent();
      this.scale = style.scale;
      $image.css('transform', 'scale3d(' + style.scale + ', ' + style.scale + ', 1)');
      $dummyImage.css('transform', 'scale3d(' + style.scale + ', ' + style.scale + ', 1)');
      var transform = 'translate3d(' + style.x + 'px, ' + style.y + 'px, 0)';
      $imageWrap.css('transform', transform);
      this.left = style.x;
      this.top = style.y;
    };
    /**
     * @param index - Index of the current slide
     * @param event - event will be available only if the function is called on clicking/taping the imags
     */
    Zoom.prototype.setActualSize = function (index, event) {
      var _this = this;
      // Allow zoom only on image
      if (!this.isImageSlide() || this.core.outer.hasClass('lg-first-slide-loading')) {
        return;
      }
      var scale = this.getCurrentImageActualSizeScale();
      if (this.core.outer.hasClass('lg-zoomed')) {
        this.scale = 1;
      } else {
        this.scale = this.getScale(scale);
      }
      this.setPageCords(event);
      this.beginZoom(this.scale);
      this.zoomImage(this.scale);
      setTimeout(function () {
        _this.core.outer.removeClass('lg-grabbing').addClass('lg-grab');
      }, 10);
    };
    Zoom.prototype.getNaturalWidth = function (index) {
      var $image = this.core.getSlideItem(index).find('.lg-image').first();
      var naturalWidth = this.core.galleryItems[index].width;
      return naturalWidth ? parseFloat(naturalWidth) : $image.get().naturalWidth;
    };
    Zoom.prototype.getActualSizeScale = function (naturalWidth, width) {
      var _scale;
      var scale;
      if (naturalWidth > width) {
        _scale = naturalWidth / width;
        scale = _scale || 2;
      } else {
        scale = 1;
      }
      return scale;
    };
    Zoom.prototype.getCurrentImageActualSizeScale = function () {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-image').first();
      var width = $image.get().offsetWidth;
      var naturalWidth = this.getNaturalWidth(this.core.index) || width;
      return this.getActualSizeScale(naturalWidth, width);
    };
    Zoom.prototype.getPageCords = function (event) {
      var cords = {};
      if (event) {
        cords.x = event.pageX || event.targetTouches[0].pageX;
        cords.y = event.pageY || event.targetTouches[0].pageY;
      } else {
        var containerRect = this.core.outer.get().getBoundingClientRect();
        cords.x = containerRect.width / 2 + containerRect.left;
        cords.y = containerRect.height / 2 + this.scrollTop + containerRect.top;
      }
      return cords;
    };
    Zoom.prototype.setPageCords = function (event) {
      var pageCords = this.getPageCords(event);
      this.pageX = pageCords.x;
      this.pageY = pageCords.y;
    };
    // If true, zoomed - in else zoomed out
    Zoom.prototype.beginZoom = function (scale) {
      this.core.outer.removeClass('lg-zoom-drag-transition lg-zoom-dragging');
      if (scale > 1) {
        this.core.outer.addClass('lg-zoomed');
        var $actualSize = this.core.getElementById('lg-actual-size');
        $actualSize.removeClass(this.settings.actualSizeIcons.zoomIn).addClass(this.settings.actualSizeIcons.zoomOut);
      } else {
        this.resetZoom();
      }
      return scale > 1;
    };
    Zoom.prototype.getScale = function (scale) {
      var actualSizeScale = this.getCurrentImageActualSizeScale();
      if (scale < 1) {
        scale = 1;
      } else if (scale > actualSizeScale) {
        scale = actualSizeScale;
      }
      return scale;
    };
    Zoom.prototype.init = function () {
      var _this = this;
      if (!this.settings.zoom) {
        return;
      }
      this.buildTemplates();
      this.enableZoomOnSlideItemLoad();
      var tapped = null;
      this.core.outer.on('dblclick.lg', function (event) {
        if (!_this.$LG(event.target).hasClass('lg-image')) {
          return;
        }
        _this.setActualSize(_this.core.index, event);
      });
      this.core.outer.on('touchstart.lg', function (event) {
        var $target = _this.$LG(event.target);
        if (event.targetTouches.length === 1 && $target.hasClass('lg-image')) {
          if (!tapped) {
            tapped = setTimeout(function () {
              tapped = null;
            }, 300);
          } else {
            clearTimeout(tapped);
            tapped = null;
            event.preventDefault();
            _this.setActualSize(_this.core.index, event);
          }
        }
      });
      // Update zoom on resize and orientationchange
      this.core.LGel.on(lGEvents.containerResize + ".zoom " + lGEvents.rotateRight + ".zoom " + lGEvents.rotateLeft + ".zoom " + lGEvents.flipHorizontal + ".zoom " + lGEvents.flipVertical + ".zoom", function () {
        if (!_this.core.lgOpened || !_this.isImageSlide()) return;
        _this.setPageCords();
        _this.setZoomEssentials();
        _this.zoomImage(_this.scale);
      });
      // Update zoom on resize and orientationchange
      this.$LG(window).on("scroll.lg.zoom.global" + this.core.lgId, function () {
        if (!_this.core.lgOpened) return;
        _this.scrollTop = _this.$LG(window).scrollTop();
      });
      this.core.getElementById('lg-zoom-out').on('click.lg', function () {
        if (_this.core.outer.find('.lg-current .lg-image').get()) {
          _this.scale -= _this.settings.scale;
          _this.scale = _this.getScale(_this.scale);
          _this.beginZoom(_this.scale);
          _this.zoomImage(_this.scale);
        }
      });
      this.core.getElementById('lg-zoom-in').on('click.lg', function () {
        _this.zoomIn();
      });
      this.core.getElementById('lg-actual-size').on('click.lg', function () {
        _this.setActualSize(_this.core.index);
      });
      this.core.LGel.on(lGEvents.beforeOpen + ".zoom", function () {
        _this.core.outer.find('.lg-item').removeClass('lg-zoomable');
      });
      this.core.LGel.on(lGEvents.afterOpen + ".zoom", function () {
        _this.scrollTop = _this.$LG(window).scrollTop();
        // Set the initial value center
        _this.pageX = _this.core.outer.width() / 2;
        _this.pageY = _this.core.outer.height() / 2 + _this.scrollTop;
        _this.scale = 1;
      });
      // Reset zoom on slide change
      this.core.LGel.on(lGEvents.afterSlide + ".zoom", function (event) {
        var prevIndex = event.detail.prevIndex;
        _this.scale = 1;
        _this.positionChanged = false;
        _this.resetZoom(prevIndex);
        if (_this.isImageSlide()) {
          _this.setZoomEssentials();
        }
      });
      // Drag option after zoom
      this.zoomDrag();
      this.pinchZoom();
      this.zoomSwipe();
      // Store the zoomable timeout value just to clear it while closing
      this.zoomableTimeout = false;
      this.positionChanged = false;
    };
    Zoom.prototype.zoomIn = function (scale) {
      // Allow zoom only on image
      if (!this.isImageSlide()) {
        return;
      }
      if (scale) {
        this.scale = scale;
      } else {
        this.scale += this.settings.scale;
      }
      this.scale = this.getScale(this.scale);
      this.beginZoom(this.scale);
      this.zoomImage(this.scale);
    };
    // Reset zoom effect
    Zoom.prototype.resetZoom = function (index) {
      this.core.outer.removeClass('lg-zoomed lg-zoom-drag-transition');
      var $actualSize = this.core.getElementById('lg-actual-size');
      var $item = this.core.getSlideItem(index !== undefined ? index : this.core.index);
      $actualSize.removeClass(this.settings.actualSizeIcons.zoomOut).addClass(this.settings.actualSizeIcons.zoomIn);
      $item.find('.lg-img-wrap').first().removeAttr('style');
      $item.find('.lg-image').first().removeAttr('style');
      this.scale = 1;
      this.left = 0;
      this.top = 0;
      // Reset pagx pagy values to center
      this.setPageCords();
    };
    Zoom.prototype.getTouchDistance = function (e) {
      return Math.sqrt((e.targetTouches[0].pageX - e.targetTouches[1].pageX) * (e.targetTouches[0].pageX - e.targetTouches[1].pageX) + (e.targetTouches[0].pageY - e.targetTouches[1].pageY) * (e.targetTouches[0].pageY - e.targetTouches[1].pageY));
    };
    Zoom.prototype.pinchZoom = function () {
      var _this = this;
      var startDist = 0;
      var pinchStarted = false;
      var initScale = 1;
      var $item = this.core.getSlideItem(this.core.index);
      this.core.$inner.on('touchstart.lg', function (e) {
        $item = _this.core.getSlideItem(_this.core.index);
        if (!_this.isImageSlide()) {
          return;
        }
        if (e.targetTouches.length === 2 && !_this.core.outer.hasClass('lg-first-slide-loading') && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          initScale = _this.scale || 1;
          _this.core.outer.removeClass('lg-zoom-drag-transition lg-zoom-dragging');
          _this.core.touchAction = 'pinch';
          startDist = _this.getTouchDistance(e);
        }
      });
      this.core.$inner.on('touchmove.lg', function (e) {
        if (e.targetTouches.length === 2 && _this.core.touchAction === 'pinch' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          e.preventDefault();
          var endDist = _this.getTouchDistance(e);
          var distance = startDist - endDist;
          if (!pinchStarted && Math.abs(distance) > 5) {
            pinchStarted = true;
          }
          if (pinchStarted) {
            _this.scale = Math.max(1, initScale + -distance * 0.008);
            _this.zoomImage(_this.scale);
          }
        }
      });
      this.core.$inner.on('touchend.lg', function (e) {
        if (_this.core.touchAction === 'pinch' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          pinchStarted = false;
          startDist = 0;
          if (_this.scale <= 1) {
            _this.resetZoom();
          } else {
            _this.scale = _this.getScale(_this.scale);
            _this.zoomImage(_this.scale);
            _this.core.outer.addClass('lg-zoomed');
          }
          _this.core.touchAction = undefined;
        }
      });
    };
    Zoom.prototype.touchendZoom = function (startCoords, endCoords, allowX, allowY, touchDuration, rotateValue) {
      var distanceXnew = endCoords.x - startCoords.x;
      var distanceYnew = endCoords.y - startCoords.y;
      var speedX = Math.abs(distanceXnew) / touchDuration + 1;
      var speedY = Math.abs(distanceYnew) / touchDuration + 1;
      if (speedX > 2) {
        speedX += 1;
      }
      if (speedY > 2) {
        speedY += 1;
      }
      distanceXnew = distanceXnew * speedX;
      distanceYnew = distanceYnew * speedY;
      var _LGel = this.core.getSlideItem(this.core.index).find('.lg-img-wrap').first();
      var distance = {};
      distance.x = this.left + distanceXnew * this.modifierX;
      distance.y = this.top + distanceYnew * this.modifierY;
      var possibleSwipeCords = this.getPossibleSwipeDragCords(rotateValue);
      if (Math.abs(distanceXnew) > 15 || Math.abs(distanceYnew) > 15) {
        if (allowY) {
          if (this.isBeyondPossibleTop(distance.y, possibleSwipeCords.minY)) {
            distance.y = possibleSwipeCords.minY;
          } else if (this.isBeyondPossibleBottom(distance.y, possibleSwipeCords.maxY)) {
            distance.y = possibleSwipeCords.maxY;
          }
        }
        if (allowX) {
          if (this.isBeyondPossibleLeft(distance.x, possibleSwipeCords.minX)) {
            distance.x = possibleSwipeCords.minX;
          } else if (this.isBeyondPossibleRight(distance.x, possibleSwipeCords.maxX)) {
            distance.x = possibleSwipeCords.maxX;
          }
        }
        if (allowY) {
          this.top = distance.y;
        } else {
          distance.y = this.top;
        }
        if (allowX) {
          this.left = distance.x;
        } else {
          distance.x = this.left;
        }
        this.setZoomSwipeStyles(_LGel, distance);
        this.positionChanged = true;
      }
    };
    Zoom.prototype.getZoomSwipeCords = function (startCoords, endCoords, allowX, allowY, possibleSwipeCords) {
      var distance = {};
      if (allowY) {
        distance.y = this.top + (endCoords.y - startCoords.y) * this.modifierY;
        if (this.isBeyondPossibleTop(distance.y, possibleSwipeCords.minY)) {
          var diffMinY = possibleSwipeCords.minY - distance.y;
          distance.y = possibleSwipeCords.minY - diffMinY / 6;
        } else if (this.isBeyondPossibleBottom(distance.y, possibleSwipeCords.maxY)) {
          var diffMaxY = distance.y - possibleSwipeCords.maxY;
          distance.y = possibleSwipeCords.maxY + diffMaxY / 6;
        }
      } else {
        distance.y = this.top;
      }
      if (allowX) {
        distance.x = this.left + (endCoords.x - startCoords.x) * this.modifierX;
        if (this.isBeyondPossibleLeft(distance.x, possibleSwipeCords.minX)) {
          var diffMinX = possibleSwipeCords.minX - distance.x;
          distance.x = possibleSwipeCords.minX - diffMinX / 6;
        } else if (this.isBeyondPossibleRight(distance.x, possibleSwipeCords.maxX)) {
          var difMaxX = distance.x - possibleSwipeCords.maxX;
          distance.x = possibleSwipeCords.maxX + difMaxX / 6;
        }
      } else {
        distance.x = this.left;
      }
      return distance;
    };
    Zoom.prototype.isBeyondPossibleLeft = function (x, minX) {
      return x >= minX;
    };
    Zoom.prototype.isBeyondPossibleRight = function (x, maxX) {
      return x <= maxX;
    };
    Zoom.prototype.isBeyondPossibleTop = function (y, minY) {
      return y >= minY;
    };
    Zoom.prototype.isBeyondPossibleBottom = function (y, maxY) {
      return y <= maxY;
    };
    Zoom.prototype.isImageSlide = function () {
      var currentItem = this.core.galleryItems[this.core.index];
      return this.core.getSlideType(currentItem) === 'image';
    };
    Zoom.prototype.getPossibleSwipeDragCords = function (rotateValue, scale) {
      var dataScale = scale || this.scale || 1;
      var elDataScale = Math.abs(dataScale);
      var _a = this.core.mediaContainerPosition,
        top = _a.top,
        bottom = _a.bottom;
      var topBottomSpacing = Math.abs(top - bottom) / 2;
      var minY = (this.imageYSize - this.containerRect.height) / 2 + topBottomSpacing * this.modifierX;
      var maxY = this.containerRect.height - this.imageYSize * elDataScale + minY;
      var minX = (this.imageXSize - this.containerRect.width) / 2;
      var maxX = this.containerRect.width - this.imageXSize * elDataScale + minX;
      var possibleSwipeCords = {
        minY: minY,
        maxY: maxY,
        minX: minX,
        maxX: maxX
      };
      if (Math.abs(rotateValue) === 90) {
        possibleSwipeCords = {
          minY: minX,
          maxY: maxX,
          minX: minY,
          maxX: maxY
        };
      }
      return possibleSwipeCords;
    };
    Zoom.prototype.setZoomSwipeStyles = function (LGel, distance) {
      LGel.css('transform', 'translate3d(' + distance.x + 'px, ' + distance.y + 'px, 0)');
    };
    Zoom.prototype.zoomSwipe = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isMoved = false;
      // Allow x direction drag
      var allowX = false;
      // Allow Y direction drag
      var allowY = false;
      var startTime = new Date();
      var endTime = new Date();
      var possibleSwipeCords;
      var _LGel;
      var $item = this.core.getSlideItem(this.core.index);
      this.core.$inner.on('touchstart.lg', function (e) {
        // Allow zoom only on image
        if (!_this.isImageSlide()) {
          return;
        }
        $item = _this.core.getSlideItem(_this.core.index);
        if ((_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) && e.targetTouches.length === 1 && _this.core.outer.hasClass('lg-zoomed')) {
          e.preventDefault();
          startTime = new Date();
          _this.core.touchAction = 'zoomSwipe';
          _LGel = _this.core.getSlideItem(_this.core.index).find('.lg-img-wrap').first();
          var dragAllowedAxises = _this.getDragAllowedAxises(Math.abs(_this.rotateValue));
          allowY = dragAllowedAxises.allowY;
          allowX = dragAllowedAxises.allowX;
          if (allowX || allowY) {
            startCoords = _this.getSwipeCords(e, Math.abs(_this.rotateValue));
          }
          possibleSwipeCords = _this.getPossibleSwipeDragCords(_this.rotateValue);
          // reset opacity and transition duration
          _this.core.outer.addClass('lg-zoom-dragging lg-zoom-drag-transition');
        }
      });
      this.core.$inner.on('touchmove.lg', function (e) {
        if (e.targetTouches.length === 1 && _this.core.touchAction === 'zoomSwipe' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          e.preventDefault();
          _this.core.touchAction = 'zoomSwipe';
          endCoords = _this.getSwipeCords(e, Math.abs(_this.rotateValue));
          var distance = _this.getZoomSwipeCords(startCoords, endCoords, allowX, allowY, possibleSwipeCords);
          if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {
            isMoved = true;
            _this.setZoomSwipeStyles(_LGel, distance);
          }
        }
      });
      this.core.$inner.on('touchend.lg', function (e) {
        if (_this.core.touchAction === 'zoomSwipe' && (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target))) {
          _this.core.touchAction = undefined;
          _this.core.outer.removeClass('lg-zoom-dragging');
          if (!isMoved) {
            return;
          }
          isMoved = false;
          endTime = new Date();
          var touchDuration = endTime.valueOf() - startTime.valueOf();
          _this.touchendZoom(startCoords, endCoords, allowX, allowY, touchDuration, _this.rotateValue);
        }
      });
    };
    Zoom.prototype.zoomDrag = function () {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isDragging = false;
      var isMoved = false;
      // Allow x direction drag
      var allowX = false;
      // Allow Y direction drag
      var allowY = false;
      var startTime;
      var endTime;
      var possibleSwipeCords;
      var _LGel;
      this.core.outer.on('mousedown.lg.zoom', function (e) {
        // Allow zoom only on image
        if (!_this.isImageSlide()) {
          return;
        }
        var $item = _this.core.getSlideItem(_this.core.index);
        if (_this.$LG(e.target).hasClass('lg-item') || $item.get().contains(e.target)) {
          startTime = new Date();
          _LGel = _this.core.getSlideItem(_this.core.index).find('.lg-img-wrap').first();
          var dragAllowedAxises = _this.getDragAllowedAxises(Math.abs(_this.rotateValue));
          allowY = dragAllowedAxises.allowY;
          allowX = dragAllowedAxises.allowX;
          if (_this.core.outer.hasClass('lg-zoomed')) {
            if (_this.$LG(e.target).hasClass('lg-object') && (allowX || allowY)) {
              e.preventDefault();
              startCoords = _this.getDragCords(e, Math.abs(_this.rotateValue));
              possibleSwipeCords = _this.getPossibleSwipeDragCords(_this.rotateValue);
              isDragging = true;
              // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
              _this.core.outer.get().scrollLeft += 1;
              _this.core.outer.get().scrollLeft -= 1;
              _this.core.outer.removeClass('lg-grab').addClass('lg-grabbing lg-zoom-drag-transition lg-zoom-dragging');
              // reset opacity and transition duration
            }
          }
        }
      });

      this.$LG(window).on("mousemove.lg.zoom.global" + this.core.lgId, function (e) {
        if (isDragging) {
          isMoved = true;
          endCoords = _this.getDragCords(e, Math.abs(_this.rotateValue));
          var distance = _this.getZoomSwipeCords(startCoords, endCoords, allowX, allowY, possibleSwipeCords);
          _this.setZoomSwipeStyles(_LGel, distance);
        }
      });
      this.$LG(window).on("mouseup.lg.zoom.global" + this.core.lgId, function (e) {
        if (isDragging) {
          endTime = new Date();
          isDragging = false;
          _this.core.outer.removeClass('lg-zoom-dragging');
          // Fix for chrome mouse move on click
          if (isMoved && (startCoords.x !== endCoords.x || startCoords.y !== endCoords.y)) {
            endCoords = _this.getDragCords(e, Math.abs(_this.rotateValue));
            var touchDuration = endTime.valueOf() - startTime.valueOf();
            _this.touchendZoom(startCoords, endCoords, allowX, allowY, touchDuration, _this.rotateValue);
          }
          isMoved = false;
        }
        _this.core.outer.removeClass('lg-grabbing').addClass('lg-grab');
      });
    };
    Zoom.prototype.closeGallery = function () {
      this.resetZoom();
    };
    Zoom.prototype.destroy = function () {
      // Unbind all events added by lightGallery zoom plugin
      this.$LG(window).off(".lg.zoom.global" + this.core.lgId);
      this.core.LGel.off('.lg.zoom');
      this.core.LGel.off('.zoom');
      clearTimeout(this.zoomableTimeout);
      this.zoomableTimeout = false;
    };
    return Zoom;
  }();
  return Zoom;
});

/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgVideo = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign4 = function __assign() {
    _assign4 = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign4.apply(this, arguments);
  };
  var videoSettings = {
    autoplayFirstVideo: true,
    youTubePlayerParams: false,
    vimeoPlayerParams: false,
    wistiaPlayerParams: false,
    gotoNextSlideOnVideoEnd: true,
    autoplayVideoOnSlide: false,
    videojs: false,
    videojsOptions: {}
  };

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var param = function param(obj) {
    return Object.keys(obj).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
  };
  var getVimeoURLParams = function getVimeoURLParams(defaultParams, videoInfo) {
    if (!videoInfo || !videoInfo.vimeo) return '';
    var urlParams = videoInfo.vimeo[2] || '';
    urlParams = urlParams[0] == '?' ? '&' + urlParams.slice(1) : urlParams || '';
    var defaultPlayerParams = defaultParams ? '&' + param(defaultParams) : '';
    // For vimeo last parms gets priority if duplicates found
    var vimeoPlayerParams = "?autoplay=0&muted=1" + defaultPlayerParams + urlParams;
    return vimeoPlayerParams;
  };

  /**
   * Video module for lightGallery
   * Supports HTML5, YouTube, Vimeo, wistia videos
   *
   *
   * @ref Wistia
   * https://wistia.com/support/integrations/wordpress(How to get url)
   * https://wistia.com/support/developers/embed-options#using-embed-options
   * https://wistia.com/support/developers/player-api
   * https://wistia.com/support/developers/construct-an-embed-code
   * http://jsfiddle.net/xvnm7xLm/
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
   * https://wistia.com/support/embed-and-share/sharing-videos
   * https://private-sharing.wistia.com/medias/mwhrulrucj
   *
   * @ref Youtube
   * https://developers.google.com/youtube/player_parameters#enablejsapi
   * https://developers.google.com/youtube/iframe_api_reference
   * https://developer.chrome.com/blog/autoplay/#iframe-delegation
   *
   * @ref Vimeo
   * https://stackoverflow.com/questions/10488943/easy-way-to-get-vimeo-id-from-a-vimeo-url
   * https://vimeo.zendesk.com/hc/en-us/articles/360000121668-Starting-playback-at-a-specific-timecode
   * https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters
   */
  var Video = /** @class */function () {
    function Video(instance) {
      // get lightGallery core plugin instance
      this.core = instance;
      this.settings = _assign4(_assign4({}, videoSettings), this.core.settings);
      return this;
    }
    Video.prototype.init = function () {
      var _this = this;
      /**
       * Event triggered when video url found without poster
       * Append video HTML
       * Play if autoplayFirstVideo is true
       */
      this.core.LGel.on(lGEvents.hasVideo + ".video", this.onHasVideo.bind(this));
      this.core.LGel.on(lGEvents.posterClick + ".video", function () {
        var $el = _this.core.getSlideItem(_this.core.index);
        _this.loadVideoOnPosterClick($el);
      });
      this.core.LGel.on(lGEvents.slideItemLoad + ".video", this.onSlideItemLoad.bind(this));
      // @desc fired immediately before each slide transition.
      this.core.LGel.on(lGEvents.beforeSlide + ".video", this.onBeforeSlide.bind(this));
      // @desc fired immediately after each slide transition.
      this.core.LGel.on(lGEvents.afterSlide + ".video", this.onAfterSlide.bind(this));
    };
    /**
     * @desc Event triggered when a slide is completely loaded
     *
     * @param {Event} event - lightGalley custom event
     */
    Video.prototype.onSlideItemLoad = function (event) {
      var _this = this;
      var _a = event.detail,
        isFirstSlide = _a.isFirstSlide,
        index = _a.index;
      // Should check the active slide as well as user may have moved to different slide before the first slide is loaded
      if (this.settings.autoplayFirstVideo && isFirstSlide && index === this.core.index) {
        // Delay is just for the transition effect on video load
        setTimeout(function () {
          _this.loadAndPlayVideo(index);
        }, 200);
      }
      // Should not call on first slide. should check only if the slide is active
      if (!isFirstSlide && this.settings.autoplayVideoOnSlide && index === this.core.index) {
        this.loadAndPlayVideo(index);
      }
    };
    /**
     * @desc Event triggered when video url or poster found
     * Append video HTML is poster is not given
     * Play if autoplayFirstVideo is true
     *
     * @param {Event} event - Javascript Event object.
     */
    Video.prototype.onHasVideo = function (event) {
      var _a = event.detail,
        index = _a.index,
        src = _a.src,
        html5Video = _a.html5Video,
        hasPoster = _a.hasPoster;
      if (!hasPoster) {
        // All functions are called separately if poster exist in loadVideoOnPosterClick function
        this.appendVideos(this.core.getSlideItem(index), {
          src: src,
          addClass: 'lg-object',
          index: index,
          html5Video: html5Video
        });
        // Automatically navigate to next slide once video reaches the end.
        this.gotoNextSlideOnVideoEnd(src, index);
      }
    };
    /**
     * @desc fired immediately before each slide transition.
     * Pause the previous video
     * Hide the download button if the slide contains YouTube, Vimeo, or Wistia videos.
     *
     * @param {Event} event - Javascript Event object.
     * @param {number} prevIndex - Previous index of the slide.
     * @param {number} index - Current index of the slide
     */
    Video.prototype.onBeforeSlide = function (event) {
      if (this.core.lGalleryOn) {
        var prevIndex = event.detail.prevIndex;
        this.pauseVideo(prevIndex);
      }
    };
    /**
     * @desc fired immediately after each slide transition.
     * Play video if autoplayVideoOnSlide option is enabled.
     *
     * @param {Event} event - Javascript Event object.
     * @param {number} prevIndex - Previous index of the slide.
     * @param {number} index - Current index of the slide
     * @todo should check on onSlideLoad as well if video is not loaded on after slide
     */
    Video.prototype.onAfterSlide = function (event) {
      var _this = this;
      var _a = event.detail,
        index = _a.index,
        prevIndex = _a.prevIndex;
      // Do not call on first slide
      var $slide = this.core.getSlideItem(index);
      if (this.settings.autoplayVideoOnSlide && index !== prevIndex) {
        if ($slide.hasClass('lg-complete')) {
          setTimeout(function () {
            _this.loadAndPlayVideo(index);
          }, 100);
        }
      }
    };
    Video.prototype.loadAndPlayVideo = function (index) {
      var $slide = this.core.getSlideItem(index);
      var currentGalleryItem = this.core.galleryItems[index];
      if (currentGalleryItem.poster) {
        this.loadVideoOnPosterClick($slide, true);
      } else {
        this.playVideo(index);
      }
    };
    /**
     * Play HTML5, Youtube, Vimeo or Wistia videos in a particular slide.
     * @param {number} index - Index of the slide
     */
    Video.prototype.playVideo = function (index) {
      this.controlVideo(index, 'play');
    };
    /**
     * Pause HTML5, Youtube, Vimeo or Wistia videos in a particular slide.
     * @param {number} index - Index of the slide
     */
    Video.prototype.pauseVideo = function (index) {
      this.controlVideo(index, 'pause');
    };
    Video.prototype.getVideoHtml = function (src, addClass, index, html5Video) {
      var video = '';
      var videoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
      var currentGalleryItem = this.core.galleryItems[index];
      var videoTitle = currentGalleryItem.title || currentGalleryItem.alt;
      videoTitle = videoTitle ? 'title="' + videoTitle + '"' : '';
      var commonIframeProps = "allowtransparency=\"true\"\n            frameborder=\"0\"\n            scrolling=\"no\"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen";
      if (videoInfo.youtube) {
        var videoId = 'lg-youtube' + index;
        var slideUrlParams = videoInfo.youtube[2] ? videoInfo.youtube[2] + '&' : '';
        // For youtube first parms gets priority if duplicates found
        var youTubePlayerParams = "?" + slideUrlParams + "wmode=opaque&autoplay=0&mute=1&enablejsapi=1";
        var playerParams = youTubePlayerParams + (this.settings.youTubePlayerParams ? '&' + param(this.settings.youTubePlayerParams) : '');
        video = "<iframe allow=\"autoplay\" id=" + videoId + " class=\"lg-video-object lg-youtube " + addClass + "\" " + videoTitle + " src=\"//www.youtube.com/embed/" + (videoInfo.youtube[1] + playerParams) + "\" " + commonIframeProps + "></iframe>";
      } else if (videoInfo.vimeo) {
        var videoId = 'lg-vimeo' + index;
        var playerParams = getVimeoURLParams(this.settings.vimeoPlayerParams, videoInfo);
        video = "<iframe allow=\"autoplay\" id=" + videoId + " class=\"lg-video-object lg-vimeo " + addClass + "\" " + videoTitle + " src=\"//player.vimeo.com/video/" + (videoInfo.vimeo[1] + playerParams) + "\" " + commonIframeProps + "></iframe>";
      } else if (videoInfo.wistia) {
        var wistiaId = 'lg-wistia' + index;
        var playerParams = param(this.settings.wistiaPlayerParams);
        playerParams = playerParams ? '?' + playerParams : '';
        video = "<iframe allow=\"autoplay\" id=\"" + wistiaId + "\" src=\"//fast.wistia.net/embed/iframe/" + (videoInfo.wistia[4] + playerParams) + "\" " + videoTitle + " class=\"wistia_embed lg-video-object lg-wistia " + addClass + "\" name=\"wistia_embed\" " + commonIframeProps + "></iframe>";
      } else if (videoInfo.html5) {
        var html5VideoMarkup = '';
        for (var i = 0; i < html5Video.source.length; i++) {
          html5VideoMarkup += "<source src=\"" + html5Video.source[i].src + "\" type=\"" + html5Video.source[i].type + "\">";
        }
        if (html5Video.tracks) {
          var _loop_1 = function _loop_1(i) {
            var trackAttributes = '';
            var track = html5Video.tracks[i];
            Object.keys(track || {}).forEach(function (key) {
              trackAttributes += key + "=\"" + track[key] + "\" ";
            });
            html5VideoMarkup += "<track " + trackAttributes + ">";
          };
          for (var i = 0; i < html5Video.tracks.length; i++) {
            _loop_1(i);
          }
        }
        var html5VideoAttrs_1 = '';
        var videoAttributes_1 = html5Video.attributes || {};
        Object.keys(videoAttributes_1 || {}).forEach(function (key) {
          html5VideoAttrs_1 += key + "=\"" + videoAttributes_1[key] + "\" ";
        });
        video = "<video class=\"lg-video-object lg-html5 " + (this.settings.videojs ? 'video-js' : '') + "\" " + html5VideoAttrs_1 + ">\n                " + html5VideoMarkup + "\n                Your browser does not support HTML5 video.\n            </video>";
      }
      return video;
    };
    /**
     * @desc - Append videos to the slide
     *
     * @param {HTMLElement} el - slide element
     * @param {Object} videoParams - Video parameters, Contains src, class, index, htmlVideo
     */
    Video.prototype.appendVideos = function (el, videoParams) {
      var _a;
      var videoHtml = this.getVideoHtml(videoParams.src, videoParams.addClass, videoParams.index, videoParams.html5Video);
      el.find('.lg-video-cont').append(videoHtml);
      var $videoElement = el.find('.lg-video-object').first();
      if (videoParams.html5Video) {
        $videoElement.on('mousedown.lg.video', function (e) {
          e.stopPropagation();
        });
      }
      if (this.settings.videojs && ((_a = this.core.galleryItems[videoParams.index].__slideVideoInfo) === null || _a === void 0 ? void 0 : _a.html5)) {
        try {
          return videojs($videoElement.get(), this.settings.videojsOptions);
        } catch (e) {
          console.error('lightGallery:- Make sure you have included videojs');
        }
      }
    };
    Video.prototype.gotoNextSlideOnVideoEnd = function (src, index) {
      var _this = this;
      var $videoElement = this.core.getSlideItem(index).find('.lg-video-object').first();
      var videoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
      if (this.settings.gotoNextSlideOnVideoEnd) {
        if (videoInfo.html5) {
          $videoElement.on('ended', function () {
            _this.core.goToNextSlide();
          });
        } else if (videoInfo.vimeo) {
          try {
            // https://github.com/vimeo/player.js/#ended
            new Vimeo.Player($videoElement.get()).on('ended', function () {
              _this.core.goToNextSlide();
            });
          } catch (e) {
            console.error('lightGallery:- Make sure you have included //github.com/vimeo/player.js');
          }
        } else if (videoInfo.wistia) {
          try {
            window._wq = window._wq || [];
            // @todo Event is gettign triggered multiple times
            window._wq.push({
              id: $videoElement.attr('id'),
              onReady: function onReady(video) {
                video.bind('end', function () {
                  _this.core.goToNextSlide();
                });
              }
            });
          } catch (e) {
            console.error('lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js');
          }
        }
      }
    };
    Video.prototype.controlVideo = function (index, action) {
      var $videoElement = this.core.getSlideItem(index).find('.lg-video-object').first();
      var videoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
      if (!$videoElement.get()) return;
      if (videoInfo.youtube) {
        try {
          $videoElement.get().contentWindow.postMessage("{\"event\":\"command\",\"func\":\"" + action + "Video\",\"args\":\"\"}", '*');
        } catch (e) {
          console.error("lightGallery:- " + e);
        }
      } else if (videoInfo.vimeo) {
        try {
          new Vimeo.Player($videoElement.get())[action]();
        } catch (e) {
          console.error('lightGallery:- Make sure you have included //github.com/vimeo/player.js');
        }
      } else if (videoInfo.html5) {
        if (this.settings.videojs) {
          try {
            videojs($videoElement.get())[action]();
          } catch (e) {
            console.error('lightGallery:- Make sure you have included videojs');
          }
        } else {
          $videoElement.get()[action]();
        }
      } else if (videoInfo.wistia) {
        try {
          window._wq = window._wq || [];
          // @todo Find a way to destroy wistia player instance
          window._wq.push({
            id: $videoElement.attr('id'),
            onReady: function onReady(video) {
              video[action]();
            }
          });
        } catch (e) {
          console.error('lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js');
        }
      }
    };
    Video.prototype.loadVideoOnPosterClick = function ($el, forcePlay) {
      var _this = this;
      // check slide has poster
      if (!$el.hasClass('lg-video-loaded')) {
        // check already video element present
        if (!$el.hasClass('lg-has-video')) {
          $el.addClass('lg-has-video');
          var _html = void 0;
          var _src = this.core.galleryItems[this.core.index].src;
          var video = this.core.galleryItems[this.core.index].video;
          if (video) {
            _html = typeof video === 'string' ? JSON.parse(video) : video;
          }
          var videoJsPlayer_1 = this.appendVideos($el, {
            src: _src,
            addClass: '',
            index: this.core.index,
            html5Video: _html
          });
          this.gotoNextSlideOnVideoEnd(_src, this.core.index);
          var $tempImg = $el.find('.lg-object').first().get();
          // @todo make sure it is working
          $el.find('.lg-video-cont').first().append($tempImg);
          $el.addClass('lg-video-loading');
          videoJsPlayer_1 && videoJsPlayer_1.ready(function () {
            videoJsPlayer_1.on('loadedmetadata', function () {
              _this.onVideoLoadAfterPosterClick($el, _this.core.index);
            });
          });
          $el.find('.lg-video-object').first().on('load.lg error.lg loadedmetadata.lg', function () {
            setTimeout(function () {
              _this.onVideoLoadAfterPosterClick($el, _this.core.index);
            }, 50);
          });
        } else {
          this.playVideo(this.core.index);
        }
      } else if (forcePlay) {
        this.playVideo(this.core.index);
      }
    };
    Video.prototype.onVideoLoadAfterPosterClick = function ($el, index) {
      $el.addClass('lg-video-loaded');
      this.playVideo(index);
    };
    Video.prototype.destroy = function () {
      this.core.LGel.off('.lg.video');
      this.core.LGel.off('.video');
    };
    return Video;
  }();
  return Video;
});

/*!
 * lightgallery | 2.4.0-beta.0 | December 12th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgRotate = factory());
})(void 0, function () {
  'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var _assign5 = function __assign() {
    _assign5 = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return _assign5.apply(this, arguments);
  };

  /**
   * List of lightGallery events
   * All events should be documented here
   * Below interfaces are used to build the website documentations
   * */
  var lGEvents = {
    afterAppendSlide: 'lgAfterAppendSlide',
    init: 'lgInit',
    hasVideo: 'lgHasVideo',
    containerResize: 'lgContainerResize',
    updateSlides: 'lgUpdateSlides',
    afterAppendSubHtml: 'lgAfterAppendSubHtml',
    beforeOpen: 'lgBeforeOpen',
    afterOpen: 'lgAfterOpen',
    slideItemLoad: 'lgSlideItemLoad',
    beforeSlide: 'lgBeforeSlide',
    afterSlide: 'lgAfterSlide',
    posterClick: 'lgPosterClick',
    dragStart: 'lgDragStart',
    dragMove: 'lgDragMove',
    dragEnd: 'lgDragEnd',
    beforeNextSlide: 'lgBeforeNextSlide',
    beforePrevSlide: 'lgBeforePrevSlide',
    beforeClose: 'lgBeforeClose',
    afterClose: 'lgAfterClose',
    rotateLeft: 'lgRotateLeft',
    rotateRight: 'lgRotateRight',
    flipHorizontal: 'lgFlipHorizontal',
    flipVertical: 'lgFlipVertical',
    autoplay: 'lgAutoplay',
    autoplayStart: 'lgAutoplayStart',
    autoplayStop: 'lgAutoplayStop'
  };
  var rotateSettings = {
    rotate: true,
    rotateSpeed: 400,
    rotateLeft: true,
    rotateRight: true,
    flipHorizontal: true,
    flipVertical: true,
    rotatePluginStrings: {
      flipVertical: 'Flip vertical',
      flipHorizontal: 'Flip horizontal',
      rotateLeft: 'Rotate left',
      rotateRight: 'Rotate right'
    }
  };
  var Rotate = /** @class */function () {
    function Rotate(instance, $LG) {
      // get lightGallery core plugin instance
      this.core = instance;
      this.$LG = $LG;
      // extend module default settings with lightGallery core settings
      this.settings = _assign5(_assign5({}, rotateSettings), this.core.settings);
      return this;
    }
    Rotate.prototype.buildTemplates = function () {
      var rotateIcons = '';
      if (this.settings.flipVertical) {
        rotateIcons += "<button type=\"button\" id=\"lg-flip-ver\" aria-label=\"" + this.settings.rotatePluginStrings['flipVertical'] + "\" class=\"lg-flip-ver lg-icon\"></button>";
      }
      if (this.settings.flipHorizontal) {
        rotateIcons += "<button type=\"button\" id=\"lg-flip-hor\" aria-label=\"" + this.settings.rotatePluginStrings['flipHorizontal'] + "\" class=\"lg-flip-hor lg-icon\"></button>";
      }
      if (this.settings.rotateLeft) {
        rotateIcons += "<button type=\"button\" id=\"lg-rotate-left\" aria-label=\"" + this.settings.rotatePluginStrings['rotateLeft'] + "\" class=\"lg-rotate-left lg-icon\"></button>";
      }
      if (this.settings.rotateRight) {
        rotateIcons += "<button type=\"button\" id=\"lg-rotate-right\" aria-label=\"" + this.settings.rotatePluginStrings['rotateRight'] + "\" class=\"lg-rotate-right lg-icon\"></button>";
      }
      this.core.$toolbar.append(rotateIcons);
    };
    Rotate.prototype.init = function () {
      var _this = this;
      if (!this.settings.rotate) {
        return;
      }
      this.buildTemplates();
      // Save rotate config for each item to persist its rotate, flip values
      // even after navigating to diferent slides
      this.rotateValuesList = {};
      // event triggered after appending slide content
      this.core.LGel.on(lGEvents.afterAppendSlide + ".rotate", function (event) {
        var index = event.detail.index;
        var imageWrap = _this.core.getSlideItem(index).find('.lg-img-wrap').first();
        imageWrap.wrap('lg-img-rotate');
        _this.core.getSlideItem(_this.core.index).find('.lg-img-rotate').css('transition-duration', _this.settings.rotateSpeed + 'ms');
      });
      this.core.outer.find('#lg-rotate-left').first().on('click.lg', this.rotateLeft.bind(this));
      this.core.outer.find('#lg-rotate-right').first().on('click.lg', this.rotateRight.bind(this));
      this.core.outer.find('#lg-flip-hor').first().on('click.lg', this.flipHorizontal.bind(this));
      this.core.outer.find('#lg-flip-ver').first().on('click.lg', this.flipVertical.bind(this));
      // Reset rotate on slide change
      this.core.LGel.on(lGEvents.beforeSlide + ".rotate", function (event) {
        if (!_this.rotateValuesList[event.detail.index]) {
          _this.rotateValuesList[event.detail.index] = {
            rotate: 0,
            flipHorizontal: 1,
            flipVertical: 1
          };
        }
      });
    };
    Rotate.prototype.applyStyles = function () {
      var $image = this.core.getSlideItem(this.core.index).find('.lg-img-rotate').first();
      $image.css('transform', 'rotate(' + this.rotateValuesList[this.core.index].rotate + 'deg)' + ' scale3d(' + this.rotateValuesList[this.core.index].flipHorizontal + ', ' + this.rotateValuesList[this.core.index].flipVertical + ', 1)');
    };
    Rotate.prototype.rotateLeft = function () {
      this.rotateValuesList[this.core.index].rotate -= 90;
      this.applyStyles();
      this.triggerEvents(lGEvents.rotateLeft, {
        rotate: this.rotateValuesList[this.core.index].rotate
      });
    };
    Rotate.prototype.rotateRight = function () {
      this.rotateValuesList[this.core.index].rotate += 90;
      this.applyStyles();
      this.triggerEvents(lGEvents.rotateRight, {
        rotate: this.rotateValuesList[this.core.index].rotate
      });
    };
    Rotate.prototype.getCurrentRotation = function (el) {
      if (!el) {
        return 0;
      }
      var st = this.$LG(el).style();
      var tm = st.getPropertyValue('-webkit-transform') || st.getPropertyValue('-moz-transform') || st.getPropertyValue('-ms-transform') || st.getPropertyValue('-o-transform') || st.getPropertyValue('transform') || 'none';
      if (tm !== 'none') {
        var values = tm.split('(')[1].split(')')[0].split(',');
        if (values) {
          var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
          return angle < 0 ? angle + 360 : angle;
        }
      }
      return 0;
    };
    Rotate.prototype.flipHorizontal = function () {
      var rotateEl = this.core.getSlideItem(this.core.index).find('.lg-img-rotate').first().get();
      var currentRotation = this.getCurrentRotation(rotateEl);
      var rotateAxis = 'flipHorizontal';
      if (currentRotation === 90 || currentRotation === 270) {
        rotateAxis = 'flipVertical';
      }
      this.rotateValuesList[this.core.index][rotateAxis] *= -1;
      this.applyStyles();
      this.triggerEvents(lGEvents.flipHorizontal, {
        flipHorizontal: this.rotateValuesList[this.core.index][rotateAxis]
      });
    };
    Rotate.prototype.flipVertical = function () {
      var rotateEl = this.core.getSlideItem(this.core.index).find('.lg-img-rotate').first().get();
      var currentRotation = this.getCurrentRotation(rotateEl);
      var rotateAxis = 'flipVertical';
      if (currentRotation === 90 || currentRotation === 270) {
        rotateAxis = 'flipHorizontal';
      }
      this.rotateValuesList[this.core.index][rotateAxis] *= -1;
      this.applyStyles();
      this.triggerEvents(lGEvents.flipVertical, {
        flipVertical: this.rotateValuesList[this.core.index][rotateAxis]
      });
    };
    Rotate.prototype.triggerEvents = function (event, detail) {
      var _this = this;
      setTimeout(function () {
        _this.core.LGel.trigger(event, detail);
      }, this.settings.rotateSpeed + 10);
    };
    Rotate.prototype.isImageOrientationChanged = function () {
      var rotateValue = this.rotateValuesList[this.core.index];
      var isRotated = Math.abs(rotateValue.rotate) % 360 !== 0;
      var ifFlippedHor = rotateValue.flipHorizontal < 0;
      var ifFlippedVer = rotateValue.flipVertical < 0;
      return isRotated || ifFlippedHor || ifFlippedVer;
    };
    Rotate.prototype.closeGallery = function () {
      if (this.isImageOrientationChanged()) {
        this.core.getSlideItem(this.core.index).css('opacity', 0);
      }
      this.rotateValuesList = {};
    };
    Rotate.prototype.destroy = function () {
      // Unbind all events added by lightGallery rotate plugin
      this.core.LGel.off('.lg.rotate');
      this.core.LGel.off('.rotate');
    };
    return Rotate;
  }();
  return Rotate;
});
document.addEventListener("DOMContentLoaded", function () {
  var flktyMain = new Flickity('.carousel-main', {
    wrapAround: true,
    cellAlign: 'center',
    contain: true,
    pageDots: false,
    lazyLoad: true
    // imagesLoaded: true
  });

  var flktyNav = new Flickity('.carousel-nav', {
    asNavFor: '.carousel-main',
    contain: true,
    pageDots: false,
    prevNextButtons: false,
    lazyLoad: true
    // imagesLoaded: true
  });

  if (document.getElementById('lightgallery')) {
    console.log("Fired");
    lightGallery(document.getElementById('lightgallery'), {
      plugins: [lgZoom,
      //lgThumbnail,
      lgVideo, lgRotate
      //lgShare
      ],

      speed: 500,
      //licenseKey: 'your_license_key',
      thumbnail: true,
      animateThumb: false,
      showThumbByDefault: false,
      download: false,
      selector: '.carousel-cell'
    });
  }
  if (document.getElementById('video-gallery')) {
    lightGallery(document.getElementById('video-gallery'), {
      plugins: [lgVideo]
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpZ2h0Z2FsbGVyeS51bWQuanMiLCJsZy10aHVtYm5haWwudW1kLmpzIiwibGctem9vbS51bWQuanMiLCJsZy12aWRlby51bWQuanMiLCJsZy1yb3RhdGUudW1kLmpzIiwic2luZ2xlLXlhY2h0LmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsImZhY3RvcnkiLCJleHBvcnRzIiwiX3R5cGVvZiIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImdsb2JhbFRoaXMiLCJzZWxmIiwibGlnaHRHYWxsZXJ5IiwiX19hc3NpZ24iLCJPYmplY3QiLCJhc3NpZ24iLCJ0IiwicyIsImkiLCJuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImFwcGx5IiwiX19zcHJlYWRBcnJheXMiLCJpbCIsInIiLCJBcnJheSIsImsiLCJhIiwiaiIsImpsIiwibEdFdmVudHMiLCJhZnRlckFwcGVuZFNsaWRlIiwiaW5pdCIsImhhc1ZpZGVvIiwiY29udGFpbmVyUmVzaXplIiwidXBkYXRlU2xpZGVzIiwiYWZ0ZXJBcHBlbmRTdWJIdG1sIiwiYmVmb3JlT3BlbiIsImFmdGVyT3BlbiIsInNsaWRlSXRlbUxvYWQiLCJiZWZvcmVTbGlkZSIsImFmdGVyU2xpZGUiLCJwb3N0ZXJDbGljayIsImRyYWdTdGFydCIsImRyYWdNb3ZlIiwiZHJhZ0VuZCIsImJlZm9yZU5leHRTbGlkZSIsImJlZm9yZVByZXZTbGlkZSIsImJlZm9yZUNsb3NlIiwiYWZ0ZXJDbG9zZSIsInJvdGF0ZUxlZnQiLCJyb3RhdGVSaWdodCIsImZsaXBIb3Jpem9udGFsIiwiZmxpcFZlcnRpY2FsIiwiYXV0b3BsYXkiLCJhdXRvcGxheVN0YXJ0IiwiYXV0b3BsYXlTdG9wIiwibGlnaHRHYWxsZXJ5Q29yZVNldHRpbmdzIiwibW9kZSIsImVhc2luZyIsInNwZWVkIiwibGljZW5zZUtleSIsImhlaWdodCIsIndpZHRoIiwiYWRkQ2xhc3MiLCJzdGFydENsYXNzIiwiYmFja2Ryb3BEdXJhdGlvbiIsImNvbnRhaW5lciIsInN0YXJ0QW5pbWF0aW9uRHVyYXRpb24iLCJ6b29tRnJvbU9yaWdpbiIsImhpZGVCYXJzRGVsYXkiLCJzaG93QmFyc0FmdGVyIiwic2xpZGVEZWxheSIsInN1cHBvcnRMZWdhY3lCcm93c2VyIiwiYWxsb3dNZWRpYU92ZXJsYXAiLCJ2aWRlb01heFNpemUiLCJsb2FkWW91VHViZVBvc3RlciIsImRlZmF1bHRDYXB0aW9uSGVpZ2h0IiwiYXJpYUxhYmVsbGVkYnkiLCJhcmlhRGVzY3JpYmVkYnkiLCJjbG9zYWJsZSIsInN3aXBlVG9DbG9zZSIsImNsb3NlT25UYXAiLCJzaG93Q2xvc2VJY29uIiwic2hvd01heGltaXplSWNvbiIsImxvb3AiLCJlc2NLZXkiLCJrZXlQcmVzcyIsImNvbnRyb2xzIiwic2xpZGVFbmRBbmltYXRpb24iLCJoaWRlQ29udHJvbE9uRW5kIiwibW91c2V3aGVlbCIsImdldENhcHRpb25Gcm9tVGl0bGVPckFsdCIsImFwcGVuZFN1Ykh0bWxUbyIsInN1Ykh0bWxTZWxlY3RvclJlbGF0aXZlIiwicHJlbG9hZCIsIm51bWJlck9mU2xpZGVJdGVtc0luRG9tIiwic2VsZWN0b3IiLCJzZWxlY3RXaXRoaW4iLCJuZXh0SHRtbCIsInByZXZIdG1sIiwiaW5kZXgiLCJpZnJhbWVXaWR0aCIsImlmcmFtZUhlaWdodCIsImlmcmFtZU1heFdpZHRoIiwiaWZyYW1lTWF4SGVpZ2h0IiwiZG93bmxvYWQiLCJjb3VudGVyIiwiYXBwZW5kQ291bnRlclRvIiwic3dpcGVUaHJlc2hvbGQiLCJlbmFibGVTd2lwZSIsImVuYWJsZURyYWciLCJkeW5hbWljIiwiZHluYW1pY0VsIiwiZXh0cmFQcm9wcyIsImV4VGh1bWJJbWFnZSIsImlzTW9iaWxlIiwidW5kZWZpbmVkIiwibW9iaWxlU2V0dGluZ3MiLCJwbHVnaW5zIiwic3RyaW5ncyIsImNsb3NlR2FsbGVyeSIsInRvZ2dsZU1heGltaXplIiwicHJldmlvdXNTbGlkZSIsIm5leHRTbGlkZSIsInBsYXlWaWRlbyIsImluaXRMZ1BvbHlmaWxscyIsIndpbmRvdyIsIkN1c3RvbUV2ZW50IiwiZXZlbnQiLCJwYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImRldGFpbCIsImV2dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJFbGVtZW50IiwibWF0Y2hlcyIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibGdRdWVyeSIsImNzc1ZlbmRlclByZWZpeGVzIiwiX2dldFNlbGVjdG9yIiwiZmlyc3RFbGVtZW50IiwiX2dldEZpcnN0RWwiLCJnZW5lcmF0ZVVVSUQiLCJyZXBsYWNlIiwiYyIsIk1hdGgiLCJyYW5kb20iLCJ2IiwidG9TdHJpbmciLCJjb250ZXh0IiwiZmwiLCJzdWJzdHJpbmciLCJxdWVyeVNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsIl9lYWNoIiwiZnVuYyIsImZvckVhY2giLCJfc2V0Q3NzVmVuZG9yUHJlZml4IiwiZWwiLCJjc3NQcm9wZXJ0eSIsInZhbHVlIiwicHJvcGVydHkiLCJncm91cDEiLCJ0b1VwcGVyQ2FzZSIsImluZGV4T2YiLCJzdHlsZSIsImNoYXJBdCIsInRvTG93ZXJDYXNlIiwic2xpY2UiLCJpc0V2ZW50TWF0Y2hlZCIsImV2ZW50TmFtZSIsImV2ZW50TmFtZXNwYWNlIiwic3BsaXQiLCJmaWx0ZXIiLCJlIiwiZXZlcnkiLCJhdHRyIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiZmluZCIsIiRMRyIsImZpcnN0IiwiZXEiLCJwYXJlbnQiLCJwYXJlbnRFbGVtZW50IiwiZ2V0IiwicmVtb3ZlQXR0ciIsImF0dHJpYnV0ZXMiLCJhdHRycyIsInJlbW92ZUF0dHJpYnV0ZSIsIndyYXAiLCJjbGFzc05hbWUiLCJ3cmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwiY2xhc3NOYW1lcyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlIiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZSIsInRvZ2dsZUNsYXNzIiwiY3NzIiwiX3RoaXMiLCJvbiIsImV2ZW50cyIsImxpc3RlbmVyIiwiaXNBcnJheSIsImV2ZW50TGlzdGVuZXJzIiwicHVzaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmNlIiwib2ZmIiwia2V5cyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0cmlnZ2VyIiwiY3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwibG9hZCIsInVybCIsImZldGNoIiwidGhlbiIsInJlcyIsImlubmVySFRNTCIsImh0bWwiLCJhcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJwcmVwZW5kIiwiZW1wdHkiLCJzY3JvbGxUb3AiLCJib2R5IiwiZG9jdW1lbnRFbGVtZW50IiwicGFnZVlPZmZzZXQiLCJzY3JvbGxMZWZ0IiwicGFnZVhPZmZzZXQiLCJvZmZzZXQiLCJsZWZ0IiwidG9wIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvZHlNYXJnaW5MZWZ0IiwibWFyZ2luTGVmdCIsInBhcnNlRmxvYXQiLCJjdXJyZW50U3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiY2xpZW50V2lkdGgiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImNsaWVudEhlaWdodCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwiZGVmYXVsdER5bmFtaWNPcHRpb25zIiwiY29udmVydFRvRGF0YSIsImciLCJ1dGlscyIsImdldFNpemUiLCJzcGFjaW5nIiwiZGVmYXVsdExnU2l6ZSIsIkxHZWwiLCJsZ1NpemUiLCJpc1Jlc3BvbnNpdmVTaXplcyIsIndXaWR0aCIsImlubmVyV2lkdGgiLCJzaXplXzEiLCJyZXNwb25zaXZlV2lkdGgiLCJwYXJzZUludCIsInNpemUiLCJjV2lkdGgiLCJjSGVpZ2h0IiwibWF4V2lkdGgiLCJtaW4iLCJtYXhIZWlnaHQiLCJyYXRpbyIsImdldFRyYW5zZm9ybSIsImJvdHRvbSIsImltYWdlU2l6ZSIsImNvbnRhaW5lclJlY3QiLCJ3SGVpZ2h0IiwiZWxXaWR0aCIsImVsSGVpZ2h0IiwiZWxTdHlsZSIsIngiLCJib3JkZXJMZWZ0IiwieSIsImJvcmRlclRvcCIsInNjWCIsInNjWSIsInRyYW5zZm9ybSIsImdldElmcmFtZU1hcmt1cCIsInNyYyIsImlmcmFtZVRpdGxlIiwidGl0bGUiLCJnZXRJbWdNYXJrdXAiLCJhbHRBdHRyIiwic3Jjc2V0Iiwic2l6ZXMiLCJzb3VyY2VzIiwic3Jjc2V0QXR0ciIsInNpemVzQXR0ciIsImltZ01hcmt1cCIsInNvdXJjZVRhZyIsInNvdXJjZU9iaiIsIkpTT04iLCJwYXJzZSIsIm1hcCIsInNvdXJjZSIsImtleSIsImdldFJlc3BvbnNpdmVTcmMiLCJzcmNJdG1zIiwicnNXaWR0aCIsInJzU3JjIiwiX3NyYyIsInNwbGljZSIsImlzSW1hZ2VMb2FkZWQiLCJpbWciLCJjb21wbGV0ZSIsIm5hdHVyYWxXaWR0aCIsImdldFZpZGVvUG9zdGVyTWFya3VwIiwiX3Bvc3RlciIsImR1bW15SW1nIiwidmlkZW9Db250U3R5bGUiLCJwbGF5VmlkZW9TdHJpbmciLCJfaXNWaWRlbyIsInZpZGVvQ2xhc3MiLCJ5b3V0dWJlIiwidmltZW8iLCJnZXREeW5hbWljT3B0aW9ucyIsIml0ZW1zIiwiZHluYW1pY0VsZW1lbnRzIiwiYXZhaWxhYmxlRHluYW1pY09wdGlvbnMiLCJpdGVtIiwic3BlY2lmaWVkIiwiZHluYW1pY0F0dHIiLCJuYW1lIiwibGFiZWwiLCJjdXJyZW50SXRlbSIsImFsdCIsInRodW1iIiwic3ViSHRtbCIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpc1ZpZGVvIiwiaXNIVE1MNVZJZGVvIiwiaHRtbDUiLCJjb25zb2xlIiwiZXJyb3IiLCJtYXRjaCIsIndpc3RpYSIsImxnSWQiLCJMaWdodEdhbGxlcnkiLCJlbGVtZW50Iiwib3B0aW9ucyIsImxnT3BlbmVkIiwibEdhbGxlcnlPbiIsImxnQnVzeSIsImN1cnJlbnRJdGVtc0luRG9tIiwicHJldlNjcm9sbFRvcCIsImlzRHVtbXlJbWFnZVJlbW92ZWQiLCJkcmFnT3JTd2lwZUVuYWJsZWQiLCJtZWRpYUNvbnRhaW5lclBvc2l0aW9uIiwiZ2VuZXJhdGVTZXR0aW5ncyIsImJ1aWxkTW9kdWxlcyIsInNldHRpbmdzIiwiZ2FsbGVyeUl0ZW1zIiwiZ2V0SXRlbXMiLCJub3JtYWxpemVTZXR0aW5ncyIsInZhbGlkYXRlTGljZW5zZSIsImFkZFNsaWRlVmlkZW9JbmZvIiwiYnVpbGRTdHJ1Y3R1cmUiLCJpbnN0YW5jZSIsInNldFRpbWVvdXQiLCJ0cmlnZ2VyUG9zdGVyQ2xpY2siLCJhcnJvdyIsIm9wZW5HYWxsZXJ5T25JdGVtQ2xpY2siLCJfbG9vcF8xIiwidGhpc18xIiwiJGVsZW1lbnQiLCJ1dWlkIiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50SXRlbUluZGV4Iiwib3BlbkdhbGxlcnkiLCJwbHVnaW4iLCJ3YXJuIiwiZ2V0U2xpZGVJdGVtIiwiZ2V0U2xpZGVJdGVtSWQiLCJnZXRJZE5hbWUiLCJpZCIsImdldEVsZW1lbnRCeUlkIiwibWFuYWdlU2luZ2xlU2xpZGVDbGFzc05hbWUiLCJvdXRlciIsIiRjb250YWluZXIiLCJzdWJIdG1sQ29udCIsImFkZENsYXNzZXMiLCJjb250YWluZXJDbGFzc05hbWUiLCJjbG9zZUljb24iLCJtYXhpbWl6ZUljb24iLCJ0ZW1wbGF0ZSIsIiRsZ0NvbXBvbmVudHMiLCIkYmFja2Ryb3AiLCIkaW5uZXIiLCIkY29udGVudCIsIiR0b29sYmFyIiwib3V0ZXJDbGFzc05hbWVzIiwicmVmcmVzaE9uUmVzaXplIiwiaGlkZUJhcnMiLCJtYW5hZ2VDbG9zZUdhbGxlcnkiLCJpbml0TW9kdWxlcyIsImN1cnJlbnRHYWxsZXJ5SXRlbSIsIl9fc2xpZGVWaWRlb0luZm8iLCJnZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uIiwiX2EiLCJ0b3BfMSIsImN1cnJlbnRJbWFnZVNpemUiLCJyZXNpemVWaWRlb1NsaWRlIiwiaW1nU3R5bGUiLCJnZXREdW1teUltZ1N0eWxlcyIsImxnVmlkZW9TdHlsZSIsImdldFZpZGVvQ29udFN0eWxlIiwiY3VycmVudFNsaWRlIiwiY3VycmVudFNyYyIsInVwZGF0ZUNvbnRyb2xzIiwiX2luZGV4Iiwic29tZSIsImdhbGxlcnlJdGVtIiwiaXRlbUluZGV4Iiwib3JnYW5pemVTbGlkZUl0ZW1zIiwibG9hZENvbnRlbnQiLCJ1cGRhdGVDdXJyZW50Q291bnRlciIsImNoaWxkcmVuIiwiZm9jdXMiLCJpdGVtc1RvQmVJbnNlcnRlZFRvRG9tIiwiZ2V0SXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbSIsImFkZEh0bWwiLCJzZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uIiwidGltZW91dCIsImN1cnJlbnRTbGlkZV8xIiwic2xpZGUiLCJjYXB0aW9uSGVpZ2h0IiwidGh1bWJDb250YWluZXIiLCJ0aHVtYkhlaWdodCIsImNsZWFyVGltZW91dCIsImhpZGVCYXJUaW1lb3V0IiwiaW5pdFBpY3R1cmVGaWxsIiwiJGltZyIsInBpY3R1cmVmaWxsIiwiZWxlbWVudHMiLCJjb3VudGVySHRtbCIsInN1Ykh0bWxVcmwiLCJmTCIsImdldER1bW15SW1hZ2VDb250ZW50IiwiJGN1cnJlbnRTbGlkZSIsIiRjdXJyZW50SXRlbSIsIl9kdW1teUltZ1NyYyIsImR1bW15SW1nQ29udGVudCIsInNldEltZ01hcmt1cCIsImltZ0NvbnRlbnQiLCJpc0ZpcnN0U2xpZGVXaXRoWm9vbUFuaW1hdGlvbiIsIm9uU2xpZGVPYmplY3RMb2FkIiwiJHNsaWRlIiwiaXNIVE1MNVZpZGVvV2l0aG91dFBvc3RlciIsIm9uTG9hZCIsIm9uRXJyb3IiLCJtZWRpYU9iamVjdCIsIm9uTGdPYmplY3RMb2FkIiwiZGVsYXkiLCJpc0ZpcnN0U2xpZGUiLCJ0cmlnZ2VyU2xpZGVJdGVtTG9hZCIsIl9zcGVlZCIsImdldFNsaWRlVHlwZSIsInBvc3RlciIsInZpZGVvIiwicmVjIiwiX2h0bWw1VmlkZW8iLCJyZXNwb25zaXZlIiwic3JjRHlJdG1zIiwidmlkZW9JbmZvIiwiaWZyYW1lIiwidG9wXzIiLCJ2aWRlb1NpemUiLCJtYXJrdXAiLCJoYXNTdGFydEFuaW1hdGlvbiIsImh0bWw1VmlkZW8iLCJoYXNQb3N0ZXIiLCJsb2FkQ29udGVudE9uRmlyc3RTbGlkZUxvYWQiLCJwcmV2SW5kZXgiLCJudW1iZXJPZkl0ZW1zIiwicG9zc2libGVOdW1iZXJPZkl0ZW1zIiwibWF4IiwicHJldkluZGV4SXRlbSIsIl9lbGVtZW50IiwiaWR4IiwibnVtYmVyT2ZFeGlzdGluZ0l0ZW1zIiwiZ2V0UHJldmlvdXNTbGlkZUluZGV4IiwiY3VycmVudEl0ZW1JZCIsInNldERvd25sb2FkVmFsdWUiLCJoaWRlRG93bmxvYWRCdG4iLCJkb3dubG9hZFVybCIsIiRkb3dubG9hZCIsIm1ha2VTbGlkZUFuaW1hdGlvbiIsImRpcmVjdGlvbiIsImN1cnJlbnRTbGlkZUl0ZW0iLCJwcmV2aW91c1NsaWRlSXRlbSIsImZyb21Ub3VjaCIsImZyb21UaHVtYiIsIm51bWJlck9mR2FsbGVyeUl0ZW1zIiwicHJldmlvdXNTbGlkZUl0ZW1fMSIsInRvcF8zIiwiYXJyb3dEaXNhYmxlIiwidG91Y2hQcmV2IiwidG91Y2hOZXh0IiwidXBkYXRlQ291bnRlclRvdGFsIiwidG91Y2hNb3ZlIiwic3RhcnRDb29yZHMiLCJlbmRDb29yZHMiLCJkaXN0YW5jZVgiLCJwYWdlWCIsImRpc3RhbmNlWSIsInBhZ2VZIiwiYWxsb3dTd2lwZSIsInN3aXBlRGlyZWN0aW9uIiwiYWJzIiwic2V0VHJhbnNsYXRlIiwib2Zmc2V0V2lkdGgiLCJzbGlkZVdpZHRoQW1vdW50IiwiZ3V0dGVyIiwib3BhY2l0eSIsImlubmVySGVpZ2h0Iiwic2NhbGUiLCJ0b3VjaEVuZCIsImRpc3RhbmNlIiwidHJpZ2dlckNsaWNrIiwiZGlzdGFuY2VBYnMiLCJnb1RvTmV4dFNsaWRlIiwiZ29Ub1ByZXZTbGlkZSIsInRhcmdldCIsImlzUG9zdGVyRWxlbWVudCIsImlzTW92ZWQiLCJpc1N3aXBpbmciLCIkaXRlbSIsInRhcmdldFRvdWNoZXMiLCJ0b3VjaEFjdGlvbiIsIm1hbmFnZVN3aXBlQ2xhc3MiLCJpc0RyYWdpbmciLCJfdG91Y2hOZXh0IiwiX3RvdWNoUHJldiIsIl9sb29wIiwia2V5Q29kZSIsIiRwcmV2IiwiJG5leHQiLCIkZWwiLCJ4VmFsdWUiLCJ5VmFsdWUiLCJzY2FsZVgiLCJzY2FsZVkiLCJsYXN0Q2FsbCIsImRlbHRhWSIsIm5vdyIsIkRhdGUiLCJnZXRUaW1lIiwiaXNTbGlkZUVsZW1lbnQiLCJwbGF5QnV0dG9uIiwiaW52YWxpZGF0ZUl0ZW1zIiwibW91c2Vkb3duIiwiZm9yY2UiLCJ0b3BfNCIsIl9iIiwiZGVzdHJveU1vZHVsZXMiLCJyZW1vdmVUaW1lb3V0IiwiYmx1ciIsImVyciIsImRlc3Ryb3kiLCJyZWZyZXNoIiwiY2xvc2VUaW1lb3V0IiwibGdUaHVtYm5haWwiLCJ0aHVtYm5haWxzU2V0dGluZ3MiLCJ0aHVtYm5haWwiLCJhbmltYXRlVGh1bWIiLCJjdXJyZW50UGFnZXJQb3NpdGlvbiIsImFsaWduVGh1bWJuYWlscyIsInRodW1iV2lkdGgiLCJ0aHVtYk1hcmdpbiIsImFwcGVuZFRodW1ibmFpbHNUbyIsInRvZ2dsZVRodW1iIiwiZW5hYmxlVGh1bWJEcmFnIiwiZW5hYmxlVGh1bWJTd2lwZSIsInRodW1ibmFpbFN3aXBlVGhyZXNob2xkIiwibG9hZFlvdVR1YmVUaHVtYm5haWwiLCJ5b3VUdWJlVGh1bWJTaXplIiwidGh1bWJuYWlsUGx1Z2luU3RyaW5ncyIsInRvZ2dsZVRodW1ibmFpbHMiLCJUaHVtYm5haWwiLCJ0aHVtYk91dGVyV2lkdGgiLCJ0aHVtYlRvdGFsV2lkdGgiLCJ0cmFuc2xhdGVYIiwidGh1bWJDbGlja2FibGUiLCJjb3JlIiwic2V0QW5pbWF0ZVRodW1iU3R5bGVzIiwiYnVpbGQiLCJ0b2dnbGVUaHVtYkJhciIsInRodW1iS2V5UHJlc3MiLCJzZXRUaHVtYk1hcmt1cCIsIm1hbmFnZUFjdGl2ZUNsYXNzT25TbGlkZUNoYW5nZSIsIiRsZ1RodW1iIiwiJHRhcmdldCIsInJlYnVpbGRUaHVtYm5haWxzIiwidGh1bWJPdXRlckNsYXNzTmFtZXMiLCIkdGh1bWJPdXRlciIsInNldFRodW1iSXRlbUh0bWwiLCJ0aHVtYkRyYWdVdGlscyIsImNvcmRzIiwic3RhcnRYIiwiZW5kWCIsIm5ld1RyYW5zbGF0ZVgiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwidG91Y2hNb3ZlVGltZSIsImlzRHJhZ2dpbmciLCJvblRodW1iVG91Y2hNb3ZlIiwib25UaHVtYlRvdWNoRW5kIiwiZ2V0UG9zc2libGVUcmFuc2Zvcm1YIiwicG9zaXRpb24iLCJ2YWx1ZU9mIiwidG91Y2hEdXJhdGlvbiIsImRpc3RhbmNlWG5ldyIsInNwZWVkWCIsImdldFRodW1iSHRtbCIsInNsaWRlVmlkZW9JbmZvIiwidGh1bWJJbWciLCJnZXRUaHVtYkl0ZW1IdG1sIiwidGh1bWJMaXN0IiwiJHRodW1iIiwibGdab29tIiwiem9vbVNldHRpbmdzIiwiem9vbSIsImFjdHVhbFNpemUiLCJzaG93Wm9vbUluT3V0SWNvbnMiLCJhY3R1YWxTaXplSWNvbnMiLCJ6b29tSW4iLCJ6b29tT3V0IiwiZW5hYmxlWm9vbUFmdGVyIiwiem9vbVBsdWdpblN0cmluZ3MiLCJ2aWV3QWN0dWFsU2l6ZSIsIlpvb20iLCJidWlsZFRlbXBsYXRlcyIsInpvb21JY29ucyIsImVuYWJsZVpvb20iLCJ6b29tYWJsZVRpbWVvdXQiLCJpc0ltYWdlU2xpZGUiLCJzZXRab29tRXNzZW50aWFscyIsImVuYWJsZVpvb21PblNsaWRlSXRlbUxvYWQiLCJiaW5kIiwiZ2V0TW9kaWZpZXIiLCJyb3RhdGVWYWx1ZSIsImF4aXMiLCJvcmlnaW5hbFJvdGF0ZSIsInRyYW5zZm9ybVZhbHVlcyIsImdldEN1cnJlbnRUcmFuc2Zvcm0iLCJtb2RpZmllciIsImZsaXBIb3Jpem9udGFsVmFsdWUiLCJzaWduIiwiZmxpcFZlcnRpY2FsVmFsdWUiLCJzaW5YIiwic2luTWludXNYIiwiZ2V0SW1hZ2VTaXplIiwiJGltYWdlIiwiaW1hZ2VTaXplcyIsImdldERyYWdDb3JkcyIsImdldFN3aXBlQ29yZHMiLCJnZXREcmFnQWxsb3dlZEF4aXNlcyIsImFsbG93WSIsImltYWdlWVNpemUiLCJhbGxvd1giLCJpbWFnZVhTaXplIiwic3QiLCJ0bSIsImdldFByb3BlcnR5VmFsdWUiLCJnZXRDdXJyZW50Um90YXRpb24iLCJ2YWx1ZXMiLCJyb3VuZCIsImF0YW4yIiwiUEkiLCJyb3RhdGVFbCIsIm1vZGlmaWVyWCIsIm1vZGlmaWVyWSIsInpvb21JbWFnZSIsIm9mZnNldFgiLCJ0b3BCb3R0b21TcGFjaW5nIiwib2Zmc2V0WSIsIm9yaWdpbmFsWCIsIm9yaWdpbmFsWSIsInBvc2l0aW9uQ2hhbmdlZCIsImRyYWdBbGxvd2VkQXhpc2VzIiwicG9zc2libGVTd2lwZUNvcmRzIiwiZ2V0UG9zc2libGVTd2lwZURyYWdDb3JkcyIsIl94IiwiX3kiLCJpc0JleW9uZFBvc3NpYmxlTGVmdCIsIm1pblgiLCJpc0JleW9uZFBvc3NpYmxlUmlnaHQiLCJtYXhYIiwiaXNCZXlvbmRQb3NzaWJsZVRvcCIsIm1pblkiLCJpc0JleW9uZFBvc3NpYmxlQm90dG9tIiwibWF4WSIsInNldFpvb21TdHlsZXMiLCIkZHVtbXlJbWFnZSIsIiRpbWFnZVdyYXAiLCJzZXRBY3R1YWxTaXplIiwiZ2V0Q3VycmVudEltYWdlQWN0dWFsU2l6ZVNjYWxlIiwiZ2V0U2NhbGUiLCJzZXRQYWdlQ29yZHMiLCJiZWdpblpvb20iLCJnZXROYXR1cmFsV2lkdGgiLCJnZXRBY3R1YWxTaXplU2NhbGUiLCJfc2NhbGUiLCJnZXRQYWdlQ29yZHMiLCJwYWdlQ29yZHMiLCIkYWN0dWFsU2l6ZSIsInJlc2V0Wm9vbSIsImFjdHVhbFNpemVTY2FsZSIsInRhcHBlZCIsInpvb21EcmFnIiwicGluY2hab29tIiwiem9vbVN3aXBlIiwiZ2V0VG91Y2hEaXN0YW5jZSIsInNxcnQiLCJzdGFydERpc3QiLCJwaW5jaFN0YXJ0ZWQiLCJpbml0U2NhbGUiLCJlbmREaXN0IiwidG91Y2hlbmRab29tIiwiZGlzdGFuY2VZbmV3Iiwic3BlZWRZIiwiX0xHZWwiLCJzZXRab29tU3dpcGVTdHlsZXMiLCJnZXRab29tU3dpcGVDb3JkcyIsImRpZmZNaW5ZIiwiZGlmZk1heFkiLCJkaWZmTWluWCIsImRpZk1heFgiLCJkYXRhU2NhbGUiLCJlbERhdGFTY2FsZSIsImxnVmlkZW8iLCJ2aWRlb1NldHRpbmdzIiwiYXV0b3BsYXlGaXJzdFZpZGVvIiwieW91VHViZVBsYXllclBhcmFtcyIsInZpbWVvUGxheWVyUGFyYW1zIiwid2lzdGlhUGxheWVyUGFyYW1zIiwiZ290b05leHRTbGlkZU9uVmlkZW9FbmQiLCJhdXRvcGxheVZpZGVvT25TbGlkZSIsInZpZGVvanMiLCJ2aWRlb2pzT3B0aW9ucyIsInBhcmFtIiwib2JqIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImdldFZpbWVvVVJMUGFyYW1zIiwiZGVmYXVsdFBhcmFtcyIsInVybFBhcmFtcyIsImRlZmF1bHRQbGF5ZXJQYXJhbXMiLCJWaWRlbyIsIm9uSGFzVmlkZW8iLCJsb2FkVmlkZW9PblBvc3RlckNsaWNrIiwib25TbGlkZUl0ZW1Mb2FkIiwib25CZWZvcmVTbGlkZSIsIm9uQWZ0ZXJTbGlkZSIsImxvYWRBbmRQbGF5VmlkZW8iLCJhcHBlbmRWaWRlb3MiLCJwYXVzZVZpZGVvIiwiY29udHJvbFZpZGVvIiwiZ2V0VmlkZW9IdG1sIiwidmlkZW9UaXRsZSIsImNvbW1vbklmcmFtZVByb3BzIiwidmlkZW9JZCIsInNsaWRlVXJsUGFyYW1zIiwicGxheWVyUGFyYW1zIiwid2lzdGlhSWQiLCJodG1sNVZpZGVvTWFya3VwIiwidHlwZSIsInRyYWNrcyIsInRyYWNrQXR0cmlidXRlcyIsInRyYWNrIiwiaHRtbDVWaWRlb0F0dHJzXzEiLCJ2aWRlb0F0dHJpYnV0ZXNfMSIsInZpZGVvUGFyYW1zIiwidmlkZW9IdG1sIiwiJHZpZGVvRWxlbWVudCIsInN0b3BQcm9wYWdhdGlvbiIsIlZpbWVvIiwiUGxheWVyIiwiX3dxIiwib25SZWFkeSIsImFjdGlvbiIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsImZvcmNlUGxheSIsIl9odG1sIiwidmlkZW9Kc1BsYXllcl8xIiwiJHRlbXBJbWciLCJyZWFkeSIsIm9uVmlkZW9Mb2FkQWZ0ZXJQb3N0ZXJDbGljayIsImxnUm90YXRlIiwicm90YXRlU2V0dGluZ3MiLCJyb3RhdGUiLCJyb3RhdGVTcGVlZCIsInJvdGF0ZVBsdWdpblN0cmluZ3MiLCJSb3RhdGUiLCJyb3RhdGVJY29ucyIsInJvdGF0ZVZhbHVlc0xpc3QiLCJpbWFnZVdyYXAiLCJhcHBseVN0eWxlcyIsInRyaWdnZXJFdmVudHMiLCJhbmdsZSIsImN1cnJlbnRSb3RhdGlvbiIsInJvdGF0ZUF4aXMiLCJpc0ltYWdlT3JpZW50YXRpb25DaGFuZ2VkIiwiaXNSb3RhdGVkIiwiaWZGbGlwcGVkSG9yIiwiaWZGbGlwcGVkVmVyIiwiZmxrdHlNYWluIiwiRmxpY2tpdHkiLCJ3cmFwQXJvdW5kIiwiY2VsbEFsaWduIiwiY29udGFpbiIsInBhZ2VEb3RzIiwibGF6eUxvYWQiLCJmbGt0eU5hdiIsImFzTmF2Rm9yIiwicHJldk5leHRCdXR0b25zIiwibG9nIiwic2hvd1RodW1iQnlEZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBQUEsTUFBQSxFQUFBQyxPQUFBLEVBQUE7RUFDQSxRQUFBQyxPQUFBLGlDQUFBQyxPQUFBLENBQUFELE9BQUEsT0FBQSxRQUFBLElBQUEsT0FBQUUsTUFBQSxLQUFBLFdBQUEsR0FBQUEsTUFBQSxDQUFBRixPQUFBLEdBQUFELE9BQUEsQ0FBQSxDQUFBLEdBQ0EsT0FBQUksTUFBQSxLQUFBLFVBQUEsSUFBQUEsTUFBQSxDQUFBQyxHQUFBLEdBQUFELE1BQUEsQ0FBQUosT0FBQSxDQUFBLElBQ0FELE1BQUEsR0FBQSxPQUFBTyxVQUFBLEtBQUEsV0FBQSxHQUFBQSxVQUFBLEdBQUFQLE1BQUEsSUFBQVEsSUFBQSxFQUFBUixNQUFBLENBQUFTLFlBQUEsR0FBQVIsT0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLENBQUEsVUFBQSxZQUFBO0VBQUEsWUFBQTs7RUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFJQSxJQUFBUyxPQUFBLEdBQUEsU0FBQUEsU0FBQSxFQUFBO0lBQ0FBLE9BQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLElBQUEsU0FBQUYsUUFBQUEsQ0FBQUcsQ0FBQSxFQUFBO01BQ0EsS0FBQSxJQUFBQyxDQUFBLEVBQUFDLENBQUEsR0FBQSxDQUFBLEVBQUFDLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFILENBQUEsR0FBQUMsQ0FBQSxFQUFBRCxDQUFBLEVBQUEsRUFBQTtRQUNBRCxDQUFBLEdBQUFHLFNBQUEsQ0FBQUYsQ0FBQSxDQUFBO1FBQ0EsS0FBQSxJQUFBSSxDQUFBLElBQUFMLENBQUEsRUFBQSxJQUFBSCxNQUFBLENBQUFTLFNBQUEsQ0FBQUMsY0FBQSxDQUFBQyxJQUFBLENBQUFSLENBQUEsRUFBQUssQ0FBQSxDQUFBLEVBQUFOLENBQUEsQ0FBQU0sQ0FBQSxDQUFBLEdBQUFMLENBQUEsQ0FBQUssQ0FBQSxDQUFBO01BQ0E7TUFDQSxPQUFBTixDQUFBO0lBQ0EsQ0FBQTtJQUNBLE9BQUFILE9BQUEsQ0FBQWEsS0FBQSxDQUFBLElBQUEsRUFBQU4sU0FBQSxDQUFBO0VBQ0EsQ0FBQTtFQUVBLFNBQUFPLGNBQUFBLENBQUEsRUFBQTtJQUNBLEtBQUEsSUFBQVYsQ0FBQSxHQUFBLENBQUEsRUFBQUMsQ0FBQSxHQUFBLENBQUEsRUFBQVUsRUFBQSxHQUFBUixTQUFBLENBQUFDLE1BQUEsRUFBQUgsQ0FBQSxHQUFBVSxFQUFBLEVBQUFWLENBQUEsRUFBQSxFQUFBRCxDQUFBLElBQUFHLFNBQUEsQ0FBQUYsQ0FBQSxDQUFBLENBQUFHLE1BQUE7SUFDQSxLQUFBLElBQUFRLENBQUEsR0FBQUMsS0FBQSxDQUFBYixDQUFBLENBQUEsRUFBQWMsQ0FBQSxHQUFBLENBQUEsRUFBQWIsQ0FBQSxHQUFBLENBQUEsRUFBQUEsQ0FBQSxHQUFBVSxFQUFBLEVBQUFWLENBQUEsRUFBQSxFQUNBLEtBQUEsSUFBQWMsQ0FBQSxHQUFBWixTQUFBLENBQUFGLENBQUEsQ0FBQSxFQUFBZSxDQUFBLEdBQUEsQ0FBQSxFQUFBQyxFQUFBLEdBQUFGLENBQUEsQ0FBQVgsTUFBQSxFQUFBWSxDQUFBLEdBQUFDLEVBQUEsRUFBQUQsQ0FBQSxFQUFBLEVBQUFGLENBQUEsRUFBQSxFQUNBRixDQUFBLENBQUFFLENBQUEsQ0FBQSxHQUFBQyxDQUFBLENBQUFDLENBQUEsQ0FBQTtJQUNBLE9BQUFKLENBQUE7RUFDQTs7RUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0EsSUFBQU0sUUFBQSxHQUFBO0lBQ0FDLGdCQUFBLEVBQUEsb0JBQUE7SUFDQUMsSUFBQSxFQUFBLFFBQUE7SUFDQUMsUUFBQSxFQUFBLFlBQUE7SUFDQUMsZUFBQSxFQUFBLG1CQUFBO0lBQ0FDLFlBQUEsRUFBQSxnQkFBQTtJQUNBQyxrQkFBQSxFQUFBLHNCQUFBO0lBQ0FDLFVBQUEsRUFBQSxjQUFBO0lBQ0FDLFNBQUEsRUFBQSxhQUFBO0lBQ0FDLGFBQUEsRUFBQSxpQkFBQTtJQUNBQyxXQUFBLEVBQUEsZUFBQTtJQUNBQyxVQUFBLEVBQUEsY0FBQTtJQUNBQyxXQUFBLEVBQUEsZUFBQTtJQUNBQyxTQUFBLEVBQUEsYUFBQTtJQUNBQyxRQUFBLEVBQUEsWUFBQTtJQUNBQyxPQUFBLEVBQUEsV0FBQTtJQUNBQyxlQUFBLEVBQUEsbUJBQUE7SUFDQUMsZUFBQSxFQUFBLG1CQUFBO0lBQ0FDLFdBQUEsRUFBQSxlQUFBO0lBQ0FDLFVBQUEsRUFBQSxjQUFBO0lBQ0FDLFVBQUEsRUFBQSxjQUFBO0lBQ0FDLFdBQUEsRUFBQSxlQUFBO0lBQ0FDLGNBQUEsRUFBQSxrQkFBQTtJQUNBQyxZQUFBLEVBQUEsZ0JBQUE7SUFDQUMsUUFBQSxFQUFBLFlBQUE7SUFDQUMsYUFBQSxFQUFBLGlCQUFBO0lBQ0FDLFlBQUEsRUFBQTtFQUNBLENBQUE7RUFFQSxJQUFBQyx3QkFBQSxHQUFBO0lBQ0FDLElBQUEsRUFBQSxVQUFBO0lBQ0FDLE1BQUEsRUFBQSxNQUFBO0lBQ0FDLEtBQUEsRUFBQSxHQUFBO0lBQ0FDLFVBQUEsRUFBQSxvQkFBQTtJQUNBQyxNQUFBLEVBQUEsTUFBQTtJQUNBQyxLQUFBLEVBQUEsTUFBQTtJQUNBQyxRQUFBLEVBQUEsRUFBQTtJQUNBQyxVQUFBLEVBQUEsZUFBQTtJQUNBQyxnQkFBQSxFQUFBLEdBQUE7SUFDQUMsU0FBQSxFQUFBLEVBQUE7SUFDQUMsc0JBQUEsRUFBQSxHQUFBO0lBQ0FDLGNBQUEsRUFBQSxJQUFBO0lBQ0FDLGFBQUEsRUFBQSxDQUFBO0lBQ0FDLGFBQUEsRUFBQSxLQUFBO0lBQ0FDLFVBQUEsRUFBQSxDQUFBO0lBQ0FDLG9CQUFBLEVBQUEsSUFBQTtJQUNBQyxpQkFBQSxFQUFBLEtBQUE7SUFDQUMsWUFBQSxFQUFBLFVBQUE7SUFDQUMsaUJBQUEsRUFBQSxJQUFBO0lBQ0FDLG9CQUFBLEVBQUEsQ0FBQTtJQUNBQyxjQUFBLEVBQUEsRUFBQTtJQUNBQyxlQUFBLEVBQUEsRUFBQTtJQUNBQyxRQUFBLEVBQUEsSUFBQTtJQUNBQyxZQUFBLEVBQUEsSUFBQTtJQUNBQyxVQUFBLEVBQUEsSUFBQTtJQUNBQyxhQUFBLEVBQUEsSUFBQTtJQUNBQyxnQkFBQSxFQUFBLEtBQUE7SUFDQUMsSUFBQSxFQUFBLElBQUE7SUFDQUMsTUFBQSxFQUFBLElBQUE7SUFDQUMsUUFBQSxFQUFBLElBQUE7SUFDQUMsUUFBQSxFQUFBLElBQUE7SUFDQUMsaUJBQUEsRUFBQSxJQUFBO0lBQ0FDLGdCQUFBLEVBQUEsS0FBQTtJQUNBQyxVQUFBLEVBQUEsS0FBQTtJQUNBQyx3QkFBQSxFQUFBLElBQUE7SUFDQUMsZUFBQSxFQUFBLGNBQUE7SUFDQUMsdUJBQUEsRUFBQSxLQUFBO0lBQ0FDLE9BQUEsRUFBQSxDQUFBO0lBQ0FDLHVCQUFBLEVBQUEsRUFBQTtJQUNBQyxRQUFBLEVBQUEsRUFBQTtJQUNBQyxZQUFBLEVBQUEsRUFBQTtJQUNB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QSxDQUFBO0VBQ0E7QUFDQSxDQUFBLENBQUEiLCJmaWxlIjoiYXBwU2luZ2xlWWFjaHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGxpZ2h0Z2FsbGVyeSB8IDIuNC4wLWJldGEuMCB8IERlY2VtYmVyIDEydGggMjAyMVxuICogaHR0cDovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU2FjaGluIE5lcmF2YXRoO1xuICogQGxpY2Vuc2UgR1BMdjNcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5saWdodEdhbGxlcnkgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG4gICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG4gICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG4gICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG4gICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgICAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgbGlnaHRHYWxsZXJ5IGV2ZW50c1xyXG4gICAgICogQWxsIGV2ZW50cyBzaG91bGQgYmUgZG9jdW1lbnRlZCBoZXJlXHJcbiAgICAgKiBCZWxvdyBpbnRlcmZhY2VzIGFyZSB1c2VkIHRvIGJ1aWxkIHRoZSB3ZWJzaXRlIGRvY3VtZW50YXRpb25zXHJcbiAgICAgKiAqL1xyXG4gICAgdmFyIGxHRXZlbnRzID0ge1xyXG4gICAgICAgIGFmdGVyQXBwZW5kU2xpZGU6ICdsZ0FmdGVyQXBwZW5kU2xpZGUnLFxyXG4gICAgICAgIGluaXQ6ICdsZ0luaXQnLFxyXG4gICAgICAgIGhhc1ZpZGVvOiAnbGdIYXNWaWRlbycsXHJcbiAgICAgICAgY29udGFpbmVyUmVzaXplOiAnbGdDb250YWluZXJSZXNpemUnLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlczogJ2xnVXBkYXRlU2xpZGVzJyxcclxuICAgICAgICBhZnRlckFwcGVuZFN1Ykh0bWw6ICdsZ0FmdGVyQXBwZW5kU3ViSHRtbCcsXHJcbiAgICAgICAgYmVmb3JlT3BlbjogJ2xnQmVmb3JlT3BlbicsXHJcbiAgICAgICAgYWZ0ZXJPcGVuOiAnbGdBZnRlck9wZW4nLFxyXG4gICAgICAgIHNsaWRlSXRlbUxvYWQ6ICdsZ1NsaWRlSXRlbUxvYWQnLFxyXG4gICAgICAgIGJlZm9yZVNsaWRlOiAnbGdCZWZvcmVTbGlkZScsXHJcbiAgICAgICAgYWZ0ZXJTbGlkZTogJ2xnQWZ0ZXJTbGlkZScsXHJcbiAgICAgICAgcG9zdGVyQ2xpY2s6ICdsZ1Bvc3RlckNsaWNrJyxcclxuICAgICAgICBkcmFnU3RhcnQ6ICdsZ0RyYWdTdGFydCcsXHJcbiAgICAgICAgZHJhZ01vdmU6ICdsZ0RyYWdNb3ZlJyxcclxuICAgICAgICBkcmFnRW5kOiAnbGdEcmFnRW5kJyxcclxuICAgICAgICBiZWZvcmVOZXh0U2xpZGU6ICdsZ0JlZm9yZU5leHRTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlUHJldlNsaWRlOiAnbGdCZWZvcmVQcmV2U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZUNsb3NlOiAnbGdCZWZvcmVDbG9zZScsXHJcbiAgICAgICAgYWZ0ZXJDbG9zZTogJ2xnQWZ0ZXJDbG9zZScsXHJcbiAgICAgICAgcm90YXRlTGVmdDogJ2xnUm90YXRlTGVmdCcsXHJcbiAgICAgICAgcm90YXRlUmlnaHQ6ICdsZ1JvdGF0ZVJpZ2h0JyxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogJ2xnRmxpcEhvcml6b250YWwnLFxyXG4gICAgICAgIGZsaXBWZXJ0aWNhbDogJ2xnRmxpcFZlcnRpY2FsJyxcclxuICAgICAgICBhdXRvcGxheTogJ2xnQXV0b3BsYXknLFxyXG4gICAgICAgIGF1dG9wbGF5U3RhcnQ6ICdsZ0F1dG9wbGF5U3RhcnQnLFxyXG4gICAgICAgIGF1dG9wbGF5U3RvcDogJ2xnQXV0b3BsYXlTdG9wJyxcclxuICAgIH07XG5cbiAgICB2YXIgbGlnaHRHYWxsZXJ5Q29yZVNldHRpbmdzID0ge1xyXG4gICAgICAgIG1vZGU6ICdsZy1zbGlkZScsXHJcbiAgICAgICAgZWFzaW5nOiAnZWFzZScsXHJcbiAgICAgICAgc3BlZWQ6IDQwMCxcclxuICAgICAgICBsaWNlbnNlS2V5OiAnMDAwMC0wMDAwLTAwMC0wMDAwJyxcclxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgIGFkZENsYXNzOiAnJyxcclxuICAgICAgICBzdGFydENsYXNzOiAnbGctc3RhcnQtem9vbScsXHJcbiAgICAgICAgYmFja2Ryb3BEdXJhdGlvbjogMzAwLFxyXG4gICAgICAgIGNvbnRhaW5lcjogJycsXHJcbiAgICAgICAgc3RhcnRBbmltYXRpb25EdXJhdGlvbjogNDAwLFxyXG4gICAgICAgIHpvb21Gcm9tT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIGhpZGVCYXJzRGVsYXk6IDAsXHJcbiAgICAgICAgc2hvd0JhcnNBZnRlcjogMTAwMDAsXHJcbiAgICAgICAgc2xpZGVEZWxheTogMCxcclxuICAgICAgICBzdXBwb3J0TGVnYWN5QnJvd3NlcjogdHJ1ZSxcclxuICAgICAgICBhbGxvd01lZGlhT3ZlcmxhcDogZmFsc2UsXHJcbiAgICAgICAgdmlkZW9NYXhTaXplOiAnMTI4MC03MjAnLFxyXG4gICAgICAgIGxvYWRZb3VUdWJlUG9zdGVyOiB0cnVlLFxyXG4gICAgICAgIGRlZmF1bHRDYXB0aW9uSGVpZ2h0OiAwLFxyXG4gICAgICAgIGFyaWFMYWJlbGxlZGJ5OiAnJyxcclxuICAgICAgICBhcmlhRGVzY3JpYmVkYnk6ICcnLFxyXG4gICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgIHN3aXBlVG9DbG9zZTogdHJ1ZSxcclxuICAgICAgICBjbG9zZU9uVGFwOiB0cnVlLFxyXG4gICAgICAgIHNob3dDbG9zZUljb246IHRydWUsXHJcbiAgICAgICAgc2hvd01heGltaXplSWNvbjogZmFsc2UsXHJcbiAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICBlc2NLZXk6IHRydWUsXHJcbiAgICAgICAga2V5UHJlc3M6IHRydWUsXHJcbiAgICAgICAgY29udHJvbHM6IHRydWUsXHJcbiAgICAgICAgc2xpZGVFbmRBbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgaGlkZUNvbnRyb2xPbkVuZDogZmFsc2UsXHJcbiAgICAgICAgbW91c2V3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgZ2V0Q2FwdGlvbkZyb21UaXRsZU9yQWx0OiB0cnVlLFxyXG4gICAgICAgIGFwcGVuZFN1Ykh0bWxUbzogJy5sZy1zdWItaHRtbCcsXHJcbiAgICAgICAgc3ViSHRtbFNlbGVjdG9yUmVsYXRpdmU6IGZhbHNlLFxyXG4gICAgICAgIHByZWxvYWQ6IDIsXHJcbiAgICAgICAgbnVtYmVyT2ZTbGlkZUl0ZW1zSW5Eb206IDEwLFxyXG4gICAgICAgIHNlbGVjdG9yOiAnJyxcclxuICAgICAgICBzZWxlY3RXaXRoaW46ICcnLFxyXG4gICAgICAgIG5leHRIdG1sOiAnJyxcclxuICAgICAgICBwcmV2SHRtbDogJycsXHJcbiAgICAgICAgaW5kZXg6IDAsXHJcbiAgICAgICAgaWZyYW1lV2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBpZnJhbWVIZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICBpZnJhbWVNYXhXaWR0aDogJzEwMCUnLFxyXG4gICAgICAgIGlmcmFtZU1heEhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgIGRvd25sb2FkOiB0cnVlLFxyXG4gICAgICAgIGNvdW50ZXI6IHRydWUsXHJcbiAgICAgICAgYXBwZW5kQ291bnRlclRvOiAnLmxnLXRvb2xiYXInLFxyXG4gICAgICAgIHN3aXBlVGhyZXNob2xkOiA1MCxcclxuICAgICAgICBlbmFibGVTd2lwZTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVEcmFnOiB0cnVlLFxyXG4gICAgICAgIGR5bmFtaWM6IGZhbHNlLFxyXG4gICAgICAgIGR5bmFtaWNFbDogW10sXHJcbiAgICAgICAgZXh0cmFQcm9wczogW10sXHJcbiAgICAgICAgZXhUaHVtYkltYWdlOiAnJyxcclxuICAgICAgICBpc01vYmlsZTogdW5kZWZpbmVkLFxyXG4gICAgICAgIG1vYmlsZVNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0Nsb3NlSWNvbjogZmFsc2UsXHJcbiAgICAgICAgICAgIGRvd25sb2FkOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsdWdpbnM6IFtdLFxyXG4gICAgICAgIHN0cmluZ3M6IHtcclxuICAgICAgICAgICAgY2xvc2VHYWxsZXJ5OiAnQ2xvc2UgZ2FsbGVyeScsXHJcbiAgICAgICAgICAgIHRvZ2dsZU1heGltaXplOiAnVG9nZ2xlIG1heGltaXplJyxcclxuICAgICAgICAgICAgcHJldmlvdXNTbGlkZTogJ1ByZXZpb3VzIHNsaWRlJyxcclxuICAgICAgICAgICAgbmV4dFNsaWRlOiAnTmV4dCBzbGlkZScsXHJcbiAgICAgICAgICAgIGRvd25sb2FkOiAnRG93bmxvYWQnLFxyXG4gICAgICAgICAgICBwbGF5VmlkZW86ICdQbGF5IHZpZGVvJyxcclxuICAgICAgICB9LFxyXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMZ1BvbHlmaWxscygpIHtcclxuICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcclxuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xyXG4gICAgICAgICAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPVxyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICB2YXIgbGdRdWVyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBsZ1F1ZXJ5KHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzVmVuZGVyUHJlZml4ZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAnVHJhbnNpdGlvbkR1cmF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdUcmFuc2l0aW9uVGltaW5nRnVuY3Rpb24nLFxyXG4gICAgICAgICAgICAgICAgJ1RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICAgICAnVHJhbnNpdGlvbicsXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLl9nZXRTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RFbGVtZW50ID0gdGhpcy5fZ2V0Rmlyc3RFbCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGdRdWVyeS5nZW5lcmF0ZVVVSUQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgciA9IChNYXRoLnJhbmRvbSgpICogMTYpIHwgMCwgdiA9IGMgPT0gJ3gnID8gciA6IChyICYgMHgzKSB8IDB4ODtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5fZ2V0U2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgeyBjb250ZXh0ID0gZG9jdW1lbnQ7IH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuICAgICAgICAgICAgdmFyIGZsID0gc2VsZWN0b3Iuc3Vic3RyaW5nKDAsIDEpO1xyXG4gICAgICAgICAgICBpZiAoZmwgPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuX2VhY2ggPSBmdW5jdGlvbiAoZnVuYykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9yLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5zZWxlY3RvciwgZnVuYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jKHRoaXMuc2VsZWN0b3IsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuX3NldENzc1ZlbmRvclByZWZpeCA9IGZ1bmN0aW9uIChlbCwgY3NzUHJvcGVydHksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBjc3NQcm9wZXJ0eS5yZXBsYWNlKC8tKFthLXpdKS9naSwgZnVuY3Rpb24gKHMsIGdyb3VwMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwMS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3NzVmVuZGVyUHJlZml4ZXMuaW5kZXhPZihwcm9wZXJ0eSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVtwcm9wZXJ0eS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGVbJ3dlYmtpdCcgKyBwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlWydtb3onICsgcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVsnbXMnICsgcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVsnbycgKyBwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5fZ2V0Rmlyc3RFbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3IgJiYgdGhpcy5zZWxlY3Rvci5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuaXNFdmVudE1hdGNoZWQgPSBmdW5jdGlvbiAoZXZlbnQsIGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lc3BhY2UgPSBldmVudE5hbWUuc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoJy4nKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZTsgfSlcclxuICAgICAgICAgICAgICAgIC5ldmVyeShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50TmFtZXNwYWNlLmluZGV4T2YoZSkgIT09IC0xO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmF0dHIgPSBmdW5jdGlvbiAoYXR0ciwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdEVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkTEcodGhpcy5fZ2V0U2VsZWN0b3Ioc2VsZWN0b3IsIHRoaXMuc2VsZWN0b3IpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvciAmJiB0aGlzLnNlbGVjdG9yLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJExHKHRoaXMuc2VsZWN0b3JbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRMRyh0aGlzLnNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRMRyh0aGlzLnNlbGVjdG9yW2luZGV4XSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkTEcodGhpcy5zZWxlY3Rvci5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEZpcnN0RWwoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnJlbW92ZUF0dHIgPSBmdW5jdGlvbiAoYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBhdHRyaWJ1dGVzLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyKSB7IHJldHVybiBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7IH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS53cmFwID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcHBlciwgdGhpcy5maXJzdEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RFbGVtZW50KTtcclxuICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmZpcnN0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lcykge1xyXG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lcyA9PT0gdm9pZCAwKSB7IGNsYXNzTmFtZXMgPSAnJzsgfVxyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSUUgZG9lc24ndCBzdXBwb3J0IG11bHRpcGxlIGFyZ3VtZW50c1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJRSBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgYXJndW1lbnRzXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmhhc0NsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuaGFzQXR0cmlidXRlID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0NsYXNzKGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLl9zZXRDc3NWZW5kb3JQcmVmaXgoZWwsIHByb3BlcnR5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIE5lZWQgdG8gcGFzcyBzZXBhcmF0ZSBuYW1lc3BhY2VzIGZvciBzZXBhcmF0ZSBlbGVtZW50c1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50cywgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZ1F1ZXJ5LmV2ZW50TGlzdGVuZXJzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQuc3BsaXQoJy4nKVswXSwgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBAdG9kbyAtIHRlc3QgdGhpc1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm9mZihldmVudCk7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcihldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzRXZlbnRNYXRjaGVkKGV2ZW50LCBldmVudE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGdRdWVyeS5ldmVudExpc3RlbmVyc1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdG9yLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLnNwbGl0KCcuJylbMF0sIGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBsZ1F1ZXJ5LmV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudCwgZGV0YWlsKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdXN0b21FdmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudC5zcGxpdCgnLicpWzBdLCB7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWw6IGRldGFpbCB8fCBudWxsLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21FdmVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gRG9lcyBub3Qgc3VwcG9ydCBJRVxyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCkudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3Rvci5pbm5lckhUTUwgPSByZXM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbiAoaHRtbCkge1xyXG4gICAgICAgICAgICBpZiAoaHRtbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZmlyc3RFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50LmlubmVySFRNTDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKGh0bWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaHRtbCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoaHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiAoaHRtbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgaHRtbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5zY3JvbGxUb3AgPSBmdW5jdGlvbiAoc2Nyb2xsVG9wKSB7XHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHdpbmRvdy5wYWdlWU9mZnNldCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHxcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5zY3JvbGxMZWZ0ID0gZnVuY3Rpb24gKHNjcm9sbExlZnQpIHtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbExlZnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh3aW5kb3cucGFnZVhPZmZzZXQgfHxcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5vZmZzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciByZWN0ID0gdGhpcy5maXJzdEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHZhciBib2R5TWFyZ2luTGVmdCA9ICRMRygnYm9keScpLnN0eWxlKCkubWFyZ2luTGVmdDtcclxuICAgICAgICAgICAgLy8gTWludXMgYm9keSBtYXJnaW4gLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDcxMTU0OC9pcy1nZXRib3VuZGluZ2NsaWVudHJlY3QtbGVmdC1yZXR1cm5pbmctYS13cm9uZy12YWx1ZVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0IC0gcGFyc2VGbG9hdChib2R5TWFyZ2luTGVmdCkgKyB0aGlzLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB0aGlzLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuc3R5bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZmlyc3RFbGVtZW50LmN1cnJlbnRTdHlsZSB8fFxyXG4gICAgICAgICAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5maXJzdEVsZW1lbnQpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFdpZHRoIHdpdGhvdXQgcGFkZGluZyBhbmQgYm9yZGVyIGV2ZW4gaWYgYm94LXNpemluZyBpcyB1c2VkLlxyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLndpZHRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5maXJzdEVsZW1lbnQuY2xpZW50V2lkdGggLVxyXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nTGVmdCkgLVxyXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nUmlnaHQpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEhlaWdodCB3aXRob3V0IHBhZGRpbmcgYW5kIGJvcmRlciBldmVuIGlmIGJveC1zaXppbmcgaXMgdXNlZC5cclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5oZWlnaHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmZpcnN0RWxlbWVudC5jbGllbnRIZWlnaHQgLVxyXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKSAtXHJcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdCb3R0b20pKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICByZXR1cm4gbGdRdWVyeTtcclxuICAgIH0oKSk7XHJcbiAgICBmdW5jdGlvbiAkTEcoc2VsZWN0b3IpIHtcclxuICAgICAgICBpbml0TGdQb2x5ZmlsbHMoKTtcclxuICAgICAgICByZXR1cm4gbmV3IGxnUXVlcnkoc2VsZWN0b3IpO1xyXG4gICAgfVxuXG4gICAgdmFyIGRlZmF1bHREeW5hbWljT3B0aW9ucyA9IFtcclxuICAgICAgICAnc3JjJyxcclxuICAgICAgICAnc291cmNlcycsXHJcbiAgICAgICAgJ3N1Ykh0bWwnLFxyXG4gICAgICAgICdzdWJIdG1sVXJsJyxcclxuICAgICAgICAnaHRtbCcsXHJcbiAgICAgICAgJ3ZpZGVvJyxcclxuICAgICAgICAncG9zdGVyJyxcclxuICAgICAgICAnc2xpZGVOYW1lJyxcclxuICAgICAgICAncmVzcG9uc2l2ZScsXHJcbiAgICAgICAgJ3NyY3NldCcsXHJcbiAgICAgICAgJ3NpemVzJyxcclxuICAgICAgICAnaWZyYW1lJyxcclxuICAgICAgICAnZG93bmxvYWRVcmwnLFxyXG4gICAgICAgICdkb3dubG9hZCcsXHJcbiAgICAgICAgJ3dpZHRoJyxcclxuICAgICAgICAnZmFjZWJvb2tTaGFyZVVybCcsXHJcbiAgICAgICAgJ3R3ZWV0VGV4dCcsXHJcbiAgICAgICAgJ2lmcmFtZVRpdGxlJyxcclxuICAgICAgICAndHdpdHRlclNoYXJlVXJsJyxcclxuICAgICAgICAncGludGVyZXN0U2hhcmVVcmwnLFxyXG4gICAgICAgICdwaW50ZXJlc3RUZXh0JyxcclxuICAgICAgICAnZmJIdG1sJyxcclxuICAgICAgICAnZGlzcXVzSWRlbnRpZmllcicsXHJcbiAgICAgICAgJ2Rpc3F1c1VybCcsXHJcbiAgICBdO1xyXG4gICAgLy8gQ29udmVydCBodG1sIGRhdGEtYXR0cmlidXRlIHRvIGNhbWFsY2FzZVxyXG4gICAgZnVuY3Rpb24gY29udmVydFRvRGF0YShhdHRyKSB7XHJcbiAgICAgICAgLy8gRkluZCBhIHdheSBmb3IgbGdzaXplXHJcbiAgICAgICAgaWYgKGF0dHIgPT09ICdocmVmJykge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3NyYyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF0dHIgPSBhdHRyLnJlcGxhY2UoJ2RhdGEtJywgJycpO1xyXG4gICAgICAgIGF0dHIgPSBhdHRyLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgYXR0ci5zbGljZSgxKTtcclxuICAgICAgICBhdHRyID0gYXR0ci5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbiAoZykgeyByZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpOyB9KTtcclxuICAgICAgICByZXR1cm4gYXR0cjtcclxuICAgIH1cclxuICAgIHZhciB1dGlscyA9IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBnZXQgcG9zc2libGUgd2lkdGggYW5kIGhlaWdodCBmcm9tIHRoZSBsZ1NpemUgYXR0cmlidXRlLiBVc2VkIGZvciBab29tRnJvbU9yaWdpbiBvcHRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRTaXplOiBmdW5jdGlvbiAoZWwsIGNvbnRhaW5lciwgc3BhY2luZywgZGVmYXVsdExnU2l6ZSkge1xyXG4gICAgICAgICAgICBpZiAoc3BhY2luZyA9PT0gdm9pZCAwKSB7IHNwYWNpbmcgPSAwOyB9XHJcbiAgICAgICAgICAgIHZhciBMR2VsID0gJExHKGVsKTtcclxuICAgICAgICAgICAgdmFyIGxnU2l6ZSA9IExHZWwuYXR0cignZGF0YS1sZy1zaXplJykgfHwgZGVmYXVsdExnU2l6ZTtcclxuICAgICAgICAgICAgaWYgKCFsZ1NpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXNSZXNwb25zaXZlU2l6ZXMgPSBsZ1NpemUuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgLy8gaWYgYXQtbGVhc3QgdHdvIHZpZXdwb3J0IHNpemVzIGFyZSBhdmFpbGFibGVcclxuICAgICAgICAgICAgaWYgKGlzUmVzcG9uc2l2ZVNpemVzWzFdKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlzUmVzcG9uc2l2ZVNpemVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpemVfMSA9IGlzUmVzcG9uc2l2ZVNpemVzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zaXZlV2lkdGggPSBwYXJzZUludChzaXplXzEuc3BsaXQoJy0nKVsyXSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zaXZlV2lkdGggPiB3V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGdTaXplID0gc2l6ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFrZSBsYXN0IGl0ZW0gYXMgbGFzdCBvcHRpb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gaXNSZXNwb25zaXZlU2l6ZXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZ1NpemUgPSBzaXplXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gbGdTaXplLnNwbGl0KCctJyk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHBhcnNlSW50KHNpemVbMF0sIDEwKTtcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHBhcnNlSW50KHNpemVbMV0sIDEwKTtcclxuICAgICAgICAgICAgdmFyIGNXaWR0aCA9IGNvbnRhaW5lci53aWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgY0hlaWdodCA9IGNvbnRhaW5lci5oZWlnaHQoKSAtIHNwYWNpbmc7XHJcbiAgICAgICAgICAgIHZhciBtYXhXaWR0aCA9IE1hdGgubWluKGNXaWR0aCwgd2lkdGgpO1xyXG4gICAgICAgICAgICB2YXIgbWF4SGVpZ2h0ID0gTWF0aC5taW4oY0hlaWdodCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgdmFyIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyB3aWR0aCwgbWF4SGVpZ2h0IC8gaGVpZ2h0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHdpZHRoICogcmF0aW8sIGhlaWdodDogaGVpZ2h0ICogcmF0aW8gfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIEdldCB0cmFuc2Zvcm0gdmFsdWUgYmFzZWQgb24gdGhlIGltYWdlU2l6ZS4gVXNlZCBmb3IgWm9vbUZyb21PcmlnaW4gb3B0aW9uXHJcbiAgICAgICAgICogQHBhcmFtIHtqUXVlcnkgRWxlbWVudH1cclxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUcmFuc2Zvcm0gQ1NTIHN0cmluZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldFRyYW5zZm9ybTogZnVuY3Rpb24gKGVsLCBjb250YWluZXIsIHRvcCwgYm90dG9tLCBpbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgaWYgKCFpbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgTEdlbCA9ICRMRyhlbCkuZmluZCgnaW1nJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgaWYgKCFMR2VsLmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHZhciB3V2lkdGggPSBjb250YWluZXJSZWN0LndpZHRoO1xyXG4gICAgICAgICAgICAvLyB1c2luZyBpbm5lcldpZHRoIHRvIGluY2x1ZGUgbW9iaWxlIHNhZmFyaSBib3R0b20gYmFyXHJcbiAgICAgICAgICAgIHZhciB3SGVpZ2h0ID0gY29udGFpbmVyLmhlaWdodCgpIC0gKHRvcCArIGJvdHRvbSk7XHJcbiAgICAgICAgICAgIHZhciBlbFdpZHRoID0gTEdlbC53aWR0aCgpO1xyXG4gICAgICAgICAgICB2YXIgZWxIZWlnaHQgPSBMR2VsLmhlaWdodCgpO1xyXG4gICAgICAgICAgICB2YXIgZWxTdHlsZSA9IExHZWwuc3R5bGUoKTtcclxuICAgICAgICAgICAgdmFyIHggPSAod1dpZHRoIC0gZWxXaWR0aCkgLyAyIC1cclxuICAgICAgICAgICAgICAgIExHZWwub2Zmc2V0KCkubGVmdCArXHJcbiAgICAgICAgICAgICAgICAocGFyc2VGbG9hdChlbFN0eWxlLnBhZGRpbmdMZWZ0KSB8fCAwKSArXHJcbiAgICAgICAgICAgICAgICAocGFyc2VGbG9hdChlbFN0eWxlLmJvcmRlckxlZnQpIHx8IDApICtcclxuICAgICAgICAgICAgICAgICRMRyh3aW5kb3cpLnNjcm9sbExlZnQoKSArXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgIHZhciB5ID0gKHdIZWlnaHQgLSBlbEhlaWdodCkgLyAyIC1cclxuICAgICAgICAgICAgICAgIExHZWwub2Zmc2V0KCkudG9wICtcclxuICAgICAgICAgICAgICAgIChwYXJzZUZsb2F0KGVsU3R5bGUucGFkZGluZ1RvcCkgfHwgMCkgK1xyXG4gICAgICAgICAgICAgICAgKHBhcnNlRmxvYXQoZWxTdHlsZS5ib3JkZXJUb3ApIHx8IDApICtcclxuICAgICAgICAgICAgICAgICRMRyh3aW5kb3cpLnNjcm9sbFRvcCgpICtcclxuICAgICAgICAgICAgICAgIHRvcDtcclxuICAgICAgICAgICAgdmFyIHNjWCA9IGVsV2lkdGggLyBpbWFnZVNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBzY1kgPSBlbEhlaWdodCAvIGltYWdlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArXHJcbiAgICAgICAgICAgICAgICAoeCAqPSAtMSkgK1xyXG4gICAgICAgICAgICAgICAgJ3B4LCAnICtcclxuICAgICAgICAgICAgICAgICh5ICo9IC0xKSArXHJcbiAgICAgICAgICAgICAgICAncHgsIDApIHNjYWxlM2QoJyArXHJcbiAgICAgICAgICAgICAgICBzY1ggK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBzY1kgK1xyXG4gICAgICAgICAgICAgICAgJywgMSknO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0SWZyYW1lTWFya3VwOiBmdW5jdGlvbiAoaWZyYW1lV2lkdGgsIGlmcmFtZUhlaWdodCwgaWZyYW1lTWF4V2lkdGgsIGlmcmFtZU1heEhlaWdodCwgc3JjLCBpZnJhbWVUaXRsZSkge1xyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBpZnJhbWVUaXRsZSA/ICd0aXRsZT1cIicgKyBpZnJhbWVUaXRsZSArICdcIicgOiAnJztcclxuICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwibGctdmlkZW8tY29udCBsZy1oYXMtaWZyYW1lXFxcIiBzdHlsZT1cXFwid2lkdGg6XCIgKyBpZnJhbWVXaWR0aCArIFwiOyBtYXgtd2lkdGg6XCIgKyBpZnJhbWVNYXhXaWR0aCArIFwiOyBoZWlnaHQ6IFwiICsgaWZyYW1lSGVpZ2h0ICsgXCI7IG1heC1oZWlnaHQ6XCIgKyBpZnJhbWVNYXhIZWlnaHQgKyBcIlxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aWZyYW1lIGNsYXNzPVxcXCJsZy1vYmplY3RcXFwiIGZyYW1lYm9yZGVyPVxcXCIwXFxcIiBcIiArIHRpdGxlICsgXCIgc3JjPVxcXCJcIiArIHNyYyArIFwiXFxcIiAgYWxsb3dmdWxsc2NyZWVuPVxcXCJ0cnVlXFxcIj48L2lmcmFtZT5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRJbWdNYXJrdXA6IGZ1bmN0aW9uIChpbmRleCwgc3JjLCBhbHRBdHRyLCBzcmNzZXQsIHNpemVzLCBzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIHZhciBzcmNzZXRBdHRyID0gc3Jjc2V0ID8gXCJzcmNzZXQ9XFxcIlwiICsgc3Jjc2V0ICsgXCJcXFwiXCIgOiAnJztcclxuICAgICAgICAgICAgdmFyIHNpemVzQXR0ciA9IHNpemVzID8gXCJzaXplcz1cXFwiXCIgKyBzaXplcyArIFwiXFxcIlwiIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBpbWdNYXJrdXAgPSBcIjxpbWcgXCIgKyBhbHRBdHRyICsgXCIgXCIgKyBzcmNzZXRBdHRyICsgXCIgIFwiICsgc2l6ZXNBdHRyICsgXCIgY2xhc3M9XFxcImxnLW9iamVjdCBsZy1pbWFnZVxcXCIgZGF0YS1pbmRleD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIiBzcmM9XFxcIlwiICsgc3JjICsgXCJcXFwiIC8+XCI7XHJcbiAgICAgICAgICAgIHZhciBzb3VyY2VUYWcgPSAnJztcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzb3VyY2VPYmogPSB0eXBlb2Ygc291cmNlcyA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHNvdXJjZXMpIDogc291cmNlcztcclxuICAgICAgICAgICAgICAgIHNvdXJjZVRhZyA9IHNvdXJjZU9iai5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRycyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIG5vdCByZW1vdmUgdGhlIGZpcnN0IHNwYWNlIGFzIGl0IGlzIHJlcXVpcmVkIHRvIHNlcGFyYXRlIHRoZSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzICs9IFwiIFwiICsga2V5ICsgXCI9XFxcIlwiICsgc291cmNlW2tleV0gKyBcIlxcXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCI8c291cmNlIFwiICsgYXR0cnMgKyBcIj48L3NvdXJjZT5cIjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiICsgc291cmNlVGFnICsgaW1nTWFya3VwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gR2V0IHNyYyBmcm9tIHJlc3BvbnNpdmUgc3JjXHJcbiAgICAgICAgZ2V0UmVzcG9uc2l2ZVNyYzogZnVuY3Rpb24gKHNyY0l0bXMpIHtcclxuICAgICAgICAgICAgdmFyIHJzV2lkdGggPSBbXTtcclxuICAgICAgICAgICAgdmFyIHJzU3JjID0gW107XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcmNJdG1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NyYyA9IHNyY0l0bXNbaV0uc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgICAgIC8vIE1hbmFnZSBlbXB0eSBzcGFjZVxyXG4gICAgICAgICAgICAgICAgaWYgKF9zcmNbMF0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NyYy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByc1NyYy5wdXNoKF9zcmNbMF0pO1xyXG4gICAgICAgICAgICAgICAgcnNXaWR0aC5wdXNoKF9zcmNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB3V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByc1dpZHRoLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQocnNXaWR0aFtqXSwgMTApID4gd1dpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gcnNTcmNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNyYztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzSW1hZ2VMb2FkZWQ6IGZ1bmN0aW9uIChpbWcpIHtcclxuICAgICAgICAgICAgaWYgKCFpbWcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIER1cmluZyB0aGUgb25sb2FkIGV2ZW50LCBJRSBjb3JyZWN0bHkgaWRlbnRpZmllcyBhbnkgaW1hZ2VzIHRoYXRcclxuICAgICAgICAgICAgLy8gd2VyZW7igJl0IGRvd25sb2FkZWQgYXMgbm90IGNvbXBsZXRlLiBPdGhlcnMgc2hvdWxkIHRvby4gR2Vja28tYmFzZWRcclxuICAgICAgICAgICAgLy8gYnJvd3NlcnMgYWN0IGxpa2UgTlM0IGluIHRoYXQgdGhleSByZXBvcnQgdGhpcyBpbmNvcnJlY3RseS5cclxuICAgICAgICAgICAgaWYgKCFpbWcuY29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBIb3dldmVyLCB0aGV5IGRvIGhhdmUgdHdvIHZlcnkgdXNlZnVsIHByb3BlcnRpZXM6IG5hdHVyYWxXaWR0aCBhbmRcclxuICAgICAgICAgICAgLy8gbmF0dXJhbEhlaWdodC4gVGhlc2UgZ2l2ZSB0aGUgdHJ1ZSBzaXplIG9mIHRoZSBpbWFnZS4gSWYgaXQgZmFpbGVkXHJcbiAgICAgICAgICAgIC8vIHRvIGxvYWQsIGVpdGhlciBvZiB0aGVzZSBzaG91bGQgYmUgemVyby5cclxuICAgICAgICAgICAgaWYgKGltZy5uYXR1cmFsV2lkdGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBObyBvdGhlciB3YXkgb2YgY2hlY2tpbmc6IGFzc3VtZSBpdOKAmXMgb2suXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VmlkZW9Qb3N0ZXJNYXJrdXA6IGZ1bmN0aW9uIChfcG9zdGVyLCBkdW1teUltZywgdmlkZW9Db250U3R5bGUsIHBsYXlWaWRlb1N0cmluZywgX2lzVmlkZW8pIHtcclxuICAgICAgICAgICAgdmFyIHZpZGVvQ2xhc3MgPSAnJztcclxuICAgICAgICAgICAgaWYgKF9pc1ZpZGVvICYmIF9pc1ZpZGVvLnlvdXR1YmUpIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvQ2xhc3MgPSAnbGctaGFzLXlvdXR1YmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF9pc1ZpZGVvICYmIF9pc1ZpZGVvLnZpbWVvKSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0NsYXNzID0gJ2xnLWhhcy12aW1lbyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0NsYXNzID0gJ2xnLWhhcy1odG1sNSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwibGctdmlkZW8tY29udCBcIiArIHZpZGVvQ2xhc3MgKyBcIlxcXCIgc3R5bGU9XFxcIlwiICsgdmlkZW9Db250U3R5bGUgKyBcIlxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxnLXZpZGVvLXBsYXktYnV0dG9uXFxcIj5cXG4gICAgICAgICAgICAgICAgPHN2Z1xcbiAgICAgICAgICAgICAgICAgICAgdmlld0JveD1cXFwiMCAwIDIwIDIwXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgcHJlc2VydmVBc3BlY3RSYXRpbz1cXFwieE1pZFlNaWRcXFwiXFxuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGU9XFxcImZhbHNlXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVxcXCJcIiArIHBsYXlWaWRlb1N0cmluZyArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cXFwiaW1nXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcImxnLXZpZGVvLXBsYXktaWNvblxcXCJcXG4gICAgICAgICAgICAgICAgPlxcbiAgICAgICAgICAgICAgICAgICAgPHRpdGxlPlwiICsgcGxheVZpZGVvU3RyaW5nICsgXCI8L3RpdGxlPlxcbiAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9XFxcImxnLXZpZGVvLXBsYXktaWNvbi1pbm5lclxcXCIgcG9pbnRzPVxcXCIxLDAgMjAsMTAgMSwyMFxcXCI+PC9wb2x5Z29uPlxcbiAgICAgICAgICAgICAgICA8L3N2Zz5cXG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cXFwibGctdmlkZW8tcGxheS1pY29uLWJnXFxcIiB2aWV3Qm94PVxcXCIwIDAgNTAgNTBcXFwiIGZvY3VzYWJsZT1cXFwiZmFsc2VcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cXFwiNTAlXFxcIiBjeT1cXFwiNTAlXFxcIiByPVxcXCIyMFxcXCI+PC9jaXJjbGU+PC9zdmc+XFxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XFxcImxnLXZpZGVvLXBsYXktaWNvbi1jaXJjbGVcXFwiIHZpZXdCb3g9XFxcIjAgMCA1MCA1MFxcXCIgZm9jdXNhYmxlPVxcXCJmYWxzZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVxcXCI1MCVcXFwiIGN5PVxcXCI1MCVcXFwiIHI9XFxcIjIwXFxcIj48L2NpcmNsZT5cXG4gICAgICAgICAgICAgICAgPC9zdmc+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXCIgKyAoZHVtbXlJbWcgfHwgJycpICsgXCJcXG4gICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJsZy1vYmplY3QgbGctdmlkZW8tcG9zdGVyXFxcIiBzcmM9XFxcIlwiICsgX3Bvc3RlciArIFwiXFxcIiAvPlxcbiAgICAgICAgPC9kaXY+XCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBDcmVhdGUgZHluYW1pYyBlbGVtZW50cyBhcnJheSBmcm9tIGdhbGxlcnkgaXRlbXMgd2hlbiBkeW5hbWljIG9wdGlvbiBpcyBmYWxzZVxyXG4gICAgICAgICAqIEl0IGhlbHBzIHRvIGF2b2lkIGZyZXF1ZW50IERPTSBpbnRlcmFjdGlvblxyXG4gICAgICAgICAqIGFuZCBhdm9pZCBtdWx0aXBsZSBjaGVja3MgZm9yIGR5bmFtaWMgZWxtZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0FycmF5fSBkeW5hbWljRWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXREeW5hbWljT3B0aW9uczogZnVuY3Rpb24gKGl0ZW1zLCBleHRyYVByb3BzLCBnZXRDYXB0aW9uRnJvbVRpdGxlT3JBbHQsIGV4VGh1bWJJbWFnZSkge1xyXG4gICAgICAgICAgICB2YXIgZHluYW1pY0VsZW1lbnRzID0gW107XHJcbiAgICAgICAgICAgIHZhciBhdmFpbGFibGVEeW5hbWljT3B0aW9ucyA9IF9fc3ByZWFkQXJyYXlzKGRlZmF1bHREeW5hbWljT3B0aW9ucywgZXh0cmFQcm9wcyk7XHJcbiAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbChpdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBkeW5hbWljRWwgPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBpdGVtLmF0dHJpYnV0ZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIuc3BlY2lmaWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkeW5hbWljQXR0ciA9IGNvbnZlcnRUb0RhdGEoYXR0ci5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVEeW5hbWljT3B0aW9ucy5pbmRleE9mKGR5bmFtaWNBdHRyKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IGR5bmFtaWNBdHRyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHluYW1pY0VsW2xhYmVsXSA9IGF0dHIudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSAkTEcoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWx0ID0gY3VycmVudEl0ZW0uZmluZCgnaW1nJykuZmlyc3QoKS5hdHRyKCdhbHQnKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IGN1cnJlbnRJdGVtLmF0dHIoJ3RpdGxlJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGh1bWIgPSBleFRodW1iSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICA/IGN1cnJlbnRJdGVtLmF0dHIoZXhUaHVtYkltYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIDogY3VycmVudEl0ZW0uZmluZCgnaW1nJykuZmlyc3QoKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAgICAgICAgIGR5bmFtaWNFbC50aHVtYiA9IHRodW1iO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldENhcHRpb25Gcm9tVGl0bGVPckFsdCAmJiAhZHluYW1pY0VsLnN1Ykh0bWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBkeW5hbWljRWwuc3ViSHRtbCA9IHRpdGxlIHx8IGFsdCB8fCAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGR5bmFtaWNFbC5hbHQgPSBhbHQgfHwgdGl0bGUgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICBkeW5hbWljRWxlbWVudHMucHVzaChkeW5hbWljRWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGR5bmFtaWNFbGVtZW50cztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzTW9iaWxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAvaVBob25lfGlQYWR8aVBvZHxBbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIENoZWNrIHRoZSBnaXZlbiBzcmMgaXMgdmlkZW9cclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3JjXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSB2aWRlbyB0eXBlXHJcbiAgICAgICAgICogRXg6eyB5b3V0dWJlICA6ICBbXCIvL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWMwYXNKZ1N5eGNZXCIsIFwiYzBhc0pnU3l4Y1lcIl0gfVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHRvZG8gLSB0aGlzIGluZm9ybWF0aW9uIGNhbiBiZSBtb3ZlZCB0byBkeW5hbWljRWwgdG8gYXZvaWQgZnJlcXVlbnQgY2FsbHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBpc1ZpZGVvOiBmdW5jdGlvbiAoc3JjLCBpc0hUTUw1VklkZW8sIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICghc3JjKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNIVE1MNVZJZGVvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeSA6LSBkYXRhLXNyYyBpcyBub3QgcHJvdmlkZWQgb24gc2xpZGUgaXRlbSAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGluZGV4ICsgMSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnLiBQbGVhc2UgbWFrZSBzdXJlIHRoZSBzZWxlY3RvciBwcm9wZXJ0eSBpcyBwcm9wZXJseSBjb25maWd1cmVkLiBNb3JlIGluZm8gLSBodHRwczovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vZGVtb3MvaHRtbC1tYXJrdXAvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB5b3V0dWJlID0gc3JjLm1hdGNoKC9cXC9cXC8oPzp3d3dcXC4pP3lvdXR1KD86XFwuYmV8YmVcXC5jb218YmUtbm9jb29raWVcXC5jb20pXFwvKD86d2F0Y2hcXD92PXxlbWJlZFxcLyk/KFthLXowLTlcXC1cXF9cXCVdKykoW1xcJnw/XVtcXFNdKikqL2kpO1xyXG4gICAgICAgICAgICB2YXIgdmltZW8gPSBzcmMubWF0Y2goL1xcL1xcLyg/Ond3d1xcLik/KD86cGxheWVyXFwuKT92aW1lby5jb21cXC8oPzp2aWRlb1xcLyk/KFswLTlhLXpcXC1fXSspKC4qKT8vaSk7XHJcbiAgICAgICAgICAgIHZhciB3aXN0aWEgPSBzcmMubWF0Y2goL2h0dHBzPzpcXC9cXC8oLispPyh3aXN0aWFcXC5jb218d2lcXC5zdClcXC8obWVkaWFzfGVtYmVkKVxcLyhbMC05YS16XFwtX10rKSguKikvKTtcclxuICAgICAgICAgICAgaWYgKHlvdXR1YmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeW91dHViZTogeW91dHViZSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmltZW8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmltZW86IHZpbWVvLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh3aXN0aWEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lzdGlhOiB3aXN0aWEsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH07XG5cbiAgICAvLyBAcmVmIC0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzk3MTg0MS9ob3ctdG8tcmVzaXplLWltYWdlcy1wcm9wb3J0aW9uYWxseS1rZWVwaW5nLXRoZS1hc3BlY3QtcmF0aW9cclxuICAgIC8vIEByZWYgLSBodHRwczovLzJhbGl0eS5jb20vMjAxNy8wNC9zZXR0aW5nLXVwLW11bHRpLXBsYXRmb3JtLXBhY2thZ2VzLmh0bWxcclxuICAgIC8vIFVuaXF1ZSBpZCBmb3IgZWFjaCBnYWxsZXJ5XHJcbiAgICB2YXIgbGdJZCA9IDA7XHJcbiAgICB2YXIgTGlnaHRHYWxsZXJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIExpZ2h0R2FsbGVyeShlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGdPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIC8vIGxpZ2h0R2FsbGVyeSBtb2R1bGVzXHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucyA9IFtdO1xyXG4gICAgICAgICAgICAvLyBmYWxzZSB3aGVuIGxpZ2h0R2FsbGVyeSBsb2FkIGZpcnN0IHNsaWRlIGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMubEdhbGxlcnlPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBUcnVlIHdoZW4gYSBzbGlkZSBhbmltYXRpb24gaXMgaW4gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgdGhpcy5sZ0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbXNJbkRvbSA9IFtdO1xyXG4gICAgICAgICAgICAvLyBTY3JvbGwgdG9wIHZhbHVlIGJlZm9yZSBsaWdodEdhbGxlcnkgaXMgb3BlbmVkXHJcbiAgICAgICAgICAgIHRoaXMucHJldlNjcm9sbFRvcCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEdW1teUltYWdlUmVtb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdPclN3aXBlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGdJZCsrO1xyXG4gICAgICAgICAgICB0aGlzLmxnSWQgPSBsZ0lkO1xyXG4gICAgICAgICAgICB0aGlzLmVsID0gZWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5MR2VsID0gJExHKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlU2V0dGluZ3Mob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRNb2R1bGVzKCk7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gdXNpbmcgZHluYW1pYyBtb2RlLCBlbnN1cmUgZHluYW1pY0VsIGlzIGFuIGFycmF5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmR5bmFtaWMgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZHluYW1pY0VsICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KHRoaXMuc2V0dGluZ3MuZHluYW1pY0VsKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgJ1doZW4gdXNpbmcgZHluYW1pYyBtb2RlLCB5b3UgbXVzdCBhbHNvIGRlZmluZSBkeW5hbWljRWwgYXMgYW4gQXJyYXkuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdhbGxlcnlJdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgdGhpcy5ub3JtYWxpemVTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAvLyBHYWxsZXJ5IGl0ZW1zXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlTGljZW5zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZW5lcmF0ZVNldHRpbmdzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgLy8gbGlnaHRHYWxsZXJ5IHNldHRpbmdzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgbGlnaHRHYWxsZXJ5Q29yZVNldHRpbmdzKSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTW9iaWxlICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgdGhpcy5zZXR0aW5ncy5pc01vYmlsZSA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnNldHRpbmdzLmlzTW9iaWxlKClcclxuICAgICAgICAgICAgICAgIDogdXRpbHMuaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vYmlsZVNldHRpbmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuc2V0dGluZ3MubW9iaWxlU2V0dGluZ3MpLCB0aGlzLnNldHRpbmdzLm1vYmlsZVNldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5zZXR0aW5ncyksIG1vYmlsZVNldHRpbmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5ub3JtYWxpemVTZXR0aW5ncyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaGlkZUNvbnRyb2xPbkVuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5jbG9zYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5zd2lwZVRvQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBbmQgcmVzZXQgaXQgb24gY2xvc2UgdG8gZ2V0IHRoZSBjb3JyZWN0IHZhbHVlIG5leHQgdGltZVxyXG4gICAgICAgICAgICB0aGlzLnpvb21Gcm9tT3JpZ2luID0gdGhpcy5zZXR0aW5ncy56b29tRnJvbU9yaWdpbjtcclxuICAgICAgICAgICAgLy8gQXQgdGhlIG1vbWVudCwgWm9vbSBmcm9tIGltYWdlIGRvZXNuJ3Qgc3VwcG9ydCBkeW5hbWljIG9wdGlvbnNcclxuICAgICAgICAgICAgLy8gQHRvZG8gYWRkIHpvb21Gcm9tT3JpZ2luIHN1cHBvcnQgZm9yIGR5bmFtaWMgaW1hZ2VzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuem9vbUZyb21PcmlnaW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2V0dGluZ3MucHJlbG9hZCBzaG91bGQgbm90IGJlIGdyYXRlciB0aGFuICRpdGVtLmxlbmd0aFxyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnByZWxvYWQgPSBNYXRoLm1pbih0aGlzLnNldHRpbmdzLnByZWxvYWQsIHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2xpZGVWaWRlb0luZm8odGhpcy5nYWxsZXJ5SXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkU3RydWN0dXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmluaXQsIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiB0aGlzLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mua2V5UHJlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5UHJlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmVuYWJsZURyYWcoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmVuYWJsZVN3aXBlKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50cmlnZ2VyUG9zdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICB0aGlzLmFycm93KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1vdXNld2hlZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW91c2V3aGVlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5keW5hbWljKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5HYWxsZXJ5T25JdGVtQ2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5vcGVuR2FsbGVyeU9uSXRlbUNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzXzEuaXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJExHKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gVXNpbmcgZGlmZmVyZW50IG5hbWVzcGFjZSBmb3IgY2xpY2sgYmVjYXVzZSBjbGljayBldmVudCBzaG91bGQgbm90IHVuYmluZCBpZiBzZWxlY3RvciBpcyBzYW1lIG9iamVjdCgndGhpcycpXHJcbiAgICAgICAgICAgICAgICAvLyBAdG9kbyBtYW5hZ2UgYWxsIGV2ZW50IGxpc3RuZXJzIC0gc2hvdWxkIGhhdmUgbmFtZXNwYWNlIHRoYXQgcmVwcmVzZW50IGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkID0gbGdRdWVyeS5nZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtbGctaWQnLCB1dWlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsaWNrLmxnY3VzdG9tLWl0ZW0tXCIgKyB1dWlkLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudEl0ZW1JbmRleCA9IF90aGlzLnNldHRpbmdzLmluZGV4IHx8IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9wZW5HYWxsZXJ5KGN1cnJlbnRJdGVtSW5kZXgsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciB0aGlzXzEgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBVc2luZyBmb3IgbG9vcCBpbnN0ZWFkIG9mIHVzaW5nIGJ1YmJsaW5nIGFzIHRoZSBpdGVtcyBjYW4gYmUgYW55IGh0bWwgZWxlbWVudC5cclxuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBfbG9vcF8xKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogTW9kdWxlcyBhcmUgYnVpbGQgaW5jcmVtZW50YWxseS5cclxuICAgICAgICAgKiBHYWxsZXJ5IHNob3VsZCBiZSBvcGVuZWQgb25seSBvbmNlIGFsbCB0aGUgbW9kdWxlcyBhcmUgaW5pdGlhbGl6ZWQuXHJcbiAgICAgICAgICogdXNlIG1vZHVsZUJ1aWxkVGltZW91dCB0byBtYWtlIHN1cmUgdGhpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuYnVpbGRNb2R1bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wbHVnaW5zLnB1c2gobmV3IHBsdWdpbihfdGhpcywgJExHKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS52YWxpZGF0ZUxpY2Vuc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5saWNlbnNlS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIGxpY2Vuc2Uga2V5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5saWNlbnNlS2V5ID09PSAnMDAwMC0wMDAwLTAwMC0wMDAwJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwibGlnaHRHYWxsZXJ5OiBcIiArIHRoaXMuc2V0dGluZ3MubGljZW5zZUtleSArIFwiIGxpY2Vuc2Uga2V5IGlzIG5vdCB2YWxpZCBmb3IgcHJvZHVjdGlvbiB1c2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0U2xpZGVJdGVtID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkTEcodGhpcy5nZXRTbGlkZUl0ZW1JZChpbmRleCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRTbGlkZUl0ZW1JZCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCIjbGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgaW5kZXg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldElkTmFtZSA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaWQgKyBcIi1cIiArIHRoaXMubGdJZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0RWxlbWVudEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRMRyhcIiNcIiArIHRoaXMuZ2V0SWROYW1lKGlkKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm1hbmFnZVNpbmdsZVNsaWRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctc2luZ2xlLWl0ZW0nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXNpbmdsZS1pdGVtJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuYnVpbGRTdHJ1Y3R1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLiRjb250YWluZXIgJiYgdGhpcy4kY29udGFpbmVyLmdldCgpO1xyXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNvbnRyb2xzID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBzdWJIdG1sQ29udCA9ICcnO1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY29udHJvbHNcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udHJvbHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzID0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLXByZXYnKSArIFwiXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muc3RyaW5nc1sncHJldmlvdXNTbGlkZSddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1wcmV2IGxnLWljb25cXFwiPiBcIiArIHRoaXMuc2V0dGluZ3MucHJldkh0bWwgKyBcIiA8L2J1dHRvbj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1uZXh0JykgKyBcIlxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnN0cmluZ3NbJ25leHRTbGlkZSddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1uZXh0IGxnLWljb25cXFwiPiBcIiArIHRoaXMuc2V0dGluZ3MubmV4dEh0bWwgKyBcIiA8L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gIT09ICcubGctaXRlbScpIHtcclxuICAgICAgICAgICAgICAgIHN1Ykh0bWxDb250ID1cclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImxnLXN1Yi1odG1sXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPjwvZGl2Pic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFkZENsYXNzZXMgPSAnJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dNZWRpYU92ZXJsYXApIHtcclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCByZW1vdmUgc3BhY2UgYmVmb3JlIGxhc3Qgc2luZ2xlIHF1b3RlXHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzc2VzICs9ICdsZy1tZWRpYS1vdmVybGFwICc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFyaWFMYWJlbGxlZGJ5ID0gdGhpcy5zZXR0aW5ncy5hcmlhTGFiZWxsZWRieVxyXG4gICAgICAgICAgICAgICAgPyAnYXJpYS1sYWJlbGxlZGJ5PVwiJyArIHRoaXMuc2V0dGluZ3MuYXJpYUxhYmVsbGVkYnkgKyAnXCInXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgYXJpYURlc2NyaWJlZGJ5ID0gdGhpcy5zZXR0aW5ncy5hcmlhRGVzY3JpYmVkYnlcclxuICAgICAgICAgICAgICAgID8gJ2FyaWEtZGVzY3JpYmVkYnk9XCInICsgdGhpcy5zZXR0aW5ncy5hcmlhRGVzY3JpYmVkYnkgKyAnXCInXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyQ2xhc3NOYW1lID0gXCJsZy1jb250YWluZXIgXCIgKyB0aGlzLnNldHRpbmdzLmFkZENsYXNzICsgXCIgXCIgKyAoZG9jdW1lbnQuYm9keSAhPT0gdGhpcy5zZXR0aW5ncy5jb250YWluZXIgPyAnbGctaW5saW5lJyA6ICcnKTtcclxuICAgICAgICAgICAgdmFyIGNsb3NlSWNvbiA9IHRoaXMuc2V0dGluZ3MuY2xvc2FibGUgJiYgdGhpcy5zZXR0aW5ncy5zaG93Q2xvc2VJY29uXHJcbiAgICAgICAgICAgICAgICA/IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5zdHJpbmdzWydjbG9zZUdhbGxlcnknXSArIFwiXFxcIiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctY2xvc2UnKSArIFwiXFxcIiBjbGFzcz1cXFwibGctY2xvc2UgbGctaWNvblxcXCI+PC9idXR0b24+XCJcclxuICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBtYXhpbWl6ZUljb24gPSB0aGlzLnNldHRpbmdzLnNob3dNYXhpbWl6ZUljb25cclxuICAgICAgICAgICAgICAgID8gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnN0cmluZ3NbJ3RvZ2dsZU1heGltaXplJ10gKyBcIlxcXCIgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLW1heGltaXplJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLW1heGltaXplIGxnLWljb25cXFwiPjwvYnV0dG9uPlwiXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiXCIgKyBjb250YWluZXJDbGFzc05hbWUgKyBcIlxcXCIgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWNvbnRhaW5lcicpICsgXCJcXFwiIHRhYmluZGV4PVxcXCItMVxcXCIgYXJpYS1tb2RhbD1cXFwidHJ1ZVxcXCIgXCIgKyBhcmlhTGFiZWxsZWRieSArIFwiIFwiICsgYXJpYURlc2NyaWJlZGJ5ICsgXCIgcm9sZT1cXFwiZGlhbG9nXFxcIlxcbiAgICAgICAgPlxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWJhY2tkcm9wJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWJhY2tkcm9wXFxcIj48L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1vdXRlcicpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1vdXRlciBsZy11c2UtY3NzMyBsZy1jc3MzIGxnLWhpZGUtaXRlbXMgXCIgKyBhZGRDbGFzc2VzICsgXCIgXFxcIj5cXG5cXG4gICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWNvbnRlbnQnKSArIFwiXFxcIiBjbGFzcz1cXFwibGctY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWlubmVyJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWlubmVyXFxcIj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIFwiICsgY29udHJvbHMgKyBcIlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLXRvb2xiYXInKSArIFwiXFxcIiBjbGFzcz1cXFwibGctdG9vbGJhciBsZy1ncm91cFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICBcIiArIG1heGltaXplSWNvbiArIFwiXFxuICAgICAgICAgICAgICAgICAgICBcIiArIGNsb3NlSWNvbiArIFwiXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIFwiICsgKHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvID09PSAnLmxnLW91dGVyJ1xyXG4gICAgICAgICAgICAgICAgPyBzdWJIdG1sQ29udFxyXG4gICAgICAgICAgICAgICAgOiAnJykgKyBcIlxcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1jb21wb25lbnRzJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWNvbXBvbmVudHNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgXCIgKyAodGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gPT09ICcubGctc3ViLWh0bWwnXHJcbiAgICAgICAgICAgICAgICA/IHN1Ykh0bWxDb250XHJcbiAgICAgICAgICAgICAgICA6ICcnKSArIFwiXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIjtcclxuICAgICAgICAgICAgJExHKHRoaXMuc2V0dGluZ3MuY29udGFpbmVyKS5hcHBlbmQodGVtcGxhdGUpO1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSAhPT0gdGhpcy5zZXR0aW5ncy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgICRMRyh0aGlzLnNldHRpbmdzLmNvbnRhaW5lcikuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub3V0ZXIgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1vdXRlcicpO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ0NvbXBvbmVudHMgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1jb21wb25lbnRzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGJhY2tkcm9wID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctYmFja2Ryb3AnKTtcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctaW5uZXInKTtcclxuICAgICAgICAgICAgdGhpcy4kY29udGVudCA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWNvbnRlbnQnKTtcclxuICAgICAgICAgICAgdGhpcy4kdG9vbGJhciA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLXRvb2xiYXInKTtcclxuICAgICAgICAgICAgdGhpcy4kYmFja2Ryb3AuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uICsgJ21zJyk7XHJcbiAgICAgICAgICAgIHZhciBvdXRlckNsYXNzTmFtZXMgPSB0aGlzLnNldHRpbmdzLm1vZGUgKyBcIiBcIjtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTaW5nbGVTbGlkZUNsYXNzTmFtZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVEcmFnKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRlckNsYXNzTmFtZXMgKz0gJ2xnLWdyYWIgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKG91dGVyQ2xhc3NOYW1lcyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyLmNzcygndHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nLCB0aGlzLnNldHRpbmdzLmVhc2luZyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMuc2V0dGluZ3Muc3BlZWQgKyAnbXMnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZG93bmxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRvb2xiYXIuYXBwZW5kKFwiPGEgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWRvd25sb2FkJykgKyBcIlxcXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIHJlbD1cXFwibm9vcGVuZXJcXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5zdHJpbmdzWydkb3dubG9hZCddICsgXCJcXFwiIGRvd25sb2FkIGNsYXNzPVxcXCJsZy1kb3dubG9hZCBsZy1pY29uXFxcIj48L2E+XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY291bnRlcigpO1xyXG4gICAgICAgICAgICAkTEcod2luZG93KS5vbihcInJlc2l6ZS5sZy5nbG9iYWxcIiArIHRoaXMubGdJZCArIFwiIG9yaWVudGF0aW9uY2hhbmdlLmxnLmdsb2JhbFwiICsgdGhpcy5sZ0lkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWZyZXNoT25SZXNpemUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJhcnMoKTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VDbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVNYXhpbWl6ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRNb2R1bGVzKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnJlZnJlc2hPblJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGdPcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmdhbGxlcnlJdGVtc1t0aGlzLmluZGV4XTtcclxuICAgICAgICAgICAgICAgIHZhciBfX3NsaWRlVmlkZW9JbmZvID0gY3VycmVudEdhbGxlcnlJdGVtLl9fc2xpZGVWaWRlb0luZm87XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24gPSB0aGlzLmdldE1lZGlhQ29udGFpbmVyUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHZhciBfYSA9IHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wXzEgPSBfYS50b3AsIGJvdHRvbSA9IF9hLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlU2l6ZSA9IHV0aWxzLmdldFNpemUodGhpcy5pdGVtc1t0aGlzLmluZGV4XSwgdGhpcy5vdXRlciwgdG9wXzEgKyBib3R0b20sIF9fc2xpZGVWaWRlb0luZm8gJiYgdGhpcy5zZXR0aW5ncy52aWRlb01heFNpemUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9fc2xpZGVWaWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZVZpZGVvU2xpZGUodGhpcy5pbmRleCwgdGhpcy5jdXJyZW50SW1hZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnpvb21Gcm9tT3JpZ2luICYmICF0aGlzLmlzRHVtbXlJbWFnZVJlbW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1nU3R5bGUgPSB0aGlzLmdldER1bW15SW1nU3R5bGVzKHRoaXMuY3VycmVudEltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWN1cnJlbnQgLmxnLWR1bW15LWltZycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzdHlsZScsIGltZ1N0eWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmNvbnRhaW5lclJlc2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUucmVzaXplVmlkZW9TbGlkZSA9IGZ1bmN0aW9uIChpbmRleCwgaW1hZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIHZhciBsZ1ZpZGVvU3R5bGUgPSB0aGlzLmdldFZpZGVvQ29udFN0eWxlKGltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSB0aGlzLmdldFNsaWRlSXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5maW5kKCcubGctdmlkZW8tY29udCcpLmF0dHIoJ3N0eWxlJywgbGdWaWRlb1N0eWxlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwZGF0ZSBzbGlkZXMgZHluYW1pY2FsbHkuXHJcbiAgICAgICAgICogQWRkLCBlZGl0IG9yIGRlbGV0ZSBzbGlkZXMgZHluYW1pY2FsbHkgd2hlbiBsaWdodEdhbGxlcnkgaXMgb3BlbmVkLlxyXG4gICAgICAgICAqIE1vZGlmeSB0aGUgY3VycmVudCBnYWxsZXJ5IGl0ZW1zIGFuZCBwYXNzIGl0IHZpYSB1cGRhdGVTbGlkZXMgbWV0aG9kXHJcbiAgICAgICAgICogQG5vdGVcclxuICAgICAgICAgKiAtIERvIG5vdCBtdXRhdGUgZXhpc3RpbmcgbGlnaHRHYWxsZXJ5IGl0ZW1zIGRpcmVjdGx5LlxyXG4gICAgICAgICAqIC0gQWx3YXlzIHBhc3MgbmV3IGxpc3Qgb2YgZ2FsbGVyeSBpdGVtc1xyXG4gICAgICAgICAqIC0gWW91IG5lZWQgdG8gdGFrZSBjYXJlIG9mIHRodW1ibmFpbHMgb3V0c2lkZSB0aGUgZ2FsbGVyeSBpZiBhbnlcclxuICAgICAgICAgKiAtIHVzZXIgdGhpcyBtZXRob2Qgb25seSBpZiB5b3Ugd2FudCB0byB1cGRhdGUgc2xpZGVzIHdoZW4gdGhlIGdhbGxlcnkgaXMgb3BlbmVkLiBPdGhlcndpc2UsIHVzZSBgcmVmcmVzaCgpYCBtZXRob2QuXHJcbiAgICAgICAgICogQHBhcmFtIGl0ZW1zIEdhbGxlcnkgaXRlbXNcclxuICAgICAgICAgKiBAcGFyYW0gaW5kZXggQWZ0ZXIgdGhlIHVwZGF0ZSBvcGVyYXRpb24sIHdoaWNoIHNsaWRlIGdhbGxlcnkgc2hvdWxkIG5hdmlnYXRlIHRvXHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAvLyBBZGRpbmcgc2xpZGVzIGR5bmFtaWNhbGx5XHJcbiAgICAgICAgICogbGV0IGdhbGxlcnlJdGVtcyA9IFtcclxuICAgICAgICAgKiAvLyBBY2Nlc3MgZXhpc3RpbmcgbGlnaHRHYWxsZXJ5IGl0ZW1zXHJcbiAgICAgICAgICogLy8gZ2FsbGVyeUl0ZW1zIGFyZSBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBpbnRlcm5hbGx5IGZyb20gdGhlIGdhbGxlcnkgSFRNTCBtYXJrdXBcclxuICAgICAgICAgKiAvLyBvciBkaXJlY3RseSBmcm9tIGdhbGxlcnlJdGVtcyB3aGVuIGR5bmFtaWMgZ2FsbGVyeSBpcyB1c2VkXHJcbiAgICAgICAgICogICAuLi5wbHVnaW4uZ2FsbGVyeUl0ZW1zLFxyXG4gICAgICAgICAqICAgICAuLi5bXHJcbiAgICAgICAgICogICAgICAge1xyXG4gICAgICAgICAqICAgICAgICAgc3JjOiAnaW1nL2ltZy0xLnBuZycsXHJcbiAgICAgICAgICogICAgICAgICAgIHRodW1iOiAnaW1nL3RodW1iMS5wbmcnLFxyXG4gICAgICAgICAqICAgICAgICAgfSxcclxuICAgICAgICAgKiAgICAgXSxcclxuICAgICAgICAgKiAgIF07XHJcbiAgICAgICAgICogICBwbHVnaW4udXBkYXRlU2xpZGVzKFxyXG4gICAgICAgICAqICAgICBnYWxsZXJ5SXRlbXMsXHJcbiAgICAgICAgICogICAgIHBsdWdpbi5pbmRleCxcclxuICAgICAgICAgKiAgICk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIC8vIFJlbW92ZSBzbGlkZXMgZHluYW1pY2FsbHlcclxuICAgICAgICAgKiBnYWxsZXJ5SXRlbXMgPSBKU09OLnBhcnNlKFxyXG4gICAgICAgICAqICAgSlNPTi5zdHJpbmdpZnkodXBkYXRlU2xpZGVJbnN0YW5jZS5nYWxsZXJ5SXRlbXMpLFxyXG4gICAgICAgICAqICk7XHJcbiAgICAgICAgICogZ2FsbGVyeUl0ZW1zLnNoaWZ0KCk7XHJcbiAgICAgICAgICogdXBkYXRlU2xpZGVJbnN0YW5jZS51cGRhdGVTbGlkZXMoZ2FsbGVyeUl0ZW1zLCAxKTtcclxuICAgICAgICAgKiBAc2VlIDxhIGhyZWY9XCIvZGVtb3MvdXBkYXRlLXNsaWRlcy9cIj5EZW1vPC9hPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudXBkYXRlU2xpZGVzID0gZnVuY3Rpb24gKGl0ZW1zLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3JjID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdLnNyYztcclxuICAgICAgICAgICAgdGhpcy5nYWxsZXJ5SXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb250cm9scygpO1xyXG4gICAgICAgICAgICB0aGlzLiRpbm5lci5lbXB0eSgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJdGVtc0luRG9tID0gW107XHJcbiAgICAgICAgICAgIHZhciBfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBjdXJyZW50IGluZGV4IGJhc2VkIG9uIHNvdXJjZSB2YWx1ZSBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgICAgdGhpcy5nYWxsZXJ5SXRlbXMuc29tZShmdW5jdGlvbiAoZ2FsbGVyeUl0ZW0sIGl0ZW1JbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbGxlcnlJdGVtLnNyYyA9PT0gY3VycmVudFNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pbmRleCA9IGl0ZW1JbmRleDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1zSW5Eb20gPSB0aGlzLm9yZ2FuaXplU2xpZGVJdGVtcyhfaW5kZXgsIC0xKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ29udGVudChfaW5kZXgsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbShfaW5kZXgpLmFkZENsYXNzKCdsZy1jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBfaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudENvdW50ZXIoX2luZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMudXBkYXRlU2xpZGVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEdldCBnYWxsZXJ5IGl0ZW1zIGJhc2VkIG9uIG11bHRpcGxlIGNvbmRpdGlvbnNcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldEl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBHYWxsZXJ5IGl0ZW1zXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNlbGVjdG9yID09PSAndGhpcycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2godGhpcy5lbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLnNlbGVjdG9yID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zZWxlY3RXaXRoaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RXaXRoaW4gPSAkTEcodGhpcy5zZXR0aW5ncy5zZWxlY3RXaXRoaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHNlbGVjdFdpdGhpblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuZWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNldHRpbmdzLnNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuc2V0dGluZ3Muc2VsZWN0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuZWwuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRpbHMuZ2V0RHluYW1pY09wdGlvbnModGhpcy5pdGVtcywgdGhpcy5zZXR0aW5ncy5leHRyYVByb3BzLCB0aGlzLnNldHRpbmdzLmdldENhcHRpb25Gcm9tVGl0bGVPckFsdCwgdGhpcy5zZXR0aW5ncy5leFRodW1iSW1hZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZHluYW1pY0VsIHx8IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPcGVuIGxpZ2h0R2FsbGVyeS5cclxuICAgICAgICAgKiBPcGVuIGdhbGxlcnkgd2l0aCBzcGVjaWZpYyBzbGlkZSBieSBwYXNzaW5nIGluZGV4IG9mIHRoZSBzbGlkZSBhcyBwYXJhbWV0ZXIuXHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAgLSBpbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gV2hpY2ggaW1hZ2UgbGlnaHRHYWxsZXJ5IHNob3VsZCB6b29tIGZyb21cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogY29uc3QgJGR5bmFtaWNHYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R5bmFtaWMtZ2FsbGVyeS1kZW1vJyk7XHJcbiAgICAgICAgICogY29uc3QgZHluYW1pY0dhbGxlcnkgPSBsaWdodEdhbGxlcnkoJGR5bmFtaWNHYWxsZXJ5LCB7XHJcbiAgICAgICAgICogICAgIGR5bmFtaWM6IHRydWUsXHJcbiAgICAgICAgICogICAgIGR5bmFtaWNFbDogW1xyXG4gICAgICAgICAqICAgICAgICAge1xyXG4gICAgICAgICAqICAgICAgICAgICAgICBzcmM6ICdpbWcvMS5qcGcnLFxyXG4gICAgICAgICAqICAgICAgICAgICAgICB0aHVtYjogJ2ltZy90aHVtYi0xLmpwZycsXHJcbiAgICAgICAgICogICAgICAgICAgICAgIHN1Ykh0bWw6ICc8aDQ+SW1hZ2UgMSB0aXRsZTwvaDQ+PHA+SW1hZ2UgMSBkZXNjcmlwdGlvbnMuPC9wPicsXHJcbiAgICAgICAgICogICAgICAgICB9LFxyXG4gICAgICAgICAqICAgICAgICAgLi4uXHJcbiAgICAgICAgICogICAgIF0sXHJcbiAgICAgICAgICogfSk7XHJcbiAgICAgICAgICogJGR5bmFtaWNHYWxsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAqICAgICAvLyBTdGFydHMgd2l0aCB0aGlyZCBpdGVtLihPcHRpb25hbCkuXHJcbiAgICAgICAgICogICAgIC8vIFRoaXMgaXMgdXNlZnVsIGlmIHlvdSB3YW50IHVzZSBkeW5hbWljIG1vZGUgd2l0aFxyXG4gICAgICAgICAqICAgICAvLyBjdXN0b20gdGh1bWJuYWlscyAodGh1bWJuYWlscyBvdXRzaWRlIGdhbGxlcnkpLFxyXG4gICAgICAgICAqICAgICBkeW5hbWljR2FsbGVyeS5vcGVuR2FsbGVyeSgyKTtcclxuICAgICAgICAgKiB9KTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUub3BlbkdhbGxlcnkgPSBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSB2b2lkIDApIHsgaW5kZXggPSB0aGlzLnNldHRpbmdzLmluZGV4OyB9XHJcbiAgICAgICAgICAgIC8vIHByZXZlbnQgYWNjaWRlbnRhbCBkb3VibGUgZXhlY3V0aW9uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxnT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmxnT3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vdXRlci5nZXQoKS5mb2N1cygpO1xyXG4gICAgICAgICAgICB0aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1oaWRlLWl0ZW1zJyk7XHJcbiAgICAgICAgICAgIC8vIEFkZCBkaXNwbGF5IGJsb2NrLCBidXQgc3RpbGwgaGFzIG9wYWNpdHkgMFxyXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ2xnLXNob3cnKTtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20gPSB0aGlzLmdldEl0ZW1zVG9CZUluc2VydGVkVG9Eb20oaW5kZXgsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbXNJbkRvbSA9IGl0ZW1zVG9CZUluc2VydGVkVG9Eb207XHJcbiAgICAgICAgICAgIHZhciBpdGVtcyA9ICcnO1xyXG4gICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zID0gaXRlbXMgKyAoXCI8ZGl2IGlkPVxcXCJcIiArIGl0ZW0gKyBcIlxcXCIgY2xhc3M9XFxcImxnLWl0ZW1cXFwiPjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyLmFwcGVuZChpdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkSHRtbChpbmRleCk7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSAnJztcclxuICAgICAgICAgICAgdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uID0gdGhpcy5nZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5hbGxvd01lZGlhT3ZlcmxhcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uKHRvcCwgYm90dG9tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgX19zbGlkZVZpZGVvSW5mbyA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XS5fX3NsaWRlVmlkZW9JbmZvO1xyXG4gICAgICAgICAgICBpZiAodGhpcy56b29tRnJvbU9yaWdpbiAmJiBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZVNpemUgPSB1dGlscy5nZXRTaXplKGVsZW1lbnQsIHRoaXMub3V0ZXIsIHRvcCArIGJvdHRvbSwgX19zbGlkZVZpZGVvSW5mbyAmJiB0aGlzLnNldHRpbmdzLnZpZGVvTWF4U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB1dGlscy5nZXRUcmFuc2Zvcm0oZWxlbWVudCwgdGhpcy5vdXRlciwgdG9wLCBib3R0b20sIHRoaXMuY3VycmVudEltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnpvb21Gcm9tT3JpZ2luIHx8ICF0cmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5zdGFydENsYXNzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKGluZGV4KS5yZW1vdmVDbGFzcygnbGctY29tcGxldGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGltZW91dCA9IHRoaXMuc2V0dGluZ3Muem9vbUZyb21PcmlnaW5cclxuICAgICAgICAgICAgICAgID8gMTAwXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbjtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5hZGRDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZU9wZW4pO1xyXG4gICAgICAgICAgICAvLyBhZGQgY2xhc3MgbGctY3VycmVudCB0byByZW1vdmUgaW5pdGlhbCB0cmFuc2l0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKGluZGV4KS5hZGRDbGFzcygnbGctY3VycmVudCcpO1xyXG4gICAgICAgICAgICB0aGlzLmxHYWxsZXJ5T24gPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGN1cnJlbnQgc2Nyb2xsIHRvcCB2YWx1ZSB0byBzY3JvbGwgYmFjayBhZnRlciBjbG9zaW5nIHRoZSBnYWxsZXJ5Li5cclxuICAgICAgICAgICAgdGhpcy5wcmV2U2Nyb2xsVG9wID0gJExHKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gTmVlZCB0byBjaGVjayBib3RoIHpvb21Gcm9tT3JpZ2luIGFuZCB0cmFuc2Zvcm0gdmFsdWVzIGFzIHdlIG5lZWQgdG8gc2V0IHNldCB0aGVcclxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgb3BlbmluZyBhbmltYXRpb24gaWYgdXNlciBtaXNzZWQgdG8gYWRkIHRoZSBsZy1zaXplIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnpvb21Gcm9tT3JpZ2luICYmIHRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGVfMSA9IF90aGlzLmdldFNsaWRlSXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlXzEuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVfMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsZy1zdGFydC1wcm9ncmVzcyBsZy1zdGFydC1lbmQtcHJvZ3Jlc3MnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIF90aGlzLnNldHRpbmdzLnN0YXJ0QW5pbWF0aW9uRHVyYXRpb24gKyAnbXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLXpvb20tZnJvbS1pbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVfMS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgwLCAwLCAwKScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygnbGctc2hvdy1pbicpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgICAgICAgICAgLy8gbGctdmlzaWJsZSBjbGFzcyByZXNldHMgZ2FsbGVyeSBvcGFjaXR5IHRvIDFcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuem9vbUZyb21PcmlnaW4gfHwgIXRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5hZGRDbGFzcygnbGctdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIF90aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaW5pdGlhdGUgc2xpZGUgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIF90aGlzLnNsaWRlKGluZGV4LCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5hZnRlck9wZW4pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkgPT09IHRoaXMuc2V0dGluZ3MuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAkTEcoJ2h0bWwnKS5hZGRDbGFzcygnbGctb24nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTm90ZSAtIENoYW5naW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgbWVkaWEgb24gZXZlcnkgc2xpZGUgdHJhbnNpdGlvbiBjcmVhdGVzIGEgZmxpY2tlcmluZyBlZmZlY3QuXHJcbiAgICAgICAgICogVGhlcmVmb3JlLMKgVGhlIGhlaWdodCBvZiB0aGUgY2FwdGlvbiBpcyBjYWxjdWxhdGVkIGR5bmFtaWNhbGx5LCBvbmx5IG9uY2UgYmFzZWQgb24gdGhlIGZpcnN0IHNsaWRlIGNhcHRpb24uXHJcbiAgICAgICAgICogaWYgeW91IGhhdmUgZHluYW1pYyBjYXB0aW9ucyBmb3IgZWFjaCBtZWRpYSxcclxuICAgICAgICAgKiB5b3UgY2FuIHByb3ZpZGUgYW4gYXBwcm9wcmlhdGUgaGVpZ2h0IGZvciB0aGUgY2FwdGlvbnMgdmlhIGFsbG93TWVkaWFPdmVybGFwIG9wdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0TWVkaWFDb250YWluZXJQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dNZWRpYU92ZXJsYXApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRvcCA9IHRoaXMuJHRvb2xiYXIuZ2V0KCkuY2xpZW50SGVpZ2h0IHx8IDA7XHJcbiAgICAgICAgICAgIHZhciBzdWJIdG1sID0gdGhpcy5vdXRlci5maW5kKCcubGctY29tcG9uZW50cyAubGctc3ViLWh0bWwnKS5nZXQoKTtcclxuICAgICAgICAgICAgdmFyIGNhcHRpb25IZWlnaHQgPSB0aGlzLnNldHRpbmdzLmRlZmF1bHRDYXB0aW9uSGVpZ2h0IHx8XHJcbiAgICAgICAgICAgICAgICAoc3ViSHRtbCAmJiBzdWJIdG1sLmNsaWVudEhlaWdodCkgfHxcclxuICAgICAgICAgICAgICAgIDA7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkNvbnRhaW5lciA9IHRoaXMub3V0ZXIuZmluZCgnLmxnLXRodW1iLW91dGVyJykuZ2V0KCk7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkhlaWdodCA9IHRodW1iQ29udGFpbmVyID8gdGh1bWJDb250YWluZXIuY2xpZW50SGVpZ2h0IDogMDtcclxuICAgICAgICAgICAgdmFyIGJvdHRvbSA9IHRodW1iSGVpZ2h0ICsgY2FwdGlvbkhlaWdodDtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvcDogdG9wLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiBib3R0b20sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnNldE1lZGlhQ29udGFpbmVyUG9zaXRpb24gPSBmdW5jdGlvbiAodG9wLCBib3R0b20pIHtcclxuICAgICAgICAgICAgaWYgKHRvcCA9PT0gdm9pZCAwKSB7IHRvcCA9IDA7IH1cclxuICAgICAgICAgICAgaWYgKGJvdHRvbSA9PT0gdm9pZCAwKSB7IGJvdHRvbSA9IDA7IH1cclxuICAgICAgICAgICAgdGhpcy4kY29udGVudC5jc3MoJ3RvcCcsIHRvcCArICdweCcpLmNzcygnYm90dG9tJywgYm90dG9tICsgJ3B4Jyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmhpZGVCYXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBIaWRlIGNvbnRyb2xsZXJzIGlmIG1vdXNlIGRvZXNuJ3QgbW92ZSBmb3Igc29tZSBwZXJpb2RcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctaGlkZS1pdGVtcycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnNldHRpbmdzLmhpZGVCYXJzRGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIub24oJ21vdXNlbW92ZS5sZyBjbGljay5sZyB0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctaGlkZS1pdGVtcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuaGlkZUJhclRpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaW1lb3V0IHdpbGwgYmUgY2xlYXJlZCBvbiBlYWNoIHNsaWRlIG1vdmVtZW50IGFsc29cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGlkZUJhclRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmFkZENsYXNzKCdsZy1oaWRlLWl0ZW1zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIF90aGlzLnNldHRpbmdzLmhpZGVCYXJzRGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnRyaWdnZXIoJ21vdXNlbW92ZS5sZycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLnNldHRpbmdzLnNob3dCYXJzQWZ0ZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pbml0UGljdHVyZUZpbGwgPSBmdW5jdGlvbiAoJGltZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zdXBwb3J0TGVnYWN5QnJvd3Nlcikge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlZmlsbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBbJGltZy5nZXQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignbGlnaHRHYWxsZXJ5IDotIElmIHlvdSB3YW50IHNyY3NldCBvciBwaWN0dXJlIHRhZyB0byBiZSBzdXBwb3J0ZWQgZm9yIG9sZGVyIGJyb3dzZXIgcGxlYXNlIGluY2x1ZGUgcGljdHVyZWZpbCBqYXZhc2NyaXB0IGxpYnJhcnkgaW4geW91ciBkb2N1bWVudC4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIEBkZXNjIENyZWF0ZSBpbWFnZSBjb3VudGVyXHJcbiAgICAgICAgICogIEV4OiAxLzEwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5jb3VudGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb3VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlckh0bWwgPSBcIjxkaXYgY2xhc3M9XFxcImxnLWNvdW50ZXJcXFwiIHJvbGU9XFxcInN0YXR1c1xcXCIgYXJpYS1saXZlPVxcXCJwb2xpdGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctY291bnRlci1jdXJyZW50JykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWNvdW50ZXItY3VycmVudFxcXCI+XCIgKyAodGhpcy5pbmRleCArIDEpICsgXCIgPC9zcGFuPiAvXFxuICAgICAgICAgICAgICAgIDxzcGFuIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1jb3VudGVyLWFsbCcpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1jb3VudGVyLWFsbFxcXCI+XCIgKyB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggKyBcIiA8L3NwYW4+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmZpbmQodGhpcy5zZXR0aW5ncy5hcHBlbmRDb3VudGVyVG8pLmFwcGVuZChjb3VudGVySHRtbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBAZGVzYyBhZGQgc3ViLWh0bWwgaW50byB0aGUgc2xpZGVcclxuICAgICAgICAgKiAgQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5hZGRIdG1sID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdWJIdG1sO1xyXG4gICAgICAgICAgICB2YXIgc3ViSHRtbFVybDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XS5zdWJIdG1sVXJsKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJIdG1sVXJsID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdLnN1Ykh0bWxVcmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWJIdG1sID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdLnN1Ykh0bWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzdWJIdG1sVXJsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViSHRtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBmaXJzdCBsZXR0ZXIgb2Ygc3ViLWh0bWxcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBmaXJzdCBsZXR0ZXIgc3RhcnRzIHdpdGggLiBvciAjIGdldCB0aGUgaHRtbCBmb3JtIHRoZSBqUXVlcnkgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZMID0gc3ViSHRtbC5zdWJzdHJpbmcoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZMID09PSAnLicgfHwgZkwgPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zdWJIdG1sU2VsZWN0b3JSZWxhdGl2ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViSHRtbCA9ICRMRyh0aGlzLml0ZW1zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lcShpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZChzdWJIdG1sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ykh0bWwgPSAkTEcoc3ViSHRtbCkuZmlyc3QoKS5odG1sKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJIdG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvICE9PSAnLmxnLWl0ZW0nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViSHRtbFVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuZmluZCgnLmxnLXN1Yi1odG1sJykubG9hZChzdWJIdG1sVXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuZmluZCgnLmxnLXN1Yi1odG1sJykuaHRtbChzdWJIdG1sKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSAkTEcodGhpcy5nZXRTbGlkZUl0ZW1JZChpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Ykh0bWxVcmwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUubG9hZChzdWJIdG1sVXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5hcHBlbmQoXCI8ZGl2IGNsYXNzPVxcXCJsZy1zdWItaHRtbFxcXCI+XCIgKyBzdWJIdG1sICsgXCI8L2Rpdj5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQWRkIGxnLWVtcHR5LWh0bWwgY2xhc3MgaWYgdGl0bGUgZG9lc24ndCBleGlzdFxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1Ykh0bWwgIT09ICd1bmRlZmluZWQnICYmIHN1Ykh0bWwgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJIdG1sID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQodGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctZW1wdHktaHRtbCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCh0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1lbXB0eS1odG1sJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYWZ0ZXJBcHBlbmRTdWJIdG1sLCB7XHJcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIEBkZXNjIFByZWxvYWQgc2xpZGVzXHJcbiAgICAgICAgICogIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIGluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqIEB0b2RvIHByZWxvYWQgbm90IHdvcmtpbmcgZm9yIHRoZSBmaXJzdCBzbGlkZSwgQWxzbywgc2hvdWxkIHdvcmsgZm9yIHRoZSBmaXJzdCBhbmQgbGFzdCBzbGlkZSBhcyB3ZWxsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHRoaXMuc2V0dGluZ3MucHJlbG9hZDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggLSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQ29udGVudChpbmRleCArIGksIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8PSB0aGlzLnNldHRpbmdzLnByZWxvYWQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IC0gaiA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbnRlbnQoaW5kZXggLSBqLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0RHVtbXlJbWdTdHlsZXMgPSBmdW5jdGlvbiAoaW1hZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIGlmICghaW1hZ2VTaXplKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ3aWR0aDpcIiArIGltYWdlU2l6ZS53aWR0aCArIFwicHg7XFxuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAtXCIgKyBpbWFnZVNpemUud2lkdGggLyAyICsgXCJweDtcXG4gICAgICAgICAgICAgICAgbWFyZ2luLXRvcDogLVwiICsgaW1hZ2VTaXplLmhlaWdodCAvIDIgKyBcInB4O1xcbiAgICAgICAgICAgICAgICBoZWlnaHQ6XCIgKyBpbWFnZVNpemUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRWaWRlb0NvbnRTdHlsZSA9IGZ1bmN0aW9uIChpbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgaWYgKCFpbWFnZVNpemUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIHJldHVybiBcIndpZHRoOlwiICsgaW1hZ2VTaXplLndpZHRoICsgXCJweDtcXG4gICAgICAgICAgICAgICAgaGVpZ2h0OlwiICsgaW1hZ2VTaXplLmhlaWdodCArIFwicHhcIjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0RHVtbXlJbWFnZUNvbnRlbnQgPSBmdW5jdGlvbiAoJGN1cnJlbnRTbGlkZSwgaW5kZXgsIGFsdCkge1xyXG4gICAgICAgICAgICB2YXIgJGN1cnJlbnRJdGVtO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRJdGVtID0gJExHKHRoaXMuaXRlbXMpLmVxKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJGN1cnJlbnRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2R1bW15SW1nU3JjID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmV4VGh1bWJJbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kdW1teUltZ1NyYyA9ICRjdXJyZW50SXRlbS5maW5kKCdpbWcnKS5maXJzdCgpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2R1bW15SW1nU3JjID0gJGN1cnJlbnRJdGVtLmF0dHIodGhpcy5zZXR0aW5ncy5leFRodW1iSW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFfZHVtbXlJbWdTcmMpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgdmFyIGltZ1N0eWxlID0gdGhpcy5nZXREdW1teUltZ1N0eWxlcyh0aGlzLmN1cnJlbnRJbWFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGR1bW15SW1nQ29udGVudCA9IFwiPGltZyBcIiArIGFsdCArIFwiIHN0eWxlPVxcXCJcIiArIGltZ1N0eWxlICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1kdW1teS1pbWdcXFwiIHNyYz1cXFwiXCIgKyBfZHVtbXlJbWdTcmMgKyBcIlxcXCIgLz5cIjtcclxuICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuYWRkQ2xhc3MoJ2xnLWZpcnN0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1maXJzdC1zbGlkZS1sb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZHVtbXlJbWdDb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuc2V0SW1nTWFya3VwID0gZnVuY3Rpb24gKHNyYywgJGN1cnJlbnRTbGlkZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRHYWxsZXJ5SXRlbSA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgdmFyIGFsdCA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5hbHQsIHNyY3NldCA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zcmNzZXQsIHNpemVzID0gY3VycmVudEdhbGxlcnlJdGVtLnNpemVzLCBzb3VyY2VzID0gY3VycmVudEdhbGxlcnlJdGVtLnNvdXJjZXM7XHJcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgdGh1bWJuYWlsIGFzIGR1bW15IGltYWdlIHdoaWNoIHdpbGwgYmUgcmVzaXplZCB0byBhY3R1YWwgaW1hZ2Ugc2l6ZSBhbmRcclxuICAgICAgICAgICAgLy8gZGlzcGxheWVkIG9uIHRvcCBvZiBhY3R1YWwgaW1hZ2VcclxuICAgICAgICAgICAgdmFyIGltZ0NvbnRlbnQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGFsdEF0dHIgPSBhbHQgPyAnYWx0PVwiJyArIGFsdCArICdcIicgOiAnJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGaXJzdFNsaWRlV2l0aFpvb21BbmltYXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgaW1nQ29udGVudCA9IHRoaXMuZ2V0RHVtbXlJbWFnZUNvbnRlbnQoJGN1cnJlbnRTbGlkZSwgaW5kZXgsIGFsdEF0dHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW1nQ29udGVudCA9IHV0aWxzLmdldEltZ01hcmt1cChpbmRleCwgc3JjLCBhbHRBdHRyLCBzcmNzZXQsIHNpemVzLCBzb3VyY2VzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaW1nTWFya3VwID0gXCI8cGljdHVyZSBjbGFzcz1cXFwibGctaW1nLXdyYXBcXFwiPiBcIiArIGltZ0NvbnRlbnQgKyBcIjwvcGljdHVyZT5cIjtcclxuICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5wcmVwZW5kKGltZ01hcmt1cCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm9uU2xpZGVPYmplY3RMb2FkID0gZnVuY3Rpb24gKCRzbGlkZSwgaXNIVE1MNVZpZGVvV2l0aG91dFBvc3Rlciwgb25Mb2FkLCBvbkVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBtZWRpYU9iamVjdCA9ICRzbGlkZS5maW5kKCcubGctb2JqZWN0JykuZmlyc3QoKTtcclxuICAgICAgICAgICAgaWYgKHV0aWxzLmlzSW1hZ2VMb2FkZWQobWVkaWFPYmplY3QuZ2V0KCkpIHx8XHJcbiAgICAgICAgICAgICAgICBpc0hUTUw1VmlkZW9XaXRob3V0UG9zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBvbkxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lZGlhT2JqZWN0Lm9uKCdsb2FkLmxnIGVycm9yLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uTG9hZCAmJiBvbkxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVkaWFPYmplY3Qub24oJ2Vycm9yLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtICRlbCBDdXJyZW50IHNsaWRlIGl0ZW1cclxuICAgICAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAgICAgKiBAcGFyYW0gZGVsYXkgRGVsYXkgaXMgMCBleGNlcHQgZmlyc3QgdGltZVxyXG4gICAgICAgICAqIEBwYXJhbSBzcGVlZCBTcGVlZCBpcyBzYW1lIGFzIGRlbGF5LCBleGNlcHQgaXQgaXMgMCBpZiBnYWxsZXJ5IGlzIG9wZW5lZCB2aWEgaGFzaCBwbHVnaW5cclxuICAgICAgICAgKiBAcGFyYW0gaXNGaXJzdFNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5vbkxnT2JqZWN0TG9hZCA9IGZ1bmN0aW9uIChjdXJyZW50U2xpZGUsIGluZGV4LCBkZWxheSwgc3BlZWQsIGlzRmlyc3RTbGlkZSwgaXNIVE1MNVZpZGVvV2l0aG91dFBvc3Rlcikge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2xpZGVPYmplY3RMb2FkKGN1cnJlbnRTbGlkZSwgaXNIVE1MNVZpZGVvV2l0aG91dFBvc3RlciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudHJpZ2dlclNsaWRlSXRlbUxvYWQoY3VycmVudFNsaWRlLCBpbmRleCwgZGVsYXksIHNwZWVkLCBpc0ZpcnN0U2xpZGUpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUuYWRkQ2xhc3MoJ2xnLWNvbXBsZXRlIGxnLWNvbXBsZXRlXycpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLmh0bWwoJzxzcGFuIGNsYXNzPVwibGctZXJyb3ItbXNnXCI+T29wcy4uLiBGYWlsZWQgdG8gbG9hZCBjb250ZW50Li4uPC9zcGFuPicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudHJpZ2dlclNsaWRlSXRlbUxvYWQgPSBmdW5jdGlvbiAoJGN1cnJlbnRTbGlkZSwgaW5kZXgsIGRlbGF5LCBzcGVlZCwgaXNGaXJzdFNsaWRlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIC8vIEFkZGluZyBkZWxheSBmb3IgdmlkZW8gc2xpZGVzIHdpdGhvdXQgcG9zdGVyIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UgYW5kIHVzZXIgZXhwZXJpZW5jZVxyXG4gICAgICAgICAgICAvLyBWaWRlb3Mgc2hvdWxkIHN0YXJ0IHBsYXlpbmcgb25jZSBvbmNlIHRoZSBnYWxsZXJ5IGlzIGNvbXBsZXRlbHkgbG9hZGVkXHJcbiAgICAgICAgICAgIHZhciBfc3BlZWQgPSBpc0ZpcnN0U2xpZGUgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkgPT09ICd2aWRlbycgJiZcclxuICAgICAgICAgICAgICAgICFjdXJyZW50R2FsbGVyeUl0ZW0ucG9zdGVyXHJcbiAgICAgICAgICAgICAgICA/IHNwZWVkXHJcbiAgICAgICAgICAgICAgICA6IDA7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5hZGRDbGFzcygnbGctY29tcGxldGUgbGctY29tcGxldGVfJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuc2xpZGVJdGVtTG9hZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBkZWxheTogZGVsYXkgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0U2xpZGU6IGlzRmlyc3RTbGlkZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCBfc3BlZWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pc0ZpcnN0U2xpZGVXaXRoWm9vbUFuaW1hdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhKCF0aGlzLmxHYWxsZXJ5T24gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuem9vbUZyb21PcmlnaW4gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlU2l6ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBBZGQgdmlkZW8gc2xpZGVJbmZvXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5hZGRTbGlkZVZpZGVvSW5mbyA9IGZ1bmN0aW9uIChpdGVtcykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5fX3NsaWRlVmlkZW9JbmZvID0gdXRpbHMuaXNWaWRlbyhlbGVtZW50LnNyYywgISFlbGVtZW50LnZpZGVvLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5fX3NsaWRlVmlkZW9JbmZvICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0dGluZ3MubG9hZFlvdVR1YmVQb3N0ZXIgJiZcclxuICAgICAgICAgICAgICAgICAgICAhZWxlbWVudC5wb3N0ZXIgJiZcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Ll9fc2xpZGVWaWRlb0luZm8ueW91dHViZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucG9zdGVyID0gXCIvL2ltZy55b3V0dWJlLmNvbS92aS9cIiArIGVsZW1lbnQuX19zbGlkZVZpZGVvSW5mby55b3V0dWJlWzFdICsgXCIvbWF4cmVzZGVmYXVsdC5qcGdcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgTG9hZCBzbGlkZSBjb250ZW50IGludG8gc2xpZGUuXHJcbiAgICAgICAgICogIFRoaXMgaXMgdXNlZCB0byBsb2FkIGNvbnRlbnQgaW50byBzbGlkZXMgdGhhdCBpcyBub3QgdmlzaWJsZSB0b29cclxuICAgICAgICAgKiAgQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlLlxyXG4gICAgICAgICAqICBAcGFyYW0ge0Jvb2xlYW59IHJlYyAtIGlmIHRydWUgY2FsbCBsb2FkY29udGVudCgpIGZ1bmN0aW9uIGFnYWluLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubG9hZENvbnRlbnQgPSBmdW5jdGlvbiAoaW5kZXgsIHJlYykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB2YXIgJGN1cnJlbnRTbGlkZSA9ICRMRyh0aGlzLmdldFNsaWRlSXRlbUlkKGluZGV4KSk7XHJcbiAgICAgICAgICAgIHZhciBwb3N0ZXIgPSBjdXJyZW50R2FsbGVyeUl0ZW0ucG9zdGVyLCBzcmNzZXQgPSBjdXJyZW50R2FsbGVyeUl0ZW0uc3Jjc2V0LCBzaXplcyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zaXplcywgc291cmNlcyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zb3VyY2VzO1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gY3VycmVudEdhbGxlcnlJdGVtLnNyYztcclxuICAgICAgICAgICAgdmFyIHZpZGVvID0gY3VycmVudEdhbGxlcnlJdGVtLnZpZGVvO1xyXG4gICAgICAgICAgICB2YXIgX2h0bWw1VmlkZW8gPSB2aWRlbyAmJiB0eXBlb2YgdmlkZW8gPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZSh2aWRlbykgOiB2aWRlbztcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRHYWxsZXJ5SXRlbS5yZXNwb25zaXZlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3JjRHlJdG1zID0gY3VycmVudEdhbGxlcnlJdGVtLnJlc3BvbnNpdmUuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgIHNyYyA9IHV0aWxzLmdldFJlc3BvbnNpdmVTcmMoc3JjRHlJdG1zKSB8fCBzcmM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZpZGVvSW5mbyA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5fX3NsaWRlVmlkZW9JbmZvO1xyXG4gICAgICAgICAgICB2YXIgbGdWaWRlb1N0eWxlID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBpZnJhbWUgPSAhIWN1cnJlbnRHYWxsZXJ5SXRlbS5pZnJhbWU7XHJcbiAgICAgICAgICAgIHZhciBpc0ZpcnN0U2xpZGUgPSAhdGhpcy5sR2FsbGVyeU9uO1xyXG4gICAgICAgICAgICAvLyBkZWxheSBmb3IgYWRkaW5nIGNvbXBsZXRlIGNsYXNzLiBpdCBpcyAwIGV4Y2VwdCBmaXJzdCB0aW1lLlxyXG4gICAgICAgICAgICB2YXIgZGVsYXkgPSAwO1xyXG4gICAgICAgICAgICBpZiAoaXNGaXJzdFNsaWRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy56b29tRnJvbU9yaWdpbiAmJiB0aGlzLmN1cnJlbnRJbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxheSA9IHRoaXMuc2V0dGluZ3Muc3RhcnRBbmltYXRpb25EdXJhdGlvbiArIDEwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXkgPSB0aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb24gKyAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISRjdXJyZW50U2xpZGUuaGFzQ2xhc3MoJ2xnLWxvYWRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlkZW9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uLCB0b3BfMiA9IF9hLnRvcCwgYm90dG9tID0gX2EuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWRlb1NpemUgPSB1dGlscy5nZXRTaXplKHRoaXMuaXRlbXNbaW5kZXhdLCB0aGlzLm91dGVyLCB0b3BfMiArIGJvdHRvbSwgdmlkZW9JbmZvICYmIHRoaXMuc2V0dGluZ3MudmlkZW9NYXhTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICBsZ1ZpZGVvU3R5bGUgPSB0aGlzLmdldFZpZGVvQ29udFN0eWxlKHZpZGVvU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaWZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcmt1cCA9IHV0aWxzLmdldElmcmFtZU1hcmt1cCh0aGlzLnNldHRpbmdzLmlmcmFtZVdpZHRoLCB0aGlzLnNldHRpbmdzLmlmcmFtZUhlaWdodCwgdGhpcy5zZXR0aW5ncy5pZnJhbWVNYXhXaWR0aCwgdGhpcy5zZXR0aW5ncy5pZnJhbWVNYXhIZWlnaHQsIHNyYywgY3VycmVudEdhbGxlcnlJdGVtLmlmcmFtZVRpdGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLnByZXBlbmQobWFya3VwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkdW1teUltZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoYXNTdGFydEFuaW1hdGlvbiA9IGlzRmlyc3RTbGlkZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnpvb21Gcm9tT3JpZ2luICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzU3RhcnRBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHVtbXlJbWcgPSB0aGlzLmdldER1bW15SW1hZ2VDb250ZW50KCRjdXJyZW50U2xpZGUsIGluZGV4LCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXJrdXAgPSB1dGlscy5nZXRWaWRlb1Bvc3Rlck1hcmt1cChwb3N0ZXIsIGR1bW15SW1nIHx8ICcnLCBsZ1ZpZGVvU3R5bGUsIHRoaXMuc2V0dGluZ3Muc3RyaW5nc1sncGxheVZpZGVvJ10sIHZpZGVvSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5wcmVwZW5kKG1hcmt1cCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya3VwID0gXCI8ZGl2IGNsYXNzPVxcXCJsZy12aWRlby1jb250IFxcXCIgc3R5bGU9XFxcIlwiICsgbGdWaWRlb1N0eWxlICsgXCJcXFwiPjwvZGl2PlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUucHJlcGVuZChtYXJrdXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJbWdNYXJrdXAoc3JjLCAkY3VycmVudFNsaWRlLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNyY3NldCB8fCBzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW1nID0gJGN1cnJlbnRTbGlkZS5maW5kKCcubGctb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBpY3R1cmVGaWxsKCRpbWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwb3N0ZXIgfHwgdmlkZW9JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuaGFzVmlkZW8sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDVWaWRlbzogX2h0bWw1VmlkZW8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Bvc3RlcjogISFwb3N0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5hZnRlckFwcGVuZFNsaWRlLCB7IGluZGV4OiBpbmRleCB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxHYWxsZXJ5T24gJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbyA9PT0gJy5sZy1pdGVtJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSHRtbChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRm9yIGZpcnN0IHRpbWUgYWRkIHNvbWUgZGVsYXkgZm9yIGRpc3BsYXlpbmcgdGhlIHN0YXJ0IGFuaW1hdGlvbi5cclxuICAgICAgICAgICAgdmFyIF9zcGVlZCA9IDA7XHJcbiAgICAgICAgICAgIC8vIERvIG5vdCBjaGFuZ2UgdGhlIGRlbGF5IHZhbHVlIGJlY2F1c2UgaXQgaXMgcmVxdWlyZWQgZm9yIHpvb20gcGx1Z2luLlxyXG4gICAgICAgICAgICAvLyBJZiBnYWxsZXJ5IG9wZW5lZCBmcm9tIGRpcmVjdCB1cmwgKGhhc2gpIHNwZWVkIHZhbHVlIHNob3VsZCBiZSAwXHJcbiAgICAgICAgICAgIGlmIChkZWxheSAmJiAhJExHKGRvY3VtZW50LmJvZHkpLmhhc0NsYXNzKCdsZy1mcm9tLWhhc2gnKSkge1xyXG4gICAgICAgICAgICAgICAgX3NwZWVkID0gZGVsYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gT25seSBmb3IgZmlyc3Qgc2xpZGUgYW5kIHpvb21Gcm9tT3JpZ2luIGlzIGVuYWJsZWRcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGaXJzdFNsaWRlV2l0aFpvb21BbmltYXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLXN0YXJ0LWVuZC1wcm9ncmVzcyBsZy1zdGFydC1wcm9ncmVzcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5zdGFydEFuaW1hdGlvbkR1cmF0aW9uICsgMTAwKTtcclxuICAgICAgICAgICAgICAgIGlmICghJGN1cnJlbnRTbGlkZS5oYXNDbGFzcygnbGctbG9hZGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmdldFNsaWRlVHlwZShjdXJyZW50R2FsbGVyeUl0ZW0pID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCh1dGlscy5nZXRJbWdNYXJrdXAoaW5kZXgsIHNyYywgJycsIHNyY3NldCwgc2l6ZXMsIGN1cnJlbnRHYWxsZXJ5SXRlbS5zb3VyY2VzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Jjc2V0IHx8IHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGltZyA9ICRjdXJyZW50U2xpZGUuZmluZCgnLmxnLW9iamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmluaXRQaWN0dXJlRmlsbCgkaW1nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkgPT09ICdpbWFnZScgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChfdGhpcy5nZXRTbGlkZVR5cGUoY3VycmVudEdhbGxlcnlJdGVtKSA9PT0gJ3ZpZGVvJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uTGdPYmplY3RMb2FkKCRjdXJyZW50U2xpZGUsIGluZGV4LCBkZWxheSwgX3NwZWVkLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsb2FkIHJlbWFpbmluZyBzbGlkZXMgb25jZSB0aGUgc2xpZGUgaXMgY29tcGxldGVseSBsb2FkZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uU2xpZGVPYmplY3RMb2FkKCRjdXJyZW50U2xpZGUsICEhKHZpZGVvSW5mbyAmJiB2aWRlb0luZm8uaHRtbDUgJiYgIXBvc3RlciksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkQ29udGVudE9uRmlyc3RTbGlkZUxvYWQoaW5kZXgsICRjdXJyZW50U2xpZGUsIF9zcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9hZENvbnRlbnRPbkZpcnN0U2xpZGVMb2FkKGluZGV4LCAkY3VycmVudFNsaWRlLCBfc3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnNldHRpbmdzLnN0YXJ0QW5pbWF0aW9uRHVyYXRpb24gKyAxMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNMaWRlIGNvbnRlbnQgaGFzIGJlZW4gYWRkZWQgdG8gZG9tXHJcbiAgICAgICAgICAgICRjdXJyZW50U2xpZGUuYWRkQ2xhc3MoJ2xnLWxvYWRlZCcpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNGaXJzdFNsaWRlV2l0aFpvb21BbmltYXRpb24oKSB8fFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkgPT09ICd2aWRlbycgJiYgIXBvc3RlcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25MZ09iamVjdExvYWQoJGN1cnJlbnRTbGlkZSwgaW5kZXgsIGRlbGF5LCBfc3BlZWQsIGlzRmlyc3RTbGlkZSwgISEodmlkZW9JbmZvICYmIHZpZGVvSW5mby5odG1sNSAmJiAhcG9zdGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gV2hlbiBnYWxsZXJ5IGlzIG9wZW5lZCBvbmNlIGNvbnRlbnQgaXMgbG9hZGVkIChzZWNvbmQgdGltZSkgbmVlZCB0byBhZGQgbGctY29tcGxldGUgY2xhc3MgZm9yIGNzcyBzdHlsaW5nXHJcbiAgICAgICAgICAgIGlmICgoIXRoaXMuem9vbUZyb21PcmlnaW4gfHwgIXRoaXMuY3VycmVudEltYWdlU2l6ZSkgJiZcclxuICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuaGFzQ2xhc3MoJ2xnLWNvbXBsZXRlXycpICYmXHJcbiAgICAgICAgICAgICAgICAhdGhpcy5sR2FsbGVyeU9uKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLmFkZENsYXNzKCdsZy1jb21wbGV0ZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBDb250ZW50IGxvYWRlZFxyXG4gICAgICAgICAgICAvLyBOZWVkIHRvIHNldCBsR2FsbGVyeU9uIGJlZm9yZSBjYWxsaW5nIHByZWxvYWQgZnVuY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5sR2FsbGVyeU9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHJlYyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkY3VycmVudFNsaWRlLmhhc0NsYXNzKCdsZy1jb21wbGV0ZV8nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1vYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2xvYWQubGcgZXJyb3IubGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnByZWxvYWQoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVsb2FkKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgUmVtb3ZlIGR1bW15IGltYWdlIGNvbnRlbnQgYW5kIGxvYWQgbmV4dCBzbGlkZXNcclxuICAgICAgICAgKiBDYWxsZWQgb25seSBmb3IgdGhlIGZpcnN0IHRpbWUgaWYgem9vbUZyb21PcmlnaW4gYW5pbWF0aW9uIGlzIGVuYWJsZWRcclxuICAgICAgICAgKiBAcGFyYW0gaW5kZXhcclxuICAgICAgICAgKiBAcGFyYW0gJGN1cnJlbnRTbGlkZVxyXG4gICAgICAgICAqIEBwYXJhbSBzcGVlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubG9hZENvbnRlbnRPbkZpcnN0U2xpZGVMb2FkID0gZnVuY3Rpb24gKGluZGV4LCAkY3VycmVudFNsaWRlLCBzcGVlZCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuZmluZCgnLmxnLWR1bW15LWltZycpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcygnbGctZmlyc3Qtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1maXJzdC1zbGlkZS1sb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5pc0R1bW15SW1hZ2VSZW1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnByZWxvYWQoaW5kZXgpO1xyXG4gICAgICAgICAgICB9LCBzcGVlZCArIDMwMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldEl0ZW1zVG9CZUluc2VydGVkVG9Eb20gPSBmdW5jdGlvbiAoaW5kZXgsIHByZXZJbmRleCwgbnVtYmVyT2ZJdGVtcykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAobnVtYmVyT2ZJdGVtcyA9PT0gdm9pZCAwKSB7IG51bWJlck9mSXRlbXMgPSAwOyB9XHJcbiAgICAgICAgICAgIHZhciBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tID0gW107XHJcbiAgICAgICAgICAgIC8vIE1pbmltdW0gMiBpdGVtcyBzaG91bGQgYmUgdGhlcmVcclxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlTnVtYmVyT2ZJdGVtcyA9IE1hdGgubWF4KG51bWJlck9mSXRlbXMsIDMpO1xyXG4gICAgICAgICAgICBwb3NzaWJsZU51bWJlck9mSXRlbXMgPSBNYXRoLm1pbihwb3NzaWJsZU51bWJlck9mSXRlbXMsIHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHZhciBwcmV2SW5kZXhJdGVtID0gXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyBwcmV2SW5kZXg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggPD0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYWxsZXJ5SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoX2VsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIF90aGlzLmxnSWQgKyBcIi1cIiArIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zVG9CZUluc2VydGVkVG9Eb207XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgKHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDEpIC8gMikge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gaW5kZXg7IGlkeCA+IGluZGV4IC0gcG9zc2libGVOdW1iZXJPZkl0ZW1zIC8gMiAmJiBpZHggPj0gMDsgaWR4LS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyBpZHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG51bWJlck9mRXhpc3RpbmdJdGVtcyA9IGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgcG9zc2libGVOdW1iZXJPZkl0ZW1zIC0gbnVtYmVyT2ZFeGlzdGluZ0l0ZW1zOyBpZHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIChpbmRleCArIGlkeCArIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IGluZGV4OyBpZHggPD0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGlkeCA8IGluZGV4ICsgcG9zc2libGVOdW1iZXJPZkl0ZW1zIC8gMjsgaWR4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyBpZHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG51bWJlck9mRXhpc3RpbmdJdGVtcyA9IGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgcG9zc2libGVOdW1iZXJPZkl0ZW1zIC0gbnVtYmVyT2ZFeGlzdGluZ0l0ZW1zOyBpZHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIChpbmRleCAtIGlkeCAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5sb29wKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgKHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5pbmRleE9mKHByZXZJbmRleEl0ZW0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgcHJldkluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUub3JnYW5pemVTbGlkZUl0ZW1zID0gZnVuY3Rpb24gKGluZGV4LCBwcmV2SW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20gPSB0aGlzLmdldEl0ZW1zVG9CZUluc2VydGVkVG9Eb20oaW5kZXgsIHByZXZJbmRleCwgdGhpcy5zZXR0aW5ncy5udW1iZXJPZlNsaWRlSXRlbXNJbkRvbSk7XHJcbiAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmN1cnJlbnRJdGVtc0luRG9tLmluZGV4T2YoaXRlbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGlubmVyLmFwcGVuZChcIjxkaXYgaWQ9XFxcIlwiICsgaXRlbSArIFwiXFxcIiBjbGFzcz1cXFwibGctaXRlbVxcXCI+PC9kaXY+XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbXNJbkRvbS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5pbmRleE9mKGl0ZW0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRMRyhcIiNcIiArIGl0ZW0pLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zVG9CZUluc2VydGVkVG9Eb207XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgcHJldmlvdXMgaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRQcmV2aW91c1NsaWRlSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtSWQgPSB0aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1jdXJyZW50JylcclxuICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICAgICAgcHJldkluZGV4ID0gcGFyc2VJbnQoY3VycmVudEl0ZW1JZC5zcGxpdCgnLScpWzNdKSB8fCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcHJldkluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJldkluZGV4O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5zZXREb3dubG9hZFZhbHVlID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRvd25sb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhpZGVEb3dubG9hZEJ0biA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5kb3dubG9hZFVybCA9PT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50R2FsbGVyeUl0ZW0uZG93bmxvYWRVcmwgPT09ICdmYWxzZSc7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGlkZURvd25sb2FkQnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctaGlkZS1kb3dubG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRkb3dubG9hZCA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWRvd25sb2FkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctaGlkZS1kb3dubG9hZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICRkb3dubG9hZC5hdHRyKCdocmVmJywgY3VycmVudEdhbGxlcnlJdGVtLmRvd25sb2FkVXJsIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHYWxsZXJ5SXRlbS5zcmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50R2FsbGVyeUl0ZW0uZG93bmxvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGRvd25sb2FkLmF0dHIoJ2Rvd25sb2FkJywgY3VycmVudEdhbGxlcnlJdGVtLmRvd25sb2FkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubWFrZVNsaWRlQW5pbWF0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbiwgY3VycmVudFNsaWRlSXRlbSwgcHJldmlvdXNTbGlkZUl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMubEdhbGxlcnlPbikge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLXNsaWRlLXByb2dyZXNzJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgYWxsIHRyYW5zaXRpb25zXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5hZGRDbGFzcygnbGctbm8tdHJhbnMnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLXByZXYtc2xpZGUgbGctbmV4dC1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9wcmV2c2xpZGVcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVJdGVtLmFkZENsYXNzKCdsZy1wcmV2LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLW5leHQtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5leHQgc2xpZGVcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVJdGVtLmFkZENsYXNzKCdsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLXByZXYtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGdpdmUgNTAgbXMgZm9yIGJyb3dzZXIgdG8gYWRkL3JlbW92ZSBjbGFzc1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuZmluZCgnLmxnLWl0ZW0nKS5yZW1vdmVDbGFzcygnbGctY3VycmVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLWN1cnJlbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXNldCBhbGwgdHJhbnNpdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctbm8tdHJhbnMnKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgfSwgdGhpcy5sR2FsbGVyeU9uID8gdGhpcy5zZXR0aW5ncy5zbGlkZURlbGF5IDogMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHb3RvIGEgc3BlY2lmaWMgc2xpZGUuXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBmcm9tVG91Y2ggLSB0cnVlIGlmIHNsaWRlIGZ1bmN0aW9uIGNhbGxlZCB2aWEgdG91Y2ggZXZlbnQgb3IgbW91c2UgZHJhZ1xyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZnJvbVRodW1iIC0gdHJ1ZSBpZiBzbGlkZSBmdW5jdGlvbiBjYWxsZWQgdmlhIHRodW1ibmFpbCBjbGlja1xyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb24gLSBEaXJlY3Rpb24gb2YgdGhlIHNsaWRlKG5leHQvcHJldilcclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICogIC8vIHRvIGdvIHRvIDNyZCBzbGlkZVxyXG4gICAgICAgICAqICBwbHVnaW4uc2xpZGUoMik7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24gKGluZGV4LCBmcm9tVG91Y2gsIGZyb21UaHVtYiwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwcmV2SW5kZXggPSB0aGlzLmdldFByZXZpb3VzU2xpZGVJbmRleCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJdGVtc0luRG9tID0gdGhpcy5vcmdhbml6ZVNsaWRlSXRlbXMoaW5kZXgsIHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgIC8vIFByZXZlbnQgbXVsdGlwbGUgY2FsbCwgUmVxdWlyZWQgZm9yIGhzaCBwbHVnaW5cclxuICAgICAgICAgICAgaWYgKHRoaXMubEdhbGxlcnlPbiAmJiBwcmV2SW5kZXggPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG51bWJlck9mR2FsbGVyeUl0ZW1zID0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGdCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb3VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50Q291bnRlcihpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFNsaWRlSXRlbSA9IHRoaXMuZ2V0U2xpZGVJdGVtKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c1NsaWRlSXRlbV8xID0gdGhpcy5nZXRTbGlkZUl0ZW0ocHJldkluZGV4KTtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9JbmZvID0gY3VycmVudEdhbGxlcnlJdGVtLl9fc2xpZGVWaWRlb0luZm87XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmF0dHIoJ2RhdGEtbGctc2xpZGUtdHlwZScsIHRoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREb3dubG9hZFZhbHVlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmICh2aWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24sIHRvcF8zID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvU2l6ZSA9IHV0aWxzLmdldFNpemUodGhpcy5pdGVtc1tpbmRleF0sIHRoaXMub3V0ZXIsIHRvcF8zICsgYm90dG9tLCB2aWRlb0luZm8gJiYgdGhpcy5zZXR0aW5ncy52aWRlb01heFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplVmlkZW9TbGlkZShpbmRleCwgdmlkZW9TaXplKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZVNsaWRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkluZGV4OiBwcmV2SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGZyb21Ub3VjaDogISFmcm9tVG91Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbVRodW1iOiAhIWZyb21UaHVtYixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZ0J1c3kgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUJhclRpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJvd0Rpc2FibGUoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBwcmV2SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3ByZXYnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmRleCA+IHByZXZJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAnbmV4dCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFmcm9tVG91Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ha2VTbGlkZUFuaW1hdGlvbihkaXJlY3Rpb24sIGN1cnJlbnRTbGlkZUl0ZW0sIHByZXZpb3VzU2xpZGVJdGVtXzEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLXByZXYtc2xpZGUgbGctY3VycmVudCBsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoUHJldiA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hOZXh0ID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChudW1iZXJPZkdhbGxlcnlJdGVtcyA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hQcmV2ID0gaW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5leHQgPSBpbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBwcmV2SW5kZXggPT09IG51bWJlck9mR2FsbGVyeUl0ZW1zIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOZXh0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoUHJldiA9IG51bWJlck9mR2FsbGVyeUl0ZW1zIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gbnVtYmVyT2ZHYWxsZXJ5SXRlbXMgLSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXYgc2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTmV4dCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaFByZXYgPSBudW1iZXJPZkdhbGxlcnlJdGVtcyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoUHJldiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTmV4dCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdwcmV2Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbSh0b3VjaE5leHQpLmFkZENsYXNzKCdsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbSh0b3VjaFByZXYpLmFkZENsYXNzKCdsZy1wcmV2LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLWN1cnJlbnQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBwdXQgbG9hZCBjb250ZW50IGluIHNldCB0aW1lb3V0IGFzIGl0IG5lZWRzIHRvIGxvYWQgaW1tZWRpYXRlbHkgd2hlbiB0aGUgZ2FsbGVyeSBpcyBvcGVuZWRcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sR2FsbGVyeU9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQ29udGVudChpbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9hZENvbnRlbnQoaW5kZXgsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGl0bGUgaWYgdGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gPT09IGxnLXN1Yi1odG1sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gIT09ICcubGctaXRlbScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFkZEh0bWwoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5zcGVlZCArIDUwICsgKGZyb21Ub3VjaCA/IDAgOiB0aGlzLnNldHRpbmdzLnNsaWRlRGVsYXkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmxnQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU2xpZGVJdGVtXzEucmVtb3ZlQ2xhc3MoJ2xnLXNsaWRlLXByb2dyZXNzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmFmdGVyU2xpZGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldkluZGV4OiBwcmV2SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVRvdWNoOiBmcm9tVG91Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21UaHVtYjogZnJvbVRodW1iLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgKHRoaXMubEdhbGxlcnlPbiA/IHRoaXMuc2V0dGluZ3Muc3BlZWQgKyAxMDAgOiAxMDApICsgKGZyb21Ub3VjaCA/IDAgOiB0aGlzLnNldHRpbmdzLnNsaWRlRGVsYXkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnVwZGF0ZUN1cnJlbnRDb3VudGVyID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWNvdW50ZXItY3VycmVudCcpLmh0bWwoaW5kZXggKyAxICsgJycpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS51cGRhdGVDb3VudGVyVG90YWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWNvdW50ZXItYWxsJykuaHRtbCh0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggKyAnJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldFNsaWRlVHlwZSA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLl9fc2xpZGVWaWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAndmlkZW8nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0uaWZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2lmcmFtZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ltYWdlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS50b3VjaE1vdmUgPSBmdW5jdGlvbiAoc3RhcnRDb29yZHMsIGVuZENvb3JkcywgZSkge1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VYID0gZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVg7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVkgPSBlbmRDb29yZHMucGFnZVkgLSBzdGFydENvb3Jkcy5wYWdlWTtcclxuICAgICAgICAgICAgdmFyIGFsbG93U3dpcGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3dpcGVEaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGFsbG93U3dpcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlWCkgPiAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVEaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dTd2lwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChNYXRoLmFicyhkaXN0YW5jZVkpID4gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3aXBlRGlyZWN0aW9uID0gJ3ZlcnRpY2FsJztcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1N3aXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWFsbG93U3dpcGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0U2xpZGVJdGVtKHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zd2lwZURpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgICAgICBlID09PSBudWxsIHx8IGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IG9wYWNpdHkgYW5kIHRyYW5zaXRpb24gZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBtb3ZlIGN1cnJlbnQgc2xpZGVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKCRjdXJyZW50U2xpZGUsIGRpc3RhbmNlWCwgMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBtb3ZlIG5leHQgYW5kIHByZXYgc2xpZGUgd2l0aCBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSAkY3VycmVudFNsaWRlLmdldCgpLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlV2lkdGhBbW91bnQgPSAod2lkdGggKiAxNSkgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ3V0dGVyID0gc2xpZGVXaWR0aEFtb3VudCAtIE1hdGguYWJzKChkaXN0YW5jZVggKiAxMCkgLyAxMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUodGhpcy5vdXRlci5maW5kKCcubGctcHJldi1zbGlkZScpLmZpcnN0KCksIC13aWR0aCArIGRpc3RhbmNlWCAtIGd1dHRlciwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSh0aGlzLm91dGVyLmZpbmQoJy5sZy1uZXh0LXNsaWRlJykuZmlyc3QoKSwgd2lkdGggKyBkaXN0YW5jZVggKyBndXR0ZXIsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc3dpcGVEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnN3aXBlVG9DbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUgPT09IG51bGwgfHwgZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygnbGctZHJhZ2dpbmctdmVydGljYWwnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3BhY2l0eSA9IDEgLSBNYXRoLmFicyhkaXN0YW5jZVkpIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tkcm9wLmNzcygnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY2FsZSA9IDEgLSBNYXRoLmFicyhkaXN0YW5jZVkpIC8gKHdpbmRvdy5pbm5lcldpZHRoICogMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUoJGN1cnJlbnRTbGlkZSwgMCwgZGlzdGFuY2VZLCBzY2FsZSwgc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZVkpID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctaGlkZS1pdGVtcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS50b3VjaEVuZCA9IGZ1bmN0aW9uIChlbmRDb29yZHMsIHN0YXJ0Q29vcmRzLCBldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIC8vIGtlZXAgc2xpZGUgYW5pbWF0aW9uIGZvciBhbnkgbW9kZSB3aGlsZSBkcmFnZy9zd2lwZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tb2RlICE9PSAnbGctc2xpZGUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1zbGlkZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNldCB0cmFuc2l0aW9uIGR1cmF0aW9uXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnbGctZHJhZ2dpbmctdmVydGljYWwnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1kcmFnZ2luZyBsZy1oaWRlLWl0ZW1zJylcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyaWdnZXJDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc3dpcGVEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlQWJzID0gTWF0aC5hYnMoZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VBYnMgPiBfdGhpcy5zZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5nb1RvTmV4dFNsaWRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlzdGFuY2UgPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlQWJzID4gX3RoaXMuc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMuc3dpcGVEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguYWJzKGVuZENvb3Jkcy5wYWdlWSAtIHN0YXJ0Q29vcmRzLnBhZ2VZKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2V0dGluZ3MuY2xvc2FibGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0dGluZ3Muc3dpcGVUb0Nsb3NlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kYmFja2Ryb3AuY3NzKCdvcGFjaXR5JywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuZmluZCgnLmxnLWl0ZW0nKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyaWdnZXJDbGljayAmJlxyXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKGVuZENvb3Jkcy5wYWdlWCAtIHN0YXJ0Q29vcmRzLnBhZ2VYKSA8IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGNsaWNrIGlmIGRpc3RhbmNlIGlzIGxlc3MgdGhhbiA1IHBpeFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkTEcoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNQb3N0ZXJFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnBvc3RlckNsaWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zd2lwZURpcmVjdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBzbGlkZSBjbGFzcyBvbmNlIGRyYWcvc3dpcGUgaXMgY29tcGxldGVkIGlmIG1vZGUgaXMgbm90IHNsaWRlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vdXRlci5oYXNDbGFzcygnbGctZHJhZ2dpbmcnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldHRpbmdzLm1vZGUgIT09ICdsZy1zbGlkZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5zcGVlZCArIDEwMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmVuYWJsZVN3aXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGVuZENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgaXNTd2lwaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZVN3aXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbm5lci5vbigndG91Y2hzdGFydC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZHJhZ09yU3dpcGVFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGl0ZW0gPSBfdGhpcy5nZXRTbGlkZUl0ZW0oX3RoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV90aGlzLm91dGVyLmhhc0NsYXNzKCdsZy16b29tZWQnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3RoaXMubGdCdXN5ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTd2lwaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hBY3Rpb24gPSAnc3dpcGUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYW5hZ2VTd2lwZUNsYXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVg6IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VZOiBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbm5lci5vbigndG91Y2htb3ZlLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTd2lwaW5nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoQWN0aW9uID09PSAnc3dpcGUnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVg6IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VZOiBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoTW92ZShzdGFydENvb3JkcywgZW5kQ29vcmRzLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpbm5lci5vbigndG91Y2hlbmQubGcnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMudG91Y2hBY3Rpb24gPT09ICdzd2lwZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoRW5kKGVuZENvb3Jkcywgc3RhcnRDb29yZHMsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1N3aXBpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkTEcoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1Bvc3RlckVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5wb3N0ZXJDbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hBY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3dpcGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmVuYWJsZURyYWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgZW5kQ29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBpc0RyYWdpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZW5hYmxlRHJhZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5vbignbW91c2Vkb3duLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kcmFnT3JTd2lwZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkaXRlbSA9IF90aGlzLmdldFNsaWRlSXRlbShfdGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vdXRlci5oYXNDbGFzcygnbGctem9vbWVkJykgJiYgIV90aGlzLmxnQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5sZ0J1c3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5tYW5hZ2VTd2lwZUNsYXNzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYOiBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWTogZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJhZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKiogRml4IGZvciB3ZWJraXQgY3Vyc29yIGlzc3VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNjcyM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmdldCgpLnNjcm9sbExlZnQgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0IC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctZ3JhYicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctZ3JhYmJpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuZHJhZ1N0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJExHKHdpbmRvdykub24oXCJtb3VzZW1vdmUubGcuZ2xvYmFsXCIgKyB0aGlzLmxnSWQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2luZyAmJiBfdGhpcy5sZ09wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVg6IGUucGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWTogZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hNb3ZlKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuZHJhZ01vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJExHKHdpbmRvdykub24oXCJtb3VzZXVwLmxnLmdsb2JhbFwiICsgdGhpcy5sZ0lkLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmxnT3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICRMRyhldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hFbmQoZW5kQ29vcmRzLCBzdGFydENvb3JkcywgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuZHJhZ0VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKF90aGlzLmlzUG9zdGVyRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5wb3N0ZXJDbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgZXhlY3V0aW9uIG9uIGNsaWNrXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0RyYWdpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWdyYWJiaW5nJykuYWRkQ2xhc3MoJ2xnLWdyYWInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS50cmlnZ2VyUG9zdGVyQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5kcmFnT3JTd2lwZUVuYWJsZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pc1Bvc3RlckVsZW1lbnQoJExHKGV2ZW50LnRhcmdldCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnBvc3RlckNsaWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm1hbmFnZVN3aXBlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdG91Y2hOZXh0ID0gdGhpcy5pbmRleCArIDE7XHJcbiAgICAgICAgICAgIHZhciBfdG91Y2hQcmV2ID0gdGhpcy5pbmRleCAtIDE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxvb3AgJiYgdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdG91Y2hQcmV2ID0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdG91Y2hOZXh0ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm91dGVyLmZpbmQoJy5sZy1pdGVtJykucmVtb3ZlQ2xhc3MoJ2xnLW5leHQtc2xpZGUgbGctcHJldi1zbGlkZScpO1xyXG4gICAgICAgICAgICBpZiAoX3RvdWNoUHJldiA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbShfdG91Y2hQcmV2KS5hZGRDbGFzcygnbGctcHJldi1zbGlkZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKF90b3VjaE5leHQpLmFkZENsYXNzKCdsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbyB0byBuZXh0IHNsaWRlXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBmcm9tVG91Y2ggLSB0cnVlIGlmIHNsaWRlIGZ1bmN0aW9uIGNhbGxlZCB2aWEgdG91Y2ggZXZlbnRcclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICogIHBsdWdpbi5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICogQHNlZSA8YSBocmVmPVwiL2RlbW9zL21ldGhvZHMvXCI+RGVtbzwvYT5cclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdvVG9OZXh0U2xpZGUgPSBmdW5jdGlvbiAoZnJvbVRvdWNoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBfbG9vcCA9IHRoaXMuc2V0dGluZ3MubG9vcDtcclxuICAgICAgICAgICAgaWYgKGZyb21Ub3VjaCAmJiB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggPCAzKSB7XHJcbiAgICAgICAgICAgICAgICBfbG9vcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sZ0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ICsgMSA8IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5iZWZvcmVOZXh0U2xpZGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZSh0aGlzLmluZGV4LCAhIWZyb21Ub3VjaCwgZmFsc2UsICduZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2xvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZU5leHRTbGlkZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlKHRoaXMuaW5kZXgsICEhZnJvbVRvdWNoLCBmYWxzZSwgJ25leHQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5zbGlkZUVuZEFuaW1hdGlvbiAmJiAhZnJvbVRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLXJpZ2h0LWVuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1yaWdodC1lbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdvIHRvIHByZXZpb3VzIHNsaWRlc1xyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZnJvbVRvdWNoIC0gdHJ1ZSBpZiBzbGlkZSBmdW5jdGlvbiBjYWxsZWQgdmlhIHRvdWNoIGV2ZW50XHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogIGNvbnN0IHBsdWdpbiA9IGxpZ2h0R2FsbGVyeSh7fSk7XHJcbiAgICAgICAgICogIHBsdWdpbi5nb1RvUHJldlNsaWRlKCk7XHJcbiAgICAgICAgICogQHNlZSA8YSBocmVmPVwiL2RlbW9zL21ldGhvZHMvXCI+RGVtbzwvYT5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ29Ub1ByZXZTbGlkZSA9IGZ1bmN0aW9uIChmcm9tVG91Y2gpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIF9sb29wID0gdGhpcy5zZXR0aW5ncy5sb29wO1xyXG4gICAgICAgICAgICBpZiAoZnJvbVRvdWNoICYmIHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICAgICAgICAgIF9sb29wID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxnQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZVByZXZTbGlkZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVRvdWNoOiBmcm9tVG91Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZSh0aGlzLmluZGV4LCAhIWZyb21Ub3VjaCwgZmFsc2UsICdwcmV2Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2xvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZVByZXZTbGlkZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tVG91Y2g6IGZyb21Ub3VjaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGUodGhpcy5pbmRleCwgISFmcm9tVG91Y2gsIGZhbHNlLCAncHJldicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uICYmICFmcm9tVG91Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctbGVmdC1lbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctbGVmdC1lbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUua2V5UHJlc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICRMRyh3aW5kb3cpLm9uKFwia2V5ZG93bi5sZy5nbG9iYWxcIiArIHRoaXMubGdJZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5sZ09wZW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldHRpbmdzLmVzY0tleSA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGUua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnNldHRpbmdzLmFsbG93TWVkaWFPdmVybGFwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmhhc0NsYXNzKCdsZy1jYW4tdG9nZ2xlJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuaGFzQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5sZ09wZW5lZCAmJiBfdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDM3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmdvVG9OZXh0U2xpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctcHJldicpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdvVG9QcmV2U2xpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLW5leHQnKS5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5hcnJvd0Rpc2FibGUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgLy8gRGlzYWJsZSBhcnJvd3MgaWYgc2V0dGluZ3MuaGlkZUNvbnRyb2xPbkVuZCBpcyB0cnVlXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5sb29wICYmIHRoaXMuc2V0dGluZ3MuaGlkZUNvbnRyb2xPbkVuZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRwcmV2ID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctcHJldicpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRuZXh0ID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA9PT0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG5leHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRuZXh0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkcHJldi5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHByZXYucmVtb3ZlQXR0cignZGlzYWJsZWQnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5zZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiAoJGVsLCB4VmFsdWUsIHlWYWx1ZSwgc2NhbGVYLCBzY2FsZVkpIHtcclxuICAgICAgICAgICAgaWYgKHNjYWxlWCA9PT0gdm9pZCAwKSB7IHNjYWxlWCA9IDE7IH1cclxuICAgICAgICAgICAgaWYgKHNjYWxlWSA9PT0gdm9pZCAwKSB7IHNjYWxlWSA9IDE7IH1cclxuICAgICAgICAgICAgJGVsLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgK1xyXG4gICAgICAgICAgICAgICAgeFZhbHVlICtcclxuICAgICAgICAgICAgICAgICdweCwgJyArXHJcbiAgICAgICAgICAgICAgICB5VmFsdWUgK1xyXG4gICAgICAgICAgICAgICAgJ3B4LCAwcHgpIHNjYWxlM2QoJyArXHJcbiAgICAgICAgICAgICAgICBzY2FsZVggK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICBzY2FsZVkgK1xyXG4gICAgICAgICAgICAgICAgJywgMSknKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubW91c2V3aGVlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGxhc3RDYWxsID0gMDtcclxuICAgICAgICAgICAgdGhpcy5vdXRlci5vbignd2hlZWwubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlLmRlbHRhWSB8fCBfdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3cgLSBsYXN0Q2FsbCA8IDEwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsYXN0Q2FsbCA9IG5vdztcclxuICAgICAgICAgICAgICAgIGlmIChlLmRlbHRhWSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlLmRlbHRhWSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nb1RvUHJldlNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pc1NsaWRlRWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0YXJnZXQuaGFzQ2xhc3MoJ2xnLW91dGVyJykgfHxcclxuICAgICAgICAgICAgICAgIHRhcmdldC5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuaGFzQ2xhc3MoJ2xnLWltZy13cmFwJykpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pc1Bvc3RlckVsZW1lbnQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5QnV0dG9uID0gdGhpcy5nZXRTbGlkZUl0ZW0odGhpcy5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctdmlkZW8tcGxheS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gKHRhcmdldC5oYXNDbGFzcygnbGctdmlkZW8tcG9zdGVyJykgfHxcclxuICAgICAgICAgICAgICAgIHRhcmdldC5oYXNDbGFzcygnbGctdmlkZW8tcGxheS1idXR0b24nKSB8fFxyXG4gICAgICAgICAgICAgICAgKHBsYXlCdXR0b24gJiYgcGxheUJ1dHRvbi5jb250YWlucyh0YXJnZXQuZ2V0KCkpKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNYXhpbWl6ZSBtaW5pbWl6ZSBpbmxpbmUgZ2FsbGVyeS5cclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS50b2dnbGVNYXhpbWl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctbWF4aW1pemUnKS5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kY29udGFpbmVyLnRvZ2dsZUNsYXNzKCdsZy1pbmxpbmUnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlZnJlc2hPblJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuaW52YWxpZGF0ZUl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkTEcoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoXCJjbGljay5sZ2N1c3RvbS1pdGVtLVwiICsgJGVsZW1lbnQuYXR0cignZGF0YS1sZy1pZCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5tYW5hZ2VDbG9zZUdhbGxlcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5jbG9zYWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIG1vdXNlZG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1jbG9zZScpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2xvc2VPblRhcCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgeW91IGRyYWcgdGhlIHNsaWRlIGFuZCByZWxlYXNlIG91dHNpZGUgZ2FsbGVyeSBnZXRzIGNsb3NlIG9uIGNocm9tZVxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIHByZXZlbnRpbmcgdGhpcyBjaGVjayBtb3VzZWRvd24gYW5kIG1vdXNldXAgaGFwcGVuZWQgb24gLmxnLWl0ZW0gb3IgbGctb3V0ZXJcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIub24oJ21vdXNlZG93bi5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICRMRyhlLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzU2xpZGVFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2Vkb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlZG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5vbignbW91c2Vtb3ZlLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdXNlZG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLm9uKCdtb3VzZXVwLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJExHKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNTbGlkZUVsZW1lbnQodGFyZ2V0KSAmJiBtb3VzZWRvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vdXRlci5oYXNDbGFzcygnbGctZHJhZ2dpbmcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2xvc2UgbGlnaHRHYWxsZXJ5IGlmIGl0IGlzIG9wZW5lZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBJZiBjbG9zYWJsZSBpcyBmYWxzZSBpbiB0aGUgc2V0dGluZ3MsIHlvdSBuZWVkIHRvIHBhc3MgdHJ1ZSB2aWEgY2xvc2VHYWxsZXJ5IG1ldGhvZCB0byBmb3JjZSBjbG9zZSBnYWxsZXJ5XHJcbiAgICAgICAgICogQHJldHVybiByZXR1cm5zIHRoZSBlc3RpbWF0ZWQgdGltZSB0byBjbG9zZSBnYWxsZXJ5IGNvbXBsZXRlbHkgaW5jbHVkaW5nIHRoZSBjbG9zZSBhbmltYXRpb24gZHVyYXRpb25cclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICogIHBsdWdpbi5jbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuY2xvc2VHYWxsZXJ5ID0gZnVuY3Rpb24gKGZvcmNlKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sZ09wZW5lZCB8fCAoIXRoaXMuc2V0dGluZ3MuY2xvc2FibGUgJiYgIWZvcmNlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYmVmb3JlQ2xvc2UpO1xyXG4gICAgICAgICAgICAkTEcod2luZG93KS5zY3JvbGxUb3AodGhpcy5wcmV2U2Nyb2xsVG9wKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5pdGVtc1t0aGlzLmluZGV4XTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuem9vbUZyb21PcmlnaW4gJiYgY3VycmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYSA9IHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wXzQgPSBfYS50b3AsIGJvdHRvbSA9IF9hLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgIHZhciBfYiA9IHRoaXMuZ2FsbGVyeUl0ZW1zW3RoaXMuaW5kZXhdLCBfX3NsaWRlVmlkZW9JbmZvID0gX2IuX19zbGlkZVZpZGVvSW5mbywgcG9zdGVyID0gX2IucG9zdGVyO1xyXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlU2l6ZSA9IHV0aWxzLmdldFNpemUoY3VycmVudEl0ZW0sIHRoaXMub3V0ZXIsIHRvcF80ICsgYm90dG9tLCBfX3NsaWRlVmlkZW9JbmZvICYmIHBvc3RlciAmJiB0aGlzLnNldHRpbmdzLnZpZGVvTWF4U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB1dGlscy5nZXRUcmFuc2Zvcm0oY3VycmVudEl0ZW0sIHRoaXMub3V0ZXIsIHRvcF80LCBib3R0b20sIGltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuem9vbUZyb21PcmlnaW4gJiYgdHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1jbG9zaW5nIGxnLXpvb20tZnJvbS1pbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTbGlkZUl0ZW0odGhpcy5pbmRleClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLXN0YXJ0LWVuZC1wcm9ncmVzcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMuc2V0dGluZ3Muc3RhcnRBbmltYXRpb25EdXJhdGlvbiArICdtcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNmb3JtJywgdHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWhpZGUtaXRlbXMnKTtcclxuICAgICAgICAgICAgICAgIC8vIGxnLXpvb20tZnJvbS1pbWFnZSBpcyB1c2VkIGZvciBzZXR0aW5nIHRoZSBvcGFjaXR5IHRvIDEgaWYgem9vbUZyb21PcmlnaW4gaXMgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNsb3NpbmcgaXRlbSBkb2Vzbid0IGhhdmUgdGhlIGxnLXNpemUgYXR0cmlidXRlLCByZW1vdmUgdGhpcyBjbGFzcyB0byBhdm9pZCB0aGUgY2xvc2luZyBjc3MgY29uZmxpY3RzXHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tLWZyb20taW1hZ2UnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBVbmJpbmQgYWxsIGV2ZW50cyBhZGRlZCBieSBsaWdodEdhbGxlcnlcclxuICAgICAgICAgICAgLy8gQHRvZG9cclxuICAgICAgICAgICAgLy90aGlzLiRlbC5vZmYoJy5sZy50bScpO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lNb2R1bGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubEdhbGxlcnlPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzRHVtbXlJbWFnZVJlbW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy56b29tRnJvbU9yaWdpbiA9IHRoaXMuc2V0dGluZ3Muem9vbUZyb21PcmlnaW47XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVCYXJUaW1lb3V0KTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlQmFyVGltZW91dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkTEcoJ2h0bWwnKS5yZW1vdmVDbGFzcygnbGctb24nKTtcclxuICAgICAgICAgICAgdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctdmlzaWJsZSBsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgLy8gUmVzZXR0aW5nIG9wYWNpdHkgdG8gMCBpc2QgcmVxdWlyZWQgYXMgIHZlcnRpY2FsIHN3aXBlIHRvIGNsb3NlIGZ1bmN0aW9uIGFkZHMgaW5saW5lIG9wYWNpdHkuXHJcbiAgICAgICAgICAgIHRoaXMuJGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdpbicpLmNzcygnb3BhY2l0eScsIDApO1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlVGltZW91dCA9IHRoaXMuem9vbUZyb21PcmlnaW4gJiYgdHJhbnNmb3JtXHJcbiAgICAgICAgICAgICAgICA/IE1hdGgubWF4KHRoaXMuc2V0dGluZ3Muc3RhcnRBbmltYXRpb25EdXJhdGlvbiwgdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnbGctc2hvdy1pbicpO1xyXG4gICAgICAgICAgICAvLyBPbmNlIHRoZSBjbG9zaWduIGFuaW1hdGlvbiBpcyBjb21wbGV0ZWQgYW5kIGdhbGxlcnkgaXMgaW52aXNpYmxlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnpvb21Gcm9tT3JpZ2luICYmIHRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tLWZyb20taW1hZ2UnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2xnLXNob3cnKTtcclxuICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gcmVtb3ZlIGlubGluZSBvcGFjaXR5IGFzIGl0IGlzIHVzZWQgaW4gdGhlIHN0eWxlc2hlZXQgYXMgd2VsbFxyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGJhY2tkcm9wXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgX3RoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbiArICdtcycpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoXCJsZy1jbG9zaW5nIFwiICsgX3RoaXMuc2V0dGluZ3Muc3RhcnRDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRTbGlkZUl0ZW0oX3RoaXMuaW5kZXgpLnJlbW92ZUNsYXNzKCdsZy1zdGFydC1lbmQtcHJvZ3Jlc3MnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLiRpbm5lci5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmxnT3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmFmdGVyQ2xvc2UsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6IF90aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLm91dGVyLmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuZ2V0KCkuYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMubGdPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgcmVtb3ZlVGltZW91dCArIDEwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVUaW1lb3V0ICsgMTAwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pbml0TW9kdWxlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBtb2R1bGUuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImxpZ2h0R2FsbGVyeTotIG1ha2Ugc3VyZSBsaWdodEdhbGxlcnkgbW9kdWxlIGlzIHByb3Blcmx5IGluaXRpYXRlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmRlc3Ryb3lNb2R1bGVzID0gZnVuY3Rpb24gKGRlc3Ryb3kpIHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlLmNsb3NlR2FsbGVyeSAmJiBtb2R1bGUuY2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImxpZ2h0R2FsbGVyeTotIG1ha2Ugc3VyZSBsaWdodEdhbGxlcnkgbW9kdWxlIGlzIHByb3Blcmx5IGRlc3Ryb3llZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWZyZXNoIGxpZ2h0R2FsbGVyeSB3aXRoIG5ldyBzZXQgb2YgY2hpbGRyZW4uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gVGhpcyBpcyB1c2VmdWwgdG8gdXBkYXRlIHRoZSBnYWxsZXJ5IHdoZW4gdGhlIGNoaWxkIGVsZW1lbnRzIGFyZSBjaGFuZ2VkIHdpdGhvdXQgY2FsbGluZyBkZXN0cm95IG1ldGhvZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIElmIHlvdSBhcmUgdXNpbmcgZHluYW1pYyBtb2RlLCB5b3UgY2FuIHBhc3MgdGhlIG1vZGlmaWVkIGFycmF5IG9mIGR5bmFtaWNFbCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyIHRvIHJlZnJlc2ggdGhlIGR5bmFtaWMgZ2FsbGVyeVxyXG4gICAgICAgICAqIEBzZWUgPGEgaHJlZj1cIi9kZW1vcy9keW5hbWljLW1vZGUvXCI+RGVtbzwvYT5cclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICogIC8vIERlbGV0ZSBvciBhZGQgY2hpbGRyZW4sIHRoZW4gY2FsbFxyXG4gICAgICAgICAqICBwbHVnaW4ucmVmcmVzaCgpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKGdhbGxlcnlJdGVtcykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZhbGlkYXRlSXRlbXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ2FsbGVyeUl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbGxlcnlJdGVtcyA9IGdhbGxlcnlJdGVtcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FsbGVyeUl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29udHJvbHMoKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuR2FsbGVyeU9uSXRlbUNsaWNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnVwZGF0ZVNsaWRlcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnVwZGF0ZUNvbnRyb2xzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFNsaWRlVmlkZW9JbmZvKHRoaXMuZ2FsbGVyeUl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb3VudGVyVG90YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VTaW5nbGVTbGlkZUNsYXNzTmFtZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVzdHJveSBsaWdodEdhbGxlcnkuXHJcbiAgICAgICAgICogRGVzdHJveSBsaWdodEdhbGxlcnkgYW5kIGl0cyBwbHVnaW4gaW5zdGFuY2VzIGNvbXBsZXRlbHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGlzIG1ldGhvZCBhbHNvIGNhbGxzIENsb3NlR2FsbGVyeSBmdW5jdGlvbiBpbnRlcm5hbGx5LiBSZXR1cm5zIHRoZSB0aW1lIHRha2VzIHRvIGNvbXBsZXRlbHkgY2xvc2UgYW5kIGRlc3Ryb3kgdGhlIGluc3RhbmNlLlxyXG4gICAgICAgICAqIEluIGNhc2UgaWYgeW91IHdhbnQgdG8gcmUtaW5pdGlhbGl6ZSBsaWdodEdhbGxlcnkgcmlnaHQgYWZ0ZXIgZGVzdHJveWluZyBpdCwgaW5pdGlhbGl6ZSBpdCBvbmx5IG9uY2UgdGhlIGRlc3Ryb3kgcHJvY2VzcyBpcyBjb21wbGV0ZWQuXHJcbiAgICAgICAgICogWW91IGNhbiB1c2UgcmVmcmVzaCBtZXRob2QgbW9zdCBvZiB0aGUgdGltZXMuXHJcbiAgICAgICAgICogQGNhdGVnb3J5IGxHUHVibGljTWV0aG9kc1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogIGNvbnN0IHBsdWdpbiA9IGxpZ2h0R2FsbGVyeSgpO1xyXG4gICAgICAgICAqICBwbHVnaW4uZGVzdHJveSgpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VUaW1lb3V0ID0gdGhpcy5jbG9zZUdhbGxlcnkodHJ1ZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZGVzdHJveU1vZHVsZXModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnZhbGlkYXRlSXRlbXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRMRyh3aW5kb3cpLm9mZihcIi5sZy5nbG9iYWxcIiArIF90aGlzLmxnSWQpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuTEdlbC5vZmYoJy5sZycpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGNvbnRhaW5lci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSwgY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNsb3NlVGltZW91dDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBMaWdodEdhbGxlcnk7XHJcbiAgICB9KCkpO1xuXG4gICAgZnVuY3Rpb24gbGlnaHRHYWxsZXJ5KGVsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMaWdodEdhbGxlcnkoZWwsIG9wdGlvbnMpO1xyXG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0R2FsbGVyeTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpZ2h0Z2FsbGVyeS51bWQuanMubWFwXG4iLCIvKiFcbiAqIGxpZ2h0Z2FsbGVyeSB8IDIuNC4wLWJldGEuMCB8IERlY2VtYmVyIDEydGggMjAyMVxuICogaHR0cDovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU2FjaGluIE5lcmF2YXRoO1xuICogQGxpY2Vuc2UgR1BMdjNcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5sZ1RodW1ibmFpbCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG4gICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbiAgICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG4gICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG4gICAgUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbiAgICBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuICAgIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcbiAgICBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xuXG4gICAgdmFyIHRodW1ibmFpbHNTZXR0aW5ncyA9IHtcclxuICAgICAgICB0aHVtYm5haWw6IHRydWUsXHJcbiAgICAgICAgYW5pbWF0ZVRodW1iOiB0cnVlLFxyXG4gICAgICAgIGN1cnJlbnRQYWdlclBvc2l0aW9uOiAnbWlkZGxlJyxcclxuICAgICAgICBhbGlnblRodW1ibmFpbHM6ICdtaWRkbGUnLFxyXG4gICAgICAgIHRodW1iV2lkdGg6IDEwMCxcclxuICAgICAgICB0aHVtYkhlaWdodDogJzgwcHgnLFxyXG4gICAgICAgIHRodW1iTWFyZ2luOiA1LFxyXG4gICAgICAgIGFwcGVuZFRodW1ibmFpbHNUbzogJy5sZy1jb21wb25lbnRzJyxcclxuICAgICAgICB0b2dnbGVUaHVtYjogZmFsc2UsXHJcbiAgICAgICAgZW5hYmxlVGh1bWJEcmFnOiB0cnVlLFxyXG4gICAgICAgIGVuYWJsZVRodW1iU3dpcGU6IHRydWUsXHJcbiAgICAgICAgdGh1bWJuYWlsU3dpcGVUaHJlc2hvbGQ6IDEwLFxyXG4gICAgICAgIGxvYWRZb3VUdWJlVGh1bWJuYWlsOiB0cnVlLFxyXG4gICAgICAgIHlvdVR1YmVUaHVtYlNpemU6IDEsXHJcbiAgICAgICAgdGh1bWJuYWlsUGx1Z2luU3RyaW5nczogeyB0b2dnbGVUaHVtYm5haWxzOiAnVG9nZ2xlIHRodW1ibmFpbHMnIH0sXHJcbiAgICB9O1xuXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIGxpZ2h0R2FsbGVyeSBldmVudHNcclxuICAgICAqIEFsbCBldmVudHMgc2hvdWxkIGJlIGRvY3VtZW50ZWQgaGVyZVxyXG4gICAgICogQmVsb3cgaW50ZXJmYWNlcyBhcmUgdXNlZCB0byBidWlsZCB0aGUgd2Vic2l0ZSBkb2N1bWVudGF0aW9uc1xyXG4gICAgICogKi9cclxuICAgIHZhciBsR0V2ZW50cyA9IHtcclxuICAgICAgICBhZnRlckFwcGVuZFNsaWRlOiAnbGdBZnRlckFwcGVuZFNsaWRlJyxcclxuICAgICAgICBpbml0OiAnbGdJbml0JyxcclxuICAgICAgICBoYXNWaWRlbzogJ2xnSGFzVmlkZW8nLFxyXG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZTogJ2xnQ29udGFpbmVyUmVzaXplJyxcclxuICAgICAgICB1cGRhdGVTbGlkZXM6ICdsZ1VwZGF0ZVNsaWRlcycsXHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTdWJIdG1sOiAnbGdBZnRlckFwcGVuZFN1Ykh0bWwnLFxyXG4gICAgICAgIGJlZm9yZU9wZW46ICdsZ0JlZm9yZU9wZW4nLFxyXG4gICAgICAgIGFmdGVyT3BlbjogJ2xnQWZ0ZXJPcGVuJyxcclxuICAgICAgICBzbGlkZUl0ZW1Mb2FkOiAnbGdTbGlkZUl0ZW1Mb2FkJyxcclxuICAgICAgICBiZWZvcmVTbGlkZTogJ2xnQmVmb3JlU2xpZGUnLFxyXG4gICAgICAgIGFmdGVyU2xpZGU6ICdsZ0FmdGVyU2xpZGUnLFxyXG4gICAgICAgIHBvc3RlckNsaWNrOiAnbGdQb3N0ZXJDbGljaycsXHJcbiAgICAgICAgZHJhZ1N0YXJ0OiAnbGdEcmFnU3RhcnQnLFxyXG4gICAgICAgIGRyYWdNb3ZlOiAnbGdEcmFnTW92ZScsXHJcbiAgICAgICAgZHJhZ0VuZDogJ2xnRHJhZ0VuZCcsXHJcbiAgICAgICAgYmVmb3JlTmV4dFNsaWRlOiAnbGdCZWZvcmVOZXh0U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZVByZXZTbGlkZTogJ2xnQmVmb3JlUHJldlNsaWRlJyxcclxuICAgICAgICBiZWZvcmVDbG9zZTogJ2xnQmVmb3JlQ2xvc2UnLFxyXG4gICAgICAgIGFmdGVyQ2xvc2U6ICdsZ0FmdGVyQ2xvc2UnLFxyXG4gICAgICAgIHJvdGF0ZUxlZnQ6ICdsZ1JvdGF0ZUxlZnQnLFxyXG4gICAgICAgIHJvdGF0ZVJpZ2h0OiAnbGdSb3RhdGVSaWdodCcsXHJcbiAgICAgICAgZmxpcEhvcml6b250YWw6ICdsZ0ZsaXBIb3Jpem9udGFsJyxcclxuICAgICAgICBmbGlwVmVydGljYWw6ICdsZ0ZsaXBWZXJ0aWNhbCcsXHJcbiAgICAgICAgYXV0b3BsYXk6ICdsZ0F1dG9wbGF5JyxcclxuICAgICAgICBhdXRvcGxheVN0YXJ0OiAnbGdBdXRvcGxheVN0YXJ0JyxcclxuICAgICAgICBhdXRvcGxheVN0b3A6ICdsZ0F1dG9wbGF5U3RvcCcsXHJcbiAgICB9O1xuXG4gICAgdmFyIFRodW1ibmFpbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBUaHVtYm5haWwoaW5zdGFuY2UsICRMRykge1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iT3V0ZXJXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJUb3RhbFdpZHRoID0gMDtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gMDtcclxuICAgICAgICAgICAgdGhpcy50aHVtYkNsaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBnZXQgbGlnaHRHYWxsZXJ5IGNvcmUgcGx1Z2luIGluc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMuY29yZSA9IGluc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyA9ICRMRztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gZXh0ZW5kIG1vZHVsZSBkZWZhdWx0IHNldHRpbmdzIHdpdGggbGlnaHRHYWxsZXJ5IGNvcmUgc2V0dGluZ3NcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aHVtYm5haWxzU2V0dGluZ3MpLCB0aGlzLmNvcmUuc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iT3V0ZXJXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJUb3RhbFdpZHRoID1cclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5nYWxsZXJ5SXRlbXMubGVuZ3RoICpcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5zZXR0aW5ncy50aHVtYldpZHRoICsgdGhpcy5zZXR0aW5ncy50aHVtYk1hcmdpbik7XHJcbiAgICAgICAgICAgIC8vIFRodW1ibmFpbCBhbmltYXRpb24gdmFsdWVcclxuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRlVGh1bWJTdHlsZXMoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvcmUuc2V0dGluZ3MuYWxsb3dNZWRpYU92ZXJsYXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudG9nZ2xlVGh1bWIgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy50aHVtYm5haWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGQoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVUaHVtYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZVRodW1iRHJhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZVRodW1iRHJhZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVUaHVtYlN3aXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlVGh1bWJTd2lwZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1iQ2xpY2thYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1iQ2xpY2thYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlVGh1bWJCYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJLZXlQcmVzcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iTWFya3VwKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlQWN0aXZlQ2xhc3NPblNsaWRlQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIuZmlyc3QoKS5vbignY2xpY2subGcgdG91Y2hlbmQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0YXJnZXQgPSBfdGhpcy4kTEcoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkdGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sZy1pdGVtLWlkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJbiBJRTkgYW5kIGJlbGxvdyB0b3VjaCBkb2VzIG5vdCBzdXBwb3J0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR28gdG8gc2xpZGUgaWYgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGNzcyB0cmFuc2l0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aHVtYkNsaWNrYWJsZSAmJiAhX3RoaXMuY29yZS5sZ0J1c3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoJHRhcmdldC5hdHRyKCdkYXRhLWxnLWl0ZW0taWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuc2xpZGUoaW5kZXgsIGZhbHNlLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYmVmb3JlU2xpZGUgKyBcIi50aHVtYlwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2ZW50LmRldGFpbC5pbmRleDtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFuaW1hdGVUaHVtYihpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5iZWZvcmVPcGVuICsgXCIudGh1bWJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMudGh1bWJPdXRlcldpZHRoID0gX3RoaXMuY29yZS5vdXRlci5nZXQoKS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLnVwZGF0ZVNsaWRlcyArIFwiLnRodW1iXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlYnVpbGRUaHVtYm5haWxzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5jb250YWluZXJSZXNpemUgKyBcIi50aHVtYlwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmNvcmUubGdPcGVuZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJPdXRlcldpZHRoID0gX3RoaXMuY29yZS5vdXRlci5nZXQoKS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hbmltYXRlVGh1bWIoX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJPdXRlcldpZHRoID0gX3RoaXMuY29yZS5vdXRlci5nZXQoKS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLnNldFRodW1iTWFya3VwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJPdXRlckNsYXNzTmFtZXMgPSAnbGctdGh1bWItb3V0ZXIgJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxpZ25UaHVtYm5haWxzKSB7XHJcbiAgICAgICAgICAgICAgICB0aHVtYk91dGVyQ2xhc3NOYW1lcyArPSBcImxnLXRodW1iLWFsaWduLVwiICsgdGhpcy5zZXR0aW5ncy5hbGlnblRodW1ibmFpbHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGh0bWwgPSBcIjxkaXYgY2xhc3M9XFxcIlwiICsgdGh1bWJPdXRlckNsYXNzTmFtZXMgKyBcIlxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZy10aHVtYiBsZy1ncm91cFxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLWhhcy10aHVtYicpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hcHBlbmRUaHVtYm5haWxzVG8gPT09ICcubGctY29tcG9uZW50cycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS4kbGdDb21wb25lbnRzLmFwcGVuZChodG1sKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlciA9IHRoaXMuY29yZS5vdXRlci5maW5kKCcubGctdGh1bWItb3V0ZXInKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iID0gdGhpcy5jb3JlLm91dGVyLmZpbmQoJy5sZy10aHVtYicpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVUaHVtYikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy10aHVtYicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMuY29yZS5zZXR0aW5ncy5zcGVlZCArICdtcycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygnd2lkdGgnLCB0aGlzLnRodW1iVG90YWxXaWR0aCArICdweCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFRodW1iSXRlbUh0bWwodGhpcy5jb3JlLmdhbGxlcnlJdGVtcyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmVuYWJsZVRodW1iRHJhZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHRodW1iRHJhZ1V0aWxzID0ge1xyXG4gICAgICAgICAgICAgICAgY29yZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kWDogMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpc01vdmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5ld1RyYW5zbGF0ZVg6IDAsXHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgdG91Y2hNb3ZlVGltZTogMCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlci5hZGRDbGFzcygnbGctZ3JhYicpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctdGh1bWInKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2Vkb3duLmxnLnRodW1iJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aHVtYlRvdGFsV2lkdGggPiBfdGhpcy50aHVtYk91dGVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBleGVjdXRlIG9ubHkgb24gLmxnLW9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5jb3Jkcy5zdGFydFggPSBlLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJDbGlja2FibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAqKiBGaXggZm9yIHdlYmtpdCBjdXJzb3IgaXNzdWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI2NzIzXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0IC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiR0aHVtYk91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctZ3JhYicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctZ3JhYmJpbmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub24oXCJtb3VzZW1vdmUubGcudGh1bWIuZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY29yZS5sZ09wZW5lZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmNvcmRzLmVuZFggPSBlLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzID0gX3RoaXMub25UaHVtYlRvdWNoTW92ZSh0aHVtYkRyYWdVdGlscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9uKFwibW91c2V1cC5sZy50aHVtYi5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmNvcmUubGdPcGVuZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRodW1iRHJhZ1V0aWxzLmlzTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscyA9IF90aGlzLm9uVGh1bWJUb3VjaEVuZCh0aHVtYkRyYWdVdGlscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aHVtYkNsaWNrYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGh1bWJPdXRlci5yZW1vdmVDbGFzcygnbGctZ3JhYmJpbmcnKS5hZGRDbGFzcygnbGctZ3JhYicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuZW5hYmxlVGh1bWJTd2lwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHRodW1iRHJhZ1V0aWxzID0ge1xyXG4gICAgICAgICAgICAgICAgY29yZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kWDogMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpc01vdmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5ld1RyYW5zbGF0ZVg6IDAsXHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICBlbmRUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgdG91Y2hNb3ZlVGltZTogMCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5vbigndG91Y2hzdGFydC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGh1bWJUb3RhbFdpZHRoID4gX3RoaXMudGh1bWJPdXRlcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmNvcmRzLnN0YXJ0WCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aHVtYkNsaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLm9uKCd0b3VjaG1vdmUubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnRodW1iVG90YWxXaWR0aCA+IF90aGlzLnRodW1iT3V0ZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5jb3Jkcy5lbmRYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzID0gX3RoaXMub25UaHVtYlRvdWNoTW92ZSh0aHVtYkRyYWdVdGlscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLm9uKCd0b3VjaGVuZC5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aHVtYkRyYWdVdGlscy5pc01vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMgPSBfdGhpcy5vblRodW1iVG91Y2hFbmQodGh1bWJEcmFnVXRpbHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGh1bWJDbGlja2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFJlYnVpbGQgdGh1bWJuYWlsc1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUucmVidWlsZFRodW1ibmFpbHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0cmFuc2l0aW9uc1xyXG4gICAgICAgICAgICB0aGlzLiR0aHVtYk91dGVyLmFkZENsYXNzKCdsZy1yZWJ1aWxkaW5nLXRodW1ibmFpbHMnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50aHVtYlRvdGFsV2lkdGggPVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChfdGhpcy5zZXR0aW5ncy50aHVtYldpZHRoICsgX3RoaXMuc2V0dGluZ3MudGh1bWJNYXJnaW4pO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGxnVGh1bWIuY3NzKCd3aWR0aCcsIF90aGlzLnRodW1iVG90YWxXaWR0aCArICdweCcpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGxnVGh1bWIuZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFRodW1iSXRlbUh0bWwoX3RoaXMuY29yZS5nYWxsZXJ5SXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZVRodW1iKF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJHRodW1iT3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXJlYnVpbGRpbmctdGh1bWJuYWlscycpO1xyXG4gICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gQHRzLWNoZWNrXHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5zZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgtJyArIHZhbHVlICsgJ3B4LCAwcHgsIDBweCknKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuZ2V0UG9zc2libGVUcmFuc2Zvcm1YID0gZnVuY3Rpb24gKGxlZnQpIHtcclxuICAgICAgICAgICAgaWYgKGxlZnQgPiB0aGlzLnRodW1iVG90YWxXaWR0aCAtIHRoaXMudGh1bWJPdXRlcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0ID0gdGhpcy50aHVtYlRvdGFsV2lkdGggLSB0aGlzLnRodW1iT3V0ZXJXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGVmdCA8IDApIHtcclxuICAgICAgICAgICAgICAgIGxlZnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5hbmltYXRlVGh1bWIgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLmNvcmUuc2V0dGluZ3Muc3BlZWQgKyAnbXMnKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZVRodW1iKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnNldHRpbmdzLmN1cnJlbnRQYWdlclBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWlkZGxlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aHVtYk91dGVyV2lkdGggLyAyIC0gdGhpcy5zZXR0aW5ncy50aHVtYldpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMudGh1bWJPdXRlcldpZHRoIC0gdGhpcy5zZXR0aW5ncy50aHVtYldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID1cclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5zZXR0aW5ncy50aHVtYldpZHRoICsgdGhpcy5zZXR0aW5ncy50aHVtYk1hcmdpbikgKiBpbmRleCAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEgLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZVggPiB0aGlzLnRodW1iVG90YWxXaWR0aCAtIHRoaXMudGh1bWJPdXRlcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gdGhpcy50aHVtYlRvdGFsV2lkdGggLSB0aGlzLnRodW1iT3V0ZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZVggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKHRoaXMudHJhbnNsYXRlWCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUub25UaHVtYlRvdWNoTW92ZSA9IGZ1bmN0aW9uICh0aHVtYkRyYWdVdGlscykge1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYID0gdGhpcy50cmFuc2xhdGVYO1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5pc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMudG91Y2hNb3ZlVGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYIC09XHJcbiAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5jb3Jkcy5lbmRYIC0gdGh1bWJEcmFnVXRpbHMuY29yZHMuc3RhcnRYO1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYID0gdGhpcy5nZXRQb3NzaWJsZVRyYW5zZm9ybVgodGh1bWJEcmFnVXRpbHMubmV3VHJhbnNsYXRlWCk7XHJcbiAgICAgICAgICAgIC8vIG1vdmUgY3VycmVudCBzbGlkZVxyXG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSh0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYKTtcclxuICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlci5hZGRDbGFzcygnbGctZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRodW1iRHJhZ1V0aWxzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5vblRodW1iVG91Y2hFbmQgPSBmdW5jdGlvbiAodGh1bWJEcmFnVXRpbHMpIHtcclxuICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5lbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlci5yZW1vdmVDbGFzcygnbGctZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgdmFyIHRvdWNoRHVyYXRpb24gPSB0aHVtYkRyYWdVdGlscy5lbmRUaW1lLnZhbHVlT2YoKSAtXHJcbiAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5zdGFydFRpbWUudmFsdWVPZigpO1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VYbmV3ID0gdGh1bWJEcmFnVXRpbHMuY29yZHMuZW5kWCAtIHRodW1iRHJhZ1V0aWxzLmNvcmRzLnN0YXJ0WDtcclxuICAgICAgICAgICAgdmFyIHNwZWVkWCA9IE1hdGguYWJzKGRpc3RhbmNlWG5ldykgLyB0b3VjaER1cmF0aW9uO1xyXG4gICAgICAgICAgICAvLyBTb21lIG1hZ2ljYWwgbnVtYmVyc1xyXG4gICAgICAgICAgICAvLyBDYW4gYmUgaW1wcm92ZWRcclxuICAgICAgICAgICAgaWYgKHNwZWVkWCA+IDAuMTUgJiZcclxuICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmVuZFRpbWUudmFsdWVPZigpIC0gdGh1bWJEcmFnVXRpbHMudG91Y2hNb3ZlVGltZSA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVlZFggKz0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChzcGVlZFggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWRYICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzcGVlZFggPVxyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkWCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkWCAqIChNYXRoLmFicyhkaXN0YW5jZVhuZXcpIC8gdGhpcy50aHVtYk91dGVyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBNYXRoLm1pbihzcGVlZFggLSAxLCAyKSArICdzZXR0aW5ncycpO1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VYbmV3ID0gZGlzdGFuY2VYbmV3ICogc3BlZWRYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVYID0gdGhpcy5nZXRQb3NzaWJsZVRyYW5zZm9ybVgodGhpcy50cmFuc2xhdGVYIC0gZGlzdGFuY2VYbmV3KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKHRoaXMudHJhbnNsYXRlWCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVggPSB0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aHVtYkRyYWdVdGlscy5jb3Jkcy5lbmRYIC0gdGh1bWJEcmFnVXRpbHMuY29yZHMuc3RhcnRYKSA8XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnRodW1ibmFpbFN3aXBlVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRodW1iQ2xpY2thYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGh1bWJEcmFnVXRpbHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmdldFRodW1iSHRtbCA9IGZ1bmN0aW9uICh0aHVtYiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlVmlkZW9JbmZvID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF0uX19zbGlkZVZpZGVvSW5mbyB8fCB7fTtcclxuICAgICAgICAgICAgdmFyIHRodW1iSW1nO1xyXG4gICAgICAgICAgICBpZiAoc2xpZGVWaWRlb0luZm8ueW91dHViZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubG9hZFlvdVR1YmVUaHVtYm5haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkltZyA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcvL2ltZy55b3V0dWJlLmNvbS92aS8nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlVmlkZW9JbmZvLnlvdXR1YmVbMV0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MueW91VHViZVRodW1iU2l6ZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLmpwZyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkltZyA9IHRodW1iO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGh1bWJJbWcgPSB0aHVtYjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCI8ZGl2IGRhdGEtbGctaXRlbS1pZD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIiBjbGFzcz1cXFwibGctdGh1bWItaXRlbSBcIiArIChpbmRleCA9PT0gdGhpcy5jb3JlLmluZGV4ID8gJyBhY3RpdmUnIDogJycpICsgXCJcXFwiIFxcbiAgICAgICAgc3R5bGU9XFxcIndpZHRoOlwiICsgdGhpcy5zZXR0aW5ncy50aHVtYldpZHRoICsgXCJweDsgaGVpZ2h0OiBcIiArIHRoaXMuc2V0dGluZ3MudGh1bWJIZWlnaHQgKyBcIjtcXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IFwiICsgdGhpcy5zZXR0aW5ncy50aHVtYk1hcmdpbiArIFwicHg7XFxcIj5cXG4gICAgICAgICAgICA8aW1nIGRhdGEtbGctaXRlbS1pZD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIiBzcmM9XFxcIlwiICsgdGh1bWJJbWcgKyBcIlxcXCIgLz5cXG4gICAgICAgIDwvZGl2PlwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5nZXRUaHVtYkl0ZW1IdG1sID0gZnVuY3Rpb24gKGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkxpc3QgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGh1bWJMaXN0ICs9IHRoaXMuZ2V0VGh1bWJIdG1sKGl0ZW1zW2ldLnRodW1iLCBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGh1bWJMaXN0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5zZXRUaHVtYkl0ZW1IdG1sID0gZnVuY3Rpb24gKGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYkxpc3QgPSB0aGlzLmdldFRodW1iSXRlbUh0bWwoaXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLmh0bWwodGh1bWJMaXN0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuc2V0QW5pbWF0ZVRodW1iU3R5bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlVGh1bWIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctYW5pbWF0ZS10aHVtYicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBNYW5hZ2UgdGh1bWJuYWlsIGFjdGl2ZSBjYWxzc1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUubWFuYWdlQWN0aXZlQ2xhc3NPblNsaWRlQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBtYW5hZ2UgYWN0aXZlIGNsYXNzIGZvciB0aHVtYm5haWxcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYmVmb3JlU2xpZGUgKyBcIi50aHVtYlwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkdGh1bWIgPSBfdGhpcy5jb3JlLm91dGVyLmZpbmQoJy5sZy10aHVtYi1pdGVtJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBldmVudC5kZXRhaWwuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAkdGh1bWIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJHRodW1iLmVxKGluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gVG9nZ2xlIHRodW1ibmFpbCBiYXJcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLnRvZ2dsZVRodW1iQmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy50b2dnbGVUaHVtYikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy1jYW4tdG9nZ2xlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUuJHRvb2xiYXIuYXBwZW5kKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy50aHVtYm5haWxQbHVnaW5TdHJpbmdzWyd0b2dnbGVUaHVtYm5haWxzJ10gK1xyXG4gICAgICAgICAgICAgICAgICAgICdcIiBjbGFzcz1cImxnLXRvZ2dsZS10aHVtYiBsZy1pY29uXCI+PC9idXR0b24+Jyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLXRvZ2dsZS10aHVtYicpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIudG9nZ2xlQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUudGh1bWJLZXlQcmVzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vbihcImtleWRvd24ubGcudGh1bWIuZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY29yZS5sZ09wZW5lZCB8fCAhX3RoaXMuc2V0dGluZ3MudG9nZ2xlVGh1bWIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT09IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudGh1bWJuYWlsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9mZihcIi5sZy50aHVtYi5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLmxnLnRodW1iJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy50aHVtYicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGh1bWJPdXRlci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctaGFzLXRodW1iJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBUaHVtYm5haWw7XHJcbiAgICB9KCkpO1xuXG4gICAgcmV0dXJuIFRodW1ibmFpbDtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxnLXRodW1ibmFpbC51bWQuanMubWFwXG4iLCIvKiFcbiAqIGxpZ2h0Z2FsbGVyeSB8IDIuNC4wLWJldGEuMCB8IERlY2VtYmVyIDEydGggMjAyMVxuICogaHR0cDovL3d3dy5saWdodGdhbGxlcnlqcy5jb20vXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjAgU2FjaGluIE5lcmF2YXRoO1xuICogQGxpY2Vuc2UgR1BMdjNcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5sZ1pvb20gPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG4gICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG4gICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG4gICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG4gICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcblxuICAgIHZhciB6b29tU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgc2NhbGU6IDEsXHJcbiAgICAgICAgem9vbTogdHJ1ZSxcclxuICAgICAgICBhY3R1YWxTaXplOiB0cnVlLFxyXG4gICAgICAgIHNob3dab29tSW5PdXRJY29uczogZmFsc2UsXHJcbiAgICAgICAgYWN0dWFsU2l6ZUljb25zOiB7XHJcbiAgICAgICAgICAgIHpvb21JbjogJ2xnLXpvb20taW4nLFxyXG4gICAgICAgICAgICB6b29tT3V0OiAnbGctem9vbS1vdXQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5hYmxlWm9vbUFmdGVyOiAzMDAsXHJcbiAgICAgICAgem9vbVBsdWdpblN0cmluZ3M6IHtcclxuICAgICAgICAgICAgem9vbUluOiAnWm9vbSBpbicsXHJcbiAgICAgICAgICAgIHpvb21PdXQ6ICdab29tIG91dCcsXHJcbiAgICAgICAgICAgIHZpZXdBY3R1YWxTaXplOiAnVmlldyBhY3R1YWwgc2l6ZScsXHJcbiAgICAgICAgfSxcclxuICAgIH07XG5cbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgbGlnaHRHYWxsZXJ5IGV2ZW50c1xyXG4gICAgICogQWxsIGV2ZW50cyBzaG91bGQgYmUgZG9jdW1lbnRlZCBoZXJlXHJcbiAgICAgKiBCZWxvdyBpbnRlcmZhY2VzIGFyZSB1c2VkIHRvIGJ1aWxkIHRoZSB3ZWJzaXRlIGRvY3VtZW50YXRpb25zXHJcbiAgICAgKiAqL1xyXG4gICAgdmFyIGxHRXZlbnRzID0ge1xyXG4gICAgICAgIGFmdGVyQXBwZW5kU2xpZGU6ICdsZ0FmdGVyQXBwZW5kU2xpZGUnLFxyXG4gICAgICAgIGluaXQ6ICdsZ0luaXQnLFxyXG4gICAgICAgIGhhc1ZpZGVvOiAnbGdIYXNWaWRlbycsXHJcbiAgICAgICAgY29udGFpbmVyUmVzaXplOiAnbGdDb250YWluZXJSZXNpemUnLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlczogJ2xnVXBkYXRlU2xpZGVzJyxcclxuICAgICAgICBhZnRlckFwcGVuZFN1Ykh0bWw6ICdsZ0FmdGVyQXBwZW5kU3ViSHRtbCcsXHJcbiAgICAgICAgYmVmb3JlT3BlbjogJ2xnQmVmb3JlT3BlbicsXHJcbiAgICAgICAgYWZ0ZXJPcGVuOiAnbGdBZnRlck9wZW4nLFxyXG4gICAgICAgIHNsaWRlSXRlbUxvYWQ6ICdsZ1NsaWRlSXRlbUxvYWQnLFxyXG4gICAgICAgIGJlZm9yZVNsaWRlOiAnbGdCZWZvcmVTbGlkZScsXHJcbiAgICAgICAgYWZ0ZXJTbGlkZTogJ2xnQWZ0ZXJTbGlkZScsXHJcbiAgICAgICAgcG9zdGVyQ2xpY2s6ICdsZ1Bvc3RlckNsaWNrJyxcclxuICAgICAgICBkcmFnU3RhcnQ6ICdsZ0RyYWdTdGFydCcsXHJcbiAgICAgICAgZHJhZ01vdmU6ICdsZ0RyYWdNb3ZlJyxcclxuICAgICAgICBkcmFnRW5kOiAnbGdEcmFnRW5kJyxcclxuICAgICAgICBiZWZvcmVOZXh0U2xpZGU6ICdsZ0JlZm9yZU5leHRTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlUHJldlNsaWRlOiAnbGdCZWZvcmVQcmV2U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZUNsb3NlOiAnbGdCZWZvcmVDbG9zZScsXHJcbiAgICAgICAgYWZ0ZXJDbG9zZTogJ2xnQWZ0ZXJDbG9zZScsXHJcbiAgICAgICAgcm90YXRlTGVmdDogJ2xnUm90YXRlTGVmdCcsXHJcbiAgICAgICAgcm90YXRlUmlnaHQ6ICdsZ1JvdGF0ZVJpZ2h0JyxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogJ2xnRmxpcEhvcml6b250YWwnLFxyXG4gICAgICAgIGZsaXBWZXJ0aWNhbDogJ2xnRmxpcFZlcnRpY2FsJyxcclxuICAgICAgICBhdXRvcGxheTogJ2xnQXV0b3BsYXknLFxyXG4gICAgICAgIGF1dG9wbGF5U3RhcnQ6ICdsZ0F1dG9wbGF5U3RhcnQnLFxyXG4gICAgICAgIGF1dG9wbGF5U3RvcDogJ2xnQXV0b3BsYXlTdG9wJyxcclxuICAgIH07XG5cbiAgICB2YXIgWm9vbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBab29tKGluc3RhbmNlLCAkTEcpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IGxpZ2h0R2FsbGVyeSBjb3JlIHBsdWdpbiBpbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUgPSBpbnN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy4kTEcgPSAkTEc7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgem9vbVNldHRpbmdzKSwgdGhpcy5jb3JlLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFwcGVuZCBab29tIGNvbnRyb2xzLiBBY3R1YWwgc2l6ZSwgWm9vbS1pbiwgWm9vbS1vdXRcclxuICAgICAgICBab29tLnByb3RvdHlwZS5idWlsZFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHpvb21JY29ucyA9IHRoaXMuc2V0dGluZ3Muc2hvd1pvb21Jbk91dEljb25zXHJcbiAgICAgICAgICAgICAgICA/IFwiPGJ1dHRvbiBpZD1cXFwiXCIgKyB0aGlzLmNvcmUuZ2V0SWROYW1lKCdsZy16b29tLWluJykgKyBcIlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muem9vbVBsdWdpblN0cmluZ3NbJ3pvb21JbiddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy16b29tLWluIGxnLWljb25cXFwiPjwvYnV0dG9uPjxidXR0b24gaWQ9XFxcIlwiICsgdGhpcy5jb3JlLmdldElkTmFtZSgnbGctem9vbS1vdXQnKSArIFwiXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy56b29tUGx1Z2luU3RyaW5nc1snem9vbUluJ10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLXpvb20tb3V0IGxnLWljb25cXFwiPjwvYnV0dG9uPlwiXHJcbiAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hY3R1YWxTaXplKSB7XHJcbiAgICAgICAgICAgICAgICB6b29tSWNvbnMgKz0gXCI8YnV0dG9uIGlkPVxcXCJcIiArIHRoaXMuY29yZS5nZXRJZE5hbWUoJ2xnLWFjdHVhbC1zaXplJykgKyBcIlxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muem9vbVBsdWdpblN0cmluZ3NbJ3ZpZXdBY3R1YWxTaXplJ10gKyBcIlxcXCIgY2xhc3M9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5hY3R1YWxTaXplSWNvbnMuem9vbUluICsgXCIgbGctaWNvblxcXCI+PC9idXR0b24+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy11c2UtdHJhbnNpdGlvbi1mb3Item9vbScpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJHRvb2xiYXIuZmlyc3QoKS5hcHBlbmQoem9vbUljb25zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIEVuYWJsZSB6b29tIG9wdGlvbiBvbmx5IG9uY2UgdGhlIGltYWdlIGlzIGNvbXBsZXRlbHkgbG9hZGVkXHJcbiAgICAgICAgICogSWYgem9vbUZyb21PcmlnaW4gaXMgdHJ1ZSwgWm9vbSBpcyBlbmFibGVkIG9uY2UgdGhlIGR1bW15IGltYWdlIGhhcyBiZWVuIGluc2VydGVkXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBab29tIHN0eWxlcyBhcmUgZGVmaW5lZCB1bmRlciBsZy16b29tYWJsZSBDU1MgY2xhc3MuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZW5hYmxlWm9vbSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBkZWxheSB3aWxsIGJlIDAgZXhjZXB0IGZpcnN0IHRpbWVcclxuICAgICAgICAgICAgdmFyIF9zcGVlZCA9IHRoaXMuc2V0dGluZ3MuZW5hYmxlWm9vbUFmdGVyICsgZXZlbnQuZGV0YWlsLmRlbGF5O1xyXG4gICAgICAgICAgICAvLyBzZXQgX3NwZWVkIHZhbHVlIDAgaWYgZ2FsbGVyeSBvcGVuZWQgZnJvbSBkaXJlY3QgdXJsIGFuZCBpZiBpdCBpcyBmaXJzdCBzbGlkZVxyXG4gICAgICAgICAgICBpZiAodGhpcy4kTEcoJ2JvZHknKS5maXJzdCgpLmhhc0NsYXNzKCdsZy1mcm9tLWhhc2gnKSAmJlxyXG4gICAgICAgICAgICAgICAgZXZlbnQuZGV0YWlsLmRlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyB3aWxsIGV4ZWN1dGUgb25seSBvbmNlXHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGxnLWZyb20taGFzaCB0byBlbmFibGUgc3RhcnRpbmcgYW5pbWF0aW9uLlxyXG4gICAgICAgICAgICAgICAgdGhpcy4kTEcoJ2JvZHknKS5maXJzdCgpLnJlbW92ZUNsYXNzKCdsZy1mcm9tLWhhc2gnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnpvb21hYmxlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5pc0ltYWdlU2xpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGV2ZW50LmRldGFpbC5pbmRleCkuYWRkQ2xhc3MoJ2xnLXpvb21hYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZGV0YWlsLmluZGV4ID09PSBfdGhpcy5jb3JlLmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0Wm9vbUVzc2VudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgX3NwZWVkICsgMzApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZW5hYmxlWm9vbU9uU2xpZGVJdGVtTG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gQWRkIHpvb21hYmxlIGNsYXNzXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLnNsaWRlSXRlbUxvYWQgKyBcIi56b29tXCIsIHRoaXMuZW5hYmxlWm9vbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldE1vZGlmaWVyID0gZnVuY3Rpb24gKHJvdGF0ZVZhbHVlLCBheGlzLCBlbCkge1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxSb3RhdGUgPSByb3RhdGVWYWx1ZTtcclxuICAgICAgICAgICAgcm90YXRlVmFsdWUgPSBNYXRoLmFicyhyb3RhdGVWYWx1ZSk7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1WYWx1ZXMgPSB0aGlzLmdldEN1cnJlbnRUcmFuc2Zvcm0oZWwpO1xyXG4gICAgICAgICAgICBpZiAoIXRyYW5zZm9ybVZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG1vZGlmaWVyID0gMTtcclxuICAgICAgICAgICAgaWYgKGF4aXMgPT09ICdYJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZsaXBIb3Jpem9udGFsVmFsdWUgPSBNYXRoLnNpZ24ocGFyc2VGbG9hdCh0cmFuc2Zvcm1WYWx1ZXNbMF0pKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gMCB8fCByb3RhdGVWYWx1ZSA9PT0gMTgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocm90YXRlVmFsdWUgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChvcmlnaW5hbFJvdGF0ZSA9PT0gLTkwICYmIGZsaXBIb3Jpem9udGFsVmFsdWUgPT09IDEpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChvcmlnaW5hbFJvdGF0ZSA9PT0gOTAgJiYgZmxpcEhvcml6b250YWxWYWx1ZSA9PT0gLTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBtb2RpZmllciAqIGZsaXBIb3Jpem9udGFsVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmxpcFZlcnRpY2FsVmFsdWUgPSBNYXRoLnNpZ24ocGFyc2VGbG9hdCh0cmFuc2Zvcm1WYWx1ZXNbM10pKTtcclxuICAgICAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gMCB8fCByb3RhdGVWYWx1ZSA9PT0gMTgwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocm90YXRlVmFsdWUgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpblggPSBwYXJzZUZsb2F0KHRyYW5zZm9ybVZhbHVlc1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpbk1pbnVzWCA9IHBhcnNlRmxvYXQodHJhbnNmb3JtVmFsdWVzWzJdKTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RpZmllciA9IE1hdGguc2lnbihzaW5YICogc2luTWludXNYICogb3JpZ2luYWxSb3RhdGUgKiBmbGlwVmVydGljYWxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb2RpZmllciA9IG1vZGlmaWVyICogZmxpcFZlcnRpY2FsVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1vZGlmaWVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0SW1hZ2VTaXplID0gZnVuY3Rpb24gKCRpbWFnZSwgcm90YXRlVmFsdWUsIGF4aXMpIHtcclxuICAgICAgICAgICAgdmFyIGltYWdlU2l6ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICB5OiAnb2Zmc2V0SGVpZ2h0JyxcclxuICAgICAgICAgICAgICAgIHg6ICdvZmZzZXRXaWR0aCcsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVWYWx1ZSkgPT09IDkwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTd2FwIGF4aXNcclxuICAgICAgICAgICAgICAgIGlmIChheGlzID09PSAneCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBheGlzID0gJ3knO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXhpcyA9ICd4JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJGltYWdlW2ltYWdlU2l6ZXNbYXhpc11dO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0RHJhZ0NvcmRzID0gZnVuY3Rpb24gKGUsIHJvdGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICB5OiBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICB5OiBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0U3dpcGVDb3JkcyA9IGZ1bmN0aW9uIChlLCByb3RhdGVWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgeCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcclxuICAgICAgICAgICAgdmFyIHkgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogeSxcclxuICAgICAgICAgICAgICAgICAgICB5OiB4LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0RHJhZ0FsbG93ZWRBeGlzZXMgPSBmdW5jdGlvbiAocm90YXRlVmFsdWUsIHNjYWxlKSB7XHJcbiAgICAgICAgICAgIHNjYWxlID0gc2NhbGUgfHwgdGhpcy5zY2FsZSB8fCAxO1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dZID0gdGhpcy5pbWFnZVlTaXplICogc2NhbGUgPiB0aGlzLmNvbnRhaW5lclJlY3QuaGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dYID0gdGhpcy5pbWFnZVhTaXplICogc2NhbGUgPiB0aGlzLmNvbnRhaW5lclJlY3Qud2lkdGg7XHJcbiAgICAgICAgICAgIGlmIChyb3RhdGVWYWx1ZSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dYOiBhbGxvd1ksXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dZOiBhbGxvd1gsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1g6IGFsbG93WCxcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1k6IGFsbG93WSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gICAgICAgICAqIEByZXR1cm4gbWF0cml4KGNvcyhYKSwgc2luKFgpLCAtc2luKFgpLCBjb3MoWCksIDAsIDApO1xyXG4gICAgICAgICAqIEdldCB0aGUgY3VycmVudCB0cmFuc2Zvcm0gdmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRDdXJyZW50VHJhbnNmb3JtID0gZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3QgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHZhciB0bSA9IHN0LmdldFByb3BlcnR5VmFsdWUoJy13ZWJraXQtdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy1tb3otdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy1tcy10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW8tdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICAnbm9uZSc7XHJcbiAgICAgICAgICAgIGlmICh0bSAhPT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG0uc3BsaXQoJygnKVsxXS5zcGxpdCgnKScpWzBdLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0Q3VycmVudFJvdGF0aW9uID0gZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB0aGlzLmdldEN1cnJlbnRUcmFuc2Zvcm0oZWwpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLmF0YW4yKHBhcnNlRmxvYXQodmFsdWVzWzFdKSwgcGFyc2VGbG9hdCh2YWx1ZXNbMF0pKSAqXHJcbiAgICAgICAgICAgICAgICAgICAgKDE4MCAvIE1hdGguUEkpKTtcclxuICAgICAgICAgICAgICAgIC8vIElmIHlvdSB3YW50IHJvdGF0ZSBpbiAzNjBcclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuIChhbmdsZSA8IDAgPyBhbmdsZSArIDM2MCA6IGFuZ2xlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnNldFpvb21Fc3NlbnRpYWxzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJGltYWdlID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1hZ2UnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVFbCA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy1yb3RhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZSA9IHRoaXMuZ2V0Q3VycmVudFJvdGF0aW9uKHJvdGF0ZUVsKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZVlTaXplID0gdGhpcy5nZXRJbWFnZVNpemUoJGltYWdlLmdldCgpLCB0aGlzLnJvdGF0ZVZhbHVlLCAneScpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlWFNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSgkaW1hZ2UuZ2V0KCksIHRoaXMucm90YXRlVmFsdWUsICd4Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyUmVjdCA9IHRoaXMuY29yZS5vdXRlci5nZXQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RpZmllclggPSB0aGlzLmdldE1vZGlmaWVyKHRoaXMucm90YXRlVmFsdWUsICdYJywgcm90YXRlRWwpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyWSA9IHRoaXMuZ2V0TW9kaWZpZXIodGhpcy5yb3RhdGVWYWx1ZSwgJ1knLCByb3RhdGVFbCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBJbWFnZSB6b29tXHJcbiAgICAgICAgICogVHJhbnNsYXRlIHRoZSB3cmFwIGFuZCBzY2FsZSB0aGUgaW1hZ2UgdG8gZ2V0IGJldHRlciB1c2VyIGV4cGVyaWVuY2VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzY2FsZSAtIFpvb20gZGVjcmVtZW50L2luY3JlbWVudCB2YWx1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnpvb21JbWFnZSA9IGZ1bmN0aW9uIChzY2FsZSkge1xyXG4gICAgICAgICAgICAvLyBGaW5kIG9mZnNldCBtYW51YWxseSB0byBhdm9pZCBpc3N1ZSBhZnRlciB6b29tXHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRYID0gKHRoaXMuY29udGFpbmVyUmVjdC53aWR0aCAtIHRoaXMuaW1hZ2VYU2l6ZSkgLyAyICtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLmNvcmUubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgIHZhciB0b3BCb3R0b21TcGFjaW5nID0gTWF0aC5hYnModG9wIC0gYm90dG9tKSAvIDI7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRZID0gKHRoaXMuY29udGFpbmVyUmVjdC5oZWlnaHQgLVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZVlTaXplIC1cclxuICAgICAgICAgICAgICAgIHRvcEJvdHRvbVNwYWNpbmcgKiB0aGlzLm1vZGlmaWVyWCkgL1xyXG4gICAgICAgICAgICAgICAgMiArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCArXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lclJlY3QudG9wO1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxYO1xyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxZO1xyXG4gICAgICAgICAgICBpZiAoc2NhbGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGRyYWdBbGxvd2VkQXhpc2VzID0gdGhpcy5nZXREcmFnQWxsb3dlZEF4aXNlcyhNYXRoLmFicyh0aGlzLnJvdGF0ZVZhbHVlKSwgc2NhbGUpO1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dZID0gZHJhZ0FsbG93ZWRBeGlzZXMuYWxsb3dZLCBhbGxvd1ggPSBkcmFnQWxsb3dlZEF4aXNlcy5hbGxvd1g7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxYID0gdGhpcy5sZWZ0IC8gKHRoaXMuc2NhbGUgLSAxKTtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsWSA9IHRoaXMudG9wIC8gKHRoaXMuc2NhbGUgLSAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVggPSBNYXRoLmFicyhvcmlnaW5hbFgpICsgb2Zmc2V0WDtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVkgPSBNYXRoLmFicyhvcmlnaW5hbFkpICsgb2Zmc2V0WTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlU3dpcGVDb3JkcyA9IHRoaXMuZ2V0UG9zc2libGVTd2lwZURyYWdDb3Jkcyh0aGlzLnJvdGF0ZVZhbHVlLCBzY2FsZSk7XHJcbiAgICAgICAgICAgIHZhciBfeCA9IG9mZnNldFggLSB0aGlzLnBhZ2VYO1xyXG4gICAgICAgICAgICB2YXIgX3kgPSBvZmZzZXRZIC0gdGhpcy5wYWdlWTtcclxuICAgICAgICAgICAgdmFyIHggPSAoc2NhbGUgLSAxKSAqIF94O1xyXG4gICAgICAgICAgICB2YXIgeSA9IChzY2FsZSAtIDEpICogX3k7XHJcbiAgICAgICAgICAgIGlmIChhbGxvd1gpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVMZWZ0KHgsIHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZVJpZ2h0KHgsIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChzY2FsZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCA8IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoeCA+IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFsbG93WSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZVRvcCh5LCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVCb3R0b20oeSwgcG9zc2libGVTd2lwZUNvcmRzLm1heFkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHRyYW5zbGF0ZSB2YWx1ZSBiYXNlZCBvbiBpbmRleCBvZiBiZXlvbmQgdGhlIHZpZXdwb3J0LCB1dGlsaXplIHRoZSBhdmFpbGFibGUgc3BhY2UgdG8gcHJldmVudCBpbWFnZSBiZWluZyBjdXQgb3V0XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NhbGUgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9JZiBpbWFnZSBnb2VzIGJleW9uZCB2aWV3cG9ydCB0b3AsIHVzZSB0aGUgbWluaW0gcG9zc2libGUgdHJhbnNsYXRlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHkgPCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHkgPiBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gcG9zc2libGVTd2lwZUNvcmRzLm1heFk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Wm9vbVN0eWxlcyh7XHJcbiAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBhcHBseSBzY2FsZTNkIHRvIGltYWdlIGFuZCB0cmFuc2xhdGUgdG8gaW1hZ2Ugd3JhcFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3R5bGV9IFgsWSBhbmQgc2NhbGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBab29tLnByb3RvdHlwZS5zZXRab29tU3R5bGVzID0gZnVuY3Rpb24gKHN0eWxlKSB7XHJcbiAgICAgICAgICAgIHZhciAkaW1hZ2UgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWFnZScpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyICRkdW1teUltYWdlID0gdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWN1cnJlbnQgLmxnLWR1bW15LWltZycpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyICRpbWFnZVdyYXAgPSAkaW1hZ2UucGFyZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBzdHlsZS5zY2FsZTtcclxuICAgICAgICAgICAgJGltYWdlLmNzcygndHJhbnNmb3JtJywgJ3NjYWxlM2QoJyArIHN0eWxlLnNjYWxlICsgJywgJyArIHN0eWxlLnNjYWxlICsgJywgMSknKTtcclxuICAgICAgICAgICAgJGR1bW15SW1hZ2UuY3NzKCd0cmFuc2Zvcm0nLCAnc2NhbGUzZCgnICsgc3R5bGUuc2NhbGUgKyAnLCAnICsgc3R5bGUuc2NhbGUgKyAnLCAxKScpO1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBzdHlsZS54ICsgJ3B4LCAnICsgc3R5bGUueSArICdweCwgMCknO1xyXG4gICAgICAgICAgICAkaW1hZ2VXcmFwLmNzcygndHJhbnNmb3JtJywgdHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gc3R5bGUueDtcclxuICAgICAgICAgICAgdGhpcy50b3AgPSBzdHlsZS55O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIGluZGV4IC0gSW5kZXggb2YgdGhlIGN1cnJlbnQgc2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnQgLSBldmVudCB3aWxsIGJlIGF2YWlsYWJsZSBvbmx5IGlmIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgb24gY2xpY2tpbmcvdGFwaW5nIHRoZSBpbWFnc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnNldEFjdHVhbFNpemUgPSBmdW5jdGlvbiAoaW5kZXgsIGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIEFsbG93IHpvb20gb25seSBvbiBpbWFnZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbWFnZVNsaWRlKCkgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5oYXNDbGFzcygnbGctZmlyc3Qtc2xpZGUtbG9hZGluZycpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5nZXRDdXJyZW50SW1hZ2VBY3R1YWxTaXplU2NhbGUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29yZS5vdXRlci5oYXNDbGFzcygnbGctem9vbWVkJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHRoaXMuZ2V0U2NhbGUoc2NhbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZUNvcmRzKGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5iZWdpblpvb20odGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbUltYWdlKHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWdyYWJiaW5nJykuYWRkQ2xhc3MoJ2xnLWdyYWInKTtcclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0TmF0dXJhbFdpZHRoID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciAkaW1hZ2UgPSB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGluZGV4KS5maW5kKCcubGctaW1hZ2UnKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgbmF0dXJhbFdpZHRoID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF0ud2lkdGg7XHJcbiAgICAgICAgICAgIHJldHVybiBuYXR1cmFsV2lkdGhcclxuICAgICAgICAgICAgICAgID8gcGFyc2VGbG9hdChuYXR1cmFsV2lkdGgpXHJcbiAgICAgICAgICAgICAgICA6ICRpbWFnZS5nZXQoKS5uYXR1cmFsV2lkdGg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRBY3R1YWxTaXplU2NhbGUgPSBmdW5jdGlvbiAobmF0dXJhbFdpZHRoLCB3aWR0aCkge1xyXG4gICAgICAgICAgICB2YXIgX3NjYWxlO1xyXG4gICAgICAgICAgICB2YXIgc2NhbGU7XHJcbiAgICAgICAgICAgIGlmIChuYXR1cmFsV2lkdGggPiB3aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgX3NjYWxlID0gbmF0dXJhbFdpZHRoIC8gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IF9zY2FsZSB8fCAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldEN1cnJlbnRJbWFnZUFjdHVhbFNpemVTY2FsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyICRpbWFnZSA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltYWdlJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgd2lkdGggPSAkaW1hZ2UuZ2V0KCkub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBuYXR1cmFsV2lkdGggPSB0aGlzLmdldE5hdHVyYWxXaWR0aCh0aGlzLmNvcmUuaW5kZXgpIHx8IHdpZHRoO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBY3R1YWxTaXplU2NhbGUobmF0dXJhbFdpZHRoLCB3aWR0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRQYWdlQ29yZHMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGNvcmRzID0ge307XHJcbiAgICAgICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29yZHMueCA9IGV2ZW50LnBhZ2VYIHx8IGV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgICAgICAgICBjb3Jkcy55ID0gZXZlbnQucGFnZVkgfHwgZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJSZWN0ID0gdGhpcy5jb3JlLm91dGVyLmdldCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY29yZHMueCA9IGNvbnRhaW5lclJlY3Qud2lkdGggLyAyICsgY29udGFpbmVyUmVjdC5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgY29yZHMueSA9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyUmVjdC5oZWlnaHQgLyAyICsgdGhpcy5zY3JvbGxUb3AgKyBjb250YWluZXJSZWN0LnRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29yZHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5zZXRQYWdlQ29yZHMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIHBhZ2VDb3JkcyA9IHRoaXMuZ2V0UGFnZUNvcmRzKGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlWCA9IHBhZ2VDb3Jkcy54O1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VZID0gcGFnZUNvcmRzLnk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBJZiB0cnVlLCB6b29tZWQgLSBpbiBlbHNlIHpvb21lZCBvdXRcclxuICAgICAgICBab29tLnByb3RvdHlwZS5iZWdpblpvb20gPSBmdW5jdGlvbiAoc2NhbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tLWRyYWctdHJhbnNpdGlvbiBsZy16b29tLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgIGlmIChzY2FsZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctem9vbWVkJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGFjdHVhbFNpemUgPSB0aGlzLmNvcmUuZ2V0RWxlbWVudEJ5SWQoJ2xnLWFjdHVhbC1zaXplJyk7XHJcbiAgICAgICAgICAgICAgICAkYWN0dWFsU2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyh0aGlzLnNldHRpbmdzLmFjdHVhbFNpemVJY29ucy56b29tSW4pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuYWN0dWFsU2l6ZUljb25zLnpvb21PdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFpvb20oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGUgPiAxO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0U2NhbGUgPSBmdW5jdGlvbiAoc2NhbGUpIHtcclxuICAgICAgICAgICAgdmFyIGFjdHVhbFNpemVTY2FsZSA9IHRoaXMuZ2V0Q3VycmVudEltYWdlQWN0dWFsU2l6ZVNjYWxlKCk7XHJcbiAgICAgICAgICAgIGlmIChzY2FsZSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzY2FsZSA+IGFjdHVhbFNpemVTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSBhY3R1YWxTaXplU2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnpvb20pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlWm9vbU9uU2xpZGVJdGVtTG9hZCgpO1xyXG4gICAgICAgICAgICB2YXIgdGFwcGVkID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLm9uKCdkYmxjbGljay5sZycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy4kTEcoZXZlbnQudGFyZ2V0KS5oYXNDbGFzcygnbGctaW1hZ2UnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLnNldEFjdHVhbFNpemUoX3RoaXMuY29yZS5pbmRleCwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLm9uKCd0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRhcmdldCA9IF90aGlzLiRMRyhldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5oYXNDbGFzcygnbGctaW1hZ2UnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGFwcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcHBlZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFwcGVkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0YXBwZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXBwZWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRBY3R1YWxTaXplKF90aGlzLmNvcmUuaW5kZXgsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgem9vbSBvbiByZXNpemUgYW5kIG9yaWVudGF0aW9uY2hhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmNvbnRhaW5lclJlc2l6ZSArIFwiLnpvb20gXCIgKyBsR0V2ZW50cy5yb3RhdGVSaWdodCArIFwiLnpvb20gXCIgKyBsR0V2ZW50cy5yb3RhdGVMZWZ0ICsgXCIuem9vbSBcIiArIGxHRXZlbnRzLmZsaXBIb3Jpem9udGFsICsgXCIuem9vbSBcIiArIGxHRXZlbnRzLmZsaXBWZXJ0aWNhbCArIFwiLnpvb21cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jb3JlLmxnT3BlbmVkIHx8ICFfdGhpcy5pc0ltYWdlU2xpZGUoKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRQYWdlQ29yZHMoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFpvb21Fc3NlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy56b29tSW1hZ2UoX3RoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHpvb20gb24gcmVzaXplIGFuZCBvcmllbnRhdGlvbmNoYW5nZVxyXG4gICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9uKFwic2Nyb2xsLmxnLnpvb20uZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jb3JlLmxnT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNjcm9sbFRvcCA9IF90aGlzLiRMRyh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLmdldEVsZW1lbnRCeUlkKCdsZy16b29tLW91dCcpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb3JlLm91dGVyLmZpbmQoJy5sZy1jdXJyZW50IC5sZy1pbWFnZScpLmdldCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgLT0gX3RoaXMuc2V0dGluZ3Muc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSBfdGhpcy5nZXRTY2FsZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYmVnaW5ab29tKF90aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy56b29tSW1hZ2UoX3RoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLmdldEVsZW1lbnRCeUlkKCdsZy16b29tLWluJykub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuem9vbUluKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuZ2V0RWxlbWVudEJ5SWQoJ2xnLWFjdHVhbC1zaXplJykub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0QWN0dWFsU2l6ZShfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmJlZm9yZU9wZW4gKyBcIi56b29tXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuZmluZCgnLmxnLWl0ZW0nKS5yZW1vdmVDbGFzcygnbGctem9vbWFibGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmFmdGVyT3BlbiArIFwiLnpvb21cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2Nyb2xsVG9wID0gX3RoaXMuJExHKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGluaXRpYWwgdmFsdWUgY2VudGVyXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWdlWCA9IF90aGlzLmNvcmUub3V0ZXIud2lkdGgoKSAvIDI7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5wYWdlWSA9IF90aGlzLmNvcmUub3V0ZXIuaGVpZ2h0KCkgLyAyICsgX3RoaXMuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gUmVzZXQgem9vbSBvbiBzbGlkZSBjaGFuZ2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYWZ0ZXJTbGlkZSArIFwiLnpvb21cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gZXZlbnQuZGV0YWlsLnByZXZJbmRleDtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnBvc2l0aW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVzZXRab29tKHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNJbWFnZVNsaWRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRab29tRXNzZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gRHJhZyBvcHRpb24gYWZ0ZXIgem9vbVxyXG4gICAgICAgICAgICB0aGlzLnpvb21EcmFnKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGluY2hab29tKCk7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbVN3aXBlKCk7XHJcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSB6b29tYWJsZSB0aW1lb3V0IHZhbHVlIGp1c3QgdG8gY2xlYXIgaXQgd2hpbGUgY2xvc2luZ1xyXG4gICAgICAgICAgICB0aGlzLnpvb21hYmxlVGltZW91dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuem9vbUluID0gZnVuY3Rpb24gKHNjYWxlKSB7XHJcbiAgICAgICAgICAgIC8vIEFsbG93IHpvb20gb25seSBvbiBpbWFnZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbWFnZVNsaWRlKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgKz0gdGhpcy5zZXR0aW5ncy5zY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjYWxlID0gdGhpcy5nZXRTY2FsZSh0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgdGhpcy5iZWdpblpvb20odGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbUltYWdlKHRoaXMuc2NhbGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gUmVzZXQgem9vbSBlZmZlY3RcclxuICAgICAgICBab29tLnByb3RvdHlwZS5yZXNldFpvb20gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tZWQgbGctem9vbS1kcmFnLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgdmFyICRhY3R1YWxTaXplID0gdGhpcy5jb3JlLmdldEVsZW1lbnRCeUlkKCdsZy1hY3R1YWwtc2l6ZScpO1xyXG4gICAgICAgICAgICB2YXIgJGl0ZW0gPSB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGluZGV4ICE9PSB1bmRlZmluZWQgPyBpbmRleCA6IHRoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICRhY3R1YWxTaXplXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3R1YWxTaXplSWNvbnMuem9vbU91dClcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmFjdHVhbFNpemVJY29ucy56b29tSW4pO1xyXG4gICAgICAgICAgICAkaXRlbS5maW5kKCcubGctaW1nLXdyYXAnKS5maXJzdCgpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICRpdGVtLmZpbmQoJy5sZy1pbWFnZScpLmZpcnN0KCkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudG9wID0gMDtcclxuICAgICAgICAgICAgLy8gUmVzZXQgcGFneCBwYWd5IHZhbHVlcyB0byBjZW50ZXJcclxuICAgICAgICAgICAgdGhpcy5zZXRQYWdlQ29yZHMoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldFRvdWNoRGlzdGFuY2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KChlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVgpICpcclxuICAgICAgICAgICAgICAgIChlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVgpICtcclxuICAgICAgICAgICAgICAgIChlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVkpICpcclxuICAgICAgICAgICAgICAgICAgICAoZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VZKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5waW5jaFpvb20gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzdGFydERpc3QgPSAwO1xyXG4gICAgICAgICAgICB2YXIgcGluY2hTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBpbml0U2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB2YXIgJGl0ZW0gPSB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kaW5uZXIub24oJ3RvdWNoc3RhcnQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgJGl0ZW0gPSBfdGhpcy5jb3JlLmdldFNsaWRlSXRlbShfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuaXNJbWFnZVNsaWRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFfdGhpcy5jb3JlLm91dGVyLmhhc0NsYXNzKCdsZy1maXJzdC1zbGlkZS1sb2FkaW5nJykgJiZcclxuICAgICAgICAgICAgICAgICAgICAoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0U2NhbGUgPSBfdGhpcy5zY2FsZSB8fCAxO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXpvb20tZHJhZy10cmFuc2l0aW9uIGxnLXpvb20tZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID0gJ3BpbmNoJztcclxuICAgICAgICAgICAgICAgICAgICBzdGFydERpc3QgPSBfdGhpcy5nZXRUb3VjaERpc3RhbmNlKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLiRpbm5lci5vbigndG91Y2htb3ZlLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9PT0gJ3BpbmNoJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kRGlzdCA9IF90aGlzLmdldFRvdWNoRGlzdGFuY2UoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gc3RhcnREaXN0IC0gZW5kRGlzdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBpbmNoU3RhcnRlZCAmJiBNYXRoLmFicyhkaXN0YW5jZSkgPiA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpbmNoU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaW5jaFN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSBNYXRoLm1heCgxLCBpbml0U2NhbGUgKyAtZGlzdGFuY2UgKiAwLjAwOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnpvb21JbWFnZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLiRpbm5lci5vbigndG91Y2hlbmQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPT09ICdwaW5jaCcgJiZcclxuICAgICAgICAgICAgICAgICAgICAoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwaW5jaFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydERpc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zY2FsZSA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlc2V0Wm9vbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSBfdGhpcy5nZXRTY2FsZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnpvb21JbWFnZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLXpvb21lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnRvdWNoZW5kWm9vbSA9IGZ1bmN0aW9uIChzdGFydENvb3JkcywgZW5kQ29vcmRzLCBhbGxvd1gsIGFsbG93WSwgdG91Y2hEdXJhdGlvbiwgcm90YXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlWG5ldyA9IGVuZENvb3Jkcy54IC0gc3RhcnRDb29yZHMueDtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlWW5ldyA9IGVuZENvb3Jkcy55IC0gc3RhcnRDb29yZHMueTtcclxuICAgICAgICAgICAgdmFyIHNwZWVkWCA9IE1hdGguYWJzKGRpc3RhbmNlWG5ldykgLyB0b3VjaER1cmF0aW9uICsgMTtcclxuICAgICAgICAgICAgdmFyIHNwZWVkWSA9IE1hdGguYWJzKGRpc3RhbmNlWW5ldykgLyB0b3VjaER1cmF0aW9uICsgMTtcclxuICAgICAgICAgICAgaWYgKHNwZWVkWCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHNwZWVkWCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzcGVlZFkgPiAyKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVlZFkgKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaXN0YW5jZVhuZXcgPSBkaXN0YW5jZVhuZXcgKiBzcGVlZFg7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlWW5ldyA9IGRpc3RhbmNlWW5ldyAqIHNwZWVkWTtcclxuICAgICAgICAgICAgdmFyIF9MR2VsID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXdyYXAnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHt9O1xyXG4gICAgICAgICAgICBkaXN0YW5jZS54ID0gdGhpcy5sZWZ0ICsgZGlzdGFuY2VYbmV3ICogdGhpcy5tb2RpZmllclg7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlLnkgPSB0aGlzLnRvcCArIGRpc3RhbmNlWW5ldyAqIHRoaXMubW9kaWZpZXJZO1xyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVTd2lwZUNvcmRzID0gdGhpcy5nZXRQb3NzaWJsZVN3aXBlRHJhZ0NvcmRzKHJvdGF0ZVZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlWG5ldykgPiAxNSB8fCBNYXRoLmFicyhkaXN0YW5jZVluZXcpID4gMTUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbGxvd1kpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlVG9wKGRpc3RhbmNlLnksIHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZUJvdHRvbShkaXN0YW5jZS55LCBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbGxvd1gpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlTGVmdChkaXN0YW5jZS54LCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVSaWdodChkaXN0YW5jZS54LCBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbGxvd1kpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcCA9IGRpc3RhbmNlLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID0gdGhpcy50b3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsb3dYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0ID0gZGlzdGFuY2UueDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPSB0aGlzLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFpvb21Td2lwZVN0eWxlcyhfTEdlbCwgZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRab29tU3dpcGVDb3JkcyA9IGZ1bmN0aW9uIChzdGFydENvb3JkcywgZW5kQ29vcmRzLCBhbGxvd1gsIGFsbG93WSwgcG9zc2libGVTd2lwZUNvcmRzKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoYWxsb3dZKSB7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvcCArIChlbmRDb29yZHMueSAtIHN0YXJ0Q29vcmRzLnkpICogdGhpcy5tb2RpZmllclk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlVG9wKGRpc3RhbmNlLnksIHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZmTWluWSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZIC0gZGlzdGFuY2UueTtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblkgLSBkaWZmTWluWSAvIDY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVCb3R0b20oZGlzdGFuY2UueSwgcG9zc2libGVTd2lwZUNvcmRzLm1heFkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmZNYXhZID0gZGlzdGFuY2UueSAtIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WSArIGRpZmZNYXhZIC8gNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlLnkgPSB0aGlzLnRvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYWxsb3dYKSB7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZS54ID1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnQgKyAoZW5kQ29vcmRzLnggLSBzdGFydENvb3Jkcy54KSAqIHRoaXMubW9kaWZpZXJYO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZUxlZnQoZGlzdGFuY2UueCwgcG9zc2libGVTd2lwZUNvcmRzLm1pblgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmZNaW5YID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblggLSBkaXN0YW5jZS54O1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWCAtIGRpZmZNaW5YIC8gNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZVJpZ2h0KGRpc3RhbmNlLngsIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWZNYXhYID0gZGlzdGFuY2UueCAtIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WCArIGRpZk1heFggLyA2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9IHRoaXMubGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGlzdGFuY2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5pc0JleW9uZFBvc3NpYmxlTGVmdCA9IGZ1bmN0aW9uICh4LCBtaW5YKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4ID49IG1pblg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5pc0JleW9uZFBvc3NpYmxlUmlnaHQgPSBmdW5jdGlvbiAoeCwgbWF4WCkge1xyXG4gICAgICAgICAgICByZXR1cm4geCA8PSBtYXhYO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuaXNCZXlvbmRQb3NzaWJsZVRvcCA9IGZ1bmN0aW9uICh5LCBtaW5ZKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5ID49IG1pblk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5pc0JleW9uZFBvc3NpYmxlQm90dG9tID0gZnVuY3Rpb24gKHksIG1heFkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHkgPD0gbWF4WTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmlzSW1hZ2VTbGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1t0aGlzLmNvcmUuaW5kZXhdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb3JlLmdldFNsaWRlVHlwZShjdXJyZW50SXRlbSkgPT09ICdpbWFnZSc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRQb3NzaWJsZVN3aXBlRHJhZ0NvcmRzID0gZnVuY3Rpb24gKHJvdGF0ZVZhbHVlLCBzY2FsZSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YVNjYWxlID0gc2NhbGUgfHwgdGhpcy5zY2FsZSB8fCAxO1xyXG4gICAgICAgICAgICB2YXIgZWxEYXRhU2NhbGUgPSBNYXRoLmFicyhkYXRhU2NhbGUpO1xyXG4gICAgICAgICAgICB2YXIgX2EgPSB0aGlzLmNvcmUubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgIHZhciB0b3BCb3R0b21TcGFjaW5nID0gTWF0aC5hYnModG9wIC0gYm90dG9tKSAvIDI7XHJcbiAgICAgICAgICAgIHZhciBtaW5ZID0gKHRoaXMuaW1hZ2VZU2l6ZSAtIHRoaXMuY29udGFpbmVyUmVjdC5oZWlnaHQpIC8gMiArXHJcbiAgICAgICAgICAgICAgICB0b3BCb3R0b21TcGFjaW5nICogdGhpcy5tb2RpZmllclg7XHJcbiAgICAgICAgICAgIHZhciBtYXhZID0gdGhpcy5jb250YWluZXJSZWN0LmhlaWdodCAtIHRoaXMuaW1hZ2VZU2l6ZSAqIGVsRGF0YVNjYWxlICsgbWluWTtcclxuICAgICAgICAgICAgdmFyIG1pblggPSAodGhpcy5pbWFnZVhTaXplIC0gdGhpcy5jb250YWluZXJSZWN0LndpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgIHZhciBtYXhYID0gdGhpcy5jb250YWluZXJSZWN0LndpZHRoIC0gdGhpcy5pbWFnZVhTaXplICogZWxEYXRhU2NhbGUgKyBtaW5YO1xyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVTd2lwZUNvcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgbWluWTogbWluWSxcclxuICAgICAgICAgICAgICAgIG1heFk6IG1heFksXHJcbiAgICAgICAgICAgICAgICBtaW5YOiBtaW5YLFxyXG4gICAgICAgICAgICAgICAgbWF4WDogbWF4WCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVZhbHVlKSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlU3dpcGVDb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBtaW5ZOiBtaW5YLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFk6IG1heFgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluWDogbWluWSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhYOiBtYXhZLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcG9zc2libGVTd2lwZUNvcmRzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuc2V0Wm9vbVN3aXBlU3R5bGVzID0gZnVuY3Rpb24gKExHZWwsIGRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIExHZWwuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIGRpc3RhbmNlLnggKyAncHgsICcgKyBkaXN0YW5jZS55ICsgJ3B4LCAwKScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuem9vbVN3aXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGVuZENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBBbGxvdyB4IGRpcmVjdGlvbiBkcmFnXHJcbiAgICAgICAgICAgIHZhciBhbGxvd1ggPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gQWxsb3cgWSBkaXJlY3Rpb24gZHJhZ1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dZID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZVN3aXBlQ29yZHM7XHJcbiAgICAgICAgICAgIHZhciBfTEdlbDtcclxuICAgICAgICAgICAgdmFyICRpdGVtID0gdGhpcy5jb3JlLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJGlubmVyLm9uKCd0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbG93IHpvb20gb25seSBvbiBpbWFnZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5pc0ltYWdlU2xpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRpdGVtID0gX3RoaXMuY29yZS5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkgJiZcclxuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5oYXNDbGFzcygnbGctem9vbWVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID0gJ3pvb21Td2lwZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgX0xHZWwgPSBfdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkcmFnQWxsb3dlZEF4aXNlcyA9IF90aGlzLmdldERyYWdBbGxvd2VkQXhpc2VzKE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dZID0gZHJhZ0FsbG93ZWRBeGlzZXMuYWxsb3dZO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WCA9IGRyYWdBbGxvd2VkQXhpc2VzLmFsbG93WDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsb3dYIHx8IGFsbG93WSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3JkcyA9IF90aGlzLmdldFN3aXBlQ29yZHMoZSwgTWF0aC5hYnMoX3RoaXMucm90YXRlVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zc2libGVTd2lwZUNvcmRzID0gX3RoaXMuZ2V0UG9zc2libGVTd2lwZURyYWdDb3JkcyhfdGhpcy5yb3RhdGVWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXQgb3BhY2l0eSBhbmQgdHJhbnNpdGlvbiBkdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLXpvb20tZHJhZ2dpbmcgbGctem9vbS1kcmFnLXRyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kaW5uZXIub24oJ3RvdWNobW92ZS5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPT09ICd6b29tU3dpcGUnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPSAnem9vbVN3aXBlJztcclxuICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSBfdGhpcy5nZXRTd2lwZUNvcmRzKGUsIE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gX3RoaXMuZ2V0Wm9vbVN3aXBlQ29yZHMoc3RhcnRDb29yZHMsIGVuZENvb3JkcywgYWxsb3dYLCBhbGxvd1ksIHBvc3NpYmxlU3dpcGVDb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGVuZENvb3Jkcy54IC0gc3RhcnRDb29yZHMueCkgPiAxNSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhlbmRDb29yZHMueSAtIHN0YXJ0Q29vcmRzLnkpID4gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFpvb21Td2lwZVN0eWxlcyhfTEdlbCwgZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kaW5uZXIub24oJ3RvdWNoZW5kLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID09PSAnem9vbVN3aXBlJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctem9vbS1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNNb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hEdXJhdGlvbiA9IGVuZFRpbWUudmFsdWVPZigpIC0gc3RhcnRUaW1lLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaGVuZFpvb20oc3RhcnRDb29yZHMsIGVuZENvb3JkcywgYWxsb3dYLCBhbGxvd1ksIHRvdWNoRHVyYXRpb24sIF90aGlzLnJvdGF0ZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS56b29tRHJhZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHN0YXJ0Q29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBlbmRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gQWxsb3cgeCBkaXJlY3Rpb24gZHJhZ1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dYID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEFsbG93IFkgZGlyZWN0aW9uIGRyYWdcclxuICAgICAgICAgICAgdmFyIGFsbG93WSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICB2YXIgZW5kVGltZTtcclxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlU3dpcGVDb3JkcztcclxuICAgICAgICAgICAgdmFyIF9MR2VsO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIub24oJ21vdXNlZG93bi5sZy56b29tJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbG93IHpvb20gb25seSBvbiBpbWFnZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5pc0ltYWdlU2xpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciAkaXRlbSA9IF90aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX0xHZWwgPSBfdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkcmFnQWxsb3dlZEF4aXNlcyA9IF90aGlzLmdldERyYWdBbGxvd2VkQXhpc2VzKE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dZID0gZHJhZ0FsbG93ZWRBeGlzZXMuYWxsb3dZO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WCA9IGRyYWdBbGxvd2VkQXhpc2VzLmFsbG93WDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY29yZS5vdXRlci5oYXNDbGFzcygnbGctem9vbWVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLW9iamVjdCcpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWxsb3dYIHx8IGFsbG93WSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0gX3RoaXMuZ2V0RHJhZ0NvcmRzKGUsIE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZVN3aXBlQ29yZHMgPSBfdGhpcy5nZXRQb3NzaWJsZVN3aXBlRHJhZ0NvcmRzKF90aGlzLnJvdGF0ZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKiogRml4IGZvciB3ZWJraXQgY3Vyc29yIGlzc3VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNjcyM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5nZXQoKS5zY3JvbGxMZWZ0ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmdldCgpLnNjcm9sbExlZnQgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLWdyYWInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctZ3JhYmJpbmcgbGctem9vbS1kcmFnLXRyYW5zaXRpb24gbGctem9vbS1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXQgb3BhY2l0eSBhbmQgdHJhbnNpdGlvbiBkdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vbihcIm1vdXNlbW92ZS5sZy56b29tLmdsb2JhbFwiICsgdGhpcy5jb3JlLmxnSWQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZENvb3JkcyA9IF90aGlzLmdldERyYWdDb3JkcyhlLCBNYXRoLmFicyhfdGhpcy5yb3RhdGVWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IF90aGlzLmdldFpvb21Td2lwZUNvcmRzKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMsIGFsbG93WCwgYWxsb3dZLCBwb3NzaWJsZVN3aXBlQ29yZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFpvb21Td2lwZVN0eWxlcyhfTEdlbCwgZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vbihcIm1vdXNldXAubGcuem9vbS5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctem9vbS1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpeCBmb3IgY2hyb21lIG1vdXNlIG1vdmUgb24gY2xpY2tcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNNb3ZlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoc3RhcnRDb29yZHMueCAhPT0gZW5kQ29vcmRzLnggfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzLnkgIT09IGVuZENvb3Jkcy55KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSBfdGhpcy5nZXREcmFnQ29yZHMoZSwgTWF0aC5hYnMoX3RoaXMucm90YXRlVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoRHVyYXRpb24gPSBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoZW5kWm9vbShzdGFydENvb3JkcywgZW5kQ29vcmRzLCBhbGxvd1gsIGFsbG93WSwgdG91Y2hEdXJhdGlvbiwgX3RoaXMucm90YXRlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1ncmFiYmluZycpLmFkZENsYXNzKCdsZy1ncmFiJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuY2xvc2VHYWxsZXJ5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0Wm9vbSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gVW5iaW5kIGFsbCBldmVudHMgYWRkZWQgYnkgbGlnaHRHYWxsZXJ5IHpvb20gcGx1Z2luXHJcbiAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub2ZmKFwiLmxnLnpvb20uZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLmxnLnpvb20nKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcuem9vbScpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy56b29tYWJsZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICB0aGlzLnpvb21hYmxlVGltZW91dCA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFpvb207XHJcbiAgICB9KCkpO1xuXG4gICAgcmV0dXJuIFpvb207XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZy16b29tLnVtZC5qcy5tYXBcbiIsIi8qIVxuICogbGlnaHRnYWxsZXJ5IHwgMi40LjAtYmV0YS4wIHwgRGVjZW1iZXIgMTJ0aCAyMDIxXG4gKiBodHRwOi8vd3d3LmxpZ2h0Z2FsbGVyeWpzLmNvbS9cbiAqIENvcHlyaWdodCAoYykgMjAyMCBTYWNoaW4gTmVyYXZhdGg7XG4gKiBAbGljZW5zZSBHUEx2M1xuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLmxnVmlkZW8gPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG4gICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG4gICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG4gICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG4gICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcblxuICAgIHZhciB2aWRlb1NldHRpbmdzID0ge1xyXG4gICAgICAgIGF1dG9wbGF5Rmlyc3RWaWRlbzogdHJ1ZSxcclxuICAgICAgICB5b3VUdWJlUGxheWVyUGFyYW1zOiBmYWxzZSxcclxuICAgICAgICB2aW1lb1BsYXllclBhcmFtczogZmFsc2UsXHJcbiAgICAgICAgd2lzdGlhUGxheWVyUGFyYW1zOiBmYWxzZSxcclxuICAgICAgICBnb3RvTmV4dFNsaWRlT25WaWRlb0VuZDogdHJ1ZSxcclxuICAgICAgICBhdXRvcGxheVZpZGVvT25TbGlkZTogZmFsc2UsXHJcbiAgICAgICAgdmlkZW9qczogZmFsc2UsXHJcbiAgICAgICAgdmlkZW9qc09wdGlvbnM6IHt9LFxyXG4gICAgfTtcblxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiBsaWdodEdhbGxlcnkgZXZlbnRzXHJcbiAgICAgKiBBbGwgZXZlbnRzIHNob3VsZCBiZSBkb2N1bWVudGVkIGhlcmVcclxuICAgICAqIEJlbG93IGludGVyZmFjZXMgYXJlIHVzZWQgdG8gYnVpbGQgdGhlIHdlYnNpdGUgZG9jdW1lbnRhdGlvbnNcclxuICAgICAqICovXHJcbiAgICB2YXIgbEdFdmVudHMgPSB7XHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTbGlkZTogJ2xnQWZ0ZXJBcHBlbmRTbGlkZScsXHJcbiAgICAgICAgaW5pdDogJ2xnSW5pdCcsXHJcbiAgICAgICAgaGFzVmlkZW86ICdsZ0hhc1ZpZGVvJyxcclxuICAgICAgICBjb250YWluZXJSZXNpemU6ICdsZ0NvbnRhaW5lclJlc2l6ZScsXHJcbiAgICAgICAgdXBkYXRlU2xpZGVzOiAnbGdVcGRhdGVTbGlkZXMnLFxyXG4gICAgICAgIGFmdGVyQXBwZW5kU3ViSHRtbDogJ2xnQWZ0ZXJBcHBlbmRTdWJIdG1sJyxcclxuICAgICAgICBiZWZvcmVPcGVuOiAnbGdCZWZvcmVPcGVuJyxcclxuICAgICAgICBhZnRlck9wZW46ICdsZ0FmdGVyT3BlbicsXHJcbiAgICAgICAgc2xpZGVJdGVtTG9hZDogJ2xnU2xpZGVJdGVtTG9hZCcsXHJcbiAgICAgICAgYmVmb3JlU2xpZGU6ICdsZ0JlZm9yZVNsaWRlJyxcclxuICAgICAgICBhZnRlclNsaWRlOiAnbGdBZnRlclNsaWRlJyxcclxuICAgICAgICBwb3N0ZXJDbGljazogJ2xnUG9zdGVyQ2xpY2snLFxyXG4gICAgICAgIGRyYWdTdGFydDogJ2xnRHJhZ1N0YXJ0JyxcclxuICAgICAgICBkcmFnTW92ZTogJ2xnRHJhZ01vdmUnLFxyXG4gICAgICAgIGRyYWdFbmQ6ICdsZ0RyYWdFbmQnLFxyXG4gICAgICAgIGJlZm9yZU5leHRTbGlkZTogJ2xnQmVmb3JlTmV4dFNsaWRlJyxcclxuICAgICAgICBiZWZvcmVQcmV2U2xpZGU6ICdsZ0JlZm9yZVByZXZTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlQ2xvc2U6ICdsZ0JlZm9yZUNsb3NlJyxcclxuICAgICAgICBhZnRlckNsb3NlOiAnbGdBZnRlckNsb3NlJyxcclxuICAgICAgICByb3RhdGVMZWZ0OiAnbGdSb3RhdGVMZWZ0JyxcclxuICAgICAgICByb3RhdGVSaWdodDogJ2xnUm90YXRlUmlnaHQnLFxyXG4gICAgICAgIGZsaXBIb3Jpem9udGFsOiAnbGdGbGlwSG9yaXpvbnRhbCcsXHJcbiAgICAgICAgZmxpcFZlcnRpY2FsOiAnbGdGbGlwVmVydGljYWwnLFxyXG4gICAgICAgIGF1dG9wbGF5OiAnbGdBdXRvcGxheScsXHJcbiAgICAgICAgYXV0b3BsYXlTdGFydDogJ2xnQXV0b3BsYXlTdGFydCcsXHJcbiAgICAgICAgYXV0b3BsYXlTdG9wOiAnbGdBdXRvcGxheVN0b3AnLFxyXG4gICAgfTtcblxuICAgIHZhciBwYXJhbSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVxyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tdKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbignJicpO1xyXG4gICAgfTtcclxuICAgIHZhciBnZXRWaW1lb1VSTFBhcmFtcyA9IGZ1bmN0aW9uIChkZWZhdWx0UGFyYW1zLCB2aWRlb0luZm8pIHtcclxuICAgICAgICBpZiAoIXZpZGVvSW5mbyB8fCAhdmlkZW9JbmZvLnZpbWVvKVxyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgdmFyIHVybFBhcmFtcyA9IHZpZGVvSW5mby52aW1lb1syXSB8fCAnJztcclxuICAgICAgICB1cmxQYXJhbXMgPVxyXG4gICAgICAgICAgICB1cmxQYXJhbXNbMF0gPT0gJz8nID8gJyYnICsgdXJsUGFyYW1zLnNsaWNlKDEpIDogdXJsUGFyYW1zIHx8ICcnO1xyXG4gICAgICAgIHZhciBkZWZhdWx0UGxheWVyUGFyYW1zID0gZGVmYXVsdFBhcmFtc1xyXG4gICAgICAgICAgICA/ICcmJyArIHBhcmFtKGRlZmF1bHRQYXJhbXMpXHJcbiAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgLy8gRm9yIHZpbWVvIGxhc3QgcGFybXMgZ2V0cyBwcmlvcml0eSBpZiBkdXBsaWNhdGVzIGZvdW5kXHJcbiAgICAgICAgdmFyIHZpbWVvUGxheWVyUGFyYW1zID0gXCI/YXV0b3BsYXk9MCZtdXRlZD0xXCIgKyBkZWZhdWx0UGxheWVyUGFyYW1zICsgdXJsUGFyYW1zO1xyXG4gICAgICAgIHJldHVybiB2aW1lb1BsYXllclBhcmFtcztcclxuICAgIH07XG5cbiAgICAvKipcclxuICAgICAqIFZpZGVvIG1vZHVsZSBmb3IgbGlnaHRHYWxsZXJ5XHJcbiAgICAgKiBTdXBwb3J0cyBIVE1MNSwgWW91VHViZSwgVmltZW8sIHdpc3RpYSB2aWRlb3NcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHJlZiBXaXN0aWFcclxuICAgICAqIGh0dHBzOi8vd2lzdGlhLmNvbS9zdXBwb3J0L2ludGVncmF0aW9ucy93b3JkcHJlc3MoSG93IHRvIGdldCB1cmwpXHJcbiAgICAgKiBodHRwczovL3dpc3RpYS5jb20vc3VwcG9ydC9kZXZlbG9wZXJzL2VtYmVkLW9wdGlvbnMjdXNpbmctZW1iZWQtb3B0aW9uc1xyXG4gICAgICogaHR0cHM6Ly93aXN0aWEuY29tL3N1cHBvcnQvZGV2ZWxvcGVycy9wbGF5ZXItYXBpXHJcbiAgICAgKiBodHRwczovL3dpc3RpYS5jb20vc3VwcG9ydC9kZXZlbG9wZXJzL2NvbnN0cnVjdC1hbi1lbWJlZC1jb2RlXHJcbiAgICAgKiBodHRwOi8vanNmaWRkbGUubmV0L3h2bm03eExtL1xyXG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L3ZpZGVvXHJcbiAgICAgKiBodHRwczovL3dpc3RpYS5jb20vc3VwcG9ydC9lbWJlZC1hbmQtc2hhcmUvc2hhcmluZy12aWRlb3NcclxuICAgICAqIGh0dHBzOi8vcHJpdmF0ZS1zaGFyaW5nLndpc3RpYS5jb20vbWVkaWFzL213aHJ1bHJ1Y2pcclxuICAgICAqXHJcbiAgICAgKiBAcmVmIFlvdXR1YmVcclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvcGxheWVyX3BhcmFtZXRlcnMjZW5hYmxlanNhcGlcclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvaWZyYW1lX2FwaV9yZWZlcmVuY2VcclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vYmxvZy9hdXRvcGxheS8jaWZyYW1lLWRlbGVnYXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmVmIFZpbWVvXHJcbiAgICAgKiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDQ4ODk0My9lYXN5LXdheS10by1nZXQtdmltZW8taWQtZnJvbS1hLXZpbWVvLXVybFxyXG4gICAgICogaHR0cHM6Ly92aW1lby56ZW5kZXNrLmNvbS9oYy9lbi11cy9hcnRpY2xlcy8zNjAwMDAxMjE2NjgtU3RhcnRpbmctcGxheWJhY2stYXQtYS1zcGVjaWZpYy10aW1lY29kZVxyXG4gICAgICogaHR0cHM6Ly92aW1lby56ZW5kZXNrLmNvbS9oYy9lbi11cy9hcnRpY2xlcy8zNjAwMDE0OTQ0NDctVXNpbmctUGxheWVyLVBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgdmFyIFZpZGVvID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFZpZGVvKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCBsaWdodEdhbGxlcnkgY29yZSBwbHVnaW4gaW5zdGFuY2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdmlkZW9TZXR0aW5ncyksIHRoaXMuY29yZS5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEV2ZW50IHRyaWdnZXJlZCB3aGVuIHZpZGVvIHVybCBmb3VuZCB3aXRob3V0IHBvc3RlclxyXG4gICAgICAgICAgICAgKiBBcHBlbmQgdmlkZW8gSFRNTFxyXG4gICAgICAgICAgICAgKiBQbGF5IGlmIGF1dG9wbGF5Rmlyc3RWaWRlbyBpcyB0cnVlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5oYXNWaWRlbyArIFwiLnZpZGVvXCIsIHRoaXMub25IYXNWaWRlby5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMucG9zdGVyQ2xpY2sgKyBcIi52aWRlb1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGVsID0gX3RoaXMuY29yZS5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sb2FkVmlkZW9PblBvc3RlckNsaWNrKCRlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5zbGlkZUl0ZW1Mb2FkICsgXCIudmlkZW9cIiwgdGhpcy5vblNsaWRlSXRlbUxvYWQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vIEBkZXNjIGZpcmVkIGltbWVkaWF0ZWx5IGJlZm9yZSBlYWNoIHNsaWRlIHRyYW5zaXRpb24uXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmJlZm9yZVNsaWRlICsgXCIudmlkZW9cIiwgdGhpcy5vbkJlZm9yZVNsaWRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvLyBAZGVzYyBmaXJlZCBpbW1lZGlhdGVseSBhZnRlciBlYWNoIHNsaWRlIHRyYW5zaXRpb24uXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmFmdGVyU2xpZGUgKyBcIi52aWRlb1wiLCB0aGlzLm9uQWZ0ZXJTbGlkZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIEV2ZW50IHRyaWdnZXJlZCB3aGVuIGEgc2xpZGUgaXMgY29tcGxldGVseSBsb2FkZWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gbGlnaHRHYWxsZXkgY3VzdG9tIGV2ZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLm9uU2xpZGVJdGVtTG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgX2EgPSBldmVudC5kZXRhaWwsIGlzRmlyc3RTbGlkZSA9IF9hLmlzRmlyc3RTbGlkZSwgaW5kZXggPSBfYS5pbmRleDtcclxuICAgICAgICAgICAgLy8gU2hvdWxkIGNoZWNrIHRoZSBhY3RpdmUgc2xpZGUgYXMgd2VsbCBhcyB1c2VyIG1heSBoYXZlIG1vdmVkIHRvIGRpZmZlcmVudCBzbGlkZSBiZWZvcmUgdGhlIGZpcnN0IHNsaWRlIGlzIGxvYWRlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvcGxheUZpcnN0VmlkZW8gJiZcclxuICAgICAgICAgICAgICAgIGlzRmlyc3RTbGlkZSAmJlxyXG4gICAgICAgICAgICAgICAgaW5kZXggPT09IHRoaXMuY29yZS5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRGVsYXkgaXMganVzdCBmb3IgdGhlIHRyYW5zaXRpb24gZWZmZWN0IG9uIHZpZGVvIGxvYWRcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmxvYWRBbmRQbGF5VmlkZW8oaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTaG91bGQgbm90IGNhbGwgb24gZmlyc3Qgc2xpZGUuIHNob3VsZCBjaGVjayBvbmx5IGlmIHRoZSBzbGlkZSBpcyBhY3RpdmVcclxuICAgICAgICAgICAgaWYgKCFpc0ZpcnN0U2xpZGUgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuYXV0b3BsYXlWaWRlb09uU2xpZGUgJiZcclxuICAgICAgICAgICAgICAgIGluZGV4ID09PSB0aGlzLmNvcmUuaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEFuZFBsYXlWaWRlbyhpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIEV2ZW50IHRyaWdnZXJlZCB3aGVuIHZpZGVvIHVybCBvciBwb3N0ZXIgZm91bmRcclxuICAgICAgICAgKiBBcHBlbmQgdmlkZW8gSFRNTCBpcyBwb3N0ZXIgaXMgbm90IGdpdmVuXHJcbiAgICAgICAgICogUGxheSBpZiBhdXRvcGxheUZpcnN0VmlkZW8gaXMgdHJ1ZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBKYXZhc2NyaXB0IEV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUub25IYXNWaWRlbyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2EgPSBldmVudC5kZXRhaWwsIGluZGV4ID0gX2EuaW5kZXgsIHNyYyA9IF9hLnNyYywgaHRtbDVWaWRlbyA9IF9hLmh0bWw1VmlkZW8sIGhhc1Bvc3RlciA9IF9hLmhhc1Bvc3RlcjtcclxuICAgICAgICAgICAgaWYgKCFoYXNQb3N0ZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIEFsbCBmdW5jdGlvbnMgYXJlIGNhbGxlZCBzZXBhcmF0ZWx5IGlmIHBvc3RlciBleGlzdCBpbiBsb2FkVmlkZW9PblBvc3RlckNsaWNrIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFZpZGVvcyh0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGluZGV4KSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzOiAnbGctb2JqZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbDVWaWRlbzogaHRtbDVWaWRlbyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gQXV0b21hdGljYWxseSBuYXZpZ2F0ZSB0byBuZXh0IHNsaWRlIG9uY2UgdmlkZW8gcmVhY2hlcyB0aGUgZW5kLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nb3RvTmV4dFNsaWRlT25WaWRlb0VuZChzcmMsIGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgZmlyZWQgaW1tZWRpYXRlbHkgYmVmb3JlIGVhY2ggc2xpZGUgdHJhbnNpdGlvbi5cclxuICAgICAgICAgKiBQYXVzZSB0aGUgcHJldmlvdXMgdmlkZW9cclxuICAgICAgICAgKiBIaWRlIHRoZSBkb3dubG9hZCBidXR0b24gaWYgdGhlIHNsaWRlIGNvbnRhaW5zIFlvdVR1YmUsIFZpbWVvLCBvciBXaXN0aWEgdmlkZW9zLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBKYXZhc2NyaXB0IEV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJldkluZGV4IC0gUHJldmlvdXMgaW5kZXggb2YgdGhlIHNsaWRlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEN1cnJlbnQgaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLm9uQmVmb3JlU2xpZGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29yZS5sR2FsbGVyeU9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gZXZlbnQuZGV0YWlsLnByZXZJbmRleDtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2VWaWRlbyhwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBmaXJlZCBpbW1lZGlhdGVseSBhZnRlciBlYWNoIHNsaWRlIHRyYW5zaXRpb24uXHJcbiAgICAgICAgICogUGxheSB2aWRlbyBpZiBhdXRvcGxheVZpZGVvT25TbGlkZSBvcHRpb24gaXMgZW5hYmxlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gSmF2YXNjcmlwdCBFdmVudCBvYmplY3QuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHByZXZJbmRleCAtIFByZXZpb3VzIGluZGV4IG9mIHRoZSBzbGlkZS5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBDdXJyZW50IGluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqIEB0b2RvIHNob3VsZCBjaGVjayBvbiBvblNsaWRlTG9hZCBhcyB3ZWxsIGlmIHZpZGVvIGlzIG5vdCBsb2FkZWQgb24gYWZ0ZXIgc2xpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUub25BZnRlclNsaWRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IGV2ZW50LmRldGFpbCwgaW5kZXggPSBfYS5pbmRleCwgcHJldkluZGV4ID0gX2EucHJldkluZGV4O1xyXG4gICAgICAgICAgICAvLyBEbyBub3QgY2FsbCBvbiBmaXJzdCBzbGlkZVxyXG4gICAgICAgICAgICB2YXIgJHNsaWRlID0gdGhpcy5jb3JlLmdldFNsaWRlSXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG9wbGF5VmlkZW9PblNsaWRlICYmIGluZGV4ICE9PSBwcmV2SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkc2xpZGUuaGFzQ2xhc3MoJ2xnLWNvbXBsZXRlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9hZEFuZFBsYXlWaWRlbyhpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmxvYWRBbmRQbGF5VmlkZW8gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyICRzbGlkZSA9IHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0oaW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50R2FsbGVyeUl0ZW0ucG9zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRWaWRlb09uUG9zdGVyQ2xpY2soJHNsaWRlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVZpZGVvKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGxheSBIVE1MNSwgWW91dHViZSwgVmltZW8gb3IgV2lzdGlhIHZpZGVvcyBpbiBhIHBhcnRpY3VsYXIgc2xpZGUuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gSW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLnBsYXlWaWRlbyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xWaWRlbyhpbmRleCwgJ3BsYXknKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhdXNlIEhUTUw1LCBZb3V0dWJlLCBWaW1lbyBvciBXaXN0aWEgdmlkZW9zIGluIGEgcGFydGljdWxhciBzbGlkZS5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBJbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUucGF1c2VWaWRlbyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xWaWRlbyhpbmRleCwgJ3BhdXNlJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBWaWRlby5wcm90b3R5cGUuZ2V0VmlkZW9IdG1sID0gZnVuY3Rpb24gKHNyYywgYWRkQ2xhc3MsIGluZGV4LCBodG1sNVZpZGVvKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlbyA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9JbmZvID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF1cclxuICAgICAgICAgICAgICAgIC5fX3NsaWRlVmlkZW9JbmZvIHx8IHt9O1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIHZhciB2aWRlb1RpdGxlID0gY3VycmVudEdhbGxlcnlJdGVtLnRpdGxlIHx8IGN1cnJlbnRHYWxsZXJ5SXRlbS5hbHQ7XHJcbiAgICAgICAgICAgIHZpZGVvVGl0bGUgPSB2aWRlb1RpdGxlID8gJ3RpdGxlPVwiJyArIHZpZGVvVGl0bGUgKyAnXCInIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBjb21tb25JZnJhbWVQcm9wcyA9IFwiYWxsb3d0cmFuc3BhcmVuY3k9XFxcInRydWVcXFwiXFxuICAgICAgICAgICAgZnJhbWVib3JkZXI9XFxcIjBcXFwiXFxuICAgICAgICAgICAgc2Nyb2xsaW5nPVxcXCJub1xcXCJcXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW5cXG4gICAgICAgICAgICBtb3phbGxvd2Z1bGxzY3JlZW5cXG4gICAgICAgICAgICB3ZWJraXRhbGxvd2Z1bGxzY3JlZW5cXG4gICAgICAgICAgICBvYWxsb3dmdWxsc2NyZWVuXFxuICAgICAgICAgICAgbXNhbGxvd2Z1bGxzY3JlZW5cIjtcclxuICAgICAgICAgICAgaWYgKHZpZGVvSW5mby55b3V0dWJlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9JZCA9ICdsZy15b3V0dWJlJyArIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlVXJsUGFyYW1zID0gdmlkZW9JbmZvLnlvdXR1YmVbMl1cclxuICAgICAgICAgICAgICAgICAgICA/IHZpZGVvSW5mby55b3V0dWJlWzJdICsgJyYnXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgICAgIC8vIEZvciB5b3V0dWJlIGZpcnN0IHBhcm1zIGdldHMgcHJpb3JpdHkgaWYgZHVwbGljYXRlcyBmb3VuZFxyXG4gICAgICAgICAgICAgICAgdmFyIHlvdVR1YmVQbGF5ZXJQYXJhbXMgPSBcIj9cIiArIHNsaWRlVXJsUGFyYW1zICsgXCJ3bW9kZT1vcGFxdWUmYXV0b3BsYXk9MCZtdXRlPTEmZW5hYmxlanNhcGk9MVwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllclBhcmFtcyA9IHlvdVR1YmVQbGF5ZXJQYXJhbXMgK1xyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNldHRpbmdzLnlvdVR1YmVQbGF5ZXJQYXJhbXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnJicgKyBwYXJhbSh0aGlzLnNldHRpbmdzLnlvdVR1YmVQbGF5ZXJQYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJycpO1xyXG4gICAgICAgICAgICAgICAgdmlkZW8gPSBcIjxpZnJhbWUgYWxsb3c9XFxcImF1dG9wbGF5XFxcIiBpZD1cIiArIHZpZGVvSWQgKyBcIiBjbGFzcz1cXFwibGctdmlkZW8tb2JqZWN0IGxnLXlvdXR1YmUgXCIgKyBhZGRDbGFzcyArIFwiXFxcIiBcIiArIHZpZGVvVGl0bGUgKyBcIiBzcmM9XFxcIi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL1wiICsgKHZpZGVvSW5mby55b3V0dWJlWzFdICsgcGxheWVyUGFyYW1zKSArIFwiXFxcIiBcIiArIGNvbW1vbklmcmFtZVByb3BzICsgXCI+PC9pZnJhbWU+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLnZpbWVvKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9JZCA9ICdsZy12aW1lbycgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJQYXJhbXMgPSBnZXRWaW1lb1VSTFBhcmFtcyh0aGlzLnNldHRpbmdzLnZpbWVvUGxheWVyUGFyYW1zLCB2aWRlb0luZm8pO1xyXG4gICAgICAgICAgICAgICAgdmlkZW8gPSBcIjxpZnJhbWUgYWxsb3c9XFxcImF1dG9wbGF5XFxcIiBpZD1cIiArIHZpZGVvSWQgKyBcIiBjbGFzcz1cXFwibGctdmlkZW8tb2JqZWN0IGxnLXZpbWVvIFwiICsgYWRkQ2xhc3MgKyBcIlxcXCIgXCIgKyB2aWRlb1RpdGxlICsgXCIgc3JjPVxcXCIvL3BsYXllci52aW1lby5jb20vdmlkZW8vXCIgKyAodmlkZW9JbmZvLnZpbWVvWzFdICsgcGxheWVyUGFyYW1zKSArIFwiXFxcIiBcIiArIGNvbW1vbklmcmFtZVByb3BzICsgXCI+PC9pZnJhbWU+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLndpc3RpYSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpc3RpYUlkID0gJ2xnLXdpc3RpYScgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJQYXJhbXMgPSBwYXJhbSh0aGlzLnNldHRpbmdzLndpc3RpYVBsYXllclBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJQYXJhbXMgPSBwbGF5ZXJQYXJhbXMgPyAnPycgKyBwbGF5ZXJQYXJhbXMgOiAnJztcclxuICAgICAgICAgICAgICAgIHZpZGVvID0gXCI8aWZyYW1lIGFsbG93PVxcXCJhdXRvcGxheVxcXCIgaWQ9XFxcIlwiICsgd2lzdGlhSWQgKyBcIlxcXCIgc3JjPVxcXCIvL2Zhc3Qud2lzdGlhLm5ldC9lbWJlZC9pZnJhbWUvXCIgKyAodmlkZW9JbmZvLndpc3RpYVs0XSArIHBsYXllclBhcmFtcykgKyBcIlxcXCIgXCIgKyB2aWRlb1RpdGxlICsgXCIgY2xhc3M9XFxcIndpc3RpYV9lbWJlZCBsZy12aWRlby1vYmplY3QgbGctd2lzdGlhIFwiICsgYWRkQ2xhc3MgKyBcIlxcXCIgbmFtZT1cXFwid2lzdGlhX2VtYmVkXFxcIiBcIiArIGNvbW1vbklmcmFtZVByb3BzICsgXCI+PC9pZnJhbWU+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLmh0bWw1KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaHRtbDVWaWRlb01hcmt1cCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBodG1sNVZpZGVvLnNvdXJjZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw1VmlkZW9NYXJrdXAgKz0gXCI8c291cmNlIHNyYz1cXFwiXCIgKyBodG1sNVZpZGVvLnNvdXJjZVtpXS5zcmMgKyBcIlxcXCIgdHlwZT1cXFwiXCIgKyBodG1sNVZpZGVvLnNvdXJjZVtpXS50eXBlICsgXCJcXFwiPlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGh0bWw1VmlkZW8udHJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhY2tBdHRyaWJ1dGVzID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFjayA9IGh0bWw1VmlkZW8udHJhY2tzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0cmFjayB8fCB7fSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFja0F0dHJpYnV0ZXMgKz0ga2V5ICsgXCI9XFxcIlwiICsgdHJhY2tba2V5XSArIFwiXFxcIiBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw1VmlkZW9NYXJrdXAgKz0gXCI8dHJhY2sgXCIgKyB0cmFja0F0dHJpYnV0ZXMgKyBcIj5cIjtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaHRtbDVWaWRlby50cmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2xvb3BfMShpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaHRtbDVWaWRlb0F0dHJzXzEgPSAnJztcclxuICAgICAgICAgICAgICAgIHZhciB2aWRlb0F0dHJpYnV0ZXNfMSA9IGh0bWw1VmlkZW8uYXR0cmlidXRlcyB8fCB7fTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHZpZGVvQXR0cmlidXRlc18xIHx8IHt9KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sNVZpZGVvQXR0cnNfMSArPSBrZXkgKyBcIj1cXFwiXCIgKyB2aWRlb0F0dHJpYnV0ZXNfMVtrZXldICsgXCJcXFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB2aWRlbyA9IFwiPHZpZGVvIGNsYXNzPVxcXCJsZy12aWRlby1vYmplY3QgbGctaHRtbDUgXCIgKyAodGhpcy5zZXR0aW5ncy52aWRlb2pzID8gJ3ZpZGVvLWpzJyA6ICcnKSArIFwiXFxcIiBcIiArIGh0bWw1VmlkZW9BdHRyc18xICsgXCI+XFxuICAgICAgICAgICAgICAgIFwiICsgaHRtbDVWaWRlb01hcmt1cCArIFwiXFxuICAgICAgICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IEhUTUw1IHZpZGVvLlxcbiAgICAgICAgICAgIDwvdmlkZW8+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZpZGVvO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgLSBBcHBlbmQgdmlkZW9zIHRvIHRoZSBzbGlkZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBzbGlkZSBlbGVtZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHZpZGVvUGFyYW1zIC0gVmlkZW8gcGFyYW1ldGVycywgQ29udGFpbnMgc3JjLCBjbGFzcywgaW5kZXgsIGh0bWxWaWRlb1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5hcHBlbmRWaWRlb3MgPSBmdW5jdGlvbiAoZWwsIHZpZGVvUGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvSHRtbCA9IHRoaXMuZ2V0VmlkZW9IdG1sKHZpZGVvUGFyYW1zLnNyYywgdmlkZW9QYXJhbXMuYWRkQ2xhc3MsIHZpZGVvUGFyYW1zLmluZGV4LCB2aWRlb1BhcmFtcy5odG1sNVZpZGVvKTtcclxuICAgICAgICAgICAgZWwuZmluZCgnLmxnLXZpZGVvLWNvbnQnKS5hcHBlbmQodmlkZW9IdG1sKTtcclxuICAgICAgICAgICAgdmFyICR2aWRlb0VsZW1lbnQgPSBlbC5maW5kKCcubGctdmlkZW8tb2JqZWN0JykuZmlyc3QoKTtcclxuICAgICAgICAgICAgaWYgKHZpZGVvUGFyYW1zLmh0bWw1VmlkZW8pIHtcclxuICAgICAgICAgICAgICAgICR2aWRlb0VsZW1lbnQub24oJ21vdXNlZG93bi5sZy52aWRlbycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnZpZGVvanMgJiYgKChfYSA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbdmlkZW9QYXJhbXMuaW5kZXhdLl9fc2xpZGVWaWRlb0luZm8pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5odG1sNSkpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZpZGVvanMoJHZpZGVvRWxlbWVudC5nZXQoKSwgdGhpcy5zZXR0aW5ncy52aWRlb2pzT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeTotIE1ha2Ugc3VyZSB5b3UgaGF2ZSBpbmNsdWRlZCB2aWRlb2pzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5nb3RvTmV4dFNsaWRlT25WaWRlb0VuZCA9IGZ1bmN0aW9uIChzcmMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciAkdmlkZW9FbGVtZW50ID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy12aWRlby1vYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb0luZm8gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW2luZGV4XS5fX3NsaWRlVmlkZW9JbmZvIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5nb3RvTmV4dFNsaWRlT25WaWRlb0VuZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvSW5mby5odG1sNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICR2aWRlb0VsZW1lbnQub24oJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLmdvVG9OZXh0U2xpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby52aW1lbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aW1lby9wbGF5ZXIuanMvI2VuZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBWaW1lby5QbGF5ZXIoJHZpZGVvRWxlbWVudC5nZXQoKSkub24oJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnk6LSBNYWtlIHN1cmUgeW91IGhhdmUgaW5jbHVkZWQgLy9naXRodWIuY29tL3ZpbWVvL3BsYXllci5qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby53aXN0aWEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX3dxID0gd2luZG93Ll93cSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gRXZlbnQgaXMgZ2V0dGlnbiB0cmlnZ2VyZWQgbXVsdGlwbGUgdGltZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Ll93cS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAkdmlkZW9FbGVtZW50LmF0dHIoJ2lkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlYWR5OiBmdW5jdGlvbiAodmlkZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlby5iaW5kKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuZ29Ub05leHRTbGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeTotIE1ha2Ugc3VyZSB5b3UgaGF2ZSBpbmNsdWRlZCAvL2Zhc3Qud2lzdGlhLmNvbS9hc3NldHMvZXh0ZXJuYWwvRS12MS5qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmNvbnRyb2xWaWRlbyA9IGZ1bmN0aW9uIChpbmRleCwgYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciAkdmlkZW9FbGVtZW50ID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy12aWRlby1vYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb0luZm8gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW2luZGV4XS5fX3NsaWRlVmlkZW9JbmZvIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAoISR2aWRlb0VsZW1lbnQuZ2V0KCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh2aWRlb0luZm8ueW91dHViZSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAkdmlkZW9FbGVtZW50LmdldCgpLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoXCJ7XFxcImV2ZW50XFxcIjpcXFwiY29tbWFuZFxcXCIsXFxcImZ1bmNcXFwiOlxcXCJcIiArIGFjdGlvbiArIFwiVmlkZW9cXFwiLFxcXCJhcmdzXFxcIjpcXFwiXFxcIn1cIiwgJyonKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImxpZ2h0R2FsbGVyeTotIFwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLnZpbWVvKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWaW1lby5QbGF5ZXIoJHZpZGVvRWxlbWVudC5nZXQoKSlbYWN0aW9uXSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnk6LSBNYWtlIHN1cmUgeW91IGhhdmUgaW5jbHVkZWQgLy9naXRodWIuY29tL3ZpbWVvL3BsYXllci5qcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby5odG1sNSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudmlkZW9qcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvanMoJHZpZGVvRWxlbWVudC5nZXQoKSlbYWN0aW9uXSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnk6LSBNYWtlIHN1cmUgeW91IGhhdmUgaW5jbHVkZWQgdmlkZW9qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICR2aWRlb0VsZW1lbnQuZ2V0KClbYWN0aW9uXSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mby53aXN0aWEpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Ll93cSA9IHdpbmRvdy5fd3EgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gRmluZCBhIHdheSB0byBkZXN0cm95IHdpc3RpYSBwbGF5ZXIgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX3dxLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJHZpZGVvRWxlbWVudC5hdHRyKCdpZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblJlYWR5OiBmdW5jdGlvbiAodmlkZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvW2FjdGlvbl0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignbGlnaHRHYWxsZXJ5Oi0gTWFrZSBzdXJlIHlvdSBoYXZlIGluY2x1ZGVkIC8vZmFzdC53aXN0aWEuY29tL2Fzc2V0cy9leHRlcm5hbC9FLXYxLmpzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5sb2FkVmlkZW9PblBvc3RlckNsaWNrID0gZnVuY3Rpb24gKCRlbCwgZm9yY2VQbGF5KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHNsaWRlIGhhcyBwb3N0ZXJcclxuICAgICAgICAgICAgaWYgKCEkZWwuaGFzQ2xhc3MoJ2xnLXZpZGVvLWxvYWRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhbHJlYWR5IHZpZGVvIGVsZW1lbnQgcHJlc2VudFxyXG4gICAgICAgICAgICAgICAgaWYgKCEkZWwuaGFzQ2xhc3MoJ2xnLWhhcy12aWRlbycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdsZy1oYXMtdmlkZW8nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2h0bWwgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9zcmMgPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW3RoaXMuY29yZS5pbmRleF0uc3JjO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWRlbyA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbdGhpcy5jb3JlLmluZGV4XS52aWRlbztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlkZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2h0bWwgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHZpZGVvID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UodmlkZW8pIDogdmlkZW87XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWRlb0pzUGxheWVyXzEgPSB0aGlzLmFwcGVuZFZpZGVvcygkZWwsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBfc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzczogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmNvcmUuaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw1VmlkZW86IF9odG1sLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ290b05leHRTbGlkZU9uVmlkZW9FbmQoX3NyYywgdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHRlbXBJbWcgPSAkZWwuZmluZCgnLmxnLW9iamVjdCcpLmZpcnN0KCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRvZG8gbWFrZSBzdXJlIGl0IGlzIHdvcmtpbmdcclxuICAgICAgICAgICAgICAgICAgICAkZWwuZmluZCgnLmxnLXZpZGVvLWNvbnQnKS5maXJzdCgpLmFwcGVuZCgkdGVtcEltZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdsZy12aWRlby1sb2FkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9Kc1BsYXllcl8xICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSnNQbGF5ZXJfMS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0pzUGxheWVyXzEub24oJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uVmlkZW9Mb2FkQWZ0ZXJQb3N0ZXJDbGljaygkZWwsIF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5maW5kKCcubGctdmlkZW8tb2JqZWN0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdsb2FkLmxnIGVycm9yLmxnIGxvYWRlZG1ldGFkYXRhLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9uVmlkZW9Mb2FkQWZ0ZXJQb3N0ZXJDbGljaygkZWwsIF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlWaWRlbyh0aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZvcmNlUGxheSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5VmlkZW8odGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLm9uVmlkZW9Mb2FkQWZ0ZXJQb3N0ZXJDbGljayA9IGZ1bmN0aW9uICgkZWwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygnbGctdmlkZW8tbG9hZGVkJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheVZpZGVvKGluZGV4KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy5sZy52aWRlbycpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy52aWRlbycpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFZpZGVvO1xyXG4gICAgfSgpKTtcblxuICAgIHJldHVybiBWaWRlbztcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxnLXZpZGVvLnVtZC5qcy5tYXBcbiIsIi8qIVxuICogbGlnaHRnYWxsZXJ5IHwgMi40LjAtYmV0YS4wIHwgRGVjZW1iZXIgMTJ0aCAyMDIxXG4gKiBodHRwOi8vd3d3LmxpZ2h0Z2FsbGVyeWpzLmNvbS9cbiAqIENvcHlyaWdodCAoYykgMjAyMCBTYWNoaW4gTmVyYXZhdGg7XG4gKiBAbGljZW5zZSBHUEx2M1xuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLmxnUm90YXRlID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcbiAgICBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxuICAgIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcbiAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcbiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuICAgIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuICAgIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG4gICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuICAgIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuICAgIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XG5cbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgbGlnaHRHYWxsZXJ5IGV2ZW50c1xyXG4gICAgICogQWxsIGV2ZW50cyBzaG91bGQgYmUgZG9jdW1lbnRlZCBoZXJlXHJcbiAgICAgKiBCZWxvdyBpbnRlcmZhY2VzIGFyZSB1c2VkIHRvIGJ1aWxkIHRoZSB3ZWJzaXRlIGRvY3VtZW50YXRpb25zXHJcbiAgICAgKiAqL1xyXG4gICAgdmFyIGxHRXZlbnRzID0ge1xyXG4gICAgICAgIGFmdGVyQXBwZW5kU2xpZGU6ICdsZ0FmdGVyQXBwZW5kU2xpZGUnLFxyXG4gICAgICAgIGluaXQ6ICdsZ0luaXQnLFxyXG4gICAgICAgIGhhc1ZpZGVvOiAnbGdIYXNWaWRlbycsXHJcbiAgICAgICAgY29udGFpbmVyUmVzaXplOiAnbGdDb250YWluZXJSZXNpemUnLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlczogJ2xnVXBkYXRlU2xpZGVzJyxcclxuICAgICAgICBhZnRlckFwcGVuZFN1Ykh0bWw6ICdsZ0FmdGVyQXBwZW5kU3ViSHRtbCcsXHJcbiAgICAgICAgYmVmb3JlT3BlbjogJ2xnQmVmb3JlT3BlbicsXHJcbiAgICAgICAgYWZ0ZXJPcGVuOiAnbGdBZnRlck9wZW4nLFxyXG4gICAgICAgIHNsaWRlSXRlbUxvYWQ6ICdsZ1NsaWRlSXRlbUxvYWQnLFxyXG4gICAgICAgIGJlZm9yZVNsaWRlOiAnbGdCZWZvcmVTbGlkZScsXHJcbiAgICAgICAgYWZ0ZXJTbGlkZTogJ2xnQWZ0ZXJTbGlkZScsXHJcbiAgICAgICAgcG9zdGVyQ2xpY2s6ICdsZ1Bvc3RlckNsaWNrJyxcclxuICAgICAgICBkcmFnU3RhcnQ6ICdsZ0RyYWdTdGFydCcsXHJcbiAgICAgICAgZHJhZ01vdmU6ICdsZ0RyYWdNb3ZlJyxcclxuICAgICAgICBkcmFnRW5kOiAnbGdEcmFnRW5kJyxcclxuICAgICAgICBiZWZvcmVOZXh0U2xpZGU6ICdsZ0JlZm9yZU5leHRTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlUHJldlNsaWRlOiAnbGdCZWZvcmVQcmV2U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZUNsb3NlOiAnbGdCZWZvcmVDbG9zZScsXHJcbiAgICAgICAgYWZ0ZXJDbG9zZTogJ2xnQWZ0ZXJDbG9zZScsXHJcbiAgICAgICAgcm90YXRlTGVmdDogJ2xnUm90YXRlTGVmdCcsXHJcbiAgICAgICAgcm90YXRlUmlnaHQ6ICdsZ1JvdGF0ZVJpZ2h0JyxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogJ2xnRmxpcEhvcml6b250YWwnLFxyXG4gICAgICAgIGZsaXBWZXJ0aWNhbDogJ2xnRmxpcFZlcnRpY2FsJyxcclxuICAgICAgICBhdXRvcGxheTogJ2xnQXV0b3BsYXknLFxyXG4gICAgICAgIGF1dG9wbGF5U3RhcnQ6ICdsZ0F1dG9wbGF5U3RhcnQnLFxyXG4gICAgICAgIGF1dG9wbGF5U3RvcDogJ2xnQXV0b3BsYXlTdG9wJyxcclxuICAgIH07XG5cbiAgICB2YXIgcm90YXRlU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgcm90YXRlOiB0cnVlLFxyXG4gICAgICAgIHJvdGF0ZVNwZWVkOiA0MDAsXHJcbiAgICAgICAgcm90YXRlTGVmdDogdHJ1ZSxcclxuICAgICAgICByb3RhdGVSaWdodDogdHJ1ZSxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogdHJ1ZSxcclxuICAgICAgICBmbGlwVmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgcm90YXRlUGx1Z2luU3RyaW5nczoge1xyXG4gICAgICAgICAgICBmbGlwVmVydGljYWw6ICdGbGlwIHZlcnRpY2FsJyxcclxuICAgICAgICAgICAgZmxpcEhvcml6b250YWw6ICdGbGlwIGhvcml6b250YWwnLFxyXG4gICAgICAgICAgICByb3RhdGVMZWZ0OiAnUm90YXRlIGxlZnQnLFxyXG4gICAgICAgICAgICByb3RhdGVSaWdodDogJ1JvdGF0ZSByaWdodCcsXHJcbiAgICAgICAgfSxcclxuICAgIH07XG5cbiAgICB2YXIgUm90YXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFJvdGF0ZShpbnN0YW5jZSwgJExHKSB7XHJcbiAgICAgICAgICAgIC8vIGdldCBsaWdodEdhbGxlcnkgY29yZSBwbHVnaW4gaW5zdGFuY2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMuJExHID0gJExHO1xyXG4gICAgICAgICAgICAvLyBleHRlbmQgbW9kdWxlIGRlZmF1bHQgc2V0dGluZ3Mgd2l0aCBsaWdodEdhbGxlcnkgY29yZSBzZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHJvdGF0ZVNldHRpbmdzKSwgdGhpcy5jb3JlLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuYnVpbGRUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVJY29ucyA9ICcnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5mbGlwVmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZUljb25zICs9IFwiPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGlkPVxcXCJsZy1mbGlwLXZlclxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnJvdGF0ZVBsdWdpblN0cmluZ3NbJ2ZsaXBWZXJ0aWNhbCddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1mbGlwLXZlciBsZy1pY29uXFxcIj48L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5mbGlwSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlSWNvbnMgKz0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcImxnLWZsaXAtaG9yXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Mucm90YXRlUGx1Z2luU3RyaW5nc1snZmxpcEhvcml6b250YWwnXSArIFwiXFxcIiBjbGFzcz1cXFwibGctZmxpcC1ob3IgbGctaWNvblxcXCI+PC9idXR0b24+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mucm90YXRlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlSWNvbnMgKz0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcImxnLXJvdGF0ZS1sZWZ0XFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Mucm90YXRlUGx1Z2luU3RyaW5nc1sncm90YXRlTGVmdCddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1yb3RhdGUtbGVmdCBsZy1pY29uXFxcIj48L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5yb3RhdGVSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlSWNvbnMgKz0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcImxnLXJvdGF0ZS1yaWdodFxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnJvdGF0ZVBsdWdpblN0cmluZ3NbJ3JvdGF0ZVJpZ2h0J10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLXJvdGF0ZS1yaWdodCBsZy1pY29uXFxcIj48L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJHRvb2xiYXIuYXBwZW5kKHJvdGF0ZUljb25zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLnJvdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRUZW1wbGF0ZXMoKTtcclxuICAgICAgICAgICAgLy8gU2F2ZSByb3RhdGUgY29uZmlnIGZvciBlYWNoIGl0ZW0gdG8gcGVyc2lzdCBpdHMgcm90YXRlLCBmbGlwIHZhbHVlc1xyXG4gICAgICAgICAgICAvLyBldmVuIGFmdGVyIG5hdmlnYXRpbmcgdG8gZGlmZXJlbnQgc2xpZGVzXHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdCA9IHt9O1xyXG4gICAgICAgICAgICAvLyBldmVudCB0cmlnZ2VyZWQgYWZ0ZXIgYXBwZW5kaW5nIHNsaWRlIGNvbnRlbnRcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYWZ0ZXJBcHBlbmRTbGlkZSArIFwiLnJvdGF0ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2ZW50LmRldGFpbC5pbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBpbWFnZVdyYXAgPSBfdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbShpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy13cmFwJylcclxuICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlV3JhcC53cmFwKCdsZy1pbWctcm90YXRlJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbShfdGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXJvdGF0ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIF90aGlzLnNldHRpbmdzLnJvdGF0ZVNwZWVkICsgJ21zJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcjbGctcm90YXRlLWxlZnQnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2subGcnLCB0aGlzLnJvdGF0ZUxlZnQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNsZy1yb3RhdGUtcmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2subGcnLCB0aGlzLnJvdGF0ZVJpZ2h0LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcjbGctZmxpcC1ob3InKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2subGcnLCB0aGlzLmZsaXBIb3Jpem9udGFsLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcjbGctZmxpcC12ZXInKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5vbignY2xpY2subGcnLCB0aGlzLmZsaXBWZXJ0aWNhbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgLy8gUmVzZXQgcm90YXRlIG9uIHNsaWRlIGNoYW5nZVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5iZWZvcmVTbGlkZSArIFwiLnJvdGF0ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMucm90YXRlVmFsdWVzTGlzdFtldmVudC5kZXRhaWwuaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucm90YXRlVmFsdWVzTGlzdFtldmVudC5kZXRhaWwuaW5kZXhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3RhdGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsaXBIb3Jpem9udGFsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGlwVmVydGljYWw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmFwcGx5U3R5bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJGltYWdlID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXJvdGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgJGltYWdlLmNzcygndHJhbnNmb3JtJywgJ3JvdGF0ZSgnICtcclxuICAgICAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLnJvdGF0ZSArXHJcbiAgICAgICAgICAgICAgICAnZGVnKScgK1xyXG4gICAgICAgICAgICAgICAgJyBzY2FsZTNkKCcgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF0uZmxpcEhvcml6b250YWwgK1xyXG4gICAgICAgICAgICAgICAgJywgJyArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XS5mbGlwVmVydGljYWwgK1xyXG4gICAgICAgICAgICAgICAgJywgMSknKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUucm90YXRlTGVmdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF0ucm90YXRlIC09IDkwO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50cyhsR0V2ZW50cy5yb3RhdGVMZWZ0LCB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGU6IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLnJvdGF0ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLnJvdGF0ZVJpZ2h0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XS5yb3RhdGUgKz0gOTA7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnRzKGxHRXZlbnRzLnJvdGF0ZVJpZ2h0LCB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGU6IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLnJvdGF0ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmdldEN1cnJlbnRSb3RhdGlvbiA9IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICBpZiAoIWVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3QgPSB0aGlzLiRMRyhlbCkuc3R5bGUoKTtcclxuICAgICAgICAgICAgdmFyIHRtID0gc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW1vei10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW1zLXRyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctby10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgICdub25lJztcclxuICAgICAgICAgICAgaWYgKHRtICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB0bS5zcGxpdCgnKCcpWzFdLnNwbGl0KCcpJylbMF0uc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXRhbjIodmFsdWVzWzFdLCB2YWx1ZXNbMF0pICogKDE4MCAvIE1hdGguUEkpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5nbGUgPCAwID8gYW5nbGUgKyAzNjAgOiBhbmdsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuZmxpcEhvcml6b250YWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVFbCA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy1yb3RhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRSb3RhdGlvbiA9IHRoaXMuZ2V0Q3VycmVudFJvdGF0aW9uKHJvdGF0ZUVsKTtcclxuICAgICAgICAgICAgdmFyIHJvdGF0ZUF4aXMgPSAnZmxpcEhvcml6b250YWwnO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFJvdGF0aW9uID09PSA5MCB8fCBjdXJyZW50Um90YXRpb24gPT09IDI3MCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlQXhpcyA9ICdmbGlwVmVydGljYWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdW3JvdGF0ZUF4aXNdICo9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50cyhsR0V2ZW50cy5mbGlwSG9yaXpvbnRhbCwge1xyXG4gICAgICAgICAgICAgICAgZmxpcEhvcml6b250YWw6IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdW3JvdGF0ZUF4aXNdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuZmxpcFZlcnRpY2FsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcm90YXRlRWwgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctcm90YXRlJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Um90YXRpb24gPSB0aGlzLmdldEN1cnJlbnRSb3RhdGlvbihyb3RhdGVFbCk7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVBeGlzID0gJ2ZsaXBWZXJ0aWNhbCc7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Um90YXRpb24gPT09IDkwIHx8IGN1cnJlbnRSb3RhdGlvbiA9PT0gMjcwKSB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGVBeGlzID0gJ2ZsaXBIb3Jpem9udGFsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XVtyb3RhdGVBeGlzXSAqPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0eWxlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudHMobEdFdmVudHMuZmxpcFZlcnRpY2FsLCB7XHJcbiAgICAgICAgICAgICAgICBmbGlwVmVydGljYWw6IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdW3JvdGF0ZUF4aXNdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUudHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uIChldmVudCwgZGV0YWlsKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY29yZS5MR2VsLnRyaWdnZXIoZXZlbnQsIGRldGFpbCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuc2V0dGluZ3Mucm90YXRlU3BlZWQgKyAxMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBSb3RhdGUucHJvdG90eXBlLmlzSW1hZ2VPcmllbnRhdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVWYWx1ZSA9IHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdO1xyXG4gICAgICAgICAgICB2YXIgaXNSb3RhdGVkID0gTWF0aC5hYnMocm90YXRlVmFsdWUucm90YXRlKSAlIDM2MCAhPT0gMDtcclxuICAgICAgICAgICAgdmFyIGlmRmxpcHBlZEhvciA9IHJvdGF0ZVZhbHVlLmZsaXBIb3Jpem9udGFsIDwgMDtcclxuICAgICAgICAgICAgdmFyIGlmRmxpcHBlZFZlciA9IHJvdGF0ZVZhbHVlLmZsaXBWZXJ0aWNhbCA8IDA7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1JvdGF0ZWQgfHwgaWZGbGlwcGVkSG9yIHx8IGlmRmxpcHBlZFZlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuY2xvc2VHYWxsZXJ5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0ltYWdlT3JpZW50YXRpb25DaGFuZ2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KS5jc3MoJ29wYWNpdHknLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3QgPSB7fTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gVW5iaW5kIGFsbCBldmVudHMgYWRkZWQgYnkgbGlnaHRHYWxsZXJ5IHJvdGF0ZSBwbHVnaW5cclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcubGcucm90YXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLnJvdGF0ZScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFJvdGF0ZTtcclxuICAgIH0oKSk7XG5cbiAgICByZXR1cm4gUm90YXRlO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGctcm90YXRlLnVtZC5qcy5tYXBcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICB2YXIgZmxrdHlNYWluID0gbmV3IEZsaWNraXR5KCcuY2Fyb3VzZWwtbWFpbicsIHtcbiAgICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgICAgY2VsbEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgICAgcGFnZURvdHM6IGZhbHNlLFxuICAgICAgICBsYXp5TG9hZDogdHJ1ZSxcbiAgICAgICAgLy8gaW1hZ2VzTG9hZGVkOiB0cnVlXG4gICAgfSk7XG5cbiAgICB2YXIgZmxrdHlOYXYgPSBuZXcgRmxpY2tpdHkoJy5jYXJvdXNlbC1uYXYnLCB7XG4gICAgICAgIGFzTmF2Rm9yOiAnLmNhcm91c2VsLW1haW4nLFxuICAgICAgICBjb250YWluOiB0cnVlLFxuICAgICAgICBwYWdlRG90czogZmFsc2UsXG4gICAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICAgIGxhenlMb2FkOiB0cnVlLFxuICAgICAgICAvLyBpbWFnZXNMb2FkZWQ6IHRydWVcbiAgICB9KTtcblxuXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaWdodGdhbGxlcnknKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZpcmVkXCIpXG4gICAgICAgIGxpZ2h0R2FsbGVyeShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlnaHRnYWxsZXJ5JyksIHtcbiAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICBsZ1pvb20sXG4gICAgICAgICAgICAvL2xnVGh1bWJuYWlsLFxuICAgICAgICAgICAgbGdWaWRlbyxcbiAgICAgICAgICAgIGxnUm90YXRlLFxuICAgICAgICAgICAgLy9sZ1NoYXJlXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzcGVlZDogNTAwLFxuICAgICAgICAgIC8vbGljZW5zZUtleTogJ3lvdXJfbGljZW5zZV9rZXknLFxuICAgICAgICAgIHRodW1ibmFpbDp0cnVlLFxuICAgICAgICAgIGFuaW1hdGVUaHVtYjogZmFsc2UsXG4gICAgICAgICAgc2hvd1RodW1iQnlEZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICBkb3dubG9hZDogZmFsc2UsXG4gICAgICAgICAgc2VsZWN0b3I6ICcuY2Fyb3VzZWwtY2VsbCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLWdhbGxlcnknKSl7XG4gICAgICBsaWdodEdhbGxlcnkoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLWdhbGxlcnknKSwge1xuICAgICAgICBwbHVnaW5zOiBbbGdWaWRlb10sXG4gICAgICB9KVxuICAgIH1cbiAgfSk7Il19
