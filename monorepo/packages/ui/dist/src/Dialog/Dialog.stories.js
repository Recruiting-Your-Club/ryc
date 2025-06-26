"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EmptyDialog = exports.DialogHeader = exports.DialogContent = exports.DialogAction = exports.BaseDialog = void 0;
var _xIcon = _interopRequireDefault(require("@assets/images/xIcon.svg"));
var _react = _interopRequireWildcard(require("react"));
var _styles = _interopRequireDefault(require("@ssoc/styles"));
var _ = require(".");
var _Button = require("../Button");
var _Text = require("../Text");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var meta = {
  title: 'Dialog/BaseDialog',
  component: _.Dialog,
  parameters: {
    docs: {
      description: {
        component: '다이얼로그입니다.'
      }
    }
  }
};
var EmptyDialog = exports.EmptyDialog = {
  render: args => {
    var [isOpen, setIsOpen] = (0, _react.useState)(false);
    var handleClose = () => {
      setIsOpen(false);
    };
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => setIsOpen(true)
    }, "\uC544\uBB34\uAC83\uB3C4 \uCC44\uC6B0\uC9C0 \uC54A\uC740 Dialog\uC785\uB2C8\uB2E4. (\uAC01 Dialog\uB294 Docs\uC5D0\uC11C \uCF54\uB4DC \uCC38\uACE0\uBD80\uD0C1)"), (0, _react2.jsx)(_.Dialog, {
      open: isOpen,
      handleClose: handleClose,
      size: args.size,
      sx: args.sx
    }, (0, _react2.jsx)(_.Dialog.Header, {
      position: "center"
    }, "\uD5E4\uB354"), (0, _react2.jsx)(_.Dialog.Content, null, "\uCEE8\uD150\uCE20"), (0, _react2.jsx)(_.Dialog.Action, null, "\uC561\uC158")));
  },
  args: {
    children: 'ReactNode',
    open: false,
    size: 'md',
    handleClose: () => {},
    sx: {}
  }
};
var DialogHeader = exports.DialogHeader = {
  render: args => {
    var [isOpen, setIsOpen] = (0, _react.useState)(false);
    var handleClose = () => {
      setIsOpen(false);
    };
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => setIsOpen(true)
    }, "\uD5E4\uB354\uB9CC \uC788\uB294 Dialog\uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_.Dialog, {
      open: isOpen,
      handleClose: handleClose,
      size: "md"
    }, (0, _react2.jsx)(_.Dialog.Header, {
      position: args.position,
      sx: _objectSpread({
        backgroundColor: _styles.default.colors.blue[100]
      }, args.sx),
      border: args.border
    }, args.children)));
  },
  args: {
    position: 'start',
    border: false,
    children: '헤더를 넣어주세용',
    sx: {}
  },
  argTypes: {
    position: {
      options: ['start', 'center', 'end'],
      control: {
        type: 'radio'
      }
    },
    border: {
      options: [true, false],
      control: {
        type: 'boolean'
      }
    },
    children: {
      control: {
        type: 'text'
      }
    },
    sx: {
      control: {
        type: 'object'
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['open', 'size', 'backdrop', 'handleClose']
    }
  }
};
var DialogContent = exports.DialogContent = {
  render: args => {
    var [isOpen, setIsOpen] = (0, _react.useState)(false);
    var handleClose = () => {
      setIsOpen(false);
    };
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => setIsOpen(true)
    }, "\uCEE8\uD150\uCE20\uB9CC \uC788\uB294 Dialog\uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_.Dialog, {
      open: isOpen,
      handleClose: handleClose,
      size: "md"
    }, (0, _react2.jsx)("div", null, "\uC784\uC758\uAC12(\uD5E4\uB354\uAC00 \uB4E4\uC5B4\uAC08\uC790\uB9AC)"), (0, _react2.jsx)(_.Dialog.Content, {
      sx: args.sx
    }, args.children), (0, _react2.jsx)("div", null, "\uC784\uC758\uAC12(\uC561\uC158\uC774 \uB4E4\uC5B4\uAC08\uC790\uB9AC)")));
  },
  args: {
    children: '컨텐츠를 넣어주세용',
    sx: {}
  },
  argTypes: {
    children: {
      control: {
        type: 'text'
      }
    },
    sx: {
      control: {
        type: 'object'
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['open', 'size', 'backdrop', 'handleClose']
    }
  }
};
var DialogAction = exports.DialogAction = {
  render: args => {
    var [isOpen, setIsOpen] = (0, _react.useState)(false);
    var handleClose = () => {
      setIsOpen(false);
    };
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => setIsOpen(true)
    }, "\uC561\uC158\uB9CC \uC788\uB294 Dialog\uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_.Dialog, {
      open: isOpen,
      handleClose: handleClose,
      size: "md"
    }, (0, _react2.jsx)("div", null, "\uC784\uC758\uAC12(\uD5E4\uB354\uAC00 \uB4E4\uC5B4\uAC08\uC790\uB9AC)"), (0, _react2.jsx)("div", null, "\uC784\uC758\uAC12(\uCEE8\uD150\uCE20\uAC00 \uB4E4\uC5B4\uAC08\uC790\uB9AC)"), (0, _react2.jsx)(_.Dialog.Action, {
      position: args.position,
      sx: _objectSpread({
        backgroundColor: _styles.default.colors.blue[100]
      }, args.sx),
      border: args.border
    }, args.children)));
  },
  args: {
    position: 'start',
    border: false,
    children: '버튼 또는 액션을 만들 요소를 만들어주세용',
    sx: {}
  },
  argTypes: {
    position: {
      options: ['start', 'center', 'end'],
      control: {
        type: 'radio'
      }
    },
    border: {
      options: [true, false],
      control: {
        type: 'boolean'
      }
    },
    children: {
      control: {
        type: 'text'
      }
    },
    sx: {
      control: {
        type: 'object'
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['open', 'size', 'backdrop', 'handleClose']
    }
  }
};
var BaseDialog = exports.BaseDialog = {
  render: args => {
    var [isOpen, setIsOpen] = (0, _react.useState)(false);
    var handleClose = () => {
      setIsOpen(false);
    };
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => setIsOpen(true)
    }, "Empty Dialog\uC5D0 \uBF08\uB300\uB97C \uB123\uC740 Dialog\uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_.Dialog, {
      open: isOpen,
      handleClose: handleClose,
      size: args.size,
      sx: args.sx,
      backdrop: args.backdrop
    }, (0, _react2.jsx)(_.Dialog.Header, {
      sx: {
        justifyContent: 'space-between'
      }
    }, (0, _react2.jsx)(_Text.Text, {
      as: "span",
      type: "h4Bold"
    }, "\uD0C0\uC774\uD2C0"), (0, _react2.jsx)(_Button.Button, {
      variant: "transparent",
      size: "xs",
      "aria-label": "close",
      onClick: handleClose
    }, (0, _react2.jsx)(_xIcon.default, {
      alt: "close"
    }))), (0, _react2.jsx)(_.Dialog.Content, null, (0, _react2.jsx)(_Text.Text, {
      type: "bodyRegular",
      textAlign: "start"
    }, "\uAE30\uBCF8\uC801\uC778 \uBF08\uB300\uB97C \uB9CC\uB4E4\uC5B4\uBCF4\uC544\uC694")), (0, _react2.jsx)(_.Dialog.Action, null, (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: handleClose
    }, "\uD655\uC778"))));
  },
  args: {
    children: 'ReactNode',
    open: false,
    size: 'md',
    backdrop: true,
    handleClose: () => {},
    sx: {}
  }
};
var _default = exports.default = meta;