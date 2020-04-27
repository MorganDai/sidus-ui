"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var index_1 = require("../index");

var context_1 = require("./context");

var classNames_1 = require("../utils/classNames");

require("./index.css");

var Checkbox = function Checkbox(props) {
  var _a = props.icon,
      icon = _a === void 0 ? React.createElement(index_1.Icon, {
    name: "unchoose"
  }) : _a,
      _b = props.activeIcon,
      activeIcon = _b === void 0 ? React.createElement(index_1.Icon, {
    name: "choose"
  }) : _b,
      content = props.content,
      value = props.value,
      _c = props.align,
      align = _c === void 0 ? 'horizontal' : _c,
      _d = props.selected,
      selected = _d === void 0 ? false : _d,
      _e = props.disabled,
      disabled = _e === void 0 ? false : _e;
  var context = React.useContext(context_1["default"]); // @ts-ignore

  var isDisabled = context.disabledValues.indexOf(value) !== -1; // @ts-ignore

  var isActive = context.activeValues.indexOf(value) !== -1;

  var _f = React.useState(selected || isActive),
      active = _f[0],
      setActive = _f[1];

  var isHorizontal = align === 'horizontal';

  var doClick = function doClick(value) {
    if (disabled || isDisabled) return;

    if (active) {
      // @ts-ignore
      context.onUncheck(value);
    } else {
      // @ts-ignore
      context.onCheck(value);
    }

    setActive(!active);
  };

  return React.createElement(context_1["default"].Consumer, null, function () {
    return React.createElement("div", {
      className: classNames_1.genClassName('checkbox_wrapper') + (" " + (isHorizontal ? 'horizontal' : '') + " " + (isDisabled ? 'disabled' : ''))
    }, React.createElement("div", {
      className: classNames_1.genClassName('checkbox_icon'),
      onClick: function onClick() {
        doClick(value);
      }
    }, active ? activeIcon : icon), React.createElement("div", {
      className: classNames_1.genClassName('checkbox_content')
    }, content));
  });
};

exports["default"] = Checkbox;