"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VerticalRadio = exports.VariableText = exports.Text = exports.Primary = exports.NoLabelRadio = exports.DisabledRadio = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Radio = require("./Radio");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var meta = {
  title: 'Radio',
  component: _Radio.Radio,
  parameters: {
    docs: {
      description: {
        component: '공용 라디오 컴포넌트입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var Primary = () => {
  var [value, setValue] = (0, _react.useState)('1');
  return (0, _react2.jsx)(_Radio.Radio, {
    options: [{
      value: '1'
    }],
    name: "primary",
    value: value,
    onChange: setValue,
    orientation: "horizontal"
  });
};
exports.Primary = Primary;
var Text = () => {
  var [value, setValue] = (0, _react.useState)('opt1');
  return (0, _react2.jsx)(_Radio.Radio, {
    options: [{
      label: '옵션1',
      value: 'opt1'
    }],
    name: "text",
    value: value,
    onChange: setValue,
    orientation: "horizontal"
  });
};
exports.Text = Text;
var VariableText = () => {
  var [value, setValue] = (0, _react.useState)('opt2');
  return (0, _react2.jsx)(_Radio.Radio, {
    options: [{
      label: '옵션1',
      value: 'opt1'
    }, {
      label: '옵션2',
      value: 'opt2'
    }, {
      label: '옵션3',
      value: 'opt3'
    }],
    name: "variableText",
    value: value,
    onChange: setValue,
    orientation: "horizontal"
  });
};
exports.VariableText = VariableText;
var VerticalRadio = () => {
  var [value, setValue] = (0, _react.useState)('opt1');
  return (0, _react2.jsx)(_Radio.Radio, {
    options: [{
      label: '옵션1',
      value: 'opt1'
    }, {
      label: '옵션2',
      value: 'opt2'
    }, {
      label: '옵션3',
      value: 'opt3'
    }],
    name: "verticalRadio",
    value: value,
    onChange: setValue,
    orientation: "vertical"
  });
};
exports.VerticalRadio = VerticalRadio;
var DisabledRadio = () => {
  var [value, setValue] = (0, _react.useState)('opt1');
  return (0, _react2.jsx)(_Radio.Radio, {
    options: [{
      label: '옵션1',
      value: 'opt1'
    }, {
      label: '옵션2',
      value: 'opt2'
    }, {
      label: '옵션3',
      value: 'opt3'
    }],
    name: "disabledRadio",
    value: value,
    onChange: setValue,
    disabled: true,
    orientation: "horizontal"
  });
};
exports.DisabledRadio = DisabledRadio;
var NoLabelRadio = () => {
  var [value, setValue] = (0, _react.useState)('2');
  return (0, _react2.jsx)(_Radio.Radio, {
    options: [{
      value: '1'
    }, {
      value: '2'
    }, {
      value: '3'
    }],
    name: "noLabelRadio",
    value: value,
    onChange: setValue,
    orientation: "horizontal"
  });
};
exports.NoLabelRadio = NoLabelRadio;