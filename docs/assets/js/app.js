/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./theme/main.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _styles = __webpack_require__(/*! ./styles/styles.scss */ 1);
	
	var _styles2 = _interopRequireDefault(_styles);
	
	var _menu = __webpack_require__(/*! ./js/menu */ 5);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _search = __webpack_require__(/*! ./js/search */ 6);
	
	var _search2 = _interopRequireDefault(_search);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Import dynamic navbar
	window.onload = function (f) {
		var search = new _search2.default('searchinput');
		var mobilenemu = new _menu2.default(document).init();
	
		// Activate searc is this is the search page
		if (document.getElementById('search')) search.init();
	};
	
	// Import search functionality
	// Import the styles

/***/ },
/* 1 */
/*!**********************************!*\
  !*** ./theme/styles/styles.scss ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader/lib/loader.js!./../../~/postcss-loader!./styles.scss */ 2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./../../node_modules/postcss-loader/index.js!./styles.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./../../node_modules/postcss-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/*!**************************************************************************************************!*\
  !*** ./~/css-loader!./~/sass-loader/lib/loader.js!./~/postcss-loader!./theme/styles/styles.scss ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Roboto:300);", ""]);
	
	// module
	exports.push([module.id, "/* Color Palette */\n/* Mobile definitions */\n/* Global definitions */\n/* Font */\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 300;\n  display: flex;\n  min-height: 100vh;\n  flex-direction: column; }\n\nmain {\n  flex: 1 0 auto; }\n\nimg {\n  max-width: 100%; }\n\n.hidden {\n  display: none; }\n\n.circle {\n  border-radius: 50%; }\n\n.depth-txt, #navbar ul li, #header h1, .container a.postlist {\n  transition: 0.3s; }\n  .depth-txt:hover, #navbar ul li:hover, #header h1:hover, .container a.postlist:hover, .depth-txt:active, #navbar ul li:active, #header h1:active, .container a.postlist:active, .depth-txt:focus, #navbar ul li:focus, #header h1:focus, .container a.postlist:focus {\n    transition: 0.3s;\n    text-shadow: 2px 8px 5px rgba(0, 0, 0, 0.3);\n    opacity: 0.8; }\n\n.depth-box, img, #navbar #headsearch input, #featuredimg img {\n  transition: 0.3s; }\n  .depth-box:hover, img:hover, #navbar #headsearch input:hover, #featuredimg img:hover, .depth-box:active, img:active, #navbar #headsearch input:active, #featuredimg img:active, .depth-box:focus, img:focus, #navbar #headsearch input:focus, #featuredimg img:focus {\n    transition: 0.3s;\n    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.3);\n    opacity: 0.8; }\n\n.shadow, #featuredimg img {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); }\n\n/* Sizing helpers */\n.undertablet {\n  display: none; }\n  @media screen and (max-width: 768px) {\n    .undertablet {\n      display: block; } }\n\n.abovetablet {\n  display: block; }\n  @media screen and (max-width: 768px) {\n    .abovetablet {\n      display: none; } }\n\n.container {\n  margin-left: auto;\n  margin-right: auto;\n  padding: 0 10px;\n  box-sizing: border-box;\n  max-width: 100%; }\n  @media screen and (min-width: 320px) {\n    .container {\n      width: 600px; } }\n  @media screen and (min-width: 768px) {\n    .container {\n      width: 600px; } }\n  @media screen and (min-width: 1024px) {\n    .container {\n      width: 600px; } }\n  @media screen and (min-width: 320px) {\n    .container {\n      width: 600px; } }\n\n/* Get Navigarion bar styles */\n/*!\n * Hamburgers\n * @description Tasty CSS-animated hamburgers\n * @author Jonathan Suh @jonsuh\n * @site https://jonsuh.com/hamburgers\n * @link https://github.com/jonsuh/hamburgers\n * @mentornote: I severely stripped this package and put everything in one file\n */\n.hamburger {\n  padding: 15px 15px;\n  display: inline-block;\n  cursor: pointer;\n  transition-property: opacity, filter;\n  transition-duration: 0.15s;\n  transition-timing-function: linear;\n  font: inherit;\n  color: inherit;\n  text-transform: none;\n  background-color: transparent;\n  border: 0;\n  margin: 0;\n  overflow: visible; }\n  .hamburger:hover {\n    opacity: 0.7; }\n\n.hamburger-box {\n  width: 30px;\n  height: 18px;\n  display: inline-block;\n  position: relative; }\n\n.hamburger-inner {\n  display: block;\n  top: 50%;\n  margin-top: -1px; }\n  .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {\n    width: 30px;\n    height: 2px;\n    background-color: #2196F3;\n    border-radius: 4px;\n    position: absolute;\n    transition-property: transform;\n    transition-duration: 0.15s;\n    transition-timing-function: ease; }\n  .hamburger-inner::before, .hamburger-inner::after {\n    content: \"\";\n    display: block; }\n  .hamburger-inner::before {\n    top: -8px; }\n  .hamburger-inner::after {\n    bottom: -8px; }\n\n/*\n   * Squeeze\n   */\n.hamburger--squeeze .hamburger-inner {\n  transition-duration: 0.1s;\n  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  .hamburger--squeeze .hamburger-inner::before {\n    transition: top 0.1s 0.14s ease, opacity 0.1s ease; }\n  .hamburger--squeeze .hamburger-inner::after {\n    transition: bottom 0.1s 0.14s ease, transform 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n\n.hamburger--squeeze.is-active .hamburger-inner {\n  transform: rotate(45deg);\n  transition-delay: 0.14s;\n  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  .hamburger--squeeze.is-active .hamburger-inner::before {\n    top: 0;\n    opacity: 0;\n    transition: top 0.1s ease, opacity 0.1s 0.14s ease; }\n  .hamburger--squeeze.is-active .hamburger-inner::after {\n    bottom: 0;\n    transform: rotate(-90deg);\n    transition: bottom 0.1s ease, transform 0.1s 0.14s cubic-bezier(0.215, 0.61, 0.355, 1); }\n\n#menu-btn {\n  position: relative;\n  background: none;\n  border: none;\n  cursor: pointer;\n  z-index: 2;\n  transition: 0.5s; }\n  #menu-btn .hamburger-inner,\n  #menu-btn .hamburger-inner::before,\n  #menu-btn .hamburger-inner::after {\n    transition: 1s; }\n  #menu-btn.is-active .hamburger-inner,\n  #menu-btn.is-active .hamburger-inner::before,\n  #menu-btn.is-active .hamburger-inner::after {\n    background-color: #f4f5f6; }\n  #menu-btn:hover .hamburger-inner,\n  #menu-btn:hover .hamburger-inner::before,\n  #menu-btn:hover .hamburger-inner::after {\n    transition: 0.3s;\n    box-shadow: 2px 8px 5px rgba(0, 0, 0, 0.3); }\n\n#navbar {\n  background-color: #f4f5f6;\n  padding-top: 20px;\n  margin-bottom: -20px;\n  height: 0; }\n  #navbar ul {\n    margin: 0; }\n    #navbar ul li {\n      text-transform: capitalize;\n      display: inline-block;\n      padding: 0 10px;\n      opacity: 0.8;\n      color: #2196F3; }\n      #navbar ul li a {\n        color: #2196F3;\n        text-decoration: none; }\n  #navbar #headsearch {\n    position: absolute;\n    right: 15px;\n    top: 15px; }\n    #navbar #headsearch input {\n      color: #2196F3;\n      font-style: italic;\n      border: none;\n      padding: 10px 20px;\n      box-shadow: 2px 3px 5px rgba(90, 90, 90, 0.1); }\n\n#navbar .undertablet {\n  padding-left: 15px; }\n\n#navbar.mobile {\n  transition: 0.5s; }\n  #navbar.mobile #menu-btn .hamburger-inner,\n  #navbar.mobile #menu-btn .hamburger-inner::before,\n  #navbar.mobile #menu-btn .hamburger-inner::after {\n    background-color: white; }\n  #navbar.mobile .menuwrap {\n    transition: 0.5s;\n    z-index: 1;\n    display: block;\n    position: fixed;\n    max-width: 100%;\n    width: 100vw;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    background: #2196F3; }\n    #navbar.mobile .menuwrap ul#themenu {\n      height: 100vh;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-direction: column;\n      list-style: none;\n      text-align: center;\n      margin: 0;\n      padding: 0; }\n      #navbar.mobile .menuwrap ul#themenu li.menuitem {\n        width: 100%;\n        font-size: 1.5rem;\n        color: white;\n        cursor: pointer;\n        margin: 10px 0;\n        padding: 10px 0;\n        display: block; }\n        #navbar.mobile .menuwrap ul#themenu li.menuitem a {\n          color: white; }\n\n/* header block */\n#header {\n  height: 350px;\n  text-align: center;\n  background-color: #f4f5f6;\n  color: #2196F3;\n  display: flex;\n  justify-content: center;\n  flex-direction: column; }\n  #header h1 {\n    margin: 0;\n    padding: 20px 0; }\n\n#featuredimg {\n  width: 96%;\n  padding: 0 2%;\n  text-align: center; }\n  #featuredimg img {\n    width: 600px;\n    max-width: 100%;\n    margin-top: -50px;\n    background-color: white; }\n\n/* Get Pages */\n.container a.postlist {\n  color: #2196F3;\n  text-decoration: none; }\n  .container a.postlist article {\n    margin: 0 0 40px 0; }\n    .container a.postlist article h3 {\n      margin-bottom: 0; }\n    .container a.postlist article span {\n      font-style: italic; }\n\n/* Get Index */\n#index {\n  text-align: center;\n  margin-top: -110px; }\n\n/* Get Categories */\n#categories {\n  text-align: center;\n  margin-top: -110px; }\n\n/* Get Search */\n#search {\n  text-align: center; }\n  #search #searchbar {\n    margin-bottom: 50px;\n    margin-top: 50px; }\n  #search #searchinput {\n    width: 100%;\n    padding: 10px;\n    font-size: 20px;\n    border: none;\n    text-align: center;\n    color: #2196F3;\n    background: #f4f5f6; }\n\n/* Grab footer */\n#footer {\n  padding: 15px;\n  text-align: center;\n  font-style: italic;\n  background-color: #f4f5f6;\n  font-size: 12px;\n  opacity: 0.8; }\n", ""]);
	
	// exports


/***/ },
/* 3 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/*!**************************!*\
  !*** ./theme/js/menu.js ***!
  \**************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var menu = function () {
		function menu(props) {
			_classCallCheck(this, menu);
	
			this.dom = props;
		}
	
		_createClass(menu, [{
			key: 'init',
			value: function init() {
				var _this = this;
	
				this.menubutton = this.dom.getElementById('menu-btn');
				this.menubutton.onclick = function (event) {
					_this.dom.getElementById('navbar').classList.toggle('mobile');
				};
			}
		}]);
	
		return menu;
	}();
	
	exports.default = menu;

/***/ },
/* 6 */
/*!****************************!*\
  !*** ./theme/js/search.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ajax = __webpack_require__(/*! ./ajax */ 7);
	
	var _ajax2 = _interopRequireDefault(_ajax);
	
	var _config = __webpack_require__(/*! ../../system/modules/config */ 8);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _getParams = __webpack_require__(/*! ./get-params */ 12);
	
	var _getParams2 = _interopRequireDefault(_getParams);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Search = function () {
		function Search(props) {
			_classCallCheck(this, Search);
	
			// Set the input field ID
			this.input = props;
			// Search speed limit
			this.speedlimit = 300;
		}
	
		// Search function
	
	
		_createClass(Search, [{
			key: 'search',
			value: function search() {
				if (this.searchlimit) return;
				var value = document.getElementById(this.input).value.toLowerCase();
				this.results = this.posts.filter(function (post) {
					return post.title.toLowerCase().indexOf(value) != -1 ? true : false || post.desc.toLowerCase().indexOf(value) != -1 ? true : false;
				});
				// Set limit tracker
				this.searchlimit = true;
				this.display();
			}
	
			// Search timer
	
		}, {
			key: 'timesearch',
			value: function timesearch() {
				setTimeout(this.search.bind(this), this.speedlimit + 100);
			}
	
			// Display search results
	
		}, {
			key: 'display',
			value: function display() {
				var resultdiv = document.getElementById('searchresults');
				var html = '';
				for (var i = this.results.length - 1; i >= 0; i--) {
					html += '<a class="postlist" href="' + this.results[i].url + '"><article><h3>' + this.results[i].title + '</h3><span>' + this.results[i].desc + '</span></article></a>';
				}
				resultdiv.innerHTML = html;
			}
	
			// Initialisation
	
		}, {
			key: 'init',
			value: function init() {
				var _this = this;
	
				var searchbar = document.getElementById(this.input);
				var getparameter = (0, _getParams2.default)('search');
				if (getparameter) searchbar.value = getparameter;searchbar.placeholder = '';
				// Get posts db
				(0, _ajax2.default)(_config2.default.system.url + 'posts.json').then(function (posts) {
					_this.posts = JSON.parse(posts);
					if (getparameter) _this.search();
				});
				// Set the handler for the user input
				searchbar.oninput = this.timesearch.bind(this);
				// Reset the search limiter
				setInterval(function () {
					_this.searchlimit = false;
				}, this.speedlimit);
			}
		}]);
	
		return Search;
	}();
	
	exports.default = Search;

/***/ },
/* 7 */
/*!**************************!*\
  !*** ./theme/js/ajax.js ***!
  \**************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var get = function get(url) {
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onload = function (f) {
				if (xhr.status == 200) return resolve(xhr.responseText);
				reject();
			};
			xhr.send();
		});
	};
	
	exports.default = get;

/***/ },
/* 8 */
/*!**********************************!*\
  !*** ./system/modules/config.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname, process) {'use strict';
	
	// import modules
	var today = __webpack_require__(/*! ./system/modules/today */ 10);
	var path = __webpack_require__(/*! path */ 11);
	
	// Configs
	var config = {
		// All related to the site
		identity: {
			title: "Amazing Blog",
			desc: "Website description",
			logo: "assets/logo.jpg", // Add dimensions in the ld+json schema
			image: "assets/image.jpg", // For sharing. Add dimensions in the ld+json schema
			language: 'en'
		},
		// System settings
		system: {
			blogslug: "post",
			pageslug: "page",
			content: path.normalize(__dirname + '/../../content/'),
			public: path.normalize(__dirname + '/../../docs/'),
			theme: path.normalize(__dirname + '/../../theme/'),
			templates: path.normalize(__dirname + '/../templates/'),
			url: process.env.local ? "http://localhost:3000/" : "https://actuallymentor.github.io/static-markdown-blog/",
			year: new Date().getFullYear(),
			today: today,
			timestamp: new Date().getTime(),
			// Google verification code
			gverification: undefined,
			// Image dimensions for compression
			images: {
				quality: 75,
				thumb: { w: 200, h: 200 },
				post: { w: 500 },
				feat: { w: 800 }
			},
			local: process.env.local
		},
		// The blog author
		author: {
			firstname: "Mentor",
			lastname: "Palokaj",
			email: "mentor@palokaj.co",
			twitter: "@actuallymentor",
			// facebook profile id, used for retargeting ad permissions
			facebook: "1299359953416544",
			url: "https://www.skillcollector.com/"
		},
		// Podcast data
		podcast: {
			image: 'assets/image.svg'
		},
		// Tracking codes
		track: {
			ga: "UA-XXXXXXXX-XX"
		}
	};
	
	// grab, parse and export the config file
	module.exports = config;
	/* WEBPACK VAR INJECTION */}.call(exports, "/", __webpack_require__(/*! ./../../~/process/browser.js */ 9)))

/***/ },
/* 9 */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 10 */
/*!*********************************!*\
  !*** ./system/modules/today.js ***!
  \*********************************/
/***/ function(module, exports) {

	'use strict';
	
	// Generate a yy-mm-dd today string
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;
	today = yyyy + '-' + mm + '-' + dd;
	
	module.exports = today;

/***/ },
/* 11 */
/*!************************************!*\
  !*** ./~/path-browserify/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function splitPath(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function () {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = i >= 0 ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function (path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function (p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function (path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function () {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function (p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	// path.relative(from, to)
	// posix version
	exports.relative = function (from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function (path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	exports.basename = function (path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	exports.extname = function (path) {
	  return splitPath(path)[3];
	};
	
	function filter(xs, f) {
	  if (xs.filter) return xs.filter(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    if (f(xs[i], i, xs)) res.push(xs[i]);
	  }
	  return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
	  return str.substr(start, len);
	} : function (str, start, len) {
	  if (start < 0) start = str.length + start;
	  return str.substr(start, len);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../process/browser.js */ 9)))

/***/ },
/* 12 */
/*!********************************!*\
  !*** ./theme/js/get-params.js ***!
  \********************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var getparams = function getparams(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	    var results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	};
	
	exports.default = getparams;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map