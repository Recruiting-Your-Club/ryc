"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Primary = exports.DisabledMode = exports.CustomStorybook = void 0;
var _react = _interopRequireDefault(require("react"));
var _Tooltip = require("./Tooltip");
var _Button = require("../Button");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var meta = {
  title: 'Tooltip',
  component: _Tooltip.Tooltip,
  parameters: {
    docs: {
      description: {
        component: '공용 Tooltip 컴포넌트입니다.'
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: '툴팁 텍스트'
    },
    direction: {
      control: {
        type: 'radio'
      },
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'left', 'right'],
      description: '툴팁 방향'
    },
    delay: {
      control: {
        type: 'number'
      },
      description: '툴팁이 나타나는 딜레이(ms)'
    }
  }
};
var _default = exports.default = meta;
var Primary = exports.Primary = {
  render: args => (0, _react2.jsx)(_Tooltip.Tooltip, args, (0, _react2.jsx)("p", null, "\uC548\uB155\uD558\uC138\uC694.")),
  args: {
    content: '툴팁 예시입니다.',
    direction: 'bottomRight',
    disabled: false
  },
  argTypes: {
    content: {
      control: 'text',
      description: '툴팁 텍스트'
    },
    direction: {
      control: {
        type: 'radio'
      },
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'left', 'right'],
      description: '툴팁 방향'
    },
    delay: {
      control: {
        type: 'number'
      },
      description: '툴팁이 나타나는 딜레이(ms)'
    }
  }
};
var CustomStorybook = exports.CustomStorybook = {
  args: {
    content: '툴팁 예시입니다.',
    direction: 'bottomRight',
    delay: 300,
    disabled: false
  },
  render: args => (0, _react2.jsx)(_Tooltip.Tooltip, args, (0, _react2.jsx)(_Button.Button, {
    variant: "outlined"
  }, "\uD234\uD301 \uB300\uC0C1"))
};
var DisabledMode = () => {
  return (0, _react2.jsx)(_Tooltip.Tooltip, {
    content: "Tooltip \uC608\uC2DC\uC785\uB2C8\uB2E4.",
    disabled: true
  }, (0, _react2.jsx)("p", null, "\uC548\uB155\uD558\uC138\uC694."));
};
exports.DisabledMode = DisabledMode;