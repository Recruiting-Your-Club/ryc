"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ClubCard = require("./ClubCard");
Object.keys(_ClubCard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ClubCard[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ClubCard[key];
    }
  });
});