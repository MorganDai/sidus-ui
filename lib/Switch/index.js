"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var classNames_1 = require("../utils/classNames");

require("./index.css");

var Switch = function Switch(props) {
  var _a = props.defaultStatus,
      defaultStatus = _a === void 0 ? false : _a,
      _b = props.onChange,
      onChange = _b === void 0 ? function () {} : _b,
      id = props.id;

  var _c = React.useState(defaultStatus),
      active = _c[0],
      setActive = _c[1];

  var wrapperCls = classNames_1.genClassName('switch_wrapper') + ' ' + (active ? 'active' : '');

  var trigger = function trigger(e) {
    e.nativeEvent.preventDefault();
    setActive(!active);
    onChange(!active);
  };

  return React.createElement("div", {
    id: id,
    className: wrapperCls,
    onClick: trigger
  }, React.createElement("div", {
    className: classNames_1.genClassName('switch')
  }, React.createElement("div", {
    className: classNames_1.genClassName('switch_inner')
  })));
};

exports["default"] = Switch;