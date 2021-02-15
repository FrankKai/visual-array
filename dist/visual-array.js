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
})({"visual-array.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VisualArray =
/*#__PURE__*/
function () {
  /**
   * @param { String } containerId
   * @param { Array } array
   * @param { Number } cw
   * @param { Number } ch
   * @param { String } bottomIndex
   * @param { Object } topText
   * @param {Object} customStyle
   */
  function VisualArray(containerId, array) {
    var cw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
    var ch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
    var bottomIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "head tail";
    var topText = arguments.length > 5 ? arguments[5] : undefined;
    var customStyle = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {
      font: "30px math",
      strokeStyle: "black",
      lineWidth: 1
    };

    _classCallCheck(this, VisualArray);

    if (!containerId) return;
    if (!Array.isArray(array)) return;
    this.array = array;
    this.cw = cw;
    this.ch = cw;
    this.bottomIndex = bottomIndex;
    this.topText = topText || {
      show: true,
      data: _defineProperty({
        0: "头"
      }, array.length - 1, "尾")
    };
    this.customStyle = customStyle;
    this.length = array.length;
    this.numberFont = parseInt(customStyle.font.replace("px", "")); // 若已经存在则不重新创建canvas

    this.canvas = document.getElementById(containerId).children[0] || document.createElement("canvas");

    this._calculateCanvas(this.length, cw, ch, this.bottomIndex, this.topText, this.numberFont, this.customStyle);

    var isCanvasExist = VisualArray.checkCanvasExist(containerId);

    if (!isCanvasExist) {
      document.body.appendChild(this.canvas);
    }

    this._configContext();

    this._generateArray(array, cw, ch, this.topText, customStyle);

    this._generateText(this.topText, cw);

    this._generateIndex(cw, ch, this.bottomIndex, this.topText);

    if (!isCanvasExist) {
      this._appendToContainer(containerId);
    }
  }
  /**
   * 计算canvas宽度和高度
   */


  _createClass(VisualArray, [{
    key: "_calculateCanvas",
    value: function _calculateCanvas(length, cw, ch, bottomIndex, topText, numberFont, customStyle) {
      var width = cw * length;
      var canvasHeight = ch;

      if (bottomIndex) {
        canvasHeight += numberFont;
      }

      if (topText.show) {
        canvasHeight += numberFont;
      }

      var height = canvasHeight + 2 * customStyle.lineWidth;
      this.canvas.width = width;
      this.canvas.height = height;
      return {
        width: width,
        height: height
      };
    }
    /**
     * 检查是否已经添加
     */

  }, {
    key: "_generateArray",

    /**
     * 生成数组
     */
    value: function _generateArray(array, cw, ch, topText, customStyle) {
      var strokeStyle = customStyle.strokeStyle;
      this.ctx.strokeStyle = strokeStyle;
      var y = 0;

      if (topText.show) {
        y += this.numberFont + 2 * customStyle.lineWidth;
      }

      for (var i = 0; i < this.length; i++) {
        this.ctx.strokeRect(i * cw, y, cw, ch);
        this.ctx.fillText(array[i], (i + 0.5) * cw, ch / 2 + y + this.numberFont / 2);
      }
    }
    /**
     * 生成顶部文字
     */

  }, {
    key: "_generateText",
    value: function _generateText(topText, cw) {
      var _this = this;

      if (!topText.show) return;
      var keys = Object.keys(topText.data);
      keys.forEach(function (key) {
        _this.ctx.fillText(topText.data[key], (parseInt(key) + 0.5) * cw, _this.numberFont);
      });
    }
    /**
     * 生成底部索引
     */

  }, {
    key: "_generateIndex",
    value: function _generateIndex(cw, ch, bottomIndex, topText) {
      var y = ch;

      if (bottomIndex) {
        y += this.numberFont;
      }

      if (topText.show) {
        y += this.numberFont;
      }

      if (bottomIndex === "head tail") {
        this.ctx.fillText(0, (0 + 0.5) * cw, y);
        this.ctx.fillText(this.length - 1, (this.length - 1 + 0.5) * cw, y);
      } else {
        bottomIndex === "all";

        for (var i = 0; i < this.length; i++) {
          this.ctx.fillText(i, (i + 0.5) * cw, y);
        }
      }
    }
    /**
     * 添加到容器
     */

  }, {
    key: "_appendToContainer",
    value: function _appendToContainer(id) {
      var container = document.getElementById(id);
      container.appendChild(this.canvas);
    }
    /**
     * 导出图片
     */

  }, {
    key: "exportImage",
    value: function exportImage() {
      this.canvas.toBlob(function (blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", "visual-array-".concat(+new Date(), ".jpg"));
        a.click();
        URL.revokeObjectURL(url);
      });
    }
    /**
     * 清空画布
     */

  }, {
    key: "clearCanvas",
    value: function clearCanvas() {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
    /**
     * 数组操作unshift、push、shift、pop
     */

  }, {
    key: "mutateArray",
    value: function mutateArray(action, payload) {
      this.clearCanvas();
      if (!["unshift", "push", "shift", "pop"].includes(action)) return;

      if (action === "unshift" || action === "push") {
        this.array[action](payload);
      } else {
        this.array[action]();
      }

      this.length = this.array.length;

      this._calculateCanvas(this.length, this.cw, this.ch, this.bottomIndex, this.topText, this.numberFont, this.customStyle);

      this._configContext();

      var tailIndex = this.array.length;

      if (action === "unshift" || action === "push") {
        tailIndex -= 2;
      }

      this.topText.data = _defineProperty({
        0: this.topText.data[0]
      }, this.array.length - 1, this.topText.data[tailIndex]);

      this._rerender();
    }
    /**
     * 重新绘制
     */

  }, {
    key: "_rerender",
    value: function _rerender() {
      this._generateArray(this.array, this.cw, this.ch, this.topText, this.customStyle);

      this._generateText(this.topText, this.cw);

      this._generateIndex(this.cw, this.ch, this.bottomIndex, this.topText);
    }
    /**
     * 配置context
     */

  }, {
    key: "_configContext",
    value: function _configContext() {
      this.ctx = this.canvas.getContext("2d");
      this.ctx.font = this.customStyle.font;
      this.ctx.textAlign = "center";
    }
  }], [{
    key: "checkCanvasExist",
    value: function checkCanvasExist(id) {
      var container = document.getElementById(id);
      return container.children.length >= 1;
    }
  }]);

  return VisualArray;
}();

module.exports = VisualArray;
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56905" + '/');

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
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","visual-array.js"], null)
//# sourceMappingURL=/visual-array.js.map