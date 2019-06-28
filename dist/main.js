/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/classes/Game.js":
/*!****************************!*\
  !*** ./js/classes/Game.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var classes_MovingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classes/MovingObject.js */ "./js/classes/MovingObject.js");
/* harmony import */ var utility_Canvas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utility/Canvas.js */ "./js/utility/Canvas.js");
/* harmony import */ var classes_Ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classes/Ship.js */ "./js/classes/Ship.js");




const ASTROID_COUNT = 100

class Game {
    constructor() {
        this.astroids = []
        this.ship = new classes_Ship_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }
    move() {
        this.astroids.forEach(movingObject => {
            movingObject.move();
        })
        this.ship.move()
    }
    draw() {
        this.astroids.forEach(movingObject => {
            movingObject.draw();
        })
        this.ship.draw()
    }
    deleteOutOfBounds() {
        this.astroids = this.astroids.filter(astroid => {
            return astroid.inBounds()
        })
    }
    repopulateAstroids() {
        while(this.astroids.length < ASTROID_COUNT) {
            this.astroids.push(classes_MovingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"].onBoundsCreateRandom())
        }
    }
    tick() {
        utility_Canvas_js__WEBPACK_IMPORTED_MODULE_1__["default"].clear()
        this.repopulateAstroids()
        this.move()
        this.deleteOutOfBounds()
        this.draw()
        requestAnimationFrame(this.tick.bind(this))
    }
}

/***/ }),

/***/ "./js/classes/MovingObject.js":
/*!************************************!*\
  !*** ./js/classes/MovingObject.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MovingObject; });
/* harmony import */ var utility_Canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utility/Canvas.js */ "./js/utility/Canvas.js");
/* harmony import */ var classes_Vec2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classes/Vec2.js */ "./js/classes/Vec2.js");


const RADIUS = 20
const MAX_SPEED = 5
const { random } = Math

class MovingObject {
    constructor({position = classes_Vec2_js__WEBPACK_IMPORTED_MODULE_1__["CENTER"], velocity = classes_Vec2_js__WEBPACK_IMPORTED_MODULE_1__["CHILL_VECTOR"]} = {}) {
        this.position = position;
        this.velocity = velocity;
    }

    move () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    draw() {
        utility_Canvas_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawCircle({
            ...this.position,
            radius: RADIUS,
            color: this.color
        });
    }
    inBounds() {
        return (
            this.position.x - RADIUS < utility_Canvas_js__WEBPACK_IMPORTED_MODULE_0__["canvas"].width &&
            this.position.x + RADIUS > 0 &&
            this.position.y + RADIUS > 0 &&
            this.position.y - RADIUS < utility_Canvas_js__WEBPACK_IMPORTED_MODULE_0__["canvas"].height
        )
    }
    static createRandom() {
        const position = classes_Vec2_js__WEBPACK_IMPORTED_MODULE_1__["default"].createRandomInRectangle({width: 500, height: 500})
        const velocity = classes_Vec2_js__WEBPACK_IMPORTED_MODULE_1__["default"].createRandomInRadius(MAX_SPEED)
        return new MovingObject({position, velocity})
    }
    static onBoundsCreateRandom() {
        const movingObject = MovingObject.createRandom()

        const xOrY = random() < .5 ? 'x' : 'y'
        const newXorY = random() < .5 ? 0 - RADIUS : 500 + RADIUS

        movingObject.position[xOrY] = newXorY

        return movingObject
    }
}

/***/ }),

/***/ "./js/classes/Ship.js":
/*!****************************!*\
  !*** ./js/classes/Ship.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ship; });
/* harmony import */ var classes_MovingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classes/MovingObject.js */ "./js/classes/MovingObject.js");
/* harmony import */ var utility_Canvas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utility/Canvas.js */ "./js/utility/Canvas.js");
/* harmony import */ var classes_Vec2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classes/Vec2.js */ "./js/classes/Vec2.js");
/* harmony import */ var keymaster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! keymaster */ "./node_modules/keymaster/keymaster.js");
/* harmony import */ var keymaster__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(keymaster__WEBPACK_IMPORTED_MODULE_3__);





const {PI:pi, cos, sin} = Math
const SHIP_RADIUS_BODY = 10
const SHIP_RADIUS_HEAD = 5

const ACCLERATION = .1
class Ship extends classes_MovingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(args) {
        super(args)
        this.direction = -pi/2
        this.color =  '#88f'
    }
    draw() {
        utility_Canvas_js__WEBPACK_IMPORTED_MODULE_1__["default"].drawCircle({
            ...this.position,
            radius: SHIP_RADIUS_BODY,
            color: this.color
        });
        var headPosition = new classes_Vec2_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
            x: cos(this.direction) * SHIP_RADIUS_BODY,
            y: sin(this.direction) * SHIP_RADIUS_BODY
        })
        utility_Canvas_js__WEBPACK_IMPORTED_MODULE_1__["default"].drawCircle({
            ...this.position.add(headPosition),
            radius: SHIP_RADIUS_HEAD,
            color: this.color
        });
    }
    move() {
        if (keymaster__WEBPACK_IMPORTED_MODULE_3___default.a.isPressed("left")) {
            this.direction -= .1
        }
        if (keymaster__WEBPACK_IMPORTED_MODULE_3___default.a.isPressed("right")) {
            this.direction += .1
        }

        this.velocity = this.velocity.add(this.acceleration)
        this.position = this.position.add(this.velocity)
    }
    get acceleration() {
        if (!keymaster__WEBPACK_IMPORTED_MODULE_3___default.a.isPressed("up")) { return classes_Vec2_js__WEBPACK_IMPORTED_MODULE_2__["CHILL_VECTOR"] }

        return new classes_Vec2_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
            x: ACCLERATION * cos(this.direction),
            y: ACCLERATION * sin(this.direction)
        })
    }
}

/***/ }),

/***/ "./js/classes/Vec2.js":
/*!****************************!*\
  !*** ./js/classes/Vec2.js ***!
  \****************************/
/*! exports provided: default, CENTER, CHILL_VECTOR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vec2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CENTER", function() { return CENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHILL_VECTOR", function() { return CHILL_VECTOR; });
const {random, PI:pi, cos, sin} = Math
class Vec2 {
    constructor({x = 0, y = 0}) {
        this.x = x
        this.y = y
    }
    add(vector) {
        return new Vec2({
            x: this.x + vector.x,
            y: this.y + vector.y,
        })
    }
    static createRandomInRadius(radius) {
        const magnitude = random() * radius
        const angle = random() * 2 * pi
        
        return new Vec2({
            x: cos(angle) * magnitude,
            y: sin(angle) * magnitude
        })
    }
    static createRandomInRectangle({width,height}) {
        return new Vec2({
            x: random() * width,
            y: random() * height
        })
    }
}
const CENTER = new Vec2({ x: 250, y: 250 })
const CHILL_VECTOR = new Vec2({ x: 0, y: 0 })

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classes_MovingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classes/MovingObject.js */ "./js/classes/MovingObject.js");
/* harmony import */ var classes_Game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classes/Game.js */ "./js/classes/Game.js");



const game = new classes_Game_js__WEBPACK_IMPORTED_MODULE_1__["default"]()

game.tick()

/***/ }),

/***/ "./js/utility/Canvas.js":
/*!******************************!*\
  !*** ./js/utility/Canvas.js ***!
  \******************************/
/*! exports provided: canvas, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
const canvas = document.getElementById('canvas-stage')
const context = canvas.getContext('2d')

const { PI } = Math

/* harmony default export */ __webpack_exports__["default"] = ({
    drawCircle({ x, y, radius, color = 'white', lineWidth = 2 }) {
        context.beginPath()

        context.lineWidth = lineWidth
        context.strokeStyle = color
        context.arc(x, y, radius, 0, 2 * PI)

        context.closePath()
        context.stroke()
    },
    clear() {
        context.clearRect(0,0,1E9,1E9)
    }
});

/***/ }),

/***/ "./node_modules/keymaster/keymaster.js":
/*!*********************************************!*\
  !*** ./node_modules/keymaster/keymaster.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//     keymaster.js
//     (c) 2011-2013 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var k,
    _handlers = {},
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    // modifier keys
    _MODIFIERS = {
      '⇧': 16, shift: 16,
      '⌥': 18, alt: 18, option: 18,
      '⌃': 17, ctrl: 17, control: 17,
      '⌘': 91, command: 91
    },
    // special keys
    _MAP = {
      backspace: 8, tab: 9, clear: 12,
      enter: 13, 'return': 13,
      esc: 27, escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40,
      del: 46, 'delete': 46,
      home: 36, end: 35,
      pageup: 33, pagedown: 34,
      ',': 188, '.': 190, '/': 191,
      '`': 192, '-': 189, '=': 187,
      ';': 186, '\'': 222,
      '[': 219, ']': 221, '\\': 220
    },
    code = function(x){
      return _MAP[x] || x.toUpperCase().charCodeAt(0);
    },
    _downKeys = [];

  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

  // IE doesn't support Array#indexOf, so have a simple replacement
  function index(array, item){
    var i = array.length;
    while(i--) if(array[i]===item) return i;
    return -1;
  }

  // for comparing mods before unassignment
  function compareArray(a1, a2) {
    if (a1.length != a2.length) return false;
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  var modifierMap = {
      16:'shiftKey',
      18:'altKey',
      17:'ctrlKey',
      91:'metaKey'
  };
  function updateModifierKey(event) {
      for(k in _mods) _mods[k] = event[modifierMap[k]];
  };

  // handle keydown event
  function dispatch(event) {
    var key, handler, k, i, modifiersMatch, scope;
    key = event.keyCode;

    if (index(_downKeys, key) == -1) {
        _downKeys.push(key);
    }

    // if a modifier key, set the key.<modifierkeyname> property to true and return
    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
    if(key in _mods) {
      _mods[key] = true;
      // 'assignKey' from inside this closure is exported to window.key
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
      return;
    }
    updateModifierKey(event);

    // see if we need to ignore the keypress (filter() can can be overridden)
    // by default ignore key presses if a select, textarea, or input is focused
    if(!assignKey.filter.call(this, event)) return;

    // abort if no potentially matching shortcuts found
    if (!(key in _handlers)) return;

    scope = getScope();

    // for each potential shortcut
    for (i = 0; i < _handlers[key].length; i++) {
      handler = _handlers[key][i];

      // see if it's in the current scope
      if(handler.scope == scope || handler.scope == 'all'){
        // check if modifiers match if any
        modifiersMatch = handler.mods.length > 0;
        for(k in _mods)
          if((!_mods[k] && index(handler.mods, +k) > -1) ||
            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
        // call the handler and stop the event if neccessary
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
          if(handler.method(event, handler)===false){
            if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;
            if(event.stopPropagation) event.stopPropagation();
            if(event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
  };

  // unset modifier keys on keyup
  function clearModifier(event){
    var key = event.keyCode, k,
        i = index(_downKeys, key);

    // remove key from _downKeys
    if (i >= 0) {
        _downKeys.splice(i, 1);
    }

    if(key == 93 || key == 224) key = 91;
    if(key in _mods) {
      _mods[key] = false;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
    }
  };

  function resetModifiers() {
    for(k in _mods) _mods[k] = false;
    for(k in _MODIFIERS) assignKey[k] = false;
  };

  // parse and assign shortcut
  function assignKey(key, scope, method){
    var keys, mods;
    keys = getKeys(key);
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }

    // for each shortcut
    for (var i = 0; i < keys.length; i++) {
      // set modifier keys if any
      mods = [];
      key = keys[i].split('+');
      if (key.length > 1){
        mods = getMods(key);
        key = [key[key.length-1]];
      }
      // convert to keycode and...
      key = key[0]
      key = code(key);
      // ...store handler
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
    }
  };

  // unbind all handlers for given key in current scope
  function unbindKey(key, scope) {
    var multipleKeys, keys,
      mods = [],
      i, j, obj;

    multipleKeys = getKeys(key);

    for (j = 0; j < multipleKeys.length; j++) {
      keys = multipleKeys[j].split('+');

      if (keys.length > 1) {
        mods = getMods(keys);
        key = keys[keys.length - 1];
      }

      key = code(key);

      if (scope === undefined) {
        scope = getScope();
      }
      if (!_handlers[key]) {
        return;
      }
      for (i = 0; i < _handlers[key].length; i++) {
        obj = _handlers[key][i];
        // only clear handlers if correct scope and mods match
        if (obj.scope === scope && compareArray(obj.mods, mods)) {
          _handlers[key][i] = {};
        }
      }
    }
  };

  // Returns true if the key with code 'keyCode' is currently down
  // Converts strings into key codes.
  function isPressed(keyCode) {
      if (typeof(keyCode)=='string') {
        keyCode = code(keyCode);
      }
      return index(_downKeys, keyCode) != -1;
  }

  function getPressedKeyCodes() {
      return _downKeys.slice(0);
  }

  function filter(event){
    var tagName = (event.target || event.srcElement).tagName;
    // ignore keypressed in any elements that support keyboard data input
    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }

  // initialize key.<modifier> to false
  for(k in _MODIFIERS) assignKey[k] = false;

  // set current scope (default 'all')
  function setScope(scope){ _scope = scope || 'all' };
  function getScope(){ return _scope || 'all' };

  // delete all handlers for a given scope
  function deleteScope(scope){
    var key, handlers, i;

    for (key in _handlers) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);
        else i++;
      }
    }
  };

  // abstract key logic for assign and unassign
  function getKeys(key) {
    var keys;
    key = key.replace(/\s/g, '');
    keys = key.split(',');
    if ((keys[keys.length - 1]) == '') {
      keys[keys.length - 2] += ',';
    }
    return keys;
  }

  // abstract mods logic for assign and unassign
  function getMods(key) {
    var mods = key.slice(0, key.length - 1);
    for (var mi = 0; mi < mods.length; mi++)
    mods[mi] = _MODIFIERS[mods[mi]];
    return mods;
  }

  // cross-browser events
  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };

  // set the handlers globally on document
  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
  addEvent(document, 'keyup', clearModifier);

  // reset modifiers to false whenever the window is (re)focused.
  addEvent(window, 'focus', resetModifiers);

  // store previously defined key
  var previousKey = global.key;

  // restore previously defined key and return reference to our key object
  function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
  }

  // set window.key and window.key.set/get/deleteScope, and the default filter
  global.key = assignKey;
  global.key.setScope = setScope;
  global.key.getScope = getScope;
  global.key.deleteScope = deleteScope;
  global.key.filter = filter;
  global.key.isPressed = isPressed;
  global.key.getPressedKeyCodes = getPressedKeyCodes;
  global.key.noConflict = noConflict;
  global.key.unbind = unbindKey;

  if(true) module.exports = assignKey;

})(this);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvY2xhc3Nlcy9HYW1lLmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvTW92aW5nT2JqZWN0LmpzIiwid2VicGFjazovLy8uL2pzL2NsYXNzZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jbGFzc2VzL1ZlYzIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vanMvdXRpbGl0eS9DYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2tleW1hc3Rlci9rZXltYXN0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtEO0FBQ1o7QUFDSDs7QUFFbkM7O0FBRWU7QUFDZjtBQUNBO0FBQ0Esd0JB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OztBQUV0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixxQkFBcUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHVCQUF1QjtBQUN2RTs7QUFFQTtBQUNBLGlEQUFpRCxrQkFBa0IsRUFBRTtBQUNyRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUssSUFBNkI7O0FBRWxDLENBQUMiLCJmaWxlIjoiZGlzdC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9qcy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnY2xhc3Nlcy9Nb3ZpbmdPYmplY3QuanMnXG5pbXBvcnQgQ2FudmFzIGZyb20gJ3V0aWxpdHkvQ2FudmFzLmpzJ1xuaW1wb3J0IFNoaXAgZnJvbSAnY2xhc3Nlcy9TaGlwLmpzJztcblxuY29uc3QgQVNUUk9JRF9DT1VOVCA9IDEwMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hc3Ryb2lkcyA9IFtdXG4gICAgICAgIHRoaXMuc2hpcCA9IG5ldyBTaGlwKCk7XG4gICAgfVxuICAgIG1vdmUoKSB7XG4gICAgICAgIHRoaXMuYXN0cm9pZHMuZm9yRWFjaChtb3ZpbmdPYmplY3QgPT4ge1xuICAgICAgICAgICAgbW92aW5nT2JqZWN0Lm1vdmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zaGlwLm1vdmUoKVxuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmFzdHJvaWRzLmZvckVhY2gobW92aW5nT2JqZWN0ID0+IHtcbiAgICAgICAgICAgIG1vdmluZ09iamVjdC5kcmF3KCk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2hpcC5kcmF3KClcbiAgICB9XG4gICAgZGVsZXRlT3V0T2ZCb3VuZHMoKSB7XG4gICAgICAgIHRoaXMuYXN0cm9pZHMgPSB0aGlzLmFzdHJvaWRzLmZpbHRlcihhc3Ryb2lkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhc3Ryb2lkLmluQm91bmRzKClcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcmVwb3B1bGF0ZUFzdHJvaWRzKCkge1xuICAgICAgICB3aGlsZSh0aGlzLmFzdHJvaWRzLmxlbmd0aCA8IEFTVFJPSURfQ09VTlQpIHtcbiAgICAgICAgICAgIHRoaXMuYXN0cm9pZHMucHVzaChNb3ZpbmdPYmplY3Qub25Cb3VuZHNDcmVhdGVSYW5kb20oKSlcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aWNrKCkge1xuICAgICAgICBDYW52YXMuY2xlYXIoKVxuICAgICAgICB0aGlzLnJlcG9wdWxhdGVBc3Ryb2lkcygpXG4gICAgICAgIHRoaXMubW92ZSgpXG4gICAgICAgIHRoaXMuZGVsZXRlT3V0T2ZCb3VuZHMoKVxuICAgICAgICB0aGlzLmRyYXcoKVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy50aWNrLmJpbmQodGhpcykpXG4gICAgfVxufSIsImltcG9ydCBDYW52YXMsIHtjYW52YXN9IGZyb20gJ3V0aWxpdHkvQ2FudmFzLmpzJ1xuaW1wb3J0IFZlYzIsIHsgQ0VOVEVSLCBDSElMTF9WRUNUT1IgfSBmcm9tICdjbGFzc2VzL1ZlYzIuanMnXG5jb25zdCBSQURJVVMgPSAyMFxuY29uc3QgTUFYX1NQRUVEID0gNVxuY29uc3QgeyByYW5kb20gfSA9IE1hdGhcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih7cG9zaXRpb24gPSBDRU5URVIsIHZlbG9jaXR5ID0gQ0hJTExfVkVDVE9SfSA9IHt9KSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIH1cblxuICAgIG1vdmUgKCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy52ZWxvY2l0eS54O1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy52ZWxvY2l0eS55O1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICBDYW52YXMuZHJhd0NpcmNsZSh7XG4gICAgICAgICAgICAuLi50aGlzLnBvc2l0aW9uLFxuICAgICAgICAgICAgcmFkaXVzOiBSQURJVVMsXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvclxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW5Cb3VuZHMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggLSBSQURJVVMgPCBjYW52YXMud2lkdGggJiZcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCArIFJBRElVUyA+IDAgJiZcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSArIFJBRElVUyA+IDAgJiZcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSAtIFJBRElVUyA8IGNhbnZhcy5oZWlnaHRcbiAgICAgICAgKVxuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlUmFuZG9tKCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFZlYzIuY3JlYXRlUmFuZG9tSW5SZWN0YW5nbGUoe3dpZHRoOiA1MDAsIGhlaWdodDogNTAwfSlcbiAgICAgICAgY29uc3QgdmVsb2NpdHkgPSBWZWMyLmNyZWF0ZVJhbmRvbUluUmFkaXVzKE1BWF9TUEVFRClcbiAgICAgICAgcmV0dXJuIG5ldyBNb3ZpbmdPYmplY3Qoe3Bvc2l0aW9uLCB2ZWxvY2l0eX0pXG4gICAgfVxuICAgIHN0YXRpYyBvbkJvdW5kc0NyZWF0ZVJhbmRvbSgpIHtcbiAgICAgICAgY29uc3QgbW92aW5nT2JqZWN0ID0gTW92aW5nT2JqZWN0LmNyZWF0ZVJhbmRvbSgpXG5cbiAgICAgICAgY29uc3QgeE9yWSA9IHJhbmRvbSgpIDwgLjUgPyAneCcgOiAneSdcbiAgICAgICAgY29uc3QgbmV3WG9yWSA9IHJhbmRvbSgpIDwgLjUgPyAwIC0gUkFESVVTIDogNTAwICsgUkFESVVTXG5cbiAgICAgICAgbW92aW5nT2JqZWN0LnBvc2l0aW9uW3hPclldID0gbmV3WG9yWVxuXG4gICAgICAgIHJldHVybiBtb3ZpbmdPYmplY3RcbiAgICB9XG59IiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICdjbGFzc2VzL01vdmluZ09iamVjdC5qcydcbmltcG9ydCBDYW52YXMgZnJvbSAndXRpbGl0eS9DYW52YXMuanMnXG5pbXBvcnQgVmVjMiwgeyBDSElMTF9WRUNUT1IgfSBmcm9tICdjbGFzc2VzL1ZlYzIuanMnO1xuaW1wb3J0IGtleSBmcm9tICdrZXltYXN0ZXInXG5cbmNvbnN0IHtQSTpwaSwgY29zLCBzaW59ID0gTWF0aFxuY29uc3QgU0hJUF9SQURJVVNfQk9EWSA9IDEwXG5jb25zdCBTSElQX1JBRElVU19IRUFEID0gNVxuXG5jb25zdCBBQ0NMRVJBVElPTiA9IC4xXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIHN1cGVyKGFyZ3MpXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gLXBpLzJcbiAgICAgICAgdGhpcy5jb2xvciA9ICAnIzg4ZidcbiAgICB9XG4gICAgZHJhdygpIHtcbiAgICAgICAgQ2FudmFzLmRyYXdDaXJjbGUoe1xuICAgICAgICAgICAgLi4udGhpcy5wb3NpdGlvbixcbiAgICAgICAgICAgIHJhZGl1czogU0hJUF9SQURJVVNfQk9EWSxcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgaGVhZFBvc2l0aW9uID0gbmV3IFZlYzIoe1xuICAgICAgICAgICAgeDogY29zKHRoaXMuZGlyZWN0aW9uKSAqIFNISVBfUkFESVVTX0JPRFksXG4gICAgICAgICAgICB5OiBzaW4odGhpcy5kaXJlY3Rpb24pICogU0hJUF9SQURJVVNfQk9EWVxuICAgICAgICB9KVxuICAgICAgICBDYW52YXMuZHJhd0NpcmNsZSh7XG4gICAgICAgICAgICAuLi50aGlzLnBvc2l0aW9uLmFkZChoZWFkUG9zaXRpb24pLFxuICAgICAgICAgICAgcmFkaXVzOiBTSElQX1JBRElVU19IRUFELFxuICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1vdmUoKSB7XG4gICAgICAgIGlmIChrZXkuaXNQcmVzc2VkKFwibGVmdFwiKSkge1xuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gLT0gLjFcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5LmlzUHJlc3NlZChcInJpZ2h0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiArPSAuMVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkuYWRkKHRoaXMuYWNjZWxlcmF0aW9uKVxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy52ZWxvY2l0eSlcbiAgICB9XG4gICAgZ2V0IGFjY2VsZXJhdGlvbigpIHtcbiAgICAgICAgaWYgKCFrZXkuaXNQcmVzc2VkKFwidXBcIikpIHsgcmV0dXJuIENISUxMX1ZFQ1RPUiB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHtcbiAgICAgICAgICAgIHg6IEFDQ0xFUkFUSU9OICogY29zKHRoaXMuZGlyZWN0aW9uKSxcbiAgICAgICAgICAgIHk6IEFDQ0xFUkFUSU9OICogc2luKHRoaXMuZGlyZWN0aW9uKVxuICAgICAgICB9KVxuICAgIH1cbn0iLCJjb25zdCB7cmFuZG9tLCBQSTpwaSwgY29zLCBzaW59ID0gTWF0aFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjMiB7XG4gICAgY29uc3RydWN0b3Ioe3ggPSAwLCB5ID0gMH0pIHtcbiAgICAgICAgdGhpcy54ID0geFxuICAgICAgICB0aGlzLnkgPSB5XG4gICAgfVxuICAgIGFkZCh2ZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHtcbiAgICAgICAgICAgIHg6IHRoaXMueCArIHZlY3Rvci54LFxuICAgICAgICAgICAgeTogdGhpcy55ICsgdmVjdG9yLnksXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVSYW5kb21JblJhZGl1cyhyYWRpdXMpIHtcbiAgICAgICAgY29uc3QgbWFnbml0dWRlID0gcmFuZG9tKCkgKiByYWRpdXNcbiAgICAgICAgY29uc3QgYW5nbGUgPSByYW5kb20oKSAqIDIgKiBwaVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHtcbiAgICAgICAgICAgIHg6IGNvcyhhbmdsZSkgKiBtYWduaXR1ZGUsXG4gICAgICAgICAgICB5OiBzaW4oYW5nbGUpICogbWFnbml0dWRlXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVSYW5kb21JblJlY3RhbmdsZSh7d2lkdGgsaGVpZ2h0fSkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzIoe1xuICAgICAgICAgICAgeDogcmFuZG9tKCkgKiB3aWR0aCxcbiAgICAgICAgICAgIHk6IHJhbmRvbSgpICogaGVpZ2h0XG4gICAgICAgIH0pXG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IENFTlRFUiA9IG5ldyBWZWMyKHsgeDogMjUwLCB5OiAyNTAgfSlcbmV4cG9ydCBjb25zdCBDSElMTF9WRUNUT1IgPSBuZXcgVmVjMih7IHg6IDAsIHk6IDAgfSkiLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJ2NsYXNzZXMvTW92aW5nT2JqZWN0LmpzJ1xuXG5pbXBvcnQgR2FtZSBmcm9tICdjbGFzc2VzL0dhbWUuanMnXG5jb25zdCBnYW1lID0gbmV3IEdhbWUoKVxuXG5nYW1lLnRpY2soKSIsImV4cG9ydCBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzLXN0YWdlJylcbmNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG5jb25zdCB7IFBJIH0gPSBNYXRoXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkcmF3Q2lyY2xlKHsgeCwgeSwgcmFkaXVzLCBjb2xvciA9ICd3aGl0ZScsIGxpbmVXaWR0aCA9IDIgfSkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpXG5cbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGhcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yXG4gICAgICAgIGNvbnRleHQuYXJjKHgsIHksIHJhZGl1cywgMCwgMiAqIFBJKVxuXG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKClcbiAgICAgICAgY29udGV4dC5zdHJva2UoKVxuICAgIH0sXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsMCwxRTksMUU5KVxuICAgIH1cbn0iLCIvLyAgICAga2V5bWFzdGVyLmpzXG4vLyAgICAgKGMpIDIwMTEtMjAxMyBUaG9tYXMgRnVjaHNcbi8vICAgICBrZXltYXN0ZXIuanMgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbjsoZnVuY3Rpb24oZ2xvYmFsKXtcbiAgdmFyIGssXG4gICAgX2hhbmRsZXJzID0ge30sXG4gICAgX21vZHMgPSB7IDE2OiBmYWxzZSwgMTg6IGZhbHNlLCAxNzogZmFsc2UsIDkxOiBmYWxzZSB9LFxuICAgIF9zY29wZSA9ICdhbGwnLFxuICAgIC8vIG1vZGlmaWVyIGtleXNcbiAgICBfTU9ESUZJRVJTID0ge1xuICAgICAgJ+KHpyc6IDE2LCBzaGlmdDogMTYsXG4gICAgICAn4oylJzogMTgsIGFsdDogMTgsIG9wdGlvbjogMTgsXG4gICAgICAn4oyDJzogMTcsIGN0cmw6IDE3LCBjb250cm9sOiAxNyxcbiAgICAgICfijJgnOiA5MSwgY29tbWFuZDogOTFcbiAgICB9LFxuICAgIC8vIHNwZWNpYWwga2V5c1xuICAgIF9NQVAgPSB7XG4gICAgICBiYWNrc3BhY2U6IDgsIHRhYjogOSwgY2xlYXI6IDEyLFxuICAgICAgZW50ZXI6IDEzLCAncmV0dXJuJzogMTMsXG4gICAgICBlc2M6IDI3LCBlc2NhcGU6IDI3LCBzcGFjZTogMzIsXG4gICAgICBsZWZ0OiAzNywgdXA6IDM4LFxuICAgICAgcmlnaHQ6IDM5LCBkb3duOiA0MCxcbiAgICAgIGRlbDogNDYsICdkZWxldGUnOiA0NixcbiAgICAgIGhvbWU6IDM2LCBlbmQ6IDM1LFxuICAgICAgcGFnZXVwOiAzMywgcGFnZWRvd246IDM0LFxuICAgICAgJywnOiAxODgsICcuJzogMTkwLCAnLyc6IDE5MSxcbiAgICAgICdgJzogMTkyLCAnLSc6IDE4OSwgJz0nOiAxODcsXG4gICAgICAnOyc6IDE4NiwgJ1xcJyc6IDIyMixcbiAgICAgICdbJzogMjE5LCAnXSc6IDIyMSwgJ1xcXFwnOiAyMjBcbiAgICB9LFxuICAgIGNvZGUgPSBmdW5jdGlvbih4KXtcbiAgICAgIHJldHVybiBfTUFQW3hdIHx8IHgudG9VcHBlckNhc2UoKS5jaGFyQ29kZUF0KDApO1xuICAgIH0sXG4gICAgX2Rvd25LZXlzID0gW107XG5cbiAgZm9yKGs9MTtrPDIwO2srKykgX01BUFsnZicra10gPSAxMTEraztcblxuICAvLyBJRSBkb2Vzbid0IHN1cHBvcnQgQXJyYXkjaW5kZXhPZiwgc28gaGF2ZSBhIHNpbXBsZSByZXBsYWNlbWVudFxuICBmdW5jdGlvbiBpbmRleChhcnJheSwgaXRlbSl7XG4gICAgdmFyIGkgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUoaS0tKSBpZihhcnJheVtpXT09PWl0ZW0pIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8vIGZvciBjb21wYXJpbmcgbW9kcyBiZWZvcmUgdW5hc3NpZ25tZW50XG4gIGZ1bmN0aW9uIGNvbXBhcmVBcnJheShhMSwgYTIpIHtcbiAgICBpZiAoYTEubGVuZ3RoICE9IGEyLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYTEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGExW2ldICE9PSBhMltpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHZhciBtb2RpZmllck1hcCA9IHtcbiAgICAgIDE2OidzaGlmdEtleScsXG4gICAgICAxODonYWx0S2V5JyxcbiAgICAgIDE3OidjdHJsS2V5JyxcbiAgICAgIDkxOidtZXRhS2V5J1xuICB9O1xuICBmdW5jdGlvbiB1cGRhdGVNb2RpZmllcktleShldmVudCkge1xuICAgICAgZm9yKGsgaW4gX21vZHMpIF9tb2RzW2tdID0gZXZlbnRbbW9kaWZpZXJNYXBba11dO1xuICB9O1xuXG4gIC8vIGhhbmRsZSBrZXlkb3duIGV2ZW50XG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGV2ZW50KSB7XG4gICAgdmFyIGtleSwgaGFuZGxlciwgaywgaSwgbW9kaWZpZXJzTWF0Y2gsIHNjb3BlO1xuICAgIGtleSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICBpZiAoaW5kZXgoX2Rvd25LZXlzLCBrZXkpID09IC0xKSB7XG4gICAgICAgIF9kb3duS2V5cy5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgLy8gaWYgYSBtb2RpZmllciBrZXksIHNldCB0aGUga2V5Ljxtb2RpZmllcmtleW5hbWU+IHByb3BlcnR5IHRvIHRydWUgYW5kIHJldHVyblxuICAgIGlmKGtleSA9PSA5MyB8fCBrZXkgPT0gMjI0KSBrZXkgPSA5MTsgLy8gcmlnaHQgY29tbWFuZCBvbiB3ZWJraXQsIGNvbW1hbmQgb24gR2Vja29cbiAgICBpZihrZXkgaW4gX21vZHMpIHtcbiAgICAgIF9tb2RzW2tleV0gPSB0cnVlO1xuICAgICAgLy8gJ2Fzc2lnbktleScgZnJvbSBpbnNpZGUgdGhpcyBjbG9zdXJlIGlzIGV4cG9ydGVkIHRvIHdpbmRvdy5rZXlcbiAgICAgIGZvcihrIGluIF9NT0RJRklFUlMpIGlmKF9NT0RJRklFUlNba10gPT0ga2V5KSBhc3NpZ25LZXlba10gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB1cGRhdGVNb2RpZmllcktleShldmVudCk7XG5cbiAgICAvLyBzZWUgaWYgd2UgbmVlZCB0byBpZ25vcmUgdGhlIGtleXByZXNzIChmaWx0ZXIoKSBjYW4gY2FuIGJlIG92ZXJyaWRkZW4pXG4gICAgLy8gYnkgZGVmYXVsdCBpZ25vcmUga2V5IHByZXNzZXMgaWYgYSBzZWxlY3QsIHRleHRhcmVhLCBvciBpbnB1dCBpcyBmb2N1c2VkXG4gICAgaWYoIWFzc2lnbktleS5maWx0ZXIuY2FsbCh0aGlzLCBldmVudCkpIHJldHVybjtcblxuICAgIC8vIGFib3J0IGlmIG5vIHBvdGVudGlhbGx5IG1hdGNoaW5nIHNob3J0Y3V0cyBmb3VuZFxuICAgIGlmICghKGtleSBpbiBfaGFuZGxlcnMpKSByZXR1cm47XG5cbiAgICBzY29wZSA9IGdldFNjb3BlKCk7XG5cbiAgICAvLyBmb3IgZWFjaCBwb3RlbnRpYWwgc2hvcnRjdXRcbiAgICBmb3IgKGkgPSAwOyBpIDwgX2hhbmRsZXJzW2tleV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGhhbmRsZXIgPSBfaGFuZGxlcnNba2V5XVtpXTtcblxuICAgICAgLy8gc2VlIGlmIGl0J3MgaW4gdGhlIGN1cnJlbnQgc2NvcGVcbiAgICAgIGlmKGhhbmRsZXIuc2NvcGUgPT0gc2NvcGUgfHwgaGFuZGxlci5zY29wZSA9PSAnYWxsJyl7XG4gICAgICAgIC8vIGNoZWNrIGlmIG1vZGlmaWVycyBtYXRjaCBpZiBhbnlcbiAgICAgICAgbW9kaWZpZXJzTWF0Y2ggPSBoYW5kbGVyLm1vZHMubGVuZ3RoID4gMDtcbiAgICAgICAgZm9yKGsgaW4gX21vZHMpXG4gICAgICAgICAgaWYoKCFfbW9kc1trXSAmJiBpbmRleChoYW5kbGVyLm1vZHMsICtrKSA+IC0xKSB8fFxuICAgICAgICAgICAgKF9tb2RzW2tdICYmIGluZGV4KGhhbmRsZXIubW9kcywgK2spID09IC0xKSkgbW9kaWZpZXJzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgLy8gY2FsbCB0aGUgaGFuZGxlciBhbmQgc3RvcCB0aGUgZXZlbnQgaWYgbmVjY2Vzc2FyeVxuICAgICAgICBpZigoaGFuZGxlci5tb2RzLmxlbmd0aCA9PSAwICYmICFfbW9kc1sxNl0gJiYgIV9tb2RzWzE4XSAmJiAhX21vZHNbMTddICYmICFfbW9kc1s5MV0pIHx8IG1vZGlmaWVyc01hdGNoKXtcbiAgICAgICAgICBpZihoYW5kbGVyLm1ldGhvZChldmVudCwgaGFuZGxlcik9PT1mYWxzZSl7XG4gICAgICAgICAgICBpZihldmVudC5wcmV2ZW50RGVmYXVsdCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgZWxzZSBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGlmKGV2ZW50LmNhbmNlbEJ1YmJsZSkgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gdW5zZXQgbW9kaWZpZXIga2V5cyBvbiBrZXl1cFxuICBmdW5jdGlvbiBjbGVhck1vZGlmaWVyKGV2ZW50KXtcbiAgICB2YXIga2V5ID0gZXZlbnQua2V5Q29kZSwgayxcbiAgICAgICAgaSA9IGluZGV4KF9kb3duS2V5cywga2V5KTtcblxuICAgIC8vIHJlbW92ZSBrZXkgZnJvbSBfZG93bktleXNcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIF9kb3duS2V5cy5zcGxpY2UoaSwgMSk7XG4gICAgfVxuXG4gICAgaWYoa2V5ID09IDkzIHx8IGtleSA9PSAyMjQpIGtleSA9IDkxO1xuICAgIGlmKGtleSBpbiBfbW9kcykge1xuICAgICAgX21vZHNba2V5XSA9IGZhbHNlO1xuICAgICAgZm9yKGsgaW4gX01PRElGSUVSUykgaWYoX01PRElGSUVSU1trXSA9PSBrZXkpIGFzc2lnbktleVtrXSA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiByZXNldE1vZGlmaWVycygpIHtcbiAgICBmb3IoayBpbiBfbW9kcykgX21vZHNba10gPSBmYWxzZTtcbiAgICBmb3IoayBpbiBfTU9ESUZJRVJTKSBhc3NpZ25LZXlba10gPSBmYWxzZTtcbiAgfTtcblxuICAvLyBwYXJzZSBhbmQgYXNzaWduIHNob3J0Y3V0XG4gIGZ1bmN0aW9uIGFzc2lnbktleShrZXksIHNjb3BlLCBtZXRob2Qpe1xuICAgIHZhciBrZXlzLCBtb2RzO1xuICAgIGtleXMgPSBnZXRLZXlzKGtleSk7XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtZXRob2QgPSBzY29wZTtcbiAgICAgIHNjb3BlID0gJ2FsbCc7XG4gICAgfVxuXG4gICAgLy8gZm9yIGVhY2ggc2hvcnRjdXRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHNldCBtb2RpZmllciBrZXlzIGlmIGFueVxuICAgICAgbW9kcyA9IFtdO1xuICAgICAga2V5ID0ga2V5c1tpXS5zcGxpdCgnKycpO1xuICAgICAgaWYgKGtleS5sZW5ndGggPiAxKXtcbiAgICAgICAgbW9kcyA9IGdldE1vZHMoa2V5KTtcbiAgICAgICAga2V5ID0gW2tleVtrZXkubGVuZ3RoLTFdXTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbnZlcnQgdG8ga2V5Y29kZSBhbmQuLi5cbiAgICAgIGtleSA9IGtleVswXVxuICAgICAga2V5ID0gY29kZShrZXkpO1xuICAgICAgLy8gLi4uc3RvcmUgaGFuZGxlclxuICAgICAgaWYgKCEoa2V5IGluIF9oYW5kbGVycykpIF9oYW5kbGVyc1trZXldID0gW107XG4gICAgICBfaGFuZGxlcnNba2V5XS5wdXNoKHsgc2hvcnRjdXQ6IGtleXNbaV0sIHNjb3BlOiBzY29wZSwgbWV0aG9kOiBtZXRob2QsIGtleToga2V5c1tpXSwgbW9kczogbW9kcyB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gdW5iaW5kIGFsbCBoYW5kbGVycyBmb3IgZ2l2ZW4ga2V5IGluIGN1cnJlbnQgc2NvcGVcbiAgZnVuY3Rpb24gdW5iaW5kS2V5KGtleSwgc2NvcGUpIHtcbiAgICB2YXIgbXVsdGlwbGVLZXlzLCBrZXlzLFxuICAgICAgbW9kcyA9IFtdLFxuICAgICAgaSwgaiwgb2JqO1xuXG4gICAgbXVsdGlwbGVLZXlzID0gZ2V0S2V5cyhrZXkpO1xuXG4gICAgZm9yIChqID0gMDsgaiA8IG11bHRpcGxlS2V5cy5sZW5ndGg7IGorKykge1xuICAgICAga2V5cyA9IG11bHRpcGxlS2V5c1tqXS5zcGxpdCgnKycpO1xuXG4gICAgICBpZiAoa2V5cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIG1vZHMgPSBnZXRNb2RzKGtleXMpO1xuICAgICAgICBrZXkgPSBrZXlzW2tleXMubGVuZ3RoIC0gMV07XG4gICAgICB9XG5cbiAgICAgIGtleSA9IGNvZGUoa2V5KTtcblxuICAgICAgaWYgKHNjb3BlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2NvcGUgPSBnZXRTY29wZSgpO1xuICAgICAgfVxuICAgICAgaWYgKCFfaGFuZGxlcnNba2V5XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgX2hhbmRsZXJzW2tleV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgb2JqID0gX2hhbmRsZXJzW2tleV1baV07XG4gICAgICAgIC8vIG9ubHkgY2xlYXIgaGFuZGxlcnMgaWYgY29ycmVjdCBzY29wZSBhbmQgbW9kcyBtYXRjaFxuICAgICAgICBpZiAob2JqLnNjb3BlID09PSBzY29wZSAmJiBjb21wYXJlQXJyYXkob2JqLm1vZHMsIG1vZHMpKSB7XG4gICAgICAgICAgX2hhbmRsZXJzW2tleV1baV0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBSZXR1cm5zIHRydWUgaWYgdGhlIGtleSB3aXRoIGNvZGUgJ2tleUNvZGUnIGlzIGN1cnJlbnRseSBkb3duXG4gIC8vIENvbnZlcnRzIHN0cmluZ3MgaW50byBrZXkgY29kZXMuXG4gIGZ1bmN0aW9uIGlzUHJlc3NlZChrZXlDb2RlKSB7XG4gICAgICBpZiAodHlwZW9mKGtleUNvZGUpPT0nc3RyaW5nJykge1xuICAgICAgICBrZXlDb2RlID0gY29kZShrZXlDb2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbmRleChfZG93bktleXMsIGtleUNvZGUpICE9IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHJlc3NlZEtleUNvZGVzKCkge1xuICAgICAgcmV0dXJuIF9kb3duS2V5cy5zbGljZSgwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcihldmVudCl7XG4gICAgdmFyIHRhZ05hbWUgPSAoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQpLnRhZ05hbWU7XG4gICAgLy8gaWdub3JlIGtleXByZXNzZWQgaW4gYW55IGVsZW1lbnRzIHRoYXQgc3VwcG9ydCBrZXlib2FyZCBkYXRhIGlucHV0XG4gICAgcmV0dXJuICEodGFnTmFtZSA9PSAnSU5QVVQnIHx8IHRhZ05hbWUgPT0gJ1NFTEVDVCcgfHwgdGFnTmFtZSA9PSAnVEVYVEFSRUEnKTtcbiAgfVxuXG4gIC8vIGluaXRpYWxpemUga2V5Ljxtb2RpZmllcj4gdG8gZmFsc2VcbiAgZm9yKGsgaW4gX01PRElGSUVSUykgYXNzaWduS2V5W2tdID0gZmFsc2U7XG5cbiAgLy8gc2V0IGN1cnJlbnQgc2NvcGUgKGRlZmF1bHQgJ2FsbCcpXG4gIGZ1bmN0aW9uIHNldFNjb3BlKHNjb3BlKXsgX3Njb3BlID0gc2NvcGUgfHwgJ2FsbCcgfTtcbiAgZnVuY3Rpb24gZ2V0U2NvcGUoKXsgcmV0dXJuIF9zY29wZSB8fCAnYWxsJyB9O1xuXG4gIC8vIGRlbGV0ZSBhbGwgaGFuZGxlcnMgZm9yIGEgZ2l2ZW4gc2NvcGVcbiAgZnVuY3Rpb24gZGVsZXRlU2NvcGUoc2NvcGUpe1xuICAgIHZhciBrZXksIGhhbmRsZXJzLCBpO1xuXG4gICAgZm9yIChrZXkgaW4gX2hhbmRsZXJzKSB7XG4gICAgICBoYW5kbGVycyA9IF9oYW5kbGVyc1trZXldO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgKSB7XG4gICAgICAgIGlmIChoYW5kbGVyc1tpXS5zY29wZSA9PT0gc2NvcGUpIGhhbmRsZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgZWxzZSBpKys7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIGFic3RyYWN0IGtleSBsb2dpYyBmb3IgYXNzaWduIGFuZCB1bmFzc2lnblxuICBmdW5jdGlvbiBnZXRLZXlzKGtleSkge1xuICAgIHZhciBrZXlzO1xuICAgIGtleSA9IGtleS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIGtleXMgPSBrZXkuc3BsaXQoJywnKTtcbiAgICBpZiAoKGtleXNba2V5cy5sZW5ndGggLSAxXSkgPT0gJycpIHtcbiAgICAgIGtleXNba2V5cy5sZW5ndGggLSAyXSArPSAnLCc7XG4gICAgfVxuICAgIHJldHVybiBrZXlzO1xuICB9XG5cbiAgLy8gYWJzdHJhY3QgbW9kcyBsb2dpYyBmb3IgYXNzaWduIGFuZCB1bmFzc2lnblxuICBmdW5jdGlvbiBnZXRNb2RzKGtleSkge1xuICAgIHZhciBtb2RzID0ga2V5LnNsaWNlKDAsIGtleS5sZW5ndGggLSAxKTtcbiAgICBmb3IgKHZhciBtaSA9IDA7IG1pIDwgbW9kcy5sZW5ndGg7IG1pKyspXG4gICAgbW9kc1ttaV0gPSBfTU9ESUZJRVJTW21vZHNbbWldXTtcbiAgICByZXR1cm4gbW9kcztcbiAgfVxuXG4gIC8vIGNyb3NzLWJyb3dzZXIgZXZlbnRzXG4gIGZ1bmN0aW9uIGFkZEV2ZW50KG9iamVjdCwgZXZlbnQsIG1ldGhvZCkge1xuICAgIGlmIChvYmplY3QuYWRkRXZlbnRMaXN0ZW5lcilcbiAgICAgIG9iamVjdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBtZXRob2QsIGZhbHNlKTtcbiAgICBlbHNlIGlmKG9iamVjdC5hdHRhY2hFdmVudClcbiAgICAgIG9iamVjdC5hdHRhY2hFdmVudCgnb24nK2V2ZW50LCBmdW5jdGlvbigpeyBtZXRob2Qod2luZG93LmV2ZW50KSB9KTtcbiAgfTtcblxuICAvLyBzZXQgdGhlIGhhbmRsZXJzIGdsb2JhbGx5IG9uIGRvY3VtZW50XG4gIGFkZEV2ZW50KGRvY3VtZW50LCAna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7IGRpc3BhdGNoKGV2ZW50KSB9KTsgLy8gUGFzc2luZyBfc2NvcGUgdG8gYSBjYWxsYmFjayB0byBlbnN1cmUgaXQgcmVtYWlucyB0aGUgc2FtZSBieSBleGVjdXRpb24uIEZpeGVzICM0OFxuICBhZGRFdmVudChkb2N1bWVudCwgJ2tleXVwJywgY2xlYXJNb2RpZmllcik7XG5cbiAgLy8gcmVzZXQgbW9kaWZpZXJzIHRvIGZhbHNlIHdoZW5ldmVyIHRoZSB3aW5kb3cgaXMgKHJlKWZvY3VzZWQuXG4gIGFkZEV2ZW50KHdpbmRvdywgJ2ZvY3VzJywgcmVzZXRNb2RpZmllcnMpO1xuXG4gIC8vIHN0b3JlIHByZXZpb3VzbHkgZGVmaW5lZCBrZXlcbiAgdmFyIHByZXZpb3VzS2V5ID0gZ2xvYmFsLmtleTtcblxuICAvLyByZXN0b3JlIHByZXZpb3VzbHkgZGVmaW5lZCBrZXkgYW5kIHJldHVybiByZWZlcmVuY2UgdG8gb3VyIGtleSBvYmplY3RcbiAgZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICB2YXIgayA9IGdsb2JhbC5rZXk7XG4gICAgZ2xvYmFsLmtleSA9IHByZXZpb3VzS2V5O1xuICAgIHJldHVybiBrO1xuICB9XG5cbiAgLy8gc2V0IHdpbmRvdy5rZXkgYW5kIHdpbmRvdy5rZXkuc2V0L2dldC9kZWxldGVTY29wZSwgYW5kIHRoZSBkZWZhdWx0IGZpbHRlclxuICBnbG9iYWwua2V5ID0gYXNzaWduS2V5O1xuICBnbG9iYWwua2V5LnNldFNjb3BlID0gc2V0U2NvcGU7XG4gIGdsb2JhbC5rZXkuZ2V0U2NvcGUgPSBnZXRTY29wZTtcbiAgZ2xvYmFsLmtleS5kZWxldGVTY29wZSA9IGRlbGV0ZVNjb3BlO1xuICBnbG9iYWwua2V5LmZpbHRlciA9IGZpbHRlcjtcbiAgZ2xvYmFsLmtleS5pc1ByZXNzZWQgPSBpc1ByZXNzZWQ7XG4gIGdsb2JhbC5rZXkuZ2V0UHJlc3NlZEtleUNvZGVzID0gZ2V0UHJlc3NlZEtleUNvZGVzO1xuICBnbG9iYWwua2V5Lm5vQ29uZmxpY3QgPSBub0NvbmZsaWN0O1xuICBnbG9iYWwua2V5LnVuYmluZCA9IHVuYmluZEtleTtcblxuICBpZih0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBhc3NpZ25LZXk7XG5cbn0pKHRoaXMpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==