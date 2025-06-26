"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ToastCollection = exports.CustomDefaultToast = void 0;
var _react = _interopRequireDefault(require("react"));
var _Text = require("../Text");
var _Button = require("../Button");
var _ = require(".");
var _ToastProvider = require("./ToastProvider");
var _useToast = require("./useToast");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var meta = {
  title: 'Toast',
  component: _.Toast,
  parameters: {
    docs: {
      description: {
        component: '토스트입니다.'
      }
    }
  },
  decorators: [Story => {
    return (0, _react2.jsx)(_ToastProvider.ToastProvider, null, (0, _react2.jsx)("div", {
      style: {
        width: '100%',
        height: '100%',
        padding: '100px'
      }
    }, (0, _react2.jsx)(Story, null)));
  }]
};
var CustomDefaultToast = exports.CustomDefaultToast = {
  render: args => {
    var {
      toast
    } = (0, _useToast.useToast)();
    var handleToast = () => {
      toast(args.content, {
        toastTheme: args.toastTheme,
        type: args.type,
        duration: args.duration,
        autoClose: args.autoClose,
        status: args.status,
        position: args.position,
        progressBar: args.progressBar,
        sx: args.sx
      });
    };
    return (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: handleToast
    }, "\uCEE4\uC2A4\uD140 \uD574\uBCF4\uC138\uC5EC");
  },
  args: {
    content: '내용물(React Node)',
    type: 'info',
    toastTheme: 'black',
    autoClose: true,
    duration: 3000,
    status: 'entering',
    progressBar: true,
    sx: {}
  },
  argTypes: {
    content: {
      control: 'text'
    },
    type: {
      options: ['info', 'success', 'error', 'default'],
      control: {
        type: 'radio'
      }
    },
    toastTheme: {
      options: ['white', 'black', 'colored'],
      control: {
        type: 'radio'
      }
    },
    duration: {
      control: {
        type: 'number'
      }
    },
    autoClose: {
      control: {
        type: 'boolean'
      }
    },
    status: {
      control: {
        type: 'text'
      }
    },
    position: {
      options: ['topRight', 'topCenter', 'topLeft', 'bottomRight', 'bottomCenter', 'bottomLeft'],
      control: {
        type: 'radio'
      }
    },
    progressBar: {
      control: {
        type: 'boolean'
      }
    },
    sx: {
      control: {
        type: 'object'
      }
    }
  }
};
var ToastCollection = exports.ToastCollection = {
  render: args => {
    var {
      toast
    } = (0, _useToast.useToast)();
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Text.Text, {
      type: "h1Bold"
    }, "Theme : White\uC785\uB2C8\uB2E4."), (0, _react2.jsx)("div", {
      style: {
        width: '100%',
        display: 'flex',
        marginBottom: '30px'
      }
    }, (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast('Hello world', {
        toastTheme: 'white'
      })
    }, "\uAE30\uBCF8 Toast \uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast.info('메일을 성공적으로 전송하였습니다.', {
        toastTheme: 'white',
        position: 'topLeft'
      })
    }, "info \uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast.success('Hello world', {
        toastTheme: 'white',
        position: 'topCenter',
        duration: 3000
      })
    }, "success\uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast.error('Hello world', {
        toastTheme: 'white',
        position: 'topRight',
        duration: 3000
      })
    }, "error\uC785\uB2C8\uB2E4.")), (0, _react2.jsx)(_Text.Text, {
      type: "h1Bold"
    }, "Theme : black\uC785\uB2C8\uB2E4."), (0, _react2.jsx)("div", {
      style: {
        width: '100%',
        display: 'flex',
        marginBottom: '30px'
      }
    }, (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast('Hello world', {
        toastTheme: 'black'
      })
    }, "\uAE30\uBCF8 Toast \uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast.info('Hello world', {
        toastTheme: 'black',
        position: 'topLeft'
      })
    }, "info\uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast.success('Hello world', {
        toastTheme: 'black',
        position: 'topCenter'
      })
    }, "success\uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast.error('Hello world', {
        toastTheme: 'black',
        position: 'topRight'
      })
    }, "error\uC785\uB2C8\uB2E4.")), (0, _react2.jsx)(_Text.Text, {
      type: "h1Bold"
    }, "Theme : Colored\uC785\uB2C8\uB2E4."), (0, _react2.jsx)("div", {
      style: {
        width: '100%',
        display: 'flex',
        marginBottom: '30px'
      }
    }, (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast('기본 Toast', {
        toastTheme: 'colored'
      })
    }, "\uAE30\uBCF8 Toast \uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast.info('메일을 성공적으로 전송하였습니다.', {
        toastTheme: 'colored',
        position: 'topLeft'
      })
    }, "info \uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast.success('Hello world', {
        toastTheme: 'colored',
        position: 'topCenter'
      })
    }, "success\uC785\uB2C8\uB2E4."), (0, _react2.jsx)(_Button.Button, {
      size: "full",
      variant: "primary",
      onClick: () => toast.error('Hello world', {
        toastTheme: 'colored',
        position: 'topRight'
      })
    }, "error\uC785\uB2C8\uB2E4.")));
  }
};
var _default = exports.default = meta;