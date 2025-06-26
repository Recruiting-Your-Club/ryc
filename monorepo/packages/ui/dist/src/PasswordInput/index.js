"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _PasswordInput = require("./PasswordInput");
Object.keys(_PasswordInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PasswordInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PasswordInput[key];
    }
  });
});