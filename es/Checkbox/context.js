"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var CheckBoxGroupContextArgs = {
  activeValues: [],
  disabledValues: [],
  onCheck: function onCheck() {},
  onUncheck: function onUncheck() {}
};
exports.CheckBoxGroupContextArgs = CheckBoxGroupContextArgs;
var CheckboxGroupContext = React.createContext(CheckBoxGroupContextArgs);
exports["default"] = CheckboxGroupContext;