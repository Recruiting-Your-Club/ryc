"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SelectValue = exports.SelectTrigger = exports.SelectItem = exports.DefaultSelect = exports.BaseSelect = void 0;
var _Select = require("./Select");
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var meta = {
  title: 'Select',
  component: _Select.Select,
  parameters: {
    docs: {
      description: {
        component: 'dropdown 형식의 Select 컴포넌트입니다.'
      }
    }
  }
};
var DefaultSelect = exports.DefaultSelect = {
  render: args => {
    var [value, setValue] = (0, _react.useState)('');
    return (0, _react2.jsx)("div", {
      style: {
        height: '300px'
      }
    }, (0, _react2.jsx)("p", {
      style: {
        marginBottom: '20px'
      }
    }, "Selected value: ", value), (0, _react2.jsx)(_Select.Select, {
      value: args.value,
      onValueChange: setValue,
      size: args.size,
      sx: args.sx
    }, (0, _react2.jsx)(_Select.Select.Trigger, null, (0, _react2.jsx)(_Select.Select.Value, {
      placeholder: "\uAE30\uBCF8 Select"
    })), (0, _react2.jsx)(_Select.Select.Content, null, (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary1"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 1"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary2"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 2"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary3"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 3"))));
  },
  args: {
    children: 'ReactNode',
    size: 'lg',
    value: '',
    onValueChange: () => {}
  }
};
var SelectTrigger = exports.SelectTrigger = {
  render: args => {
    var [value, setValue] = (0, _react.useState)('');
    return (0, _react2.jsx)("div", {
      style: {
        height: '300px'
      }
    }, (0, _react2.jsx)("p", {
      style: {
        marginBottom: '20px'
      }
    }, "Selected value: ", value), (0, _react2.jsx)(_Select.Select, {
      value: value,
      onValueChange: setValue,
      size: "md"
    }, (0, _react2.jsx)(_Select.Select.Trigger, {
      disabled: args.disabled
    }, (0, _react2.jsx)(_Select.Select.Value, {
      placeholder: "\uAE30\uBCF8 Select"
    })), (0, _react2.jsx)(_Select.Select.Content, null, (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary1"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 1"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary2"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 2"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary3"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 3"))));
  },
  args: {
    children: 'ReactNode',
    disabled: true
  }
};
var SelectValue = exports.SelectValue = {
  render: args => {
    var [value, setValue] = (0, _react.useState)('');
    return (0, _react2.jsx)("div", {
      style: {
        height: '300px'
      }
    }, (0, _react2.jsx)("p", {
      style: {
        marginBottom: '20px'
      }
    }, "Selected value: ", value), (0, _react2.jsx)(_Select.Select, {
      value: value,
      onValueChange: setValue,
      size: "xl"
    }, (0, _react2.jsx)(_Select.Select.Trigger, null, (0, _react2.jsx)(_Select.Select.Value, {
      placeholder: args.placeholder
    })), (0, _react2.jsx)(_Select.Select.Content, null, (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary1"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 1"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary2"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 2"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary3"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 3"))));
  },
  args: {
    placeholder: '선택되지 않았을 때 기본 문구'
  }
};
var SelectItem = exports.SelectItem = {
  render: args => {
    var [value, setValue] = (0, _react.useState)('');
    return (0, _react2.jsx)("div", {
      style: {
        height: '300px'
      }
    }, (0, _react2.jsx)("p", {
      style: {
        marginBottom: '20px'
      }
    }, "Selected value: ", value), (0, _react2.jsx)(_Select.Select, {
      value: value,
      onValueChange: setValue,
      size: "md"
    }, (0, _react2.jsx)(_Select.Select.Trigger, null, (0, _react2.jsx)(_Select.Select.Value, {
      placeholder: "\uAE30\uBCF8 Select"
    })), (0, _react2.jsx)(_Select.Select.Content, null, (0, _react2.jsx)(_Select.Select.Item, {
      value: args.value,
      disabled: args.disabled
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 1"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary2"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 2"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "primary3"
    }, "\uAE30\uBCF8\uC785\uB2C8\uB2E4 3"))));
  },
  args: {
    children: 'ReactNode',
    disabled: true,
    value: ''
  }
};
var BaseSelect = exports.BaseSelect = {
  render: args => {
    var [value, setValue] = (0, _react.useState)('');
    return (0, _react2.jsx)("div", {
      style: {
        height: '300px'
      }
    }, (0, _react2.jsx)("p", {
      style: {
        marginBottom: '20px'
      }
    }, "Selected value: ", value), (0, _react2.jsx)(_Select.Select, {
      value: value,
      onValueChange: setValue,
      size: args.size
    }, (0, _react2.jsx)(_Select.Select.Trigger, null, (0, _react2.jsx)(_Select.Select.Value, {
      placeholder: "Select a fruit"
    })), (0, _react2.jsx)(_Select.Select.Content, null, (0, _react2.jsx)(_Select.Select.Group, null, (0, _react2.jsx)(_Select.Select.Label, null, "Fruits"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "apple"
    }, "Apple"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "banana"
    }, "Banana"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "orange"
    }, "Orange")), (0, _react2.jsx)(_Select.Select.Separator, null), (0, _react2.jsx)(_Select.Select.Group, null, (0, _react2.jsx)(_Select.Select.Label, null, "Vegetables"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "carrot"
    }, "Carrot"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "potato"
    }, "Potato"), (0, _react2.jsx)(_Select.Select.Item, {
      value: "broccoli"
    }, "Broccoli")))));
  },
  args: {
    children: 'ReactNode',
    size: 'md',
    value: '',
    onValueChange: () => {}
  }
};
var _default = exports.default = meta;