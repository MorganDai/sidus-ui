"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var classNames_1 = require("../../utils/classNames");

require("./index.scss");

var Button = function Button(props) {
  var _a = props.disabled,
      disabled = _a === void 0 ? false : _a,
      _b = props.shape,
      shape = _b === void 0 ? 'round' : _b,
      _c = props.cls,
      cls = _c === void 0 ? '' : _c,
      _d = props.type,
      type = _d === void 0 ? '' : _d,
      _e = props.id,
      id = _e === void 0 ? '' : _e,
      onClick = props.onClick,
      children = props.children;

  var handler = function handler(e) {
    if (!disabled) {
      onClick && onClick(e);
    }
  };

  var btnCls = classNames_1.genClassName('button') + " " + type + " " + shape + " " + (disabled ? 'disabled' : '');
  return React.createElement("div", {
    className: classNames_1.genClassName('button_wrapper')
  }, React.createElement("div", {
    className: btnCls + ' ' + cls,
    onClick: handler,
    id: id
  }, children));
};

exports["default"] = Button;