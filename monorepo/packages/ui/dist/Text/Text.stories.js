"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subCaptionBold = exports.h4Bold = exports.h3Bold = exports.h2Bold = exports.h1Bold = exports.default = exports.captionBold = exports.bodyBold = exports.Display = void 0;
var _ = require(".");
var meta = {
  title: 'Text',
  component: _.Text,
  parameters: {
    docs: {
      description: {
        component: 'Text 컴포넌트 입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var Display = exports.Display = {
  args: {
    children: 'display입니다.',
    type: 'displayBold',
    color: 'black',
    textAlign: 'center'
  }
};
var h1Bold = exports.h1Bold = {
  args: {
    children: 'h1입니다.',
    type: 'h1Bold',
    color: 'black',
    textAlign: 'center'
  }
};
var h2Bold = exports.h2Bold = {
  args: {
    children: 'h2입니다.',
    type: 'h2Bold',
    color: 'black',
    textAlign: 'center'
  }
};
var h3Bold = exports.h3Bold = {
  args: {
    children: 'h3입니다.',
    type: 'h3Bold',
    color: 'black',
    textAlign: 'center'
  }
};
var h4Bold = exports.h4Bold = {
  args: {
    children: 'h4입니다.',
    type: 'h4Bold',
    color: 'black',
    textAlign: 'center'
  }
};
var bodyBold = exports.bodyBold = {
  args: {
    children: 'bodyBold입니다.',
    type: 'bodyBold',
    color: 'black',
    textAlign: 'center'
  }
};
var captionBold = exports.captionBold = {
  args: {
    children: 'captionBold입니다.',
    type: 'captionBold',
    color: 'black',
    textAlign: 'center'
  }
};
var subCaptionBold = exports.subCaptionBold = {
  args: {
    children: 'subCaptionBold입니다.',
    type: 'subCaptionBold',
    color: 'black',
    textAlign: 'center'
  }
};