"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdSize = exports.lgSize = exports.default = exports.Primary = void 0;
var _TextToggle = require("./TextToggle");
var meta = {
  title: 'TextToggle',
  component: _TextToggle.TextToggle,
  parameters: {
    docs: {
      description: {
        component: 'Toggle 컴포넌트입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var Primary = exports.Primary = {
  args: {
    size: 'sm'
  }
};
var mdSize = exports.mdSize = {
  args: {
    size: 'md'
  }
};
var lgSize = exports.lgSize = {
  args: {
    size: 'lg'
  }
};