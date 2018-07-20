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
})({16:[function(require,module,exports) {
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

    function createChartOptions(data, color, min, max, type) {

        var labels = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(i);
        }

        return {
            type: type || 'line',
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
                label: ['GPS', 'Accelerometer', 'Speed', 'Compas'][idx],
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

        var ds = window.dataSources();

        ds.getStats(function (err, data) {

            drawChart("issues-chart", createChartOptions(data.heartbeat, colors.pink, 0, 1, 'bar'));
            drawChart("checks-chart", createChartOptions(data.gps_level, colors.yellow, 0, 100));
            drawChart("applications-chart", createChartOptions(data.battery_level, colors.blue, 0, 100));
            drawChart("databases-chart", createChartOptions(data.alerts, colors.green, 0, 1, 'bar'));
        });

        drawChart("server-activity-chart", createSrvChartOptions(getServerData(), [colors.green, colors.blue]));
        drawChart("server-dash_1", createDashOptions(0.5, colors.pink, '% CPU'));
        drawChart("server-dash_2", createDashOptions(0.25, colors.yellow, '% Memory'));
        drawChart("server-dash_3", createDashOptions(0.75, colors.blue, '% Download'));
    }

    run();
})();
},{}]},{},[16], null)