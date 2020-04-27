"use strict";

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var MenuContext_1 = require("./MenuContext");

require("./index.css");

var Menu = function Menu(props) {
  var title = props.title,
      children = props.children,
      _a = props.activeKey,
      activeKey = _a === void 0 ? [] : _a;

  var _b = React.useState(__spreadArrays(activeKey)),
      key = _b[0],
      setKey = _b[1];

  var _c = React.useState(null),
      parentSubMenu = _c[0],
      setParentSubMenu = _c[1];

  React.useEffect(function () {
    setKey(__spreadArrays(activeKey));
  }, [activeKey]);
  return React.createElement(MenuContext_1["default"].Provider, {
    value: {
      activeKey: key,
      parentSubMenu: parentSubMenu,
      setActiveKeys: setKey,
      setParentSubMenu: setParentSubMenu
    }
  }, React.createElement("div", {
    className: "sidus-menu_wrapper"
  }, title ? React.createElement("h3", {
    className: "sidus-menu_title"
  }, title) : '', children));
}; // @ts-ignore


Menu.Item = null; // @ts-ignore

Menu.ItemGroup = null; // @ts-ignore

Menu.SubMenu = null;
exports["default"] = Menu;