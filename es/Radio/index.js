"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

require("./index.scss");

var Radio = function Radio(props) {
  var label = props.label,
      children = props.children,
      _a = props.labelTriggle,
      labelTriggle = _a === void 0 ? false : _a,
      onChange = props.onChange;

  var _b = React.useState(false),
      checked = _b[0],
      setChecked = _b[1];

  var trigger = function trigger() {
    setChecked(!checked);
  };

  React.useEffect(function () {
    onChange && onChange(checked);
  }, [checked]);
  return React.createElement("div", {
    className: "sidus-radio_wrapper"
  }, React.createElement("span", {
    className: "sidus-radio " + (checked ? 'checked' : ''),
    onClick: trigger
  }), children || label ? React.createElement("div", {
    className: "sidus-radio-label",
    tabIndex: -1,
    onClick: labelTriggle ? trigger : function () {}
  }, label || children) : '');
};

exports["default"] = Radio;