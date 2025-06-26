"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BaseCheckbox = require("./BaseCheckbox");
Object.keys(_BaseCheckbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseCheckbox[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseCheckbox[key];
    }
  });
});