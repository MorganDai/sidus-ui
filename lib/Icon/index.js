"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

require("./index.scss");

var Icon = function Icon(props) {
  var name = props.name,
      _a = props.cls,
      cls = _a === void 0 ? '' : _a,
      _b = props.size,
      size = _b === void 0 ? 'middle' : _b,
      _c = props.noHover,
      noHover = _c === void 0 ? false : _c,
      _d = props.onClick,
      _onClick = _d === void 0 ? function () {} : _d,
      _e = props.hide,
      hide = _e === void 0 ? false : _e;

  return React.createElement("div", {
    className: "sidus-icon_box " + cls
  }, React.createElement("span", {
    className: "sidus-icon sidus-icon_" + name + " " + size + " " + (noHover ? 'stop-hover' : '') + " " + (hide ? 'hide' : ''),
    onClick: function onClick() {
      _onClick();
    }
  }));
};

exports["default"] = Icon;