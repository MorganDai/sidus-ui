"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var context_1 = require("./context");

var classNames_1 = require("../utils/classNames");

var tools_1 = require("../utils/tools");

var Collapse = function Collapse(props) {
  var activeKey = props.activeKey,
      defaultActiveKey = props.defaultActiveKey,
      children = props.children,
      onChange = props.onChange;

  var _a = React.useState(tools_1.toNumArray(activeKey)),
      akey = _a[0],
      setAKey = _a[1];

  var _b = React.useState(tools_1.toNumArray(defaultActiveKey)),
      dkey = _b[0],
      setDKey = _b[1];

  return React.createElement(context_1.CollapseContext.Provider, {
    value: {
      activeKey: akey,
      defaultActiveKey: dkey,
      setActiveKey: setAKey,
      setDefaultActiveKey: setDKey,
      onChange: onChange
    }
  }, React.createElement("div", {
    className: classNames_1.genClassName('collapse_wrapper-cell')
  }, children));
}; // @ts-ignore


Collapse.Panel = null;
exports["default"] = Collapse;