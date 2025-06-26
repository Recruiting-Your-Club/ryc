"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.XsSize = exports.SubtleVariant = exports.SmallSize = exports.Primary = exports.MiddleSize = exports.LargeSize = exports.FullSize = exports.FlushedVariant = exports.ErrorMode = exports.EntireMode = exports.DisabledMode = exports.CharCount = exports.ChangeWidth = void 0;
var _TextArea = require("./TextArea");
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var meta = {
  title: 'TextArea',
  component: _TextArea.TextArea,
  parameters: {
    docs: {
      description: {
        component: '공용 TextArea 컴포넌트입니다.'
      }
    }
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      control: {
        type: 'radio'
      }
    },
    variant: {
      options: ['outline', 'subtle', 'flushed'],
      control: {
        type: 'radio'
      }
    },
    width: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    },
    error: {
      control: 'boolean'
    },
    errorText: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    maxLength: {
      control: 'number'
    }
  }
};
var _default = exports.default = meta;
var Template = args => {
  var [text, setText] = (0, _react.useState)('');
  return (0, _react2.jsx)(_TextArea.TextArea, _extends({}, args, {
    value: text,
    onChange: e => setText(e.target.value),
    wrapperSx: {
      margin: '1rem'
    }
  }));
};
var Primary = exports.Primary = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'md',
    placeholder: '여기에 내용을 입력하세요'
  }
};
var FlushedVariant = exports.FlushedVariant = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'md',
    variant: 'flushed',
    placeholder: 'Flushed variant'
  }
};
var SubtleVariant = exports.SubtleVariant = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'md',
    variant: 'subtle',
    placeholder: 'Subtle variant'
  }
};
var XsSize = exports.XsSize = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'xs',
    placeholder: 'xs 사이즈'
  }
};
var SmallSize = exports.SmallSize = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'sm',
    placeholder: 'sm 사이즈'
  }
};
var MiddleSize = exports.MiddleSize = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'md',
    placeholder: 'md 사이즈'
  }
};
var LargeSize = exports.LargeSize = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'lg',
    placeholder: '많은 내용을 입력하세요'
  }
};
var FullSize = exports.FullSize = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'full',
    placeholder: 'full 사이즈'
  }
};
var ChangeWidth = exports.ChangeWidth = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'md',
    width: '80%',
    placeholder: '너비가 조정된 TextArea'
  }
};
var CharCount = exports.CharCount = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'md',
    maxLength: 300,
    placeholder: '최대 300자까지 입력 가능'
  }
};
var ErrorMode = exports.ErrorMode = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'md',
    error: true,
    errorText: '에러 메시지입니다.',
    placeholder: '에러 상태'
  }
};
var EntireMode = exports.EntireMode = {
  render: args => {
    var Component = () => {
      var [text, setText] = (0, _react.useState)('');
      return (0, _react2.jsx)(_TextArea.TextArea, _extends({}, args, {
        value: text,
        onChange: e => setText(e.target.value),
        error: text.length < 10,
        errorText: "10\uC790 \uC774\uC0C1 \uC785\uB825\uD574\uC8FC\uC138\uC694.",
        maxLength: 500,
        wrapperSx: {
          margin: '1rem'
        }
      }));
    };
    return (0, _react2.jsx)(Component, null);
  },
  args: {
    size: 'md',
    placeholder: '10자 이상 입력해야 에러가 사라져요'
  }
};
var DisabledMode = exports.DisabledMode = {
  render: args => (0, _react2.jsx)(Template, args),
  args: {
    size: 'md',
    disabled: true,
    placeholder: 'disabled 상태'
  }
};