"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var singleYachtGalley = null;
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById('lightgallery')) {
    console.log("Fired");
    singleYachtGalley = lightGallery(document.getElementById('lightgallery'), {
      plugins: [lgZoom, lgThumbnail, lgVideo, lgRotate
      //lgShare
      ],
      speed: 200,
      //licenseKey: 'your_license_key',
      thumbnail: true,
      animateThumb: false,
      showThumbByDefault: true,
      download: false,
      selector: 'img',
      exThumbImage: 'data-thumb-src'
    });
  }
  if (document.getElementById('video-gallery')) {
    lightGallery(document.getElementById('video-gallery'), {
      plugins: [lgVideo]
    });
  }
  document.querySelector('#ysp-single-y-image-topper .img1').addEventListener('click', function () {
    singleYachtGalley.openGallery(0);
  });
  document.querySelector('#ysp-single-y-image-topper .img2').addEventListener('click', function () {
    singleYachtGalley.openGallery(1);
  });
  document.querySelector('#ysp-single-y-image-topper .img3').addEventListener('click', function () {
    singleYachtGalley.openGallery(2);
  });
});
function copyLink() {
  var copyText = document.getElementById("shareLinkInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied the link: " + copyText.value);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpZ2h0Z2FsbGVyeS51bWQuanMiLCJsZy10aHVtYm5haWwudW1kLmpzIiwibGctem9vbS51bWQuanMiLCJsZy12aWRlby51bWQuanMiLCJsZy1yb3RhdGUudW1kLmpzIiwic2luZ2xlLXlhY2h0LmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsImZhY3RvcnkiLCJleHBvcnRzIiwiX3R5cGVvZiIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImdsb2JhbFRoaXMiLCJzZWxmIiwibGlnaHRHYWxsZXJ5IiwiX19hc3NpZ24iLCJPYmplY3QiLCJhc3NpZ24iLCJ0IiwicyIsImkiLCJuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImFwcGx5IiwiX19zcHJlYWRBcnJheXMiLCJpbCIsInIiLCJBcnJheSIsImsiLCJhIiwiaiIsImpsIiwibEdFdmVudHMiLCJhZnRlckFwcGVuZFNsaWRlIiwiaW5pdCIsImhhc1ZpZGVvIiwiY29udGFpbmVyUmVzaXplIiwidXBkYXRlU2xpZGVzIiwiYWZ0ZXJBcHBlbmRTdWJIdG1sIiwiYmVmb3JlT3BlbiIsImFmdGVyT3BlbiIsInNsaWRlSXRlbUxvYWQiLCJiZWZvcmVTbGlkZSIsImFmdGVyU2xpZGUiLCJwb3N0ZXJDbGljayIsImRyYWdTdGFydCIsImRyYWdNb3ZlIiwiZHJhZ0VuZCIsImJlZm9yZU5leHRTbGlkZSIsImJlZm9yZVByZXZTbGlkZSIsImJlZm9yZUNsb3NlIiwiYWZ0ZXJDbG9zZSIsInJvdGF0ZUxlZnQiLCJyb3RhdGVSaWdodCIsImZsaXBIb3Jpem9udGFsIiwiZmxpcFZlcnRpY2FsIiwiYXV0b3BsYXkiLCJhdXRvcGxheVN0YXJ0IiwiYXV0b3BsYXlTdG9wIiwibGlnaHRHYWxsZXJ5Q29yZVNldHRpbmdzIiwibW9kZSIsImVhc2luZyIsInNwZWVkIiwibGljZW5zZUtleSIsImhlaWdodCIsIndpZHRoIiwiYWRkQ2xhc3MiLCJzdGFydENsYXNzIiwiYmFja2Ryb3BEdXJhdGlvbiIsImNvbnRhaW5lciIsInN0YXJ0QW5pbWF0aW9uRHVyYXRpb24iLCJ6b29tRnJvbU9yaWdpbiIsImhpZGVCYXJzRGVsYXkiLCJzaG93QmFyc0FmdGVyIiwic2xpZGVEZWxheSIsInN1cHBvcnRMZWdhY3lCcm93c2VyIiwiYWxsb3dNZWRpYU92ZXJsYXAiLCJ2aWRlb01heFNpemUiLCJsb2FkWW91VHViZVBvc3RlciIsImRlZmF1bHRDYXB0aW9uSGVpZ2h0IiwiYXJpYUxhYmVsbGVkYnkiLCJhcmlhRGVzY3JpYmVkYnkiLCJjbG9zYWJsZSIsInN3aXBlVG9DbG9zZSIsImNsb3NlT25UYXAiLCJzaG93Q2xvc2VJY29uIiwic2hvd01heGltaXplSWNvbiIsImxvb3AiLCJlc2NLZXkiLCJrZXlQcmVzcyIsImNvbnRyb2xzIiwic2xpZGVFbmRBbmltYXRpb24iLCJoaWRlQ29udHJvbE9uRW5kIiwibW91c2V3aGVlbCIsImdldENhcHRpb25Gcm9tVGl0bGVPckFsdCIsImFwcGVuZFN1Ykh0bWxUbyIsInN1Ykh0bWxTZWxlY3RvclJlbGF0aXZlIiwicHJlbG9hZCIsIm51bWJlck9mU2xpZGVJdGVtc0luRG9tIiwic2VsZWN0b3IiLCJzZWxlY3RXaXRoaW4iLCJuZXh0SHRtbCIsInByZXZIdG1sIiwiaW5kZXgiLCJpZnJhbWVXaWR0aCIsImlmcmFtZUhlaWdodCIsImlmcmFtZU1heFdpZHRoIiwiaWZyYW1lTWF4SGVpZ2h0IiwiZG93bmxvYWQiLCJjb3VudGVyIiwiYXBwZW5kQ291bnRlclRvIiwic3dpcGVUaHJlc2hvbGQiLCJlbmFibGVTd2lwZSIsImVuYWJsZURyYWciLCJkeW5hbWljIiwiZHluYW1pY0VsIiwiZXh0cmFQcm9wcyIsImV4VGh1bWJJbWFnZSIsImlzTW9iaWxlIiwidW5kZWZpbmVkIiwibW9iaWxlU2V0dGluZ3MiLCJwbHVnaW5zIiwic3RyaW5ncyIsImNsb3NlR2FsbGVyeSIsInRvZ2dsZU1heGltaXplIiwicHJldmlvdXNTbGlkZSIsIm5leHRTbGlkZSIsInBsYXlWaWRlbyIsImluaXRMZ1BvbHlmaWxscyIsIndpbmRvdyIsIkN1c3RvbUV2ZW50IiwiZXZlbnQiLCJwYXJhbXMiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImRldGFpbCIsImV2dCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJFbGVtZW50IiwibWF0Y2hlcyIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibGdRdWVyeSIsImNzc1ZlbmRlclByZWZpeGVzIiwiX2dldFNlbGVjdG9yIiwiZmlyc3RFbGVtZW50IiwiX2dldEZpcnN0RWwiLCJnZW5lcmF0ZVVVSUQiLCJyZXBsYWNlIiwiYyIsIk1hdGgiLCJyYW5kb20iLCJ2IiwidG9TdHJpbmciLCJjb250ZXh0IiwiZmwiLCJzdWJzdHJpbmciLCJxdWVyeVNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsIl9lYWNoIiwiZnVuYyIsImZvckVhY2giLCJfc2V0Q3NzVmVuZG9yUHJlZml4IiwiZWwiLCJjc3NQcm9wZXJ0eSIsInZhbHVlIiwicHJvcGVydHkiLCJncm91cDEiLCJ0b1VwcGVyQ2FzZSIsImluZGV4T2YiLCJzdHlsZSIsImNoYXJBdCIsInRvTG93ZXJDYXNlIiwic2xpY2UiLCJpc0V2ZW50TWF0Y2hlZCIsImV2ZW50TmFtZSIsImV2ZW50TmFtZXNwYWNlIiwic3BsaXQiLCJmaWx0ZXIiLCJlIiwiZXZlcnkiLCJhdHRyIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiZmluZCIsIiRMRyIsImZpcnN0IiwiZXEiLCJwYXJlbnQiLCJwYXJlbnRFbGVtZW50IiwiZ2V0IiwicmVtb3ZlQXR0ciIsImF0dHJpYnV0ZXMiLCJhdHRycyIsInJlbW92ZUF0dHJpYnV0ZSIsIndyYXAiLCJjbGFzc05hbWUiLCJ3cmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwiY2xhc3NOYW1lcyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlIiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImhhc0F0dHJpYnV0ZSIsImF0dHJpYnV0ZSIsInRvZ2dsZUNsYXNzIiwiY3NzIiwiX3RoaXMiLCJvbiIsImV2ZW50cyIsImxpc3RlbmVyIiwiaXNBcnJheSIsImV2ZW50TGlzdGVuZXJzIiwicHVzaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmNlIiwib2ZmIiwia2V5cyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0cmlnZ2VyIiwiY3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwibG9hZCIsInVybCIsImZldGNoIiwidGhlbiIsInJlcyIsImlubmVySFRNTCIsImh0bWwiLCJhcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJwcmVwZW5kIiwiZW1wdHkiLCJzY3JvbGxUb3AiLCJib2R5IiwiZG9jdW1lbnRFbGVtZW50IiwicGFnZVlPZmZzZXQiLCJzY3JvbGxMZWZ0IiwicGFnZVhPZmZzZXQiLCJvZmZzZXQiLCJsZWZ0IiwidG9wIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvZHlNYXJnaW5MZWZ0IiwibWFyZ2luTGVmdCIsInBhcnNlRmxvYXQiLCJjdXJyZW50U3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiY2xpZW50V2lkdGgiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImNsaWVudEhlaWdodCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwiZGVmYXVsdER5bmFtaWNPcHRpb25zIiwiY29udmVydFRvRGF0YSIsImciLCJ1dGlscyIsImdldFNpemUiLCJzcGFjaW5nIiwiZGVmYXVsdExnU2l6ZSIsIkxHZWwiLCJsZ1NpemUiLCJpc1Jlc3BvbnNpdmVTaXplcyIsIndXaWR0aCIsImlubmVyV2lkdGgiLCJzaXplXzEiLCJyZXNwb25zaXZlV2lkdGgiLCJwYXJzZUludCIsInNpemUiLCJjV2lkdGgiLCJjSGVpZ2h0IiwibWF4V2lkdGgiLCJtaW4iLCJtYXhIZWlnaHQiLCJyYXRpbyIsImdldFRyYW5zZm9ybSIsImJvdHRvbSIsImltYWdlU2l6ZSIsImNvbnRhaW5lclJlY3QiLCJ3SGVpZ2h0IiwiZWxXaWR0aCIsImVsSGVpZ2h0IiwiZWxTdHlsZSIsIngiLCJib3JkZXJMZWZ0IiwieSIsImJvcmRlclRvcCIsInNjWCIsInNjWSIsInRyYW5zZm9ybSIsImdldElmcmFtZU1hcmt1cCIsInNyYyIsImlmcmFtZVRpdGxlIiwidGl0bGUiLCJnZXRJbWdNYXJrdXAiLCJhbHRBdHRyIiwic3Jjc2V0Iiwic2l6ZXMiLCJzb3VyY2VzIiwic3Jjc2V0QXR0ciIsInNpemVzQXR0ciIsImltZ01hcmt1cCIsInNvdXJjZVRhZyIsInNvdXJjZU9iaiIsIkpTT04iLCJwYXJzZSIsIm1hcCIsInNvdXJjZSIsImtleSIsImdldFJlc3BvbnNpdmVTcmMiLCJzcmNJdG1zIiwicnNXaWR0aCIsInJzU3JjIiwiX3NyYyIsInNwbGljZSIsImlzSW1hZ2VMb2FkZWQiLCJpbWciLCJjb21wbGV0ZSIsIm5hdHVyYWxXaWR0aCIsImdldFZpZGVvUG9zdGVyTWFya3VwIiwiX3Bvc3RlciIsImR1bW15SW1nIiwidmlkZW9Db250U3R5bGUiLCJwbGF5VmlkZW9TdHJpbmciLCJfaXNWaWRlbyIsInZpZGVvQ2xhc3MiLCJ5b3V0dWJlIiwidmltZW8iLCJnZXREeW5hbWljT3B0aW9ucyIsIml0ZW1zIiwiZHluYW1pY0VsZW1lbnRzIiwiYXZhaWxhYmxlRHluYW1pY09wdGlvbnMiLCJpdGVtIiwic3BlY2lmaWVkIiwiZHluYW1pY0F0dHIiLCJuYW1lIiwibGFiZWwiLCJjdXJyZW50SXRlbSIsImFsdCIsInRodW1iIiwic3ViSHRtbCIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpc1ZpZGVvIiwiaXNIVE1MNVZJZGVvIiwiaHRtbDUiLCJjb25zb2xlIiwiZXJyb3IiLCJtYXRjaCIsIndpc3RpYSIsImxnSWQiLCJMaWdodEdhbGxlcnkiLCJlbGVtZW50Iiwib3B0aW9ucyIsImxnT3BlbmVkIiwibEdhbGxlcnlPbiIsImxnQnVzeSIsImN1cnJlbnRJdGVtc0luRG9tIiwicHJldlNjcm9sbFRvcCIsImlzRHVtbXlJbWFnZVJlbW92ZWQiLCJkcmFnT3JTd2lwZUVuYWJsZWQiLCJtZWRpYUNvbnRhaW5lclBvc2l0aW9uIiwiZ2VuZXJhdGVTZXR0aW5ncyIsImJ1aWxkTW9kdWxlcyIsInNldHRpbmdzIiwiZ2FsbGVyeUl0ZW1zIiwiZ2V0SXRlbXMiLCJub3JtYWxpemVTZXR0aW5ncyIsInZhbGlkYXRlTGljZW5zZSIsImFkZFNsaWRlVmlkZW9JbmZvIiwiYnVpbGRTdHJ1Y3R1cmUiLCJpbnN0YW5jZSIsInNldFRpbWVvdXQiLCJ0cmlnZ2VyUG9zdGVyQ2xpY2siLCJhcnJvdyIsIm9wZW5HYWxsZXJ5T25JdGVtQ2xpY2siLCJfbG9vcF8xIiwidGhpc18xIiwiJGVsZW1lbnQiLCJ1dWlkIiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50SXRlbUluZGV4Iiwib3BlbkdhbGxlcnkiLCJwbHVnaW4iLCJ3YXJuIiwiZ2V0U2xpZGVJdGVtIiwiZ2V0U2xpZGVJdGVtSWQiLCJnZXRJZE5hbWUiLCJpZCIsImdldEVsZW1lbnRCeUlkIiwibWFuYWdlU2luZ2xlU2xpZGVDbGFzc05hbWUiLCJvdXRlciIsIiRjb250YWluZXIiLCJzdWJIdG1sQ29udCIsImFkZENsYXNzZXMiLCJjb250YWluZXJDbGFzc05hbWUiLCJjbG9zZUljb24iLCJtYXhpbWl6ZUljb24iLCJ0ZW1wbGF0ZSIsIiRsZ0NvbXBvbmVudHMiLCIkYmFja2Ryb3AiLCIkaW5uZXIiLCIkY29udGVudCIsIiR0b29sYmFyIiwib3V0ZXJDbGFzc05hbWVzIiwicmVmcmVzaE9uUmVzaXplIiwiaGlkZUJhcnMiLCJtYW5hZ2VDbG9zZUdhbGxlcnkiLCJpbml0TW9kdWxlcyIsImN1cnJlbnRHYWxsZXJ5SXRlbSIsIl9fc2xpZGVWaWRlb0luZm8iLCJnZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uIiwiX2EiLCJ0b3BfMSIsImN1cnJlbnRJbWFnZVNpemUiLCJyZXNpemVWaWRlb1NsaWRlIiwiaW1nU3R5bGUiLCJnZXREdW1teUltZ1N0eWxlcyIsImxnVmlkZW9TdHlsZSIsImdldFZpZGVvQ29udFN0eWxlIiwiY3VycmVudFNsaWRlIiwiY3VycmVudFNyYyIsInVwZGF0ZUNvbnRyb2xzIiwiX2luZGV4Iiwic29tZSIsImdhbGxlcnlJdGVtIiwiaXRlbUluZGV4Iiwib3JnYW5pemVTbGlkZUl0ZW1zIiwibG9hZENvbnRlbnQiLCJ1cGRhdGVDdXJyZW50Q291bnRlciIsImNoaWxkcmVuIiwiZm9jdXMiLCJpdGVtc1RvQmVJbnNlcnRlZFRvRG9tIiwiZ2V0SXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbSIsImFkZEh0bWwiLCJzZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uIiwidGltZW91dCIsImN1cnJlbnRTbGlkZV8xIiwic2xpZGUiLCJjYXB0aW9uSGVpZ2h0IiwidGh1bWJDb250YWluZXIiLCJ0aHVtYkhlaWdodCIsImNsZWFyVGltZW91dCIsImhpZGVCYXJUaW1lb3V0IiwiaW5pdFBpY3R1cmVGaWxsIiwiJGltZyIsInBpY3R1cmVmaWxsIiwiZWxlbWVudHMiLCJjb3VudGVySHRtbCIsInN1Ykh0bWxVcmwiLCJmTCIsImdldER1bW15SW1hZ2VDb250ZW50IiwiJGN1cnJlbnRTbGlkZSIsIiRjdXJyZW50SXRlbSIsIl9kdW1teUltZ1NyYyIsImR1bW15SW1nQ29udGVudCIsInNldEltZ01hcmt1cCIsImltZ0NvbnRlbnQiLCJpc0ZpcnN0U2xpZGVXaXRoWm9vbUFuaW1hdGlvbiIsIm9uU2xpZGVPYmplY3RMb2FkIiwiJHNsaWRlIiwiaXNIVE1MNVZpZGVvV2l0aG91dFBvc3RlciIsIm9uTG9hZCIsIm9uRXJyb3IiLCJtZWRpYU9iamVjdCIsIm9uTGdPYmplY3RMb2FkIiwiZGVsYXkiLCJpc0ZpcnN0U2xpZGUiLCJ0cmlnZ2VyU2xpZGVJdGVtTG9hZCIsIl9zcGVlZCIsImdldFNsaWRlVHlwZSIsInBvc3RlciIsInZpZGVvIiwicmVjIiwiX2h0bWw1VmlkZW8iLCJyZXNwb25zaXZlIiwic3JjRHlJdG1zIiwidmlkZW9JbmZvIiwiaWZyYW1lIiwidG9wXzIiLCJ2aWRlb1NpemUiLCJtYXJrdXAiLCJoYXNTdGFydEFuaW1hdGlvbiIsImh0bWw1VmlkZW8iLCJoYXNQb3N0ZXIiLCJsb2FkQ29udGVudE9uRmlyc3RTbGlkZUxvYWQiLCJwcmV2SW5kZXgiLCJudW1iZXJPZkl0ZW1zIiwicG9zc2libGVOdW1iZXJPZkl0ZW1zIiwibWF4IiwicHJldkluZGV4SXRlbSIsIl9lbGVtZW50IiwiaWR4IiwibnVtYmVyT2ZFeGlzdGluZ0l0ZW1zIiwiZ2V0UHJldmlvdXNTbGlkZUluZGV4IiwiY3VycmVudEl0ZW1JZCIsInNldERvd25sb2FkVmFsdWUiLCJoaWRlRG93bmxvYWRCdG4iLCJkb3dubG9hZFVybCIsIiRkb3dubG9hZCIsIm1ha2VTbGlkZUFuaW1hdGlvbiIsImRpcmVjdGlvbiIsImN1cnJlbnRTbGlkZUl0ZW0iLCJwcmV2aW91c1NsaWRlSXRlbSIsImZyb21Ub3VjaCIsImZyb21UaHVtYiIsIm51bWJlck9mR2FsbGVyeUl0ZW1zIiwicHJldmlvdXNTbGlkZUl0ZW1fMSIsInRvcF8zIiwiYXJyb3dEaXNhYmxlIiwidG91Y2hQcmV2IiwidG91Y2hOZXh0IiwidXBkYXRlQ291bnRlclRvdGFsIiwidG91Y2hNb3ZlIiwic3RhcnRDb29yZHMiLCJlbmRDb29yZHMiLCJkaXN0YW5jZVgiLCJwYWdlWCIsImRpc3RhbmNlWSIsInBhZ2VZIiwiYWxsb3dTd2lwZSIsInN3aXBlRGlyZWN0aW9uIiwiYWJzIiwic2V0VHJhbnNsYXRlIiwib2Zmc2V0V2lkdGgiLCJzbGlkZVdpZHRoQW1vdW50IiwiZ3V0dGVyIiwib3BhY2l0eSIsImlubmVySGVpZ2h0Iiwic2NhbGUiLCJ0b3VjaEVuZCIsImRpc3RhbmNlIiwidHJpZ2dlckNsaWNrIiwiZGlzdGFuY2VBYnMiLCJnb1RvTmV4dFNsaWRlIiwiZ29Ub1ByZXZTbGlkZSIsInRhcmdldCIsImlzUG9zdGVyRWxlbWVudCIsImlzTW92ZWQiLCJpc1N3aXBpbmciLCIkaXRlbSIsInRhcmdldFRvdWNoZXMiLCJ0b3VjaEFjdGlvbiIsIm1hbmFnZVN3aXBlQ2xhc3MiLCJpc0RyYWdpbmciLCJfdG91Y2hOZXh0IiwiX3RvdWNoUHJldiIsIl9sb29wIiwia2V5Q29kZSIsIiRwcmV2IiwiJG5leHQiLCIkZWwiLCJ4VmFsdWUiLCJ5VmFsdWUiLCJzY2FsZVgiLCJzY2FsZVkiLCJsYXN0Q2FsbCIsImRlbHRhWSIsIm5vdyIsIkRhdGUiLCJnZXRUaW1lIiwiaXNTbGlkZUVsZW1lbnQiLCJwbGF5QnV0dG9uIiwiaW52YWxpZGF0ZUl0ZW1zIiwibW91c2Vkb3duIiwiZm9yY2UiLCJ0b3BfNCIsIl9iIiwiZGVzdHJveU1vZHVsZXMiLCJyZW1vdmVUaW1lb3V0IiwiYmx1ciIsImVyciIsImRlc3Ryb3kiLCJyZWZyZXNoIiwiY2xvc2VUaW1lb3V0IiwibGdUaHVtYm5haWwiLCJ0aHVtYm5haWxzU2V0dGluZ3MiLCJ0aHVtYm5haWwiLCJhbmltYXRlVGh1bWIiLCJjdXJyZW50UGFnZXJQb3NpdGlvbiIsImFsaWduVGh1bWJuYWlscyIsInRodW1iV2lkdGgiLCJ0aHVtYk1hcmdpbiIsImFwcGVuZFRodW1ibmFpbHNUbyIsInRvZ2dsZVRodW1iIiwiZW5hYmxlVGh1bWJEcmFnIiwiZW5hYmxlVGh1bWJTd2lwZSIsInRodW1ibmFpbFN3aXBlVGhyZXNob2xkIiwibG9hZFlvdVR1YmVUaHVtYm5haWwiLCJ5b3VUdWJlVGh1bWJTaXplIiwidGh1bWJuYWlsUGx1Z2luU3RyaW5ncyIsInRvZ2dsZVRodW1ibmFpbHMiLCJUaHVtYm5haWwiLCJ0aHVtYk91dGVyV2lkdGgiLCJ0aHVtYlRvdGFsV2lkdGgiLCJ0cmFuc2xhdGVYIiwidGh1bWJDbGlja2FibGUiLCJjb3JlIiwic2V0QW5pbWF0ZVRodW1iU3R5bGVzIiwiYnVpbGQiLCJ0b2dnbGVUaHVtYkJhciIsInRodW1iS2V5UHJlc3MiLCJzZXRUaHVtYk1hcmt1cCIsIm1hbmFnZUFjdGl2ZUNsYXNzT25TbGlkZUNoYW5nZSIsIiRsZ1RodW1iIiwiJHRhcmdldCIsInJlYnVpbGRUaHVtYm5haWxzIiwidGh1bWJPdXRlckNsYXNzTmFtZXMiLCIkdGh1bWJPdXRlciIsInNldFRodW1iSXRlbUh0bWwiLCJ0aHVtYkRyYWdVdGlscyIsImNvcmRzIiwic3RhcnRYIiwiZW5kWCIsIm5ld1RyYW5zbGF0ZVgiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwidG91Y2hNb3ZlVGltZSIsImlzRHJhZ2dpbmciLCJvblRodW1iVG91Y2hNb3ZlIiwib25UaHVtYlRvdWNoRW5kIiwiZ2V0UG9zc2libGVUcmFuc2Zvcm1YIiwicG9zaXRpb24iLCJ2YWx1ZU9mIiwidG91Y2hEdXJhdGlvbiIsImRpc3RhbmNlWG5ldyIsInNwZWVkWCIsImdldFRodW1iSHRtbCIsInNsaWRlVmlkZW9JbmZvIiwidGh1bWJJbWciLCJnZXRUaHVtYkl0ZW1IdG1sIiwidGh1bWJMaXN0IiwiJHRodW1iIiwibGdab29tIiwiem9vbVNldHRpbmdzIiwiem9vbSIsImFjdHVhbFNpemUiLCJzaG93Wm9vbUluT3V0SWNvbnMiLCJhY3R1YWxTaXplSWNvbnMiLCJ6b29tSW4iLCJ6b29tT3V0IiwiZW5hYmxlWm9vbUFmdGVyIiwiem9vbVBsdWdpblN0cmluZ3MiLCJ2aWV3QWN0dWFsU2l6ZSIsIlpvb20iLCJidWlsZFRlbXBsYXRlcyIsInpvb21JY29ucyIsImVuYWJsZVpvb20iLCJ6b29tYWJsZVRpbWVvdXQiLCJpc0ltYWdlU2xpZGUiLCJzZXRab29tRXNzZW50aWFscyIsImVuYWJsZVpvb21PblNsaWRlSXRlbUxvYWQiLCJiaW5kIiwiZ2V0TW9kaWZpZXIiLCJyb3RhdGVWYWx1ZSIsImF4aXMiLCJvcmlnaW5hbFJvdGF0ZSIsInRyYW5zZm9ybVZhbHVlcyIsImdldEN1cnJlbnRUcmFuc2Zvcm0iLCJtb2RpZmllciIsImZsaXBIb3Jpem9udGFsVmFsdWUiLCJzaWduIiwiZmxpcFZlcnRpY2FsVmFsdWUiLCJzaW5YIiwic2luTWludXNYIiwiZ2V0SW1hZ2VTaXplIiwiJGltYWdlIiwiaW1hZ2VTaXplcyIsImdldERyYWdDb3JkcyIsImdldFN3aXBlQ29yZHMiLCJnZXREcmFnQWxsb3dlZEF4aXNlcyIsImFsbG93WSIsImltYWdlWVNpemUiLCJhbGxvd1giLCJpbWFnZVhTaXplIiwic3QiLCJ0bSIsImdldFByb3BlcnR5VmFsdWUiLCJnZXRDdXJyZW50Um90YXRpb24iLCJ2YWx1ZXMiLCJyb3VuZCIsImF0YW4yIiwiUEkiLCJyb3RhdGVFbCIsIm1vZGlmaWVyWCIsIm1vZGlmaWVyWSIsInpvb21JbWFnZSIsIm9mZnNldFgiLCJ0b3BCb3R0b21TcGFjaW5nIiwib2Zmc2V0WSIsIm9yaWdpbmFsWCIsIm9yaWdpbmFsWSIsInBvc2l0aW9uQ2hhbmdlZCIsImRyYWdBbGxvd2VkQXhpc2VzIiwicG9zc2libGVTd2lwZUNvcmRzIiwiZ2V0UG9zc2libGVTd2lwZURyYWdDb3JkcyIsIl94IiwiX3kiLCJpc0JleW9uZFBvc3NpYmxlTGVmdCIsIm1pblgiLCJpc0JleW9uZFBvc3NpYmxlUmlnaHQiLCJtYXhYIiwiaXNCZXlvbmRQb3NzaWJsZVRvcCIsIm1pblkiLCJpc0JleW9uZFBvc3NpYmxlQm90dG9tIiwibWF4WSIsInNldFpvb21TdHlsZXMiLCIkZHVtbXlJbWFnZSIsIiRpbWFnZVdyYXAiLCJzZXRBY3R1YWxTaXplIiwiZ2V0Q3VycmVudEltYWdlQWN0dWFsU2l6ZVNjYWxlIiwiZ2V0U2NhbGUiLCJzZXRQYWdlQ29yZHMiLCJiZWdpblpvb20iLCJnZXROYXR1cmFsV2lkdGgiLCJnZXRBY3R1YWxTaXplU2NhbGUiLCJfc2NhbGUiLCJnZXRQYWdlQ29yZHMiLCJwYWdlQ29yZHMiLCIkYWN0dWFsU2l6ZSIsInJlc2V0Wm9vbSIsImFjdHVhbFNpemVTY2FsZSIsInRhcHBlZCIsInpvb21EcmFnIiwicGluY2hab29tIiwiem9vbVN3aXBlIiwiZ2V0VG91Y2hEaXN0YW5jZSIsInNxcnQiLCJzdGFydERpc3QiLCJwaW5jaFN0YXJ0ZWQiLCJpbml0U2NhbGUiLCJlbmREaXN0IiwidG91Y2hlbmRab29tIiwiZGlzdGFuY2VZbmV3Iiwic3BlZWRZIiwiX0xHZWwiLCJzZXRab29tU3dpcGVTdHlsZXMiLCJnZXRab29tU3dpcGVDb3JkcyIsImRpZmZNaW5ZIiwiZGlmZk1heFkiLCJkaWZmTWluWCIsImRpZk1heFgiLCJkYXRhU2NhbGUiLCJlbERhdGFTY2FsZSIsImxnVmlkZW8iLCJ2aWRlb1NldHRpbmdzIiwiYXV0b3BsYXlGaXJzdFZpZGVvIiwieW91VHViZVBsYXllclBhcmFtcyIsInZpbWVvUGxheWVyUGFyYW1zIiwid2lzdGlhUGxheWVyUGFyYW1zIiwiZ290b05leHRTbGlkZU9uVmlkZW9FbmQiLCJhdXRvcGxheVZpZGVvT25TbGlkZSIsInZpZGVvanMiLCJ2aWRlb2pzT3B0aW9ucyIsInBhcmFtIiwib2JqIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImdldFZpbWVvVVJMUGFyYW1zIiwiZGVmYXVsdFBhcmFtcyIsInVybFBhcmFtcyIsImRlZmF1bHRQbGF5ZXJQYXJhbXMiLCJWaWRlbyIsIm9uSGFzVmlkZW8iLCJsb2FkVmlkZW9PblBvc3RlckNsaWNrIiwib25TbGlkZUl0ZW1Mb2FkIiwib25CZWZvcmVTbGlkZSIsIm9uQWZ0ZXJTbGlkZSIsImxvYWRBbmRQbGF5VmlkZW8iLCJhcHBlbmRWaWRlb3MiLCJwYXVzZVZpZGVvIiwiY29udHJvbFZpZGVvIiwiZ2V0VmlkZW9IdG1sIiwidmlkZW9UaXRsZSIsImNvbW1vbklmcmFtZVByb3BzIiwidmlkZW9JZCIsInNsaWRlVXJsUGFyYW1zIiwicGxheWVyUGFyYW1zIiwid2lzdGlhSWQiLCJodG1sNVZpZGVvTWFya3VwIiwidHlwZSIsInRyYWNrcyIsInRyYWNrQXR0cmlidXRlcyIsInRyYWNrIiwiaHRtbDVWaWRlb0F0dHJzXzEiLCJ2aWRlb0F0dHJpYnV0ZXNfMSIsInZpZGVvUGFyYW1zIiwidmlkZW9IdG1sIiwiJHZpZGVvRWxlbWVudCIsInN0b3BQcm9wYWdhdGlvbiIsIlZpbWVvIiwiUGxheWVyIiwiX3dxIiwib25SZWFkeSIsImFjdGlvbiIsImNvbnRlbnRXaW5kb3ciLCJwb3N0TWVzc2FnZSIsImZvcmNlUGxheSIsIl9odG1sIiwidmlkZW9Kc1BsYXllcl8xIiwiJHRlbXBJbWciLCJyZWFkeSIsIm9uVmlkZW9Mb2FkQWZ0ZXJQb3N0ZXJDbGljayIsImxnUm90YXRlIiwicm90YXRlU2V0dGluZ3MiLCJyb3RhdGUiLCJyb3RhdGVTcGVlZCIsInJvdGF0ZVBsdWdpblN0cmluZ3MiLCJSb3RhdGUiLCJyb3RhdGVJY29ucyIsInJvdGF0ZVZhbHVlc0xpc3QiLCJpbWFnZVdyYXAiLCJhcHBseVN0eWxlcyIsInRyaWdnZXJFdmVudHMiLCJhbmdsZSIsImN1cnJlbnRSb3RhdGlvbiIsInJvdGF0ZUF4aXMiLCJpc0ltYWdlT3JpZW50YXRpb25DaGFuZ2VkIiwiaXNSb3RhdGVkIiwiaWZGbGlwcGVkSG9yIiwiaWZGbGlwcGVkVmVyIiwic2luZ2xlWWFjaHRHYWxsZXkiLCJsb2ciLCJzaG93VGh1bWJCeURlZmF1bHQiLCJjb3B5TGluayIsImNvcHlUZXh0Iiwic2VsZWN0Iiwic2V0U2VsZWN0aW9uUmFuZ2UiLCJleGVjQ29tbWFuZCIsImFsZXJ0Il0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBQUEsTUFBQSxFQUFBQyxPQUFBLEVBQUE7RUFDQSxRQUFBQyxPQUFBLGlDQUFBQyxPQUFBLENBQUFELE9BQUEsT0FBQSxRQUFBLElBQUEsT0FBQUUsTUFBQSxLQUFBLFdBQUEsR0FBQUEsTUFBQSxDQUFBRixPQUFBLEdBQUFELE9BQUEsQ0FBQSxDQUFBLEdBQ0EsT0FBQUksTUFBQSxLQUFBLFVBQUEsSUFBQUEsTUFBQSxDQUFBQyxHQUFBLEdBQUFELE1BQUEsQ0FBQUosT0FBQSxDQUFBLElBQ0FELE1BQUEsR0FBQSxPQUFBTyxVQUFBLEtBQUEsV0FBQSxHQUFBQSxVQUFBLEdBQUFQLE1BQUEsSUFBQVEsSUFBQSxFQUFBUixNQUFBLENBQUFTLFlBQUEsR0FBQVIsT0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLENBQUEsVUFBQSxZQUFBO0VBQUEsWUFBQTs7RUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFJQSxJQUFBUyxPQUFBLEdBQUEsU0FBQUEsUUFBQUEsQ0FBQSxFQUFBO0lBQ0FBLE9BQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLElBQUEsU0FBQUYsUUFBQUEsQ0FBQUcsQ0FBQSxFQUFBO01BQ0EsS0FBQSxJQUFBQyxDQUFBLEVBQUFDLENBQUEsR0FBQSxDQUFBLEVBQUFDLENBQUEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLEVBQUFILENBQUEsR0FBQUMsQ0FBQSxFQUFBRCxDQUFBLEVBQUEsRUFBQTtRQUNBRCxDQUFBLEdBQUFHLFNBQUEsQ0FBQUYsQ0FBQSxDQUFBO1FBQ0EsS0FBQSxJQUFBSSxDQUFBLElBQUFMLENBQUEsRUFBQSxJQUFBSCxNQUFBLENBQUFTLFNBQUEsQ0FBQUMsY0FBQSxDQUFBQyxJQUFBLENBQUFSLENBQUEsRUFBQUssQ0FBQSxDQUFBLEVBQUFOLENBQUEsQ0FBQU0sQ0FBQSxDQUFBLEdBQUFMLENBQUEsQ0FBQUssQ0FBQSxDQUFBO01BQ0E7TUFDQSxPQUFBTixDQUFBO0lBQ0EsQ0FBQTtJQUNBLE9BQUFILE9BQUEsQ0FBQWEsS0FBQSxDQUFBLElBQUEsRUFBQU4sU0FBQSxDQUFBO0VBQ0EsQ0FBQTtFQUVBLFNBQUFPLGNBQUFBLENBQUEsRUFBQTtJQUNBLEtBQUEsSUFBQVYsQ0FBQSxHQUFBLENBQUEsRUFBQUMsQ0FBQSxHQUFBLENBQUEsRUFBQVUsRUFBQSxHQUFBUixTQUFBLENBQUFDLE1BQUEsRUFBQUgsQ0FBQSxHQUFBVSxFQUFBLEVBQUFWLENBQUEsRUFBQSxFQUFBRCxDQUFBLElBQUFHLFNBQUEsQ0FBQUYsQ0FBQSxDQUFBLENBQUFHLE1BQUE7SUFDQSxLQUFBLElBQUFRLENBQUEsR0FBQUMsS0FBQSxDQUFBYixDQUFBLENBQUEsRUFBQWMsQ0FBQSxHQUFBLENBQUEsRUFBQWIsQ0FBQSxHQUFBLENBQUEsRUFBQUEsQ0FBQSxHQUFBVSxFQUFBLEVBQUFWLENBQUEsRUFBQSxFQUNBLEtBQUEsSUFBQWMsQ0FBQSxHQUFBWixTQUFBLENBQUFGLENBQUEsQ0FBQSxFQUFBZSxDQUFBLEdBQUEsQ0FBQSxFQUFBQyxFQUFBLEdBQUFGLENBQUEsQ0FBQVgsTUFBQSxFQUFBWSxDQUFBLEdBQUFDLEVBQUEsRUFBQUQsQ0FBQSxFQUFBLEVBQUFGLENBQUEsRUFBQSxFQUNBRixDQUFBLENBQUFFLENBQUEsQ0FBQSxHQUFBQyxDQUFBLENBQUFDLENBQUEsQ0FBQTtJQUNBLE9BQUFKLENBQUE7RUFDQTs7RUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0EsSUFBQU0sUUFBQSxHQUFBO0lBQ0FDLGdCQUFBLEVBQUEsb0JBQUE7SUFDQUMsSUFBQSxFQUFBLFFBQUE7SUFDQUMsUUFBQSxFQUFBLFlBQUE7SUFDQUMsZUFBQSxFQUFBLG1CQUFBO0lBQ0FDLFlBQUEsRUFBQSxnQkFBQTtJQUNBQyxrQkFBQSxFQUFBLHNCQUFBO0lBQ0FDLFVBQUEsRUFBQSxjQUFBO0lBQ0FDLFNBQUEsRUFBQSxhQUFBO0lBQ0FDLGFBQUEsRUFBQSxpQkFBQTtJQUNBQyxXQUFBLEVBQUEsZUFBQTtJQUNBQyxVQUFBLEVBQUEsY0FBQTtJQUNBQyxXQUFBLEVBQUEsZUFBQTtJQUNBQyxTQUFBLEVBQUEsYUFBQTtJQUNBQyxRQUFBLEVBQUEsWUFBQTtJQUNBQyxPQUFBLEVBQUEsV0FBQTtJQUNBQyxlQUFBLEVBQUEsbUJBQUE7SUFDQUMsZUFBQSxFQUFBLG1CQUFBO0lBQ0FDLFdBQUEsRUFBQSxlQUFBO0lBQ0FDLFVBQUEsRUFBQSxjQUFBO0lBQ0FDLFVBQUEsRUFBQSxjQUFBO0lBQ0FDLFdBQUEsRUFBQSxlQUFBO0lBQ0FDLGNBQUEsRUFBQSxrQkFBQTtJQUNBQyxZQUFBLEVBQUEsZ0JBQUE7SUFDQUMsUUFBQSxFQUFBLFlBQUE7SUFDQUMsYUFBQSxFQUFBLGlCQUFBO0lBQ0FDLFlBQUEsRUFBQTtFQUNBLENBQUE7RUFFQSxJQUFBQyx3QkFBQSxHQUFBO0lBQ0FDLElBQUEsRUFBQSxVQUFBO0lBQ0FDLE1BQUEsRUFBQSxNQUFBO0lBQ0FDLEtBQUEsRUFBQSxHQUFBO0lBQ0FDLFVBQUEsRUFBQSxvQkFBQTtJQUNBQyxNQUFBLEVBQUEsTUFBQTtJQUNBQyxLQUFBLEVBQUEsTUFBQTtJQUNBQyxRQUFBLEVBQUEsRUFBQTtJQUNBQyxVQUFBLEVBQUEsZUFBQTtJQUNBQyxnQkFBQSxFQUFBLEdBQUE7SUFDQUMsU0FBQSxFQUFBLEVBQUE7SUFDQUMsc0JBQUEsRUFBQSxHQUFBO0lBQ0FDLGNBQUEsRUFBQSxJQUFBO0lBQ0FDLGFBQUEsRUFBQSxDQUFBO0lBQ0FDLGFBQUEsRUFBQSxLQUFBO0lBQ0FDLFVBQUEsRUFBQSxDQUFBO0lBQ0FDLG9CQUFBLEVBQUEsSUFBQTtJQUNBQyxpQkFBQSxFQUFBLEtBQUE7SUFDQUMsWUFBQSxFQUFBLFVBQUE7SUFDQUMsaUJBQUEsRUFBQSxJQUFBO0lBQ0FDLG9CQUFBLEVBQUEsQ0FBQTtJQUNBQyxjQUFBLEVBQUEsRUFBQTtJQUNBQyxlQUFBLEVBQUEsRUFBQTtJQUNBQyxRQUFBLEVBQUEsSUFBQTtJQUNBQyxZQUFBLEVBQUEsSUFBQTtJQUNBQyxVQUFBLEVBQUEsSUFBQTtJQUNBQyxhQUFBLEVBQUEsSUFBQTtJQUNBQyxnQkFBQSxFQUFBLEtBQUE7SUFDQUMsSUFBQSxFQUFBLElBQUE7SUFDQUMsTUFBQSxFQUFBLElBQUE7SUFDQUMsUUFBQSxFQUFBLElBQUE7SUFDQUMsUUFBQSxFQUFBLElBQUE7SUFDQUMsaUJBQUEsRUFBQSxJQUFBO0lBQ0FDLGdCQUFBLEVBQUEsS0FBQTtJQUNBQyxVQUFBLEVBQUEsS0FBQTtJQUNBQyx3QkFBQSxFQUFBLElBQUE7SUFDQUMsZUFBQSxFQUFBLGNBQUE7SUFDQUMsdUJBQUEsRUFBQSxLQUFBO0lBQ0FDLE9BQUEsRUFBQSxDQUFBO0lBQ0FDLHVCQUFBLEVBQUEsRUFBQTtJQUNBQyxRQUFBLEVBQUEsRUFBQTtJQUNBQyxZQUFBLEVBQUEsRUFBQTtJQUNBQyxRQUFBLEVBQUEsRUFBQTtJQUNB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QUEsRUFBQSxZQUFBO0lBQ0FrbUIsaUJBQUEsQ0FBQXZiLFdBQUEsQ0FBQSxDQUFBLENBQUE7RUFDQSxDQUFBLENBQUE7RUFFQWpRLFFBQUEsQ0FBQXNCLGFBQUEsQ0FBQSxrQ0FBQSxDQUFBLENBQUFnRSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxZQUFBO0lBQ0FrbUIsaUJBQUEsQ0FBQXZiLFdBQUEsQ0FBQSxDQUFBLENBQUE7RUFDQSxDQUFBLENBQUE7QUFDQSxDQUFBLENBQUE7QUFHQSxTQUFBMGIsUUFBQUEsQ0FBQSxFQUFBO0VBRUEsSUFBQUMsUUFBQSxHQUFBNXJCLFFBQUEsQ0FBQXdRLGNBQUEsQ0FBQSxnQkFBQSxDQUFBO0VBRUFvYixRQUFBLENBQUFDLE1BQUEsQ0FBQSxDQUFBO0VBQ0FELFFBQUEsQ0FBQUUsaUJBQUEsQ0FBQSxDQUFBLEVBQUEsS0FBQSxDQUFBO0VBRUE5ckIsUUFBQSxDQUFBK3JCLFdBQUEsQ0FBQSxNQUFBLENBQUE7RUFFQUMsS0FBQSxDQUFBLG1CQUFBLEdBQUFKLFFBQUEsQ0FBQTlwQixLQUFBLENBQUE7QUFDQSIsImZpbGUiOiJhcHBTaW5nbGVZYWNodC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogbGlnaHRnYWxsZXJ5IHwgMi40LjAtYmV0YS4wIHwgRGVjZW1iZXIgMTJ0aCAyMDIxXG4gKiBodHRwOi8vd3d3LmxpZ2h0Z2FsbGVyeWpzLmNvbS9cbiAqIENvcHlyaWdodCAoYykgMjAyMCBTYWNoaW4gTmVyYXZhdGg7XG4gKiBAbGljZW5zZSBHUEx2M1xuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLmxpZ2h0R2FsbGVyeSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG4gICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbiAgICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG4gICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG4gICAgUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbiAgICBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuICAgIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcbiAgICBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiBsaWdodEdhbGxlcnkgZXZlbnRzXHJcbiAgICAgKiBBbGwgZXZlbnRzIHNob3VsZCBiZSBkb2N1bWVudGVkIGhlcmVcclxuICAgICAqIEJlbG93IGludGVyZmFjZXMgYXJlIHVzZWQgdG8gYnVpbGQgdGhlIHdlYnNpdGUgZG9jdW1lbnRhdGlvbnNcclxuICAgICAqICovXHJcbiAgICB2YXIgbEdFdmVudHMgPSB7XHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTbGlkZTogJ2xnQWZ0ZXJBcHBlbmRTbGlkZScsXHJcbiAgICAgICAgaW5pdDogJ2xnSW5pdCcsXHJcbiAgICAgICAgaGFzVmlkZW86ICdsZ0hhc1ZpZGVvJyxcclxuICAgICAgICBjb250YWluZXJSZXNpemU6ICdsZ0NvbnRhaW5lclJlc2l6ZScsXHJcbiAgICAgICAgdXBkYXRlU2xpZGVzOiAnbGdVcGRhdGVTbGlkZXMnLFxyXG4gICAgICAgIGFmdGVyQXBwZW5kU3ViSHRtbDogJ2xnQWZ0ZXJBcHBlbmRTdWJIdG1sJyxcclxuICAgICAgICBiZWZvcmVPcGVuOiAnbGdCZWZvcmVPcGVuJyxcclxuICAgICAgICBhZnRlck9wZW46ICdsZ0FmdGVyT3BlbicsXHJcbiAgICAgICAgc2xpZGVJdGVtTG9hZDogJ2xnU2xpZGVJdGVtTG9hZCcsXHJcbiAgICAgICAgYmVmb3JlU2xpZGU6ICdsZ0JlZm9yZVNsaWRlJyxcclxuICAgICAgICBhZnRlclNsaWRlOiAnbGdBZnRlclNsaWRlJyxcclxuICAgICAgICBwb3N0ZXJDbGljazogJ2xnUG9zdGVyQ2xpY2snLFxyXG4gICAgICAgIGRyYWdTdGFydDogJ2xnRHJhZ1N0YXJ0JyxcclxuICAgICAgICBkcmFnTW92ZTogJ2xnRHJhZ01vdmUnLFxyXG4gICAgICAgIGRyYWdFbmQ6ICdsZ0RyYWdFbmQnLFxyXG4gICAgICAgIGJlZm9yZU5leHRTbGlkZTogJ2xnQmVmb3JlTmV4dFNsaWRlJyxcclxuICAgICAgICBiZWZvcmVQcmV2U2xpZGU6ICdsZ0JlZm9yZVByZXZTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlQ2xvc2U6ICdsZ0JlZm9yZUNsb3NlJyxcclxuICAgICAgICBhZnRlckNsb3NlOiAnbGdBZnRlckNsb3NlJyxcclxuICAgICAgICByb3RhdGVMZWZ0OiAnbGdSb3RhdGVMZWZ0JyxcclxuICAgICAgICByb3RhdGVSaWdodDogJ2xnUm90YXRlUmlnaHQnLFxyXG4gICAgICAgIGZsaXBIb3Jpem9udGFsOiAnbGdGbGlwSG9yaXpvbnRhbCcsXHJcbiAgICAgICAgZmxpcFZlcnRpY2FsOiAnbGdGbGlwVmVydGljYWwnLFxyXG4gICAgICAgIGF1dG9wbGF5OiAnbGdBdXRvcGxheScsXHJcbiAgICAgICAgYXV0b3BsYXlTdGFydDogJ2xnQXV0b3BsYXlTdGFydCcsXHJcbiAgICAgICAgYXV0b3BsYXlTdG9wOiAnbGdBdXRvcGxheVN0b3AnLFxyXG4gICAgfTtcblxuICAgIHZhciBsaWdodEdhbGxlcnlDb3JlU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgbW9kZTogJ2xnLXNsaWRlJyxcclxuICAgICAgICBlYXNpbmc6ICdlYXNlJyxcclxuICAgICAgICBzcGVlZDogNDAwLFxyXG4gICAgICAgIGxpY2Vuc2VLZXk6ICcwMDAwLTAwMDAtMDAwLTAwMDAnLFxyXG4gICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgYWRkQ2xhc3M6ICcnLFxyXG4gICAgICAgIHN0YXJ0Q2xhc3M6ICdsZy1zdGFydC16b29tJyxcclxuICAgICAgICBiYWNrZHJvcER1cmF0aW9uOiAzMDAsXHJcbiAgICAgICAgY29udGFpbmVyOiAnJyxcclxuICAgICAgICBzdGFydEFuaW1hdGlvbkR1cmF0aW9uOiA0MDAsXHJcbiAgICAgICAgem9vbUZyb21PcmlnaW46IHRydWUsXHJcbiAgICAgICAgaGlkZUJhcnNEZWxheTogMCxcclxuICAgICAgICBzaG93QmFyc0FmdGVyOiAxMDAwMCxcclxuICAgICAgICBzbGlkZURlbGF5OiAwLFxyXG4gICAgICAgIHN1cHBvcnRMZWdhY3lCcm93c2VyOiB0cnVlLFxyXG4gICAgICAgIGFsbG93TWVkaWFPdmVybGFwOiBmYWxzZSxcclxuICAgICAgICB2aWRlb01heFNpemU6ICcxMjgwLTcyMCcsXHJcbiAgICAgICAgbG9hZFlvdVR1YmVQb3N0ZXI6IHRydWUsXHJcbiAgICAgICAgZGVmYXVsdENhcHRpb25IZWlnaHQ6IDAsXHJcbiAgICAgICAgYXJpYUxhYmVsbGVkYnk6ICcnLFxyXG4gICAgICAgIGFyaWFEZXNjcmliZWRieTogJycsXHJcbiAgICAgICAgY2xvc2FibGU6IHRydWUsXHJcbiAgICAgICAgc3dpcGVUb0Nsb3NlOiB0cnVlLFxyXG4gICAgICAgIGNsb3NlT25UYXA6IHRydWUsXHJcbiAgICAgICAgc2hvd0Nsb3NlSWNvbjogdHJ1ZSxcclxuICAgICAgICBzaG93TWF4aW1pemVJY29uOiBmYWxzZSxcclxuICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgIGVzY0tleTogdHJ1ZSxcclxuICAgICAgICBrZXlQcmVzczogdHJ1ZSxcclxuICAgICAgICBjb250cm9sczogdHJ1ZSxcclxuICAgICAgICBzbGlkZUVuZEFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICBoaWRlQ29udHJvbE9uRW5kOiBmYWxzZSxcclxuICAgICAgICBtb3VzZXdoZWVsOiBmYWxzZSxcclxuICAgICAgICBnZXRDYXB0aW9uRnJvbVRpdGxlT3JBbHQ6IHRydWUsXHJcbiAgICAgICAgYXBwZW5kU3ViSHRtbFRvOiAnLmxnLXN1Yi1odG1sJyxcclxuICAgICAgICBzdWJIdG1sU2VsZWN0b3JSZWxhdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgcHJlbG9hZDogMixcclxuICAgICAgICBudW1iZXJPZlNsaWRlSXRlbXNJbkRvbTogMTAsXHJcbiAgICAgICAgc2VsZWN0b3I6ICcnLFxyXG4gICAgICAgIHNlbGVjdFdpdGhpbjogJycsXHJcbiAgICAgICAgbmV4dEh0bWw6ICcnLFxyXG4gICAgICAgIHByZXZIdG1sOiAnJyxcclxuICAgICAgICBpbmRleDogMCxcclxuICAgICAgICBpZnJhbWVXaWR0aDogJzEwMCUnLFxyXG4gICAgICAgIGlmcmFtZUhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgIGlmcmFtZU1heFdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgaWZyYW1lTWF4SGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgZG93bmxvYWQ6IHRydWUsXHJcbiAgICAgICAgY291bnRlcjogdHJ1ZSxcclxuICAgICAgICBhcHBlbmRDb3VudGVyVG86ICcubGctdG9vbGJhcicsXHJcbiAgICAgICAgc3dpcGVUaHJlc2hvbGQ6IDUwLFxyXG4gICAgICAgIGVuYWJsZVN3aXBlOiB0cnVlLFxyXG4gICAgICAgIGVuYWJsZURyYWc6IHRydWUsXHJcbiAgICAgICAgZHluYW1pYzogZmFsc2UsXHJcbiAgICAgICAgZHluYW1pY0VsOiBbXSxcclxuICAgICAgICBleHRyYVByb3BzOiBbXSxcclxuICAgICAgICBleFRodW1iSW1hZ2U6ICcnLFxyXG4gICAgICAgIGlzTW9iaWxlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgbW9iaWxlU2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgY29udHJvbHM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93Q2xvc2VJY29uOiBmYWxzZSxcclxuICAgICAgICAgICAgZG93bmxvYWQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGx1Z2luczogW10sXHJcbiAgICAgICAgc3RyaW5nczoge1xyXG4gICAgICAgICAgICBjbG9zZUdhbGxlcnk6ICdDbG9zZSBnYWxsZXJ5JyxcclxuICAgICAgICAgICAgdG9nZ2xlTWF4aW1pemU6ICdUb2dnbGUgbWF4aW1pemUnLFxyXG4gICAgICAgICAgICBwcmV2aW91c1NsaWRlOiAnUHJldmlvdXMgc2xpZGUnLFxyXG4gICAgICAgICAgICBuZXh0U2xpZGU6ICdOZXh0IHNsaWRlJyxcclxuICAgICAgICAgICAgZG93bmxvYWQ6ICdEb3dubG9hZCcsXHJcbiAgICAgICAgICAgIHBsYXlWaWRlbzogJ1BsYXkgdmlkZW8nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExnUG9seWZpbGxzKCkge1xyXG4gICAgICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDogbnVsbCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcbiAgICAgICAgICAgICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9XHJcbiAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIHZhciBsZ1F1ZXJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGxnUXVlcnkoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy5jc3NWZW5kZXJQcmVmaXhlcyA9IFtcclxuICAgICAgICAgICAgICAgICdUcmFuc2l0aW9uRHVyYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ1RyYW5zaXRpb25UaW1pbmdGdW5jdGlvbicsXHJcbiAgICAgICAgICAgICAgICAnVHJhbnNmb3JtJyxcclxuICAgICAgICAgICAgICAgICdUcmFuc2l0aW9uJyxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9IHRoaXMuX2dldFNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgdGhpcy5maXJzdEVsZW1lbnQgPSB0aGlzLl9nZXRGaXJzdEVsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZ1F1ZXJ5LmdlbmVyYXRlVVVJRCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICAgICAgICAgIHZhciByID0gKE1hdGgucmFuZG9tKCkgKiAxNikgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMpIHwgMHg4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLl9nZXRTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dCA9PT0gdm9pZCAwKSB7IGNvbnRleHQgPSBkb2N1bWVudDsgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG4gICAgICAgICAgICB2YXIgZmwgPSBzZWxlY3Rvci5zdWJzdHJpbmcoMCwgMSk7XHJcbiAgICAgICAgICAgIGlmIChmbCA9PT0gJyMnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5fZWFjaCA9IGZ1bmN0aW9uIChmdW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3IubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLnNlbGVjdG9yLCBmdW5jKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZ1bmModGhpcy5zZWxlY3RvciwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5fc2V0Q3NzVmVuZG9yUHJlZml4ID0gZnVuY3Rpb24gKGVsLCBjc3NQcm9wZXJ0eSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IGNzc1Byb3BlcnR5LnJlcGxhY2UoLy0oW2Etel0pL2dpLCBmdW5jdGlvbiAocywgZ3JvdXAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXAxLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jc3NWZW5kZXJQcmVmaXhlcy5pbmRleE9mKHByb3BlcnR5KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlW3Byb3BlcnR5LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgcHJvcGVydHkuc2xpY2UoMSldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbC5zdHlsZVsnd2Via2l0JyArIHByb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGVbJ21veicgKyBwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlWydtcycgKyBwcm9wZXJ0eV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVsLnN0eWxlWydvJyArIHByb3BlcnR5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWwuc3R5bGVbcHJvcGVydHldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLl9nZXRGaXJzdEVsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RvciAmJiB0aGlzLnNlbGVjdG9yLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RvclswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5pc0V2ZW50TWF0Y2hlZCA9IGZ1bmN0aW9uIChldmVudCwgZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudE5hbWVzcGFjZSA9IGV2ZW50TmFtZS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRcclxuICAgICAgICAgICAgICAgIC5zcGxpdCgnLicpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlOyB9KVxyXG4gICAgICAgICAgICAgICAgLmV2ZXJ5KGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnROYW1lc3BhY2UuaW5kZXhPZihlKSAhPT0gLTE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuYXR0ciA9IGZ1bmN0aW9uIChhdHRyLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRMRyh0aGlzLl9nZXRTZWxlY3RvcihzZWxlY3RvciwgdGhpcy5zZWxlY3RvcikpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdG9yICYmIHRoaXMuc2VsZWN0b3IubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkTEcodGhpcy5zZWxlY3RvclswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJExHKHRoaXMuc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJExHKHRoaXMuc2VsZWN0b3JbaW5kZXhdKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnBhcmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRMRyh0aGlzLnNlbGVjdG9yLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Rmlyc3RFbCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUucmVtb3ZlQXR0ciA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIHZhciBhdHRycyA9IGF0dHJpYnV0ZXMuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmZvckVhY2goZnVuY3Rpb24gKGF0dHIpIHsgcmV0dXJuIGVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTsgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLCB0aGlzLmZpcnN0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5maXJzdEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuZmlyc3RFbGVtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWVzKSB7XHJcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWVzID09PSB2b2lkIDApIHsgY2xhc3NOYW1lcyA9ICcnOyB9XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJRSBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgYXJndW1lbnRzXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIElFIGRvZXNuJ3Qgc3VwcG9ydCBtdWx0aXBsZSBhcmd1bWVudHNcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuaGFzQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5oYXNBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoYXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdEVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQ2xhc3MoY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3NldENzc1ZlbmRvclByZWZpeChlbCwgcHJvcGVydHksIHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gTmVlZCB0byBwYXNzIHNlcGFyYXRlIG5hbWVzcGFjZXMgZm9yIHNlcGFyYXRlIGVsZW1lbnRzXHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnRzLCBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobGdRdWVyeS5ldmVudExpc3RlbmVyc1tldmVudF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGdRdWVyeS5ldmVudExpc3RlbmVyc1tldmVudF0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihldmVudC5zcGxpdCgnLicpWzBdLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEB0b2RvIC0gdGVzdCB0aGlzXHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5vbihldmVudCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub2ZmKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobGdRdWVyeS5ldmVudExpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNFdmVudE1hdGNoZWQoZXZlbnQsIGV2ZW50TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZ1F1ZXJ5LmV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0b3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUuc3BsaXQoJy4nKVswXSwgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxnUXVlcnkuZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50LCBkZXRhaWwpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGN1c3RvbUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50LnNwbGl0KCcuJylbMF0sIHtcclxuICAgICAgICAgICAgICAgIGRldGFpbDogZGV0YWlsIHx8IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGN1c3RvbUV2ZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBEb2VzIG5vdCBzdXBwb3J0IElFXHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgZmV0Y2godXJsKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdG9yLmlubmVySFRNTCA9IHJlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uIChodG1sKSB7XHJcbiAgICAgICAgICAgIGlmIChodG1sID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdEVsZW1lbnQuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiAoaHRtbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBodG1sID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChodG1sKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uIChodG1sKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgICAgICBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBodG1sKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnNjcm9sbFRvcCA9IGZ1bmN0aW9uIChzY3JvbGxUb3ApIHtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAod2luZG93LnBhZ2VZT2Zmc2V0IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLnNjcm9sbExlZnQgPSBmdW5jdGlvbiAoc2Nyb2xsTGVmdCkge1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsTGVmdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHdpbmRvdy5wYWdlWE9mZnNldCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLm9mZnNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmZpcnN0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgdmFyIGJvZHlNYXJnaW5MZWZ0ID0gJExHKCdib2R5Jykuc3R5bGUoKS5tYXJnaW5MZWZ0O1xyXG4gICAgICAgICAgICAvLyBNaW51cyBib2R5IG1hcmdpbiAtIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNzExNTQ4L2lzLWdldGJvdW5kaW5nY2xpZW50cmVjdC1sZWZ0LXJldHVybmluZy1hLXdyb25nLXZhbHVlXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgLSBwYXJzZUZsb2F0KGJvZHlNYXJnaW5MZWZ0KSArIHRoaXMuc2Nyb2xsTGVmdCgpLFxyXG4gICAgICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIHRoaXMuc2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZ1F1ZXJ5LnByb3RvdHlwZS5zdHlsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5maXJzdEVsZW1lbnQuY3VycmVudFN0eWxlIHx8XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmZpcnN0RWxlbWVudCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gV2lkdGggd2l0aG91dCBwYWRkaW5nIGFuZCBib3JkZXIgZXZlbiBpZiBib3gtc2l6aW5nIGlzIHVzZWQuXHJcbiAgICAgICAgbGdRdWVyeS5wcm90b3R5cGUud2lkdGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmZpcnN0RWxlbWVudC5jbGllbnRXaWR0aCAtXHJcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSAtXHJcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdSaWdodCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gSGVpZ2h0IHdpdGhvdXQgcGFkZGluZyBhbmQgYm9yZGVyIGV2ZW4gaWYgYm94LXNpemluZyBpcyB1c2VkLlxyXG4gICAgICAgIGxnUXVlcnkucHJvdG90eXBlLmhlaWdodCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5zdHlsZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZmlyc3RFbGVtZW50LmNsaWVudEhlaWdodCAtXHJcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdUb3ApIC1cclxuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGdRdWVyeS5ldmVudExpc3RlbmVycyA9IHt9O1xyXG4gICAgICAgIHJldHVybiBsZ1F1ZXJ5O1xyXG4gICAgfSgpKTtcclxuICAgIGZ1bmN0aW9uICRMRyhzZWxlY3Rvcikge1xyXG4gICAgICAgIGluaXRMZ1BvbHlmaWxscygpO1xyXG4gICAgICAgIHJldHVybiBuZXcgbGdRdWVyeShzZWxlY3Rvcik7XHJcbiAgICB9XG5cbiAgICB2YXIgZGVmYXVsdER5bmFtaWNPcHRpb25zID0gW1xyXG4gICAgICAgICdzcmMnLFxyXG4gICAgICAgICdzb3VyY2VzJyxcclxuICAgICAgICAnc3ViSHRtbCcsXHJcbiAgICAgICAgJ3N1Ykh0bWxVcmwnLFxyXG4gICAgICAgICdodG1sJyxcclxuICAgICAgICAndmlkZW8nLFxyXG4gICAgICAgICdwb3N0ZXInLFxyXG4gICAgICAgICdzbGlkZU5hbWUnLFxyXG4gICAgICAgICdyZXNwb25zaXZlJyxcclxuICAgICAgICAnc3Jjc2V0JyxcclxuICAgICAgICAnc2l6ZXMnLFxyXG4gICAgICAgICdpZnJhbWUnLFxyXG4gICAgICAgICdkb3dubG9hZFVybCcsXHJcbiAgICAgICAgJ2Rvd25sb2FkJyxcclxuICAgICAgICAnd2lkdGgnLFxyXG4gICAgICAgICdmYWNlYm9va1NoYXJlVXJsJyxcclxuICAgICAgICAndHdlZXRUZXh0JyxcclxuICAgICAgICAnaWZyYW1lVGl0bGUnLFxyXG4gICAgICAgICd0d2l0dGVyU2hhcmVVcmwnLFxyXG4gICAgICAgICdwaW50ZXJlc3RTaGFyZVVybCcsXHJcbiAgICAgICAgJ3BpbnRlcmVzdFRleHQnLFxyXG4gICAgICAgICdmYkh0bWwnLFxyXG4gICAgICAgICdkaXNxdXNJZGVudGlmaWVyJyxcclxuICAgICAgICAnZGlzcXVzVXJsJyxcclxuICAgIF07XHJcbiAgICAvLyBDb252ZXJ0IGh0bWwgZGF0YS1hdHRyaWJ1dGUgdG8gY2FtYWxjYXNlXHJcbiAgICBmdW5jdGlvbiBjb252ZXJ0VG9EYXRhKGF0dHIpIHtcclxuICAgICAgICAvLyBGSW5kIGEgd2F5IGZvciBsZ3NpemVcclxuICAgICAgICBpZiAoYXR0ciA9PT0gJ2hyZWYnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnc3JjJztcclxuICAgICAgICB9XHJcbiAgICAgICAgYXR0ciA9IGF0dHIucmVwbGFjZSgnZGF0YS0nLCAnJyk7XHJcbiAgICAgICAgYXR0ciA9IGF0dHIuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBhdHRyLnNsaWNlKDEpO1xyXG4gICAgICAgIGF0dHIgPSBhdHRyLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uIChnKSB7IHJldHVybiBnWzFdLnRvVXBwZXJDYXNlKCk7IH0pO1xyXG4gICAgICAgIHJldHVybiBhdHRyO1xyXG4gICAgfVxyXG4gICAgdmFyIHV0aWxzID0ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGdldCBwb3NzaWJsZSB3aWR0aCBhbmQgaGVpZ2h0IGZyb20gdGhlIGxnU2l6ZSBhdHRyaWJ1dGUuIFVzZWQgZm9yIFpvb21Gcm9tT3JpZ2luIG9wdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldFNpemU6IGZ1bmN0aW9uIChlbCwgY29udGFpbmVyLCBzcGFjaW5nLCBkZWZhdWx0TGdTaXplKSB7XHJcbiAgICAgICAgICAgIGlmIChzcGFjaW5nID09PSB2b2lkIDApIHsgc3BhY2luZyA9IDA7IH1cclxuICAgICAgICAgICAgdmFyIExHZWwgPSAkTEcoZWwpO1xyXG4gICAgICAgICAgICB2YXIgbGdTaXplID0gTEdlbC5hdHRyKCdkYXRhLWxnLXNpemUnKSB8fCBkZWZhdWx0TGdTaXplO1xyXG4gICAgICAgICAgICBpZiAoIWxnU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpc1Jlc3BvbnNpdmVTaXplcyA9IGxnU2l6ZS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAvLyBpZiBhdC1sZWFzdCB0d28gdmlld3BvcnQgc2l6ZXMgYXJlIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBpZiAoaXNSZXNwb25zaXZlU2l6ZXNbMV0pIHtcclxuICAgICAgICAgICAgICAgIHZhciB3V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXNSZXNwb25zaXZlU2l6ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2l6ZV8xID0gaXNSZXNwb25zaXZlU2l6ZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNpdmVXaWR0aCA9IHBhcnNlSW50KHNpemVfMS5zcGxpdCgnLScpWzJdLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNpdmVXaWR0aCA+IHdXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZ1NpemUgPSBzaXplXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB0YWtlIGxhc3QgaXRlbSBhcyBsYXN0IG9wdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSBpc1Jlc3BvbnNpdmVTaXplcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxnU2l6ZSA9IHNpemVfMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHNpemUgPSBsZ1NpemUuc3BsaXQoJy0nKTtcclxuICAgICAgICAgICAgdmFyIHdpZHRoID0gcGFyc2VJbnQoc2l6ZVswXSwgMTApO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcGFyc2VJbnQoc2l6ZVsxXSwgMTApO1xyXG4gICAgICAgICAgICB2YXIgY1dpZHRoID0gY29udGFpbmVyLndpZHRoKCk7XHJcbiAgICAgICAgICAgIHZhciBjSGVpZ2h0ID0gY29udGFpbmVyLmhlaWdodCgpIC0gc3BhY2luZztcclxuICAgICAgICAgICAgdmFyIG1heFdpZHRoID0gTWF0aC5taW4oY1dpZHRoLCB3aWR0aCk7XHJcbiAgICAgICAgICAgIHZhciBtYXhIZWlnaHQgPSBNYXRoLm1pbihjSGVpZ2h0LCBoZWlnaHQpO1xyXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSBNYXRoLm1pbihtYXhXaWR0aCAvIHdpZHRoLCBtYXhIZWlnaHQgLyBoZWlnaHQpO1xyXG4gICAgICAgICAgICByZXR1cm4geyB3aWR0aDogd2lkdGggKiByYXRpbywgaGVpZ2h0OiBoZWlnaHQgKiByYXRpbyB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgR2V0IHRyYW5zZm9ybSB2YWx1ZSBiYXNlZCBvbiB0aGUgaW1hZ2VTaXplLiBVc2VkIGZvciBab29tRnJvbU9yaWdpbiBvcHRpb25cclxuICAgICAgICAgKiBAcGFyYW0ge2pRdWVyeSBFbGVtZW50fVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRyYW5zZm9ybSBDU1Mgc3RyaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0VHJhbnNmb3JtOiBmdW5jdGlvbiAoZWwsIGNvbnRhaW5lciwgdG9wLCBib3R0b20sIGltYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWltYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBMR2VsID0gJExHKGVsKS5maW5kKCdpbWcnKS5maXJzdCgpO1xyXG4gICAgICAgICAgICBpZiAoIUxHZWwuZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgdmFyIHdXaWR0aCA9IGNvbnRhaW5lclJlY3Qud2lkdGg7XHJcbiAgICAgICAgICAgIC8vIHVzaW5nIGlubmVyV2lkdGggdG8gaW5jbHVkZSBtb2JpbGUgc2FmYXJpIGJvdHRvbSBiYXJcclxuICAgICAgICAgICAgdmFyIHdIZWlnaHQgPSBjb250YWluZXIuaGVpZ2h0KCkgLSAodG9wICsgYm90dG9tKTtcclxuICAgICAgICAgICAgdmFyIGVsV2lkdGggPSBMR2VsLndpZHRoKCk7XHJcbiAgICAgICAgICAgIHZhciBlbEhlaWdodCA9IExHZWwuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIHZhciBlbFN0eWxlID0gTEdlbC5zdHlsZSgpO1xyXG4gICAgICAgICAgICB2YXIgeCA9ICh3V2lkdGggLSBlbFdpZHRoKSAvIDIgLVxyXG4gICAgICAgICAgICAgICAgTEdlbC5vZmZzZXQoKS5sZWZ0ICtcclxuICAgICAgICAgICAgICAgIChwYXJzZUZsb2F0KGVsU3R5bGUucGFkZGluZ0xlZnQpIHx8IDApICtcclxuICAgICAgICAgICAgICAgIChwYXJzZUZsb2F0KGVsU3R5bGUuYm9yZGVyTGVmdCkgfHwgMCkgK1xyXG4gICAgICAgICAgICAgICAgJExHKHdpbmRvdykuc2Nyb2xsTGVmdCgpICtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlY3QubGVmdDtcclxuICAgICAgICAgICAgdmFyIHkgPSAod0hlaWdodCAtIGVsSGVpZ2h0KSAvIDIgLVxyXG4gICAgICAgICAgICAgICAgTEdlbC5vZmZzZXQoKS50b3AgK1xyXG4gICAgICAgICAgICAgICAgKHBhcnNlRmxvYXQoZWxTdHlsZS5wYWRkaW5nVG9wKSB8fCAwKSArXHJcbiAgICAgICAgICAgICAgICAocGFyc2VGbG9hdChlbFN0eWxlLmJvcmRlclRvcCkgfHwgMCkgK1xyXG4gICAgICAgICAgICAgICAgJExHKHdpbmRvdykuc2Nyb2xsVG9wKCkgK1xyXG4gICAgICAgICAgICAgICAgdG9wO1xyXG4gICAgICAgICAgICB2YXIgc2NYID0gZWxXaWR0aCAvIGltYWdlU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgdmFyIHNjWSA9IGVsSGVpZ2h0IC8gaW1hZ2VTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICtcclxuICAgICAgICAgICAgICAgICh4ICo9IC0xKSArXHJcbiAgICAgICAgICAgICAgICAncHgsICcgK1xyXG4gICAgICAgICAgICAgICAgKHkgKj0gLTEpICtcclxuICAgICAgICAgICAgICAgICdweCwgMCkgc2NhbGUzZCgnICtcclxuICAgICAgICAgICAgICAgIHNjWCArXHJcbiAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgIHNjWSArXHJcbiAgICAgICAgICAgICAgICAnLCAxKSc7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRJZnJhbWVNYXJrdXA6IGZ1bmN0aW9uIChpZnJhbWVXaWR0aCwgaWZyYW1lSGVpZ2h0LCBpZnJhbWVNYXhXaWR0aCwgaWZyYW1lTWF4SGVpZ2h0LCBzcmMsIGlmcmFtZVRpdGxlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aXRsZSA9IGlmcmFtZVRpdGxlID8gJ3RpdGxlPVwiJyArIGlmcmFtZVRpdGxlICsgJ1wiJyA6ICcnO1xyXG4gICAgICAgICAgICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJsZy12aWRlby1jb250IGxnLWhhcy1pZnJhbWVcXFwiIHN0eWxlPVxcXCJ3aWR0aDpcIiArIGlmcmFtZVdpZHRoICsgXCI7IG1heC13aWR0aDpcIiArIGlmcmFtZU1heFdpZHRoICsgXCI7IGhlaWdodDogXCIgKyBpZnJhbWVIZWlnaHQgKyBcIjsgbWF4LWhlaWdodDpcIiArIGlmcmFtZU1heEhlaWdodCArIFwiXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxpZnJhbWUgY2xhc3M9XFxcImxnLW9iamVjdFxcXCIgZnJhbWVib3JkZXI9XFxcIjBcXFwiIFwiICsgdGl0bGUgKyBcIiBzcmM9XFxcIlwiICsgc3JjICsgXCJcXFwiICBhbGxvd2Z1bGxzY3JlZW49XFxcInRydWVcXFwiPjwvaWZyYW1lPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cIjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEltZ01hcmt1cDogZnVuY3Rpb24gKGluZGV4LCBzcmMsIGFsdEF0dHIsIHNyY3NldCwgc2l6ZXMsIHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgdmFyIHNyY3NldEF0dHIgPSBzcmNzZXQgPyBcInNyY3NldD1cXFwiXCIgKyBzcmNzZXQgKyBcIlxcXCJcIiA6ICcnO1xyXG4gICAgICAgICAgICB2YXIgc2l6ZXNBdHRyID0gc2l6ZXMgPyBcInNpemVzPVxcXCJcIiArIHNpemVzICsgXCJcXFwiXCIgOiAnJztcclxuICAgICAgICAgICAgdmFyIGltZ01hcmt1cCA9IFwiPGltZyBcIiArIGFsdEF0dHIgKyBcIiBcIiArIHNyY3NldEF0dHIgKyBcIiAgXCIgKyBzaXplc0F0dHIgKyBcIiBjbGFzcz1cXFwibGctb2JqZWN0IGxnLWltYWdlXFxcIiBkYXRhLWluZGV4PVxcXCJcIiArIGluZGV4ICsgXCJcXFwiIHNyYz1cXFwiXCIgKyBzcmMgKyBcIlxcXCIgLz5cIjtcclxuICAgICAgICAgICAgdmFyIHNvdXJjZVRhZyA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNvdXJjZU9iaiA9IHR5cGVvZiBzb3VyY2VzID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2Uoc291cmNlcykgOiBzb3VyY2VzO1xyXG4gICAgICAgICAgICAgICAgc291cmNlVGFnID0gc291cmNlT2JqLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHJzID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gbm90IHJlbW92ZSB0aGUgZmlyc3Qgc3BhY2UgYXMgaXQgaXMgcmVxdWlyZWQgdG8gc2VwYXJhdGUgdGhlIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnMgKz0gXCIgXCIgKyBrZXkgKyBcIj1cXFwiXCIgKyBzb3VyY2Vba2V5XSArIFwiXFxcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjxzb3VyY2UgXCIgKyBhdHRycyArIFwiPjwvc291cmNlPlwiO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBzb3VyY2VUYWcgKyBpbWdNYXJrdXA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBHZXQgc3JjIGZyb20gcmVzcG9uc2l2ZSBzcmNcclxuICAgICAgICBnZXRSZXNwb25zaXZlU3JjOiBmdW5jdGlvbiAoc3JjSXRtcykge1xyXG4gICAgICAgICAgICB2YXIgcnNXaWR0aCA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgcnNTcmMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIHNyYyA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNyY0l0bXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBfc3JjID0gc3JjSXRtc1tpXS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICAgICAgLy8gTWFuYWdlIGVtcHR5IHNwYWNlXHJcbiAgICAgICAgICAgICAgICBpZiAoX3NyY1swXSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3JjLnNwbGljZSgwLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJzU3JjLnB1c2goX3NyY1swXSk7XHJcbiAgICAgICAgICAgICAgICByc1dpZHRoLnB1c2goX3NyY1sxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHdXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJzV2lkdGgubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChyc1dpZHRoW2pdLCAxMCkgPiB3V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmMgPSByc1NyY1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3JjO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNJbWFnZUxvYWRlZDogZnVuY3Rpb24gKGltZykge1xyXG4gICAgICAgICAgICBpZiAoIWltZylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgLy8gRHVyaW5nIHRoZSBvbmxvYWQgZXZlbnQsIElFIGNvcnJlY3RseSBpZGVudGlmaWVzIGFueSBpbWFnZXMgdGhhdFxyXG4gICAgICAgICAgICAvLyB3ZXJlbuKAmXQgZG93bmxvYWRlZCBhcyBub3QgY29tcGxldGUuIE90aGVycyBzaG91bGQgdG9vLiBHZWNrby1iYXNlZFxyXG4gICAgICAgICAgICAvLyBicm93c2VycyBhY3QgbGlrZSBOUzQgaW4gdGhhdCB0aGV5IHJlcG9ydCB0aGlzIGluY29ycmVjdGx5LlxyXG4gICAgICAgICAgICBpZiAoIWltZy5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIHRoZXkgZG8gaGF2ZSB0d28gdmVyeSB1c2VmdWwgcHJvcGVydGllczogbmF0dXJhbFdpZHRoIGFuZFxyXG4gICAgICAgICAgICAvLyBuYXR1cmFsSGVpZ2h0LiBUaGVzZSBnaXZlIHRoZSB0cnVlIHNpemUgb2YgdGhlIGltYWdlLiBJZiBpdCBmYWlsZWRcclxuICAgICAgICAgICAgLy8gdG8gbG9hZCwgZWl0aGVyIG9mIHRoZXNlIHNob3VsZCBiZSB6ZXJvLlxyXG4gICAgICAgICAgICBpZiAoaW1nLm5hdHVyYWxXaWR0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIE5vIG90aGVyIHdheSBvZiBjaGVja2luZzogYXNzdW1lIGl04oCZcyBvay5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRWaWRlb1Bvc3Rlck1hcmt1cDogZnVuY3Rpb24gKF9wb3N0ZXIsIGR1bW15SW1nLCB2aWRlb0NvbnRTdHlsZSwgcGxheVZpZGVvU3RyaW5nLCBfaXNWaWRlbykge1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9DbGFzcyA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoX2lzVmlkZW8gJiYgX2lzVmlkZW8ueW91dHViZSkge1xyXG4gICAgICAgICAgICAgICAgdmlkZW9DbGFzcyA9ICdsZy1oYXMteW91dHViZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoX2lzVmlkZW8gJiYgX2lzVmlkZW8udmltZW8pIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvQ2xhc3MgPSAnbGctaGFzLXZpbWVvJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvQ2xhc3MgPSAnbGctaGFzLWh0bWw1JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJsZy12aWRlby1jb250IFwiICsgdmlkZW9DbGFzcyArIFwiXFxcIiBzdHlsZT1cXFwiXCIgKyB2aWRlb0NvbnRTdHlsZSArIFwiXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGctdmlkZW8tcGxheS1idXR0b25cXFwiPlxcbiAgICAgICAgICAgICAgICA8c3ZnXFxuICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVxcXCIwIDAgMjAgMjBcXFwiXFxuICAgICAgICAgICAgICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVxcXCJ4TWlkWU1pZFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZT1cXFwiZmFsc2VcXFwiXFxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XFxcIlwiICsgcGxheVZpZGVvU3RyaW5nICsgXCJcXFwiXFxuICAgICAgICAgICAgICAgICAgICByb2xlPVxcXCJpbWdcXFwiXFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibGctdmlkZW8tcGxheS1pY29uXFxcIlxcbiAgICAgICAgICAgICAgICA+XFxuICAgICAgICAgICAgICAgICAgICA8dGl0bGU+XCIgKyBwbGF5VmlkZW9TdHJpbmcgKyBcIjwvdGl0bGU+XFxuICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBjbGFzcz1cXFwibGctdmlkZW8tcGxheS1pY29uLWlubmVyXFxcIiBwb2ludHM9XFxcIjEsMCAyMCwxMCAxLDIwXFxcIj48L3BvbHlnb24+XFxuICAgICAgICAgICAgICAgIDwvc3ZnPlxcbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVxcXCJsZy12aWRlby1wbGF5LWljb24tYmdcXFwiIHZpZXdCb3g9XFxcIjAgMCA1MCA1MFxcXCIgZm9jdXNhYmxlPVxcXCJmYWxzZVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVxcXCI1MCVcXFwiIGN5PVxcXCI1MCVcXFwiIHI9XFxcIjIwXFxcIj48L2NpcmNsZT48L3N2Zz5cXG4gICAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cXFwibGctdmlkZW8tcGxheS1pY29uLWNpcmNsZVxcXCIgdmlld0JveD1cXFwiMCAwIDUwIDUwXFxcIiBmb2N1c2FibGU9XFxcImZhbHNlXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XFxcIjUwJVxcXCIgY3k9XFxcIjUwJVxcXCIgcj1cXFwiMjBcXFwiPjwvY2lyY2xlPlxcbiAgICAgICAgICAgICAgICA8L3N2Zz5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICBcIiArIChkdW1teUltZyB8fCAnJykgKyBcIlxcbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcImxnLW9iamVjdCBsZy12aWRlby1wb3N0ZXJcXFwiIHNyYz1cXFwiXCIgKyBfcG9zdGVyICsgXCJcXFwiIC8+XFxuICAgICAgICA8L2Rpdj5cIjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIENyZWF0ZSBkeW5hbWljIGVsZW1lbnRzIGFycmF5IGZyb20gZ2FsbGVyeSBpdGVtcyB3aGVuIGR5bmFtaWMgb3B0aW9uIGlzIGZhbHNlXHJcbiAgICAgICAgICogSXQgaGVscHMgdG8gYXZvaWQgZnJlcXVlbnQgRE9NIGludGVyYWN0aW9uXHJcbiAgICAgICAgICogYW5kIGF2b2lkIG11bHRpcGxlIGNoZWNrcyBmb3IgZHluYW1pYyBlbG1lbnRzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXl9IGR5bmFtaWNFbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldER5bmFtaWNPcHRpb25zOiBmdW5jdGlvbiAoaXRlbXMsIGV4dHJhUHJvcHMsIGdldENhcHRpb25Gcm9tVGl0bGVPckFsdCwgZXhUaHVtYkltYWdlKSB7XHJcbiAgICAgICAgICAgIHZhciBkeW5hbWljRWxlbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGF2YWlsYWJsZUR5bmFtaWNPcHRpb25zID0gX19zcHJlYWRBcnJheXMoZGVmYXVsdER5bmFtaWNPcHRpb25zLCBleHRyYVByb3BzKTtcclxuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKGl0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGR5bmFtaWNFbCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IGl0ZW0uYXR0cmlidXRlc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ci5zcGVjaWZpZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR5bmFtaWNBdHRyID0gY29udmVydFRvRGF0YShhdHRyLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZUR5bmFtaWNPcHRpb25zLmluZGV4T2YoZHluYW1pY0F0dHIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gZHluYW1pY0F0dHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeW5hbWljRWxbbGFiZWxdID0gYXR0ci52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50SXRlbSA9ICRMRyhpdGVtKTtcclxuICAgICAgICAgICAgICAgIHZhciBhbHQgPSBjdXJyZW50SXRlbS5maW5kKCdpbWcnKS5maXJzdCgpLmF0dHIoJ2FsdCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gY3VycmVudEl0ZW0uYXR0cigndGl0bGUnKTtcclxuICAgICAgICAgICAgICAgIHZhciB0aHVtYiA9IGV4VGh1bWJJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgID8gY3VycmVudEl0ZW0uYXR0cihleFRodW1iSW1hZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBjdXJyZW50SXRlbS5maW5kKCdpbWcnKS5maXJzdCgpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICAgICAgICAgZHluYW1pY0VsLnRodW1iID0gdGh1bWI7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0Q2FwdGlvbkZyb21UaXRsZU9yQWx0ICYmICFkeW5hbWljRWwuc3ViSHRtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNFbC5zdWJIdG1sID0gdGl0bGUgfHwgYWx0IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZHluYW1pY0VsLmFsdCA9IGFsdCB8fCB0aXRsZSB8fCAnJztcclxuICAgICAgICAgICAgICAgIGR5bmFtaWNFbGVtZW50cy5wdXNoKGR5bmFtaWNFbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZHluYW1pY0VsZW1lbnRzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNNb2JpbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC9pUGhvbmV8aVBhZHxpUG9kfEFuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgQ2hlY2sgdGhlIGdpdmVuIHNyYyBpcyB2aWRlb1xyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzcmNcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHZpZGVvIHR5cGVcclxuICAgICAgICAgKiBFeDp7IHlvdXR1YmUgIDogIFtcIi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9YzBhc0pnU3l4Y1lcIiwgXCJjMGFzSmdTeXhjWVwiXSB9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdG9kbyAtIHRoaXMgaW5mb3JtYXRpb24gY2FuIGJlIG1vdmVkIHRvIGR5bmFtaWNFbCB0byBhdm9pZCBmcmVxdWVudCBjYWxsc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzVmlkZW86IGZ1bmN0aW9uIChzcmMsIGlzSFRNTDVWSWRlbywgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKCFzcmMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0hUTUw1VklkZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sNTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignbGlnaHRHYWxsZXJ5IDotIGRhdGEtc3JjIGlzIG5vdCBwcm92aWRlZCBvbiBzbGlkZSBpdGVtICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW5kZXggKyAxKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcuIFBsZWFzZSBtYWtlIHN1cmUgdGhlIHNlbGVjdG9yIHByb3BlcnR5IGlzIHByb3Blcmx5IGNvbmZpZ3VyZWQuIE1vcmUgaW5mbyAtIGh0dHBzOi8vd3d3LmxpZ2h0Z2FsbGVyeWpzLmNvbS9kZW1vcy9odG1sLW1hcmt1cC8nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHlvdXR1YmUgPSBzcmMubWF0Y2goL1xcL1xcLyg/Ond3d1xcLik/eW91dHUoPzpcXC5iZXxiZVxcLmNvbXxiZS1ub2Nvb2tpZVxcLmNvbSlcXC8oPzp3YXRjaFxcP3Y9fGVtYmVkXFwvKT8oW2EtejAtOVxcLVxcX1xcJV0rKShbXFwmfD9dW1xcU10qKSovaSk7XHJcbiAgICAgICAgICAgIHZhciB2aW1lbyA9IHNyYy5tYXRjaCgvXFwvXFwvKD86d3d3XFwuKT8oPzpwbGF5ZXJcXC4pP3ZpbWVvLmNvbVxcLyg/OnZpZGVvXFwvKT8oWzAtOWEtelxcLV9dKykoLiopPy9pKTtcclxuICAgICAgICAgICAgdmFyIHdpc3RpYSA9IHNyYy5tYXRjaCgvaHR0cHM/OlxcL1xcLyguKyk/KHdpc3RpYVxcLmNvbXx3aVxcLnN0KVxcLyhtZWRpYXN8ZW1iZWQpXFwvKFswLTlhLXpcXC1fXSspKC4qKS8pO1xyXG4gICAgICAgICAgICBpZiAoeW91dHViZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB5b3V0dWJlOiB5b3V0dWJlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2aW1lbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB2aW1lbzogdmltZW8sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHdpc3RpYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB3aXN0aWE6IHdpc3RpYSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfTtcblxuICAgIC8vIEByZWYgLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zOTcxODQxL2hvdy10by1yZXNpemUtaW1hZ2VzLXByb3BvcnRpb25hbGx5LWtlZXBpbmctdGhlLWFzcGVjdC1yYXRpb1xyXG4gICAgLy8gQHJlZiAtIGh0dHBzOi8vMmFsaXR5LmNvbS8yMDE3LzA0L3NldHRpbmctdXAtbXVsdGktcGxhdGZvcm0tcGFja2FnZXMuaHRtbFxyXG4gICAgLy8gVW5pcXVlIGlkIGZvciBlYWNoIGdhbGxlcnlcclxuICAgIHZhciBsZ0lkID0gMDtcclxuICAgIHZhciBMaWdodEdhbGxlcnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gTGlnaHRHYWxsZXJ5KGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5sZ09wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgICAgICAgLy8gbGlnaHRHYWxsZXJ5IG1vZHVsZXNcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW5zID0gW107XHJcbiAgICAgICAgICAgIC8vIGZhbHNlIHdoZW4gbGlnaHRHYWxsZXJ5IGxvYWQgZmlyc3Qgc2xpZGUgY29udGVudDtcclxuICAgICAgICAgICAgdGhpcy5sR2FsbGVyeU9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFRydWUgd2hlbiBhIHNsaWRlIGFuaW1hdGlvbiBpcyBpbiBwcm9ncmVzc1xyXG4gICAgICAgICAgICB0aGlzLmxnQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJdGVtc0luRG9tID0gW107XHJcbiAgICAgICAgICAgIC8vIFNjcm9sbCB0b3AgdmFsdWUgYmVmb3JlIGxpZ2h0R2FsbGVyeSBpcyBvcGVuZWRcclxuICAgICAgICAgICAgdGhpcy5wcmV2U2Nyb2xsVG9wID0gMDtcclxuICAgICAgICAgICAgdGhpcy5pc0R1bW15SW1hZ2VSZW1vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ09yU3dpcGVFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZ0lkKys7XHJcbiAgICAgICAgICAgIHRoaXMubGdJZCA9IGxnSWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWwgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLkxHZWwgPSAkTEcoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVTZXR0aW5ncyhvcHRpb25zKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZE1vZHVsZXMoKTtcclxuICAgICAgICAgICAgLy8gV2hlbiB1c2luZyBkeW5hbWljIG1vZGUsIGVuc3VyZSBkeW5hbWljRWwgaXMgYW4gYXJyYXlcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZHluYW1pYyAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5keW5hbWljRWwgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkodGhpcy5zZXR0aW5ncy5keW5hbWljRWwpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAnV2hlbiB1c2luZyBkeW5hbWljIG1vZGUsIHlvdSBtdXN0IGFsc28gZGVmaW5lIGR5bmFtaWNFbCBhcyBhbiBBcnJheS4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2FsbGVyeUl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xyXG4gICAgICAgICAgICB0aGlzLm5vcm1hbGl6ZVNldHRpbmdzKCk7XHJcbiAgICAgICAgICAgIC8vIEdhbGxlcnkgaXRlbXNcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVMaWNlbnNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdlbmVyYXRlU2V0dGluZ3MgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAvLyBsaWdodEdhbGxlcnkgc2V0dGluZ3NcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBsaWdodEdhbGxlcnlDb3JlU2V0dGluZ3MpLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNNb2JpbGUgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzLnNldHRpbmdzLmlzTW9iaWxlID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMuc2V0dGluZ3MuaXNNb2JpbGUoKVxyXG4gICAgICAgICAgICAgICAgOiB1dGlscy5pc01vYmlsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9iaWxlU2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5zZXR0aW5ncy5tb2JpbGVTZXR0aW5ncyksIHRoaXMuc2V0dGluZ3MubW9iaWxlU2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLnNldHRpbmdzKSwgbW9iaWxlU2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm5vcm1hbGl6ZVNldHRpbmdzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zbGlkZUVuZEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5oaWRlQ29udHJvbE9uRW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmNsb3NhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnN3aXBlVG9DbG9zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEFuZCByZXNldCBpdCBvbiBjbG9zZSB0byBnZXQgdGhlIGNvcnJlY3QgdmFsdWUgbmV4dCB0aW1lXHJcbiAgICAgICAgICAgIHRoaXMuem9vbUZyb21PcmlnaW4gPSB0aGlzLnNldHRpbmdzLnpvb21Gcm9tT3JpZ2luO1xyXG4gICAgICAgICAgICAvLyBBdCB0aGUgbW9tZW50LCBab29tIGZyb20gaW1hZ2UgZG9lc24ndCBzdXBwb3J0IGR5bmFtaWMgb3B0aW9uc1xyXG4gICAgICAgICAgICAvLyBAdG9kbyBhZGQgem9vbUZyb21PcmlnaW4gc3VwcG9ydCBmb3IgZHluYW1pYyBpbWFnZXNcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy56b29tRnJvbU9yaWdpbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzZXR0aW5ncy5wcmVsb2FkIHNob3VsZCBub3QgYmUgZ3JhdGVyIHRoYW4gJGl0ZW0ubGVuZ3RoXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MucHJlbG9hZCA9IE1hdGgubWluKHRoaXMuc2V0dGluZ3MucHJlbG9hZCwgdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hZGRTbGlkZVZpZGVvSW5mbyh0aGlzLmdhbGxlcnlJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRTdHJ1Y3R1cmUoKTtcclxuICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuaW5pdCwge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IHRoaXMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5rZXlQcmVzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlQcmVzcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZW5hYmxlRHJhZygpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZW5hYmxlU3dpcGUoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnRyaWdnZXJQb3N0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyb3coKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubW91c2V3aGVlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZXdoZWVsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmR5bmFtaWMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkdhbGxlcnlPbkl0ZW1DbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm9wZW5HYWxsZXJ5T25JdGVtQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXNfMS5pdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkTEcoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAvLyBVc2luZyBkaWZmZXJlbnQgbmFtZXNwYWNlIGZvciBjbGljayBiZWNhdXNlIGNsaWNrIGV2ZW50IHNob3VsZCBub3QgdW5iaW5kIGlmIHNlbGVjdG9yIGlzIHNhbWUgb2JqZWN0KCd0aGlzJylcclxuICAgICAgICAgICAgICAgIC8vIEB0b2RvIG1hbmFnZSBhbGwgZXZlbnQgbGlzdG5lcnMgLSBzaG91bGQgaGF2ZSBuYW1lc3BhY2UgdGhhdCByZXByZXNlbnQgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBsZ1F1ZXJ5LmdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1sZy1pZCcsIHV1aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xpY2subGdjdXN0b20taXRlbS1cIiArIHV1aWQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50SXRlbUluZGV4ID0gX3RoaXMuc2V0dGluZ3MuaW5kZXggfHwgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbkdhbGxlcnkoY3VycmVudEl0ZW1JbmRleCwgZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIFVzaW5nIGZvciBsb29wIGluc3RlYWQgb2YgdXNpbmcgYnViYmxpbmcgYXMgdGhlIGl0ZW1zIGNhbiBiZSBhbnkgaHRtbCBlbGVtZW50LlxyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIF9sb29wXzEoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bGUgY29uc3RydWN0b3JcclxuICAgICAgICAgKiBNb2R1bGVzIGFyZSBidWlsZCBpbmNyZW1lbnRhbGx5LlxyXG4gICAgICAgICAqIEdhbGxlcnkgc2hvdWxkIGJlIG9wZW5lZCBvbmx5IG9uY2UgYWxsIHRoZSBtb2R1bGVzIGFyZSBpbml0aWFsaXplZC5cclxuICAgICAgICAgKiB1c2UgbW9kdWxlQnVpbGRUaW1lb3V0IHRvIG1ha2Ugc3VyZSB0aGlzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5idWlsZE1vZHVsZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnBsdWdpbnMucHVzaChuZXcgcGx1Z2luKF90aGlzLCAkTEcpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnZhbGlkYXRlTGljZW5zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmxpY2Vuc2VLZXkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgdmFsaWQgbGljZW5zZSBrZXknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNldHRpbmdzLmxpY2Vuc2VLZXkgPT09ICcwMDAwLTAwMDAtMDAwLTAwMDAnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJsaWdodEdhbGxlcnk6IFwiICsgdGhpcy5zZXR0aW5ncy5saWNlbnNlS2V5ICsgXCIgbGljZW5zZSBrZXkgaXMgbm90IHZhbGlkIGZvciBwcm9kdWN0aW9uIHVzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRTbGlkZUl0ZW0gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRMRyh0aGlzLmdldFNsaWRlSXRlbUlkKGluZGV4KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldFNsaWRlSXRlbUlkID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIiNsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyBpbmRleDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0SWROYW1lID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpZCArIFwiLVwiICsgdGhpcy5sZ0lkO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJExHKFwiI1wiICsgdGhpcy5nZXRJZE5hbWUoaWQpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubWFuYWdlU2luZ2xlU2xpZGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1zaW5nbGUtaXRlbScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctc2luZ2xlLWl0ZW0nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5idWlsZFN0cnVjdHVyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lciAmJiB0aGlzLiRjb250YWluZXIuZ2V0KCk7XHJcbiAgICAgICAgICAgIGlmIChjb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY29udHJvbHMgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN1Ykh0bWxDb250ID0gJyc7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjb250cm9sc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250cm9scykge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbHMgPSBcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctcHJldicpICsgXCJcXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5zdHJpbmdzWydwcmV2aW91c1NsaWRlJ10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLXByZXYgbGctaWNvblxcXCI+IFwiICsgdGhpcy5zZXR0aW5ncy5wcmV2SHRtbCArIFwiIDwvYnV0dG9uPlxcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLW5leHQnKSArIFwiXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muc3RyaW5nc1snbmV4dFNsaWRlJ10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLW5leHQgbGctaWNvblxcXCI+IFwiICsgdGhpcy5zZXR0aW5ncy5uZXh0SHRtbCArIFwiIDwvYnV0dG9uPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbyAhPT0gJy5sZy1pdGVtJykge1xyXG4gICAgICAgICAgICAgICAgc3ViSHRtbENvbnQgPVxyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibGctc3ViLWh0bWxcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1saXZlPVwicG9saXRlXCI+PC9kaXY+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYWRkQ2xhc3NlcyA9ICcnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbGxvd01lZGlhT3ZlcmxhcCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IHJlbW92ZSBzcGFjZSBiZWZvcmUgbGFzdCBzaW5nbGUgcXVvdGVcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzZXMgKz0gJ2xnLW1lZGlhLW92ZXJsYXAgJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYXJpYUxhYmVsbGVkYnkgPSB0aGlzLnNldHRpbmdzLmFyaWFMYWJlbGxlZGJ5XHJcbiAgICAgICAgICAgICAgICA/ICdhcmlhLWxhYmVsbGVkYnk9XCInICsgdGhpcy5zZXR0aW5ncy5hcmlhTGFiZWxsZWRieSArICdcIidcclxuICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBhcmlhRGVzY3JpYmVkYnkgPSB0aGlzLnNldHRpbmdzLmFyaWFEZXNjcmliZWRieVxyXG4gICAgICAgICAgICAgICAgPyAnYXJpYS1kZXNjcmliZWRieT1cIicgKyB0aGlzLnNldHRpbmdzLmFyaWFEZXNjcmliZWRieSArICdcIidcclxuICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXJDbGFzc05hbWUgPSBcImxnLWNvbnRhaW5lciBcIiArIHRoaXMuc2V0dGluZ3MuYWRkQ2xhc3MgKyBcIiBcIiArIChkb2N1bWVudC5ib2R5ICE9PSB0aGlzLnNldHRpbmdzLmNvbnRhaW5lciA/ICdsZy1pbmxpbmUnIDogJycpO1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VJY29uID0gdGhpcy5zZXR0aW5ncy5jbG9zYWJsZSAmJiB0aGlzLnNldHRpbmdzLnNob3dDbG9zZUljb25cclxuICAgICAgICAgICAgICAgID8gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnN0cmluZ3NbJ2Nsb3NlR2FsbGVyeSddICsgXCJcXFwiIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1jbG9zZScpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1jbG9zZSBsZy1pY29uXFxcIj48L2J1dHRvbj5cIlxyXG4gICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgdmFyIG1heGltaXplSWNvbiA9IHRoaXMuc2V0dGluZ3Muc2hvd01heGltaXplSWNvblxyXG4gICAgICAgICAgICAgICAgPyBcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Muc3RyaW5nc1sndG9nZ2xlTWF4aW1pemUnXSArIFwiXFxcIiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctbWF4aW1pemUnKSArIFwiXFxcIiBjbGFzcz1cXFwibGctbWF4aW1pemUgbGctaWNvblxcXCI+PC9idXR0b24+XCJcclxuICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJcIiArIGNvbnRhaW5lckNsYXNzTmFtZSArIFwiXFxcIiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctY29udGFpbmVyJykgKyBcIlxcXCIgdGFiaW5kZXg9XFxcIi0xXFxcIiBhcmlhLW1vZGFsPVxcXCJ0cnVlXFxcIiBcIiArIGFyaWFMYWJlbGxlZGJ5ICsgXCIgXCIgKyBhcmlhRGVzY3JpYmVkYnkgKyBcIiByb2xlPVxcXCJkaWFsb2dcXFwiXFxuICAgICAgICA+XFxuICAgICAgICAgICAgPGRpdiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctYmFja2Ryb3AnKSArIFwiXFxcIiBjbGFzcz1cXFwibGctYmFja2Ryb3BcXFwiPjwvZGl2PlxcblxcbiAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLW91dGVyJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLW91dGVyIGxnLXVzZS1jc3MzIGxnLWNzczMgbGctaGlkZS1pdGVtcyBcIiArIGFkZENsYXNzZXMgKyBcIiBcXFwiPlxcblxcbiAgICAgICAgICAgICAgPGRpdiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctY29udGVudCcpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctaW5uZXInKSArIFwiXFxcIiBjbGFzcz1cXFwibGctaW5uZXJcXFwiPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgXCIgKyBjb250cm9scyArIFwiXFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctdG9vbGJhcicpICsgXCJcXFwiIGNsYXNzPVxcXCJsZy10b29sYmFyIGxnLWdyb3VwXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIFwiICsgbWF4aW1pemVJY29uICsgXCJcXG4gICAgICAgICAgICAgICAgICAgIFwiICsgY2xvc2VJY29uICsgXCJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgXCIgKyAodGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gPT09ICcubGctb3V0ZXInXHJcbiAgICAgICAgICAgICAgICA/IHN1Ykh0bWxDb250XHJcbiAgICAgICAgICAgICAgICA6ICcnKSArIFwiXFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWNvbXBvbmVudHMnKSArIFwiXFxcIiBjbGFzcz1cXFwibGctY29tcG9uZW50c1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICBcIiArICh0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbyA9PT0gJy5sZy1zdWItaHRtbCdcclxuICAgICAgICAgICAgICAgID8gc3ViSHRtbENvbnRcclxuICAgICAgICAgICAgICAgIDogJycpICsgXCJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiO1xyXG4gICAgICAgICAgICAkTEcodGhpcy5zZXR0aW5ncy5jb250YWluZXIpLmFwcGVuZCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5ib2R5ICE9PSB0aGlzLnNldHRpbmdzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgJExHKHRoaXMuc2V0dGluZ3MuY29udGFpbmVyKS5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vdXRlciA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLW91dGVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGxnQ29tcG9uZW50cyA9IHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWNvbXBvbmVudHMnKTtcclxuICAgICAgICAgICAgdGhpcy4kYmFja2Ryb3AgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1iYWNrZHJvcCcpO1xyXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgdGhpcy4kaW5uZXIgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1pbm5lcicpO1xyXG4gICAgICAgICAgICB0aGlzLiRjb250ZW50ID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctY29udGVudCcpO1xyXG4gICAgICAgICAgICB0aGlzLiR0b29sYmFyID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctdG9vbGJhcicpO1xyXG4gICAgICAgICAgICB0aGlzLiRiYWNrZHJvcC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCB0aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb24gKyAnbXMnKTtcclxuICAgICAgICAgICAgdmFyIG91dGVyQ2xhc3NOYW1lcyA9IHRoaXMuc2V0dGluZ3MubW9kZSArIFwiIFwiO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVNpbmdsZVNsaWRlQ2xhc3NOYW1lKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZURyYWcpIHtcclxuICAgICAgICAgICAgICAgIG91dGVyQ2xhc3NOYW1lcyArPSAnbGctZ3JhYiAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3Mob3V0ZXJDbGFzc05hbWVzKTtcclxuICAgICAgICAgICAgdGhpcy4kaW5uZXIuY3NzKCd0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbicsIHRoaXMuc2V0dGluZ3MuZWFzaW5nKTtcclxuICAgICAgICAgICAgdGhpcy4kaW5uZXIuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5zZXR0aW5ncy5zcGVlZCArICdtcycpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kb3dubG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdG9vbGJhci5hcHBlbmQoXCI8YSBpZD1cXFwiXCIgKyB0aGlzLmdldElkTmFtZSgnbGctZG93bmxvYWQnKSArIFwiXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCIgcmVsPVxcXCJub29wZW5lclxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnN0cmluZ3NbJ2Rvd25sb2FkJ10gKyBcIlxcXCIgZG93bmxvYWQgY2xhc3M9XFxcImxnLWRvd25sb2FkIGxnLWljb25cXFwiPjwvYT5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb3VudGVyKCk7XHJcbiAgICAgICAgICAgICRMRyh3aW5kb3cpLm9uKFwicmVzaXplLmxnLmdsb2JhbFwiICsgdGhpcy5sZ0lkICsgXCIgb3JpZW50YXRpb25jaGFuZ2UubGcuZ2xvYmFsXCIgKyB0aGlzLmxnSWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlZnJlc2hPblJlc2l6ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlQmFycygpO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZUNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZU1heGltaXplKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdE1vZHVsZXMoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUucmVmcmVzaE9uUmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sZ09wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRHYWxsZXJ5SXRlbSA9IHRoaXMuZ2FsbGVyeUl0ZW1zW3RoaXMuaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9fc2xpZGVWaWRlb0luZm8gPSBjdXJyZW50R2FsbGVyeUl0ZW0uX19zbGlkZVZpZGVvSW5mbztcclxuICAgICAgICAgICAgICAgIHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiA9IHRoaXMuZ2V0TWVkaWFDb250YWluZXJQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uLCB0b3BfMSA9IF9hLnRvcCwgYm90dG9tID0gX2EuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2VTaXplID0gdXRpbHMuZ2V0U2l6ZSh0aGlzLml0ZW1zW3RoaXMuaW5kZXhdLCB0aGlzLm91dGVyLCB0b3BfMSArIGJvdHRvbSwgX19zbGlkZVZpZGVvSW5mbyAmJiB0aGlzLnNldHRpbmdzLnZpZGVvTWF4U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoX19zbGlkZVZpZGVvSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplVmlkZW9TbGlkZSh0aGlzLmluZGV4LCB0aGlzLmN1cnJlbnRJbWFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuem9vbUZyb21PcmlnaW4gJiYgIXRoaXMuaXNEdW1teUltYWdlUmVtb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbWdTdHlsZSA9IHRoaXMuZ2V0RHVtbXlJbWdTdHlsZXModGhpcy5jdXJyZW50SW1hZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctY3VycmVudCAubGctZHVtbXktaW1nJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3N0eWxlJywgaW1nU3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuY29udGFpbmVyUmVzaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5yZXNpemVWaWRlb1NsaWRlID0gZnVuY3Rpb24gKGluZGV4LCBpbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgdmFyIGxnVmlkZW9TdHlsZSA9IHRoaXMuZ2V0VmlkZW9Db250U3R5bGUoaW1hZ2VTaXplKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0U2xpZGVJdGVtKGluZGV4KTtcclxuICAgICAgICAgICAgY3VycmVudFNsaWRlLmZpbmQoJy5sZy12aWRlby1jb250JykuYXR0cignc3R5bGUnLCBsZ1ZpZGVvU3R5bGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXBkYXRlIHNsaWRlcyBkeW5hbWljYWxseS5cclxuICAgICAgICAgKiBBZGQsIGVkaXQgb3IgZGVsZXRlIHNsaWRlcyBkeW5hbWljYWxseSB3aGVuIGxpZ2h0R2FsbGVyeSBpcyBvcGVuZWQuXHJcbiAgICAgICAgICogTW9kaWZ5IHRoZSBjdXJyZW50IGdhbGxlcnkgaXRlbXMgYW5kIHBhc3MgaXQgdmlhIHVwZGF0ZVNsaWRlcyBtZXRob2RcclxuICAgICAgICAgKiBAbm90ZVxyXG4gICAgICAgICAqIC0gRG8gbm90IG11dGF0ZSBleGlzdGluZyBsaWdodEdhbGxlcnkgaXRlbXMgZGlyZWN0bHkuXHJcbiAgICAgICAgICogLSBBbHdheXMgcGFzcyBuZXcgbGlzdCBvZiBnYWxsZXJ5IGl0ZW1zXHJcbiAgICAgICAgICogLSBZb3UgbmVlZCB0byB0YWtlIGNhcmUgb2YgdGh1bWJuYWlscyBvdXRzaWRlIHRoZSBnYWxsZXJ5IGlmIGFueVxyXG4gICAgICAgICAqIC0gdXNlciB0aGlzIG1ldGhvZCBvbmx5IGlmIHlvdSB3YW50IHRvIHVwZGF0ZSBzbGlkZXMgd2hlbiB0aGUgZ2FsbGVyeSBpcyBvcGVuZWQuIE90aGVyd2lzZSwgdXNlIGByZWZyZXNoKClgIG1ldGhvZC5cclxuICAgICAgICAgKiBAcGFyYW0gaXRlbXMgR2FsbGVyeSBpdGVtc1xyXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCBBZnRlciB0aGUgdXBkYXRlIG9wZXJhdGlvbiwgd2hpY2ggc2xpZGUgZ2FsbGVyeSBzaG91bGQgbmF2aWdhdGUgdG9cclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBjb25zdCBwbHVnaW4gPSBsaWdodEdhbGxlcnkoKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIC8vIEFkZGluZyBzbGlkZXMgZHluYW1pY2FsbHlcclxuICAgICAgICAgKiBsZXQgZ2FsbGVyeUl0ZW1zID0gW1xyXG4gICAgICAgICAqIC8vIEFjY2VzcyBleGlzdGluZyBsaWdodEdhbGxlcnkgaXRlbXNcclxuICAgICAgICAgKiAvLyBnYWxsZXJ5SXRlbXMgYXJlIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGludGVybmFsbHkgZnJvbSB0aGUgZ2FsbGVyeSBIVE1MIG1hcmt1cFxyXG4gICAgICAgICAqIC8vIG9yIGRpcmVjdGx5IGZyb20gZ2FsbGVyeUl0ZW1zIHdoZW4gZHluYW1pYyBnYWxsZXJ5IGlzIHVzZWRcclxuICAgICAgICAgKiAgIC4uLnBsdWdpbi5nYWxsZXJ5SXRlbXMsXHJcbiAgICAgICAgICogICAgIC4uLltcclxuICAgICAgICAgKiAgICAgICB7XHJcbiAgICAgICAgICogICAgICAgICBzcmM6ICdpbWcvaW1nLTEucG5nJyxcclxuICAgICAgICAgKiAgICAgICAgICAgdGh1bWI6ICdpbWcvdGh1bWIxLnBuZycsXHJcbiAgICAgICAgICogICAgICAgICB9LFxyXG4gICAgICAgICAqICAgICBdLFxyXG4gICAgICAgICAqICAgXTtcclxuICAgICAgICAgKiAgIHBsdWdpbi51cGRhdGVTbGlkZXMoXHJcbiAgICAgICAgICogICAgIGdhbGxlcnlJdGVtcyxcclxuICAgICAgICAgKiAgICAgcGx1Z2luLmluZGV4LFxyXG4gICAgICAgICAqICAgKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogLy8gUmVtb3ZlIHNsaWRlcyBkeW5hbWljYWxseVxyXG4gICAgICAgICAqIGdhbGxlcnlJdGVtcyA9IEpTT04ucGFyc2UoXHJcbiAgICAgICAgICogICBKU09OLnN0cmluZ2lmeSh1cGRhdGVTbGlkZUluc3RhbmNlLmdhbGxlcnlJdGVtcyksXHJcbiAgICAgICAgICogKTtcclxuICAgICAgICAgKiBnYWxsZXJ5SXRlbXMuc2hpZnQoKTtcclxuICAgICAgICAgKiB1cGRhdGVTbGlkZUluc3RhbmNlLnVwZGF0ZVNsaWRlcyhnYWxsZXJ5SXRlbXMsIDEpO1xyXG4gICAgICAgICAqIEBzZWUgPGEgaHJlZj1cIi9kZW1vcy91cGRhdGUtc2xpZGVzL1wiPkRlbW88L2E+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS51cGRhdGVTbGlkZXMgPSBmdW5jdGlvbiAoaXRlbXMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTcmMgPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF0uc3JjO1xyXG4gICAgICAgICAgICB0aGlzLmdhbGxlcnlJdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRyb2xzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGlubmVyLmVtcHR5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1zSW5Eb20gPSBbXTtcclxuICAgICAgICAgICAgdmFyIF9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIGN1cnJlbnQgaW5kZXggYmFzZWQgb24gc291cmNlIHZhbHVlIG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAgICB0aGlzLmdhbGxlcnlJdGVtcy5zb21lKGZ1bmN0aW9uIChnYWxsZXJ5SXRlbSwgaXRlbUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FsbGVyeUl0ZW0uc3JjID09PSBjdXJyZW50U3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2luZGV4ID0gaXRlbUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SXRlbXNJbkRvbSA9IHRoaXMub3JnYW5pemVTbGlkZUl0ZW1zKF9pbmRleCwgLTEpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRDb250ZW50KF9pbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKF9pbmRleCkuYWRkQ2xhc3MoJ2xnLWN1cnJlbnQnKTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IF9pbmRleDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50Q291bnRlcihfaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy51cGRhdGVTbGlkZXMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gR2V0IGdhbGxlcnkgaXRlbXMgYmFzZWQgb24gbXVsdGlwbGUgY29uZGl0aW9uc1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0SXRlbXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIEdhbGxlcnkgaXRlbXNcclxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IgPT09ICd0aGlzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh0aGlzLmVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNlbGVjdFdpdGhpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdFdpdGhpbiA9ICRMRyh0aGlzLnNldHRpbmdzLnNlbGVjdFdpdGhpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gc2VsZWN0V2l0aGluXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQodGhpcy5zZXR0aW5ncy5zZWxlY3RvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5zZXR0aW5ncy5zZWxlY3RvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5lbC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB1dGlscy5nZXREeW5hbWljT3B0aW9ucyh0aGlzLml0ZW1zLCB0aGlzLnNldHRpbmdzLmV4dHJhUHJvcHMsIHRoaXMuc2V0dGluZ3MuZ2V0Q2FwdGlvbkZyb21UaXRsZU9yQWx0LCB0aGlzLnNldHRpbmdzLmV4VGh1bWJJbWFnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5keW5hbWljRWwgfHwgW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9wZW4gbGlnaHRHYWxsZXJ5LlxyXG4gICAgICAgICAqIE9wZW4gZ2FsbGVyeSB3aXRoIHNwZWNpZmljIHNsaWRlIGJ5IHBhc3NpbmcgaW5kZXggb2YgdGhlIHNsaWRlIGFzIHBhcmFtZXRlci5cclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4ICAtIGluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBXaGljaCBpbWFnZSBsaWdodEdhbGxlcnkgc2hvdWxkIHpvb20gZnJvbVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBjb25zdCAkZHluYW1pY0dhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHluYW1pYy1nYWxsZXJ5LWRlbW8nKTtcclxuICAgICAgICAgKiBjb25zdCBkeW5hbWljR2FsbGVyeSA9IGxpZ2h0R2FsbGVyeSgkZHluYW1pY0dhbGxlcnksIHtcclxuICAgICAgICAgKiAgICAgZHluYW1pYzogdHJ1ZSxcclxuICAgICAgICAgKiAgICAgZHluYW1pY0VsOiBbXHJcbiAgICAgICAgICogICAgICAgICB7XHJcbiAgICAgICAgICogICAgICAgICAgICAgIHNyYzogJ2ltZy8xLmpwZycsXHJcbiAgICAgICAgICogICAgICAgICAgICAgIHRodW1iOiAnaW1nL3RodW1iLTEuanBnJyxcclxuICAgICAgICAgKiAgICAgICAgICAgICAgc3ViSHRtbDogJzxoND5JbWFnZSAxIHRpdGxlPC9oND48cD5JbWFnZSAxIGRlc2NyaXB0aW9ucy48L3A+JyxcclxuICAgICAgICAgKiAgICAgICAgIH0sXHJcbiAgICAgICAgICogICAgICAgICAuLi5cclxuICAgICAgICAgKiAgICAgXSxcclxuICAgICAgICAgKiB9KTtcclxuICAgICAgICAgKiAkZHluYW1pY0dhbGxlcnkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICogICAgIC8vIFN0YXJ0cyB3aXRoIHRoaXJkIGl0ZW0uKE9wdGlvbmFsKS5cclxuICAgICAgICAgKiAgICAgLy8gVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdXNlIGR5bmFtaWMgbW9kZSB3aXRoXHJcbiAgICAgICAgICogICAgIC8vIGN1c3RvbSB0aHVtYm5haWxzICh0aHVtYm5haWxzIG91dHNpZGUgZ2FsbGVyeSksXHJcbiAgICAgICAgICogICAgIGR5bmFtaWNHYWxsZXJ5Lm9wZW5HYWxsZXJ5KDIpO1xyXG4gICAgICAgICAqIH0pO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5vcGVuR2FsbGVyeSA9IGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgeyBpbmRleCA9IHRoaXMuc2V0dGluZ3MuaW5kZXg7IH1cclxuICAgICAgICAgICAgLy8gcHJldmVudCBhY2NpZGVudGFsIGRvdWJsZSBleGVjdXRpb25cclxuICAgICAgICAgICAgaWYgKHRoaXMubGdPcGVuZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMubGdPcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm91dGVyLmdldCgpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWhpZGUtaXRlbXMnKTtcclxuICAgICAgICAgICAgLy8gQWRkIGRpc3BsYXkgYmxvY2ssIGJ1dCBzdGlsbCBoYXMgb3BhY2l0eSAwXHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygnbGctc2hvdycpO1xyXG4gICAgICAgICAgICB2YXIgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbSA9IHRoaXMuZ2V0SXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbShpbmRleCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJdGVtc0luRG9tID0gaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbTtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gJyc7XHJcbiAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMgPSBpdGVtcyArIChcIjxkaXYgaWQ9XFxcIlwiICsgaXRlbSArIFwiXFxcIiBjbGFzcz1cXFwibGctaXRlbVxcXCI+PC9kaXY+XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kaW5uZXIuYXBwZW5kKGl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRIdG1sKGluZGV4KTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24gPSB0aGlzLmdldE1lZGlhQ29udGFpbmVyUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uLCB0b3AgPSBfYS50b3AsIGJvdHRvbSA9IF9hLmJvdHRvbTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmFsbG93TWVkaWFPdmVybGFwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lZGlhQ29udGFpbmVyUG9zaXRpb24odG9wLCBib3R0b20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBfX3NsaWRlVmlkZW9JbmZvID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdLl9fc2xpZGVWaWRlb0luZm87XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21Gcm9tT3JpZ2luICYmIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEltYWdlU2l6ZSA9IHV0aWxzLmdldFNpemUoZWxlbWVudCwgdGhpcy5vdXRlciwgdG9wICsgYm90dG9tLCBfX3NsaWRlVmlkZW9JbmZvICYmIHRoaXMuc2V0dGluZ3MudmlkZW9NYXhTaXplKTtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHV0aWxzLmdldFRyYW5zZm9ybShlbGVtZW50LCB0aGlzLm91dGVyLCB0b3AsIGJvdHRvbSwgdGhpcy5jdXJyZW50SW1hZ2VTaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuem9vbUZyb21PcmlnaW4gfHwgIXRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLnN0YXJ0Q2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTbGlkZUl0ZW0oaW5kZXgpLnJlbW92ZUNsYXNzKCdsZy1jb21wbGV0ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0aW1lb3V0ID0gdGhpcy5zZXR0aW5ncy56b29tRnJvbU9yaWdpblxyXG4gICAgICAgICAgICAgICAgPyAxMDBcclxuICAgICAgICAgICAgICAgIDogdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmFkZENsYXNzKCdsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYmVmb3JlT3Blbik7XHJcbiAgICAgICAgICAgIC8vIGFkZCBjbGFzcyBsZy1jdXJyZW50IHRvIHJlbW92ZSBpbml0aWFsIHRyYW5zaXRpb25cclxuICAgICAgICAgICAgdGhpcy5nZXRTbGlkZUl0ZW0oaW5kZXgpLmFkZENsYXNzKCdsZy1jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIHRoaXMubEdhbGxlcnlPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgY3VycmVudCBzY3JvbGwgdG9wIHZhbHVlIHRvIHNjcm9sbCBiYWNrIGFmdGVyIGNsb3NpbmcgdGhlIGdhbGxlcnkuLlxyXG4gICAgICAgICAgICB0aGlzLnByZXZTY3JvbGxUb3AgPSAkTEcod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGJvdGggem9vbUZyb21PcmlnaW4gYW5kIHRyYW5zZm9ybSB2YWx1ZXMgYXMgd2UgbmVlZCB0byBzZXQgc2V0IHRoZVxyXG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBvcGVuaW5nIGFuaW1hdGlvbiBpZiB1c2VyIG1pc3NlZCB0byBhZGQgdGhlIGxnLXNpemUgYXR0cmlidXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuem9vbUZyb21PcmlnaW4gJiYgdHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZV8xID0gX3RoaXMuZ2V0U2xpZGVJdGVtKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGVfMS5jc3MoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZV8xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xnLXN0YXJ0LXByb2dyZXNzIGxnLXN0YXJ0LWVuZC1wcm9ncmVzcycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgX3RoaXMuc2V0dGluZ3Muc3RhcnRBbmltYXRpb25EdXJhdGlvbiArICdtcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5hZGRDbGFzcygnbGctem9vbS1mcm9tLWltYWdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZV8xLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRiYWNrZHJvcC5hZGRDbGFzcygnaW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kY29udGFpbmVyLmFkZENsYXNzKCdsZy1zaG93LWluJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBsZy12aXNpYmxlIGNsYXNzIHJlc2V0cyBnYWxsZXJ5IG9wYWNpdHkgdG8gMVxyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy56b29tRnJvbU9yaWdpbiB8fCAhdHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmFkZENsYXNzKCdsZy12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgX3RoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpbml0aWF0ZSBzbGlkZSBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2xpZGUoaW5kZXgsIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmFmdGVyT3Blbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSA9PT0gdGhpcy5zZXR0aW5ncy5jb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgICRMRygnaHRtbCcpLmFkZENsYXNzKCdsZy1vbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOb3RlIC0gQ2hhbmdpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBtZWRpYSBvbiBldmVyeSBzbGlkZSB0cmFuc2l0aW9uIGNyZWF0ZXMgYSBmbGlja2VyaW5nIGVmZmVjdC5cclxuICAgICAgICAgKiBUaGVyZWZvcmUswqBUaGUgaGVpZ2h0IG9mIHRoZSBjYXB0aW9uIGlzIGNhbGN1bGF0ZWQgZHluYW1pY2FsbHksIG9ubHkgb25jZSBiYXNlZCBvbiB0aGUgZmlyc3Qgc2xpZGUgY2FwdGlvbi5cclxuICAgICAgICAgKiBpZiB5b3UgaGF2ZSBkeW5hbWljIGNhcHRpb25zIGZvciBlYWNoIG1lZGlhLFxyXG4gICAgICAgICAqIHlvdSBjYW4gcHJvdmlkZSBhbiBhcHByb3ByaWF0ZSBoZWlnaHQgZm9yIHRoZSBjYXB0aW9ucyB2aWEgYWxsb3dNZWRpYU92ZXJsYXAgb3B0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXRNZWRpYUNvbnRhaW5lclBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbGxvd01lZGlhT3ZlcmxhcCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdG9wID0gdGhpcy4kdG9vbGJhci5nZXQoKS5jbGllbnRIZWlnaHQgfHwgMDtcclxuICAgICAgICAgICAgdmFyIHN1Ykh0bWwgPSB0aGlzLm91dGVyLmZpbmQoJy5sZy1jb21wb25lbnRzIC5sZy1zdWItaHRtbCcpLmdldCgpO1xyXG4gICAgICAgICAgICB2YXIgY2FwdGlvbkhlaWdodCA9IHRoaXMuc2V0dGluZ3MuZGVmYXVsdENhcHRpb25IZWlnaHQgfHxcclxuICAgICAgICAgICAgICAgIChzdWJIdG1sICYmIHN1Ykh0bWwuY2xpZW50SGVpZ2h0KSB8fFxyXG4gICAgICAgICAgICAgICAgMDtcclxuICAgICAgICAgICAgdmFyIHRodW1iQ29udGFpbmVyID0gdGhpcy5vdXRlci5maW5kKCcubGctdGh1bWItb3V0ZXInKS5nZXQoKTtcclxuICAgICAgICAgICAgdmFyIHRodW1iSGVpZ2h0ID0gdGh1bWJDb250YWluZXIgPyB0aHVtYkNvbnRhaW5lci5jbGllbnRIZWlnaHQgOiAwO1xyXG4gICAgICAgICAgICB2YXIgYm90dG9tID0gdGh1bWJIZWlnaHQgKyBjYXB0aW9uSGVpZ2h0O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdG9wOiB0b3AsXHJcbiAgICAgICAgICAgICAgICBib3R0b206IGJvdHRvbSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuc2V0TWVkaWFDb250YWluZXJQb3NpdGlvbiA9IGZ1bmN0aW9uICh0b3AsIGJvdHRvbSkge1xyXG4gICAgICAgICAgICBpZiAodG9wID09PSB2b2lkIDApIHsgdG9wID0gMDsgfVxyXG4gICAgICAgICAgICBpZiAoYm90dG9tID09PSB2b2lkIDApIHsgYm90dG9tID0gMDsgfVxyXG4gICAgICAgICAgICB0aGlzLiRjb250ZW50LmNzcygndG9wJywgdG9wICsgJ3B4JykuY3NzKCdib3R0b20nLCBib3R0b20gKyAncHgnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuaGlkZUJhcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIEhpZGUgY29udHJvbGxlcnMgaWYgbW91c2UgZG9lc24ndCBtb3ZlIGZvciBzb21lIHBlcmlvZFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1oaWRlLWl0ZW1zJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2V0dGluZ3MuaGlkZUJhcnNEZWxheSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5vbignbW91c2Vtb3ZlLmxnIGNsaWNrLmxnIHRvdWNoc3RhcnQubGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1oaWRlLWl0ZW1zJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy5oaWRlQmFyVGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRpbWVvdXQgd2lsbCBiZSBjbGVhcmVkIG9uIGVhY2ggc2xpZGUgbW92ZW1lbnQgYWxzb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oaWRlQmFyVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWhpZGUtaXRlbXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgX3RoaXMuc2V0dGluZ3MuaGlkZUJhcnNEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIudHJpZ2dlcignbW91c2Vtb3ZlLmxnJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMuc2V0dGluZ3Muc2hvd0JhcnNBZnRlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmluaXRQaWN0dXJlRmlsbCA9IGZ1bmN0aW9uICgkaW1nKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnN1cHBvcnRMZWdhY3lCcm93c2VyKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpY3R1cmVmaWxsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM6IFskaW1nLmdldCgpXSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdsaWdodEdhbGxlcnkgOi0gSWYgeW91IHdhbnQgc3Jjc2V0IG9yIHBpY3R1cmUgdGFnIHRvIGJlIHN1cHBvcnRlZCBmb3Igb2xkZXIgYnJvd3NlciBwbGVhc2UgaW5jbHVkZSBwaWN0dXJlZmlsIGphdmFzY3JpcHQgbGlicmFyeSBpbiB5b3VyIGRvY3VtZW50LicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgQGRlc2MgQ3JlYXRlIGltYWdlIGNvdW50ZXJcclxuICAgICAgICAgKiAgRXg6IDEvMTBcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvdW50ZXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudGVySHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwibGctY291bnRlclxcXCIgcm9sZT1cXFwic3RhdHVzXFxcIiBhcmlhLWxpdmU9XFxcInBvbGl0ZVxcXCI+XFxuICAgICAgICAgICAgICAgIDxzcGFuIGlkPVxcXCJcIiArIHRoaXMuZ2V0SWROYW1lKCdsZy1jb3VudGVyLWN1cnJlbnQnKSArIFwiXFxcIiBjbGFzcz1cXFwibGctY291bnRlci1jdXJyZW50XFxcIj5cIiArICh0aGlzLmluZGV4ICsgMSkgKyBcIiA8L3NwYW4+IC9cXG4gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XFxcIlwiICsgdGhpcy5nZXRJZE5hbWUoJ2xnLWNvdW50ZXItYWxsJykgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWNvdW50ZXItYWxsXFxcIj5cIiArIHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCArIFwiIDwvc3Bhbj48L2Rpdj5cIjtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuZmluZCh0aGlzLnNldHRpbmdzLmFwcGVuZENvdW50ZXJUbykuYXBwZW5kKGNvdW50ZXJIdG1sKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIEBkZXNjIGFkZCBzdWItaHRtbCBpbnRvIHRoZSBzbGlkZVxyXG4gICAgICAgICAqICBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmFkZEh0bWwgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIHN1Ykh0bWw7XHJcbiAgICAgICAgICAgIHZhciBzdWJIdG1sVXJsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdLnN1Ykh0bWxVcmwpIHtcclxuICAgICAgICAgICAgICAgIHN1Ykh0bWxVcmwgPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF0uc3ViSHRtbFVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1Ykh0bWwgPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF0uc3ViSHRtbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXN1Ykh0bWxVcmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJIdG1sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGZpcnN0IGxldHRlciBvZiBzdWItaHRtbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGZpcnN0IGxldHRlciBzdGFydHMgd2l0aCAuIG9yICMgZ2V0IHRoZSBodG1sIGZvcm0gdGhlIGpRdWVyeSBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZkwgPSBzdWJIdG1sLnN1YnN0cmluZygwLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZkwgPT09ICcuJyB8fCBmTCA9PT0gJyMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnN1Ykh0bWxTZWxlY3RvclJlbGF0aXZlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy5zZXR0aW5ncy5keW5hbWljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJIdG1sID0gJExHKHRoaXMuaXRlbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmVxKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKHN1Ykh0bWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViSHRtbCA9ICRMRyhzdWJIdG1sKS5maXJzdCgpLmh0bWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ykh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hcHBlbmRTdWJIdG1sVG8gIT09ICcubGctaXRlbScpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJIdG1sVXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlci5maW5kKCcubGctc3ViLWh0bWwnKS5sb2FkKHN1Ykh0bWxVcmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlci5maW5kKCcubGctc3ViLWh0bWwnKS5odG1sKHN1Ykh0bWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9ICRMRyh0aGlzLmdldFNsaWRlSXRlbUlkKGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViSHRtbFVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5sb2FkKHN1Ykh0bWxVcmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlLmFwcGVuZChcIjxkaXYgY2xhc3M9XFxcImxnLXN1Yi1odG1sXFxcIj5cIiArIHN1Ykh0bWwgKyBcIjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBZGQgbGctZW1wdHktaHRtbCBjbGFzcyBpZiB0aXRsZSBkb2Vzbid0IGV4aXN0XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViSHRtbCAhPT0gJ3VuZGVmaW5lZCcgJiYgc3ViSHRtbCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1Ykh0bWwgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCh0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsZy1lbXB0eS1odG1sJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLWVtcHR5LWh0bWwnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5hZnRlckFwcGVuZFN1Ykh0bWwsIHtcclxuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgQGRlc2MgUHJlbG9hZCBzbGlkZXNcclxuICAgICAgICAgKiAgQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICogQHRvZG8gcHJlbG9hZCBub3Qgd29ya2luZyBmb3IgdGhlIGZpcnN0IHNsaWRlLCBBbHNvLCBzaG91bGQgd29yayBmb3IgdGhlIGZpcnN0IGFuZCBsYXN0IHNsaWRlIGFzIHdlbGxcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gdGhpcy5zZXR0aW5ncy5wcmVsb2FkOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID49IHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCAtIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRDb250ZW50KGluZGV4ICsgaSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDw9IHRoaXMuc2V0dGluZ3MucHJlbG9hZDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggLSBqIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQ29udGVudChpbmRleCAtIGosIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXREdW1teUltZ1N0eWxlcyA9IGZ1bmN0aW9uIChpbWFnZVNpemUpIHtcclxuICAgICAgICAgICAgaWYgKCFpbWFnZVNpemUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIHJldHVybiBcIndpZHRoOlwiICsgaW1hZ2VTaXplLndpZHRoICsgXCJweDtcXG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IC1cIiArIGltYWdlU2l6ZS53aWR0aCAvIDIgKyBcInB4O1xcbiAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAtXCIgKyBpbWFnZVNpemUuaGVpZ2h0IC8gMiArIFwicHg7XFxuICAgICAgICAgICAgICAgIGhlaWdodDpcIiArIGltYWdlU2l6ZS5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldFZpZGVvQ29udFN0eWxlID0gZnVuY3Rpb24gKGltYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICBpZiAoIWltYWdlU2l6ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgcmV0dXJuIFwid2lkdGg6XCIgKyBpbWFnZVNpemUud2lkdGggKyBcInB4O1xcbiAgICAgICAgICAgICAgICBoZWlnaHQ6XCIgKyBpbWFnZVNpemUuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nZXREdW1teUltYWdlQ29udGVudCA9IGZ1bmN0aW9uICgkY3VycmVudFNsaWRlLCBpbmRleCwgYWx0KSB7XHJcbiAgICAgICAgICAgIHZhciAkY3VycmVudEl0ZW07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5keW5hbWljKSB7XHJcbiAgICAgICAgICAgICAgICAkY3VycmVudEl0ZW0gPSAkTEcodGhpcy5pdGVtcykuZXEoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkY3VycmVudEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBfZHVtbXlJbWdTcmMgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZXhUaHVtYkltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2R1bW15SW1nU3JjID0gJGN1cnJlbnRJdGVtLmZpbmQoJ2ltZycpLmZpcnN0KCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfZHVtbXlJbWdTcmMgPSAkY3VycmVudEl0ZW0uYXR0cih0aGlzLnNldHRpbmdzLmV4VGh1bWJJbWFnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9kdW1teUltZ1NyYylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW1nU3R5bGUgPSB0aGlzLmdldER1bW15SW1nU3R5bGVzKHRoaXMuY3VycmVudEltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZHVtbXlJbWdDb250ZW50ID0gXCI8aW1nIFwiICsgYWx0ICsgXCIgc3R5bGU9XFxcIlwiICsgaW1nU3R5bGUgKyBcIlxcXCIgY2xhc3M9XFxcImxnLWR1bW15LWltZ1xcXCIgc3JjPVxcXCJcIiArIF9kdW1teUltZ1NyYyArIFwiXFxcIiAvPlwiO1xyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5hZGRDbGFzcygnbGctZmlyc3Qtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWZpcnN0LXNsaWRlLWxvYWRpbmcnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkdW1teUltZ0NvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5zZXRJbWdNYXJrdXAgPSBmdW5jdGlvbiAoc3JjLCAkY3VycmVudFNsaWRlLCBpbmRleCkge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEdhbGxlcnlJdGVtID0gdGhpcy5nYWxsZXJ5SXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICB2YXIgYWx0ID0gY3VycmVudEdhbGxlcnlJdGVtLmFsdCwgc3Jjc2V0ID0gY3VycmVudEdhbGxlcnlJdGVtLnNyY3NldCwgc2l6ZXMgPSBjdXJyZW50R2FsbGVyeUl0ZW0uc2l6ZXMsIHNvdXJjZXMgPSBjdXJyZW50R2FsbGVyeUl0ZW0uc291cmNlcztcclxuICAgICAgICAgICAgLy8gVXNlIHRoZSB0aHVtYm5haWwgYXMgZHVtbXkgaW1hZ2Ugd2hpY2ggd2lsbCBiZSByZXNpemVkIHRvIGFjdHVhbCBpbWFnZSBzaXplIGFuZFxyXG4gICAgICAgICAgICAvLyBkaXNwbGF5ZWQgb24gdG9wIG9mIGFjdHVhbCBpbWFnZVxyXG4gICAgICAgICAgICB2YXIgaW1nQ29udGVudCA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgYWx0QXR0ciA9IGFsdCA/ICdhbHQ9XCInICsgYWx0ICsgJ1wiJyA6ICcnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0ZpcnN0U2xpZGVXaXRoWm9vbUFuaW1hdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICBpbWdDb250ZW50ID0gdGhpcy5nZXREdW1teUltYWdlQ29udGVudCgkY3VycmVudFNsaWRlLCBpbmRleCwgYWx0QXR0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbWdDb250ZW50ID0gdXRpbHMuZ2V0SW1nTWFya3VwKGluZGV4LCBzcmMsIGFsdEF0dHIsIHNyY3NldCwgc2l6ZXMsIHNvdXJjZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpbWdNYXJrdXAgPSBcIjxwaWN0dXJlIGNsYXNzPVxcXCJsZy1pbWctd3JhcFxcXCI+IFwiICsgaW1nQ29udGVudCArIFwiPC9waWN0dXJlPlwiO1xyXG4gICAgICAgICAgICAkY3VycmVudFNsaWRlLnByZXBlbmQoaW1nTWFya3VwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUub25TbGlkZU9iamVjdExvYWQgPSBmdW5jdGlvbiAoJHNsaWRlLCBpc0hUTUw1VmlkZW9XaXRob3V0UG9zdGVyLCBvbkxvYWQsIG9uRXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lZGlhT2JqZWN0ID0gJHNsaWRlLmZpbmQoJy5sZy1vYmplY3QnKS5maXJzdCgpO1xyXG4gICAgICAgICAgICBpZiAodXRpbHMuaXNJbWFnZUxvYWRlZChtZWRpYU9iamVjdC5nZXQoKSkgfHxcclxuICAgICAgICAgICAgICAgIGlzSFRNTDVWaWRlb1dpdGhvdXRQb3N0ZXIpIHtcclxuICAgICAgICAgICAgICAgIG9uTG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVkaWFPYmplY3Qub24oJ2xvYWQubGcgZXJyb3IubGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Mb2FkICYmIG9uTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBtZWRpYU9iamVjdC5vbignZXJyb3IubGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gJGVsIEN1cnJlbnQgc2xpZGUgaXRlbVxyXG4gICAgICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICAgICAqIEBwYXJhbSBkZWxheSBEZWxheSBpcyAwIGV4Y2VwdCBmaXJzdCB0aW1lXHJcbiAgICAgICAgICogQHBhcmFtIHNwZWVkIFNwZWVkIGlzIHNhbWUgYXMgZGVsYXksIGV4Y2VwdCBpdCBpcyAwIGlmIGdhbGxlcnkgaXMgb3BlbmVkIHZpYSBoYXNoIHBsdWdpblxyXG4gICAgICAgICAqIEBwYXJhbSBpc0ZpcnN0U2xpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm9uTGdPYmplY3RMb2FkID0gZnVuY3Rpb24gKGN1cnJlbnRTbGlkZSwgaW5kZXgsIGRlbGF5LCBzcGVlZCwgaXNGaXJzdFNsaWRlLCBpc0hUTUw1VmlkZW9XaXRob3V0UG9zdGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMub25TbGlkZU9iamVjdExvYWQoY3VycmVudFNsaWRlLCBpc0hUTUw1VmlkZW9XaXRob3V0UG9zdGVyLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50cmlnZ2VyU2xpZGVJdGVtTG9hZChjdXJyZW50U2xpZGUsIGluZGV4LCBkZWxheSwgc3BlZWQsIGlzRmlyc3RTbGlkZSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5hZGRDbGFzcygnbGctY29tcGxldGUgbGctY29tcGxldGVfJyk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUuaHRtbCgnPHNwYW4gY2xhc3M9XCJsZy1lcnJvci1tc2dcIj5Pb3BzLi4uIEZhaWxlZCB0byBsb2FkIGNvbnRlbnQuLi48L3NwYW4+Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS50cmlnZ2VyU2xpZGVJdGVtTG9hZCA9IGZ1bmN0aW9uICgkY3VycmVudFNsaWRlLCBpbmRleCwgZGVsYXksIHNwZWVkLCBpc0ZpcnN0U2xpZGUpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRHYWxsZXJ5SXRlbSA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgLy8gQWRkaW5nIGRlbGF5IGZvciB2aWRlbyBzbGlkZXMgd2l0aG91dCBwb3N0ZXIgZm9yIGJldHRlciBwZXJmb3JtYW5jZSBhbmQgdXNlciBleHBlcmllbmNlXHJcbiAgICAgICAgICAgIC8vIFZpZGVvcyBzaG91bGQgc3RhcnQgcGxheWluZyBvbmNlIG9uY2UgdGhlIGdhbGxlcnkgaXMgY29tcGxldGVseSBsb2FkZWRcclxuICAgICAgICAgICAgdmFyIF9zcGVlZCA9IGlzRmlyc3RTbGlkZSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTbGlkZVR5cGUoY3VycmVudEdhbGxlcnlJdGVtKSA9PT0gJ3ZpZGVvJyAmJlxyXG4gICAgICAgICAgICAgICAgIWN1cnJlbnRHYWxsZXJ5SXRlbS5wb3N0ZXJcclxuICAgICAgICAgICAgICAgID8gc3BlZWRcclxuICAgICAgICAgICAgICAgIDogMDtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLmFkZENsYXNzKCdsZy1jb21wbGV0ZSBsZy1jb21wbGV0ZV8nKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5zbGlkZUl0ZW1Mb2FkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5OiBkZWxheSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3RTbGlkZTogaXNGaXJzdFNsaWRlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIF9zcGVlZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmlzRmlyc3RTbGlkZVdpdGhab29tQW5pbWF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gISEoIXRoaXMubEdhbGxlcnlPbiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy56b29tRnJvbU9yaWdpbiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2VTaXplKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEFkZCB2aWRlbyBzbGlkZUluZm9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmFkZFNsaWRlVmlkZW9JbmZvID0gZnVuY3Rpb24gKGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Ll9fc2xpZGVWaWRlb0luZm8gPSB1dGlscy5pc1ZpZGVvKGVsZW1lbnQuc3JjLCAhIWVsZW1lbnQudmlkZW8sIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Ll9fc2xpZGVWaWRlb0luZm8gJiZcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXR0aW5ncy5sb2FkWW91VHViZVBvc3RlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFlbGVtZW50LnBvc3RlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuX19zbGlkZVZpZGVvSW5mby55b3V0dWJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wb3N0ZXIgPSBcIi8vaW1nLnlvdXR1YmUuY29tL3ZpL1wiICsgZWxlbWVudC5fX3NsaWRlVmlkZW9JbmZvLnlvdXR1YmVbMV0gKyBcIi9tYXhyZXNkZWZhdWx0LmpwZ1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBMb2FkIHNsaWRlIGNvbnRlbnQgaW50byBzbGlkZS5cclxuICAgICAgICAgKiAgVGhpcyBpcyB1c2VkIHRvIGxvYWQgY29udGVudCBpbnRvIHNsaWRlcyB0aGF0IGlzIG5vdCB2aXNpYmxlIHRvb1xyXG4gICAgICAgICAqICBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgc2xpZGUuXHJcbiAgICAgICAgICogIEBwYXJhbSB7Qm9vbGVhbn0gcmVjIC0gaWYgdHJ1ZSBjYWxsIGxvYWRjb250ZW50KCkgZnVuY3Rpb24gYWdhaW4uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5sb2FkQ29udGVudCA9IGZ1bmN0aW9uIChpbmRleCwgcmVjKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIHZhciAkY3VycmVudFNsaWRlID0gJExHKHRoaXMuZ2V0U2xpZGVJdGVtSWQoaW5kZXgpKTtcclxuICAgICAgICAgICAgdmFyIHBvc3RlciA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5wb3N0ZXIsIHNyY3NldCA9IGN1cnJlbnRHYWxsZXJ5SXRlbS5zcmNzZXQsIHNpemVzID0gY3VycmVudEdhbGxlcnlJdGVtLnNpemVzLCBzb3VyY2VzID0gY3VycmVudEdhbGxlcnlJdGVtLnNvdXJjZXM7XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSBjdXJyZW50R2FsbGVyeUl0ZW0uc3JjO1xyXG4gICAgICAgICAgICB2YXIgdmlkZW8gPSBjdXJyZW50R2FsbGVyeUl0ZW0udmlkZW87XHJcbiAgICAgICAgICAgIHZhciBfaHRtbDVWaWRlbyA9IHZpZGVvICYmIHR5cGVvZiB2aWRlbyA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKHZpZGVvKSA6IHZpZGVvO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEdhbGxlcnlJdGVtLnJlc3BvbnNpdmUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcmNEeUl0bXMgPSBjdXJyZW50R2FsbGVyeUl0ZW0ucmVzcG9uc2l2ZS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgc3JjID0gdXRpbHMuZ2V0UmVzcG9uc2l2ZVNyYyhzcmNEeUl0bXMpIHx8IHNyYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmlkZW9JbmZvID0gY3VycmVudEdhbGxlcnlJdGVtLl9fc2xpZGVWaWRlb0luZm87XHJcbiAgICAgICAgICAgIHZhciBsZ1ZpZGVvU3R5bGUgPSAnJztcclxuICAgICAgICAgICAgdmFyIGlmcmFtZSA9ICEhY3VycmVudEdhbGxlcnlJdGVtLmlmcmFtZTtcclxuICAgICAgICAgICAgdmFyIGlzRmlyc3RTbGlkZSA9ICF0aGlzLmxHYWxsZXJ5T247XHJcbiAgICAgICAgICAgIC8vIGRlbGF5IGZvciBhZGRpbmcgY29tcGxldGUgY2xhc3MuIGl0IGlzIDAgZXhjZXB0IGZpcnN0IHRpbWUuXHJcbiAgICAgICAgICAgIHZhciBkZWxheSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChpc0ZpcnN0U2xpZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnpvb21Gcm9tT3JpZ2luICYmIHRoaXMuY3VycmVudEltYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5ID0gdGhpcy5zZXR0aW5ncy5zdGFydEFuaW1hdGlvbkR1cmF0aW9uICsgMTA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxheSA9IHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbiArIDEwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJGN1cnJlbnRTbGlkZS5oYXNDbGFzcygnbGctbG9hZGVkJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2aWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSB0aGlzLm1lZGlhQ29udGFpbmVyUG9zaXRpb24sIHRvcF8yID0gX2EudG9wLCBib3R0b20gPSBfYS5ib3R0b207XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvU2l6ZSA9IHV0aWxzLmdldFNpemUodGhpcy5pdGVtc1tpbmRleF0sIHRoaXMub3V0ZXIsIHRvcF8yICsgYm90dG9tLCB2aWRlb0luZm8gJiYgdGhpcy5zZXR0aW5ncy52aWRlb01heFNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxnVmlkZW9TdHlsZSA9IHRoaXMuZ2V0VmlkZW9Db250U3R5bGUodmlkZW9TaXplKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpZnJhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya3VwID0gdXRpbHMuZ2V0SWZyYW1lTWFya3VwKHRoaXMuc2V0dGluZ3MuaWZyYW1lV2lkdGgsIHRoaXMuc2V0dGluZ3MuaWZyYW1lSGVpZ2h0LCB0aGlzLnNldHRpbmdzLmlmcmFtZU1heFdpZHRoLCB0aGlzLnNldHRpbmdzLmlmcmFtZU1heEhlaWdodCwgc3JjLCBjdXJyZW50R2FsbGVyeUl0ZW0uaWZyYW1lVGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUucHJlcGVuZChtYXJrdXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocG9zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR1bW15SW1nID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc1N0YXJ0QW5pbWF0aW9uID0gaXNGaXJzdFNsaWRlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9vbUZyb21PcmlnaW4gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2VTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNTdGFydEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdW1teUltZyA9IHRoaXMuZ2V0RHVtbXlJbWFnZUNvbnRlbnQoJGN1cnJlbnRTbGlkZSwgaW5kZXgsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcmt1cCA9IHV0aWxzLmdldFZpZGVvUG9zdGVyTWFya3VwKHBvc3RlciwgZHVtbXlJbWcgfHwgJycsIGxnVmlkZW9TdHlsZSwgdGhpcy5zZXR0aW5ncy5zdHJpbmdzWydwbGF5VmlkZW8nXSwgdmlkZW9JbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLnByZXBlbmQobWFya3VwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXJrdXAgPSBcIjxkaXYgY2xhc3M9XFxcImxnLXZpZGVvLWNvbnQgXFxcIiBzdHlsZT1cXFwiXCIgKyBsZ1ZpZGVvU3R5bGUgKyBcIlxcXCI+PC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5wcmVwZW5kKG1hcmt1cCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEltZ01hcmt1cChzcmMsICRjdXJyZW50U2xpZGUsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Jjc2V0IHx8IHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbWcgPSAkY3VycmVudFNsaWRlLmZpbmQoJy5sZy1vYmplY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGljdHVyZUZpbGwoJGltZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBvc3RlciB8fCB2aWRlb0luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5oYXNWaWRlbywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sNVZpZGVvOiBfaHRtbDVWaWRlbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzUG9zdGVyOiAhIXBvc3RlcixcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmFmdGVyQXBwZW5kU2xpZGUsIHsgaW5kZXg6IGluZGV4IH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubEdhbGxlcnlPbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuYXBwZW5kU3ViSHRtbFRvID09PSAnLmxnLWl0ZW0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRIdG1sKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBGb3IgZmlyc3QgdGltZSBhZGQgc29tZSBkZWxheSBmb3IgZGlzcGxheWluZyB0aGUgc3RhcnQgYW5pbWF0aW9uLlxyXG4gICAgICAgICAgICB2YXIgX3NwZWVkID0gMDtcclxuICAgICAgICAgICAgLy8gRG8gbm90IGNoYW5nZSB0aGUgZGVsYXkgdmFsdWUgYmVjYXVzZSBpdCBpcyByZXF1aXJlZCBmb3Igem9vbSBwbHVnaW4uXHJcbiAgICAgICAgICAgIC8vIElmIGdhbGxlcnkgb3BlbmVkIGZyb20gZGlyZWN0IHVybCAoaGFzaCkgc3BlZWQgdmFsdWUgc2hvdWxkIGJlIDBcclxuICAgICAgICAgICAgaWYgKGRlbGF5ICYmICEkTEcoZG9jdW1lbnQuYm9keSkuaGFzQ2xhc3MoJ2xnLWZyb20taGFzaCcpKSB7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSBkZWxheTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBPbmx5IGZvciBmaXJzdCBzbGlkZSBhbmQgem9vbUZyb21PcmlnaW4gaXMgZW5hYmxlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0ZpcnN0U2xpZGVXaXRoWm9vbUFuaW1hdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctc3RhcnQtZW5kLXByb2dyZXNzIGxnLXN0YXJ0LXByb2dyZXNzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnNldHRpbmdzLnN0YXJ0QW5pbWF0aW9uRHVyYXRpb24gKyAxMDApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEkY3VycmVudFNsaWRlLmhhc0NsYXNzKCdsZy1sb2FkZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuZ2V0U2xpZGVUeXBlKGN1cnJlbnRHYWxsZXJ5SXRlbSkgPT09ICdpbWFnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy13cmFwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKHV0aWxzLmdldEltZ01hcmt1cChpbmRleCwgc3JjLCAnJywgc3Jjc2V0LCBzaXplcywgY3VycmVudEdhbGxlcnlJdGVtLnNvdXJjZXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcmNzZXQgfHwgc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW1nID0gJGN1cnJlbnRTbGlkZS5maW5kKCcubGctb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5pdFBpY3R1cmVGaWxsKCRpbWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5nZXRTbGlkZVR5cGUoY3VycmVudEdhbGxlcnlJdGVtKSA9PT0gJ2ltYWdlJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKF90aGlzLmdldFNsaWRlVHlwZShjdXJyZW50R2FsbGVyeUl0ZW0pID09PSAndmlkZW8nICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25MZ09iamVjdExvYWQoJGN1cnJlbnRTbGlkZSwgaW5kZXgsIGRlbGF5LCBfc3BlZWQsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvYWQgcmVtYWluaW5nIHNsaWRlcyBvbmNlIHRoZSBzbGlkZSBpcyBjb21wbGV0ZWx5IGxvYWRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25TbGlkZU9iamVjdExvYWQoJGN1cnJlbnRTbGlkZSwgISEodmlkZW9JbmZvICYmIHZpZGVvSW5mby5odG1sNSAmJiAhcG9zdGVyKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxvYWRDb250ZW50T25GaXJzdFNsaWRlTG9hZChpbmRleCwgJGN1cnJlbnRTbGlkZSwgX3NwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkQ29udGVudE9uRmlyc3RTbGlkZUxvYWQoaW5kZXgsICRjdXJyZW50U2xpZGUsIF9zcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuc2V0dGluZ3Muc3RhcnRBbmltYXRpb25EdXJhdGlvbiArIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU0xpZGUgY29udGVudCBoYXMgYmVlbiBhZGRlZCB0byBkb21cclxuICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5hZGRDbGFzcygnbGctbG9hZGVkJyk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0ZpcnN0U2xpZGVXaXRoWm9vbUFuaW1hdGlvbigpIHx8XHJcbiAgICAgICAgICAgICAgICAodGhpcy5nZXRTbGlkZVR5cGUoY3VycmVudEdhbGxlcnlJdGVtKSA9PT0gJ3ZpZGVvJyAmJiAhcG9zdGVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxnT2JqZWN0TG9hZCgkY3VycmVudFNsaWRlLCBpbmRleCwgZGVsYXksIF9zcGVlZCwgaXNGaXJzdFNsaWRlLCAhISh2aWRlb0luZm8gJiYgdmlkZW9JbmZvLmh0bWw1ICYmICFwb3N0ZXIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBXaGVuIGdhbGxlcnkgaXMgb3BlbmVkIG9uY2UgY29udGVudCBpcyBsb2FkZWQgKHNlY29uZCB0aW1lKSBuZWVkIHRvIGFkZCBsZy1jb21wbGV0ZSBjbGFzcyBmb3IgY3NzIHN0eWxpbmdcclxuICAgICAgICAgICAgaWYgKCghdGhpcy56b29tRnJvbU9yaWdpbiB8fCAhdGhpcy5jdXJyZW50SW1hZ2VTaXplKSAmJlxyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5oYXNDbGFzcygnbGctY29tcGxldGVfJykgJiZcclxuICAgICAgICAgICAgICAgICF0aGlzLmxHYWxsZXJ5T24pIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuYWRkQ2xhc3MoJ2xnLWNvbXBsZXRlJyk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIENvbnRlbnQgbG9hZGVkXHJcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gc2V0IGxHYWxsZXJ5T24gYmVmb3JlIGNhbGxpbmcgcHJlbG9hZCBmdW5jdGlvblxyXG4gICAgICAgICAgICB0aGlzLmxHYWxsZXJ5T24gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocmVjID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRjdXJyZW50U2xpZGUuaGFzQ2xhc3MoJ2xnLWNvbXBsZXRlXycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLW9iamVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignbG9hZC5sZyBlcnJvci5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucHJlbG9hZChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWxvYWQoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBSZW1vdmUgZHVtbXkgaW1hZ2UgY29udGVudCBhbmQgbG9hZCBuZXh0IHNsaWRlc1xyXG4gICAgICAgICAqIENhbGxlZCBvbmx5IGZvciB0aGUgZmlyc3QgdGltZSBpZiB6b29tRnJvbU9yaWdpbiBhbmltYXRpb24gaXMgZW5hYmxlZFxyXG4gICAgICAgICAqIEBwYXJhbSBpbmRleFxyXG4gICAgICAgICAqIEBwYXJhbSAkY3VycmVudFNsaWRlXHJcbiAgICAgICAgICogQHBhcmFtIHNwZWVkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5sb2FkQ29udGVudE9uRmlyc3RTbGlkZUxvYWQgPSBmdW5jdGlvbiAoaW5kZXgsICRjdXJyZW50U2xpZGUsIHNwZWVkKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJGN1cnJlbnRTbGlkZS5maW5kKCcubGctZHVtbXktaW1nJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKCdsZy1maXJzdC1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWZpcnN0LXNsaWRlLWxvYWRpbmcnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmlzRHVtbXlJbWFnZVJlbW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucHJlbG9hZChpbmRleCk7XHJcbiAgICAgICAgICAgIH0sIHNwZWVkICsgMzAwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0SXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbSA9IGZ1bmN0aW9uIChpbmRleCwgcHJldkluZGV4LCBudW1iZXJPZkl0ZW1zKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChudW1iZXJPZkl0ZW1zID09PSB2b2lkIDApIHsgbnVtYmVyT2ZJdGVtcyA9IDA7IH1cclxuICAgICAgICAgICAgdmFyIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20gPSBbXTtcclxuICAgICAgICAgICAgLy8gTWluaW11bSAyIGl0ZW1zIHNob3VsZCBiZSB0aGVyZVxyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVOdW1iZXJPZkl0ZW1zID0gTWF0aC5tYXgobnVtYmVyT2ZJdGVtcywgMyk7XHJcbiAgICAgICAgICAgIHBvc3NpYmxlTnVtYmVyT2ZJdGVtcyA9IE1hdGgubWluKHBvc3NpYmxlTnVtYmVyT2ZJdGVtcywgdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgdmFyIHByZXZJbmRleEl0ZW0gPSBcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIHByZXZJbmRleDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCA8PSAzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbGxlcnlJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChfZWxlbWVudCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgX3RoaXMubGdJZCArIFwiLVwiICsgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAodGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gMSkgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpZHggPSBpbmRleDsgaWR4ID4gaW5kZXggLSBwb3NzaWJsZU51bWJlck9mSXRlbXMgLyAyICYmIGlkeCA+PSAwOyBpZHgtLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIGlkeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbnVtYmVyT2ZFeGlzdGluZ0l0ZW1zID0gaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBwb3NzaWJsZU51bWJlck9mSXRlbXMgLSBudW1iZXJPZkV4aXN0aW5nSXRlbXM7IGlkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgKGluZGV4ICsgaWR4ICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gaW5kZXg7IGlkeCA8PSB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggLSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgaWR4IDwgaW5kZXggKyBwb3NzaWJsZU51bWJlck9mSXRlbXMgLyAyOyBpZHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIGlkeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbnVtYmVyT2ZFeGlzdGluZ0l0ZW1zID0gaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBwb3NzaWJsZU51bWJlck9mSXRlbXMgLSBudW1iZXJPZkV4aXN0aW5nSXRlbXM7IGlkeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5wdXNoKFwibGctaXRlbS1cIiArIHRoaXMubGdJZCArIFwiLVwiICsgKGluZGV4IC0gaWR4IC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9CZUluc2VydGVkVG9Eb20ucHVzaChcImxnLWl0ZW0tXCIgKyB0aGlzLmxnSWQgKyBcIi1cIiArIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyAodGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLmluZGV4T2YocHJldkluZGV4SXRlbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLnB1c2goXCJsZy1pdGVtLVwiICsgdGhpcy5sZ0lkICsgXCItXCIgKyBwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtc1RvQmVJbnNlcnRlZFRvRG9tO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5vcmdhbml6ZVNsaWRlSXRlbXMgPSBmdW5jdGlvbiAoaW5kZXgsIHByZXZJbmRleCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbSA9IHRoaXMuZ2V0SXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbShpbmRleCwgcHJldkluZGV4LCB0aGlzLnNldHRpbmdzLm51bWJlck9mU2xpZGVJdGVtc0luRG9tKTtcclxuICAgICAgICAgICAgaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY3VycmVudEl0ZW1zSW5Eb20uaW5kZXhPZihpdGVtKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kaW5uZXIuYXBwZW5kKFwiPGRpdiBpZD1cXFwiXCIgKyBpdGVtICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1pdGVtXFxcIj48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJdGVtc0luRG9tLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvQmVJbnNlcnRlZFRvRG9tLmluZGV4T2YoaXRlbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJExHKFwiI1wiICsgaXRlbSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXNUb0JlSW5zZXJ0ZWRUb0RvbTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCBwcmV2aW91cyBpbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmdldFByZXZpb3VzU2xpZGVJbmRleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEl0ZW1JZCA9IHRoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWN1cnJlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgICAgICBwcmV2SW5kZXggPSBwYXJzZUludChjdXJyZW50SXRlbUlkLnNwbGl0KCctJylbM10pIHx8IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcmV2SW5kZXg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnNldERvd25sb2FkVmFsdWUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZG93bmxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmdhbGxlcnlJdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaGlkZURvd25sb2FkQnRuID0gY3VycmVudEdhbGxlcnlJdGVtLmRvd25sb2FkVXJsID09PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHYWxsZXJ5SXRlbS5kb3dubG9hZFVybCA9PT0gJ2ZhbHNlJztcclxuICAgICAgICAgICAgICAgIGlmIChoaWRlRG93bmxvYWRCdG4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1oaWRlLWRvd25sb2FkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGRvd25sb2FkID0gdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctZG93bmxvYWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1oaWRlLWRvd25sb2FkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGRvd25sb2FkLmF0dHIoJ2hyZWYnLCBjdXJyZW50R2FsbGVyeUl0ZW0uZG93bmxvYWRVcmwgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEdhbGxlcnlJdGVtLnNyYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRHYWxsZXJ5SXRlbS5kb3dubG9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZG93bmxvYWQuYXR0cignZG93bmxvYWQnLCBjdXJyZW50R2FsbGVyeUl0ZW0uZG93bmxvYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5tYWtlU2xpZGVBbmltYXRpb24gPSBmdW5jdGlvbiAoZGlyZWN0aW9uLCBjdXJyZW50U2xpZGVJdGVtLCBwcmV2aW91c1NsaWRlSXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sR2FsbGVyeU9uKSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1NsaWRlSXRlbS5hZGRDbGFzcygnbGctc2xpZGUtcHJvZ3Jlc3MnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgdHJhbnNpdGlvbnNcclxuICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmFkZENsYXNzKCdsZy1uby10cmFucycpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctcHJldi1zbGlkZSBsZy1uZXh0LXNsaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAncHJldicpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3ByZXZzbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLXByZXYtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NsaWRlSXRlbS5hZGRDbGFzcygnbGctbmV4dC1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBzbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZUl0ZW0uYWRkQ2xhc3MoJ2xnLW5leHQtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1NsaWRlSXRlbS5hZGRDbGFzcygnbGctcHJldi1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZ2l2ZSA1MCBtcyBmb3IgYnJvd3NlciB0byBhZGQvcmVtb3ZlIGNsYXNzXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5maW5kKCcubGctaXRlbScpLnJlbW92ZUNsYXNzKCdsZy1jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlSXRlbS5hZGRDbGFzcygnbGctY3VycmVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0IGFsbCB0cmFuc2l0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1uby10cmFucycpO1xyXG4gICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmxHYWxsZXJ5T24gPyB0aGlzLnNldHRpbmdzLnNsaWRlRGVsYXkgOiAwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdvdG8gYSBzcGVjaWZpYyBzbGlkZS5cclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZyb21Ub3VjaCAtIHRydWUgaWYgc2xpZGUgZnVuY3Rpb24gY2FsbGVkIHZpYSB0b3VjaCBldmVudCBvciBtb3VzZSBkcmFnXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBmcm9tVGh1bWIgLSB0cnVlIGlmIHNsaWRlIGZ1bmN0aW9uIGNhbGxlZCB2aWEgdGh1bWJuYWlsIGNsaWNrXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvbiAtIERpcmVjdGlvbiBvZiB0aGUgc2xpZGUobmV4dC9wcmV2KVxyXG4gICAgICAgICAqIEBjYXRlZ29yeSBsR1B1YmxpY01ldGhvZHNcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqICBjb25zdCBwbHVnaW4gPSBsaWdodEdhbGxlcnkoKTtcclxuICAgICAgICAgKiAgLy8gdG8gZ28gdG8gM3JkIHNsaWRlXHJcbiAgICAgICAgICogIHBsdWdpbi5zbGlkZSgyKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbiAoaW5kZXgsIGZyb21Ub3VjaCwgZnJvbVRodW1iLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IHRoaXMuZ2V0UHJldmlvdXNTbGlkZUluZGV4KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1zSW5Eb20gPSB0aGlzLm9yZ2FuaXplU2xpZGVJdGVtcyhpbmRleCwgcHJldkluZGV4KTtcclxuICAgICAgICAgICAgLy8gUHJldmVudCBtdWx0aXBsZSBjYWxsLCBSZXF1aXJlZCBmb3IgaHNoIHBsdWdpblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sR2FsbGVyeU9uICYmIHByZXZJbmRleCA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbnVtYmVyT2ZHYWxsZXJ5SXRlbXMgPSB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sZ0J1c3kpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvdW50ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRDb3VudGVyKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50U2xpZGVJdGVtID0gdGhpcy5nZXRTbGlkZUl0ZW0oaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzU2xpZGVJdGVtXzEgPSB0aGlzLmdldFNsaWRlSXRlbShwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRHYWxsZXJ5SXRlbSA9IHRoaXMuZ2FsbGVyeUl0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHZhciB2aWRlb0luZm8gPSBjdXJyZW50R2FsbGVyeUl0ZW0uX19zbGlkZVZpZGVvSW5mbztcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYXR0cignZGF0YS1sZy1zbGlkZS10eXBlJywgdGhpcy5nZXRTbGlkZVR5cGUoY3VycmVudEdhbGxlcnlJdGVtKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERvd25sb2FkVmFsdWUoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IHRoaXMubWVkaWFDb250YWluZXJQb3NpdGlvbiwgdG9wXzMgPSBfYS50b3AsIGJvdHRvbSA9IF9hLmJvdHRvbTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW9TaXplID0gdXRpbHMuZ2V0U2l6ZSh0aGlzLml0ZW1zW2luZGV4XSwgdGhpcy5vdXRlciwgdG9wXzMgKyBib3R0b20sIHZpZGVvSW5mbyAmJiB0aGlzLnNldHRpbmdzLnZpZGVvTWF4U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVWaWRlb1NsaWRlKGluZGV4LCB2aWRlb1NpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYmVmb3JlU2xpZGUsIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2SW5kZXg6IHByZXZJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbVRvdWNoOiAhIWZyb21Ub3VjaCxcclxuICAgICAgICAgICAgICAgICAgICBmcm9tVGh1bWI6ICEhZnJvbVRodW1iLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxnQnVzeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlQmFyVGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycm93RGlzYWJsZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IHByZXZJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAncHJldic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID4gcHJldkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICduZXh0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZyb21Ub3VjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFrZVNsaWRlQW5pbWF0aW9uKGRpcmVjdGlvbiwgY3VycmVudFNsaWRlSXRlbSwgcHJldmlvdXNTbGlkZUl0ZW1fMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctaXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctcHJldi1zbGlkZSBsZy1jdXJyZW50IGxnLW5leHQtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hQcmV2ID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaE5leHQgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bWJlck9mR2FsbGVyeUl0ZW1zID4gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaFByZXYgPSBpbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTmV4dCA9IGluZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIHByZXZJbmRleCA9PT0gbnVtYmVyT2ZHYWxsZXJ5SXRlbXMgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IHNsaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5leHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hQcmV2ID0gbnVtYmVyT2ZHYWxsZXJ5SXRlbXMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSBudW1iZXJPZkdhbGxlcnlJdGVtcyAtIDEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJldiBzbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOZXh0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoUHJldiA9IG51bWJlck9mR2FsbGVyeUl0ZW1zIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hQcmV2ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOZXh0ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKHRvdWNoTmV4dCkuYWRkQ2xhc3MoJ2xnLW5leHQtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKHRvdWNoUHJldikuYWRkQ2xhc3MoJ2xnLXByZXYtc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNsaWRlSXRlbS5hZGRDbGFzcygnbGctY3VycmVudCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gRG8gbm90IHB1dCBsb2FkIGNvbnRlbnQgaW4gc2V0IHRpbWVvdXQgYXMgaXQgbmVlZHMgdG8gbG9hZCBpbW1lZGlhdGVseSB3aGVuIHRoZSBnYWxsZXJ5IGlzIG9wZW5lZFxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxHYWxsZXJ5T24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRDb250ZW50KGluZGV4LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkQ29udGVudChpbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aXRsZSBpZiB0aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbyA9PT0gbGctc3ViLWh0bWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnNldHRpbmdzLmFwcGVuZFN1Ykh0bWxUbyAhPT0gJy5sZy1pdGVtJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkSHRtbChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnNldHRpbmdzLnNwZWVkICsgNTAgKyAoZnJvbVRvdWNoID8gMCA6IHRoaXMuc2V0dGluZ3Muc2xpZGVEZWxheSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubGdCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNTbGlkZUl0ZW1fMS5yZW1vdmVDbGFzcygnbGctc2xpZGUtcHJvZ3Jlc3MnKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYWZ0ZXJTbGlkZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2SW5kZXg6IHByZXZJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tVG91Y2g6IGZyb21Ub3VjaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVRodW1iOiBmcm9tVGh1bWIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAodGhpcy5sR2FsbGVyeU9uID8gdGhpcy5zZXR0aW5ncy5zcGVlZCArIDEwMCA6IDEwMCkgKyAoZnJvbVRvdWNoID8gMCA6IHRoaXMuc2V0dGluZ3Muc2xpZGVEZWxheSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudXBkYXRlQ3VycmVudENvdW50ZXIgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctY291bnRlci1jdXJyZW50JykuaHRtbChpbmRleCArIDEgKyAnJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnVwZGF0ZUNvdW50ZXJUb3RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctY291bnRlci1hbGwnKS5odG1sKHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCArICcnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ2V0U2xpZGVUeXBlID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uX19zbGlkZVZpZGVvSW5mbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd2aWRlbyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaXRlbS5pZnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaWZyYW1lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaW1hZ2UnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnRvdWNoTW92ZSA9IGZ1bmN0aW9uIChzdGFydENvb3JkcywgZW5kQ29vcmRzLCBlKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVggPSBlbmRDb29yZHMucGFnZVggLSBzdGFydENvb3Jkcy5wYWdlWDtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlWSA9IGVuZENvb3Jkcy5wYWdlWSAtIHN0YXJ0Q29vcmRzLnBhZ2VZO1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dTd2lwZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zd2lwZURpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dTd2lwZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2VYKSA+IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2lwZURpcmVjdGlvbiA9ICdob3Jpem9udGFsJztcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1N3aXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKE1hdGguYWJzKGRpc3RhbmNlWSkgPiAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVEaXJlY3Rpb24gPSAndmVydGljYWwnO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93U3dpcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghYWxsb3dTd2lwZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciAkY3VycmVudFNsaWRlID0gdGhpcy5nZXRTbGlkZUl0ZW0odGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN3aXBlRGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcclxuICAgICAgICAgICAgICAgIGUgPT09IG51bGwgfHwgZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgb3BhY2l0eSBhbmQgdHJhbnNpdGlvbiBkdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgICAgIC8vIG1vdmUgY3VycmVudCBzbGlkZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUoJGN1cnJlbnRTbGlkZSwgZGlzdGFuY2VYLCAwKTtcclxuICAgICAgICAgICAgICAgIC8vIG1vdmUgbmV4dCBhbmQgcHJldiBzbGlkZSB3aXRoIGN1cnJlbnQgc2xpZGVcclxuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9ICRjdXJyZW50U2xpZGUuZ2V0KCkub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVXaWR0aEFtb3VudCA9ICh3aWR0aCAqIDE1KSAvIDEwMDtcclxuICAgICAgICAgICAgICAgIHZhciBndXR0ZXIgPSBzbGlkZVdpZHRoQW1vdW50IC0gTWF0aC5hYnMoKGRpc3RhbmNlWCAqIDEwKSAvIDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSh0aGlzLm91dGVyLmZpbmQoJy5sZy1wcmV2LXNsaWRlJykuZmlyc3QoKSwgLXdpZHRoICsgZGlzdGFuY2VYIC0gZ3V0dGVyLCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKHRoaXMub3V0ZXIuZmluZCgnLmxnLW5leHQtc2xpZGUnKS5maXJzdCgpLCB3aWR0aCArIGRpc3RhbmNlWCArIGd1dHRlciwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zd2lwZURpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc3dpcGVUb0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZSA9PT0gbnVsbCB8fCBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmFkZENsYXNzKCdsZy1kcmFnZ2luZy12ZXJ0aWNhbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGFjaXR5ID0gMSAtIE1hdGguYWJzKGRpc3RhbmNlWSkgLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYmFja2Ryb3AuY3NzKCdvcGFjaXR5Jywgb3BhY2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjYWxlID0gMSAtIE1hdGguYWJzKGRpc3RhbmNlWSkgLyAod2luZG93LmlubmVyV2lkdGggKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZSgkY3VycmVudFNsaWRlLCAwLCBkaXN0YW5jZVksIHNjYWxlLCBzY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlWSkgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsZy1oaWRlLWl0ZW1zJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnRvdWNoRW5kID0gZnVuY3Rpb24gKGVuZENvb3Jkcywgc3RhcnRDb29yZHMsIGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZTtcclxuICAgICAgICAgICAgLy8ga2VlcCBzbGlkZSBhbmltYXRpb24gZm9yIGFueSBtb2RlIHdoaWxlIGRyYWdnL3N3aXBlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1vZGUgIT09ICdsZy1zbGlkZScpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLXNsaWRlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gc2V0IHRyYW5zaXRpb24gZHVyYXRpb25cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kY29udGFpbmVyLnJlbW92ZUNsYXNzKCdsZy1kcmFnZ2luZy12ZXJ0aWNhbCcpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xnLWRyYWdnaW5nIGxnLWhpZGUtaXRlbXMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlckNsaWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zd2lwZURpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBlbmRDb29yZHMucGFnZVggLSBzdGFydENvb3Jkcy5wYWdlWDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2VBYnMgPSBNYXRoLmFicyhlbmRDb29yZHMucGFnZVggLSBzdGFydENvb3Jkcy5wYWdlWCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZUFicyA+IF90aGlzLnNldHRpbmdzLnN3aXBlVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmdvVG9OZXh0U2xpZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkaXN0YW5jZSA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2VBYnMgPiBfdGhpcy5zZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5nb1RvUHJldlNsaWRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChfdGhpcy5zd2lwZURpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoZW5kQ29vcmRzLnBhZ2VZIC0gc3RhcnRDb29yZHMucGFnZVkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zZXR0aW5ncy5jbG9zYWJsZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXR0aW5ncy5zd2lwZVRvQ2xvc2UgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiRiYWNrZHJvcC5jc3MoJ29wYWNpdHknLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5maW5kKCcubGctaXRlbScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJpZ2dlckNsaWNrICYmXHJcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoZW5kQ29vcmRzLnBhZ2VYIC0gc3RhcnRDb29yZHMucGFnZVgpIDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgY2xpY2sgaWYgZGlzdGFuY2UgaXMgbGVzcyB0aGFuIDUgcGl4XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICRMRyhldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1Bvc3RlckVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMucG9zdGVyQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLnN3aXBlRGlyZWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHNsaWRlIGNsYXNzIG9uY2UgZHJhZy9zd2lwZSBpcyBjb21wbGV0ZWQgaWYgbW9kZSBpcyBub3Qgc2xpZGVcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLm91dGVyLmhhc0NsYXNzKCdsZy1kcmFnZ2luZycpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0dGluZ3MubW9kZSAhPT0gJ2xnLXNsaWRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1zbGlkZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLnNldHRpbmdzLnNwZWVkICsgMTAwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZW5hYmxlU3dpcGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgZW5kQ29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBpc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBpc1N3aXBpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZW5hYmxlU3dpcGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGlubmVyLm9uKCd0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kcmFnT3JTd2lwZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkaXRlbSA9IF90aGlzLmdldFNsaWRlSXRlbShfdGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgkTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhX3RoaXMub3V0ZXIuaGFzQ2xhc3MoJ2xnLXpvb21lZCcpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfdGhpcy5sZ0J1c3kgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N3aXBpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaEFjdGlvbiA9ICdzd2lwZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1hbmFnZVN3aXBlQ2xhc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWDogZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVk6IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGlubmVyLm9uKCd0b3VjaG1vdmUubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1N3aXBpbmcgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hBY3Rpb24gPT09ICdzd2lwZScgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWDogZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVk6IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hNb3ZlKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGlubmVyLm9uKCd0b3VjaGVuZC5sZycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy50b3VjaEFjdGlvbiA9PT0gJ3N3aXBlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hFbmQoZW5kQ29vcmRzLCBzdGFydENvb3JkcywgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzU3dpcGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICRMRyhldmVudC50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzUG9zdGVyRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnBvc3RlckNsaWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaEFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTd2lwaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZW5hYmxlRHJhZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHN0YXJ0Q29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBlbmRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGlzRHJhZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVEcmFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLm9uKCdtb3VzZWRvd24ubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmRyYWdPclN3aXBlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRpdGVtID0gX3RoaXMuZ2V0U2xpZGVJdGVtKF90aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLm91dGVyLmhhc0NsYXNzKCdsZy16b29tZWQnKSAmJiAhX3RoaXMubGdCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmxnQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm1hbmFnZVN3aXBlQ2xhc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvb3JkcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVg6IGUucGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VZOiBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEcmFnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAqKiBGaXggZm9yIHdlYmtpdCBjdXJzb3IgaXNzdWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI2NzIzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuZ2V0KCkuc2Nyb2xsTGVmdCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLmdldCgpLnNjcm9sbExlZnQgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1ncmFiJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsZy1ncmFiYmluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5kcmFnU3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkTEcod2luZG93KS5vbihcIm1vdXNlbW92ZS5sZy5nbG9iYWxcIiArIHRoaXMubGdJZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEcmFnaW5nICYmIF90aGlzLmxnT3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRDb29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWDogZS5wYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VZOiBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaE1vdmUoc3RhcnRDb29yZHMsIGVuZENvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5kcmFnTW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkTEcod2luZG93KS5vbihcIm1vdXNldXAubGcuZ2xvYmFsXCIgKyB0aGlzLmxnSWQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMubGdPcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJExHKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy50b3VjaEVuZChlbmRDb29yZHMsIHN0YXJ0Q29vcmRzLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5kcmFnRW5kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMuaXNQb3N0ZXJFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLnBvc3RlckNsaWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBleGVjdXRpb24gb24gY2xpY2tcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEcmFnaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRHJhZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcygnbGctZ3JhYmJpbmcnKS5hZGRDbGFzcygnbGctZ3JhYicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnRyaWdnZXJQb3N0ZXJDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy4kaW5uZXIub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmRyYWdPclN3aXBlRW5hYmxlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmlzUG9zdGVyRWxlbWVudCgkTEcoZXZlbnQudGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMucG9zdGVyQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUubWFuYWdlU3dpcGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90b3VjaE5leHQgPSB0aGlzLmluZGV4ICsgMTtcclxuICAgICAgICAgICAgdmFyIF90b3VjaFByZXYgPSB0aGlzLmluZGV4IC0gMTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubG9vcCAmJiB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90b3VjaFByZXYgPSB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90b3VjaE5leHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuZmluZCgnLmxnLWl0ZW0nKS5yZW1vdmVDbGFzcygnbGctbmV4dC1zbGlkZSBsZy1wcmV2LXNsaWRlJyk7XHJcbiAgICAgICAgICAgIGlmIChfdG91Y2hQcmV2ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2xpZGVJdGVtKF90b3VjaFByZXYpLmFkZENsYXNzKCdsZy1wcmV2LXNsaWRlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nZXRTbGlkZUl0ZW0oX3RvdWNoTmV4dCkuYWRkQ2xhc3MoJ2xnLW5leHQtc2xpZGUnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdvIHRvIG5leHQgc2xpZGVcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZyb21Ub3VjaCAtIHRydWUgaWYgc2xpZGUgZnVuY3Rpb24gY2FsbGVkIHZpYSB0b3VjaCBldmVudFxyXG4gICAgICAgICAqIEBjYXRlZ29yeSBsR1B1YmxpY01ldGhvZHNcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqICBjb25zdCBwbHVnaW4gPSBsaWdodEdhbGxlcnkoKTtcclxuICAgICAgICAgKiAgcGx1Z2luLmdvVG9OZXh0U2xpZGUoKTtcclxuICAgICAgICAgKiBAc2VlIDxhIGhyZWY9XCIvZGVtb3MvbWV0aG9kcy9cIj5EZW1vPC9hPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZ29Ub05leHRTbGlkZSA9IGZ1bmN0aW9uIChmcm9tVG91Y2gpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIF9sb29wID0gdGhpcy5zZXR0aW5ncy5sb29wO1xyXG4gICAgICAgICAgICBpZiAoZnJvbVRvdWNoICYmIHRoaXMuZ2FsbGVyeUl0ZW1zLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICAgICAgICAgIF9sb29wID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxnQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggKyAxIDwgdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTEdlbC50cmlnZ2VyKGxHRXZlbnRzLmJlZm9yZU5leHRTbGlkZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlKHRoaXMuaW5kZXgsICEhZnJvbVRvdWNoLCBmYWxzZSwgJ25leHQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfbG9vcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYmVmb3JlTmV4dFNsaWRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGUodGhpcy5pbmRleCwgISFmcm9tVG91Y2gsIGZhbHNlLCAnbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnNsaWRlRW5kQW5pbWF0aW9uICYmICFmcm9tVG91Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctcmlnaHQtZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXJpZ2h0LWVuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR28gdG8gcHJldmlvdXMgc2xpZGVzXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBmcm9tVG91Y2ggLSB0cnVlIGlmIHNsaWRlIGZ1bmN0aW9uIGNhbGxlZCB2aWEgdG91Y2ggZXZlbnRcclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KHt9KTtcclxuICAgICAgICAgKiAgcGx1Z2luLmdvVG9QcmV2U2xpZGUoKTtcclxuICAgICAgICAgKiBAc2VlIDxhIGhyZWY9XCIvZGVtb3MvbWV0aG9kcy9cIj5EZW1vPC9hPlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5nb1RvUHJldlNsaWRlID0gZnVuY3Rpb24gKGZyb21Ub3VjaCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgX2xvb3AgPSB0aGlzLnNldHRpbmdzLmxvb3A7XHJcbiAgICAgICAgICAgIGlmIChmcm9tVG91Y2ggJiYgdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIDwgMykge1xyXG4gICAgICAgICAgICAgICAgX2xvb3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGdCdXN5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4LS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYmVmb3JlUHJldlNsaWRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tVG91Y2g6IGZyb21Ub3VjaCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlKHRoaXMuaW5kZXgsICEhZnJvbVRvdWNoLCBmYWxzZSwgJ3ByZXYnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfbG9vcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5nYWxsZXJ5SXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYmVmb3JlUHJldlNsaWRlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Ub3VjaDogZnJvbVRvdWNoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZSh0aGlzLmluZGV4LCAhIWZyb21Ub3VjaCwgZmFsc2UsICdwcmV2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2V0dGluZ3Muc2xpZGVFbmRBbmltYXRpb24gJiYgIWZyb21Ub3VjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm91dGVyLmFkZENsYXNzKCdsZy1sZWZ0LWVuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1sZWZ0LWVuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5rZXlQcmVzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgJExHKHdpbmRvdykub24oXCJrZXlkb3duLmxnLmdsb2JhbFwiICsgdGhpcy5sZ0lkLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmxnT3BlbmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0dGluZ3MuZXNjS2V5ID09PSB0cnVlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZS5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2V0dGluZ3MuYWxsb3dNZWRpYU92ZXJsYXAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIuaGFzQ2xhc3MoJ2xnLWNhbi10b2dnbGUnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5oYXNDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmxnT3BlbmVkICYmIF90aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5nb1RvUHJldlNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDM5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ29Ub05leHRTbGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmFycm93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1wcmV2Jykub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ29Ub1ByZXZTbGlkZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50QnlJZCgnbGctbmV4dCcpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdvVG9OZXh0U2xpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmFycm93RGlzYWJsZSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGFycm93cyBpZiBzZXR0aW5ncy5oaWRlQ29udHJvbE9uRW5kIGlzIHRydWVcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmxvb3AgJiYgdGhpcy5zZXR0aW5ncy5oaWRlQ29udHJvbE9uRW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHByZXYgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1wcmV2Jyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJG5leHQgPSB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1uZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggKyAxID09PSB0aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkbmV4dC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG5leHQucmVtb3ZlQXR0cignZGlzYWJsZWQnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRwcmV2LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkcHJldi5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnNldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uICgkZWwsIHhWYWx1ZSwgeVZhbHVlLCBzY2FsZVgsIHNjYWxlWSkge1xyXG4gICAgICAgICAgICBpZiAoc2NhbGVYID09PSB2b2lkIDApIHsgc2NhbGVYID0gMTsgfVxyXG4gICAgICAgICAgICBpZiAoc2NhbGVZID09PSB2b2lkIDApIHsgc2NhbGVZID0gMTsgfVxyXG4gICAgICAgICAgICAkZWwuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArXHJcbiAgICAgICAgICAgICAgICB4VmFsdWUgK1xyXG4gICAgICAgICAgICAgICAgJ3B4LCAnICtcclxuICAgICAgICAgICAgICAgIHlWYWx1ZSArXHJcbiAgICAgICAgICAgICAgICAncHgsIDBweCkgc2NhbGUzZCgnICtcclxuICAgICAgICAgICAgICAgIHNjYWxlWCArXHJcbiAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgIHNjYWxlWSArXHJcbiAgICAgICAgICAgICAgICAnLCAxKScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5tb3VzZXdoZWVsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbGFzdENhbGwgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm91dGVyLm9uKCd3aGVlbC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWUuZGVsdGFZIHx8IF90aGlzLmdhbGxlcnlJdGVtcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vdyAtIGxhc3RDYWxsIDwgMTAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhc3RDYWxsID0gbm93O1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGVsdGFZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmdvVG9OZXh0U2xpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGUuZGVsdGFZIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmdvVG9QcmV2U2xpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmlzU2xpZGVFbGVtZW50ID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRhcmdldC5oYXNDbGFzcygnbGctb3V0ZXInKSB8fFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Lmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgIHRhcmdldC5oYXNDbGFzcygnbGctaW1nLXdyYXAnKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmlzUG9zdGVyRWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIHBsYXlCdXR0b24gPSB0aGlzLmdldFNsaWRlSXRlbSh0aGlzLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy12aWRlby1wbGF5LWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiAodGFyZ2V0Lmhhc0NsYXNzKCdsZy12aWRlby1wb3N0ZXInKSB8fFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Lmhhc0NsYXNzKCdsZy12aWRlby1wbGF5LWJ1dHRvbicpIHx8XHJcbiAgICAgICAgICAgICAgICAocGxheUJ1dHRvbiAmJiBwbGF5QnV0dG9uLmNvbnRhaW5zKHRhcmdldC5nZXQoKSkpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1heGltaXplIG1pbmltaXplIGlubGluZSBnYWxsZXJ5LlxyXG4gICAgICAgICAqIEBjYXRlZ29yeSBsR1B1YmxpY01ldGhvZHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnRvZ2dsZU1heGltaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRCeUlkKCdsZy1tYXhpbWl6ZScpLm9uKCdjbGljay5sZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLiRjb250YWluZXIudG9nZ2xlQ2xhc3MoJ2xnLWlubGluZScpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVmcmVzaE9uUmVzaXplKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5pbnZhbGlkYXRlSXRlbXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0ZW1zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLml0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICRMRyhlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihcImNsaWNrLmxnY3VzdG9tLWl0ZW0tXCIgKyAkZWxlbWVudC5hdHRyKCdkYXRhLWxnLWlkJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLm1hbmFnZUNsb3NlR2FsbGVyeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmNsb3NhYmxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgbW91c2Vkb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudEJ5SWQoJ2xnLWNsb3NlJykub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY2xvc2VHYWxsZXJ5KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jbG9zZU9uVGFwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB5b3UgZHJhZyB0aGUgc2xpZGUgYW5kIHJlbGVhc2Ugb3V0c2lkZSBnYWxsZXJ5IGdldHMgY2xvc2Ugb24gY2hyb21lXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgcHJldmVudGluZyB0aGlzIGNoZWNrIG1vdXNlZG93biBhbmQgbW91c2V1cCBoYXBwZW5lZCBvbiAubGctaXRlbSBvciBsZy1vdXRlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5vbignbW91c2Vkb3duLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJExHKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuaXNTbGlkZUVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZWRvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2Vkb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dGVyLm9uKCdtb3VzZW1vdmUubGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2Vkb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIub24oJ21vdXNldXAubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkTEcoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc1NsaWRlRWxlbWVudCh0YXJnZXQpICYmIG1vdXNlZG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzLm91dGVyLmhhc0NsYXNzKCdsZy1kcmFnZ2luZycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDbG9zZSBsaWdodEdhbGxlcnkgaWYgaXQgaXMgb3BlbmVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIElmIGNsb3NhYmxlIGlzIGZhbHNlIGluIHRoZSBzZXR0aW5ncywgeW91IG5lZWQgdG8gcGFzcyB0cnVlIHZpYSBjbG9zZUdhbGxlcnkgbWV0aG9kIHRvIGZvcmNlIGNsb3NlIGdhbGxlcnlcclxuICAgICAgICAgKiBAcmV0dXJuIHJldHVybnMgdGhlIGVzdGltYXRlZCB0aW1lIHRvIGNsb3NlIGdhbGxlcnkgY29tcGxldGVseSBpbmNsdWRpbmcgdGhlIGNsb3NlIGFuaW1hdGlvbiBkdXJhdGlvblxyXG4gICAgICAgICAqIEBjYXRlZ29yeSBsR1B1YmxpY01ldGhvZHNcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqICBjb25zdCBwbHVnaW4gPSBsaWdodEdhbGxlcnkoKTtcclxuICAgICAgICAgKiAgcGx1Z2luLmNsb3NlR2FsbGVyeSgpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgTGlnaHRHYWxsZXJ5LnByb3RvdHlwZS5jbG9zZUdhbGxlcnkgPSBmdW5jdGlvbiAoZm9yY2UpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxnT3BlbmVkIHx8ICghdGhpcy5zZXR0aW5ncy5jbG9zYWJsZSAmJiAhZm9yY2UpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkxHZWwudHJpZ2dlcihsR0V2ZW50cy5iZWZvcmVDbG9zZSk7XHJcbiAgICAgICAgICAgICRMRyh3aW5kb3cpLnNjcm9sbFRvcCh0aGlzLnByZXZTY3JvbGxUb3ApO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSB0aGlzLml0ZW1zW3RoaXMuaW5kZXhdO1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtO1xyXG4gICAgICAgICAgICBpZiAodGhpcy56b29tRnJvbU9yaWdpbiAmJiBjdXJyZW50SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hID0gdGhpcy5tZWRpYUNvbnRhaW5lclBvc2l0aW9uLCB0b3BfNCA9IF9hLnRvcCwgYm90dG9tID0gX2EuYm90dG9tO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9iID0gdGhpcy5nYWxsZXJ5SXRlbXNbdGhpcy5pbmRleF0sIF9fc2xpZGVWaWRlb0luZm8gPSBfYi5fX3NsaWRlVmlkZW9JbmZvLCBwb3N0ZXIgPSBfYi5wb3N0ZXI7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2VTaXplID0gdXRpbHMuZ2V0U2l6ZShjdXJyZW50SXRlbSwgdGhpcy5vdXRlciwgdG9wXzQgKyBib3R0b20sIF9fc2xpZGVWaWRlb0luZm8gJiYgcG9zdGVyICYmIHRoaXMuc2V0dGluZ3MudmlkZW9NYXhTaXplKTtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHV0aWxzLmdldFRyYW5zZm9ybShjdXJyZW50SXRlbSwgdGhpcy5vdXRlciwgdG9wXzQsIGJvdHRvbSwgaW1hZ2VTaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy56b29tRnJvbU9yaWdpbiAmJiB0cmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIuYWRkQ2xhc3MoJ2xnLWNsb3NpbmcgbGctem9vbS1mcm9tLWltYWdlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFNsaWRlSXRlbSh0aGlzLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnbGctc3RhcnQtZW5kLXByb2dyZXNzJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5zZXR0aW5ncy5zdGFydEFuaW1hdGlvbkR1cmF0aW9uICsgJ21zJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdXRlci5hZGRDbGFzcygnbGctaGlkZS1pdGVtcycpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGctem9vbS1mcm9tLWltYWdlIGlzIHVzZWQgZm9yIHNldHRpbmcgdGhlIG9wYWNpdHkgdG8gMSBpZiB6b29tRnJvbU9yaWdpbiBpcyB0cnVlXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY2xvc2luZyBpdGVtIGRvZXNuJ3QgaGF2ZSB0aGUgbGctc2l6ZSBhdHRyaWJ1dGUsIHJlbW92ZSB0aGlzIGNsYXNzIHRvIGF2b2lkIHRoZSBjbG9zaW5nIGNzcyBjb25mbGljdHNcclxuICAgICAgICAgICAgICAgIHRoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXpvb20tZnJvbS1pbWFnZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFVuYmluZCBhbGwgZXZlbnRzIGFkZGVkIGJ5IGxpZ2h0R2FsbGVyeVxyXG4gICAgICAgICAgICAvLyBAdG9kb1xyXG4gICAgICAgICAgICAvL3RoaXMuJGVsLm9mZignLmxnLnRtJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveU1vZHVsZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5sR2FsbGVyeU9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEdW1teUltYWdlUmVtb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnpvb21Gcm9tT3JpZ2luID0gdGhpcy5zZXR0aW5ncy56b29tRnJvbU9yaWdpbjtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUJhclRpbWVvdXQpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVCYXJUaW1lb3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICRMRygnaHRtbCcpLnJlbW92ZUNsYXNzKCdsZy1vbicpO1xyXG4gICAgICAgICAgICB0aGlzLm91dGVyLnJlbW92ZUNsYXNzKCdsZy12aXNpYmxlIGxnLWNvbXBvbmVudHMtb3BlbicpO1xyXG4gICAgICAgICAgICAvLyBSZXNldHRpbmcgb3BhY2l0eSB0byAwIGlzZCByZXF1aXJlZCBhcyAgdmVydGljYWwgc3dpcGUgdG8gY2xvc2UgZnVuY3Rpb24gYWRkcyBpbmxpbmUgb3BhY2l0eS5cclxuICAgICAgICAgICAgdGhpcy4kYmFja2Ryb3AucmVtb3ZlQ2xhc3MoJ2luJykuY3NzKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgICAgIHZhciByZW1vdmVUaW1lb3V0ID0gdGhpcy56b29tRnJvbU9yaWdpbiAmJiB0cmFuc2Zvcm1cclxuICAgICAgICAgICAgICAgID8gTWF0aC5tYXgodGhpcy5zZXR0aW5ncy5zdGFydEFuaW1hdGlvbkR1cmF0aW9uLCB0aGlzLnNldHRpbmdzLmJhY2tkcm9wRHVyYXRpb24pXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2V0dGluZ3MuYmFja2Ryb3BEdXJhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLnJlbW92ZUNsYXNzKCdsZy1zaG93LWluJyk7XHJcbiAgICAgICAgICAgIC8vIE9uY2UgdGhlIGNsb3NpZ24gYW5pbWF0aW9uIGlzIGNvbXBsZXRlZCBhbmQgZ2FsbGVyeSBpcyBpbnZpc2libGVcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuem9vbUZyb21PcmlnaW4gJiYgdHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXpvb20tZnJvbS1pbWFnZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnbGctc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgLy8gTmVlZCB0byByZW1vdmUgaW5saW5lIG9wYWNpdHkgYXMgaXQgaXMgdXNlZCBpbiB0aGUgc3R5bGVzaGVldCBhcyB3ZWxsXHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kYmFja2Ryb3BcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBfdGhpcy5zZXR0aW5ncy5iYWNrZHJvcER1cmF0aW9uICsgJ21zJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5yZW1vdmVDbGFzcyhcImxnLWNsb3NpbmcgXCIgKyBfdGhpcy5zZXR0aW5ncy5zdGFydENsYXNzKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmdldFNsaWRlSXRlbShfdGhpcy5pbmRleCkucmVtb3ZlQ2xhc3MoJ2xnLXN0YXJ0LWVuZC1wcm9ncmVzcycpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuJGlubmVyLmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMubGdPcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMuYWZ0ZXJDbG9zZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZTogX3RoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMub3V0ZXIuZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vdXRlci5nZXQoKS5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5sZ09wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCByZW1vdmVUaW1lb3V0ICsgMTAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZVRpbWVvdXQgKyAxMDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmluaXRNb2R1bGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwibGlnaHRHYWxsZXJ5Oi0gbWFrZSBzdXJlIGxpZ2h0R2FsbGVyeSBtb2R1bGUgaXMgcHJvcGVybHkgaW5pdGlhdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUuZGVzdHJveU1vZHVsZXMgPSBmdW5jdGlvbiAoZGVzdHJveSkge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXN0cm95KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUuY2xvc2VHYWxsZXJ5ICYmIG1vZHVsZS5jbG9zZUdhbGxlcnkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwibGlnaHRHYWxsZXJ5Oi0gbWFrZSBzdXJlIGxpZ2h0R2FsbGVyeSBtb2R1bGUgaXMgcHJvcGVybHkgZGVzdHJveWVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZnJlc2ggbGlnaHRHYWxsZXJ5IHdpdGggbmV3IHNldCBvZiBjaGlsZHJlbi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGlzIGlzIHVzZWZ1bCB0byB1cGRhdGUgdGhlIGdhbGxlcnkgd2hlbiB0aGUgY2hpbGQgZWxlbWVudHMgYXJlIGNoYW5nZWQgd2l0aG91dCBjYWxsaW5nIGRlc3Ryb3kgbWV0aG9kLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogSWYgeW91IGFyZSB1c2luZyBkeW5hbWljIG1vZGUsIHlvdSBjYW4gcGFzcyB0aGUgbW9kaWZpZWQgYXJyYXkgb2YgZHluYW1pY0VsIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgdG8gcmVmcmVzaCB0aGUgZHluYW1pYyBnYWxsZXJ5XHJcbiAgICAgICAgICogQHNlZSA8YSBocmVmPVwiL2RlbW9zL2R5bmFtaWMtbW9kZS9cIj5EZW1vPC9hPlxyXG4gICAgICAgICAqIEBjYXRlZ29yeSBsR1B1YmxpY01ldGhvZHNcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqICBjb25zdCBwbHVnaW4gPSBsaWdodEdhbGxlcnkoKTtcclxuICAgICAgICAgKiAgLy8gRGVsZXRlIG9yIGFkZCBjaGlsZHJlbiwgdGhlbiBjYWxsXHJcbiAgICAgICAgICogIHBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiAoZ2FsbGVyeUl0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5keW5hbWljKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludmFsaWRhdGVJdGVtcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChnYWxsZXJ5SXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FsbGVyeUl0ZW1zID0gZ2FsbGVyeUl0ZW1zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYWxsZXJ5SXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb250cm9scygpO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5HYWxsZXJ5T25JdGVtQ2xpY2soKTtcclxuICAgICAgICAgICAgdGhpcy5MR2VsLnRyaWdnZXIobEdFdmVudHMudXBkYXRlU2xpZGVzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExpZ2h0R2FsbGVyeS5wcm90b3R5cGUudXBkYXRlQ29udHJvbHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU2xpZGVWaWRlb0luZm8odGhpcy5nYWxsZXJ5SXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvdW50ZXJUb3RhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZVNpbmdsZVNsaWRlQ2xhc3NOYW1lKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZXN0cm95IGxpZ2h0R2FsbGVyeS5cclxuICAgICAgICAgKiBEZXN0cm95IGxpZ2h0R2FsbGVyeSBhbmQgaXRzIHBsdWdpbiBpbnN0YW5jZXMgY29tcGxldGVseVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFRoaXMgbWV0aG9kIGFsc28gY2FsbHMgQ2xvc2VHYWxsZXJ5IGZ1bmN0aW9uIGludGVybmFsbHkuIFJldHVybnMgdGhlIHRpbWUgdGFrZXMgdG8gY29tcGxldGVseSBjbG9zZSBhbmQgZGVzdHJveSB0aGUgaW5zdGFuY2UuXHJcbiAgICAgICAgICogSW4gY2FzZSBpZiB5b3Ugd2FudCB0byByZS1pbml0aWFsaXplIGxpZ2h0R2FsbGVyeSByaWdodCBhZnRlciBkZXN0cm95aW5nIGl0LCBpbml0aWFsaXplIGl0IG9ubHkgb25jZSB0aGUgZGVzdHJveSBwcm9jZXNzIGlzIGNvbXBsZXRlZC5cclxuICAgICAgICAgKiBZb3UgY2FuIHVzZSByZWZyZXNoIG1ldGhvZCBtb3N0IG9mIHRoZSB0aW1lcy5cclxuICAgICAgICAgKiBAY2F0ZWdvcnkgbEdQdWJsaWNNZXRob2RzXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiAgY29uc3QgcGx1Z2luID0gbGlnaHRHYWxsZXJ5KCk7XHJcbiAgICAgICAgICogIHBsdWdpbi5kZXN0cm95KCk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBMaWdodEdhbGxlcnkucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZVRpbWVvdXQgPSB0aGlzLmNsb3NlR2FsbGVyeSh0cnVlKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5kZXN0cm95TW9kdWxlcyh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuc2V0dGluZ3MuZHluYW1pYykge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmludmFsaWRhdGVJdGVtcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJExHKHdpbmRvdykub2ZmKFwiLmxnLmdsb2JhbFwiICsgX3RoaXMubGdJZCk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5MR2VsLm9mZignLmxnJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kY29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LCBjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvc2VUaW1lb3V0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIExpZ2h0R2FsbGVyeTtcclxuICAgIH0oKSk7XG5cbiAgICBmdW5jdGlvbiBsaWdodEdhbGxlcnkoZWwsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IExpZ2h0R2FsbGVyeShlbCwgb3B0aW9ucyk7XHJcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRHYWxsZXJ5O1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlnaHRnYWxsZXJ5LnVtZC5qcy5tYXBcbiIsIi8qIVxuICogbGlnaHRnYWxsZXJ5IHwgMi40LjAtYmV0YS4wIHwgRGVjZW1iZXIgMTJ0aCAyMDIxXG4gKiBodHRwOi8vd3d3LmxpZ2h0Z2FsbGVyeWpzLmNvbS9cbiAqIENvcHlyaWdodCAoYykgMjAyMCBTYWNoaW4gTmVyYXZhdGg7XG4gKiBAbGljZW5zZSBHUEx2M1xuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLmxnVGh1bWJuYWlsID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcbiAgICBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxuICAgIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcbiAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcbiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuICAgIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuICAgIElORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG4gICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuICAgIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuICAgIFBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XG5cbiAgICB2YXIgdGh1bWJuYWlsc1NldHRpbmdzID0ge1xyXG4gICAgICAgIHRodW1ibmFpbDogdHJ1ZSxcclxuICAgICAgICBhbmltYXRlVGh1bWI6IHRydWUsXHJcbiAgICAgICAgY3VycmVudFBhZ2VyUG9zaXRpb246ICdtaWRkbGUnLFxyXG4gICAgICAgIGFsaWduVGh1bWJuYWlsczogJ21pZGRsZScsXHJcbiAgICAgICAgdGh1bWJXaWR0aDogMTAwLFxyXG4gICAgICAgIHRodW1iSGVpZ2h0OiAnODBweCcsXHJcbiAgICAgICAgdGh1bWJNYXJnaW46IDUsXHJcbiAgICAgICAgYXBwZW5kVGh1bWJuYWlsc1RvOiAnLmxnLWNvbXBvbmVudHMnLFxyXG4gICAgICAgIHRvZ2dsZVRodW1iOiBmYWxzZSxcclxuICAgICAgICBlbmFibGVUaHVtYkRyYWc6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlVGh1bWJTd2lwZTogdHJ1ZSxcclxuICAgICAgICB0aHVtYm5haWxTd2lwZVRocmVzaG9sZDogMTAsXHJcbiAgICAgICAgbG9hZFlvdVR1YmVUaHVtYm5haWw6IHRydWUsXHJcbiAgICAgICAgeW91VHViZVRodW1iU2l6ZTogMSxcclxuICAgICAgICB0aHVtYm5haWxQbHVnaW5TdHJpbmdzOiB7IHRvZ2dsZVRodW1ibmFpbHM6ICdUb2dnbGUgdGh1bWJuYWlscycgfSxcclxuICAgIH07XG5cbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgbGlnaHRHYWxsZXJ5IGV2ZW50c1xyXG4gICAgICogQWxsIGV2ZW50cyBzaG91bGQgYmUgZG9jdW1lbnRlZCBoZXJlXHJcbiAgICAgKiBCZWxvdyBpbnRlcmZhY2VzIGFyZSB1c2VkIHRvIGJ1aWxkIHRoZSB3ZWJzaXRlIGRvY3VtZW50YXRpb25zXHJcbiAgICAgKiAqL1xyXG4gICAgdmFyIGxHRXZlbnRzID0ge1xyXG4gICAgICAgIGFmdGVyQXBwZW5kU2xpZGU6ICdsZ0FmdGVyQXBwZW5kU2xpZGUnLFxyXG4gICAgICAgIGluaXQ6ICdsZ0luaXQnLFxyXG4gICAgICAgIGhhc1ZpZGVvOiAnbGdIYXNWaWRlbycsXHJcbiAgICAgICAgY29udGFpbmVyUmVzaXplOiAnbGdDb250YWluZXJSZXNpemUnLFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlczogJ2xnVXBkYXRlU2xpZGVzJyxcclxuICAgICAgICBhZnRlckFwcGVuZFN1Ykh0bWw6ICdsZ0FmdGVyQXBwZW5kU3ViSHRtbCcsXHJcbiAgICAgICAgYmVmb3JlT3BlbjogJ2xnQmVmb3JlT3BlbicsXHJcbiAgICAgICAgYWZ0ZXJPcGVuOiAnbGdBZnRlck9wZW4nLFxyXG4gICAgICAgIHNsaWRlSXRlbUxvYWQ6ICdsZ1NsaWRlSXRlbUxvYWQnLFxyXG4gICAgICAgIGJlZm9yZVNsaWRlOiAnbGdCZWZvcmVTbGlkZScsXHJcbiAgICAgICAgYWZ0ZXJTbGlkZTogJ2xnQWZ0ZXJTbGlkZScsXHJcbiAgICAgICAgcG9zdGVyQ2xpY2s6ICdsZ1Bvc3RlckNsaWNrJyxcclxuICAgICAgICBkcmFnU3RhcnQ6ICdsZ0RyYWdTdGFydCcsXHJcbiAgICAgICAgZHJhZ01vdmU6ICdsZ0RyYWdNb3ZlJyxcclxuICAgICAgICBkcmFnRW5kOiAnbGdEcmFnRW5kJyxcclxuICAgICAgICBiZWZvcmVOZXh0U2xpZGU6ICdsZ0JlZm9yZU5leHRTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlUHJldlNsaWRlOiAnbGdCZWZvcmVQcmV2U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZUNsb3NlOiAnbGdCZWZvcmVDbG9zZScsXHJcbiAgICAgICAgYWZ0ZXJDbG9zZTogJ2xnQWZ0ZXJDbG9zZScsXHJcbiAgICAgICAgcm90YXRlTGVmdDogJ2xnUm90YXRlTGVmdCcsXHJcbiAgICAgICAgcm90YXRlUmlnaHQ6ICdsZ1JvdGF0ZVJpZ2h0JyxcclxuICAgICAgICBmbGlwSG9yaXpvbnRhbDogJ2xnRmxpcEhvcml6b250YWwnLFxyXG4gICAgICAgIGZsaXBWZXJ0aWNhbDogJ2xnRmxpcFZlcnRpY2FsJyxcclxuICAgICAgICBhdXRvcGxheTogJ2xnQXV0b3BsYXknLFxyXG4gICAgICAgIGF1dG9wbGF5U3RhcnQ6ICdsZ0F1dG9wbGF5U3RhcnQnLFxyXG4gICAgICAgIGF1dG9wbGF5U3RvcDogJ2xnQXV0b3BsYXlTdG9wJyxcclxuICAgIH07XG5cbiAgICB2YXIgVGh1bWJuYWlsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFRodW1ibmFpbChpbnN0YW5jZSwgJExHKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJPdXRlcldpZHRoID0gMDtcclxuICAgICAgICAgICAgdGhpcy50aHVtYlRvdGFsV2lkdGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnRodW1iQ2xpY2thYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIGdldCBsaWdodEdhbGxlcnkgY29yZSBwbHVnaW4gaW5zdGFuY2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlID0gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMuJExHID0gJExHO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBleHRlbmQgbW9kdWxlIGRlZmF1bHQgc2V0dGluZ3Mgd2l0aCBsaWdodEdhbGxlcnkgY29yZSBzZXR0aW5nc1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRodW1ibmFpbHNTZXR0aW5ncyksIHRoaXMuY29yZS5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHRoaXMudGh1bWJPdXRlcldpZHRoID0gMDtcclxuICAgICAgICAgICAgdGhpcy50aHVtYlRvdGFsV2lkdGggPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLmdhbGxlcnlJdGVtcy5sZW5ndGggKlxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNldHRpbmdzLnRodW1iV2lkdGggKyB0aGlzLnNldHRpbmdzLnRodW1iTWFyZ2luKTtcclxuICAgICAgICAgICAgLy8gVGh1bWJuYWlsIGFuaW1hdGlvbiB2YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldEFuaW1hdGVUaHVtYlN0eWxlcygpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29yZS5zZXR0aW5ncy5hbGxvd01lZGlhT3ZlcmxhcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy50b2dnbGVUaHVtYiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnRodW1ibmFpbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZVRodW1iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZW5hYmxlVGh1bWJEcmFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlVGh1bWJEcmFnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZVRodW1iU3dpcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVUaHVtYlN3aXBlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGh1bWJDbGlja2FibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGh1bWJDbGlja2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVUaHVtYkJhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aHVtYktleVByZXNzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJNYXJrdXAoKTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VBY3RpdmVDbGFzc09uU2xpZGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy4kbGdUaHVtYi5maXJzdCgpLm9uKCdjbGljay5sZyB0b3VjaGVuZC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRhcmdldCA9IF90aGlzLiRMRyhlLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoISR0YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWxnLWl0ZW0taWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEluIElFOSBhbmQgYmVsbG93IHRvdWNoIGRvZXMgbm90IHN1cHBvcnRcclxuICAgICAgICAgICAgICAgICAgICAvLyBHbyB0byBzbGlkZSBpZiBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgY3NzIHRyYW5zaXRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnRodW1iQ2xpY2thYmxlICYmICFfdGhpcy5jb3JlLmxnQnVzeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludCgkdGFyZ2V0LmF0dHIoJ2RhdGEtbGctaXRlbS1pZCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5zbGlkZShpbmRleCwgZmFsc2UsIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5iZWZvcmVTbGlkZSArIFwiLnRodW1iXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZXZlbnQuZGV0YWlsLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZVRodW1iKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmJlZm9yZU9wZW4gKyBcIi50aHVtYlwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy50aHVtYk91dGVyV2lkdGggPSBfdGhpcy5jb3JlLm91dGVyLmdldCgpLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMudXBkYXRlU2xpZGVzICsgXCIudGh1bWJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVidWlsZFRodW1ibmFpbHMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmNvbnRhaW5lclJlc2l6ZSArIFwiLnRodW1iXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY29yZS5sZ09wZW5lZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aHVtYk91dGVyV2lkdGggPSBfdGhpcy5jb3JlLm91dGVyLmdldCgpLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFuaW1hdGVUaHVtYihfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aHVtYk91dGVyV2lkdGggPSBfdGhpcy5jb3JlLm91dGVyLmdldCgpLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuc2V0VGh1bWJNYXJrdXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aHVtYk91dGVyQ2xhc3NOYW1lcyA9ICdsZy10aHVtYi1vdXRlciAnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbGlnblRodW1ibmFpbHMpIHtcclxuICAgICAgICAgICAgICAgIHRodW1iT3V0ZXJDbGFzc05hbWVzICs9IFwibGctdGh1bWItYWxpZ24tXCIgKyB0aGlzLnNldHRpbmdzLmFsaWduVGh1bWJuYWlscztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaHRtbCA9IFwiPGRpdiBjbGFzcz1cXFwiXCIgKyB0aHVtYk91dGVyQ2xhc3NOYW1lcyArIFwiXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImxnLXRodW1iIGxnLWdyb3VwXFxcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XCI7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctaGFzLXRodW1iJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFwcGVuZFRodW1ibmFpbHNUbyA9PT0gJy5sZy1jb21wb25lbnRzJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLiRsZ0NvbXBvbmVudHMuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLmFwcGVuZChodG1sKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiR0aHVtYk91dGVyID0gdGhpcy5jb3JlLm91dGVyLmZpbmQoJy5sZy10aHVtYi1vdXRlcicpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIgPSB0aGlzLmNvcmUub3V0ZXIuZmluZCgnLmxnLXRodW1iJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZVRodW1iKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLXRodW1iJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgdGhpcy5jb3JlLnNldHRpbmdzLnNwZWVkICsgJ21zJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCd3aWR0aCcsIHRoaXMudGh1bWJUb3RhbFdpZHRoICsgJ3B4JylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGh1bWJJdGVtSHRtbCh0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuZW5hYmxlVGh1bWJEcmFnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJEcmFnVXRpbHMgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3Jkczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0WDogMCxcclxuICAgICAgICAgICAgICAgICAgICBlbmRYOiAwLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGlzTW92ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbmV3VHJhbnNsYXRlWDogMCxcclxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICB0b3VjaE1vdmVUaW1lOiAwLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLiR0aHVtYk91dGVyLmFkZENsYXNzKCdsZy1ncmFiJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy10aHVtYicpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWRvd24ubGcudGh1bWInLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnRodW1iVG90YWxXaWR0aCA+IF90aGlzLnRodW1iT3V0ZXJXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgb25seSBvbiAubGctb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmNvcmRzLnN0YXJ0WCA9IGUucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aHVtYkNsaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICoqIEZpeCBmb3Igd2Via2l0IGN1cnNvciBpc3N1ZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjY3MjNcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmdldCgpLnNjcm9sbExlZnQgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmdldCgpLnNjcm9sbExlZnQgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAqXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHRodW1iT3V0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsZy1ncmFiJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsZy1ncmFiYmluZycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vbihcIm1vdXNlbW92ZS5sZy50aHVtYi5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jb3JlLmxnT3BlbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChpc0RyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuY29yZHMuZW5kWCA9IGUucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMgPSBfdGhpcy5vblRodW1iVG91Y2hNb3ZlKHRodW1iRHJhZ1V0aWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub24oXCJtb3VzZXVwLmxnLnRodW1iLmdsb2JhbFwiICsgdGhpcy5jb3JlLmxnSWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuY29yZS5sZ09wZW5lZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAodGh1bWJEcmFnVXRpbHMuaXNNb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzID0gX3RoaXMub25UaHVtYlRvdWNoRW5kKHRodW1iRHJhZ1V0aWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRodW1iQ2xpY2thYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0RyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiR0aHVtYk91dGVyLnJlbW92ZUNsYXNzKCdsZy1ncmFiYmluZycpLmFkZENsYXNzKCdsZy1ncmFiJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5lbmFibGVUaHVtYlN3aXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJEcmFnVXRpbHMgPSB7XHJcbiAgICAgICAgICAgICAgICBjb3Jkczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0WDogMCxcclxuICAgICAgICAgICAgICAgICAgICBlbmRYOiAwLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGlzTW92ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbmV3VHJhbnNsYXRlWDogMCxcclxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICB0b3VjaE1vdmVUaW1lOiAwLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLm9uKCd0b3VjaHN0YXJ0LmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy50aHVtYlRvdGFsV2lkdGggPiBfdGhpcy50aHVtYk91dGVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuY29yZHMuc3RhcnRYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRodW1iQ2xpY2thYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIub24oJ3RvdWNobW92ZS5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMudGh1bWJUb3RhbFdpZHRoID4gX3RoaXMudGh1bWJPdXRlcldpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmNvcmRzLmVuZFggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMgPSBfdGhpcy5vblRodW1iVG91Y2hNb3ZlKHRodW1iRHJhZ1V0aWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIub24oJ3RvdWNoZW5kLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRodW1iRHJhZ1V0aWxzLmlzTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYkRyYWdVdGlscyA9IF90aGlzLm9uVGh1bWJUb3VjaEVuZCh0aHVtYkRyYWdVdGlscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy50aHVtYkNsaWNrYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gUmVidWlsZCB0aHVtYm5haWxzXHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5yZWJ1aWxkVGh1bWJuYWlscyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRyYW5zaXRpb25zXHJcbiAgICAgICAgICAgIHRoaXMuJHRodW1iT3V0ZXIuYWRkQ2xhc3MoJ2xnLXJlYnVpbGRpbmctdGh1bWJuYWlscycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnRodW1iVG90YWxXaWR0aCA9XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5nYWxsZXJ5SXRlbXMubGVuZ3RoICpcclxuICAgICAgICAgICAgICAgICAgICAgICAgKF90aGlzLnNldHRpbmdzLnRodW1iV2lkdGggKyBfdGhpcy5zZXR0aW5ncy50aHVtYk1hcmdpbik7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kbGdUaHVtYi5jc3MoJ3dpZHRoJywgX3RoaXMudGh1bWJUb3RhbFdpZHRoICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kbGdUaHVtYi5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0VGh1bWJJdGVtSHRtbChfdGhpcy5jb3JlLmdhbGxlcnlJdGVtcyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hbmltYXRlVGh1bWIoX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy4kdGh1bWJPdXRlci5yZW1vdmVDbGFzcygnbGctcmVidWlsZGluZy10aHVtYm5haWxzJyk7XHJcbiAgICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBAdHMtY2hlY2tcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLnNldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKC0nICsgdmFsdWUgKyAncHgsIDBweCwgMHB4KScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5nZXRQb3NzaWJsZVRyYW5zZm9ybVggPSBmdW5jdGlvbiAobGVmdCkge1xyXG4gICAgICAgICAgICBpZiAobGVmdCA+IHRoaXMudGh1bWJUb3RhbFdpZHRoIC0gdGhpcy50aHVtYk91dGVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGxlZnQgPSB0aGlzLnRodW1iVG90YWxXaWR0aCAtIHRoaXMudGh1bWJPdXRlcldpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsZWZ0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbGVmdCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxlZnQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmFuaW1hdGVUaHVtYiA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLiRsZ1RodW1iLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIHRoaXMuY29yZS5zZXR0aW5ncy5zcGVlZCArICdtcycpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbmltYXRlVGh1bWIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc2V0dGluZ3MuY3VycmVudFBhZ2VyUG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdtaWRkbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRodW1iT3V0ZXJXaWR0aCAvIDIgLSB0aGlzLnNldHRpbmdzLnRodW1iV2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy50aHVtYk91dGVyV2lkdGggLSB0aGlzLnNldHRpbmdzLnRodW1iV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVggPVxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNldHRpbmdzLnRodW1iV2lkdGggKyB0aGlzLnNldHRpbmdzLnRodW1iTWFyZ2luKSAqIGluZGV4IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgMSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRlWCA+IHRoaXMudGh1bWJUb3RhbFdpZHRoIC0gdGhpcy50aHVtYk91dGVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVggPSB0aGlzLnRodW1iVG90YWxXaWR0aCAtIHRoaXMudGh1bWJPdXRlcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRlWCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUodGhpcy50cmFuc2xhdGVYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5vblRodW1iVG91Y2hNb3ZlID0gZnVuY3Rpb24gKHRodW1iRHJhZ1V0aWxzKSB7XHJcbiAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLm5ld1RyYW5zbGF0ZVggPSB0aGlzLnRyYW5zbGF0ZVg7XHJcbiAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmlzTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy50b3VjaE1vdmVUaW1lID0gbmV3IERhdGUoKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLm5ld1RyYW5zbGF0ZVggLT1cclxuICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmNvcmRzLmVuZFggLSB0aHVtYkRyYWdVdGlscy5jb3Jkcy5zdGFydFg7XHJcbiAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLm5ld1RyYW5zbGF0ZVggPSB0aGlzLmdldFBvc3NpYmxlVHJhbnNmb3JtWCh0aHVtYkRyYWdVdGlscy5uZXdUcmFuc2xhdGVYKTtcclxuICAgICAgICAgICAgLy8gbW92ZSBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlKHRodW1iRHJhZ1V0aWxzLm5ld1RyYW5zbGF0ZVgpO1xyXG4gICAgICAgICAgICB0aGlzLiR0aHVtYk91dGVyLmFkZENsYXNzKCdsZy1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGh1bWJEcmFnVXRpbHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLm9uVGh1bWJUb3VjaEVuZCA9IGZ1bmN0aW9uICh0aHVtYkRyYWdVdGlscykge1xyXG4gICAgICAgICAgICB0aHVtYkRyYWdVdGlscy5pc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLmVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLiR0aHVtYk91dGVyLnJlbW92ZUNsYXNzKCdsZy1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICB2YXIgdG91Y2hEdXJhdGlvbiA9IHRodW1iRHJhZ1V0aWxzLmVuZFRpbWUudmFsdWVPZigpIC1cclxuICAgICAgICAgICAgICAgIHRodW1iRHJhZ1V0aWxzLnN0YXJ0VGltZS52YWx1ZU9mKCk7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVhuZXcgPSB0aHVtYkRyYWdVdGlscy5jb3Jkcy5lbmRYIC0gdGh1bWJEcmFnVXRpbHMuY29yZHMuc3RhcnRYO1xyXG4gICAgICAgICAgICB2YXIgc3BlZWRYID0gTWF0aC5hYnMoZGlzdGFuY2VYbmV3KSAvIHRvdWNoRHVyYXRpb247XHJcbiAgICAgICAgICAgIC8vIFNvbWUgbWFnaWNhbCBudW1iZXJzXHJcbiAgICAgICAgICAgIC8vIENhbiBiZSBpbXByb3ZlZFxyXG4gICAgICAgICAgICBpZiAoc3BlZWRYID4gMC4xNSAmJlxyXG4gICAgICAgICAgICAgICAgdGh1bWJEcmFnVXRpbHMuZW5kVGltZS52YWx1ZU9mKCkgLSB0aHVtYkRyYWdVdGlscy50b3VjaE1vdmVUaW1lIDwgMzApIHtcclxuICAgICAgICAgICAgICAgIHNwZWVkWCArPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwZWVkWCA+IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZFggKz0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNwZWVkWCA9XHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWRYICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWRYICogKE1hdGguYWJzKGRpc3RhbmNlWG5ldykgLyB0aGlzLnRodW1iT3V0ZXJXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRsZ1RodW1iLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsIE1hdGgubWluKHNwZWVkWCAtIDEsIDIpICsgJ3NldHRpbmdzJyk7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZVhuZXcgPSBkaXN0YW5jZVhuZXcgKiBzcGVlZFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVggPSB0aGlzLmdldFBvc3NpYmxlVHJhbnNmb3JtWCh0aGlzLnRyYW5zbGF0ZVggLSBkaXN0YW5jZVhuZXcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2xhdGUodGhpcy50cmFuc2xhdGVYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlWCA9IHRodW1iRHJhZ1V0aWxzLm5ld1RyYW5zbGF0ZVg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRodW1iRHJhZ1V0aWxzLmNvcmRzLmVuZFggLSB0aHVtYkRyYWdVdGlscy5jb3Jkcy5zdGFydFgpIDxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudGh1bWJuYWlsU3dpcGVUaHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJDbGlja2FibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aHVtYkRyYWdVdGlscztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUuZ2V0VGh1bWJIdG1sID0gZnVuY3Rpb24gKHRodW1iLCBpbmRleCkge1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVWaWRlb0luZm8gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW2luZGV4XS5fX3NsaWRlVmlkZW9JbmZvIHx8IHt9O1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJJbWc7XHJcbiAgICAgICAgICAgIGlmIChzbGlkZVZpZGVvSW5mby55b3V0dWJlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5sb2FkWW91VHViZVRodW1ibmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iSW1nID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJy8vaW1nLnlvdXR1YmUuY29tL3ZpLycgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVWaWRlb0luZm8ueW91dHViZVsxXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLycgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy55b3VUdWJlVGh1bWJTaXplICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuanBnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRodW1iSW1nID0gdGh1bWI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHVtYkltZyA9IHRodW1iO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIjxkaXYgZGF0YS1sZy1pdGVtLWlkPVxcXCJcIiArIGluZGV4ICsgXCJcXFwiIGNsYXNzPVxcXCJsZy10aHVtYi1pdGVtIFwiICsgKGluZGV4ID09PSB0aGlzLmNvcmUuaW5kZXggPyAnIGFjdGl2ZScgOiAnJykgKyBcIlxcXCIgXFxuICAgICAgICBzdHlsZT1cXFwid2lkdGg6XCIgKyB0aGlzLnNldHRpbmdzLnRodW1iV2lkdGggKyBcInB4OyBoZWlnaHQ6IFwiICsgdGhpcy5zZXR0aW5ncy50aHVtYkhlaWdodCArIFwiO1xcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogXCIgKyB0aGlzLnNldHRpbmdzLnRodW1iTWFyZ2luICsgXCJweDtcXFwiPlxcbiAgICAgICAgICAgIDxpbWcgZGF0YS1sZy1pdGVtLWlkPVxcXCJcIiArIGluZGV4ICsgXCJcXFwiIHNyYz1cXFwiXCIgKyB0aHVtYkltZyArIFwiXFxcIiAvPlxcbiAgICAgICAgPC9kaXY+XCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLmdldFRodW1iSXRlbUh0bWwgPSBmdW5jdGlvbiAoaXRlbXMpIHtcclxuICAgICAgICAgICAgdmFyIHRodW1iTGlzdCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aHVtYkxpc3QgKz0gdGhpcy5nZXRUaHVtYkh0bWwoaXRlbXNbaV0udGh1bWIsIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aHVtYkxpc3Q7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBUaHVtYm5haWwucHJvdG90eXBlLnNldFRodW1iSXRlbUh0bWwgPSBmdW5jdGlvbiAoaXRlbXMpIHtcclxuICAgICAgICAgICAgdmFyIHRodW1iTGlzdCA9IHRoaXMuZ2V0VGh1bWJJdGVtSHRtbChpdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGxnVGh1bWIuaHRtbCh0aHVtYkxpc3QpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5zZXRBbmltYXRlVGh1bWJTdHlsZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFuaW1hdGVUaHVtYikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy1hbmltYXRlLXRodW1iJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIE1hbmFnZSB0aHVtYm5haWwgYWN0aXZlIGNhbHNzXHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5tYW5hZ2VBY3RpdmVDbGFzc09uU2xpZGVDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIG1hbmFnZSBhY3RpdmUgY2xhc3MgZm9yIHRodW1ibmFpbFxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5iZWZvcmVTbGlkZSArIFwiLnRodW1iXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aHVtYiA9IF90aGlzLmNvcmUub3V0ZXIuZmluZCgnLmxnLXRodW1iLWl0ZW0nKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2ZW50LmRldGFpbC5pbmRleDtcclxuICAgICAgICAgICAgICAgICR0aHVtYi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkdGh1bWIuZXEoaW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBUb2dnbGUgdGh1bWJuYWlsIGJhclxyXG4gICAgICAgIFRodW1ibmFpbC5wcm90b3R5cGUudG9nZ2xlVGh1bWJCYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnRvZ2dsZVRodW1iKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLWNhbi10b2dnbGUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS4kdG9vbGJhci5hcHBlbmQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCInICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnRodW1ibmFpbFBsdWdpblN0cmluZ3NbJ3RvZ2dsZVRodW1ibmFpbHMnXSArXHJcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGNsYXNzPVwibGctdG9nZ2xlLXRodW1iIGxnLWljb25cIj48L2J1dHRvbj4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctdG9nZ2xlLXRodW1iJylcclxuICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci50b2dnbGVDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS50aHVtYktleVByZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9uKFwia2V5ZG93bi5sZy50aHVtYi5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5jb3JlLmxnT3BlbmVkIHx8ICFfdGhpcy5zZXR0aW5ncy50b2dnbGVUaHVtYilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy1jb21wb25lbnRzLW9wZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gNDApIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctY29tcG9uZW50cy1vcGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVGh1bWJuYWlsLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy50aHVtYm5haWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub2ZmKFwiLmxnLnRodW1iLmdsb2JhbFwiICsgdGhpcy5jb3JlLmxnSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcubGcudGh1bWInKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLnRodW1iJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aHVtYk91dGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy1oYXMtdGh1bWInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFRodW1ibmFpbDtcclxuICAgIH0oKSk7XG5cbiAgICByZXR1cm4gVGh1bWJuYWlsO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGctdGh1bWJuYWlsLnVtZC5qcy5tYXBcbiIsIi8qIVxuICogbGlnaHRnYWxsZXJ5IHwgMi40LjAtYmV0YS4wIHwgRGVjZW1iZXIgMTJ0aCAyMDIxXG4gKiBodHRwOi8vd3d3LmxpZ2h0Z2FsbGVyeWpzLmNvbS9cbiAqIENvcHlyaWdodCAoYykgMjAyMCBTYWNoaW4gTmVyYXZhdGg7XG4gKiBAbGljZW5zZSBHUEx2M1xuICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gICAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLmxnWm9vbSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG4gICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbiAgICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG4gICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG4gICAgUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbiAgICBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuICAgIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcbiAgICBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xuXG4gICAgdmFyIHpvb21TZXR0aW5ncyA9IHtcclxuICAgICAgICBzY2FsZTogMSxcclxuICAgICAgICB6b29tOiB0cnVlLFxyXG4gICAgICAgIGFjdHVhbFNpemU6IHRydWUsXHJcbiAgICAgICAgc2hvd1pvb21Jbk91dEljb25zOiBmYWxzZSxcclxuICAgICAgICBhY3R1YWxTaXplSWNvbnM6IHtcclxuICAgICAgICAgICAgem9vbUluOiAnbGctem9vbS1pbicsXHJcbiAgICAgICAgICAgIHpvb21PdXQ6ICdsZy16b29tLW91dCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmFibGVab29tQWZ0ZXI6IDMwMCxcclxuICAgICAgICB6b29tUGx1Z2luU3RyaW5nczoge1xyXG4gICAgICAgICAgICB6b29tSW46ICdab29tIGluJyxcclxuICAgICAgICAgICAgem9vbU91dDogJ1pvb20gb3V0JyxcclxuICAgICAgICAgICAgdmlld0FjdHVhbFNpemU6ICdWaWV3IGFjdHVhbCBzaXplJyxcclxuICAgICAgICB9LFxyXG4gICAgfTtcblxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiBsaWdodEdhbGxlcnkgZXZlbnRzXHJcbiAgICAgKiBBbGwgZXZlbnRzIHNob3VsZCBiZSBkb2N1bWVudGVkIGhlcmVcclxuICAgICAqIEJlbG93IGludGVyZmFjZXMgYXJlIHVzZWQgdG8gYnVpbGQgdGhlIHdlYnNpdGUgZG9jdW1lbnRhdGlvbnNcclxuICAgICAqICovXHJcbiAgICB2YXIgbEdFdmVudHMgPSB7XHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTbGlkZTogJ2xnQWZ0ZXJBcHBlbmRTbGlkZScsXHJcbiAgICAgICAgaW5pdDogJ2xnSW5pdCcsXHJcbiAgICAgICAgaGFzVmlkZW86ICdsZ0hhc1ZpZGVvJyxcclxuICAgICAgICBjb250YWluZXJSZXNpemU6ICdsZ0NvbnRhaW5lclJlc2l6ZScsXHJcbiAgICAgICAgdXBkYXRlU2xpZGVzOiAnbGdVcGRhdGVTbGlkZXMnLFxyXG4gICAgICAgIGFmdGVyQXBwZW5kU3ViSHRtbDogJ2xnQWZ0ZXJBcHBlbmRTdWJIdG1sJyxcclxuICAgICAgICBiZWZvcmVPcGVuOiAnbGdCZWZvcmVPcGVuJyxcclxuICAgICAgICBhZnRlck9wZW46ICdsZ0FmdGVyT3BlbicsXHJcbiAgICAgICAgc2xpZGVJdGVtTG9hZDogJ2xnU2xpZGVJdGVtTG9hZCcsXHJcbiAgICAgICAgYmVmb3JlU2xpZGU6ICdsZ0JlZm9yZVNsaWRlJyxcclxuICAgICAgICBhZnRlclNsaWRlOiAnbGdBZnRlclNsaWRlJyxcclxuICAgICAgICBwb3N0ZXJDbGljazogJ2xnUG9zdGVyQ2xpY2snLFxyXG4gICAgICAgIGRyYWdTdGFydDogJ2xnRHJhZ1N0YXJ0JyxcclxuICAgICAgICBkcmFnTW92ZTogJ2xnRHJhZ01vdmUnLFxyXG4gICAgICAgIGRyYWdFbmQ6ICdsZ0RyYWdFbmQnLFxyXG4gICAgICAgIGJlZm9yZU5leHRTbGlkZTogJ2xnQmVmb3JlTmV4dFNsaWRlJyxcclxuICAgICAgICBiZWZvcmVQcmV2U2xpZGU6ICdsZ0JlZm9yZVByZXZTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlQ2xvc2U6ICdsZ0JlZm9yZUNsb3NlJyxcclxuICAgICAgICBhZnRlckNsb3NlOiAnbGdBZnRlckNsb3NlJyxcclxuICAgICAgICByb3RhdGVMZWZ0OiAnbGdSb3RhdGVMZWZ0JyxcclxuICAgICAgICByb3RhdGVSaWdodDogJ2xnUm90YXRlUmlnaHQnLFxyXG4gICAgICAgIGZsaXBIb3Jpem9udGFsOiAnbGdGbGlwSG9yaXpvbnRhbCcsXHJcbiAgICAgICAgZmxpcFZlcnRpY2FsOiAnbGdGbGlwVmVydGljYWwnLFxyXG4gICAgICAgIGF1dG9wbGF5OiAnbGdBdXRvcGxheScsXHJcbiAgICAgICAgYXV0b3BsYXlTdGFydDogJ2xnQXV0b3BsYXlTdGFydCcsXHJcbiAgICAgICAgYXV0b3BsYXlTdG9wOiAnbGdBdXRvcGxheVN0b3AnLFxyXG4gICAgfTtcblxuICAgIHZhciBab29tID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIFpvb20oaW5zdGFuY2UsICRMRykge1xyXG4gICAgICAgICAgICAvLyBnZXQgbGlnaHRHYWxsZXJ5IGNvcmUgcGx1Z2luIGluc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMuY29yZSA9IGluc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyA9ICRMRztcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB6b29tU2V0dGluZ3MpLCB0aGlzLmNvcmUuc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQXBwZW5kIFpvb20gY29udHJvbHMuIEFjdHVhbCBzaXplLCBab29tLWluLCBab29tLW91dFxyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmJ1aWxkVGVtcGxhdGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgem9vbUljb25zID0gdGhpcy5zZXR0aW5ncy5zaG93Wm9vbUluT3V0SWNvbnNcclxuICAgICAgICAgICAgICAgID8gXCI8YnV0dG9uIGlkPVxcXCJcIiArIHRoaXMuY29yZS5nZXRJZE5hbWUoJ2xnLXpvb20taW4nKSArIFwiXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy56b29tUGx1Z2luU3RyaW5nc1snem9vbUluJ10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLXpvb20taW4gbGctaWNvblxcXCI+PC9idXR0b24+PGJ1dHRvbiBpZD1cXFwiXCIgKyB0aGlzLmNvcmUuZ2V0SWROYW1lKCdsZy16b29tLW91dCcpICsgXCJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgYXJpYS1sYWJlbD1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLnpvb21QbHVnaW5TdHJpbmdzWyd6b29tSW4nXSArIFwiXFxcIiBjbGFzcz1cXFwibGctem9vbS1vdXQgbGctaWNvblxcXCI+PC9idXR0b24+XCJcclxuICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFjdHVhbFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHpvb21JY29ucyArPSBcIjxidXR0b24gaWQ9XFxcIlwiICsgdGhpcy5jb3JlLmdldElkTmFtZSgnbGctYWN0dWFsLXNpemUnKSArIFwiXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy56b29tUGx1Z2luU3RyaW5nc1sndmlld0FjdHVhbFNpemUnXSArIFwiXFxcIiBjbGFzcz1cXFwiXCIgKyB0aGlzLnNldHRpbmdzLmFjdHVhbFNpemVJY29ucy56b29tSW4gKyBcIiBsZy1pY29uXFxcIj48L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIuYWRkQ2xhc3MoJ2xnLXVzZS10cmFuc2l0aW9uLWZvci16b29tJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kdG9vbGJhci5maXJzdCgpLmFwcGVuZCh6b29tSWNvbnMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgRW5hYmxlIHpvb20gb3B0aW9uIG9ubHkgb25jZSB0aGUgaW1hZ2UgaXMgY29tcGxldGVseSBsb2FkZWRcclxuICAgICAgICAgKiBJZiB6b29tRnJvbU9yaWdpbiBpcyB0cnVlLCBab29tIGlzIGVuYWJsZWQgb25jZSB0aGUgZHVtbXkgaW1hZ2UgaGFzIGJlZW4gaW5zZXJ0ZWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFpvb20gc3R5bGVzIGFyZSBkZWZpbmVkIHVuZGVyIGxnLXpvb21hYmxlIENTUyBjbGFzcy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBab29tLnByb3RvdHlwZS5lbmFibGVab29tID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIGRlbGF5IHdpbGwgYmUgMCBleGNlcHQgZmlyc3QgdGltZVxyXG4gICAgICAgICAgICB2YXIgX3NwZWVkID0gdGhpcy5zZXR0aW5ncy5lbmFibGVab29tQWZ0ZXIgKyBldmVudC5kZXRhaWwuZGVsYXk7XHJcbiAgICAgICAgICAgIC8vIHNldCBfc3BlZWQgdmFsdWUgMCBpZiBnYWxsZXJ5IG9wZW5lZCBmcm9tIGRpcmVjdCB1cmwgYW5kIGlmIGl0IGlzIGZpcnN0IHNsaWRlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRMRygnYm9keScpLmZpcnN0KCkuaGFzQ2xhc3MoJ2xnLWZyb20taGFzaCcpICYmXHJcbiAgICAgICAgICAgICAgICBldmVudC5kZXRhaWwuZGVsYXkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdpbGwgZXhlY3V0ZSBvbmx5IG9uY2VcclxuICAgICAgICAgICAgICAgIF9zcGVlZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgbGctZnJvbS1oYXNoIHRvIGVuYWJsZSBzdGFydGluZyBhbmltYXRpb24uXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRMRygnYm9keScpLmZpcnN0KCkucmVtb3ZlQ2xhc3MoJ2xnLWZyb20taGFzaCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuem9vbWFibGVUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmlzSW1hZ2VTbGlkZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuY29yZS5nZXRTbGlkZUl0ZW0oZXZlbnQuZGV0YWlsLmluZGV4KS5hZGRDbGFzcygnbGctem9vbWFibGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5kZXRhaWwuaW5kZXggPT09IF90aGlzLmNvcmUuaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXRab29tRXNzZW50aWFscygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBfc3BlZWQgKyAzMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5lbmFibGVab29tT25TbGlkZUl0ZW1Mb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBBZGQgem9vbWFibGUgY2xhc3NcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuc2xpZGVJdGVtTG9hZCArIFwiLnpvb21cIiwgdGhpcy5lbmFibGVab29tLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0TW9kaWZpZXIgPSBmdW5jdGlvbiAocm90YXRlVmFsdWUsIGF4aXMsIGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbFJvdGF0ZSA9IHJvdGF0ZVZhbHVlO1xyXG4gICAgICAgICAgICByb3RhdGVWYWx1ZSA9IE1hdGguYWJzKHJvdGF0ZVZhbHVlKTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybVZhbHVlcyA9IHRoaXMuZ2V0Q3VycmVudFRyYW5zZm9ybShlbCk7XHJcbiAgICAgICAgICAgIGlmICghdHJhbnNmb3JtVmFsdWVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbW9kaWZpZXIgPSAxO1xyXG4gICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ1gnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmxpcEhvcml6b250YWxWYWx1ZSA9IE1hdGguc2lnbihwYXJzZUZsb2F0KHRyYW5zZm9ybVZhbHVlc1swXSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdGF0ZVZhbHVlID09PSAwIHx8IHJvdGF0ZVZhbHVlID09PSAxODApIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RpZmllciA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyb3RhdGVWYWx1ZSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKG9yaWdpbmFsUm90YXRlID09PSAtOTAgJiYgZmxpcEhvcml6b250YWxWYWx1ZSA9PT0gMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG9yaWdpbmFsUm90YXRlID09PSA5MCAmJiBmbGlwSG9yaXpvbnRhbFZhbHVlID09PSAtMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXIgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb2RpZmllciA9IG1vZGlmaWVyICogZmxpcEhvcml6b250YWxWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBmbGlwVmVydGljYWxWYWx1ZSA9IE1hdGguc2lnbihwYXJzZUZsb2F0KHRyYW5zZm9ybVZhbHVlc1szXSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdGF0ZVZhbHVlID09PSAwIHx8IHJvdGF0ZVZhbHVlID09PSAxODApIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RpZmllciA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyb3RhdGVWYWx1ZSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2luWCA9IHBhcnNlRmxvYXQodHJhbnNmb3JtVmFsdWVzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2luTWludXNYID0gcGFyc2VGbG9hdCh0cmFuc2Zvcm1WYWx1ZXNbMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gTWF0aC5zaWduKHNpblggKiBzaW5NaW51c1ggKiBvcmlnaW5hbFJvdGF0ZSAqIGZsaXBWZXJ0aWNhbFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gbW9kaWZpZXIgKiBmbGlwVmVydGljYWxWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbW9kaWZpZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRJbWFnZVNpemUgPSBmdW5jdGlvbiAoJGltYWdlLCByb3RhdGVWYWx1ZSwgYXhpcykge1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2VTaXplcyA9IHtcclxuICAgICAgICAgICAgICAgIHk6ICdvZmZzZXRIZWlnaHQnLFxyXG4gICAgICAgICAgICAgICAgeDogJ29mZnNldFdpZHRoJyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVZhbHVlKSA9PT0gOTApIHtcclxuICAgICAgICAgICAgICAgIC8vIFN3YXAgYXhpc1xyXG4gICAgICAgICAgICAgICAgaWYgKGF4aXMgPT09ICd4Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGF4aXMgPSAneSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBheGlzID0gJ3gnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAkaW1hZ2VbaW1hZ2VTaXplc1theGlzXV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXREcmFnQ29yZHMgPSBmdW5jdGlvbiAoZSwgcm90YXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHJvdGF0ZVZhbHVlID09PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBlLnBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGUucGFnZVgsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB4OiBlLnBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IGUucGFnZVksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRTd2lwZUNvcmRzID0gZnVuY3Rpb24gKGUsIHJvdGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gICAgICAgICAgICB2YXIgeSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWTtcclxuICAgICAgICAgICAgaWYgKHJvdGF0ZVZhbHVlID09PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB4OiB5LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHgsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXREcmFnQWxsb3dlZEF4aXNlcyA9IGZ1bmN0aW9uIChyb3RhdGVWYWx1ZSwgc2NhbGUpIHtcclxuICAgICAgICAgICAgc2NhbGUgPSBzY2FsZSB8fCB0aGlzLnNjYWxlIHx8IDE7XHJcbiAgICAgICAgICAgIHZhciBhbGxvd1kgPSB0aGlzLmltYWdlWVNpemUgKiBzY2FsZSA+IHRoaXMuY29udGFpbmVyUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciBhbGxvd1ggPSB0aGlzLmltYWdlWFNpemUgKiBzY2FsZSA+IHRoaXMuY29udGFpbmVyUmVjdC53aWR0aDtcclxuICAgICAgICAgICAgaWYgKHJvdGF0ZVZhbHVlID09PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1g6IGFsbG93WSxcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1k6IGFsbG93WCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WDogYWxsb3dYLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93WTogYWxsb3dZLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXHJcbiAgICAgICAgICogQHJldHVybiBtYXRyaXgoY29zKFgpLCBzaW4oWCksIC1zaW4oWCksIGNvcyhYKSwgMCwgMCk7XHJcbiAgICAgICAgICogR2V0IHRoZSBjdXJyZW50IHRyYW5zZm9ybSB2YWx1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldEN1cnJlbnRUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgaWYgKCFlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKTtcclxuICAgICAgICAgICAgdmFyIHRtID0gc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW1vei10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgnLW1zLXRyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctby10cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgc3QuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgICdub25lJztcclxuICAgICAgICAgICAgaWYgKHRtICE9PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bS5zcGxpdCgnKCcpWzFdLnNwbGl0KCcpJylbMF0uc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRDdXJyZW50Um90YXRpb24gPSBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgaWYgKCFlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMuZ2V0Q3VycmVudFRyYW5zZm9ybShlbCk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGguYXRhbjIocGFyc2VGbG9hdCh2YWx1ZXNbMV0pLCBwYXJzZUZsb2F0KHZhbHVlc1swXSkpICpcclxuICAgICAgICAgICAgICAgICAgICAoMTgwIC8gTWF0aC5QSSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgeW91IHdhbnQgcm90YXRlIGluIDM2MFxyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gKGFuZ2xlIDwgMCA/IGFuZ2xlICsgMzYwIDogYW5nbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuc2V0Wm9vbUVzc2VudGlhbHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkaW1hZ2UgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWFnZScpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIHJvdGF0ZUVsID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXJvdGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlID0gdGhpcy5nZXRDdXJyZW50Um90YXRpb24ocm90YXRlRWwpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlWVNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSgkaW1hZ2UuZ2V0KCksIHRoaXMucm90YXRlVmFsdWUsICd5Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VYU2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplKCRpbWFnZS5nZXQoKSwgdGhpcy5yb3RhdGVWYWx1ZSwgJ3gnKTtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJSZWN0ID0gdGhpcy5jb3JlLm91dGVyLmdldCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyWCA9IHRoaXMuZ2V0TW9kaWZpZXIodGhpcy5yb3RhdGVWYWx1ZSwgJ1gnLCByb3RhdGVFbCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kaWZpZXJZID0gdGhpcy5nZXRNb2RpZmllcih0aGlzLnJvdGF0ZVZhbHVlLCAnWScsIHJvdGF0ZUVsKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIEltYWdlIHpvb21cclxuICAgICAgICAgKiBUcmFuc2xhdGUgdGhlIHdyYXAgYW5kIHNjYWxlIHRoZSBpbWFnZSB0byBnZXQgYmV0dGVyIHVzZXIgZXhwZXJpZW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHNjYWxlIC0gWm9vbSBkZWNyZW1lbnQvaW5jcmVtZW50IHZhbHVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuem9vbUltYWdlID0gZnVuY3Rpb24gKHNjYWxlKSB7XHJcbiAgICAgICAgICAgIC8vIEZpbmQgb2Zmc2V0IG1hbnVhbGx5IHRvIGF2b2lkIGlzc3VlIGFmdGVyIHpvb21cclxuICAgICAgICAgICAgdmFyIG9mZnNldFggPSAodGhpcy5jb250YWluZXJSZWN0LndpZHRoIC0gdGhpcy5pbWFnZVhTaXplKSAvIDIgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXJSZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMuY29yZS5tZWRpYUNvbnRhaW5lclBvc2l0aW9uLCB0b3AgPSBfYS50b3AsIGJvdHRvbSA9IF9hLmJvdHRvbTtcclxuICAgICAgICAgICAgdmFyIHRvcEJvdHRvbVNwYWNpbmcgPSBNYXRoLmFicyh0b3AgLSBib3R0b20pIC8gMjtcclxuICAgICAgICAgICAgdmFyIG9mZnNldFkgPSAodGhpcy5jb250YWluZXJSZWN0LmhlaWdodCAtXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlWVNpemUgLVxyXG4gICAgICAgICAgICAgICAgdG9wQm90dG9tU3BhY2luZyAqIHRoaXMubW9kaWZpZXJYKSAvXHJcbiAgICAgICAgICAgICAgICAyICtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9wICtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyUmVjdC50b3A7XHJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbFg7XHJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbFk7XHJcbiAgICAgICAgICAgIGlmIChzY2FsZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZHJhZ0FsbG93ZWRBeGlzZXMgPSB0aGlzLmdldERyYWdBbGxvd2VkQXhpc2VzKE1hdGguYWJzKHRoaXMucm90YXRlVmFsdWUpLCBzY2FsZSk7XHJcbiAgICAgICAgICAgIHZhciBhbGxvd1kgPSBkcmFnQWxsb3dlZEF4aXNlcy5hbGxvd1ksIGFsbG93WCA9IGRyYWdBbGxvd2VkQXhpc2VzLmFsbG93WDtcclxuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb25DaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFggPSB0aGlzLmxlZnQgLyAodGhpcy5zY2FsZSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxZID0gdGhpcy50b3AgLyAodGhpcy5zY2FsZSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlWCA9IE1hdGguYWJzKG9yaWdpbmFsWCkgKyBvZmZzZXRYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlWSA9IE1hdGguYWJzKG9yaWdpbmFsWSkgKyBvZmZzZXRZO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVTd2lwZUNvcmRzID0gdGhpcy5nZXRQb3NzaWJsZVN3aXBlRHJhZ0NvcmRzKHRoaXMucm90YXRlVmFsdWUsIHNjYWxlKTtcclxuICAgICAgICAgICAgdmFyIF94ID0gb2Zmc2V0WCAtIHRoaXMucGFnZVg7XHJcbiAgICAgICAgICAgIHZhciBfeSA9IG9mZnNldFkgLSB0aGlzLnBhZ2VZO1xyXG4gICAgICAgICAgICB2YXIgeCA9IChzY2FsZSAtIDEpICogX3g7XHJcbiAgICAgICAgICAgIHZhciB5ID0gKHNjYWxlIC0gMSkgKiBfeTtcclxuICAgICAgICAgICAgaWYgKGFsbG93WCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZUxlZnQoeCwgcG9zc2libGVTd2lwZUNvcmRzLm1pblgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlUmlnaHQoeCwgcG9zc2libGVTd2lwZUNvcmRzLm1heFgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjYWxlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4IDwgcG9zc2libGVTd2lwZUNvcmRzLm1pblgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh4ID4gcG9zc2libGVTd2lwZUNvcmRzLm1heFgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYWxsb3dZKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlVG9wKHksIHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZUJvdHRvbSh5LCBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5ID0gcG9zc2libGVTd2lwZUNvcmRzLm1heFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdHJhbnNsYXRlIHZhbHVlIGJhc2VkIG9uIGluZGV4IG9mIGJleW9uZCB0aGUgdmlld3BvcnQsIHV0aWxpemUgdGhlIGF2YWlsYWJsZSBzcGFjZSB0byBwcmV2ZW50IGltYWdlIGJlaW5nIGN1dCBvdXRcclxuICAgICAgICAgICAgICAgIGlmIChzY2FsZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0lmIGltYWdlIGdvZXMgYmV5b25kIHZpZXdwb3J0IHRvcCwgdXNlIHRoZSBtaW5pbSBwb3NzaWJsZSB0cmFuc2xhdGUgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeSA8IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5ZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoeSA+IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRab29tU3R5bGVzKHtcclxuICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IHNjYWxlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIGFwcGx5IHNjYWxlM2QgdG8gaW1hZ2UgYW5kIHRyYW5zbGF0ZSB0byBpbWFnZSB3cmFwXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHlsZX0gWCxZIGFuZCBzY2FsZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnNldFpvb21TdHlsZXMgPSBmdW5jdGlvbiAoc3R5bGUpIHtcclxuICAgICAgICAgICAgdmFyICRpbWFnZSA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltYWdlJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgJGR1bW15SW1hZ2UgPSB0aGlzLmNvcmUub3V0ZXJcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctY3VycmVudCAubGctZHVtbXktaW1nJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgJGltYWdlV3JhcCA9ICRpbWFnZS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHN0eWxlLnNjYWxlO1xyXG4gICAgICAgICAgICAkaW1hZ2UuY3NzKCd0cmFuc2Zvcm0nLCAnc2NhbGUzZCgnICsgc3R5bGUuc2NhbGUgKyAnLCAnICsgc3R5bGUuc2NhbGUgKyAnLCAxKScpO1xyXG4gICAgICAgICAgICAkZHVtbXlJbWFnZS5jc3MoJ3RyYW5zZm9ybScsICdzY2FsZTNkKCcgKyBzdHlsZS5zY2FsZSArICcsICcgKyBzdHlsZS5zY2FsZSArICcsIDEpJyk7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHN0eWxlLnggKyAncHgsICcgKyBzdHlsZS55ICsgJ3B4LCAwKSc7XHJcbiAgICAgICAgICAgICRpbWFnZVdyYXAuY3NzKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0pO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBzdHlsZS54O1xyXG4gICAgICAgICAgICB0aGlzLnRvcCA9IHN0eWxlLnk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0gaW5kZXggLSBJbmRleCBvZiB0aGUgY3VycmVudCBzbGlkZVxyXG4gICAgICAgICAqIEBwYXJhbSBldmVudCAtIGV2ZW50IHdpbGwgYmUgYXZhaWxhYmxlIG9ubHkgaWYgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBjbGlja2luZy90YXBpbmcgdGhlIGltYWdzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuc2V0QWN0dWFsU2l6ZSA9IGZ1bmN0aW9uIChpbmRleCwgZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgLy8gQWxsb3cgem9vbSBvbmx5IG9uIGltYWdlXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0ltYWdlU2xpZGUoKSB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLmhhc0NsYXNzKCdsZy1maXJzdC1zbGlkZS1sb2FkaW5nJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSB0aGlzLmdldEN1cnJlbnRJbWFnZUFjdHVhbFNpemVTY2FsZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb3JlLm91dGVyLmhhc0NsYXNzKCdsZy16b29tZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gdGhpcy5nZXRTY2FsZShzY2FsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRQYWdlQ29yZHMoZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luWm9vbSh0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgdGhpcy56b29tSW1hZ2UodGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctZ3JhYmJpbmcnKS5hZGRDbGFzcygnbGctZ3JhYicpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXROYXR1cmFsV2lkdGggPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyICRpbWFnZSA9IHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0oaW5kZXgpLmZpbmQoJy5sZy1pbWFnZScpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBuYXR1cmFsV2lkdGggPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW2luZGV4XS53aWR0aDtcclxuICAgICAgICAgICAgcmV0dXJuIG5hdHVyYWxXaWR0aFxyXG4gICAgICAgICAgICAgICAgPyBwYXJzZUZsb2F0KG5hdHVyYWxXaWR0aClcclxuICAgICAgICAgICAgICAgIDogJGltYWdlLmdldCgpLm5hdHVyYWxXaWR0aDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldEFjdHVhbFNpemVTY2FsZSA9IGZ1bmN0aW9uIChuYXR1cmFsV2lkdGgsIHdpZHRoKSB7XHJcbiAgICAgICAgICAgIHZhciBfc2NhbGU7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZTtcclxuICAgICAgICAgICAgaWYgKG5hdHVyYWxXaWR0aCA+IHdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBfc2NhbGUgPSBuYXR1cmFsV2lkdGggLyB3aWR0aDtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gX3NjYWxlIHx8IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0Q3VycmVudEltYWdlQWN0dWFsU2l6ZVNjYWxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJGltYWdlID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1hZ2UnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9ICRpbWFnZS5nZXQoKS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgdmFyIG5hdHVyYWxXaWR0aCA9IHRoaXMuZ2V0TmF0dXJhbFdpZHRoKHRoaXMuY29yZS5pbmRleCkgfHwgd2lkdGg7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFjdHVhbFNpemVTY2FsZShuYXR1cmFsV2lkdGgsIHdpZHRoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldFBhZ2VDb3JkcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgY29yZHMgPSB7fTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb3Jkcy54ID0gZXZlbnQucGFnZVggfHwgZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcclxuICAgICAgICAgICAgICAgIGNvcmRzLnkgPSBldmVudC5wYWdlWSB8fCBldmVudC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lclJlY3QgPSB0aGlzLmNvcmUub3V0ZXIuZ2V0KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBjb3Jkcy54ID0gY29udGFpbmVyUmVjdC53aWR0aCAvIDIgKyBjb250YWluZXJSZWN0LmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBjb3Jkcy55ID1cclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJSZWN0LmhlaWdodCAvIDIgKyB0aGlzLnNjcm9sbFRvcCArIGNvbnRhaW5lclJlY3QudG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb3JkcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnNldFBhZ2VDb3JkcyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgcGFnZUNvcmRzID0gdGhpcy5nZXRQYWdlQ29yZHMoZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VYID0gcGFnZUNvcmRzLng7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVkgPSBwYWdlQ29yZHMueTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIElmIHRydWUsIHpvb21lZCAtIGluIGVsc2Ugem9vbWVkIG91dFxyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmJlZ2luWm9vbSA9IGZ1bmN0aW9uIChzY2FsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXpvb20tZHJhZy10cmFuc2l0aW9uIGxnLXpvb20tZHJhZ2dpbmcnKTtcclxuICAgICAgICAgICAgaWYgKHNjYWxlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyLmFkZENsYXNzKCdsZy16b29tZWQnKTtcclxuICAgICAgICAgICAgICAgIHZhciAkYWN0dWFsU2l6ZSA9IHRoaXMuY29yZS5nZXRFbGVtZW50QnlJZCgnbGctYWN0dWFsLXNpemUnKTtcclxuICAgICAgICAgICAgICAgICRhY3R1YWxTaXplXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKHRoaXMuc2V0dGluZ3MuYWN0dWFsU2l6ZUljb25zLnpvb21JbilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5hY3R1YWxTaXplSWNvbnMuem9vbU91dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Wm9vbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2FsZSA+IDE7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5nZXRTY2FsZSA9IGZ1bmN0aW9uIChzY2FsZSkge1xyXG4gICAgICAgICAgICB2YXIgYWN0dWFsU2l6ZVNjYWxlID0gdGhpcy5nZXRDdXJyZW50SW1hZ2VBY3R1YWxTaXplU2NhbGUoKTtcclxuICAgICAgICAgICAgaWYgKHNjYWxlIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNjYWxlID4gYWN0dWFsU2l6ZVNjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IGFjdHVhbFNpemVTY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3Muem9vbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRUZW1wbGF0ZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVab29tT25TbGlkZUl0ZW1Mb2FkKCk7XHJcbiAgICAgICAgICAgIHZhciB0YXBwZWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIub24oJ2RibGNsaWNrLmxnJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLiRMRyhldmVudC50YXJnZXQpLmhhc0NsYXNzKCdsZy1pbWFnZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0QWN0dWFsU2l6ZShfdGhpcy5jb3JlLmluZGV4LCBldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIub24oJ3RvdWNoc3RhcnQubGcnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkdGFyZ2V0ID0gX3RoaXMuJExHKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEgJiZcclxuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0Lmhhc0NsYXNzKCdsZy1pbWFnZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXBwZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFwcGVkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXBwZWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRhcHBlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcHBlZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNldEFjdHVhbFNpemUoX3RoaXMuY29yZS5pbmRleCwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB6b29tIG9uIHJlc2l6ZSBhbmQgb3JpZW50YXRpb25jaGFuZ2VcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuY29udGFpbmVyUmVzaXplICsgXCIuem9vbSBcIiArIGxHRXZlbnRzLnJvdGF0ZVJpZ2h0ICsgXCIuem9vbSBcIiArIGxHRXZlbnRzLnJvdGF0ZUxlZnQgKyBcIi56b29tIFwiICsgbEdFdmVudHMuZmxpcEhvcml6b250YWwgKyBcIi56b29tIFwiICsgbEdFdmVudHMuZmxpcFZlcnRpY2FsICsgXCIuem9vbVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmNvcmUubGdPcGVuZWQgfHwgIV90aGlzLmlzSW1hZ2VTbGlkZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFBhZ2VDb3JkcygpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0Wm9vbUVzc2VudGlhbHMoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnpvb21JbWFnZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgem9vbSBvbiByZXNpemUgYW5kIG9yaWVudGF0aW9uY2hhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuJExHKHdpbmRvdykub24oXCJzY3JvbGwubGcuem9vbS5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmNvcmUubGdPcGVuZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2Nyb2xsVG9wID0gX3RoaXMuJExHKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuZ2V0RWxlbWVudEJ5SWQoJ2xnLXpvb20tb3V0Jykub24oJ2NsaWNrLmxnJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmNvcmUub3V0ZXIuZmluZCgnLmxnLWN1cnJlbnQgLmxnLWltYWdlJykuZ2V0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zY2FsZSAtPSBfdGhpcy5zZXR0aW5ncy5zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zY2FsZSA9IF90aGlzLmdldFNjYWxlKF90aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5iZWdpblpvb20oX3RoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnpvb21JbWFnZShfdGhpcy5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuZ2V0RWxlbWVudEJ5SWQoJ2xnLXpvb20taW4nKS5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy56b29tSW4oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5nZXRFbGVtZW50QnlJZCgnbGctYWN0dWFsLXNpemUnKS5vbignY2xpY2subGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRBY3R1YWxTaXplKF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYmVmb3JlT3BlbiArIFwiLnpvb21cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5maW5kKCcubGctaXRlbScpLnJlbW92ZUNsYXNzKCdsZy16b29tYWJsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYWZ0ZXJPcGVuICsgXCIuem9vbVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zY3JvbGxUb3AgPSBfdGhpcy4kTEcod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgaW5pdGlhbCB2YWx1ZSBjZW50ZXJcclxuICAgICAgICAgICAgICAgIF90aGlzLnBhZ2VYID0gX3RoaXMuY29yZS5vdXRlci53aWR0aCgpIC8gMjtcclxuICAgICAgICAgICAgICAgIF90aGlzLnBhZ2VZID0gX3RoaXMuY29yZS5vdXRlci5oZWlnaHQoKSAvIDIgKyBfdGhpcy5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBSZXNldCB6b29tIG9uIHNsaWRlIGNoYW5nZVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5hZnRlclNsaWRlICsgXCIuem9vbVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBldmVudC5kZXRhaWwucHJldkluZGV4O1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZXNldFpvb20ocHJldkluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc0ltYWdlU2xpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFpvb21Fc3NlbnRpYWxzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBEcmFnIG9wdGlvbiBhZnRlciB6b29tXHJcbiAgICAgICAgICAgIHRoaXMuem9vbURyYWcoKTtcclxuICAgICAgICAgICAgdGhpcy5waW5jaFpvb20oKTtcclxuICAgICAgICAgICAgdGhpcy56b29tU3dpcGUoKTtcclxuICAgICAgICAgICAgLy8gU3RvcmUgdGhlIHpvb21hYmxlIHRpbWVvdXQgdmFsdWUganVzdCB0byBjbGVhciBpdCB3aGlsZSBjbG9zaW5nXHJcbiAgICAgICAgICAgIHRoaXMuem9vbWFibGVUaW1lb3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS56b29tSW4gPSBmdW5jdGlvbiAoc2NhbGUpIHtcclxuICAgICAgICAgICAgLy8gQWxsb3cgem9vbSBvbmx5IG9uIGltYWdlXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0ltYWdlU2xpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSArPSB0aGlzLnNldHRpbmdzLnNjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NhbGUgPSB0aGlzLmdldFNjYWxlKHRoaXMuc2NhbGUpO1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luWm9vbSh0aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgdGhpcy56b29tSW1hZ2UodGhpcy5zY2FsZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBSZXNldCB6b29tIGVmZmVjdFxyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnJlc2V0Wm9vbSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLXpvb21lZCBsZy16b29tLWRyYWctdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICB2YXIgJGFjdHVhbFNpemUgPSB0aGlzLmNvcmUuZ2V0RWxlbWVudEJ5SWQoJ2xnLWFjdHVhbC1zaXplJyk7XHJcbiAgICAgICAgICAgIHZhciAkaXRlbSA9IHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0oaW5kZXggIT09IHVuZGVmaW5lZCA/IGluZGV4IDogdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgJGFjdHVhbFNpemVcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyh0aGlzLnNldHRpbmdzLmFjdHVhbFNpemVJY29ucy56b29tT3V0KVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuYWN0dWFsU2l6ZUljb25zLnpvb21Jbik7XHJcbiAgICAgICAgICAgICRpdGVtLmZpbmQoJy5sZy1pbWctd3JhcCcpLmZpcnN0KCkucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgJGl0ZW0uZmluZCgnLmxnLWltYWdlJykuZmlyc3QoKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgdGhpcy50b3AgPSAwO1xyXG4gICAgICAgICAgICAvLyBSZXNldCBwYWd4IHBhZ3kgdmFsdWVzIHRvIGNlbnRlclxyXG4gICAgICAgICAgICB0aGlzLnNldFBhZ2VDb3JkcygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuZ2V0VG91Y2hEaXN0YW5jZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoKGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIGUudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWCkgKlxyXG4gICAgICAgICAgICAgICAgKGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIGUudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWCkgK1xyXG4gICAgICAgICAgICAgICAgKGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIGUudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWSkgKlxyXG4gICAgICAgICAgICAgICAgICAgIChlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVkpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnBpbmNoWm9vbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHN0YXJ0RGlzdCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBwaW5jaFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGluaXRTY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIHZhciAkaXRlbSA9IHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLiRpbm5lci5vbigndG91Y2hzdGFydC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAkaXRlbSA9IF90aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKF90aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5pc0ltYWdlU2xpZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIV90aGlzLmNvcmUub3V0ZXIuaGFzQ2xhc3MoJ2xnLWZpcnN0LXNsaWRlLWxvYWRpbmcnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRTY2FsZSA9IF90aGlzLnNjYWxlIHx8IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5yZW1vdmVDbGFzcygnbGctem9vbS1kcmFnLXRyYW5zaXRpb24gbGctem9vbS1kcmFnZ2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPSAncGluY2gnO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGlzdCA9IF90aGlzLmdldFRvdWNoRGlzdGFuY2UoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJGlubmVyLm9uKCd0b3VjaG1vdmUubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDIgJiZcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLnRvdWNoQWN0aW9uID09PSAncGluY2gnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmREaXN0ID0gX3RoaXMuZ2V0VG91Y2hEaXN0YW5jZShlKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBzdGFydERpc3QgLSBlbmREaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGluY2hTdGFydGVkICYmIE1hdGguYWJzKGRpc3RhbmNlKSA+IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGluY2hTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpbmNoU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zY2FsZSA9IE1hdGgubWF4KDEsIGluaXRTY2FsZSArIC1kaXN0YW5jZSAqIDAuMDA4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuem9vbUltYWdlKF90aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuJGlubmVyLm9uKCd0b3VjaGVuZC5sZycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9PT0gJ3BpbmNoJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChfdGhpcy4kTEcoZS50YXJnZXQpLmhhc0NsYXNzKCdsZy1pdGVtJykgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpbmNoU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGlzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnNjYWxlIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVzZXRab29tKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zY2FsZSA9IF90aGlzLmdldFNjYWxlKF90aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuem9vbUltYWdlKF90aGlzLnNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctem9vbWVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUudG91Y2hlbmRab29tID0gZnVuY3Rpb24gKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMsIGFsbG93WCwgYWxsb3dZLCB0b3VjaER1cmF0aW9uLCByb3RhdGVWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VYbmV3ID0gZW5kQ29vcmRzLnggLSBzdGFydENvb3Jkcy54O1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VZbmV3ID0gZW5kQ29vcmRzLnkgLSBzdGFydENvb3Jkcy55O1xyXG4gICAgICAgICAgICB2YXIgc3BlZWRYID0gTWF0aC5hYnMoZGlzdGFuY2VYbmV3KSAvIHRvdWNoRHVyYXRpb24gKyAxO1xyXG4gICAgICAgICAgICB2YXIgc3BlZWRZID0gTWF0aC5hYnMoZGlzdGFuY2VZbmV3KSAvIHRvdWNoRHVyYXRpb24gKyAxO1xyXG4gICAgICAgICAgICBpZiAoc3BlZWRYID4gMikge1xyXG4gICAgICAgICAgICAgICAgc3BlZWRYICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNwZWVkWSA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHNwZWVkWSArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRpc3RhbmNlWG5ldyA9IGRpc3RhbmNlWG5ldyAqIHNwZWVkWDtcclxuICAgICAgICAgICAgZGlzdGFuY2VZbmV3ID0gZGlzdGFuY2VZbmV3ICogc3BlZWRZO1xyXG4gICAgICAgICAgICB2YXIgX0xHZWwgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctd3JhcCcpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0ge307XHJcbiAgICAgICAgICAgIGRpc3RhbmNlLnggPSB0aGlzLmxlZnQgKyBkaXN0YW5jZVhuZXcgKiB0aGlzLm1vZGlmaWVyWDtcclxuICAgICAgICAgICAgZGlzdGFuY2UueSA9IHRoaXMudG9wICsgZGlzdGFuY2VZbmV3ICogdGhpcy5tb2RpZmllclk7XHJcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZVN3aXBlQ29yZHMgPSB0aGlzLmdldFBvc3NpYmxlU3dpcGVEcmFnQ29yZHMocm90YXRlVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2VYbmV3KSA+IDE1IHx8IE1hdGguYWJzKGRpc3RhbmNlWW5ldykgPiAxNSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFsbG93WSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVUb3AoZGlzdGFuY2UueSwgcG9zc2libGVTd2lwZUNvcmRzLm1pblkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlQm90dG9tKGRpc3RhbmNlLnksIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS55ID0gcG9zc2libGVTd2lwZUNvcmRzLm1heFk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFsbG93WCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVMZWZ0KGRpc3RhbmNlLngsIHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS54ID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZVJpZ2h0KGRpc3RhbmNlLngsIHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZS54ID0gcG9zc2libGVTd2lwZUNvcmRzLm1heFg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFsbG93WSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9wID0gZGlzdGFuY2UueTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnkgPSB0aGlzLnRvcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbGxvd1gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnQgPSBkaXN0YW5jZS54O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9IHRoaXMubGVmdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Wm9vbVN3aXBlU3R5bGVzKF9MR2VsLCBkaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldFpvb21Td2lwZUNvcmRzID0gZnVuY3Rpb24gKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMsIGFsbG93WCwgYWxsb3dZLCBwb3NzaWJsZVN3aXBlQ29yZHMpIHtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0ge307XHJcbiAgICAgICAgICAgIGlmIChhbGxvd1kpIHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlLnkgPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9wICsgKGVuZENvb3Jkcy55IC0gc3RhcnRDb29yZHMueSkgKiB0aGlzLm1vZGlmaWVyWTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQmV5b25kUG9zc2libGVUb3AoZGlzdGFuY2UueSwgcG9zc2libGVTd2lwZUNvcmRzLm1pblkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmZNaW5ZID0gcG9zc2libGVTd2lwZUNvcmRzLm1pblkgLSBkaXN0YW5jZS55O1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlLnkgPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWSAtIGRpZmZNaW5ZIC8gNjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNCZXlvbmRQb3NzaWJsZUJvdHRvbShkaXN0YW5jZS55LCBwb3NzaWJsZVN3aXBlQ29yZHMubWF4WSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZk1heFkgPSBkaXN0YW5jZS55IC0gcG9zc2libGVTd2lwZUNvcmRzLm1heFk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueSA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhZICsgZGlmZk1heFkgLyA2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UueSA9IHRoaXMudG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbGxvd1gpIHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbmNlLnggPVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdCArIChlbmRDb29yZHMueCAtIHN0YXJ0Q29vcmRzLngpICogdGhpcy5tb2RpZmllclg7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlTGVmdChkaXN0YW5jZS54LCBwb3NzaWJsZVN3aXBlQ29yZHMubWluWCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZk1pblggPSBwb3NzaWJsZVN3aXBlQ29yZHMubWluWCAtIGRpc3RhbmNlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5taW5YIC0gZGlmZk1pblggLyA2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0JleW9uZFBvc3NpYmxlUmlnaHQoZGlzdGFuY2UueCwgcG9zc2libGVTd2lwZUNvcmRzLm1heFgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZk1heFggPSBkaXN0YW5jZS54IC0gcG9zc2libGVTd2lwZUNvcmRzLm1heFg7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UueCA9IHBvc3NpYmxlU3dpcGVDb3Jkcy5tYXhYICsgZGlmTWF4WCAvIDY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZS54ID0gdGhpcy5sZWZ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmlzQmV5b25kUG9zc2libGVMZWZ0ID0gZnVuY3Rpb24gKHgsIG1pblgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHggPj0gbWluWDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmlzQmV5b25kUG9zc2libGVSaWdodCA9IGZ1bmN0aW9uICh4LCBtYXhYKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4IDw9IG1heFg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5pc0JleW9uZFBvc3NpYmxlVG9wID0gZnVuY3Rpb24gKHksIG1pblkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHkgPj0gbWluWTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmlzQmV5b25kUG9zc2libGVCb3R0b20gPSBmdW5jdGlvbiAoeSwgbWF4WSkge1xyXG4gICAgICAgICAgICByZXR1cm4geSA8PSBtYXhZO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgWm9vbS5wcm90b3R5cGUuaXNJbWFnZVNsaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW3RoaXMuY29yZS5pbmRleF07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvcmUuZ2V0U2xpZGVUeXBlKGN1cnJlbnRJdGVtKSA9PT0gJ2ltYWdlJztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLmdldFBvc3NpYmxlU3dpcGVEcmFnQ29yZHMgPSBmdW5jdGlvbiAocm90YXRlVmFsdWUsIHNjYWxlKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhU2NhbGUgPSBzY2FsZSB8fCB0aGlzLnNjYWxlIHx8IDE7XHJcbiAgICAgICAgICAgIHZhciBlbERhdGFTY2FsZSA9IE1hdGguYWJzKGRhdGFTY2FsZSk7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IHRoaXMuY29yZS5tZWRpYUNvbnRhaW5lclBvc2l0aW9uLCB0b3AgPSBfYS50b3AsIGJvdHRvbSA9IF9hLmJvdHRvbTtcclxuICAgICAgICAgICAgdmFyIHRvcEJvdHRvbVNwYWNpbmcgPSBNYXRoLmFicyh0b3AgLSBib3R0b20pIC8gMjtcclxuICAgICAgICAgICAgdmFyIG1pblkgPSAodGhpcy5pbWFnZVlTaXplIC0gdGhpcy5jb250YWluZXJSZWN0LmhlaWdodCkgLyAyICtcclxuICAgICAgICAgICAgICAgIHRvcEJvdHRvbVNwYWNpbmcgKiB0aGlzLm1vZGlmaWVyWDtcclxuICAgICAgICAgICAgdmFyIG1heFkgPSB0aGlzLmNvbnRhaW5lclJlY3QuaGVpZ2h0IC0gdGhpcy5pbWFnZVlTaXplICogZWxEYXRhU2NhbGUgKyBtaW5ZO1xyXG4gICAgICAgICAgICB2YXIgbWluWCA9ICh0aGlzLmltYWdlWFNpemUgLSB0aGlzLmNvbnRhaW5lclJlY3Qud2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgdmFyIG1heFggPSB0aGlzLmNvbnRhaW5lclJlY3Qud2lkdGggLSB0aGlzLmltYWdlWFNpemUgKiBlbERhdGFTY2FsZSArIG1pblg7XHJcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZVN3aXBlQ29yZHMgPSB7XHJcbiAgICAgICAgICAgICAgICBtaW5ZOiBtaW5ZLFxyXG4gICAgICAgICAgICAgICAgbWF4WTogbWF4WSxcclxuICAgICAgICAgICAgICAgIG1pblg6IG1pblgsXHJcbiAgICAgICAgICAgICAgICBtYXhYOiBtYXhYLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMocm90YXRlVmFsdWUpID09PSA5MCkge1xyXG4gICAgICAgICAgICAgICAgcG9zc2libGVTd2lwZUNvcmRzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblk6IG1pblgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WTogbWF4WCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5YOiBtaW5ZLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFg6IG1heFksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwb3NzaWJsZVN3aXBlQ29yZHM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5zZXRab29tU3dpcGVTdHlsZXMgPSBmdW5jdGlvbiAoTEdlbCwgZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgTEdlbC5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgZGlzdGFuY2UueCArICdweCwgJyArIGRpc3RhbmNlLnkgKyAncHgsIDApJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS56b29tU3dpcGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzdGFydENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgZW5kQ29vcmRzID0ge307XHJcbiAgICAgICAgICAgIHZhciBpc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIEFsbG93IHggZGlyZWN0aW9uIGRyYWdcclxuICAgICAgICAgICAgdmFyIGFsbG93WCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBBbGxvdyBZIGRpcmVjdGlvbiBkcmFnXHJcbiAgICAgICAgICAgIHZhciBhbGxvd1kgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBlbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIHBvc3NpYmxlU3dpcGVDb3JkcztcclxuICAgICAgICAgICAgdmFyIF9MR2VsO1xyXG4gICAgICAgICAgICB2YXIgJGl0ZW0gPSB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kaW5uZXIub24oJ3RvdWNoc3RhcnQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgem9vbSBvbmx5IG9uIGltYWdlXHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmlzSW1hZ2VTbGlkZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJGl0ZW0gPSBfdGhpcy5jb3JlLmdldFNsaWRlSXRlbShfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmICgoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEgJiZcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmhhc0NsYXNzKCdsZy16b29tZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPSAnem9vbVN3aXBlJztcclxuICAgICAgICAgICAgICAgICAgICBfTEdlbCA9IF90aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbShfdGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy13cmFwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRyYWdBbGxvd2VkQXhpc2VzID0gX3RoaXMuZ2V0RHJhZ0FsbG93ZWRBeGlzZXMoTWF0aC5hYnMoX3RoaXMucm90YXRlVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1kgPSBkcmFnQWxsb3dlZEF4aXNlcy5hbGxvd1k7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dYID0gZHJhZ0FsbG93ZWRBeGlzZXMuYWxsb3dYO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxvd1ggfHwgYWxsb3dZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29vcmRzID0gX3RoaXMuZ2V0U3dpcGVDb3JkcyhlLCBNYXRoLmFicyhfdGhpcy5yb3RhdGVWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwb3NzaWJsZVN3aXBlQ29yZHMgPSBfdGhpcy5nZXRQb3NzaWJsZVN3aXBlRHJhZ0NvcmRzKF90aGlzLnJvdGF0ZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZXNldCBvcGFjaXR5IGFuZCB0cmFuc2l0aW9uIGR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlci5hZGRDbGFzcygnbGctem9vbS1kcmFnZ2luZyBsZy16b29tLWRyYWctdHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLiRpbm5lci5vbigndG91Y2htb3ZlLmxnJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9PT0gJ3pvb21Td2lwZScgJiZcclxuICAgICAgICAgICAgICAgICAgICAoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpdGVtLmdldCgpLmNvbnRhaW5zKGUudGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9ICd6b29tU3dpcGUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZENvb3JkcyA9IF90aGlzLmdldFN3aXBlQ29yZHMoZSwgTWF0aC5hYnMoX3RoaXMucm90YXRlVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBfdGhpcy5nZXRab29tU3dpcGVDb3JkcyhzdGFydENvb3JkcywgZW5kQ29vcmRzLCBhbGxvd1gsIGFsbG93WSwgcG9zc2libGVTd2lwZUNvcmRzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZW5kQ29vcmRzLnggLSBzdGFydENvb3Jkcy54KSA+IDE1IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKGVuZENvb3Jkcy55IC0gc3RhcnRDb29yZHMueSkgPiAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0Wm9vbVN3aXBlU3R5bGVzKF9MR2VsLCBkaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLiRpbm5lci5vbigndG91Y2hlbmQubGcnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmNvcmUudG91Y2hBY3Rpb24gPT09ICd6b29tU3dpcGUnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKF90aGlzLiRMRyhlLnRhcmdldCkuaGFzQ2xhc3MoJ2xnLWl0ZW0nKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaXRlbS5nZXQoKS5jb250YWlucyhlLnRhcmdldCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS50b3VjaEFjdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc01vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaER1cmF0aW9uID0gZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRvdWNoZW5kWm9vbShzdGFydENvb3JkcywgZW5kQ29vcmRzLCBhbGxvd1gsIGFsbG93WSwgdG91Y2hEdXJhdGlvbiwgX3RoaXMucm90YXRlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFpvb20ucHJvdG90eXBlLnpvb21EcmFnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRDb29yZHMgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGVuZENvb3JkcyA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBBbGxvdyB4IGRpcmVjdGlvbiBkcmFnXHJcbiAgICAgICAgICAgIHZhciBhbGxvd1ggPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gQWxsb3cgWSBkaXJlY3Rpb24gZHJhZ1xyXG4gICAgICAgICAgICB2YXIgYWxsb3dZID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBzdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHZhciBlbmRUaW1lO1xyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVTd2lwZUNvcmRzO1xyXG4gICAgICAgICAgICB2YXIgX0xHZWw7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlci5vbignbW91c2Vkb3duLmxnLnpvb20nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxsb3cgem9vbSBvbmx5IG9uIGltYWdlXHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmlzSW1hZ2VTbGlkZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyICRpdGVtID0gX3RoaXMuY29yZS5nZXRTbGlkZUl0ZW0oX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctaXRlbScpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW0uZ2V0KCkuY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBfTEdlbCA9IF90aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbShfdGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy13cmFwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpcnN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRyYWdBbGxvd2VkQXhpc2VzID0gX3RoaXMuZ2V0RHJhZ0FsbG93ZWRBeGlzZXMoTWF0aC5hYnMoX3RoaXMucm90YXRlVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1kgPSBkcmFnQWxsb3dlZEF4aXNlcy5hbGxvd1k7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dYID0gZHJhZ0FsbG93ZWRBeGlzZXMuYWxsb3dYO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb3JlLm91dGVyLmhhc0NsYXNzKCdsZy16b29tZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuJExHKGUudGFyZ2V0KS5oYXNDbGFzcygnbGctb2JqZWN0JykgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbGxvd1ggfHwgYWxsb3dZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMgPSBfdGhpcy5nZXREcmFnQ29yZHMoZSwgTWF0aC5hYnMoX3RoaXMucm90YXRlVmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3NpYmxlU3dpcGVDb3JkcyA9IF90aGlzLmdldFBvc3NpYmxlU3dpcGVEcmFnQ29yZHMoX3RoaXMucm90YXRlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAqKiBGaXggZm9yIHdlYmtpdCBjdXJzb3IgaXNzdWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI2NzIzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLmdldCgpLnNjcm9sbExlZnQgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIuZ2V0KCkuc2Nyb2xsTGVmdCAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGctZ3JhYicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsZy1ncmFiYmluZyBsZy16b29tLWRyYWctdHJhbnNpdGlvbiBsZy16b29tLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZXNldCBvcGFjaXR5IGFuZCB0cmFuc2l0aW9uIGR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9uKFwibW91c2Vtb3ZlLmxnLnpvb20uZ2xvYmFsXCIgKyB0aGlzLmNvcmUubGdJZCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0RyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kQ29vcmRzID0gX3RoaXMuZ2V0RHJhZ0NvcmRzKGUsIE1hdGguYWJzKF90aGlzLnJvdGF0ZVZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gX3RoaXMuZ2V0Wm9vbVN3aXBlQ29yZHMoc3RhcnRDb29yZHMsIGVuZENvb3JkcywgYWxsb3dYLCBhbGxvd1ksIHBvc3NpYmxlU3dpcGVDb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0Wm9vbVN3aXBlU3R5bGVzKF9MR2VsLCBkaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRMRyh3aW5kb3cpLm9uKFwibW91c2V1cC5sZy56b29tLmdsb2JhbFwiICsgdGhpcy5jb3JlLmxnSWQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLm91dGVyLnJlbW92ZUNsYXNzKCdsZy16b29tLWRyYWdnaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRml4IGZvciBjaHJvbWUgbW91c2UgbW92ZSBvbiBjbGlja1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01vdmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChzdGFydENvb3Jkcy54ICE9PSBlbmRDb29yZHMueCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRDb29yZHMueSAhPT0gZW5kQ29vcmRzLnkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZENvb3JkcyA9IF90aGlzLmdldERyYWdDb3JkcyhlLCBNYXRoLmFicyhfdGhpcy5yb3RhdGVWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hEdXJhdGlvbiA9IGVuZFRpbWUudmFsdWVPZigpIC0gc3RhcnRUaW1lLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMudG91Y2hlbmRab29tKHN0YXJ0Q29vcmRzLCBlbmRDb29yZHMsIGFsbG93WCwgYWxsb3dZLCB0b3VjaER1cmF0aW9uLCBfdGhpcy5yb3RhdGVWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcmUub3V0ZXIucmVtb3ZlQ2xhc3MoJ2xnLWdyYWJiaW5nJykuYWRkQ2xhc3MoJ2xnLWdyYWInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5jbG9zZUdhbGxlcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRab29tKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBab29tLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBVbmJpbmQgYWxsIGV2ZW50cyBhZGRlZCBieSBsaWdodEdhbGxlcnkgem9vbSBwbHVnaW5cclxuICAgICAgICAgICAgdGhpcy4kTEcod2luZG93KS5vZmYoXCIubGcuem9vbS5nbG9iYWxcIiArIHRoaXMuY29yZS5sZ0lkKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcubGcuem9vbScpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy56b29tJyk7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnpvb21hYmxlVGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMuem9vbWFibGVUaW1lb3V0ID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gWm9vbTtcclxuICAgIH0oKSk7XG5cbiAgICByZXR1cm4gWm9vbTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxnLXpvb20udW1kLmpzLm1hcFxuIiwiLyohXG4gKiBsaWdodGdhbGxlcnkgfCAyLjQuMC1iZXRhLjAgfCBEZWNlbWJlciAxMnRoIDIwMjFcbiAqIGh0dHA6Ly93d3cubGlnaHRnYWxsZXJ5anMuY29tL1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFNhY2hpbiBOZXJhdmF0aDtcbiAqIEBsaWNlbnNlIEdQTHYzXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwubGdWaWRlbyA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG4gICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbiAgICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG4gICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG4gICAgUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbiAgICBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuICAgIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcbiAgICBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xuXG4gICAgdmFyIHZpZGVvU2V0dGluZ3MgPSB7XHJcbiAgICAgICAgYXV0b3BsYXlGaXJzdFZpZGVvOiB0cnVlLFxyXG4gICAgICAgIHlvdVR1YmVQbGF5ZXJQYXJhbXM6IGZhbHNlLFxyXG4gICAgICAgIHZpbWVvUGxheWVyUGFyYW1zOiBmYWxzZSxcclxuICAgICAgICB3aXN0aWFQbGF5ZXJQYXJhbXM6IGZhbHNlLFxyXG4gICAgICAgIGdvdG9OZXh0U2xpZGVPblZpZGVvRW5kOiB0cnVlLFxyXG4gICAgICAgIGF1dG9wbGF5VmlkZW9PblNsaWRlOiBmYWxzZSxcclxuICAgICAgICB2aWRlb2pzOiBmYWxzZSxcclxuICAgICAgICB2aWRlb2pzT3B0aW9uczoge30sXHJcbiAgICB9O1xuXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIGxpZ2h0R2FsbGVyeSBldmVudHNcclxuICAgICAqIEFsbCBldmVudHMgc2hvdWxkIGJlIGRvY3VtZW50ZWQgaGVyZVxyXG4gICAgICogQmVsb3cgaW50ZXJmYWNlcyBhcmUgdXNlZCB0byBidWlsZCB0aGUgd2Vic2l0ZSBkb2N1bWVudGF0aW9uc1xyXG4gICAgICogKi9cclxuICAgIHZhciBsR0V2ZW50cyA9IHtcclxuICAgICAgICBhZnRlckFwcGVuZFNsaWRlOiAnbGdBZnRlckFwcGVuZFNsaWRlJyxcclxuICAgICAgICBpbml0OiAnbGdJbml0JyxcclxuICAgICAgICBoYXNWaWRlbzogJ2xnSGFzVmlkZW8nLFxyXG4gICAgICAgIGNvbnRhaW5lclJlc2l6ZTogJ2xnQ29udGFpbmVyUmVzaXplJyxcclxuICAgICAgICB1cGRhdGVTbGlkZXM6ICdsZ1VwZGF0ZVNsaWRlcycsXHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTdWJIdG1sOiAnbGdBZnRlckFwcGVuZFN1Ykh0bWwnLFxyXG4gICAgICAgIGJlZm9yZU9wZW46ICdsZ0JlZm9yZU9wZW4nLFxyXG4gICAgICAgIGFmdGVyT3BlbjogJ2xnQWZ0ZXJPcGVuJyxcclxuICAgICAgICBzbGlkZUl0ZW1Mb2FkOiAnbGdTbGlkZUl0ZW1Mb2FkJyxcclxuICAgICAgICBiZWZvcmVTbGlkZTogJ2xnQmVmb3JlU2xpZGUnLFxyXG4gICAgICAgIGFmdGVyU2xpZGU6ICdsZ0FmdGVyU2xpZGUnLFxyXG4gICAgICAgIHBvc3RlckNsaWNrOiAnbGdQb3N0ZXJDbGljaycsXHJcbiAgICAgICAgZHJhZ1N0YXJ0OiAnbGdEcmFnU3RhcnQnLFxyXG4gICAgICAgIGRyYWdNb3ZlOiAnbGdEcmFnTW92ZScsXHJcbiAgICAgICAgZHJhZ0VuZDogJ2xnRHJhZ0VuZCcsXHJcbiAgICAgICAgYmVmb3JlTmV4dFNsaWRlOiAnbGdCZWZvcmVOZXh0U2xpZGUnLFxyXG4gICAgICAgIGJlZm9yZVByZXZTbGlkZTogJ2xnQmVmb3JlUHJldlNsaWRlJyxcclxuICAgICAgICBiZWZvcmVDbG9zZTogJ2xnQmVmb3JlQ2xvc2UnLFxyXG4gICAgICAgIGFmdGVyQ2xvc2U6ICdsZ0FmdGVyQ2xvc2UnLFxyXG4gICAgICAgIHJvdGF0ZUxlZnQ6ICdsZ1JvdGF0ZUxlZnQnLFxyXG4gICAgICAgIHJvdGF0ZVJpZ2h0OiAnbGdSb3RhdGVSaWdodCcsXHJcbiAgICAgICAgZmxpcEhvcml6b250YWw6ICdsZ0ZsaXBIb3Jpem9udGFsJyxcclxuICAgICAgICBmbGlwVmVydGljYWw6ICdsZ0ZsaXBWZXJ0aWNhbCcsXHJcbiAgICAgICAgYXV0b3BsYXk6ICdsZ0F1dG9wbGF5JyxcclxuICAgICAgICBhdXRvcGxheVN0YXJ0OiAnbGdBdXRvcGxheVN0YXJ0JyxcclxuICAgICAgICBhdXRvcGxheVN0b3A6ICdsZ0F1dG9wbGF5U3RvcCcsXHJcbiAgICB9O1xuXG4gICAgdmFyIHBhcmFtID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopXHJcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpba10pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5qb2luKCcmJyk7XHJcbiAgICB9O1xyXG4gICAgdmFyIGdldFZpbWVvVVJMUGFyYW1zID0gZnVuY3Rpb24gKGRlZmF1bHRQYXJhbXMsIHZpZGVvSW5mbykge1xyXG4gICAgICAgIGlmICghdmlkZW9JbmZvIHx8ICF2aWRlb0luZm8udmltZW8pXHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB2YXIgdXJsUGFyYW1zID0gdmlkZW9JbmZvLnZpbWVvWzJdIHx8ICcnO1xyXG4gICAgICAgIHVybFBhcmFtcyA9XHJcbiAgICAgICAgICAgIHVybFBhcmFtc1swXSA9PSAnPycgPyAnJicgKyB1cmxQYXJhbXMuc2xpY2UoMSkgOiB1cmxQYXJhbXMgfHwgJyc7XHJcbiAgICAgICAgdmFyIGRlZmF1bHRQbGF5ZXJQYXJhbXMgPSBkZWZhdWx0UGFyYW1zXHJcbiAgICAgICAgICAgID8gJyYnICsgcGFyYW0oZGVmYXVsdFBhcmFtcylcclxuICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAvLyBGb3IgdmltZW8gbGFzdCBwYXJtcyBnZXRzIHByaW9yaXR5IGlmIGR1cGxpY2F0ZXMgZm91bmRcclxuICAgICAgICB2YXIgdmltZW9QbGF5ZXJQYXJhbXMgPSBcIj9hdXRvcGxheT0wJm11dGVkPTFcIiArIGRlZmF1bHRQbGF5ZXJQYXJhbXMgKyB1cmxQYXJhbXM7XHJcbiAgICAgICAgcmV0dXJuIHZpbWVvUGxheWVyUGFyYW1zO1xyXG4gICAgfTtcblxuICAgIC8qKlxyXG4gICAgICogVmlkZW8gbW9kdWxlIGZvciBsaWdodEdhbGxlcnlcclxuICAgICAqIFN1cHBvcnRzIEhUTUw1LCBZb3VUdWJlLCBWaW1lbywgd2lzdGlhIHZpZGVvc1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBAcmVmIFdpc3RpYVxyXG4gICAgICogaHR0cHM6Ly93aXN0aWEuY29tL3N1cHBvcnQvaW50ZWdyYXRpb25zL3dvcmRwcmVzcyhIb3cgdG8gZ2V0IHVybClcclxuICAgICAqIGh0dHBzOi8vd2lzdGlhLmNvbS9zdXBwb3J0L2RldmVsb3BlcnMvZW1iZWQtb3B0aW9ucyN1c2luZy1lbWJlZC1vcHRpb25zXHJcbiAgICAgKiBodHRwczovL3dpc3RpYS5jb20vc3VwcG9ydC9kZXZlbG9wZXJzL3BsYXllci1hcGlcclxuICAgICAqIGh0dHBzOi8vd2lzdGlhLmNvbS9zdXBwb3J0L2RldmVsb3BlcnMvY29uc3RydWN0LWFuLWVtYmVkLWNvZGVcclxuICAgICAqIGh0dHA6Ly9qc2ZpZGRsZS5uZXQveHZubTd4TG0vXHJcbiAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvdmlkZW9cclxuICAgICAqIGh0dHBzOi8vd2lzdGlhLmNvbS9zdXBwb3J0L2VtYmVkLWFuZC1zaGFyZS9zaGFyaW5nLXZpZGVvc1xyXG4gICAgICogaHR0cHM6Ly9wcml2YXRlLXNoYXJpbmcud2lzdGlhLmNvbS9tZWRpYXMvbXdocnVscnVjalxyXG4gICAgICpcclxuICAgICAqIEByZWYgWW91dHViZVxyXG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9wbGF5ZXJfcGFyYW1ldGVycyNlbmFibGVqc2FwaVxyXG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZVxyXG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9ibG9nL2F1dG9wbGF5LyNpZnJhbWUtZGVsZWdhdGlvblxyXG4gICAgICpcclxuICAgICAqIEByZWYgVmltZW9cclxuICAgICAqIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNDg4OTQzL2Vhc3ktd2F5LXRvLWdldC12aW1lby1pZC1mcm9tLWEtdmltZW8tdXJsXHJcbiAgICAgKiBodHRwczovL3ZpbWVvLnplbmRlc2suY29tL2hjL2VuLXVzL2FydGljbGVzLzM2MDAwMDEyMTY2OC1TdGFydGluZy1wbGF5YmFjay1hdC1hLXNwZWNpZmljLXRpbWVjb2RlXHJcbiAgICAgKiBodHRwczovL3ZpbWVvLnplbmRlc2suY29tL2hjL2VuLXVzL2FydGljbGVzLzM2MDAwMTQ5NDQ0Ny1Vc2luZy1QbGF5ZXItUGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICB2YXIgVmlkZW8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gVmlkZW8oaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IGxpZ2h0R2FsbGVyeSBjb3JlIHBsdWdpbiBpbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUgPSBpbnN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCB2aWRlb1NldHRpbmdzKSwgdGhpcy5jb3JlLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRXZlbnQgdHJpZ2dlcmVkIHdoZW4gdmlkZW8gdXJsIGZvdW5kIHdpdGhvdXQgcG9zdGVyXHJcbiAgICAgICAgICAgICAqIEFwcGVuZCB2aWRlbyBIVE1MXHJcbiAgICAgICAgICAgICAqIFBsYXkgaWYgYXV0b3BsYXlGaXJzdFZpZGVvIGlzIHRydWVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmhhc1ZpZGVvICsgXCIudmlkZW9cIiwgdGhpcy5vbkhhc1ZpZGVvLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5wb3N0ZXJDbGljayArIFwiLnZpZGVvXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkZWwgPSBfdGhpcy5jb3JlLmdldFNsaWRlSXRlbShfdGhpcy5jb3JlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvYWRWaWRlb09uUG9zdGVyQ2xpY2soJGVsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLnNsaWRlSXRlbUxvYWQgKyBcIi52aWRlb1wiLCB0aGlzLm9uU2xpZGVJdGVtTG9hZC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgLy8gQGRlc2MgZmlyZWQgaW1tZWRpYXRlbHkgYmVmb3JlIGVhY2ggc2xpZGUgdHJhbnNpdGlvbi5cclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYmVmb3JlU2xpZGUgKyBcIi52aWRlb1wiLCB0aGlzLm9uQmVmb3JlU2xpZGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vIEBkZXNjIGZpcmVkIGltbWVkaWF0ZWx5IGFmdGVyIGVhY2ggc2xpZGUgdHJhbnNpdGlvbi5cclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub24obEdFdmVudHMuYWZ0ZXJTbGlkZSArIFwiLnZpZGVvXCIsIHRoaXMub25BZnRlclNsaWRlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgRXZlbnQgdHJpZ2dlcmVkIHdoZW4gYSBzbGlkZSBpcyBjb21wbGV0ZWx5IGxvYWRlZFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBsaWdodEdhbGxleSBjdXN0b20gZXZlbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUub25TbGlkZUl0ZW1Mb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IGV2ZW50LmRldGFpbCwgaXNGaXJzdFNsaWRlID0gX2EuaXNGaXJzdFNsaWRlLCBpbmRleCA9IF9hLmluZGV4O1xyXG4gICAgICAgICAgICAvLyBTaG91bGQgY2hlY2sgdGhlIGFjdGl2ZSBzbGlkZSBhcyB3ZWxsIGFzIHVzZXIgbWF5IGhhdmUgbW92ZWQgdG8gZGlmZmVyZW50IHNsaWRlIGJlZm9yZSB0aGUgZmlyc3Qgc2xpZGUgaXMgbG9hZGVkXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmF1dG9wbGF5Rmlyc3RWaWRlbyAmJlxyXG4gICAgICAgICAgICAgICAgaXNGaXJzdFNsaWRlICYmXHJcbiAgICAgICAgICAgICAgICBpbmRleCA9PT0gdGhpcy5jb3JlLmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEZWxheSBpcyBqdXN0IGZvciB0aGUgdHJhbnNpdGlvbiBlZmZlY3Qgb24gdmlkZW8gbG9hZFxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9hZEFuZFBsYXlWaWRlbyhpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNob3VsZCBub3QgY2FsbCBvbiBmaXJzdCBzbGlkZS4gc2hvdWxkIGNoZWNrIG9ubHkgaWYgdGhlIHNsaWRlIGlzIGFjdGl2ZVxyXG4gICAgICAgICAgICBpZiAoIWlzRmlyc3RTbGlkZSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5hdXRvcGxheVZpZGVvT25TbGlkZSAmJlxyXG4gICAgICAgICAgICAgICAgaW5kZXggPT09IHRoaXMuY29yZS5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQW5kUGxheVZpZGVvKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQGRlc2MgRXZlbnQgdHJpZ2dlcmVkIHdoZW4gdmlkZW8gdXJsIG9yIHBvc3RlciBmb3VuZFxyXG4gICAgICAgICAqIEFwcGVuZCB2aWRlbyBIVE1MIGlzIHBvc3RlciBpcyBub3QgZ2l2ZW5cclxuICAgICAgICAgKiBQbGF5IGlmIGF1dG9wbGF5Rmlyc3RWaWRlbyBpcyB0cnVlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEphdmFzY3JpcHQgRXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5vbkhhc1ZpZGVvID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IGV2ZW50LmRldGFpbCwgaW5kZXggPSBfYS5pbmRleCwgc3JjID0gX2Euc3JjLCBodG1sNVZpZGVvID0gX2EuaHRtbDVWaWRlbywgaGFzUG9zdGVyID0gX2EuaGFzUG9zdGVyO1xyXG4gICAgICAgICAgICBpZiAoIWhhc1Bvc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgLy8gQWxsIGZ1bmN0aW9ucyBhcmUgY2FsbGVkIHNlcGFyYXRlbHkgaWYgcG9zdGVyIGV4aXN0IGluIGxvYWRWaWRlb09uUG9zdGVyQ2xpY2sgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kVmlkZW9zKHRoaXMuY29yZS5nZXRTbGlkZUl0ZW0oaW5kZXgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBzcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3M6ICdsZy1vYmplY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBodG1sNVZpZGVvOiBodG1sNVZpZGVvLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IG5hdmlnYXRlIHRvIG5leHQgc2xpZGUgb25jZSB2aWRlbyByZWFjaGVzIHRoZSBlbmQuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvdG9OZXh0U2xpZGVPblZpZGVvRW5kKHNyYywgaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyBmaXJlZCBpbW1lZGlhdGVseSBiZWZvcmUgZWFjaCBzbGlkZSB0cmFuc2l0aW9uLlxyXG4gICAgICAgICAqIFBhdXNlIHRoZSBwcmV2aW91cyB2aWRlb1xyXG4gICAgICAgICAqIEhpZGUgdGhlIGRvd25sb2FkIGJ1dHRvbiBpZiB0aGUgc2xpZGUgY29udGFpbnMgWW91VHViZSwgVmltZW8sIG9yIFdpc3RpYSB2aWRlb3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEphdmFzY3JpcHQgRXZlbnQgb2JqZWN0LlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcmV2SW5kZXggLSBQcmV2aW91cyBpbmRleCBvZiB0aGUgc2xpZGUuXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gQ3VycmVudCBpbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUub25CZWZvcmVTbGlkZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb3JlLmxHYWxsZXJ5T24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2SW5kZXggPSBldmVudC5kZXRhaWwucHJldkluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZVZpZGVvKHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBkZXNjIGZpcmVkIGltbWVkaWF0ZWx5IGFmdGVyIGVhY2ggc2xpZGUgdHJhbnNpdGlvbi5cclxuICAgICAgICAgKiBQbGF5IHZpZGVvIGlmIGF1dG9wbGF5VmlkZW9PblNsaWRlIG9wdGlvbiBpcyBlbmFibGVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBKYXZhc2NyaXB0IEV2ZW50IG9iamVjdC5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJldkluZGV4IC0gUHJldmlvdXMgaW5kZXggb2YgdGhlIHNsaWRlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEN1cnJlbnQgaW5kZXggb2YgdGhlIHNsaWRlXHJcbiAgICAgICAgICogQHRvZG8gc2hvdWxkIGNoZWNrIG9uIG9uU2xpZGVMb2FkIGFzIHdlbGwgaWYgdmlkZW8gaXMgbm90IGxvYWRlZCBvbiBhZnRlciBzbGlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5vbkFmdGVyU2xpZGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIF9hID0gZXZlbnQuZGV0YWlsLCBpbmRleCA9IF9hLmluZGV4LCBwcmV2SW5kZXggPSBfYS5wcmV2SW5kZXg7XHJcbiAgICAgICAgICAgIC8vIERvIG5vdCBjYWxsIG9uIGZpcnN0IHNsaWRlXHJcbiAgICAgICAgICAgIHZhciAkc2xpZGUgPSB0aGlzLmNvcmUuZ2V0U2xpZGVJdGVtKGluZGV4KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0b3BsYXlWaWRlb09uU2xpZGUgJiYgaW5kZXggIT09IHByZXZJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzbGlkZS5oYXNDbGFzcygnbGctY29tcGxldGUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkQW5kUGxheVZpZGVvKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBWaWRlby5wcm90b3R5cGUubG9hZEFuZFBsYXlWaWRlbyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICB2YXIgJHNsaWRlID0gdGhpcy5jb3JlLmdldFNsaWRlSXRlbShpbmRleCk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRHYWxsZXJ5SXRlbS5wb3N0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFZpZGVvT25Qb3N0ZXJDbGljaygkc2xpZGUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5VmlkZW8oaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQbGF5IEhUTUw1LCBZb3V0dWJlLCBWaW1lbyBvciBXaXN0aWEgdmlkZW9zIGluIGEgcGFydGljdWxhciBzbGlkZS5cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBJbmRleCBvZiB0aGUgc2xpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlby5wcm90b3R5cGUucGxheVZpZGVvID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbFZpZGVvKGluZGV4LCAncGxheScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGF1c2UgSFRNTDUsIFlvdXR1YmUsIFZpbWVvIG9yIFdpc3RpYSB2aWRlb3MgaW4gYSBwYXJ0aWN1bGFyIHNsaWRlLlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIEluZGV4IG9mIHRoZSBzbGlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5wYXVzZVZpZGVvID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbFZpZGVvKGluZGV4LCAncGF1c2UnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFZpZGVvLnByb3RvdHlwZS5nZXRWaWRlb0h0bWwgPSBmdW5jdGlvbiAoc3JjLCBhZGRDbGFzcywgaW5kZXgsIGh0bWw1VmlkZW8pIHtcclxuICAgICAgICAgICAgdmFyIHZpZGVvID0gJyc7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb0luZm8gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgLl9fc2xpZGVWaWRlb0luZm8gfHwge307XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50R2FsbGVyeUl0ZW0gPSB0aGlzLmNvcmUuZ2FsbGVyeUl0ZW1zW2luZGV4XTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvVGl0bGUgPSBjdXJyZW50R2FsbGVyeUl0ZW0udGl0bGUgfHwgY3VycmVudEdhbGxlcnlJdGVtLmFsdDtcclxuICAgICAgICAgICAgdmlkZW9UaXRsZSA9IHZpZGVvVGl0bGUgPyAndGl0bGU9XCInICsgdmlkZW9UaXRsZSArICdcIicgOiAnJztcclxuICAgICAgICAgICAgdmFyIGNvbW1vbklmcmFtZVByb3BzID0gXCJhbGxvd3RyYW5zcGFyZW5jeT1cXFwidHJ1ZVxcXCJcXG4gICAgICAgICAgICBmcmFtZWJvcmRlcj1cXFwiMFxcXCJcXG4gICAgICAgICAgICBzY3JvbGxpbmc9XFxcIm5vXFxcIlxcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlblxcbiAgICAgICAgICAgIG1vemFsbG93ZnVsbHNjcmVlblxcbiAgICAgICAgICAgIHdlYmtpdGFsbG93ZnVsbHNjcmVlblxcbiAgICAgICAgICAgIG9hbGxvd2Z1bGxzY3JlZW5cXG4gICAgICAgICAgICBtc2FsbG93ZnVsbHNjcmVlblwiO1xyXG4gICAgICAgICAgICBpZiAodmlkZW9JbmZvLnlvdXR1YmUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWRlb0lkID0gJ2xnLXlvdXR1YmUnICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVVcmxQYXJhbXMgPSB2aWRlb0luZm8ueW91dHViZVsyXVxyXG4gICAgICAgICAgICAgICAgICAgID8gdmlkZW9JbmZvLnlvdXR1YmVbMl0gKyAnJidcclxuICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICAgICAgLy8gRm9yIHlvdXR1YmUgZmlyc3QgcGFybXMgZ2V0cyBwcmlvcml0eSBpZiBkdXBsaWNhdGVzIGZvdW5kXHJcbiAgICAgICAgICAgICAgICB2YXIgeW91VHViZVBsYXllclBhcmFtcyA9IFwiP1wiICsgc2xpZGVVcmxQYXJhbXMgKyBcIndtb2RlPW9wYXF1ZSZhdXRvcGxheT0wJm11dGU9MSZlbmFibGVqc2FwaT0xXCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyUGFyYW1zID0geW91VHViZVBsYXllclBhcmFtcyArXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuc2V0dGluZ3MueW91VHViZVBsYXllclBhcmFtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICcmJyArIHBhcmFtKHRoaXMuc2V0dGluZ3MueW91VHViZVBsYXllclBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnJyk7XHJcbiAgICAgICAgICAgICAgICB2aWRlbyA9IFwiPGlmcmFtZSBhbGxvdz1cXFwiYXV0b3BsYXlcXFwiIGlkPVwiICsgdmlkZW9JZCArIFwiIGNsYXNzPVxcXCJsZy12aWRlby1vYmplY3QgbGcteW91dHViZSBcIiArIGFkZENsYXNzICsgXCJcXFwiIFwiICsgdmlkZW9UaXRsZSArIFwiIHNyYz1cXFwiLy93d3cueW91dHViZS5jb20vZW1iZWQvXCIgKyAodmlkZW9JbmZvLnlvdXR1YmVbMV0gKyBwbGF5ZXJQYXJhbXMpICsgXCJcXFwiIFwiICsgY29tbW9uSWZyYW1lUHJvcHMgKyBcIj48L2lmcmFtZT5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8udmltZW8pIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWRlb0lkID0gJ2xnLXZpbWVvJyArIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllclBhcmFtcyA9IGdldFZpbWVvVVJMUGFyYW1zKHRoaXMuc2V0dGluZ3MudmltZW9QbGF5ZXJQYXJhbXMsIHZpZGVvSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB2aWRlbyA9IFwiPGlmcmFtZSBhbGxvdz1cXFwiYXV0b3BsYXlcXFwiIGlkPVwiICsgdmlkZW9JZCArIFwiIGNsYXNzPVxcXCJsZy12aWRlby1vYmplY3QgbGctdmltZW8gXCIgKyBhZGRDbGFzcyArIFwiXFxcIiBcIiArIHZpZGVvVGl0bGUgKyBcIiBzcmM9XFxcIi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby9cIiArICh2aWRlb0luZm8udmltZW9bMV0gKyBwbGF5ZXJQYXJhbXMpICsgXCJcXFwiIFwiICsgY29tbW9uSWZyYW1lUHJvcHMgKyBcIj48L2lmcmFtZT5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8ud2lzdGlhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2lzdGlhSWQgPSAnbGctd2lzdGlhJyArIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllclBhcmFtcyA9IHBhcmFtKHRoaXMuc2V0dGluZ3Mud2lzdGlhUGxheWVyUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHBsYXllclBhcmFtcyA9IHBsYXllclBhcmFtcyA/ICc/JyArIHBsYXllclBhcmFtcyA6ICcnO1xyXG4gICAgICAgICAgICAgICAgdmlkZW8gPSBcIjxpZnJhbWUgYWxsb3c9XFxcImF1dG9wbGF5XFxcIiBpZD1cXFwiXCIgKyB3aXN0aWFJZCArIFwiXFxcIiBzcmM9XFxcIi8vZmFzdC53aXN0aWEubmV0L2VtYmVkL2lmcmFtZS9cIiArICh2aWRlb0luZm8ud2lzdGlhWzRdICsgcGxheWVyUGFyYW1zKSArIFwiXFxcIiBcIiArIHZpZGVvVGl0bGUgKyBcIiBjbGFzcz1cXFwid2lzdGlhX2VtYmVkIGxnLXZpZGVvLW9iamVjdCBsZy13aXN0aWEgXCIgKyBhZGRDbGFzcyArIFwiXFxcIiBuYW1lPVxcXCJ3aXN0aWFfZW1iZWRcXFwiIFwiICsgY29tbW9uSWZyYW1lUHJvcHMgKyBcIj48L2lmcmFtZT5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8uaHRtbDUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBodG1sNVZpZGVvTWFya3VwID0gJyc7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGh0bWw1VmlkZW8uc291cmNlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbDVWaWRlb01hcmt1cCArPSBcIjxzb3VyY2Ugc3JjPVxcXCJcIiArIGh0bWw1VmlkZW8uc291cmNlW2ldLnNyYyArIFwiXFxcIiB0eXBlPVxcXCJcIiArIGh0bWw1VmlkZW8uc291cmNlW2ldLnR5cGUgKyBcIlxcXCI+XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaHRtbDVWaWRlby50cmFja3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFja0F0dHJpYnV0ZXMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYWNrID0gaHRtbDVWaWRlby50cmFja3NbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRyYWNrIHx8IHt9KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrQXR0cmlidXRlcyArPSBrZXkgKyBcIj1cXFwiXCIgKyB0cmFja1trZXldICsgXCJcXFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDVWaWRlb01hcmt1cCArPSBcIjx0cmFjayBcIiArIHRyYWNrQXR0cmlidXRlcyArIFwiPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBodG1sNVZpZGVvLnRyYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8xKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBodG1sNVZpZGVvQXR0cnNfMSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZGVvQXR0cmlidXRlc18xID0gaHRtbDVWaWRlby5hdHRyaWJ1dGVzIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModmlkZW9BdHRyaWJ1dGVzXzEgfHwge30pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw1VmlkZW9BdHRyc18xICs9IGtleSArIFwiPVxcXCJcIiArIHZpZGVvQXR0cmlidXRlc18xW2tleV0gKyBcIlxcXCIgXCI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZpZGVvID0gXCI8dmlkZW8gY2xhc3M9XFxcImxnLXZpZGVvLW9iamVjdCBsZy1odG1sNSBcIiArICh0aGlzLnNldHRpbmdzLnZpZGVvanMgPyAndmlkZW8tanMnIDogJycpICsgXCJcXFwiIFwiICsgaHRtbDVWaWRlb0F0dHJzXzEgKyBcIj5cXG4gICAgICAgICAgICAgICAgXCIgKyBodG1sNVZpZGVvTWFya3VwICsgXCJcXG4gICAgICAgICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgSFRNTDUgdmlkZW8uXFxuICAgICAgICAgICAgPC92aWRlbz5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmlkZW87XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAZGVzYyAtIEFwcGVuZCB2aWRlb3MgdG8gdGhlIHNsaWRlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIHNsaWRlIGVsZW1lbnRcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gdmlkZW9QYXJhbXMgLSBWaWRlbyBwYXJhbWV0ZXJzLCBDb250YWlucyBzcmMsIGNsYXNzLCBpbmRleCwgaHRtbFZpZGVvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmFwcGVuZFZpZGVvcyA9IGZ1bmN0aW9uIChlbCwgdmlkZW9QYXJhbXMpIHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9IdG1sID0gdGhpcy5nZXRWaWRlb0h0bWwodmlkZW9QYXJhbXMuc3JjLCB2aWRlb1BhcmFtcy5hZGRDbGFzcywgdmlkZW9QYXJhbXMuaW5kZXgsIHZpZGVvUGFyYW1zLmh0bWw1VmlkZW8pO1xyXG4gICAgICAgICAgICBlbC5maW5kKCcubGctdmlkZW8tY29udCcpLmFwcGVuZCh2aWRlb0h0bWwpO1xyXG4gICAgICAgICAgICB2YXIgJHZpZGVvRWxlbWVudCA9IGVsLmZpbmQoJy5sZy12aWRlby1vYmplY3QnKS5maXJzdCgpO1xyXG4gICAgICAgICAgICBpZiAodmlkZW9QYXJhbXMuaHRtbDVWaWRlbykge1xyXG4gICAgICAgICAgICAgICAgJHZpZGVvRWxlbWVudC5vbignbW91c2Vkb3duLmxnLnZpZGVvJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudmlkZW9qcyAmJiAoKF9hID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1t2aWRlb1BhcmFtcy5pbmRleF0uX19zbGlkZVZpZGVvSW5mbykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmh0bWw1KSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlkZW9qcygkdmlkZW9FbGVtZW50LmdldCgpLCB0aGlzLnNldHRpbmdzLnZpZGVvanNPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignbGlnaHRHYWxsZXJ5Oi0gTWFrZSBzdXJlIHlvdSBoYXZlIGluY2x1ZGVkIHZpZGVvanMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmdvdG9OZXh0U2xpZGVPblZpZGVvRW5kID0gZnVuY3Rpb24gKHNyYywgaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR2aWRlb0VsZW1lbnQgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0oaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLXZpZGVvLW9iamVjdCcpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvSW5mbyA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbaW5kZXhdLl9fc2xpZGVWaWRlb0luZm8gfHwge307XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmdvdG9OZXh0U2xpZGVPblZpZGVvRW5kKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlkZW9JbmZvLmh0bWw1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHZpZGVvRWxlbWVudC5vbignZW5kZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNvcmUuZ29Ub05leHRTbGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLnZpbWVvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpbWVvL3BsYXllci5qcy8jZW5kZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFZpbWVvLlBsYXllcigkdmlkZW9FbGVtZW50LmdldCgpKS5vbignZW5kZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLmdvVG9OZXh0U2xpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeTotIE1ha2Ugc3VyZSB5b3UgaGF2ZSBpbmNsdWRlZCAvL2dpdGh1Yi5jb20vdmltZW8vcGxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLndpc3RpYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fd3EgPSB3aW5kb3cuX3dxIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdG9kbyBFdmVudCBpcyBnZXR0aWduIHRyaWdnZXJlZCBtdWx0aXBsZSB0aW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX3dxLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICR2aWRlb0VsZW1lbnQuYXR0cignaWQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uICh2aWRlbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvLmJpbmQoJ2VuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29yZS5nb1RvTmV4dFNsaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignbGlnaHRHYWxsZXJ5Oi0gTWFrZSBzdXJlIHlvdSBoYXZlIGluY2x1ZGVkIC8vZmFzdC53aXN0aWEuY29tL2Fzc2V0cy9leHRlcm5hbC9FLXYxLmpzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBWaWRlby5wcm90b3R5cGUuY29udHJvbFZpZGVvID0gZnVuY3Rpb24gKGluZGV4LCBhY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyICR2aWRlb0VsZW1lbnQgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0oaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLXZpZGVvLW9iamVjdCcpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIHZpZGVvSW5mbyA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbaW5kZXhdLl9fc2xpZGVWaWRlb0luZm8gfHwge307XHJcbiAgICAgICAgICAgIGlmICghJHZpZGVvRWxlbWVudC5nZXQoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHZpZGVvSW5mby55b3V0dWJlKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICR2aWRlb0VsZW1lbnQuZ2V0KCkuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShcIntcXFwiZXZlbnRcXFwiOlxcXCJjb21tYW5kXFxcIixcXFwiZnVuY1xcXCI6XFxcIlwiICsgYWN0aW9uICsgXCJWaWRlb1xcXCIsXFxcImFyZ3NcXFwiOlxcXCJcXFwifVwiLCAnKicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibGlnaHRHYWxsZXJ5Oi0gXCIgKyBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2aWRlb0luZm8udmltZW8pIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZpbWVvLlBsYXllcigkdmlkZW9FbGVtZW50LmdldCgpKVthY3Rpb25dKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeTotIE1ha2Ugc3VyZSB5b3UgaGF2ZSBpbmNsdWRlZCAvL2dpdGh1Yi5jb20vdmltZW8vcGxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLmh0bWw1KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy52aWRlb2pzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9qcygkdmlkZW9FbGVtZW50LmdldCgpKVthY3Rpb25dKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2xpZ2h0R2FsbGVyeTotIE1ha2Ugc3VyZSB5b3UgaGF2ZSBpbmNsdWRlZCB2aWRlb2pzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHZpZGVvRWxlbWVudC5nZXQoKVthY3Rpb25dKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW9JbmZvLndpc3RpYSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuX3dxID0gd2luZG93Ll93cSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdG9kbyBGaW5kIGEgd2F5IHRvIGRlc3Ryb3kgd2lzdGlhIHBsYXllciBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5fd3EucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAkdmlkZW9FbGVtZW50LmF0dHIoJ2lkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uICh2aWRlbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9bYWN0aW9uXSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdsaWdodEdhbGxlcnk6LSBNYWtlIHN1cmUgeW91IGhhdmUgaW5jbHVkZWQgLy9mYXN0Lndpc3RpYS5jb20vYXNzZXRzL2V4dGVybmFsL0UtdjEuanMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmxvYWRWaWRlb09uUG9zdGVyQ2xpY2sgPSBmdW5jdGlvbiAoJGVsLCBmb3JjZVBsYXkpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgLy8gY2hlY2sgc2xpZGUgaGFzIHBvc3RlclxyXG4gICAgICAgICAgICBpZiAoISRlbC5oYXNDbGFzcygnbGctdmlkZW8tbG9hZGVkJykpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGFscmVhZHkgdmlkZW8gZWxlbWVudCBwcmVzZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoISRlbC5oYXNDbGFzcygnbGctaGFzLXZpZGVvJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2xnLWhhcy12aWRlbycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfaHRtbCA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX3NyYyA9IHRoaXMuY29yZS5nYWxsZXJ5SXRlbXNbdGhpcy5jb3JlLmluZGV4XS5zcmM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvID0gdGhpcy5jb3JlLmdhbGxlcnlJdGVtc1t0aGlzLmNvcmUuaW5kZXhdLnZpZGVvO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWRlbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaHRtbCA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgdmlkZW8gPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZSh2aWRlbykgOiB2aWRlbztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvSnNQbGF5ZXJfMSA9IHRoaXMuYXBwZW5kVmlkZW9zKCRlbCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IF9zcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuY29yZS5pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDVWaWRlbzogX2h0bWwsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb3RvTmV4dFNsaWRlT25WaWRlb0VuZChfc3JjLCB0aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGVtcEltZyA9ICRlbC5maW5kKCcubGctb2JqZWN0JykuZmlyc3QoKS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdG9kbyBtYWtlIHN1cmUgaXQgaXMgd29ya2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5maW5kKCcubGctdmlkZW8tY29udCcpLmZpcnN0KCkuYXBwZW5kKCR0ZW1wSW1nKTtcclxuICAgICAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2xnLXZpZGVvLWxvYWRpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb0pzUGxheWVyXzEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9Kc1BsYXllcl8xLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSnNQbGF5ZXJfMS5vbignbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25WaWRlb0xvYWRBZnRlclBvc3RlckNsaWNrKCRlbCwgX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5sZy12aWRlby1vYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ2xvYWQubGcgZXJyb3IubGcgbG9hZGVkbWV0YWRhdGEubGcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25WaWRlb0xvYWRBZnRlclBvc3RlckNsaWNrKCRlbCwgX3RoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVZpZGVvKHRoaXMuY29yZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZm9yY2VQbGF5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlWaWRlbyh0aGlzLmNvcmUuaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBWaWRlby5wcm90b3R5cGUub25WaWRlb0xvYWRBZnRlclBvc3RlckNsaWNrID0gZnVuY3Rpb24gKCRlbCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdsZy12aWRlby1sb2FkZWQnKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5VmlkZW8oaW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVmlkZW8ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLmxnLnZpZGVvJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9mZignLnZpZGVvJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gVmlkZW87XHJcbiAgICB9KCkpO1xuXG4gICAgcmV0dXJuIFZpZGVvO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGctdmlkZW8udW1kLmpzLm1hcFxuIiwiLyohXG4gKiBsaWdodGdhbGxlcnkgfCAyLjQuMC1iZXRhLjAgfCBEZWNlbWJlciAxMnRoIDIwMjFcbiAqIGh0dHA6Ly93d3cubGlnaHRnYWxsZXJ5anMuY29tL1xuICogQ29weXJpZ2h0IChjKSAyMDIwIFNhY2hpbiBOZXJhdmF0aDtcbiAqIEBsaWNlbnNlIEdQTHYzXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwubGdSb3RhdGUgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICAvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuICAgIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG4gICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuICAgIFJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG4gICAgQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG4gICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbiAgICBMT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG4gICAgT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG4gICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcblxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiBsaWdodEdhbGxlcnkgZXZlbnRzXHJcbiAgICAgKiBBbGwgZXZlbnRzIHNob3VsZCBiZSBkb2N1bWVudGVkIGhlcmVcclxuICAgICAqIEJlbG93IGludGVyZmFjZXMgYXJlIHVzZWQgdG8gYnVpbGQgdGhlIHdlYnNpdGUgZG9jdW1lbnRhdGlvbnNcclxuICAgICAqICovXHJcbiAgICB2YXIgbEdFdmVudHMgPSB7XHJcbiAgICAgICAgYWZ0ZXJBcHBlbmRTbGlkZTogJ2xnQWZ0ZXJBcHBlbmRTbGlkZScsXHJcbiAgICAgICAgaW5pdDogJ2xnSW5pdCcsXHJcbiAgICAgICAgaGFzVmlkZW86ICdsZ0hhc1ZpZGVvJyxcclxuICAgICAgICBjb250YWluZXJSZXNpemU6ICdsZ0NvbnRhaW5lclJlc2l6ZScsXHJcbiAgICAgICAgdXBkYXRlU2xpZGVzOiAnbGdVcGRhdGVTbGlkZXMnLFxyXG4gICAgICAgIGFmdGVyQXBwZW5kU3ViSHRtbDogJ2xnQWZ0ZXJBcHBlbmRTdWJIdG1sJyxcclxuICAgICAgICBiZWZvcmVPcGVuOiAnbGdCZWZvcmVPcGVuJyxcclxuICAgICAgICBhZnRlck9wZW46ICdsZ0FmdGVyT3BlbicsXHJcbiAgICAgICAgc2xpZGVJdGVtTG9hZDogJ2xnU2xpZGVJdGVtTG9hZCcsXHJcbiAgICAgICAgYmVmb3JlU2xpZGU6ICdsZ0JlZm9yZVNsaWRlJyxcclxuICAgICAgICBhZnRlclNsaWRlOiAnbGdBZnRlclNsaWRlJyxcclxuICAgICAgICBwb3N0ZXJDbGljazogJ2xnUG9zdGVyQ2xpY2snLFxyXG4gICAgICAgIGRyYWdTdGFydDogJ2xnRHJhZ1N0YXJ0JyxcclxuICAgICAgICBkcmFnTW92ZTogJ2xnRHJhZ01vdmUnLFxyXG4gICAgICAgIGRyYWdFbmQ6ICdsZ0RyYWdFbmQnLFxyXG4gICAgICAgIGJlZm9yZU5leHRTbGlkZTogJ2xnQmVmb3JlTmV4dFNsaWRlJyxcclxuICAgICAgICBiZWZvcmVQcmV2U2xpZGU6ICdsZ0JlZm9yZVByZXZTbGlkZScsXHJcbiAgICAgICAgYmVmb3JlQ2xvc2U6ICdsZ0JlZm9yZUNsb3NlJyxcclxuICAgICAgICBhZnRlckNsb3NlOiAnbGdBZnRlckNsb3NlJyxcclxuICAgICAgICByb3RhdGVMZWZ0OiAnbGdSb3RhdGVMZWZ0JyxcclxuICAgICAgICByb3RhdGVSaWdodDogJ2xnUm90YXRlUmlnaHQnLFxyXG4gICAgICAgIGZsaXBIb3Jpem9udGFsOiAnbGdGbGlwSG9yaXpvbnRhbCcsXHJcbiAgICAgICAgZmxpcFZlcnRpY2FsOiAnbGdGbGlwVmVydGljYWwnLFxyXG4gICAgICAgIGF1dG9wbGF5OiAnbGdBdXRvcGxheScsXHJcbiAgICAgICAgYXV0b3BsYXlTdGFydDogJ2xnQXV0b3BsYXlTdGFydCcsXHJcbiAgICAgICAgYXV0b3BsYXlTdG9wOiAnbGdBdXRvcGxheVN0b3AnLFxyXG4gICAgfTtcblxuICAgIHZhciByb3RhdGVTZXR0aW5ncyA9IHtcclxuICAgICAgICByb3RhdGU6IHRydWUsXHJcbiAgICAgICAgcm90YXRlU3BlZWQ6IDQwMCxcclxuICAgICAgICByb3RhdGVMZWZ0OiB0cnVlLFxyXG4gICAgICAgIHJvdGF0ZVJpZ2h0OiB0cnVlLFxyXG4gICAgICAgIGZsaXBIb3Jpem9udGFsOiB0cnVlLFxyXG4gICAgICAgIGZsaXBWZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICByb3RhdGVQbHVnaW5TdHJpbmdzOiB7XHJcbiAgICAgICAgICAgIGZsaXBWZXJ0aWNhbDogJ0ZsaXAgdmVydGljYWwnLFxyXG4gICAgICAgICAgICBmbGlwSG9yaXpvbnRhbDogJ0ZsaXAgaG9yaXpvbnRhbCcsXHJcbiAgICAgICAgICAgIHJvdGF0ZUxlZnQ6ICdSb3RhdGUgbGVmdCcsXHJcbiAgICAgICAgICAgIHJvdGF0ZVJpZ2h0OiAnUm90YXRlIHJpZ2h0JyxcclxuICAgICAgICB9LFxyXG4gICAgfTtcblxuICAgIHZhciBSb3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gUm90YXRlKGluc3RhbmNlLCAkTEcpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IGxpZ2h0R2FsbGVyeSBjb3JlIHBsdWdpbiBpbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLmNvcmUgPSBpbnN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy4kTEcgPSAkTEc7XHJcbiAgICAgICAgICAgIC8vIGV4dGVuZCBtb2R1bGUgZGVmYXVsdCBzZXR0aW5ncyB3aXRoIGxpZ2h0R2FsbGVyeSBjb3JlIHNldHRpbmdzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcm90YXRlU2V0dGluZ3MpLCB0aGlzLmNvcmUuc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5idWlsZFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJvdGF0ZUljb25zID0gJyc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmZsaXBWZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlSWNvbnMgKz0gXCI8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgaWQ9XFxcImxnLWZsaXAtdmVyXFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Mucm90YXRlUGx1Z2luU3RyaW5nc1snZmxpcFZlcnRpY2FsJ10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLWZsaXAtdmVyIGxnLWljb25cXFwiPjwvYnV0dG9uPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmZsaXBIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGVJY29ucyArPSBcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBpZD1cXFwibGctZmxpcC1ob3JcXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5yb3RhdGVQbHVnaW5TdHJpbmdzWydmbGlwSG9yaXpvbnRhbCddICsgXCJcXFwiIGNsYXNzPVxcXCJsZy1mbGlwLWhvciBsZy1pY29uXFxcIj48L2J1dHRvbj5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5yb3RhdGVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGVJY29ucyArPSBcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBpZD1cXFwibGctcm90YXRlLWxlZnRcXFwiIGFyaWEtbGFiZWw9XFxcIlwiICsgdGhpcy5zZXR0aW5ncy5yb3RhdGVQbHVnaW5TdHJpbmdzWydyb3RhdGVMZWZ0J10gKyBcIlxcXCIgY2xhc3M9XFxcImxnLXJvdGF0ZS1sZWZ0IGxnLWljb25cXFwiPjwvYnV0dG9uPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnJvdGF0ZVJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGVJY29ucyArPSBcIjxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBpZD1cXFwibGctcm90YXRlLXJpZ2h0XFxcIiBhcmlhLWxhYmVsPVxcXCJcIiArIHRoaXMuc2V0dGluZ3Mucm90YXRlUGx1Z2luU3RyaW5nc1sncm90YXRlUmlnaHQnXSArIFwiXFxcIiBjbGFzcz1cXFwibGctcm90YXRlLXJpZ2h0IGxnLWljb25cXFwiPjwvYnV0dG9uPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS4kdG9vbGJhci5hcHBlbmQocm90YXRlSWNvbnMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2V0dGluZ3Mucm90YXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5idWlsZFRlbXBsYXRlcygpO1xyXG4gICAgICAgICAgICAvLyBTYXZlIHJvdGF0ZSBjb25maWcgZm9yIGVhY2ggaXRlbSB0byBwZXJzaXN0IGl0cyByb3RhdGUsIGZsaXAgdmFsdWVzXHJcbiAgICAgICAgICAgIC8vIGV2ZW4gYWZ0ZXIgbmF2aWdhdGluZyB0byBkaWZlcmVudCBzbGlkZXNcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0ID0ge307XHJcbiAgICAgICAgICAgIC8vIGV2ZW50IHRyaWdnZXJlZCBhZnRlciBhcHBlbmRpbmcgc2xpZGUgY29udGVudFxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vbihsR0V2ZW50cy5hZnRlckFwcGVuZFNsaWRlICsgXCIucm90YXRlXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZXZlbnQuZGV0YWlsLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlV3JhcCA9IF90aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXdyYXAnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VXcmFwLndyYXAoJ2xnLWltZy1yb3RhdGUnKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKF90aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctcm90YXRlJylcclxuICAgICAgICAgICAgICAgICAgICAuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgX3RoaXMuc2V0dGluZ3Mucm90YXRlU3BlZWQgKyAnbXMnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNsZy1yb3RhdGUtbGVmdCcpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljay5sZycsIHRoaXMucm90YXRlTGVmdC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLm91dGVyXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnI2xnLXJvdGF0ZS1yaWdodCcpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljay5sZycsIHRoaXMucm90YXRlUmlnaHQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNsZy1mbGlwLWhvcicpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljay5sZycsIHRoaXMuZmxpcEhvcml6b250YWwuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5vdXRlclxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNsZy1mbGlwLXZlcicpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljay5sZycsIHRoaXMuZmxpcFZlcnRpY2FsLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvLyBSZXNldCByb3RhdGUgb24gc2xpZGUgY2hhbmdlXHJcbiAgICAgICAgICAgIHRoaXMuY29yZS5MR2VsLm9uKGxHRXZlbnRzLmJlZm9yZVNsaWRlICsgXCIucm90YXRlXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W2V2ZW50LmRldGFpbC5pbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W2V2ZW50LmRldGFpbC5pbmRleF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxpcEhvcml6b250YWw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsaXBWZXJ0aWNhbDogMSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuYXBwbHlTdHlsZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkaW1hZ2UgPSB0aGlzLmNvcmVcclxuICAgICAgICAgICAgICAgIC5nZXRTbGlkZUl0ZW0odGhpcy5jb3JlLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5sZy1pbWctcm90YXRlJylcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpO1xyXG4gICAgICAgICAgICAkaW1hZ2UuY3NzKCd0cmFuc2Zvcm0nLCAncm90YXRlKCcgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF0ucm90YXRlICtcclxuICAgICAgICAgICAgICAgICdkZWcpJyArXHJcbiAgICAgICAgICAgICAgICAnIHNjYWxlM2QoJyArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XS5mbGlwSG9yaXpvbnRhbCArXHJcbiAgICAgICAgICAgICAgICAnLCAnICtcclxuICAgICAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLmZsaXBWZXJ0aWNhbCArXHJcbiAgICAgICAgICAgICAgICAnLCAxKScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5yb3RhdGVMZWZ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVZhbHVlc0xpc3RbdGhpcy5jb3JlLmluZGV4XS5yb3RhdGUgLT0gOTA7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnRzKGxHRXZlbnRzLnJvdGF0ZUxlZnQsIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZTogdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF0ucm90YXRlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUucm90YXRlUmlnaHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdLnJvdGF0ZSArPSA5MDtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVN0eWxlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudHMobEdFdmVudHMucm90YXRlUmlnaHQsIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZTogdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF0ucm90YXRlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuZ2V0Q3VycmVudFJvdGF0aW9uID0gZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgICAgIGlmICghZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdCA9IHRoaXMuJExHKGVsKS5zdHlsZSgpO1xyXG4gICAgICAgICAgICB2YXIgdG0gPSBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctbW96LXRyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCctbXMtdHJhbnNmb3JtJykgfHxcclxuICAgICAgICAgICAgICAgIHN0LmdldFByb3BlcnR5VmFsdWUoJy1vLXRyYW5zZm9ybScpIHx8XHJcbiAgICAgICAgICAgICAgICBzdC5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2Zvcm0nKSB8fFxyXG4gICAgICAgICAgICAgICAgJ25vbmUnO1xyXG4gICAgICAgICAgICBpZiAodG0gIT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHRtLnNwbGl0KCcoJylbMV0uc3BsaXQoJyknKVswXS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hdGFuMih2YWx1ZXNbMV0sIHZhbHVlc1swXSkgKiAoMTgwIC8gTWF0aC5QSSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmdsZSA8IDAgPyBhbmdsZSArIDM2MCA6IGFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5mbGlwSG9yaXpvbnRhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJvdGF0ZUVsID0gdGhpcy5jb3JlXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2xpZGVJdGVtKHRoaXMuY29yZS5pbmRleClcclxuICAgICAgICAgICAgICAgIC5maW5kKCcubGctaW1nLXJvdGF0ZScpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFJvdGF0aW9uID0gdGhpcy5nZXRDdXJyZW50Um90YXRpb24ocm90YXRlRWwpO1xyXG4gICAgICAgICAgICB2YXIgcm90YXRlQXhpcyA9ICdmbGlwSG9yaXpvbnRhbCc7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Um90YXRpb24gPT09IDkwIHx8IGN1cnJlbnRSb3RhdGlvbiA9PT0gMjcwKSB7XHJcbiAgICAgICAgICAgICAgICByb3RhdGVBeGlzID0gJ2ZsaXBWZXJ0aWNhbCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF1bcm90YXRlQXhpc10gKj0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnRzKGxHRXZlbnRzLmZsaXBIb3Jpem9udGFsLCB7XHJcbiAgICAgICAgICAgICAgICBmbGlwSG9yaXpvbnRhbDogdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF1bcm90YXRlQXhpc10sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5mbGlwVmVydGljYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGVFbCA9IHRoaXMuY29yZVxyXG4gICAgICAgICAgICAgICAgLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxnLWltZy1yb3RhdGUnKVxyXG4gICAgICAgICAgICAgICAgLmZpcnN0KClcclxuICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRSb3RhdGlvbiA9IHRoaXMuZ2V0Q3VycmVudFJvdGF0aW9uKHJvdGF0ZUVsKTtcclxuICAgICAgICAgICAgdmFyIHJvdGF0ZUF4aXMgPSAnZmxpcFZlcnRpY2FsJztcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRSb3RhdGlvbiA9PT0gOTAgfHwgY3VycmVudFJvdGF0aW9uID09PSAyNzApIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZUF4aXMgPSAnZmxpcEhvcml6b250YWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdFt0aGlzLmNvcmUuaW5kZXhdW3JvdGF0ZUF4aXNdICo9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50cyhsR0V2ZW50cy5mbGlwVmVydGljYWwsIHtcclxuICAgICAgICAgICAgICAgIGZsaXBWZXJ0aWNhbDogdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF1bcm90YXRlQXhpc10sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS50cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24gKGV2ZW50LCBkZXRhaWwpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5jb3JlLkxHZWwudHJpZ2dlcihldmVudCwgZGV0YWlsKTtcclxuICAgICAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5yb3RhdGVTcGVlZCArIDEwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJvdGF0ZS5wcm90b3R5cGUuaXNJbWFnZU9yaWVudGF0aW9uQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJvdGF0ZVZhbHVlID0gdGhpcy5yb3RhdGVWYWx1ZXNMaXN0W3RoaXMuY29yZS5pbmRleF07XHJcbiAgICAgICAgICAgIHZhciBpc1JvdGF0ZWQgPSBNYXRoLmFicyhyb3RhdGVWYWx1ZS5yb3RhdGUpICUgMzYwICE9PSAwO1xyXG4gICAgICAgICAgICB2YXIgaWZGbGlwcGVkSG9yID0gcm90YXRlVmFsdWUuZmxpcEhvcml6b250YWwgPCAwO1xyXG4gICAgICAgICAgICB2YXIgaWZGbGlwcGVkVmVyID0gcm90YXRlVmFsdWUuZmxpcFZlcnRpY2FsIDwgMDtcclxuICAgICAgICAgICAgcmV0dXJuIGlzUm90YXRlZCB8fCBpZkZsaXBwZWRIb3IgfHwgaWZGbGlwcGVkVmVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5jbG9zZUdhbGxlcnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSW1hZ2VPcmllbnRhdGlvbkNoYW5nZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3JlLmdldFNsaWRlSXRlbSh0aGlzLmNvcmUuaW5kZXgpLmNzcygnb3BhY2l0eScsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlVmFsdWVzTGlzdCA9IHt9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgUm90YXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBVbmJpbmQgYWxsIGV2ZW50cyBhZGRlZCBieSBsaWdodEdhbGxlcnkgcm90YXRlIHBsdWdpblxyXG4gICAgICAgICAgICB0aGlzLmNvcmUuTEdlbC5vZmYoJy5sZy5yb3RhdGUnKTtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLkxHZWwub2ZmKCcucm90YXRlJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gUm90YXRlO1xyXG4gICAgfSgpKTtcblxuICAgIHJldHVybiBSb3RhdGU7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZy1yb3RhdGUudW1kLmpzLm1hcFxuIiwidmFyIHNpbmdsZVlhY2h0R2FsbGV5PW51bGw7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpZ2h0Z2FsbGVyeScpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmlyZWRcIilcbiAgICAgICAgc2luZ2xlWWFjaHRHYWxsZXk9bGlnaHRHYWxsZXJ5KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaWdodGdhbGxlcnknKSwge1xuICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIGxnWm9vbSxcbiAgICAgICAgICAgIGxnVGh1bWJuYWlsLFxuICAgICAgICAgICAgbGdWaWRlbyxcbiAgICAgICAgICAgIGxnUm90YXRlLFxuICAgICAgICAgICAgLy9sZ1NoYXJlXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzcGVlZDogMjAwLFxuICAgICAgICAgIC8vbGljZW5zZUtleTogJ3lvdXJfbGljZW5zZV9rZXknLFxuICAgICAgICAgIHRodW1ibmFpbDp0cnVlLFxuICAgICAgICAgIGFuaW1hdGVUaHVtYjogZmFsc2UsXG4gICAgICAgICAgc2hvd1RodW1iQnlEZWZhdWx0OiB0cnVlLFxuICAgICAgICAgIGRvd25sb2FkOiBmYWxzZSxcbiAgICAgICAgICBzZWxlY3RvcjogJ2ltZycsXG4gICAgICAgICAgZXhUaHVtYkltYWdlOiAnZGF0YS10aHVtYi1zcmMnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLWdhbGxlcnknKSl7XG4gICAgICBsaWdodEdhbGxlcnkoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLWdhbGxlcnknKSwge1xuICAgICAgICBwbHVnaW5zOiBbbGdWaWRlb10sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5c3Atc2luZ2xlLXktaW1hZ2UtdG9wcGVyIC5pbWcxJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHNpbmdsZVlhY2h0R2FsbGV5Lm9wZW5HYWxsZXJ5KDApO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3lzcC1zaW5nbGUteS1pbWFnZS10b3BwZXIgLmltZzInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgc2luZ2xlWWFjaHRHYWxsZXkub3BlbkdhbGxlcnkoMSk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeXNwLXNpbmdsZS15LWltYWdlLXRvcHBlciAuaW1nMycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBzaW5nbGVZYWNodEdhbGxleS5vcGVuR2FsbGVyeSgyKTtcbiAgICB9KTtcbn0pO1xuXG5cbmZ1bmN0aW9uIGNvcHlMaW5rKCkge1xuXG4gIHZhciBjb3B5VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hhcmVMaW5rSW5wdXRcIik7XG5cbiAgY29weVRleHQuc2VsZWN0KCk7XG4gIGNvcHlUZXh0LnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTk5KTtcblxuICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG5cbiAgYWxlcnQoXCJDb3BpZWQgdGhlIGxpbms6IFwiICsgY29weVRleHQudmFsdWUpO1xufSJdfQ==
