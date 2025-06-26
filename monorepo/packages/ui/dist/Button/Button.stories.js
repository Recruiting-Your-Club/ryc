"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Xs = exports.Xl = exports.S = exports.Primary = exports.Outlined = exports.Md = exports.Lg = exports.Full = exports.Disabled = void 0;
var _ = require(".");
var meta = {
  title: '기본버튼',
  component: _.Button,
  parameters: {
    docs: {
      description: {
        component: '버튼 컴포넌트입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var Primary = exports.Primary = {
  args: {
    size: 'md',
    onClick: () => {},
    children: '버튼',
    variant: 'primary',
    type: 'button'
  }
};
var Outlined = exports.Outlined = {
  args: {
    size: 'md',
    onClick: () => {},
    children: '버튼',
    variant: 'outlined',
    type: 'button'
  }
};
var Disabled = exports.Disabled = {
  args: {
    size: 'md',
    onClick: () => {},
    disabled: true,
    children: '버튼',
    variant: 'primary',
    type: 'button'
  }
};
var Xs = exports.Xs = {
  args: {
    size: 'xs',
    onClick: () => {},
    children: '버튼',
    variant: 'primary',
    type: 'button'
  }
};
var S = exports.S = {
  args: {
    size: 's',
    onClick: () => {},
    children: '버튼',
    variant: 'primary',
    type: 'button'
  }
};
var Md = exports.Md = {
  args: {
    size: 'md',
    onClick: () => {},
    children: '버튼',
    variant: 'primary',
    type: 'button'
  }
};
var Lg = exports.Lg = {
  args: {
    size: 'lg',
    onClick: () => {},
    children: '버튼',
    variant: 'primary',
    type: 'button'
  }
};
var Xl = exports.Xl = {
  args: {
    size: 'xl',
    onClick: () => {},
    children: '버튼',
    variant: 'primary',
    type: 'button'
  }
};
var Full = exports.Full = {
  args: {
    size: 'full',
    onClick: () => {},
    children: '버튼',
    variant: 'primary',
    type: 'button'
  }
};