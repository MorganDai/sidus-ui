"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var MenuContextArgs = {
  activeKey: [],
  parentSubMenu: null
};
exports.MenuContextArgs = MenuContextArgs;
var MenuContext = React.createContext(MenuContextArgs);
exports.MenuContext = MenuContext;
exports["default"] = MenuContext;