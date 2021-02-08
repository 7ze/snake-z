// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts/input.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInputDirection = void 0;
var inputDirection = {
  x: 0,
  y: 0
};

var lastInputDirection = __assign({}, inputDirection);

var handler = function handler(e) {
  switch (e.key) {
    case 'ArrowUp':
    case 'W':
    case 'w':
      if (lastInputDirection.y !== 0) break;
      inputDirection = {
        x: 0,
        y: -1
      };
      break;

    case 'ArrowDown':
    case 'S':
    case 's':
      if (lastInputDirection.y !== 0) break;
      inputDirection = {
        x: 0,
        y: 1
      };
      break;

    case 'ArrowLeft':
    case 'A':
    case 'a':
      if (lastInputDirection.x !== 0) break;
      inputDirection = {
        x: -1,
        y: 0
      };
      break;

    case 'ArrowRight':
    case 'D':
    case 'd':
      if (lastInputDirection.x !== 0) break;
      inputDirection = {
        x: 1,
        y: 0
      };
      break;
  }
};

window.addEventListener('keydown', handler);

var getInputDirection = function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
};

exports.getInputDirection = getInputDirection;
},{}],"ts/snake.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnakeHead = exports.expandSnake = exports.isIntersected = exports.snakeIsOnPosition = exports.draw = exports.update = exports.SNAKE_SPEED = void 0;

var input_1 = require("./input");

exports.SNAKE_SPEED = 5; // * Speed in fps *

var snakeBody = [{
  x: 11,
  y: 11
}];
var newSegments = 0;

var update = function update() {
  // logic to move the snake
  addSegments();
  var inputDirection = input_1.getInputDirection();

  for (var i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = __assign({}, snakeBody[i]);
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
};

exports.update = update;

var draw = function draw(gameBoard) {
  snakeBody.forEach(function (segment) {
    var snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = "" + segment.y;
    snakeElement.style.gridColumnStart = "" + segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
};

exports.draw = draw;

var snakeIsOnPosition = function snakeIsOnPosition(position, _a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.ignoreHead,
      ignoreHead = _c === void 0 ? false : _c;

  return snakeBody.some(function (segment, index) {
    if (ignoreHead && !index) return false;
    return equalsPosition(segment, position);
  });
};

exports.snakeIsOnPosition = snakeIsOnPosition;

var isIntersected = function isIntersected() {
  return exports.snakeIsOnPosition(exports.getSnakeHead(), {
    ignoreHead: true
  });
};

exports.isIntersected = isIntersected;

var expandSnake = function expandSnake(growth) {
  newSegments += growth;
};

exports.expandSnake = expandSnake;

var getSnakeHead = function getSnakeHead() {
  return snakeBody[0];
};

exports.getSnakeHead = getSnakeHead;

var equalsPosition = function equalsPosition(positionOne, positionTwo) {
  return positionOne.x === positionTwo.x && positionOne.y === positionTwo.y;
};

var addSegments = function addSegments() {
  for (var i = 0; i < newSegments; i++) {
    snakeBody.push(__assign({}, snakeBody[snakeBody.length - 1]));
  }

  newSegments = 0;
};
},{"./input":"ts/input.ts"}],"ts/grid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOutsideGrid = exports.randomGridPosition = void 0;
var GRID_SIZE = 21;

var getRandom = function getRandom(limit) {
  return Math.floor(Math.random() * 1000) % limit + 1;
};

var randomGridPosition = function randomGridPosition() {
  return {
    x: getRandom(GRID_SIZE),
    y: getRandom(GRID_SIZE)
  };
};

exports.randomGridPosition = randomGridPosition;

function isOutsideGrid(position) {
  return position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE;
}

exports.isOutsideGrid = isOutsideGrid;
},{}],"ts/food.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = exports.update = void 0;

var grid_1 = require("./grid");

var snake_1 = require("./snake");

var getRandomFoodPosition = function getRandomFoodPosition() {
  var newFoodPosition;

  while (!newFoodPosition || snake_1.snakeIsOnPosition(newFoodPosition)) {
    newFoodPosition = grid_1.randomGridPosition();
  }

  return newFoodPosition;
};

var food = getRandomFoodPosition();
var EXPANSION_RATE = 1;

var update = function update() {
  if (snake_1.snakeIsOnPosition(food)) {
    snake_1.expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
};

exports.update = update;

var draw = function draw(gameBoard) {
  var foodElement = document.createElement('div');
  foodElement.style.gridRowStart = "" + food.y;
  foodElement.style.gridColumnStart = "" + food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
};

exports.draw = draw;
},{"./grid":"ts/grid.ts","./snake":"ts/snake.ts"}],"ts/game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var snake_1 = require("./snake");

var food_1 = require("./food");

var grid_1 = require("./grid");

var lastRenderTime = 0;
var gameOver = false;
var gameBoard = document.querySelector('#game-board');

var main = function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press Ok to restart.')) {
      window.location.href = '/';
    }

    return;
  }

  window.requestAnimationFrame(main);
  var secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snake_1.SNAKE_SPEED) return;
  lastRenderTime = currentTime;
  update();
  draw();
};

window.requestAnimationFrame(main);

var update = function update() {
  snake_1.update();
  food_1.update();
  checkDeath();
};

var draw = function draw() {
  gameBoard.innerHTML = '';
  snake_1.draw(gameBoard);
  food_1.draw(gameBoard);
};

var checkDeath = function checkDeath() {
  gameOver = grid_1.isOutsideGrid(snake_1.getSnakeHead()) || snake_1.isIntersected();
};
},{"./snake":"ts/snake.ts","./food":"ts/food.ts","./grid":"ts/grid.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41511" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/game.ts"], null)
//# sourceMappingURL=/game.7d2668c6.js.map