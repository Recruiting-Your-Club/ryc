"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xs = exports.xl = exports.s = exports.md = exports.lg = exports.default = exports.RoundedSquare = exports.Circle = exports.Base = void 0;
var _ = require(".");
var meta = {
  title: '대표 사진',
  component: _.Avatar,
  parameters: {
    docs: {
      description: {
        component: '대표 사진 컴포넌트입니다. 프로필 사진용으로 적합합니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var Base = exports.Base = {
  args: {
    shape: 'square',
    size: 'lg'
  }
};
var RoundedSquare = exports.RoundedSquare = {
  args: {
    shape: 'square',
    size: 'lg',
    radius: '0.5rem'
  }
};
var Circle = exports.Circle = {
  args: {
    shape: 'round',
    size: 'lg'
  }
};
var xs = exports.xs = {
  args: {
    size: 'xs'
  }
};
var s = exports.s = {
  args: {
    size: 's'
  }
};
var md = exports.md = {
  args: {
    size: 'md'
  }
};
var lg = exports.lg = {
  args: {
    size: 'lg'
  }
};
var xl = exports.xl = {
  args: {
    size: 'xl'
  }
};