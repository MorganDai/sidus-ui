"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var context_1 = require("./context");

var classNames_1 = require("../utils/classNames");

var CheckboxGroup = function CheckboxGroup(props) {
  var _a = props.activeValues,
      activeValues = _a === void 0 ? [] : _a,
      _b = props.disabledValues,
      disabledValues = _b === void 0 ? [] : _b,
      _c = props.onCheck,
      onCheck = _c === void 0 ? function () {} : _c,
      _d = props.onUncheck,
      onUncheck = _d === void 0 ? function () {} : _d,
      children = props.children,
      _e = props.title,
      title = _e === void 0 ? '' : _e;

  var onChildCheck = function onChildCheck(val) {
    onCheck(val);
  };

  var onChildUncheck = function onChildUncheck(val) {
    onUncheck(val);
  };

  return React.createElement(context_1["default"].Provider, {
    value: {
      disabledValues: disabledValues,
      activeValues: activeValues,
      onCheck: onChildCheck,
      onUncheck: onChildUncheck
    }
  }, React.createElement("div", {
    className: classNames_1.genClassName('checkbox-group_wrapper')
  }, title ? React.createElement("div", null, title) : '', React.createElement("div", {
    className: classNames_1.genClassName('checkbox-group_content')
  }, children)));
};

exports["default"] = CheckboxGroup;