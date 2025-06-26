"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Image = require("./Image");
Object.keys(_Image).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Image[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Image[key];
    }
  });
});