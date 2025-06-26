"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.progress = exports.end = exports.default = exports.Primary = void 0;
var _Tag = require("./Tag");
var meta = {
  title: 'Tag',
  component: _Tag.Tag,
  parameters: {
    docs: {
      description: {
        component: 'Tag 컴포넌트입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var Primary = exports.Primary = {
  args: {
    variant: 'primary',
    text: '학술동아리'
  }
};
var progress = exports.progress = {
  args: {
    variant: 'progress',
    text: '모집중'
  }
};
var end = exports.end = {
  args: {
    variant: 'end',
    text: '모집마감'
  }
};