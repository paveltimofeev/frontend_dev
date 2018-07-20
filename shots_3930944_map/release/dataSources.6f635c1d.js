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
})({14:[function(require,module,exports) {
(function () {

  window.dataSources = function () {

    var tracks_url = "https://gist.githubusercontent.com/paveltimofeev/5af14d572341ba16a67362e8ad714d00/raw/91a07d70602e10bafb511f9680317b2c9a1fc0cb/";
    var stub = "https://gist.githubusercontent.com/paveltimofeev/5af14d572341ba16a67362e8ad714d00/raw/13bf166d08f804053f54b1c3368bda5f7fd52e63/stub-data.json";

    function _call(url, next) {

      $.ajax({
        url: url,
        beforeSend: function beforeSend(xhr) {/*xhr.overrideMimeType( "text/plain; charset=x-user-defined" );*/}
      }).fail(function (err) {

        console.error(JSON.stringify(err));
        next(err);
      }).done(function (data) {

        //console.log( data );
        next(null, JSON.parse(data));
      });
    }

    return {

      getStats: function getStats(next) {

        _call(stub, function (err, data) {

          if (err) {
            next(err);
            return;
          }

          next(null, data.stats);
        });
      },

      getEvents: function getEvents(next) {

        _call(stub, function (err, data) {

          if (err) {
            next(err);
            return;
          }

          next(null, data.events_log);
        });
      },

      getLatestTrackData: function getLatestTrackData(next) {

        _call(stub, function (err, data) {

          if (err) {
            next(err);
            return;
          }

          _call(tracks_url + data.track_latest, function (tr_err, tr_data) {

            if (tr_err) {
              next(tr_err);
              return;
            }

            next(null, tr_data);
          });
        });
      }
    };
  };
})();
},{}]},{},[14], null)