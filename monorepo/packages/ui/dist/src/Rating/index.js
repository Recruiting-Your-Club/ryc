"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Rating = require("./Rating");
Object.keys(_Rating).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Rating[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Rating[key];
    }
  });
});