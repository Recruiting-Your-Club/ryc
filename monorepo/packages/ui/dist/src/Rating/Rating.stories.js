"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TenStars = exports.Interactive = exports.Display = exports.Default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ = require(".");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var meta = {
  title: '평점 컴포넌트',
  component: _.Rating,
  parameters: {
    docs: {
      description: {
        component: '평점 컴포넌트입니다.'
      }
    }
  }
};
var _default = exports.default = meta;
var Default = exports.Default = {
  args: {
    value: 3,
    totalStars: 5,
    size: 'md',
    type: 'click'
  }
};
var TenStars = exports.TenStars = {
  args: {
    value: 7,
    totalStars: 10,
    size: 'md',
    type: 'click'
  }
};
var Display = exports.Display = {
  args: {
    value: 4.3,
    totalStars: 5,
    size: 'lg',
    type: 'display'
  }
};
var Interactive = () => {
  var [rating, setRating] = (0, _react.useState)(2);
  var [type, setType] = (0, _react.useState)('click');
  var handleClick = newRating => {
    if (type === 'click') {
      setRating(newRating);
      setType('display');
    }
  };
  var resetToClickMode = () => {
    setType('click');
  };
  return (0, _react2.jsx)("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    }
  }, (0, _react2.jsx)("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }
  }, (0, _react2.jsx)(_.Rating, {
    value: rating,
    onChange: handleClick,
    type: type
  }), (0, _react2.jsx)("span", null, "(".concat(rating, ")"))), (0, _react2.jsx)("button", {
    onClick: resetToClickMode,
    style: {
      padding: '0.5rem 1rem',
      cursor: 'pointer'
    }
  }, "\uD3B8\uC9D1"));
};
exports.Interactive = Interactive;