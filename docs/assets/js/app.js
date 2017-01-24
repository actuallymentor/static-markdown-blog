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
	
	__webpack_require__(/*! ./styles/styles.scss */ 1);
	
	var _menu = __webpack_require__(/*! ./js/menu */ 5);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _search = __webpack_require__(/*! ./js/search */ 6);
	
	var _search2 = _interopRequireDefault(_search);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log('Yay');
	
	// Import the styles
	
	
	// Import dynamic navbar
	
	
	// Import search functionality
	
	
	window.onload = function (f) {
		var search = new _search2.default('searchinput');
		console.log('Loaded');
		(0, _menu2.default)(document);
	
		// Activate searc is this is the search page
		if (document.getElementById('search')) search.init();
	};

/***/ },
/* 1 */
/*!**********************************!*\
  !*** ./theme/styles/styles.scss ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader!./../../~/postcss-loader!./styles.scss */ 2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./../../node_modules/postcss-loader/index.js!./styles.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./../../node_modules/postcss-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/*!************************************************************************************!*\
  !*** ./~/css-loader!./~/sass-loader!./~/postcss-loader!./theme/styles/styles.scss ***!
  \************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Roboto:300);", ""]);
	
	// module
	exports.push([module.id, "/* Color Palette */\n/* Mobile definitions */\n/* Global definitions */\n/* Font */\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 300;\n  display: flex;\n  min-height: 100vh;\n  flex-direction: column; }\n\nmain {\n  flex: 1 0 auto; }\n\nimg {\n  max-width: 100%; }\n\n.hidden {\n  display: none; }\n\n.circle {\n  border-radius: 50%; }\n\n.depth-txt, #navbar ul li, #header h1, .container a.postlist {\n  transition: 0.3s; }\n  .depth-txt:hover, #navbar ul li:hover, #header h1:hover, .container a.postlist:hover, .depth-txt:active, #navbar ul li:active, #header h1:active, .container a.postlist:active, .depth-txt:focus, #navbar ul li:focus, #header h1:focus, .container a.postlist:focus {\n    transition: 0.3s;\n    text-shadow: 2px 8px 5px rgba(0, 0, 0, 0.3);\n    opacity: 0.8; }\n\n.depth-box, img, #featuredimg img {\n  transition: 0.3s; }\n  .depth-box:hover, img:hover, #featuredimg img:hover, .depth-box:active, img:active, #featuredimg img:active, .depth-box:focus, img:focus, #featuredimg img:focus {\n    transition: 0.3s;\n    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.3);\n    opacity: 0.8; }\n\n.shadow, #featuredimg img {\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); }\n\n/* Sizing helpers */\n.undertablet {\n  display: none; }\n  @media screen and (max-width: 768px) {\n    .undertablet {\n      display: block; } }\n\n.abovetablet {\n  display: block; }\n  @media screen and (max-width: 768px) {\n    .abovetablet {\n      display: none; } }\n\n.container {\n  margin-left: auto;\n  margin-right: auto;\n  padding: 0 10px;\n  box-sizing: border-box;\n  max-width: 100%; }\n  @media screen and (min-width: 320px) {\n    .container {\n      width: 600px; } }\n  @media screen and (min-width: 768px) {\n    .container {\n      width: 600px; } }\n  @media screen and (min-width: 1024px) {\n    .container {\n      width: 600px; } }\n  @media screen and (min-width: 320px) {\n    .container {\n      width: 600px; } }\n\n/* Get Navigarion bar styles */\n/*!\n * Hamburgers\n * @description Tasty CSS-animated hamburgers\n * @author Jonathan Suh @jonsuh\n * @site https://jonsuh.com/hamburgers\n * @link https://github.com/jonsuh/hamburgers\n * @mentornote: I severely stripped this package and put everything in one file\n */\n.hamburger {\n  padding: 15px 15px;\n  display: inline-block;\n  cursor: pointer;\n  transition-property: opacity, filter;\n  transition-duration: 0.15s;\n  transition-timing-function: linear;\n  font: inherit;\n  color: inherit;\n  text-transform: none;\n  background-color: transparent;\n  border: 0;\n  margin: 0;\n  overflow: visible; }\n  .hamburger:hover {\n    opacity: 0.7; }\n\n.hamburger-box {\n  width: 30px;\n  height: 18px;\n  display: inline-block;\n  position: relative; }\n\n.hamburger-inner {\n  display: block;\n  top: 50%;\n  margin-top: -1px; }\n  .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after {\n    width: 30px;\n    height: 2px;\n    background-color: #2196F3;\n    border-radius: 4px;\n    position: absolute;\n    transition-property: transform;\n    transition-duration: 0.15s;\n    transition-timing-function: ease; }\n  .hamburger-inner::before, .hamburger-inner::after {\n    content: \"\";\n    display: block; }\n  .hamburger-inner::before {\n    top: -8px; }\n  .hamburger-inner::after {\n    bottom: -8px; }\n\n/*\n   * Squeeze\n   */\n.hamburger--squeeze .hamburger-inner {\n  transition-duration: 0.1s;\n  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  .hamburger--squeeze .hamburger-inner::before {\n    transition: top 0.1s 0.14s ease, opacity 0.1s ease; }\n  .hamburger--squeeze .hamburger-inner::after {\n    transition: bottom 0.1s 0.14s ease, transform 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n\n.hamburger--squeeze.is-active .hamburger-inner {\n  transform: rotate(45deg);\n  transition-delay: 0.14s;\n  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  .hamburger--squeeze.is-active .hamburger-inner::before {\n    top: 0;\n    opacity: 0;\n    transition: top 0.1s ease, opacity 0.1s 0.14s ease; }\n  .hamburger--squeeze.is-active .hamburger-inner::after {\n    bottom: 0;\n    transform: rotate(-90deg);\n    transition: bottom 0.1s ease, transform 0.1s 0.14s cubic-bezier(0.215, 0.61, 0.355, 1); }\n\n#menu-btn {\n  position: relative;\n  background: none;\n  border: none;\n  cursor: pointer;\n  z-index: 2;\n  transition: 0.5s; }\n  #menu-btn .hamburger-inner,\n  #menu-btn .hamburger-inner::before,\n  #menu-btn .hamburger-inner::after {\n    transition: 1s; }\n  #menu-btn.is-active .hamburger-inner,\n  #menu-btn.is-active .hamburger-inner::before,\n  #menu-btn.is-active .hamburger-inner::after {\n    background-color: #f4f5f6; }\n  #menu-btn:hover .hamburger-inner,\n  #menu-btn:hover .hamburger-inner::before,\n  #menu-btn:hover .hamburger-inner::after {\n    transition: 0.3s;\n    box-shadow: 2px 8px 5px rgba(0, 0, 0, 0.3); }\n\n#navbar {\n  background-color: #f4f5f6;\n  padding-top: 20px;\n  margin-bottom: -20px;\n  height: 0; }\n  #navbar ul {\n    margin: 0; }\n    #navbar ul li {\n      text-transform: capitalize;\n      display: inline-block;\n      padding: 0 10px;\n      opacity: 0.8;\n      color: #2196F3; }\n      #navbar ul li a {\n        color: #2196F3;\n        text-decoration: none; }\n\n#navbar .undertablet {\n  padding-left: 15px; }\n\n#navbar.mobile {\n  transition: 0.5s; }\n  #navbar.mobile #menu-btn .hamburger-inner,\n  #navbar.mobile #menu-btn .hamburger-inner::before,\n  #navbar.mobile #menu-btn .hamburger-inner::after {\n    background-color: white; }\n  #navbar.mobile .menuwrap {\n    transition: 0.5s;\n    z-index: 1;\n    display: block;\n    position: fixed;\n    width: 100vw;\n    height: 100vh;\n    top: 0;\n    left: 0;\n    background: #2196F3; }\n    #navbar.mobile .menuwrap ul#themenu {\n      height: 100vh;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-direction: column;\n      list-style: none;\n      text-align: center;\n      margin: 0;\n      padding: 0; }\n      #navbar.mobile .menuwrap ul#themenu li.menuitem {\n        width: 100%;\n        font-size: 1.5rem;\n        color: white;\n        cursor: pointer;\n        margin: 10px 0;\n        padding: 10px 0;\n        display: block; }\n        #navbar.mobile .menuwrap ul#themenu li.menuitem a {\n          color: white; }\n\n/* header block */\n#header {\n  height: 350px;\n  text-align: center;\n  background-color: #f4f5f6;\n  color: #2196F3;\n  display: flex;\n  justify-content: center;\n  flex-direction: column; }\n  #header h1 {\n    margin: 0;\n    padding: 20px 0; }\n\n#featuredimg {\n  width: 96%;\n  padding: 0 2%;\n  text-align: center; }\n  #featuredimg img {\n    width: 600px;\n    max-width: 100%;\n    margin-top: -50px;\n    background-color: white; }\n\n/* Get Index */\n.container a.postlist {\n  color: #2196F3;\n  text-decoration: none; }\n  .container a.postlist article {\n    margin: 0 0 40px 0; }\n    .container a.postlist article h3 {\n      margin-bottom: 0; }\n    .container a.postlist article span {\n      font-style: italic; }\n\n/* Get Index */\n#index {\n  text-align: center;\n  margin-top: -110px;\n  text-align: center; }\n\n/* Get Search */\n#search {\n  text-align: center; }\n  #search #searchbar {\n    margin-bottom: 50px;\n    margin-top: 50px; }\n  #search #searchinput {\n    width: 100%;\n    padding: 10px;\n    font-size: 20px;\n    border: none;\n    text-align: center;\n    color: #2196F3;\n    background: #f4f5f6; }\n\n/* Grab footer */\n#footer {\n  padding: 15px;\n  text-align: center;\n  font-style: italic;\n  background-color: #f4f5f6;\n  font-size: 12px;\n  opacity: 0.8; }\n", ""]);
	
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
	var menu = function menu(dom) {
		return new Promise(function (resolve, reject) {
			// Grab the menu button
			var menubutton = dom.getElementById('menu-btn');
			// Add click listener
			menubutton.onclick = function (event) {
				// Toggle mobile class on click
				dom.getElementById('navbar').classList.toggle('mobile');
			};
			resolve();
		});
	};
	
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Search = function () {
		function Search(props) {
			var _this = this;
	
			_classCallCheck(this, Search);
	
			console.log('This is the search page');
			// Set the input field ID
			this.input = props;
			// Get posts db
			(0, _ajax2.default)('/posts.json').then(function (posts) {
				_this.posts = JSON.parse(posts);
			});
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
				var _this2 = this;
	
				var searchbar = document.getElementById(this.input);
				// Set the handler for the user input
				searchbar.oninput = this.timesearch.bind(this);
				// Reset the search limiter
				setInterval(function () {
					_this2.searchlimit = false;
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

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map