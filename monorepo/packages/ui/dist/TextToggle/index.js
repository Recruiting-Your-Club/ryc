"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _TextToggle = require("./TextToggle");
Object.keys(_TextToggle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TextToggle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TextToggle[key];
    }
  });
});