// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({12:[function(require,module,exports) {
(function () {

    var colors = {
        pink: { solid: 'rgb(215, 50, 93)', transparent: 'rgba(215, 50, 93, 0.1)' },
        blue: { solid: 'rgb(54, 165, 255)', transparent: 'rgba(54, 165, 255, 0.1)' },
        yellow: { solid: 'rgb(254, 255, 55)', transparent: 'rgba(254, 255, 55, 0.1)' },
        green: { solid: 'rgb(1, 197, 149)', transparent: 'rgba(1, 197, 149, 0.1)' }
    };

    function drawChart(elementId, chartOptions, clickOnItemCallback) {

        var canvas = document.getElementById(elementId);
        var ctx = canvas.getContext("2d");
        var chart = new Chart(ctx, chartOptions); // TODO: DUBLICATES CHART ON CALL drawChart() ANOTHER ONE TIME
    }

    function createChartOptions(data, color, min, max) {

        var labels = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(i);
        }

        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    borderColor: color.solid,
                    backgroundColor: color.transparent,
                    lineTension: 0,
                    borderWidth: 1.5,
                    pointRadius: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: { display: false },
                scales: {
                    xAxes: [{ display: false, ticks: { min: 0, max: data.length - 1 } }],
                    yAxes: [{ display: false, ticks: { min: min || 0, max: max || 10 } }]
                }
            }
        };
    }

    function createSrvChartOptions(data, color, min, max) {

        var labels = [];
        for (var i = 0; i < data[0].length; i++) {
            labels.push(i);
        }

        var datasets = [];
        data.forEach(function (d, idx) {

            datasets.push({
                label: "Server_" + (idx + 1),
                data: d,
                borderColor: color[idx].solid,
                backgroundColor: color[idx].transparent,
                lineTension: 0,
                borderWidth: 1,
                pointRadius: 0
            });
        });

        return {
            type: 'line',
            data: {
                datasets: datasets
            },
            options: {
                maintainAspectRatio: false,
                legend: { display: true, position: "top" },
                scales: {
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: true,
                            color: "#383f47"
                        },

                        color: "#383f47",
                        lineWidth: 1,
                        drawBorder: true,
                        drawTicks: true,
                        drawOnChartArea: true,
                        offsetGridLines: true
                    }],
                    xAxes: [{
                        display: true,
                        type: "time",

                        gridLines: {
                            display: true,
                            drawBorder: true,
                            color: "#383f47"
                        },

                        ticks: {},

                        time: {
                            unit: 'minute'
                        },

                        color: "#383f47",
                        lineWidth: 1,
                        drawBorder: true,
                        drawTicks: true
                    }]
                }
            }
        };
    }

    function createDashOptions(data, color, label) {

        return {
            type: 'doughnut',
            data: {
                labels: [label, ''],
                datasets: [{
                    data: [data * 100, 100 - data * 100],
                    borderColor_: color.solid,
                    borderColor: [color.solid, '#181c21'],
                    backgroundColor: [color.solid, 'rgba(0, 0, 0, 0)'],
                    lineTension: 0,
                    borderWidth: 1,
                    pointRadius: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: { display: false },
                cutoutPercentage: 85,
                rotation: Math.PI,
                circumference: 1 * Math.PI
            }
        };
    }

    function getData() {

        var result = [];
        for (var i = 0; i < 10; i++) {
            result.push(Math.random() * 5 + 2);
        }
        return result;
    }
    function getServerData() {

        function generateData(offset) {

            return parseInt((Math.random() * 5 + offset) * 10);
        }

        var result1 = [];
        var result2 = [];
        var max = 64;
        for (var i = 0; i < max; i++) {

            var timestamp = new Date(1530911474 + (-max + i) * 60 * 60 * 60);
            result1.push({ y: generateData(2.5), t: timestamp });
            result2.push({ y: generateData(0.5), t: timestamp });
        }

        return [result1, result2];
    }

    function run() {

        drawChart("issues-chart", createChartOptions(getData(), colors.pink));
        drawChart("applications-chart", createChartOptions(getData(), colors.blue));
        drawChart("checks-chart", createChartOptions(getData(), colors.yellow));
        drawChart("databases-chart", createChartOptions(getData(), colors.green));

        drawChart("server-activity-chart", createSrvChartOptions(getServerData(), [colors.green, colors.blue]));

        drawChart("server-dash_1", createDashOptions(0.5, colors.pink, '% CPU'));
        drawChart("server-dash_2", createDashOptions(0.25, colors.yellow, '% Memory'));
        drawChart("server-dash_3", createDashOptions(0.75, colors.blue, '% Download'));
    }

    run();
})();
},{}],21:[function(require,module,exports) {
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '44123' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
        parents.push(+k);
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[21,12], null)
//# sourceMappingURL=/charts.7f4400d2.map