"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Toggle = require("./Toggle");
Object.keys(_Toggle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Toggle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Toggle[key];
    }
  });
});