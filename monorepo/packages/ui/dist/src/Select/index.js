"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Select = require("./Select");
Object.keys(_Select).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Select[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Select[key];
    }
  });
});