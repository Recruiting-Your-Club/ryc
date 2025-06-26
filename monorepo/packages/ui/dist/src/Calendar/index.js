"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Calendar = require("./Calendar");
Object.keys(_Calendar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Calendar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Calendar[key];
    }
  });
});