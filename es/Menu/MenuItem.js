"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var MenuContext_1 = require("./MenuContext");

var tools_1 = require("../utils/tools");

require("./MenuItem.modules.css");

var MenuItem = function MenuItem(props) {
  var context = React.useContext(MenuContext_1["default"]);
  var _a = props.disabled,
      disabled = _a === void 0 ? false : _a,
      _b = props.title,
      title = _b === void 0 ? '' : _b,
      _c = props.id,
      id = _c === void 0 ? '' : _c,
      onClick = props.onClick;

  var trigger = function trigger() {
    // @ts-ignore
    context.setActiveKeys([id]);
    onClick && onClick('' + id);
  };

  var temp = Array.isArray(context.activeKey) ? context.activeKey.map(function (item) {
    return '' + item;
  }) : [context.activeKey];
  var isActive = temp.indexOf('' + id) !== -1;
  return React.createElement("div", {
    className: "sidus-menuitem_wrapper"
  }, React.createElement("div", {
    className: "sidus-menuitem " + (isActive ? 'active' : ''),
    onClick: disabled ? tools_1.doNothing : trigger
  }, title));
};

exports["default"] = MenuItem;